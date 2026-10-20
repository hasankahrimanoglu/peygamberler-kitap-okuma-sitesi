-- FAZ 7, 3. ADIM — SATIN ALMA VE İLK GİRİŞ (PROJE-MODELI Bölüm 8) — 20 Ekim 2026
--
-- Supabase SQL Editor'de TEK SEFERDE çalıştırılır; tek işlemdir, bir adım hata
-- verirse hiçbir şey değişmez. Geri alma: migration-faz7-satin-alma-geri-al.sql
--
-- Ne yapar:
--  1. `siparisler`: her ödeme kaynağının (Shopier, ileride iyzico/PayTR, elden
--     satış) siparişleri. (kaynak, siparis_no) tekildir: aynı bildirim iki kez
--     gelirse ikincisi hiçbir şey yapmaz. Yarıda kalan sipariş yeniden denenir.
--  2. `sifre_istekleri`: "Şifremi unuttum" sınırı (adres başına dakikada 1,
--     saatte 5; bağlantı noktası başına saatte 20). E-posta ve IP yalnız özet
--     (sha256) olarak, bir gün tutulur.
--  3. `yoneticiler`: yönetim sayfasına (`/yonetim`, elden satış) girebilen
--     e-postalar.
--  4. Yalnız sunucunun (service_role) çağırabildiği fonksiyonlar: siparişi
--     kaydedip üstlenme, veliyi e-postayla bulma, aboneliği güncelleme (profil
--     hakkı küçülmez), şifre isteği sınırı.
--
-- Yeni tablolarda RLS açık, kural yok: tarayıcı (anon/authenticated) hiçbirini
-- okuyamaz. Mevcut tablolara (parent_subscriptions dahil) şema değişikliği yok;
-- `parent_subscriptions.shopier_order_id` artık yazılmaz, sipariş geçmişi
-- `siparisler`'dedir.

begin;

-- ---------------------------------------------------------------------------
-- 1. Siparişler
-- ---------------------------------------------------------------------------
create table if not exists public.siparisler (
  id uuid primary key default gen_random_uuid(),
  kaynak text not null check (kaynak in ('shopier', 'iyzico', 'paytr', 'elden')),
  siparis_no text not null,
  eposta text not null,
  profil_hakki int not null check (profil_hakki between 1 and 20),
  test boolean not null default false,
  durum text not null default 'alindi'
    check (durum in ('alindi', 'isleniyor', 'islendi', 'hata', 'test')),
  veli_id uuid references auth.users(id) on delete set null,
  eposta_gonderildi boolean not null default false,
  not_metni text,
  hata text,
  olusturuldu timestamptz not null default now(),
  guncellendi timestamptz not null default now(),
  unique (kaynak, siparis_no)
);
create index if not exists siparisler_eposta_idx on public.siparisler (eposta);
create index if not exists siparisler_olusturuldu_idx on public.siparisler (olusturuldu desc);

-- ---------------------------------------------------------------------------
-- 2. Şifre isteği sınırı
-- ---------------------------------------------------------------------------
create table if not exists public.sifre_istekleri (
  id bigint generated always as identity primary key,
  eposta_ozeti text not null,
  ip_ozeti text,
  zaman timestamptz not null default now()
);
create index if not exists sifre_istekleri_eposta_idx on public.sifre_istekleri (eposta_ozeti, zaman);
create index if not exists sifre_istekleri_ip_idx on public.sifre_istekleri (ip_ozeti, zaman);

-- ---------------------------------------------------------------------------
-- 3. Yöneticiler
-- ---------------------------------------------------------------------------
create table if not exists public.yoneticiler (
  eposta text primary key check (eposta = lower(eposta)),
  eklendi timestamptz not null default now()
);
insert into public.yoneticiler (eposta)
values ('hasankahrimanoglu@gmail.com'), ('peygamberlerkesifdunyasi@gmail.com')
on conflict (eposta) do nothing;

alter table public.siparisler enable row level security;
alter table public.sifre_istekleri enable row level security;
alter table public.yoneticiler enable row level security;

revoke all on public.siparisler from anon, authenticated;
revoke all on public.sifre_istekleri from anon, authenticated;
revoke all on public.yoneticiler from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. Fonksiyonlar (yalnız service_role)
-- ---------------------------------------------------------------------------

