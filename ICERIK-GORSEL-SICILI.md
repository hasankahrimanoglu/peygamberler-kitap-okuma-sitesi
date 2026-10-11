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

- **Tasvir kuralı (REVİZE 12 Ekim 2026 — PROJE-MODELI 6.4):** **yüz hiçbir
  görselde gösterilmez.** Peygamberler (Hz. Muhammed hariç) yüzü görünmeyen figür
  olarak gösterilebilir: arkadan silüet, ışıkla örtülmüş beden, el, uzak plan. Hz.
  Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir biçimde gösterilmez.
  Melek tasviri yapılmaz.
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

**Durum (11 Ağu 2026):** 40 slot · **40 gerçek görsel teslim edildi.** 39'u 16:9;
`bolum-1/kapak.jpg` 1200×896 (4:3) geldiği için tek açık kalem odur. Bölüm 1'in
diğer dört sahnesi 1376×768 (1.792) — 16:9'a %0.8 sapma, gözle fark edilmiyor,
yeniden üretim gerektirmez. Bölüm 2–8 tamamı 1920×1080.

### Bölüm 1 — Beklenen Misafir

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-1/kapak.jpg` | Açılış | A | ⚠️ Oran hatalı | Dağlar, nehir ve yıldızlı gökyüzüyle insanı bekleyen yeryüzü *(3 keşif noktalı sahne)* — **dosya 1200×896 (4:3), 16:9 olarak yeniden üretilecek** |
| `hz-adem/bolum-1/secim-sorumluluk.jpg` | 1. Kısım | A | ✅ Hazır | İki doğal yola ayrılan vadide, su ve taşların arasında büyüyen genç bir fidan |
| `hz-adem/bolum-1/toprak-isik.jpg` | 1. Kısım | A | ✅ Hazır | Yağmurla ıslanmış toprak, doğal çamur katmanları, küçük bir filiz ve sabah ışığı |
| `hz-adem/bolum-1/ogrenme-alemi.jpg` | 1. Kısım | A | ✅ Hazır | Yıldızların yansıdığı sığ suyun yanında farklı taşlar, yaprak, tohum ve küçük bir filiz |
| `hz-adem/bolum-1/isimlerin-izi.jpg` | Devam | B | ✅ Hazır | Sığ suyun kenarına dizilmiş farklı taşlar, yapraklar ve tohumlar; her birinin yanında ince bir ışık izi |

### Bölüm 2 — Bilginin Armağanı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak ışığında farklı bitki, taş ve su damlalarının bir arada göründüğü geniş vadi |
| `hz-adem/bolum-2/isimlerin-ogretilmesi.jpg` | 1. Kısım | A | ✅ Hazır | Yan yana dizilmiş yaprak, tüy, kabuk ve taşların üzerine düşen sabah ışığı |
| `hz-adem/bolum-2/egilen-dallar.jpg` | 1. Kısım | A | ✅ Hazır | Rüzgârda aynı yöne eğilmiş uzun otlar ve dalların oluşturduğu sakin sahne |
| `hz-adem/bolum-2/atesin-golgesi.jpg` | Devam | B | ✅ Hazır | Sönmeye yüz tutmuş bir ateşin közleri ve hemen yanındaki nemli koyu toprak |
| `hz-adem/bolum-2/iki-yol.jpg` | Devam | B | ✅ Hazır | Bir tepenin üzerinde ikiye ayrılan; biri aydınlığa, diğeri gölgeye giden patika |

### Bölüm 3 — Cennetteki Uyarı

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Gölgeli ağaçlar, berrak dereler ve olgun meyvelerle dolu geniş bir bahçe |
| `hz-adem/bolum-3/cennet-bahcesi.jpg` | 1. Kısım | A | ✅ Hazır | Berrak suyun aktığı, yeşilliklerin gözün alabildiğine uzandığı bahçe |
| `hz-adem/bolum-3/sinir-cizgisi.jpg` | 1. Kısım | A | ✅ Hazır | Geniş bir bahçenin içinde tek bir ağaca uzanan, taşlarla belirginleşmiş ince patika — **ağacın türü belli edilmez** |
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
| `hz-adem/bolum-5/donus-sozleri.jpg` | 1. Kısım | A | ✅ Hazır | Sabah çiyiyle ıslanmış toprakta yeni açılmış küçük bir su yolu |
| `hz-adem/bolum-5/acilan-kapi.jpg` | Devam | B | ✅ Hazır | Kayaların arasından aydınlığa açılan geniş bir geçit |
| `hz-adem/bolum-5/umudun-isigi.jpg` | Devam | B | ✅ Hazır | Yağmur sonrası bulutların aralanmasıyla ıslak toprağa vuran ilk ışık |

### Bölüm 6 — Yeni Bir Yurt

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Uçsuz bucaksız bir ova; uzakta dağ sırası, önde yeni sürülmüş toprak |
| `hz-adem/bolum-6/yagmurdan-sonra.jpg` | 1. Kısım | A | ✅ Hazır | Yağmurdan sonra canlanan toprakta filizlenen taze tohumlar |
| `hz-adem/bolum-6/ilk-sabah.jpg` | 1. Kısım | A | ✅ Hazır | Gün doğarken sisin çekildiği geniş ova ve ufuktaki dağ sırası |
| `hz-adem/bolum-6/mevsimlerin-donusu.jpg` | Devam | B | ✅ Hazır | Aynı ağacın farklı mevsimlerdeki hâllerini andıran, ayrı renklerde dalların bir arada göründüğü sahne |
| `hz-adem/bolum-6/ilk-ocak.jpg` | Devam | B | ✅ Hazır | Taşlarla çevrilmiş küçük bir ocak, yanında toprak kaplar ve kurumuş otlar — **insan yok** |

### Bölüm 7 — İki Kardeşin Sınavı

> **Hassas bölüm.** Şiddet, silah, kan ve beden hiçbir görselde yer almaz.
> Kur'an kardeşlerin **ne sunduğunu bildirmediği için** sunular çizilmez.

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-adem/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Bir tepede ikiye ayrılan patika; biri ekili tarlaya, diğeri taşlık yamaca gider |
| `hz-adem/bolum-7/buyuyen-yurt.jpg` | 1. Kısım | A | ✅ Hazır | Ekili tarlalar, otlaklar ve bir akarsuyla çevrili geniş yerleşim vadisi |
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

**Durum (12 Ağu 2026):** 20 slot açıldı · **4 gerçek görsel var, 16 yer tutucu
bekliyor.** Dört bölüm kapağı (`bolum-1…4/kapak.jpg`) içerik aktarımından önce
diske konmuştu ve `npm run gorsel-yertutucu -- idris` bunları korudu. Briflerin
tamamı `kitap-icerikleri/KITAP-HZ-IDRIS-ICERIK-FAZ2-taslak.md` §H'dedir (ana
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
| `hz-idris/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında geniş bir otlak, uzakta tepeler ve yamaçta tek bir zeytin ağacı |
| `hz-idris/bolum-1/kizgin-oglen.jpg` | 1. Kısım | A | ⬜ Bekliyor | Öğle güneşinin altında titreşen sıcak hava, kuru otlar ve kısa gölgeler |
| `hz-idris/bolum-1/yaprak-golgelik.jpg` | 1. Kısım | A | ⬜ Bekliyor | Bir taşın üstüne bırakılmış, iri yapraklardan örülerek yapılmış iki gölgelik |
| `hz-idris/bolum-1/kuruyan-yaprak.jpg` | Devam | B | ⬜ Bekliyor | Kenarları kıvrılıp kurumaya başlamış tek bir yaprak ve yanında dökülmüş parçaları |
| `hz-idris/bolum-1/yol-isaretleri.jpg` | Devam | B | ⬜ Bekliyor | Patika kenarında üst üste dizilmiş işaret taşları ve toprakta açılmış ince bir su arkı |

