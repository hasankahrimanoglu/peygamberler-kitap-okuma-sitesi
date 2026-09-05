# AKTARIM NOTU — Hz. İdrîs içeriği (içerik ajanından aktarım ajanına)

Sana verilen `KITAP-HZ-IDRIS-ICERIK-FAZ2-taslak.md` dosyası, Hz. İdrîs kitabının
tam içerik paketidir. Kaynak denetimi ayrı bir dosyadadır
(`KITAP-HZ-IDRIS-ICERIK-taslak.md`) ve `books.ts`'e aktarılacak veri içermez;
yalnız hangi bilginin neden alındığını/alınmadığını gösterir.

Aşağıdakiler, aktarım sırasında **sessizce yanlış yapılması en olası** noktalardır.

---

## 1. Aktarımdan ÖNCE doğrulanacak türetilen alanlar

Bu alanlar teslimde yazılıdır ama **veri olarak saklanmaz** — kodun ürettiği
değerle eşleşip eşleşmediğini kontrol etmek içindir. Eşleşmiyorsa aktarma, sor.

| Alan | Beklenen |
|---|---|
| `assetSlug` | `hz-idris` |
| `routePrefix` | `idris` |
| Madalya adı | `Hz. İdrîs Yolculuk Madalyası` |
| Rozet anahtarları | `idris-bolum-1` … `idris-bolum-4` |

`bookKey: idris` · `booksTsId: hz-idris` · `dbKeywords: idris` · seri sırası **3**
· bölüm sayısı **4** (katalog hedefi, değiştirilemez).

---

## 2. Sözlükçe — dört kutu var, biri tuzak

Kitapta **tam olarak 4 etkileşimli kelime** vardır:

| Bölüm | Terim | Durum |
|---|---|---|
| 1 | basiret | Yeni terim, Hasan onaylı |
| 2 | kılavuz | Yeni terim, Hasan onaylı |
| 3 | dokuma | Yeni terim, Hasan onaylı |
| 4 | mucize | **Sabit sözlükçe (brif §11)** — tanım harfiyen alınmıştır, değiştirme |

**Tuzak:** *mucize* terimi sabit sözlükçededir ve tanımı brifteki cümlenin
birebir aynısı olmalıdır: "Allah'ın izniyle peygamberlerin gösterdiği olağanüstü
olaylardır." Tek harf bile değiştirme.

**İkinci tuzak — Bölüm 4'ün biçimi.** Orada terim **anlatıcı cümlesinde**
kutuludur; Hz. İdrîs'in sözü hemen ardından `—` çizgisiyle gelir ve terimi
tekrarlamaz. Bu bilinçli bir tercihtir; kutuyu diyalog satırına taşıma.

**Kutulanmayan ama metinde geçen terimler** (bunları `interactive_word` yapma,
düz `text` bırak): *peygamber, emanet, nimet, sabır, rehberlik*. Sicilde ya
zaten kutuludurlar ya da kutuları başka kitaba aittir.

---

## 3. Görseller — 25 dosya, kapak DAHİL DEĞİL

- **20 sahne görseli:** `.jpg`, 16:9, `kitaplar/hz-idris/bolum-{n}/{ad}.jpg`.
  Her bölümde 1 açılış (`kapak.jpg`) + 4 içerik sahnesi.
- **4 rozet + 1 madalya:** `.png`, 512×512 şeffaf.
  `rozetler/hz-idris/bolum-{n}.png` ve `madalyalar/hz-idris.png`.
- **Kitap kapağı bu teslimde YOKTUR** — `kitaplar/hz-idris/kapak.png` diskte
  zaten hazır. Kapak için brif arama, eksik sanma.
- **Bölge sahnesi de yoktur** — bölge başına üretilir, İlk İzler Vadisi hazırdır.
- `portraitSrc` **yazma**. Dikey varyant kaldırıldı; her sahne tek dosyadır.

Tam dosya listesi teslimin **§H**'sindedir. Görsel blokları `books.ts`'e
açılırken yalnız `src` + `alt` yazılır; `alt` metinleri §H tablosundaki
"Alt metin" satırlarıdır.

