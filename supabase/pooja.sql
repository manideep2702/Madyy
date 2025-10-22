-- Pooja Booking table and policies
-- Booking window: 2025-11-06 to 2026-01-07 (inclusive)
-- Sessions: '10:30 AM', '6:30 PM'

create table if not exists public."Pooja-Bookings" (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  date date not null,
  session text not null check (session in ('10:30 AM','6:30 PM')),
  user_id uuid null references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text null
);

-- Enforce booking window at the database layer as well
do $$
begin
  begin
    alter table public."Pooja-Bookings" drop constraint if exists pooja_date_window;
  exception when undefined_object then null; end;
  alter table public."Pooja-Bookings"
    add constraint pooja_date_window
    check (date between date '2025-11-06' and date '2026-01-07');
end $$;

alter table public."Pooja-Bookings" enable row level security;

do $$
begin
  create policy pooja_select_own on public."Pooja-Bookings"
    for select to authenticated using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$
begin
  create policy pooja_insert_own on public."Pooja-Bookings"
    for insert to authenticated with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$
begin
  create policy pooja_service_select on public."Pooja-Bookings"
    for select to service_role using (true);
exception when duplicate_object then null; end $$;
