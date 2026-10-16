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

**Durum (11 Ağu 2026):** 40 slot · **40 gerçek görsel teslim edildi.** 39'u 16:9;
`bolum-1/kapak.jpg` 1200×896 (4:3) geldiği için tek açık kalem odur. Bölüm 1'in
diğer dört sahnesi 1376×768 (1.792) — 16:9'a %0.8 sapma, gözle fark edilmiyor,
yeniden üretim gerektirmez. Bölüm 2–8 tamamı 1920×1080.
Tam üretim promptları: `kitap-icerikleri/HZ-ADEM-GORSEL-PROMPTLARI.md`.

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

### Bölüm 1 — Putlara Eğilmeyen Eller

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-1/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında yeşil bir vadi, küçük bir kerpiç ev, bahçesi ve uzakta parlayan iki nehir |
| `hz-nuh/bolum-1/kucuk-tekne.jpg` | 1. Kısım | A | ✅ Hazır | Tarla kenarındaki dar bir arkta yüzen, tahtadan yontulmuş küçük bir oyuncak tekne |
| `hz-nuh/bolum-1/oymali-kapi.jpg` | 1. Kısım | A | ✅ Hazır | Asma dalları ve çiçek oymalarıyla süslenmiş ahşap bir kapı ve önünde dağınık talaşlar |
| `hz-nuh/bolum-1/birakilan-keski.jpg` | Devam | B | ✅ Hazır | Ahşap tezgâhın üstüne bırakılmış bir keski ve yanında işlenmemiş düz bir tahta parçası |
| `hz-nuh/bolum-1/uzak-sehir.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında uzakta ışıkları yanan bir şehir ve önde sessiz bir vadi patikası |
| `hz-nuh/bolum-1/dik-fidan.jpg` | Devam | B | ✅ Hazır | Yıldızlı bir gecede rüzgâra rağmen dimdik duran genç bir fidan |

### Bölüm 2 — Kömürün İçindeki Elmas

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Akşam ışığında vadiye inen bir yol ve yolun kenarındaki küçük bir evin aydınlık penceresi |
| `hz-nuh/bolum-2/yol-kenari-tezgah.jpg` | 1. Kısım | A | ✅ Hazır | Yol kenarında kamış örtülü basit bir çardak, altında marangoz tezgâhı ve el aletleri |
| `hz-nuh/bolum-2/komurde-elmas.jpg` | 1. Kısım | A | ✅ Hazır | Kara kömür parçalarının arasında, içinden ışık saçan tek bir elmas |
| `hz-nuh/bolum-2/sacilan-aletler.jpg` | Devam | B | ✅ Hazır | Toprak yola saçılmış marangoz aletleri ve yan devrilmiş bir su testisi |
| `hz-nuh/bolum-2/bos-yol.jpg` | Devam | B | ✅ Hazır | Alacakaranlıkta bomboş kalan yol, çardak ve yeniden düzenlenmiş tezgâh |
| `hz-nuh/bolum-2/yeni-sabah.jpg` | Devam | B | ✅ Hazır | Sabah güneşinde yol kenarındaki tezgâhın başında, arkası dönük ve yüzü görünmeyen bir figür |

### Bölüm 3 — Kapısı Herkese Açık

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Öğle ışığında geniş, tozlu bir şehir meydanı, ortasında gölgeli büyük bir ağaç ve çevresinde kerpiç evler |
| `hz-nuh/bolum-3/zengin-avlu.jpg` | 1. Kısım | A | ✅ Hazır | Yüksek duvarlı bir avlu, süslü yastıklar, bakır kaplar ve oymalı büyük bir kapı |
| `hz-nuh/bolum-3/meydan-golgesi.jpg` | 1. Kısım | A | ✅ Hazır | Meydandaki büyük ağacın gölgesinde halka hâlinde dizilmiş taşlar, yere serilmiş eski bir hasır ve bir ekmek sepeti |
| `hz-nuh/bolum-3/uzaklasan-izler.jpg` | Devam | B | ✅ Hazır | Tozlu meydanda büyük evlere doğru uzaklaşan ayak izleri ve ağacın altında yerinde duran taşlar |
| `hz-nuh/bolum-3/acik-kapi.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında ardına kadar açık duran sade ahşap bir kapı ve içeriden yola taşan sıcak ışık |
| `hz-nuh/bolum-3/bas-kose.jpg` | Devam | B | ✅ Hazır | Kandil ışığında yere serilmiş uzun bir sofra, çevresinde aynı tür sade minderler ve paylaşılmış ekmek |

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
| `hz-nuh/bolum-5/tahta-yigini.jpg` | 1. Kısım | A | ✅ Hazır | Kesilmiş büyük bir ağaç kütüğü ve yanında düzgünce istiflenmiş kalın tahtalar |
| `hz-nuh/bolum-5/gemi-iskeleti.jpg` | 1. Kısım | A | ✅ Hazır | Kuru bir düzlükte, kaburgaları görünen ve tahtaları yarı yarıya çakılmış büyük bir gemi gövdesi |
| `hz-nuh/bolum-5/cekic-ve-civiler.jpg` | Devam | B | ✅ Hazır | Bir tahta üzerine bırakılmış ahşap tokmak ve yanında dizili demir çiviler |
| `hz-nuh/bolum-5/ailecek-is.jpg` | Devam | B | ✅ Hazır | Geminin gölgesinde bir su testisi, ekmek sepeti, çivi kutusu ve yan yana bırakılmış aletler |
| `hz-nuh/bolum-5/tamamlanan-gemi.jpg` | Devam | B | ✅ Hazır | Akşam ışığında, denizden çok uzak kuru bir düzlüğün ortasında duran büyük, tamamlanmış ahşap gemi |

