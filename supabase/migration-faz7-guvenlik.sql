-- FAZ 7 — GÜVENLİK (PROJE-MODELI 3.11 ve Bölüm 8) — 19 Ekim 2026
--
-- Supabase SQL Editor'de TEK SEFERDE çalıştırılır; baştan sona tek işlemdir,
-- bir adım hata verirse hiçbir şey değişmez. Geri alma:
-- migration-faz7-guvenlik-geri-al.sql
--
-- Ne yapar:
--  1. Giriş yapmamış herkese açık yedi kuralı kaldırır (profiles,
--     user_progress, profile_tasks) ve fotoğraf kovasını kapatır.
--  2. Çocuk kullanıcı adı ve düz metin şifre sütunlarını siler (hesaplar
--     testtir — Hasan, 19 Eki 2026).
--  3. Aile ayarı, veli PIN'i, profil şifresi, eşleme kodu ve bağlı cihaz
--     tablolarını kurar. Gizli değerler kuralı olmayan tablolardadır; istemci
--     okuyamaz, yalnız aşağıdaki SECURITY DEFINER fonksiyonlar kullanır.
--  4. Bağlı cihazın (Supabase anonim oturumu) yalnız kendi çocuğunun verisine
--     erişmesini sağlayan kuralları ekler; anonim oturum veli işlemi yapamaz.
--
-- Uygulamadan sonra Supabase panelinde anonim oturum açılmalıdır
-- (Authentication → Sign In / Providers → "Allow anonymous sign-ins");
-- yalnız cihaz bağlama bunu kullanır.

begin;

-- ---------------------------------------------------------------------------
-- 0. Yardımcı: oturum anonim mi (bağlı çocuk cihazı)?
-- ---------------------------------------------------------------------------
create or replace function public.anonim_oturum()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false);
$$;

-- ---------------------------------------------------------------------------
-- 1. Herkese açık kuralları kaldır
-- ---------------------------------------------------------------------------
drop policy if exists "Children can login with profile credentials" on public.profiles;

drop policy if exists "Children can read own progress" on public.user_progress;
drop policy if exists "Children can insert own progress" on public.user_progress;
drop policy if exists "Children can update own progress" on public.user_progress;

drop policy if exists "Children can read own tasks" on public.profile_tasks;
drop policy if exists "Children can insert own tasks" on public.profile_tasks;
drop policy if exists "Children can update own tasks" on public.profile_tasks;

-- ---------------------------------------------------------------------------
-- 2. Çocuk kullanıcı adı / düz metin şifre
-- ---------------------------------------------------------------------------
drop index if exists public.profiles_child_username_unique;
alter table public.profiles drop column if exists child_username;
alter table public.profiles drop column if exists child_password;

-- ---------------------------------------------------------------------------
-- 3. Yeni tablolar
-- ---------------------------------------------------------------------------

-- Aile ayarı (yalnız fonksiyonlarla okunur/yazılır)
create table if not exists public.veli_ayarlari (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profil_sifresi_acik boolean not null default false,
  guncellendi timestamptz not null default now()
);

-- Gizli: veli PIN'i özeti
create table if not exists public.veli_pinleri (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pin_ozeti text not null,
  hatali_deneme int not null default 0,
  kilit_bitis timestamptz,
  guncellendi timestamptz not null default now()
);

-- Gizli: çocuk profil şifresi özeti
create table if not exists public.profil_sifreleri (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  sifre_ozeti text not null,
  hatali_deneme int not null default 0,
  kilit_bitis timestamptz,
  guncellendi timestamptz not null default now()
);

-- Bağlı cihaz ↔ çocuk (veli görür ve kaldırır, cihaz kendi satırını görür)
create table if not exists public.cihaz_baglantilari (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  veli_id uuid not null references auth.users(id) on delete cascade,
  cihaz_adi text,
  baglandi timestamptz not null default now()
);
create index if not exists cihaz_baglantilari_profile_idx on public.cihaz_baglantilari (profile_id);
create index if not exists cihaz_baglantilari_veli_idx on public.cihaz_baglantilari (veli_id);

