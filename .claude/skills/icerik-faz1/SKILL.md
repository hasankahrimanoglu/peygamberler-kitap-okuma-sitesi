---
name: icerik-faz1
description: Bir kitabın içerik üretiminin Faz 1'ini (kaynak denetimi + bölüm planı + rozet adı ve yeni terim önerileri) başlatır. Hasan `/icerik-faz1 {bookKey}` yazınca kullanılır. Hikâye yazmaz.
argument-hint: "<bookKey>  (ör. hud)"
disable-model-invocation: true
---

# İçerik Faz 1 — `$ARGUMENTS`

Bu oturum bir **içerik oturumudur.** Kitap: `bookKey = $ARGUMENTS`.
Argüman boşsa veya katalogda yoksa dur, Hasan'a hangi kitap olduğunu sor.

Kurallar bu dosyada **tekrar yazılmaz**; aşağıdaki belgelerin diskteki güncel
hâli geçerlidir. Bu komut yalnız hangi belgenin, hangi sırayla okunacağını söyler.

## 1. Sınırları oku

`CLAUDE.md` → **"İÇERİK OTURUMU İSTİSNASI"** bölümünü oku ve oturum boyunca uygula.
Oradaki yazma sınırı, sicil dokunulmazlığı, commit yasağı ve "Faz 1 onaylanmadan
Faz 2 yazılmaz" kuralı bu oturumun da sınırıdır.

## 2. Kitabı katalogdan bul

`KITAP-KATALOGU-VE-URETIM-PLANI.md`:
- §3–§9 tablolarında `$ARGUMENTS` kitabının satırı: ad, bölge, sıra, **hedef bölüm sayısı**, değerler
- §10: kitabın kaynak hassasiyeti sınıfı (K1–K4) ve o sınıfın uygulaması
- §11.2: bu oturuma verilecek dosya listesi, iki fazlı üretim düzeni ve **ajan komutu**
  — §11.2'deki ajan komutunu bu kitap için talimat kabul et
- §11.3: dosya adı standardı
- §12: katalog değişikliği kuralı

## 3. Ön kontroller — biri tutmazsa dur ve sor

- `kitap-icerikleri/` altında bu kitabın Faz 1 taslağı ya da onaylı kaydı
  (§11.3: `-ICERIK-taslak.md` / `-KAYNAK-DENETIMI.md`) zaten varsa
  **üzerine yazma**; Hasan'a ne yapılacağını sor (yeniden mi, düzeltme mi).
- `kaynak-pdfler/` içinde bu kitabın PDF'ini bul. Yoksa veya birden fazla aday
  varsa Hasan'a sor. PDF'i baştan sona oku; sayfa aralıklarını kaydet.
- §11.2'nin 2–9. maddelerindeki dosyaları oku (brif, katalog, rozet matrisi,
  sözlükçe sicili, görsel sicili, biçim örneği olarak son yayımlanmış kitabın
  içerik dosyası, peygamber kitaplarında kitap haritası). `PROJE-MODELI.md` ve kod
  dosyaları bu oturuma girdi değildir.
- `YENI-KITAP-ICERIK-URETIM-BRIFI.md` §1 alanlarından eksik olan kritik bilgi
  varsa tahmin yürütme, sor.

## 4. Faz 1'i üret

§11.2'deki **"Faz 1 — kaynak denetimi ve bölüm planı"** maddesinin istediği her
şeyi, brifin ilgili bölümlerine göre yaz (brif §4 kaynak analizi, §13 iskeletinin
A bölümü). Rozet adlarını `ROZET-MATRISI.md` §2–§3'e, yeni terimleri
`SOZLUKCE-SICILI.md` §2–§3'e karşı kontrol ederek öner.

Brif **§16 yerleşik kararlarını** uygula: o konuları yeniden soru olarak sorma,
uyguladığın her kararı olay bazında kaydet. Emsal kitaba uymuyorsa soru aç.

Brif §15'teki durma durumlarından biri oluşursa metni doldurma; bulguyu ve
1–3 karar sorusunu yaz.

Dosya: `kitap-icerikleri/KITAP-HZ-{BÜYÜK HARF bookKey}-ICERIK-taslak.md`
(§11.3). **Hikâye yazılmaz.**

## 5. Teslim ve dur

Hasan'a kısa, sade bir özet ver (brif §16 madde 21 düzeni):
1. **Karar soruları** — yalnız bu kitaba özgü 3–6 soru, önce bunlar.
2. **Yerleşik kararlara göre uygulananlar** — tablo: olay · §16 maddesi · ne
   yapıldı. Bu kitabın kendi olaylarıyla yaz; Hasan buradan itiraz edebilmeli.
3. **Onay listesi** (itiraz edilmezse geçerli): bölüm planı (bölüm adı + bir
   cümle), rozet adları ve matrisle çakışma durumu, yeni terimler, Bugüne Taşı
   dağılımı, Tanık önerisi.
4. **Dışarıda bırakılan olaylar** — her biri için kaynakta ne anlatılıyor +
   neden çıktı, kısaca.

Sonra **dur.** Faz 2'ye kendiliğinden geçme. Sıradaki adım: Hasan Faz 1'i onaylar,
ardından yeni bir oturumda `/icerik-faz2 $ARGUMENTS` çalıştırılır.