### Bölüm 6 — Allah'ın Adıyla Binin

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Kuru düzlükte duran ahşap gemi ve ufukta toplanan koyu yağmur bulutları |
| `hz-nuh/bolum-6/kara-bulutlar.jpg` | 1. Kısım | A | ✅ Hazır | Çatlak toprağa düşen ilk iri yağmur damlaları ve üstte koyu bulutlar |
| `hz-nuh/bolum-6/hayvan-izleri.jpg` | 1. Kısım | A | ✅ Hazır | Islak çamurda gemiye doğru ilerleyen, yan yana ikişer ikişer basılmış farklı hayvan izleri |
| `hz-nuh/bolum-6/gemi-ici.jpg` | Devam | B | ✅ Hazır | Geminin içinde kalın ahşap kirişler, saman serili bölmeler ve kirişlere tünemiş kuşlar |
| `hz-nuh/bolum-6/yuzen-gemi.jpg` | Devam | B | ✅ Hazır | Yağmur altında geniş bir suyun üstünde ağır ağır yüzen ahşap gemi |
| `hz-nuh/bolum-6/kandil-ve-yagmur.jpg` | Devam | B | ✅ Hazır | Yağmur damlaları süzülen küçük bir ahşap pencerenin önünde yanan toprak kandil |

### Bölüm 7 — Dağlar Gibi Dalgalar

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-nuh/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Gri gökyüzünün altında yüksek dalgalar ve dalgaların arasında sağlamca yol alan ahşap gemi |
| `hz-nuh/bolum-7/dalgalar.jpg` | 1. Kısım | A | ✅ Hazır | Geminin kenarından görülen, dağlar gibi yükselen dalgalar ve uzakta sisin içinde bir tepe |
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
| `hz-nuh/bolum-8/yeni-koy.jpg` | Devam | B | ✅ Hazır | Dağ eteğinde yeni örülmekte olan taş duvarlı küçük evler, kazılmış toprak ve sıra sıra dikilmiş fidanlar |
| `hz-nuh/bolum-8/yeni-fidan.jpg` | Devam | B | ✅ Hazır | Dağ yamacında yeni dikilmiş tek bir fidan, toprağı nemli; arkada açılan gökyüzü ve uzakta duran gemi |
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
| `hz-musa/bolum-1/hazir-sandik.jpg` | 1. Kısım | A | ✅ Hazır | Şafak öncesi nehir kıyısında, sazlıkların dibinde duran kapağı kapalı küçük ahşap bir sandık |
| `hz-musa/bolum-1/nehirdeki-sandik.jpg` | Devam | B | ✅ Hazır | Sabah sisi içinde, geniş nehrin ortasında süzülen kapalı küçük bir sandık |
| `hz-musa/bolum-1/sazlik-yolu.jpg` | Devam | B | ✅ Hazır | Nehir kıyısındaki sazlıkların arasından geçen dar bir patika ve ıslak toprakta küçük ayak izleri |
| `hz-musa/bolum-1/gun-dogarken.jpg` | Devam | B | ✅ Hazır | Güneş doğarken altın renge bürünen sakin bir nehir ve çok uzakta süzülen küçük bir sandık |