-- Siparişi kaydeder ve işlemeyi üstlenir. Dönüş:
--   {id, islenecek: true, eposta, profil_hakki}  → bu çağrı işler
--   {id, islenecek: false, durum}                → işlenmiş, işleniyor ya da test
-- Yeni, hata almış ya da 5 dakikadır "işleniyor"da takılı sipariş üstlenilir.
-- Tekrar gelen bildirimde ilk kaydın e-postası ve profil hakkı geçerlidir.
create or replace function public.siparis_kaydet(
  p_kaynak text,
  p_siparis_no text,
  p_eposta text,
  p_profil int,
  p_test boolean default false,
  p_not text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_kayit public.siparisler%rowtype;
begin
  insert into public.siparisler (kaynak, siparis_no, eposta, profil_hakki, test, durum, not_metni)
  values (
    p_kaynak,
    p_siparis_no,
    lower(trim(p_eposta)),
    p_profil,
    coalesce(p_test, false),
    case when coalesce(p_test, false) then 'test' else 'alindi' end,
    p_not
  )
  on conflict (kaynak, siparis_no) do nothing;

  update public.siparisler
     set durum = 'isleniyor', guncellendi = now()
   where kaynak = p_kaynak
     and siparis_no = p_siparis_no
     and (durum in ('alindi', 'hata')
          or (durum = 'isleniyor' and guncellendi < now() - interval '5 minutes'))
  returning * into v_kayit;

  if found then
    return jsonb_build_object(
      'id', v_kayit.id,
      'islenecek', true,
      'eposta', v_kayit.eposta,
      'profil_hakki', v_kayit.profil_hakki
    );
  end if;

  select * into v_kayit from public.siparisler where kaynak = p_kaynak and siparis_no = p_siparis_no;
  return jsonb_build_object('id', v_kayit.id, 'islenecek', false, 'durum', v_kayit.durum);
end;
$$;

-- Veliyi e-postayla bulur (anonim cihaz oturumları hariç). Dönüş:
--   {veli_id: uuid | null, sifre_var: boolean}
-- Kullanıcı listesini sayfa sayfa taramanın (1.000 kayıt sınırı) yerine geçer.
create or replace function public.veli_bul(p_eposta text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select jsonb_build_object(
              'veli_id', u.id,
              'sifre_var', coalesce(u.encrypted_password, '') <> '')
       from auth.users u
      where lower(u.email) = lower(trim(p_eposta))
        and not coalesce(u.is_anonymous, false)
      limit 1),
    jsonb_build_object('veli_id', null, 'sifre_var', false)
  );
$$;

-- Aboneliği açar ya da günceller. Profil hakkı küçülmez: eskisiyle yeninin
-- büyüğü (KARAR 20 Eki 2026, Hasan). Dönüş: {onceki: int | null, profil_hakki}
create or replace function public.abonelik_guncelle(p_veli uuid, p_eposta text, p_profil int)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_onceki int;
  v_yeni int;
begin
  select profile_limit into v_onceki from public.parent_subscriptions where user_id = p_veli;

  insert into public.parent_subscriptions (user_id, email, package_name, profile_limit, status)
  values (p_veli, lower(trim(p_eposta)), p_profil || ' Kullanıcılı Paket', p_profil, 'active')
  on conflict (user_id) do update
    set profile_limit = greatest(public.parent_subscriptions.profile_limit, excluded.profile_limit),
        package_name = greatest(public.parent_subscriptions.profile_limit, excluded.profile_limit)
                       || ' Kullanıcılı Paket',
        status = 'active'
  returning profile_limit into v_yeni;

  return jsonb_build_object('onceki', v_onceki, 'profil_hakki', v_yeni);
end;
$$;

-- "Şifremi unuttum" sınırı: izin varsa isteği kaydeder ve true döner.
-- Adres başına dakikada 1, saatte 5; bağlantı noktası başına saatte 20.
create or replace function public.sifre_istegi_izinli(p_eposta_ozeti text, p_ip_ozeti text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.sifre_istekleri where zaman < now() - interval '1 day';

  if exists (
       select 1 from public.sifre_istekleri
        where eposta_ozeti = p_eposta_ozeti and zaman > now() - interval '1 minute')
     or (select count(*) from public.sifre_istekleri
          where eposta_ozeti = p_eposta_ozeti and zaman > now() - interval '1 hour') >= 5
     or (p_ip_ozeti is not null
         and (select count(*) from public.sifre_istekleri
               where ip_ozeti = p_ip_ozeti and zaman > now() - interval '1 hour') >= 20)
  then
    return false;
  end if;

  insert into public.sifre_istekleri (eposta_ozeti, ip_ozeti) values (p_eposta_ozeti, p_ip_ozeti);
  return true;
end;
$$;

revoke all on function public.siparis_kaydet(text, text, text, int, boolean, text) from public, anon, authenticated;
revoke all on function public.veli_bul(text) from public, anon, authenticated;
revoke all on function public.abonelik_guncelle(uuid, text, int) from public, anon, authenticated;
revoke all on function public.sifre_istegi_izinli(text, text) from public, anon, authenticated;

grant execute on function public.siparis_kaydet(text, text, text, int, boolean, text) to service_role;
grant execute on function public.veli_bul(text) to service_role;
grant execute on function public.abonelik_guncelle(uuid, text, int) to service_role;
grant execute on function public.sifre_istegi_izinli(text, text) to service_role;

commit;
