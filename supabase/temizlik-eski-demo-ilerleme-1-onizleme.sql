-- ESKİ DEMO İLERLEME KAYITLARI — 1. ADIM: ÖNİZLEME (12 Ekim 2026)
--
-- Temmuz 2026 demolarından (eski site: Hz. Nuh, Hz. Ebû Bekir, Hz. Ömer…)
-- kalan okuma ilerlemeleri, yayında olmayan kitaplar için madalya ve unvan
-- sayıyordu. Bu betik HİÇBİR ŞEY SİLMEZ; yalnız neyin silineceğini gösterir.
--
-- Not: Postgres "İ" harfini küçültürken "i̇" (noktalı i + birleşik nokta) üretir;
-- bu yüzden İdrîs "drîs" / "dris" ile aranır. "idris" ile aransaydı Hz. İdrîs
-- ilerlemesi de silinecekti (12 Eki 2026 önizlemesinde yakalandı).
--
-- Supabase SQL Editor'de çalıştır ve tabloya bak:
--   KORUNACAK → yayındaki kitaplar (Hz. Âdem, Hz. Şît, Hz. İdrîs)
--   SİLİNECEK → yalnız eski demo kitaplar olmalı
-- Sonuç doğruysa 2. adımı (…-2-sil.sql) çalıştır.

select
  b.isim,
  case
    when lower(b.isim) like '%adem%'
      or lower(b.isim) like '%şît%' or lower(b.isim) like '%şit%' or lower(b.isim) like '%sit%'
      or lower(b.isim) like '%drîs%' or lower(b.isim) like '%dris%'
    then 'KORUNACAK'
    else 'SİLİNECEK'
  end as karar,
  count(up.id) as ilerleme_kaydi,
  count(up.id) filter (where up.bitti_mi) as biten_kayit
from public.books b
left join public.user_progress up on up.book_id = b.id
group by b.isim
order by karar, b.isim;