### Bölüm 2 — Öğretmeyi Öğrenmek

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında, kayaların arasına kurulmuş tenha bir düzlük ve yere serilmiş hasırlar |
| `hz-idris/bolum-2/topraktaki-ders.jpg` | 1. Kısım | A | ⬜ Bekliyor | Düzeltilmiş toprak zemine çizilmiş sade şekiller, yanında bir çubuk ve dizilmiş çakıl taşları |
| `hz-idris/bolum-2/suyun-yolu.jpg` | Devam | B | ⬜ Bekliyor | Toprakta açılmış küçük bir arkta akan berrak su ve yolu ikiye ayıran ince bir set |
| `hz-idris/bolum-2/kuzeydeki-yildiz.jpg` | Devam | B | ⬜ Bekliyor | Gece gökyüzünde kuzeyde duran tek bir parlak yıldız ve altında uzanan boş çöl yolu |
| `hz-idris/bolum-2/ilk-koy.jpg` | Devam | B | ⬜ Bekliyor | Yan yana dizilmiş üzeri örtülü taş evler ve aralarından geçen taş döşeli sokak |

### Bölüm 3 — Bir Karış Bez

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta tenha bir kır köşesi, bir taşın üstünde duran yün yumağı ve öreke |
| `hz-idris/bolum-3/denenip-birakilanlar.jpg` | 1. Kısım | A | ⬜ Bekliyor | Bir kayanın üstüne yan yana serilmiş kurumuş yapraklar, sert deri parçaları ve kabuk şeritleri |
| `hz-idris/bolum-3/orumcek-agi.jpg` | 1. Kısım | A | ⬜ Bekliyor | İki sırığın arasına örülmüş, üzerinde çiy taneleri parlayan bir örümcek ağı |
| `hz-idris/bolum-3/bir-karis-bez.jpg` | 1. Kısım | A | ⬜ Bekliyor | Ahşap bir el gergefinin üstünde duran, avuç kadar küçük ham beyaz bez parçası |
| `hz-idris/bolum-3/meydandaki-soz-tasi.jpg` | Devam | B | ⬜ Bekliyor | Köy meydanındaki düz söz taşı ve üstüne serilmiş, rüzgârda hafifçe kalkan beyaz bez |

