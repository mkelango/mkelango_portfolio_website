-- ============================================================================
-- mkelango.com — form capture schema
--
-- The site is static (GitHub Pages). There is no server, so the browser writes
-- straight to PostgREST using the public anon key. That means this schema is
-- the ONLY thing standing between the internet and the tables — the key is
-- public by design and protects nothing.
--
-- So the rules here are deliberately strict:
--   · anon may INSERT. It may never SELECT, UPDATE or DELETE.
--   · every text column is length-capped
--   · email must look like an email
--   · a per-IP hourly rate limit, enforced in a trigger
--   · a honeypot column: if it is filled, the row is a bot and is rejected
--
-- Reading the data is done from the Supabase dashboard or with the service_role
-- key, which bypasses RLS and must never reach the browser.
--
-- Apply:  psql "$SUPABASE_DB_URL" -f supabase/schema.sql
-- Safe to re-run.
-- ============================================================================

begin;

-- ─────────────────────────────────────────────────────────── helpers ────────

create or replace function public.is_email(v text)
returns boolean language sql immutable as $$
  select v ~ '^[^@[:space:]]+@[^@[:space:]]+\.[a-zA-Z]{2,}$' and length(v) <= 254
$$;

-- The caller's IP, as seen through Supabase's proxy. Null when unavailable,
-- which is treated as "cannot rate limit" rather than "block".
create or replace function public.request_ip()
returns text language plpgsql stable as $$
declare h jsonb; ip text;
begin
  begin
    h := current_setting('request.headers', true)::jsonb;
  exception when others then
    return null;
  end;
  if h is null then return null; end if;
  ip := coalesce(h->>'cf-connecting-ip', h->>'x-real-ip', split_part(h->>'x-forwarded-for', ',', 1));
  return nullif(btrim(ip), '');
end $$;

-- ──────────────────────────────────────────────────── 1. subscribers ────────
-- The newsletter list. One row per address; re-subscribing touches the
-- existing row rather than creating a duplicate.

create table if not exists public.subscribers (
  id              bigint generated always as identity primary key,
  email           text        not null,
  source          text        not null default 'unknown',
  page            text,
  ip              text,
  created_at      timestamptz not null default now(),
  confirmed_at    timestamptz,
  unsubscribed_at timestamptz,
  hp              text,
  constraint subscribers_email_ck  check (public.is_email(email)),
  constraint subscribers_source_ck check (length(source) <= 64),
  constraint subscribers_page_ck   check (page is null or length(page) <= 256),
  constraint subscribers_hp_ck     check (hp is null or hp = '')
);

create unique index if not exists subscribers_email_uq on public.subscribers (lower(email));
create index if not exists subscribers_created_idx on public.subscribers (created_at desc);

-- ──────────────────────────────────────────────────── 2. submissions ────────
-- Contact, programme and coaching applications, event seat requests, book
-- notifications and corrections. One table, discriminated by `kind`, with the
-- form-specific answers in `payload`.

create table if not exists public.submissions (
  id           bigint generated always as identity primary key,
  kind         text        not null,
  ref          text,
  name         text,
  email        text        not null,
  organisation text,
  role         text,
  payload      jsonb       not null default '{}'::jsonb,
  page         text,
  ip           text,
  created_at   timestamptz not null default now(),
  handled_at   timestamptz,
  notes        text,
  hp           text,
  constraint submissions_kind_ck  check (kind in
    ('contact','program','coaching','event','correction','book-notify','boxed-set','other')),
  constraint submissions_email_ck check (public.is_email(email)),
  constraint submissions_ref_ck   check (ref is null or length(ref) <= 96),
  constraint submissions_name_ck  check (name is null or length(name) <= 160),
  constraint submissions_org_ck   check (organisation is null or length(organisation) <= 200),
  constraint submissions_role_ck  check (role is null or length(role) <= 160),
  constraint submissions_page_ck  check (page is null or length(page) <= 256),
  constraint submissions_size_ck  check (pg_column_size(payload) <= 16384),
  constraint submissions_hp_ck    check (hp is null or hp = '')
);

create index if not exists submissions_created_idx on public.submissions (created_at desc);
create index if not exists submissions_kind_idx    on public.submissions (kind, created_at desc);
create index if not exists submissions_email_idx   on public.submissions (lower(email));

-- ────────────────────────────────────────────── 3. diagnostic_runs ──────────
-- A completed instrument. `email` is null unless the visitor asked for the
-- detailed report — the score itself is never gated, so most rows have no
-- address attached, which is the intended shape.

