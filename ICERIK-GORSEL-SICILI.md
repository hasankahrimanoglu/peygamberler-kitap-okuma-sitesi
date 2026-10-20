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
>
> **REVİZE 12 Ekim 2026 (Hasan):** yeni kitaplarda bölüm başına **1 açılış +
> 5 içerik sahnesi = 6 görsel** (alt sınır 5; PROJE-MODELI 6.4). Yayındaki
> Âdem, Şît ve İdrîs 1 + 4 düzeninde kalır; geriye dönük ekleme ayrı karardır.

---

## 1. Kural ve isimlendirme (REVİZE — 27 Temmuz 2026)

| Konu | Kural |
|---|---|
| Kitap klasörü | `public/kitaplar/hz-{bookKey}/` |
| Bölüm klasörü | `public/kitaplar/hz-{bookKey}/bolum-{n}/` |
| Bölüm açılış sahnesi | `bolum-{n}/kapak.jpg` |
| Bölüm içi sahne | `bolum-{n}/{kisa-ad}.jpg` |
| Bölüm başına sayı | 1 açılış + 5 sahne = **6** (alt sınır 5) — 12 Eki 2026 |
| Kitap kapağı | `hz-{bookKey}/kapak.png` (dikey; kütüphane, kitap paneli, veli kartı) |
| Harita durağı görseli | `hz-{bookKey}/harita-kapak.jpg` (kare; ana ekran rotasındaki yuvarlak durak) |
| **Oran** | Okuma sayfası görselleri **16:9** (üretim: 1920×1080; sitedeki kopya `npm run gorsel-sikistir` ile en fazla 1600×900 — PROJE-MODELI 6.1, 20 Eki 2026) |
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

- **Tasvir kuralı (REVİZE 16 Ekim 2026 — Hasan; PROJE-MODELI 6.4):** olayın
  öznesi insansa sahne figürlüdür. **Katman 1** — peygamberler (Hz. Muhammed
  hariç), yakın akrabaları ve saygın müminler (Âsiye, Hızır vb.): yüz hiç
  görünmez (arkadan, uzak plan, doğal sebep; önden gerekiyorsa yaygın ışık).
  **Katman 2** — kötü karakterler ve çevreleri (Firavun, saraydakiler,
  büyücüler) ve **Katman 3** — sıradan halk: yüz gösterilebilir; korkutucu ve
  karikatür değil. Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir
  biçimde gösterilmez. Melek tasviri yapılmaz. 16 Ekim 2026'dan önceki kitap
  kayıtları (ör. "insan figürü hiçbir görselde yoktur") o günkü uygulamayı
  kaydeder; yeni kural sonraki üretimlerde ve seçilerek yapılan yeniden
  üretimde geçerlidir.
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

**Durum (11 Ağu 2026 — 17 Eki 2026'da set stiline yeniden üretildi, aşağıdaki not):** 40 slot · **40 gerçek görsel teslim edildi.** 39'u 16:9;
`bolum-1/kapak.jpg` 1200×896 (4:3) geldiği için tek açık kalem odur. Bölüm 1'in
diğer dört sahnesi 1376×768 (1.792) — 16:9'a %0.8 sapma, gözle fark edilmiyor,
yeniden üretim gerektirmez. Bölüm 2–8 tamamı 1920×1080.
Tam üretim promptları: `kitap-icerikleri/HZ-ADEM-GORSEL-PROMPTLARI.md`.

> **Set stiline yeniden üretim (KARAR 17 Eki 2026 — Hasan):** Ağustos üretimi eski
> "sinematik, gerçekçi doğa resmi" stil bloğuyla yapıldığı için B2–B8 fotoğraf gibi duruyor;
> set ise 13 Eki 2026'dan beri `stil-referans-gorsel.jpg` masal kitabı dilinde. **40 sahnenin
> hepsi** §6.2 standardıyla (Seedream 5 Pro · 2K · stil referansı) aynı adla yeniden üretilir;
> brifler (sahne içeriği) korunur. Kitap kapağı, harita durağı ve rozetler kapsam dışı.
> Ayrıca düzeltilen dört içerik/tasvir sorunu: `bolum-1/toprak-isik` (yaratılış paragrafında
> ışıktan yüzsüz insan figürü), `bolum-1/isimlerin-izi` (kara silüet + o dönemde olmayan köy),
> `bolum-1/secim-sorumluluk` (modern metal sulama kabı ve eller), `bolum-1/kapak` (4:3, alt
> yarısı boş). **Figür kuralı (PROJE-MODELI 6.4):** Hz. Âdem, Hz. Havva ve çocukları Katman 1
> (yüz hiç görünmez; arkadan / uzak plan). Figürlü 5 sahne: `bolum-2/isimlerin-ogretilmesi`,
> `bolum-3/sinir-cizgisi` (cennette arkadan, uzak — Hasan kararı), `bolum-5/donus-sozleri`,
> `bolum-6/ilk-ocak`, `bolum-7/buyuyen-yurt`. Figürsüz kalanlar: yaratılış anı, melekler,
> İblis (yılan dahil hiçbir biçimde), örtünme (`yapraklarin-golgesi`), Hâbil ile Kâbil
> (`duran-yol`, `karganin-ogrettigi`; şiddet, beden ve mezar imgesi yok). Yasak ağacın türü
> belli edilmez (elma yok). Yeni promptlar ve karakter blokları
> `kitap-icerikleri/HZ-ADEM-GORSEL-PROMPTLARI.md` sonundaki "Set stiline yeniden üretim"
> bölümünde.
>
> **Üretim (17 Eki 2026):** 40 sahnenin 40'ı yeniden üretildi ve aynı adla 1920×1080 `.jpg`
> olarak yazıldı; artık hepsi 16:9 (eski 4:3 kapak ve 1376×768 dosyalar kalktı). Figürsüz
> 35 sahnenin `alt` metni değişmedi (aynı brif); figürlü 5 sahnenin `alt` metni `books.ts`'te
> ve aşağıdaki tabloda güncellendi. Pilot onayı Hasan'dan (B1 açılış + `isimlerin-ogretilmesi`);
> Âdem'in karakter referansı onaylı `isimlerin-ogretilmesi`, eşininki `sinir-cizgisi`. 50 aday +
> 8 rötuş (~5.300 kredi). Yeniden tur: `iki-yol` (ışık farkı zayıftı), `donus-sozleri`
> (cennet bahçesine benzedi), `buyuyen-yurt` (yüzler izleyiciye dönük). Rötuş: `ilk-ocak`
> (çocukların yanakları, Âdem'in profil kenarı — `replace` önce yeni profil çizdi, `erase`
> temizledi), `donus-sozleri` (sakal kenarı; `replace` tam profil çizdi, `erase` temizledi),
> `buyuyen-yurt` (sakal/yanak kenarları silindi, yüzü sızan iki yan figür sahneden çıkarıldı).
> **Hasan'a not:** `buyuyen-yurt`'ta iki oğlanın sarık altından arkadan kulak/ense kenarı
> seçiliyor (yüz yok, figür ~60 px). Ana dosyalar `gorsel-kaynaklari/adem-yeniden-uretim/`.

### Bölüm 1 — Beklenen Misafir

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Dağlar, nehir ve yıldızlı gökyüzüyle insanı bekleyen yeryüzü *(3 keşif noktalı sahne; 16:9, set stiline yeniden üretim, 17 Eki 2026)* |
| `hz-adem/bolum-1/secim-sorumluluk.jpg` | 1. Kısım | A | ✅ Hazır | İki doğal yola ayrılan vadide, su ve taşların arasında büyüyen genç bir fidan |
| `hz-adem/bolum-1/toprak-isik.jpg` | 1. Kısım | A | ✅ Hazır | Yağmurla ıslanmış toprak, doğal çamur katmanları, küçük bir filiz ve sabah ışığı |
| `hz-adem/bolum-1/ogrenme-alemi.jpg` | 1. Kısım | A | ✅ Hazır | Yıldızların yansıdığı sığ suyun yanında farklı taşlar, yaprak, tohum ve küçük bir filiz |
| `hz-adem/bolum-1/isimlerin-izi.jpg` | Devam | B | ✅ Hazır | Sığ suyun kenarına dizilmiş farklı taşlar, yapraklar ve tohumlar; her birinin yanında ince bir ışık izi |

### Bölüm 2 — Bilginin Armağanı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak ışığında farklı bitki, taş ve su damlalarının bir arada göründüğü geniş vadi |
| `hz-adem/bolum-2/isimlerin-ogretilmesi.jpg` | 1. Kısım | A | ✅ Hazır | Sabah ışığında çiçekli bir çayırda, derenin kenarında ayakta duran, arkası dönük, başı örtülü bir adam; önünde ceylan ile yavrusu, bir tavşan, dalda kuşlar ve taşın üstünde bir tüy *(figürlü — set stiline yeniden üretim, 17 Eki 2026)* |
| `hz-adem/bolum-2/egilen-dallar.jpg` | 1. Kısım | A | ✅ Hazır | Rüzgârda aynı yöne eğilmiş uzun otlar ve dalların oluşturduğu sakin sahne |
| `hz-adem/bolum-2/atesin-golgesi.jpg` | Devam | B | ✅ Hazır | Sönmeye yüz tutmuş bir ateşin közleri ve hemen yanındaki nemli koyu toprak |
| `hz-adem/bolum-2/iki-yol.jpg` | Devam | B | ✅ Hazır | Bir tepenin üzerinde ikiye ayrılan; biri aydınlığa, diğeri gölgeye giden patika |

### Bölüm 3 — Cennetteki Uyarı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Gölgeli ağaçlar, berrak dereler ve olgun meyvelerle dolu geniş bir bahçe |
| `hz-adem/bolum-3/cennet-bahcesi.jpg` | 1. Kısım | A | ✅ Hazır | Berrak suyun aktığı, yeşilliklerin gözün alabildiğine uzandığı bahçe |
| `hz-adem/bolum-3/sinir-cizgisi.jpg` | 1. Kısım | A | ✅ Hazır | Geniş bir bahçede tek bir ağaca uzanan taşlı patikanın başında yan yana duran, arkası dönük, başları örtülü bir adam ve bir kadın *(figürlü — set stiline yeniden üretim, 17 Eki 2026)* |
| `hz-adem/bolum-3/sayisiz-nimet.jpg` | Devam | B | ✅ Hazır | Dalları meyveyle dolu ağaçların arasından süzülen ışık |
| `hz-adem/bolum-3/guvenin-sinavi.jpg` | Devam | B | ✅ Hazır | Akşam alacasında tek bir ağacın gölgesinin uzadığı sessiz bahçe köşesi |

### Bölüm 4 — Tatlı Fısıltı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta yaprakların arasından süzülen ince bir sis |
| `hz-adem/bolum-4/tatli-fisilti.jpg` | 1. Kısım | A | ✅ Hazır | Rüzgârla kıpırdayan yaprakların arasında dağılan ince bir sis |
| `hz-adem/bolum-4/tekrarin-izi.jpg` | 1. Kısım | A | ✅ Hazır | Durgun suya düşen tek bir damlanın giderek genişleyen halkaları |
| `hz-adem/bolum-4/yapraklarin-golgesi.jpg` | Devam | B | ✅ Hazır | Üst üste savrulmuş geniş bahçe yaprakları ve aralarından sızan solgun ışık — **figür yok** |
| `hz-adem/bolum-4/solan-vaat.jpg` | Devam | B | ✅ Hazır | Bir dalın ucunda kurumaya başlamış tek bir yaprak |

### Bölüm 5 — Tövbenin Kapısı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-5/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak sökerken bulutların aralanmasıyla yeryüzüne inen ışık huzmesi |
| `hz-adem/bolum-5/iki-yol-ayrimi.jpg` | 1. Kısım | A | ✅ Hazır | Biri sarp kayalığa, diğeri yumuşak toprağa uzanan iki ayrı patika |
| `hz-adem/bolum-5/donus-sozleri.jpg` | 1. Kısım | A | ✅ Hazır | Şafakta çiyli toprakta yeni açılmış küçük bir su yolu; ötesinde doğan güneşe dönük, yan yana diz çökmüş, arkası dönük bir adam ve bir kadın *(figürlü — set stiline yeniden üretim, 17 Eki 2026)* |
| `hz-adem/bolum-5/acilan-kapi.jpg` | Devam | B | ✅ Hazır | Kayaların arasından aydınlığa açılan geniş bir geçit |
| `hz-adem/bolum-5/umudun-isigi.jpg` | Devam | B | ✅ Hazır | Yağmur sonrası bulutların aralanmasıyla ıslak toprağa vuran ilk ışık |

### Bölüm 6 — Yeni Bir Yurt

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Uçsuz bucaksız bir ova; uzakta dağ sırası, önde yeni sürülmüş toprak |
| `hz-adem/bolum-6/yagmurdan-sonra.jpg` | 1. Kısım | A | ✅ Hazır | Yağmurdan sonra canlanan toprakta filizlenen taze tohumlar |
| `hz-adem/bolum-6/ilk-sabah.jpg` | 1. Kısım | A | ✅ Hazır | Gün doğarken sisin çekildiği geniş ova ve ufuktaki dağ sırası |
| `hz-adem/bolum-6/mevsimlerin-donusu.jpg` | Devam | B | ✅ Hazır | Aynı ağacın farklı mevsimlerdeki hâllerini andıran, ayrı renklerde dalların bir arada göründüğü sahne |
| `hz-adem/bolum-6/ilk-ocak.jpg` | Devam | B | ✅ Hazır | Taşlarla çevrili küçük bir ocağın başında yan yana oturan, arkası dönük bir anne, bir baba ve iki küçük çocuk; yanlarında toprak kaplar ve kuru otlar *(figürlü — set stiline yeniden üretim, 17 Eki 2026)* |

### Bölüm 7 — İki Kardeşin Sınavı

> **Hassas bölüm.** Şiddet, silah, kan ve beden hiçbir görselde yer almaz.
> Kur'an kardeşlerin **ne sunduğunu bildirmediği için** sunular çizilmez.

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Bir tepede ikiye ayrılan patika; biri ekili tarlaya, diğeri taşlık yamaca gider |
| `hz-adem/bolum-7/buyuyen-yurt.jpg` | 1. Kısım | A | ✅ Hazır | Ekili tarlalar ve akarsuyla dolu vadiye bakan tepede kolunu uzatıp konuşan, arkası dönük bir adam ve çevresinde onu dinleyen, arkası dönük aile *(figürlü — set stiline yeniden üretim, 17 Eki 2026)* |
| `hz-adem/bolum-7/duran-yol.jpg` | 1. Kısım | A | ✅ Hazır | Bir kavşakta duran patika; bir kolu aydınlık ovaya, diğeri gölgeli kayalığa uzanır |
| `hz-adem/bolum-7/karganin-ogrettigi.jpg` | Devam | B | ✅ Hazır | Toprağı eşeleyen bir karga ve yanında yeni açılmış küçük bir çukur — **beden veya mezar imgesi yok** |
| `hz-adem/bolum-7/ofkenin-dindigi-yer.jpg` | Devam | B | ✅ Hazır | Fırtınadan sonra durulmuş bir gölün yüzeyi ve kıyıdaki sakin otlar |

### Bölüm 8 — Sılaya Uzanan Yol

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-8/kapak.jpg` | Açılış | A | ✅ Hazır | Ufka doğru uzanan uzun bir yol ve iki yanında olgunlaşmış başaklar |
| `hz-adem/bolum-8/uzun-yol.jpg` | 1. Kısım | A | ✅ Hazır | Tepelerin arasından kıvrılarak ufka uzanan uzun bir patika |
| `hz-adem/bolum-8/birakilan-miras.jpg` | 1. Kısım | A | ✅ Hazır | Toprağa bırakılmış bir avuç tohum ve yanında filizlenmeye başlamış olanlar |
| `hz-adem/bolum-8/emanetin-aktarimi.jpg` | Devam | B | ✅ Hazır | Birbirine bağlanarak uzayan ince su yollarının oluşturduğu ağ |
| `hz-adem/bolum-8/filizlenen-emanet.jpg` | Devam | B | ✅ Hazır | Karanlık toprağın içinden yükselen tek bir taze filiz ve üzerine düşen ışık |

---

## 4b. Hz. Şît (`bookKey: sit`) — 20 görsel

**Durum (11 Ağu 2026):** 20 slot · **20 gerçek görsel teslim edildi.** Hepsi
1672×941 (16:9), yer tutucular üzerine yazıldı. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-SIT-FINAL.md` §H'dedir (ana üretim promptu ve
negatif prompt dahil). Aşağıdaki tablo dosya adı, akıştaki yer ve `alt` metnini
kaydeder; uzun prompt metni tekrarlanmaz.

> **Kitaba özgü ek yasak:** üç brifte "tanınabilir Kâbe biçimi" ayrıca
> yasaklanmıştır. Ortak negatif prompt (insan/figür/cami-kubbe-minare/yazı)
> bütün briflerde geçerlidir. **İnsan figürü hiçbir görselde yoktur.**

### Bölüm 1 — Beklenen Armağan

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-sit/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak vaktinde, uzak dağlara bakan geniş bir yamaç ve otların üstündeki çiy taneleri |
| `hz-sit/bolum-1/bekleyen-yamac.jpg` | 1. Kısım | A | ✅ Hazır | Sabah ışığında, otların arasında yükselen ince bir toprak kabartısı ve yanında sarı kanatlı bir kuş |
| `hz-sit/bolum-1/dagilan-duvar.jpg` | Devam | B | ✅ Hazır | Harçsız dizildiği için dibine birkaç taş düşmüş, üst üste konmuş taşlardan bir duvar parçası |
| `hz-sit/bolum-1/aksam-mujdesi.jpg` | Devam | B | ✅ Hazır | Akşam kızıllığında, aralarından ışık sızan deri çadırlar ve önlerinde yanan küçük bir ateş |
| `hz-sit/bolum-1/gelen-armagan.jpg` | Devam | B | ✅ Hazır | Gece açan bir dalın ucundaki tek tomurcuk ve üzerine düşen ilk yıldız ışığı |

### Bölüm 2 — Duyulmayan Uyarı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-sit/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Sonbahar ikindisinde, gökyüzüyle toprağın birleştiği yerin toz bulutuyla bulanıklaştığı geniş ova |
| `hz-sit/bolum-2/ufuktaki-isaret.jpg` | 1. Kısım | A | ✅ Hazır | Ufuk çizgisinde yükselen ince toz perdesi ve önündeki tek bir hurma ağacının eğilmiş dalları |
| `hz-sit/bolum-2/duyulmayan-ses.jpg` | 1. Kısım | A | ✅ Hazır | Sökülmüş tek bir çadırın yanında hâlâ olduğu gibi duran diğer çadırlar ve dağınık günlük eşyalar |
| `hz-sit/bolum-2/vadideki-siginak.jpg` | Devam | B | ✅ Hazır | Arkası kapalı bir vadi yatağı, iri kayaların altına sıkıştırılmış çadır bezleri ve dışarıda uçuşan kum |
| `hz-sit/bolum-2/kendi-gozuyle.jpg` | Devam | B | ✅ Hazır | Taşlı dere yatağında yontulmaya başlanmış iri bir taş, yanında taş yongaları ve basit aletler |

### Bölüm 3 — Taşları Birleştiren Sır

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-sit/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında, taşlı derenin yamacında düzgün sıralar hâlinde dizilmiş yontulmuş taşlar |
| `hz-sit/bolum-3/ilk-tas-oda.jpg` | 1. Kısım | A | ✅ Hazır | Üzeri henüz örtülmemiş, dört duvarı yeni yükselmiş küçük bir taş oda |
| `hz-sit/bolum-3/dagilan-tas-yigini.jpg` | 1. Kısım | A | ✅ Hazır | Yere serilmiş duvar taşları, toprakta kalan duvar izi ve havada asılı ince toz |
| `hz-sit/bolum-3/kirlangic-yuvasi.jpg` | Devam | B | ✅ Hazır | Kaya çıkıntısının altına çamurla sıvanmış bir kırlangıç yuvası ve yanında kuruyan toprakla kaynamış iki çakıl |
| `hz-sit/bolum-3/birlikte-kurulan-koy.jpg` | Devam | B | ✅ Hazır | Yan yana dizilmiş üzeri örtülü taş evler, aralarındaki taş döşeli yollar, bahçeler ve iki kuyu |

### Bölüm 4 — Devralınan Emanet

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-sit/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta, toprağın altına inen temel hattı ve üzerine oturmuş ilk taş sırası |
| `hz-sit/bolum-4/birakilan-avadanlik.jpg` | 1. Kısım | A | ✅ Hazır | Bir taşın üstüne bırakılmış eski deri avadanlık, içinden görünen taş aletler ve yanında harç teknesi |
| `hz-sit/bolum-4/dokunulmayan-tas.jpg` | 1. Kısım | A | ✅ Hazır | Harçsız dizili taş duvarın önünde, yere bırakılmış aletler ve kimsenin bulunmadığı boş bir alan |
| `hz-sit/bolum-4/yikanmis-taslar.jpg` | Devam | B | ✅ Hazır | Yağmurdan sonra ıslak zeminde dağınık duran, yıkanıp parlamış iri taşlar ve aralarında biriken sular |
| `hz-sit/bolum-4/pencereden-gorunen.jpg` | Devam | B | ✅ Hazır | Taş bir evin penceresinden görünen sabah manzarası, pencere kenarında bir su tası ve dışarıda uzanan yol |

---

## 4c. Hz. İdrîs (`bookKey: idris`) — 20 görsel

**Durum (17 Eki 2026 — disk kontrolüyle düzeltildi):** 20 slotun **20'si de yer
tutucu.** 12 Ağu kaydı dört bölüm kapağını (`bolum-1…4/kapak.jpg`) hazır sayıyordu;
oysa bu dosyalar git'e ilk girdikleri 28 Tem 2026'dan beri `placeholder-sahne.jpg`
kopyasıdır, gerçek kapak hiç konmamış. Kitap yayında ve 20 sahnenin tamamı yer
tutucuyla görünüyor. Kitap kapağı (`kapak.png`) ve harita durağı gerçektir; 4 rozet
ve madalya yer tutucudur (§5). Briflerin
tamamı `kitap-icerikleri/KITAP-HZ-IDRIS-ICERIK-final.md` §H'dedir (ana
üretim promptu ve negatif prompt dahil); aşağıdaki tablo yalnız dosya adı,
akıştaki yer ve `alt` metnini kaydeder.

> **Kitaba özgü ek yasak:** savaş, silah, kılıç, ok, yay, mızrak, zırh, eyer,
> koşum, ordu ve süvari **bütün briflerde** ayrıca yasaklanmıştır (kaynağın
> 26 sayfalık cihat bloğu içerikten tamamen çıkarıldı). `bolum-2/ilk-koy.jpg`
> brifinde "tanınabilir Kâbe biçimi" de yasaklıdır. `bolum-2/topraktaki-ders.jpg`
> brifinde gerçek harf, rakam ve okunabilir alfabe yasaklıdır — çizimler soyut
> geometrik şekillerdir. **İnsan figürü hiçbir görselde yoktur.**

### Bölüm 1 — Bir Yaprak Gölgesi

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-1/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Sabah ışığında geniş bir otlak, uzakta tepeler ve yamaçta tek bir zeytin ağacı |
| `hz-idris/bolum-1/kizgin-oglen.jpg` | 1. Kısım | A | ⬜ Bekliyor | Öğle güneşinin altında titreşen sıcak hava, kuru otlar ve kısa gölgeler |
| `hz-idris/bolum-1/yaprak-golgelik.jpg` | 1. Kısım | A | ⬜ Bekliyor | Bir taşın üstüne bırakılmış, iri yapraklardan örülerek yapılmış iki gölgelik |
| `hz-idris/bolum-1/kuruyan-yaprak.jpg` | Devam | B | ⬜ Bekliyor | Kenarları kıvrılıp kurumaya başlamış tek bir yaprak ve yanında dökülmüş parçaları |
| `hz-idris/bolum-1/yol-isaretleri.jpg` | Devam | B | ⬜ Bekliyor | Patika kenarında üst üste dizilmiş işaret taşları ve toprakta açılmış ince bir su arkı |

### Bölüm 2 — Öğretmeyi Öğrenmek

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-2/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Sabah ışığında, kayaların arasına kurulmuş tenha bir düzlük ve yere serilmiş hasırlar |
| `hz-idris/bolum-2/topraktaki-ders.jpg` | 1. Kısım | A | ⬜ Bekliyor | Düzeltilmiş toprak zemine çizilmiş sade şekiller, yanında bir çubuk ve dizilmiş çakıl taşları |
| `hz-idris/bolum-2/suyun-yolu.jpg` | Devam | B | ⬜ Bekliyor | Toprakta açılmış küçük bir arkta akan berrak su ve yolu ikiye ayıran ince bir set |
| `hz-idris/bolum-2/kuzeydeki-yildiz.jpg` | Devam | B | ⬜ Bekliyor | Gece gökyüzünde kuzeyde duran tek bir parlak yıldız ve altında uzanan boş çöl yolu |
| `hz-idris/bolum-2/ilk-koy.jpg` | Devam | B | ⬜ Bekliyor | Yan yana dizilmiş üzeri örtülü taş evler ve aralarından geçen taş döşeli sokak |

### Bölüm 3 — Bir Karış Bez

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-3/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Alacakaranlıkta tenha bir kır köşesi, bir taşın üstünde duran yün yumağı ve öreke |
| `hz-idris/bolum-3/denenip-birakilanlar.jpg` | 1. Kısım | A | ⬜ Bekliyor | Bir kayanın üstüne yan yana serilmiş kurumuş yapraklar, sert deri parçaları ve kabuk şeritleri |
| `hz-idris/bolum-3/orumcek-agi.jpg` | 1. Kısım | A | ⬜ Bekliyor | İki sırığın arasına örülmüş, üzerinde çiy taneleri parlayan bir örümcek ağı |
| `hz-idris/bolum-3/bir-karis-bez.jpg` | 1. Kısım | A | ⬜ Bekliyor | Ahşap bir el gergefinin üstünde duran, avuç kadar küçük ham beyaz bez parçası |
| `hz-idris/bolum-3/meydandaki-soz-tasi.jpg` | Devam | B | ⬜ Bekliyor | Köy meydanındaki düz söz taşı ve üstüne serilmiş, rüzgârda hafifçe kalkan beyaz bez |

### Bölüm 4 — Yüce Bir Mertebeye

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-4/kapak.jpg` | Açılış | A | ⬜ Bekliyor | Şafak öncesi bir tepe, altındaki sessiz vadi ve tepede yalnız duran bir ağaç |
| `hz-idris/bolum-4/ufuktaki-toz.jpg` | 1. Kısım | A | ⬜ Bekliyor | Doğu ufkunda yükselen geniş bir toz perdesi ve önündeki boş düzlük |
| `hz-idris/bolum-4/tanimadigimiz-hayvanlar.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yamaçta otlayan bir at sürüsü ve aralarında dolaşan taylar |
| `hz-idris/bolum-4/bos-yemlik.jpg` | 1. Kısım | A | ⬜ Bekliyor | Ağılda dibi görünen boş bir yemlik, yanında devrilmiş su kabı ve dağılmış saman |
| `hz-idris/bolum-4/ufka-uzanan-yol.jpg` | Devam | B | ⬜ Bekliyor | Toprakta ufka doğru uzanan bir iz ve üzerine düşen ilk sabah ışığı |

---

## 4d. Hz. Nûh (`bookKey: nuh`) — 48 görsel

**Durum (13 Eki 2026):** 48 slotun **48'i de gerçek görsel** (`/gorsel-uretim nuh`);
8 rozet ve madalya da teslim edildi. Yer tutucu kalmadı.
Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-NUH-ICERIK-final.md` §D'dedir (ana üretim promptu
ve negatif prompt dahil); aşağıdaki tablo yalnız dosya adı, akıştaki yer ve
`alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 / Devam 3).

> **Üretim kararları (13 Eki 2026 — Hasan, `/gorsel-uretim nuh`):** stil,
> model ve prompt maddeleri aynı gün **set geneli standart** olarak §6.2'ye
> taşındı; kitaba özgü olan yalnız figür kuralıdır.
> - **Stil:** final MD §B'deki gouache/suluboya bloğu yerine Hasan'ın seçtiği
>   referans: proje kökündeki `stil-referans-gorsel.jpg` (Magnific'e stil
>   referansı olarak verilir). Ayrıntılı, sıcak, orta doygunlukta "suluboya
>   üstüne net boyama" masal kitabı dili; soluk pastel yok.
> - **Model:** Magnific · Seedream 5 Pro · 2K · 16:9 (rozet 1:1). Rozetlerde
>   stil referansı yayındaki `rozetler/hz-sit/bolum-1.png` (çerçeve ailesi).
> - **Prompt:** Hasan onayıyla sahne promptları anlamı korunarak katman
>   ayrıntısıyla zenginleştirilir; yeni nesne/olay eklenmez. Araçta negatif
>   alanı olmadığı için negatif liste promptun sonuna "Strictly avoid:" ile
>   eklenir; figürsüz sahnelere ayrıca `birds, tipi, tent` eklendi.
> - **Figür kuralı** kitaptaki gibi kalır (Hasan, 13 Eki 2026): Hz. Nûh yalnız
>   üç sahnede arkadan/uzak; başka insan yok. Gemi sahnelerinde ölçek, rakam
>   verilmeden çevreyle (ağaç, tahta yığını, tepe) kurulur.

> **Kitaba özgü ek yasaklar:** güvercin, zeytin dalı, gökkuşağı, karga ve aşure
> hiçbir görselde yoktur; boğulan insan, ceset, yıkım ve korkutucu karanlık
> yasaktır; putlar hiçbir görselde odakta değildir. **Hz. Nûh yalnız üç
> sahnede** (`bolum-2/yeni-sabah.jpg`, `bolum-4/tepedeki-yol.jpg`,
> `bolum-8/dagilan-hayvanlar.jpg`) **arkadan ve uzak planda** görünür; yüz,
> profil ve yüz hattı yoktur. Oğlu, eşi ve kavmin insanları hiçbir görselde
> gösterilmez; diğer bütün sahnelerde insan figürü, silüet ve el yoktur.

> **Seçici yeniden üretim (17 Eki 2026 — Hasan; tasvir kuralı REVİZE 16 Eki 2026,
> PROJE-MODELI 6.4):** olayın öznesi insan olduğu hâlde figürsüz kalan 15 sahne figürlü
> olarak yeniden üretildi ve aynı adla yazıldı (aday listesi: `GORSEL-YENIDEN-URETIM-ADAYLARI.md`
> §2). Hz. Nûh, eşi, oğulları ve oğlu (`bolum-7/dalgalar`) Katman 1: arkadan, yüz yok; kavmin
> insanları, yoksullar, ileri gelenler ve gemideki inananlar Katman 3: yüz görünebilir.
> Yukarıdaki "Hz. Nûh yalnız üç sahnede… oğlu, eşi ve kavmin insanları gösterilmez"
> satırı o günkü uygulamadır; bu 15 sahnede geçerli değildir. Güvercin, zeytin dalı,
> gökkuşağı, karga, boğulan insan ve yıkım yasakları sürer. Ayar: Seedream 5 Pro · 2K ·
> `stil-referans-gorsel.jpg` + onaylı pilot `bolum-3/meydan-golgesi` karakter referansı.
> Ana dosyalar `gorsel-kaynaklari/nuh-yeniden-uretim/`. Yüz sızması rötuşla
> (`images_retouch`) temizlendi. `bolum-6/kandil-ve-yagmur`'da yan taraftaki dört adam
> gemideki inananlar (Katman 3) olarak kabul edildi, yüz hatları kısmen görünüyor.
> `books.ts` alt metinleri bu tabloyla eşitlendi (17 Eki 2026).

### Bölüm 1 — Putlara Eğilmeyen Eller

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında yeşil bir vadi, küçük bir kerpiç ev, bahçesi ve uzakta parlayan iki nehir |
| `hz-nuh/bolum-1/kucuk-tekne.jpg` | 1. Kısım | A | ✅ Hazır | Akşamüstü bir arkın kıyısında diz çökmüş, başı beyaz örtülü küçük bir çocuk; arkadan görünüyor, önünde suda yüzen tahta oyuncak tekne *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-1/oymali-kapi.jpg` | 1. Kısım | A | ✅ Hazır | Asma dalları ve çiçek oymalarıyla süslenmiş ahşap bir kapı ve önünde dağınık talaşlar |
| `hz-nuh/bolum-1/birakilan-keski.jpg` | Devam | B | ✅ Hazır | Kamış çardak altında oymalı kapı panelinin çevresinde düşünceli üç komşu ve onlara arkası dönük duran genç usta *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-1/uzak-sehir.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında uzakta ışıkları yanan bir şehir ve önde sessiz bir vadi patikası |
| `hz-nuh/bolum-1/dik-fidan.jpg` | Devam | B | ✅ Hazır | Yıldızlı bir gecede rüzgâra rağmen dimdik duran genç bir fidan |

### Bölüm 2 — Kömürün İçindeki Elmas

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Akşam ışığında vadiye inen bir yol ve yolun kenarındaki küçük bir evin aydınlık penceresi |
| `hz-nuh/bolum-2/yol-kenari-tezgah.jpg` | 1. Kısım | A | ✅ Hazır | Yol kenarında kamış örtülü basit bir çardak, altında marangoz tezgâhı ve el aletleri |
| `hz-nuh/bolum-2/komurde-elmas.jpg` | 1. Kısım | A | ✅ Hazır | Kara kömür parçalarının arasında, içinden ışık saçan tek bir elmas |
| `hz-nuh/bolum-2/sacilan-aletler.jpg` | Devam | B | ✅ Hazır | Tozlu yolda saçılmış aletleri sepete toplayan, arkası dönük diz çökmüş bir adam; uzakta şehre doğru uzaklaşan bir grup insan *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-2/bos-yol.jpg` | Devam | B | ✅ Hazır | Alacakaranlıkta bomboş kalan yol, çardak ve yeniden düzenlenmiş tezgâh |
| `hz-nuh/bolum-2/yeni-sabah.jpg` | Devam | B | ✅ Hazır | Sabah güneşinde yol kenarındaki tezgâhın başında, arkası dönük ve yüzü görünmeyen bir figür |