### Bölüm 2 — Annesine Dönen Bebek

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında nehrin karşı kıyısında yükselen büyük bir sarayın sütunları ve suya inen bahçesi |
| `hz-musa/bolum-2/dallardaki-sandik.jpg` | 1. Kısım | A | ✅ Hazır | Suya sarkan söğüt dallarının ve nilüferlerin arasında duran kapalı küçük bir sandık |
| `hz-musa/bolum-2/saray-salonu.jpg` | 1. Kısım | A | ✅ Hazır | Sütunlu, aydınlık bir saray salonunun ortasında ince örtülerle hazırlanmış boş bir beşik |
| `hz-musa/bolum-2/saraya-giden-yol.jpg` | Devam | B | ✅ Hazır | Gün ışığında nehir kıyısı boyunca saraya uzanan toprak bir yol ve tozda koşar adımlarla bırakılmış küçük ayak izleri |
| `hz-musa/bolum-2/yumusak-ortu.jpg` | Devam | B | ✅ Hazır | Gün ışığında, sade bir yüzeyin üstünde özenle katlanmış yumuşak dokuma bir örtü ve yanında tek bir nilüfer çiçeği |
| `hz-musa/bolum-2/nilufer.jpg` | Devam | B | ✅ Hazır | Şafak ışığında nehir kıyısında yeni açmış tek bir nilüfer çiçeği |

### Bölüm 3 — Bir Anlık Kavga

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Tepeden bakışla, bir yanda sarayın yeşil bahçeleri, öbür yanda sıkışık kerpiç mahalleler ve aralarından akan nehir |
| `hz-musa/bolum-3/dar-sokak.jpg` | 1. Kısım | A | ✅ Hazır | Öğle sıcağında bomboş, dar bir şehir sokağı; yerde devrilmiş bir sepet ve dağılmış birkaç hurma |
| `hz-musa/bolum-3/sabaha-kadar-kandil.jpg` | 1. Kısım | A | ✅ Hazır | Karanlık bir odada pencere kenarında yanan küçük bir kandil ve dışarıda sabaha dönen mavi gökyüzü |
| `hz-musa/bolum-3/sabah-sokagi.jpg` | Devam | B | ✅ Hazır | Sabah ışığında bir sokak kavşağı, havada asılı kalmış toz ve yere düşmüş bir su testisi |
| `hz-musa/bolum-3/sehir-kapisi.jpg` | Devam | B | ✅ Hazır | Şafakta kalın taş duvarlı bir şehir kapısının aralığından görünen, çöle uzanan boş yol |
| `hz-musa/bolum-3/col-yolu.jpg` | Devam | B | ✅ Hazır | Sabah güneşinde kum tepelerinin arasından ufka uzanan, ayak izli tek bir yol |

### Bölüm 4 — Medyen'deki Kuyu

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Sıcak bir çöl öğleden sonrasında, kum tepelerinin ardında ufukta beliren yeşil bir vaha ve hurma ağaçları |
| `hz-musa/bolum-4/medyen-suyu.jpg` | 1. Kısım | A | ✅ Hazır | Taş kenarlı bir kuyunun çevresinde birbirine karışmış koyun ve keçi sürüleri, havada toz |
| `hz-musa/bolum-4/bekleyen-suru.jpg` | 1. Kısım | A | ✅ Hazır | Bir ağacın gölgesinde, kalabalıktan uzakta sabırla bekleyen küçük bir koyun sürüsü |
| `hz-musa/bolum-4/agac-golgesi.jpg` | Devam | B | ✅ Hazır | Uzak planda, bir ağacın gölgesinde arkası dönük oturan ve yüzü görünmeyen bir yolcu; önünde sulanmış sürü |
| `hz-musa/bolum-4/yasli-babanin-avlusu.jpg` | Devam | B | ✅ Hazır | Akşam ışığında sade bir evin avlusu; ağaç altına serilmiş hasır, üstünde ekmek ve su testisi |
| `hz-musa/bolum-4/otlaktaki-suru.jpg` | Devam | B | ✅ Hazır | Gün batımında yeşil bir yamaçta otlayan koyunlar ve bir kayaya dayalı duran uzun ahşap bir değnek |

