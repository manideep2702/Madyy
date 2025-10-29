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
  -- Payment screenshot storage reference
  storage_bucket text,
  storage_path text,
  -- PAN card storage reference
  pan_bucket text,
  pan_path text,
  -- Optional metadata
  submitted_ip text,
  user_agent text,
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

-- Upgrades for existing tables (safe to re-run)
do $$ begin
  alter table public.donations add column if not exists pan_bucket text;
  alter table public.donations add column if not exists pan_path text;
  alter table public.donations add column if not exists submitted_ip text;
  alter table public.donations add column if not exists user_agent text;
exception when others then null; end $$;