### Bölüm 3 — Kapısı Herkese Açık

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Öğle ışığında geniş, tozlu bir şehir meydanı, ortasında gölgeli büyük bir ağaç ve çevresinde kerpiç evler |
| `hz-nuh/bolum-3/zengin-avlu.jpg` | 1. Kısım | A | ✅ Hazır | Yüksek duvarlı zengin bir avluda yastıklara yaslanmış, kibarca gülümseyen adamlar ve onlara arkası dönük konuşan bir figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-3/meydan-golgesi.jpg` | 1. Kısım | A | ✅ Hazır | Meydandaki büyük ağacın gölgesinde hasıra oturmuş yoksul insanlar ve onlara arkası dönük oturan bir figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-3/uzaklasan-izler.jpg` | Devam | B | ✅ Hazır | Tozlu meydanda büyük evlere doğru uzaklaşan süslü giysili adamlar; ağacın gölgesinde başı dik oturan yoksullar *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-3/acik-kapi.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında ardına kadar açık duran sade ahşap bir kapı ve içeriden yola taşan sıcak ışık |
| `hz-nuh/bolum-3/bas-kose.jpg` | Devam | B | ✅ Hazır | Kandil ışığında yere serilmiş sofrada yan yana oturan farklı insanlar ve sofranın başında arkası dönük oturan bir figür *(figürlü yeniden üretim, 17 Eki 2026)* |

### Bölüm 4 — Gece Gündüz, Yıllarca

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Bir yanı yıldızlı gece, öbür yanı şafak olan gökyüzünün altında yalnız bir tepe ve tepeye çıkan patika |
| `hz-nuh/bolum-4/tepedeki-yol.jpg` | 1. Kısım | A | ✅ Hazır | Uzak planda, tepenin üstünde arkası dönük duran ve aşağıdaki yola bakan küçük bir figür; yüzü görünmüyor |
| `hz-nuh/bolum-4/ocak-basi.jpg` | 1. Kısım | A | ✅ Hazır | Akşam ışığında bir evin ocak başı; yanan ateş, yere dizilmiş farklı boylarda sandaletler ve tahta oyuncaklar |
| `hz-nuh/bolum-4/yagmurlu-bahce.jpg` | Devam | B | ✅ Hazır | Hafif bir yağmurun altında meyve dolu bir bahçe ve aralarından akan berrak bir ırmak |
| `hz-nuh/bolum-4/ay-ve-gunes.jpg` | Devam | B | ✅ Hazır | Alacakaranlıkta bir yanda batan güneş, öbür yanda yükselen ay ve aradaki geniş, yumuşak ova |
| `hz-nuh/bolum-4/buyuyen-fidan.jpg` | Devam | B | ✅ Hazır | Bir düzlükte toprağı yeni sulanmış genç bir ağaç ve yanında duran toprak bir su testisi |

### Bölüm 5 — Karada Yapılan Gemi

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-5/kapak.jpg` | Açılış | A | ✅ Hazır | Uçsuz bucaksız kuru bir düzlüğün ortasında tek başına yükselen, gövdesi kalın büyük bir ağaç |
| `hz-nuh/bolum-5/tahta-yigini.jpg` | 1. Kısım | A | ✅ Hazır | Kuru düzlükte kesilmiş dev ağaç kütüğünün yanında tahta taşıyan ve istifleyen, arkası dönük dört figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-5/gemi-iskeleti.jpg` | 1. Kısım | A | ✅ Hazır | Kuru düzlükte iskelesi kurulmuş yarım gemi; ön planda gemiye bakıp gülen yolcular, iskelede çalışan küçük figürler *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-5/cekic-ve-civiler.jpg` | Devam | B | ✅ Hazır | Bir tahta üzerine bırakılmış ahşap tokmak ve yanında dizili demir çiviler |
| `hz-nuh/bolum-5/ailecek-is.jpg` | Devam | B | ✅ Hazır | Yarım geminin gölgesinde çalışan aile: tahta taşıyan, merdivende çivi çakan, ekmek ve su getiren figürler, hepsi arkadan *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-5/tamamlanan-gemi.jpg` | Devam | B | ✅ Hazır | Akşam ışığında, denizden çok uzak kuru bir düzlüğün ortasında duran büyük, tamamlanmış ahşap gemi |

### Bölüm 6 — Allah'ın Adıyla Binin

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Kuru düzlükte duran ahşap gemi ve ufukta toplanan koyu yağmur bulutları |
| `hz-nuh/bolum-6/kara-bulutlar.jpg` | 1. Kısım | A | ✅ Hazır | Çatlak toprağa düşen ilk iri yağmur damlaları ve üstte koyu bulutlar |
| `hz-nuh/bolum-6/hayvan-izleri.jpg` | 1. Kısım | A | ✅ Hazır | Yağmur altında çamurlu ovada ikişer ikişer gemiye yürüyen hayvanlar ve rampadan eşyalarla gemiye çıkan aile *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-6/gemi-ici.jpg` | Devam | B | ✅ Hazır | Geminin içinde kalın ahşap kirişler, saman serili bölmeler ve kirişlere tünemiş kuşlar |
| `hz-nuh/bolum-6/yuzen-gemi.jpg` | Devam | B | ✅ Hazır | Yağmur altında geniş bir suyun üstünde ağır ağır yüzen ahşap gemi |
| `hz-nuh/bolum-6/kandil-ve-yagmur.jpg` | Devam | B | ✅ Hazır | Geminin içinde kandil ışığında yan yana oturup el ele dua eden insanlar; açık pencereden dalgalar görünüyor *(figürlü yeniden üretim, 17 Eki 2026)* |

### Bölüm 7 — Dağlar Gibi Dalgalar

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Gri gökyüzünün altında yüksek dalgalar ve dalgaların arasında sağlamca yol alan ahşap gemi |
| `hz-nuh/bolum-7/dalgalar.jpg` | 1. Kısım | A | ✅ Hazır | Geminin küpeştesinde arkası dönük duran bir figür; sisli suların ortasındaki tepede tek başına duran çok küçük bir genç *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-7/uzak-tepe.jpg` | 1. Kısım | A | ✅ Hazır | Suların ortasında yalnız kalmış, çevresini sis saran ıssız bir tepe |
| `hz-nuh/bolum-7/kandil-penceresi.jpg` | Devam | B | ✅ Hazır | Geminin loş iç mekânında, pencere önündeki rafta tek başına yanan bir kandil ve dışarıda yağmurun dinişi |
| `hz-nuh/bolum-7/sonsuz-su.jpg` | Devam | B | ✅ Hazır | Geminin açık kepenginden görülen, ufka kadar uzanan durgun su ve rafa bırakılmış kurumuş bir yeşil yaprak |
| `hz-nuh/bolum-7/ilk-yildizlar.jpg` | Devam | B | ✅ Hazır | Durgun suyun üstünde sakin duran gemi ve açılmış gökyüzünde parlayan yıldızlar |