### Bölüm 4 — Yüce Bir Mertebeye

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-idris/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Şafak öncesi bir tepe, altındaki sessiz vadi ve tepede yalnız duran bir ağaç |
| `hz-idris/bolum-4/ufuktaki-toz.jpg` | 1. Kısım | A | ⬜ Bekliyor | Doğu ufkunda yükselen geniş bir toz perdesi ve önündeki boş düzlük |
| `hz-idris/bolum-4/tanimadigimiz-hayvanlar.jpg` | 1. Kısım | A | ⬜ Bekliyor | Yamaçta otlayan bir at sürüsü ve aralarında dolaşan taylar |
| `hz-idris/bolum-4/bos-yemlik.jpg` | 1. Kısım | A | ⬜ Bekliyor | Ağılda dibi görünen boş bir yemlik, yanında devrilmiş su kabı ve dağılmış saman |
| `hz-idris/bolum-4/ufka-uzanan-yol.jpg` | Devam | B | ⬜ Bekliyor | Toprakta ufka doğru uzanan bir iz ve üzerine düşen ilk sabah ışığı |

---

## 5. Sayaçlar

| Kitap | Açılış | İçerik sahnesi | Toplam | Hazır | Açık kalem |
|---|---|---|---|---|---|
| Hz. Âdem | 8 | 32 | **40** | 40 | 1 (oran: `bolum-1/kapak.jpg`) |
| Hz. Şît | 4 | 16 | **20** | 20 | 0 |
| Hz. İdrîs | 4 | 16 | **20** | 4 | 16 (içerik sahneleri yer tutucu) |
| **Genel** | **16** | **64** | **80** | **64** | **17** |

**Bu sicilin dışındakiler:**

| Varlık | Dosya | Durum |
|---|---|---|
| Kitap kapağı | `kitaplar/hz-adem/kapak.png` · `hz-sit/kapak.png` · `hz-idris/kapak.png` | ✅ Var (597×891) |
| Harita durağı | `kitaplar/hz-{adem,sit,idris}/harita-kapak.jpg` | ✅ Var (597×597, kare — bu görsel 16:9 kuralına tabi değildir) |
| Rozet | `rozetler/hz-adem/bolum-1…8.png` · `hz-sit/bolum-1…4.png` | ✅ 12 gerçek görsel, 512×512 şeffaf |
| Rozet | `rozetler/hz-idris/bolum-1…4.png` | ⬜ 4 yer tutucu — brifler teslimin §H'sinde |
| Madalya | `madalyalar/hz-adem.png` · `hz-sit.png` | ✅ 2 gerçek görsel, 512×512 şeffaf |
| Madalya | `madalyalar/hz-idris.png` | ⬜ Yer tutucu — brif teslimin §C3'ünde (sembol: kayadaki ışıklı iz) |

