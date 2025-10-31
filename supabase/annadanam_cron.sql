-- Precise daily Annadanam digest via Postgres cron + HTTP
-- Run this in Supabase SQL editor after replacing YOUR_SITE_URL and SECRET
-- Requires extensions: pg_cron and pg_net (available on Supabase)

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Optional: persist settings on the database so jobs don't embed secrets inline
-- Replace values and uncomment if you prefer DB-level settings
-- alter database postgres set app.site_url = 'https://YOUR_SITE_URL_HERE';
-- alter database postgres set app.cron_secret = 'YOUR_SECRET_HERE';
-- alter database postgres set app.digest_to = 'recipient@example.com';

-- Variables (use DB settings above or inline values here)
-- Replace between quotes
do $$ begin
  if current_setting('app.site_url', true) is null then
    perform set_config('app.site_url', 'https://YOUR_SITE_URL_HERE', false);
  end if;
  if current_setting('app.cron_secret', true) is null then
    perform set_config('app.cron_secret', 'YOUR_SECRET_HERE', false);
  end if;
  if current_setting('app.digest_to', true) is null then
    perform set_config('app.digest_to', 'recipient@example.com', false);
  end if;
end $$;

-- 11:31 AM IST → 06:01 UTC
select cron.schedule(
  'annadanam_digest_morning',
  '1 6 * * *',
  $$select net.http_get(
       url => current_setting('app.site_url') || '/api/annadanam/digest?window=afternoon&key=' || current_setting('app.cron_secret') || '&to=' || current_setting('app.digest_to'))$$
);

-- 7:30 PM IST → 14:00 UTC
select cron.schedule(
  'annadanam_digest_evening',
  '0 14 * * *',
  $$select net.http_get(
       url => current_setting('app.site_url') || '/api/annadanam/digest?window=evening&key=' || current_setting('app.cron_secret') || '&to=' || current_setting('app.digest_to'))$$
);

-- To inspect scheduled jobs
-- select * from cron.job;