### Bölüm 8 — Selamla ve Bereketle

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-8/kapak.jpg` | Açılış | A | ✅ Hazır | Gün doğumunda berrak bir gökyüzü altında, yeşilin yeniden belirdiği dağ sırtları ve çekilen sular |
| `hz-nuh/bolum-8/cudide-gemi.jpg` | 1. Kısım | A | ✅ Hazır | Bir dağın yeşermeye başlayan yamacına oturmuş ahşap gemi ve aşağıda çekilen sular |
| `hz-nuh/bolum-8/dagilan-hayvanlar.jpg` | 1. Kısım | A | ✅ Hazır | Uzak planda, gemi rampasının yanında arkası dönük duran bir figür ve yamaçlara dağılan ceylanlar, koyunlar ve göğe uçan kuşlar |
| `hz-nuh/bolum-8/yeni-koy.jpg` | Devam | B | ✅ Hazır | Dağ eteğinde taş duvar ören, toprak kazan ve fidan diken insanlar; ön planda taş taşıyan arkası dönük bir figür, tepede gemi *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-8/yeni-fidan.jpg` | Devam | B | ✅ Hazır | Gün doğarken dağ yamacında genç bir fidanı toprağa diken, arkası dönük diz çökmüş bir figür; uzakta gemi ve yeni köy *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-nuh/bolum-8/dagdaki-gemi.jpg` | Devam | B | ✅ Hazır | Akşam ışığında dağın üstünde sessizce duran ahşap gemi ve aşağıda yeni kurulan köyün ilk ocak dumanları |

## 4e. Hz. Musa (`bookKey: musa`) — 60 görsel

**Durum (13 Eki 2026):** 60 sahne slotunun **60'ı da gerçek görsel**
(`/gorsel-uretim musa`); kitap kapağı, harita durağı, 10 rozet ve madalya da
teslim edildi. Rozet ve madalya **çerçevesiz kare**dir (§6.2), çerçeveyi Hasan
ekler. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-MUSA-ICERIK-final.md` §C ve §D'dedir (İngilizce ana
üretim promptu, ortak stil bloğu, ortak negatif ve rozet çerçeve bloğu dahil);
aşağıdaki tablo yalnız dosya adı, akıştaki yer ve `alt` metnini kaydeder.
Bölüm başına 1 açılış + 5 sahne (1. Kısım ve Devam'da 2/3 ya da 3/2).

> **Üretim kararları (13 Eki 2026, `/gorsel-uretim musa`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`).
> Kitaba özgü notlar:
> - **Negatif eki:** Model Mısır sahnelerinde dinî sembole kayıyor (pilot
>   rozette ankh çıktı); her prompta `ankh, Egyptian religious symbols` eklendi.
>   Kubbe de sık sızıyor (3 sahne bu yüzden reddedildi).
> - **`birds, tipi, tent` istisnası:** `bolum-5/kapak` ve `kamp-atesi`'nde çadır,
>   `bolum-10/kapak` ve `serce-ve-damla`'da kuş sahnenin parçasıdır; bu sahnelerde
>   ilgili kelime negatiften çıkarıldı. Çadırlar keçi kılı çadır olarak istendi.
> - **Figürlü iki sahne** (`agac-golgesi`, `acilan-yol`) ikişer varyantla
>   üretildi; seçilen varyantta figür tamamen arkadan, başlıklı, yüz/profil yok.
> - **Rozet ikinci referansı:** onaylanan `rozetler/hz-musa/bolum-1.png`.
> - **Kapak ve harita durağı:** yayındaki `hz-nuh/kapak.png` ve
>   `hz-nuh/harita-kapak.jpg` görsel referans verilerek aynı aileden üretildi.
>   Kapak **yazısız**dır; "Hz. Musa" başlığı tasarımda eklenecek (final MD §C1).

> **Kitaba özgü ek yasaklar:** bebek, kan kırmızısı su, yılan saldırısı, ordu,
> asker, at ve savaş arabası hiçbir görselde yoktur; boğulan insan, ceset ve
> korkutucu karanlık yasaktır; put, sfenks ve hiyeroglif odakta değildir. Nur
> sütunu, on iki yol, cam/saydam su duvarı ve suyun içinde balık yoktur. **Hz.
> Musa yalnız iki sahnede** (`bolum-4/agac-golgesi.jpg`, `bolum-9/acilan-yol.jpg`)
> **arkadan ve uzak planda** görünür; yüz, profil ve yüz hattı yoktur. Bebek,
> anne, abla, Âsiye, Hz. Hârûn, Hz. Şuayb ve kızları, Firavun, sihirbazlar, ordu
> ve Hızır hiçbir görselde gösterilmez; diğer bütün sahnelerde insan figürü,
> silüet ve el yoktur.

> **Seçici yeniden üretim (17 Eki 2026 — Hasan; tasvir kuralı REVİZE 16 Eki 2026,
> PROJE-MODELI 6.4):** olayın öznesi insan olduğu hâlde figürsüz kalan 27 sahne figürlü
> olarak yeniden üretildi ve aynı adla yazıldı (aday listesi `GORSEL-YENIDEN-URETIM-ADAYLARI.md`
> §1; orada önerilen 34 adaydan 7 düşük öncelikli sahne üretilmedi). Katman 1 (arkadan, yüz yok):
> Hz. Musa, Hz. Hârûn, annesi, ablası, Âsiye, Hz. Şuayb ve kızları, Musa'nın eşi, genç yol
> arkadaşı, Hızır (kontra ışık) ve **iman eden sihirbazlar** (`bolum-7/bos-meydan`, Hasan
> kararı). Katman 2 (yüz görünebilir): Firavun (`sutunlu-salon`, `bos-meydan`, `irmak-ve-saray`),
> saraylılar, iman etmeden önceki sihirbazlar. Katman 3: kavga edenler, çobanlar, sütanneler,
> kalabalık, kafile. Yukarıdaki "Hz. Musa yalnız iki sahnede… bebek, anne, abla… gösterilmez"
> satırının kişi listesi o günkü uygulamadır; **bebek, ordu, asker, at, savaş arabası, yılan,
> boğulan insan yasakları sürer** (bebek hiçbir sahnede yok, sandık hep kapalı; ordu yalnız
> toz bulutu). Ayar: Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg` + karakter referansı
> `bolum-4/agac-golgesi` ve onaylı pilot `bolum-6/sutunlu-salon` (Musa kum rengi başlıklı
> cüppe, Hârûn zeytin yeşili cüppe + krem başlık). Ana dosyalar
> `gorsel-kaynaklari/musa-yeniden-uretim/`. Yüz/sakal sızması rötuşla temizlendi; elenen
> adaylar: bebek taşıyan kalabalık, haç biçimli kuyu direği, gülen yüzlü kavga, mızraklı muhafız.
> `books.ts` alt metinleri ve `KITAP-HZ-MUSA-ICERIK-final.md` (Alt metin + Figür alanları, §D tablosu) bu tabloyla eşitlendi (17 Eki 2026).

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-musa/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde ikiye yarılmış deniz ve aralarından ufka uzanan kuru yol. **Yazısız** üretilir; "Hz. Musa" yazısı tasarım aşamasında eklenir (final MD §C1) |
| `hz-musa/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda, su duvarları arasında ufka uzanan kuru yol |

### Bölüm 1 — Nehre Bırakılan Sandık

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta geniş bir nehir, kıyıda sazlıklar, hurma ağaçları ve uzakta düz damlı kerpiç evler |
| `hz-musa/bolum-1/gece-penceresi.jpg` | 1. Kısım | A | ✅ Hazır | Gece sessiz bir sokakta, kepenkleri kapalı kerpiç bir evin aralığından sızan sıcak kandil ışığı |
| `hz-musa/bolum-1/hazir-sandik.jpg` | 1. Kısım | A | ✅ Hazır | Şafak öncesi nehir kıyısında, sazlıklar arasında diz çökmüş, başörtülü bir kadın; arkadan görünüyor, elleri kapalı küçük bir sandığın üstünde *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-1/nehirdeki-sandik.jpg` | Devam | B | ✅ Hazır | Sabah sisinde kıyıda yan yana duran bir kadın ve küçük kızı; arkadan görünüyorlar, nehrin ortasında uzaklaşan kapalı bir sandık *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-1/sazlik-yolu.jpg` | Devam | B | ✅ Hazır | Sazlıkların arasında eğilerek yürüyen, başörtülü küçük bir kız; arkadan görünüyor, nehirde uzakta süzülen sandık *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-1/gun-dogarken.jpg` | Devam | B | ✅ Hazır | Güneş doğarken altın renge bürünen sakin bir nehir ve çok uzakta süzülen küçük bir sandık |

### Bölüm 2 — Annesine Dönen Bebek

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında nehrin karşı kıyısında yükselen büyük bir sarayın sütunları ve suya inen bahçesi |
| `hz-musa/bolum-2/dallardaki-sandik.jpg` | 1. Kısım | A | ✅ Hazır | Saray bahçesinin kıyısında sığ suya girip söğüt dallarının arasından kapalı bir sandığı çeken iki hizmetkâr *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-2/saray-salonu.jpg` | 1. Kısım | A | ✅ Hazır | Sütunlu saray salonunda örtülü bir beşiğin yanında arkası dönük oturan bir kadın; kapıya doğru üzgün çıkan birkaç kadın *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-2/saraya-giden-yol.jpg` | Devam | B | ✅ Hazır | Nehir kıyısındaki toprak yolda el ele saraya doğru koşan bir kadın ve küçük kızı; arkadan görünüyorlar *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-2/yumusak-ortu.jpg` | Devam | B | ✅ Hazır | Gün ışığında, sade bir yüzeyin üstünde özenle katlanmış yumuşak dokuma bir örtü ve yanında tek bir nilüfer çiçeği |
| `hz-musa/bolum-2/nilufer.jpg` | Devam | B | ✅ Hazır | Şafak ışığında nehir kıyısında yeni açmış tek bir nilüfer çiçeği |

### Bölüm 3 — Bir Anlık Kavga

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Tepeden bakışla, bir yanda sarayın yeşil bahçeleri, öbür yanda sıkışık kerpiç mahalleler ve aralarından akan nehir |
| `hz-musa/bolum-3/dar-sokak.jpg` | 1. Kısım | A | ✅ Hazır | Dar bir şehir sokağında yakalarından tutuşmuş iki adam, yerde devrik bir hurma sepeti; sokak ağzında arkası dönük duran bir figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-3/sabaha-kadar-kandil.jpg` | 1. Kısım | A | ✅ Hazır | Karanlık bir odada pencere kenarında yanan küçük bir kandil ve dışarıda sabaha dönen mavi gökyüzü |
| `hz-musa/bolum-3/sabah-sokagi.jpg` | Devam | B | ✅ Hazır | Sabah ışığında sokak kavşağında korkuyla geri çekilen bir adam ve onu durdurmak için elini kaldırmış, arkası dönük bir figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-3/sehir-kapisi.jpg` | Devam | B | ✅ Hazır | Şafakta yarı açık şehir kapısından çöle uzanan yolda yürüyen, arkası dönük, başlıklı bir yolcu *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-3/col-yolu.jpg` | Devam | B | ✅ Hazır | Sabah güneşinde kum tepelerinin arasından ufka uzanan, ayak izli tek bir yol |

### Bölüm 4 — Medyen'deki Kuyu

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Sıcak bir çöl öğleden sonrasında, kum tepelerinin ardında ufukta beliren yeşil bir vaha ve hurma ağaçları |
| `hz-musa/bolum-4/medyen-suyu.jpg` | 1. Kısım | A | ✅ Hazır | Taş kenarlı bir kuyunun başında birbirini iterek kovalarla su çeken çobanlar ve çevrelerine toplanmış koyun ve keçiler *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-4/bekleyen-suru.jpg` | 1. Kısım | A | ✅ Hazır | Kalabalık kuyudan uzakta bir akasyanın gölgesinde küçük sürüleriyle sabırla bekleyen iki başörtülü genç kadın; arkadan görünüyorlar *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-4/agac-golgesi.jpg` | Devam | B | ✅ Hazır | Uzak planda, bir ağacın gölgesinde arkası dönük oturan ve yüzü görünmeyen bir yolcu; önünde sulanmış sürü |
| `hz-musa/bolum-4/yasli-babanin-avlusu.jpg` | Devam | B | ✅ Hazır | Akşam ışığında incir ağacının yanında hasıra oturmuş, arkası dönük iki adam; yaşlı olanın eli gencin omzunda, önlerinde ekmek ve testi *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-4/otlaktaki-suru.jpg` | Devam | B | ✅ Hazır | Gün batımında yeşil bir yamaçta otlayan koyunlar ve bir kayaya dayalı duran uzun ahşap bir değnek |

### Bölüm 5 — Vadideki Ateş

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-5/kapak.jpg` | Açılış | A | ✅ Hazır | Ay ışığında kayalık dağların arasından geçen ıssız bir yol ve uzakta kurulmuş küçük bir çadır |
| `hz-musa/bolum-5/karanlik-vadi.jpg` | 1. Kısım | A | ✅ Hazır | Karanlık bir vadinin derinliğinde, çok uzakta küçük ve sıcak bir ateş ışığı |
| `hz-musa/bolum-5/cikarilan-pabuclar.jpg` | 1. Kısım | A | ✅ Hazır | Taşlı bir vadi zemininde yan yana çıkarılmış eski deri sandaletler; üzerlerine uzaktan sıcak bir ışık vuruyor |
| `hz-musa/bolum-5/yerdeki-asa.jpg` | 1. Kısım | A | ✅ Hazır | Ay ışığında taşlı zeminde uzanan sade ahşap bir asa ve çevresindeki kumda kıvrımlı izler |
| `hz-musa/bolum-5/yildizli-gece.jpg` | Devam | B | ✅ Hazır | Dağların üstünde açılan geniş, yıldızlı bir gökyüzü ve vadinin üzerinde yumuşak bir aydınlık |
| `hz-musa/bolum-5/kamp-atesi.jpg` | Devam | B | ✅ Hazır | Şafakta elinde asasıyla çadıra doğru yürüyen, arkası dönük bir adam; çadırın önünde ateşin başında oturan başörtülü bir kadın *(figürlü yeniden üretim, 17 Eki 2026)* |

### Bölüm 6 — Saraydaki Soru

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah sisi içinde nehir kıyısında uzanan büyük bir şehir, yüksek duvarlar ve uzakta dikilitaşlar |
| `hz-musa/bolum-6/uzak-saray.jpg` | 1. Kısım | A | ✅ Hazır | Taş döşeli geniş bir yolun sonunda, yüksek basamaklarla yükselen görkemli bir saray |
| `hz-musa/bolum-6/buyuk-kapi.jpg` | 1. Kısım | A | ✅ Hazır | Devasa kapalı saray kapısının önündeki basamaklarda yan yana duran, arkası dönük iki başlıklı adam; birinin elinde asa *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-6/sutunlu-salon.jpg` | Devam | B | ✅ Hazır | Sütunlu loş taht salonunda tahtta oturan hükümdar ve yanındaki saraylılar; ön planda arkası dönük duran iki başlıklı adam *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-6/dagilan-ulaklar.jpg` | Devam | B | ✅ Hazır | Akşamüstü, şehrin dışından farklı yönlere uzanan yollar ve her yolun üstünde uzaklaşan ince toz bulutları |
| `hz-musa/bolum-6/aksam-nehri.jpg` | Devam | B | ✅ Hazır | Akşam ışığında sakin akan nehir, kıyıdaki kumda yan yana uzanan iki sıra ayak izi ve arkada uzak sarayın silueti |

### Bölüm 7 — Ziynet Günü

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah güneşinde büyük bir meydana açılan geniş ve tertemiz bir şehir caddesi |
| `hz-musa/bolum-7/ziynet-meydani.jpg` | 1. Kısım | A | ✅ Hazır | Bayram süsleriyle dolu kalabalık bir meydan; ortası boş kum alan ve bir kenarda koyu cüppeli bir grup *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-7/kivrilan-ipler.jpg` | 1. Kısım | A | ✅ Hazır | Kumun üstüne saçılmış ipler ve gölgeleri kıvrılıyor gibi; karşıda koyu cüppeli sihirbazlar ve geri çekilen kalabalık, ön planda arkası dönük iki adam *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-7/sessiz-kum.jpg` | 1. Kısım | A | ✅ Hazır | Boşalmış kum meydanda şaşkınlıkla donup kalmış koyu cüppeli sihirbazlar; ön planda asasıyla arkası dönük duran bir adam *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-7/bos-meydan.jpg` | Devam | B | ✅ Hazır | İkindi ışığında kumda yan yana diz çöküp eğilmiş koyu cüppeli adamlar, arkadan görünüyor; uzakta terasta onları gösteren hükümdar ve devrik altın kâse *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-7/ilk-yildiz.jpg` | Devam | B | ✅ Hazır | Alacakaranlıkta şehrin düz damlarının üstünde parlayan tek ve parlak bir akşam yıldızı |

### Bölüm 8 — Tutulmayan Sözler

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-8/kapak.jpg` | Açılış | A | ✅ Hazır | Bulutlu bir sabahta nehir kıyısındaki tarlalar, uzakta şehir ve gökyüzünde ağır, gri bulutlar |
| `hz-musa/bolum-8/kuru-tarla.jpg` | 1. Kısım | A | ✅ Hazır | Çatlamış toprakta kurumuş buğday sapları, boş bir sulama kanalı ve kenarda duran boş bir toprak küp |
| `hz-musa/bolum-8/cekirge-bulutu.jpg` | 1. Kısım | A | ✅ Hazır | Yeşil tarlaların üstünde ufuktan yaklaşan, uzak ve koyu bir çekirge bulutu |
| `hz-musa/bolum-8/irmak-ve-saray.jpg` | Devam | B | ✅ Hazır | Akşam ışığında kanallara bölünmüş nehrin kıyısındaki saray terasında halkına kolunu uzatarak konuşan hükümdar; aşağıda toplanmış insanlar *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-8/kandilli-evler.jpg` | Devam | B | ✅ Hazır | Gece kerpiç bir odada kandil ışığında hasırlara oturmuş, birlikte dua edip birbirine güç veren aileler *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-8/safak-yolu.jpg` | Devam | B | ✅ Hazır | Şafak vakti şehrin dışından çöle doğru uzanan geniş ve boş bir yol |

### Bölüm 9 — Denizde Açılan Yol

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-9/kapak.jpg` | Açılış | A | ✅ Hazır | Yıldızlı bir gecede şehrin dışında açık kalmış bir kapı ve çöle doğru uzanan yol |
| `hz-musa/bolum-9/ay-isiginda-izler.jpg` | 1. Kısım | A | ✅ Hazır | Ay ışığında kumda denize doğru yürüyen uzun bir kafile; aileler, çocuklar ve yük taşıyan eşekler, önde iki küçük figür *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-9/toz-bulutu.jpg` | 1. Kısım | A | ✅ Hazır | Gün doğarken sahilde denize bakan, çocuklarını tutan aileler; ufukta yükselen büyük bir toz bulutu *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-9/acilan-yol.jpg` | Devam | B | ✅ Hazır | İkiye yarılmış denizin ortasında uzanan kuru bir yol; yolun başında, arkası dönük, asasını kaldırmış küçük bir figür |
| `hz-musa/bolum-9/sakin-deniz.jpg` | Devam | B | ✅ Hazır | Sabah ışığında yeniden durulmuş, geniş ve sakin bir deniz; kıyıya yumuşak dalgalar vuruyor |
| `hz-musa/bolum-9/karsi-kiyi.jpg` | Devam | B | ✅ Hazır | Gün doğumunda deniz kıyısındaki tepede ellerini açıp şükreden kalabalık; denizden tepeye uzanan ayak izleri *(figürlü yeniden üretim, 17 Eki 2026)* |

### Bölüm 10 — İki Denizin Buluştuğu Yer

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-10/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında kayalık bir sahil boyunca uzanan, deniz kenarında kıvrılan ıssız bir patika |
| `hz-musa/bolum-10/kaya-ve-deniz.jpg` | 1. Kısım | A | ✅ Hazır | İki renkli suyun buluştuğu kıyıda kayanın üstünde oturan, arkası dönük iki yolcu; suda halkalanarak uzaklaşan bir iz *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-10/kiyidaki-izler.jpg` | 1. Kısım | A | ✅ Hazır | Kıyıdaki kayanın üstünde kontra ışıkta duran yeşil cüppeli bir figür; ona doğru yürüyen, arkası dönük iki yolcu *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-10/serce-ve-damla.jpg` | 1. Kısım | A | ✅ Hazır | Geniş denizin üstünde alçaktan uçan bir serçe ve gagasından düşen tek bir parlak su damlası |
| `hz-musa/bolum-10/duzelen-duvar.jpg` | Devam | B | ✅ Hazır | Akşam ışığında eski bir taş duvarın dibinde diz çöküp taşları harçla yerine oturtan yeşil cüppeli bir adam ve yanında asasıyla duran bir yolcu; ikisi de arkadan *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-musa/bolum-10/ayrilan-yollar.jpg` | Devam | B | ✅ Hazır | Gün batımında deniz kıyısında ikiye ayrılan bir yol; biri kıyı boyunca, öbürü tepelere doğru uzanıyor |

---

## 4f. Hz. Eyyûb (`bookKey: eyyub`) — 30 görsel

**Durum (15 Eki 2026):** 30 sahne slotunun **30'u da gerçek görsel**
(`/gorsel-uretim eyyub`); kitap kapağı, harita durağı, 5 rozet ve madalya da
teslim edildi. Rozet ve madalya **çerçevesiz kare**dir (§6.2), çerçeveyi Hasan
ekler. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-EYYUB-ICERIK-final.md` §B, §C, §D ve §H'dedir
(İngilizce ana üretim promptu, ortak stil bloğu, ortak negatif ve rozet sembol
stili bloğu dahil); aşağıdaki tablo yalnız dosya adı, akıştaki yer ve `alt`
metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 / Devam 3).

> **Üretim kararları (15 Eki 2026, `/gorsel-uretim eyyub`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`).
> Kitaba özgü notlar:
> - **Kapı aralığı:** Model aralık kapıdan dışarıyı köy, kule ve küçük bir insan
>   figürüyle dolduruyor (pilotta `dolu-ambar` bu yüzden reddedildi). Açıklıktan
>   dışarısı "yalnız parlak ışık, ayrıntı yok" diye yazıldı.
> - **Arka plana sızan köy ve ağıl:** Tepe ve manzara sahnelerinde model
>   kendiliğinden köy, koyunlu ağıl, kulübe, testi ve sepet ekliyor (yaklaşık on
>   deneme bu yüzden reddedildi; birinde ağılda küçük bir insan figürü vardı). Bu
>   sahnelerde negatife `houses, village, sheepfold, sheep, jugs, baskets`
>   eklendi, prompt "yalnız şunlar var" cümlesiyle bitirildi.
> - **Zeytin ağacı sürekliliği:** B3–B4'teki ağaç sahnelerine onaylanan
>   `bolum-3/koy-disi.jpg` görsel referans verildi; aynı ağaç tekrar eder.
> - **Figürlü iki sahne** (`bugday-tarlasi`, `pinar-basinda`) dörder varyantla
>   üretildi. İlk varyantlarda kollar seçilebildiği için figür "başı ve omuzları
>   örten, ayak bileğine inen, iki kolu da tamamen saran geniş pelerin" diye
>   tarif edildi. Seçilen varyantlarda figür tamamen arkadan; yüz, profil, el ve
>   kol yok. `pinar-basinda`'da figür kadraj yüksekliğinin yaklaşık üçte biri
>   kadar (brif "üçte birden küçük" diyor); Hasan bu hâliyle onayladı (15 Eki 2026).
> - **Pınar:** Model "spring" kelimesini taş havuz ve fıskiyeye çeviriyor;
>   `kaynayan-pinar` ve rozet 5'te negatife `round stone basin, pool ring,
>   water jet` eklendi.
> - **Rozet ikinci referansı:** onaylanan pilot `rozetler/hz-eyyub/bolum-1.png`.
>   Sembol %60 güvenli alana ancak "küçük, kompakt grup, kenarlara yaklaşmıyor"
>   cümlesiyle sığdı; arka plan "yalnız ışık ve gökyüzü, manzara yok" diye
>   yazılmazsa kilise kulesi ve köy çıkıyor.
> - **Kapak ve harita durağı:** yayındaki `hz-musa/kapak.png` ve
>   `hz-musa/harita-kapak.jpg` görsel referans verilerek aynı aileden üretildi.
>   Kapak **yazısız**dır; "Hz. Eyyûb" başlığı tasarımda eklenecek (final MD §C1).

> **Kitaba özgü ek yasaklar:** hasta ya da yatan beden, yara, bandaj, yıkıntı,
> mezar, cenaze, sel, yangın, ölü hayvan, çekirge, altın para, altın yağmuru,
> hazine, put, tapınak, kubbe ve minare hiçbir görselde yoktur. Şeytan, melek ve
> ışıktan figür çizilmez; Allah'ın seslenişi ışık-figür olarak gösterilmez. **Hz.
> Eyyûb yalnız iki sahnede** (`bolum-1/bugday-tarlasi.jpg`,
> `bolum-5/pinar-basinda.jpg`) **arkadan, uzak planda ve sağlıklı hâliyle**
> görünür; yüz, profil ve eller yoktur. Eşi, çocukları, dostları, köy halkı ve
> haberci hiçbir görselde gösterilmez; diğer bütün sahnelerde insan figürü, silüet
> ve el yoktur (sahne negatifine `human figure, person, silhouette, hands`,
> figürsüz sahnelere ayrıca `birds, tipi, tent` eklenir). Köyün dışındaki yer
> **ev olarak değil**, tepede tek başına duran yaşlı bir zeytin ağacı ve
> gölgesindeki hasırla gösterilir (B3–B5'in görsel çapası). B3'teki köy çeşmesi
> çizilmez (B5'teki pınarla karışmasın). Pınar "su sütunu" değil, taşlardan
> taşan alçak bir kaynaktır.

> **Figür kuralı güncellemesi ve seçici yeniden üretim (17 Eki 2026 — Hasan; tasvir kuralı
> REVİZE 16 Eki 2026, PROJE-MODELI 6.4):** Eyyûb'un görsel kuralları yeni tasvir kuralına
> çekildi. **Katman 1** (yüz hiç görünmez; arkadan, uzak plan ya da kontra ışık): Hz. Eyyûb
> (yalnız sağlıklı hâliyle), eşi ve çocukları. **Katman 3** (yüz görünebilir): dostları,
> ziyaretçiler, haberci, köy halkı, yetimler ve yaşlılar. Yukarıdaki "Hz. Eyyûb yalnız iki
> sahnede… yüz, profil ve eller yoktur. Eşi, çocukları, dostları, köy halkı ve haberci
> hiçbir görselde gösterilmez" kaydı 15 Eki 2026'daki uygulamadır; **el yasağı kalktı**
> (genel kuralda yalnız yüz yasağı var). **Sürenler:** hasta ya da yatan beden, yara,
> bandaj, şeytan, ışık-figür ve listedeki diğer bütün nesne yasakları; bu yüzden Hz. Eyyûb
> hastalık döneminde (B3–B4 ve B5'te iyileşmeden önce) kadraj dışında kalır. Karakter
> blokları final MD §B'de; Eyyûb'un referansı `bolum-5/pinar-basinda`. Aday listesi
> `GORSEL-YENIDEN-URETIM-ADAYLARI.md` §3.
>
> **Üretim (17 Eki 2026):** 10 adaydan yüksek ve orta öncelikli **8 sahne** figürlü olarak
> yeniden üretildi ve aynı adla yazıldı (`acik-sofra`, `meydan-agaci`, `tozlu-yol`,
> `kapidaki-sandaletler`, `gidip-gelen-izler`, `ziyaret-patikasi`, `iki-testi`,
> `yeseren-bag`); düşük öncelikli `dolu-ambar` ve `tek-kandil` üretilmedi (Musa'daki gibi).
> Ayar: Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg` + karakter referansı
> `bolum-5/pinar-basinda`; ağaç sahnelerinde `bolum-3/koy-disi`; `iki-testi`'de eşin
> onaylanan `gidip-gelen-izler` figürü. 15 aday + 2 rötuş (~1.520 kredi). Elenenler:
> `acik-sofra`'da Eyyûb'un profili ve sakalı görünen aday; `kapidaki-sandaletler`'de
> Eyyûb'u kapının dışında ayakta, dostları gülümser çizen iki aday (bir yeniden üretim
> turuyla çözüldü). Rötuş: `tozlu-yol`'da ağıldaki koyunlar ve yamaçtaki keçiler silindi
> (metin "ağıllar bomboş" diyor); `yeseren-bag`'de vidalı şarap presi silindi. Ana
> dosyalar `gorsel-kaynaklari/eyyub-yeniden-uretim/`. `books.ts` alt metinleri ve final MD
> (Alt metin + Figür, §H tablosu) bu tabloyla eşitlendi.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-eyyub/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde taşlar arasından kaynayan pınar ve yanında yeşeren genç bir ağaç. **Yazısız** üretilir; "Hz. Eyyûb" yazısı tasarım aşamasında eklenir (final MD §C1) |
| `hz-eyyub/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda, taşların arasından kaynayan berrak bir pınar |

### Bölüm 1 — Bereketli Günler

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında yamaçlarında bağlar ve buğday tarlaları uzanan yeşil bir vadi ve ortasında taş evlerden küçük bir köy |
| `hz-eyyub/bolum-1/bugday-tarlasi.jpg` | 1. Kısım | A | ✅ Hazır | Öğleden sonra ışığında uçsuz bucaksız bir buğday tarlası ve tarlanın içinde, uzakta, arkası dönük yürüyen küçük bir figür |
| `hz-eyyub/bolum-1/dolu-ambar.jpg` | 1. Kısım | A | ✅ Hazır | Aralık ahşap kapısından içeri ışık giren taş bir ambar; tavana kadar yığılmış buğday çuvalları ve yere dökülmüş taneler |
| `hz-eyyub/bolum-1/acik-sofra.jpg` | Devam | B | ✅ Hazır | Bağ çardağının altında, avluya serilmiş sofranın çevresinde oturan çocuklar ve yaşlılar; arkası dönük, gül rengi pelerinli bir adam bir çocuğa ekmek uzatıyor, arkada açık avlu kapısı *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-1/meydan-agaci.jpg` | Devam | B | ✅ Hazır | Akşam ışığında köy meydanındaki yaşlı çınarın altında taş sekilere oturmuş birkaç kişi ve ön planda onlara dönük, arkadan görünen pelerinli bir adam *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-1/ufuktaki-bulut.jpg` | Devam | B | ✅ Hazır | Gün batımında ön planda bir bağ çardağı ve bereketli vadi; çok uzakta ufukta toplanan gri bulutlar |

### Bölüm 2 — Art Arda Gelen Haberler

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Alçak gri bulutların altında sessiz bir sabah; taş evler, bağlar ve ovaya uzanan tarlalar |
| `hz-eyyub/bolum-2/tozlu-yol.jpg` | 1. Kısım | A | ✅ Hazır | Ovadan köye uzanan taş duvarlı toprak yolda, tozu ardında bırakarak soluk soluğa koşan genç bir haberci; yol kenarında boş bir ağıl *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-2/bos-agil.jpg` | 1. Kısım | A | ✅ Hazır | Taş duvarlı boş bir ağıl; ahşap kapısı açık kalmış, yerde birkaç tutam saman |
| `hz-eyyub/bolum-2/bos-ambar.jpg` | Devam | B | ✅ Hazır | Aralık kapısından ışık giren bomboş bir taş ambar; köşede devrilmiş boş bir sepet |
| `hz-eyyub/bolum-2/tek-kandil.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında taş bir avlu; ocakta küllenmiş közler ve duvar oyuğunda sakin sakin yanan tek bir kil kandil |
| `hz-eyyub/bolum-2/kapidaki-sandaletler.jpg` | Devam | B | ✅ Hazır | Akşam, taş bir evin eşiğinde yan yana bırakılmış sandaletler; içeride kandil ışığında hasıra oturmuş, arkası dönük pelerinli bir adam ve onu üzüntüyle teselli eden üç dost *(figürlü yeniden üretim, 17 Eki 2026)* |

### Bölüm 3 — Herkes Gidince

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta uzaktan görünen, kapıları kapalı taş evler ve köyden tepedeki tek bir zeytin ağacına uzanan ince bir patika |
| `hz-eyyub/bolum-3/bos-tarla.jpg` | 1. Kısım | A | ✅ Hazır | Bakımsız kalmış bir buğday tarlası, başakların arasında yabani otlar ve taş duvara yaslanmış ahşap bir saban |
| `hz-eyyub/bolum-3/koy-disi.jpg` | 1. Kısım | A | ✅ Hazır | Köyün dışında, alçak bir tepede tek başına duran yaşlı bir zeytin ağacı ve gölgesine serilmiş sade bir hasır; arkada uzakta köy |
| `hz-eyyub/bolum-3/gidip-gelen-izler.jpg` | Devam | B | ✅ Hazır | Sabah ışığında köyden tepedeki zeytin ağacına uzanan, ayak izleriyle dolu patikada omzunda testiyle yürüyen başörtülü bir kadın; arkadan görünüyor *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-3/dolu-testi.jpg` | Devam | B | ✅ Hazır | Zeytin ağacının gölgesinde, hasırın yanında ağzına kadar su dolu bir toprak testi ve üzeri örtülü küçük bir ekmek sepeti |
| `hz-eyyub/bolum-3/huzurlu-safak.jpg` | Devam | B | ✅ Hazır | Şafakta zeytin ağacının ardından doğan güneş; dalların arasından süzülen ilk ışık hasıra düşüyor |

### Bölüm 4 — Kalpten Gelen Dua

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Öğle güneşinde kuru otlu tepeler, taş duvarlar ve tepede tek başına duran küçük bir zeytin ağacı |
| `hz-eyyub/bolum-4/ziyaret-patikasi.jpg` | 1. Kısım | A | ✅ Hazır | Kuru otların arasından tepedeki zeytin ağacına uzanan patikada yürüyen iki yaşlı ve bir genç adam; arkadan görünüyorlar *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-4/kirik-dal.jpg` | 1. Kısım | A | ✅ Hazır | Bulutlu gökyüzü önünde, zeytin ağacının kırılıp sarkmış ama yaprakları hâlâ yeşil bir dalı |
| `hz-eyyub/bolum-4/genc-fidan.jpg` | Devam | B | ✅ Hazır | Kalın gövdeli yaşlı zeytin ağacının hemen yanında dimdik yükselen ince, genç bir fidan |
| `hz-eyyub/bolum-4/tas-sekiler.jpg` | Devam | B | ✅ Hazır | Zeytin ağacının gölgesinde, ziyaretçilerin oturduğu ve şimdi boş kalan, yarım daire biçiminde üç düz taş |
| `hz-eyyub/bolum-4/gece-gogu.jpg` | Devam | B | ✅ Hazır | Gece, tepedeki zeytin ağacının üzerinde uçsuz bucaksız yıldızlı bir gökyüzü ve ağacın dibinde yanan küçük bir kandil |

### Bölüm 5 — Ayağının Altındaki Pınar

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-5/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak vakti, taşlı bir tepede yaşlı zeytin ağacı; gökyüzü pembe ve altın, toprağa ilk ışık düşüyor |
| `hz-eyyub/bolum-5/kaynayan-pinar.jpg` | 1. Kısım | A | ✅ Hazır | Yakın planda, taşların arasından kaynayan serin ve berrak su; küçük halkalar ve ışıkta parlayan damlalar |
| `hz-eyyub/bolum-5/pinar-basinda.jpg` | 1. Kısım | A | ✅ Hazır | Taşlar arasından akan pınarın başında, sabah ışığına bürünmüş, arkası dönük ayakta duran bir figür |
| `hz-eyyub/bolum-5/iki-testi.jpg` | Devam | B | ✅ Hazır | Gün doğarken taşlar arasından akan pınarın başında yan yana duran pelerinli bir adam ve başörtülü bir kadın; arkadan görünüyorlar, yanlarında dolu iki toprak testi *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-5/yeseren-bag.jpg` | Devam | B | ✅ Hazır | Sabah ışığında yeniden yeşermiş bağlarda üzüm toplayan köylüler; arkada buğday tarlaları ve taş evli köy *(figürlü yeniden üretim, 17 Eki 2026)* |
| `hz-eyyub/bolum-5/yeseren-agac.jpg` | Devam | B | ✅ Hazır | İkindi altın ışığında, kurumuş eski dalların arasından yükselen taze yeşil yapraklı genç bir ağaç ve dibinde ince bir su şeridi |

## 4g. Hz. İbrahim (`bookKey: ibrahim`) — 54 görsel

**Durum (17 Eki 2026):** aktarıldı ve **yayında** (katalogda "published", `yayinTarihi:
2026-10-17`). 54 sahne slotunun **54'ü de gerçek görsel** (`/gorsel-uretim ibrahim`); kitap kapağı,
harita durağı, 9 rozet ve madalya da teslim edildi. Rozet ve madalya **çerçevesiz
kare**dir (§6.2), çerçeveyi Hasan ekler. Sesli anlatım hâlâ yer tutucudur. Briflerin
tamamı `kitap-icerikleri/KITAP-HZ-IBRAHIM-ICERIK-final.md` §B, §C, §D ve §H'dedir
(İngilizce ana üretim promptu, ortak stil bloğu, ortak negatif, **karakter
blokları (EN)** ve rozet sembol stili bloğu dahil); aşağıdaki tablo dosya adı,
akıştaki yer, figür bilgisi ve `alt` metnini kaydeder. Bölüm başına 1 açılış + 5
sahne (1. Kısım 2 / Devam 3).

> **Figür kuralı — bu kitap yeni kurala göre yazılan ilk aktarımdır** (REVİZE
> 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2). 54 sahnenin **26'sı figürlüdür**
> (bölüm başına 2–4). "Figür" sütunu final MD'deki sahne "Figür:" alanının
> **aynısıdır**; `—` figürsüz sahnedir. **Katman 1** — Hz. İbrahim (genç: B1–B6,
> yetişkin: B7–B9), Âzer, Hz. Lût, Sâre, Hâcer, bebek Hz. İsmail: yüz hiç
> görünmez (arkadan, uzak plan, gölge, örtü ya da kontra ışık); bebek hep örtü
> içinde. **Katman 2** — kral ve saray çevresi; **Katman 3** — pazar, meydan,
> bayram kalabalığı, odun taşıyanlar, çobanlar: yüz gösterilebilir, sakin,
> korkutucu ve karikatür değil. Figürlü sahnede ilgili karakter bloğu promptun
> sonuna (stil bloğundan önce) aynen eklenir; Katman 1 kişinin bulunduğu sahnenin
> negatifine yüz yasağı (`visible face, facial features, eyes, mouth, profile,
> blank face, featureless face`), figürsüz sahnenin negatifine `human figure,
> person` yazılıdır. Hz. Lût `bolum-3/iki-arkadas` ve `bolum-7/yola-cikis`'te,
> Sâre yalnız `bolum-7/yola-cikis`'te görünür; karakter tutarlılığı için ilk
> onaylanan Hz. İbrahim sahnesi sonrakilere ikinci referans verilir (§6.2).

> **Kitaba özgü ek yasaklar:** Katman 1 kişilerin yüzü, yüzlü put (putlar yalnız
> **yüzsüz, kaba taş ve kil biçimler**, gölgede ya da arkadan), melek ve **misafir
> melekler** (B9'da yalnız Hz. İbrahim figürlüdür), açık bebek yüzü, alevlerin
> içinde tehlikedeki insan, bağlı el, mancınık, yanan canlı ve darbe anı hiçbir
> görselde yoktur. Ateş sahnelerinde alevler uzak ve yumuşaktır; Hz. İbrahim
> alevlerin geri çekildiği serin, yeşil bir halkada huzurla oturur. Vadide (B8)
> **Kâbe ve su kaynağı çizilmez** (Hz. İsmail kitabı); vadide yapı yoktur. Cami,
> kubbe, minare, hilal, Yunan sütunu, Roma tapınağı, piramit ve yazı ortak
> negatiftedir. **`tent` istisnası (Hz. Musa emsali):** figürsüz sahnelere
> eklenen `birds, tipi, tent` negatifinden `tent`, çadırın sahnenin parçası olduğu
> üç figürsüz sahnede (`bolum-8/kapak`, `bolum-9/kapak`, `bolum-9/bos-patika`)
> çıkarılır; çadırlar keçi kılı çadır olarak istenir. Görsel dünya üç mekândır:
> B1–B6 nehir kıyısında kerpiç şehir, B7 ve B9 zeytinli yeşil tepeler ve keçi kılı
> çadırlar, B8 koyu tepeler arasında taşlı, kurak vadi (final MD §B).

> **Üretim kararları (17 Eki 2026, `/gorsel-uretim ibrahim`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`). Figürlü
> sahnelerde ikişer-üçer varyant üretildi; seçilen her Katman 1 başı büyütülerek
> kontrol edildi. Kitaba özgü notlar:
> - **Ad prompta girmez** (Hz. Yunus emsali): "Ibrahim", "Azer", "Lut", "Sara", "Hajar"
>   modele "a tall young man / an older craftsman / a slender woman seen from behind"
>   olarak verildi; karakter blokları adsız eklendi.
> - **Karakter referansları:** Hz. İbrahim (genç) için onaylanan pilot
>   `bolum-1/batan-gunes`, (yetişkin) için `bolum-7/baba-evi`; Âzer için
>   `bolum-2/atolye-kapisi`; Hz. Lût için `bolum-3/iki-arkadas`; Hâcer için
>   `bolum-8/issiz-vadi` sonraki sahnelere ikinci referans verildi. Model yetişkin
>   Hz. İbrahim'e B7–B9'da düz bir değnek, `tepeden-bakis`'te başörtüsüne ince bir bağ
>   (agal benzeri) ekledi; Yunus emsaliyle bırakıldı.
> - **Yüz hattı ve sakal sızması:** `acik-kapi`'nin ilk üç adayında Âzer'in başlığının
>   kenarından sakal ucu görünüyordu, reddedildi; başlığın boynu ve çene yanlarını
>   örttüğü yazılarak yeniden üretildi. `besik`'te Hâcer'in örtüsünün ön kenarında belli
>   belirsiz bir yüz hattı vardı; yalnız o bölge maskelenip örtü kıvrımıyla rötuşlandı.
> - **Bebek yüzü:** `issiz-vadi`'de model altı denemenin altısında da bebeğin başını
>   Hâcer'in omzundan gösterdi (birinde yüz açık). Hâcer'in tam arkadan göründüğü aday
>   seçildi, bebeğin başı ve örtünün kenarı maskelenip şal kıvrımıyla rötuşlandı. İlk
>   rötuş "bebeği örtüyle sar" denince yüzü belirginleştirdi, reddedildi; ikinci rötuş
>   promptunda bebekten hiç söz edilmedi. Bebek bu sahnede görünmez, şalın içindedir.
> - **Kubbe sızması:** şehir sahnelerine pozitifte "every roof is flat", negatifte
>   `domes, domed roofs, rounded roofs, cupolas` eklendi. `parlak-yildiz`'in seçilen
>   adayında uzak kasabada küçük bir kubbe vardı; o bölge iki rötuşla düz damlı evlere
>   çevrildi.
> - **Figür boyu:** `parlak-yildiz` ve `tepeden-bakis` brifte "kadrajın onda birinden
>   küçük"tür; ilk denemelerde figür üçte bir boyuttaydı. "tiny distant figure" ile
>   yeniden üretildi; seçilenlerde figür küçük ama onda birin biraz üstünde.
> - **Reddedilen diğerleri:** `dogan-gunes`'in ilk iki adayında direk/tel benzeri
>   modern çizgiler ve kemerli su yolu vardı; `besik`'in bir adayında hilal vardı;
>   `uzaklasan-yol`'un bir adayında mezara benzeyen taş oda vardı; `cadir-ve-kuyu`'da
>   çobanlardan biri klasik "İsa tasviri"ni andırdığı için öbür aday seçildi.
> - **Rozet ikinci referansı:** onaylanan pilot `rozetler/hz-ibrahim/bolum-1.png`.
>   B3 rozetinin ilk adayları mezar taşına benziyordu ve yol eksikti; B7'de değnek
>   karenin köşelerine taşıyordu; ikisi yeniden üretildi. B4 rozetinde ışık şeridi
>   brif gereği soru işaretini çağrıştırır; seçilen aday ince bir ışık kıvrımı ve
>   ayrı bir noktadır, yazı karakteri gibi kalın değildir — Hasan'ın onayına bırakıldı.
>   B5 ve B7 rozetlerinde yol karenin alt kenarına iner; çerçevede alt uç kırpılabilir,
>   sembol yine okunur.
> - **Kapak ve harita durağı:** yayındaki `hz-yunus/kapak.png` ve
>   `hz-yunus/harita-kapak.jpg` görsel referans verilerek aynı aileden üretildi. Kapak
>   **yazısız**dır; "Hz. İbrahim" başlığı tasarımda eklenecek. Harita durağında alevin
>   ucu madalyon çerçevesinin üst kenarına hafifçe taşar.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-ibrahim/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde sabah yıldızı ve serinlemiş korlardan yükselen yeşil bir dal. **Yazısız** üretilir; "Hz. İbrahim" yazısı tasarım aşamasında eklenir (final MD §C1) |
| `hz-ibrahim/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda, alevlerin ortasında açan serin yeşil yapraklar (B6 rozetiyle aynı imge) |

### Bölüm 1 — Batmayan Işığı Arayan

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-1/kapak.jpg` | Açılış | A | — | ✅ Hazır | Alacakaranlıkta geniş bir nehrin kıyısında düz damlı kerpiç evler, hurma ağaçları ve gökte beliren ilk yıldızlar |
| `hz-ibrahim/bolum-1/parlak-yildiz.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; yalnız arkadan, uzak plan, başı örtülü; yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). | ✅ Hazır | Gece, alçak bir tepenin üstünde arkası dönük oturan genç Hz. İbrahim ve tam karşısında, lacivert gökte diğerlerinden parlak tek bir yıldız |
| `hz-ibrahim/bolum-1/batan-ay.jpg` | 1. Kısım | A | — | ✅ Hazır | Şafaktan hemen önce, nehrin ve hurma ağaçlarının ardındaki ufka yavaşça inen solgun dolunay |
| `hz-ibrahim/bolum-1/batan-gunes.jpg` | Devam | B | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Şehir halkı — Katman 3; uzakta, küçük ve ayrıntısız. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Gün batımında kızıl güneş ufka iniyor; ön planda düz bir damda arkası dönük duran Hz. İbrahim, uzaktaki damlarda güneşe dönmüş küçük insan toplulukları |
| `hz-ibrahim/bolum-1/yildizli-gok.jpg` | Devam | B | — | ✅ Hazır | Uçsuz bucaksız yıldızlı bir gece göğü; altında karanlık ova, ince bir nehir şeridi ve uzakta birkaç küçük ışık |
| `hz-ibrahim/bolum-1/safak-yolu.jpg` | Devam | B | — | ✅ Hazır | Şafakta nehir boyunca kerpiç şehrin kapısına uzanan toprak bir yol; gökte sönmeye yüz tutmuş tek bir parlak yıldız |

### Bölüm 2 — Ey Babacığım

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-2/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında üst üste yükselen kerpiç evler, dar sokaklar, damlarda kuruyan hasırlar ve arkada basamaklı bir kerpiç yapı |
| `hz-ibrahim/bolum-2/atolye-kapisi.jpg` | 1. Kısım | A | Âzer — Katman 1 (yakın akraba); tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Âzer. | ✅ Hazır | Dar bir kerpiç sokakta kapısı açık bir atölye; içeride sırtı dönük, raflara yeni bir biçim yerleştiren Âzer ve raflarda gölgede duran küçük, yüzsüz biçimler |
| `hz-ibrahim/bolum-2/atolye-tezgahi.jpg` | 1. Kısım | A | — | ✅ Hazır | Atölyede ahşap bir tezgâh; üzerinde keskiler, tokmak, talaşlar ve kaba yontulmuş taş bir blok; pencereden giren ışıkta uçuşan taş tozu |
| `hz-ibrahim/bolum-2/acik-kapi.jpg` | Devam | B | Âzer ve Hz. İbrahim — ikisi de Katman 1; tamamen arkadan ve kontra ışıkta, yüz ve profil görünmez. Karakter blokları: Âzer; Hz. İbrahim (genç). | ✅ Hazır | Atölyenin içinden kapıya bakış; kapıdan dolan sabah ışığında arkası dönük iki figür: tezgâhın başında oturan Âzer ve yanında ayakta duran genç Hz. İbrahim |
| `hz-ibrahim/bolum-2/pencerede-kandil.jpg` | Devam | B | — | ✅ Hazır | Akşam karanlığında kerpiç bir evin küçük penceresinde yanan tek bir kil kandil; dışarıda lacivert gökte ilk yıldızlar |
| `hz-ibrahim/bolum-2/nehir-boyu.jpg` | Devam | B | — | ✅ Hazır | Sabah ışığında nehrin kıyısından şehrin meydanına çıkan taş basamaklar; kenarda toprak küpler ve sazlıklar |

### Bölüm 3 — Sizi Duyuyorlar mı?

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-3/kapak.jpg` | Açılış | A | Pazardakiler — Katman 3 (sıradan halk); yüz gösterilebilir, doğal ve sakin. Peygamber ya da akrabası bu sahnede yok. | ✅ Hazır | Öğle ışığında nehir kıyısında kurulmuş bir pazar yeri; hasır gölgelikler altında hurma, tahıl ve küp satan, alışveriş yapan insanlar |
| `hz-ibrahim/bolum-3/meydan.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Halk — Katman 3; yüz gösterilebilir, sakin. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Kerpiç evlerle çevrili meydanda yaşlı bir hurma ağacının gölgesinde toplanmış insanlar; ön planda onlara dönük, arkası izleyiciye bakan Hz. İbrahim |
| `hz-ibrahim/bolum-3/bos-meydan.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; arkadan, uzak plan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Başka insan yok. | ✅ Hazır | Akşam ışığında boşalmış meydan; hurma ağacının uzun gölgesi ve meydanın ortasında arkası dönük, tek başına duran Hz. İbrahim |
| `hz-ibrahim/bolum-3/ekmek-ve-testi.jpg` | Devam | B | — | ✅ Hazır | Hasır üzerinde yuvarlak bir ekmek, bir avuç hurma ve ağzına kadar su dolu toprak bir testi; üstlerine sabah ışığı düşüyor |
| `hz-ibrahim/bolum-3/iki-arkadas.jpg` | Devam | B | Hz. İbrahim ve Hz. Lût — ikisi de Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter blokları: Hz. İbrahim (genç), Hz. Lût. | ✅ Hazır | Akşam ışığında boşalan meydanda, hurma ağacının yanında yan yana duran Hz. İbrahim ve Hz. Lût, arkadan; yakındaki duvar oyuğunda yanan bir kandil |
| `hz-ibrahim/bolum-3/yol-isareti.jpg` | Devam | B | — | ✅ Hazır | Şehrin dışında bir yol ayrımı; ortada yarısı sabah güneşiyle aydınlanmış, yarısı gölgede kalmış dikilmiş bir yol taşı |

### Bölüm 4 — Kırık Putlar, Büyük Soru

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-4/kapak.jpg` | Açılış | A | Şehir halkı — Katman 3; yüz gösterilebilir, neşeli ve sakin. Hz. İbrahim bu sahnede yok. | ✅ Hazır | Sabah ışığında kerpiç şehrin kapısından ovaya doğru neşeyle yürüyen, bayramlık giysili insanlar; yol kenarındaki hurma dallarında renkli kumaş şeritler |
| `hz-ibrahim/bolum-4/bos-sokak.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez; elinde bir şey yok. Karakter bloğu: Hz. İbrahim (genç). | ✅ Hazır | Bomboş, dar bir kerpiç sokak; sokağın sonunda basamaklı tapınağın gölgeli girişi ve oraya varmak üzere olan, arkası dönük Hz. İbrahim |
| `hz-ibrahim/bolum-4/dokunulmamis-yemekler.jpg` | 1. Kısım | A | — | ✅ Hazır | Loş tapınakta yere dizilmiş, hiç dokunulmamış yemek tabakları; arkada gölgede kırık, yüzsüz taş parçaları |
| `hz-ibrahim/bolum-4/buyuk-put.jpg` | Devam | B | — | ✅ Hazır | Loş tapınakta, arkadan görünen iri ve yüzsüz bir taş kütle; boynuna iple asılmış bir balta ve önünde boş bir zemin |
| `hz-ibrahim/bolum-4/tapinak-kapisi.jpg` | Devam | B | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Şehir halkı — Katman 3; yüz gösterilebilir, sessiz ve düşünceli, öfkeli değil. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Akşam ışığında basamaklı tapınağın kapı eşiği; basamaklarda başları önüne eğik, sessizce duran insanlar ve ön planda onlara dönük, arkası izleyiciye bakan Hz. İbrahim |
| `hz-ibrahim/bolum-4/saray-yolu.jpg` | Devam | B | — | ✅ Hazır | Gece, şehrin en yüksek yerinde, yüksek kerpiç duvarlı bir saraya çıkan geniş basamaklar; kapının iki yanında yanan meşaleler ve yıldızlı gök |

### Bölüm 5 — Güneşi Batıdan Getir

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-5/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabahın erken saatinde şehrin üstünde yükselen, yüksek duvarlı ve basamaklı kerpiç bir saray; aşağıda düz damlar ve nehir |
| `hz-ibrahim/bolum-5/saray-koridoru.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz görünmez. Karakter bloğu: Hz. İbrahim (genç). Saray görevlileri — Katman 2; bu kadrajda arkadan; silahsız. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Kalın kerpiç sütunlar arasında uzanan loş bir saray koridoru; iki saray görevlisinin arasında arkası dönük yürüyen Hz. İbrahim ve koridorun sonunda ışıklı bir salon |
| `hz-ibrahim/bolum-5/taht-ve-mesaleler.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Kral (Nemrud) ve danışmanları — Katman 2; yüz gösterilebilir, sakin, korkutucu ya da karikatür değil. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Loş taht salonunda meşaleler arasında, yüksek bir tahtta oturan kral ve çevresinde danışmanları; ön planda onlara dönük, arkası izleyiciye bakan, dimdik duran Hz. İbrahim |
| `hz-ibrahim/bolum-5/dogan-gunes.jpg` | Devam | B | — | ✅ Hazır | Doğu ufkundan yükselen altın güneş; ışığı sarayın pencerelerinden ve kerpiç damlardan içeri doğru akıyor |
| `hz-ibrahim/bolum-5/golgede-merdiven.jpg` | Devam | B | — | ✅ Hazır | Gün batımında sarayın geniş taş merdiveni; basamakların yarısı kızıl ışıkta, yarısı uzayan gölgede |
| `hz-ibrahim/bolum-5/odun-yiginlari.jpg` | Devam | B | Şehir halkı — Katman 3; yüz gösterilebilir, sakin. Hz. İbrahim bu sahnede yok. | ✅ Hazır | Alacakaranlıkta bir meydanda üst üste yığılmış odun kütükleri ve sırtında, eşeklerinde odun taşıyan birkaç insan; üstte ilk yıldızlar |

### Bölüm 6 — Ey Ateş, Serin Ol!

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-6/kapak.jpg` | Açılış | A | — | ✅ Hazır | Alacakaranlıkta uzaktan görülen kerpiç şehir; şehrin ortasından gökyüzüne yükselen geniş, gri bir duman sütunu |
| `hz-ibrahim/bolum-6/uzaktaki-alevler.jpg` | 1. Kısım | A | — | ✅ Hazır | Gece, yüksek kerpiç bir duvarın ardından gökyüzüne yükselen turuncu alevler; ön planda boş bir yol ve uzakta kıvılcımlar |
| `hz-ibrahim/bolum-6/dumanin-ustu.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez; elleri gövdesinin önünde, görünmüyor. Karakter bloğu: Hz. İbrahim (genç). Başka insan yok. | ✅ Hazır | Uzakta yükselen dumanın önünde, arkası dönük, başını hafifçe gökyüzüne kaldırmış Hz. İbrahim; dumanın üstünde açılan berrak gökte parlayan tek bir yıldız |
| `hz-ibrahim/bolum-6/alevlerde-yesillik.jpg` | Devam | B | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Başka insan yok; melek, ikinci figür yok. | ✅ Hazır | Yumuşak turuncu alevlerin geri çekildiği serin, yeşil bir halkanın ortasında, taze otların üstünde arkası dönük, huzurla oturan Hz. İbrahim |
| `hz-ibrahim/bolum-6/sabah-dumani.jpg` | Devam | B | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (genç). Şehir halkı — Katman 3; uzakta, küçük, şaşkın; yüz gösterilebilir. Karma sahne: Hz. İbrahim promptta "seen from behind" ile yazıldı. | ✅ Hazır | Sabah ışığında, serinlemiş küllerin ve son ince dumanın arasından duvardaki açıklığa doğru yürüyüp meydana çıkan Hz. İbrahim, arkadan; açıklığın ötesinde onu şaşkınlıkla izleyen insanlar |
| `hz-ibrahim/bolum-6/serin-safak.jpg` | Devam | B | — | ✅ Hazır | Şafakta nehir kıyısı; çiyle ıslanmış sazlar, sakin su ve ufukta yükselen yumuşak altın ışık |

### Bölüm 7 — Rabbime Doğru Yola

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-7/kapak.jpg` | Açılış | A | — | ✅ Hazır | Akşamüstü nehrin kıyısındaki kerpiç şehir; damlarda uzayan gölgeler ve şehrin dışına çıkan tek bir toprak yol |
| `hz-ibrahim/bolum-7/baba-evi.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan. Karakter bloğu: Hz. İbrahim (yetişkin). Âzer — Katman 1 (yakın akraba); kapı kanadının ardında, başı içeriye dönük; yüzü ve profili görünmez, yalnız omzu ve başlığının arkası. Karakter bloğu: Âzer. | ✅ Hazır | Alacakaranlıkta kerpiç bir evin aralık kapısı; eşikte arkası dönük duran Hz. İbrahim ve kapı kanadının ardında, başı içeriye dönük, yalnız omzu görünen babası Âzer |
| `hz-ibrahim/bolum-7/yol-ayrimi.jpg` | 1. Kısım | A | — | ✅ Hazır | Gece, şehrin dışında ikiye ayrılan bir toprak yol; biri karanlık şehre dönüyor, öbürü ay ışığında uzak tepelere uzanıyor |
| `hz-ibrahim/bolum-7/yola-cikis.jpg` | Devam | B | Hz. İbrahim, Hz. Lût ve Sâre — üçü de Katman 1; yalnız arkadan, uzak plan, yüz ve profil görünmez. Karakter blokları: Hz. İbrahim (yetişkin), Hz. Lût, Sâre. | ✅ Hazır | Şafakta ufka uzanan bir toprak yolda arkası dönük yürüyen Hz. İbrahim, Hz. Lût ve Sâre; önlerinde yüklü birkaç eşek ve deve |
| `hz-ibrahim/bolum-7/yesil-tepeler.jpg` | Devam | B | — | ✅ Hazır | Sabah ışığında zeytin ağaçlarıyla kaplı yumuşak yeşil tepeler, aralarından akan bir dere ve taşların arasından kaynayan bir pınar |
| `hz-ibrahim/bolum-7/cadir-ve-kuyu.jpg` | Devam | B | Çobanlar — Katman 3; yüz gösterilebilir, sakin ve doğal. Hz. İbrahim bu sahnede yok. | ✅ Hazır | Akşam, zeytinli bir yamaçta kurulmuş keçi kılı çadırlar; önünde taş bir kuyudan su çeken iki çoban ve çevrede otlayan koyunlar |

### Bölüm 8 — Ekinsiz Vadideki Dua

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-8/kapak.jpg` | Açılış | A | — | ✅ Hazır | Gece, zeytinli bir yamaçta yıldızların altında duran keçi kılı çadırlar; birinin aralığından sızan sıcak ışık |
| `hz-ibrahim/bolum-8/besik.jpg` | 1. Kısım | A | Hâcer — Katman 1 (peygamber eşi ve annesi); tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hâcer. Bebek Hz. İsmail görünmez (örtünün altında). | ✅ Hazır | Çadırın içinde, kandil ışığında hasırdan örülmüş, üzeri örtülü bir beşik ve başında arkası dönük oturan Hâcer |
| `hz-ibrahim/bolum-8/issiz-vadi.jpg` | 1. Kısım | A | Hz. İbrahim ve Hâcer — Katman 1; tamamen arkadan, uzak plan, yüz ve profil görünmez. Karakter blokları: Hz. İbrahim (yetişkin), Hâcer. Bebek Hz. İsmail örtülere sarılı, yüzü görünmez. | ✅ Hazır | Öğle güneşinde iki sıra koyu tepe arasında uzanan kurak vadi; uzakta vadiye giren küçük kafile: deveyi yeden Hz. İbrahim ve devenin üstünde bebeğini kucaklamış Hâcer |
| `hz-ibrahim/bolum-8/tepeden-bakis.jpg` | Devam | B | Hz. İbrahim — Katman 1; yalnız arkadan, uzak plan, başı örtülü; yüz ve profil görünmez; elleri göğüs hizasında dua için açık (arkadan yalnız dirsekler). Karakter bloğu: Hz. İbrahim (yetişkin). Vadide insan figürü yok. | ✅ Hazır | Akşamüstü, kayalık bir tepenin üstünde arkası dönük, elleri göğüs hizasında dua için açık duran Hz. İbrahim; aşağıda uzanan kurak vadi ve vadinin ortasında küçük bir akasya |
| `hz-ibrahim/bolum-8/vadide-aksam.jpg` | Devam | B | Hâcer — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hâcer. Bebek Hz. İsmail örtüye sarılı, görünmez. | ✅ Hazır | Alacakaranlıkta vadideki akasyanın dibinde, sırtı dönük oturan, kucağındaki bebeği örtüsüne sarmış Hâcer; yanında küçük bir kandil, su kabı ve hurma torbası; gökte ilk yıldızlar |
| `hz-ibrahim/bolum-8/safakta-vadi.jpg` | Devam | B | — | ✅ Hazır | Şafakta iki koyu tepenin arasından vadiye yükselen ince, altın bir ışık şeridi ve vadinin tabanında sabah ışığında parlayan çiyli kumlar |

### Bölüm 9 — Kapıdaki Misafirler

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ibrahim/bolum-9/kapak.jpg` | Açılış | A | — | ✅ Hazır | İkindi ışığında zeytinli bir yamaç; yaşlı bir zeytin ağacının yanında keçi kılı çadırlar ve uzakta yolcuların geleceği toprak yol |
| `hz-ibrahim/bolum-9/acik-cadir.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (yetişkin). Yolda ve çevrede başka insan yok (misafirler melek; gösterilmez). | ✅ Hazır | Ön perdesi ardına kadar açılmış geniş bir keçi kılı çadır; girişte arkası dönük oturan, uzaktaki boş yola bakan Hz. İbrahim ve yanında su testileri |
| `hz-ibrahim/bolum-9/bos-patika.jpg` | 1. Kısım | A | — | ✅ Hazır | İkindi ışığında zeytinli yamaçtan çadıra doğru kıvrılan boş, tozlu bir patika; ilerde ön perdesi açık duran çadır girişi |
| `hz-ibrahim/bolum-9/ikram-getiris.jpg` | Devam | B | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Hz. İbrahim (yetişkin). Misafirler (melek) hiç görünmez; çadırın içinde kimse yok. | ✅ Hazır | İkindi ışığında, kapağı kapalı, buharı tüten büyük bir toprak tencereyi çadırın açık girişine doğru taşıyan Hz. İbrahim, arkadan; çadırın içi karanlıkta |
| `hz-ibrahim/bolum-9/uzaklasan-yol.jpg` | Devam | B | — | ✅ Hazır | Akşam ışığında zeytinli yamaçtan aşağı inip uzak, mavi tepelere doğru kıvrılan boş bir toprak yol |
| `hz-ibrahim/bolum-9/sabah-yildizi.jpg` | Devam | B | — | ✅ Hazır | Şafakta zeytinli tepelerin üstünde, pembe ve altın gökyüzünde sakin sakin parlayan tek bir sabah yıldızı |

---

## 4h. Hz. Yusuf (`bookKey: yusuf`) — 60 görsel

**Durum (17 Eki 2026):** aktarıldı ve **yayında** (katalogda "published", `yayinTarihi:
2026-10-17`; vitrin işareti kaldırıldı). 60 sahne slotunun **60'ı da gerçek görsel**
(`/gorsel-uretim yusuf`); 10 rozet ve madalya **çerçevesiz kare** teslim edildi,
çerçeveyi Hasan ekler. Kitap kapağı ve harita durağı da teslim edildi; sesli
anlatım yer tutucudur. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-YUSUF-ICERIK-final.md` §B, §C, §D ve §H'dedir (İngilizce
ana üretim promptu, ortak stil bloğu, ortak negatif, **karakter blokları (EN)** ve
rozet sembol stili bloğu dahil); aşağıdaki tablo dosya adı, akıştaki yer, figür
bilgisi ve `alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 /
Devam 3).

> **Figür kuralı** (REVİZE 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2). 60 sahnenin
> **28'i figürlüdür** (bölüm başına 2–4; B4'te 1). "Figür" sütunu final MD'deki
> sahne "Figür:" alanının **aynısıdır**; `—` figürsüz sahnedir. **Katman 1** —
> Hz. Yusuf, Hz. Yakup, Bünyamin ve kardeşler: hiçbir sahnede yüzüyle görünmez;
> yalnız arkadan, uzak planda, başları örtülü ya da karşı ışıkta koyu silüet;
> ileri bakarlar, birbirlerine dönmezler (profil riski). Tek istisna
> `bolum-10/kavusma`'daki sarılmadır: Hz. Yakup'un başı oğlunun omzuna gömülüdür
> ve kare **elle kontrol edilir**. Kahramanlaştırılmazlar, kardeşler kötü karakter
> gibi çizilmez. Hz. Yusuf 13 sahnede görünür. **Katman 3** — kervancılar,
> çiftçiler, ambar işçileri, saray görevlisi ve habercisi, zindan arkadaşları:
> sakin ve ayrıntısız, yüz gösterilebilir ama öne çıkarılmaz. Karakter blokları:
> Hz. Yusuf (Kenan) B1–B3 · (Mısır) B3–B6 · (Mısır, görevli) B7–B10; Hz. Yakup;
> Bünyamin (çocuk) B1 · (genç) B8–B9; Kardeşler. Figürlü sahnede ilgili blok
> promptun sonuna (stil bloğundan önce) aynen eklenir; Katman 1 kişinin bulunduğu
> sahnenin negatifinde yüz yasağı (`visible face, facial features, eyes, mouth,
> profile, blank face, featureless face`), figürsüz sahnenin negatifinde `human
> figure, person, silhouette, hands` yazılıdır. Karma sahnelerde (Katman 1 ile
> Katman 3 aynı karede) Katman 1 kişi promptta "seen from behind" / "face hidden"
> diye yazıldı; bu sahneler üretimde elle kontrol edilir (§6.2 madde 5). Karakter
> tutarlılığı için kişinin ilk onaylanan figürlü sahnesi sonrakilere ikinci
> referans verilir (§6.2).