-- Gizli: tek kullanımlık eşleme kodları (yalnız SHA-256 özeti saklanır)
create table if not exists public.eslesme_kodlari (
  kod_ozeti text primary key,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  veli_id uuid not null references auth.users(id) on delete cascade,
  bitis timestamptz not null,
  olusturuldu timestamptz not null default now()
);

-- Gizli: yanlış kod denemesi sayacı (cihaz başına)
create table if not exists public.eslesme_denemeleri (
  auth_user_id uuid primary key references auth.users(id) on delete cascade,
  hatali_deneme int not null default 0,
  kilit_bitis timestamptz
);

alter table public.veli_ayarlari enable row level security;
alter table public.veli_pinleri enable row level security;
alter table public.profil_sifreleri enable row level security;
alter table public.cihaz_baglantilari enable row level security;
alter table public.eslesme_kodlari enable row level security;
alter table public.eslesme_denemeleri enable row level security;

-- Gizli tablolara istemci hiç erişmez (kural yok + yetki yok).
revoke all on public.veli_ayarlari from anon, authenticated;
revoke all on public.veli_pinleri from anon, authenticated;
revoke all on public.profil_sifreleri from anon, authenticated;
revoke all on public.eslesme_kodlari from anon, authenticated;
revoke all on public.eslesme_denemeleri from anon, authenticated;
revoke all on public.cihaz_baglantilari from anon;
revoke insert, update on public.cihaz_baglantilari from authenticated;

drop policy if exists "Veli bagli cihazlarini gorur" on public.cihaz_baglantilari;
create policy "Veli bagli cihazlarini gorur"
on public.cihaz_baglantilari for select
to authenticated
using (veli_id = auth.uid() and not public.anonim_oturum());

drop policy if exists "Cihaz kendi baglantisini gorur" on public.cihaz_baglantilari;
create policy "Cihaz kendi baglantisini gorur"
on public.cihaz_baglantilari for select
to authenticated
using (auth_user_id = auth.uid());

drop policy if exists "Veli bagli cihazi kaldirir" on public.cihaz_baglantilari;
create policy "Veli bagli cihazi kaldirir"
on public.cihaz_baglantilari for delete
to authenticated
using (veli_id = auth.uid() and not public.anonim_oturum());

-- ---------------------------------------------------------------------------
-- 4. Bağlı cihaz kuralları + anonim oturuma veli işlemi kapalı
-- ---------------------------------------------------------------------------

-- profiles: anonim oturum profil ekleyemez/değiştiremez/silemez
drop policy if exists "Anonim oturum profil eklemez" on public.profiles;
create policy "Anonim oturum profil eklemez"
on public.profiles as restrictive for insert
to authenticated
with check (not public.anonim_oturum());

drop policy if exists "Anonim oturum profil degistirmez" on public.profiles;
create policy "Anonim oturum profil degistirmez"
on public.profiles as restrictive for update
to authenticated
using (not public.anonim_oturum())
with check (not public.anonim_oturum());

drop policy if exists "Anonim oturum profil silmez" on public.profiles;
create policy "Anonim oturum profil silmez"
on public.profiles as restrictive for delete
to authenticated
using (not public.anonim_oturum());

drop policy if exists "Bagli cihaz kendi profilini okur" on public.profiles;
create policy "Bagli cihaz kendi profilini okur"
on public.profiles for select
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = profiles.id
  )
);

-- user_progress: bağlı cihaz yalnız kendi çocuğunun ilerlemesi
drop policy if exists "Bagli cihaz ilerleme okur" on public.user_progress;
create policy "Bagli cihaz ilerleme okur"
on public.user_progress for select
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = user_progress.profile_id
  )
);

drop policy if exists "Bagli cihaz ilerleme ekler" on public.user_progress;
create policy "Bagli cihaz ilerleme ekler"
on public.user_progress for insert
to authenticated
with check (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = user_progress.profile_id
  )
);

drop policy if exists "Bagli cihaz ilerleme gunceller" on public.user_progress;
create policy "Bagli cihaz ilerleme gunceller"
on public.user_progress for update
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = user_progress.profile_id
  )
)
with check (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = user_progress.profile_id
  )
);

-- profile_tasks: bağlı cihaz yalnız kendi çocuğunun görevleri
drop policy if exists "Bagli cihaz gorev okur" on public.profile_tasks;
create policy "Bagli cihaz gorev okur"
on public.profile_tasks for select
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = profile_tasks.profile_id
  )
);

