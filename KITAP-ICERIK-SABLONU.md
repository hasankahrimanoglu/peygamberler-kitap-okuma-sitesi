# KİTAP İÇERİK ŞABLONU — Keşif Dünyası (Peygamberler & Dört Büyük Halife)

> Bu doküman, bir kitabın TÜM içeriğini yazarken teslim edilmesi gereken veri
> alanlarını ve her alanın kurallarını tanımlar. Çıktı birebir bu yapıda ve bu
> sırayla teslim edilir; alan adları değiştirilmez.
>
> **Kapsam:** Web tabanlı, oyunlaştırılmış dijital okuma deneyimi (rozet, kitap
> madalyası, ünvan). Aynı şablon serinin tüm kitapları için kullanılır; kitaba
> özgü olan tek şey içeriktir, sistem asla değişmez.
>
> **Sürüm:** 3.0 (15 Tem 2026 — yeni bölüm akışı: hikâye iki parçaya ayrıldı,
> "Sen Olsaydın" karar noktasına taşındı, "Seçimini Karşılaştır" eklendi;
> "Bugüne Taşı" koşullu görev oldu ve görev meta alanları tanımlandı.
> Önceki: 2.0 — Sözlükçe, yumuşatma kuralları, Tanık Sayfası, değişken veli
> özeti, merkezi rozet matrisi, QC listesi.)

---

## 0. ÜRÜNÜ TANI (içeriği yazan için kısa çerçeve)

- Ürün, **8-11 yaş** çocuklar için peygamber ve halife kıssalarını bölüm bölüm
  okutan bir dijital okuma yolculuğudur. Çocuk her bölümün sonunda bir **ROZET**,
  kitabın tamamı + final testi sonunda bir **MADALYA** ve okudukça yükselen bir
  **ÜNVAN** kazanır.
- Her bölümün ekran akışı sabittir:

  **Kapak → Hikâye — 1. Kısım (bazı bölümlerde Tanık Sayfası dahil) →
  Sen Olsaydın? → Hikâye Devam Ediyor → Seçimini Karşılaştır → Ne Öğrendik? →
  (varsa) Bugüne Taşı → İllüstrasyon → Rozet Kapısı**

- "Sen Olsaydın?" hikâye bittikten sonra sorulan bağımsız bir soru DEĞİLDİR;
  hikâyenin gerçek bir karar/gerilim noktasına yerleşir. Çocuğun seçimi hikâyeyi
  DEĞİŞTİRMEZ (dallanma yok); doğru cevap seçim anında AÇIKLANMAZ. Hikâyenin
  devamında kararın doğurabileceği sonuç görülür; bölüm sonunda yalnızca çocuğun
  seçtiği şıkka ait "Seçimini Karşılaştır" metni gösterilir.
- Sistem hikâye metnini otomatik olarak ~620 karakterlik ekran sayfalarına böler;
  sayfa planı yapmana gerek yok, sadece paragraf ve cümle kurallarına uy.
- Bir kitap bitince final testi açılır; testi **tamamlamak** kitap madalyasını
  kazandırır ve serideki bir sonraki kitabın kilidini açar (doğru sayısı şartı
  YOKTUR — test bir engel değil, hatırlama+kutlama anıdır).

**Not — Etkinlik köşesi:** Baskı sürümünde bulunan "✏️ Etkinlik" köşesi (çiz/yaz
görevleri) web sürümüne **bilinçli olarak dahil edilmemiştir**; ekran ortamında
zayıf kaldığı için işlevi "Bugüne Taşı"na bırakılmıştır. İleride tekrar
değerlendirilebilir.

---

## 1. KİTAP KİMLİĞİ (kitap başına 1 kez)