> **Kitaba özgü daha sıkı karar (Faz 1 Karar 2–3, §B6; Hasan 16 Eki 2026 — final
> MD §I8 soru 3b):** B4'te evin hanımı, kadınlar ve ziyafet hiçbir biçimde
> çizilmez; B4'ün tek figürlü sahnesi Hz. Yusuf'un şafakta sade bir odadaki
> duasıdır. **Kadınlar** (B6'daki soruşturma dahil) kitabın hiçbir görselinde
> yoktur. **Aziz ve kral** hiçbir görselde çizilmez. Kuyunun içinde çocuk, kuyuya
> indiriliş anı, saygı ya da selam için eğilen, yere kapanan ya da başını eğen
> figür ve anne çizilmez (Karar 6); iş yaparken doğal biçimde öne eğilen Katman 3
> kişiler (kova çeken kervancı, demet bağlayan çiftçi) bu yasağa girmez.

> **Kitaba özgü ek yasaklar:** bıçak, kan, zincir, zindan parmaklığı, kurt, ölü
> hayvan, eğilen ya da yere kapanan figür, kadın figürü, yatak, altın yığını,
> mücevher ve taç çizilmez; kuyuya indiriliş, itme, yakalama ve taş atma gibi
> şiddet anları gösterilmez, gerginlik yalnız duruş ve ışıkla verilir. Melek
> tasviri yok. Ortak negatifte ayrıca hilal, hilal-yıldız amblemi, cami, kubbe,
> minare, kilise, put, Mısır dinî sembolleri ve yazı vardır (final MD §B).
> **`tent` / `birds` istisnası (§6.2):** figürsüz sahnelere eklenen `birds, tipi,
> tent` negatifinden, çadırın ya da kuşların sahnenin parçası olduğu üç figürsüz
> sahnede ilgili terim çıkarılır: `bolum-1/kapak`, `bolum-1/ruyadaki-gokyuzu`
> (`tent`), `bolum-5/iki-ruya` (`birds` — kuşlar rüyanın parçası).
> Görsel dünya iki mekândır: **Kenan** (B1–B2, B10 başı) otlaklar, keçi kılı
> çadırlar, taş kuyular; **Mısır** (B3–B10) Nil kıyısı, kerpiç evler, sütunlu loş
> salonlar, kalın duvarlı zindan, kerpiç ambarlar, buğday tarlaları. Görsel
> omurga: üç gömlek (B3'te çizilmez · B4 · B10), yıldızlar (B1, B2, B10) ve başak
> (B6–B7).

> **Üretim kararları (17 Eki 2026, `/gorsel-uretim yusuf`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`). Figürlü
> sahnelerde üçer-dörder varyant üretildi; seçilen her Katman 1 başı büyütülerek
> kontrol edildi. Kitaba özgü notlar:
> - **Ad prompta girmez** (Yunus, İbrahim emsali): kişiler "a boy on the edge of youth /
>   an elderly father / a group of grown men" olarak verildi; karakter blokları adsız eklendi.
> - **Karakter referansları:** Hz. Yusuf (Kenan) için pilot `bolum-1/iki-kardes`, (Mısır)
>   için `bolum-3/duzenli-avlu`; kardeşler için `bolum-1/otlaktaki-kardesler`, B8'den sonra
>   rötuşlu `bolum-7/yuklenen-cuvallar` ve `bolum-8/kapida-kalan` ikinci referans verildi.
> - **Sayı tutturma:** model 11 yıldızı ilk denemelerde 9–10 çizdi. Promptta "5 + 1 + 5"
>   dizilimi yazılınca tuttu (B1 rozeti, `ruyadaki-gokyuzu`, `yildizli-misir`, B10 rozeti).
>   `kralin-ruyasi`'nda zayıf inekler altı ve biri alacalıydı; arka sıra iki rötuşla yedi
>   soluk gri ineğe tamamlandı (zayıflık hafif, ayrım renk ve ışıkla). B6 rozeti ve madalyada
>   yedi başak sayılarak seçildi.
> - **Yüz hattı ve sakal sızması** en çok kardeşlerin çizgili başlığının kenarında oldu:
>   `izin-istegi`'nde üç başın, `yuklenen-cuvallar`'da (yedi adayın hepsinde sızma vardı)
>   üç başın bölgesi maskelenip başlık kumaşıyla rötuşlandı. `bolum-8/iki-kardes`'te
>   Bünyamin'in yanak hattı için rötuş denendi; bir denemede model **açık yüz çizdi**, bu
>   yol bırakıldı ve rötuşsuz temiz aday seçildi (Hz. Yusuf burada sarık biçiminde örtülü).
>   `ben-yusufum`'un ilk turunda uzak silüette sakal biçimi seçiliyordu ve Bünyamin çocuk
>   boyundaydı; ikinci turda iki yetişkin boyunda, yüzsüz başlıklı silüet olarak çıktı.
> - **Kavuşma** (`bolum-10/kavusma`): seçilen karede iki baş da örtülü ve birbirine gömülü,
>   aralarında yalnız gölge var; bir adayda Hz. Yakup'un gözü ve burnu görünüyordu, bir
>   başkasında minare ve kubbe vardı, ikisi reddedildi. Figürler briften büyük (kadrajın
>   yaklaşık üçte biri) ve tam koyu silüet değil, aydınlık; **Hasan'ın ayrıca bakması istendi.**
> - **Reddedilen diğerleri:** kubbeli uzak köy (`otlaktaki-kardesler`, `nil-sabahi`),
>   zindan parmaklığına benzeyen kafesli pencere (`gece-penceresi`), duvar kabartmasında
>   insan figürü (`ziyafet-sofrasi`), çıplak gövdeli işçiler (`ambarin-ici`), yan dönük
>   başlıklar (`yildizli-pencere`, `paylasilan-ekmek`), Yunan tapınağına benzeyen saray
>   (`haberci`), tişört ya da gömlek yakası (`bohcadaki-gomlek`).
> - **Hasan'a not edilen küçük sapmalar:** `yirtik-gomlek`'te yırtık sırtın orta hattında,
>   model bunu önü açık bir giysiye benzetebiliyor; `yildizli-pencere`'deki iki zindan
>   arkadaşı genç/çocuksu çıktı.
> - **Rozet ikinci referansı:** onaylanan pilot `rozetler/hz-yusuf/bolum-1.png`.
> - **Kapak ve harita durağı:** yayındaki `hz-ibrahim/kapak.png` ve
>   `hz-ibrahim/harita-kapak.jpg` görsel referans verilerek aynı aileden üretildi. Kapak
>   **yazısız**dır; "Hz. Yusuf" başlığı tasarımda eklenecek. İlk iki kapak adayında 9 yıldız
>   vardı; seçilen adayda 11 yıldız var, ama kuyuya akasyadan sarkan iki ip çizilmişti
>   (brif yasağı) — ip bölgesi silinip gökyüzüyle rötuşlandı. Ay çizilmedi. 2K ana dosyalar
>   `gorsel-kaynaklari/kitaplar/hz-yusuf/`.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-yusuf/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde gece göğünde yay çizen on bir yıldız, ay ışığında gümüşlenen çöl yolu ve ufukta Mısır'ın ışıkları; arkada eski taş kuyu ağzı ve akasya. **Yazısız** üretilir; "Hz. Yusuf" yazısı tasarım aşamasında eklenir; gökte ay çizilmez (final MD §C1) |
| `hz-yusuf/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda taş kuyu ağzı ve üstünde tek parlak yıldız (final MD §C2) |

### Bölüm 1 — On Bir Yıldız

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-1/kapak.jpg` | Açılış | A | — | ✅ Hazır | Alacakaranlıkta geniş otlaklar, keçi kılı çadırlar, önlerinde yanan küçük ateşler ve gökte ilk yıldızlar |
| `hz-yusuf/bolum-1/iki-kardes.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) ve Bünyamin (Katman 1) — ikisi de yalnız arkadan, başları örtülü, ileri bakıyor; yüz, profil ve yüz hattı yok. Karakter blokları: Hz. Yusuf (Kenan), Bünyamin (çocuk). | ✅ Hazır | Akşam ışığında, otlakların arasındaki patikada birkaç kuzuyla birlikte çadırlara doğru yürüyen, sırtları dönük iki çocuk |
| `hz-yusuf/bolum-1/ruyadaki-gokyuzu.jpg` | 1. Kısım | A | — | ✅ Hazır | Masalsı bir gece göğünde yay gibi dizilmiş on bir parlak yıldız, yumuşak ışıklı bir güneş ve dolunay; ışıkları aşağıdaki küçük bir çadıra doğru eğiliyor |
| `hz-yusuf/bolum-1/babanin-cadiri.jpg` | Devam | B | Hz. Yakup (Katman 1) ve Hz. Yusuf (Katman 1) — yalnız arkadan ve karşı ışıkta, ileri bakıyorlar; başları örtülü; yüz, profil ve yüz hattı yok. Karakter blokları: Hz. Yakup, Hz. Yusuf (Kenan). | ✅ Hazır | Sabah ışığında bir çadırın içi: hasırın üstünde, çadırın aralık kapısına dönük yan yana oturan bir baba ile oğlu; sırtları izleyiciye dönük |
| `hz-yusuf/bolum-1/otlaktaki-kardesler.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — uzak plan, hepsi arkadan, başları örtülü; yüz, profil ve yüz hattı seçilmez; kötü karakter gibi çizilmez. Karakter bloğu: Kardeşler. | ✅ Hazır | Öğle sıcağında, uzak bir vadide sürülerinin yanında bir araya toplanmış, sırtları dönük bir grup çoban ve tepede yalnız bir akasya ağacı |
| `hz-yusuf/bolum-1/sabah-yolu.jpg` | Devam | B | — | ✅ Hazır | Sabah ışığında otlakların arasından ufka doğru uzanan, iki yanı taşlı ince bir patika |

### Bölüm 2 — Kuyunun Dibinde

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-2/kapak.jpg` | Açılış | A | — | ✅ Hazır | Gün doğarken tepelerin arasından kıvrılarak uzaklaşan bir çoban yolu, yol kenarında taş yığınları ve uzakta sis |
| `hz-yusuf/bolum-2/izin-istegi.jpg` | 1. Kısım | A | Hz. Yakup (Katman 1) ve Hz. Yusuf'un kardeşleri (Katman 1, grup) — uzak planda karşı ışıkta küçük koyu silüet; yüz, profil ve yüz hattı seçilmez. Karakter blokları: Hz. Yakup, Kardeşler. | ✅ Hazır | Gün batımında, uzaktan görülen bir çadırın önünde oturan yaşlı bir baba ve karşısında duran bir grup oğul; hepsi karşı ışıkta küçük koyu siluetler |
| `hz-yusuf/bolum-2/kuyu-basi.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) ve kardeşleri (Katman 1, grup) — yalnız arkadan ve uzak planda; yüz, profil ve yüz hattı yok. Karakter blokları: Hz. Yusuf (Kenan), Kardeşler. | ✅ Hazır | Kervan yolunun kıyısındaki eski bir taş kuyuya doğru uzaktan yürüyen bir grup çoban ve aralarında daha küçük bir figür; yanında yalnız bir akasya |
| `hz-yusuf/bolum-2/kuyudan-gokyuzu.jpg` | Devam | B | — | ✅ Hazır | Kuyunun içinden yukarı bakış: taş duvarların ortasında yuvarlak, aydınlık bir gökyüzü parçası ve içeri süzülen yumuşak bir ışık |
| `hz-yusuf/bolum-2/ilk-yildiz.jpg` | Devam | B | — | ✅ Hazır | Alacakaranlıkta geniş bir ovanın ortasında küçük bir kuyu ağzı ve üstündeki lacivert gökte beliren tek parlak yıldız |
| `hz-yusuf/bolum-2/yoldaki-toz.jpg` | Devam | B | Kervandaki yolcular (Katman 3) — çok uzakta, küçük siluetler; ayrıntı seçilmez. | ✅ Hazır | Gün doğarken uzak ufukta, yolun üstünde yükselen altın renkli bir toz bulutu ve içinde yüklü develerle yürüyen küçük yolcu siluetleri |

### Bölüm 3 — Kervanla Mısır'a

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-3/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında kuyunun yanındaki yolda mola vermiş develer, yükleri ve bir akasyanın gölgesi |
| `hz-yusuf/bolum-3/sarkitilan-kova.jpg` | 1. Kısım | A | Kervancı (Katman 3) — yandan ve hafif arkadan; yüz sakin, ayrıntısız. Hz. Yusuf bu sahnede görünmez. | ✅ Hazır | Sabah ışığında taş kenarlı bir kuyunun başında, gerilmiş halatı iki eliyle yukarı çeken ve şaşkınlıkla içeri bakan bir kervancı |
| `hz-yusuf/bolum-3/kervan-yolu.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) — yalnız arkadan ve uzak planda, başı örtülü; yüz, profil ve yüz hattı yok. Kervancılar (Katman 3) — uzak, küçük, ayrıntısız. Karma sahne: elle kontrol edilir. Karakter bloğu: Hz. Yusuf (Kenan). | ✅ Hazır | Uzak planda, çöl yolunda ilerleyen yüklü bir deve kervanı, yanlarında yürüyen yolcular ve kervanın arkasında yürüyen, sırtı dönük genç bir figür |
| `hz-yusuf/bolum-3/duzenli-avlu.jpg` | Devam | B | Hz. Yusuf (Katman 1) — yalnız arkadan, başı örtülü; yüz, profil ve yüz hattı yok. Karakter bloğu: Hz. Yusuf (Mısır). | ✅ Hazır | Mısır'da bir evin güneşli avlusunda, omzunda bir toprak testiyle uzaklaşan genç bir figür; süpürülmüş taş zemin, sıra sıra testiler ve hurma gölgesi |
| `hz-yusuf/bolum-3/gece-penceresi.jpg` | Devam | B | — | ✅ Hazır | Gece, sade bir odanın küçük penceresinden görünen yıldızlı gökyüzü ve pencere kenarında yanan bir kil kandil |
| `hz-yusuf/bolum-3/nil-sabahi.jpg` | Devam | B | — | ✅ Hazır | Sabah sisi içinde Nil kıyısı: sazlıklar, hurma ağaçları ve suya yansıyan ilk güneş ışığı |

### Bölüm 4 — Kapalı Kapılar

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-4/kapak.jpg` | Açılış | A | — | ✅ Hazır | Mısır'da büyük bir evin sütunlu iç avlusu; gölgeli revaklar, küçük bir havuz ve sabahın sakin ışığı |
| `hz-yusuf/bolum-4/anahtarlar.jpg` | 1. Kısım | A | — | ✅ Hazır | Ahşap bir kapının yanındaki çiviye asılmış, bir halkaya geçirilmiş birkaç eski ahşap anahtar ve duvara vuran gün ışığı |
| `hz-yusuf/bolum-4/kapali-kapilar.jpg` | 1. Kısım | A | — | ✅ Hazır | Loş bir koridor boyunca art arda kapanmış ahşap kapılar ve en uzaktaki küçük pencereden giren tek ışık huzmesi |
| `hz-yusuf/bolum-4/yirtik-gomlek.jpg` | Devam | B | — | ✅ Hazır | Bir sandığın üstüne serilmiş sade keten bir gömlek; arka tarafında boydan boya bir yırtık, üstüne pencereden sabah ışığı düşüyor |
| `hz-yusuf/bolum-4/ziyafet-sofrasi.jpg` | Devam | B | — | ✅ Hazır | Alçak bir sofrada meyve tabakları ve boş minderler; aralık bir kapıdan süzülen ışık |
| `hz-yusuf/bolum-4/safak-duasi.jpg` | Devam | B | Hz. Yusuf (Katman 1) — yalnız arkadan, başı örtülü; yüz, profil ve yüz hattı yok; bölümün tek figürlü sahnesi. Karakter bloğu: Hz. Yusuf (Mısır). | ✅ Hazır | Şafakta sade bir odada, açık pencereye dönük ayakta duran, sırtı izleyiciye dönük tek bir figür; pencereden giren ilk ışık |

### Bölüm 5 — Zindandaki İki Rüya

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-5/kapak.jpg` | Açılış | A | — | ✅ Hazır | Şehrin dışında, yüksek taş duvarlı eski bir yapı; duvarların üstünde sabah ışığı ve dibinde yabani otlar |
| `hz-yusuf/bolum-5/paylasilan-ekmek.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) — yalnız arkadan, başı örtülü; yüz, profil ve yüz hattı yok. Yaşlı mahpus (Katman 3) — karşıda, sakin; yüzü gösterilebilir, sefil ya da korkutucu değil. Karma sahne: elle kontrol edilir. Karakter bloğu: Hz. Yusuf (Mısır). | ✅ Hazır | Taş duvarlı sade bir odada, yüksek pencereden düşen ışıkta, sırtı izleyiciye dönük bir gencin karşısında oturan yaşlı mahpusa ekmek uzatması |
| `hz-yusuf/bolum-5/iki-ruya.jpg` | 1. Kısım | A | — | ✅ Hazır | Masalsı bir rüya sahnesi: bir yanda dolgun üzüm salkımları ve taze üzüm suyu dolu bir kâse, öbür yanda bir ekmek sepeti ve çevresinde uçuşan küçük kuşlar |
| `hz-yusuf/bolum-5/yildizli-pencere.jpg` | Devam | B | Hz. Yusuf (Katman 1) — yalnız arkadan, başı örtülü; yüz, profil ve yüz hattı yok. İki zindan arkadaşı (Katman 3) — yüzleri sakin, kandil ışığında. Karma sahne: elle kontrol edilir. Karakter bloğu: Hz. Yusuf (Mısır). | ✅ Hazır | Gece, yüksek ve dar bir pencereden görünen tek parlak yıldızın altında, kandil ışığında oturan iki genç ve onlara dönük, sırtı izleyiciye dönük bir figür |
| `hz-yusuf/bolum-5/acik-kapi.jpg` | Devam | B | Zindandan çıkan genç (Katman 3) — sakin ve rahatlamış; yüzü gösterilebilir, öne çıkarılmaz. Hz. Yusuf görünmez. | ✅ Hazır | Dışarıdan bakış: zindanın kalın taş duvarındaki aralık kapıdan güneşe adım atan, rahatlamış sade giysili bir genç; arkasında karanlık kapı aralığı |
| `hz-yusuf/bolum-5/avludaki-hurma.jpg` | Devam | B | — | ✅ Hazır | Zindanın küçük avlusunda tek başına yükselen bir hurma ağacı; dibindeki taşlara düşen gölge ve açık mavi gökyüzü |

### Bölüm 6 — Yedi Başak

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-6/kapak.jpg` | Açılış | A | — | ✅ Hazır | Gece, Nil kıyısında uzanan bir sarayın sütunlu terası; ay ışığında parlayan nehir ve uzakta ekin tarlaları |
| `hz-yusuf/bolum-6/kralin-ruyasi.jpg` | 1. Kısım | A | — | ✅ Hazır | Masalsı bir rüya sahnesi: nehir kıyısında yeşil çayırda yedi besili inek, arkada soluk ışıkta yedi zayıf inek; ön planda yeşil ve kuru başaklar |
| `hz-yusuf/bolum-6/basakta-saklanan.jpg` | 1. Kısım | A | Çiftçiler (Katman 3) — orta plan, işlerine eğilmiş; yüzler gösterilebilir ama öne çıkarılmaz. | ✅ Hazır | İkindi ışığında hasat edilmiş bir tarlada, buğdayı başaklarıyla birlikte demet demet bağlayıp dizen çiftçiler |
| `hz-yusuf/bolum-6/haberci.jpg` | Devam | B | Saray habercisi (Katman 3) — hareket hâlinde, sakin; yüzü gösterilebilir, öne çıkarılmaz. | ✅ Hazır | Sabah ışığında sarayın geniş taş basamaklarından aceleyle inen bir saray habercisi; arkasında sütunlu giriş ve şehre uzanan yol |
| `hz-yusuf/bolum-6/zindandan-cikis.jpg` | Devam | B | Hz. Yusuf (Katman 1) — yalnız arkadan ve uzak planda, başı örtülü; yüz, profil ve yüz hattı yok. Karakter bloğu: Hz. Yusuf (Mısır). | ✅ Hazır | Ardına kadar açılmış zindan kapısından güneşli bir yola doğru yürüyen, sırtı dönük bir figür; önünde uzanan aydınlık yol |
| `hz-yusuf/bolum-6/yesil-basaklar.jpg` | Devam | B | — | ✅ Hazır | Rüzgârda dalgalanan, göz alabildiğine uzanan yeşil buğday tarlaları ve üstünde açık gökyüzü |

### Bölüm 7 — Kıtlıkta Gelen Kafile

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-7/kapak.jpg` | Açılış | A | — | ✅ Hazır | Nil kıyısında sıra sıra yükselen büyük kerpiç ambarlar ve önlerinde uzanan altın renkli tarlalar |
| `hz-yusuf/bolum-7/ambarin-ici.jpg` | 1. Kısım | A | Ambar işçileri (Katman 3) — orta plan, işlerine dönük; yüzler gösterilebilir ama öne çıkarılmaz. Hz. Yusuf bu sahnede yok. | ✅ Hazır | Büyük bir ambarın içinde tavana kadar istiflenmiş başaklı buğday demetleri ve omuzlarında demet taşıyıp istiflere yerleştiren işçiler |
| `hz-yusuf/bolum-7/catlak-toprak.jpg` | 1. Kısım | A | — | ✅ Hazır | Kurumuş ve çatlamış bir tarla; uzakta, ufukta sağlam duran ambarların silueti |
| `hz-yusuf/bolum-7/yuklenen-cuvallar.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — yalnız arkadan; yüz, profil ve yüz hattı yok. Ambar işçileri (Katman 3) — yandan, sakin. Karma sahne: elle kontrol edilir. Karakter bloğu: Kardeşler. | ✅ Hazır | Ambarın önünde ağzına kadar dolu tahıl çuvallarını yere çökmüş develere yükleyen, sırtları dönük bir grup yolcu ve onlara çuval uzatan ambar işçileri |
| `hz-yusuf/bolum-7/cuvaldaki-kese.jpg` | Devam | B | — | ✅ Hazır | Ağzı açık bir tahıl çuvalının içinde, buğday tanelerinin arasına yerleştirilmiş küçük, bağlı bir deri kese |
| `hz-yusuf/bolum-7/uzaklasan-kafile.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — çok uzakta, arkadan, küçük silüet; yüz seçilmez. Karakter bloğu: Kardeşler. | ✅ Hazır | Gün batımında çöl yolunda uzaklaşan, yüklü develeri ve yanlarında yürüyen yolcularıyla küçük bir kafile ve kumda kalan izler |

### Bölüm 8 — Kayıp Su Kabı

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-8/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında Mısır şehrine uzanan geniş bir yol, uzakta kerpiç surlar ve hurma ağaçları |
| `hz-yusuf/bolum-8/iki-kardes.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) ve Bünyamin (Katman 1) — yalnız arkadan, başları örtülü, ileri bakıyorlar; yüz, profil ve yüz hattı yok. Karakter blokları: Hz. Yusuf (Mısır, görevli), Bünyamin (genç). | ✅ Hazır | Sakin bir iç odada, açık pencereye dönük yan yana oturan, sırtları izleyiciye dönük iki adam; birinin eli öbürünün omzunda |
| `hz-yusuf/bolum-8/acilan-cuvallar.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) — orta planda, arkadan, başı örtülü; Hz. Yusuf'un kardeşleri (Katman 1, grup) — ön planda arkadan; ikisinde de yüz, profil ve yüz hattı yok. Saray görevlisi (Katman 3) — yandan, sakin. Karma sahne: elle kontrol edilir. Karakter blokları: Hz. Yusuf (Mısır, görevli), Kardeşler. | ✅ Hazır | Bir ağaç gölgesinde sıra sıra açılmış tahıl çuvalları, açılmış bir çuvalın yanında dik duran sırtı dönük bir figür, yanında bir görevli ve kenarda sırtı dönük bekleyen bir grup yolcu; en sondaki çuval hâlâ bağlı |
| `hz-yusuf/bolum-8/kardeslerin-teklifi.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — yalnız arkadan ve karşı ışıkta; yüz, profil ve yüz hattı yok. Karakter bloğu: Kardeşler. | ✅ Hazır | Öbür yüklerden ayrı duran tek bir tahıl çuvalının önünde, birbirine sokulmuş ve ışıklı bir kapıya dönük duran, sırtları izleyiciye dönük bir grup adam |
| `hz-yusuf/bolum-8/bekleyen-develer.jpg` | Devam | B | — | ✅ Hazır | İkindi ışığında yere çökmüş, yola çıkmayı bekleyen yüklü develer ve uzakta şehrin surları |
| `hz-yusuf/bolum-8/kapida-kalan.jpg` | Devam | B | Kalan büyük kardeş (Katman 1) — yalnız arkadan, başı örtülü; uzaklaşan kardeşler (Katman 1, grup) — çok uzakta küçük silüet; yüz, profil ve yüz hattı yok. Karakter bloğu: Kardeşler. | ✅ Hazır | Akşamüstü, şehrin kerpiç kapısında tek başına duran, sırtı dönük bir adam ve çöl yolunda uzaklaşan yüklü bir deve kafilesi |

### Bölüm 9 — Ben Yusuf'um

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-9/kapak.jpg` | Açılış | A | — | ✅ Hazır | Kıtlık yılında, kurumuş otlakların arasından Mısır'a doğru uzanan tozlu bir yol |
| `hz-yusuf/bolum-9/yorgun-develer.jpg` | 1. Kısım | A | Hz. Yusuf'un kardeşleri (Katman 1, grup) — yalnız arkadan; yüz, profil ve yüz hattı yok. Karakter bloğu: Kardeşler. | ✅ Hazır | Şehir kapısının önünde yere çökmüş tozlu ve yorgun develer; yanlarında, yarı boş çuvalların başında sırtları dönük bekleyen bir grup yolcu |
| `hz-yusuf/bolum-9/saray-kapisi.jpg` | 1. Kısım | A | — | ✅ Hazır | Sarayın büyük ahşap kapısının önünde basamaklara düşen ikindi ışığı ve kapının iki yanında taş sütunlar |
| `hz-yusuf/bolum-9/ben-yusufum.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — ön planda dik ve arkadan; Hz. Yusuf (Katman 1) ve Bünyamin (Katman 1) — uzakta, güçlü karşı ışıkta koyu silüet; hiçbirinde yüz, profil ve yüz hattı yok. Karakter blokları: Kardeşler, Hz. Yusuf (Mısır, görevli), Bünyamin (genç). | ✅ Hazır | Sütunlu bir salonda, ön planda sırtları dönük dik duran bir grup adam; karşılarında, ışıkla dolan geniş açıklığın önünde koyu silüet hâlinde duran iki figür |
| `hz-yusuf/bolum-9/paylasilan-sofra.jpg` | Devam | B | Hz. Yusuf'un kardeşleri (Katman 1, grup) — tek sıra, yalnız arkadan, başları örtülü; yüz, profil ve yüz hattı yok. Karakter bloğu: Kardeşler. | ✅ Hazır | Akşam ışığında uzun, alçak bir sofrada ekmekler, hurmalar ve üzüm salkımları; sofranın bir yanında yan yana oturan, sırtları dönük ve başları örtülü bir grup adam |
| `hz-yusuf/bolum-9/dogu-yolu.jpg` | Devam | B | — | ✅ Hazır | Şafakta sarayın düz damından görünen, alçak bir korkuluğun ötesinde kuzeydoğuya, çöle uzanan yol ve ufukta doğan güneş |

