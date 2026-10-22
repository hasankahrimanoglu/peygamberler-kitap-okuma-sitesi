# PROJE MODELİ — Peygamberler Keşif Dünyası

> Marka adı: **Peygamberler Keşif Dünyası** (11 Temmuz 2026 kararı;
> ileride değişebilir, tüm ekranlarda tek kaynaktan yönetilmeli).

> Bu doküman projenin anayasasıdır. Tasarım, terminoloji, özellik kararları,
> veri modeli ve görsel varlık kuralları burada sabitlenir. Bir karar
> değişecekse önce bu doküman güncellenir, sonra kod değişir.
>
> Esin kaynağı: `chatgpt-tasarim/` klasöründeki 22 arayüz görseli ve
> `chatgpt.md` içindeki değerlendirme. Birebir kopya değil; oradan
> beğenilen renk dili, kart yapısı ve kurgu alınır, kararlar burada verilir.

---

## 1. Ürün Tanımı

İki yüzü olan tek ürün:

- **Çocuk tarafı:** Kitap haritası üzerinde ilerleyen, bölüm bölüm okunan,
  seçim ve görevlerle derinleşen bir okuma yolculuğu. Uygulama gibi davranır:
  az menü, büyük buton, az metin, tek görev odaklı ekranlar.
- **Veli tarafı:** Profil yönetimi, okuma takibi, gelişim raporu ve aile içi
  sohbeti besleyen öneriler. Bilgi paneli gibi davranır: sekmeler, filtreler,
  sakin görünüm.

Ürünün değeri hız ve oyunlaştırma değil; **okuma → düşünme → uygulama →
aile içi konuşma** döngüsüdür. Duolingo tarzı puan, seri (streak) ve bildirim
baskısı bilinçli olarak YOKTUR.

Hedef yaş grubu: **8–11**. Tüm içerik ve arayüz dili bu aralığa göre yazılır.

İçerik kataloğunda sabit bir üst kitap sınırı yoktur. İlk yayın omurgası,
peygamber yolculukları ile Dört Büyük Halife kitaplarını kapsayan **35 dijital
kitap** olarak planlanır; güvenilir kaynak ve editoryal ihtiyaç oluştuğunda
katalog büyüyebilir. Kitaplar kaynak yoğunluğuna göre **4–10 bölüm** arasında
değişir. Fiziksel kaynak cildi ile dijital kitap birebir aynı olmak zorunda
değildir: aynı PDF'deki isimler ayrı dijital kitaplara ayrılabilir, kısa anlatı
yalnız sayıyı doldurmak için uzatılmaz. Kesin sıra, keşif bölgeleri ve hedef
bölüm sayıları `KITAP-KATALOGU-VE-URETIM-PLANI.md` belgesinde tutulur.

Tüm arayüzler büyüyen katalogda da okunabilir kalmalıdır; ana atlas tek ekranda
onlarca kitabı düz bir kilit zinciri hâlinde göstermez, kitapları çocuk dostu
keşif bölgelerinde gruplar. İlk katalog bölgeleri sırasıyla **İlk İzler
Vadisi**, **Bereketli Aile Yolu**, **Sabır ve Cesaret Geçidi**, **Hikmet
Sarayları**, **Umut Işıkları Diyarı**, **Rahmet Yolculuğu** ve Dört Büyük
Halife'yi ayrı tür olarak belirten **Emaneti Taşıyan Dört Dost**tur.

Cihaz önceliği: **1) Tablet yatay, 2) Tablet dikey, 3) Mobil dikey, 4) Masaüstü.**
Uzun okuma cihazı tablettir; telefon "kısa okuma ve devam etme" cihazıdır.

---

## 2. Terminoloji Sözlüğü (SABİT)

Tüm ekranlarda, kodda ve metinlerde yalnızca bu üç kavram kullanılır:

| Kavram | Ne zaman kazanılır | Örnek |
|---|---|---|
| **ROZET** | Her bölüm tamamlandığında | Sabır Rozeti, Bilgi Rozeti, İlk Adım Rozeti |
| **MADALYA** | Kitabın tüm bölümleri + Büyük Final Testi bitince | Hz. Âdem Yolculuk Madalyası |
| **UNVAN** | Genel ilerleme eşiklerinde (tamamlanan kitap sayısı) | Yeni Gezgin, Yol Kaşifi |

Kurallar:
- "Nişan", "ödül rozeti", "kitap rozeti" gibi karışık ifadeler YASAK.
- Madalya **tek tiptir**. Altın/gümüş/bronz kademesi YOK (çocuğu
  derecelendirmek felsefeye aykırı).
- Unvan **puana değil**, tamamlanan kitap sayısına bağlıdır. Puan sistemi YOK.

### Unvan eşikleri (GÜNCELLENDİ — 25 Temmuz 2026, Hasan onayı)

35 kitaplık ilk katalog omurgasına göre uzatıldı. Önceki tablo 15. kitapta
bitiyordu; katalog 35 kitaba çıkınca son 20 kitap işaretsiz kalıyordu. Puan ve
seri bilinçli olarak bulunmadığı için unvan, çocuğun tek uzun vadeli
ilerleme işaretidir.

| Tamamlanan kitap | Unvan |
|---|---|
| 0 | Yeni Gezgin |
| 1 | Yol Kaşifi |
| 3 | Değer Toplayıcısı |
| 6 | Yol Arkadaşı |
| 10 | Bilge Yolcu |
| 15 | Hikâye Ustası |
| 20 | Emanet Koruyucusu |
| 25 | Işık Taşıyıcısı |
| 30 | Kıssa Rehberi |
| 35 | Büyük Yolculuk Kaşifi |

> **Ad değişikliği (12 Ekim 2026, Hasan):** 25. eşik "Atlas Bilgini" →
> **"Işık Taşıyıcısı"**, 35. eşik "Yedi Bölge Kaşifi" → **"Büyük Yolculuk
> Kaşifi"**. Gerekçe: keşif bölgeleri ve atlas metaforu arayüzden kalktı
> (3.10). "Işık Taşıyıcısı" rehber karakter Işıl ile bağ kurar; "Büyük Yolculuk
> Kaşifi", 1. eşikteki "Yol Kaşifi" ile yolculuğun başını ve sonunu eşler.
> Eşik sayıları değişmedi.

Tek kaynak `src/lib/derive.ts` içindeki `UNVAN_ESIKLERI` tablosudur;
`unvanFromBookCount()` bu tabloyu okur (eşikler ikinci kez kodlanmaz).
Görsel dosyası gerekmez: anahtar unvan adından türetilir ve yol
`varlikYollari.ts:unvanGorseli()` ile kurulur —
`public/unvanlar/{anahtar}.png` (ör. `unvanlar/emanet-koruyucusu.png`;
**`unvan-` öneki yoktur**). Dosya yoksa `unvanlar/placeholder.svg` gösterilir.

> **Not:** Yayına girecek nihai kitap sayısı henüz kesin değildir (20 veya 35
> olabilir). Sayı netleştiğinde bu tablo yeniden gözden geçirilir; özellikle
> son eşik "Büyük Yolculuk Kaşifi" bütün kataloğun tamamlanmasına gönderme yapar.

- "Altın Yol Arkadaşı" ChatGPT görsellerinde üç farklı anlamda kullanılmıştı;
  bizde **kullanılmaz** ya da yalnızca tek bir madalya adı olarak kullanılabilir.

---

## 3. Tasarım Sistemi

İki ayrı görsel dünya, ortak kurallarla bağlanır.

### 3.1 Renk dünyaları