| Alan | Kural | Örnek |
|---|---|---|
| **Kitap adı** | "Hz. + isim". Harita kartında, kitap detayında ve okuma ekranı üst barında görünür. | Hz. Âdem |
| **Alt başlık** | Tek cümlelik slogan, 25-45 karakter. Kartta adın altında. | İlk insan, ilk yolculuk |
| **Tanıtım paragrafı** | Kitap detay sayfası için 1-2 cümle, 120-200 karakter. Ana temaları sayar, abartısız. | Hz. Âdem'in yaratılışı, öğrenme yolculuğu, tövbesi ve yeryüzündeki ilk adımları. |
| **Üst etiket (eyebrow)** | Kapak sayfasındaki küçük rozet metni. | Hz. Âdem — Çocuklar İçin |
| **Madalya adı** | SABİT FORMAT: "{Kitap adı} Yolculuk Madalyası". Tek tiptir; altın/gümüş/bronz YOK. | Hz. Âdem Yolculuk Madalyası |
| **Bölüm sayısı** | Hedef 8-10 bölüm (5 de çalışır). Bölümler kitabın kronolojisini izler. | 8 |
| **Ana değerler** | Kitabın işleyeceği 4-5 çekirdek değer. Rozetler ve bölümler bunlara bağlanır; Merkezi Rozet Matrisi bu listeden beslenir. | sabır, dürüstlük, sadakat, cömertlik, tevekkül |
| **Görsel dünya** | Bu kitaba özgü illüstrasyon evreni (mekân/nesne/atmosfer). Tüm sahne tarifleri bu dünyaya sadık kalır. | tabiat, bahçe, ışık, gökyüzü, ilk sabah |
| **Kitaba özgü proje kararları** | Bu kitapta kullanılmayacak rivayetler, hassas kıssaların nasıl çerçeveleneceği ve özel kısıtlar (varsa). Genel kural değil, sadece bu kitabı bağlar. | Hâbil-Kâbil kıssası Mâide 5/27-31 merkezli, şiddet ayrıntısı gösterilmeden işlenir; yılan anlatısı ve kesin iniş yeri rivayetleri kullanılmaz. |
| **Ekim-kapanış halkaları** (opsiyonel ama önerilir) | Kitabın başında ekilip sonunda kapanan söz/dilek/karakter bağları. Yazıma başlamadan listelenir. | Genç tüccarın "Kâbe temizlenecek" dileği → fetihte kapanır. |
| **Etkileşim kararı** | Bu kitapta "Sen Olsaydın?" sorularının karar noktalarına nasıl yerleştiği 2-3 cümleyle özetlenir (standart kurallar Bölüm 2.4'te; burada kitaba özgü ton/yerleşim). | "Sen Olsaydın" her bölümün karar noktasında çıkar; seçim hikâyeyi değiştirmez... |
| **Bugüne Taşı kararı** | Kitapta hangi bölümlerde görev bulunduğu ve gerekçesi. Görevler koşulludur (bkz. 2.6). | Yalnızca doğal görev çıkan dört bölümde (2, 3, 5, 7) görev bulunur. |

---

## 2. HER BÖLÜM İÇİN (bölüm sayısı kadar tekrar)

### 2.1 Bölüm kimliği

| Alan | Kural | Örnek |
|---|---|---|
| **Bölüm no** | 1'den başlayan sıra. | 1 |
| **Bölüm adı** | En fazla ~28 karakter (ekranda TEK SATIR kuralı). Merak uyandıran, yaşa uygun. | İlk İnsan, İlk Öğrenme |
| **Bölüm özeti** | 1 cümle, 60-110 karakter. Bölüm kapağında ve bölüm listesinde görünür. Soru cümlesi de olabilir. | Hz. Âdem'in yaratılışı ve ilk öğrendikleri |
| **Rozet adı** | SABİT FORMAT: "{Değer/kavram} Rozeti", 2-3 kelime. Bölümün ana değerine bağlı. "Nişan", "ödül", "madalya" kelimeleri YASAK. **Set genelinde tekildir** (bkz. Bölüm 7 — Merkezi Rozet Matrisi). | İlk Adım Rozeti / Tövbe Rozeti |
| **Rozet sembol fikri** | 1-2 kelime; rozet görseli üretiminde kullanılacak iç sembol. Yüz/figür içermez. | filiz, açık kitap, kandil, yıldız |
| **Rozet icon anahtarı** | Kodun rozet görselini bulmak için kullandığı anahtar. SABİT FORMAT: `{kitapKey}-bolum-{no}` (küçük harf, Türkçe karaktersiz, tireli). `public/rozetler/rozet-{anahtar}.png` dosyasına karşılık gelir. | adem-bolum-1 |

### 2.2 Hikâye metni — İKİ PARÇALI YAPI

Hikâye iki parça hâlinde teslim edilir:

- **HİKÂYE — 1. KISIM:** Bölümü açar ve **gerçek bir karar, gerilim veya doruk
  noktasında** biter. "Sen Olsaydın?" sorusu bu noktaya yerleşir; soru hikâyenin
  doğal akışından doğmalıdır (yapay kesinti hissi verilmez).
- **HİKÂYE DEVAM EDİYOR:** Olayın çözümünü anlatır; çocuğun az önce düşündüğü
  kararın hikâyede doğurabileceği sonuç burada görülür. Çocuk hangi şıkkı
  seçerse seçsin metin AYNIDIR (dallanma yok).

Ortak kurallar (iki parçanın toplamı için):

- **Toplam uzunluk:** bölüm başına 2.500-4.000 karakter (≈ 4-7 ekran sayfası).
- **Paragraflar:** her paragraf 150-400 karakter, tek fikir taşır. Paragraflar
  arasına boş satır konur; sistem sayfalamayı otomatik yapar.
- **Cümle uzunluğu (8-11 yaş):** ortalama **10-14 kelime**, üst sınır **18 kelime**.
  Uzun cümleyi böl. Bilinmeyen kelime çıkacaksa Kelime Kutusu'na alınır.
- **Diyalog oranı:** her bölümün metninin **en az üçte biri diyalog** olsun;
  hikâyeyi sahne sahne, konuşarak ilerlet.
- **Diyalog biçimi:** konuşma satırları uzun çizgiyle başlar: `— İnancından vazgeç!`
  (Sistem bunları italik gösterir.)
- **Anlatıcı sesi:** sıcak, çocuğa zaman zaman "sen" diye seslenen bir anlatıcı
  ("Dur ve düşün...", "Ne akıllıca bir plan, değil mi?"). Her bölümde en fazla
  1-2 kez; abartma.
- **Bölüm sonu ("Hikâye Devam Ediyor"nun son paragrafı):** merak bırakır veya
  bölümün değerini yumuşakça toparlar; bir sonraki bölüme köprü kurabilir.
  (1. Kısım'ın sonu ise her zaman karar noktasıdır — yukarıya bak.)

**Etkileşimli kelime (Kelime Kutusu):** bölüm başına 1-2 adet. Çocuğun
bilemeyeceği dinî/tarihî bir kelime seçilir; tıklayınca anlamı açılır. Anlam,
**Standart Sözlükçe'den (Bölüm 5) birebir alınır.** Şu formatta teslim edilir:

```
[KELİME]
Öncesi: "Ebû Bekir bir an durdu. İstenen para, büyük bir "
Kelime: servet
Anlamı: Bir kişinin sahip olduğu büyük para, mal ve değerli şeylerin tamamı.
Sonrası: "ti."
```

(Öncesi + kelime + sonrası birleşince akıcı tek paragraf oluşmalı. Anlam
açıklaması çocuk diliyle tek cümledir.)

**Sözlükçe kuralı:** Bir terim kitap içinde **ilk geçtiği bölümde** kutulanır;
**ikinci kez kutulanmaz.** Sözlükçede olmayan yeni bir terim kutuluyorsan, önce
Sözlükçe'ye ekle (Bölüm 5), sonra tüm seride aynı tanımı kullan.

### 2.3 Tanık Sayfası (TAMAMEN OPSİYONEL — kullanılan kitaplarda 2-3 kez; her kitapta bulunmak zorunda değil)

Olayları, hikâyedeki bir çocuk/genç karakterin ağzından **günlük üslubuyla**
anlatan özel bir sayfa. Hikâye sayfalarının içinde, bölümün doruk noktasından
sonra gösterilir. Çocuk, tarihe kendi yaşıtının gözünden tanıklık eder.

Format:

```
[TANIK SAYFASI]
Tanık adı: Esmâ
Tanık etiketi: Esmâ'nın Günlüğünden
Kurgusal mı?: hayır   (evet/hayır)
Metin:
Babam bugün eve bambaşka döndü. Gözlerinde daha önce hiç görmediğim bir ışık
vardı...
```

Kurallar:
- **Tanık karakter kitap boyunca değişmez;** kitabın başında bir kez tanıtılır.
  (Ör. Hz. Ebû Bekir kitabında tanık, kızı Esmâ'dır.)
- Tanık, tarihî kişiliği belgelenmiş biri olmalı; ağzına konan sözler tarihî
  gerçeklerle çelişmez.
- Uygun tarihî çocuk karakter yoksa "kervandaki bir çocuk" gibi **isimsiz, kurgu
  olduğu açıkça belirtilen** bir tanık kullanılır. Bu durumda `Kurgusal mı?: evet`
  işaretlenir ve sistem sayfanın altına şu notu gösterir: *"Bu sayfadaki çocuk
  hayalîdir; anlattığı olaylar gerçektir."*
- Birinci tekil şahıs, sıcak ve samimi; 400-700 karakter.
- Peygamber/halife/sahabe tasviri yapılmaz; tanık onları görür ama tarif etmez.

### 2.4 Sen Olsaydın? + Seçimini Karşılaştır (her bölümde 1 adet — ZORUNLU)

Hikâyedeki ikilemi çocuğun kendi hayatına çevirir. **1. Kısım'ın bittiği karar
noktasında** sorulur. Çocuk bir şık seçer; **doğru cevap o anda açıklanmaz** ve
sistem o anda geri bildirim GÖSTERMEZ. Çocuk hikâyeyi okumaya devam eder;
"Hikâye Devam Ediyor" bittikten sonra **Seçimini Karşılaştır** alanında yalnızca
çocuğun seçtiği şıkka ait karşılaştırma metni gösterilir. Format:

```
### SEN OLSAYDIN
Soru: Yeni ve zor bir şey öğrenirken hata yaptığını fark ediyorsun. Ne yaparsın?
A) Hemen bırakır, bir daha denemezdim.
B) Sakin kalır, hatamı anlayıp yeniden denerdim.   ← DOĞRU
C) Kimse görmesin diye konuyu kapatırdım.

### SEÇİMİNİ KARŞILAŞTIR
A) Bırakmak kısa süreli rahatlık verebilirdi; hikâyede ise yeniden denemenin
   insanı büyüttüğünü gördük.
B) Seçimin hikâyedeki değerle uyumlu. Kahramanımız da hata sonrası sakinleşip
   yeniden denedi.
C) Anlıyorum, bazen böyle hissederiz; hikâyede ise konuşmanın ve yeniden
   denemenin kalbi hafiflettiğini gördük.
```

Kurallar:
- Soru 1-2 cümle, çocuğun günlük hayatından (okul, ev, arkadaş) ve "Ne yaparsın?"
  ile biter; hikâyedeki karar anına birebir bağlanır.
- 3 seçenek; hepsi "…yapardım / …denerdim" kipinde kişisel davranış cümlesi.
- **1 doğru** (bölümün değerini yaşatan davranış) + **2 gerçekçi ama zayıf**
  alternatif. Seçeneklerde alay, aşağılama, korkutma OLMAZ.
- **Her şık için ayrı "Seçimini Karşılaştır" metni yazılır** (sistem yalnızca
  seçilen şıkkınkini gösterir):
  - **Doğru şık →** seçimi hikâyenin değeriyle ilişkilendiren kısa onay
    (1-2 cümle, abartısız).
  - **Zayıf şıklar →** çocuğu ASLA utandırmayan, yargılamayan; seçimin olası
    sonucunu nazikçe gösterip hikâyede görülen değere bağlayan 1-2 cümle.
    ("yanlış", "hata yaptın" gibi ifade kullanılmaz.)
- Karşılaştırma metinleri hikâyenin DEVAMINA atıf yapar ("hikâyede gördük ki…");
  çocuk metni okuduğunda sonuç zaten yaşanmıştır.
- Doğru şık her soruda aynı harfte olmasın; **kitap genelinde A/B/C dağılımı
  mümkün olduğunca dengeli** tutulur.
- Çocuğun seçimi hikâyeyi DEĞİŞTİRMEZ; dallanan hikâye yazılmaz.

### 2.5 Ne Öğrendik? (her bölümde — ZORUNLU)

- **3 kısa madde.** Her madde tek cümle, 60-130 karakter.
- İlk madde bölümün ana değerini söyler; diğerleri hikâyedeki somut olaya bağlanır
  ("Bilâl'in her şeyini aldılar ama inancını alamadılar." gibi).
- Ders verir gibi değil, keşfettirir gibi: "…demek ki…", "…öğrendik ki…"
  kalıpları serbest ama her maddede tekrarlanmaz.

### 2.6 Bugüne Taşı (KOŞULLU — yalnızca uygun bölümlerde)

**Her bölümde bulunması ZORUNLU DEĞİLDİR.** Görev yalnızca bölümdeki olaydan
çocuğun günlük hayatına **doğal, güvenli ve uygulanabilir** bir davranış
çıkarılabiliyorsa eklenir; sırf her bölümde görev olsun diye yapay görev
üretilmez. **8 bölümlük bir kitapta ~3-4 görev yeterli** kabul edilir (bu sayı
editoryal hedef aralıktır; teknik alt/üst sınır değildir). Bazı bölümlerde bu
alan hiç bulunmaz.

Görevler **gönüllüdür:** çocuk görevi profiline ekler ("Görevi Listeme Ekle")
veya eklemez ("Şimdilik Değil"). Görevin yapılmaması kitabın ilerlemesini,
bölüm rozetini, kitap madalyasını veya sonraki kitabın açılmasını ENGELLEMEZ.
Göreve ayrı rozet/madalya/puan verilmez.

Görev şu meta alanlarla teslim edilir:

```
### BUGÜNE TAŞI
Görev ID: adem-2-yeni-kelime          ← {kitapKey}-{bölümNo}-{kısa-ad}, küçük harf, tireli
Görev adı: Yeni Kelime Avcısı          ← 2-4 kelime, çocuk dilinde
Kategori: öğrenme                      ← tek kelime/kısa etiket (öğrenme, iyilik, duygu yönetimi...)
Çocuğa görünen açıklama: ...           ← görevin kendisi; net, güvenli, uygulanabilir
Tahmini süre: 5 dakika                 ← gerçekçi tahmin
Tamamlanma ölçütü: ...                 ← çocuğun "tamamladım" diyebileceği somut ölçüt
Güvenlik notu: ...                     ← YALNIZCA gerekliyse (tehlike/yetişkin desteği)
Profil eylemi: Görevi Listeme Ekle / Şimdilik Değil   ← sabit satır
```

İçerik kuralları:
- Bugün ya da bu hafta yapılabilecek, küçük ve gözlemlenebilir bir davranış;
  bölümün değerine birebir bağlı.
- Para, alışveriş, ekran, sosyal medya içeren görev verilmez; ibadet görevleri
  dayatılmaz; aile iznini aşan eylem istenmez.
- Tamamlama öz bildirime dayanır; kanıt (fotoğraf vb.) istenmez.

### 2.7 Bölüm illüstrasyon önerisi (opsiyonel ama istenir)

- Bölüm başına 1-2 sahne tarifi (görsel üretiminde kullanılacak).
- **Tasvir hassasiyeti (kesin kural):** peygamber/halife/sahabe yüzü ve bedeni
  TASVİR EDİLMEZ. Arkadan silüet bile tercih edilmez; tabiat, mekân, nesne, ışık
  ve sembol sahneleri kullanılır. Kalabalıkta isimsiz yan figürler (halk,
  çocuklar) yüzlü çizilebilir.
- Sahne, kitabın **Görsel dünya**sına (Bölüm 1) sadık kalır; dönemle uyumsuz dekor
  (ör. anakronik yapı) kullanılmaz.
- Örnek: "Gün doğumunda ışıkla yıkanan yemyeşil bir vadi, ortada kıvrılan bir
  patika, uzakta dağlar; huzurlu ve masalsı atmosfer."

---

## 3. BÜYÜK FİNAL TESTİ (kitap başına 1 kez)

- **Soru sayısı = bölüm sayısı; her bölümden 1 soru.** (8 bölüm → 8 soru.)
- Her sorunun **kaynak bölümü** yazılır. Bu alan yalnızca **iç kontrol** içindir:
  soruların bölümlere doğru dağıldığını yazım aşamasında teyit etmeye yarar.
  Çocuğa gösterilmez; yanlış cevapta bölüme yönlendirme YAPILMAZ (kutlama/ödül
  anını ödeve çevirmemek için bilinçli karar). Çocuk zaten dilediğinde "Tekrar
  Oku" ile kendi isteğiyle bölümlere dönebilir.
- Hem olay bilgisi hem değer kavrayışı ölçülür (yaklaşık yarı yarıya).
- Her soru şu formatta:

```
Soru 1: Hz. Âdem'e isimlerin öğretilmesi ona hangi gücü kazandırdı?
A) Çok hızlı koşma gücü
B) Öğrenme ve bilgiyi güzel kullanma gücü   ← DOĞRU
C) Kimseye ihtiyaç duymama gücü
Kaynak bölüm: 1
```

Kurallar:
- 3 seçenek; çeldiriciler mantıklı ama açıkça yanlış (kafa karıştırmak için değil,
  düşündürmek için) ve metinle çelişmez.
- Sorular **yalnızca kitapta açıkça verilen bilgilerden** hazırlanır.
- Doğru şıklar A/B/C arasında dengeli dağıtılır (aynı şıkta yığılma olmaz).
- Soru dili pozitif; "hangisi YANLIŞTIR" kalıbı kullanılmaz.
- Puan dili asla utandırmaz; en düşük sonuç bile yeniden okumayı bir ödül gibi
  sunar.

---

## 4. VELİ RAPORU METİNLERİ (kitap başına 1 kez)

Veli panelinde görünür. Üç blok halinde teslim edilir.

### 4.1 Veli özeti — değişken (3 varyant)

Çocuğun kitap boyunca Sen Olsaydın sorularında doğru şıkkı seçme oranına göre
sistem birini gösterir. GÖZLEM dili kullanılır; kesin hüküm ve psikolojik
değerlendirme YASAK. Çocuğu etiketlemez, yargılamaz.

```
Özet (high — kararların çoğunda değeri yakaladı):
Çocuğunuz Hz. Âdem yolculuğunda öğrenme, hata sonrası yeniden deneme ve sorumluluk
değerlerini kararlarına güçlü biçimde yansıttı.

Özet (mixed — bazı kararlarda ikircikli):
Çocuğunuz bu yolculuktaki değerlerle tanıştı; bazı kararlarında düşünceli, bazılarında
ikircikliydi. Birlikte konuşmanız keşfini derinleştirebilir.

Özet (low — çoğu kararda zayıf şık):
Çocuğunuz bu yolculuğun değerleriyle tanıştı. Kitabı birlikte yeniden okumak ve
kararları konuşmak, bu değerleri pekiştirmesine yardımcı olabilir.
```

*Eşik önerisi (kod tarafına bırakılır): ≥%70 → high, %40-70 → mixed, <%40 → low.*
*Doğru: "…değerleriyle tanıştı / kararlarına yansıttı." — Yanlış: "Çocuğunuz artık
sorumluluk sahibi oldu." / "İmanı güçlendi."*

> **Sistem zamanlaması notu:** Bu değişken seçim, çocuğun Sen Olsaydın cevaplarının
> kaydedilmesine bağlıdır (PROJE-MODELI.md'de S5 olarak sonraya bırakılmıştır). O
> altyapı gelene kadar sistem varsayılan olarak **`mixed`** varyantını gösterir.
> İçerik yine de üç varyantı da yazar; varyantlar veride hazır bekler, S5 ile
> otomatik devreye girer.

### 4.2 Aile sohbet soruları (2 adet)

Yemekte/yatmadan önce sorulabilecek, açık uçlu, suçlayıcı olmayan sorular:
- "Hz. Âdem'in öğrendiği isimler sana neyi hatırlattı?"
- "Bir hata yaptığında yeniden denemek için sana ne cesaret verir?"

### 4.3 Çocuğunuz sorarsa (3-5 zor soru + yaklaşım önerisi)

Kitabın konusundan doğabilecek, çocuğun sorabileceği zor soruları ve veliye
yaklaşım önerisini içerir. Her madde: **soru + kısa, sakin yaklaşım önerisi.**

```
Soru: "İnsanlar neden ölüyor? Ben de ölecek miyim?"
Yaklaşım: Telaşlanmadan, sakin ve dürüst olun. "Her insan bu dünyaya bir görev için
gelir; görev bitince Allah'a kavuşur." Çocuğun asıl merakı çoğu zaman "Ben güvende
miyim?"dir; ona sarılın ve güvence verin. Ölümü korku değil, kavuşma olarak anlatın.
```

Kurallar: ölüm, mucize gibi hassas konular kitapta geçtiyse bunlar **mutlaka**
eklenir. Ton güvence verir, kapıyı açık bırakır, tek doğru cevap dayatmaz.

---

## 5. STANDART SÖZLÜKÇE (tüm kitaplarda ortak — yaşayan liste)

Aşağıdaki tanımlar **kelimesi kelimesine sabittir**; 16 kitabın hepsinde aynı
tanım kullanılır. Kelime Kutusu tanımları buradan birebir alınır. Yeni terim
eklendikçe bu tabloya işlenir ve tüm kitaplara bildirilir.

| Terim | Standart tanım (8-11 yaş) |
|---|---|
| **Hicret** | Bir yerden başka bir yere göç etmek demektir. |
| **Müşrik** | Bir olan Allah'a inanmayıp putlara tapan kimse demektir. |
| **Vahiy** | Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır. |
| **Halife** | Peygamberimizden sonra Müslümanların başına geçen yöneticiye denir. |
| **Sahabe** | Peygamberimizi görmüş ve ona inanmış kimselere denir. |
| **Peygamber** | Allah'ın, mesajlarını insanlara ulaştırmak için seçtiği elçidir. |
| **Kâbe** | Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır. |
| **Put** | İnsanların kendi elleriyle yapıp taptıkları heykellerdir. |
| **Tevekkül** | Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır. |
| **Mucize** | Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır. |
| **Zekât** | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. |

**Kural:** Yeni bir terim kutulanacaksa önce buraya çocuk diliyle tek cümlelik
tanımı eklenir, sonra kullanılır. Aynı terim bir kitapta yalnızca ilk geçişte
kutulanır.

---

## 6. DİL, KAYNAK VE YUMUŞATMA KURALLARI (tüm metinler için geçerli)

### 6.1 Dil ve kaynak

1. **Hedef yaş 8-11.** Kısa cümleler, bilinen kelimeler; bilinmeyen kelime
   Kelime Kutusu'na alınır. (Cümle metrikleri: bkz. 2.2.)
2. **Kaynak çerçevesi:** ilgili kitabın Bahar Yayıncılık serisindeki anlatısı
   (Peygamberler Tarihi / Dört Büyük Halife) + Kur'an ve sahih siyer kıssasının
   ana hattı. **Kaynakta olmayan olay, isim, diyalog, ayrıntı UYDURULMAZ.** Emin
   olunmayan yer genel ifadeyle geçilir.
3. **Kesin dinî hüküm ve yorum yazılmaz;** kıssa anlatımına bağlı kalınır. Âyet ve
   hadis birebir alıntılanmaz; özü ve mesajıyla, anlatım diliyle aktarılır.
4. **"(a.s.)" kullanımı:** her bölümde ilk geçişte "Hz. Âdem (a.s.)", sonrasında
   "Hz. Âdem". (Sahabe ve halifeler için "Hz." kullanılır, "(a.s.)" kullanılmaz.)
5. **Tasvir yok:** peygamber/halife/sahabe için fiziksel görünüş betimlemesi
   yapılmaz (yüz, boy, ten rengi vb.).
6. **Sadeleştirme:** ağır/Osmanlıca kelimeler günümüz Türkçesine çevrilir
   (nedamet→pişmanlık, itimat→güven, halas→kurtuluş, mazhar olmak→kavuşmak).
   Orijinal metindeki şiirler ve iç monologlar kullanılmaz.

### 6.2 Yumuşatma (ağır konular)

1. **Savaş sahneleri** "mücadele" düzeyinde anlatılır; yaralanma/ölüm detayı
   verilmez ("yurtlarını korumak zorunda kaldılar" çerçevesi). Savaş ve düşman
   isimleri yığılmaz; kimse "düşman" olarak kodlanmaz.
2. **Dönemin ahlak çöküntüsü** (içki, kumar, kölelik zulmü vb.) yalnızca
   "kötülükler / haksızlıklar" genellemesiyle geçilir; sahnelenmez.
3. **Ağır olaylar** (ör. kuyuya atılma, tufan, işkence) tek-iki cümleyle, sonuç ve
   ders odaklı, travma yaratmadan işlenir. Odak acıda değil, kurtuluş ve umuttadır.
4. **Ölüm**, korkutmadan ama gerçeği inkâr etmeden, "görevini tamamlayıp Allah'a
   kavuşma" çerçevesiyle anlatılır. (Bu konu geçtiyse Veli Raporu 4.3'e ölüm
   sorusu mutlaka eklenir.)
5. **Korku öğesi ölçülü:** çocukta kaygı yaratacak sahneleşme yapılmaz; zorluklar
   umut ve çözümle dengelenir.

### 6.3 Ton ve dil yasakları

1. **Abartı yasak:** "hayatını değiştirecek", "kesinlikle", "en iyi", "mutlaka"
   gibi kalıplar hiçbir metinde kullanılmaz.
2. **Puan/yarışma dili yok:** "kazanmak için", "en hızlı", "birinci ol" gibi
   ifadeler kullanılmaz. Rozet bir yarışın değil, tamamlamanın işaretidir.

### 6.4 Duygusal yay

Kitabın ritmi çocuğu yormadan taşımalı: merak/sevinç → zorluk ama umut → doruk
heyecan → huzur/inşa → hüzün → toparlanma/güç → huzurlu kapanış. **Hüzünlü
bölümler asla art arda ağırlaştırılmaz;** iki hüzünlü bölüm arasına umut tonlu bir
bölüm bilinçli tampon olarak konur.

---

## 7. MERKEZİ ROZET MATRİSİ (set genelinde tek liste)

Serideki tüm kitaplar toplam 130+ rozet üretecektir. Koleksiyonun değerini korumak
için:

1. **Rozet adı set genelinde tekildir.** Aynı isimde iki rozet olmaz.
2. Aynı değer birden çok kitapta işlenecekse, her biri **farklı ad + farklı nüans
   + o kitabın sahnesine özgü sembol** ile gelir.
   - Örnek: sadakat/sabır ailesi → "Sadakat Rozeti" (Ebû Bekir), "Bekleyen Kalp
     Rozeti" (Eyüp), "Sarsılmaz Güven Rozeti" (Yusuf).
3. **Yeni rozet üretmeden önce Merkezi Rozet Matrisi'ne bakılır** (ayrı dosyada
   tutulur; kitaplar yazıldıkça işlenir). Bir değer sette en fazla 3 kez, her
   seferinde farklı nüansla kullanılır.
4. Aynı değer ailesinden rozetler ileride "Değer Ailesi" olarak gruplanabilir
   (opsiyonel koleksiyon mekaniği).

*Bu matris, baskı sürümündeki 84 kartlık Kart Matrisi'nin rozet karşılığıdır.*

---

## 8. TESLİM FORMATI

İçerik tek dosyada, şu iskeletle teslim edilir (1. bölüm örnek doldurulmuştur):

```markdown
# KİTAP: Hz. Âdem
Alt başlık: İlk insan, ilk yolculuk
Tanıtım: Hz. Âdem'in yaratılışı, öğrenme yolculuğu, tövbesi ve yeryüzündeki ilk adımları.
Üst etiket: Hz. Âdem — Çocuklar İçin
Madalya: Hz. Âdem Yolculuk Madalyası
Bölüm sayısı: 8
Ana değerler: öğrenme, tövbe, sorumluluk, merhamet, şükür
Görsel dünya: tabiat, bahçe, ışık, gökyüzü, ilk sabah
Kitaba özgü kararlar: (bu kitapta kullanılmayacak rivayetler + hassas kıssaların çerçevesi)
Ekim-kapanış halkaları: (varsa listele)
Etkileşim kararı: (Sen Olsaydın'ın bu kitaptaki yerleşim özeti — bkz. Bölüm 1 tablosu)
Bugüne Taşı kararı: (görev bulunan bölümler + gerekçe — bkz. Bölüm 1 tablosu)

## BÖLÜM 1: İlk İnsan, İlk Öğrenme
Özet: Hz. Âdem'in yaratılışı ve ilk öğrendikleri
Rozet: İlk Adım Rozeti
Rozet sembolü: filiz
Rozet icon anahtarı: adem-bolum-1

### HİKÂYE — 1. KISIM
(paragraf 1)

(paragraf 2)

— (diyalog satırı örneği)

[KELİME]
Öncesi: "..."
Kelime: ...
Anlamı: ...
Sonrası: "..."

(devam paragrafları — 1. Kısım karar/gerilim noktasında biter)

### TANIK SAYFASI   (yalnızca bu bölümde tanık sayfası varsa)
Tanık adı: ...
Tanık etiketi: ...
Kurgusal mı?: hayır
Metin: ...

### SEN OLSAYDIN
Soru: ...
A) ...
B) ...   ← DOĞRU
C) ...

### HİKÂYE DEVAM EDİYOR
(olayın çözümü — çocuğun seçimi ne olursa olsun aynı metin)

### SEÇİMİNİ KARŞILAŞTIR
A) (bu şıkkı seçen çocuğa gösterilecek karşılaştırma metni)
B) (doğru şık — değeri onaylayan metin)
C) (bu şıkkı seçen çocuğa gösterilecek karşılaştırma metni)

### NE ÖĞRENDİK
1. ...
2. ...
3. ...

### BUGÜNE TAŞI   (YALNIZCA görev tanımlanan bölümlerde — koşullu)
Görev ID: ...
Görev adı: ...
Kategori: ...
Çocuğa görünen açıklama: ...
Tahmini süre: ...
Tamamlanma ölçütü: ...
Güvenlik notu: ...   (yalnızca gerekliyse)
Profil eylemi: Görevi Listeme Ekle / Şimdilik Değil

### İLLÜSTRASYON
Sahne: ...

## BÖLÜM 2: ...
(aynı yapı)

## FİNAL TESTİ
Soru 1: ...
A) ... B) ... C) ...  (doğru şık işaretli)
Kaynak bölüm: 1
(bölüm sayısı kadar soru)

## VELİ RAPORU
Özet (high): ...
Özet (mixed): ...
Özet (low): ...
Sohbet sorusu 1: ...
Sohbet sorusu 2: ...
Çocuğunuz sorarsa 1: Soru / Yaklaşım
Çocuğunuz sorarsa 2: Soru / Yaklaşım
(3-5 adet)
```

Bu yapıda gelen içerik, kod değişikliği olmadan sisteme (books.ts) aktarılabilir.

---

## 9. TESLİM ÖNCESİ QC KONTROL LİSTESİ (her kitap için zorunlu)

Kitap teslim edilmeden önce madde madde işaretlenir:

- [ ] Kitap kimliğinin tüm alanları dolu (ana değerler, görsel dünya, kitaba özgü kararlar, etkileşim kararı, Bugüne Taşı kararı dahil)
- [ ] Bölüm sayısı 8-10 (veya en az 5); her bölümde rozet adı var ve set genelinde tekil
- [ ] Her bölümde rozet icon anahtarı var (`{kitapKey}-bolum-{no}` formatında)
- [ ] Her bölümde hikâye iki parça: "1. Kısım" karar/gerilim noktasında bitiyor; "Hikâye Devam Ediyor" olayın çözümünü veriyor; dallanma YOK
- [ ] Cümleler ort. 10-14 kelime, üst sınır 18; her bölümde ≥1/3 diyalog
- [ ] Bölüm adları ≤28 karakter (tek satır); özetler 60-110 karakter
- [ ] Kelime Kutusu tanımları Sözlükçe ile birebir aynı; terim ikinci kez kutulanmamış
- [ ] Yeni terim varsa Sözlükçe'ye eklendi
- [ ] Her bölümde 1 Sen Olsaydın, karar noktasına yerleşmiş; 3 şık savunulabilir; şıkların yanında anlık geri bildirim YOK; her şık için ayrı "Seçimini Karşılaştır" metni var; zayıf şık metinleri utandırmıyor; doğru şıklar kitap genelinde A/B/C'ye dengeli dağıtılmış
- [ ] Her bölümde Ne Öğrendik (3 kısa madde)
- [ ] Bugüne Taşı YALNIZCA uygun bölümlerde (8 bölümde ~3-4 görev — editoryal hedef); olan her görevde meta alanlar tam (ID, ad, kategori, açıklama, süre, ölçüt, profil eylemi; gerekliyse güvenlik notu); para/ekran/ibadet dayatması yok
- [ ] Tanık Sayfası kullanıldıysa kitapta 2-3 kez; tanık karakter sabit; kurgusalsa not işaretli; tarihî tutarlılık kontrol edildi
- [ ] Final testi: soru sayısı = bölüm sayısı; her soruda kaynak bölüm; tüm cevaplar metinden doğrulanabilir; şıklar dengeli; "hangisi yanlıştır" yok
- [ ] Veli raporu: 3 özet varyantı + 2 sohbet sorusu + 3-5 "Çocuğunuz sorarsa"; gözlem dili, kesin hüküm yok
- [ ] Ölüm/mucize gibi hassas konu geçtiyse "Çocuğunuz sorarsa"ya eklendi
- [ ] Yumuşatma taraması yapıldı (savaş/ölüm/ağır konu çerçeveleri)
- [ ] Abartı ve yarışma dili taraması yapıldı
- [ ] Duygusal yay kontrol edildi (hüzünlü bölümler art arda değil)
- [ ] İllüstrasyon önerileri figürsüz/mekân-nesne-sembol; görsel dünyaya sadık; anakronizm yok
- [ ] Şiir/iç monolog kullanılmadı; âyet/hadis özüyle aktarıldı
- [ ] Ekim-kapanış halkaları (varsa) açıldığı yerde kapandı