### Bölüm 5 — Vadideki Ateş

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-5/kapak.jpg` | Açılış | A | ✅ Hazır | Ay ışığında kayalık dağların arasından geçen ıssız bir yol ve uzakta kurulmuş küçük bir çadır |
| `hz-musa/bolum-5/karanlik-vadi.jpg` | 1. Kısım | A | ✅ Hazır | Karanlık bir vadinin derinliğinde, çok uzakta küçük ve sıcak bir ateş ışığı |
| `hz-musa/bolum-5/cikarilan-pabuclar.jpg` | 1. Kısım | A | ✅ Hazır | Taşlı bir vadi zemininde yan yana çıkarılmış eski deri sandaletler; üzerlerine uzaktan sıcak bir ışık vuruyor |
| `hz-musa/bolum-5/yerdeki-asa.jpg` | 1. Kısım | A | ✅ Hazır | Ay ışığında taşlı zeminde uzanan sade ahşap bir asa ve çevresindeki kumda kıvrımlı izler |
| `hz-musa/bolum-5/yildizli-gece.jpg` | Devam | B | ✅ Hazır | Dağların üstünde açılan geniş, yıldızlı bir gökyüzü ve vadinin üzerinde yumuşak bir aydınlık |
| `hz-musa/bolum-5/kamp-atesi.jpg` | Devam | B | ✅ Hazır | Şafak sökerken küçük bir çadırın önünde yanan kamp ateşi ve çadıra dayalı sade bir asa |

### Bölüm 6 — Saraydaki Soru

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-6/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah sisi içinde nehir kıyısında uzanan büyük bir şehir, yüksek duvarlar ve uzakta dikilitaşlar |
| `hz-musa/bolum-6/uzak-saray.jpg` | 1. Kısım | A | ✅ Hazır | Taş döşeli geniş bir yolun sonunda, yüksek basamaklarla yükselen görkemli bir saray |
| `hz-musa/bolum-6/buyuk-kapi.jpg` | 1. Kısım | A | ✅ Hazır | Devasa, kapalı ahşap ve bronz bir saray kapısı ve önündeki geniş taş basamağa düşen ince bir ışık şeridi |
| `hz-musa/bolum-6/sutunlu-salon.jpg` | Devam | B | ✅ Hazır | Yüksek sütunlu, loş bir taht salonu; uzakta boş bir taht ve tavandaki pencereden süzülen tek ışık hüzmesi |
| `hz-musa/bolum-6/dagilan-ulaklar.jpg` | Devam | B | ✅ Hazır | Akşamüstü, şehrin dışından farklı yönlere uzanan yollar ve her yolun üstünde uzaklaşan ince toz bulutları |
| `hz-musa/bolum-6/aksam-nehri.jpg` | Devam | B | ✅ Hazır | Akşam ışığında sakin akan nehir, kıyıdaki kumda yan yana uzanan iki sıra ayak izi ve arkada uzak sarayın silueti |

### Bölüm 7 — Ziynet Günü

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-7/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah güneşinde büyük bir meydana açılan geniş ve tertemiz bir şehir caddesi |
| `hz-musa/bolum-7/ziynet-meydani.jpg` | 1. Kısım | A | ✅ Hazır | Kuşluk güneşinde, kenarları gölgelikler ve sütunlarla çevrili, ortası boş geniş kumlu bir meydan |
| `hz-musa/bolum-7/kivrilan-ipler.jpg` | 1. Kısım | A | ✅ Hazır | Kumun üstüne saçılmış ipler ve ince değnekler; uzun gölgeleri kıvrılıyormuş gibi görünüyor |
| `hz-musa/bolum-7/sessiz-kum.jpg` | 1. Kısım | A | ✅ Hazır | Bomboş kalmış düz kum zemin; ortasında uzun bir gölge ve çevresinde dağılmış birkaç ip parçası |
| `hz-musa/bolum-7/bos-meydan.jpg` | Devam | B | ✅ Hazır | İkindi ışığında boşalmaya başlamış meydan, bir basamağın üstünde devrilmiş altın bir kâse ve rüzgârda savrulan toz |
| `hz-musa/bolum-7/ilk-yildiz.jpg` | Devam | B | ✅ Hazır | Alacakaranlıkta şehrin düz damlarının üstünde parlayan tek ve parlak bir akşam yıldızı |

### Bölüm 8 — Tutulmayan Sözler

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-8/kapak.jpg` | Açılış | A | ✅ Hazır | Bulutlu bir sabahta nehir kıyısındaki tarlalar, uzakta şehir ve gökyüzünde ağır, gri bulutlar |
| `hz-musa/bolum-8/kuru-tarla.jpg` | 1. Kısım | A | ✅ Hazır | Çatlamış toprakta kurumuş buğday sapları, boş bir sulama kanalı ve kenarda duran boş bir toprak küp |
| `hz-musa/bolum-8/cekirge-bulutu.jpg` | 1. Kısım | A | ✅ Hazır | Yeşil tarlaların üstünde ufuktan yaklaşan, uzak ve koyu bir çekirge bulutu |
| `hz-musa/bolum-8/irmak-ve-saray.jpg` | Devam | B | ✅ Hazır | Akşam ışığında, kanallarla bölünmüş nehrin kıyısında yükselen görkemli bir sarayın terası |
| `hz-musa/bolum-8/kandilli-evler.jpg` | Devam | B | ✅ Hazır | Gece, bir mahallede yan yana kerpiç evlerin pencerelerinden süzülen sıcak kandil ışıkları |
| `hz-musa/bolum-8/safak-yolu.jpg` | Devam | B | ✅ Hazır | Şafak vakti şehrin dışından çöle doğru uzanan geniş ve boş bir yol |

