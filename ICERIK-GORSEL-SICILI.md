# İÇERİK GÖRSEL SİCİLİ — Peygamberler Keşif Dünyası

Okuma akışındaki **içerik illüstrasyonlarının** tek kaynağıdır.
`ROZET-MATRISI.md` ve `SOZLUKCE-SICILI.md` ile aynı sicil disiplinini izler.

**Amacı:** Hasan'ın hangi görseli hangi adla üreteceğini tek listede tutmak.
Dosya adı burada yazılı olduğu gibi klasöre atıldığında **kod değişmeden** yayına
girer (PROJE-MODELI.md Bölüm 6.1 üretim akışı).

> **Bağlam:** 26 Temmuz 2026'da bölüm okuma deneyimi sayfa-sayfa akıştan
> **tek sayfa kaydırmalı** akışa alındı (PROJE-MODELI Faz 6.2). Sayfalı düzende
> her sayfa küçük olduğu için görselsizlik gizleniyordu; tek sütun kaydırmada
> görselsiz bölüm metin duvarına döner. Bu yüzden Hz. Âdem'in **her bölümüne
> 1 açılış + 4 içerik sahnesi** yeri açıldı (Hasan onayı, 26 Tem 2026).

---

## 1. Kural ve isimlendirme (REVİZE — 27 Temmuz 2026)

| Konu | Kural |
|---|---|
| Kitap klasörü | `public/kitaplar/hz-{bookKey}/` |
| Bölüm klasörü | `public/kitaplar/hz-{bookKey}/bolum-{n}/` |
| Bölüm açılış sahnesi | `bolum-{n}/kapak.jpg` |
| Bölüm içi sahne | `bolum-{n}/{kisa-ad}.jpg` |
| Kitap kapağı | `hz-{bookKey}/kapak.png` (dikey; harita ve kütüphanede) |
| **Oran** | Okuma sayfası görselleri **16:9** (öneri: 1920×1080) |
| **Uzantı** | **`.jpg`** — sabit. Sahneler fotoğrafiktir; JPEG aynı kalitede PNG'nin onda biri yer kaplar |
| Ad biçimi | Küçük harf, Türkçe karaktersiz, tireli |
| Dosya yoksa | Kod bozulmaz — `public/kitaplar/placeholder-sahne.jpg` yedeği devreye girer |

**Değiştirme akışı:** eski dosyayı sil, yenisini **aynı adla** aynı klasöre at.
Kod değişmez, sayfa yenilenince yeni görsel görünür.

**Yol üretimi tek kaynaktan:** `src/lib/varlikYollari.ts`. Hiçbir ekran kendi
içinde yol kurmaz.

### Dikey (`portraitSrc`) varyant kaldırıldı

Eski 3:4 kırpımlar, görselin metnin yanındaki dar panele sığdırıldığı **sayfalı**
düzen içindi. Kaydırmalı akış tek sütundur; 16:9 sahne her cihazda tam genişlikte
bir bant olarak durur. Bölüm başına **tek dosya** vardır.

## 2. Görsel içeriği — değişmez sınırlar

- **Tasvir yasağı:** peygamber, halife veya sahabe **yüzü, bedeni ya da silüeti
  hiçbir görselde çizilmez.** İnsan figürü kullanılmaz.
- Dönemle uyumsuz dekor kullanılmaz (cami, kubbe, minare vb.).
- Kur'an'ın **bildirmediği ayrıntı görselleştirilmez.** Örnek: yasak ağacın türü
  belirsizdir (elma/buğday çizilmez); Hâbil ile Kābil'in **ne sunduğu**
  bildirilmediği için sunuların içeriği çizilmez.
- Şiddet, korku ve ürkütücü ayrıntı gösterilmez (Bölüm 7 dâhil). Hedef yaş 8–11.
- Işık, doğa, toprak, su, bitki, gökyüzü ve nesne üzerinden anlatılır.

## 3. Öncelik

| Öncelik | Anlamı |
|---|---|
| **A** | Bölüm açılışı + 1. Kısım sahneleri — bölümün ilk izlenimi, önce üretilir |
| **B** | Devam kısmı sahneleri — akışın ikinci yarısı |

Hepsinin aynı anda üretilmesi gerekmez; eksik olanlar placeholder ile görünür.

