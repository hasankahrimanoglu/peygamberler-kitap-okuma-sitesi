-- FAZ 6.1 — "Bugüne Taşı" görev durumu (PROJE-MODELI.md 7.3)
-- Görev TANIMLARI books.ts'te statiktir; bu tablo yalnızca çocuk-görev
-- DURUM ilişkisini tutar. Supabase SQL Editor'de tek seferde çalıştırılır.
--
-- FAZ 7 (19 Eki 2026): çocuk için açık kurallar bu dosyadan çıkarıldı; bağlı
-- cihaz kuralları migration-faz7-guvenlik.sql içindedir. Veli kuralı aynen kalır.

create table if not exists public.profile_tasks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  task_id text not null,
  status text not null default 'eklendi' check (status in ('eklendi', 'tamamlandi')),
  added_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(profile_id, task_id)
);

alter table public.profile_tasks enable row level security;

-- Veli: yalnızca kendi çocuklarının görev durumunu okur/yönetir.
drop policy if exists "Parents manage own children tasks" on public.profile_tasks;
create policy "Parents manage own children tasks"
on public.profile_tasks for all
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = profile_tasks.profile_id
      and profiles.veli_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = profile_tasks.profile_id
      and profiles.veli_id = auth.uid()
  )
);