drop policy if exists "Bagli cihaz gorev ekler" on public.profile_tasks;
create policy "Bagli cihaz gorev ekler"
on public.profile_tasks for insert
to authenticated
with check (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = profile_tasks.profile_id
  )
);

drop policy if exists "Bagli cihaz gorev gunceller" on public.profile_tasks;
create policy "Bagli cihaz gorev gunceller"
on public.profile_tasks for update
to authenticated
using (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = profile_tasks.profile_id
  )
)
with check (
  exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid() and b.profile_id = profile_tasks.profile_id
  )
);

-- ---------------------------------------------------------------------------
-- 5. Fotoğraf kovası kapanır; imzalı adres için okuma yalnız sahibine
-- ---------------------------------------------------------------------------
update storage.buckets set public = false where id = 'profil-fotograflari';

drop policy if exists "Child photos are readable" on storage.objects;

drop policy if exists "Veli cocuk fotograflarini okur" on storage.objects;
create policy "Veli cocuk fotograflarini okur"
on storage.objects for select
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
  and not public.anonim_oturum()
);

drop policy if exists "Bagli cihaz cocugunun fotografini okur" on storage.objects;
create policy "Bagli cihaz cocugunun fotografini okur"
on storage.objects for select
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and exists (
    select 1 from public.cihaz_baglantilari b
    where b.auth_user_id = auth.uid()
      and (storage.foldername(name))[1] = b.veli_id::text
      and storage.filename(name) = b.profile_id::text || '.jpg'
  )
);

-- Yazma kuralları aynı kalır, yalnız anonim oturuma kapanır.
drop policy if exists "Parents upload own child photos" on storage.objects;
create policy "Parents upload own child photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
  and not public.anonim_oturum()
);

drop policy if exists "Parents update own child photos" on storage.objects;
create policy "Parents update own child photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
  and not public.anonim_oturum()
)
with check (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
  and not public.anonim_oturum()
);

drop policy if exists "Parents delete own child photos" on storage.objects;
create policy "Parents delete own child photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'profil-fotograflari'
  and (storage.foldername(name))[1] = auth.uid()::text
  and not public.anonim_oturum()
);

-- avatar_url artık public adres değil, kovadaki yol: {veli_id}/{profil_id}.jpg?v=…
update public.profiles
set avatar_url = regexp_replace(avatar_url, '^.*/storage/v1/object/public/profil-fotograflari/', '')
where avatar_url like '%/storage/v1/object/public/profil-fotograflari/%';

-- ---------------------------------------------------------------------------
-- 6. Fonksiyonlar (şifreler bcrypt; istemci yalnız sonucu görür)
-- ---------------------------------------------------------------------------

-- Velinin kimliği; anonim oturumda ya da girişsiz çağrıda hata.
create or replace function public.veli_kimligi()
returns uuid
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or public.anonim_oturum() then
    raise exception 'yetki_yok';
  end if;
  return auth.uid();
end;
$$;

-- Ayarlar ve "Kim okuyor?" için tek çağrı.
create or replace function public.aile_guvenlik_durumu()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
begin
  return jsonb_build_object(
    'profil_sifresi_acik',
      coalesce((select a.profil_sifresi_acik from public.veli_ayarlari a where a.user_id = v_veli), false),
    'veli_pin_var',
      exists (select 1 from public.veli_pinleri p where p.user_id = v_veli),
    'sifresi_olan_profiller',
      coalesce((
        select jsonb_agg(s.profile_id)
        from public.profil_sifreleri s
        join public.profiles pr on pr.id = s.profile_id
        where pr.veli_id = v_veli
      ), '[]'::jsonb)
  );
end;
$$;

