-- ESKİ DEMO İLERLEME KAYITLARI — 2. ADIM: SİLME (12 Ekim 2026)
--
-- ÖNCE 1. adımı (…-1-onizleme.sql) çalıştır ve "SİLİNECEK" satırlarının
-- yalnız eski demo kitaplar olduğunu gör.
--
-- Silinen: yayında olmayan kitapların `user_progress` satırları (her çocuk
-- için). Dokunulmayan: `books` (kitaplar yayına girince yine lazım),
-- `profiles`, `profile_tasks`, yayındaki kitapların ilerlemesi.
-- Geri alınamaz.

delete from public.user_progress up
using public.books b
where up.book_id = b.id
  and not (
    lower(b.isim) like '%adem%'
    or lower(b.isim) like '%şît%' or lower(b.isim) like '%şit%' or lower(b.isim) like '%sit%'
    or lower(b.isim) like '%drîs%' or lower(b.isim) like '%dris%'
  );
