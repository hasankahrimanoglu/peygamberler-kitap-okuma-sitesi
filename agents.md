# agents.md — Peygamberler Keşif Dünyası

Bu projenin ajan talimatları **tek dosyada** tutulur:

## → [`CLAUDE.md`](./CLAUDE.md)

Buraya kural yazma, buradaki bir kuralı güncelleme. İki dosya paralel
tutulduğunda kaçınılmaz olarak birbirinden ayrışıyor ve hangisinin geçerli
olduğu belirsizleşiyor (25 Temmuz 2026'da tam olarak bu oldu: `agents.md`
düzeltilmiş, `CLAUDE.md` eski hâlinde kalmıştı — oturuma otomatik yüklenen
dosya ise `CLAUDE.md`).

Bu dosya yalnızca `agents.md` konvansiyonunu arayan araçlar için bir
yönlendiricidir.

---

## Hızlı yön tarifi

| Ne arıyorsan | Dosya |
|---|---|
| Ajan davranış kuralları, kod dokunma kuralları | `CLAUDE.md` |
| Ürün anayasası: terminoloji, tasarım sistemi, veri modeli, fazlar | `PROJE-MODELI.md` |
| Hangi kitap, hangi bölgede, kaç bölüm | `KITAP-KATALOGU-VE-URETIM-PLANI.md` |
| İçerik nasıl yazılır (içerik ajanı brifi) | `YENI-KITAP-ICERIK-URETIM-BRIFI.md` |
| Rozet tekilliği ve görsel üretim listesi | `ROZET-MATRISI.md` |
| Veritabanı şeması | `supabase/schema.sql` |
