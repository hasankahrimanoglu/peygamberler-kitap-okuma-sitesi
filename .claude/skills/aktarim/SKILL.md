---
name: aktarim
description: Hasan'ın onayladığı Faz 2 içerik paketini books.ts, quizzes.ts ve atlasCatalog.ts'e aktarır, sicilleri günceller, yer tutucuları açar ve `npm run kitap-denetle` ile doğrular. Hasan `/aktarim {bookKey}` yazınca kullanılır.
argument-hint: "<bookKey>  (ör. nuh)"
disable-model-invocation: true
---

# Aktarım — `$ARGUMENTS`

Bu oturum bir **kod oturumudur**, içerik oturumu değildir. Kitap:
`bookKey = $ARGUMENTS`. Argüman boşsa dur ve sor.

Kurallar bu dosyada **tekrar yazılmaz**; belgelerin diskteki güncel hâli geçerlidir.

## 1. Sınırları oku

`CLAUDE.md` → **"İÇERİK & VERİ"** bölümü: içeriği yazma, değiştirme,
kısaltma — yalnız `books.ts` formatına **ekle**. Terminoloji, görsel varlık ve
kod kuralları da CLAUDE.md'dedir.

## 2. Onay kapısı

1. İçerik dosyasını bul (`KITAP-KATALOGU-VE-URETIM-PLANI.md` §11.3):
   `kitap-icerikleri/KITAP-HZ-{BÜYÜK HARF bookKey}-ICERIK-FAZ2-taslak.md`
   (ya da onaydan sonra adlandırılmış `-ICERIK-final.md`). Yoksa dur.
2. **Hasan'a sor:** "Faz 2 onaylandı mı?" Açık "evet" almadan koda dokunma.
3. `src/data/books.ts`'te bu kitap zaten varsa dur; yeniden mi aktarılacağını sor.

## 3. Önce çakışma kontrolü — koda yazmadan

CLAUDE.md "YENİ KİTAP EKLERKEN HIZLI KONTROL" listesinin **ilk iki maddesi**:
- Rozet adları → `ROZET-MATRISI.md` §2 dizini. Akış: aynı belgenin §6'sı.
  **Çakışma varsa aktarım yapılmaz;** Hasan'a ad değişikliği sorulur.
- Etkileşimli kelimeler → `SOZLUKCE-SICILI.md` §2–§3. Akış: aynı belgenin §5'i.
  Sicilde olan terim bu kitapta düz `text` olur.

## 4. Aktar

CLAUDE.md "YENİ KİTAP EKLERKEN HIZLI KONTROL" listesini **madde madde** görev
listesine dök ve sırayla işaretle. Biçim için yayındaki son kitabın (ör. Hz.
İdrîs) `books.ts`, `quizzes.ts`, `atlasCatalog.ts` kayıtlarını örnek al.
Final testini (`quizzes.ts` + `quizConfig`) atlama — listede en çok unutulan adım.

- Yer tutucular: `npm run gorsel-yertutucu -- $ARGUMENTS` (önce `--kuru` ile bak).
- Siciller: `ROZET-MATRISI.md` (§6 akışı), `SOZLUKCE-SICILI.md` (§5 akışı),
  `ICERIK-GORSEL-SICILI.md` (§6–§6.1 akışı + kitabın görsel tablosu ve §5 sayaçları).
- Katalog yayın alanları (`availability`, `description`, `yayinTarihi`):
  yayına alma kararını **Hasan'a sor** — kitap bu alanlarla ana ekrana kendiliğinden girer.
- Supabase `books` satırı: `supabase/schema.sql`'e insert ekle ve canlı veritabanında
  çalıştırılması için **Hasan'dan izin iste**. Satır yoksa rozet ve madalya
  kaydedilmez; `/tasarim/*` önizlemeleri bunu göstermez.
- Dosya adlandırma (`-final`, `-KAYNAK-DENETIMI`): §11.2 4. adım, Hasan'ın onayıyla.

## 5. Doğrula — hata varken bitmiş sayma

```bash
npm run kitap-denetle -- $ARGUMENTS
```

- Çıkış kodu ≠ 0 ise (HATALAR bölümü doluysa) aktarım **bitmemiştir.** Hataları
  düzelt, komutu yeniden çalıştır; 0 hata olana kadar tekrarla. İçerikten
  kaynaklanan bir hata ise (ör. rozet çakışması) içeriği kendin değiştirme,
  Hasan'a sor.
- UYARILAR'ı Hasan'a ayrı ayrı bildir; kendiliğinden "önemsiz" sayma.
- Ardından `npm run lint`, sonra arka planda `npm run build`.
- Tarayıcıda girişsiz önizlemelerle bak (CLAUDE.md "ÇOCUK ARAYÜZÜ
  SADELEŞTİRME"): `/tasarim/okuma?bolum=$ARGUMENTS-1` ve
  `/tasarim/final?kitap=$ARGUMENTS`. Türkçe karakterleri kontrol et.

## 6. Teslim

Hasan'a kısa özet: aktarılan bölüm sayısı, güncellenen dosyalar, `kitap-denetle`
çıktısı (0 hata + uyarılar), açılan yer tutucu sayısı, yayın durumu.
Commit yalnız Hasan isterse atılır.

Sıradaki adım: ayrı bir oturumda `/gorsel-uretim $ARGUMENTS`.
