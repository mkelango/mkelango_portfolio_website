/* ============================================================================
   Form capture backend — Supabase.

   The site is static, so the browser writes straight to PostgREST. That means
   the key below is PUBLIC by design: it ships in the HTML of every page and
   anyone can read it. It is not a secret and must not be treated as one.

   What actually protects the data is the schema in supabase/schema.sql:
   the anon role may INSERT into three tables, on named columns only, and may
   not SELECT, UPDATE or DELETE anything. Reading requires the service_role key,
   which never leaves the Supabase dashboard.

   NEVER put the service_role key or the Postgres connection string here.

   The key can also be supplied at build time — `SUPABASE_ANON_KEY=… node build.js`
   — so it can live in a GitHub Actions secret instead of the repository. Either
   works; the env var wins.

   While `anonKey` is empty the forms stay in their honest disabled state: every
   submit shows a "not connected" notice rather than silently failing.
   ========================================================================== */

const backend = {
  url: process.env.SUPABASE_URL || 'https://mkogrwfdtuftxcbxhmbg.supabase.co',

  /* Publishable / anon key. Paste it here, or pass SUPABASE_ANON_KEY at build.
     Supabase dashboard → Project Settings → API Keys → anon / publishable. */
  anonKey: process.env.SUPABASE_ANON_KEY || '',

  /* Where each form kind is written. Must match supabase/schema.sql. */
  tables: {
    subscribe: 'subscribers',
    diagnostic: 'diagnostic_runs',
    submission: 'submissions'
  }
};

backend.enabled = Boolean(backend.url && backend.anonKey);

module.exports = { backend };