-- Veli PIN'i belirle/değiştir. Dönüş: tamam | gecersiz | cocuk_sifresiyle_ayni
create or replace function public.veli_pin_belirle(p_pin text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
begin
  if p_pin is null or p_pin !~ '^[0-9]{4}$' then
    return 'gecersiz';
  end if;

  if exists (
    select 1
    from public.profil_sifreleri s
    join public.profiles pr on pr.id = s.profile_id
    where pr.veli_id = v_veli
      and extensions.crypt(p_pin, s.sifre_ozeti) = s.sifre_ozeti
  ) then
    return 'cocuk_sifresiyle_ayni';
  end if;

  insert into public.veli_pinleri (user_id, pin_ozeti)
  values (v_veli, extensions.crypt(p_pin, extensions.gen_salt('bf')))
  on conflict (user_id) do update
    set pin_ozeti = excluded.pin_ozeti,
        hatali_deneme = 0,
        kilit_bitis = null,
        guncellendi = now();

  return 'tamam';
end;
$$;

-- Veli PIN'ini doğrula. Dönüş: {durum: dogru|yanlis|kilitli|yok, kalan_saniye}
-- 5 yanlış denemede 5 dakika bekleme.
create or replace function public.veli_pin_dogrula(p_pin text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
  v_kayit public.veli_pinleri%rowtype;
begin
  select * into v_kayit from public.veli_pinleri where user_id = v_veli for update;
  if not found then
    return jsonb_build_object('durum', 'yok');
  end if;

  if v_kayit.kilit_bitis is not null and v_kayit.kilit_bitis > now() then
    return jsonb_build_object('durum', 'kilitli',
      'kalan_saniye', ceil(extract(epoch from v_kayit.kilit_bitis - now())));
  end if;

  if p_pin is not null and extensions.crypt(p_pin, v_kayit.pin_ozeti) = v_kayit.pin_ozeti then
    update public.veli_pinleri set hatali_deneme = 0, kilit_bitis = null where user_id = v_veli;
    return jsonb_build_object('durum', 'dogru');
  end if;

  if v_kayit.hatali_deneme + 1 >= 5 then
    update public.veli_pinleri
    set hatali_deneme = 0, kilit_bitis = now() + interval '5 minutes'
    where user_id = v_veli;
    return jsonb_build_object('durum', 'kilitli', 'kalan_saniye', 300);
  end if;

  update public.veli_pinleri set hatali_deneme = hatali_deneme + 1 where user_id = v_veli;
  return jsonb_build_object('durum', 'yanlis');
end;
$$;

-- Çocuğun profil şifresi. Dönüş: tamam | gecersiz | veli_pin_ile_ayni | kardes_sifresiyle_ayni
-- Kardeşlerin şifresi de farklı olmalı; yoksa biri ötekinin profiline kendi
-- şifresiyle girerdi.
create or replace function public.cocuk_sifresi_belirle(p_profil uuid, p_sifre text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
begin
  if not exists (select 1 from public.profiles where id = p_profil and veli_id = v_veli) then
    raise exception 'yetki_yok';
  end if;

  if p_sifre is null or p_sifre !~ '^[0-9]{4}$' then
    return 'gecersiz';
  end if;

  if exists (
    select 1 from public.veli_pinleri p
    where p.user_id = v_veli and extensions.crypt(p_sifre, p.pin_ozeti) = p.pin_ozeti
  ) then
    return 'veli_pin_ile_ayni';
  end if;

  if exists (
    select 1
    from public.profil_sifreleri s
    join public.profiles pr on pr.id = s.profile_id
    where pr.veli_id = v_veli
      and s.profile_id <> p_profil
      and extensions.crypt(p_sifre, s.sifre_ozeti) = s.sifre_ozeti
  ) then
    return 'kardes_sifresiyle_ayni';
  end if;

  insert into public.profil_sifreleri (profile_id, sifre_ozeti)
  values (p_profil, extensions.crypt(p_sifre, extensions.gen_salt('bf')))
  on conflict (profile_id) do update
    set sifre_ozeti = excluded.sifre_ozeti,
        hatali_deneme = 0,
        kilit_bitis = null,
        guncellendi = now();

  return 'tamam';
end;
$$;

-- Ortak cihazda profil şifresini doğrula (oturum velinindir).
-- Dönüş: {durum: dogru|yanlis|kilitli|yok, kalan_saniye}. 5 yanlışta 5 dakika.
create or replace function public.cocuk_sifresi_dogrula(p_profil uuid, p_sifre text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
  v_kayit public.profil_sifreleri%rowtype;
begin
  if not exists (select 1 from public.profiles where id = p_profil and veli_id = v_veli) then
    raise exception 'yetki_yok';
  end if;

  select * into v_kayit from public.profil_sifreleri where profile_id = p_profil for update;
  if not found then
    return jsonb_build_object('durum', 'yok');
  end if;

  if v_kayit.kilit_bitis is not null and v_kayit.kilit_bitis > now() then
    return jsonb_build_object('durum', 'kilitli',
      'kalan_saniye', ceil(extract(epoch from v_kayit.kilit_bitis - now())));
  end if;

  if p_sifre is not null and extensions.crypt(p_sifre, v_kayit.sifre_ozeti) = v_kayit.sifre_ozeti then
    update public.profil_sifreleri set hatali_deneme = 0, kilit_bitis = null where profile_id = p_profil;
    return jsonb_build_object('durum', 'dogru');
  end if;

  if v_kayit.hatali_deneme + 1 >= 5 then
    update public.profil_sifreleri
    set hatali_deneme = 0, kilit_bitis = now() + interval '5 minutes'
    where profile_id = p_profil;
    return jsonb_build_object('durum', 'kilitli', 'kalan_saniye', 300);
  end if;

  update public.profil_sifreleri set hatali_deneme = hatali_deneme + 1 where profile_id = p_profil;
  return jsonb_build_object('durum', 'yanlis');
end;
$$;

-- Aile ayarı. Şifresi olmayan çocuk varken açılamaz. Dönüş: tamam | eksik_sifre
create or replace function public.profil_sifresi_ayarini_degistir(p_acik boolean)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
begin
  if p_acik and exists (
    select 1 from public.profiles pr
    where pr.veli_id = v_veli
      and not exists (select 1 from public.profil_sifreleri s where s.profile_id = pr.id)
  ) then
    return 'eksik_sifre';
  end if;

  insert into public.veli_ayarlari (user_id, profil_sifresi_acik)
  values (v_veli, coalesce(p_acik, false))
  on conflict (user_id) do update
    set profil_sifresi_acik = excluded.profil_sifresi_acik,
        guncellendi = now();

  return 'tamam';
end;
$$;

-- Eşleme kodu üret: 6 rakam, 10 dakika, tek kullanımlık. Dönüş: {kod, bitis}
create or replace function public.eslesme_kodu_olustur(p_profil uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_veli uuid := public.veli_kimligi();
  v_kod text;
  v_bitis timestamptz := now() + interval '10 minutes';
  v_deneme int := 0;
begin
  if not exists (select 1 from public.profiles where id = p_profil and veli_id = v_veli) then
    raise exception 'yetki_yok';
  end if;

  delete from public.eslesme_kodlari where profile_id = p_profil or bitis < now();

  loop
    v_deneme := v_deneme + 1;
    v_kod := lpad(
      (('x' || encode(extensions.gen_random_bytes(4), 'hex'))::bit(32)::bigint % 1000000)::text,
      6, '0');
    begin
      insert into public.eslesme_kodlari (kod_ozeti, profile_id, veli_id, bitis)
      values (encode(extensions.digest(v_kod, 'sha256'), 'hex'), p_profil, v_veli, v_bitis);
      exit;
    exception when unique_violation then
      if v_deneme >= 5 then
        raise;
      end if;
    end;
  end loop;

  return jsonb_build_object('kod', v_kod, 'bitis', v_bitis);
end;
$$;

-- Çocuk cihazını bağla (oturum anonim olmalı).
-- Dönüş: {durum: tamam|yanlis|kilitli|veli_oturumu, profile_id, isim, kalan_saniye}
-- 5 yanlış kodda 15 dakika bekleme.
create or replace function public.cihazi_bagla(p_kod text, p_cihaz_adi text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cihaz uuid := auth.uid();
  v_deneme public.eslesme_denemeleri%rowtype;
  v_kod public.eslesme_kodlari%rowtype;
  v_isim text;
begin
  if v_cihaz is null then
    raise exception 'yetki_yok';
  end if;
  if not public.anonim_oturum() then
    return jsonb_build_object('durum', 'veli_oturumu');
  end if;

  insert into public.eslesme_denemeleri (auth_user_id) values (v_cihaz)
  on conflict (auth_user_id) do nothing;
  select * into v_deneme from public.eslesme_denemeleri where auth_user_id = v_cihaz for update;

  if v_deneme.kilit_bitis is not null and v_deneme.kilit_bitis > now() then
    return jsonb_build_object('durum', 'kilitli',
      'kalan_saniye', ceil(extract(epoch from v_deneme.kilit_bitis - now())));
  end if;

  select * into v_kod
  from public.eslesme_kodlari
  where kod_ozeti = encode(extensions.digest(coalesce(p_kod, ''), 'sha256'), 'hex')
    and bitis > now()
  for update;

  if not found then
    if v_deneme.hatali_deneme + 1 >= 5 then
      update public.eslesme_denemeleri
      set hatali_deneme = 0, kilit_bitis = now() + interval '15 minutes'
      where auth_user_id = v_cihaz;
      return jsonb_build_object('durum', 'kilitli', 'kalan_saniye', 900);
    end if;
    update public.eslesme_denemeleri set hatali_deneme = hatali_deneme + 1 where auth_user_id = v_cihaz;
    return jsonb_build_object('durum', 'yanlis');
  end if;

  insert into public.cihaz_baglantilari (auth_user_id, profile_id, veli_id, cihaz_adi)
  values (v_cihaz, v_kod.profile_id, v_kod.veli_id, left(nullif(trim(p_cihaz_adi), ''), 60))
  on conflict (auth_user_id) do update
    set profile_id = excluded.profile_id,
        veli_id = excluded.veli_id,
        cihaz_adi = excluded.cihaz_adi,
        baglandi = now();

  delete from public.eslesme_kodlari where kod_ozeti = v_kod.kod_ozeti;
  update public.eslesme_denemeleri set hatali_deneme = 0, kilit_bitis = null where auth_user_id = v_cihaz;

  select isim into v_isim from public.profiles where id = v_kod.profile_id;
  return jsonb_build_object('durum', 'tamam', 'profile_id', v_kod.profile_id, 'isim', v_isim);
end;
$$;

-- Fonksiyonlar yalnız oturum açmış (veli ya da bağlı cihaz) istemciye açık.
revoke all on function public.anonim_oturum() from public;
revoke all on function public.veli_kimligi() from public;
revoke all on function public.aile_guvenlik_durumu() from public;
revoke all on function public.veli_pin_belirle(text) from public;
revoke all on function public.veli_pin_dogrula(text) from public;
revoke all on function public.cocuk_sifresi_belirle(uuid, text) from public;
revoke all on function public.cocuk_sifresi_dogrula(uuid, text) from public;
revoke all on function public.profil_sifresi_ayarini_degistir(boolean) from public;
revoke all on function public.eslesme_kodu_olustur(uuid) from public;
revoke all on function public.cihazi_bagla(text, text) from public;

-- Supabase'in varsayılan yetkileri yeni fonksiyonu anon'a da doğrudan açar;
-- "from public" bunu kapatmaz.
revoke all on function public.anonim_oturum() from anon;
revoke all on function public.veli_kimligi() from anon;
revoke all on function public.aile_guvenlik_durumu() from anon;
revoke all on function public.veli_pin_belirle(text) from anon;
revoke all on function public.veli_pin_dogrula(text) from anon;
revoke all on function public.cocuk_sifresi_belirle(uuid, text) from anon;
revoke all on function public.cocuk_sifresi_dogrula(uuid, text) from anon;
revoke all on function public.profil_sifresi_ayarini_degistir(boolean) from anon;
revoke all on function public.eslesme_kodu_olustur(uuid) from anon;
revoke all on function public.cihazi_bagla(text, text) from anon;

grant execute on function public.anonim_oturum() to authenticated;
grant execute on function public.veli_kimligi() to authenticated;
grant execute on function public.aile_guvenlik_durumu() to authenticated;
grant execute on function public.veli_pin_belirle(text) to authenticated;
grant execute on function public.veli_pin_dogrula(text) to authenticated;
grant execute on function public.cocuk_sifresi_belirle(uuid, text) to authenticated;
grant execute on function public.cocuk_sifresi_dogrula(uuid, text) to authenticated;
grant execute on function public.profil_sifresi_ayarini_degistir(boolean) to authenticated;
grant execute on function public.eslesme_kodu_olustur(uuid) to authenticated;
grant execute on function public.cihazi_bagla(text, text) to authenticated;

commit;
