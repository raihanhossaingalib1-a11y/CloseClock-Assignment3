-- Paste into Supabase SQL Editor > New query > Run.
-- Only the Python backend accesses this table using a SERVER-SIDE key.
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  firebase_uid text not null,
  text text not null,
  priority text not null default 'Medium',
  category text not null default 'Study',
  deadline date,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists tasks_firebase_uid_idx on public.tasks(firebase_uid);
alter table public.tasks enable row level security;
-- No client-side policies. The service role is SERVER ONLY and bypasses RLS.