### Bölüm 9 — Denizde Açılan Yol

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-9/kapak.jpg` | Açılış | A | ✅ Hazır | Yıldızlı bir gecede şehrin dışında açık kalmış bir kapı ve çöle doğru uzanan yol |
| `hz-musa/bolum-9/ay-isiginda-izler.jpg` | 1. Kısım | A | ✅ Hazır | Ay ışığında kumda uzayıp giden sayısız ayak izi ve uzakta denizin parıltısı |
| `hz-musa/bolum-9/toz-bulutu.jpg` | 1. Kısım | A | ✅ Hazır | Gün doğarken, sahil kumlarının ardında ufukta yükselen büyük ve uzak bir toz bulutu |
| `hz-musa/bolum-9/acilan-yol.jpg` | Devam | B | ✅ Hazır | İkiye yarılmış denizin ortasında uzanan kuru bir yol; yolun başında, arkası dönük, asasını kaldırmış küçük bir figür |
| `hz-musa/bolum-9/sakin-deniz.jpg` | Devam | B | ✅ Hazır | Sabah ışığında yeniden durulmuş, geniş ve sakin bir deniz; kıyıya yumuşak dalgalar vuruyor |
| `hz-musa/bolum-9/karsi-kiyi.jpg` | Devam | B | ✅ Hazır | Gün doğarken denizden çıkıp kıyıdaki tepeye doğru yükselen sayısız ayak izi |

### Bölüm 10 — İki Denizin Buluştuğu Yer

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-musa/bolum-10/kapak.jpg` | Açılış | A | ✅ Hazır | Sabah ışığında kayalık bir sahil boyunca uzanan, deniz kenarında kıvrılan ıssız bir patika |
| `hz-musa/bolum-10/kaya-ve-deniz.jpg` | 1. Kısım | A | ✅ Hazır | Büyük bir kayanın dibinde, iki farklı renkteki suyun buluştuğu yer ve suda kıvrılarak uzaklaşan ince bir iz |
| `hz-musa/bolum-10/kiyidaki-izler.jpg` | 1. Kısım | A | ✅ Hazır | Islak kumda gidip geri dönen iki sıra ayak izi ve kayanın yanında başlayan üçüncü bir iz |
| `hz-musa/bolum-10/serce-ve-damla.jpg` | 1. Kısım | A | ✅ Hazır | Geniş denizin üstünde alçaktan uçan bir serçe ve gagasından düşen tek bir parlak su damlası |
| `hz-musa/bolum-10/duzelen-duvar.jpg` | Devam | B | ✅ Hazır | Akşam ışığında yeni düzeltilmiş, dimdik duran eski bir taş duvar ve dibinde taze harç izleri |
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
| `hz-eyyub/bolum-1/acik-sofra.jpg` | Devam | B | ✅ Hazır | Bağ çardağının altında, avluya serilmiş uzun bir sofra; ekmekler, üzüm salkımları, toprak kaseler ve yola açılan avlu kapısı |
| `hz-eyyub/bolum-1/meydan-agaci.jpg` | Devam | B | ✅ Hazır | Akşam ışığında taş evlerle çevrili küçük bir köy meydanı; ortasında yaşlı bir çınar ve altında taş sekiler |
| `hz-eyyub/bolum-1/ufuktaki-bulut.jpg` | Devam | B | ✅ Hazır | Gün batımında ön planda bir bağ çardağı ve bereketli vadi; çok uzakta ufukta toplanan gri bulutlar |

