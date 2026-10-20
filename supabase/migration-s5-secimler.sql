-- S5 — "SEN OLSAYDIN" SEÇİMLERİNİN KALICI KAYDI (PROJE-MODELI S5 notu) — 20 Ekim 2026
--
-- Supabase SQL Editor'de TEK SEFERDE çalıştırılır; tek işlemdir. Geri alma:
-- migration-s5-secimler-geri-al.sql
--
-- Ne yapar:
--  - `sen_olsaydin_secimleri`: profil + kitap (katalog anahtarı, ör. "adem") +
--    bölüm no başına çocuğun İLK seçimi ve o anki içerikte değeri yaşatan şık
--    olup olmadığı. Kitap sonu veli özeti (high/mixed/low) bu orandan seçilir.
--  - Okuma ve ekleme: veli (`profiles.veli_id = auth.uid()`) ve o çocuğa bağlı
--    cihaz (`cihaz_baglantilari`) — Bölüm 8 deseni. Güncelleme ve silme kuralı
--    YOK: kayıt değişmez; profil silinince silinir. Tekrar okunan bölümde ilk
--    seçim kalır (istemci `on conflict do nothing` ile ekler).
--  - Giriş yapmamış istemci (anon) hiçbir şey göremez.
--
-- Veli tek tek seçimleri görmez: bu kural ekrandadır (rapor yalnız varyant
-- metnini gösterir); veritabanı yalnız aile sınırını korur.

begin;

create table if not exists public.sen_olsaydin_secimleri (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  kitap_anahtari text not null check (kitap_anahtari ~ '^[a-z0-9-]{2,40}$'),
  bolum_no int not null check (bolum_no between 1 and 50),
  secenek text not null check (secenek in ('a', 'b', 'c')),
  dogru boolean not null,
  secildi timestamptz not null default now(),
  primary key (profile_id, kitap_anahtari, bolum_no)
);

alter table public.sen_olsaydin_secimleri enable row level security;

revoke all on public.sen_olsaydin_secimleri from anon;
revoke update, delete, truncate on public.sen_olsaydin_secimleri from authenticated;

drop policy if exists "Veli cocugunun secimlerini okur" on public.sen_olsaydin_secimleri;
create policy "Veli cocugunun secimlerini okur"
on public.sen_olsaydin_secimleri for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = sen_olsaydin_secimleri.profile_id and p.veli_id = auth.uid()
  )
);

drop policy if exists "Veli cocugunun secimini ekler" on public.sen_olsaydin_secimleri;
create policy "Veli cocugunun secimini ekler"
on public.sen_olsaydin_secimleri for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = sen_olsaydin_secimleri.profile_id and p.veli_id = auth.uid()
  )
);

drop policy if exists "Bagli cihaz secimleri okur" on public.sen_olsaydin_secimleri;
create policy "Bagli cihaz secimleri okur"
on public.sen_olsaydin_secimleri for select
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = sen_olsaydin_secimleri.profile_id
  )
);

drop policy if exists "Bagli cihaz secim ekler" on public.sen_olsaydin_secimleri;
create policy "Bagli cihaz secim ekler"
on public.sen_olsaydin_secimleri for insert
to authenticated
with check (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = sen_olsaydin_secimleri.profile_id
  )
);

commit;
