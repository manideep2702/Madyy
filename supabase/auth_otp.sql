-- Pending OTP-based registrations table
-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists public.pending_registrations (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  otp_hash text not null,
  otp_salt text not null,
  expires_at timestamptz not null,
  attempts int not null default 0,
  full_name text null,
  phone text null,
  city text null,
  last_sent_at timestamptz null,
  created_at timestamptz not null default now()
);

-- RLS can remain enabled; service_role bypasses it.
alter table public.pending_registrations enable row level security;

-- No public policies; only service role should access this table.