### Bölüm 2 — Art Arda Gelen Haberler

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-2/kapak.jpg` | Açılış | A | ✅ Hazır | Alçak gri bulutların altında sessiz bir sabah; taş evler, bağlar ve ovaya uzanan tarlalar |
| `hz-eyyub/bolum-2/tozlu-yol.jpg` | 1. Kısım | A | ✅ Hazır | Ovadan köye uzanan toprak bir yol ve yolun uzağında havada asılı kalmış ince bir toz izi |
| `hz-eyyub/bolum-2/bos-agil.jpg` | 1. Kısım | A | ✅ Hazır | Taş duvarlı boş bir ağıl; ahşap kapısı açık kalmış, yerde birkaç tutam saman |
| `hz-eyyub/bolum-2/bos-ambar.jpg` | Devam | B | ✅ Hazır | Aralık kapısından ışık giren bomboş bir taş ambar; köşede devrilmiş boş bir sepet |
| `hz-eyyub/bolum-2/tek-kandil.jpg` | Devam | B | ✅ Hazır | Akşam karanlığında taş bir avlu; ocakta küllenmiş közler ve duvar oyuğunda sakin sakin yanan tek bir kil kandil |
| `hz-eyyub/bolum-2/kapidaki-sandaletler.jpg` | Devam | B | ✅ Hazır | Akşam, bir evin eşiğinde yan yana bırakılmış birkaç çift eski deri sandalet ve aralık kapıdan dışarı sızan sıcak ışık |

### Bölüm 3 — Herkes Gidince

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-3/kapak.jpg` | Açılış | A | ✅ Hazır | Alacakaranlıkta uzaktan görünen, kapıları kapalı taş evler ve köyden tepedeki tek bir zeytin ağacına uzanan ince bir patika |
| `hz-eyyub/bolum-3/bos-tarla.jpg` | 1. Kısım | A | ✅ Hazır | Bakımsız kalmış bir buğday tarlası, başakların arasında yabani otlar ve taş duvara yaslanmış ahşap bir saban |
| `hz-eyyub/bolum-3/koy-disi.jpg` | 1. Kısım | A | ✅ Hazır | Köyün dışında, alçak bir tepede tek başına duran yaşlı bir zeytin ağacı ve gölgesine serilmiş sade bir hasır; arkada uzakta köy |
| `hz-eyyub/bolum-3/gidip-gelen-izler.jpg` | Devam | B | ✅ Hazır | Köyün kenarından zeytin ağacına uzanan toprak patika ve üzerinde defalarca gidilip gelinmiş aynı küçük ayak izleri |
| `hz-eyyub/bolum-3/dolu-testi.jpg` | Devam | B | ✅ Hazır | Zeytin ağacının gölgesinde, hasırın yanında ağzına kadar su dolu bir toprak testi ve üzeri örtülü küçük bir ekmek sepeti |
| `hz-eyyub/bolum-3/huzurlu-safak.jpg` | Devam | B | ✅ Hazır | Şafakta zeytin ağacının ardından doğan güneş; dalların arasından süzülen ilk ışık hasıra düşüyor |

### Bölüm 4 — Kalpten Gelen Dua

| Dosya | Akıştaki yer | Öncelik | Durum | Görsel brifi |
|---|---|---|---|---|
| `hz-eyyub/bolum-4/kapak.jpg` | Açılış | A | ✅ Hazır | Öğle güneşinde kuru otlu tepeler, taş duvarlar ve tepede tek başına duran küçük bir zeytin ağacı |
| `hz-eyyub/bolum-4/ziyaret-patikasi.jpg` | 1. Kısım | A | ✅ Hazır | Kuru otların arasından zeytin ağacına doğru kıvrılan dar bir patika ve tozda farklı boylarda taze ayak izleri |
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
| `hz-eyyub/bolum-5/iki-testi.jpg` | Devam | B | ✅ Hazır | Pınarın kenarında yan yana duran, sudan yeni dolmuş iki toprak testi; çevrede yeşeren otlar ve küçük çiçekler |
| `hz-eyyub/bolum-5/yeseren-bag.jpg` | Devam | B | ✅ Hazır | Sabah ışığında yeniden yeşermiş bağlar, taze yapraklı asmalar ve uzakta yeşil tarlalarla çevrili taş evler |
| `hz-eyyub/bolum-5/yeseren-agac.jpg` | Devam | B | ✅ Hazır | İkindi altın ışığında, kurumuş eski dalların arasından yükselen taze yeşil yapraklı genç bir ağaç ve dibinde ince bir su şeridi |

---

## 5. Sayaçlar

| Kitap | Açılış | İçerik sahnesi | Toplam | Hazır | Açık kalem |
|---|---|---|---|---|---|
| Hz. Âdem | 8 | 32 | **40** | 40 | 1 (oran: `bolum-1/kapak.jpg`) |
| Hz. Şît | 4 | 16 | **20** | 20 | 0 |
| Hz. İdrîs | 4 | 16 | **20** | 4 | 16 (içerik sahneleri yer tutucu) |
| Hz. Nûh | 8 | 40 | **48** | 48 | 0 |
| Hz. Musa | 10 | 50 | **60** | 60 | 0 |
| Hz. Eyyûb | 5 | 25 | **30** | 30 | 0 |
| **Genel** | **39** | **179** | **218** | **202** | **17** |

