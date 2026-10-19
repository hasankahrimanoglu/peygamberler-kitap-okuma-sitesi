-- FAZ 7, 3. ADIM — GERİ ALMA (migration-faz7-satin-alma.sql)
--
-- Siparişler, şifre istekleri ve yöneticiler tabloları ile dört fonksiyonu
-- siler. Sipariş geçmişi silinir; veli hesapları ve abonelikler
-- (parent_subscriptions) korunur.

begin;

drop function if exists public.sifre_istegi_izinli(text, text);
drop function if exists public.abonelik_guncelle(uuid, text, int);
drop function if exists public.veli_bul(text);
drop function if exists public.siparis_kaydet(text, text, text, int, boolean, text);

drop table if exists public.yoneticiler;
drop table if exists public.sifre_istekleri;
drop table if exists public.siparisler;

commit;