### Bölüm 10 — Rüya Gerçek Oldu

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yusuf/bolum-10/kapak.jpg` | Açılış | A | — | ✅ Hazır | Gün doğarken Mısır'ın kerpiç evleri, hurma ağaçları ve Nil'in üzerinde altın bir ışık; uzakta yaklaşan bir kafilenin tozu |
| `hz-yusuf/bolum-10/bohcadaki-gomlek.jpg` | 1. Kısım | A | — | ✅ Hazır | Bir deve semerinin üstüne özenle bağlanmış keten bir bohça; aralığından katlanmış beyaz bir gömleğin ucu görünüyor |
| `hz-yusuf/bolum-10/misire-giden-kafile.jpg` | 1. Kısım | A | Hz. Yakup, kardeşler ve aile (Katman 1) — yalnız çok uzakta küçük silüet; kimse seçilmez, yüz ayrıntısı oluşmaz; karakter bloğu gerekmez. | ✅ Hazır | Sabah ışığında, Nil vadisine doğru inen yolda uzaktan yaklaşan uzun, yüklü bir deve kafilesi ve yanlarında yürüyen küçük yolcu siluetleri |
| `hz-yusuf/bolum-10/kavusma.jpg` | 1. Kısım | A | Hz. Yusuf (Katman 1) — tamamen arkadan; Hz. Yakup (Katman 1) — başı oğlunun omzuna gömülü; ikisi de karşı ışıkta koyu silüet, başları örtülü; yüz, profil ve yüz hattı yok. Anne, kardeşler ve kafiledeki başka hiç kimse seçilmez. Karakter blokları: Hz. Yusuf (Mısır, görevli), Hz. Yakup. | ✅ Hazır | Şehrin dışında, durmuş kafilenin önünde, uzak planda birbirine sarılan iki figür; arkalarından vuran sabah ışığı onları altın kenarlı bir silüete dönüştürüyor |
| `hz-yusuf/bolum-10/taht-basamaklari.jpg` | Devam | B | — | ✅ Hazır | Sarayın büyük salonunda, ışık dolu basamakların üstünde boş ve sade bir oturma yeri; açık kapılardan içeri sabah ışığı doluyor |
| `hz-yusuf/bolum-10/yildizli-misir.jpg` | Devam | B | — | ✅ Hazır | Gece olurken Mısır'ın düz damlı evleri ve Nil'in üstünde yay gibi dizilmiş on bir yıldız; ufukta batan güneşin son ışığı ve yükselen dolunay |

## 4i. Hz. Süleyman (`bookKey: suleyman`) — 42 görsel

**Durum (17 Eki 2026):** aktarıldı ve **yayında** (katalogda "published", `yayinTarihi:
2026-10-17`; vitrin işareti kaldırıldı). 42 sahne, kitap kapağı, harita durağı, 7 rozet ve madalya
**üretildi** (`/gorsel-uretim suleyman`, aşağıdaki üretim kararları); rozet ve madalya
çerçeve bekliyor, ses yer tutucu. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-SULEYMAN-ICERIK-final.md` §B, §C, §D ve §H'dedir
(İngilizce ana üretim promptu, ortak stil bloğu, ortak negatif, **karakter blokları
(EN)** ve rozet sembol stili bloğu dahil); aşağıdaki tablo dosya adı, akıştaki yer,
figür bilgisi ve `alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 /
Devam 3).

> **Figür kuralı** (REVİZE 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2). 42 sahnenin
> **15'i figürlüdür** (B1 3 · B2 2 · B3 2 · B4 2 · B5 4 · B6 2 · B7 0). "Figür"
> sütunu final MD'deki sahne "Figür:" alanının **aynısıdır**; `—` figürsüz sahnedir,
> "yok — …" diye başlayan satırlar gerekçesi yazılmış figürsüz sahnelerdir.
> **Katman 1** — Hz. Süleyman, Hz. Dâvûd ve Sebe melikesi: hiçbir sahnede yüzüyle
> görünmez; hep arkadan ya da uzak planda, önden açı kullanılmadı. Hz. Süleyman 9
> sahnede görünür (`bolum-1/hukum-avlusu`'nda genç; `bolum-3/atin-boynu`'nda yalnız
> el ve giysi yeni), Sebe melikesi 3 sahnede, Hz. Dâvûd yalnız
> `bolum-1/hukum-avlusu`'nda. **Katman 3** — davacılar, ustalar, iki ülkenin ileri
> gelenleri, hediyeleri getirenler ve kervancılar: sakin, doğal, karikatürsüz; yüz
> gösterilebilir. Bu kitapta Katman 2 kişi yoktur. Karakter blokları: Hz. Süleyman
> (B2–B6), Sebe melikesi (B5–B6); Hz. Dâvûd ve genç Hz. Süleyman'ın tarifi
> `hukum-avlusu` promptunun içindedir. Figürlü sahnede ilgili blok promptun sonuna
> (stil bloğundan önce) aynen eklenir; Katman 1 kişinin bulunduğu sahnenin
> negatifinde yüz yasağı (`visible face, facial features, eyes, mouth, profile,
> blank face, featureless face`), figürsüz sahnenin negatifinde `human figure,
> person, silhouette, hands` yazılıdır. Karma sahneler (`hukum-avlusu`,
> `mescit-avlusu`, `danisma-salonu`, `acilmayan-sandiklar`, `iki-taht`) üretimde elle
> kontrol edilir (§6.2 madde 5). Karakter tutarlılığı için kişinin ilk onaylanan
> figürlü sahnesi sonrakilere ikinci referans verilir (§6.2).

> **Kitaba özgü daha sıkı kararlar (Faz 1 KARAR 2a, §B6, §16/1, §A2/59; final MD
> §B):** (1) **cinler hiçbir görselde çizilmez** — silüet, duman, göz, gölge, iz
> bırakan "görünmez el" dahil; emekleri yalnız iz olarak (taşınmış taşlar, iskeleler,
> kazanlar). Bu yüzden `bolum-2/bakir-kazanlar`, `bolum-6/bos-yer`,
> `bolum-7/iskeledeki-taslar` insansız/figürsüzdür; ordu (`bolum-3/vadide-toz`) yalnız
> uzak toz bulutudur. (2) **B7'de Hz. Süleyman'ın bedeni çizilmez**: vefat bölümü
> asa ucu, talaş ve ışıkla anlatılır, bölümde figür yoktur. (3) Sebe'de güneşe tapma
> sahnesi çizilmez. (4) Melikenin bacak ve ayakları görünmez
> (`bolum-6/billur-zemin`).

> **Kitaba özgü ek yasaklar:** melek, cin, insan kalabalığı, asker, silah, zincir,
> ceza, ceset, mezar, cenaze; altın para, altın yığını, mücevher, taç ve açık sandık
> (hediyeler yalnız kapalı sandık ve deve); insan ifadeli, giyinik ya da karikatür
> hayvan; cami, kubbe, Kubbetü's-Sahra, minare, hilal, kilise, put, heykel ve yazı
> (ortak negatif, final MD §B). Mescid-i Aksa yalnız dönemin taş avlusu ve sütunlarıyla
> çizilir; bugünkü yapılara benzerlik yok. **`birds` istisnası (§6.2):** bu kitapta
> kuşlar birçok sahnenin konusu olduğu için figürsüz sahnelere eklenen `birds, tipi,
> tent` negatifinden `birds`, kuşun sahnenin parçası olduğu altı figürsüz sahnede
> çıkarılır: `bolum-2/kuslu-gok`, `bolum-4/bos-dal`, `bolum-4/donen-hudhud`,
> `bolum-5/kapak`, `bolum-5/mektup-tasiyan-kus`, `bolum-7/safakta-tepeler`. Görsel
> dünya: Kudüs ve güneye uzanan yollar (kireç taşı yapılar, sedir kirişler, teraslı
> bağlar, zeytinlikler) ve Sebe (çöl, hurmalık, yüksek kerpiç-taş yapılar). Görsel
> omurga: hüdhüd (B2, B4–B5; kapak, durak, B4 rozeti ve madalyada ayrı imgeler),
> mühürlü mektup (B5) ve asa (B7).

> **Üretim kararları (17 Eki 2026, `/gorsel-uretim suleyman`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`). Figürlü
> sahnelerde üçer-dörder varyant üretildi; seçilen her Katman 1 başı büyütülerek
> kontrol edildi. Kitaba özgü notlar:
> - **Ad prompta girmez** (Yunus, İbrahim, Yusuf emsali): kişiler "a mature man / a young
>   man / a tall man / a woman seen from behind" olarak verildi; karakter blokları adsız.
>   Başörtüsü tarifine "only cloth is visible, no cheek, jaw, beard, ear or hair" eklendi.
> - **Karakter referansları:** yetişkin Hz. Süleyman için `bolum-2/mescit-avlusu`, Sebe
>   melikesi için `bolum-5/danisma-salonu`, hüdhüd için `bolum-4/donen-hudhud`; `iki-taht`
>   için `bos-yer` (aynı açı), `degisen-taht` için `iki-taht` ikinci referans verildi.
> - **Yüz hattı sızması:** pilotta `hukum-avlusu`'nun ilk üç adayında başörtüsü kenarından
>   sakal görünüyordu; sıkılaştırılmış prompttan temiz aday seçildi. `kuzeye-bakan-pencere`'nin
>   bir adayında peçe kenarında ten şeridi seçiliyordu, reddedildi.
> - **Rötuş:** `iki-taht`'ta öndeki ileri gelen (Katman 3) başı açık, uzun saçlı-sakallı
>   hâliyle yaygın Hz. Îsâ ikonografisini andırıyordu; baş bölgesi maskelenip sarıklı,
>   kısa sakallı olarak rötuşlandı.
> - **Reddedilenler:** minareye benzeyen bayraklı kule (`sebe-sabahi`), sivri/kemerli
>   pencereler (`danisma-salonu` iki aday), parmaklıklı ve kafesli pencere
>   (`kuzeye-bakan-pencere`), modern tele benzeyen iplere dizilmiş kuşlar ve yasak hüdhüd
>   (`bolum-4/kapak`), toz bulutunun içinde atlı figürler (`vadide-toz`), arkada yarı saydam
>   "hayalet" figür (`iki-taht`), Yunan tapınağına benzeyen yapı (kitap kapağı iki aday),
>   kâğıt kenarı çerçeveli rozet adayları.
> - **Brife göre küçük sapmalar:** `mescitte-isik`'te asanın yalnız alt ucu değil, üst
>   kenardan giren uzun bir bölümü görünüyor (kişi yok); `sabah-kosku`'nda billur zemin
>   kapıdan mavi bir parıltı olarak seçiliyor; `bos-dal`'daki tüy dalda dik duruyor.
> - **Kredi kuralı (Hasan, 17 Eki 2026):** küçük kompozisyon kusuru için en fazla bir
>   yeniden üretim turu; sonra en yakın aday kullanılır. Rozet 7 bu kuralla seçildi.
> - **Rozet ikinci referansı:** onaylanan pilot `rozetler/hz-suleyman/bolum-1.png`.
> - **Kapak ve harita durağı:** yayındaki `hz-yusuf/kapak.png` ve `hz-yusuf/harita-kapak.jpg`
>   görsel referans verilerek aynı aileden üretildi. Kapak **yazısız**; "Hz. Süleyman"
>   başlığı tasarımda eklenecek. 2K ana dosyalar `gorsel-kaynaklari/kitaplar/hz-suleyman/`.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-suleyman/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde sabah göğünde kanatlarını açmış, taç tüyü kabarık bir hüdhüd, aşağıda teraslı bağlar ve sıra sıra taş sütunlu sade bir yapı. **Yazısız** üretilir; "Hz. Süleyman" yazısı tasarım aşamasında eklenir; gagada mektup yok (final MD §C1) |
| `hz-suleyman/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal-okr zemin üzerinde altın çerçeveli madalyonda, dalda duran, taç tüyü açık tek bir hüdhüd (final MD §C2) |

### Bölüm 1 — Sürü ve Bağ Davası

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-1/kapak.jpg` | Açılış | A | — | ✅ Hazır | Şafak ışığında teraslı yamaçlara uzanan üzüm bağları, taş duvarlar ve uzakta düz damlı taş evler |
| `hz-suleyman/bolum-1/hukum-avlusu.jpg` | 1. Kısım | A | Hz. Dâvûd — Katman 1, arkadan, yüz görünmez (karma sahne). Hz. Süleyman (genç) — Katman 1, arkadan, yüz görünmez. Bağ sahibi ve sürü sahibi — Katman 3, karşıdan, sakin. Karakter bloğu yok (tek sahne; tarif promptta). | ✅ Hazır | Sabah ışığında kesme taş bir avlu; sedir bir oturakta arkası dönük oturan bir hükümdar, onun gerisinde küçük bir taburede genç oğlu ve karşılarında hasır minderlerde oturan iki köylü |
| `hz-suleyman/bolum-1/gece-bag.jpg` | 1. Kısım | A | — | ✅ Hazır | Ay ışığında bir bağın alçak taş duvarındaki açıklıktan asmaların arasına giren beyaz koyunlar |
| `hz-suleyman/bolum-1/avludaki-koyunlar.jpg` | Devam | B | Bağ sahibi — Katman 3, yandan, yüzü görünebilir. | ✅ Hazır | Taş bir ağılın önünde otlayan koyunlar; ön planda taş sekide oturup yün saran yaşlıca bir köylü, yanında süt dolu bir toprak kap ve yün dolu bir sepet |
| `hz-suleyman/bolum-1/onarilan-bag.jpg` | Devam | B | Sürü sahibi — Katman 3, yandan, yüzü görünebilir. | ✅ Hazır | Bahar sabahı bir bağda, alçak taş duvara son taşları yerleştiren genç bir adam; önünde yeni bağlanmış genç asma filizleri |
| `hz-suleyman/bolum-1/yeniden-salkim.jpg` | Devam | B | — | ✅ Hazır | Gün batımında mor salkımlarla dolu bir bağ; ön planda salkım dolu bir örgü sepet, uzakta yamaçta otlayan koyunlar |

### Bölüm 2 — Kuş Dili ve Rüzgâr

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-2/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında tepelere yayılmış, düz damlı kireç taşı evlerden oluşan bir şehir ve üzerinde açık, geniş bir gökyüzü |
| `hz-suleyman/bolum-2/kuslu-gok.jpg` | 1. Kısım | A | — | ✅ Hazır | Sabah göğünde süzülen farklı türde kuşlar ve yaşlı bir zeytin ağacının dallarına konmuş ötüşen küçük kuşlar |
| `hz-suleyman/bolum-2/ruzgarli-tepeler.jpg` | 1. Kısım | A | — | ✅ Hazır | Tepelerin üzerinde aynı yöne eğilen otlar ve zeytin dalları; gökte yumuşakça sürüklenen bulutlar ve havada uçuşan yapraklar |
| `hz-suleyman/bolum-2/mescit-avlusu.jpg` | Devam | B | Hz. Süleyman — Katman 1, arkadan, yüz görünmez; karakter bloğu: Hz. Süleyman (karma sahne). Ustalar — Katman 3, uzak. Cinler çizilmez (Faz 1 KARAR 2a). | ✅ Hazır | Sabah ışığında yükselen sade bir taş yapı; iskelelerde taş yontan ustalar ve ön planda avlunun basamağında arkası dönük duran uzun boylu bir adam |
| `hz-suleyman/bolum-2/bakir-kazanlar.jpg` | Devam | B | yok — cinlerin emeği; cinler çizilmez (Faz 1 KARAR 2a), insan işçi de konmaz ki iş insanlara mal edilmesin | ✅ Hazır | Taş bir oluktan parlayarak akan turuncu erimiş bakır ve yanında sıra sıra duran, havuz kadar büyük bakır kazanlar |
| `hz-suleyman/bolum-2/aksam-gogu.jpg` | Devam | B | Hz. Süleyman — Katman 1, arkadan, yüz görünmez; karakter bloğu: Hz. Süleyman. | ✅ Hazır | Gün batımında düz bir taş damın kenarında arkası dönük duran, asalı uzun boylu bir adam; gökte yuvalarına dönen kuş sürüsü ve uzakta ufka uzanan bir yol |

### Bölüm 3 — Karınca Vadisi

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-3/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında taşlı yamaçlar arasında uzanan, kuru otlu ve toprak yollu geniş bir vadi; uzakta yolun üzerinde ince bir toz bulutu |
| `hz-suleyman/bolum-3/atin-boynu.jpg` | 1. Kısım | A | Hz. Süleyman — Katman 1, yalnız el ve giysi yeni; baş, omuz ve beden kadraj dışında. Karakter bloğu prompta eklenmez (yakın planda bütün figürü çağırır); yalnız yen rengi bloktan alındı (krem-beyaz). | ✅ Hazır | İkindi ışığında kızıl-kahverengi bir atın parlak boynu ve yelesi; boynunu yavaşça sıvazlayan, krem-beyaz bir cüppe yeninin içinden uzanan bir el |
| `hz-suleyman/bolum-3/karinca-yolu.jpg` | 1. Kısım | A | — | ✅ Hazır | Yerden, karınca boyundan bakış: kuru otların arasında buğday taneleri taşıyan bir sıra karınca ve küçük bir yuva ağzı; arkada bulanık, çok uzakta bir toz bulutu |
| `hz-suleyman/bolum-3/yuvaya-donus.jpg` | Devam | B | — | ✅ Hazır | Kuru otların arasında toprak bir karınca yuvasının ağzı; son birkaç karınca içeri giriyor, üzerlerine ılık bir ışık düşüyor |
| `hz-suleyman/bolum-3/vadide-toz.jpg` | Devam | B | Hz. Süleyman — Katman 1, arkadan, yüz görünmez; karakter bloğu: Hz. Süleyman. Ordu yalnız toz bulutu (içinde cinler de olduğu için figürsüz; Faz 1 KARAR 2a). | ✅ Hazır | Ön planda bir taşın üzerinde tek bir karınca; orta planda yolun kenarında başı hafifçe eğik, arkası dönük duran asalı bir adam; geride yükselen altın renkli bir toz bulutu ve düzenli uçan kuşlar |
| `hz-suleyman/bolum-3/aksam-vadisi.jpg` | Devam | B | — | ✅ Hazır | Gün batımında sessizleşmiş geniş bir vadi; tozu yatışmış toprak yol ve otların arasında ışıkta parlayan ince karınca yolları |

### Bölüm 4 — Kaybolan Hüdhüd

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-4/kapak.jpg` | Açılış | A | Hz. Süleyman — Katman 1, arkadan, uzak plan, yüz görünmez; karakter bloğu: Hz. Süleyman. | ✅ Hazır | Sabah ışığında taş duvarlar ve yaşlı ağaçlarla çevrili bir avlu; dallara ve duvarlara sıra sıra konmuş kuşlar ve aralarında arkası dönük, yavaşça yürüyen uzun boylu bir adam |
| `hz-suleyman/bolum-4/bos-dal.jpg` | 1. Kısım | A | — | ✅ Hazır | Yakın planda, kuşların yan yana dizildiği bir zeytin dalı; sıranın ortasında boş kalan bir yer ve dala takılı kalmış tek bir çizgili tüy |
| `hz-suleyman/bolum-4/donen-hudhud.jpg` | 1. Kısım | A | — | ✅ Hazır | Kanatlarını açmış, taç tüyü kabarık bir hüdhüd, tozlu bir yoldan gelip taş bir duvarın üzerine konuyor |
| `hz-suleyman/bolum-4/sebe-sabahi.jpg` | Devam | B | — | ✅ Hazır | Sabah ışığında, hurmalıklar ve yeşil tarlalar arasında yükselen çok katlı kerpiç-taş yapılardan oluşan uzak bir şehir |
| `hz-suleyman/bolum-4/tas-kolcak.jpg` | Devam | B | Hz. Süleyman — Katman 1, tam arkadan ve hafif yukarıdan, baş dönük değil, yüz görünmez; karakter bloğu: Hz. Süleyman. | ✅ Hazır | Sütunlu bir taş salonda sedir bir oturakta arkası dönük, dimdik oturan uzun boylu bir adam; tam karşısında alçak bir taş dayanağın üzerinde duran hüdhüd |
| `hz-suleyman/bolum-4/guneye-yol.jpg` | Devam | B | — | ✅ Hazır | Gün batımında taş tepelerden güneye, kum tepelerine doğru uzanan ince bir yol ve ufukta parlayan akşam yıldızı |

### Bölüm 5 — Kuşun Getirdiği Mektup

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-5/kapak.jpg` | Açılış | A | — | ✅ Hazır | Şafakta dalga dalga uzanan altın renkli kum tepeleri ve gökyüzünde güneye doğru uçan tek bir küçük kuş |
| `hz-suleyman/bolum-5/mektup-tasiyan-kus.jpg` | 1. Kısım | A | — | ✅ Hazır | Pençelerinde dürülmüş, mühürlü bir mektup taşıyan hüdhüd, aşağıda uzanan hurmalıkların ve çölün üzerinden uçuyor |
| `hz-suleyman/bolum-5/danisma-salonu.jpg` | 1. Kısım | A | Sebe melikesi — Katman 1, arkadan, yüz görünmez; karakter bloğu: Sebe melikesi (karma sahne). İleri gelenler — Katman 3, karşıdan, sakin. | ✅ Hazır | Yüksek pencereli bir taş salonda oymalı bir oturakta arkası dönük oturan bir melike; önündeki alçak masada açılmış bir mektup ve çevresinde minderlerde oturup konuşan ileri gelenler |
| `hz-suleyman/bolum-5/acilmayan-sandiklar.jpg` | Devam | B | Hz. Süleyman — Katman 1, arkadan, yüz görünmez; karakter bloğu: Hz. Süleyman (karma sahne). Hediyeleri getirenler — Katman 3, karşıdan. | ✅ Hazır | Taş bir avluda kapakları kapalı ahşap sandıklar; önlerinde bir elini hafifçe kaldırmış, arkası dönük duran uzun boylu bir adam ve karşısında şaşkın yolcular, dinlenen develer |
| `hz-suleyman/bolum-5/geri-donen-kervan.jpg` | Devam | B | Kervancılar — Katman 3, çok uzak ve küçük. | ✅ Hazır | Gün batımında kum tepelerinin sırtında, üzerinde kapalı sandıklar taşıyan uzun bir deve dizisi ve yanlarında yürüyen küçük kervancı figürleri |
| `hz-suleyman/bolum-5/kuzeye-bakan-pencere.jpg` | Devam | B | Sebe melikesi — Katman 1, arkadan, yüz görünmez; karakter bloğu: Sebe melikesi. | ✅ Hazır | Akşam, yüksek bir taş binanın dikdörtgen penceresinden kuzeye uzanan kervan yoluna bakan, arkası dönük bir kadın; eli pervazdaki dürülmüş mektubun üzerinde |

### Bölüm 6 — Sırça Köşkteki Taht

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-6/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığının sütunların arasından süzüldüğü, kesme taştan geniş ve sakin bir salon |
| `hz-suleyman/bolum-6/bos-yer.jpg` | 1. Kısım | A | yok — teklifi yapan cin çizilmez (KARAR 2a); bekleyiş boş kaideyle anlatılır | ✅ Hazır | Taş bir salonda sedir ağacından sade bir oturak ve yanında üzerinde hiçbir şey olmayan geniş, alçak bir taş kaide |
| `hz-suleyman/bolum-6/iki-taht.jpg` | 1. Kısım | A | Hz. Süleyman — Katman 1, arkadan, yüz görünmez; karakter bloğu: Hz. Süleyman (karma sahne). İleri gelenler — Katman 3. Cinler ve "kitaptan bilgisi olan" kişi çizilmez. | ✅ Hazır | Sade sedir oturağın yanında, az önce boş olan taş kaidenin üzerinde duran oymalı büyük bir taht; önünde arkası dönük duran asalı bir adam ve salonun kenarında hayretle bakan ileri gelenler |
| `hz-suleyman/bolum-6/degisen-taht.jpg` | Devam | B | — | ✅ Hazır | Aynı oymalı tahtın üzerine bu kez lacivert, sade bir örtü serilmiş, yanına farklı minderler konmuş; salonda öğle ışığı |
| `hz-suleyman/bolum-6/billur-zemin.jpg` | Devam | B | Sebe melikesi — Katman 1, arkadan, yüz görünmez; bacak ve ayak görünmez (Faz 1 §A2/59); karakter bloğu: Sebe melikesi. | ✅ Hazır | Billurdan düzgün bir zeminin altında berrak su ve yüzen balıklar; taş eşikte arkası dönük duran, eliyle uzun cüppesinin eteğini hafifçe toplamış bir kadın |
| `hz-suleyman/bolum-6/sabah-kosku.jpg` | Devam | B | — | ✅ Hazır | Sabah ışığında bahçenin ortasında duran, sütunlu, düz damlı sade bir köşk; açık kapısından içerideki parlak zemin görünüyor |

### Bölüm 7 — Asa ve Ağaç Kurdu

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-suleyman/bolum-7/kapak.jpg` | Açılış | A | — | ✅ Hazır | Akşam ışığında sade taş sütunlarla çevrili, sessiz ve geniş bir taş avlu; avlunun ortasında bir zeytin ağacı |
| `hz-suleyman/bolum-7/iskeledeki-taslar.jpg` | 1. Kısım | A | yok — cinlerin emeği; cinler çizilmez (KARAR 2a) | ✅ Hazır | Sedir iskelelerle sarılı, yarısı yükselmiş bir taş duvar; yerde düzgünce dizilmiş iri yontma taşlar ve yeni dökülmüş bir bakır kazan |
| `hz-suleyman/bolum-7/mescitte-isik.jpg` | 1. Kısım | A | yok — vefat bölümü: Hz. Süleyman'ın bedeni çizilmez (Faz 1 §B6, §16/1); yalnız asanın alt ucu | ✅ Hazır | Sütunlu, loş bir taş salonda yüksek pencereden süzülen tek bir ışık huzmesi; huzmenin altında taş zemine dayanmış ahşap bir asanın alt ucu |
| `hz-suleyman/bolum-7/kemirilmis-asa.jpg` | Devam | B | yok — beden ve düşüş çizilmez (§16/1) | ✅ Hazır | Yakın planda, taş zeminde yatan ahşap bir asa parçası; yüzeyinde minik delikler ve yanında küçük bir talaş yığını |
| `hz-suleyman/bolum-7/mescide-dusen-isik.jpg` | Devam | B | — | ✅ Hazır | Taş bir salonun açık, büyük ahşap kapısından içeri dolan geniş bir sabah ışığı ve taş zeminde uzanan ışık yolu |
| `hz-suleyman/bolum-7/safakta-tepeler.jpg` | Devam | B | — | ✅ Hazır | Şafakta bağlı yamaçlar ve zeytinlikler; gökyüzünde güneşe doğru uçan bir kuş sürüsü ve rüzgârla hafifçe eğilen otlar |

## 4j. Hz. Yunus (`bookKey: yunus`) — 29 görsel

**Durum (16 Eki 2026):** aktarıldı, katalogda **"preparing"** (yayında değil). 29 sahne
slotunun **29'u da gerçek görsel** (`/gorsel-uretim yunus`); kitap kapağı, harita durağı,
5 rozet ve madalya da teslim edildi. Rozet ve madalya **çerçevesiz kare**dir (§6.2),
çerçeveyi Hasan ekler. Sesli anlatım hâlâ yer tutucudur. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-YUNUS-ICERIK-final.md` §B, §C, §D ve §H'dedir (İngilizce
ana üretim promptu, ortak stil bloğu, **mekân bloğu**, ortak negatif, **karakter bloğu
(EN)** ve rozet sembol stili bloğu dahil); aşağıdaki tablo dosya adı, akıştaki yer,
figür bilgisi ve `alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 /
Devam 3); **B3'te 1 açılış + 4 sahne** (1. Kısım 2 / Devam 2).

> **Figür kuralı** (REVİZE 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2). 29 sahnenin
> **14'ü figürlüdür** (B1 5 · B2 3 · B3 0 · B4 2 · B5 4). "Figür" sütunu final MD'deki
> sahne "Figür:" alanının **aynısıdır**; `—` figürsüz sahnedir, "yok — …" diye
> başlayan satırlar gerekçesi yazılmış figürsüz sahnelerdir. **Katman 1** — Hz. Yunus:
> 12 sahnede görünür, hiçbirinde yüzü yoktur (arkadan, uzak plan, başörtüsünün
> gölgesi). **Katman 3** — kervan yolcuları, satıcı, kapıdaki adam, gemiciler ve
> yolcular, Ninova halkı: yüz gösterilebilir; sakin, doğal, karikatürsüz. Şehrin ileri
> gelenleri ayrıca çizilmez; bu kitapta Katman 2 kişi yoktur. Karakter bloğu: Hz. Yunus
> (her figürlü sahnesinde promptun sonuna, stil bloğundan önce aynen); blok ad taşımaz.
> Katman 1 kişinin bulunduğu sahnenin negatifinde yüz yasağı (`visible face, facial
> features, eyes, mouth, profile, blank face, featureless face`), figürsüz sahnenin
> negatifinde `human figure, person, silhouette, hands` yazılıdır; yalnız Katman 3
> kişilerin bulunduğu sahnede (`bolum-2/duran-gemi`, `bolum-4/ninova-gunes`) yüz yasağı
> yazılmaz. Karma sahneler (`kervan-konagi`, `meydan-hurmasi`, `dar-sokak`,
> `yuklu-gemi`, `guverte`, `sehre-giris`, `huzurlu-sokak`, `hasirli-meydan`) üretimde
> elle kontrol edilir (§6.2 madde 5).

> **Kitaba özgü daha sıkı kararlar (Faz 1 §B6, kararlar 4a ve K11; final MD §B):**
> (1) denize bırakılış ve balığın yutması çizilmez; (2) balığın karnında figür yoktur —
> **B3'ün beş görseli figürsüzdür**; (3) kıyıda yatan hasta beden çizilmez — B4'te Hz.
> Yunus yalnız iyileşip yola çıktığı `bolum-4/kumdaki-izler`'de görünür; (4) dağ keçisi
> rivayeti görselleştirilmez; (5) balık "büyük bir balık"tır: tür belirtilmez; açık ağız,
> diş, balina kuyruğu ve püskürtme yoktur; balıklı sahnelerde (`bolum-2/derin-golge`,
> `bolum-3/kapak`, `bolum-3/yukselen-isik`, `bolum-3/kiyiya-dogru`) balık yalnız uzak,
> yumuşak bir silüet ya da sırt kavsidir; (6) Ninova'da kasırga ve kararan gök
> çizilmez.

> **Kitaba özgü ek yasaklar:** melek, kanat, hale; insan yüzlü kanatlı boğa (lamassu),
> put, heykel, taş kabartma, ziggurat/tapınak kulesi; fırtına, şimşek, kasırga, dev
> dalga, gemi kazası; açık balık ağzı, diş, çene, balina, balina kuyruğu, püskürtme,
> yunus balığı, deniz canavarı, ölü balık, iskelet; silah, asker, şiddet, kan; cami,
> kubbe, minare, hilal, kilise, haç ve yazı (ortak negatif, final MD §B). **Mekân
> bloğu** yalnız şehir, nehir ve iskele sahnelerine eklenir (B1'in altı sahnesi, B2
> `kapak` ve `yuklu-gemi`, B3 `bos-iskele`, B4 `ninova-gunes`, B5'in altı sahnesi);
> deniz, su altı ve kumsal sahnelerine eklenmez (Eyyûb'daki mekân sızması, §4f).
> Figürsüz sahnelere §6.2'deki `birds, tipi, tent` eklenir (bu kitapta istisna yok).
> Görsel dünya: Asur döneminin zamansız nehir dünyası — Dicle kıyısında kalın kerpiç
> surlar, düz damlı kerpiç evler, hurmalıklar, kamış kayıklar ve ahşap yük gemileri;
> ardından açık deniz, derin sular ve ıssız bir kumsal.

> **Görsel referans çiftleri** (§6.2 karakter ve imge tutarlılığı; final MD §I11): ilk
> onaylanan Hz. Yunus sahnesi (`bolum-1/kervan-konagi`) → öbür on bir Hz. Yunus sahnesi;
> `bolum-1/nehir-kiyisi` → `bolum-5/aksam-kiyisi` (aynı kadraj); `bolum-1/dar-sokak` →
> `bolum-5/huzurlu-sokak` (aynı bakış açısı); `bolum-2/yuklu-gemi` → `bolum-3/bos-iskele`
> (aynı iskele); `bolum-4/kabak-yapraklari` → `bolum-4/sabah-cigi`,
> `bolum-4/kumdaki-izler`, B4 rozeti ve harita durağı (aynı bitki).

> **Üretim kararları (16 Eki 2026, `/gorsel-uretim yunus`):** §6.2 set geneli
> standardı uygulandı (Seedream 5 Pro · 2K · `stil-referans-gorsel.jpg`). Figürlü
> sahnelerde ikişer-üçer varyant üretildi. Kitaba özgü notlar:
> - **Ad prompta girmez:** İngilizce promptlardaki "Hz. Yunus" modele "a tall man seen
>   completely from behind" olarak verildi; karakter bloğu "The man seen from behind:"
>   başlığıyla eklendi.
> - **Karakter referansı:** onaylanan `bolum-1/kervan-konagi` öbür on bir Hz. Yunus
>   sahnesine ikinci referans verildi. Model başörtüsünün üstüne ince bir ip/bağ
>   (agal benzeri) çiziyor; pilotta bu hâliyle onaylandığı için tutarlılık adına
>   bırakıldı. Figür boyu brifteki "kadrajın üçte birinden küçük" ölçüsüne inmiyor;
>   pilotta yaklaşık yarı boy onaylandı.
> - **Yüz hattı sızması:** `guverte`'nin bir adayında başörtüsünün kenarından sakal
>   ucu görünüyordu, reddedildi. Seçilen bütün Hz. Yunus sahnelerinde baş ayrıca
>   büyütülerek kontrol edildi.
> - **Kubbe sızması:** şehir sahnelerinde (`bolum-1/kapak`, `alacakaranlik`,
>   `ninova-gunes`) model küçük kubbeler ekliyor; negatife `domes, domed roofs,
>   rounded roofs, cupolas` ve pozitife "every roof is flat" eklendi. Şafak nehrinde
>   bir adayda basamaklı tapınak kulesi çıktı, reddedildi.
> - **Hz. Yunus'a benzeyen yolcu:** `duran-gemi`'nin ilk adaylarında krem başörtülü,
>   yüzü açık yolcular vardı (Hz. Yunus sanılabilir); gemicilere renkli kısa tunik ve
>   takke yazılarak yeniden üretildi.
> - **Balık:** `derin-golge`'de model ayrıntılı pullu bir sazan ya da köpekbalığına
>   benzeyen gövde çiziyor; "soft silhouette, no visible scales" ile yeniden üretildi.
>   `kiyiya-dogru`'da yalnız sırt kavsi kaya ya da boru gibi okunuyordu; sırtın altında
>   suyun içinden bulanık gövde gölgesi görünen sürüm seçildi.
> - **Kabak yaprağı:** ilk adaylarda loblu, üzüm yaprağına benzeyen yaprak çıktı;
>   yuvarlak/kalp biçimli yapraklı `kabak-yapraklari` seçildi ve `sabah-cigi`,
>   `kumdaki-izler`, B4 rozeti ve harita durağına referans verildi.
> - **Eş kadrajlar:** `aksam-kiyisi` `nehir-kiyisi`'ne, `huzurlu-sokak` `dar-sokak`'a,
>   `bos-iskele` `yuklu-gemi`'ye görsel referansla üretildi.
> - **Kapak ve harita durağı:** yayındaki `hz-musa/kapak.png` ve
>   `hz-musa/harita-kapak.jpg` referans verilerek aynı aileden üretildi. Kapak
>   **yazısız**dır; "Hz. Yunus" başlığı tasarımda eklenecek.
> - **Bilinen küçük sapmalar** (Hasan'ın onayına bırakıldı): `alacakaranlik`'ta sokak
>   yokuş çıkmıyor, nehre doğru iniyor; `sessiz-derinlik` yıldızlı gökyüzünü andırıyor;
>   kitap kapağındaki kabak sarmaşığında küçük yeşil kabaklar var.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-yunus/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta altın yıldız çerçeveli madalyon; içinde gün doğumunda dalgalar arasında süzülen büyük bir balığın sırtı ve kıyıda geniş yapraklı bir kabak sarmaşığı. **Yazısız** üretilir; "Hz. Yunus" yazısı tasarım aşamasında eklenir; balık yalnız sırt kavsi (final MD §C1) |
| `hz-yunus/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda, altına serin bir gölge düşen tek bir geniş kabak yaprağı (final MD §C2; B4 rozetiyle aynı imge) |