**Bu sicilin dışındakiler:**

| Varlık | Dosya | Durum |
|---|---|---|
| Kitap kapağı | `kitaplar/hz-adem/kapak.png` · `hz-sit/kapak.png` · `hz-idris/kapak.png` · `hz-nuh/kapak.png` | ✅ Var (597×891) |
| Kitap kapağı | `kitaplar/hz-musa/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-musa/kapak.png`) |
| Harita durağı | `kitaplar/hz-{adem,sit,idris,nuh}/harita-kapak.jpg` | ✅ Var (597×597, kare — bu görsel 16:9 kuralına tabi değildir) |
| Harita durağı | `kitaplar/hz-musa/harita-kapak.jpg` | ✅ Var (597×597, Nûh durağıyla aynı çerçeve ailesi) |
| Rozet | `rozetler/hz-adem/bolum-1…8.png` · `hz-sit/bolum-1…4.png` | ✅ 12 gerçek görsel, 512×512 şeffaf |
| Rozet | `rozetler/hz-idris/bolum-1…4.png` | ⬜ 4 yer tutucu — brifler teslimin §H'sinde |
| Rozet | `rozetler/hz-nuh/bolum-1…8.png` | ✅ 8 gerçek görsel, 512×512 şeffaf (13 Eki 2026) |
| Madalya | `madalyalar/hz-adem.png` · `hz-sit.png` | ✅ 2 gerçek görsel, 512×512 şeffaf |
| Madalya | `madalyalar/hz-idris.png` | ⬜ Yer tutucu — brif teslimin §C3'ünde (sembol: kayadaki ışıklı iz) |
| Madalya | `madalyalar/hz-nuh.png` | ✅ Gerçek görsel, 512×512 şeffaf (13 Eki 2026; sembol: dağda duran gemi) |
| Rozet | `rozetler/hz-musa/bolum-1…10.png` | □ 10 kare görsel, 512×512 opak, **çerçeve bekliyor** (13 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-musa/`) |
| Madalya | `madalyalar/hz-musa.png` | □ Kare görsel, 512×512 opak, **çerçeve bekliyor** (13 Eki 2026; sembol: açılan yolun başındaki asa) |
| Kitap kapağı | `kitaplar/hz-eyyub/kapak.png` | ✅ Var (600×900, **yazısız** — başlık tasarımda eklenecek; 2K ana dosya `gorsel-kaynaklari/kitaplar/hz-eyyub/kapak.png`) |
| Harita durağı | `kitaplar/hz-eyyub/harita-kapak.jpg` | ✅ Var (597×597, Musa durağıyla aynı çerçeve ailesi; sembol: taşlar arasından kaynayan pınar) |
| Rozet | `rozetler/hz-eyyub/bolum-1…5.png` | □ 5 kare görsel, 512×512 opak, **çerçeve bekliyor** (15 Eki 2026; ana dosyalar `gorsel-kaynaklari/rozetler/hz-eyyub/`) |
| Madalya | `madalyalar/hz-eyyub.png` | □ Kare görsel, 512×512 opak, **çerçeve bekliyor** (15 Eki 2026; sembol: yeniden yeşeren genç ağaç) |

> **12 Ağu 2026 — Hz. İdrîs aktarıldı.** Kitap kapağı ve harita durağı hazırdı,
> dört bölüm kapağı da diskteydi. Bekleyen üretim: **16 içerik sahnesi + 4 rozet
> + 1 madalya = 21 görsel.** Hepsi yer tutucudur; Hasan gerçek dosyayı AYNI ADLA
> üzerine yazınca kod değişmeden yayına girer.

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
- **Sahne görselleri `.jpg`** (16:9, 1920×1080).
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
| Model | Magnific · **Seedream 5 Pro** · **2K** |
| Oran | Sahne **16:9** · rozet ve madalya **1:1** |
| Sahne stil referansı | Proje kökündeki **`stil-referans-gorsel.jpg`** — Magnific'e stil referansı olarak verilir. Ayrıntılı, sıcak, orta doygunlukta "suluboya üstüne net boyama" masal kitabı dili; soluk pastel yok |
| Rozet/madalya stil referansı | Sahnelerle aynı **`stil-referans-gorsel.jpg`**; pilotta onaylanan ilk kare rozet, kitabın diğer rozet ve madalyasına ikinci referans olur. Çerçeveli eski rozetler referans **verilmez** (çerçeveyi geri getirir) |

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
   standartla üretilir ve Hasan'a gösterilir. Onay gelmeden seri üretime
   geçilmez (Magnific kredisi boşa gitmesin). Onaylanan model ve ayarlar kitap
   boyunca sabit tutulur.
2. **Bölüm bölüm ilerlenir;** her bölüm bitince Hasan'a gösterilir.
3. **Sahne teknik işlemi:** gerekirse büyütme → 16:9 kırpma → **1920×1080
   `.jpg`** → yer tutucunun **üzerine aynı adla** yazma → boyut doğrulama
   (`sips -g pixelWidth -g pixelHeight`).
4. **Rozet/madalya teknik işlemi:** 1:1 · 2K üretim → **arka plan kaldırılmaz**
   → orijinal ana dosya olarak `gorsel-kaynaklari/` altına kaydedilir →
   küçültülmüş **512×512 kare `.png`** yer tutucunun **üzerine aynı adla**
   yazılır → boyut doğrulama. Ayrıntı aşağıda.
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
   **`□`** (kare teslim, çerçeve bekliyor) yapılır — `✓` değil; `✓` Hasan'ın
   çerçeveli dosyasıyla gelir.

**Rozet ve madalya — çerçevesiz kare (KARAR 13 Eki 2026 — Hasan):**

Rozet ve madalyalar **çerçevesiz, kare** üretilir. Çerçeveyi Hasan Photoshop'ta
tek bir ortak şablonla ekler ve **aynı adla** üzerine kaydeder; böylece bütün
setin çerçevesi birebir aynı olur. O ana kadar site kare görseli gösterir —
kod değişmez, yol değişmez.

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
  | Site dosyası | `public/rozetler/hz-{key}/bolum-{n}.png` · `public/madalyalar/hz-{key}.png` | 512×512 kare `.png`, opak |
  | Ana dosya (Photoshop için) | `gorsel-kaynaklari/rozetler/hz-{key}/bolum-{n}.png` · `gorsel-kaynaklari/madalyalar/hz-{key}.png` | Magnific orijinali (2K), işlenmemiş |

  `gorsel-kaynaklari/` `public/` dışındadır, siteye servis edilmez ve repoya
  girmez (`.gitignore`). Hasan çerçeveyi ana dosyadan çalışır, sonucu
  **512×512 şeffaf `.png`** olarak site dosyasının üzerine aynı adla kaydeder.
- **Eski rozetler:** Âdem, Şît ve Nûh rozetleri eski, üretimde çizilmiş
  çerçevelerle teslim edilmiştir. Bunların yeniden kare üretimi Hasan'ın
  ayrı kararıdır; oturum kendiliğinden yeniden üretmez.

**Oturum yapmaz:** `books.ts` ve diğer kod dosyalarına dokunmaz, dosya adını
değiştirmez, yeni görsel yeri açmaz (o aktarımın işidir), commit atmaz.

---

## 7. Diğer görsel klasörleri (27 Temmuz 2026 kurulumu)

**Ödül görselleri 512×512 şeffaf PNG'dir** (REVİZE 7 Ağu 2026 — PROJE-MODELI
6.1; eskiden SVG'ydi). Eskisini silip aynı adla yenisini atmak yeterlidir.

| Klasör | Kalıp | Kurulan | Not |
|---|---|---|---|
| `public/rozetler/hz-{bookKey}/` | `bolum-{n}.png` | **39** | âdem 8 + şît 4 **gerçek** (11 Ağu 2026) · idrîs 4 **yer tutucu** (12 Ağu 2026) · nûh 8 **gerçek** (13 Eki 2026) · musa 10 **kare, çerçeve bekliyor** (13 Eki 2026) · eyyûb 5 **kare, çerçeve bekliyor** (15 Eki 2026). Hedef 34 (İlk İzler Vadisi): + hûd 5, sâlih 5 — bu ikisinin klasörü **henüz yok**, içerikleri `books.ts`'e aktarılınca betik açacak |
| `public/madalyalar/` | `hz-{bookKey}.png` | **6** | âdem + şît **gerçek** (11 Ağu 2026) · idrîs **yer tutucu** (12 Ağu 2026) · nûh **gerçek** (13 Eki 2026) · musa **kare, çerçeve bekliyor** (13 Eki 2026) · eyyûb **kare, çerçeve bekliyor** (15 Eki 2026). İlk İzler Vadisi hedefi 6 |
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