---

## 4. Hz. Âdem (`bookKey: adem`) — 40 görsel

**Durum:** 40 slot · hepsi yer tutucu (16:9'a geçişte eski 4:3 görseller `arsiv-gorseller/` klasörüne alındı)

### Bölüm 1 — Beklenen Misafir

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-1/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Dağlar, nehir ve yıldızlı gökyüzüyle insanı bekleyen yeryüzü *(3 keşif noktalı sahne)* |
| `hz-adem/bolum-1/secim-sorumluluk.jpg` | 1. Kısım | A | ⬜ Bekliyor | İki doğal yola ayrılan vadide, su ve taşların arasında büyüyen genç bir fidan |
| `hz-adem/bolum-1/toprak-isik.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yağmurla ıslanmış toprak, doğal çamur katmanları, küçük bir filiz ve sabah ışığı |
| `hz-adem/bolum-1/ogrenme-alemi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yıldızların yansıdığı sığ suyun yanında farklı taşlar, yaprak, tohum ve küçük bir filiz |
| `hz-adem/bolum-1/isimlerin-izi.jpg` | Devam | B | ⬜ Bekliyor | Sığ suyun kenarına dizilmiş farklı taşlar, yapraklar ve tohumlar; her birinin yanında ince bir ışık izi |

### Bölüm 2 — Bilginin Armağanı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-2/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Şafak ışığında farklı bitki, taş ve su damlalarının bir arada göründüğü geniş vadi |
| `hz-adem/bolum-2/isimlerin-ogretilmesi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yan yana dizilmiş yaprak, tüy, kabuk ve taşların üzerine düşen sabah ışığı |
| `hz-adem/bolum-2/egilen-dallar.jpg` | 1. Kısım | A | ⬜ Bekliyor | Rüzgârda aynı yöne eğilmiş uzun otlar ve dalların oluşturduğu sakin sahne |
| `hz-adem/bolum-2/atesin-golgesi.jpg` | Devam | B | ⬜ Bekliyor | Sönmeye yüz tutmuş bir ateşin közleri ve hemen yanındaki nemli koyu toprak |
| `hz-adem/bolum-2/iki-yol.jpg` | Devam | B | ⬜ Bekliyor | Bir tepenin üzerinde ikiye ayrılan; biri aydınlığa, diğeri gölgeye giden patika |

### Bölüm 3 — Cennetteki Uyarı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-3/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Gölgeli ağaçlar, berrak dereler ve olgun meyvelerle dolu geniş bir bahçe |
| `hz-adem/bolum-3/cennet-bahcesi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Berrak suyun aktığı, yeşilliklerin gözün alabildiğine uzandığı bahçe |
| `hz-adem/bolum-3/sinir-cizgisi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Geniş bir bahçenin içinde tek bir ağaca uzanan, taşlarla belirginleşmiş ince patika — **ağacın türü belli edilmez** |
| `hz-adem/bolum-3/sayisiz-nimet.jpg` | Devam | B | ⬜ Bekliyor | Dalları meyveyle dolu ağaçların arasından süzülen ışık |
| `hz-adem/bolum-3/guvenin-sinavi.jpg` | Devam | B | ⬜ Bekliyor | Akşam alacasında tek bir ağacın gölgesinin uzadığı sessiz bahçe köşesi |

### Bölüm 4 — Tatlı Fısıltı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-4/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Alacakaranlıkta yaprakların arasından süzülen ince bir sis |
| `hz-adem/bolum-4/tatli-fisilti.jpg` | 1. Kısım | A | ⬜ Bekliyor | Rüzgârla kıpırdayan yaprakların arasında dağılan ince bir sis |
| `hz-adem/bolum-4/tekrarin-izi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Durgun suya düşen tek bir damlanın giderek genişleyen halkaları |
| `hz-adem/bolum-4/yapraklarin-golgesi.jpg` | Devam | B | ⬜ Bekliyor | Üst üste savrulmuş geniş bahçe yaprakları ve aralarından sızan solgun ışık — **figür yok** |
| `hz-adem/bolum-4/solan-vaat.jpg` | Devam | B | ⬜ Bekliyor | Bir dalın ucunda kurumaya başlamış tek bir yaprak |

### Bölüm 5 — Tövbenin Kapısı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-5/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Şafak sökerken bulutların aralanmasıyla yeryüzüne inen ışık huzmesi |
| `hz-adem/bolum-5/iki-yol-ayrimi.jpg` | 1. Kısım | A | ⬜ Bekliyor | Biri sarp kayalığa, diğeri yumuşak toprağa uzanan iki ayrı patika |
| `hz-adem/bolum-5/donus-sozleri.jpg` | 1. Kısım | A | ⬜ Bekliyor | Sabah çiyiyle ıslanmış toprakta yeni açılmış küçük bir su yolu |
| `hz-adem/bolum-5/acilan-kapi.jpg` | Devam | B | ⬜ Bekliyor | Kayaların arasından aydınlığa açılan geniş bir geçit |
| `hz-adem/bolum-5/umudun-isigi.jpg` | Devam | B | ⬜ Bekliyor | Yağmur sonrası bulutların aralanmasıyla ıslak toprağa vuran ilk ışık |

### Bölüm 6 — Yeni Bir Yurt

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-6/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Uçsuz bucaksız bir ova; uzakta dağ sırası, önde yeni sürülmüş toprak |
| `hz-adem/bolum-6/yagmurdan-sonra.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yağmurdan sonra canlanan toprakta filizlenen taze tohumlar |
| `hz-adem/bolum-6/ilk-sabah.jpg` | 1. Kısım | A | ⬜ Bekliyor | Gün doğarken sisin çekildiği geniş ova ve ufuktaki dağ sırası |
| `hz-adem/bolum-6/mevsimlerin-donusu.jpg` | Devam | B | ⬜ Bekliyor | Aynı ağacın farklı mevsimlerdeki hâllerini andıran, ayrı renklerde dalların bir arada göründüğü sahne |
| `hz-adem/bolum-6/ilk-ocak.jpg` | Devam | B | ⬜ Bekliyor | Taşlarla çevrilmiş küçük bir ocak, yanında toprak kaplar ve kurumuş otlar — **insan yok** |

### Bölüm 7 — İki Kardeşin Sınavı

> **Hassas bölüm.** Şiddet, silah, kan ve beden hiçbir görselde yer almaz.
> Kur'an kardeşlerin **ne sunduğunu bildirmediği için** sunular çizilmez.

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-7/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Bir tepede ikiye ayrılan patika; biri ekili tarlaya, diğeri taşlık yamaca gider |
| `hz-adem/bolum-7/buyuyen-yurt.jpg` | 1. Kısım | A | ⬜ Bekliyor | Ekili tarlalar, otlaklar ve bir akarsuyla çevrili geniş yerleşim vadisi |
| `hz-adem/bolum-7/duran-yol.jpg` | 1. Kısım | A | ⬜ Bekliyor | Bir kavşakta duran patika; bir kolu aydınlık ovaya, diğeri gölgeli kayalığa uzanır |
| `hz-adem/bolum-7/karganin-ogrettigi.jpg` | Devam | B | ⬜ Bekliyor | Toprağı eşeleyen bir karga ve yanında yeni açılmış küçük bir çukur — **beden veya mezar imgesi yok** |
| `hz-adem/bolum-7/ofkenin-dindigi-yer.jpg` | Devam | B | ⬜ Bekliyor | Fırtınadan sonra durulmuş bir gölün yüzeyi ve kıyıdaki sakin otlar |

### Bölüm 8 — Sılaya Uzanan Yol

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-8/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Ufka doğru uzanan uzun bir yol ve iki yanında olgunlaşmış başaklar |
| `hz-adem/bolum-8/uzun-yol.jpg` | 1. Kısım | A | ⬜ Bekliyor | Tepelerin arasından kıvrılarak ufka uzanan uzun bir patika |
| `hz-adem/bolum-8/birakilan-miras.jpg` | 1. Kısım | A | ⬜ Bekliyor | Toprağa bırakılmış bir avuç tohum ve yanında filizlenmeye başlamış olanlar |
| `hz-adem/bolum-8/emanetin-aktarimi.jpg` | Devam | B | ⬜ Bekliyor | Birbirine bağlanarak uzayan ince su yollarının oluşturduğu ağ |
| `hz-adem/bolum-8/filizlenen-emanet.jpg` | Devam | B | ⬜ Bekliyor | Karanlık toprağın içinden yükselen tek bir taze filiz ve üzerine düşen ışık |

---

## 5. Sayaçlar

| Kitap | Açılış | İçerik sahnesi | Toplam | Hazır | Bekliyor |
|---|---|---|---|---|---|
| Hz. Âdem | 8 | 32 | **40** | 0 | 40 |
| **Genel** | **8** | **32** | **40** | **0** | **40** |

**Hz. Şît'e görsel açılmamıştır** — geçici sunum içeriğidir ve kaynaklı metin
geldiğinde bütünüyle değişecektir (PROJE-MODELI Bölüm 11).

## 6. Akış — yeni görsel eklenirken

1. Sahne yeri `src/data/books.ts` içinde `type: "image"` bloğu olarak açılır
   (yalnız `src` + `alt`; `portraitSrc` yazılmaz).
2. Dosya adı **bu sicile** eklenir: bölüm, akıştaki yer, öncelik, brif.
3. Hasan görseli üretir ve `public/icerik/` klasörüne **aynı adla** atar.
4. Sicildeki durum `⬜ Bekliyor` → `✅ Hazır` yapılır. **Kod değişmez.**

`alt` metinleri kod tarafında yazılmıştır; editoryal revizyon Hasan'ın kararıdır.
Değişirse `books.ts` ve bu sicil **birlikte** güncellenir.

---

## 7. Diğer görsel klasörleri (27 Temmuz 2026 kurulumu)

Aşağıdakiler **SVG**'dir; Hasan vektör olarak hazırlar. Hepsi yer tutucudur —
eskisini silip aynı adla yenisini atmak yeterlidir.

| Klasör | Kalıp | Kurulan | Not |
|---|---|---|---|
| `public/rozetler/hz-{bookKey}/` | `bolum-{n}.svg` | **34** | İlk İzler Vadisi 6 kitabı: âdem 8, şît 4, idrîs 4, nûh 8, hûd 5, sâlih 5 |
| `public/madalyalar/` | `hz-{bookKey}.svg` | **6** | Kitap başına bir madalya; her kitabınki farklıdır |
| `public/unvanlar/` | `{unvan-anahtari}.svg` | **10** | `yeni-gezgin`, `yol-kasifi`, `deger-toplayicisi`, `yol-arkadasi`, `bilge-yolcu`, `hikaye-ustasi`, `emanet-koruyucusu`, `atlas-bilgini`, `kissa-rehberi`, `yedi-bolge-kasifi` |
| `public/avatarlar/` | `avatar-{1..10}.jpg` | **10** | Veli panelinde üçerli pencerede oklarla gezilir |
| `public/ikonlar/` | `final-kapisi.svg` | **1** | Bölüm rotasındaki **Büyük Final Testi** durağının ikonu |

**Büyük Final Testi ikonunun yolu:** `public/ikonlar/final-kapisi.svg`
Bölüm rotasında "Final Kapısı" durağında görünür; `currentColor` kullandığı için
durum rengini (tamamlandı/aktif/kilitli) kendiliğinden alır. Sabit renk vermek
istersen SVG içindeki `currentColor` değerlerini kendi renginle değiştir.

### Kitap kapakları

| Kitap | Dosya | Durum |
|---|---|---|
| Hz. Âdem | `kitaplar/hz-adem/kapak.png` | ✅ Var |
| Hz. Nûh | `kitaplar/hz-nuh/kapak.png` | ✅ Var |
| Hz. Şît · Hz. İdrîs · Hz. Hûd · Hz. Sâlih | `kitaplar/hz-{key}/kapak.png` | ⬜ Yok — yedek görünür |

### Sonraki bölgeler

Klasör iskeleti şimdilik **yalnız İlk İzler Vadisi** için kuruldu. Diğer 6 bölge
(29 kitap) içerik geldikçe aynı kalıpla açılacak.

### Arşiv

16:9'a geçişte eski **4:3** Hz. Âdem görselleri `arsiv-gorseller/icerik-4-3/`
klasörüne alındı (7 dosya, ~19 MB). Yeni sahneler 16:9 üretileceği için bu
klasör silinebilir; `public/` altında olmadığı için siteye servis edilmiyor.
