-- Create donations table and minimal policies
-- Run this in Supabase SQL editor for your project.

create extension if not exists pgcrypto;

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  address text,
  amount integer not null check (amount > 0),
  storage_bucket text,
  storage_path text,
  status text not null default 'submitted'
);

-- Enable RLS and add a simple admin-only policy (adjust as needed)
alter table public.donations enable row level security;

-- Allow service role (your backend) to do anything via service key (bypasses RLS).
-- Optional: Allow authenticated users to view their own donations if you also store user_id
-- Example:
-- alter table public.donations add column user_id uuid;
-- create policy "users can view own donations" on public.donations
--   for select using (auth.uid() = user_id);

-- Storage bucket for donation screenshots (run via dashboard or REST)
-- In code, we attempt to create bucket 'donations' if missing.