create table if not exists public.diagnostic_runs (
  id         bigint generated always as identity primary key,
  instrument text        not null,
  score      integer     not null,
  max_score  integer     not null,
  band       text,
  weakest    text,
  traits     jsonb,
  email      text,
  page       text,
  ip         text,
  created_at timestamptz not null default now(),
  hp         text,
  constraint diagnostic_instrument_ck check (instrument in
    ('aq-score','flywheel-locator','moonshot-test','coherence-matrix','three-questions','cci-readiness')),
  constraint diagnostic_score_ck  check (score >= 0 and max_score > 0 and score <= max_score),
  constraint diagnostic_band_ck   check (band is null or length(band) <= 96),
  constraint diagnostic_weak_ck   check (weakest is null or length(weakest) <= 96),
  constraint diagnostic_email_ck  check (email is null or public.is_email(email)),
  constraint diagnostic_page_ck   check (page is null or length(page) <= 256),
  constraint diagnostic_size_ck   check (traits is null or pg_column_size(traits) <= 8192),
  constraint diagnostic_hp_ck     check (hp is null or hp = '')
);

create index if not exists diagnostic_created_idx    on public.diagnostic_runs (created_at desc);
create index if not exists diagnostic_instrument_idx on public.diagnostic_runs (instrument, created_at desc);

-- ────────────────────────────────────────────────── rate limiting ───────────
-- An open INSERT endpoint on a public site will be found. This caps a single
-- IP at 12 writes an hour across all three tables, which is far above any
-- honest use and far below anything worth doing.

create or replace function public.enforce_write_limit()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_ip text;   -- deliberately not named `ip`: that would be ambiguous against
  v_n  integer; -- the column of the same name in the queries below
begin
  v_ip := public.request_ip();
  new.ip := v_ip;
  if v_ip is null then return new; end if;

  select
    (select count(*) from public.subscribers     s where s.ip = v_ip and s.created_at > now() - interval '1 hour') +
    (select count(*) from public.submissions     b where b.ip = v_ip and b.created_at > now() - interval '1 hour') +
    (select count(*) from public.diagnostic_runs d where d.ip = v_ip and d.created_at > now() - interval '1 hour')
  into v_n;

  if v_n >= 12 then
    raise exception 'rate limit exceeded' using errcode = '53400';
  end if;
  return new;
end $$;

drop trigger if exists subscribers_limit     on public.subscribers;
drop trigger if exists submissions_limit     on public.submissions;
drop trigger if exists diagnostic_runs_limit on public.diagnostic_runs;

create trigger subscribers_limit     before insert on public.subscribers     for each row execute function public.enforce_write_limit();
create trigger submissions_limit     before insert on public.submissions     for each row execute function public.enforce_write_limit();
create trigger diagnostic_runs_limit before insert on public.diagnostic_runs for each row execute function public.enforce_write_limit();

-- ─────────────────────────────────────────────── row level security ─────────
-- Insert-only for the browser. Nothing readable, nothing mutable.

alter table public.subscribers     enable row level security;
alter table public.submissions     enable row level security;
alter table public.diagnostic_runs enable row level security;

alter table public.subscribers     force row level security;
alter table public.submissions     force row level security;
alter table public.diagnostic_runs force row level security;

drop policy if exists subscribers_insert     on public.subscribers;
drop policy if exists submissions_insert     on public.submissions;
drop policy if exists diagnostic_runs_insert on public.diagnostic_runs;

create policy subscribers_insert     on public.subscribers     for insert to anon, authenticated with check (true);
create policy submissions_insert     on public.submissions     for insert to anon, authenticated with check (true);
create policy diagnostic_runs_insert on public.diagnostic_runs for insert to anon, authenticated with check (true);

-- Explicit grants. Column-level so the browser cannot set server-owned fields
-- such as ip, created_at, handled_at or notes.
revoke all on public.subscribers, public.submissions, public.diagnostic_runs from anon, authenticated;

grant insert (email, source, page, hp)                              on public.subscribers     to anon, authenticated;
grant insert (kind, ref, name, email, organisation, role, payload, page, hp)
                                                                    on public.submissions     to anon, authenticated;
grant insert (instrument, score, max_score, band, weakest, traits, email, page, hp)
                                                                    on public.diagnostic_runs to anon, authenticated;

grant usage on schema public to anon, authenticated;

commit;