Aktarım biter bitmez: `npm run gorsel-yertutucu -- idris`
(betik dosya adlarını `books.ts`'ten okur — önce aktarım, sonra betik).

---

## 4. Aktarımla birlikte güncellenecek üç sicil

Bunlar unutulursa tekillik denetimi bir sonraki kitapta bozulur.

**`ROZET-MATRISI.md`**
- §2 dizinine dört ad **Nihai** olarak eklenir (13–16. sıralar):
  Ölçülü Buluş · Öğreten Sabır · Vazgeçmeyen El · Güvenilen Söz Rozeti.
- §4'teki Hz. İdrîs satırı bölüm bölüm açılır, "İçerik" sütunu ✅ Nihai olur.
- §5 sayaçları: nihai ad 12 → **16**, ad bekleyen 204 → **200**.
  (Görsel sayacına dokunma — rozet görselleri henüz üretilmedi.)

**`SOZLUKCE-SICILI.md`**
- §3'e üç yeni terim eklenir: **basiret** (Hz. İdrîs · 1), **kılavuz**
  (Hz. İdrîs · 2), **dokuma** (Hz. İdrîs · 3) — durum "Yeni terim — onaylandı".
- §2'deki **mucize** satırının "Kutulandı mı?" sütunu → `Hz. İdrîs · 4`.
- §6'daki **peygamber** uyarısı Hasan'ın kararıyla kapanır: kutu Hz. Âdem'e
  geriye dönük eklenecektir. Bu iş **bu kitabın aktarımına dahil değildir**,
  ayrı bir görevdir; ama sicil maddesi güncellenmeden bırakılmamalıdır.

**`ICERIK-GORSEL-SICILI.md`**
- Hz. Âdem ve Hz. Şît bölümlerinin yanına yeni bir **§4c Hz. İdrîs** bölümü
  açılır; 20 sahne dosyası bölüm bölüm ⬜ Bekliyor olarak yazılır.
- §5 sayaçlarına satır eklenir: açılış 4 · içerik 16 · toplam 20 · hazır 0.
- §7'deki klasör tablosunda `rozetler/hz-idris/` (4) ve `madalyalar/hz-idris.png`
  satırları güncellenir.

---

## 5. Metne dokunurken dikkat

- **Yaş, yıl, ömür ve sahife sayısı metinde bilinçli olarak yoktur.** Kaynakta
  çelişkili (365 ya da 165) ve yayınevi bunları yazarın kendi hesabı olarak
  işaretliyor. "Eksik" sanıp ekleme.
- **"İslam inancına ve tarihî rivayetlere göre"** kalıbı Bölüm 2'de bilerek
  kullanılmıştır (K2 kitaba özel kısıt: icat rivayetleri kesin dille anlatılmaz).
  Bu ifadeyi sadeleştirme ya da atma.
- **Savaş, silah, cihat, esir ve köle** kaynakta 26 sayfa yer tutar ama içerikte
  hiç yoktur; bu bilinçli bir editoryal karardır (Faz 1 §A5).
- Cümleler ortalama 10,1–10,4 kelimedir ve **hiçbiri 18 kelimeyi aşmaz.**
  Metinde birleştirme/kısaltma yaparsan bu ölçü bozulur; düzenleme gerekiyorsa
  önce Hasan'a sor.
- Diyalog oranı %13,8–18,1'dir, yani hedeflenen üçte birin altındadır. Bu da
  bilinçlidir: kaynak bir romandır, konuşmaların çoğu yazarın kurgusudur ve
  tarihî kişilere kesin söz isnat edilmemiştir. **Diyalog ekleyerek oranı
  yükseltme.**
- Dosya adı `-taslak`tır. `-final` adını yalnız dinî doğruluk ve editoryal
  onaydan sonra Hasan verir.

---

## 6. Aktarımda cevap bekleyen editör sorusu yoktur

Faz 1 ve Faz 2'de açılan soruların tamamı karara bağlanmıştır; liste ve
uygulandıkları yerler teslimin **§I8**'indedir. Yeni bir belirsizlik görürsen
tahmin yürütme, Hasan'a sor.
