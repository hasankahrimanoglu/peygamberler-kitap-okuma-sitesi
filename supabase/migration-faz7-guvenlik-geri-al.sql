-- FAZ 7 GERİ ALMA — migration-faz7-guvenlik.sql'i tersine çevirir.
--
-- YALNIZ acil durumda çalıştırılır: eski, GÜVENSİZ duruma döner (giriş
-- yapmamış herkese açık kurallar geri gelir). Silinen çocuk kullanıcı adları
-- ve şifreleri geri GELMEZ; sütunlar boş olarak eklenir. Profil şifreleri,
-- veli PIN'leri ve bağlı cihazlar silinir.

begin;

-- Yeni kurallar
drop policy if exists "Veli bagli cihazlarini gorur" on public.cihaz_baglantilari;
drop policy if exists "Cihaz kendi baglantisini gorur" on public.cihaz_baglantilari;
drop policy if exists "Veli bagli cihazi kaldirir" on public.cihaz_baglantilari;
drop policy if exists "Anonim oturum profil eklemez" on public.profiles;
drop policy if exists "Anonim oturum profil degistirmez" on public.profiles;
drop policy if exists "Anonim oturum profil silmez" on public.profiles;
drop policy if exists "Bagli cihaz kendi profilini okur" on public.profiles;
drop policy if exists "Bagli cihaz ilerleme okur" on public.user_progress;
drop policy if exists "Bagli cihaz ilerleme ekler" on public.user_progress;
drop policy if exists "Bagli cihaz ilerleme gunceller" on public.user_progress;
drop policy if exists "Bagli cihaz gorev okur" on public.profile_tasks;
drop policy if exists "Bagli cihaz gorev ekler" on public.profile_tasks;
drop policy if exists "Bagli cihaz gorev gunceller" on public.profile_tasks;
drop policy if exists "Veli cocuk fotograflarini okur" on storage.objects;
drop policy if exists "Bagli cihaz cocugunun fotografini okur" on storage.objects;

-- Fonksiyonlar ve tablolar
drop function if exists public.cihazi_bagla(text, text);
drop function if exists public.eslesme_kodu_olustur(uuid);
drop function if exists public.profil_sifresi_ayarini_degistir(boolean);
drop function if exists public.cocuk_sifresi_dogrula(uuid, text);
drop function if exists public.cocuk_sifresi_belirle(uuid, text);
drop function if exists public.veli_pin_dogrula(text);
drop function if exists public.veli_pin_belirle(text);
drop function if exists public.aile_guvenlik_durumu();
drop function if exists public.veli_kimligi();

drop table if exists public.eslesme_denemeleri;
drop table if exists public.eslesme_kodlari;
drop table if exists public.cihaz_baglantilari;
drop table if exists public.profil_sifreleri;
drop table if exists public.veli_pinleri;
drop table if exists public.veli_ayarlari;

-- Eski sütunlar (boş)
alter table public.profiles add column if not exists child_username text;
alter table public.profiles add column if not exists child_password text;
create unique index if not exists profiles_child_username_unique
on public.profiles (child_username)
where child_username is not null;

-- Eski açık kurallar
create policy "Children can login with profile credentials"
on public.profiles for select
using (child_username is not null and child_password is not null);

create policy "Children can read own progress"
on public.user_progress for select
using (exists (select 1 from public.profiles where profiles.id = user_progress.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));
create policy "Children can insert own progress"
on public.user_progress for insert
with check (exists (select 1 from public.profiles where profiles.id = user_progress.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));
create policy "Children can update own progress"
on public.user_progress for update
using (exists (select 1 from public.profiles where profiles.id = user_progress.profile_id
  and profiles.child_username is not null and profiles.child_password is not null))
with check (exists (select 1 from public.profiles where profiles.id = user_progress.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));

create policy "Children can read own tasks"
on public.profile_tasks for select
using (exists (select 1 from public.profiles where profiles.id = profile_tasks.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));
create policy "Children can insert own tasks"
on public.profile_tasks for insert
with check (exists (select 1 from public.profiles where profiles.id = profile_tasks.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));
create policy "Children can update own tasks"
on public.profile_tasks for update
using (exists (select 1 from public.profiles where profiles.id = profile_tasks.profile_id
  and profiles.child_username is not null and profiles.child_password is not null))
with check (exists (select 1 from public.profiles where profiles.id = profile_tasks.profile_id
  and profiles.child_username is not null and profiles.child_password is not null));

-- Fotoğraf kovası eski hâline
update storage.buckets set public = true where id = 'profil-fotograflari';

drop policy if exists "Parents upload own child photos" on storage.objects;
create policy "Parents upload own child photos"
on storage.objects for insert to authenticated
with check (bucket_id = 'profil-fotograflari' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Parents update own child photos" on storage.objects;
create policy "Parents update own child photos"
on storage.objects for update to authenticated
using (bucket_id = 'profil-fotograflari' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'profil-fotograflari' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Parents delete own child photos" on storage.objects;
create policy "Parents delete own child photos"
on storage.objects for delete to authenticated
using (bucket_id = 'profil-fotograflari' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Child photos are readable" on storage.objects;
create policy "Child photos are readable"
on storage.objects for select
using (bucket_id = 'profil-fotograflari');

update public.profiles
set avatar_url = 'https://lotmtfpqxptlctrcipuq.supabase.co/storage/v1/object/public/profil-fotograflari/' || avatar_url
where avatar_url is not null and avatar_url not like 'http%';

drop function if exists public.anonim_oturum();

commit;
