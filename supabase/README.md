# Form capture

The site is static — GitHub Pages, no server. So the browser writes straight to
Supabase PostgREST using the **public anon key**, and the security model lives entirely
in [`schema.sql`](schema.sql).

Say that plainly, because it is the thing most easily got wrong: **the anon key is not a
secret.** It ships in the HTML of every page and anyone can read it. It grants exactly
what the schema grants and nothing more.

## What is stored

| Table | Rows | Written by |
|---|---|---|
| `subscribers` | one per newsletter address, deduplicated on lowercased email | the 70 newsletter forms |
| `submissions` | contact, programme and coaching applications, event seat requests, book notifications, corrections | 24 forms, discriminated by `kind` |
| `diagnostic_runs` | a completed instrument, with score, band, weakest trait and per-trait breakdown | only when a visitor asks for the detailed report |

Form-specific answers land in `submissions.payload` as JSON **keyed by the question's own
label**, so a row reads like the form did:

```json
{
  "01 · What are you building, in one sentence?": "…",
  "02 · What do you currently hold?": "…",
  "03 · What have you already tried that did not work?": "…"
}
```

### One deliberate restraint

`diagnostic_runs` is written **only when the report is requested** — never on merely
finishing a test. [`/privacy/`](../src/pages/legal.js) promises *"the score is computed in
your browser; nothing is transmitted unless you ask for the detailed report."* Recording
anonymous completions would make that sentence false, so the anonymous benchmark data is
given up to keep it true.

## What protects it

`anon` may `INSERT` into three tables, **on named columns only**, and may not `SELECT`,
`UPDATE` or `DELETE` anything. Verified by impersonating the role directly:

| Check | Result |
|---|---|
| anon inserts a valid subscriber | accepted |
| anon reads any table | `permission denied` |
| anon sets `ip` / `created_at` / `handled_at` | `permission denied` — server-owned |
| malformed email | rejected by `CHECK` |
| honeypot filled | rejected by `CHECK` |
| unknown `kind` | rejected by `CHECK` |
| payload over 16 KB | rejected by `CHECK` |
| diagnostic `score > max_score` | rejected by `CHECK` |
| 13th write in an hour from one IP | `rate limit exceeded` |

The IP is read server-side from the proxy headers and written by a trigger — the browser
cannot set or spoof it. Every form also carries an off-screen honeypot field.

## Reading the data

Nothing can read these tables from the browser, by design. Use either:

- **Supabase dashboard** → Table Editor, or the SQL editor
- **service_role key** from a server or script. It bypasses RLS entirely and **must never
  reach the frontend**

Useful queries:

```sql
-- the list
select email, source, created_at from subscribers order by created_at desc;

-- unhandled enquiries, newest first
select created_at, kind, ref, name, email, organisation, payload
from submissions where handled_at is null order by created_at desc;

-- mark one handled
update submissions set handled_at = now(), notes = 'replied' where id = 42;

-- how the instruments are actually scoring
select instrument, count(*), round(avg(score)::numeric, 1) as avg_score, max(max_score)
from diagnostic_runs group by instrument order by 2 desc;
```

## Applying the schema

It is idempotent — safe to re-run.

```bash
export SUPABASE_DB_URL='postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres'
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
```

Use the **connection pooler** host, not `db.<ref>.supabase.co` — the direct host is
IPv6-only and will not resolve on an IPv4 network. The pooler username is
`postgres.<project-ref>`, not `postgres`.

Never commit that URL. `.env*` is gitignored.

## Turning it on

The forms stay in an honest disabled state — "not connected yet, nothing was sent" —
until a key is configured. Then:

1. Supabase dashboard → **Project Settings → API Keys** → copy the **anon / publishable** key
2. Paste it into [`src/data/backend.js`](../src/data/backend.js) as `anonKey`
3. `npm run check && git push`

Or keep it out of the repository by setting a GitHub Actions secret `SUPABASE_ANON_KEY` and
adding it to the build step in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).
The env var wins over the committed value.

## Still to do

- **Email notification.** Nothing tells you a submission arrived; you have to look. A
  Supabase Database Webhook on `submissions` insert, pointed at Resend or Postmark, is the
  usual fix.
- **Double opt-in** for the newsletter. `subscribers.confirmed_at` exists and is never set.
  Most jurisdictions expect a confirmation step before you mail someone.
- **Unsubscribe.** `unsubscribed_at` exists and nothing writes it. A one-click link is
  promised on the newsletter page and in `/privacy/`, so this has to exist before the first
  send.
