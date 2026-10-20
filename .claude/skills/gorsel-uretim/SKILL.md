---
name: gorsel-uretim
description: Aktarımı bitmiş bir kitabın sahne, rozet ve madalya görsellerini Magnific bağlantısıyla, ICERIK-GORSEL-SICILI.md §6.2 akışına göre üretip yer tutucuların üzerine aynı adla yazar. Hasan `/gorsel-uretim {bookKey}` yazınca kullanılır.
argument-hint: "<bookKey>  (ör. idris)"
disable-model-invocation: true
---

# Görsel üretimi — `$ARGUMENTS`

Kitap: `bookKey = $ARGUMENTS`. Argüman boşsa dur ve sor.

Kurallar bu dosyada **tekrar yazılmaz.** Tek kaynak
**`ICERIK-GORSEL-SICILI.md` §6.2** (akış, prompt kurulumu, teknik işlem, tasvir
kontrolü ve oturumun yapmadıkları). Ayrıca aynı belgenin §1 (isimlendirme) ve
§2 (değişmez sınırlar), CLAUDE.md "Tasvir kuralı" ve "GÖRSEL VARLIKLAR".

## 1. Ön kontroller — biri tutmazsa dur

§6.2'deki sıra: Faz 2 onayı → aktarım + yer tutucular → görsel üretimi.
- `src/data/books.ts`'te bu kitap yoksa dur: önce `/aktarim $ARGUMENTS`.
- `npm run gorsel-yertutucu -- $ARGUMENTS --kuru` → "Üretilecek: 0" değilse
  yer tutucular açılmamış demektir; dur ve Hasan'a bildir (bu oturum yer açmaz).
- `ICERIK-GORSEL-SICILI.md`'de kitabın bölümü yoksa dur.
- Magnific bağlantısı bu oturumda yoksa dur ve Hasan'a söyle.
- Stil referansı diskte yoksa dur: `stil-referans-gorsel.jpg` (proje kökü).

## 2. Listeyi ve promptları oku

§6.2'deki "İki kaynak, iki ayrı rol" tablosuna göre:
- **Ne üretilecek:** sicilde bu kitabın `⬜ Bekliyor` satırları.
- **Ne çizilecek:** `kitap-icerikleri/KITAP-HZ-{BÜYÜK HARF bookKey}-ICERIK-final.md`
  (ortak stil bloğu, negatif prompt, rozet sembol stili bloğu — eski
  dosyalarda "rozet çerçeve bloğu" —, sahne promptları,
  madalya ve rozet brifleri).
- Çelişki varsa §6.2'deki öncelik kuralını uygula ve Hasan'a sor.

## 3. Üret

§6.2 akışını adım adım izle — özellikle:
- **Set geneli standart** (§6.2 tablosu): model, oran ve stil referansı
  oradan alınır; final MD'deki stil bloğunun yalnız kitaba özgü kısmı prompta
  girer. Negatif liste `Strictly avoid:` ile promptun sonuna eklenir.
- **Rozet ve madalya çerçevesiz kare** üretilir (§6.2 "Rozet ve madalya —
  çerçevesiz kare"): eski final MD'lerdeki çerçeve bloğunun çerçeve/zemin
  ifadeleri atılır, arka plan kaldırılmaz. 2K orijinal `gorsel-kaynaklari/` altına,
  512×512 kare PNG site yoluna aynı adla yazılır. Çerçeveyi Hasan ekler.
- **Pilot önce:** onay gelmeden seri üretime geçme (kredi boşa gitmesin).
- **Bölüm bölüm** ilerle, her bölüm sonunda Hasan'a göster.
- Her görseli üretimden sonra **kendin aç ve bak** (Read aracı); §6.2'deki
  tasvir kontrolü otomatiğe bırakılmaz. Reddedilen görsel yeniden üretilir.
- Teknik işlem ve boyut doğrulaması §6.2'deki gibi; dosya **aynı adla** üzerine yazılır.
- Her teslimden sonra sicil durumlarını ve sayaçları güncelle; rozetler
  bitince `ROZET-MATRISI.md` §4 "Görsel" sütununu `□` yap (kare, çerçeve
  bekliyor — `✓` değil; §6.2 6. adım).

## 4. Bitiş

```bash
npm run gorsel-sikistir -- $ARGUMENTS
npm run kitap-denetle -- $ARGUMENTS
```

`gorsel-sikistir` yeni sahne görsellerinin sitedeki kopyasını 1600 px / kalite
82'ye indirir (PROJE-MODELI 6.1); zaten küçük dosyaya dokunmaz. Tam boyutlu
orijinali önce `gorsel-kaynaklari/kitaplar/` altına aynı yolla saklar.

Dosyaların hâlâ yerinde olduğunu ve "Bilgi" bölümünde kaç sahnenin yer tutucu
kaldığını gösterir. Hasan'a kısa özet: üretilen / reddedilip yeniden üretilen /
kalan görsel sayısı, seçilen model ve ayarlar, ve **Photoshop'ta çerçevelenecek
dosyaların listesi** (`gorsel-kaynaklari/` ana dosyası → kaydedilecek site yolu).

Oturum koda dokunmaz, dosya adı değiştirmez, commit atmaz (§6.2 "Oturum yapmaz").