### Bölüm 1 — Büyük Şehre Çağrı

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yunus/bolum-1/kapak.jpg` | Açılış | A | — | ✅ Hazır | Sabah ışığında, nehrin karşı kıyısından görülen kalın kerpiç surlu büyük bir şehir; kıyıda hurma ağaçları ve nehirde yük kayıkları |
| `hz-yunus/bolum-1/kervan-konagi.jpg` | 1. Kısım | A | Hz. Yunus — Katman 1; arkadan, yüz görünmez, başörtüsü omuzlara düşüyor. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Kervan yolcuları (birkaç kişi) — Katman 3; yüzleri görünebilir, sakin, karikatürsüz. | ✅ Hazır | Surların dışında bir kuyunun başında dinlenen kervan; yolculara seslenen, arkası dönük uzun giysili bir adam ve onu dinleyen birkaç yolcu |
| `hz-yunus/bolum-1/nehir-kiyisi.jpg` | 1. Kısım | A | Hz. Yunus — Katman 1; arkadan, uzak plan, oturur hâlde; yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. | ✅ Hazır | Alacakaranlıkta nehir kıyısında, hurma ağacının altında arkası dönük oturan uzun giysili bir adam ve karşıda şehrin ilk ışıkları |
| `hz-yunus/bolum-1/meydan-hurmasi.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, uzak plan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Satıcı — Katman 3; uzak, yüzü görünebilir, işine dalmış. | ✅ Hazır | Sabah ışığında kerpiç evlerle çevrili bir meydan; ortasında yaşlı bir hurma ağacı ve meydanın içinden arkası dönük yürüyen uzun giysili bir adam; kenarda tezgâhını kuran bir satıcı |
| `hz-yunus/bolum-1/dar-sokak.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Kapıdaki adam — Katman 3; yüzü görünebilir, kayıtsız, karikatürsüz. | ✅ Hazır | Kerpiç evler arasında dar bir sokak; kapalı ahşap kapılar, bir kapının önünde arkası dönük duran uzun giysili adam ve ileride aralanan bir kapının eşiğinde başını sallayan bir adam |
| `hz-yunus/bolum-1/alacakaranlik.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, uzak plan, yürür hâlde; yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. | ✅ Hazır | Alacakaranlıkta kerpiç evler arasında hafifçe yokuş çıkan bir sokak; sokağın ucunda, uzakta, arkası dönük yürüyen uzun giysili bir adam ve duvar oyuklarında yanan birkaç kandil |

### Bölüm 2 — Beklemeden Çıkılan Yol

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yunus/bolum-2/kapak.jpg` | Açılış | A | — | ✅ Hazır | Dolunay ışığında gümüş gibi parlayan geniş bir nehir; ön planda kıyıdaki yaşlı bir ağacın gövdesi ve uzakta renkli fenerlerle süslü kayıklar |
| `hz-yunus/bolum-2/yuklu-gemi.jpg` | 1. Kısım | A | Hz. Yunus — Katman 1; arkadan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · İki gemici — Katman 3; yüzleri görünebilir, işine dalmış, sakin. | ✅ Hazır | Sabah sisinde nehir iskelesine bağlı, güvertesi çuvallarla dolu ahşap bir yük gemisi; çuval taşıyan iki gemici ve iskele tahtasından gemiye yürüyen, arkası dönük uzun giysili bir adam |
| `hz-yunus/bolum-2/duran-gemi.jpg` | 1. Kısım | A | Gemiciler ve yolcular — Katman 3; uzak, küçük, yüzleri görünebilir, endişeli ama sakin. Hz. Yunus bu sahnede yok (geminin alt katında uyuyor). | ✅ Hazır | Puslu gökyüzü altında, sakin denizin ortasında hareketsiz duran ahşap bir gemi; güvertede şaşkınlıkla konuşan birkaç gemici ve yolcu |
| `hz-yunus/bolum-2/guverte.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Gemiciler ve yolcular — Katman 3; yüzleri görünebilir, şaşkın ve dikkatli, öfkesiz. | ✅ Hazır | Ahşap bir geminin güvertesinde arkası dönük, dimdik duran uzun giysili bir adam ve karşısında ona şaşkınlıkla bakan küçük bir gemici ve yolcu topluluğu |
| `hz-yunus/bolum-2/derin-golge.jpg` | Devam | B | yok — Faz 1 §B6: denize bırakılış ve yutma çizilmez | ✅ Hazır | Açık mavi, aydınlık bir derinlikte yandan görülen, sakin sakin süzülen çok büyük bir balık; yukarıdan süzülen yumuşak ışık |
| `hz-yunus/bolum-2/ilk-yildiz.jpg` | Devam | B | — | ✅ Hazır | Alacakaranlıkta uçsuz bucaksız sakin bir deniz; gökyüzünde parlayan tek bir yıldız ve sudaki ince yansıması |

### Bölüm 3 — Karanlıklar İçinde Dua

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yunus/bolum-3/kapak.jpg` | Açılış | A | yok — Faz 1 §B6: balığın karnında ve denizde figür çizilmez | ✅ Hazır | Yüzeye yakın turkuaz su; suyun içinde dalgalanan ışık ağları ve uzakta yavaşça yüzen büyük bir balığın yumuşak silüeti |
| `hz-yunus/bolum-3/sessiz-derinlik.jpg` | 1. Kısım | A | yok — Faz 1 §B6: balığın karnında ve denizde figür çizilmez | ✅ Hazır | Neredeyse tamamen karanlık, derin lacivert bir su ve içinde asılı duran çok küçük, sönük ışık zerreleri |
| `hz-yunus/bolum-3/bos-iskele.jpg` | 1. Kısım | A | yok — hatırlanan an; gemiye biniş B2 `yuklu-gemi`'de figürle gösterildi | ✅ Hazır | Sabah ışığında boş kalmış bir nehir iskelesi; kazığa sarılı çözülmüş bir halat ve suda gemi izinin son halkaları |
| `hz-yunus/bolum-3/yukselen-isik.jpg` | Devam | B | yok — Faz 1 §B6: balığın karnında ve denizde figür çizilmez | ✅ Hazır | Derin denizde yukarıdan inen geniş, sıcak ışık huzmeleri; sular lacivertten turkuaza açılıyor |
| `hz-yunus/bolum-3/kiyiya-dogru.jpg` | Devam | B | yok — Faz 1 §B6: balığın karnında ve denizde figür çizilmez | ✅ Hazır | Şafakta sakin, turkuaz bir deniz; uzakta kumlu bir kıyı çizgisi ve suyun yüzeyinde kıyıya doğru ilerleyen büyük bir balığın yalnız ince sırt kavsi |

### Bölüm 4 — Issız Kıyıda Bir Gölge

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yunus/bolum-4/kapak.jpg` | Açılış | A | yok — Faz 1 §B6: kıyıdaki hasta beden çizilmez | ✅ Hazır | Şafakta ıslak kumun üzerine yayılan köpüklü küçük bir dalga, kumda parlayan birkaç deniz kabuğu ve pembe-altın gökyüzünün sudaki yansıması |
| `hz-yunus/bolum-4/issiz-kiyi.jpg` | 1. Kısım | A | yok — Faz 1 §B6: kıyıdaki hasta beden çizilmez | ✅ Hazır | Öğle güneşi altında uçsuz bucaksız kızgın kumlar, havada sıcaktan titreyen bir pus ve ufukta parlayan deniz |
| `hz-yunus/bolum-4/kabak-yapraklari.jpg` | 1. Kısım | A | yok — Faz 1 §B6: kıyıdaki hasta beden çizilmez | ✅ Hazır | Kumların üstünde yükselen geniş, yuvarlak yapraklı bir kabak sarmaşığı ve altında kum üzerinde serin, koyu bir gölge |
| `hz-yunus/bolum-4/sabah-cigi.jpg` | Devam | B | yok — Faz 1 §B6: kıyıdaki beden çizilmez; keçi rivayeti görselleştirilmez (karar K11) | ✅ Hazır | Sabah ışığında geniş kabak yapraklarının yakın görünümü; yaprakların üstünde parlayan çiy taneleri ve aralarından görünen sakin deniz |
| `hz-yunus/bolum-4/ninova-gunes.jpg` | Devam | B | Ninova halkı — Katman 3; yüzleri görünebilir, sakin, umutlu, karikatürsüz. Hz. Yunus bu sahnede yok (kıyıda). | ✅ Hazır | Kerpiç surların önündeki açık alanda bir araya gelmiş Ninova halkı; kimi diz çökmüş, kimi ellerini göğe açmış, üzerlerine berrak bir sabahın güneşi düşüyor |
| `hz-yunus/bolum-4/kumdaki-izler.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, uzak plan, sağlıklı ve yürür hâlde; yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. | ✅ Hazır | Gün doğumunda kabak bitkisinin gölgesinden başlayan ayak izleri ve izlerin ucunda, uzakta yeşil tepelere doğru yürüyen, arkası dönük uzun giysili bir adam |

### Bölüm 5 — Ninova'ya Dönüş

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-yunus/bolum-5/kapak.jpg` | Açılış | A | — | ✅ Hazır | Gün doğumunda hurmalıklar arasından nehir boyunca kıvrılan toprak bir yol ve ufukta altın ışıkla parlayan şehrin surları |
| `hz-yunus/bolum-5/sehre-giris.jpg` | 1. Kısım | A | Hz. Yunus — Katman 1; arkadan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Sokaktaki kadın ve çocuk — Katman 3; uzak, yüzleri görünebilir. | ✅ Hazır | Ardına kadar açık büyük ahşap şehir kapısının eşiğinde arkası dönük duran uzun giysili bir adam; içeride sabah ışığıyla aydınlanmış sokakta yürüyen bir kadın ve bir çocuk |
| `hz-yunus/bolum-5/huzurlu-sokak.jpg` | 1. Kısım | A | Hz. Yunus — Katman 1; arkadan, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Ninova halkı — Katman 3; yüzleri görünebilir, sevinçli ya da mahcup, karikatürsüz. | ✅ Hazır | Kapıları aralık, aydınlık bir sokakta arkası dönük duran uzun giysili bir adam ve çevresine toplanan kadınlar, erkekler, yaşlılar ve çocuklar; kimi sevinçli, kimi başını önüne eğmiş |
| `hz-yunus/bolum-5/hasirli-meydan.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, oturur hâlde, yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. · Dinleyenler — Katman 3; yüzleri görünebilir, dikkatli ve huzurlu. | ✅ Hazır | Hafif üstten bakışla, geniş gölgeli bir hurma ağacının altında hasırlara oturmuş, dikkatle dinleyen kadın, erkek ve çocuklar; ön planda onlara dönük, arkası görünen uzun giysili bir adam |
| `hz-yunus/bolum-5/aksam-kiyisi.jpg` | Devam | B | Hz. Yunus — Katman 1; arkadan, uzak plan, oturur hâlde; yüz görünmez. Karakter bloğu: Hz. Yunus (§B) — prompta aynen eklenir. | ✅ Hazır | Gün batımında nehir kıyısında, hurma ağacının altında arkası dönük oturan uzun giysili bir adam ve karşıda sıcak kandil ışıklarıyla dolu şehir |
| `hz-yunus/bolum-5/safak-nehri.jpg` | Devam | B | — | ✅ Hazır | Şafakta doğan güneşi yansıtan sakin bir nehir, kıyıya bağlı tek bir kamış kayık ve arkada yumuşak ışıkta kerpiç surlar |

---

## 4k. Hz. Îsâ (`bookKey: isa`) — 48 görsel

**Durum (17 Eki 2026):** aktarıldı ve **yayında** (katalogda "published", `yayinTarihi:
2026-10-17`; vitrin işareti kaldırıldı). 48 sahne, kitap kapağı, harita durağı, 8 rozet ve madalya **üretildi** (`/gorsel-uretim isa`, aşağıdaki
üretim kararları); rozet ve madalya çerçeve bekliyor, ses yer tutucu. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-ISA-ICERIK-final.md` §B, §C, §D ve §H'dedir (İngilizce
ana üretim promptu, ortak stil bloğu, ortak negatif, **karakter bloğu (EN)** ve rozet
sembol stili bloğu dahil); aşağıdaki tablo dosya adı, akıştaki yer, figür bilgisi ve
`alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 / Devam 3).

> **Figür kuralı** (REVİZE 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2) **ve kitaba özgü
> daha sıkı Faz 1 kararı S5.** 48 sahnenin **7'si figürlüdür** (B1 0 · B2 0 · B3 2 ·
> B4 1 · B5 1 · B6 2 · B7 1 · B8 0). "Figür" sütunu final MD'deki sahne "Figür:" alanının
> **aynısıdır**; "yok — …" diye başlayan satırlar gerekçesi yazılmış figürsüz sahnelerdir.
> **Hz. Meryem hiçbir biçimde** (silüet, el, örtü ucu dahil), **Hz. Îsâ figür, silüet ya
> da el olarak** hiçbir görselde yoktur; ayak izi de kullanılmaz. Bu iki kişi için
> karakter bloğu yoktur. **Katman 1** — havariler: yalnız `bolum-6/yol-heybeleri` ve
> `bolum-7/ikindi-tepe`'de, arkadan ve orta planda, yüzleri görünmez; karakter bloğu
> "Havariler" (final MD §B) promptun sonuna, stil bloğundan önce aynen eklenir.
> **Katman 3** — komşular, mahalle halkı, yolcular, iyileşen kişi (`bolum-3/aralik-kepenkler`,
> `bolum-3/acik-kepenkler`, `bolum-4/birlesen-yollar`, `bolum-5/acilan-kepenk`,
> `bolum-6/catal-yol`): uzak ya da arkadan; sakin, karikatürsüz. **Katman 2** — B8'deki
> tuzak kuranlar figürsüz bırakıldı. Figürlü sahnelerde Hz. Îsâ'nın da orada olduğu
> düşünülebilecek kompozisyon kurulmaz: grubun ortasında ya da önünde ayrı duran,
> ışıkla vurgulanan, beyaz ya da kırmızı-mavi giysili figür ve grubun yöneldiği boş
> odak yoktur. Sofra başındaki grup, gökyüzüne bakan grup, gece zeytinliğindeki grup ve
> ateş başında görünmeyen bir konuşmacıya dönük grup bilinçli olarak figürsüzdür
> (`bolum-7/minder-halkasi`, `bolum-7/genis-gokyuzu`, `bolum-8/gece-damlar`,
> `bolum-6/gece-atesi`). Havarili sahnelerin negatifinde yüz yasağı (`visible face,
> facial features, eyes, mouth, profile, blank face, featureless face`), figürsüz sahnenin
> negatifinde `human figure, person, silhouette, hands, footprints` yazılıdır. Karma ve
> figürlü sahnelerin yedisi de üretimde elle kontrol edilir (§6.2 madde 5).

> **Kitaba özgü ek yasaklar** (final MD §B ortak negatif ve "Kitaba özgü yasaklar"):
> bebek, anne-çocuk, yalnız duran genç örtülü kadın; grupta ayrı duran merkez figür; hale,
> nimbus, ışık huzmesi, gökten inen ışın, yükselen figür; haç, tepede üç direk, dikenli
> taç, kilise, çan kulesi, ikona, vitray, doğum sahnesi, yemlik, ahır, Beytüllahim yıldızı,
> tek parlak yıldız, üç müneccim, çobanlar, develi yolcular; güvercin, balık sembolü,
> zambak, kadeh; cami, kubbe, kemer, minare, hilal, mihrap; put, heykel; melek, kanat;
> silah, mızrak, çivi, zincir, asker, meşale, yara, hasta beden, sargı, mezar, tabut;
> yazı. **Beşik boştur** (`bolum-3/bos-besik`); **kuş toprak renginde küçük bir
> serçedir**, güvercin değildir. B8'de ışık huzmesi ve gökyüzüne yükselen şekil yoktur;
> zeytin bahçesi ve gece birlikte kullanılmaz. Figürsüz sahnelere §6.2'deki `birds, tipi,
> tent` eklenir; **istisna** üç kuş sahnesidir (`bolum-5/camur-kus`,
> `bolum-5/havalanan-kus`, `bolum-5/tek-tuy`). Kapak ve harita durağında Beytüllahim
> yıldızı çağrışımına karşı negatifte `eight-pointed star, star of Bethlehem` vardır.
> Görsel dünya: zamansız Doğu Akdeniz — kireç taşı tepeler, gümüşi zeytinlikler, hurma
> ağaçları, taşlar arasında pınarlar; sade taş sütunlu mabet avlusu, kil kandiller, düz
> damlı taş evler, ahşap kepenkler.

> **Görsel referans çiftleri** (§6.2 karakter ve imge tutarlılığı; final MD §I11):
> `bolum-1/kapak` → `bolum-1/aksam-kandilleri` (aynı avlu); `bolum-2/kapak` →
> `bolum-2/hurmali-agac` (aynı ağaç); `bolum-3/aralik-kepenkler` →
> `bolum-3/acik-kepenkler` (aynı sokak); `bolum-4/kapak` → `bolum-8/pinarli-tepe` (aynı
> pınarlı tepe); `bolum-6/yol-heybeleri` → `bolum-7/ikindi-tepe` (havari karakter
> tutarlılığı).

> **Üretim kararları (17 Eki 2026, `/gorsel-uretim isa`):** §6.2 set geneli standardı
> uygulandı (Seedream 5 Pro · sahne 2K · rozet, madalya, kapak, durak 1.5K ·
> `stil-referans-gorsel.jpg`); aday sayısı §6.2 tablosuna göre (açılış ve havari sahnesi 2,
> diğerleri 1). Kitaba özgü notlar:
> - **Görsel referans çiftleri** yukarıdaki listeye göre verildi; ayrıca `bolum-5/camur-kus`
>   → `havalanan-kus` ve `tek-tuy` (aynı taş), `bolum-1/kapak` → `aksam-kandilleri`.
>   Rozet ikinci referansı: onaylanan pilot `rozetler/hz-isa/bolum-1.png`.
> - **Havariler:** `yol-heybeleri`'nin ilk iki adayında arka sıradaki adamların yüzü ve sakalı
>   görünüyordu (çember hâlinde duran grup); "tek sıra, hepsi yola dönük, tamamen arkadan"
>   prompttan temiz aday seçildi ve `ikindi-tepe`'ye referans verildi. Başlar büyütülerek
>   kontrol edildi; yüz, yanak, sakal yok.
> - **Reddedilenler:** `bolum-1/kapak` B adayı (uzak kapıda beyaz giysili küçük figür);
>   pilot rozetin ilk adayı (kâse içinde kalkan biçimli amblem); `bolum-4/kapak` B adayı
>   (kemerli köprü, mağara ağzı); `bolum-8/kapali-kapilar` (kemerli kapılar, metal fener) ve
>   `bolum-8/gece-damlar` (kubbeli çatılar) — ikisi bir kez yeniden üretildi; rozet 4 ilk aday
>   (yapılı çeşme ağzı ve kâse) ve rozet 7 ilk aday (kandiller halka/kalp biçiminde).
> - **Rötuş (maskeli, ~10 kredi):** `bolum-6/yan-yana-fidanlar`'da uzak tepenin üstündeki iki
>   haç biçimli direk silindi; rozet 4'ün ikinci adayında yollar ortada dört kollu kavşak
>   oluşturuyordu, alt kol çimle örtüldü (üç yol pınarın yanında birleşiyor).
> - **Katman 3:** komşular ve mahalle halkı (B3) arkadan/yandan; `aralik-kepenkler`'de yaşlı
>   adam ve fısıldaşan çift yandan görünüyor (Katman 3'te serbest). `acilan-kepenk`'teki
>   iyileşen adam brifteki "arkadan" yerine dörtte üç arkadan, yüz hattı yandan seçiliyor.
> - **Kapak ve harita durağı:** yayındaki `hz-suleyman/kapak.png` ve
>   `hz-suleyman/harita-kapak.jpg` referans verilerek aynı aileden üretildi (yıldız biçimli
>   madalyon, sekiz köşeli değil). Kapak **yazısız**; "Hz. Îsâ" başlığı tasarımda eklenecek.
>   1.5K ana dosyalar `gorsel-kaynaklari/kitaplar/hz-isa/`.
> - **Bilinen küçük sapmalar** (Hasan 17 Eki 2026'da hepsini onayladı): `bolum-2/kapak` ve
>   `tasli-patika`'da mucizeden önce küçük bir su birikintisi var, patika vadisi brifteki
>   kadar çorak değil; `bolum-1/mabet-odasi`'nda küçük pencerenin yanında avluya açılan geniş
>   bir açıklık var; `perdeli-kose`'de ahşap sandalye; `bolum-3/kapak`'ta birkaç küçük ev
>   kapısı hafif kemerli; `ciyli-yapraklar`'da yerde kırık testi parçaları; rozet 1'deki
>   ışık bir parça sıvı gibi okunuyor; rozet 2, 3, 5 ve 7'de sembol %60 güvenli alanı biraz
>   aşıyor.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-isa/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta çok köşeli yıldız biçiminde altın çerçeveli madalyon; içinde şafak ışığında hurmalarla dolu tek bir hurma ağacı ve dibinde düz taşlar arasından akan su kaynağı. **Yazısız** üretilir; "Hz. Îsâ" yazısı tasarım aşamasında eklenir (final MD §C1) |
| `hz-isa/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal zemin üzerinde altın çerçeveli madalyonda, dibinde su kaynağı olan tek hurma ağacı (final MD §C2; B2'nin merkez imgesi) |

### Bölüm 1 — Mabette Gelen Müjde

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-1/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | Sabah ışığında sade taş sütunlu bir mabet avlusu; sütunların arasında kil kandiller ve uzakta zeytinli tepeler |
| `hz-isa/bolum-1/mabet-odasi.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz (rızık sahnesi ve Hz. Zekeriyyâ Zekeriyyâ kitabına kalır, D-k2) | ✅ Hazır | Mabedin sade, taş duvarlı küçük bir odası; küçük bir pencere açıklığından giren sabah ışığı, yerde bir hasır ve yanan bir kil kandil |
| `hz-isa/bolum-1/perdeli-kose.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Taş bir duvarın önüne gerilmiş açık renkli keten perde, kenarından sızan şafak ışığı ve yerde bir hasır |
| `hz-isa/bolum-1/yeni-sabah.jpg` | Devam | B | yok — sembol ve nesne sahnesi | ✅ Hazır | Tepelerin ardından yükselen güneş; ışık vadideki zeytinliklere ve taş evlere yayılıyor |
| `hz-isa/bolum-1/ilk-filiz.jpg` | Devam | B | yok — sembol ve nesne sahnesi | ✅ Hazır | Kuru ve çatlak toprağın arasından yükselen tek bir taze yeşil filiz ve üzerinde bir damla çiy |
| `hz-isa/bolum-1/aksam-kandilleri.jpg` | Devam | B | yok — mekân/manzara sahnesi; Hz. Meryem'in sahnesi (S5) | ✅ Hazır | Akşam, sade taş sütunlu mabet avlusunda birer birer yanan kil kandiller; gökyüzü mor ve lacivert |

### Bölüm 2 — Hurma Ağacının Dibinde

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-2/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | Alacakaranlıkta kireç taşı kayalarla çevrili ıssız bir vadi ve vadinin ortasında tek başına duran bir hurma ağacı |
| `hz-isa/bolum-2/tasli-patika.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Kayalık tepelerin arasından ıssız bir vadiye doğru kıvrılarak inen taşlı, dar bir patika |
| `hz-isa/bolum-2/kuru-kutuk.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Yakın planda, kabuğu çatlak, yaprakları solmuş kupkuru görünen bir hurma ağacı gövdesi ve dibindeki taşlar |
| `hz-isa/bolum-2/dokulen-hurmalar.jpg` | Devam | B | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Hurma ağacının dibinde kumun üstüne dökülmüş taze, parlak hurmalar ve hemen yanından akan berrak su |
| `hz-isa/bolum-2/su-kaynagi.jpg` | Devam | B | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Yakın planda, düz taşların arasından sessizce kaynayan berrak su ve kenarında birkaç hurma |
| `hz-isa/bolum-2/hurmali-agac.jpg` | Devam | B | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Sabah ışığında salkım salkım hurmalarla dolu hurma ağacı, dibinden akan su ve tepelerin arasına uzanan patika |

### Bölüm 3 — Beşikten Gelen Ses

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-3/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | Sabah ışığında tepe yamacına kurulmuş düz damlı taş evler, uzakta mabedin taş sütunları ve yola uzanan zeytin ağaçları |
| `hz-isa/bolum-3/aralik-kepenkler.jpg` | 1. Kısım | A | Komşular — Katman 3 (sıradan halk); arkadan ya da yandan, yüz seçilmeyecek uzaklıkta (Faz 1 B6 notu, F3); sakin, meraklı. Hz. Meryem ve bebek kadrajda yok (S5). | ✅ Hazır | Dar, taş döşeli bir sokakta yarı aralık kapıların önünde, uzakta, arkadan görünen ve fısıldaşan birkaç komşu; uzun sabah gölgeleri |
| `hz-isa/bolum-3/muhurlu-testi.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz (söz orucu) | ✅ Hazır | Taş bir basamağın üstünde, ağzı keten bir bezle kapatılıp iple sıkıca bağlanmış toprak bir testi |
| `hz-isa/bolum-3/bos-besik.jpg` | Devam | B | yok — olayın öznesi bebek Hz. Îsâ ve Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Taş zemin üzerinde duran, içinde katlanmış keten örtü olan sade ve boş ahşap bir beşik |
| `hz-isa/bolum-3/acik-kepenkler.jpg` | Devam | B | Mahalle halkı — Katman 3; arkadan ve yandan, orta-uzak plan; bakılan yer (Hz. Meryem ve bebek) kadrajın dışında (S5). | ✅ Hazır | Aynı sokak, kepenkleri ve kapıları ardına kadar açık; ikindi ışığında sokakta sessizce durup kadraj dışına bakan birkaç kişi |
| `hz-isa/bolum-3/zeytin-gun-batimi.jpg` | Devam | B | yok — mekân/manzara sahnesi; Hz. Meryem'in sahnesi (S5) | ✅ Hazır | Yerleşimin kenarında gün batımında yaşlı zeytin ağaçları ve ağaçların arasından uzaklara uzanan sakin bir patika |

### Bölüm 4 — Benim de Rabbim, Sizin de

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-4/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi (Hz. Meryem ile Hz. Îsâ'nın yuvası, S5) | ✅ Hazır | Öğle ışığında yeşil yamaçlı yüksekçe bir düzlük, kayaların arasından çıkan kaynak suyu, küçük taş bir ev ve zeytin ağaçları |
| `hz-isa/bolum-4/pinar-basi.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Meryem; Faz 1 S5 gereği figürsüz (anne ve oğulun yuvası) | ✅ Hazır | Taşların arasından akan kaynak suyunun başında bir toprak testi, taş bir seki ve gölge veren genç bir zeytin ağacı |
| `hz-isa/bolum-4/sarili-tomarlar.jpg` | 1. Kısım | A | yok — sembol ve nesne sahnesi | ✅ Hazır | Alçak ahşap bir rafta iple bağlanmış iki sarılı tomar ve yanında yanan küçük bir kil kandil |
| `hz-isa/bolum-4/birlesen-yollar.jpg` | Devam | B | Yolcular — Katman 3 (sıradan halk); çok uzak ve küçük. Pınarın başında bekleyen ya da öne çıkan bir figür yok (Hz. Îsâ çizilmez, S5). | ✅ Hazır | Tepeden bakış: üç farklı yönden gelen toprak yollar yamaçtaki tek bir pınarda buluşuyor; yollarda pınara doğru yürüyen küçük insan grupları |
| `hz-isa/bolum-4/sade-sofra.jpg` | Devam | B | yok — "yiyip içen birer insan" ifadesinin öznesi Hz. Îsâ ve Hz. Meryem; Faz 1 S5 gereği figürsüz | ✅ Hazır | Bir hasırın üstüne serilmiş sade bir yer sofrası: yuvarlak bir ekmek, birkaç hurma, su dolu toprak testi ve kâseler |
| `hz-isa/bolum-4/tepeden-bakis.jpg` | Devam | B | yok — mekân/manzara sahnesi | ✅ Hazır | Gün batımında pınarlı tepeden vadiye bakış; uzakta köylerin damlarından ince dumanlar yükseliyor |

### Bölüm 5 — Çamurdan Bir Kuş

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-5/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | Parlak bir bahar sabahında küçük bir derenin kenarında ıslak kızıl toprak, çiçekli otlar ve zeytin ağaçları |
| `hz-isa/bolum-5/camur-kus.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Îsâ; Faz 1 S5 gereği figürsüz; el de çizilmez | ✅ Hazır | Yakın planda, düz ve yuvarlak bir taşın üstünde duran, ıslak kilden yapılmış küçük bir kuş biçimi |
| `hz-isa/bolum-5/havalanan-kus.jpg` | 1. Kısım | A | yok — olayın öznesi Hz. Îsâ; Faz 1 S5 gereği figürsüz; Faz 1 S6 gereği tanık ve izleyen kalabalık da yok | ✅ Hazır | Zeytin dallarının arasından mavi gökyüzüne doğru havalanan küçük, toprak kahverengisi bir serçe |
| `hz-isa/bolum-5/acilan-kepenk.jpg` | Devam | B | İyileşen kişi — Katman 3 (sıradan halk); arkadan. Odada başka figür yok; onu iyileştiren Hz. Îsâ çizilmez (S5). | ✅ Hazır | Loş bir taş odada, ardına kadar açılmış ahşap kepengin önünde arkadan görünen ve dışarıdaki bahçeye bakan bir adam; içeri dolan sıcak gün ışığı |
| `hz-isa/bolum-5/zeytin-yolu.jpg` | Devam | B | yok — olayın öznesi Hz. Îsâ; Faz 1 S5 gereği figürsüz (yoluna devam etmesi) | ✅ Hazır | Zeytinliklerin arasından kıvrılarak uzaktaki bir köye doğru giden toprak yol ve kenarındaki yabani çiçekler |
| `hz-isa/bolum-5/tek-tuy.jpg` | Devam | B | yok — sembol ve nesne sahnesi | ✅ Hazır | Gün batımında düz bir taşın üstünde duran küçük, kahverengi bir kuş tüyü; ufukta küçük bir nokta gibi kaybolan kuş |

### Bölüm 6 — Allah Yolunda Yardımcılar

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-6/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | Gün doğumunda alçak tepelerin arasından kıvrılan uzun bir toprak yol, yol boyunca zeytin ağaçları ve uzakta küçük köyler |
| `hz-isa/bolum-6/catal-yol.jpg` | 1. Kısım | A | Yolcular — Katman 3 (sıradan halk); çok uzak ve küçük. Çatalda ya da ağacın altında bekleyen figür yok (S5). | ✅ Hazır | Bir tepe eteğinde iki yöne ayrılan toprak yol, çatalda yaşlı bir zeytin ağacı; yollardan birinde birlikte yürüyen birkaç kişi, öbüründe uzaklaşan iki kişi |
| `hz-isa/bolum-6/sessiz-aksam.jpg` | 1. Kısım | A | yok — sembol ve nesne sahnesi (sorudan sonraki sessizlik) | ✅ Hazır | Alacakaranlıkta rüzgârsız, kımıltısız bir buğday tarlası ve kenarında yaşlı bir zeytin ağacı |
| `hz-isa/bolum-6/yol-heybeleri.jpg` | Devam | B | Havariler — Katman 1; arkadan, orta plan, başları örtülü; yüzleri ve profilleri görünmez; karakter bloğu "Havariler" eklenir. Grubun önünde, ortasında ya da ayrı duran figür yok (Hz. Îsâ çizilmez, S5). | ✅ Hazır | Şafakta taş bir duvarın önünde, arkadan görünen birkaç adam heybelerini omuzlarına alıp önlerinde açılan yola bakıyor |
| `hz-isa/bolum-6/gece-atesi.jpg` | Devam | B | yok — metinde Hz. Îsâ da konaklayanların arasında; grup ateş başında gösterilirse görünmeyen bir merkez figür izlenimi doğar (F3, Faz 1 S5) | ✅ Hazır | Gece, açık bir tepede sönmeye yüz tutmuş küçük bir ateş ve çevresinde gelişigüzel bırakılmış heybeler, değnekler ve bir testi |
| `hz-isa/bolum-6/yan-yana-fidanlar.jpg` | Devam | B | yok — sembol ve nesne sahnesi (dostluk) | ✅ Hazır | Sabah ışığında bir yol kenarında yan yana yükselen genç zeytin fidanları ve ardında aydınlanan vadi |

### Bölüm 7 — Gökten Bir Sofra

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-7/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi | ✅ Hazır | İkindi ışığında çimenli geniş bir tepe düzlüğü, kenarlarında zeytin ağaçları ve bulutlarla dolu bir gökyüzü |
| `hz-isa/bolum-7/genis-gokyuzu.jpg` | 1. Kısım | A | yok — sembol ve nesne sahnesi; gökyüzüne bakan grup yükseliş ikonografisini çağırdığı için havariler çizilmedi | ✅ Hazır | Zeytin dallarının çerçevelediği, beyaz ve altın bulutlarla dolu derin mavi bir gökyüzü |
| `hz-isa/bolum-7/ikindi-tepe.jpg` | 1. Kısım | A | Havariler — Katman 1; arkadan, orta plan; yüzleri görünmez; karakter bloğu "Havariler" eklenir. Önlerinde konuşan ya da ayakta duran figür yok (S5). | ✅ Hazır | Tepe düzlüğünde uzun ikindi gölgeleri; düz taşlara oturmuş, arkadan görünen birkaç adam aşağıdaki vadiye bakıyor; ön planda toprak bir testi |
| `hz-isa/bolum-7/uzak-kandiller.jpg` | Devam | B | yok — sembol ve nesne sahnesi ("ilk gelenimizden son gelenimize kadar") | ✅ Hazır | Alacakaranlıkta tepeden vadiye inen bir yol boyunca dizilmiş, uzaklaştıkça küçülen yanan kil kandiller |
| `hz-isa/bolum-7/minder-halkasi.jpg` | Devam | B | yok — sembol ve nesne sahnesi; sofra başındaki grup "Son Akşam Yemeği" ikonografisini çağırdığı için havariler çizilmedi | ✅ Hazır | Çimenlerin üstüne serilmiş boş, temiz bir keten örtü ve çevresinde geniş bir halka hâlinde dizilmiş minderler |
| `hz-isa/bolum-7/kapanan-gun.jpg` | Devam | B | yok — mekân/manzara sahnesi | ✅ Hazır | Gün batımından sonra mavi saatte vadiden geçen kıvrımlı bir yol ve ufukta son turuncu çizgi |

### Bölüm 8 — Allah Onu Yükseltti

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-isa/bolum-8/kapak.jpg` | Açılış | A | yok — mekân/manzara sahnesi; zeytin bahçesi ve gece kullanılmadı (D-Ö6) | ✅ Hazır | Akşamüstü taş teraslı bir yamaç, seyrek zeytin ağaçları, uzakta düz damlı evler ve gökyüzünde toplanan bulutlar |
| `hz-isa/bolum-8/kapali-kapilar.jpg` | 1. Kısım | A | yok — olayın öznesi tuzak kuran ileri gelenler (Katman 2); §16/7 riski nedeniyle figürsüz bırakıldı (açık soru F2) | ✅ Hazır | İkindi sonunda dar bir sokak; iki yanda sıkıca kapatılmış ahşap kapılar ve kepenkler, duvarlarda uzun gölgeler |
| `hz-isa/bolum-8/gece-damlar.jpg` | 1. Kısım | A | yok — endişeli havariler (Katman 1) ve inananlar (Katman 3) bir gece sahnesinde Getsemani ikonografisine yaklaşacağı için figürsüz; zeytinlik de kullanılmadı (D-Ö6) | ✅ Hazır | Gece, düz damlı taş evlerin üstünde ince bulutların arasından görünen dolunay ve tek bir pencereden sızan sıcak kandil ışığı |
| `hz-isa/bolum-8/cozulen-ag.jpg` | Devam | B | yok — sembol ve nesne sahnesi | ✅ Hazır | Şafak öncesi çimenlerin üstünde ipleri gevşemiş, düğümleri çözülmüş, boş ve eski bir ağ |
| `hz-isa/bolum-8/ciyli-yapraklar.jpg` | Devam | B | yok — olayın öznesi Hz. Îsâ; Faz 1 S2 ve S5 gereği figürsüz | ✅ Hazır | Şafakta, ilk ışığın düştüğü çiyli zeytin yaprakları ve yere yakın taze otlar |
| `hz-isa/bolum-8/pinarli-tepe.jpg` | Devam | B | yok — mekân/manzara sahnesi | ✅ Hazır | Sabah güneşinde pınarlı yüksekçe bir düzlük; kayaların arasından akan berrak su, yanında taze hurmalı bir hurma ağacı ve zeytinler |

## 4l. Hz. İsmail (`bookKey: ismail`) — 36 görsel

**Durum (17 Eki 2026):** aktarıldı ve **yayında** (katalogda "published", `yayinTarihi:
2026-10-17`). 36 sahne,
kitap kapağı, harita durağı, 6 rozet ve madalya **üretildi** (`/gorsel-uretim ismail`);
rozet ve madalya çerçevesiz kare, çerçeveyi Hasan ekleyecek; ses yer tutucu. Briflerin tamamı
`kitap-icerikleri/KITAP-HZ-ISMAIL-ICERIK-final.md` §B, §C, §D ve §H'dedir (İngilizce
ana üretim promptu, ortak stil bloğu, ortak negatif, **karakter blokları (EN)** ve rozet
sembol stili bloğu dahil); aşağıdaki tablo dosya adı, akıştaki yer, figür bilgisi ve
`alt` metnini kaydeder. Bölüm başına 1 açılış + 5 sahne (1. Kısım 2 / Devam 3).