> **12 Ağu 2026 — Hz. İdrîs aktarıldı.** Kitap kapağı ve harita durağı hazırdı,
> dört bölüm kapağı da diskteydi. Bekleyen üretim: **16 içerik sahnesi + 4 rozet
> + 1 madalya = 21 görsel.** Hepsi yer tutucudur; Hasan gerçek dosyayı AYNI ADLA
> üzerine yazınca kod değişmeden yayına girer.

> ✅ **Kapandı (11 Ağu 2026).** Hz. Şît'in ödül görselleri artık gerçek PNG'dir;
> PNG geçişinden kalan ölü `.svg` dosyaları klasörlerde yoktur. Aşağıdaki
> "`.svg`'yi `.png` adıyla kopyalama" yasağı (§7) kural olarak geçerliliğini
> korur — ileride yeni kitap eklenirken aynı hataya düşülmemesi içindir.

## 6. Akış — yeni görsel eklenirken

1. Sahne yeri `src/data/books.ts` içinde `type: "image"` bloğu olarak açılır
   (yalnız `src` + `alt`; `portraitSrc` yazılmaz).
2. Dosya adı **bu sicile** eklenir: bölüm, akıştaki yer, öncelik, brif.
3. Hasan görseli üretir ve **aynı adla** klasöre atar.
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
- **Sahne görselleri `.jpg`** (16:9, 1920×1080).
- **Rozet ve madalya AYRI adlarla `.png`** (512×512 şeffaf):
  `rozetler/hz-{key}/bolum-{n}.png` ve `madalyalar/hz-{key}.png`.

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

---

## 7. Diğer görsel klasörleri (27 Temmuz 2026 kurulumu)

**Ödül görselleri 512×512 şeffaf PNG'dir** (REVİZE 7 Ağu 2026 — PROJE-MODELI
6.1; eskiden SVG'ydi). Eskisini silip aynı adla yenisini atmak yeterlidir.

| Klasör | Kalıp | Kurulan | Not |
|---|---|---|---|
| `public/rozetler/hz-{bookKey}/` | `bolum-{n}.png` | **16** | âdem 8 + şît 4 **gerçek** (11 Ağu 2026) · idrîs 4 **yer tutucu** (12 Ağu 2026). Hedef 34 (İlk İzler Vadisi): + nûh 8, hûd 5, sâlih 5 — bu üçünün klasörü **henüz yok**, içerikleri `books.ts`'e aktarılınca betik açacak |
| `public/madalyalar/` | `hz-{bookKey}.png` | **3** | âdem + şît **gerçek** (11 Ağu 2026) · idrîs **yer tutucu** (12 Ağu 2026). Hedef 6 |
| `public/unvanlar/` | `{unvan-anahtari}.png` | **10** | Hepsi yer tutucu: `yeni-gezgin`, `yol-kasifi`, `deger-toplayicisi`, `yol-arkadasi`, `bilge-yolcu`, `hikaye-ustasi`, `emanet-koruyucusu`, `isik-tasiyicisi`, `kissa-rehberi`, `buyuk-yolculuk-kasifi` (12 Eki 2026'da `atlas-bilgini` ve `yedi-bolge-kasifi` yerine). Anahtarlar `derive.ts:UNVAN_ESIKLERI` + `unvanAnahtari()` türetimidir; eşik tablosu değişirse `npm run gorsel-yertutucu -- unvanlar` yeniden çalıştırılır |
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
> 18 rozet + 3 madalya kaldı — nûh · hûd · sâlih.)* Katalogda "Hazırlanıyor"
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

İlk İzler Vadisi'nin **altı kitabının da** dikey kapağı ve harita durağı görseli
diskte hazırdır (597×891 kapak, 597×597 harita durağı). Bu dört kitapta eksik
olan yalnız bölüm içi sahneler, rozetler ve madalyalardır — hepsi içerik
`books.ts`'e aktarıldıktan sonra açılır.

### Sonraki bölgeler

Klasör iskeleti şimdilik **yalnız İlk İzler Vadisi** için kuruldu. Diğer 6 bölge
(29 kitap) içerik geldikçe aynı kalıpla açılacak.

### Arşiv

16:9'a geçişte eski **4:3** Hz. Âdem görselleri `arsiv-gorseller/icerik-4-3/`
klasörüne alındı (7 dosya, ~19 MB). Yeni sahneler 16:9 üretileceği için bu
klasör silinebilir; `public/` altında olmadığı için siteye servis edilmiyor.
