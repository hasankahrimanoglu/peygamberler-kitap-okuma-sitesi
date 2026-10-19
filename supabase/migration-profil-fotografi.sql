-- ÇOCUK PROFİLİ FOTOĞRAFI (PROJE-MODELI.md 6.1 / 7.1)
-- Supabase SQL Editor'de tek seferde çalıştırılır.
--
-- Neden ayrı bir sütun + depolama kovası:
-- `avatar_tipi` hazır avatar setinin anahtarıdır (avatar-1..avatar-10) ve
-- korunur. Veli fotoğraf yüklerse `avatar_url` dolar ve ekranlarda fotoğraf
-- öncelikli gösterilir; fotoğraf silinince alan boşalır, hazır avatara dönülür.
-- İki alan birbirini SİLMEZ — fotoğraf kaldırılınca eski avatar seçimi durur.

alter table public.profiles
add column if not exists avatar_url text;

-- FAZ 7 (19 Eki 2026): kova KAPALIDIR; fotoğraf imzalı adresle gösterilir.
-- Okuma kuralları (veli + bağlı cihaz) migration-faz7-guvenlik.sql içindedir.
-- Anahtar veli_id/profile_id (iki uuid).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profil-fotograflari',
  'profil-fotograflari',
  false,
  2097152, -- 2 MB; istemci zaten 512x512 JPEG'e küçültüp gönderiyor
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Yazma yetkisi yalnız velinin kendi klasöründe: {veli_id}/{profile_id}.jpg
drop policy if exists "Parents upload own child photos" on storage.objects;
create policy "Parents upload own child photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Parents update own child photos" on storage.objects;
create policy "Parents update own child photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Parents delete own child photos" on storage.objects;
create policy "Parents delete own child photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
);
