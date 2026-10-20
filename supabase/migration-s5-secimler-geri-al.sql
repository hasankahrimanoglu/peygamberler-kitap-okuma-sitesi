-- S5 — GERİ ALMA (migration-s5-secimler.sql)
--
-- "Sen Olsaydın" seçim kayıtlarını ve tabloyu siler. Kitap sonu veli özeti
-- yeniden verisiz kalır (kod bu durumda paragrafı göstermez).

begin;

drop table if exists public.sen_olsaydin_secimleri;

commit;
