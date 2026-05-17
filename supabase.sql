create table if not exists public.workout_history (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  finished_at timestamptz,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workout_history enable row level security;

drop policy if exists "Users can read own workout history" on public.workout_history;
create policy "Users can read own workout history"
on public.workout_history
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own workout history" on public.workout_history;
create policy "Users can insert own workout history"
on public.workout_history
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own workout history" on public.workout_history;
create policy "Users can update own workout history"
on public.workout_history
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists workout_history_user_started_idx
on public.workout_history (user_id, started_at desc);