> **Figür kuralı** (REVİZE 16 Ekim 2026 — PROJE-MODELI 6.4, §2, §6.2). 36 sahnenin
> **21'i figürlüdür** (B1 3 · B2 4 · B3 2 · B4 4 · B5 4 · B6 4). "Figür" sütunu final
> MD'deki sahne "Figür:" alanının **aynısıdır**; `yok` figürsüz sahnedir. **Katman 1** —
> Hz. İsmail (bebek, çocuk, genç), Hz. İbrahim, Hâcer, Hz. İsmail'in eşi: yüz hiç
> görünmez (arkadan, uzak plan, gölge, örtü ya da kontra ışık); bebek hep örtü içindedir.
> **Katman 3** — Cürhümlü yolcular ve aileleri, sonraki yıllarda gelen yolcular
> (`bolum-2/uzaktaki-yolcular`, `bolum-2/cadirlar-kuruluyor`, `bolum-2/senlenen-vadi`,
> `bolum-6/uzak-yollar`, `bolum-6/kaynakta-yolcular`; karma sahne `bolum-2/kaynak-basinda`):
> yüz gösterilebilir; sakin, karikatürsüz, çoğu uzak planda. Bu kitapta Katman 2 kişi
> yoktur. **B3'te teslimiyet ve sesleniş anı figürsüzdür** (Faz 1 KARAR); figürlü olan
> yalnız rüyadan önceki birlikte çalışma (`bolum-3/birlikte-calisma`) ve sevinçle dönüştür
> (`bolum-3/sevincle-donus`). **Hz. İsmail'in ilk eşi hiçbir görselde yoktur;** ikinci eşi
> yalnız `bolum-4/ikram`'da görünür (blok yazılmadı, tarifi o sahnenin promptunda).
> Karakter blokları (final MD §B): Ibrahim (adult) · Hajar · Ismail (infant / boy /
> young man) — figürlü sahnenin promptuna, stil bloğundan önce aynen eklenir; Hz. İbrahim
> ve Hâcer satırları Hz. İbrahim kitabıyla **birebir aynıdır** (iki kitabın karakter
> tutarlılığı; İbrahim'in onaylanan sahneleri ikinci referans olarak verilebilir).
> Katman 1 kişinin bulunduğu sahnenin negatifinde yüz yasağı (`visible face, facial
> features, eyes, mouth, profile, blank face, featureless face`), figürsüz sahnenin
> negatifinde `human figure, person` yazılıdır; yalnız Katman 3 kişilerin bulunduğu
> sahnede yüz yasağı yazılmaz. Karma ve figürlü sahneler üretimde elle kontrol edilir
> (§6.2 madde 5).

> **Kitaba özgü ek yasaklar** (final MD §B ortak negatif ve "Kitaba özgü yasaklar"):
> melek, kanat, hale, ışıklı varlık (zemzem sahnesi dahil); yatırılmış beden, bıçak, ip,
> taş sunak, kan, kesim, leş; Kâbe örtüsü, siyah örtü, altın işleme, altın kapı; cami,
> kubbe, minare, hilal, kilise, haç; yazı. **B1–B4 sahnelerinde** `Kaaba, cube-shaped
> building, black cube, shrine` yasaktır (yapı B5'te yükselir; B5–B6'da yapı yalın, kaba
> yontulmuş, örtüsüz ve süssüzdür). B4–B5'teki yay ve ok yalnız sırtta ya da yere
> bırakılmış, kimseye doğrultulmamış çizilir. **§6.2 istisnaları:** `birds` negatiften
> çıkarılır — `bolum-2/kapak` (sahnenin konusu kuşlardır); `tent` negatiften çıkarılır ve
> çadırlar keçi kılı çadır olarak istenir — `bolum-2/testiler`, `bolum-3/kapak`,
> `bolum-3/yildizli-gece`. Görsel dünya: taşlı, yuvarlak hatlı bazalt kahvesi ve kızıl okr
> tepeler arasında kumlu bir vadi; ortada yaşlı, dikenli bir akasya (Hz. İbrahim B8
> görselleriyle aynı ağaç) ve dibinde kaynayan su; B2'den sonra keçi kılı çadırlar, sonra
> alçak taş ve kerpiç evler.

> **Üretim kararları (17 Eki 2026, `/gorsel-uretim ismail`):** §6.2 set geneli standardı
> uygulandı (Seedream 5 Pro · sahne 2K · rozet, madalya, kapak, durak 1.5K ·
> `stil-referans-gorsel.jpg`); aday sayısı §6.2 tablosuna göre. Kitaba özgü notlar:
> - **Ad prompta girmez** (İbrahim/Yunus emsali); karakter blokları adsız eklendi.
> - **Karakter referansları:** Hâcer için Hz. İbrahim `bolum-8/vadide-aksam`, sonra onaylanan
>   `bolum-1/akasya-golgesi`; Hz. İbrahim (yetişkin) için Hz. İbrahim `bolum-7/baba-evi`, sonra
>   `bolum-3/birlikte-calisma` ve `bolum-5/tas-tasima`; genç Hz. İsmail için `bolum-4/avci-genc`.
>   Açılışlarda önceki bölümün açılışı (vadi sürekliliği) referans verildi.
> - **Rozet ikinci referansı verilmedi:** B2'de 1. rozet referans verilince model sembolü
>   (tepeler arasında fışkıran su) kopyaladı; B2 yalnız stil referansıyla yeniden üretildi,
>   kalan rozetler de öyle.
> - **Rötuş dersi:** sakal/yanak sızmasında `replace` rötuşu bir kez **yeni bir yüz** üretti
>   (`bolum-3/sevincle-donus`, reddedildi); `erase` modu (~30 kredi) temiz sonuç verdi ve
>   `sevincle-donus`, `bolum-5/dua-ani`, `bolum-5/tas-tasima`'da kullanıldı.
> - **Hz. İbrahim yüz sızması:** model yetişkin Hz. İbrahim'i B5'te ısrarla yüzü açık çizdi.
>   `ok-yontan` (uzaktaki figürün yüzü seçiliyordu), `kucaklasma` (kontra ışıkta profil ve
>   sakal silueti) ve `tas-tasima` (profil) bir kez yeniden üretildi; `ok-yontan`'da uzaktaki
>   figür rötuşla küçük, yüzsüz, kapüşonlu koyu bir siluete çevrildi (biraz stilize — Hasan'ın
>   onayına bırakıldı); `tas-tasima`'da yanak silme moduyla kaldırıldı.
> - **Diğer rötuşlar:** `bolum-1/akasya-golgesi`'nde bebeğin yanağı Hâcer'in omzundan
>   görünüyordu, örtü kıvrımıyla kapatıldı (ilk rötuş bebeği katlanmış örtüye çevirdi,
>   reddedildi); `bolum-2/cadirlar-kuruluyor`'da mavi elbiseli kadın (Hâcer'e benziyordu,
>   brif negatifi) pas rengi elbiseye çevrildi.
> - **Reddedilen diğerleri:** `bolum-1/toprak-set` B (Hâcer önden, yüz bölgesi boş);
>   `bolum-3/kapak` A (testiler ön planı kaplıyor); `bolum-3/sevincle-donus` B (sakal);
>   `bolum-4/huzurlu-ev` A (başlık kenarında sakal ucu); rozet 6 ilk aday (yollar köşelere
>   uzanan X, kâğıt kenar payı).
> - **Bilinen küçük sapmalar** (Hasan'ın onayına): `bolum-1/kaynayan-su`'da suyun kabarışı cam
>   kubbe gibi parlak; `bolum-4/ikram`'da Hz. İbrahim brifteki "arkası yarı dönük" yerine önden
>   oturuyor, yüzü başörtüsüyle tamamen kapalı; `bolum-3/kapak`'ta su seti kumla karışık;
>   rozet 3'te boynuzun ağzı açık, şofarı andırabilir; rozet 5 ve madalyada kâğıt kenar payı
>   kırpıldı (sembol biraz büyüdü).
> - **Kapak ve harita durağı:** yayındaki `hz-isa/kapak.png` ve `hz-isa/harita-kapak.jpg`
>   referans verilerek aynı aileden üretildi. Kapak **yazısız**; "Hz. İsmail" başlığı tasarımda
>   eklenecek. Durakta su fışkırır biçimde, brifteki "kabaran" kadar yumuşak değil. 1.5K ana
>   dosyalar `gorsel-kaynaklari/kitaplar/hz-ismail/`.

### Kitap kapağı ve harita durağı

| Dosya | Biçim | Durum | Görsel brifi |
|---|---|---|---|
| `hz-ismail/kapak.png` | 600×900, 2:3 dikey | ✅ Hazır | Lacivert deri dokulu kapakta çok köşeli yıldız biçiminde altın çerçeveli madalyon; içinde iki taşlı tepe arasında kumdan kaynayan turkuaz su ve üstünde daire çizen küçük beyaz kuşlar; arkada kurak vadi ve yaşlı akasya. **Yazısız** üretilir; "Hz. İsmail" yazısı tasarım aşamasında eklenir (final MD §C1) |
| `hz-ismail/harita-kapak.jpg` | Kare, 512×512 veya üstü | ✅ Hazır | Hardal-okr zemin üzerinde altın çerçeveli madalyonda, iki küçük tepe arasında kumdan kaynayan berrak su (final MD §C2; B1 rozetiyle aynı imge) |

### Bölüm 1 — Safa ile Merve Arasında

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-1/kapak.jpg` | Açılış | A | yok | ✅ Hazır | Öğle sıcağında iki koyu, taşlı tepe arasında uzanan kurak vadi; vadinin ortasında tek başına duran yaşlı, dikenli bir akasya ve titreyen sıcak hava |
| `hz-ismail/bolum-1/akasya-golgesi.jpg` | 1. Kısım | A | Hâcer — Katman 1 (peygamber eşi ve annesi); tamamen arkadan, yüz ve profil görünmez. Bebek Hz. İsmail — Katman 1; örtüye sarılı, yüzü görünmez. Karakter blokları: Hâcer; Ismail (infant). | ✅ Hazır | Akasyanın gölgesinde arkası dönük oturan, kucağındaki örtüye sarılı bebeğini tutan Hâcer; yanında deri bir hurma torbası ve toprak bir su kabı; önünde uzanan ıssız vadi |
| `hz-ismail/bolum-1/bos-su-kabi.jpg` | 1. Kısım | A | yok | ✅ Hazır | Çatlamış kuru toprağın üstünde yan yatmış, ağzı boş bir toprak su kabı ve yanında buruşmuş, boş bir deri torba; üzerlerine düşen sert öğle ışığı |
| `hz-ismail/bolum-1/iki-tepe-arasi.jpg` | Devam | B | Hâcer — Katman 1; tamamen arkadan, uzak plan, yüz ve profil görünmez. Karakter bloğu: Hâcer. Bebek bu karede görünmez. | ✅ Hazır | İki taşlı tepe arasındaki vadi tabanında, uzun eteği ve örtüsü rüzgârda savrulurken karşıdaki tepeye doğru koşan Hâcer, arkadan ve uzakta |
| `hz-ismail/bolum-1/kaynayan-su.jpg` | Devam | B | yok (bebeğin örtüsünün yalnız kenarı; beden ve yüz görünmez) | ✅ Hazır | Kupkuru kumların ve çakılların arasından yukarı doğru kabaran berrak, turkuaz su; suyun yüzeyinde parlayan ışık ve çevresinde koyulaşan ıslak kum |
| `hz-ismail/bolum-1/toprak-set.jpg` | Devam | B | Hâcer — Katman 1; tamamen arkadan, yüz ve profil görünmez. Bebek Hz. İsmail — Katman 1; örtüye sarılı, yüzü görünmez. Karakter blokları: Hâcer; Ismail (infant). | ✅ Hazır | Kaynağın başında arkası dönük diz çökmüş, suyun çevresine elleriyle topraktan küçük bir set yapan Hâcer; yanında akasyanın gölgesinde örtüye sarılı bebeği |

### Bölüm 2 — Kuşların Haber Verdiği Su

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-2/kapak.jpg` | Açılış | A | yok | ✅ Hazır | Serin sabah ışığında vadinin üstünde daireler çizen beyaz kuşlar; aşağıda akasyanın dibinde, topraktan setle çevrili, parlayan küçük bir su |
| `hz-ismail/bolum-2/uzaktaki-yolcular.jpg` | 1. Kısım | A | Cürhümlü yolcular — Katman 3 (sıradan halk); yüz gösterilebilir, sakin, karikatürsüz; çoğu yandan ya da arkadan. | ✅ Hazır | Taşlı bir sırtta develeri ve keçileriyle durmuş göçebe yolcular; içlerinden biri kolunu uzatıp uzaktaki vadinin üstünde dönen beyaz kuşları gösteriyor |
| `hz-ismail/bolum-2/kaynak-basinda.jpg` | 1. Kısım | A | Hâcer — Katman 1; tamamen arkadan, yüz ve profil görünmez (karma sahne: "seen from behind"). Bebek Hz. İsmail — Katman 1; örtüye sarılı. Yolcular — Katman 3; yüz gösterilebilir. Karakter blokları: Hâcer; Ismail (infant). | ✅ Hazır | Akasyanın dibindeki suyun başında arkası dönük oturan, kucağında bebeğini tutan Hâcer; karşıdan, birkaç adım ötede durup saygıyla eğilen göçebe yolcular ve arkalarında develer |
| `hz-ismail/bolum-2/cadirlar-kuruluyor.jpg` | Devam | B | Cürhümlü aileler — Katman 3; yüz gösterilebilir, sakin, karikatürsüz. Hâcer ve Hz. İsmail bu karede yok. | ✅ Hazır | Suyun çevresinde keçi kılı çadırlarını kuran aileler; direk diken erkekler, kilim seren kadınlar, keçilerin arasında koşan çocuklar ve diz çökmüş develer |
| `hz-ismail/bolum-2/testiler.jpg` | Devam | B | yok | ✅ Hazır | Toprak setle çevrili suyun kenarında yan yana dizilmiş, farklı boy ve renklerde toprak testiler; birinin ağzından taşan su ve arkada keçi kılı çadırlar |
| `hz-ismail/bolum-2/senlenen-vadi.jpg` | Devam | B | Cürhümlü aileler — Katman 3; çok küçük ve uzak, yüz seçilmez. | ✅ Hazır | Akşam alacasında iki tepe arasındaki vadide, suyun çevresine kurulmuş çadırlar, yanan ocaklar ve uzakta küçük insan toplulukları; gökte ilk yıldızlar |

### Bölüm 3 — Rüya ve Büyük İmtihan

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-3/kapak.jpg` | Açılış | A | yok | ✅ Hazır | İkindi ışığında vadide, akasyanın ve suyun çevresine dağılmış keçi kılı çadırlar, alçak taş ağıllar ve otlayan keçiler; arkada iki taşlı tepe |
| `hz-ismail/bolum-3/birlikte-calisma.jpg` | 1. Kısım | A | Hz. İbrahim ve Hz. İsmail — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter blokları: Ibrahim (adult); Ismail (boy). | ✅ Hazır | İkindi ışığında taşlı bir patikada, aralarında taşlarla dolu hasır bir sepeti birlikte taşıyarak yürüyen Hz. İbrahim ve oğlu Hz. İsmail, arkadan |
| `hz-ismail/bolum-3/yildizli-gece.jpg` | 1. Kısım | A | yok | ✅ Hazır | Gece, vadide yıldızlı bir göğün altında duran keçi kılı çadır; aralığından sızan sakin kandil ışığı ve yanında karanlıkta seçilen akasya |
| `hz-ismail/bolum-3/sabah-yamaci.jpg` | Devam | B | yok (Faz 1 KARAR: teslimiyet anı figürsüz) | ✅ Hazır | Şafakta sessiz, taşlı bir dağ yamacı; tepenin ardından yükselen yumuşak altın ışık yamaca ve kayaların arasındaki küçük bir çalılığa düşüyor |
| `hz-ismail/bolum-3/otlayan-koc.jpg` | Devam | B | yok | ✅ Hazır | Sabah ışığında yamaçta, kayaların arasında sakin sakin otlayan, kıvrık boynuzlu, kalın beyaz yünlü iri bir koç |
| `hz-ismail/bolum-3/sevincle-donus.jpg` | Devam | B | Hz. İbrahim ve Hz. İsmail — Katman 1; tamamen arkadan, uzak plan, yüz ve profil görünmez. Karakter blokları: Ibrahim (adult); Ismail (boy). | ✅ Hazır | Gün batımında vadiye inen patikada, yan yana yürüyen Hz. İbrahim ve Hz. İsmail, arkadan ve uzakta; babasının bir eli oğlunun omzunda; aşağıda çadırların ışıkları |

### Bölüm 4 — Kapı Eşiğindeki Öğüt

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-4/kapak.jpg` | Açılış | A | yok | ✅ Hazır | İkindi ışığında vadide yan yana dizilmiş alçak taş ve kerpiç evler; kapı önlerinde hasır gölgelikler, toprak testiler ve uzakta akasya |
| `hz-ismail/bolum-4/avci-genc.jpg` | 1. Kısım | A | Hz. İsmail — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Ismail (young man). | ✅ Hazır | Sabahın ilk ışığında vadinin dışına, taşlı kırlara doğru yürüyen, sırtında ahşap bir yay ve deri bir okluk taşıyan genç Hz. İsmail, arkadan |
| `hz-ismail/bolum-4/kapidaki-misafir.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Ibrahim (adult). Hz. İsmail'in ilk eşi gösterilmez (kapının içinde kimse yok). | ✅ Hazır | İkindi ışığında taş bir evin kapısı önünde, uzun asasına dayanarak duran yaşlı yolcu Hz. İbrahim, arkadan; açık kapının içi loş ve boş görünüyor |
| `hz-ismail/bolum-4/esik.jpg` | Devam | B | yok | ✅ Hazır | Akşamüstü ışığında, yarı açık ahşap bir kapının altındaki eski, aşınmış taş eşik ve eşiğin üstüne düşen ince ışık şeridi |
| `hz-ismail/bolum-4/ikram.jpg` | Devam | B | Hz. İbrahim — Katman 1; uzak plan, arkası yarı dönük, yüzü başörtüsünün gölgesinde tamamen gizli ("face fully hidden in deep shadow"). Hz. İsmail'in eşi — Katman 1 (peygamber eşi); tamamen arkadan, yüz ve profil görünmez (karakter bloğu yok; tarif bu promptta). Karakter bloğu: Ibrahim (adult). | ✅ Hazır | Pişmiş et ve toprak bir testi su dolu tepsiyle hasır gölgeliğe doğru yürüyen Hz. İsmail'in eşi, arkadan; gölgeliğin derinliğinde, başörtüsü öne düşmüş, yüzü gölgede oturan yaşlı misafir Hz. İbrahim |
| `hz-ismail/bolum-4/huzurlu-ev.jpg` | Devam | B | Hz. İsmail — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Ismail (young man). | ✅ Hazır | Akşam alacasında, kapısından ve küçük penceresinden sıcak ışık sızan taş bir eve doğru yürüyen genç Hz. İsmail, arkadan; kapının önünde toprak bir testi |

### Bölüm 5 — Allah'ın Evinin Temelleri

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-5/kapak.jpg` | Açılış | A | yok | ✅ Hazır | Sabah ışığında, vadinin ortasında çevresinden hafifçe yüksekte duran boş, kızıl toprak bir tümsek; çevresinde tepeler ve uzakta yerleşimin damları |
| `hz-ismail/bolum-5/ok-yontan.jpg` | 1. Kısım | A | Hz. İsmail ve Hz. İbrahim — Katman 1; ikisi de yüzü görünmeden: İsmail tamamen arkadan, İbrahim uzak planda ve yüzü sisle seçilmez. Karakter blokları: Ismail (young man); Ibrahim (adult). | ✅ Hazır | Büyük bir akasyanın gölgesinde arkası dönük oturan, kucağındaki oku düz bir bileği taşıyla düzelten genç Hz. İsmail; uzakta patikadan yaklaşan, asalı yaşlı Hz. İbrahim |
| `hz-ismail/bolum-5/kucaklasma.jpg` | 1. Kısım | A | Hz. İbrahim ve Hz. İsmail — Katman 1; uzak plan ve kontra ışık, yüz hiç seçilmez (doğal sebep: güneş arkalarında). Karakter blokları: Ibrahim (adult); Ismail (young man). | ✅ Hazır | Sabah güneşi arkalarından doğarken vadinin patikasında birbirine sarılan Hz. İbrahim ve Hz. İsmail, uzakta ve kontra ışıkta koyu biçimler hâlinde |
| `hz-ismail/bolum-5/tas-tasima.jpg` | Devam | B | Hz. İsmail ve Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter blokları: Ismail (young man); Ibrahim (adult). | ✅ Hazır | Kızıl toprak tümseğin üstünde yükselmeye başlayan alçak taş duvar; omzunda yassı bir taş taşıyarak duvara yürüyen Hz. İsmail ve duvarın başında taşları üst üste dizen Hz. İbrahim, ikisi de arkadan |
| `hz-ismail/bolum-5/yukselen-duvar.jpg` | Devam | B | yok | ✅ Hazır | Alçak açıdan, öğle göğüne doğru yükselen, kaba yontulmuş taşlardan yalın bir duvar köşesi ve dibine basamak gibi konmuş büyük, yassı bir taş |
| `hz-ismail/bolum-5/dua-ani.jpg` | Devam | B | Hz. İbrahim ve Hz. İsmail — Katman 1; tamamen arkadan, uzak plan, yüz ve profil görünmez. Karakter blokları: Ibrahim (adult); Ismail (young man). | ✅ Hazır | Gün batımında, kızıl toprak tümsekte yükselmiş yalın taş duvarların önünde yan yana durup ellerini dua için açmış Hz. İbrahim ve Hz. İsmail, arkadan ve uzakta |

### Bölüm 6 — Herkesi Bekleyen Ev

| Dosya | Akıştaki yer | Öncelik | Figür | Durum | Görsel brifi |
|---|---|---|---|---|---|
| `hz-ismail/bolum-6/kapak.jpg` | Açılış | A | yok | ✅ Hazır | Şafakta, vadinin ortasındaki kızıl tümsekte duran yalın, örtüsüz, kaba yontulmuş taşlardan alçak bir yapı; çevresinde düz damlı evler, akasya ve uzakta tepeler |
| `hz-ismail/bolum-6/cagri.jpg` | 1. Kısım | A | Hz. İbrahim — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Ibrahim (adult). | ✅ Hazır | Sabah ışığında yüksek bir kayanın üstünde arkası dönük duran Hz. İbrahim; mantosu rüzgârda dalgalanıyor; önünde katman katman uzanan tepeler ve ufka giden yollar |
| `hz-ismail/bolum-6/uzak-yollar.jpg` | 1. Kısım | A | Yolcular — Katman 3; çok küçük ve uzak, yüz seçilmez. | ✅ Hazır | Öğleden sonra ışığında, uzak tepelerin arasından vadiye inen kıvrımlı yollarda yaya yürüyen ve develer üzerinde gelen küçük yolcu kafileleri |
| `hz-ismail/bolum-6/temiz-tutma.jpg` | Devam | B | Hz. İsmail — Katman 1; tamamen arkadan, yüz ve profil görünmez. Karakter bloğu: Ismail (young man) — bu sahnede yay ve okluk yok. | ✅ Hazır | Şafakta, yalın taş yapının önündeki toprak avluyu hurma yaprağından yapılmış bir süpürgeyle süpüren Hz. İsmail, arkadan; yanında toprak bir su testisi |
| `hz-ismail/bolum-6/kaynakta-yolcular.jpg` | Devam | B | Yolcular — Katman 3; yüz gösterilebilir, sakin, karikatürsüz. Katman 1 kişi yok. | ✅ Hazır | Akşamüstü ışığında, akasyanın dibindeki suyun taş seti başında toprak kaplarla su içen, dinlenen yolcular; kadınlar, yaşlılar ve çocuklar |
| `hz-ismail/bolum-6/ilk-yildizlar.jpg` | Devam | B | yok | ✅ Hazır | Akşam alacasında, vadinin ortasındaki yalın taş evin çevresinde yanan sakin ocak ışıkları; dört yönden eve uzanan ince yollar ve gökte beliren ilk yıldızlar |

## 5. Sayaçlar

| Kitap | Açılış | İçerik sahnesi | Toplam | Hazır | Açık kalem |
|---|---|---|---|---|---|
| Hz. Âdem | 8 | 32 | **40** | 40 | 1 (oran: `bolum-1/kapak.jpg`) |
| Hz. Şît | 4 | 16 | **20** | 20 | 0 |
| Hz. İdrîs | 4 | 16 | **20** | 0 | 20 (açılışlar dahil hepsi yer tutucu; kitap yayında) |
| Hz. Nûh | 8 | 40 | **48** | 48 | 0 |
| Hz. Musa | 10 | 50 | **60** | 60 | 0 |
| Hz. Eyyûb | 5 | 25 | **30** | 30 | 0 |
| Hz. İbrahim | 9 | 45 | **54** | 54 | 0 |
| Hz. Yusuf | 10 | 50 | **60** | 60 | 0 |
| Hz. Süleyman | 7 | 35 | **42** | 42 | 0 |
| Hz. Yunus | 5 | 24 | **29** | 29 | 0 |
| Hz. Îsâ | 8 | 40 | **48** | 48 | 0 |
| Hz. İsmail | 6 | 30 | **36** | 36 | 0 |
| **Genel** | **84** | **403** | **487** | **467** | **21** |

**Bu sicilin dışındakiler:**

> **20 Eki 2026 — ortak ödül çerçevesi (PROJE-MODELI 6.1).** Musa, Eyyûb,
> İbrahim, Yusuf, Süleyman, Yunus, Îsâ ve İsmail'in kare teslim edilen
> 60 rozeti ve 8 madalyası `npm run odul-cerceve -- kitap {key}` ile kodla
> çizilen ortak çerçeveye alındı ve canlıya çıktı (`99e2f49`). Aşağıdaki kitap
> notlarında geçen "çerçeve bekliyor / çerçeveyi Hasan ekler" ifadeleri o günün
> durumudur. Âdem, Şît, Nûh ve İdrîs'in 24 rozeti ve 4 madalyası da aynı gün
> çerçevesiz kare olarak üretildi (Seedream 5 Pro · 1.5K · `stil-referans-gorsel.jpg`
> + kitabın 1. bölüm pilotu; İdrîs'te İbrahim 1. bölüm) ve ortak çerçeveye alındı.
> Böylece yayındaki 12 kitabın 84 rozeti ve 12 madalyası tek çerçeve ve tek çizim
> dilindedir. Üretim notları: 11 aday ikinci tura girdi (sembolün üstüne amblem,
> ağaç ya da yazı benzeri çizim gelmişti); Âdem 7, Şît 3, İdrîs 3 ve Nûh 3 maskeli
> rötuşla (replace, ~75 kredi) temizlendi. **Âdem 7 "Sakin Güç"**: içerikteki sembol
> "içinden ışık yükselen açık bir el" figür kuralına takıldığı için eski rozetteki
> gibi **durgun suda ışık yükselen taş** çizildi. **Şît 4**: "elden ele geçen anahtar"
> el çizilmeden, katlanmış bezin üstünde parlayan anahtar olarak çizildi.
>
> **20 Eki 2026 — rota durağı ortak halkaya geçti (PROJE-MODELI 3.10.1, 6.1).**
> Ekrandaki dosya artık `kitaplar/hz-{key}/harita-durak.png`'dir
> (`npm run odul-cerceve -- durak {key}`; mine bandı şeffaf, renk ve ilerleme
> CSS'ten). 12 yayındaki kitabın iç sahnesi `gorsel-kaynaklari/duraklar/hz-{key}.jpg`
> olarak eski `harita-kapak.jpg`'lerin iç dairesinden kırpıldı; **geçicidir**
> (Hasan yeniden hazırlayacak). **21 Eki 2026:** Âdem (Arapça "Âdem") ve İdrîs
> ("bilgi doğruluk") sahnelerinde yazı olduğu için ikisi yazısız yeniden üretildi
> (Seedream 5 Pro · 1.5K · tek aday): Âdem tepede şafakta genç ağaç, İdrîs gece
> göğünde tek yıldızın altında taşın üstünde yün yumağı ve iğ. Eski kırpmalar
> `gorsel-kaynaklari/duraklar/eski/`. Aynı gün durak çıktısı **336×336 paletli
> PNG**'ye indirildi (12 durak 4,9 MB → 0,5 MB). `harita-kapak.jpg` ekranda
> kullanılmaz, arşiv olarak durur.

| Varlık | Dosya | Durum |
|---|---|---|
| Kitap kapağı | `kitaplar/hz-adem/kapak.png` · `hz-sit/kapak.png` · `hz-idris/kapak.png` · `hz-nuh/kapak.png` | ✅ Var (597×891) |
| Kitap kapağı | `kitaplar/hz-musa/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-musa/kapak.png`) |
| Harita durağı | `kitaplar/hz-{adem,sit,idris,nuh}/harita-kapak.jpg` | ✅ Var (597×597, kare — bu görsel 16:9 kuralına tabi değildir) |
| Harita durağı | `kitaplar/hz-musa/harita-kapak.jpg` | ✅ Var (597×597, Nûh durağıyla aynı çerçeve ailesi) |
| Rozet | `rozetler/hz-adem/bolum-1…8.png` · `hz-sit/bolum-1…4.png` | ✅ 12 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026'da çerçevesiz kare olarak yeniden üretildi ve ortak çerçeveye alındı; eski tek parça hâlleri git geçmişinde) |
| Rozet | `rozetler/hz-idris/bolum-1…4.png` | ✅ 4 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; brifler teslimin §H'sinden) |
| Rozet | `rozetler/hz-nuh/bolum-1…8.png` | ✅ 8 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026'da çerçevesiz kare olarak yeniden üretildi ve ortak çerçeveye alındı) |
| Madalya | `madalyalar/hz-adem.png` · `hz-sit.png` | ✅ 2 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026'da çerçevesiz kare olarak yeniden üretildi ve ortak çerçeveye alındı; Âdem: güneş önünde fidan · Şît: temele oturmuş taş) |
| Madalya | `madalyalar/hz-idris.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; sembol: kayadaki ışıklı iz — üç çizgi harf/rakam gibi okunduğu ve ilk aday hilal çizdiği için tek ışıklı oyuk olarak üretildi) |
| Madalya | `madalyalar/hz-nuh.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026'da çerçevesiz kare olarak yeniden üretildi ve ortak çerçeveye alındı; sembol: dağda duran gemi — ilk adayda direk haç gibi göründüğü için direksiz, çatılı gövde) |
| Rozet | `rozetler/hz-musa/bolum-1…10.png` | ✅ 10 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 13 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-musa/`) |
| Madalya | `madalyalar/hz-musa.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 13 Eki 2026; sembol: açılan yolun başındaki asa) |
| Kitap kapağı | `kitaplar/hz-eyyub/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-eyyub/kapak.png`) |
| Harita durağı | `kitaplar/hz-eyyub/harita-kapak.jpg` | ✅ Var (597×597, Musa durağıyla aynı çerçeve ailesi; sembol: taşlar arasından kaynayan pınar) |
| Rozet | `rozetler/hz-eyyub/bolum-1…5.png` | ✅ 5 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 15 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-eyyub/`) |
| Madalya | `madalyalar/hz-eyyub.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 15 Eki 2026; sembol: yeniden yeşeren genç ağaç) |
| Kitap kapağı | `kitaplar/hz-ibrahim/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-ibrahim/kapak.png`) |
| Harita durağı | `kitaplar/hz-ibrahim/harita-kapak.jpg` | ✅ Var (600×600, Yunus durağıyla aynı çerçeve ailesi; sembol: alevlerin ortasında açan serin yeşil yaprak) |
| Rozet | `rozetler/hz-ibrahim/bolum-1…9.png` | ✅ 9 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-ibrahim/`) |
| Madalya | `madalyalar/hz-ibrahim.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; sembol: korlardan filizlenen dal ve sabah yıldızı) |
| Kitap kapağı | `kitaplar/hz-yusuf/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-yusuf/kapak.png`) |
| Harita durağı | `kitaplar/hz-yusuf/harita-kapak.jpg` | ✅ Var (600×600, İbrahim durağıyla aynı çerçeve ailesi; sembol: taş kuyu ağzı ve üstünde tek parlak yıldız) |
| Rozet | `rozetler/hz-yusuf/bolum-1…10.png` | ✅ 10 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-yusuf/`) |
| Madalya | `madalyalar/hz-yusuf.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; sembol: katlanmış gömlek ve yedi başak) |
| Kitap kapağı | `kitaplar/hz-suleyman/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-suleyman/kapak.png`) |
| Harita durağı | `kitaplar/hz-suleyman/harita-kapak.jpg` | ✅ Var (600×600, Yusuf durağıyla aynı çerçeve ailesi; sembol: dalda duran, taç tüyü açık hüdhüd) |
| Rozet | `rozetler/hz-suleyman/bolum-1…7.png` | ✅ 7 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-suleyman/`) |
| Madalya | `madalyalar/hz-suleyman.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; sembol: hüdhüd tüyü ile mühürlü mektup) |
| Kitap kapağı | `kitaplar/hz-yunus/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-yunus/kapak.png`) |
| Harita durağı | `kitaplar/hz-yunus/harita-kapak.jpg` | ✅ Var (600×600, İbrahim durağıyla aynı çerçeve ailesi; sembol: geniş kabak yaprağı ve gölgesi) |
| Rozet | `rozetler/hz-yunus/bolum-1…5.png` | ✅ 5 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 16 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-yunus/`; B2 sembolü: dalgalarda beyaz yelken ve ışık) |
| Madalya | `madalyalar/hz-yunus.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 16 Eki 2026; sembol: dalgalarda süzülen balık ve doğan güneş) |
| Kitap kapağı | `kitaplar/hz-isa/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 1.5K ana dosya `gorsel-kaynaklari/kitaplar/hz-isa/kapak.png`) |
| Harita durağı | `kitaplar/hz-isa/harita-kapak.jpg` | ✅ Var (600×600, Süleyman durağıyla aynı çerçeve ailesi; sembol: dibinde su kaynağı olan tek hurma ağacı) |
| Rozet | `rozetler/hz-isa/bolum-1…8.png` | ✅ 8 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-isa/`) |
| Madalya | `madalyalar/hz-isa.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; sembol: pınarlı tepede hurma dalı) |
| Kitap kapağı | `kitaplar/hz-ismail/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 1.5K ana dosya `gorsel-kaynaklari/kitaplar/hz-ismail/kapak.png`) |
| Harita durağı | `kitaplar/hz-ismail/harita-kapak.jpg` | ✅ Var (512×512, Îsâ durağıyla aynı çerçeve ailesi; sembol: iki tepe arasında kumdan kaynayan berrak su) |
| Rozet | `rozetler/hz-ismail/bolum-1…6.png` | ✅ 6 görsel, 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-ismail/`) |
| Madalya | `madalyalar/hz-ismail.png` | ✅ 512×512 şeffaf, **ortak çerçeveli** (20 Eki 2026; kare teslim 17 Eki 2026; sembol: kaynayan su ve yükselen taş temel) |

> **12 Ağu 2026 — Hz. İdrîs aktarıldı.** Kitap kapağı ve harita durağı hazırdı,
> dört bölüm kapağı da diskteydi. Bekleyen üretim: **16 içerik sahnesi + 4 rozet
> + 1 madalya = 21 görsel.** Hepsi yer tutucudur; Hasan gerçek dosyayı AYNI ADLA
> üzerine yazınca kod değişmeden yayına girer.
> **Düzeltme (17 Eki 2026):** dört bölüm kapağı da yer tutucu kopyasıymış (§4c).
> Doğru sayı: **20 sahne + 4 rozet + 1 madalya = 25 görsel.**

> **12 Eki 2026 — Hz. Nûh aktarıldı.** Kitap kapağı ve harita durağı hazırdı;
> sekiz bölüm kapağı diskte vardı ama yer tutucu kopyasıydı. Bekleyen üretim:
> **8 açılış + 40 içerik sahnesi + 8 rozet + 1 madalya = 57 görsel.** Ayrıca
> sekiz bölümün sesli anlatımı yer tutucudur (`sesli-anlatim/hz-nuh/`).

> **13 Eki 2026 — Hz. Musa aktarıldı.** Kitap katalog sırasından önce (#16)
> yazıldı; `public/kitaplar/hz-musa/` klasörü yoktu. Yer tutucu betiği bu
> kitapta ilk kez **kitap kapağı ve harita durağını da** açtı (§6.1). Bekleyen
> üretim: **1 kapak + 1 harita durağı + 10 açılış + 50 içerik sahnesi + 10 rozet
> + 1 madalya = 73 görsel.** On bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-musa/`).
>
> **13 Eki 2026 — Hz. Musa görselleri teslim edildi** (`/gorsel-uretim musa`):
> 73 görselin 73'ü gerçek. Rozet ve madalya çerçevesiz kare; kitap kapağı
> yazısız. Ses hâlâ yer tutucudur.

