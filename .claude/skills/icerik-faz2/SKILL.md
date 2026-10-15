---
name: icerik-faz2
description: Hasan'ın onayladığı Faz 1 planından kitabın tam içerik paketini (Faz 2) yazar, ardından icerik-denetcisi ajanıyla editoryal denetim yaptırıp bulguları Hasan'a sunar. Hasan `/icerik-faz2 {bookKey}` yazınca kullanılır.
argument-hint: "<bookKey>  (ör. nuh)"
disable-model-invocation: true
---

# İçerik Faz 2 — `$ARGUMENTS`

Bu oturum bir **içerik oturumudur.** Kitap: `bookKey = $ARGUMENTS`.
Argüman boşsa dur ve sor.

Kurallar bu dosyada **tekrar yazılmaz**; belgelerin diskteki güncel hâli geçerlidir.

## 1. Sınırları oku

`CLAUDE.md` → **"İÇERİK OTURUMU İSTİSNASI"** bölümünü oku ve oturum boyunca uygula
(yazma sınırı, sicil dokunulmazlığı, commit yasağı).

## 2. Onay kapısı — geçmeden yazma

1. Faz 1 taslağını bul: `kitap-icerikleri/KITAP-HZ-{BÜYÜK HARF bookKey}-ICERIK-taslak.md`
   (`KITAP-KATALOGU-VE-URETIM-PLANI.md` §11.3). Onaydan sonra adı
   `…-KAYNAK-DENETIMI.md` olmuş olabilir; `…-ICERIK-final.md` de varsa kitap
   Faz 2'yi geçmiştir — dur ve sor. Faz 1 dosyası yoksa dur: önce `/icerik-faz1 $ARGUMENTS`.
2. **Hasan'a sor:** "Faz 1 onaylandı mı?" ve §11.2'nin 2. adımındaki konuların
   (bölüm planı, rozet adları, yeni terimler, dışarıda kalan olaylar, hassas
   konuların çerçevesi) kararlarını iste. Taslakta Hasan'ın yazılı onay kaydı
   olsa bile bu oturumda **açık bir "evet"** almadan Faz 2 yazma. Onay
   kararlarını oturum boyunca Faz 1 önerilerinin önüne koy.
3. Faz 2 taslağı (`…-ICERIK-FAZ2-taslak.md`) zaten varsa **üzerine yazma**;
   baştan mı yazılacağını, yoksa mevcut dosyanın mı tamamlanacağını sor.

## 3. Faz 2'yi yaz

Oku: `YENI-KITAP-ICERIK-URETIM-BRIFI.md` (tamamı), katalog belgesinde kitabın
satırı + §10 sınıfı + §11.2, `ROZET-MATRISI.md`, `SOZLUKCE-SICILI.md`,
`ICERIK-GORSEL-SICILI.md`, onaylı Faz 1 taslağı, kaynak PDF
(`kaynak-pdfler/`), biçim örneği olarak son yayımlanmış kitabın içerik dosyası.

Brifin **§13 iskeletini eksiksiz** doldur; teslimi brif §14 kalite kontrolüyle
bitir. Brif §15 durumlarından biri oluşursa dur ve sor.

Dosya: `kitap-icerikleri/KITAP-HZ-{BÜYÜK HARF bookKey}-ICERIK-FAZ2-taslak.md`.

## 4. Editoryal denetim — otomatik

Dosya bitince **`icerik-denetcisi` ajanını çağır** (Agent aracı,
`subagent_type: icerik-denetcisi`). İstemde ver: bookKey, Faz 2 dosyasının yolu,
Faz 1 dosyasının yolu, kaynak PDF'in yolu. Ajan salt okur, metni düzeltmez.

Ajanın raporunu **hiçbir bulguyu atlamadan, önem sırasıyla ve sade dille**
Hasan'a sun:
- **Kritik** (tasvir, kaynakta olmayan iddia, sicil çakışması) önce,
- sonra **Önemli**, sonra **Küçük**.

Bulguları kendiliğinden düzeltme. Hasan hangilerinin düzeltileceğini söyler;
düzeltmeler yine yalnız Faz 2 dosyasına yazılır. Kritik bulgu düzeltildiyse
ajanı bir kez daha çalıştırıp sonucu bildir.

## 5. Teslim ve dur

Kısa özet: dosya yolu, brif §14 tablosunun "sorun var" satırları, denetçi
bulgularının sayısı (kritik/önemli/küçük), açık editör soruları.

Sıradaki adım: Hasan Faz 2'yi onaylar, ardından **ayrı bir kod oturumunda**
`/aktarim $ARGUMENTS` çalıştırılır. Bu oturum `src/`'ye ve sicillere dokunmaz.
