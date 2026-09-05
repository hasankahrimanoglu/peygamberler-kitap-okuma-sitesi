create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  veli_id uuid not null references auth.users(id) on delete cascade,
  isim text not null,
  avatar_tipi text not null default 'lantern',
  unvan text,
  child_username text,
  child_password text,
  profile_limit int not null default 3,
  created_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists child_username text;

alter table public.profiles
add column if not exists child_password text;

-- Veli panelinden yüklenen çocuk fotoğrafının public URL'i. Boşsa ekranlar
-- `avatar_tipi`ndeki hazır avatara düşer. Depolama kovası ve politikaları
-- migration-profil-fotografi.sql içindedir.
alter table public.profiles
add column if not exists avatar_url text;

create unique index if not exists profiles_child_username_unique
on public.profiles (child_username)
where child_username is not null;

create table if not exists public.parent_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  package_name text,
  profile_limit int not null default 1,
  shopier_order_id text unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  isim text not null,
  aciklama text,
  sira int not null default 0,
  toplam_bolum int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Adem', 'İlk insan, ilk yolculuk', 1, 8
where not exists (
  select 1 from public.books
  where lower(isim) like '%adem%'
);

-- Hz. Şît kaynaklı içerikle yayına girdi (10 Ağu 2026); sırası katalogdaki
-- İlk İzler Vadisi düzenini izler (Âdem 1 → Şît 2 → İdrîs 3 → Nûh 4 …).
insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Şît', 'Emaneti büyüterek taşımak', 2, 4
where not exists (
  select 1 from public.books
  where lower(isim) like '%şît%' or lower(isim) like '%şit%' or lower(isim) like '%sit%'
);

-- Hz. İdrîs kaynaklı içerikle yayına girdi (12 Ağu 2026); bölge sırası 3.
-- Uygulama tarafı kitabı adından bulur (`normalizeBookName(isim).includes("idris")`),
-- bu yüzden `isim` alanı "Hz. İdrîs" olmak zorundadır. Satır yoksa okuma
-- ilerlemesi ve final madalyası KAYDEDİLEMEZ.
insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. İdrîs', 'Öğrenen ve öğreten bir ömür', 3, 4
where not exists (
  select 1 from public.books
  where lower(isim) like '%idrîs%' or lower(isim) like '%idris%' or lower(isim) like '%i̇drîs%'
);

insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Nuh', 'Sabır ve güven gemisi', 4, 5
where not exists (
  select 1 from public.books
  where lower(isim) like '%nuh%'
);

insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Ebû Bekir', 'Sadakat ve cömertlik durağı', 32, 10
where not exists (
  select 1 from public.books
  where lower(isim) like '%bekir%'
);

insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Ömer', 'Adalet kapısı', 33, 3
where not exists (
  select 1 from public.books
  where lower(isim) like '%ömer%' or lower(isim) like '%omer%'
);

insert into public.books (isim, aciklama, sira, toplam_bolum)
select 'Hz. Osman', 'Hayâ ve iyilik bahçesi', 34, 1
where not exists (
  select 1 from public.books
  where lower(isim) like '%osman%'
);

update public.books
set toplam_bolum = 8, sira = 1
where lower(isim) like '%adem%';

update public.books
set toplam_bolum = 4, sira = 2, aciklama = 'Emaneti büyüterek taşımak'
where lower(isim) like '%şît%' or lower(isim) like '%şit%' or lower(isim) like '%sit%';

update public.books
set toplam_bolum = 5, sira = 4
where lower(isim) like '%nuh%';

-- Dört Büyük Halife kitaplarının sırası KATALOGU izler (atlasCatalog.ts:
-- Dört Dost Meydanı bölgesi → Ebû Bekir 32, Ömer 33, Osman 34, Ali 35).
-- Bu satırlar eskiden 3-4-5'ti; peygamber kitapları eklendikçe İdrîs (3) ve
-- Nûh (4) ile ÇAKIŞTI. `sira` yalnız bir görüntüleme alanı değildir:
-- `derive.ts:kutuphaneListesi` bu alana göre sıralayıp zincirleme kilidi
-- kurar (her kitap bir öncekinin finali bitmeden açılmaz). Eşit `sira`
-- değerlerinde sıralama Postgres'in döndürdüğü satır sırasına kalır, yani
-- kütüphanedeki kitap sırası ve kilit zinciri sorgudan sorguya değişebilir.
update public.books
set toplam_bolum = 10, sira = 32
where lower(isim) like '%bekir%';

update public.books
set toplam_bolum = 3, sira = 33
where lower(isim) like '%ömer%' or lower(isim) like '%omer%';

update public.books
set toplam_bolum = 1, sira = 34
where lower(isim) like '%osman%';

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  chapter_id text,
  tamamlanan_bolum_sayisi int not null default 0,
  yuzde int not null default 0 check (yuzde >= 0 and yuzde <= 100),
  bitti_mi boolean not null default false,
  final_title text,
  final_score int,
  final_badge text,
  updated_at timestamptz not null default now(),
  unique(profile_id, book_id)
);

alter table public.user_progress
add column if not exists chapter_id text;

alter table public.user_progress
add column if not exists final_title text;

alter table public.user_progress
add column if not exists final_score int;

alter table public.user_progress
add column if not exists final_badge text;

create unique index if not exists user_progress_profile_book_unique
on public.user_progress (profile_id, book_id);

-- FAZ 6.1 — "Bugüne Taşı" görev durumu (PROJE-MODELI.md 7.3).
-- Görev TANIMLARI books.ts'te statiktir; burada yalnız çocuk-görev DURUMU tutulur.
-- RLS politikaları migration-profile-tasks.sql içindedir (user_progress deseni).
create table if not exists public.profile_tasks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  task_id text not null,
  status text not null default 'eklendi' check (status in ('eklendi', 'tamamlandi')),
  added_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(profile_id, task_id)
);

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.user_progress enable row level security;
alter table public.parent_subscriptions enable row level security;
alter table public.profile_tasks enable row level security;

drop policy if exists "Parents manage own child profiles" on public.profiles;
create policy "Parents manage own child profiles"
on public.profiles for all
using (auth.uid() = veli_id)
with check (auth.uid() = veli_id);

drop policy if exists "Children can login with profile credentials" on public.profiles;
create policy "Children can login with profile credentials"
on public.profiles for select
using (child_username is not null and child_password is not null);

drop policy if exists "Books are readable" on public.books;
create policy "Books are readable"
on public.books for select
using (true);

drop policy if exists "Parents read own subscription" on public.parent_subscriptions;
create policy "Parents read own subscription"
on public.parent_subscriptions for select
using (auth.uid() = user_id);

drop policy if exists "Parents manage own child progress" on public.user_progress;
create policy "Parents manage own child progress"
on public.user_progress for all
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.veli_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.veli_id = auth.uid()
  )
);

drop policy if exists "Children can read own progress" on public.user_progress;
create policy "Children can read own progress"
on public.user_progress for select
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.child_username is not null
      and profiles.child_password is not null
  )
);

drop policy if exists "Children can insert own progress" on public.user_progress;
create policy "Children can insert own progress"
on public.user_progress for insert
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.child_username is not null
      and profiles.child_password is not null
  )
);

drop policy if exists "Children can update own progress" on public.user_progress;
create policy "Children can update own progress"
on public.user_progress for update
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.child_username is not null
      and profiles.child_password is not null
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = user_progress.profile_id
      and profiles.child_username is not null
      and profiles.child_password is not null
  )
);