> **15 Eki 2026 — Hz. Eyyûb aktarıldı.** Kitap katalog sırasında #13'tür;
> `public/kitaplar/hz-eyyub/` klasörü yoktu, yer tutucu betiği kapak ve harita
> durağı dahil hepsini açtı (§6.1). Bekleyen üretim: **1 kapak + 1 harita durağı
> + 5 açılış + 25 içerik sahnesi + 5 rozet + 1 madalya = 38 görsel.** Beş bölümün
> sesli anlatımı da yer tutucudur (`sesli-anlatim/hz-eyyub/`).
>
> **15 Eki 2026 — Hz. Eyyûb görselleri teslim edildi** (`/gorsel-uretim eyyub`):
> 38 görselin 38'i gerçek. Rozet ve madalya çerçevesiz kare; kitap kapağı
> yazısız. Ses hâlâ yer tutucudur.

> **16 Eki 2026 — Hz. İbrahim aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #7'dir; `public/kitaplar/hz-ibrahim/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 9 açılış + 45 içerik sahnesi + 9 rozet + 1 madalya
> = 66 görsel.** Dokuz bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-ibrahim/`). Yeni figür kuralıyla aktarılan ilk kitap: 26/54
> figürlü sahne (§4g).
>
> ✅ **Görseller teslim edildi (17 Eki 2026, `/gorsel-uretim ibrahim`):** 66 görselin
> 66'sı yerinde (54 sahne + kapak + harita durağı + 9 rozet + madalya). Rozet ve
> madalya çerçevesiz kare; ana dosyalar `gorsel-kaynaklari/` altında. Ses yer tutucu.
> **17 Eki 2026 yayına alındı** (Hasan kararı; ses yer tutucuyla — Hz. Nûh emsali).

> **16 Eki 2026 — Hz. Yusuf aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #12'dir; `public/kitaplar/hz-yusuf/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 10 açılış + 50 içerik sahnesi + 10 rozet + 1 madalya
> = 73 görsel.** On bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-yusuf/`). 28/60 figürlü sahne (§4h).

> **16 Eki 2026 — Hz. Süleyman aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #20'dir; `public/kitaplar/hz-suleyman/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 7 açılış + 35 içerik sahnesi + 7 rozet + 1 madalya
> = 52 görsel.** Yedi bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-suleyman/`). 15/42 figürlü sahne (§4i); cinler hiçbir görselde
> çizilmez, B7 figürsüz.
>
> ✅ **Görseller teslim edildi (17 Eki 2026, `/gorsel-uretim suleyman`):** 52 görselin
> 52'si yerinde (42 sahne + kapak + harita durağı + 7 rozet + madalya). Rozet ve
> madalya çerçevesiz kare; ana dosyalar `gorsel-kaynaklari/` altında. Ses yer tutucu.

> **16 Eki 2026 — Hz. Yunus aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #23'tür; `public/kitaplar/hz-yunus/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 5 açılış + 24 içerik sahnesi + 5 rozet + 1 madalya
> = 37 görsel.** Beş bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-yunus/`). 14/29 figürlü sahne (§4j); B3 figürsüz, B3'te 4 içerik
> sahnesi var.
>
> ✅ **Görseller teslim edildi (16 Eki 2026, `/gorsel-uretim yunus`):** 37 görselin
> 37'si yerinde (29 sahne + kapak + harita durağı + 5 rozet + madalya). Rozet ve
> madalya çerçevesiz kare; ana dosyalar `gorsel-kaynaklari/` altında. Ses yer tutucu.

> **16 Eki 2026 — Hz. Îsâ aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #27'dir; `public/kitaplar/hz-isa/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 8 açılış + 40 içerik sahnesi + 8 rozet + 1 madalya
> = 59 görsel.** Sekiz bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-isa/`). 7/48 figürlü sahne (§4k); Hz. Meryem ve Hz. Îsâ hiçbir
> görselde çizilmez (Faz 1 S5), B1, B2 ve B8 figürsüz.

> **16 Eki 2026 — Hz. İsmail aktarıldı (yayında değil, "preparing").** Kitap
> katalog sırasında #9'dur; `public/kitaplar/hz-ismail/` klasörü yoktu, yer tutucu
> betiği kapak ve harita durağı dahil hepsini açtı (§6.1). Bekleyen üretim:
> **1 kapak + 1 harita durağı + 6 açılış + 30 içerik sahnesi + 6 rozet + 1 madalya
> = 45 görsel.** Altı bölümün sesli anlatımı da yer tutucudur
> (`sesli-anlatim/hz-ismail/`). 21/36 figürlü sahne (§4l); B3'te teslimiyet ve
> sesleniş anı figürsüz, Hz. İsmail'in ilk eşi hiçbir görselde yok.

> ✅ **Kapandı (11 Ağu 2026).** Hz. Şît'in ödül görselleri artık gerçek PNG'dir;
> PNG geçişinden kalan ölü `.svg` dosyaları klasörlerde yoktur. Aşağıdaki
> "`.svg`'yi `.png` adıyla kopyalama" yasağı (§7) kural olarak geçerliliğini
> korur — ileride yeni kitap eklenirken aynı hataya düşülmemesi içindir.

## 6. Akış — yeni görsel eklenirken

1. Sahne yeri `src/data/books.ts` içinde `type: "image"` bloğu olarak açılır
   (yalnız `src` + `alt`; `portraitSrc` yazılmaz).
2. Dosya adı **bu sicile** eklenir: bölüm, akıştaki yer, öncelik, brif. Kitap
   bölümünün başına prompt kaynağı yazılır:
   `kitap-icerikleri/KITAP-HZ-{ANAHTAR}-ICERIK-final.md`.
3. Görsel üretilir (§6.2) ve **aynı adla** klasöre yazılır.
4. Sicildeki durum `⬜ Bekliyor` → `✅ Hazır` yapılır. **Kod değişmez.**

`alt` metinleri kod tarafında yazılmıştır; editoryal revizyon Hasan'ın kararıdır.
Değişirse `books.ts` ve bu sicil **birlikte** güncellenir.

### 6.1 Yer tutucu açma — HER YENİ KİTAPTA ZORUNLU (KARAR 11 Ağu 2026 — Hasan)

Kitap `books.ts`'e aktarılır aktarılmaz, o kitabın **bütün görsel dosyaları
doğru adlarla ve doğru biçimde klasöre açılır.** Hasan gerçek görselleri
sonradan üretip **aynı adla üzerine yazar**; kod hiç değişmez.

Kural üç maddedir:

- **Bölümde kullanılacak her görsel AYRI dosyadır** — tek bir "bölüm görseli"
  yoktur. Bölüm açılışı (`kapak.jpg`) + akıştaki her sahne kendi adıyla kaydedilir.
- **Sahne görselleri `.jpg`** (16:9, 1920×1080 üretilir; sitede `npm run gorsel-sikistir` ile en fazla 1600×900).
- **Rozet ve madalya AYRI adlarla `.png`** (512×512 şeffaf):
  `rozetler/hz-{key}/bolum-{n}.png` ve `madalyalar/hz-{key}.png`.

- **Kitap kapağı ve harita durağı da açılır** (13 Eki 2026'dan itibaren):
  `hz-{key}/kapak.png` (`placeholder-kapak.png` kopyası, 600×900) ve
  `hz-{key}/harita-kapak.jpg` (`placeholder-durak.jpg` kopyası, 512×512). İkisi
  `placeholder-kapak.svg` / `placeholder-durak.svg` yedeklerinin rasteridir;
  ekrandaki görünüm yedekle aynıdır. `npm run kitap-denetle` yer tutucu kapağı
  tanır (yayındaki kitapta uyarı verir).

Bunu elle yapma, betiği çalıştır:

```bash
npm run gorsel-yertutucu -- <bookKey>
```

Betik (`scripts/gorsel-yertutucu.mjs`) dosya adlarını **`books.ts`'ten okur**,
elle yazmaz — böylece kodun istediği yolla diskteki ad birebir eşleşir.
**Var olan dosyanın üzerine yazmaz**, gerçek görsel klasördeyse korunur.
Önce `-- <bookKey> --kuru` ile ne üreteceğini raporlatabilirsin.

Unvanlar kitaba bağlı değildir, ayrı modu vardır (anahtarları
`derive.ts:UNVAN_ESIKLERI`'nden türetir). Yalnız eşik tablosu değişince gerekir:

```bash
npm run gorsel-yertutucu -- unvanlar
```

> Neden dosyalar önceden açılıyor: klasörde adları hazır durunca hem üretim
> listesi görünür oluyor, hem de gerçek görsel geldiğinde "hangi ada
> kaydedecektim?" sorusu ortadan kalkıyor.

### 6.2 Görsel üretim oturumu — Magnific (KARAR 12 Ekim 2026 — Hasan)

Görseller, proje klasöründe açılan **ayrı bir Claude Code oturumunda** Magnific
bağlantısıyla üretilir. **Sıra değişmez:** Faz 2 onayı → aktarım + §6.1 yer
tutucuları → görsel üretimi. Aktarımdan önce üretim yapılmaz: dosya adları
aktarımda kesinleşir.

**İki kaynak, iki ayrı rol:**

| Dosya | Ne için |
|---|---|
| **Bu sicil** (kitabın bölümü) | **Hangi dosya, hangi yol, durumu ne.** Üretilecek liste buradaki `⬜ Bekliyor` satırlarıdır |
| `kitap-icerikleri/KITAP-HZ-{ANAHTAR}-ICERIK-final.md` | **Ne çizilecek.** B bölümünde ortak stil bloğu, ortak negatif prompt, rozet sembol stili bloğu (eski final MD'lerde "rozet çerçeve bloğu"); D bölümünde her sahnenin İngilizce promptu; C3 ve rozet brifleri |

İkisi çelişirse (ör. dosya adı farklıysa) **dosya adında sicil, içerikte final
MD geçerlidir**; oturum durur ve Hasan'a sorar.

**Set geneli üretim standardı (KARAR 13 Eki 2026 — Hasan; ilk uygulama Hz. Nûh §4d):**

| Ayar | Standart |
|---|---|
| Model | Magnific · **Seedream 5 Pro** · sahne **2K** (100 kredi) · rozet, madalya, kitap kapağı, harita durağı **1.5K** (75 kredi) — KARAR 17 Eki 2026 (Hasan): sahnede kaliteden taviz verilmez; küçük gösterilen ve geçici görsellerde 1.5K yeter |
| Oran | Sahne **16:9** · rozet ve madalya **1:1** |
| Sahne stil referansı | Proje kökündeki **`stil-referans-gorsel.jpg`** — Magnific'e stil referansı olarak verilir. Ayrıntılı, sıcak, orta doygunlukta "suluboya üstüne net boyama" masal kitabı dili; soluk pastel yok |
| Rozet/madalya stil referansı | Sahnelerle aynı **`stil-referans-gorsel.jpg`**; pilotta onaylanan ilk kare rozet, kitabın diğer rozet ve madalyasına ikinci referans olur. Çerçeveli eski rozetler referans **verilmez** (çerçeveyi geri getirir) |

**Aday sayısı ve kredi sınırı (KARAR 17 Eki 2026 — Hasan):**

| Görsel | Aday |
|---|---:|
| Kitap kapağı, harita durağı | 1 — geçicidir; Hasan yayından önce kendisi yeniden hazırlar |
| Bölüm açılışı | 2 |
| Katman 1 kişinin bulunduğu figürlü sahne | 2 |
| Diğer sahneler (figürsüz, yalnız Katman 2/3) | 1 |
| Rozet, madalya | 1 |

- Seçim o turdaki adaylardan yapılır. Küçük kompozisyon kusuru (sembolün güvenli
  alana tam oturmaması, kadraj, brifle ince farklar) yeniden üretim sebebi değildir;
  en yakın aday kullanılır ve Hasan'a not düşülür.
- Tasvir ihlali (Katman 1 yüz/sakal/ten sızması, cami-kubbe-minare, yazı, hayalet
  figür, yasak nesne) yine reddedilir; önce **rötuş** (`images_retouch`, maskeli,
  ~10 kredi) denenir, olmazsa **en fazla bir** yeniden üretim turu yapılır.
- Gerekçe: kredi ve süre. Hz. Süleyman'da 52 görsel için 146 aday üretildi
  (14.610 kredi); bu düzenle aynı kitap yaklaşık 7.000 kredi tutar.

Resim tekniğini **stil referansı belirler**, final MD'deki ortak stil bloğu
değil. Bloğun kitaba özgü kısmı (mekân, dönem, palet, nesneler) prompta girer;
referansla çelişen teknik ifadeler ("soft gouache", "soft edges", soluk pastel
gibi) çıkarılır. Pilot onayında Hasan başka bir referans seçerse o kitap için
sicilin kitap bölümüne yazılır; standart değişecekse önce bu tablo güncellenir.

**Prompt kurulumu:**
- Sahne: `Ana üretim promptu (EN)` + ortak stil bloğunun kitaba özgü kısmı +
  stil referansı.
- Rozet ve madalya **çerçevesiz kare** üretilir (aşağıda "Rozet ve madalya —
  çerçevesiz kare"). Prompt: rozetin iç sembolü + `Rozet sembol stili bloğu (EN)`
  (eski final MD'lerde `Rozet çerçeve bloğu` — yalnız sembol stilini anlatan kısmı) + kare kompozisyon cümlesi + stil
  referansı. Madalya: kendi promptu, aynı kuralla.
- **Negatif:** araçta negatif alanı yoktur. `Ortak negatif prompt (EN)` +
  sahneye özgü yasaklar promptun **sonuna** `Strictly avoid: …` diye eklenir.
  İnsan figürü olmayan sahnelere ayrıca `birds, tipi, tent` eklenir.
- **Figürlü sahne (REVİZE 16 Ekim 2026 — Hasan; PROJE-MODELI 6.4):** final
  MD'de "Figür" alanı dolu olan sahnede figür promptta kalır; negatiften
  `human figure, person, silhouette, hands` **çıkarılır**. Katman 1 kişi
  (peygamber, akrabası, saygın mümin) varsa o kişinin `Karakter blokları (EN)`
  satırı prompta aynen eklenir, negatife `visible face, facial features, eyes,
  mouth, profile, blank face, featureless face` eklenir. Yalnız Katman 2/3
  kişilerin bulunduğu sahnede yüz yasağı negatife yazılmaz. 16 Ekim'den önce
  yazılmış final MD'lerde ortak negatifte yüz ve figür terimleri vardır;
  yeniden üretimde bu terimler yukarıdaki kurala göre sahne sahne ayıklanır.
- **Karakter tutarlılığı:** bir Katman 1 kişinin ilk onaylanan figürlü sahnesi,
  aynı kişinin sonraki sahnelerine ikinci referans olarak verilir (rozetteki
  ikinci referans gibi). Karakter bloğu tek başına giysi ve duruşu sabit
  tutmaya yetmez.
- **Zenginleştirme serbest, anlam sabit:** sahne promptu anlamı korunarak
  katman ayrıntısıyla (ön/orta/arka plan, ışık, doku) zenginleştirilebilir;
  **yeni nesne, olay veya figür eklenmez.** (Figür kararı final MD'nin
  "Figür" alanındadır; üretim oturumu figürlü sahneyi figürsüze çevirmez.) Bir sahne tutmuyorsa yeniden
  denenir; içerik değişikliği gerekiyorsa Hasan'a sorulur.
- **Ölçek:** sayı ya da ölçü verilmez; büyüklük çevreyle (ağaç, tepe, yığın)
  kurulur.

**Akış:**
1. **Pilot:** önce 1. bölümün açılışı + bir sahnesi ile bir rozet, yukarıdaki
   standartla (aday sayısı tablosuna göre) üretilir ve Hasan'a gösterilir. Onay gelmeden seri üretime
   geçilmez (Magnific kredisi boşa gitmesin). Onaylanan model ve ayarlar kitap
   boyunca sabit tutulur.
2. **Bölüm bölüm ilerlenir;** her bölüm bitince Hasan'a gösterilir.
3. **Sahne teknik işlemi:** gerekirse büyütme → 16:9 kırpma → **1920×1080
   `.jpg`** → yer tutucunun **üzerine aynı adla** yazma → boyut doğrulama
   (`sips -g pixelWidth -g pixelHeight`) → bölüm bitince **`npm run
   gorsel-sikistir`** (sitedeki kopyayı 1600 px / kalite 82'ye indirir; zaten
   küçük olana dokunmaz; tam boyutlu orijinali önce `gorsel-kaynaklari/kitaplar/`
   altına aynı yolla saklar — 20 Eki 2026).
4. **Rozet/madalya teknik işlemi:** 1:1 · 1.5K üretim → **arka plan kaldırılmaz**
   → orijinal ana dosya olarak `gorsel-kaynaklari/` altına kaydedilir →
   **`npm run odul-cerceve -- kitap {key}`** çalıştırılır: betik ortak çerçeveyi
   çizer ve **512×512 şeffaf `.png`**'yi yer tutucunun **üzerine aynı adla**
   yazar (REVİZE 20 Eki 2026) → boyut doğrulama. Ayrıntı aşağıda.
5. **Tasvir kontrolü — her görselde, otomatiğe bırakılmaz (REVİZE 16 Ekim
   2026):** Katman 1 kişinin (peygamber, akrabası, saygın mümin) yüzü, gözü,
   ağzı, profili veya yüz hattı görünüyorsa görsel **reddedilir** ve yeniden
   üretilir. Model yüz yasağını kişi kişi uygulayamaz; Katman 1 ile Katman 2/3
   aynı karedeyse yüz sızması en çok burada olur, bu sahneler ayrıca dikkatle
   bakılır. Boş/yüzsüz kafa (ürkütücü), korkutucu veya karikatür kötü karakter,
   kan, yara ve darbe anı da ret sebebidir. Melek, cami/kubbe/minare, yazı,
   harf, filigran görünüyorsa aynı. Hz. Muhammed, ailesi, sahabe ve halifeler
   hiçbir biçimde görünmez. Son onay Hasan'ındır.
6. Teslim edilen her görselin sicildeki durumu `✅ Hazır` yapılır; §5 sayaçları
   güncellenir. Rozetler bitince `ROZET-MATRISI.md` §4 "Görsel" sütunu
   çerçeve betiği çalıştıysa **`✓`** yapılır; betik çalıştırılmadan kalan kare
   teslim **`□`** olarak işaretlenir (REVİZE 20 Eki 2026).

**Rozet ve madalya — çerçevesiz kare (KARAR 13 Eki 2026 — Hasan):**

Rozet ve madalyalar **çerçevesiz, kare** üretilir. ~~Çerçeveyi Hasan Photoshop'ta
tek bir ortak şablonla ekler.~~ **REVİZE 20 Eki 2026 (Hasan; PROJE-MODELI 6.1):**
çerçeve **kodla** çizilir — `scripts/odul-cerceveleri.mjs`
(`npm run odul-cerceve -- kitap {key}`). Rozet kalkan, madalya defneli halka
biçimindedir; betik kare ana dosyayı çerçevenin penceresine yerleştirir ve
sonucu **aynı adla** site dosyasının üzerine yazar. Böylece bütün setin
çerçevesi birebir aynıdır; çerçeve tasarımı değişirse yalnız betik değişip
yeniden çalıştırılır. Kod ve yol değişmez.

- **Çerçeve yok:** kalkan, madalyon, halka, kenarlık, mine zemin, kurdele,
  rozet/rozet kartı görünümü üretilmez. Yeni final MD'ler bunun için
  `Rozet sembol stili bloğu (EN)` taşır (içerik brifi §8.3). 13 Eki 2026'dan
  önce yazılmış final MD'lerdeki `Rozet çerçeve bloğu (EN)` içinden ise bu
  ifadeler ve "isolated on a plain grey background for later background
  removal" cümlesi **çıkarılır**; yalnız sembolün çizim dilini anlatan kısım
  kalır. Negatife eklenir: `frame, border, badge outline, shield,
  medallion ring, ribbon, enamel plate, emblem`.
- **Zemin:** sembolün arkasında **kareyi kenardan kenara dolduran yumuşak,
  boyalı zemin** (ışık, gökyüzü, doku; sembolle uyumlu sıcak ton). Düz gri zemin
  ve arka plan kaldırma **yok**; dosya şeffaf değildir.
- **Güvenli alan:** çerçeve biçimi henüz belli olmadığı için sembol, karenin
  ortasındaki **yaklaşık %60 çaplı dairenin içinde** kalır; köşelere ve
  kenarlara önemli bir şey konmaz (her çerçeve biçiminde kırpılabilsin). Sembol
  72 px'te okunacak kadar sade ve iri olur. Prompta eklenecek kompozisyon
  cümlesi: `Square 1:1 composition. The symbol is centered and fits entirely
  within the central 60% of the frame, with generous empty margin; the painted
  background fills the whole square edge to edge. No frame, no border.`
- **Dosyalar:**

  | Ne | Yol | Biçim |
  |---|---|---|
  | Site dosyası | `public/rozetler/hz-{key}/bolum-{n}.png` · `public/madalyalar/hz-{key}.png` | 512×512 şeffaf `.png`, ortak çerçeveli (betik çıktısı) |
  | Ana dosya (çerçeve betiğinin kaynağı) | `gorsel-kaynaklari/rozetler/hz-{key}/bolum-{n}.png` · `gorsel-kaynaklari/madalyalar/hz-{key}.png` | Magnific orijinali (1.5K; 17 Eki 2026'dan önceki kitaplarda 2K), işlenmemiş |

  `gorsel-kaynaklari/` `public/` dışındadır, siteye servis edilmez ve repoya
  girmez (`.gitignore`). Çerçeve betiği bu ana dosyadan çalışır; ana dosya
  silinirse çerçeve yeniden çizilemez, o yüzden saklanır.
- **Eski rozetler:** Âdem, Şît ve Nûh rozetleri eskiden üretimde çizilmiş
  çerçevelerle teslim edilmişti; 20 Eki 2026'da (Hasan kararı: kırpma yerine
  yeniden üretim) çerçevesiz kare olarak yeniden üretilip ortak çerçeveye
  alındılar. Eski tek parça dosyalar yalnız git geçmişindedir.

**Oturum yapmaz:** `books.ts` ve diğer kod dosyalarına dokunmaz, dosya adını
değiştirmez, yeni görsel yeri açmaz (o aktarımın işidir), commit atmaz.

---

## 7. Diğer görsel klasörleri (27 Temmuz 2026 kurulumu)

**Ödül görselleri 512×512 şeffaf PNG'dir** (REVİZE 7 Ağu 2026 — PROJE-MODELI
6.1; eskiden SVG'ydi). Rozet, madalya ve unvan dosyaları **elle konmaz**: iç
görsel `gorsel-kaynaklari/` altına konur, ortak çerçeveyi `npm run odul-cerceve`
çizer ve aynı adla yazar (REVİZE 20 Eki 2026).

| Klasör | Kalıp | Kurulan | Not |
|---|---|---|---|
| `public/rozetler/hz-{bookKey}/` | `bolum-{n}.png` | **84** | **Hepsi ortak çerçeveli (20 Eki 2026):** âdem 8 · şît 4 · idrîs 4 · nûh 8 (20 Eki'de yeniden üretildi) · musa 10 · eyyûb 5 · yunus 5 · ibrahim 9 · yusuf 10 · süleyman 7 · îsâ 8 · ismail 6 **ortak çerçeveli** (kare teslim 13–17 Eki, çerçeve 20 Eki 2026 — `npm run odul-cerceve`). Hedef 34 (İlk İzler Vadisi): + hûd 5, sâlih 5 — bu ikisinin klasörü **henüz yok**, içerikleri `books.ts`'e aktarılınca betik açacak |
| `public/madalyalar/` | `hz-{bookKey}.png` | **12** | **Hepsi ortak çerçeveli (20 Eki 2026):** âdem · şît · idrîs · nûh (20 Eki'de yeniden üretildi) · musa · eyyûb · yunus · ibrahim · yusuf · süleyman · îsâ · ismail **ortak çerçeveli** (kare teslim 13–17 Eki, çerçeve 20 Eki 2026). İlk İzler Vadisi hedefi 6 |
| `public/unvanlar/` | `{unvan-anahtari}.png` | **10** | **Hepsi gerçek (20 Eki 2026):** kodla çizilen kitap temalı ortak çerçeve + gece göğü zeminli pencere + Hasan'ın şeffaf iç ikonları (`gorsel-kaynaklari/unvanlar/{anahtar}.png`; `npm run odul-cerceve -- unvan`). `buyuk-yolculuk-kasifi` iç ikonu Yeni Gezgin'e çok benzediği için Magnific ile yeniden üretildi (altın küre ve rota; eski ikon `gorsel-kaynaklari/unvanlar/eski/`). Anahtarlar: `yeni-gezgin`, `yol-kasifi`, `deger-toplayicisi`, `yol-arkadasi`, `bilge-yolcu`, `hikaye-ustasi`, `emanet-koruyucusu`, `isik-tasiyicisi`, `kissa-rehberi`, `buyuk-yolculuk-kasifi` (12 Eki 2026'da `atlas-bilgini` ve `yedi-bolge-kasifi` yerine). Anahtarlar `derive.ts:UNVAN_ESIKLERI` + `unvanAnahtari()` türetimidir; eşik tablosu değişirse `npm run gorsel-yertutucu -- unvanlar` yeniden çalıştırılır |
| `public/avatarlar/` | `avatar-{1..10}.jpg` | **10** | Veli panelinde üçerli pencerede oklarla gezilir |
| `public/ikonlar/` | `final-kapisi.svg` | **1** | Bölüm rotasındaki **Büyük Final Testi** durağının ikonu — arayüz ikonu olduğu için SVG kalır |

> **Ölü SVG temizliği (11 Ağu 2026 — TAMAMLANDI).** PNG geçişinden kalan ve
> artık hiçbir ekranda okunmayan **50 `.svg`** dosyası silindi: 34 rozet +
> 6 madalya + 10 unvan. Yerlerine **24 PNG** kondu: 12 rozet + 2 madalya
> (Hasan'ın ürettiği gerçek görseller) + 10 unvan (yer tutucu). Kalan
> **22 rozet + 4 madalya için dosya açılmadı** — bunlar idrîs · nûh · hûd ·
> sâlih'e ait ve yer tutucu betiği dosya adlarını `books.ts`'ten okuduğu için
> içerikleri aktarılmadan üretilemez. *(12 Ağu 2026 güncellemesi: Hz. İdrîs
> aktarıldı; onun 4 rozet + 1 madalya dosyası yer tutucu olarak açıldı. Geriye
> 18 rozet + 3 madalya kaldı — nûh · hûd · sâlih. 12 Eki 2026: Hz. Nûh
> aktarıldı; 8 rozet + 1 madalya yer tutucu olarak açıldı. Geriye 10 rozet +
> 2 madalya kaldı — hûd · sâlih.)* Katalogda "Hazırlanıyor"
> durumunda
> oldukları için ekranda rozetleri hiç çizilmiyor; eksiklik görünür değil.
> **Tip yedekleri korundu** — `rozetler/placeholder.svg`,
> `madalyalar/placeholder.svg`, `unvanlar/placeholder.svg` hâlâ canlıdır ve
> `varlikYollari.ts:YEDEK` üzerinden okunur. `public` altında kalan tüm `.svg`
> dosyaları ya bir tip yedeği ya da arayüz ikonudur (`ikonlar/final-kapisi.svg`).

> ⚠️ **`.svg` dosyasını `.png` adıyla kopyalamayın.** Statik sunucu içerik
> tipini uzantıdan verir; `.png` adlı bir SVG tarayıcıda *kırık görsel* olur.
> Dosya hiç yokken istek 404 döner ve `YedekliGorsel` düzgün yedeğe düşer —
> yani sahte PNG, çalışan yedekten kötüdür. Yer tutucu gerekiyorsa **gerçek
> PNG** üretin (`npm run gorsel-yertutucu -- <bookKey>` bunu yapar).

**Büyük Final Testi ikonunun yolu:** `public/ikonlar/final-kapisi.svg`
Bölüm rotasında "Final Kapısı" durağında görünür; `currentColor` kullandığı için
durum rengini (tamamlandı/aktif/kilitli) kendiliğinden alır. Sabit renk vermek
istersen SVG içindeki `currentColor` değerlerini kendi renginle değiştir.

### Kitap kapakları

| Kitap | Dosya | Durum |
|---|---|---|
| Hz. Âdem | `kitaplar/hz-adem/kapak.png` | ✅ Var |
| Hz. Şît | `kitaplar/hz-sit/kapak.png` | ✅ Var |
| Hz. İdrîs · Hz. Nûh · Hz. Hûd · Hz. Sâlih | `kitaplar/hz-{key}/kapak.png` | ✅ Var |
| Hz. Musa | `kitaplar/hz-musa/kapak.png` | ✅ Var (yazısız, §4e) |
| Hz. Eyyûb | `kitaplar/hz-eyyub/kapak.png` | ✅ Var (yazısız, §4f) |

İlk İzler Vadisi'nin **altı kitabının da** dikey kapağı ve harita durağı görseli
diskte hazırdır (597×891 kapak, 597×597 harita durağı). Bu dört kitapta eksik
olan yalnız bölüm içi sahneler, rozetler ve madalyalardır — hepsi içerik
`books.ts`'e aktarıldıktan sonra açılır.

### Sonraki bölgeler

Klasör iskeleti İlk İzler Vadisi için kuruldu; diğer bölgeler içerik geldikçe
aynı kalıpla açılır. İlk örnek Hz. Musa'dır (Sabır ve Cesaret Geçidi, 13 Eki
2026): klasörü yer tutucu betiği açtı, kapak ve harita durağı dahil.

### Arşiv

16:9'a geçişte eski **4:3** Hz. Âdem görselleri `arsiv-gorseller/icerik-4-3/`
klasörüne alındı (7 dosya, ~19 MB). Yeni sahneler 16:9 üretileceği için bu
klasör silinebilir; `public/` altında olmadığı için siteye servis edilmiyor.