**Veli tarafı (sakin, güven veren):**
- Zemin: krem (#FAF6ED civarı)
- Vurgu: nane/açık yeşil (#E8F3EA zeminler, #2E7D5B aksiyon)
- Başlık: sıcak kahve (#4A3426 civarı)
- Altın: rozet/madalya vurgularında (#C9A227 civarı)
- İkincil metin (`--murekkep-soluk`): **#7D6656** *(REVİZE — 20 Eki 2026,
  Hasan: eski #8A7260 sayfa zemininde 4,18:1, bej iç panelde 3,87:1 veriyordu;
  normal metin için erişilebilirlik sınırı 4,5:1. Yeni değer zeminde 4,98,
  kartta 5,29, bej panelde 4,61. E-posta şablonundaki aynı renk de değişti.)*

> **REVİZE — 22 Eki 2026 (Hasan, veli paneli yeniden tasarımı; bkz. 3.8, 3.9,
> 5.2 ve Karar Kaydı):** veli paneli (`/dashboard`) kendi kalibre edilmiş
> paletini kullanır; değerler `src/components/veli/veliPaneli.module.css`
> `.tema` sınıfındadır (tek kaynak), Tailwind'de `veli-*` renkleri olarak
> çağrılır. Krem–yeşil–altın kimliği korunur; üç fark vardır:
> - **Gece mavisi köprü** (#172350): karşılama kartı ve ≥1024 px yan menü.
>   Çocuk dünyasının gecesiyle aynı aile, panelde yalnız çerçeve/vurgu alanı.
> - **Daha net mürekkep:** başlık #271E17, gövde #4A3C31, ikincil #6E5C4D
>   (kartta 6,3:1). Altın (#C9982E) krem üstünde yalnız ikon ve çizgidir;
>   altın renkli metin #8A6416'dır (5,3:1).
> - **Sohbet tonu** (kiremit #A4492D + açık zemin): yalnız aile sohbeti
>   alanlarında. Renk tek başına anlam taşımaz; her tonun yanında ikon vardır.
> - Kenar çizgisi yerine iki katlı yumuşak gölge; kart içinde kart yok.
> Giriş, şifre ve tanıtım sayfaları `.tema-veli` değerlerinde kalır (tonlar
> yakın); birleştirme ayrı bir karardır.

**Tailwind opaklık eki (DÜZELTME — 20 Eki 2026).** Tema renkleri `var(--x)`
olduğu için Tailwind 3 `border-eylem/30` gibi sınıfları hiç üretmiyordu: veli
panelinde 24 sınıf boştu (metin kutularında varsayılan **mavi** odak halkası,
saydam üst şerit ve alt menü, gri kenarlar). Renkler `tailwind.config.ts`'te
fonksiyonla tanımlanır: ek yoksa düz `var(--x)`, ek varsa `color-mix` yüzdesi.
Opaklık eki artık her tema renginde kullanılabilir.

**Çocuk tarafı (macera):**
- Zemin: gece indigosu (#17275C) + yıldız dokusu
- Kart zemini: indigonun bir ton açığı, altın konturlu
- Okuma yüzeyi: krem (#FBF6E9) — uzun metin daima açık zemin üzerinde
- Vurgu: altın (#F5C65A) ve yeşil (#34A06B)

**GECE İNDİGOSU / KATMAN AYRIMI (REVİZE — 6 Ağustos 2026, Hasan).** Çocuk
tarafının koyu zemini `#0E1A34`'ten (uygulamada `#0a1428`) **`#17275C` gece
indigosuna** taşındı. Gerekçe üç maddedir:
- **Kroma.** Eski değerin mavisi algılanmıyordu; ekranda siyaha yakın, "koyu
  tema panel" tonundaydı. 8–11 yaş için gece gökyüzü, siyah değil **indigo**
  olmalı — renk çeşidi çocuk arayüzünde canlılığın asıl kaynağıdır, parlaklık
  değil.
- **Katman ayrımı.** `zemin → yüzey → yüzey-2` arasındaki açıklık farkı 5–6
  puandı ve bar'lar %78–82 opaklıkla bindiği için fark iyice kapanıyordu; üst
  bar, bölge şeridi ve sayfa tek düz kütle gibi okunuyordu. Ağırlık hissinin
  kaynağı karanlık değil **bu düzlüktü.** Yeni palette katmanlar arası fark
  belirgin açılır.
- **Sönük ikincil metin.** `--murekkep-soluk` gri-maviydi (#9FACC7); üst bar
  menü etiketleri "ayarlar menüsü" tonunda kalıyordu. Yeni değer okunur.

Bu revizyon **KOYU ÇERÇEVE / AYDINLIK SAHNE kararını değiştirmez** — çerçeve
hâlâ koyudur, sahne hâlâ aydınlıktır. Yalnız çerçevenin tonu kalibre edilmiştir.

**Kilitli durum RENGİ ÖLDÜRMEZ (aynı karar).** Kilitli/hazırlanıyor durakların
kapak görseli `grayscale` ile griye çevrilMEZ; koyu zeminde kapaklar siyah
deliğe dönüşüyordu ve bir bölgede duraklarının çoğu kilitli olduğu için harita
ölü görünüyordu. Yerine **hafif doygunluk düşürme + parlaklık koruma +
saydamlık** kullanılır: öğe geri çekilir ama rengini korur. Durumun asıl
anlatıcısı kilit ikonu ve açılma şartı metnidir, renksizlik değil.

**Yıldız dokusu görünür olmalıdır.** `.zemin-yildizli` dokusu 520px döşemede 8
noktaydı — %100 yakınlıkta ekrana pratikte hiç çıkmıyordu, yani "gece gökyüzü"
kimliği yalnız belgede vardı. Doku 21 yıldıza çıkarılır ve üç farklı döşeme
ölçüsüne (340 / 520 / 780px) dağıtılır; ölçüler birbirine tam bölünmediği için
tekrar örüntüsü gözle yakalanmaz.

**Yıldız PARILDAMAZ — bilinçli karar.** Parıltı ilk planda vardı, uygulanmadı:
tek yolu ya tam ekran arka planı her karede yeniden boyamak (hedef cihaz tablet;
sürekli repaint pahalı) ya da `.zemin-yildizli`'ye pseudo-element katmanı eklemek
— ki bu utility dört ayrı sayfada farklı konumlandırma bağlamlarında kullanılıyor
ve yığılma sırası kırılgan olurdu. Kazanç (ince bir hareket) maliyeti karşılamaz.
Yeniden ÖNERİLMEZ; istenirse ayrı bir kararla ele alınır.

> **REVİZE — 12 Ekim 2026 (bkz. 3.10.1):** Ana ekran sahnesi artık parlak
> gündüz değil, derin yeşil bir "akşamüstü çayırı"dır (Hasan: koyu zeminde kitap
> yuvarlakları daha güzel duruyor). Sahne yine karanlık/siyah değildir; renkli,
> sıcak ışıklı ve okunaklıdır. Okuma ekranı krem kalır.

**KOYU ÇERÇEVE / AYDINLIK SAHNE (REVİZE — 29 Temmuz 2026, Hasan).** Çocuk
tarafı baştan sona koyu DEĞİLDİR. Keşif haritasında ayrım şudur:
- **Çerçeve koyu kalır:** üst bar, bölge şeridi, Keşif İskelesi. Haritayı
  çerçeveler, kontrast verir, gece-yıldız kimliğini taşır.
- **Sahne aydınlıktır:** bölge manzarası gündüz, canlı yeşil/mavi bir
  illüstrasyondur. 8–11 yaş için baştan sona karanlık bir harita davetkâr
  değil.
- **Sahne KARARTILMAZ.** Yalnız bölge başlığının oturduğu üst şerit korunur;
  gerisi serbest bırakılır. Okunabilirlik yükünü öğelerin kendisi taşır:
  ad kartı krem zemin, madalyonun altında hâle ve yere oturma gölgesi, yolun
  kendi koyu dış hattı. Doygunluk düşüren genel filtre KULLANILMAZ — aydınlık
  illüstrasyonun en değerli yanını (canlı renk) alıp götürür.
- **Harita ad kartları krem zemin + koyu lacivert yazıdır**, kart genişliği
  ada göre daralır. Koyu kart aydınlık manzarada ya çamurlaşıyor ya da ağır
  duruyordu; krem kart hem manzarayla uyumlu hem de "okunacak metin daima
  krem zeminde" kuralıyla aynı dilde.
- Okuma ekranı bu karardan ETKİLENMEZ; orası krem kalır.

Kesin renk değerleri Faz 1'de `chatgpt-tasarim/` görsellerinden örneklenip
Tailwind config'e token olarak yazılır. Renkler tek kaynaktan yönetilir;
sayfa içine gömülü hex değeri bırakılmaz.

### 3.2 Ortak kurallar (iki dünyada aynı)

- Aynı köşe yuvarlaklığı ölçeği, aynı ikon ailesi, aynı buton yüksekliği,
  aynı gölge mantığı, aynı rozet/madalya çizim stili.
- Başlıklarda yuvarlak hatlı font; paragraf ve hikâye metninde okunabilirliği
  yüksek sade bir font. Her yerde dekoratif font KULLANILMAZ.
  *(REVİZE 22 Eki 2026 — Hasan: **veli paneli** başlıkları Literata'nın optik
  boyutlu kesimi (tanıtım sayfası başlıklarıyla ve hikâye yazısıyla aynı aile),
  arayüz metni Figtree. Yuvarlak başlık fontu çocuk dünyasında kalır. Fraunces
  ve Newsreader Türkçede "fi" harflerini bitiştirip ı/i farkını bozduğu için
  elendi. Yazılar `src/components/veli/yazilar.ts`'te tanımlıdır.)*
- Dekorasyon (kandil, yıldız, süsleme) bölüm kapağında güçlü, hikâye
  sayfalarında hafif. Odak daima içerik.

### 3.3 Buton anlamları (semantik, sabit)

| Renk | Anlam |
|---|---|
| Yeşil | devam et, tamamla, onayla |
| Altın | başla, ödül, final |
| Lacivert / nötr | ikincil işlem (Kitap Detayı vb.) |
| Çerçeveli (ghost) | geri, iptal |
| Kırmızı | silme ve tehlikeli işlem |

### 3.4 Durum dili (kitap ve bölüm kartları)

| Durum | Görünüm | Buton |
|---|---|---|
| Tamamlandı | onay işareti + madalya/rozet | Tekrar Oku |
| Devam ediyor | ilerleme çubuğu | Devam Et |
| Yeni açıldı | hafif parlama | Yolculuğa Başla |
| Kilitli | düşük kontrast + kilit | buton yok; açılma şartı AÇIKÇA yazılır |

Kilit açıklaması somut olur: *"Hz. Nuh yolculuğu, Hz. Âdem kitabının finalini
tamamladığında açılacak."* ("Önceki görevleri bekliyor" gibi soyut ifade yasak.)

> **REVİZE — 12 Ekim 2026 (bkz. 3.10.2):** Kitap düzeyindeki "Kilitli" durumu
> kalkıyor; yayındaki bütün kitaplar açıktır. Kilit yalnız **bölümler** (bölüm N,
> N−1 bitmeden açılmaz) ve **Büyük Final Testi** için kullanılır; somut açılma
> şartı kuralı orada aynen geçerlidir ("2. bölüm, 1. bölümü bitirince açılacak").
> Yayında olmayan kitap kilitli değil **yakındadır** ve rotada tek kartta
> toplanır. Uygulama Faz C'dedir; o zamana kadar kod eski kuralı izler.

### 3.5 Dokunma ve ölçü standartları

- Buton yüksekliği ≥ 48px, dokunma alanı ≥ 44×44px
- Gövde metni ≥ 16px; mobil yatay boşluk 16px, tablet 24–32px
- Mobilde metin ve görsel yan yana KONMAZ; tek sütun.

### 3.6 Masalsı Keşif Atlası yönü (ONAY — 16 Temmuz 2026)

> **REVİZE — 12 Ekim 2026 (bkz. 3.10):** Okuma ekranında koyu çerçeve, tam
> ekran bölüm kapağı, ince ilerleme çizgisi, durak üst etiketleri ve "Okuma
> Araçları" menüsü değişti (3.10.3, **Faz B uygulandı**); harita ve bölüm rotası
> tek dikey rotaya döndü (3.10.1, **Faz C uygulandı**). Aşağıdaki maddelerin
> bunlarla çelişen kısmı tarihsel kayıttır. Krem okuma yüzeyi, serif hikâye
> metni, tek sütun kaydırma ve "Sen Olsaydın" kapısı **değişmedi.**

Çocuk tarafının harita, bölüm rotası ve Hz. Âdem okuma ekranında ortak görsel
yön **“Masalsı Keşif Atlası”**dır:

- Harita, büyük dashboard kartları yerine kıvrımlı yol üzerindeki keşif
  duraklarından oluşur; katmanlı gece göğü, dağ, nehir, bitki ve pusula
  ayrıntıları responsive CSS ile kurulur.
- Tablet yatay ve masaüstünde harita baskın alanda, seçili kitap bilgisi sağdaki
  sabit paneldedir. Tablet dikey ve mobilde bilgi paneli haritanın altına inmez;
  bir kitap durağına dokunulduğunda sağdan açılan, arka planı örten ve
  “Haritaya Dön” eylemiyle kapanan drawer olarak gösterilir.
- Kitap detayında bölümler, aynı atlas dünyasında kıvrımlı bölüm rotası olarak
  gösterilir; kilit koşulları somut yazılır.
- Hz. Âdem okuma ekranında üst bar ve okuma yüzeyi aynı genişlikte hizalanır.
  **Kaydırmalı akışta metin tek sütundur (REVİZE — 26 Temmuz 2026):** illüstrasyon
  metnin yanına değil, akışın içine, ait olduğu sahnenin geldiği yere yerleşir.
  Geniş ekranda görsel metin sütunundan taşabilir; dar ekranda kullanılabilir
  genişliği doldurur. Metin ve görsel hiçbir kırılımda yan yana konmaz.
- Bölüm başlığı akışın en üstünde bir kez görünür; kaydırma başlayınca üst barda
  daralmış hâlde (bölüm adı + aktif durak) sabit kalır. Yinelenen
  “Hikâye · 1. Kısım” üst etiketi kullanılmaz. Başlık düzeni yalnızca
  **bölüm adı + kitap adı ve bölüm numarası** bilgisini taşır.
- Uzun hikâye metninde yüksek okunabilirlikli edebî serif yazı ailesi kullanılır.
  Hedef gövde ölçüsü **mobilde yaklaşık 17,5px (REVİZE — 27 Temmuz 2026)**, tablet
  dikeyde 21–22px, tablet yatayda 22–23px, masaüstünde 23–24px'tir; satır uzunluğu
  geniş ekranlarda yaklaşık 60–64 karakterle sınırlandırılır. Kısa hikâye sayfaları
  kullanılabilir alan varsa bir kademe büyüyebilir; uzun sayfalar temel ölçünün
  altına inmez.
  *Mobil revizyonun gerekçesi:* 19px'te satıra yalnız 3-4 kelime sığıyor, satır
  başına ~26 karakter düşüyordu; okuma sürekli bölünüyordu. 17,5px ve daraltılmış
  kenar boşluklarıyla satır başına ~33 karaktere çıkıldı. Değer, Bölüm 3.5'teki
  **16px gövde metni tabanının** üstünde kalır.
- Hikâye içindeki önemli kelime ve kısa ifadeler renk değiştirilerek veya altı
  çizilerek vurgulanmaz; metin doğal tipografik akışını korur. Anahtar cümle,
  editoryal olarak gerekli olduğunda ince altın sol çizgili sakin bir kutuyla
  paragraf düzeyinde ayrıştırılabilir.
- **Bölüm tek sayfada kesintisiz kaydırılır (REVİZE — 26 Temmuz 2026, Hasan onayı;
  bkz. 5.1 "Bölüm içi akış" ve Faz 6.2).** Önceki kural bölümü karakter bütçesine
  göre sayfalara bölüyordu; ~4.000 karakterlik bir bölüm 9–12 okuma sayfasına
  çıkıyor, akış sayfalarıyla birlikte bölüm başına 14–17 kez ileri basma
  gerekiyordu. 8–11 yaş için bu, okuma akışını sürekli kesiyordu. Yeni kural:
  bölümün tamamı tek bir kaydırma akışıdır; sayfa bölme, sayfa çevirme ve iç
  kaydırma alanı kullanılmaz. Metin alt kısımda maske ile görünmez hâle
  getirilmez.
- Kaydırmalı akışta **ilerleme geri bildirimi zorunludur.** Sayfa göstergesinin
  ("Sayfa 3 / 12") kaldırılması çocukta "ne kadar kaldı" belirsizliği yaratır; bu
  boşluk üstteki ince ilerleme çubuğu ve aktif durak adıyla kapatılır. İlerleme
  göstergesi süs değil, sayfa metaforunun kaldırılmasının telafisidir.
  *(REVİZE — 12 Eki 2026, Faz B: ince çubuk ve durak adının yerini adım çubuğu
  / adım sütunu aldı; telafi kuralı aynen geçerli — bkz. 3.10.3.)*
- Hz. Âdem Büyük Final Testi de aynı atlas dünyasında gösterilir: ortak keşif
  üst barı, katmanlı gece/doğa zemini ve krem soru yüzeyi kullanılır. Seçenekler
  tek sütunda kalır; onay/devam eylemleri yeşil, sonucu görme ve ilk madalya
  kutlaması altın semantiğini korur. Alıştırma girişi ve sonucu açıkça
  "Alıştırma" olarak ayrışır; kayıtlı final sonucu, madalya, ilerleme ve
  `updated_at` davranışı görsel değişiklikten etkilenmez.
- “Sen Olsaydın?” sorusu ile seçenekler alt alta yerleşir. Seçenek grubu geniş
  ekranlarda metni gereksiz boşlukla çevrelemeyecek biçimde en fazla 620px'tir;
  dar ekranlarda kullanılabilir genişliğe uyum sağlar. Mobil ve tablet dikeyde
  “Sen Olsaydın?”, “Seçimini Karşılaştır” ve “Rozet Kapısı” ana başlıkları alt
  açıklamalardan belirgin biçimde büyük tutulur; içerik grubu yatayda ortalanır.
- Production rotalarında “Tasarım Önizlemesi” etiketi kullanılmaz. Önizleme
  rotaları tasarım karşılaştırması için ayrı kalabilir.
- Bu entegrasyonun içerik referansı yalnızca Hz. Âdem'dir. Önceki Nuh ve Dört
  Halife demo okuyucuları korunmaz; 21 Temmuz 2026 tarihli Bölüm 3.7 kararıyla
  ürün rotalarından çıkarılıp katalogda **Hazırlanıyor** durumuna alınmıştır.

### 3.7 Keşif Bölgeleri ve kitap kataloğu (ONAY — 21 Temmuz 2026)

> **REVİZE — 12 Ekim 2026 (bkz. 3.10.1):** Keşif bölgeleri ve bölge adları
> arayüzden **kalkıyor**; kitaplar tek dikey rotada katalog sırasıyla dizilir,
> yayında olmayan kitap görünmez. Bölgeler yalnız editoryal gruplama ve üretim
> dalgası olarak katalog belgesinde kalır. **Faz C 12 Ekim 2026'da uygulandı:**
> 3.7, 3.7.1, 3.7.2 ve alt bölümleri artık **tarihsel kayıttır**; tarif ettikleri
> bileşenler (`AtlasHarita`, `KitapBolumRotasi`, `KesifMenusu`, `KesifIskelesi`)
> silindi. Geçerli ana ekran 3.10'dadır.

Masalsı Keşif Atlası artık tek bir kısa kitap yolundan değil, iki seviyeli bir
katalogdan oluşur: **Keşif Bölgesi → Kitap Durağı**. Bölge ve kitap sırası
`KITAP-KATALOGU-VE-URETIM-PLANI.md` belgesindeki 7 bölge / 35 kitap planını
izler; arayüzün tek veri kaynağı `src/data/atlasCatalog.ts` olur.

- Bölge seçici, çocuğun atlas içinde nerede bulunduğunu açıkça gösterir. Seçilen
  bölgenin kitapları kıvrımlı bir rota üzerinde görünür; hazırlanan kitap paneli
  aynı ekranda kitabın adı, kısa tanıtımı ve bölüm sayısını gösterir.
- **Durak yerleşimi (REVİZE — 25 Temmuz 2026, Hasan onayı).** Önceki kural
  sabit üç terasa ve elle yazılmış konumlara dayanıyordu; yol her bölgede altı
  duraklık çizildiği için 4 kitaplık bölgelerde altta sahipsiz bir çizgi
  kalıyordu. Yeni kural:
  - **Yol duraklardan türetilir.** Önce durak konumları hesaplanır, sonra
    noktalardan geçen akıcı eğri çizilir. Yol son durakta biter; sarkan uç
    oluşmaz ve kitap sayısı için istisna gerekmez.
  - **IZGARA KALDIRILDI — duraklar dalga üzerinde iner (REVİZE — 29 Temmuz
    2026, Hasan).** Önceki kural sıra/sütun ızgarasıydı: bir sıradaki 2–3 kitap
    tam aynı yükseklikteydi. Bu haritaya tablo görüntüsü veriyor, sıra
    sonlarında keskin dönüş üretiyor ve aynı bölge geniş ekranda 3 sütun, dar
    ekranda 2 sütun olduğu için cihazdan cihaza başka bir şekle bürünüyordu.
    Yeni kural:
    - Kitaplar **dikeyde eşit aralıkla iner**, yatayda bir dalga üzerinde
      salınır. **Hiçbir iki durak aynı hizada değildir.**
    - Dalga geniş ekranda **dört duraklıktır** (sağ → orta → sol → orta), dar
      ekranda **iki duraklık** (sol ↔ sağ). Gerekçe farklıdır: geniş ekranda
      dört duraklık dalga bir ayağın yatay yolunu yarıya indirip eğimi
      dengeler; dar ekranda ise dikey adım ~65px'e düştüğü için komşu ad
      kartlarını ancak **yatay** mesafe ayırabilir ve iki duraklık dalga bu
      mesafeyi iki katına çıkarır.
    - **Son kitap 4, 5 ve 6 kitaplık bölgelerin hepsinde SAĞDA biter** —
      eşleştirme sondan kurulur. Tek yan etki: 5 kitaplık bölge soldan değil
      sağdan başlar.
    - **Kaydırma gerekmez.** Dikeyde çakışma riski komşu duraklar arasında
      değil, **aynı x'teki** duraklar arasındadır; komşular yatayda zaten
      ayrıdır. Bu yüzden dikey adım bir kartın tam boyu kadar değil **yarısı**
      kadar olmak zorundadır ve 6 kitap her kırılımda tek ekrana sığar. 35
      durağı yedi bölgeye bölme kararı (25 Tem 2026) böylece korunur.
    - Dikey aralık en dar iki duruma göre kalibre edilir: üst sınır **alt
      başlığı olan** bölgelere, alt sınır **adı iki satıra saran** kitaplara.
      Alt başlık, sahnenin 510–610px'e indiği kırılımlarda (tablet yatay ve
      mobil) gizlenir.
  - **Her durak tek bir işarettir:** daire + ayrı etiket kartı yerine, kitabın
    kapak görselini taşıyan madalyon + durum rozeti. Kapak haritada ilk kez
    burada görünür. **Sıra numarası rozeti KALDIRILDI (KARAR — 29 Temmuz 2026,
    Hasan):** sırayı yolun kendisi anlatıyor, madalyonun üstünde ikinci bir
    işaret kalabalık yapıyordu. Sıra bilgisi ekran okuyucuda `aria-label`
    içinde korunur.
  - **Durak noktası MADALYONUN merkezidir (KARAR — 29 Temmuz 2026, Hasan).**
    Ad etiketi akıştan çıkarılıp madalyonun altına mutlak konumlandırılır.
    Öncesinde etiket de akıştaydı ve nokta "madalyon + etiket" bloğunu
    ortalıyordu; madalyonun merkezi noktanın ~30px yukarısında kalıyor, yol
    yuvarlağın altından geçiyordu. Yan kazanç: iki satıra saran adlar (Rahmet
    Yolculuğu) artık madalyonu yukarı itmiyor. Etiketin tamamı noktanın altına
    sarktığı için dikey sınırlar da yeniden ayarlandı.
    Madalyonun altında **yumuşak bir yere oturma gölgesi** vardır: işaretçi
    havada asılı durmaktan çıkıp yolun üstüne oturur.
  - **Aktif durak nefes alır (KARAR — 29 Temmuz 2026, Hasan).** Madalyonun
    ÇEVRESİNDE bir altın halka yavaşça açılıp solar (~2,8sn). 27 Tem'de
    kaldırılan `activePulse`ın geri dönüşü değildir: o, madalyonun kendisini
    büyütüp küçültüyor ve komşu etiketleri itiyordu; bu halka yerleşime hiç
    dokunmaz. **Halka madalyonun sözde-öğesidir**, durak butonunun değil:
    durak seçildiğinde madalyon 3px kalkıp %6 büyüdüğü için, halka butona
    bağlıyken eş merkezli olmaktan çıkıyor ve alttaki boşluk üstündekinden
    büyük görünüyordu. Aynı öğeye bağlı olunca dönüşümü paylaşırlar. Vurgu **aktif** duraktadır, seçili durakta değil — vurgulanan
    şey "tıkladığın kitap" değil **"şimdi okunacak kitap"**. Fener ışığı da
    aynı durağa koştuğu için ikisi tek cümle kurar: yol buraya gidiyor.
    `prefers-reduced-motion` açıkken halka kalır, yalnız nefesi durur — halka
    bir durum göstergesidir, animasyon süsü değil.
  - **Kitap adı iki satıra sarar, kesilmez.** Önceki sabit genişlik + tek satır
    kuralı Rahmet Yolculuğu'nun dört kitabını da "Hz. Muhammed —…" hâline
    getiriyordu. Kart genişliği ADA GÖRE daralır (üst sınır korunur): sabit
    genişlikte "Hz. Şît" kocaman bir kutunun ortasında kalıyordu.
  - **Haritadaki kartta YALNIZ AD vardır (KARAR — 29 Temmuz 2026, Hasan).**
    Durum metni ("Tamamlandı / Yeni Açıldı / Hazırlanıyor") kaldırıldı: aynı
    bilgiyi madalyonun üstündeki durum rozeti gösteriyor, kitap paneli de
    tekrar ediyordu. Harita ferahladı, kartın dikey payı ~17px azaldı ve o pay
    madalyon büyütmesine gitti. Durum bilgisi ekran okuyucuda `aria-label`
    içinde korunur; Bölüm 3.4'ün durum dili panelde aynen geçerlidir.
  - **Yol bir ÇİZGİ değil, PATİKADIR (KARAR — 29 Temmuz 2026, Hasan).** İnce
    kesik çizgi yerine geniş kum rengi bir şerit + koyu dış hat + üstünde
    beyaza yakın kesikli orta çizgi. Asıl "yol" hissini veren şey budur; yön
    karmaşası da bununla kaybolur, çünkü göz çizgiyi değil yolu takip eder.
    Gövde **tek parça** çizilir (parçalara bölünse yarı saydam uçlar birleşme
    yerlerinde koyu ek izi bırakırdı); uzaklığa göre solma orta çizgide yaşar.
    **Yol genişliği madalyona göre ayarlanır** — hedef oran madalyon : yol
    ≈ 3,3. Şerit kalınlaşırsa madalyonu ezer; madalyonu büyütmek çözüm
    değildir, çünkü yerleşim payı masaüstünde ve tablet yatayda birkaç
    piksele inmiştir ve büyüme doğrudan çakışmaya gider.
    Tamamlanan kısım ayrı bir çizgi değil, **yolun yeşile boyanmış hâlidir**.
    Aktif durak altın halkayla, kilitli ve hazırlanan duraklar
    soluklaştırmayla gösterilir. Yol ad etiketlerinin üzerinden geçmez.
  - **Yol düz çizgi değil, hafif yay çizer.** Kavis, kontrol noktasına değil
    **geometriye** eklenir: iki durağın ortasına ayağın dikine bir kavis
    noktası girer ve eğri o noktadan geçer. Kontrol noktası yöntemi denendi ve
    bırakıldı — her ayak bağımsız kamburlaştığı için durakların tam üstünde
    teğet kırılıyor, aşağı bakan bir **V çentiği** oluşuyordu. Kavis daima
    yukarıdır; ad kartları madalyonun altında durur, aşağı kavis onların
    üstünden geçerdi.
  - **Yol SVG'si sahnenin birebir piksel ölçüsünde çizilir.** Önceki 100×100
    viewBox `preserveAspectRatio="none"` ile esniyordu ve bunun iki bedeli
    vardı: kavis payı yatay ve dikeyde farklı görünüyor, `pathLength` ile
    `non-scaling-stroke` birlikte çalışmadığı için **fener ışığı tek ışık
    yerine yol boyunca tekrarlayan lekelere bölünüyordu**. Ölçü `ResizeObserver`
    ile okunur; callback ref kullanılır, çünkü bölge verisi eşzamansız gelir ve
    boş bağımlılıklı bir effect ilk render'da sahneyi DOM'da bulamaz.
  - **Kalan yol solarak sıralanır + akar + sıradaki parçada fener yanar
    (KARAR — 29 Temmuz 2026, Hasan).** Üç katman birlikte çalışır:
    1. **Solma (renk).** Orta çizgi tek düz renk değildir: sıradaki durağa giden
       parça en parlak, her parçada bir kademe soluklaşır. Orta çizgi parça
       parça çizilir, her parça kendi `linearGradient`ini taşır ve gradyan
       parçanın kendi iki ucuna bağlanır — tek yatay gradyan kullanılsaydı
       dalganın sağdan sola akan ayaklarında renk ters dönerdi. Alt sınır 0.40:
       aşağısında çizgi aydınlık sahne bölgelerinde büsbütün kayboluyor.
       **Yol gövdesi solmaz** — zemin gibi hep durur, yön bilgisini üstündeki
       çizgi taşır.
    2. **Akış (hareket).** Kısa tireler ilk duraktan son durağa doğru kayar.
       Kayma desenin tam periyodu kadardır, döngüde sıçrama olmaz. Hız bilerek
       düşük (≈4px/sn).
    3. **Fener ışığı (vurgu).** YALNIZCA aktif durağa giden parçada tek bir
       altın ışık süzülür, sonra ~2 saniye bekler. Yolun tamamına yayılan
       "koşan ışık" veya nabız efekti EKLENMEZ; sahne fotoğraf zeminin
       üzerinde durduğu için her yerde süren hareket göz köşesinde birikir.
    **Tamamlanan yeşil kısım animasyonsuz ve tek renktir** — akan yol
    "gidilecek yol", duran yeşil "gidilmiş yol" demektir. Bölgede aktif durak
    yoksa (tamamı hazırlanıyor) fener çizilmez ve solma sıralaması kurulmaz;
    yol baştan sona tek ve soluk bir değerde kalır. `prefers-reduced-motion`
    açık kullanıcıda akış durur, fener büsbütün kaldırılır (durdurulsaydı yolun
    ortasında sabit bir altın çubuk kalırdı); solma kalır, o renk animasyon
    değildir.
  - **Sahne görselinin üzerinde okunabilirlik katmanı vardır (KARAR — 29 Temmuz
    2026, Hasan).** Manzara görseli gün batımı ve su gibi aydınlık bölgelerde
    madalyonları ve altın yolu yutuyordu. Katman üç iş yapar: dikey kademe
    (başlığın oturduğu üst şerit ve ad etiketlerinin dizildiği alt şerit daha
    koyu, orta serbest), vinyet (köşeleri toplar, gözü sahnenin ortasındaki
    yola çeker) ve hafif doygunluk düşüşü (`backdrop-filter`; altın yol ile
    arka plandaki turuncu yarışmayı bırakır). **Görsel silinmez** — en açık
    bant %28 civarındadır, manzara okunmaya devam eder. Madalyon ölçeğinde
    aynı işi yumuşak koyu bir hâle tamamlar. Doygunluk düşüşünü desteklemeyen
    tarayıcıda sessizce düşer; okunabilirliği asıl sağlayan kademe ve vinyettir.
  - **Bölge sayacı sahnenin sağ üst köşesindedir** (dar ekranda sol alt).
    Bölgenin "ruh hâli" metni kaldırılmıştır; o köşede ayrı bir metin alanı
    kullanılmaz.
- **Hazırlanıyor**, ilerleme durumu değil içerik yayımlanma durumudur. Bu
  durakta ilerleme çubuğu, rozet/madalya sayısı veya eylem butonu gösterilmez;
  rota açılamaz. Tamamlandı / Devam ediyor / Kilitli dili yalnız yayımlanmış
  kitaplarda kullanılır.
- İlk yayındaki nihai referans Hz. Âdem'dir. **Hz. Şît 10 Ağustos 2026'da
  kaynaklı nihai içerikle yayına girdi** (4 bölüm + Büyük Final Testi); geçici
  demo metni ve ona ait tarayıcı içi (`localStorage`) ilerleme altyapısı
  kaldırıldı. İlerleme artık Hz. Âdem'le aynı yoldan Supabase'e yazılır.
  Kitap, Hz. Âdem finali bitmeden açılmaz.
- Önceki demo akışındaki Hz. Nuh, Hz. Ebû Bekir ve Hz. Ömer kitapları ürün
  rotalarından çıkarılmıştır. Katalogda kendi keşif bölgelerinde yalnız
  **Hazırlanıyor** olarak görünür; eski okuyucu ve bölüm yapısı kullanılmaz.
- **Sahne arka planı bölge başınadır (ONAY — 25 Temmuz 2026).** Her keşif
  bölgesinin kendi sahne görseli vardır: `public/bolgeler/bolge-{regionId}.png`.
  Görsel bölgenin katalogdaki "Görsel dünya" tarifini izler; figür, yüz, beden
  ve silüet içermez. Dosya yoksa kod bozulmaz — CSS katmanlı arka planla ortak
  görsele düşer, Hasan dosyayı aynı adla klasöre atınca kod değişmeden yayına
  girer (Bölüm 6 üretim akışı).
  **Kitap başına arka plan KULLANILMAZ:** durak seçilince sahne değişmez.
  Gerekçe — (a) alanın büyük kısmı madalyon ve etiketlerle örtülü, (b) kitabın
  kapağı zaten madalyonda ve panelde iki kez görünüyor, (c) bölge bir *yer*
  olarak kurgulanmıştır; arka plan kitap başına değişirse bölge kimliği erir.
- Atlas ve bölüm rotası masaüstünde aynı 1440px içerik kabuğunu, aynı sağ/sol
  boşlukları ve viewport'u dengeli dolduran dikey ölçüyü paylaşır. Tablet yatay
  ve masaüstünde kitap ayrıntıları sağdaki sabit panelde kalır; tablet dikey ve
  mobilde aynı içerik sağdan açılan drawer içinde gösterilir. Drawer dışına
  dokunmak veya “Haritaya Dön” eylemi paneli kapatır. Her iki yerleşimde de
  yayımlanmış kitabın bölüm ilerlemesi, bölüm bölüm kazanılacak/kazanılan
  rozetleri ve kitap madalyası birlikte görünür; dokunma hedefleri Bölüm 3.5
  standardını korur.

### 3.7.1 Yükseklik modeli (KARAR — 28 Temmuz 2026, Hasan)

Çocuk tarafındaki tam ekran atlas ekranları (`/map`, `/kitap/[bookId]`) **tek bir
yükseklik kuralını** izler:

- Kabuk **kesin yükseklikte** bir grid'dir: `height: 100svh` +
  `grid-template-rows: auto … minmax(0, 1fr) auto`. Yalnız `min-height`
  verilirse yükseklik belirsiz kalır ve `1fr` satırı serbest alanı değil
  **içerik boyutunu** alır; 1024×768'de sayfa taşıyordu.
- **Üst bar ve alt bar sabit kalır; orta bölge kalan yüksekliği alır.** Orta
  bölgeye sabit `height` / `min-height` / `max-height` **yazılmaz** —
  `calc(100svh − X)` gibi sihirli sabitler üst barın tek satır kaldığı
  varsayımına dayanır ve o varsayım her zaman doğru değildir.
- Keşif İskelesi (alt bar) **her genişlikte** `position: sticky; bottom: 0`.
- Dikey alan yetmediğinde ölçüler kısılır (yükseklik sorgusuyla), içerik
  ezilmez: panel flex sütununda çocuklara `flex-shrink: 0` verilir — aksi
  hâlde taşma anında öğeler sessizce 0 piksele çöküyordu.

**MOBİL İSTİSNASI (REVİZE — 31 Temmuz 2026, Hasan).** Yukarıdaki "kesin
yükseklik" kuralı **≤620px'de geçerli değildir**; orada kabuk `height: auto` +
`min-height: 100svh` olur ve sahne kendi tabanını dayatabilir. Gerekçe: kesin
yükseklikte sahne, ekran kısaldıkça küçülüyor ama durak yerleşimi sahnenin
YÜZDESİ olduğu için duraklar yukarı kayıyordu. 393×700'de ölçülen sonuç, ilk
madalyonun bölge açıklamasının **31px üstüne binmesi** ve dikey adımın 64px'lik
madalyonun altına, 51px'e inmesiydi. Kural:

- Dar ekranda durak bandının üst sınırı **başlığın ölçülen alt kenarından**,
  alt sınırı sahnenin dibinden hesaplanır — sabit yüzde kullanılmaz.
- Bant altı kitaplık bölgeyi taşıyamıyorsa **sahne kısalmayı bırakır**
  (`min-height: var(--durak-taban)`), sayfa birkaç piksel kayar. Madalyonların
  çakışmasına tercih edilir.
- Ad kartının yüksekliği **ölçülür**, sabit varsayılmaz: kart bir ya da iki
  satır sürüyor ve alt pay buna bağlı.
- Bu istisna yalnız mobildir. Tablet ve masaüstünde kesin yükseklik ve el ile
  kalibre edilmiş sabit bant (%32–83) aynen korunur.

**Sahnedeki başlık mobilde yalnız keşif açıklamasıdır.** Bölge numarası ve adı
sahnenin hemen üstündeki gezinme çubuğunda zaten yazılı; sahnede ikinci kez
yazılınca 373px'lik sahnenin dörtte biri tekrar bilgiye gidiyordu. `h1` DOM'dan
silinmez, görsel olarak gizlenir — sayfanın tek `h1`'i odur ve `.mapStage` ona
`aria-labelledby` ile bağlıdır.

### 3.7.2 Çocuk tarafı üst barı ve keşif menüsü (KARAR — 28 Temmuz 2026, Hasan)

- Üst bar **her ekranda TEK satırdır**: logo (solda, çerçevesiz) · profil künyesi ·
  menü ikonu. Rozet/madalya sayaçları ve unvan bardan **çıkarıldı**.
  *(Masaüstünde araya Keşif İskelesi şeridi girer — bkz. 3.7.2.2.)*
- **Keşif menüsü** sağdan açılan çekmecedir (kitap detayıyla aynı davranış:
  arka plana dokunma ve Escape kapatır). İçerik: unvan, **Kazanılan Rozet**,
  **Kazanılan Madalya**, ardından sayfa bağlantıları (**Veli Paneli**, **Çıkış**).
  Menü ileride büyüyecek bir gezinme alanıdır.
- **Haritada geri butonu YOKTUR.** Eskiden veli paneline gidiyordu; çocuğun
  okuma ekranından tek dokunuşla veli paneline düşmesi yanlıştı. O bağlantı
  artık menünün içindedir. **Faz 7 notu:** çocuk/veli oturum ayrımı olmadığı
  için bu bağlantı şimdilik korumasızdır, güvenlik fazında PIN arkasına alınır.
- **Bölge gezinmesi tek yerdedir:** sahnenin üstündeki sayaç kaldırıldı, oklar
  bölge şeridine alındı. Görünen bölge sayısı: mobil 1 (künye), tablet dikey 2,
  tablet yatay 3, masaüstü 5 — komşular kenarlardan kesik görünür. Böylece bölge
  adları kesilmez ve sahne başlığı sağa doğru genişleyip satır kazanır.
- **Bölüm rotası üst barı** da tek satırdır: geri · bölüm/rozet sayaçları · menü.
  Kitap adı ve sıra numarası bardan çıkarıldı (orta alandaki başlıkta zaten var);
  logo bu ekranda kullanılmaz. *(Masaüstünde araya Keşif İskelesi şeridi girer —
  bkz. 3.7.2.2.)*

#### 3.7.2.1 Kitap detay paneli — iki düzen (REVİZE — 29 Temmuz 2026, Hasan)

Panelin sıkıştırılmış hâli **yalnızca tablet yatayda** geçerlidir; orada kısıt
dikey alandır. Diğer ekranlarda panel uzundur, sıkıştırmaya gerek yoktur.
Ayrım tek bir sorguyla yapılır: `(min-width: 960px) and (max-height: 860px)`.

| | Mobil · Tablet dikey · Masaüstü | Tablet yatay |
|---|---|---|
| Kitap açıklaması | **Düz metin**, doğrudan görünür | **Aç/kapa** ("Kitap Açıklaması" butonu) |
| Bölüm rozetleri | **4 sütunlu ızgara** (8 bölüm = 2 satır) | **Tek satır**, kare adede göre hesaplanır |
| Rozet altı yazısı | **"1. bölüm" görünür** | Gizli — numara zaten rozetin üstünde |

- Tek satır düzeninde rozetler adede bakılmaksızın panelin **iki kenarına
  hizalanır**; kalan boşluk `space-between` ile aralara dağıtılır.
- Buton ve açıklama metni **her zaman DOM'a girer**, hangisinin görüneceğine CSS
  karar verir. Metin koşullu render edilseydi düz modda hiç görünmezdi.
- Tablet yatayda madalya ile ana eylem arasındaki ölü alan rozet satırına
  aktarıldı; ikisi arasında ~25px sabit pay bırakılır.
- **Sahne başlığı puntoları alan genişliğiyle büyür.** Tablet dikey ve
  masaüstünde metinler alanın yanında küçük kalıyordu: açıklama 15→17px
  (tablet dikey) ve 20px'e (masaüstü) çıkar, başlık 34/42px olur. Başlık
  kutusunun sağ payı da 230px'ten 44px'e indi (o pay kaldırılan sahne
  sayacı içindi).
- **Rozet karesi panelin genişliğine göre ölçeklenir (KARAR — 29 Temmuz 2026,
  Hasan).** Sabit 52px, panel 480px'e çıktığında (tablet dikey ve masaüstü)
  ızgaranın içinde küçük kalıyordu. Ölçü tek bir CSS değişkeninden
  (`--rozet-kare`) yönetilir: **mobilde 52px, tablet dikey ve masaüstünde
  68px.** Onaylanan oran korunur — kare, sütun genişliğinin ~%65'i kadardır.
  Kare sütuna kelepçelidir (`min(…, 100%)`); 960px'lik dar masaüstünde panel
  326px'e indiğinde taşma olmaz. Rozet görselinin kendisi kareyle birlikte
  büyür: `OdulIkonu`nun `boyut` prop'u yalnız intrinsic ölçüdür, ölçekleme
  CSS'ten yapılır.
- **Kitap açıklaması metni de aynı iki ekranda 15→17px olur.** Mobil 15px'te
  kalır (onaylanmış düzen).
- Büyüyen rozet + metin masaüstü panelinde ~47px fazladan yer istiyor; bu pay
  kapak (96→84px), kitap başlığı (38→34px üst sınır) ve blok aralıklarından
  geri alınır. **Buna rağmen 900px yüksekliğindeki masaüstünde panel ~70px
  kayar** ve madalya kartı sabit "Tekrar Oku" butonunun altında kalır; ~970px
  ve üzeri yükseklikte her şey kaydırmasız sığar. Panel zaten kaydırılabilir
  bir yüzeydir, ana eylem `sticky` olduğu için her zaman erişilebilir kalır.

#### 3.7.2.2 Keşif İskelesi ve menü sayfaları (KARAR — 6 Ağustos 2026, Hasan)

**Sorun.** Üst barın orta sütunu boştu (logo solda, profil sağda), buna karşılık
atlas haritasında alttaki Keşif İskelesi satırı ~74px yer yiyordu ve kitap detay
panelindeki rozet ızgarası ekrana sığmıyordu. Üç menü ekranı (Kazanımlarım ·
Kelime Defterim · Görevlerim) ise iskeletin tamamen dışındaydı: 896–1024px
genişlik, iki butonluk kendi mini barı, sayfayla birlikte kayan başlık.

**Karar — Keşif İskelesi şeridi.** Üç bağlantı **≥960px'te üst barın orta
sütununda** durur; bar dört sütuna geçer (sol · iskele · sağ öbek · menü).
Atlas'ta alttaki iskele satırı masaüstünde **kaldırılır**, kazanılan ~68px
doğrudan haritaya ve kitap paneline gider. `<960px`'te şerit gizlenir.

- Şerit **tek kaynaktan** gelir: `KesifIskelesi` bileşeni + `kesif-iskele.module.css`.
  Atlas, bölüm rotası ve menü kabuğu üçü de onu kullanır; ekran modüllerinde
  kopya stil **bırakılmaz**.
- Bulunduğun sayfa `aria-current="page"` ile işaretlenir. Menü sayfalarında şerit
  asıl gezinme aracıdır, aktif durum orada zorunludur.
- **Menü çekmecesine** (`KesifMenusu`) aynı üç bağlantı eklendi. Şerit dar ekranda
  gizlendiği ve bölüm rotası ile menü sayfalarında alt iskele bulunmadığı için,
  çekmece o kırılımda bu sayfalara ulaşmanın **tek yoludur**.
- Profil künyesi sütununa `max-width` konur. `auto` track max-content ister; uzun
  bir çocuk adı sütunu şişirip şeridi ezerek butonların üstüne bindiriyordu.

**Karar — menü sayfası kabuğu.** Üç menü ekranı ortak `KesifSayfaKabugu`
bileşeniyle açılır: atlas ve bölüm rotasıyla **aynı 1440px genişlik**, aynı üst
bar (geri · iskele · profil · menü) ve `KesifMenusu`.

- Kaydırma modeli atlastan **ayrılır**: orada kabuk `height: 100svh` grid'dir ve
  içerik kendi içinde kayar; burada bar `sticky`, sayfanın kendisi kayar. Bunlar
  liste ekranıdır, iç kaydırma alanı mobilde adres çubuğuyla sorun çıkarıyor.
  Üst pay **kabuğun padding'inden** verilir, bar'ın margin'inden değil — margin
  çakışması onu `main`'in dışına taşıyıp sayfayı aşağı itiyordu.
- İçerik 1440px'i **kullanır**, ortada dar bırakılmaz:

  | Ekran | Masaüstü düzeni |
  |---|---|
  | Kazanımlarım | rozet ızgarası 10 sütuna kadar; madalya ve unvan 4 sütun |
  | Kelime Defterim | 3 sütun |
  | Görevlerim | 2 sütun — solda **Seni Bekleyenler**, sağda **Tamamladıkların** |

- Sayfaların kendi çapraz gezinme butonları ("Kelime Defterim ↔ Kazanımlarım")
  **kaldırıldı**; şerit üçünü birden veriyor.
- Profil verisi kabuğa **props ile** geçer. Kabuk kendi `useSelectedChild`'ını
  çağırsaydı her açılışta ikinci bir Supabase isteği çıkardı.

### 3.8 Veli ana sayfası bilgi mimarisi (ONAY — 18 Temmuz 2026)

Veli panelinin ana sayfası salt profil seçici veya yoğun istatistik panosu
değildir; çocuk başına **okuma yolculuğu özeti** gösterir:

- Tablet yatay ve masaüstünde çocuklar küçük kart gridinde değil, içerik alanını
  kullanan geniş yatay kartlarda alt alta gösterilir. Kartta avatar + unvan,
  güncel kitap + ilerleme, son rozet, güncel tek "Bugüne Taşı" görevi, son okuma
  zamanı ve ana eylemler birlikte görünür.
- Tablet dikeyde aynı kartlar tek sütunda kalır. Mobilde bilgi sırası korunur,
  ancak görsel ve metin yan yana getirilmez; kart kompakt tek sütuna dönüşür.
- "Yeni Çocuk Profili Ekle" profil kartıyla eşit ağırlıkta büyük boş kart olmaz;
  profil listesinin altında kompakt bir ekleme alanıdır. Form ayrı sayfada kalır.
- Ana sayfa Kütüphane, Ödüller veya Gelişim Raporu'nun ayrıntılarını tekrar
  etmez. Tüm kitap kataloğu, rozet galerisi, madalya/unvan koleksiyonu ve rapor
  sekmeleri kendi sayfalarında kalır.
- Puan, skor, ortalama başarı/tamamlama oranı veya çocukları kıyaslayan KPI
  şeritleri kullanılmaz. Ana sayfanın amacı velinin "nerede kaldı, son kazanımı
  ne, güncel görevi ne, sıradaki eylem ne" sorularını hızlıca yanıtlamaktır.
- 1024px tablet yatayda sol menü daraltılmış ikon düzenine geçer; geniş metinli
  menü daha büyük masaüstünde açılır. İşlevsel etiketler okunabilir boyutta,
  dokunma alanları Bölüm 3.5 standardında kalır.

> **REVİZE — 22 Eki 2026 (Hasan, veli paneli yeniden tasarımı).** Yukarıdaki
> ilkeler (çocuk başına yolculuk özeti, puan/KPI/kardeş kıyası yok, dört soru)
> korunur; düzen değişti. Ana Sayfa sırası velinin sorularını izler:
> 1. **Karşılama kartı** (gece mavisi): günün saatine göre selam, her çocuk için
>    tek gözlem cümlesi ("Elif dün akşam Hz. İbrahim kitabının 3. bölümünü
>    bitirdi"), "Bu Akşamın Sohbeti" düğmesi; geniş ekranda çocukların okuduğu
>    kitapların kapakları.
> 2. **Çocuk kartı:** üstte son bitirilen bölümün açılış sahnesi (16:9) ve
>    üzerinde avatar + ad + unvan; altında kitap, **bölüm yolu** (her bölüm bir
>    parça, yüzde yok), sıradaki bölüm, son rozet, güncel görev ve "Okumaya
>    Devam Et". Tablet yatay ve masaüstünde sahne solda, bilgi sağda; mobilde alt
>    alta. "Profili Düzenle" karttan Aile sayfasına taşındı.
> 3. **Bu akşamın sohbeti:** son bitirilen bölümün "Sen Olsaydın" sorusu, bölüm
>    özeti ve sabit sohbet önerisi (4.1/19). Çocuğun seçtiği şık gösterilmez.
> 4. **Son gelişmeler:** zamanı bilinen rozet, madalya ve görev olayları,
>    yeniden eskiye (en fazla 5). Sıralama zamana göredir, çocuklara göre değil.
> 5. **Son eklenen kitaplar** ve kompakt "Çocuk profili ekle" satırı.
> Zaman her yerde aynı dille yazılır: "bu sabah", "dün akşam", "4 gün önce".

### 3.9 Veli alt sayfaları görsel tutarlılığı (ONAY — 18 Temmuz 2026)

Kütüphane, Ödüller ve Gelişim Raporları ana sayfadaki sakin ve geniş kart
dilini paylaşır; her biri kendi işini yapar, ana sayfayı veya birbirini tekrar
etmez:

- Sayfa başlıklarında yinelenen "Veli Paneli" üst etiketi kullanılmaz. Başlık +
  kısa açıklama ortak ölçü ve boşluk düzenindedir; hesap alanı ortak üst bardadır.
- Kütüphane araçları (çocuk, arama, durum) tek sakin filtre yüzeyinde toplanır.
  Kitaplar tablet yatay/dikeyde tek sütun, geniş masaüstünde iki sütundur;
  mobilde kapak ve metin yan yana getirilmez. Durum dili ve somut kilit şartı
  Bölüm 3.4'e uyar.
- Ödüller sayfasında Rozetler/Madalyalar/Unvanlar ana sekmelerdir. Mobil rozet
  galerisi okunabilir iki kolondur; genişlik arttıkça kolon sayısı kademeli artar.
  Puan, kademe veya kıyaslama eklenmez; kazanılmayan ödül mevcut görselin soluk
  hâlidir.
- Rapor seçimi çocuk başına güncel kitap, unvan ve son okuma bağlamını gösteren
  sakin kartlardan oluşur. Rapor detayı Genel Bakış · Kitaplar · Ödüller ·
  Görevler · Sohbet Önerileri sekmelerini korur; mobilde sekmeler yatay
  kaydırılır, içerik tek sütundur. *(REVİZE 19 Eki 2026 — 4.1/19: Kitaplar ve
  Sohbet Önerileri sekmeleri okunan kitapları da gösterir; ilk kitap bitene
  kadar boş kalmaz.)*
- İşlevsel gövde metni 16px hedefini, buton ve dokunma alanları Bölüm 3.5'i
  korur. Rapor metinleri gözlem bildirir; başarı puanı veya kesin çocuk
  değerlendirmesi üretmez.

> **REVİZE — 22 Eki 2026 (Hasan, veli paneli yeniden tasarımı).** Alt sayfalar:
> - **Sohbet** (`/dashboard/sohbet`, YENİ ana menü öğesi): raporun beşinci
>   sekmesindeki Sohbet Önerileri buraya taşındı. Öne çıkan "Bu akşam için"
>   kartı (en son okunan kitabın son bitirilen bölümü: sahne, özet, soru, sabit
>   öneri, "Çocuğunuz sorarsa"), okuduğu diğer kitapların yine yalnız son
>   bölümü (KARAR 19 Eki 2026 korunur: "yalnız son bölüm gösterilir"), biten
>   kitaplar için kitap sonu soruları ve gözlem notu.
> - **Gelişim** (`/dashboard/gelisim`): Gelişim Raporu ile Ödüller birleşti.
>   Profil şeridi (avatar, tek cümle özet, güncel unvan + sıradaki unvan) ve
>   üç sekme: **Kitaplar** (okuduğu kitaplar bölüm yoluyla; bitirdikleri
>   madalya, Büyük Final Testi sonucu ve kitap sonu gözlemiyle; veli bilgi notu
>   altta) · **Ödüller** (unvan yolu, başlanan kitapların madalyaları, başlanan
>   kitapların rozetleri — 216 kilitli rozetlik duvar yok) · **Görevler**
>   (Listesinde / Tamamladı). "Genel Bakış" sekmesi kalktı; özeti profil şeridi
>   ve Ana Sayfa verir.
> - **Kütüphane**: tek sütun liste yerine **kapak rafı** (mobil 2, tablet 3–4,
>   masaüstü 5 sütun). Kapak, ad, alt başlık ve durum (bölüm yolu çubuğu /
>   Tamamlandı / Final Testi kaldı / bölüm sayısı). "Yeni" etiketi çocuk
>   tarafıyla aynı kuraldan gelir. Kitaba dokununca ayrıntı ve eylem alttan
>   (geniş ekranda sağdan) açılır; eylem durum diline uyar (3.4). Filtre:
>   Tümü · Devam Eden · Tamamlanan · Başlanmamış. 12 kitapta arama kutusu
>   gereksiz olduğu için kalktı.
> - **Aile ve Güvenlik** (`/dashboard/ayarlar`, ana menüde "Aile"): üstte üç
>   durum (veli PIN'i, profil şifresi, bağlı cihaz), sonra Çocuklar (profil
>   düzenleme buradan açılır) · Bu cihaz · Çocuğun kendi cihazı · Ortak
>   tablette profil şifresi · Veli PIN'i · Hesap. Geniş ekranda yanda "Aile
>   cihazları nasıl çalışır?" kartı. Kurallar 3.11 ile aynıdır.
> - Çocuk seçici tek çocukta görünmez; seçim sayfalar arasında korunur.

### 3.10 Çocuk arayüzü sadeleştirme (KARAR — 11–12 Ekim 2026, Hasan)

Kaynak: 11 Ekim 2026 çocuk arayüzü analizi
(https://claude.ai/artifact/PDS9XqJ4YaKGdcFiaCaWbM). Bu bölüm 3.4, 3.6, 3.7 ve
alt bölümlerindeki bazı kararları değiştirir; değişen eski bölümlerin başında
"REVİZE — bkz. 3.10" notu vardır. Uygulama sırası Bölüm 9'daki **Faz A–D**'dir.

**Gerekçe (ölçüm, 11 Ekim 2026):** Haritadan hikâyenin ilk cümlesine mobilde
5 dokunuş gerekiyordu. Mobil bölüm sayfasının %42'si hikâye dışıydı (8.209 px'in
3.470 px'i; üç maddelik "Ne Öğrendik" tek başına 710 px). Çocuk ekranlarında 15
ayrı yer/kavram adı geçiyordu (İskele, Rota, Kapı, Durak, Atlas…). 10 kitaplık
lansmanda 7 keşif bölgesinin 5'i tamamen "Hazırlanıyor" görünecekti. Çocuk
testi henüz yapılmadı; kararlar gözlem ve ölçüme dayanır.

#### 3.10.1 Ana ekran: tek dikey rota

- Keşif bölgesi seçicisi ve bölge adları arayüzden **kalkar.** Bölgeler
  kaydırmasız eski düzenin çözümüydü. Kitaplar **tek dikey rotada** dizilir.
  Bölgeler yalnız editoryal gruplama ve üretim dalgası olarak katalog
  belgesinde yaşar.
- Rota **dikeydir:** telefonda ve tablette doğal hareket budur. Yatay kaydırma
  masaüstünde fare tekerleğiyle çalışmaz, iPhone'da kenardan kaydırma "geri"
  hareketiyle çakışır.
- **Yayında olmayan kitap rotada görünmez.** Rotanın sonunda tek bir "Yakında"
  kartı durur (kaç kitabın hazırlandığı + birkaç tanınmış ad). Gri durak dizisi
  kullanılmaz.
- **Önerilen sıra katalog sırasıdır, yayın sırası değil.** Sonradan yayınlanan
  kitap (ör. Hz. Sâlih, 5. kitap) rotanın sonuna değil kendi yerine girer.
  Gerekçe: yayın sırası bir üretim tesadüfüdür; bütün kitaplar yayınlandığında
  sonradan katılan aileler kronolojik sırayı görür.
- Duraklarda **sıra numarası gösterilmez.** Yayında olmayanlar gizli olduğu için
  numaralar atlardı (1, 2, 3, 4, 6…).
- **Yeni kitap duyurusu:** durakta "Yeni" etiketi (çocuk kitabı açana kadar, en
  fazla 30 gün) + ana ekranda Işıl'ın **tek seferlik** cümlesi ("Yeni bir kitap
  geldi: Hz. Sâlih!" · **Göster** → rota o durağa kayar, durak kısa süre parlar).
  Kapatılabilir; bir daha görünmez. Telefon bildirimi YOKTUR (Bölüm 1).
- En üstte **"Sıradaki bölümün" kartı** ve tek büyük **"Okumaya Devam Et"**
  (yeşil) düğmesi: çocuğu doğrudan bölüm metnine götürür (1 dokunuş). Seçim
  kuralı: yarım bırakılan kitap varsa onun ilk bitmemiş bölümü; yoksa önerilen
  sıradaki ilk bitmemiş kitabın ilk bölümü. **Bu, kaldırılan "Kaldığın yer"
  değildir:** kaydırma konumuna değil tamamlanan bölüm sayısına bakar ve bölümü
  daima baştan açar.
- Kitap durağına dokunmak o kitabın bölümlerini açar (3.10.7); ana yol artık
  oradan geçmez.
- **Yolun ucu:** yayındaki bütün kitapları bitiren çocuk için sakin bir son
  durum — Işıl'ın tek cümlesi + Tekrar Oku · Görevlerim · Kelimelerim. Baskı ve
  bildirim yok.
- **Durak tasarımı (KARAR — 12 Ekim 2026, Hasan):** durağın halkası kitabın
  **ilerleme çubuğudur**; okudukça altınla dolar. Biten kitapta halka tam altın,
  köşede **o kitabın madalyası** durur. Okunan kitap daha büyüktür (mobil 96 px,
  diğerleri 72 px; masaüstü 112 / 86 px) ve hafifçe nabız atar. Yeni kitapta
  altın "Yeni" etiketi. Her durağın altında krem ad levhası ve tek satır durum:
  "Tamamlandı", "4 bölümün 1'i", "8 bölüm".
  **REVİZE — 20 Ekim 2026 (Hasan): çerçeveli durak.** Durak, ödül ailesinin
  halka çerçevesini taşır (altın kenarlar, dört mavi taş, yıldızlar, iki küçük
  kitap; 6.1 "Ortak ödül çerçevesi"). İlerleme çubuğu artık **çerçevenin mine
  bandıdır**: bant tepeden başlayıp saat yönünde altınla dolar, kalanı kitabın
  **durak rengini** taşır. Biten kitapta bant tam altın, köşede madalya durur.
  Dört taş bandı dörde böler (çeyrek işareti). Ölçüler, nabız, "Yeni" etiketi
  ve levha aynen kalır; görselin krem kenarlığı, dairesel kırpması ve ayrı
  ilerleme halkası kalkar. Renkler ve dağıtım kuralı 6.1'dedir.
- **Işık izi (KARAR — 12 Ekim 2026, Hasan):** okunan yol **altın ışıkla**
  parlar, okunmamış yol krem kalır (eskiden okunan yol yeşildi). Ekranın imzası
  budur: çocuk ne kadar yol aldığını sayıya bakmadan görür; Işıl ve "Işık
  Taşıyıcısı" unvanıyla aynı hikâyeyi anlatır. Yolculuk ilerlemesi (durak
  halkası, ilerleme çubukları, okunan yol) altındır; **yeşil düğme anlamı
  (devam/onayla, 3.3) değişmez.**
- **Işıl "Buradasın" (KARAR — 12 Ekim 2026, Hasan):** ana ekranda çocuğun
  okuduğu kitabın yanında Işıl ve "Buradasın" balonu durur (3.10.5).
- **Canlı çayır (KARAR — 17 Ekim 2026, Hasan):** boyalı rota görseli zemin
  olarak kalır; üstüne **kodla çizilen bir hareket katmanı** eklenir
  (`src/components/cocuk/CanliCayir.tsx`). Tamamen kodla çizilmiş sahne 12
  Ekim'de soluk bulunduğu için karma yol seçildi; yeni görsel üretilmedi.
  Katmanda: ırmakta akan su (akış çizgileri + köpük parıltısı), çimenin
  üstünden geçen rüzgâr dalgası, kenar şeritlerinde rüzgârda sallanan çiçek
  öbekleri, ırmak kıyılarında saz öbekleri, kenarlarda uçan kelebekler, ara
  sıra çıkıp otlayan bir tavşan ve 45 saniyede bir çayırın üstünden geçen,
  gölgesi çimene düşen küçük bir kuş sürüsü. Akşam ateşböcekleri gündüz
  sahnesinde azaltıldı (Işıl'la bağ için birkaçı kalır).
  **Balıklar (KARAR — 18 Ekim 2026, Hasan):** her ırmakta **8 balık** suyun
  altında, yarı saydam yüzer; 9–13 saniyede bir suda bir halka açarak belirir,
  birkaç saniye yüzer, ikinci bir halkayla dalar. Altı renk sırayla dağıtılır
  (turuncu, gri, altın, beyaz-turuncu benekli koi, kırmızı, pembe; yan yana iki
  balık aynı renkte olmaz). Irmak başına **bir balık arada bir sıçrar**
  (22 saniyede bir): suyun üstüne çıkınca büyür, akış çizgilerinin üstüne
  geçer, damlalar saçarak suya iner. Balık yerleri ırmak verisiyle birlikte
  görselden ölçülür (sudaki taşlardan uzak satırlar betikte tanımlıdır).
  **Test ekranı:** `/tasarim/canli-cayir` (giriş gerektirmez) — rota arka
  planının tek karosu, duraklar olmadan gerçek boyutta; sağ/sol ırmak
  bağlantıları ve seyrek canlıları beklemeden görmek için 4× hız düğmesi.
  **Dikkat dağıtmama kuralları:** çiçek, saz ve kelebek yalnız kenar
  şeritlerindedir, orta sütun sakin kalır; hareketler yavaş ve küçüktür; karo
  başına **tek tavşan** vardır, çoğu zaman görünmez ve **hiçbir durağın,
  levhanın ya da kartın altına düşmez** (yerini `data-kitap` ve
  `data-cayir-engel` öğelerine bakarak seçer); dokunma etkileşimi ve ses YOK.
  **Teknik:** görsel `repeat-y` ile tekrar ettiği için katman da görselin bir
  kopyası boyunca bir karo çizer; koordinatlar görsel pikselidir, ölçüler
  `cqw` ile görselle birlikte ölçeklenir. Yalnız `transform`/`opacity` (su
  çizgilerinde `stroke-dashoffset`) canlandırılır; ekran dışındaki karo durur;
  **"hareketi azalt" tercihinde katman hiç çizilmez.** Dar ekranda katman
  kabuğun zemininde, geniş ekranda rota kartındadır. Irmak suyu verisi
  görselden ölçülür: `ROTA_ARKAPLANI` değişirse
  `node scripts/canli-cayir-irmaklari.mjs` yeniden çalıştırılır (çıktı:
  `canliCayirIrmaklari.ts`, balık yerleri dahil); çiçek, saz, tavşan ve kelebek yerleri de yeni
  görsele göre `CanliCayir.tsx` içinde güncellenir. İkinci animasyon
  kütüphanesi eklenmedi (döngüler CSS'tir).
- **Rota arka planı — boyalı görsel (REVİZE — 12 Ekim 2026, Hasan):** kodla
  çizilmiş çayırın yerine Hasan'ın ürettiği boyalı çayır görseli geçer:
  `public/harita/rota-harita-arkaplan.jpg` (1122×2804, alt ve üst kenarı
  dikişsiz birleşir; yol `varlikYollari.ts:ROTA_ARKAPLANI`). Kartın/sayfanın
  genişliğine oturur ve yol uzadıkça **aralıksız alt alta tekrar eder**
  (`repeat-y`); rota uzatılırken yeni görsel üretmek gerekmez. Hareket katmanı
  (`RotaCanliligi`) aynen kalır. Dosya çözünürlüğü korunarak sıkıştırıldı
  (2,4 MB → 712 KB). Eski `rota-cayir.svg` artık kullanılmıyor.
  Aşağıdaki ilk karar metni tarihçe için durur.
- **Rota arka planı (KARAR — 12 Ekim 2026, Hasan; aynı gün revize):** bölge
  görselleri yerine **kodla çizilmiş, dikey olarak dikişsiz tekrar eden bir
  "akşamüstü çayırı"**. İlk sürüm açık pastel yeşildi; Hasan basit ve soluk
  buldu, koyu zeminde kitap yuvarlaklarının daha güzel durduğunu söyledi.
  Geçerli sürüm derin yeşil zemin, çimen dokusu, kenarlarda koyulaşma, orta
  sütuna düşen sıcak ışık havuzları; kenarlarda **zeytin ağaçları**, sazlıklı
  dere, gece çiçekleri ve taşlar (bu topraklara özgü). Altın halkalar, krem
  levhalar, ışık izi ve ateşböcekleri bu zeminde parlar.
  **Dar ekranda (telefon, tablet dikey) manzara sayfanın en üstünden başlar:**
  profil satırı ve "Sıradaki bölümün" kartı onun üstünde durur, lacivert üst
  bant kalmaz (`CocukKabugu rotaArkaplani`). Geniş ekranda çerçeve gece mavisi,
  rota kendi kartındadır. Ayrıntı:
  (`public/harita/rota-cayir.svg`, yol `varlikYollari.ts:ROTA_ARKAPLANI`).
  Süsler (ağaç, tepe, dere, çiçek, taş) iki kenardadır; orta sütun durakların ve
  yolun alanıdır, sakin bırakılır. Üstünde ince bir **hareket katmanı** vardır
  (`RotaCanliligi`): rota boyunca süzülüp parlayan ateşböcekleri, çayırın
  üstünden ağır geçen bulut gölgeleri ve ışık izinde akan kıvılcımlar. Yalnız
  `transform` / `opacity` canlandırılır; "hareketi azalt" tercihinde hepsi durur.
  İleride boyalı bir görsel istenirse yalnız `ROTA_ARKAPLANI` değişir (kurallar:
  gökyüzü yok, üst ve alt kenar dikişsiz, orta sütun sakin, figür yok). Bölge
  görselleri (`public/bolgeler/`) kullanılmadığı için 21 Ekim 2026'da silindi.

#### 3.10.2 Kitap kilidi kalkar

- **Yayındaki bütün kitaplar baştan açıktır;** çocuk istediği kitaptan
  başlayabilir.
- **Bölüm sırası kalır:** kitap içinde bölüm N, bölüm N−1 bitmeden açılmaz.
  Büyük Final Testi yine bütün bölümler bitince açılır; madalya kuralı (4.1/13)
  aynen geçerlidir.
- Gerekçe: sıralı kilitte Hz. Muhammed'in ilk kitabına ulaşmak 27 kitap / 154
  bölüm gerektiriyordu; veli ve çocuk istedikleri kitaplara aylarca
  ulaşamıyordu. Rozet, madalya ve unvan sıraya bağlı değildir (unvan tamamlanan
  kitap **sayısına** bakar); kilit kalkınca ödül sisteminde hiçbir şey bozulmaz.
  Katalog kuralı (her kitap kendi içeriğini taşır, önceki kitaplara yalnız kısa
  köprü kurar) kitapları zaten tek başına okunur kılar.
- Velinin **okuma sırası ayarı YAPILMAZ.** Kitaplar açık olduğu için yalnız
  gösterimi değiştirirdi ve çocuk uymayabilirdi. Velinin aracı çocukla
  konuşmaktır; ilk bölümü birlikte okurlarsa "Sıradaki bölümün" kartı o kitabı
  önermeye devam eder. Veliler isterse ileride hafif bir "Sıradaki kitabı öner"
  düşünülür.
- **"Sonraya bırak"** (velinin bir kitabı ertelemesi) yalnız Faz 7 PIN'i ile ve
  veli talebi olursa yapılır. PIN olmadan çocuk veli paneline korumasız
  girebildiği için anlamsızdır.

#### 3.10.3 Okuma ekranı

- Zemin baştan sona **açık (krem).** Koyu çerçeve ve "kart içinde kart" kalkar.
  Okuma sırasında gece mavisi **yalnız rozet kutlamasında** görünür. Harita ve
  diğer ekranlardaki koyu çerçeve kararı (3.1) aynen geçerlidir.
- Tam ekran bölüm kapağı kalkar: bölüm görseli + başlık + "Bu bölümün rozeti"
  tek blokta durur; hikâye ilk ekranda başlar. "Maceraya Başla" ve "Okumak için
  aşağı kaydır" kalkar.
- İnce ilerleme çizgisinin yerine **adım çubuğu:** Oku · Seç · Oku · Öğren ·
  (Görev) · Rozet. Mobil ve tablet dikeyde üstte yatay; tablet yatayda solda
  sabit adım sütunu + kazanılacak rozet. Geçilmiş adıma dokunulabilir;
  "Sen Olsaydın" kapısı atlanamaz.
- Durak kartlarının dört katmanlı başlığı (ikon dairesi + büyük harfli üst
  etiket + başlık + açıklama) tek başlığa iner. Büyük harfli küçük etiketler
  kullanılmaz. Hedef: mobilde hikâye dışı alan %42'den yaklaşık %25'e.
- "Okuma Araçları" menüsü **"Aa"** (yazı boyutu) düğmesine iner.
- **Rozet anı:** gece mavisi kutlama sahnesi *(REVİZE — 12 Eki 2026, Hasan: tam
  genişlik değil, okuma sütununun içinde tek ekrana sığan kart; ayrıntı aşağıda)*.
  Önce altın **"Rozetimi Al"**
  (kayıt), ardından yeşil **"Sıradaki Bölüme Geç"** + ghost **"Bölümlere dön"**.
  Kitabın son bölümünde yeşil düğmenin yerini altın **"Büyük Final Testine
  Geç"** alır. Bugünkü "Bölümü Tamamla → bölüm rotasına dönüş" kalkar.
- Sesli anlatım: bkz. 6.5.

**Uygulandı — 12 Ekim 2026 (Faz B).** Önizleme: `/tasarim/okuma?bolum=adem-2`
(giriş gerektirmez, rozet kaydı Supabase'e gitmez; `&tekrar=1` rozeti önceden
kazanılmış bölüm, `&hata=1` kayıt hatası, `?bolum=idris-4` son bölüm). Kod:
`src/components/reader/` (`AtlasScrollReader`, `AdimCubugu`, `RozetKutlamasi`,
`akis.ts`). Uygulamada verilen ayrıntı kararları:

- **Adımlar bölümün yapısından türer** (`okumaAdimlari`): karar yoksa "Seç" ve
  ikinci "Oku" çıkmaz, görev yoksa "Görev" çıkmaz. "Senin seçimin" **Öğren**
  adımındadır; kaydırırken etkin adım geri sıçramasın diye (Seç → Oku → Seç
  olmasın). Kapının arkasındaki adımlar seçimden önce kilit simgesiyle görünür
  ama içerikleri DOM'da yoktur. Yalnız geçilmiş adıma ve bulunulan adıma
  dokunulur.
- **Adım çubuğu ilerlemeyi de taşır:** her adımın çizgisi okundukça soldan
  altınla dolar (yatay); sütunda adımdan bir sonrakine uzanan yol dolar (dikey).
  Ayrı ilerleme çubuğu yoktur. Kırılım: < 1024 px yatay çubuk üst barın altında,
  ≥ 1024 px solda yapışkan adım sütunu + kazanılacak rozet kartı (açılıştaki
  rozet satırı bu genişlikte tekrar edilmez).
- ~~**Açılış bloğu:** 16:9 bölüm sahnesi + "Hz. Âdem · 2. bölüm" künyesi +
  bölüm adı + "Bu bölümün rozeti" satırı (sahnenin altında, sola yaslı).~~
  **REVİZE — 12 Ekim 2026 (Hasan: "kapak görseli boş kalıyor, alttaki sola
  yaslı bilgiler estetik durmuyor"):** künye ve bölüm adı **kapak görselinin
  tam ortasına** yazılır. Telefon ve tablet dikeyde rozet de kapağın içindedir
  (künye → bölüm adı → rozet görseli → "Bu bölümün rozeti" → rozet adı, hepsi
  ortalı); ≥ 1024 px'te rozet sol sütunda kalır, kapakta yalnız yazılar durur.
  Görsel olduğu gibi kalır; okunurluk için yalnız yazının arkasına kenarlara
  doğru sönen yumuşak bir gece mavisi ışık ve yazı gölgesi verilir (tam
  karartma yok). Telefonda (< 640 px) kapak **4:3** kırpılır ki rozet ve adı
  küçülmeden sığsın; ≥ 640 px'te 16:9. Uzun bölüm adı iki satıra inerse kapak
  taşmaz, uzar. Kapak görsellerinde orta alan yazıya ayrılır; sahnenin önemli
  kısmı tam ortaya ya da (telefon kırpımı yüzünden) en kenara konmaz. Bölüm
  özeti (`ozet`) açılışta gösterilmez. Rozeti önceden kazanılmış bölümde
  "Bu rozeti kazandın" yazar ve rozet tam renklidir.
- **Üst bar:** ← Bölümler (telefonda yalnız ok) · bölüm adı + künye · **Dinle**
  (lacivert, ikincil eylem) · **Aa**. "Dinle"ye basınca üst barın altında ses
  şeridi açılır (oynat/duraklat, süre, konum, kapat); ses dosyası yoksa hiçbir
  ses kontrolü çizilmez (6.5).
- **"Aa":** üç büyüklük (Küçük · Normal · Büyük) ve altta sakin "Bölümü baştan
  başlat" (seçimi sıfırlar). Telefonda alttan sayfa, daha genişte düğmenin
  altında küçük panel. Seçilen büyüklük bu cihazda hatırlanır ve bölümden
  bölüme taşınır (`localStorage`, yalnız görünüm tercihi).
- **Sen olsaydın?** açık altın bantta (telefonda kenardan kenara). Işıl balonu
  "Seçimine hikâyenin sonunda birlikte bakacağız." der. Şıklar alt gölgeli
  basılabilir düğme; seçim yapılmadan onay düğmesi kesik çizgili ve nötrdür,
  "Bir seçenek seç" yazar (eski soluk yeşil devre dışı düğme bozuk görünüyordu).
- **Işıl'ın sözlük ipucu** ("Yeşil kelimelere dokun, anlamını öğren.") bölümün
  ilk sözlük kelimesinin üstünde durur; çocuk herhangi bir kelimeye bir kez
  dokununca bu cihazda bir daha görünmez.
- **Sahne görselleri: albüm fotoğrafı (KARAR — 12 Ekim 2026, Hasan: "düz,
  köşeleri oval görsel istemiyorum"; beş seçenekten B+ seçildi, ardından
  sadeleştirildi).** Hikâyenin içindeki her sahne, sayfaya iki üst
  köşesinden bantla yapıştırılmış bir fotoğraf gibi durur: sıcak beyaz kağıt
  (dört kenarda eşit pay), alt köşelerde kalkan kağıt gölgesi. **Tek tasarım
  vardır;** bölüm içindeki sıraya göre süsleme yatayda aynalanır (1. görsel
  altın bant solda / yeşil sağda, 2. görsel tersi…; görselin kendisi
  çevrilmez). Fotoğraf **düz ve ortalıdır** (eğim, köşelik, tek bant ve alt
  şeritteki yıldız kalktı). Bantlar telefonda küçüktür (64×20 px), ≥ 640 px'te
  116×32 px. Kaydırınca fotoğraf **eğik başlar, dönerek düz yerine oturur**
  (yalnız `animation-timeline` destekleyen tarayıcıda; "hareketi azalt"ta
  yok). Alt yazı (`caption`) varsa görselin altına el yazısıyla yazılır.
  **Görsel üretimi değişmez:** dosya yine 16:9 `.jpg`.
- **Sözlük kelimesi ve anlam kartı (REVİZE — 12 Ekim 2026, Hasan: kutu ve
  dokununca koyu yeşil olan kelime beğenilmedi; anlamı Işıl göstersin):**
  kelime yeşil ve kalındır, altında satırın alt yarısını boyayan yumuşak bir
  fosforlu kalem izi vardır (dolu kutu ve noktalı çizgi kalktı). Açıkken iz
  kelimenin tamamını sarar, rengi değişmez. Anlam, paragrafın altında
  krem-beyaz, ince altın kenarlı bir kartta açılır: "Kelimenin anlamı" etiketi,
  büyük yeşil kelime, tanım. **Işıl sağ üstten uçarak kartın sol üst köşesine
  konar** (konuşma pozu), feneri kartın köşesini aydınlatır. Tanım içerik
  verisinden (`meaning`) gelir; Işıl kendi cümlesini eklemez.
- **Ne öğrendik?** üç kart yerine tek sütunlu sıkı liste (telefonda 710 → 325 px).
- **Rozet anı (REVİZE — 12 Eki 2026, Hasan'ın geri bildirimi):** ilk sürüm
  tam genişlik, üst kenarı kubbe gibi kıvrılan bir sahneydi. Hasan tablet
  yatayda sol sütun sabit kalırken rozetin de hikâye gibi sağda çıkmasını,
  sürecin sonda kaydırmadan tek ekranda çözülmesini istedi; ovali sevmedi,
  arka planın daha hareketli olmasını istedi. Geçerli düzen: sahne **okuma
  sütununun içinde gece mavisi bir karttır** (köşeleri yuvarlak, kubbe yok);
  yüksekliği ekrandan üst bar çıkınca kalan alana sığar (en çok 680 px), sayfa
  sonu kartın altına oturur ve tablet yatayda adım sütunu yanında durur.
  Kayıttan sonra sahne kendiliğinden tam görünür hâle kayar. Tablet ve
  masaüstünde iki düğme yan yanadır.
  **Hareket:** sahneye gelince arkada altın ışık huzmeleri açılır ve yavaşça
  döner, rozet aşağıdan yükselir; kenarlarda yıldızlar yanıp söner, alttan
  ateşböcekleri yükselir. **Rozetimi Al** ile konfeti yerine **ışık patlaması**:
  rozetten iki ışık halkası yayılır, altın/krem/yeşil kıvılcımlar ve yıldızlar
  dışa saçılır, ardından yukarıdan ışık yağmuru dökülür. Kazanılan rozet nabız
  gibi büyüyüp küçülür, üstünden çapraz bir parıltı geçer (maske rozet
  görselinin kendisidir), Işıl yanında uçar. Patlama ve ışık yağmuru yalnız
  kazanma anındadır; tekrar okumada huzmeler ve nabız vardır, patlama yoktur.
  Yalnız transform/opacity; "hareketi azalt"ta hepsi durur. Rozet alınınca adım
  çubuğundaki son adım da onaylanır.
  Önce "Bölümün sonuna geldin!" + "{Rozet} seni
  bekliyor." + altın **Rozetimi Al**; kayıttan sonra rozet parlar,
  Işıl yanında uçar, "{Rozet} senin!" + "Bu rozet Ödüllerim'e eklendi." +
  sıradaki bölüm kartı (sahne görseli + ad) + yeşil **Sıradaki Bölüme Geç** +
  **Bölümlere dön**. Son bölümde kart Büyük Final Testi + madalya adını
  gösterir, düğme altın **Büyük Final Testine Geç**. Kayıt hatasında aynı yerde
  hata metni + **Tekrar Dene**. Rozeti önceden kazanılmış bölümde "Rozetimi Al"
  ve patlama yoktur: "{Rozet} senin!" + "Bu rozeti daha önce kazanmıştın."
- **Ölçüm (telefon 390 px, Hz. Âdem 2. bölüm, seçim sonrası):** sayfa 8.159 px,
  hikâye 5.012 px; hikâye dışı alan %42 → **%39**, rozet sahnesi hariç
  **%33**. Hedeflenen ~%25'e ulaşılmadı: kalan alanın çoğu kabuk değil
  içeriktir (Sen olsaydın, Senin seçimin, Ne öğrendik, Bugüne Taşı) ve rozet
  anı bilinçli olarak ekran boyudur. Hikâye metni 17,5 → 18 px büyüdü.

#### 3.10.4 Arayüz dili

Çocuğun bilmesi gereken kavram sayısı 6'ya iner: **Harita, Kitap, Bölüm,
Rozet/Madalya/Unvan, Görev, Kelime.** İskele, rota, kapı, durak, atlas gibi
mekân metaforları arayüz metninden çıkar; görsel dünyada kalabilir. Arayüz
metni 10 kelimeyi geçmez, "sen" diye konuşur, doğru/yanlış çağrışımı yapmaz.

| Bugün | Yeni | Durum |
|---|---|---|
| Kalbine en yakın seçeneği düşün. Doğru cevap şimdi açıklanmayacak. | Seçimine hikâyenin sonunda birlikte bakacağız. *(Soru zaten "Ne yapardın?" diye bittiği için tekrar eden ilk cümle atıldı.)* | ✅ Faz A |
| Kararını Onayla | Seçimim bu | ✅ Faz A |
| Şıklar 1-2-3, karşılaştırmada "B" | Şıklar her yerde A-B-C | ✅ Faz A |
| Kararını onayladığında hikâyenin devamı açılacak. | Seçimini yapınca hikâye devam edecek. | ✅ Faz A |
| Bölüm Rotasına Dön | ← Bölümler | ✅ Faz B |
| Keşif Atlasına Dön | ← Harita | Faz C |
| Bölüm Kapısı · Hikâye · 1. Kısım (durak adları) | (kalkar; adım çubuğu) | ✅ Faz B |
| Okuma Araçları | Aa | ✅ Faz B |
| Düşünme Durağı · Seçimini Karşılaştır | Senin seçimin | ✅ Faz B |
| Yolculuk Defteri · Ne Öğrendik? | Ne öğrendik? | ✅ Faz B |
| Hayata Açılan Kapı · Bugüne Taşı | Bugüne Taşı | ✅ Faz B |
| Bölüm Tamamlandı · Rozet Kapısı · Bölümü Tamamla | Rozetimi Al → "{Rozet adı} senin!" | ✅ Faz B |
| {Rozet} haritana işleniyor… | Bu rozet Ödüllerim'e eklendi. | ✅ Faz B |
| Maceraya Başla · Okumak için aşağı kaydır. | (kalkar; hikâye ilk ekranda başlar) | ✅ Faz B |
| Kazanılacak rozet | Bu bölümün rozeti · (kazanılmışsa) Bu rozeti kazandın | ✅ Faz B |
| Kararını Onayla (seçim yapılmadan, soluk) | Bir seçenek seç | ✅ Faz B |
| Bu görev tamamen gönüllü; eklemesen de rozetin ve yolculuğun aynen devam eder. | Bu görev gönüllü; eklemesen de rozetini alırsın. | ✅ Faz B |
| Tahmini süre · Tamamlanma ölçütü | Süre · Ne zaman bitti sayılır? | ✅ Faz B |
| Hikâyenin devamını okudun. Şimdi yalnızca kendi seçimine bakalım. · Bu bölümden yanında götüreceğin üç düşünce. | (kalkar; tek başlık) | ✅ Faz B |
| Rozet Kapısı (rozet alınmadan) | Bölümün sonuna geldin! · {Rozet adı} seni bekliyor. | ✅ Faz B |
| Bölüm Listesine Dön · Rozetin haritanda duruyor… | Bu rozeti daha önce kazanmıştın. · Sıradaki Bölüme Geç · Bölümlere dön | ✅ Faz B |
| Bölümü Baştan Aç | Bölümü baştan başlat (Aa panelinde) | ✅ Faz B |
| Keşif İskelesi · Kazanımlarım · Kelime Defterim · Görevlerim | Alt menü: Harita · Ödüllerim · Kelimelerim · Görevlerim | Faz C |
| Hazırlanıyor (her durakta) | Tek "Yakında" kartı | Faz C |

**Değişmeyen sabit adlar:** Rozet, Madalya, Unvan, Sen Olsaydın, Ne Öğrendik,
Bugüne Taşı, Büyük Final Testi. "Kazanımlarım → Ödüllerim" gerekçesi:
"kazanım" bir müfredat terimidir; veli tarafında aynı ekranın adı zaten
"Ödüller"dir.

#### 3.10.5 Rehber karakter: Işıl

- Bir **ateşböceği**; adı **Işıl.** Gece mavisi ve altın kimliğinden doğar,
  ışık taşıyan bir yol arkadaşıdır; 24 px'te bile okunur. Baykuş Türkçede
  uğursuzlukla anıldığı için seçilmedi. Kıssalarda geçen hayvanlar (karga,
  hüdhüd, karınca, balık, deve, güvercin) hikâyedeki hayvanla karışmasın diye
  bilinçli olarak dışarıda bırakıldı.
- **Metinle konuşur (konuşma balonu); seslendirme ilk sürümde YOKTUR**
  (12 Ekim 2026). Gerekçe: tarayıcılar kullanıcı dokunmadan sesi çalmaz
  (karşılama cümlesi otomatik çalınamaz); bölüm sesli anlatımıyla üst üste
  biner; her yeni cümle yeni kayıt ister. Satırlar kısa ve az olduğu için
  okumanın parçasıdır. İleride balona isteğe bağlı küçük bir "dinle" düğmesi
  eklenebilir.
- **Yalnız şu anlarda görünür:** ilk giriş (bir kez), ilk sözlük kelimesi (bir
  kez), **sözlük kelimesinin anlam kartı (her açılışta, kart kapanınca
  gider — REVİZE 12 Eki 2026, Hasan)**, "Sen Olsaydın" girişi, rozet ve madalya anı (konuşmaz, rozetin yanında
  uçar), yeni kitap duyurusu (bir kez), yolun ucu, boş ekranlar ve **ana ekranda
  çocuğun okuduğu kitabın yanında "Buradasın"** (12 Eki 2026). Cümle en fazla
  12 kelimedir. *(REVİZE 22 Eki 2026: bunlara ek olarak hikâye akışında,
  gerektiğinde; kuralları aşağıda.)*
- ~~**Kesin sınırlar:** hikâye metninin içinde görünmez (anlam kartı hikâye
  metninin dışında ayrı bir yüzeydir; Işıl kartı getirir, tanımı kendisi
  söylemez — tanım içerik verisidir); peygamberler ve dinî
  konular hakkında yorum yapmaz; doğru/yanlış söylemez; çocuğu övmez veya
  derecelendirmez; okuma sırasında ekranda durmaz.~~
  **REVİZE — 21–22 Ekim 2026 (Hasan: "hikâyeye göre hem konuşan hem soran
  olabilir… gerçekten gerekliyse kullanılmalı"):** Işıl **hikâye akışına da
  girer.** Paragraflar arasında, hikâye metninden ayrı bir balonda çocuğun
  aklındaki soruyu sorar ("Neden tam on bir?"), şaşırır, sevinir, kısa tepki
  ve yorum yapar. Cevabı ve açıklamayı anlatıcı verir.
  - Sayı sınırı yoktur. Ölçüt: Satır çıkarıldığında bir şey eksiliyor mu?
    Eksilmiyorsa Işıl girmez.
  - Okurla ve anlatıcıyla konuşur. Hikâyedeki kişilerle konuşmaz, olayın
    içinde yer almaz.
  - Dinî hüküm vermez, ayet yorumlamaz; bunlar anlatıcının işidir. Yaygın
    bir yanlışı dile getirebilir ("Hz. Havva kandırdı, değil mi?"); düzeltmeyi
    anlatıcı yapar. Peygamberler hakkında küçümseyici ya da şakacı konuşmaz.
  - Değişmeyenler: çocuğun "Sen Olsaydın" seçimi için doğru/yanlış söylemez;
    çocuğu övmez veya derecelendirmez; okuma sırasında sabit ya da yüzen
    olarak ekranda durmaz, yalnız akıştaki balonda görünür. Anlam kartında
    tanımı kendisi söylemez; tanım içerik verisidir.
  - **Seslendirme:** Arayüz anlarındaki Işıl satırları seslendirilmez (12 Ekim
    kararı aynen). Hikâye akışındaki Işıl satırları bölümün sesli anlatımına
    girer; anlatıcı daha hafif, ayrı bir tonla okur.
  - İçerik kuralları: içerik brifi §7.10; veri bloğu 5.1. Okuma ekranında
    uygulandı (22 Eki 2026); yayındaki kitaplarda henüz Işıl satırı yok.
- ~~Çizim Hasan'dadır: en az üç poz, 512×512 şeffaf PNG.~~ **REVİZE — 12 Ekim
  2026 (Faz D, Hasan: "bu Işıl karakterini çok güzel yapalım ve
  animasyonlaştıralım"):** Işıl görsel dosya değildir; **kodla çizilir ve
  canlandırılır** (`src/components/cocuk/Isil.tsx`, katmanlı SVG). Gerekçe: PNG
  hareket edemez; kodla çizilen karakter her boyutta keskin kalır ve tema
  renklerinden türer. Karakter sayfası: `/tasarim/isil` (giriş gerektirmez; üç
  poz, üç zemin, 24–128 px boyut merdiveni).
  - **Görünüş:** büyük yuvarlak gece mavisi baş (sol üstten ışık alan degrade,
    ince ışık kenarı), kocaman parlak gözler, pembe yanaklar, uçlarında küçük
    ışıklar olan iki anten, saydam iki çift kanat, karnında altın **fener**
    (ateşböceğinin kendi ışığı, çenesine de vurur) ve **yeşil yol atkısı**
    (yol arkadaşı kimliği; uçları dalgalanır). Renkler `.tema-cocuk`
    token'larından türer; yalnız çocuk ekranlarında kullanılır.
  - **Pozlar:** `durus` (havada süzülür — Buradasın, boş ekranlar), `konusma`
    (el sallar, ağzı birkaç kez açılıp kapanır, başını eğer — balon cümleleri),
    `kutlama` (zıplayıp tam tur döner, kollar havada, gözler gülümser,
    çevresinde parıltılar — rozet, madalya, yolun ucu; konuşmaz).
  - **Sürekli hareket:** kanat çırpma, fenerin nefes alır gibi parlaması, ara
    ara göz kırpma, anten ve atkı salınımı. Yalnız transform/opacity;
    "hareketi azalt"ta hepsi durur, Işıl duruş pozunda kalır. Dekoratiftir,
    ekran okuyucudan gizlenir; söylediği cümle yanındaki metindedir.
  - **Yerleştiği anlar (12 Eki 2026):** ana ekranda ilk giriş (bir kez, her
    çocuk profili için: "Merhaba, ben Işıl! Bu yolculukta yolunu
    aydınlatacağım." · düğme **Merhaba!**), yeni kitap duyurusu, Buradasın,
    yolun ucu; okumada ilk sözlük kelimesi ve "Sen olsaydın?" girişi
    (konuşma), rozet anı (kutlama, rozetin yanında uçar); Büyük Final Testi'nde
    madalyanın ilk kazanıldığı an (kutlama; alıştırmada yok); Görevlerim ve
    Kelimelerim boş ekranları (duruş).

#### 3.10.6 Menü ve profil kartı (KARAR — 12 Ekim 2026, Hasan)

- **Hamburger menü (`KesifMenusu` çekmecesi) kalkar.** Çocuk adına ve
  fotoğrafına dokununca **profil kartı** açılır (mobilde alttan, masaüstünde
  profilin altında): unvan görseli + unvan + bir sonraki unvana kalan kitap
  ("1 kitap daha okuyunca: Değer Toplayıcısı"), rozet ve madalya sayısı,
  **Veli Paneli** ("Annen ya da baban için"), **Çıkış Yap** *(REVİZE 19 Eki
  2026 — 3.11: "Profil değiştir" olur; bağlı cihazda ikisi de yok)*. Sayfa bağlantıları
  kartta tekrar edilmez.
- Sayfalar: mobil ve tablet dikeyde **alttaki 4 sekme** (Harita · Ödüllerim ·
  Kelimelerim · Görevlerim); tablet yatay ve masaüstünde **üst bardaki sekmeler**
  (logo · sekmeler · profil). Bölge şeridi yoktur.
- **REVİZE 12 Ekim 2026 (Hasan) — menü bantları:**
  - Üst satır her genişlikte **düz gece mavisi bir banttır**; alt menü de aynı
    renktedir. İkisi içerikten ayrışan çerçevedir.
  - Telefon ve tablet dikeyde de **logo solda, profil sağda** durur (avatar + ad
    + unvan; "Merhaba," kalktı, 360 px altında yalnız avatar).
  - Ana ekranda çayır bu bandın altından başlar. Eski "ana ekranda lacivert üst
    bant olmasın" kararının yerine geçer.
  - **1024–1279 px sıkı düzendir:** sekmeler daralır, profilde yalnız avatar
    görünür. Eskiden bu aralıkta logo iki satıra düşüyor, sekmeler ve profil
    birbirine giriyordu.
  - ≥1280 px tam düzendir.
- **REVİZE 12 Ekim 2026 (Hasan) — geniş ekran (≥ 1024 px) kart düzeni:** üst
  menü kenardan kenara bant değildir; **içerik genişliğinde (en çok 1360 px),
  yuvarlak köşeli, yarı saydam gece mavisi bir karttır.** Menü ile altındaki
  kartlar (rota, kitap paneli) arasında ve sayfanın altında aynı boşluk
  (24 px) vardır; yan boşluk 40 px. **Üç kartın köşe yarıçapı eşittir
  (28 px)**; değerler `cocuk-kabugu.module.css` içindeki `--kart-yaricap`,
  `--kart-boslugu`, `--kenar-boslugu`, `--icerik-genisligi` değişkenlerinden
  gelir, ana ekran bunları miras alır. Ana ekranın zemini yıldızlı gece
  manzarasıdır (`public/site-genel-arkaplan.jpg`, `varlikYollari.ts:SITE_ARKAPLANI`;
  kapla, alttan hizalı). Ödüllerim · Kelimelerim · Görevlerim'de zemin açık
  krem kalır, menü aynı kart biçimindedir. Telefon ve tablet dikey değişmez
  (yalnız rota görseli yenilendi).
- Veli Paneli bağlantısı Faz 7'de PIN arkasına alınır. *(UYGULANDI — 19 Eki
  2026: veli kapısı, 3.11.)*

#### 3.10.7 Kitap ve bölümleri (KARAR — 12 Ekim 2026, Hasan)

- **Ayrı bölüm rotası sayfası (`/kitap/[kitapKey]`, kıvrımlı bölüm yolu) kalkar.**
  Kitap durağına dokununca mobil ve tablet dikeyde **alttan açılan sayfa**,
  tablet yatay ve masaüstünde **sağ panel** o kitabı gösterir. Bugünkü kitap
  paneli ile bölüm paneli tek yüzeyde birleşir.
- Sağ panel açılışta **çocuğun okuduğu kitabı** gösterir ("Sıradaki bölümün");
  başka durağa dokununca o kitaba geçer. (Bugünkü panel açılışta ilk kitabı
  gösteriyor ve biten kitapta "Tekrar Oku"ya yönlendiriyordu.) "Seçili keşif
  durağı · 1 / 35" sayacı kalkar.
- İçerik sırası: kapak + ad + alt başlık + ilerleme çubuğu, iki satırlık açıklama
  ("Devamı" ile açılır), **Bölümler** listesi, sabit ana düğme ("2. Bölümü Oku").
- **Bölüm listesi küçük bir dikey yoldur:** solda rozet, ortada "N. bölüm" +
  bölüm adı + durum satırı, sağda tek eylem. Okunan bölümlerin arasındaki çizgi
  altınla parlar (ışık izi).
  - Tamamlandı: rozet tam renk + yeşil onay, "{Rozet adı} senin", **Tekrar oku**.
  - Sıradaki: satır altın vurgulu, "N. bölüm · Sıradaki", yeşil ▶ düğmesi.
  - Kilitli: rozet soluk ama renkli, somut şart ("2. bölümü bitirince açılır"),
    kilit simgesi.
  - Görevli bölümde "Görev var" etiketi.
  - Son satır **Büyük Final Testi:** madalya görseli + açılma şartı ya da
    altın "Başla".
- Okuma ekranındaki "← Bölümler" düğmesi haritaya, o kitabın sayfası açık
  hâlde döner.

#### 3.10.8 Ödüllerim, Kelimelerim, Görevlerim (KARAR — 12 Ekim 2026, Hasan)

Hasan: "daha profesyonel, daha görsel bir tasarıma geçirebiliriz." Üç karar:
**gece çerçeve + krem kartlar**, **Ödüllerim tek sayfa vitrin** (sekmeler
kalkar), **Kelimelerim'e yeni özellik yok** (yalnız tasarım).

> **REVİZE 12 Ekim 2026 (Hasan, cihaz kalıplarında baktıktan sonra):** gece
> mavisi zemin geniş ekranda fazla kontrast veriyordu ve menü içerikten
> ayrışmıyordu. Kararlar:
>
> - **Açık zemin, gece menü:** içerik alanı okuma ekranı gibi açık kremdir;
>   gece mavisi yalnız menü bantlarında (3.10.6) ve Ödüllerim'deki **unvan
>   kartında** kalır. Kartlar beyaza yakın, ince çizgili, az gölgelidir.
> - **Unvan kartı:** çocuğun fotoğrafı ve adı kalktı (üst bantta zaten var).
>   Rozet · Madalya · Biten kitap sayaçları büyüdü (ikon diski, büyük sayı).
>   Telefonda alt alta; tablette üstte görsel + unvan, altta sayaçlar (eski üç
>   sütunda unvan adı sayaçların üstüne taşıyordu); ≥1180 px tek satır.
> - **Albüm sayacı:** anlaşılmayan çubuğun yerine "6 / 8 rozet" + rozet başına
>   bir nokta. Kazanılan nokta altın dolu, sıradaki çerçeveli. Alt satır
>   "Sıradaki: {rozet adı}". Madalya kartındaki çubuk da noktalara döndü.
> - **Rozetler tek satır:** genişte 8 rozete kadar yan yana, 9–10 rozet iki
>   dengeli satır; tablet dikeyde eşik 6. Karo adı "Rozeti" eki olmadan
>   yazılır ("İlk Adım"); tam ad ekran okuyucuda ve ayrıntı penceresinde.
> - **Unvan yolu kart ızgarası:** telefonda 2 sütun, 640 px'ten itibaren 5×2.
>   Kazanılan altın + onay, şu anki altın çerçeve + "Şu an", sıradaki kesik
>   çizgili + "N kitap daha", ilerdekiler soluk. Dikey liste ve yatay 10'lu
>   satır kalktı.
>
> Aşağıdaki maddelerde bunlarla çelişen ayrıntı varsa geçerli olan bu
> revizyondur.

- **Ortak dil:** zemin harita gibi gece mavisidir (3.1 korunur). İçerik
  kartları okuma ekranındaki gibi kremdir. Okunacak metin (kelime anlamı, görev
  açıklaması) her zaman krem zemindedir. Başlık + tek satır açıklama + sağda
  özet çipleri (`SayfaBasligi`). Boş ekranlar krem kartta Işıl ile gösterilir
  (`BosEkran`). Düğmeler ana ekranın dilindedir.
- **Ödüllerim** (`/kazanimlarim`), yukarıdan aşağı:
  1. **Unvan kartı:** unvan görseli dönen ışık huzmeleriyle, çocuğun fotoğrafı,
     "Unvanın", bir sonraki unvana ilerleme çubuğu ("Değer Toplayıcısı için 2
     kitap daha"), Rozet · Madalya · Biten kitap sayaçları.
  2. **Madalya rafı:** yayındaki her kitap. Kazanılan madalya parlar, yanında
     "Madalya senin" yazar. Bölümleri biten ama final testi kalan kitapta altın
     **Final Testine Başla** çıkar. Diğerlerinde ilerleme yazar ("4 bölümün
     1'i · sonra final testi"). Telefonda kart yatay satırdır.
  3. **Rozet albümü:** kitap kitap (kapak, ad, "4 rozetin 1'i", çubuk). Rozet
     durumları: kazanılan altın haleli, sıradaki kesik çizgili, kilitli soluk.
     Rozete dokununca **ayrıntı penceresi** açılır (telefonda alttan, genişte
     ortada). Pencere ödül sahnesinin kompakt hâlidir (`KutlamaSahnesi
     kompakt`) ve kitap · bölüm adını gösterir. Kazanılmışsa "Bu rozet senin" +
     Tekrar Oku, sıradaysa "Bu bölümü bitirince senin" + Bölümü Oku, kilitliyse
     "N. bölümü bitirince açılır".
  4. **Unvan yolu:** 10 unvan; telefonda dikey, genişte yatay. Altın iz şu anki
     unvana kadar dolar, şu anki unvanda "Şu an" etiketi durur.
- **Kelimelerim** (`/kelime-defterim`):
  - Arama kutusu ve kitap çipleri (Tümü · Hz. Âdem 8 · Hz. Şît 5).
  - Arama yokken kitap kitap gruplanır (kapak + ad + sayı), bölüm sırasıyla.
  - Kelime kartında kelime okuma ekranındaki sözlük kelimesi gibi işaretlidir
    (yeşil vurgu, noktalı çizgi); anlamı hikâye yazısıyla yazılır.
  - Kartın altında "2. bölüm · Bilginin Armağanı" ve **Bölümü oku** bağlantısı
    bulunur.
  - Aramada düz sonuç listesi çıkar; sonuç yoksa "Aramayı temizle".
- **Görevlerim** (`/gorevlerim`):
  - Çipler "N seni bekliyor · M tamamladın" der.
  - Bekleyen görevler açık krem kartlarda durur (okuma ekranındaki Bugüne Taşı
    kartının dili): kategori, kitap · bölüm, açıklama, Süre / "Ne zaman bitti
    sayılır?", güvenlik notu ve yeşil **Görevi Tamamladım**.
  - Bekleyen yoksa yerinde Işıl'lı sakin bir kart ("Şu an bekleyen görevin
    yok"); eskiden sol sütun boş kalıyordu.
  - Tamamlananlar kompakt satırlarda (yeşil onay, kitap · bölüm, tarih);
    dokununca ayrıntı açılır.
  - Tamamlama anı yalnız bir onay bandı ve satırın kısa parıltısıdır (4.3:
    göreve ödül yok).
- **Veri:** Kitap ve bölüm adları katalogdan gelir (`yolculukKitaplari`).
  Veritabanının aksansız adı ("Hz. Adem") gösterilmez. Unvan biten kitap
  sayısından türetilir; eski `profiles.unvan` okunmaz. `derive.ts`'teki ortak
  fonksiyonlar (veli paneli de kullanır) değişmedi.
- **Kod:** görünüm `src/components/cocuk/` (`OdullerimEkrani`,
  `KelimelerimEkrani`, `GorevlerimEkrani`, `UnvanYolu`, `SayfaBasligi`,
  `BosEkran`); sayfalar yalnız veri çeker. Girişsiz önizleme:
  `/tasarim/oduller`, `/tasarim/kelimeler`, `/tasarim/gorevler` (`?durum=bos`;
  görevlerde `?durum=bekleyen`).

### 3.11 Aile cihazı, profil şifresi ve veli kapısı (KARAR — 19 Ekim 2026, Hasan; Faz 7)

**Gerekçe:** Çocuk girişi kullanıcı adı ve düz metin şifreyle tarayıcıda
yapılıyordu; veritabanı kuralları bu yüzden giriş yapmamış herkese çocuk
profillerini okuma, ilerleme ve görev yazma izni veriyordu (Bölüm 8). Çocuğun
ayrı hesabı kalkar. **Çocuk verisine yalnız velinin oturumu ya da o çocuğa
bağlanmış cihaz erişir.**

- **Ortak cihaz (velinin oturumu açık):** çocuk ekranları **"Kim okuyor?"**
  ekranıyla açılır (`/kim-okuyor`): ailenin çocuklarının avatarları, çocuk
  kendi avatarına dokunur. Çocuk kullanıcı adı ve çocuk şifresiyle giriş
  YOKTUR. Veli kendi kartındaki "Okumaya Devam Et" ile çocuğu doğrudan da
  açabilir (velinin eylemi; şifre sorulmaz).
- **Cihazı çocuğa verme açık bir sorudur (REVİZE 19 Eki 2026, Hasan):** çocuk
  modu artık görünmeden açılmaz. Çocuk modunda olmayan bir cihazda veli
  panelden çocuk ekranı açınca ("Okumaya Devam Et", "Keşif Haritasını Aç",
  Kütüphane) **"Bu cihazı çocuğunuz kullanacak mı?"** sorulur:
  - **"Evet, çocuğuma veriyorum"** → veli PIN'i yoksa önce belirlenir (hesap
    şifresi + PIN), cihaz çocuk moduna geçer (panel kilitlenir) ve **"Kim
    okuyor?"** açılır. Tek çocuklu ve profil şifresi kapalı ailede "Kim
    okuyor?" çocuğu kendiliğinden açar.
  - **"Hayır, yalnız göz atacağım"** → seçilen çocuğun ekranı açılır, cihaz
    çocuk moduna geçmez; panele PIN'siz dönülür. Çocuk tarafında tarayıcı
    oturumu boyunca sürer ("Profil değiştir" ile başka çocuğa bakmak da göz
    atmadır); tarayıcı kapanınca biter. Panelden her yeni açışta soru yeniden
    sorulur: veli cihazı az sonra çocuğa veriyor olabilir, kilitsiz kalmasın.
  - Cihaz zaten çocuk modundaysa (veli panele PIN'le girmiştir) soru sorulmaz.
  - Kurulumda **yalnız veli PIN'i** istenir; çocuk şifreleri sorulmaz, Aile ve
    Güvenlik'te kalır (isteğe bağlı aile ayarı). 3 çocuklu ailede kurulum bir
    dakikayı geçmesin diye (Hasan, seçenek A).
  - Aile ve Güvenlik → **"Bu cihaz"** bölümünde aynı işlem **"Bu Cihazı Çocuğa
    Ver"** düğmesiyle de yapılır; çocuk modundaki cihazda "Çocuk modunu kapat"
    kalır.
  - "Kim okuyor?" adresine sorudan geçmeden gelinirse (yer imi, eski sekme)
    seçilen profil cihazı yine çocuk moduna alır: kuşkuda kilitli taraf seçilir.
- **Çocuğun geri dönüşü (REVİZE 19 Eki 2026, Hasan):** çocuk siteyi kapatıp
  sonra açtığında yolu kaybetmez.
  - **Giriş sayfası (`/login`) açık oturumu tanır,** formu göstermeden
    yönlendirir: bağlı çocuk cihazı → `/map`; çocuğa verilmiş cihaz →
    `/kim-okuyor`; velinin kendi cihazı → `/dashboard`; oturum yoksa form.
    Tanıtım sayfası değişmez; oradaki "Giriş Yap" her cihazda doğru yere
    götürür. Veli hesap değiştirmek isterse panelden çıkış yapar.
  - **Ana ekran notu (veliye, tek seferlik):** cihaz çocuğa verilince
    ("Evet, çocuğuma veriyorum" ya da "Bu Cihazı Çocuğa Ver") "Kim okuyor?"
    üstünde "Son adım: ana ekrana ekleyin" notu çıkar. Adımlar: Safari
    (iPad/iPhone) Paylaş → Ana Ekrana Ekle; Chrome (iPad/iPhone) adres
    çubuğunun en sağındaki Paylaş → Ana Ekrana Ekle; Android Chrome ⋮ → Ana
    ekrana ekle. Not açılınca adres `/kim-okuyor`'a temizlenir ki simge doğru
    sayfayı açsın. Ana ekran uygulamasının içindeyken not çıkmaz.
  - **Ana ekran simgesi ayrı hafızalı bir uygulamadır (DÜZELTME 19 Eki 2026 —
    Hasan iPhone'da denedi):** iOS/iPadOS 26'da Safari'den de Chrome'dan da
    eklenen simge, manifest olmasa da, tarayıcıdan **ayrı hafızalı** bir
    uygulama olarak açılır; tarayıcıdaki veli oturumu ve cihaz bağlantısı
    oraya geçmez. (Önceki "manifestsiz simge tarayıcıda açılır, oturum
    korunur" varsayımı yanlıştı.) Bu yüzden:
    - Simge ilk açılışta **bir kez veli girişi** ister. Çocuk ekranından
      girişe düşülünce (`/login?cocuk=1`) giriş sayfası bunu açıklar ve veli
      giriş yapınca cihaz **kendiliğinden çocuğa verilir** (veli PIN'i yoksa
      önce belirlenir) ve "Kim okuyor?" açılır; panele uğramaz, ayrıca soru
      sorulmaz — veli çocuk ekranından gelmiştir.
    - **Çocuğun kendi cihazında sıra:** önce `/cihaz-bagla` adresi ana
      ekrana eklenir, kod simgeden açılan uygulamada girilir. Kod kartı bu
      sırayı yazar. Bağlanmış cihaz `/cihaz-bagla`'dan açılırsa doğrudan
      haritaya gider.
    - Android'de ana ekran simgesi Chrome'un hafızasını paylaşır; ikinci
      giriş gerekmez.
  - **Web manifest şimdilik EKLENMEZ:** iOS 26'da davranışı değiştirmez;
    uygulama adı ve ikonu marka kesinleşince (ikon tasarımıyla) eklenir.
- **Profil şifresi (aile ayarı, varsayılan KAPALI):** veli panelindeki
  "Profillere girerken şifre sorulsun" ayarı bütün aileye uygulanır.
  - Açıkken her çocuğun **kendi 4 rakamlı şifresi** vardır; veli belirler
    (çocukla birlikte) ve değiştirir. Şifre yalnız şifrelenmiş saklanır,
    sonradan gösterilmez.
  - Şifresi olmayan çocuk kaldıkça ayar açılamaz; ayar açıkken eklenen profil
    şifreyle açılır.
  - Çocuk şifresi **veli PIN'iyle aynı olamaz.**
  - 5 yanlış denemede 5 dakika bekleme. "Şifremi unuttum" → "Annene ya da
    babana söyle"; veli panelden yenisini belirler.
  - Ayar açıkken açık profil, **site yeniden açıldığında** (tarayıcı oturumu
    kapanınca) ya da **30 dakika etkileşim olmayınca** kapanır; ekran
    "Kim okuyor?"a döner.
  - Çocuk ekranında kelime **"şifre"**dir ("4 rakamlı şifreni gir"); "PIN"
    kelimesi çocuğa gösterilmez.
  - İkinci çocuk eklenince veli panelinde ayar bir kez hatırlatılır.
- **Veli kapısı (veli PIN'i, 4 hane):** cihaz **çocuk modundaysa** (bu
  cihazda çocuk ekranı açıldıysa) veli paneline geçiş veli PIN'i ister.
  - PIN, cihaz ilk kez çocuğa verilmeden önce belirlenir; belirleme ve
    sıfırlama hesap şifresiyle yapılır.
  - Panel 15 dakika etkileşimsiz kalınca ya da çocuk ekranına dönülünce yeniden
    kilitlenir. 5 yanlış denemede 5 dakika bekleme.
  - Çocuğa verilmemiş cihazda (velinin kendi telefonu, göz atma) PIN sorulmaz;
    veli panelden "Bu cihazda çocuk modunu kapat" diyebilir.
- **Çocuğun kendi cihazı (eşleme kodu):** veli panelden çocuk için **6
  rakamlı, 10 dakika geçerli, tek kullanımlık** bir kod üretir. Çocuk kendi
  cihazında `/cihaz-bagla` ekranına kodu girer; cihaz o çocuk profiline
  bağlanır (Supabase anonim oturumu + `cihaz_baglantilari`). Bu cihazda yalnız
  o çocuğun verisi açılır; "Kim okuyor?", profil şifresi ve veli paneli
  bağlantısı yoktur. Veli "Bağlı cihazlar" listesinden cihazı kaldırır; cihaz o
  an erişimini kaybeder. Yanlış koda 5 denemede 15 dakika bekleme.
- **Çocuk menüsü:** profil kartındaki **"Çıkış Yap"** (velinin oturumunu
  kapatıyordu) yerine **"Profil değiştir"** → "Kim okuyor?". Bağlı cihazda bu
  düğme ve "Veli Paneli" yoktur.
- **Profil fotoğrafı:** depolama kovası kapalıdır; fotoğraf süreli imzalı
  adresle gösterilir. `profiles.avatar_url` kovadaki yolu tutar
  (`{veli_id}/{profil_id}.jpg?v=…`).
- **Sınır (dürüst not):** profil şifresi ve veli kapısı kardeşi ve meraklı
  çocuğu durdurur, teknik bilgisi olan bir yetişkini değil. Asıl veri koruması
  veritabanı kurallarıdır (Bölüm 8).
- **Ekranlar:** "Kim okuyor?" ve cihaz bağlama çocuk dünyasındadır (gece
  zemin). Aile ayarları veli panelinde **"Aile ve Güvenlik"** sayfasıdır
  (`/dashboard/ayarlar`, hesap menüsünden). Girişsiz önizlemeler:
  `/tasarim/kim-okuyor` (`?sifre=1` şifreli aile; örnek şifre 1234;
  `?kurulum=1` ana ekran notu) ve `/tasarim/cihaz-sorusu` ("Bu cihazı
  çocuğunuz kullanacak mı?"; `?durum=baglandi` kodla bağlanma sonrası kart).

---

## 4. Özellik Kararları

### 4.1 EKLENECEK

| # | Özellik | Açıklama | Veri maliyeti |
|---|---|---|---|
| 1 | Terminoloji standardizasyonu | Tüm ekran metinleri rozet/madalya/unvan sözlüğüne çekilir | Yok (adlandırma) |
| 2 | Tasarım sistemi | Bölüm 3'teki tokenlar + ortak bileşenler (Card, Button, Badge, ProgressBar) | Yok |
| 3 | Veli paneli yeniden kurgusu | Sol menülü (mobilde alt menülü) çok sayfalı yapı: Ana Sayfa, Kütüphane, Ödüller, Gelişim Raporları | Yok — mevcut veriden türetilir |
| 4 | Veli ana sayfası | Bölüm 3.7'deki geniş okuma yolculuğu kartları: avatar, unvan, okunan kitap, ilerleme, son rozet + **çocuğun güncel "Bugüne Taşı" görevi (tek satır, en güncel görev — veli kartı geçmiş görev listesi GÖSTERMEZ; çocuğun tam görev listesi kendi "Görevlerim" ekranındadır, bkz. madde 17)** + son okuma zamanı + "Okumaya Devam Et / Gelişim Raporu / Profili Düzenle". Profil ekleme formu ayrı ekrana taşınır; ana sayfada yalnız kompakt ekleme alanı bulunur. "Şifre Değiştir" sağ üst hesap menüsüne girer | Yok |
| 5 | Kütüphane sayfası (veli) | Tüm kitaplar, çocuk/durum filtresi, arama, kilitli kitap açıklamaları. *(REVİZE 18 Eki 2026: "tüm kitaplar" = çocuk haritasındaki yayındaki kitaplar (7.2); kitap kilidi 3.10.2'de kalktığı için kilit açıklaması ve "Kilitli" filtresi kaldırıldı.)* | Yok — books + user_progress |
| 6 | Ödüller sayfası (veli) | Rozetler / Madalyalar / Unvanlar sekmeleri, rozet detay paneli | Yok — türetilir |
| 7 | Gelişim raporu: modal → sekmeli tam sayfa | Genel Bakış, Kitaplar, Ödüller, **Görevler**, Sohbet Önerileri sekmeleri; mobilde tam ekran | Yok (Görevler `profile_tasks`'tan) |
| 8 | Çocuk kitap detayı: modal → tam ekran sayfa | Bölüm listesi, kazanılacak rozet, final testi kartı (kilitli/açık), çift scrollbar sorunu biter | Yok |
| 9 | Harita durum dili | 3.4'teki durum tablosu uygulanır; "Maceraya Başla" tutarsızlığı düzelir | Yok |
| 10 | Unvan sistemi | Bölüm 2'deki eşik tablosu; `profiles.unvan` alanı zaten mevcut | Çok düşük |
| 11 | Sistem değerlendirme dili | Rapor metinleri kesin hüküm değil gözlem bildirir ("...temaları öne çıktı") | Yok (metin) |
| 12 | Final testi dili | Çocuk ekranında pozitif dil ("5 sorunun 5'ini doğru cevapladın"); veli ekranında sayısal (5 Doğru / 0 Yanlış) | Yok |
| 13 | Final testi geçme ve tekrar mantığı | **Testi ilk kez tamamlamak** madalyayı kazandırır; doğru sayısı şartı YOK. Test bir engel değil, hatırlama+kutlama anıdır. Çocuk kaç doğru yaparsa yapsın testi bitirince madalyayı alır ve sonraki kitap açılır. *(REVİZE — 12 Eki 2026, 3.10.2: kitap kilidi kalktığı için "sonraki kitap açılır" ve "yeni kitabın açıldığı mesajı" ifadeleri Faz C'de "sıradaki kitap önerisi"ne döner; madalya ve kayıt kuralları aynen geçerlidir.)* ~~Doğru sayısı yalnızca veli panelinde sayısal görünür;~~ **REVİZE — 12 Eki 2026 (Hasan): doğru sayısı çocuğun sonuç ekranında da gösterilir** ("4 sorunun 3 tanesini doğru hatırladın." + soru sırasıyla yıldızlı noktalar). Gerekçe: çocuk her soruda cevabı kontrol edince doğru/yanlışı zaten görüyor. Hiç doğru yoksa satır gösterilmez; madalya koşulsuz kalır. Çocuk ekranında yanlışlar utandırıcı vurgulanmaz (kırmızı yok: doğru şık yeşil "Doğru cevap", çocuğun farklı seçimi sarı "Senin seçimin"). İlk tamamlanma kaydı son sorunun bitirilmesiyle başlar; sonuç ekranındaki dönüş eylemi kayıt başlatmaz. Kayıt anında kitabın bütün bölümlerinin tamamlandığı doğrulanır; doğrudan quiz URL'sine gitmek eksik bölüm ilerlemesini `%100` veya `bitti_mi = true` yapmaz. Madalya kutlaması ve yeni kitabın açıldığı mesajı yalnız kalıcı kayıt başarıyla kesinleştikten sonra gösterilir. Kayıt sürerken bekleme durumu, hata hâlinde aynı cevaplar korunarak **Tekrar Dene** gösterilir; başarı olmadan haritadaki final kutlamasına geçilmez. Yazma idempotenttir: `bitti_mi = true` olan kaydın ilk final sonucu, madalyası ve `updated_at` alanı yeniden yazılmaz. Tamamlanan final yeniden açılabilir; bu giriş açıkça **Alıştırma** olarak gösterilir ve `user_progress`, kayıtlı final sonucu, madalya veya `updated_at` alanlarını değiştirmez. Alıştırma modu yalnız kayıtlı `bitti_mi = true` durumundan türetilir; URL parametresi tek başına alıştırma yetkisi vermez. ("Derecelendirmeme" felsefesinin gereği.) **EK — 20 Eki 2026 (Hasan): "Tekrar bakmak istersen".** Sonuç ekranında, cevabı farklı seçilen soruların bölümlerine bağlantı verilir; N. soru N. bölümden gelir (içerik brifi §9). Kutlama kartını boğmasın ve yanlışlar listesi gibi okunmasın diye bağlantılar **kapalı bir açılır alandadır** ("Haritaya Dön"ün altında "Tekrar bakmak istersen"); açılınca her satır bölüm numarası, bölüm adı ve rozetiyle **Tekrar oku** der. Alan yalnız ilk tamamlanma kaydı kesinleşince, kayıtlı finalde ve alıştırmada görünür; kayıt beklerken ya da hatadayken görünmez (çocuk madalyası kaydedilmeden testten ayrılmasın). Test sırasında soru başına bağlantı YOKTUR: çocuk testin ortasında ayrılırsa cevapları kaybolur. Hiç doğru yoksa da görünür (doğru sayısı satırı yine gösterilmez). **EK — 21 Eki 2026 (Hasan'ın bulduğu hata): sonuca dönüş.** "Tekrar oku" ile açılan bölümde üstteki geri düğmesi "Final sonucu" der; rozet anında sıradaki bölüm kartı ve düğmesi yerine yeşil **Final Sonucuna Dön** gelir ("Bölümlere dön" kalır). Dönen çocuk aynı sonuç ekranını görür: aynı başlık ve doğru sayısı, liste açık, patlama yinelenmez, kayıt yeniden başlamaz. Sonuç kesinleşince sekmenin oturum deposunda tutulur (ekran hafızası, kayıt değil; aynı profil, en çok 60 dk) ve adres `?sonuc=1` olur; tarayıcının geri tuşu ve sayfa yenileme de sonuca döner. Test baştan açılınca silinir. | Yok |
| 14 | Kazanımlarım ekranı (çocuk) | Çocuğun kendi rozet/madalya/ünvan koleksiyonunu gördüğü vitrin (`/kazanimlarim`). *(Ekran adı Faz C'de **Ödüllerim** olur — 3.10.4.)* Oyunlaştırmanın çocuk tarafındaki karşılığı; başarı görünür olur | Yok — türetilir |
| 15 | Kelime Defterim ekranı (çocuk) | Çocuğun okuduğu kitaplardaki Kelime Kutusu kelimeleri, anlamlarıyla, aranabilir liste (`/kelime-defterim`). Öğrenilen kelimeler tek yerde birikir | Yok — books.ts'ten türetilir |
| 16 | Bölüm içi karar akışı (KARAR 15 Tem 2026) | "Sen Olsaydın" bağımsız bir bölüm sonu sorusu DEĞİLDİR; hikâyenin karar/doruk noktasına yerleşir. Akış: **Hikâye — 1. Kısım → Sen Olsaydın → Hikâye Devam Ediyor → Seçimini Karşılaştır**. Seçim hikâyeyi DALLANDIRMAZ (tek hikâye); doğru cevap seçim anında AÇIKLANMAZ; hikâye devamı bittikten sonra yalnızca **seçilen şıkkın** karşılaştırma metni gösterilir (her şık için ayrı metin içerikte hazır). Seçim aynı okuma oturumu içinde tutulur (kalıcı kayıt ayrı iştir — bkz. S5). *(REVİZE 20 Eki 2026, Hasan: seçim yalnız **sayfa yenilenince** korunur; bölüm haritadan ("Tekrar Oku") ya da başka bölümden açılınca soru yeniden cevaplanır — ilk seçim S5 kaydında kalır, çocuk karar anında yeniden düşünebilir)* | Yok — books.ts + oturum içi state |
| 17 | "Bugüne Taşı" görev takibi (KARAR 15 Tem 2026) | Görev KOŞULLUDUR (her bölümde değil; kitabın yaklaşık %40–50'sinde görev bulunması editoryal hedeftir, teknik sınır olarak kodlanmaz) ve GÖNÜLLÜDÜR. Çocuk görevde "Görevi Listeme Ekle / Şimdilik Değil" seçer; eklediği görevleri "Görevlerim" ekranında görür, "Görevi Tamamladım" ile işaretler; Tamamlandı/Tamamlanmadı durumu KALICI saklanır (öz bildirim yeterli, kanıt istenmez). Görev; bölüm rozetinin, madalyanın, sonraki kitabın veya ilerlemenin ŞARTI DEĞİLDİR. Son tarih, ceza, seri YOK | Yeni tablo (bkz. 7.3 — Faz 6.1) |
| 18 | Veli tarafında görev görünürlüğü (KARAR 15 Tem 2026 akşam) | Veli, çocuğun aldığı TÜM görevleri ve durumlarını Gelişim Raporu'ndaki **Görevler sekmesinden** görür (Alındı / Tamamlandı, hangi kitap-bölüm, tarih). Ana Sayfa kartı ise yalnız EN GÜNCEL tek görevi durum çipiyle ("Alındı"/"Tamamlandı") gösterir — tam liste değil. Veli görevleri yalnız GÖRÜR, düzenlemez/tamamlamaz (öz bildirim çocuğundur). Rapor dili gözlem bildirir; tamamlanmamış görev eksiklik/başarısızlık olarak sunulmaz | Yok — `profile_tasks`'tan türetilir |
| 19 | Bölüm bölüm veli sohbeti (KARAR 19 Eki 2026) | Gelişim Raporu → Sohbet Önerileri'nde **okunan** (başlanmış, finali bitmemiş) her kitap için bir kart: kitapta ulaşılan son bölüm (numara, ad, `ozet`), o bölümün "Sen Olsaydın" sorusu ("Bu bölümde düşündüğü soru") ve sabit öneri ("Akşam sohbeti için: Bu soruyu ona siz de sorun ve cevabını dinleyin. Sonra hikâyede ne olduğunu birlikte hatırlayabilirsiniz."). Bölüm tamamlanan bölüm sayısından türer; kaydırma konumuna bakılmaz ("Kaldığın yer" değildir), tekrar okunan eski bölüm gösterilmez. **Yalnız son bölüm** gösterilir. **Çocuğun seçtiği şık gösterilmez** — özellik S5'e bağlı değildir; veli göreceğini bilen çocuk "beklenen" şıkkı seçer. Kitabın "Çocuğunuz Sorarsa" yönlendirmeleri kitap okunurken de görünür (zor soru kitabın ortasında gelir); okunan ve biten kitapta **kapalı açılır liste**dir. Kitaplar sekmesi okunan kitapları da listeler (kapak, ilerleme, kitapta gelinen bölüm, son okuma; bölümleri biten ama finali kalan kitapta "Büyük Final Testi kaldı"). Ana Sayfa kartı değişmez (3.8). Girişsiz önizleme: `/tasarim/veli-rapor`. *(REVİZE 22 Eki 2026: Sohbet Önerileri kendi sayfasına (`/dashboard/sohbet`) taşındı, son bölümün sorusu Ana Sayfa'da da "Bu akşamın sohbeti" olarak görünür; "yalnız son bölüm" kuralı aynen geçerli; önizleme `/tasarim/veli-panel?ekran=sohbet` — 3.8, 3.9.)* | Yok — books.ts + user_progress |
| 20 | Karma anlatım ve hikâye içi bloklar (KARAR 21–22 Eki 2026) | Bütün kitapların hikâyeleri karma tarzda yazılır (içerik brifi §7.10): görünür, sıcak anlatıcı; sahne kurma; merak kancaları; Kur'an ve hadis bilgisini değiştirmeyen kurgu. Okuma ekranına üç blok eklenir: Işıl balonu, soru başlığı, "Biliyor muydun?" kutusu (5.1). **Veli bilgi notu:** veli tarafında tek cümle: "Hikâyeler, çocukların daha iyi anlaması için canlı bir anlatımla yazılmıştır; Kur'an ve hadislerde bildirilen bilgiler değiştirilmeden aktarılır." "Kurgu" kelimesi kullanılmaz; veli bunu uydurma bilgi gibi algılayabilir (Hasan, 22 Eki 2026). Önerilen yer: Gelişim Raporu'nun Kitaplar sekmesinin altında tek satır. **Sıra:** okuma ekranına bloklar → Hz. Âdem'in yeniden yazımı (`-ICERIK-v2.md`) → diğer 13 kitabın taraması ve yeniden yazımı. Bir kitabın metni kesinleşmeden o kitap seslendirilmez | Yok — `books.ts` |
| 21 | İki eksenli kaynak ölçeği (KARAR 22 Eki 2026) | İçerik üretiminde her dinî/tarihî bilgi iki soruyla sınıflanır (içerik brifi §4.3): **kaynak kademesi** (A Kur'an · B sahih hadis · C yaygın rivayet ve müfessir yorumu · D kullanılmaz) ve **8–11 yaşa uygunluk** (U1 uygun · U2 yumuşatılarak · U3 veli raporu · U4 hiçbir yerde). Hikâyenin omurgası A, gerekirse B; C az ve rivayet kalıbıyla. Hadis Diyanet *Hadislerle İslâm* ya da Buhârî/Müslim künyesiyle doğrulanır, ajan derece hükmü vermez (§16/17b). Âyet/hadis alıntısına rivayet eklenmez, alıntı anlamı değiştirecek yerden kesilmez (§16/17c). Katalogdaki K1–K4 kitabın, bu ölçek tek tek bilginin kaynak durumunu tarif eder. Yayındaki kitaplara geriye dönük toplu tarama yok; karma tarz yeniden yazımında uygulanır | Yok — içerik kuralı |

### 4.2 SONRAYA BIRAKILDI (ayrı fazlarda)

| # | Özellik | Neden sonra | Gerektirdiği |
|---|---|---|---|
| S1 | Son okuma hareketleri (aktivite akışı) | Yeni event tablosu ister; ilk sürümde `user_progress.updated_at`'ten "son aktivite" özeti gösterilir | `activity_events` tablosu |
| S2 | Ses çubuğu geliştirmeleri (hız, 10sn ileri/geri, kaldığı yerden devam) | Pozisyon kaydı ister | progress'e ses pozisyonu alanı |
| S3 | Hesap aktivasyon akışı (şifre maili yerine tek kullanımlık bağlantı) | Çalışan Shopier akışını bozmadan, kendi fazında. *(ÇÖZÜLDÜ — 20 Eki 2026, Faz 7 3. adım: `/sifre-belirle` bağlantısı, Şifremi unuttum; Bölüm 8)* | E-posta şablonu + token akışı |
| S4 | Çocuk girişi PIN'e geçiş + parola güvenliği | S3 ile birlikte ele alınır (bkz. Bölüm 8). *(ÇÖZÜLDÜ — 19 Eki 2026, 3.11: çocuk hesabı kalktı; ortak cihazda isteğe bağlı profil şifresi, kendi cihazında eşleme kodu)* | Şema + RLS değişikliği |
| S5 | "Sen Olsaydın" cevaplarının **kalıcı** kaydı (geçmiş cevapların saklanması + veli raporunda `high/mixed/low` özet seçimi) | Değerli ama zorunlu değil. **İki ihtiyaç karıştırılmamalı:** seçimin AYNI OKUMA OTURUMUNDA tutulup bölüm sonunda "Seçimini Karşılaştır"da kullanılması S5 DEĞİLDİR — okuma akışının temel parçasıdır (4.1/16, Faz 6.1; oturum içi state, tablo gerektirmez). S5 yalnızca veritabanına kalıcı kayıttır. *(UYGULANIYOR — KARAR 20 Eki 2026, Hasan: kitap sonu veli özeti seçim verisi olmadan her çocukta aynı "mixed" metni gösteriyor, gözlem gibi okunuyordu. Kurallar aşağıdaki notta.)* | Yeni tablo `sen_olsaydin_secimleri` |
| S6 | Peygamber sıfatları ve melekler: set düzeyi bilgi (22 Eki 2026) | Peygamberlerin ortak sıfatları (Sıdk, Emanet, İsmet, Fetânet, Tebliğ) ve meleklerin tanıtımı hiçbir kitapta yok; müfredatta standart olduğu için velinin beklediği bir konu. Tek bir kitabın içine değil, set düzeyinde bir yere aittir; hangi ekran (veli paneli, Kelimelerim, "Peygamber nedir?" sayfası) olacağı ayrı karar. "İsmet"in zelle ayrıntısı 8–11 yaşa sadeleştirilmeli | Ekran kararı + içerik (iki eksenli ölçekle) |

> **Not (değişken veli özeti — REVİZE 20 Eki 2026, Hasan; S5):** İçerik
> şablonunda veli özeti üç varyant olarak yazılır (`high` / `mixed` / `low`) ve
> çocuğun "Sen Olsaydın" seçimlerine göre seçilir.
> - **Kayıt:** Her bölümde çocuğun **ilk** seçimi kalıcı tutulur (seçilen şık +
>   o anki içerikte değeri yaşatan şık olup olmadığı). Bölüm tekrar okununca
>   kayıt değişmez: doğruyu gördükten sonra değiştirip oranı şişirmesin. Kayıt
>   değiştirilemez; profil silinince silinir. Kayıt başarısız olursa okuma akışı
>   etkilenmez (ilerleme, rozet ve madalyanın şartı değildir).
> - **Seçim:** Kitap bitince (`bitti_mi`) o kitapta kayıtlı ilk seçimlerin
>   oranı: **≥%70 `high`, %40–70 `mixed`, <%40 `low`.** Kitabın bölüm sayısının
>   en az yarısı kadar kayıt yoksa oran hesaplanmaz.
> - **Veri yoksa paragraf gösterilmez.** Eski "S5 gelene kadar `mixed`"
>   varsayılanı kalktı: veriye dayanmayan bir gözlem cümlesiydi. S5'ten önce
>   bitirilmiş kitaplar bu yüzden özetsiz görünür.
> - **Veli tek tek seçimleri görmez; oran, yüzde ya da puan hiçbir yerde
>   gösterilmez** (çocuk "beklenen" şıkkı seçmesin — 4.1/19 ile aynı ilke).
>   Çocuğun ekranında hiçbir şey değişmez. `/tasarim/*` önizlemeleri kayıt
>   yapmaz.
> - **Bilinen sınır:** sorular şu an kolay (doğru şık çoğu zaman en uzun,
>   zayıf şıklar açıkça kötü); sorular brifin 7.6 kurallarına göre
>   düzeltilene kadar çoğu çocuk `high` alır. Kayıt, soruların ne kadar
>   ayırt edici olduğunu da gösterir.

### 4.3 EKLENMEYECEK (bilinçli karar)

- Puan sistemi (420/800 vb.) — unvanlar kitap sayısına bağlı.
- Altın/gümüş/bronz madalya kademeleri.
- Günlük seri (streak), ekran süresi yönetimi, sürekli bildirim.
- Değer radar grafiği (ölçülemeyen psikolojik puanlama üretir).
- Seri kartları ("Peygamber Hikâyeleri Serisi" paketleri) — tek yol var.
- "Sen Olsaydın" seçeneklerinde özel görsel (bkz. Bölüm 6.3).
- **"Bugüne Taşı" görevleri için bağımsız ödül ekonomisi** — göreve ayrı rozet,
  madalya, puan veya para benzeri sanal ödül VERİLMEZ; görev tamamlama kitap
  ödüllerinin şartı YAPILMAZ. Görev tamamlanınca hafif bir görsel kutlama /
  olumlu geri bildirim gösterilebilir; bu, yeni bir koleksiyon ödülüne dönüşmez.
  "Görevlerim" ekranındaki Tamamlandı durumu çocuğun ilerlemesini görmesi için
  yeterlidir.

---

## 5. Sayfa Haritası

### 5.1 Çocuk tarafı

| Rota | Ekran | Not |
|---|---|---|
| `/map` | Keşif Dünyası (harita) | Masaüstü/tablet: hafif zikzak dikey yol; mobil: düz dikey yol. Aktif kitap en büyük kart. **REVİZE — 12 Eki 2026 (3.10.1, Faz C):** bölgesiz tek dikey rota, üstte "Sıradaki bölümün" kartı, yayında olmayan kitap görünmez |
| `/kitap/[bookId]` | Kitap Yolculuğu (detay) | YENİ — modal yerine tam sayfa. Bölüm listesi + final testi kartı |
| `/reader/[chapterId]` | Okuma akışı | Mevcut rota korunur. **Bölüm tek sayfada kaydırılır (REVİZE — 26 Tem 2026, Faz 6.2); sayfa yoktur, "durak" vardır.** Duraklar: hikâye (**1. Kısım + Hikâye Devam Ediyor**), **Tanık Sayfası**, Sen Olsaydın, **Seçimini Karşılaştır**, Ne Öğrendik, Bugüne Taşı (**varsa**), Rozet Kapısı. Bölüm içi sıra için aşağıdaki "Bölüm içi akış" kararına bak |
| `/quiz/[bookId]` | Büyük Final Testi | Mevcut rota korunur |
| `/kim-okuyor` | Kim okuyor? | YENİ (Faz 7, 3.11) — ortak cihazda çocuk ekranlarının girişi: avatarlar, aile ayarı açıksa 4 rakamlı profil şifresi |
| `/cihaz-bagla` | Cihaz bağlama | YENİ (Faz 7, 3.11) — çocuğun kendi cihazı: velinin ürettiği 6 rakamlı kod girilir |
| `/kazanimlarim` | Kazanımlarım (çocuk) | YENİ — çocuğun topladığı rozetler, madalyalar ve ünvanı gördüğü vitrin ekranı. Koleksiyon/başarı hissi verir; veri türetilir (yeni tablo yok) |
| `/kelime-defterim` | Kelime Defterim (çocuk) | YENİ — çocuğun okuduğu kitaplardaki Kelime Kutusu kelimeleri, anlamlarıyla, aranabilir liste. Kelimeler `books.ts`'te zaten var; çocuğun gördükleri toplanıp gösterilir |
| `/gorevlerim` | Görevlerim (çocuk) | PLANLANDI (Faz 6.1 — onaysız başlamaz) — çocuğun profiline eklediği "Bugüne Taşı" görevleri: görev adı, geldiği kitap+bölüm, Tamamlandı/Tamamlanmadı durumu, "Görevi Tamamladım" eylemi, görev ayrıntısı (varsa güvenlik notu görünür). **Rota adı ve giriş noktası ONAYLANDI (15 Tem 2026):** rota `/gorevlerim`; giriş, haritadaki Kazanımlarım / Kelime Defterim buton grubuna eklenen üçüncü buton |

**Bu üç ekranın kabuğu (6 Ağu 2026):** `/kazanimlarim`, `/kelime-defterim` ve
`/gorevlerim` ortak `KesifSayfaKabugu` ile açılır — atlas ve bölüm rotasıyla aynı
genişlik ve aynı üst bar. Giriş noktaları: masaüstünde üst bardaki Keşif İskelesi
şeridi, dar ekranda atlasın alt iskelesi ve menü çekmecesi. Ayrıntı: **3.7.2.2**.

**Bölüm içi akış (KARAR 15 Tem 2026):** Her bölüm şu sırayla okunur:
1. **Hikâye — 1. Kısım** (karar/gerilim noktasında biter)
2. **Sen Olsaydın?** (her bölümde; soru hikâyenin doğal akışından doğar)
3. **Hikâye Devam Ediyor** (kararın doğurabileceği sonuç hikâyede görülür)
4. **Seçimini Karşılaştır** (yalnızca çocuğun seçtiği şıkka ait metin gösterilir)
5. **Ne Öğrendik** (üç kısa madde)
6. **Bugüne Taşı** (yalnızca görev tanımlanan bölümlerde)
7. **Rozet Kapısı** (akışın sonu)

**İllüstrasyon ayrı bir adım değildir (REVİZE — 26 Tem 2026):** görseller 1. Kısım
ve Devam bölümlerinin içine, ait oldukları sahnenin geldiği yere serpiştirilir.

Kuralları: seçim hikâyeyi DALLANDIRMAZ; doğru cevap seçim anında AÇIKLANMAZ;
seçim aynı okuma oturumunda tutulur (kalıcı kayıt S5'tir). **Sayfa yenilenirse
seçim korunur (KARAR 15 Tem 2026 — `sessionStorage`; tablo gerektirmez),** bölüm
ilerlemesinin yenilemede korunması davranışıyla tutarlı olması için. Tanık
Sayfası, kullanılan kitaplarda hikâye akışının içinde kalmaya devam eder.

Okuma ekranı düzeni (**REVİZE — 26 Temmuz 2026, Hasan onayı; Faz 6.2**):
- **Tüm cihazlarda tek sütun, kesintisiz kaydırma.** Masaüstünde fare tekerleği,
  tablet ve telefonda parmakla doğal kaydırma. Sayfa çevirme, sayfa bölme ve iç
  kaydırma alanı yoktur.
- **İllüstrasyon akışın içindedir** — ait olduğu sahnenin geldiği yerde görünür.
  Geniş ekranda metin sütunundan taşabilir; dar ekranda kullanılabilir genişliği
  doldurur. Metin ve görsel hiçbir kırılımda yan yana konmaz.
- Kelime Sandığı ayrı kutu değildir: kelime metnin içinde işaretlidir, dokununca
  anlamı **kelimenin altında** açılır.
- **Alt gezinme çubuğu kaldırılmıştır.** Yerine üstte daralan sabit başlık + ince
  altın ilerleme çubuğu + aktif durak adı gelir. "Sayfa 3 / 12" göstergesi
  kullanılmaz. Ses süresi ayrı kalır: "01:18 / 06:45".
  *(REVİZE — 12 Eki 2026, Faz B: ince çubuk ve durak adı yerine adım çubuğu /
  adım sütunu; ses süresi "Dinle"ye basınca açılan ses şeridinde — 3.10.3.)*
- **Büyük butonlar akışın içinde, geldiği yerde durur:** Maceraya Başla (kapağın
  altında, kaydırmayı başlatan animasyonlu ipucu) / Kararını Onayla (karar
  kartında) / Görevi Listeme Ekle — Şimdilik Değil (görev kartında) / Bölümü
  Tamamla (Rozet Kapısı'nda, akışın sonunda).
  *(REVİZE — 12 Eki 2026, Faz B: Maceraya Başla kalktı; "Seçimim bu" /
  Görevi Listeme Ekle — Şimdilik Değil / Rozetimi Al → Sıradaki Bölüme Geç
  (son bölümde Büyük Final Testine Geç) + Bölümlere dön — 3.10.3.)*
- **"Sen Olsaydın" bir kapıdır:** karar onaylanmadan sonrasındaki içerik
  **render edilmez** (DOM'da da bulunmaz; bulanıklaştırma veya kilit görseliyle
  gizlenmez). Onaylandığında devamı açılır ve akış yeni içeriğin başına yumuşakça
  kaydırılır.
- **"Kaldığın yer" özelliği KALDIRILDI (KARAR — 28 Temmuz 2026, Hasan).**
  26 Temmuz'da eklenen otomatik okuma konumu kaydı üretime alınmadan geri
  çekildi. Gerekçe: **kaydırma konumu, okunan yerin güvenilir göstergesi
  değildir.** Çocuk bölümün yarısına gelip metni okumadan yukarı/aşağı
  kaydırabilir, sonra sayfadan çıkabilir; sistem gerçekte nerede kaldığını
  bilemez ve yanlış yere götürür. Yanlış "kaldığın yer" hiç olmamasından kötüdür.
  Bölüm her açılışta baştan başlar; ilerleme göstergesi ve durak göstergesi
  çocuğun nerede olduğunu zaten canlı gösterir.
- **Tanık Sayfası:** okuma akışına giren özel bir sayfa tipi; olayları hikâyedeki
  bir çocuk/genç karakterin günlüğünden anlatır (el yazısı font + defter görünümü).
  **Tamamen opsiyoneldir** — kullanılan kitaplarda 2-3 kez, bölümün doruk
  noktasından sonra; her kitapta bulunmak zorunda değildir (Hz. Âdem'de yoktur). Veri alanları: `witnessName`,
  `witnessLabel`, `body`, `isFictional` (kurgusal karakterde sayfa altına "Bu
  sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir." notu gösterilir).
- **Hikâye içi yardımcı bloklar (KARAR — 22 Ekim 2026, Hasan; UYGULANDI 22 Eki
  2026, `AtlasScrollReader` + `okuma-akisi.module.css`; önizleme
  `/tasarim/okuma?bolum=adem-4&ornek=karma`, `yusuf-1` de var — örnek metin
  `src/data/karmaOrnek.ts`, yalnız önizleme):** karma anlatım tarzının (içerik
  brifi §7.10) üç bloğu.
  Hikâyenin iki parçasında, metin blokları arasında durur. Okuma zemini krem
  kalır; renkler token'dan gelir.
  - **Işıl balonu:** `{ type: "isil"; text; poz?: "konusma" | "durus" | "kutlama" }`.
    Kodla çizilmiş `Isil` bileşeni (3.10.5) ve ilk sözlük kelimesindeki balon
    deseni kullanılır. Hikâye metninden görsel olarak ayrıdır.
  - **Soru başlığı:** `{ type: "soru_basligi"; text }`. Dönüm noktasında kısa
    başlık.
  - **Bilgi kutusu:** `{ type: "bilgi_kutusu"; baslik?; text }`. Varsayılan
    başlık "Biliyor muydun?".
  - Kelimelerim ve sözlük türetmesi bu blokları okumaz. Sesli anlatım Model A
    olarak kalır (Işıl satırları anlatıcının sesinde, 3.10.5).
  - Teslim dosyasındaki `[[…]]` kurgu işareti veri değildir; aktarımda kaldırılır.
- **Sesli anlatım (KARAR — Model A):** Play'e basıldığında **bölümün tamamı**
  baştan sona kesintisiz çalar; ses, metin kaydırmasına bağlı DEĞİLDİR (çocuk
  dinlerken metni kendi takip eder veya sadece dinler). Bu, "telefon =
  dinleyerek devam etme cihazı" kararıyla (Bölüm 1) uyumludur. "Kaldığı yerden
  devam" (ses pozisyonu kaydı) S2'de eklenir; Model A bu özellikle anlamlı çalışır.

### 5.2 Veli tarafı

| Rota | Ekran | Not |
|---|---|---|
| `/dashboard` | Ana Sayfa | **REVİZE 22 Eki 2026:** karşılama kartı, çocuk kartları, bu akşamın sohbeti, son gelişmeler (3.8) |
| `/dashboard/sohbet` | Aile Sohbeti | **YENİ 22 Eki 2026** — bölüm bölüm sohbet soruları ve kitap sonu sohbeti (3.9) |
| `/dashboard/gelisim` | Gelişim | **YENİ 22 Eki 2026** — Kitaplar · Ödüller · Görevler; `?cocuk={profilId}`, `?sekme=oduller\|gorevler` (3.9) |
| `/dashboard/kutuphane` | Kütüphane | Kapak rafı + durum filtresi; kitap ayrıntısı alttan/sağdan açılır (3.9) |
| `/dashboard/ayarlar` | Aile ve Güvenlik | YENİ (Faz 7, 3.11) — veli PIN'i, profil şifresi ayarı ve çocuk şifreleri, cihaz bağlama ve bağlı cihazlar, bu cihazda çocuk modu. **REVİZE 22 Eki 2026:** ana menüde "Aile"; çocuk profilleri ve profil düzenleme de burada. Adres değişmedi (`?pin=gerekli` akışı buraya gelir) |
| `/dashboard/profil-ekle` | Çocuk profili ekle | Aile sayfasından ve Ana Sayfa'daki ekleme satırından açılır |
| ~~`/dashboard/oduller`~~, ~~`/dashboard/rapor`~~, ~~`/dashboard/rapor/[profileId]`~~ | — | **22 Eki 2026:** Gelişim'e yönlendirir (eski bağlantılar kırılmasın) |
| `/login` | Veli girişi | **REVİZE — 20 Eki 2026 (Hasan):** hesap sayfalarıyla (`/sifre-belirle`, `/sifremi-unuttum`) aynı çerçeve: krem zemin, logo, ortada tek kart, "siz" dili. Kartta "Veli Girişi", e-posta, şifre, yeşil "Giriş Yap", "Şifremi unuttum". Eski iki eşit kart ("Yönetim Paneli" + "Keşif Haritası") kalktı: gelenlerin çoğu giriş yapacak veli; tableti çocuğa verme açıklaması gereksizdi (giriş sonrası "Bu cihazı çocuğunuz kullanacak mı?" sorusu bunu yapar). Çocuğun kendi cihazı için kartın altında ikincil satır ve çerçeve düğme **Cihaz Kodunu Gir** (`/cihaz-bagla`). Altta "Ana sayfaya dön". Açık oturumu tanıyıp yönlendirme ve `?cocuk=1` notu aynen kalır (3.11) |
| `/sifre-belirle` | Şifre belirleme | YENİ (Faz 7, 3. adım) — e-postadaki tek kullanımlık bağlantı; süresi dolmuşsa yenisi istenir |
| `/sifremi-unuttum` | Şifremi unuttum | YENİ (Faz 7, 3. adım) — giriş sayfasından; "e-postayı yeniden gönder" de budur |
| `/yonetim` | Yönetim (satışlar) | YENİ (Faz 7, 3. adım) — yalnız yönetici; elden satış + son siparişler; sitede bağlantısı yok |

**Profili Düzenle penceresi (`/dashboard` çocuk kartı → Profili Düzenle;
REVİZE 22 Eki 2026: Aile ve Güvenlik → Çocuklar → çocuğun satırı, alttan/sağdan
açılan panel; avatar seçimi de eklendi):**
çocuğun **ismi**, çocuk kullanıcı adı ve şifresi, **profil fotoğrafı** ve profil
silme tek pencerede toplanır (GENİŞLETİLDİ — 8 Ağustos 2026, Hasan). Önceden
yalnız kullanıcı adı ve şifre değiştirilebiliyordu; isim yanlış girildiğinde
profili silip yeniden kurmak gerekiyordu. Kaydet tek işlemdir: fotoğraf da isim
de aynı anda yazılır, Vazgeç hiçbir şeyi değiştirmez.

Navigasyon *(REVİZE 22 Eki 2026 — Hasan)*:
- **Beş hedef:** Ana Sayfa · Sohbet · Gelişim · Kütüphane · Aile. Hamburger yok.
- **< 1024 px:** üstte sade bar (marka + hesap düğmesi), altta sabit sekme
  çubuğu; etkin sekme altın zeminli ikonla gösterilir.
- **1024–1279 px (tablet yatay):** solda ikon + etiketli dar ray (96 px).
- **≥ 1280 px:** solda gece mavisi yan menü (272 px): marka, beş hedef,
  çocukların kısa listesi (son okuma), "Çocuk Ekranına Geç", hesap.
- Hesap menüsü: e-posta, Aile ve Güvenlik, Şifre Değiştir, Çıkış Yap.
- Çocuk ekranına her geçiş `useCocukEkraniGecisi` sorusundan geçer (3.11).
- Önizleme (giriş gerektirmez, örnek aile, Supabase'e yazmaz):
  `/tasarim/veli-panel` (`?ekran=ana|sohbet|gelisim|kutuphane|aile`,
  `?durum=tek|yeni|bos`). Canlı panel ve önizleme aynı ekran bileşenlerini
  kullanır (`src/components/veli/`); sayfalar yalnız veri ve eylem bağlar.

### 5.3 Ekran metni düzeltmeleri

- "Haritaya Gir" → **"Okumaya Devam Et"** (ana aksiyon) + "Keşif Haritasını Aç"
- "İstatistikler" → **"Gelişim Raporu"**
- Avatar seçimi açılır liste değil **görsel kartlarla** yapılır.

---

## 6. Görsel Varlık Sistemi

### 6.1 Klasör ve isimlendirme (REVİZE — 27 Temmuz 2026, Hasan onayı)

Önceki düzen tüm görselleri tek klasörde, adın içine gömülmüş anahtarlarla
tutuyordu (`rozet-adem-bolum-1.png`). Yüzlerce dosya aynı klasörde biriktiği
için Hasan'ın bir bölümün görsellerini bulup değiştirmesi zorlaşıyordu. Yeni
düzen **kitap → bölüm** hiyerarşisini klasör yapısına taşır:

```
public/
  kitaplar/
    placeholder-sahne.jpg              sahne yedeği (16:9)
    placeholder-kapak.svg              kitap kapağı yedeği
    hz-{bookKey}/
      kapak.png                        kitap kapağı (dikey; kütüphane, kitap paneli)
      harita-durak.png                 rota durağı: iç sahne + ortak halka (`odul-cerceve -- durak`)
      bolum-{n}/
        kapak.jpg                      bölüm açılış sahnesi (16:9)
        {kisa-ad}.jpg                  bölüm içi sahneler (16:9)
  rozetler/
    hz-{bookKey}/bolum-{n}.png         bölüm başına bir rozet
  madalyalar/
    hz-{bookKey}.png                   kitap başına bir madalya (her kitap farklı)
  unvanlar/
    {unvan-anahtari}.png               ör. bilge-yolcu.png
  avatarlar/
    avatar-{1..10}.jpg                 10 avatar
  harita/
    rota-harita-arkaplan.jpg           ana ekran rotasının boyalı, dikişsiz tekrar eden arka planı (3.10.1);
                                       üstündeki hareket katmanı kodla çizilir (CanliCayir.tsx, 17 Eki 2026)
    rota-cayir.svg                     (kullanılmıyor — eski kodla çizilmiş çayır)
  site-genel-arkaplan.jpg              çocuk ana ekranının geniş ekran gece zemini (3.10.6)
  sesli-anlatim/
    placeholder-ses.mp3                ses yer tutucusu (6.5)
    hz-{bookKey}/hz-{bookKey}-bolum-{n}.mp3   bölüm başına bir anlatım (12 Eki 2026)
```

- **Yol üretimi tek kaynaktan yapılır: `src/lib/varlikYollari.ts`.** Hiçbir
  ekran kendi içinde yol string'i kurmaz. Klasör düzeni yeniden değişirse
  yalnız bu dosya güncellenir.
- **Okuma sayfası görselleri 16:9'dur (KARAR 27 Tem 2026)** ve uzantı
  **`.jpg`'de sabittir** — sahneler fotoğrafiktir, JPEG aynı kalitede PNG'nin
  onda biri yer kaplar. Kitap kapağı dikey olduğu için bu orana tabi değildir.
- **Sitedeki kopya sıkıştırılır (KARAR 20 Ekim 2026, Hasan).** `public/kitaplar`
  altındaki `.jpg`'ler en fazla **1600 px** genişlikte, mozjpeg **kalite 82**
  ile tutulur: `npm run gorsel-sikistir`. Okuma sütunu en fazla 720 px olduğu
  için retina tablette gereken ~1440 px'tir; 1920×1080 üretim dosyası 600–800
  KB'tan ~180 KB'a iner, gözle fark görülmez (Hasan karşılaştırmayla onayladı).
  Bir bölüm açılışında inen görsel ~4 MB'tan ~1 MB'a düştü. Betik yalnız
  1600 px'ten geniş ya da 300 KB'tan ağır dosyaya dokunur; sıkıştırılmışı
  yeniden sıkıştırmaz. Görsel üretim oturumu yeni görseli aynı adla yazdıktan
  sonra betiği çalıştırır. **Orijinaller saklanır (Hasan):** betik sıkıştırmadan
  önce tam boyutlu dosyayı `gorsel-kaynaklari/kitaplar/` altına aynı göreli
  yolla kopyalar (git'e girmez); 20 Eki 2026'daki ilk turun 467 orijinali de
  oradadır (git'teki hâliyle bayt bayt doğrulandı). Okuma ekranında ilk görsel
  dışındakiler tembel yüklenir (`loading="lazy"`).
- **Harita durağı görseli kapaktan AYRIDIR (KARAR 8 Ağustos 2026, Hasan).**
  Atlas haritasındaki yuvarlak madalyon `harita-kapak.jpg` dosyasını kullanır;
  dikey kapak 70px'lik daireye `object-fit: cover` ile sığdırılınca kompozisyonun
  üstü ve altı kesiliyor, kitap adı okunmuyordu. Bu görsel **kare** hazırlanır
  (512×512 veya üstü) ve **JPG**'dir — daire maskesini CSS çizdiği için
  şeffaflık gerekmez. Dosya yoksa ekran kitap kapağı yedeğine düşer, kod
  bozulmaz. Kapak (`kapak.png`) kütüphanede, kitap panelinde, bölüm rotasında
  ve veli kartında kullanılmaya devam eder.
  **REVİZE — 20 Ekim 2026 (Hasan):** ekranda çizilen dosya artık
  `kitaplar/hz-{bookKey}/harita-durak.png`'dir — **336×336 paletli şeffaf PNG**
  (~40 KB; ekranda en fazla 112 px çizilir, 3x ekrana yeter; görseller sitede
  küçültülmeden sunulduğu için dosya boyutu doğrudan sayfa ağırlığıdır — 12 durak
  4,9 MB'tan 0,5 MB'a indi), iç sahne + ortak halka çerçeve, **mine bandın yeri
  şeffaf**
  (`npm run odul-cerceve -- durak {bookKey}`). Bandın rengi ve ilerlemesi CSS'ten
  gelir; bu yüzden kitap başına tek görsel yeter, renk değişse de yeniden üretim
  gerekmez. İç sahne çerçevesiz kare olarak
  `gorsel-kaynaklari/duraklar/hz-{bookKey}.jpg`'de durur. 20 Ekim 2026'daki
  kaynaklar eski `harita-kapak.jpg`'lerin iç dairesinden kırpılmıştır ve
  geçicidir (Âdem ve İdrîs, eski sahnelerinde yazı olduğu için 21 Ekim 2026'da
  yazısız yeniden üretildi: tepede genç ağaç · yıldız altında yün yumağı ve iğ);
  Hasan yeni sahneyi aynı adla koyup betiği çalıştırır. Yeni sahnelerde yazı olmaz.
  `harita-kapak.jpg` dosyaları ekranda kullanılmadığı için 21 Ekim 2026'da
  kaldırıldı (iç sahne kaynakları `gorsel-kaynaklari/duraklar/`'da). `harita-durak.png` yoksa ekran durak yedeğine düşer.
- **Rozet, madalya ve unvan PNG'dir — 512×512, şeffaf zemin (REVİZE 7 Ağustos
  2026, Hasan).** Önceki karar SVG'ydi; üç gerekçeyle değiştirildi:
  - **Ölçek avantajı karşılıksız.** Bu görseller ekranda en fazla **72px**
    çiziliyor (`OdulIkonu` çağrıları 13–72px arası). 3x ekranda bile 216px
    gerekir; 512×512 PNG bunun iki katından fazlasını verir. Vektörün "sonsuz
    ölçeklenme" faydası bu projede fiilen kullanılmıyor.
  - **Üretim biçimiyle uyum.** Rozet brifleri gradyan, doku, parlama ve ışık
    huzmesi tarif ediyor. Bunlar raster üretimin doğal alanı; vektörde ya
    karşılanamıyor ya da elle çizim yükü doğuruyor. 216 rozetin vektörleştirilmesi
    hem üretim maliyeti hem kalite kaybı demekti.
  - **Tek kural.** Rozet PNG, madalya SVG gibi karışık bir düzen ileride "hangi
    ödül hangi uzantıda?" tuzağı üretirdi; üç ödül tipi birlikte taşındı.

  Dosya boyutu tek dezavantajdır ve sıkıştırmayla karşılanır. **21 Ekim
  2026:** görseller sitede küçültülmeden (düz `<img>`) sunulduğu için çerçeve
  betiği hepsini **paletli PNG** yazar — 512×512 kalır, görünür fark yoktur;
  rozet ~45 KB, madalya ~75 KB, unvan ~55 KB (öncesi 230–350 KB). Ödüllerim
  sayfasının ödül görselleri ~25 MB'tan ~5,4 MB'a indi. Yedek
  (placeholder) dosyalar SVG kalır — onlar ayrı dosyalardır, her zaman çözülür.
  Final Kapısı ikonu da SVG kalır; o bir arayüz ikonudur, ödül görseli değildir.
- **Ortak ödül çerçevesi — kodla çizilir (KARAR 20 Ekim 2026, Hasan).** Rozet,
  madalya ve unvanın çerçevesi tek bir betikte kodla çizilir:
  `scripts/odul-cerceveleri.mjs` (`npm run odul-cerceve`). İç görsel
  **çerçevesiz** üretilir ve `gorsel-kaynaklari/` altında saklanır (repoya
  girmez); betik onu çerçevenin penceresine yerleştirip 512×512 şeffaf PNG'yi
  `public/` altındaki **aynı adla** yazar. Yol ve kod değişmez.
  - **Biçimler** (ortak malzeme: parlak altın, mavi mine, yüzeyli mavi taş,
    dört köşeli yıldız, defne): **rozet = kalkan** (tepe ve alt taş, yan taşlar,
    köşe kıvrımları) · **madalya = defne kanatlı yuvarlak halka** (taç
    yaprakları, alt kıvrımlar) · **unvan = kitap temalı pano** (Hasan'ın
    "Kitap temalı" örneğine göre: kemerli pencere, kıvrım başlıklı kolonlar,
    tepe taşı, yanlarda defne, önde açık kitap; yazı yok). Unvan penceresinin
    zemini gece göğüdür (lacivert, yıldızlar, ikonun arkasında altın hale); iç
    ikonlar Hasan'ın şeffaf PNG'leridir (`gorsel-kaynaklari/unvanlar/{anahtar}.png`).
  - **Neden kod:** 216 rozet + 35 madalya + 10 unvan aynı çerçeveyi taşır.
    Tasarım değişirse yalnız betik değişir ve bir komutla bütün set yeniden
    çizilir; Photoshop'ta tek tek işlem yok. İlk deneme Hz. İbrahim'de yapıldı,
    20 Eki 2026'da 8 kitapla canlıya çıktı.
  - **Komutlar:** `npm run odul-cerceve -- kitap {bookKey}` (o kitabın bütün
    rozetleri + madalyası) · `npm run odul-cerceve -- unvan [anahtar…]`.
    Betik aynı kaynaktan byte byte aynı dosyayı üretir.
  - **Kapsam:** yayındaki 12 kitabın 84 rozeti, 12 madalyası ve 10 unvanın
    hepsi bu çerçevededir. Âdem, Şît ve Nûh'un eski tek parça çerçeveli
    görselleri ile İdrîs'in yer tutucuları 20 Eki 2026'da çerçevesiz kare olarak
    yeniden üretildi (kırpma yerine — Hasan); böylece set tek çizim dilindedir.
  - **Rota durağı (KARAR — 20 Ekim 2026, Hasan):** halka çerçeve + şeffaf mine
    bant + CSS ilerlemesi (3.10.1). **Durak renkleri altıdır:** mavi · kırmızı ·
    yeşil · mor · turkuaz · gül; **krem** yalnız Hz. Muhammed'in dört kitabına
    ayrılmıştır. Turuncu ve sarı kullanılmaz (ilerlemenin altınıyla karışır),
    lacivert maviye, zeytin yeşile fazla yakındır. Renk `atlasCatalog.ts`'te
    kitabın `durakRengi` alanıdır; **yalnız yayına alınırken verilir, rotadaki
    iki komşu yayındaki duraktan farklı seçilir ve sonra değişmez** (çocuğun
    kitabının rengi kaymaz). Renk değerleri `globals.css`'te `--durak-*`
    token'larıdır. İlk dağıtım: Âdem mavi · Şît kırmızı · İdrîs yeşil · Nûh mor ·
    İbrahim turkuaz · İsmail gül · Yusuf mavi · Eyyûb kırmızı · Musa yeşil ·
    Süleyman mor · Yunus turkuaz · Îsâ gül.
- **Çocuk profili fotoğrafı `public/` altında DEĞİLDİR (KARAR 8 Ağustos 2026,
  Hasan).** Hazır avatar seti (`public/avatarlar/avatar-{1..10}.jpg`) yerinde
  kalır; veli isterse üzerine kendi fotoğrafını yükler. Fotoğraf kullanıcı
  verisidir, projeye ait bir varlık değildir — bu yüzden Supabase Storage'ta
  `profil-fotograflari` kovasında, `{veli_id}/{profil_id}.jpg` anahtarıyla
  durur ve URL'i `profiles.avatar_url`e yazılır. Kova adı ve anahtar kalıbı
  yine `varlikYollari.ts`tedir; yükleme/silme `src/lib/profilFotografi.ts`.
  - Fotoğraf **tarayıcıda 512×512 kare JPEG'e küçültülüp** gönderilir; telefon
    fotoğrafı 3–8 MB gelir, ekranda en fazla 64px çizilir.
  - Ekranlarda tek kapı `CocukAvatari`dir: `avatar_url` doluysa fotoğraf,
    boşsa `avatar_tipi`ndeki hazır avatar. İkisi birbirini silmez — veli
    fotoğrafı kaldırınca eski avatar geri gelir.
  - Kova **public**tir: çocuk tarafı ekranları Supabase auth oturumu olmadan
    çalıştığı için imzalı URL üretemez. Yazma yetkisi velinin kendi klasörüyle
    sınırlıdır (bkz. `supabase/migration-profil-fotografi.sql`).
- Dosya adı küçük harf, Türkçe karaktersiz, tire ile ayrılır.
- **Değiştirme akışı:** Hasan eski dosyayı silip yenisini **aynı adla** klasöre
  atar; kod değişmeden yayına girer. **Ödül görsellerinde** (rozet, madalya,
  unvan) yeni dosya `public/`'e değil `gorsel-kaynaklari/`'na konur ve
  `npm run odul-cerceve` çalıştırılır (20 Eki 2026). Dosya yoksa kod BOZULMAZ — `YedekliGorsel`
  ilgili yedeğe düşer.
- **KARAR (11 Temmuz 2026, korunur): Seçenek B** — her bölüme özel rozet.
  İlk katalog hedefi: 35 kitap ve toplam **216 bölüm/rozet**. Hepsi aynı şablon
  ailesinde üretilir (aynı çerçeve, aynı palet, değişen yalnızca iç sembol).
- **Merkezî Rozet Matrisi — `ROZET-MATRISI.md`:** Tüm serinin rozetleri tek
  tabloda planlanır (kitap · bölüm no · rozet adı · değer · anahtar). İki işi
  birden yönetir: (a) **rozet adları set genelinde tekildir**, (b) 216 rozet
  görselinin üretim listesidir. Yeni kitap eklenirken bu matrise bakılır.
  **Not:** Rozet anahtarı `books.ts`'e alan olarak YAZILMAZ; `src/lib/derive.ts`
  içindeki `rozetIconKey(bookKey, no)` ile `hz-{bookKey}/bolum-{n}` olarak
  türetilir.
- **İçerik görsellerinin sicili — `ICERIK-GORSEL-SICILI.md`:** hangi dosyanın
  hangi bölümde, akışın neresinde durduğu ve ne çizileceği orada tutulur.
- **Kademeli kurulum:** klasör iskeleti önce **İlk İzler Vadisi'nin 6 kitabı**
  için kuruldu (27 Tem 2026). Diğer bölgeler içerik geldikçe açılır. İçeriği
  yazılmamış kitaplarda yalnız `bolum-{n}/kapak.jpg` bulunur; sahne dosyaları
  metin gelince **gerçek adlarıyla** eklenir (uydurma ad üretilmez).

### 6.2 Teknik özellikler

| Varlık | Boyut | Format | Not |
|---|---|---|---|
| Rozet | 512×512 | PNG şeffaf | Kodla çizilen kalkan çerçeve + çerçevesiz kare iç sahne (6.1 "Ortak ödül çerçevesi") |
| Madalya | 512×512 | PNG şeffaf | Kodla çizilen defneli halka + çerçevesiz kare iç sahne; kitap başına 1 |
| Unvan | 512×512 | PNG şeffaf | Kodla çizilen kitap temalı pano + şeffaf iç ikon; 10 adet |
| Avatar | 512×512 | PNG şeffaf | 8 adet (4 erkek + 4 kız çocuk illüstrasyonu, 3D stil ailesi) |
| Kapak | 600×900 (2:3) | PNG/JPG | Kitap başına 1; ChatGPT görsellerindeki süslü cilt dili |
| İçerik illüstrasyonu | yatay 4:3 + dikey 3:4 | PNG/JPG | Aynı ana sahneden türetilmiş responsive çift; metin içermez |
| Sembol | 256×256 | PNG şeffaf | 6 adet sabit ("Sen Olsaydın" için) |

- Kilitli/kazanılmış durumlar için ayrı görsel ÜRETİLMEZ; gri ton/soluklaştırma
  CSS ile yapılır. Tek dosya üç durumu karşılar.
- Üretim akışı: kod placeholder görsellerle yazılır → Hasan görselleri aynı
  isimle klasöre atar → kod değişikliği gerekmeden yayına girer.
- Her varlık tipi için prompt şablonu ayrıca verilecek (stil, ışık, çerçeve,
  palet sabit; yalnızca konu değişir).

### 6.3 "Sen Olsaydın" görsel kararı

**KARAR (11 Temmuz 2026): Salt metin.** Seçeneklerde görsel kullanılmaz;
sade kart + numara + metin. Odak çocuğun düşüncesinde kalır.
(`public/semboller/` klasörü ve sembol seti bu karar gereği İPTAL —
ileride istenirse eklenmesi kolaydır.)

### 6.4 İçerik görselleri (okuma sayfası illüstrasyonları)

- Kitap içeriğiyle birlikte, kitap kitap üretilir; bu dokümanın kapsamı dışında.
- **Tasvir kuralı (REVİZE 16 Ekim 2026 — Hasan; önceki sürüm 12 Ekim 2026):**
  Görsel hikâyeyi anlatır. **Olayın öznesi insansa sahnede insan figürü olur**
  (ör. Hz. Musa'nın gördüğü kavga, kavga eden iki adamla gösterilir; dökülmüş bir
  sepetle değil). Kişiler üç katmanda ele alınır:
  - **Katman 1 — yüz hiç görünmez:** peygamberler (Hz. Muhammed hariç), onların
    yakın akrabaları (anne, baba, kardeş, eş, çocuk; inançlı veya inkârcı fark
    etmez — ör. Musa'nın annesi ve ablası, Nûh'un oğlu, Âzer, Lût'un karısı,
    Yusuf'un kardeşleri) ve peygamber akrabası olmayan saygın müminler (ör.
    Âsiye, Hızır, Firavun ailesinden iman eden adam). Figür olarak görselde
    yer alabilirler. Yüz arkadan kadrajla, uzak planla veya doğal bir sebeple
    (gölge, başörtüsü, kontra ışık) görünmez. Sahne önden açı gerektiriyorsa yüz
    bölgesi **yaygın bir ışıkla tamamen örtülür**; göz, ağız ve yüz hattı
    seçilmez. Atmosfer saygılı ve sakindir; figür kahramanlaştırılmaz, ürkütücü
    veya alaycı çizilmez.
  - **Katman 2 — yüz gösterilebilir:** adı anılan kötü karakterler (Firavun,
    Nemrut, Kârûn vb.) ve çevreleri (saraydakiler, yardımcılar, büyücüler).
    Korkutucu veya karikatür gibi çizilmez; görünüm tarihî kaynaklardaki
    anlatıma uygun ve sakindir.
  - **Katman 3 — yüz gösterilebilir:** hikâyedeki sıradan halk (kavga edenler,
    çobanlar, pazardakiler, kalabalık).
  - **Hz. Muhammed (s.a.v.), ailesi, sahabe ve Dört Büyük Halife hiçbir
    biçimde gösterilmez** (silüet, ışık figürü ve el dahil; değişmedi). Bu
    dönemde geçen sahnelerde isimsiz halkın gösterilip gösterilmeyeceği
    **henüz karara bağlanmadı**; o kitapların Faz 1'inde Hasan'a sorulur.
  - Melek tasviri yapılmaz (değişmedi).
  - Şiddet sahnelerinde darbe anı değil gerginlik gösterilir; kan, yara ve
    silah darbesi yoktur.
  - **Karma sahne:** aynı karede Katman 1 ile Katman 2/3 varsa Katman 1 figürü
    promptta açıkça arkadan veya ışıkla örtülü yüzle tarif edilir; görsel
    modeli yüz yasağını kişi kişi uygulayamadığı için her karma sahne elle
    kontrol edilir (`ICERIK-GORSEL-SICILI.md` §6.2).
  - Kitaba özgü daha sıkı karar (ör. bir kitapta belirli bir kişinin hiç
    gösterilmemesi) o kitabın Faz 1 kararıyla verilebilir ve geçerlidir.
  - **Geçiş:** kural 16 Ekim 2026'dan sonraki üretimlerde (yeni kitaplar ve
    sonradan seçilerek yeniden üretilen görseller) geçerlidir. Yayındaki
    kitaplarda toptan yeniden üretim yapılmaz; olayı anlatamayan görseller
    ayrı bir işte seçilerek yenilenebilir. Sicildeki kitap kayıtları (ör.
    Musa ve Eyyûb'da "diğer sahnelerde insan figürü yok") o günkü uygulamayı
    kaydeder; kitaba özgü ek yasaklar (bebek, ordu vb.) yeniden üretimde de
    geçerli kalır.
  - *Önceki sürüm (12 Ekim 2026):* yüz hiçbir görselde gösterilmezdi;
    peygamberler yüzü görünmeyen figür olabiliyordu, sıradan insan için
    "figür yalnız gerçekten gerekiyorsa" yorumu uygulamada figürsüz görsele
    yol açtı. Temmuz 2026'daki "silüet bile değil" kuralı 12 Ekim'den beri
    geçersizdir; Hz. Âdem 1. bölümdeki figürlü üç görsel (`toprak-isik`,
    `isimlerin-izi`, `secim-sorumluluk`) uygundur.
- Her kitabın kendi görsel dünyası olur (Âdem: tabiat/bahçe/ışık; Nuh:
  gemi/yağmur/dağ; İbrahim: çöl/yıldızlı gök...). Cami-kubbe-minare gibi
  dönemle uyumsuz genel dini dekor kullanılmaz.
- **KARAR (REVİZE 12 Ekim 2026, Hasan): bölüm başına hedef 6 görsel** —
  1 açılış sahnesi (`kapak.jpg`) + 5 içerik sahnesi. Gerekçe: çocuk kitabıdır;
  okuma tek sütunda kaydırılır ve görsel, metin duvarını bölen asıl moladır.
  Önceki hedefler: 19 Tem 2026'da "3–4 görsel durak", 26 Tem 2026'da "1 açılış
  + 4 sahne". Lansman için önerilen "seyrek mod" (kapak + 2 sahne) aynı gün
  **iptal edildi**.
  - Alt sınır 5 görseldir (açılış + 4). Bu sınıra yalnız kısa bölümde (~2.800
    karakterin altı) veya kaynakta gösterilecek ayrı bir an yoksa, gerekçesi
    yazılarak inilir. Sayıyı doldurmak için anlamsız manzara üretilmez.
  - Dağılım: Hikâye — 1. Kısım ve Hikâye Devam Ediyor'da en az 2'şer sahne.
    Sen Olsaydın, Seçimini Karşılaştır, Ne Öğrendik ve Bugüne Taşı alanlarına
    görsel konmaz. İki görsel art arda gelmez (arada en az bir paragraf).
  - Teknik bir sınır değildir: okuyucu ve `gorsel-yertutucu` betiği `books.ts`'te
    kaç `type: "image"` bloğu varsa onu kullanır.
  - Yayındaki kitaplar (Âdem, Şît, İdrîs: 1 + 4) için geriye dönük ekleme
    zorunlu değildir; ayrı bir karar konusudur.
- İllüstrasyon, hikâyede anlamlı bir görsel durak oluşturduğu içerik bloğuna
  bağlanır. Sayfa numarasına bağlanmaz.
- **Her sahne tek dosyadır: 16:9 `.jpg` (KARAR 27 Tem 2026).** Eski 4:3 yatay +
  3:4 dikey sürüm ikilisi sayfalı okuma düzeni içindi ve kaldırıldı; kod
  `portraitSrc` alanını okuma akışında kullanmaz. Görsel ayrılan alanı tamamen
  doldurur; boş çerçeve veya letterbox bırakılmaz. "Dokun ve Keşfet" kapatıldı.
- Özel illüstrasyonu olmayan hikâye sayfasında genel placeholder veya boş görsel
  sütunu gösterilmez. Sayfa; diyalog, etkileşimli kelime, kısa geçiş ya da düz
  okuma içeriğine göre kodla oluşturulan tam genişlikte atlas düzenini kullanır.
- Gerçek görsel henüz teslim edilmemişse placeholder **yalnız görsel üretileceği
  onaylanmış sayfada** gösterilir. Böylece placeholder, üretim listesini işaretler;
  görsel gerekmeyen sayfayı eksikmiş gibi göstermez.
- İlk referans uygulama Hz. Âdem 1. bölümdür: bölüm kapağındaki “bekleyen
  yeryüzü”, “seçim ve sorumluluk”, “toprak, su ve ışık” ve “öğrenilecek büyük
  âlem” olmak üzere dört görsel durak kullanılır. Görseller peygamber, melek,
  insan bedeni, yüzü, eli veya silüeti göstermeden (o tarihteki kural; 12 Eki 2026
  revizyonu yukarıda) doğa ve nesne metaforlarıyla
  anlatımı destekler; aradaki sayfalar metin odaklı kalır.
- **Dokun ve Keşfet prototipi — KAPATILDI (KARAR 27 Temmuz 2026, Hasan).**
  18 Temmuz 2026'da Hz. Âdem 1. bölüm açılışındaki sahne üzerinde numaralı keşif
  noktaları denendi (kısa gözlem metinleri açan, puansız, ilerleme şartı olmayan
  etkileşim). Deneme sonucu **benimsenmedi:** bölüm kapısında gereksiz bir iş
  yaratıyor, çocuğu okumaya başlamadan önce oyalıyor ve açılış sahnesinin sakin
  etkisini bozuyordu. Keşif noktaları **hiçbir kitapta kullanılmaz**; diğer
  kitaplara taşınmaz. Bölüm kapısı bunun yerine tek güçlü sahne + bölüm kimliği +
  rozet önizlemesi + tek çağrı ("Maceraya Başla") ile kurulur.
  *(REVİZE — 12 Eki 2026: tam ekran bölüm kapısı ve "Maceraya Başla" Faz B'de
  kalktı; bkz. 3.10.3.)*

### 6.5 Sesli anlatım dosyaları (KARAR — 12 Ekim 2026, Hasan)

- **Her bölümün sesli anlatımı vardır.** Ses kontrolü bütün bölümlerde görünür.
- Dosya: `public/sesli-anlatim/hz-{bookKey}/hz-{bookKey}-bolum-{n}.mp3`
  (ör. `sesli-anlatim/hz-idris/hz-idris-bolum-2.mp3`). Kitap adı dosya adında da
  geçer; dosya klasörünün dışına çıksa da hangi bölüme ait olduğu okunur.
- Yol yalnız `src/lib/varlikYollari.ts:sesliAnlatim()` ile üretilir. `books.ts`'te
  ses alanı **yoktur**; rozet anahtarı gibi kitap anahtarı ve bölüm numarasından
  türetilir. Yeni kitap aktarılırken ses için veri yazılmaz.
- **Yer tutucu:** gerçek kayıt gelene kadar her bölümde
  `public/sesli-anlatim/placeholder-ses.mp3` kopyası durur (Hz. Âdem 1. bölüm
  kaydının kopyası). Hasan gerçek kaydı **aynı adla** üzerine yazınca kod
  değişmeden yayına girer. Yeni kitapta `npm run gorsel-yertutucu -- {bookKey}`
  ses yer tutucularını da açar.
- **Yayın öncesi uyarı:** yer tutucu ses başka bir bölümün anlatımıdır. Yer
  tutucusu değiştirilmemiş bölüm yayında çocuğa yanlış anlatımı dinletir;
  lansmandan önce bütün yer tutucular gerçek kayıtla değiştirilmiş olmalıdır.
- Dosya bulunamazsa ses kontrolü hiç çizilmez; ekran bozulmaz.
- Çalma davranışı 5.1'deki **Model A** ile aynıdır (bölümün tamamı baştan sona).

---

## 7. Veri Modeli

### 7.1 Mevcut yapı (değişmiyor)

- `profiles` — çocuk profilleri (veli_id, isim, avatar_tipi, **avatar_url**,
  unvan, profile_limit). `avatar_url` 8 Ağu 2026'da eklendi: veli panelinden
  yüklenen fotoğraf, boşsa hazır avatar geçerlidir (bkz. 6.1 ve
  `supabase/migration-profil-fotografi.sql`). *(REVİZE 19 Eki 2026 — Faz 7:
  `child_username` / `child_password` sütunları kaldırıldı; `avatar_url` public
  adres değil, kapalı kovadaki yoldur ve imzalı adresle gösterilir.)*
- **Faz 7 tabloları (19 Eki 2026, 3.11):** `veli_ayarlari` (profil şifresi
  ayarı; veli okur/yazar), `cihaz_baglantilari` (bağlı cihaz ↔ çocuk; veli
  görür/kaldırır, cihaz kendi satırını görür). Gizli değerler —
  `veli_pinleri`, `profil_sifreleri`, `eslesme_kodlari`,
  `eslesme_denemeleri` — RLS'si açık ama hiç kuralı olmayan tablolardadır;
  istemci okuyamaz, yalnız `SECURITY DEFINER` fonksiyonlar kullanır. Göç:
  `supabase/migration-faz7-guvenlik.sql`.
- **`sen_olsaydin_secimleri` (S5, 20 Eki 2026):** profil + kitap anahtarı
  (`books.ts` anahtarı) + bölüm no başına çocuğun ilk "Sen Olsaydın" seçimi
  (`secenek`, `dogru`). Veli ve o çocuğa bağlı cihaz okur ve ekler;
  güncelleme/silme kuralı yok (değişmez), profil silinince silinir. Göç:
  `supabase/migration-s5-secimler.sql`.
- `parent_subscriptions` — abonelik (profil hakkı); siparişler `siparisler`'de
- `books` — kitap meta (isim, sıra, toplam bölüm)
- `user_progress` — profil+kitap başına ilerleme (bölüm sayısı, %, bitti_mi, final skoru)
- İçerik (bölümler, metinler, rozet adları, veli raporu) `src/data/books.ts`
  içinde statik dosyada.
- **Büyük Final Testi soruları `src/data/quizzes.ts` içindedir** (25 Tem 2026'da
  `app/quiz/[bookId]/page.tsx` içinden ayrıldı; sayfa artık yalnız veriyi
  tüketir). Yeni kitap eklerken `books.ts` ve `quizzes.ts` **birlikte** güncellenir.
- Kitap kataloğu meta verisi (ad, alt başlık, keşif açıklaması, bölüm sayısı,
  yayımlanma durumu) `src/data/atlasCatalog.ts` içindedir.
- **Bu fazlarda Supabase'e taşınmaz.** Kitap sayısının 20'yi aşması
  tek başına Supabase'e taşıma gerekçesi değildir; ancak paket boyutu, bakım ve
  yükleme performansı ölçülüp teknik ihtiyaç doğarsa taşıma ayrı proje olur.

### 7.2 Türetilen kavramlar (tablo GEREKTİRMEZ)

| Kavram | Nasıl türetilir |
|---|---|
| Bölüm rozeti kazanıldı mı | `tamamlanan_bolum_sayisi >= bölüm sırası` |
| Madalya kazanıldı mı | `bitti_mi = true` (final testi dahil) |
| Unvan | Tamamlanan kitap sayısı → Bölüm 2 eşik tablosu; sonuç `profiles.unvan`a yazılır |
| Kitap listesi (çocuk ve veli tarafı) | Katalogda `published` olan ve `books.ts`'te içeriği bulunan kitaplar, katalog sırasıyla (`derive.ts:yayindakiKitaplar`). Ad katalogdan, bölüm sayısı içerikten gelir; Supabase `books` satırı yalnız ilerleme kaydının anahtarıdır. Elle tutulan ikinci bir kitap listesi YOKTUR (REVİZE 18 Eki 2026 — veli paneli eski, dört kitaplık bir listeye bakıyordu). `availability: "hidden"`: yazılmış ama Hasan'ın kararıyla şimdilik ekrandan kaldırılmış kitap (21 Eki 2026: Hz. Şît, Hz. İdrîs); hiçbir ekranda görünmez, okuma ve final adresi 404 verir; geri getirmek = `published` + o günün `yayinTarihi` |
| Kütüphane/Ödüller/Gelişim Raporu (veli) | Yukarıdaki kitap listesi + user_progress |
| Kelimelerim (çocuk) | Tamamlanan bölümlerin iki hikâye parçasındaki (1. Kısım + Hikâye Devam Ediyor) sözlük kelimeleri |
| Son aktivite (ilk sürüm) | `user_progress.updated_at` |

### 7.3 İleriki faz eklemeleri

- **Faz 6.1 — "Bugüne Taşı" görev durumu (kalıcı veri GEREKTİRİR):**
  - Görev TANIMLARI kitap içeriğiyle birlikte `books.ts`'te statik kalır
    (görev ID, ad, kategori, açıklama, tahmini süre, tamamlanma ölçütü, varsa
    güvenlik notu). Tanım için tablo açılmaz.
  - Çocuk-görev DURUM ilişkisi kalıcı tablo ister (öneri adı: `profile_tasks`):
    `profile_id`, `task_id`, `status` (eklendi | tamamlandi), `added_at`,
    `completed_at`. Alan adları kod aşamasında netleşir.
  - Bu durum `user_progress`'e sıkıştırılMAZ — o tablo profil+kitap başına TEK
    satırdır (unique kısıtı) ve görevler bölüm+görev düzeyinde çok satır ister.
  - RLS: veli yalnızca kendi çocuklarının görev durumunu okur; çocuk profili
    yalnızca kendi görev durumunu ekler/günceller. Migration Faz 6.1'de yazılır
    (mevcut veride görev durumu olmadığı için geriye dönük doldurma gerekmez).
  - Not: 7.2'deki "türetilen kavramlar tablo gerektirmez" kuralı ROZET/MADALYA/
    UNVAN için geçerliliğini korur; görev durumu türetilemez, bu yüzden bu
    istisna açıkça buraya yazıldı.
- **Faz 6 (S1 tam sürümü):** `activity_events` tablosu (id, profile_id,
  event_type, payload jsonb, created_at) — tam aktivite akışı için. RLS: veli
  kendi çocuklarınınkini okur. (İlk sürüm — `updated_at` özeti — uygulandı.)
- **Faz 7:** bkz. Bölüm 8.
- **S2 için:** `user_progress`e `audio_position` (jsonb veya ayrı kolon).
- **S5 için:** "Sen Olsaydın" kalıcı cevap kaydı tablosu (profil + bölüm +
  seçilen şık + zaman). Oturum içi seçim bu tabloya BAĞLI DEĞİLDİR (bkz. 4.2/S5).

---

## 8. Güvenlik (Faz 7 — 19 Ekim 2026)

**Bulgu (19 Eki 2026, canlı veritabanında doğrulandı):** sitenin herkese açık
anahtarıyla giriş yapmamış herkes çocuk profillerini (ad, kullanıcı adı, düz
metin şifre, veli kimliği, fotoğraf adresi) okuyabiliyor, herhangi bir çocuğun
ilerlemesini ve görevlerini değiştirebiliyor, fotoğraf kovasını listeleyip
bütün çocuk fotoğraflarını indirebiliyordu. Supabase'in güvenlik denetimi bunu
göstermiyordu: RLS açıktı, kurallar fazla genişti.

| # | Konu | Durum |
|---|---|---|
| 1 | `child_password` düz metin | **Kaldırıldı** — çocuk hesabı yok; profil şifresi ve veli PIN'i bcrypt ile şifrelenmiş, istemcinin okuyamadığı tablolarda; doğrulama veritabanı fonksiyonunda (3.11) |
| 2 | Giriş yapmamış herkese açık RLS kuralları (`profiles`, `user_progress`, `profile_tasks`) ve listelenebilir fotoğraf kovası | **Kaldırıldı** — çocuk verisi yalnız veli (`veli_id = auth.uid()`) ve bağlı cihaz; anonim oturum veli işlemi yapamaz; kova kapalı, imzalı adres |
| 3 | Veli hesabı: şifre e-postası yerine tek kullanımlık "şifreni belirle" bağlantısı | **Uygulandı (20 Eki 2026)** — ödeme bildirimi şifre üretmez/göndermez; hesap şifresiz açılır, veliye `/sifre-belirle` bağlantısı gider (24 saat, tek kullanım; anahtar sayfa açılınca değil kaydedince harcanır). Şifre sunucu kayıtlarına yazılmaz |
| 4 | Shopier çift bildirimde çift hesap oluşmaması | **Uygulandı (20 Eki 2026)** — `siparisler (kaynak, siparis_no)` tekil; tekrar gelen bildirim hiçbir şey yapmaz, yarıda kalan yeniden denenir; mevcut hesabın şifresine dokunulmaz, profil hakkı küçülmez. Canlı Shopier denemesi bekliyor |
| 5 | "E-postayı yeniden gönder" | **Uygulandı (20 Eki 2026)** — giriş sayfasında "Şifremi unuttum" (`/sifremi-unuttum`); cevap adresin kayıtlı olup olmadığını söylemez; adres başına dakikada 1 / saatte 5, IP başına saatte 20 |
| 6 | Profil silmede ilerlemenin de silineceği | **Uyarı eklendi**; arşiv yok |
| 7 | Sızdırılmış şifre koruması (Supabase Auth ayarı) | Bekliyor (Supabase panelinden açılır) |

**Sonraki işler için kurallar:**
- Herkese açık anahtarla (`anon`) çalışan açık kural YAZILMAZ. Çocuk verisi
  tutan her yeni tablo "veli (`veli_id = auth.uid()`) + bağlı cihaz
  (`cihaz_baglantilari`)" desenini izler.
- Gizli değerler (şifre özetleri, eşleme kodları) RLS'si açık ama kuralı
  olmayan tablolarda tutulur; yalnız `SECURITY DEFINER` fonksiyonlar okur.
- Anonim oturum (bağlı cihaz) veli işlemi yapamaz: profil ekleme/değiştirme ve
  fotoğraf yükleme anonim oturuma kapalıdır.
- Göç: `supabase/migration-faz7-guvenlik.sql`; geri alma:
  `supabase/migration-faz7-guvenlik-geri-al.sql`. Cihaz bağlama için Supabase
  panelinde **anonim oturum açık** olmalıdır (Authentication → Sign In /
  Providers → "Allow anonymous sign-ins").

**Satın alma ve ilk giriş (Faz 7, 3. adım — KARAR 20 Eki 2026, Hasan):**
- **Ödeme sisteminden bağımsız çekirdek:** `src/lib/odeme/sunucu.ts`
  `siparisiIsle` siparişi kaydeder (tekrar koruması), hesabı açar ya da bulur,
  aboneliği günceller, e-postayı gönderir. Ödeme kaynağına özgü kısım yalnız
  bildirimi doğrulayıp çekirdeği çağırır: bugün Shopier
  (`app/api/shopier/webhook`) ve elden satış; ileride iyzico/PayTR aynı
  çekirdeğe bağlanır, hesap/e-posta/şifre tarafı değişmez.
- **Profil hakkı küçülmez:** ikinci satın almada eskisiyle yeninin büyüğü.
  Shopier deneme bildirimi (`istest`) hesap açmaz, yalnız kayda düşer.
- **E-postalar** (`src/lib/odeme/epostaSablonlari.ts`, Türkçe, kodda): hoş
  geldin (şifre belirle), paket güncellendi, şifre belirleme bağlantısı;
  Resend ile gider, yanıtlar `MARKA.yanitEposta`'ya (alan adı gelene kadar
  projenin Gmail hesabı `peygamberlerkesifdunyasi@gmail.com`; Resend hesabı
  da bu adrestedir, test modunda yalnız buraya gönderir). Supabase'in kendi
  e-posta sistemi KULLANILMAZ. Önizleme:
  `/tasarim/epostalar`.
- **Elden satış (WhatsApp, havale/EFT):** `/yonetim` — yalnız `yoneticiler`
  tablosundaki e-postalarla girilir (Hasan'ın Gmail'i ve projenin Gmail
  hesabı), sitede bağlantısı yoktur. Yönetici ödemeyi
  kontrol edip e-posta + paket girer; aynı çekirdek çalışır, bağlantı
  kopyalanıp WhatsApp'tan da gönderilebilir. Son 50 sipariş (bütün kaynaklar)
  listelenir, "Yeni bağlantı" üretilir. Önizleme: `/tasarim/yonetim`.
- **Şifre kuralı:** en az 8 karakter (şifre belirleme ve "Şifre Değiştir").
- **E-posta karşılaştırması** `toLowerCase()` ile yapılır;
  `toLocaleLowerCase("tr-TR")` "I"yı "ı" yapar, veritabanıyla uyuşmaz.
- Göç: `supabase/migration-faz7-satin-alma.sql`; geri alma:
  `supabase/migration-faz7-satin-alma-geri-al.sql`. Yeni tablolar
  (`siparisler`, `sifre_istekleri`, `yoneticiler`) tarayıcıya kapalıdır;
  fonksiyonları yalnız `service_role` çağırır.
- **Hasan'ın panel işleri:** Supabase → bağlantı süresi 86400 sn ("Email OTP
  Expiration"), en az şifre uzunluğu 8, sızdırılmış şifre koruması; Resend'de
  doğrulanmış alan adı (gerçek veliye e-posta için; alan adı kesinleşince);
  Shopier ürünleri açılınca ürün numaraları Vercel'e.

---

## 9. Uygulama Fazları

| Faz | Kapsam | Çıktı |
|---|---|---|
| **0** | Bu doküman | Onaylanmış proje modeli |
| **1** | Tasarım sistemi: Tailwind tokenları, ortak bileşenler (Button, Card, Badge, ProgressBar, StatusChip), placeholder görsel seti, klasör yapısı | Görsel dil hazır; henüz sayfa değişmedi |
| **2** | Çocuk tarafı: harita yeniden tasarımı + `/kitap/[bookId]` tam sayfa detay + durum dili | Çocuk deneyiminin omurgası yeni tasarımda |
| **3** | Okuma akışı: reader sayfa tipleri (hikâye, Tanık Sayfası, Sen Olsaydın, Ne Öğrendik, Bugüne Taşı, Rozet Kapısı) yeni tasarım + navigasyon sadeleşmesi. *(Not: bölüm içi akış 15 Tem 2026'da revize edildi — iki parçalı hikâye + Seçimini Karşılaştır + koşullu Bugüne Taşı. Bu revizyonun uygulaması **Faz 6.1**'dedir; Faz 3'ün tamamlanmış hâli o günkü kararlara göredir)* | Okuma deneyimi tamam |
| **4** | Çocuk tarafı ek ekranlar: **Kazanımlarım** (rozet/madalya/ünvan vitrini) + **Kelime Defterim** (okunan kitaplardaki kelimeler, aranabilir). İkisi de türetilir, yeni tablo yok | Çocuk kendi kazanımlarını ve öğrendiği kelimeleri görüyor |
| **5** | Veli paneli: ana sayfa (+ çocuğun güncel Bugüne Taşı görevi), Kütüphane, Ödüller, Gelişim Raporu (tam sayfa) + mobil alt navigasyon | Veli deneyimi tamam |
| **6** | Unvan hesaplama + son aktivite; istenirse `activity_events` | Küçük veri eklemeleri |
| **6.1** | **İçerik ve Etkileşim Revizyonu (PLANLANDI — Hasan onayı olmadan BAŞLAMAZ):** (a) okuma akışı revizyonu: iki parçalı hikâye + karar noktasında "Sen Olsaydın" + "Seçimini Karşılaştır" + seçimin oturum içinde tutulması (4.1/16); (b) koşullu "Bugüne Taşı" + "Görevi Listeme Ekle / Şimdilik Değil" eylemleri; (c) görev veri altyapısı: `profile_tasks` tablosu + migration + RLS (7.3) — **ekrandan önce altyapı**; (d) çocuk "Görevlerim" ekranı (5.1); (e) veli ana sayfadaki güncel görev alanının yeni görev durumundan beslenmesi; (f) 8 bölümlük yeni Hz. Âdem içeriğinin `books.ts`'e aktarımı | Yeni bölüm akışı + kalıcı görev takibi çalışıyor |
| **6.2** | **Kaydırmalı Okuma Akışı (ONAY — 26 Temmuz 2026):** (a) karakter bütçesiz akış modeli (`src/components/reader/akis.ts`); (b) `AtlasScrollReader` — tek sayfa kaydırma, satır içi görsel/sözlükçe, "Sen Olsaydın" kapısı, akış içi butonlar; (c) alt gezinme çubuğunun yerine üst ilerleme çubuğu + durak göstergesi (scroll-spy); (d) ~~otomatik "kaldığın yer"~~ — **28 Tem 2026'da kaldırıldı** (kaydırma konumu okunan yeri güvenilir biçimde göstermiyor); (e) Hz. Âdem B1–B8 için görsel yerlerinin açılması + `ICERIK-GORSEL-SICILI.md`. Sayfalı okuyucu (`AtlasReader` + `sayfalar.ts` + sayfa bileşenleri + iki tasarım önizlemesi) yenisi üretimde bir hafta çalıştıktan sonra, **30 Tem 2026'da silindi**; `BookDiscovery` tipleri de hiç kullanılmadığı için kaldırıldı | Bölüm kesintisiz kaydırılarak okunuyor |
| **7** | Güvenlik/hesap akışı (Bölüm 8). **19 Eki 2026:** 1–2. adım (açık kuralların kapanması, "Kim okuyor?", profil şifresi, veli kapısı, eşleme kodu, kapalı fotoğraf kovası — 3.11) uygulandı. **20 Eki 2026:** 3. adım (şifre belirleme bağlantısı, Şifremi unuttum, çift bildirim koruması, ödeme sisteminden bağımsız çekirdek, elden satış için `/yonetim`) uygulandı; canlı Shopier denemesi ve Supabase/Resend panel ayarları bekliyor | Aktivasyon bağlantısı + PIN |
| **8** | Landing page'in gerçek özelliklerle güncellenmesi. **Başladı (15 Eki 2026):** eski sayfa silindi, yenisi `app/(tanitim)/` altında (bileşenler `src/components/tanitim/`). ~~KARAR (Hasan, 15 Eki): tanıtım sitenin TAM hâlini anlatır (35 kitap / 216 bölüm)~~ — **REVİZE 21 Eki 2026 (Hasan): lansman 12 kitapla** (liste: katalog belgesi §11.1); **tanıtım yalnız yayındaki kitapları anlatır (uygulandı 21 Eki 2026).** Sayılar, Kütüphane listesi ve unvan kartı `src/data/katalogSayilari.ts` üzerinden `published` kitaplardan türer (`hidden`/`preparing` sayılmaz); kitap yayına girince tanıtım kendiliğinden güncellenir. Raf ve madalya görselleri kapak tasarımına değil kitaba göre seçilen tercih listesinden, yalnız yayındakilerle dolar. Unvan kartı yalnız yayındaki kitaplarla kazanılabilen unvanları anlatır. Yolun devamı Kütüphane'de ve SSS'de tek notla anılır; tarih ve sayı verilmez (ana ekrandaki "Yolun devamı hazırlanıyor" kartıyla aynı dil). **KARAR 21 Eki 2026 (Hasan):** yayına giren yeni kitap mevcut alıcılara ek ödemesiz açılır; tanıtımda ve paket kartında yazılır (sistem de böyle çalışır: `parent_subscriptions`'ta kitap/süre sınırı yok). Sesli anlatım öne çıkan özellik olarak kalır (lansmandan önce gerçek kayıtla tamamlanır). Ürün Bahar Yayıncılık'ın değil, bağımsız bir ürün olarak sunulur. Marka adı ve logo geçicidir (`src/data/marka.ts`, `src/components/marka/Logo.tsx`). Paket modeli öneridir (tek ödeme, süre sınırı yok; 1 / 3 / 5 profil — `src/data/paketler.ts`). Yasal sayfalar (KVKK, gizlilik, çerez, kullanım, ön bilgilendirme, mesafeli satış, iptal-iade, iletişim) taslaktır; satıcı bilgileri `src/data/yasal/satici.ts`'te yer tutucudur. Ürün ekran görüntüleri `npm run tanitim-gorselleri` ile `/tasarim/*` önizlemelerinden üretilir. **Hareket katmanı (KARAR 16 Eki 2026 — Hasan):** yalnız Motion + CSS (`src/components/tanitim/hareket/`); Işıl bölüm bölüm tek karakter gibi rehberlik eder (hero'da uçarak gelir → altın yolda kaydırmayı izler → şafakta dinlenmeye gider → kapanışta döner), dinî içeriğin (İlkeler, Hz. Muhammed / halife listesi) yanında Işıl yoktur; fiyat kartlarına yalnız giriş ve düğme tepkisi eklenir; ses efekti yok; "hareketi azalt"ta süsler durur | Pazarlama yüzü güncel |

**Çocuk arayüzü sadeleştirme fazları (Ekim 2026 — bkz. 3.10).** Harfler 11 Ekim
2026 analiz raporundaki adlandırmadır; her faz kendi başına yayına alınabilir.

| Faz | Kapsam | Durum |
|---|---|---|
| **A** | Hızlı düzeltmeler: sözlük kelimesinin ekinden ayrılması ("emanet ti"), "Sen Olsaydın" metinleri + şıkların her yerde A-B-C olması, kilide benzeyen "devam ediyor" ikonu, her bölüme sesli anlatım + yer tutucu ses (6.5), iki unvanın yeni adı (Bölüm 2) | ✅ 12 Eki 2026 |
| **B** | Okuma ekranı yeni düzeni (3.10.3): açık zemin, kapak ekranının kalkması, adım çubuğu/sütunu, tek başlıklı duraklar, "Aa", rozet kutlaması + "Sıradaki Bölüme Geç", okuma ekranı metinleri (3.10.4) | ✅ 12 Eki 2026. Önizleme: `/tasarim/okuma?bolum=adem-2` (giriş gerektirmez; `&tekrar=1`, `&hata=1`, `?bolum=idris-4`). Uygulama ayrıntıları ve ölçüm 3.10.3 sonunda. Işıl şimdilik konsept eskiz |
| **C** | Ana ekran ve rota (3.10.1–3.10.2, 3.10.6–3.10.7): "Sıradaki bölümün" kartı, bölgesiz tek dikey rota (yayındaki kitaplar `atlasCatalog.ts`'ten çizilir, kod elle yazılmaz), ilerleme halkalı duraklar + altın ışık izi, kitap kilidinin kalkması, "Yeni" etiketi + duyuru, "Yakında" kartı, yolun ucu, profil kartı (hamburger menü kalkar), kitap ve bölümler için alttan sayfa / sağ panel (bölüm rotası sayfası kalkar), alt menü ve ekran adları (3.10.4) | ✅ 12 Eki 2026. Önizleme: `/tasarim/ana-ekran` (giriş gerektirmez; `?durum=yeni` yeni başlayan çocuk). Rota arka planı kodla çizilmiş hareketli çayır; Işıl şimdilik konsept eskiz. Eski harita bileşenleri ve `/tasarim/harita-yeni`, `/tasarim/kitap-yeni` önizlemeleri silindi. Eski demo kitapların `user_progress` kayıtları silindi (`supabase/temizlik-eski-demo-ilerleme-*.sql`) |
| **D** | Rehber karakter Işıl (3.10.5): çizimler Hasan'da, entegrasyon yalnız tanımlı anlarda | ✅ 12 Eki 2026. Işıl kodla çizildi ve canlandırıldı (`Isil.tsx`, üç poz); PNG çizim gerekmedi. Karakter sayfası `/tasarim/isil`. İlk giriş tanışması, boş ekranlar ve final madalya anı eklendi. Final testi sayfasındaki eski "bölüm rotası / kilidi açıldı" metinleri de düzeltildi |
| **Test** | Faz B'den sonra 5 çocukla 30'ar dakikalık gözlem: "Kaldığın kitaptan okumaya başla", "Yeşil bir kelimenin anlamını bul", "Rozetini al ve sonraki bölüme geç". Ses efekti ve ek kutlama kararları bu testten sonra verilir | Bekliyor |

Kurallar:
- Her faz kendi içinde mobil + tablet + masaüstü ile birlikte biter
  (responsive ayrı faz değildir).
- Her fazın sonunda çalışan sistem bozulmamış olmalı; büyük ekran
  değişimlerinde eski ekran, yenisi bitene kadar silinmez.
- Yapılmamış özellik landing page'de TANITILMAZ.

> **Faz sırası kararı (14 Tem 2026 — Hasan onayı):** Faz 5 (veli paneli), Faz 4
> (Kazanımlarım + Kelime Defterim) öncesinde uygulanmaya başlandı. Faz 4 sonraya
> alındı; veli paneli bağımsız ve öncelikli olduğu için sıralama değiştirildi.
> Faz 5 kademeli teslim ediliyor: **Etap 1** = ortak layout (`app/dashboard/layout.tsx`)
> + sol menü/mobil alt navigasyon + hesap menüsü/çıkış + tema-veli'ye taşınmış Ana
> Sayfa (çocuk kartlarında ilerleme, son rozet, güncel "Bugüne Taşı") + ayrı profil
> ekleme ekranı. **Faz 5 KOD OLARAK TAMAMLANDI (4 etap):** Etap 2 Kütüphane
> (`/dashboard/kutuphane` — çocuk seçici + arama + durum filtresi + sıralı kilit),
> Etap 3 Ödüller (`/dashboard/oduller` — Rozetler/Madalyalar/Unvanlar sekmeleri +
> rozet detayı), Etap 4 tam sayfa Gelişim Raporu (`/dashboard/rapor/[profileId]` —
> Genel Bakış/Kitaplar/Ödüller/Sohbet Önerileri sekmeleri; Ana Sayfa kartındaki
> modal bu rotaya taşındı, Raporlar için `/dashboard/rapor` çocuk seçim indeksi).
> Ortak türetme `src/lib/derive.ts`, rapor türetmesi `src/lib/parent/report.ts`,
> ortak veri `src/lib/parent/ParentDataProvider.tsx`. Hasan'ın görsel onayı bekleniyor.

> **Durum güncellemesi (15 Tem 2026):** Faz 4 (Kazanımlarım + Kelime Defterim) ve
> Faz 6'nın ilk sürümü (son aktivite özeti — `user_progress.updated_at`'ten
> türetilir; `activity_events` tablosu AÇILMADI) kod olarak tamamlandı. İçerik
> üretimi sırasında kesinleşen yeni kararlar (iki parçalı hikâye, "Seçimini
> Karşılaştır", koşullu "Bugüne Taşı" + görev takibi — bkz. 4.1/16-17) tamamlanmış
> Faz 3–6'ya geriye dönük yazılmadı; **Faz 6.1 — İçerik ve Etkileşim Revizyonu**
> olarak planlandı. Faz 6.1, Hasan onayı olmadan uygulanmaz. Piksel/görsel ince
> ayar turu (Faz 4+5+6 birlikte) ayrıca bekliyor.

> **Durum güncellemesi (15 Tem 2026 — akşam):** Hasan onayıyla **Faz 6.1 KOD
> OLARAK TAMAMLANDI:** (a) `profile_tasks` şeması + RLS (`supabase/
> migration-profile-tasks.sql` — **Supabase'de çalıştırıldı; 25 Tem 2026'da
> `/gorevlerim` ekranında gerçek görev durumları okunarak doğrulandı**);
> (b) 8 bölümlük yeni Hz. Âdem içeriği `books.ts`'e + final testi quiz'e + veli
> raporu aktarıldı (parser ile birebir); (c) reader yeni akışı: karar noktası →
> Hikâye Devam Ediyor → Seçimini Karşılaştır (yalnız seçilen şık), doğru cevap
> açıklanmaz, seçim `sessionStorage`'da; (d) Bugüne Taşı görev sayfası "Listeme
> Ekle / Şimdilik Değil"; (e) `/gorevlerim` ekranı + haritada üçüncü buton;
> (f) veli kartı güncel görevi `profile_tasks`'tan okur. Eski akış (Nuh demo /
> Ebû Bekir) bilinçli korundu — yeni akış `continuationParagraphs` dolu
> bölümlerde devreye girer.

---

## 10. Karar Kaydı (11 Temmuz 2026 — Hasan onayı)

- [x] Unvan eşik tablosu (Bölüm 2): **ONAYLANDI**, adlar bu haliyle kalıyor.
- [x] Rozet görsel stratejisi: **Seçenek B** — bölüm başına özel görsel
      (~150–200 adet, tek şablon ailesinde).
- [x] Avatar seti: **8 adet** (4 erkek + 4 kız), 3D çocuk illüstrasyonu stili.
- [x] "Sen Olsaydın" seçenekleri: **salt metin**, sembol yok.
- [x] Marka adı: **"Peygamberler Keşif Dünyası"** (ileride değişebilir;
      ekranlarda tek kaynaktan yönetilecek).

### 15 Temmuz 2026 (içerik üretimi sırasında kesinleşen kararlar)

- [x] Hedef yaş grubu: **8–11** (tüm belgelerde standart).
- [x] Bölüm içi akış: **Hikâye 1. Kısım → Sen Olsaydın → Hikâye Devam Ediyor →
      Seçimini Karşılaştır → Ne Öğrendik → (varsa) Bugüne Taşı → İllüstrasyon →
      Rozet Kapısı.** Seçim dallandırmaz; doğru cevap seçim anında açıklanmaz;
      yalnızca seçilen şıkkın karşılaştırma metni gösterilir (bkz. 4.1/16).
- [x] "Bugüne Taşı" **koşullu ve gönüllü** görevdir; profile eklenir, "Görevlerim"
      ekranında kalıcı Tamamlandı/Tamamlanmadı durumuyla izlenir (bkz. 4.1/17).
      Göreve ayrı ödül YOK (bkz. 4.3).
- [x] Hâbil-Kâbil kıssası **yalnızca Hz. Âdem kitabına özgü içerik kararı** olarak
      dahil edildi (Bölüm 7, Mâide 5/27-31 merkezli, şiddet ayrıntısı gösterilmeden).
      Bu bir genel proje kuralı DEĞİLDİR; kitaba özgü kararlar her kitabın
      kimliğindeki "Kitaba özgü kararlar" alanında tutulur.
- [x] Yeni özellikler **Faz 6.1** olarak planlandı; Hasan onayı olmadan uygulanmaz.
- [x] Hz. Âdem yeni içeriği (8 bölüm): **dini doğruluk onayı verildi.** Geçerli
      kaynak dosya `kitap-icerikleri/KITAP-HZ-ADEM-ICERIK-final.md`.
- [x] "Sen Olsaydın" seçimi sayfa yenilemede **korunur** (`sessionStorage`).
- [x] Çocuk görev ekranı: rota **`/gorevlerim`**, giriş noktası haritadaki
      Kazanımlarım / Kelime Defterim buton grubuna üçüncü buton.
- [x] Tanık Sayfası **tamamen opsiyoneldir** — kullanılan kitaplarda 2-3 kez;
      her kitapta bulunmak zorunda değildir (Hz. Âdem'de yoktur).
- [x] Veli, çocuğun görev takibini **Gelişim Raporu → Görevler sekmesinden**
      görür (12.4'te açık bırakılan karar; salt görüntüleme). Ana Sayfa kartı
      yalnız güncel görevi durum çipiyle gösterir (madde 18).

### 26 Temmuz 2026 (okuma deneyimi revizyonu — Hasan onayı)

- [x] **Bölüm sayfa-sayfa değil, tek sayfada kaydırılarak okunur.** Gerekçe:
      `SAYFA_BUTCESI = 420` karakter, ~4.000 karakterlik bir bölümü 9–12 okuma
      sayfasına bölüyordu; akış sayfalarıyla birlikte bölüm başına 14–17 kez ileri
      basma gerekiyordu. 8–11 yaş için okuma akışı sürekli kesiliyordu.
- [x] **Alt gezinme çubuğu kaldırıldı.** Yerine üstte daralan sabit başlık + ince
      altın ilerleme çubuğu + aktif durak adı. "Sayfa 3 / 12" göstergesi
      kullanılmaz. İlerleme göstergesi opsiyonel değildir — sayfa metaforunun
      kaldırılmasının zorunlu telafisidir.
- [x] ~~Kaldığın yer otomatik kaydedilir~~ — **28 Temmuz 2026'da KALDIRILDI.**
      Kaydırma konumu okunan yerin güvenilir göstergesi değil: çocuk metni
      okumadan sayfayı kaydırıp çıkabiliyor, sistem yanlış yere götürüyordu.
      Bölüm her açılışta baştan başlar.
- [x] **Görsel yoğunluğu: bölüm başına 1 açılış + 4 içerik görseli** (~800
      karakterde bir sahne). *(12 Eki 2026'da 1 açılış + 5 sahneye çıkarıldı — 6.4.)* Gerekçe: `type: "image"` bloğu bugün yalnız Hz. Âdem
      Bölüm 1'de var; tek sütun kaydırmada görselsiz bölüm metin duvarına döner.
      Yerler `books.ts`'e placeholder olarak açılır, dosya adları
      `ICERIK-GORSEL-SICILI.md`'de tutulur (Bölüm 6 üretim akışı).
- [x] Yeni okuyucu **önce önizleme rotasında** teslim edilir; `/reader` ancak
      Hasan onayından sonra bağlanır. Sayfalı okuyucu o ana kadar bozulmaz.

### 11–12 Ekim 2026 (çocuk arayüzü sadeleştirme — Hasan onayı, bkz. 3.10)

- [x] Keşif bölgesi seçicisi ve bölge adları arayüzden kalkar; kitaplar **tek
      dikey rotada**, yatay değil (3.10.1).
- [x] Yayında olmayan kitap rotada görünmez; sonda tek "Yakında" kartı.
      **Önerilen sıra katalog sırasıdır;** sonradan yayınlanan kitap kendi yerine
      girer, "Yeni" etiketi + Işıl'ın tek seferlik duyurusuyla bildirilir.
      Duraklarda sıra numarası yok (3.10.1).
- [x] Ana ekranda **"Sıradaki bölümün"** kartı; tek dokunuşla bölüm metni
      ("Kaldığın yer" değildir) (3.10.1).
- [x] **Kitap kilidi kalkar;** bölüm sırası ve final kuralı kalır (3.10.2).
- [x] Velinin okuma sırası ayarı **yapılmaz;** "Sonraya bırak" yalnız Faz 7 PIN'i
      ile ve talep olursa (3.10.2).
- [x] Okuma ekranı tamamen açık zemin; gece mavisi okuma sırasında yalnız rozet
      kutlamasında; rozetten sonra doğrudan sıradaki bölüm (3.10.3).
- [x] Arayüz terimleri sadeleşir; "Kazanımlarım → Ödüllerim" (3.10.4).
- [x] Rehber karakter **Işıl (ateşböceği)**; metinle konuşur, seslendirme ilk
      sürümde yok (3.10.5).
- [x] Unvan adları: 25 → **Işık Taşıyıcısı**, 35 → **Büyük Yolculuk Kaşifi**
      (Bölüm 2).
- [x] **Tasvir kuralı revize edildi:** yüz hiçbir görselde gösterilmez;
      peygamberler (Hz. Muhammed hariç) yüzü görünmeyen figür olarak
      gösterilebilir. Hz. Muhammed, ailesi, sahabe ve halifeler hiçbir biçimde
      gösterilmez (6.4).
- [x] **Tasvir kuralı yeniden revize edildi (16 Ekim 2026, Hasan):** olayın
      öznesi insansa sahne figürlüdür. Peygamberler, akrabaları ve saygın
      müminlerin yüzü hiç görünmez (arkadan, uzak plan, doğal sebep; önden
      gerekiyorsa yaygın ışık). Kötü karakterler, çevreleri ve sıradan halkın
      yüzü gösterilebilir; korkutucu ve karikatür değil. Hz. Muhammed, ailesi,
      sahabe ve halifeler değişmedi (6.4).
- [x] **Her bölümün sesli anlatımı olur;** yer tutucu ses ve tek kaynaktan
      türetilen dosya yolu (6.5).
- [x] Ana ekran tasarımı (raporun D1–D4 taslakları): hamburger menü yerine
      profil kartı; bölüm rotası sayfası yerine alttan sayfa / sağ panel; rota
      arka planı tek kesintisiz dikey görsel; Işıl ana ekranda "Buradasın";
      okunan yol altın ışık izi, durak halkası = kitap ilerlemesi
      (3.10.1, 3.10.6, 3.10.7).
- [x] Lansman 10 kitapla yapılır; hangi 10 kitap olduğu Hasan'ın seçimidir.
      Uygulama kitapları her zaman katalog sırasıyla gösterir.
      **REVİZE 16 Ekim 2026 (Hasan):** lansman 12 kitap — Âdem, Şît, İdrîs,
      Nûh, Eyyûb, Musa (yayında) + İbrahim, Yusuf, Yunus, Süleyman, İsmail,
      Îsâ. Ardından Hz. Muhammed — İlk Yıllar. Liste ve yazım düzeni:
      katalog §11.1.
- [x] **Görsel yoğunluğu artırıldı (12 Ekim 2026, Hasan: "çocuk kitabı olduğu
      için bol görselli olması daha iyi"):** bölüm başına 1 açılış + 5 sahne =
      6 görsel; alt sınır 5. Lansman "seyrek modu" (kapak + 2 sahne) iptal
      edildi (6.4). İçerik brifi, katalog ve görsel sicili hizalandı.
- [x] **Faz B uygulandı (12 Ekim 2026):** okuma ekranı krem zeminde açılış
      bloğu, adım çubuğu / adım sütunu, tek başlıklı bölümler, "Aa", "Dinle"
      + ses şeridi, gece mavisi rozet anı ve "Sıradaki Bölüme Geç". Ayrıntı
      kararları (adım eşlemesi, yazı boyutunun cihazda hatırlanması, Işıl'ın
      sözlük ipucunun ilk dokunuşta kapanması) 3.10.3 sonunda.
- [x] **Rozet anı revize (12 Ekim 2026, Hasan):** tam genişlik kubbe yerine
      okuma sütununda tek ekrana sığan gece mavisi kart; dönen ışık huzmeleri,
      konfeti yerine ışık patlaması + ışık yağmuru, rozette nabız ve parıltı
      (3.10.3).
- [x] **Büyük Final Testi yeni düzene geçti (12 Ekim 2026, Hasan: "eski
      tasarımda kaldı, daha profesyonel olsun"):** okuma ekranının dili — krem
      zemin, aynı üst bar, soru adım çubuğu (≥1024 px solda soru sütunu +
      kazanılacak madalya), "Sen olsaydın?" ile aynı A-B-C şıkları, seçim
      yapılmadan "Bir seçenek seç". Sonuç rozet anıyla ortak gece mavisi ödül
      sahnesidir (`KutlamaSahnesi`): ilk kazanımda patlama + Işıl; alıştırmada
      parlama var patlama yok; kayıt hatası ve eksik bölüm durumları da aynı
      sahnede. Doğru sayısı sonuçta gösterilir (4.1/13 revize). 5'ten fazla
      soruda telefondaki çubuk yalnız numara gösterir. Önizleme:
      `/tasarim/final?kitap=idris` (`&durum=alistirma`, `&durum=hata`).
      Kitap eşleştirmesi `dbKitabiBul`'a geçti (eski alt dize araması "ali"yi
      "Sâlih" içinde bulurdu). Kullanılmayan eski yedek tasarım silindi.
- [x] **Ödüllerim, Kelimelerim, Görevlerim yeni tasarıma geçti (12 Ekim 2026,
      Hasan):** gece çerçeve + krem kartlar; Ödüllerim tek sayfa vitrin
      (unvan kartı, madalya rafı, kitap kitap rozet albümü, unvan yolu);
      Kelimelerim kitap kitap ve bölüme dönüşlü; Görevlerim'de boş sütun yok
      (3.10.8).
- [x] **Ödüllerim revizyonu + açık zemin + menü bantları (12 Ekim 2026,
      Hasan):** içerik açık krem, menü bantları gece mavisi; ana ekranda da
      düz üst bant + logo (önceki "lacivert üst bant olmasın" kararı
      değişti). 1024–1279 px sıkı menü. Unvan kartı gece mavisi, fotoğrafsız,
      büyük sayaçlı; albümde "6 / 8 rozet" + noktalar; rozetler genişte tek
      satır; unvan yolu kart ızgarası (3.10.6, 3.10.8).
- [x] **Faz D (12 Ekim 2026, Hasan):** Işıl görsel dosya yerine kodla çizilen,
      canlandırılmış bir karakter oldu (üç poz, yeşil yol atkısı); tanımlı
      bütün anlara yerleştirildi (3.10.5).

### 17 Ekim 2026 (canlı çayır — Hasan onayı, bkz. 3.10.1)

- [x] **Rota arka planı canlandı:** boyalı görsel korunarak üstüne kodla
      hareket katmanı (su, rüzgâr, sallanan çiçek ve sazlar, kelebekler,
      tavşan, kuş sürüsü). Önce `/tasarim/ana-ekran` önizlemesinde iki turda
      denendi, onaydan sonra `/map`'te kalıcı açıldı.

### 18 Ekim 2026 (canlı çayır balıkları — Hasan onayı, bkz. 3.10.1)

- [x] **Irmaklara balık eklendi:** her ırmakta 8 balık, 6 renk, ırmak başına
      arada bir sıçrayan bir balık. İnceleme için test ekranı
      `/tasarim/canli-cayir` eklendi.

### 18 Ekim 2026 (veli paneli tek kaynak — Hasan onayı, bkz. 7.2)

- [x] **Veli paneli de katalogdan beslenir.** Çocuk tarafı Faz C'de katalogdan
      beslenmeye geçmişti; veli paneli ve Kelimelerim ise yalnız Hz. Âdem, Şît,
      İdrîs ve Nûh'u tanıyan eski bir listeye bakıyordu. Sonuç: veli
      Ödüller'de 84 rozetin 24'ü görünüyordu, sonraki 8 kitabın madalyası yoktu,
      yayında olmayan üç halife demosu Kütüphane'de ve madalyalarda duruyordu,
      kartta okunan kitabın son rozeti çıkmıyordu. Artık iki taraf aynı listeyi
      kullanır (`derive.ts:yayindakiKitaplar`); adlar katalogdan gelir
      ("Hz. Adem" değil "Hz. Âdem").
- [x] **Kelimelerim hikâyenin iki parçasını da toplar.** Yalnız 1. Kısım
      taranıyordu; bütün bölümler bitse bile 91 kelimenin 15'i görünüyordu.
- [x] Veli Kütüphanesi'ndeki **"Kilitli" filtresi kaldırıldı** (kitap kilidi
      3.10.2'de kalktığından beri hiçbir kitaba uymuyordu).

### 19 Ekim 2026 (bölüm bölüm veli sohbeti — Hasan onayı, bkz. 4.1/19)

- [x] **Gelişim Raporu ilk bölümden itibaren dolu.** Sohbet Önerileri ve
      Kitaplar sekmeleri yalnız biten kitapları gösteriyordu; 8–10 bölümlük bir
      kitap bitene kadar veli haftalarca boş ekran görüyordu. Artık okunan her
      kitap için kitapta ulaşılan son bölüm ve o bölümün "Sen Olsaydın" sorusu
      sohbet önerisi olarak görünür. Yeni içerik ve tablo gerekmez.
- [x] Seçenekler (Hasan): "Çocuğunuz Sorarsa" okunan kitapta da görünür ve
      kapalı açılır listedir; yalnız son bölüm gösterilir; çocuğun seçtiği şık
      gösterilmez; girişsiz önizleme `/tasarim/veli-rapor` eklenir.

### 19 Ekim 2026 (Faz 7 güvenlik — Hasan onayı, bkz. 3.11 ve Bölüm 8)

- [x] **Çocuk hesabı kalkar.** Ortak cihazda "Kim okuyor?" ekranı; çocuğun
      kendi cihazı velinin ürettiği tek kullanımlık 6 rakamlı kodla bağlanır.
- [x] **Profil şifresi Hasan'ın tarifiyle:** veli panelinde bütün aileye
      uygulanan aç/kapa ayarı (varsayılan kapalı); her çocuğun kendi 4 rakamlı
      şifresi; veli PIN'iyle aynı olamaz; açık profil 30 dakika etkileşimsizlikte
      ya da site yeniden açılınca "Kim okuyor?"a döner. Resimli kilit önerildi,
      Hasan rakamı seçti.
- [x] **Veli kapısı:** çocuk modundaki cihazda veli paneli 4 haneli veli
      PIN'iyle açılır.
- [x] **Mevcut hesaplar testtir** (3 veli, 9 çocuk profili): çocuk kullanıcı
      adları ve düz metin şifreler silinir; ilerleme, rozet, görev ve fotoğraf
      korunur.
- [x] Veritabanı değişikliği uygulanmadan önce Hasan'a gösterilir.

### 20 Ekim 2026 ("Sen Olsaydın" seçim kaydı ve soru kalitesi — Hasan onayı, bkz. S5)

- [x] **S5 kuruluyor:** her bölümde ilk seçim kalıcı kaydedilir; kitap sonu
      veli özeti orana göre seçilir; veri yoksa özet paragrafı gösterilmez;
      veli tek tek seçimleri ve oranı görmez.
- [x] **Soru kalitesi:** zayıf şıklar çoğu zaman açıkça kötü ve doğru şık 84
      sorunun 55'inde en uzun; çocuk düşünmeden doğruyu buluyor. İçerik
      brifinin 7.6 bölümüne üç kural eklendi (gerçekçi zayıf şık, ele veren
      kelime yok, benzer uzunluk ve ton). Yeni kitaplar bu kuralla yazılır;
      mevcut 84 soru içerik oturumlarında kitap kitap düzeltilir.
- [x] **Düzeltmede çıkan iki ölçüt** (dua/şükür ve büyüğe anlatma kalıbı,
      doğru şıkkın uzunluk sırası) brifin 7.6 bölümüne eklendi.

### 20 Ekim 2026 (final testinde "Tekrar bakmak istersen" — Hasan onayı, bkz. 4.1/13)

- [x] Sonuç ekranında cevabı farklı seçilen soruların bölümlerine "Tekrar
      oku" bağlantısı; kapalı açılır alanda, yalnız kayıt kesinleşince.
      N. soru = N. bölüm 12 kitabın hepsinde doğrulandı (11 kitapta içerik
      dosyasının "Kaynak bölüm" satırı, Hz. Şît'te metin karşılaştırması);
      kural içerik brifinin §9'una yazıldı.
- [x] Düzeltme: 10 soruluk kitaplarda (Hz. Yusuf, Hz. Musa) sonuçtaki 10
      yıldızlı satır telefonda kartı ekrandan genişletiyordu (390 px ekranda
      412 px kart); noktalar dar ekranda 22 px'e kadar küçülür, tablette 30 px.

### 21 Ekim 2026 (final sonucuna dönüş — Hasan'ın bulduğu hata, bkz. 4.1/13)

- [x] "Tekrar bakmak istersen"den bölüme giden çocuk sonuç ekranına
      dönemiyordu: cevaplar yalnız final sayfasının hafızasındaydı, okuma
      ekranının geri düğmesi de haritaya gidiyordu. Bölüm `?donus=final` ile
      açılır; geri ve rozet anı sonuca döner, sonuç oturum deposundan aynen
      geri yüklenir (`src/lib/child/finalSonucu.ts`). Önizleme:
      `/tasarim/final?kitap=yunus` → "Tekrar oku" → bölüm sonu.

### 20 Ekim 2026 (okuma görselleri sıkıştırıldı — Hasan onayı, bkz. 6.1)

- [x] 513 sahne görseli ortalama 628 KB ve 1920 px'ti; bir bölüm açılınca
      hepsi aynı anda iniyordu (Hz. Musa 3. bölüm 4 MB). Hasan dört görselin
      tablet boyutundaki öncesi/sonrası karşılaştırmasını onayladı: 1600 px,
      mozjpeg kalite 82. 467 görsel sıkıştırıldı (314,5 → 86,9 MB); 30 yer
      tutucu ve 14 küçük dosyaya dokunulmadı. Sahneler tembel yüklenir.
- [x] Orijinaller `gorsel-kaynaklari/kitaplar/`'da (Hasan: "eski orijinal
      fotoğrafları bir yerde sakla"); betik bundan sonra da önce yedekler.

### 20 Ekim 2026 (giriş sayfası yenilendi — Hasan onayı, bkz. 5.2 `/login`)

- [x] Giriş sayfası veli hesap sayfalarının çerçevesine geçti; token dışı
      amber/stone/emerald renkleri, kahverengi düğme ve renkli zemin lekeleri
      kalktı. Marka adı `MARKA`'dan (eskiden "Peygamberler Kitap Okuma"
      yazıyordu); "Yönetim Paneli" başlığı "Veli Girişi" oldu (yönetim artık
      `/yonetim`). Çocuğun kendi cihazı için tek ikincil satır kaldı.
- [x] Hitap "siz": kardeş hesap sayfaları böyle; sayfa içinde "Hoş Geldin"
      ile "giriş yapın" karışıktı.

### 20 Ekim 2026 (Faz 7, 3. adım — satın alma ve ilk giriş; Hasan onayı, bkz. Bölüm 8)

- [x] **Şifre e-postada gitmez:** hesap şifresiz açılır, veli tek kullanımlık
      bağlantıyla şifresini kendisi belirler. Eski akışta her ödeme bildirimi
      mevcut velinin şifresini sıfırlıyor, e-posta gidemezse şifre sunucu
      kaydına düz yazılıyordu; veli aranırken ilk 1.000 kullanıcıya
      bakılıyordu.
- [x] Kararlar (Hasan): profil hakkı küçülmez; bağlantı 24 saat; Shopier
      deneme bildirimi hesap açmaz; ödeme sisteminden bağımsız katmanlı yapı
      (ileride iyzico/PayTR); elden satış için yönetim sayfası (yöneticiler:
      Hasan'ın Gmail'i ve projenin Gmail hesabı); e-posta yanıtları
      şimdilik projenin Gmail hesabına.
- [x] Alan adı şimdilik şart değil: kod alan adından bağımsız; gerçek veliye
      e-posta için Resend'de doğrulanmış alan adı satışa açılırken gerekir.

### 19 Ekim 2026 (cihazı çocuğa verme sorusu — Hasan onayı, bkz. 3.11)

- [x] **Çocuk modu görünmeden açılmaz.** Veli panelden çocuk ekranını açınca
      cihaz arka planda kilitleniyordu; Hasan canlıda denerken "ortak tablet"
      kavramı oturmadı, velinin kendi telefonu da istemeden kilitleniyordu.
      Yerine "Bu cihazı çocuğunuz kullanacak mı?" sorusu: Evet → veli PIN'i
      (yoksa) + çocuk modu + "Kim okuyor?"; Hayır → göz atma, kilit yok.
- [x] Kurulumda yalnız veli PIN'i (seçenek A); çocuk şifreleri Aile ve
      Güvenlik'te kalır. "Bu cihaz" bölümüne "Bu Cihazı Çocuğa Ver" eklenir.
- [x] **Çocuğun geri dönüşü:** siteyi adresten açan çocuk tanıtım sayfasından
      "Giriş Yap"a basınca veli formunda takılıyordu. Giriş sayfası açık
      oturumu tanır ve cihazı doğru yere yönlendirir; veliye cihaz çocuğa
      verilince ve kod kartında ana ekran notu gösterilir. Web manifest
      eklenmez (iOS'ta oturum ana ekran uygulamasına geçmez).
- [x] **Düzeltme (Hasan'ın denemesi):** iOS 26'da Safari'den de Chrome'dan da
      eklenen simge ayrı hafızalı uygulama açıyor ve ilk açılışta veli girişi
      istiyor; giriş sonrası panele gidiyor, uygulamada cihaz "çocuğa
      verilmiş" sayılmadığından bir çocuk profili açılana kadar veli paneli
      PIN'siz açılıyordu. Çocuk ekranından girişe düşülünce veli girişi cihazı
      çocuğa verir ve "Kim okuyor?"u açar; giriş sayfası durumu açıklar;
      talimat "önce ana ekrana ekle, sonra simgeden aç" sırasına geçer;
      uygulama içinde not çıkmaz; bağlı cihaz `/cihaz-bagla`'dan haritaya gider.

### 22 Ekim 2026 (karma anlatım tarzı ve Işıl'ın hikâyedeki yeri — Hasan onayı, bkz. 3.10.5, 4.1/20, 5.1 ve içerik brifi §7.10)

- [x] **Sorun:** Yazılmış 14 kitabın hikâyeleri çocuk hikâyesinden çok ders
      anlatımına yakındı; en belirgin örnek Hz. Âdem (ders anlatımı kalıpları
      diğer kitapların 3–6 katı). Beş tarz denemesi yapıldı, Hasan karma tarzı
      seçti: ses "Masalcı Ses"ten, sahne kurma "Sahnenin İçinde"den; Işıl,
      soru başlığı ve "Biliyor muydun?" kutusu gerektiğinde.
- [x] **Kurgu (21 Ekim):** Çocuğun anlamasına yardım ediyorsa serbest; buna
      peygamberlerin iç sesi, duyguları ve kısa konuşmaları da dahil. Kur'an'da
      ve hadiste bildirilen bilgi kurgulanmaz, değiştirilmez. Allah'ın sözü
      yalnız mealdir. Kurgu parçaları teslim dosyasında `[[…]]` ile işaretlenir.
- [x] **Işıl (21 Ekim):** hikâyeye göre hem soran hem konuşan; sayı sınırı
      yok, ölçüt "gerçekten gerekli mi". 3.10.5'in eski "hikâyede görünmez"
      sınırı revize edildi.
- [x] **Brif değişti:** §7.10 eklendi; §4.4'teki konuşma yasağı, §7.2'deki
      "ortalama 10–14 kelime" ve "en fazla 1–2 kez sen" kuralları kalktı;
      §7.3'e üç blok, §13 ve §14'e kurgu ve Işıl maddeleri eklendi. Onaylı
      örnekler: `kitap-icerikleri/ORNEK-KARMA-TARZ.md`. İçerik denetçisi
      (`.claude/agents/icerik-denetcisi.md`) ve `icerik-faz2` / `aktarim`
      becerileri aynı kurallara hizalandı.
- [x] Okuma ekranına üç blok (5.1) ve veli bilgi notu (4.1/20; Gelişim
      Raporu → Kitaplar sekmesinin altında, "kurgu" kelimesi yok — Hasan).
      Önizleme `/tasarim/okuma?bolum=adem-4&ornek=karma`; lint ve build temiz.
- [x] Hz. Âdem'in 8 bölümünün karma tarzda yeniden yazımı
      (`kitap-icerikleri/KITAP-HZ-ADEM-ICERIK-v2.md`; mevcut dosya onaya kadar
      kalır), ardından aktarım. *22 Eki: yazıldı ve içerik denetçisinden geçti
      (kritik 0); Hasan onayı ve dört karar bekliyor (dosyanın sonundaki notlar).
      Aynı gün 1. ve 7. bölüm ikinci turda yeniden yazıldı; Hasan okudu, v2 ile
      devam kararı verdi.*
- [x] **Bölüm uzunluğu hikâyeden gelir (22 Ekim, Hasan):** 2.500–4.000
      karakter hedef değil, sınırdır; uzunluğu önemli anların sahne olarak
      anlatılması belirler. Gerekçe 8–11 yaş okuma süresidir (brif §7.2). Hz.
      Âdem v2'nin bölümleri alt sınıra yakın kaldı; bu kitap için kabul edildi,
      sonraki kitaplarda tekrarlanmaz. İçerik denetçisi "kırpılmış" bölümü
      bulgu olarak yazar.
- [x] **Hikâye içinde hayat dersi (22 Ekim, Hasan):** kesin yasak yok;
      hikâyenin anlamını artırıyorsa yer alır, karar noktasından önce gelmez,
      sırf ders olsun diye eklenmez (brif §7.10). Örnek: Hz. Âdem 7. bölümdeki
      öfke ve güvenlik paragrafı.
- [x] **Yazı duvarı olmaz (22 Ekim, Hasan):** görsel, Işıl, soru başlığı ya da
      kutu olmadan akan düz metin yaklaşık 900 karakteri geçerse sahneye uygun
      yeni görsel eklenir (brif §8.3). Hz. Âdem v2'de en uzun aralık 842
      karakter; yeni görsel gerekmedi.
- [x] Hz. Âdem v2'nin dört açık kararı verildi (dosyanın sonundaki notlar):
      "buğday" kutuda kalır, görsel dağılımı kalır, 7. bölüm güvenlik paragrafı
      kalır, Hz. Şît "(a.s.)" olmadan kalır.
- [x] **Hz. Âdem v2 aktarıldı (22 Ekim):** sekiz bölümün `paragraphs` ve
      `continuationParagraphs` alanları `books.ts`'te v2 ile birebir; Sen
      Olsaydın, karşılaştırma, Ne Öğrendik, görevler, final testi ve veli raporu
      değişmedi. Geçici `ademV2Onizleme.ts` ve önizlemenin `ornek=v2` seçeneği
      silindi. `SOZLUKCE-SICILI` §3'teki emanet/secde bölüm numaraları ve
      `ICERIK-GORSEL-SICILI`'nde `bolum-5/donus-sozleri`'nin yeri düzeltildi.
      Yayına çıkması `main`'e geçişle olur. **Ses:** `hz-adem-bolum-1.mp3`
      gerçek kayıttır (16 Tem 2026) ve eski metni okur; yeniden kaydedilmeli.
      `kitap-denetle` onu yer tutucu saymaz (öteki 7 bölüm ve bütün yer
      tutucular bu kaydın kopyası).
- [ ] Diğer 13 kitabın taraması ve sırayla yeniden yazımı. Ses kaydı hiçbir
      kitapta yok; bir kitabın metni kesinleşmeden o kitap seslendirilmez.

### 22 Ekim 2026 (iki eksenli kaynak ölçeği — Hasan onayı, bkz. 4.1/21 ve içerik brifi §4.3, §16/17b–c)

- [x] **Sorun:** Kaynak PDF'ler (Bahar Yayınları, A. C. Akıncı, *Peygamberler
      Tarihi* roman dizisi) Kur'an ve hadisi, klasik rivayeti ve romancının
      kurgusunu bir arada taşıyor. Brif §4.3 bunları üç gruba ayırıyordu ama
      hadisin yeri ve bilginin çocuğa uygunluğu ayrı tanımlı değildi; hadis
      için doğrulama yolu yoktu (Hz. Âdem'de sahih hadis hiç kullanılmadı).
      Başka bir yayınevinin Hz. Âdem kitabı ve bir AI sohbeti aynı hataları
      gösterdi: rivayeti kesin bilgi gibi yazmak, hadis alıntısına rivayetten
      gelen ismi eklemek, iki hadisi birleştirmek, âyeti bağlamından kesmek.
- [x] **Karar:** iki eksenli ölçek (4.1/21). Dört karar: (1) hadisteki sayılar
      çocuk metnine girmez, gerekiyorsa veli raporunda (§16/9); (2) hadis
      derecesine ajan hüküm vermez, bulunamayan hadis için Hasan bir hocaya
      danışır (§16/17b); (3) yayındaki kitaplar toplu taranmaz, karma tarz
      yeniden yazımında uygulanır; (4) Hz. Âdem için önerilen üç ek ayrı bir
      içerik turu olur.
- [x] **Değişen dosyalar:** içerik brifi (§4.3 yeniden yazıldı; §7.10, §13 A3,
      §14, §16/9 güncellendi; §16/17b–c eklendi), içerik denetçisi,
      `icerik-faz1` ve `icerik-faz2` becerileri, katalog §10 notu.
- [x] Hz. Âdem'e altı ek (Hasan onayıyla 22 Eki 2026'da v2, final.md veli
      raporu ve `books.ts`'e aktarıldı; kayıt v2'nin sonundaki "Ekler"
      notunda; `kitap-denetle adem` 0 hata, önizlemede doğrulandı. Ekler
      Bölüm 1'e dokunmadı; ama Bölüm 1'in gerçek ses kaydı v2'den önceki
      metni okur, v2 yüzünden yeniden kaydedilmeli — yukarıdaki not): Hucurât 49/13 kutusu
      Bölüm 2'ye; karga dersi (anlatıcı cümlesi) ve Mâide 5/32'nin olumlu
      yarısı Bölüm 7'ye; "güzel bir işe öncülük" hadisi (Müslim, İlim 15)
      Bölüm 8'e; "kendin için istediğini" hadisi (Buhârî, Îmân 7) ve ilk
      cinayetin günah payı hadisi (Buhârî, Enbiyâ 1; Müslim, Kasâme 27) veli
      raporuna. Künyeler Diyanet *Hadislerle İslâm*'dan doğrulandı.
- [ ] **Sonraya bırakılan içerik fikirleri** (Lopus Hz. Âdem incelemesi, 22 Eki
      2026; her biri ilgili kitabın Faz 1'inde iki eksenli ölçekle
      değerlendirilir): "Allah için verirken en iyisini vermek" (Âl-i İmrân
      3/92) kurban ya da sadaka geçen bir kitaba; gösteriş ve ihlas (üç kişi
      hadisi; künye Faz 1'de doğrulanır) Hz. İsmail ya da Hz. İbrahim'e;
      anne-baba hakkı (İsrâ 17/23) Hz. Yusuf–Yâkub ya da Hz. İbrahim–İsmail'e.
      Peygamber sıfatları ve melekler set düzeyindedir (4.2/S6).

### 22 Ekim 2026 (veli paneli yeniden tasarımı — Hasan onayı, bkz. 3.1, 3.2, 3.8, 3.9, 5.2)

- [x] **Sorun:** her şey aynı kenarlıklı kartta, iç içe kartlar; göze çarpan
      odak yoktu. Baloo başlıklar yetişkin paneline çocuk ekranı havası
      veriyordu. Ürünün asıl farkı aile sohbeti raporun beşinci sekmesinde,
      Aile ve Güvenlik hesap menüsünde saklıydı. Kütüphane, Ödüller ve
      Raporlar'da ayrı ayrı çocuk seçiliyordu. Bölüm sahneleri ve kapaklar
      panelde kullanılmıyordu.
- [x] **Karar:** taslak `/tasarim/veli-panel`'de sunuldu, Hasan onayladı ve
      canlıya alınmasını istedi. Beş hedefli gezinme (Ana Sayfa · Sohbet ·
      Gelişim · Kütüphane · Aile); Literata + Figtree; krem + gece mavisi +
      altın; bölüm yolu (yüzde yok); Kütüphane kapak rafı; Gelişim = rapor +
      ödüller. Tasarım araştırması: Oura, Google Family Link, Epic, Lingokids,
      NN/g pano ve gezinme araştırmaları (ilk blok tek özet; ilerleme uzunlukla,
      puanla değil; ayarlarda her satır kendi durumunu söyler).
- [x] **Uygulama:** ekranlar `src/components/veli/` (görünüm), canlı veri ve
      eylemler `VeliPaneliCanli.tsx` (ParentDataProvider + gerçek akışlar),
      önizleme `VeliPaneliOnizleme.tsx` (örnek aile). Güvenlik akışlarının
      (veli PIN'i, çocuk şifresi, eşleme kodu, cihazı çocuğa verme) mantığı
      değişmedi, yalnız görünümü. Eski adresler Gelişim'e yönlenir. Eski
      bileşenler (`VeliKabuk`, `VeliNav`, `HesapMenusu`, `CocukKarti`,
      `VeliCocukSecici`, `VeliSayfaBasligi`, `Rapor*Sekmesi`) ve
      `/tasarim/veli-rapor` kaldırıldı.
- [x] **Küçük yenilikler:** profil düzenlemede avatar seçimi; sabit sohbet
      önerisi metni değişmedi; zaman dili ("dün akşam") tek fonksiyondan.

## 11. İçerik Durumu

| Kitap | Durum |
|---|---|
| Hz. Âdem | ✅ Yeni içerik yazıldı ve **dini doğruluk onayı verildi (Hasan, 15 Tem 2026)** — **8 bölüm + Büyük Final Testi**. **Geçerli tek kaynak dosya: `kitap-icerikleri/KITAP-HZ-ADEM-ICERIK-final.md`** (eski `KITAP-HZ-ADEM-ICERIK.md` 12 Eki 2026'da silindi). **22 Eki 2026:** hikâye metinleri karma tarzda yeniden yazıldı ve aktarıldı; geçerli hikâye metni `KITAP-HZ-ADEM-ICERIK-v2.md`, final testi, veli raporu ve sözlükçe yine `-final.md`. Yeni bölüm akışıyla: iki parçalı hikâye + Seçimini Karşılaştır. Hâbil-Kâbil kıssası **Bölüm 7** olarak dahil — Mâide 5/27-31 merkezli, şiddet ayrıntısı gösterilmeden (kitaba özgü karar, genel kural değil). **4 koşullu "Bugüne Taşı" görevi** (Bölüm 2, 3, 5, 7). **`books.ts`'e + final testine + veli raporuna Faz 6.1'de aktarıldı (birebir).** |
| Hz. Şît | ✅ Kaynaklı içerik yazıldı ve **`books.ts` + `quizzes.ts` + veli raporuna aktarıldı (10 Ağu 2026)** — **4 bölüm + Büyük Final Testi (4 soru)**. **Geçerli tek kaynak dosya: `kitap-icerikleri/KITAP-HZ-SIT-FINAL.md`.** Kaynak sınıfı **K3** (adı Kur'an'da geçmez): rivayetler "anlatılanlara göre" çerçevesinde verilir; ömür/yaş/sahife rakamı ve defin yeri metinde hiç geçmez. **2 koşullu "Bugüne Taşı" görevi** (Bölüm 2, 3). Tanık Sayfası kullanılmadı (0). Geçici demo içeriği ve `localStorage` ilerleme altyapısı kaldırıldı; ilerleme Supabase'e yazılır. |
| Hz. İdrîs | ✅ Kaynaklı içerik yazıldı, **`books.ts` + `quizzes.ts` + veli raporuna aktarıldı (5 Eyl 2026)**; **dinî doğruluk ve editoryal onay verildi (Hasan, 12 Eki 2026)** — **4 bölüm + Büyük Final Testi (4 soru)**. **Geçerli tek kaynak dosya: `kitap-icerikleri/KITAP-HZ-IDRIS-ICERIK-final.md`**; kaynak denetimi (Faz 1) `KITAP-HZ-IDRIS-KAYNAK-DENETIMI.md`. Kaynak sınıfı **K2**: icat rivayetleri "İslam inancına ve tarihî rivayetlere göre" kalıbıyla verilir; yaş, yıl, ömür ve sahife sayısı metinde geçmez. **2 koşullu "Bugüne Taşı" görevi** (Bölüm 2, 3). Tanık Sayfası kullanılmadı (0). |
| Hz. Nuh, Hz. Ebû Bekir, Hz. Ömer | Önceki demo bölüm/okuyucu akışları ürün rotalarından kaldırıldı. Keşif Atlası'nda uygun bölgelerinde yalnız **Hazırlanıyor** görünür. |
| Diğer kitaplar | `KITAP-KATALOGU-VE-URETIM-PLANI.md` sırasıyla katalogda **Hazırlanıyor**; kaynaklı içerik geldikçe yayımlanacak. |

İçerik yazım kuralları: Bahar Yayıncılık yazım kuralları esas alınır
(peygamber adlarında "(a.s.)" ilk geçişte; kaynak dışına taşan kesin ifade yok;
abartısız, sıcak, 8-11 yaş dili; görsellerde peygamber, yakınları ve saygın
müminlerin yüzü gösterilmez — tasvir kuralı 6.4, REVİZE 16 Ekim 2026).
**Anlatım tarzı (KARAR 21–22 Ekim 2026):** karma tarz, içerik brifi §7.10.
Kurgu Kur'an ve hadis bilgisini değiştirmeden serbesttir. Yukarıdaki kitapların
metinleri bu kuraldan önce yazıldı; sırayla yeniden yazılacak, ilk kitap Hz. Âdem
(4.1/20).
Kitaba özgü kıssa/rivayet kararları (hangi rivayet kullanılmaz, hassas kıssa
nasıl çerçevelenir) genel kural DEĞİLDİR; her kitabın kimliğindeki "Kitaba özgü
kararlar" alanında tutulur. Örnek: Hz. Âdem'de Hâbil-Kâbil'in Mâide merkezli,
şiddet ayrıntısız işlenmesi.
