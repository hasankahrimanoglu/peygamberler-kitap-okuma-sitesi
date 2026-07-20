# YENİ KİTAP İÇERİK ÜRETİM BRİFİ

> Bu dosya, uzun bir kaynak PDF'den **Peygamberler Keşif Dünyası** için eksiksiz
> kitap içeriği hazırlayacak yapay zekâ ajanına verilir. PDF ile birlikte bu
> dosyanın tamamını paylaş. Ajanın teslimi tek bir Markdown dosyası olmalıdır.
>
> **Referans ürün:** Hz. Âdem kitabının görsel, etkileşimli ve 8 bölümlük okuma
> deneyimi. Yeni kitabın bölüm sayısı Hz. Âdem'den kopyalanmaz; kesin hedef
> `KITAP-KATALOGU-VE-URETIM-PLANI.md` belgesinden alınır.
> **Hedef yaş:** 8–11.
> **Ürün döngüsü:** okuma → düşünme → uygulama → aile içi konuşma.

---

## 1. KULLANMADAN ÖNCE BU ALANI DOLDUR

Bu bilgiler kullanıcı tarafından ajanla paylaşılmalıdır. Eksik olan kritik bir
bilgi varsa ajan tahmin yürütmemeli, yazıma başlamadan önce sormalıdır.

```text
Kaynak PDF dosyası: [DOSYA ADI]
Katalog planı dosyası: KITAP-KATALOGU-VE-URETIM-PLANI.md
Kitap adı: [Örn. Hz. Nuh]
books.ts kimliği / booksTsId: [Örn. hz-nuh]
Kitap anahtarı / bookKey: [Örn. nuh — küçük harf, Türkçe karaktersiz]
Varlık adı / assetSlug: [Örn. hz-nuh — küçük harf, Türkçe karaktersiz]
Veritabanı eşleştirme anahtarları / dbKeywords: [Örn. nuh]
Serideki sıra: [Örn. 2]
Keşif bölgesi: [KATALOGDAN]
Keşif bölgesindeki sıra: [KATALOGDAN]
Hedef bölüm sayısı: [KATALOGDAN — 4–10]
Varsa ek güvenilir kaynaklar: [YOKSA “yalnızca verilen PDF” yaz]
Özellikle kullanılmaması gereken rivayetler: [LİSTE / YOK]
Özellikle ele alınması gereken olaylar: [LİSTE / PDF'YE GÖRE]
Mevcut merkezi rozet listesi: [DOSYA/LİSTE — çakışma kontrolü için]
Ek editoryal notlar: [VARSA]
```

Sıradaki kitabı tahmin etme. Kitap adı, seri sırası, keşif bölgesi ve hedef bölüm
sayısı için daima `KITAP-KATALOGU-VE-URETIM-PLANI.md` belgesindeki ilgili satırı
kullan. Kullanıcının verdiği bilgi katalogdan farklıysa yazıma başlamadan önce
hangi bilginin geçerli olduğunu sor.

---

## 2. AJANIN ROLÜ VE TESLİM HEDEFİ

Sen; çocuk edebiyatı editörü, kaynak analisti ve yapılandırılmış içerik yazarı
olarak çalışacaksın. Görevin PDF'yi kısaltıp özetlemek değil; kaynak omurgasına
sadık, 8–11 yaşa uygun, uygulamanın bütün ekranlarında kullanılabilecek **tam bir
kitap içerik paketi** üretmektir.

Teslim şunların tamamını içermelidir:

1. Kaynak ve rivayet denetimi
2. Kitap kimliği ve çocuk ekranı metinleri
3. Katalogda belirtilen hedef sayıda kronolojik bölüm planı
4. Her bölümün iki parçalı hikâyesi
5. Her bölümün “Sen Olsaydın?” ve “Seçimini Karşılaştır” içeriği
6. Her bölümün “Ne Öğrendik” maddeleri
7. Uygun bölümlerde “Bugüne Taşı” görevi
8. Uygunsa Tanık Sayfaları
9. Bölüm rozetleri, kitap madalyası ve bütün görsel üretim brifleri
10. Bölüm sayısı kadar Büyük Final Testi sorusu
11. Veli raporu özetleri, sohbet soruları ve “Çocuğunuz Sorarsa” alanları
12. Sözlükçe ekleri, seslendirme notları ve teslim kalite raporu

**Kod yazma.** TypeScript/JSON üretme. İçeriği aşağıdaki Markdown teslim
iskeletinde ver; yazılım ekibi bu dosyayı `books.ts` yapısına aktaracaktır.

---

## 3. DEĞİŞMEZ ÜRÜN KURALLARI

- Yalnızca şu üç ödül kavramı kullanılır: **ROZET · MADALYA · UNVAN**.
- **Rozet:** bölüm tamamlanınca kazanılır.
- **Madalya:** kitabın bütün bölümleri ve final testi tamamlanınca kazanılır.
- **Unvan:** tamamlanan kitap sayısından sistem tarafından türetilir; bu kitap
  için yeni unvan yazma.
- Puan, skor, seri, streak, yarışma, liderlik ve bildirim baskısı yoktur.
- Final testi geçme engeli değildir. Testi tamamlamak yeterlidir; doğru sayısı
  madalyayı veya sonraki kitabı engellemez.
- “Sen Olsaydın?” seçimi hikâyeyi dallandırmaz ve seçim anında doğru/yanlış
  açıklanmaz.
- “Bugüne Taşı” gönüllüdür; bölüm ilerlemesinin, rozetin veya madalyanın şartı
  değildir ve ayrı ödül üretmez.
- Peygamber, halife ve sahabe yüzü veya bedeni hiçbir görselde tasvir edilmez;
  silüet ve arkadan insan figürü de kullanılmaz.
- Cami, kubbe, minare veya olay dönemine uymayan dekor kullanılmaz.
- “Sen Olsaydın?” seçeneklerinde görsel kullanılmaz.
- Önemli kelime ve kısa ifadeleri renkli/altı çizili gösterecek işaretleme
  üretme. Metin doğal akışında kalır. Yalnız gerçekten gerekli tek bir anahtar
  paragraf, bölüm başına en fazla bir kez sakin bir alıntı kutusu olarak
  önerilebilir.
- Türkçe karakterler eksiksiz kullanılmalıdır: ş, ğ, ı, İ, ç, ö, ü, â.

---

## 4. PDF KAYNAK ANALİZİ — HİKÂYEYİ YAZMADAN ÖNCE

### 4.1 Kaynak künyesi

PDF'den görülebiliyorsa eser adı, yazar, yayınevi, baskı/yıl ve toplam sayfa
bilgisini yaz. Görünmüyorsa “PDF'de belirtilmiyor” de; bilgi uydurma.

### 4.2 Olay envanteri

PDF'yi baştan sona inceleyip şu tabloyu oluştur:

| Sıra | Olay/dönem | PDF sayfaları | Ana kişiler | Çekirdek değer | Çocuk için hassasiyet | Kullanım kararı |
|---|---|---:|---|---|---|---|
| 1 | ... | ... | ... | ... | düşük/orta/yüksek | kullan / yumuşat / çıkar / doğrulama gerekli |

Kaynak PDF birden fazla peygamberi veya dönemi kapsıyorsa önce her isim için
ayrı olay envanteri çıkar. Yalnız bu briefte adı verilen dijital kitabın olaylarını
kullan; başka bir dijital kitaba ayrılan olayı sırf PDF aynı ciltte diye buraya
taşıma. Fiziksel cildin kalınlığı, sayfa sayısı veya kaynak yayınevinin kitap
gruplaması hedef bölüm sayısını değiştirmez.

### 4.3 Bilgi sınıflandırması

Özellikle dinî veya tarihî ayrıntıları üç gruba ayır:

- **Ana anlatıya alınabilir:** PDF'de açık, kıssanın omurgasıyla uyumlu bilgi.
- **Rivayet/yorum:** Kesin bilgi gibi sunulmamalı; gerekiyorsa “bazı
  anlatımlarda” çerçevesiyle ve editör onayıyla kullanılmalı.
- **Çıkarılmalı veya doğrulanmalı:** Kaynağı belirsiz, çelişkili, çocuk için
  uygun olmayan ya da gereksiz ayrıntı.

Tereddütlü ayrıntıyı daha canlı hikâye yazmak için kesinleştirme. “Bilmiyoruz”
denmesi gereken yerde bunu dürüstçe söyle. Kullanıcının izin vermediği dış
kaynakları kullanma. Dış kaynak kullanıldıysa başlık ve bağlantıyı kaynak
notlarına ekle.

### 4.4 Telif ve yeniden yazım

- PDF'den uzun cümleleri veya paragrafları aynen kopyalama.
- Âyet/hadis veya şiirleri uzun alıntılama; mesajını çocuk diliyle aktar.
- Olay sırası ve olgular korunabilir; anlatım, cümle yapısı ve diyaloglar özgün
  biçimde yeniden kurulmalıdır.
- PDF'de bulunmayan olay, karakter, isim, mekân veya konuşmayı gerçekmiş gibi
  uydurma.
- Kaynakta açık diyalog yoksa, tarihî kişiye kesin söz isnat eden uzun diyalog
  yazma. Anlatıcı diliyle aktar veya kısa, anlamı değiştirmeyen bağlantı
  cümleleri kullan.
- Kaynaktaki öğretmen-sınıf çerçevesini, tekrar eden “çocuklar” hitaplarını veya
  ders kitabı anlatımını otomatik olarak koruma. Olay ve doğrulanmış bilgileri
  çıkar; bunları sıcak, özgün ve doğrudan bir çocuk edebiyatı anlatısına dönüştür.
- Güncel ülke, parti, savaş veya siyasî aktörleri kıssaya benzeten örnekler
  kullanma. Metin zamansız kalmalı; güncel bağlantı ancak kullanıcı ayrıca
  ister ve editoryal olarak onaylarsa ele alınmalıdır.

### 4.5 Bölüm kaynak haritası

Hedef bölümleri yazmadan önce her bölüm için PDF sayfa aralığını, kullanılacak
olayları ve dışarıda bırakılan ayrıntıları göster. Her bölüm en az bir kaynak
aralığına dayanmalıdır.

---

## 5. SİTENİN TÜM EKRANLARINDA GEREKEN ALANLAR

### 5.1 Ana çocuk keşif haritası

| Alan | Kullanım | Kural |
|---|---|---|
| Kitap sırası | Keşif durağı | Pozitif tam sayı |
| Kitap adı | Harita, panel, kütüphane | `Hz. + isim` |
| Alt başlık | Kitap kartı | 25–45 karakter, tek satıra uygun |
| Keşif açıklaması | Seçili kitap paneli | 100–180 karakter; ana değerleri merak uyandırarak anlatır |
| Kitap kapağı brifi | Harita ve veli kütüphanesi | 2:3, yazısız görsel üretim brifi ayrıca verilir |
| Bölüm sayısı | İlerleme | Katalogdaki hedef; 4–10 |
| Kitap madalyası adı | Final ve ödül ekranları | `{Kitap adı} Yolculuk Madalyası` |

Kilit/açık/tamamlandı metinleri sistem tarafından üretilir; içerik dosyasında
ayrıca yazılmaz.

### 5.2 Kitap bölüm rotası

Her bölüm için şunlar gerekir: bölüm numarası, bölüm adı, bölüm özeti, rozet adı,
rozet sembolü, rozet dosya anahtarı ve varsa Bugüne Taşı görev özeti. Bölüm adı
harita durağında tek satıra sığmalıdır.

### 5.3 Okuma ekranı

Her bölüm için şunların tümü gerekir:

- bölüm kimliği ve ses dosyası planı
- bölüm açılış illüstrasyonu (uygunsa)
- Hikâye — 1. Kısım
- etkileşimli kelimeler
- isteğe bağlı Tanık Sayfası
- Sen Olsaydın?
- Hikâye Devam Ediyor
- her seçenek için Seçimini Karşılaştır metni
- Ne Öğrendik (3 madde)
- varsa Bugüne Taşı görevi
- 3–4 güçlü görsel durak için yatay/dikey sahne brifi
- rozet kapısı metaverisi

### 5.4 Çocuk ek ekranları

- **Kazanımlarım:** bölüm rozet adı/sembolü, kitap madalyası adı/sembolü.
- **Kelime Defterim:** etkileşimli kelime ve standart anlamı.
- **Görevlerim:** görev ID, ad, kategori, açıklama, süre, tamamlanma ölçütü ve
  gerekliyse güvenlik notu.
- **Final testi:** soru, A/B/C seçenekleri ve doğru seçenek.

### 5.5 Veli ekranları

- Kitap adı, alt başlık, tanıtım/keşif açıklaması ve bölüm sayısı
- Çocuğun mevcut kitabında görünen bölüm adları ve ilerleme
- Kazanılan rozet adları ve madalya adı
- 3 değişken veli özeti (`high`, `mixed`, `low`)
- 2–3 aile sohbet sorusu
- 3–6 “Çocuğunuz Sorarsa” sorusu ve veli yaklaşımı
- Bugüne Taşı görevlerinin bütün meta alanları

İlerleme sayıları, tarihler, final sonucu ve durum etiketleri sistem tarafından
türetilir; içerik ajanı bunları uydurmaz.

---

## 6. KİTAP KİMLİĞİ — ZORUNLU ALANLAR

| Alan | Kural |
|---|---|
| Kitap adı | `Hz. + isim` |
| `booksTsId` | `books.ts` kimliği; `hz-` önekli, ör. `hz-nuh` |
| `bookKey` | Küçük harf, Türkçe karaktersiz, boşluksuz; ör. `nuh` |
| `assetSlug` | Dosya adlarında kullanılır; ör. `hz-nuh` |
| `routePrefix` | Uygulama rotası; `bookKey` ile aynı, ör. `nuh` |
| `dbKeywords` | Veritabanındaki kitap adını eşleştiren normalize anahtarlar; ör. `nuh` |
| Seri sırası | Pozitif tam sayı |
| Alt başlık | 25–45 karakter |
| Tanıtım paragrafı | 120–200 karakter, 1–2 cümle |
| Keşif haritası açıklaması | 100–180 karakter |
| Üst etiket | `{Kitap adı} — Çocuklar İçin` |
| Madalya adı | `{Kitap adı} Yolculuk Madalyası` |
| Madalya sembol fikri | Figürsüz nesne/sembol, 1–3 kelime |
| Bölüm sayısı | Katalogdaki hedef; 4–10 |
| Ana değerler | 4–5 değer |
| Görsel dünya | Mekân, nesne, ışık, atmosfer ve renk dili |
| Kaynak ilkeleri | Kullanılan kaynaklar, rivayet yaklaşımı, kesin bilinmeyenler |
| Kitaba özgü yasaklar | Kullanılmayacak ayrıntı ve tasvirler |
| Duygusal yay | Hedef bölümlerin tamamında merak/zorluk/umut/huzur dengesi |
| Ekim-kapanış halkaları | Başta açılan ve ileride kapanan olay/nesne/söz bağlantıları |
| Etkileşim kararı | Karar anlarının genel tonu ve yerleşimi |
| Bugüne Taşı dağılımı | Görev olan bölümler ve kısa gerekçe |
| Tanık kararı | Kullanılacaksa tanık kimliği, tarihî/kurgu durumu ve bölümleri |

---

## 7. DEĞİŞKEN BÖLÜM SAYILI YAPI

### 7.1 Bölüm kimliği

Her bölümde:

- **Bölüm no:** 1–N (`N`, katalogdaki hedef bölüm sayısıdır)
- **Bölüm ID:** yalnızca sayı (`1`, `2`, ...)
- **Bölüm adı:** en fazla yaklaşık 28 karakter; tek satır, merak uyandırıcı
- **Bölüm özeti:** 60–110 karakter; tek cümle
- **Ana olay ve değer:** birer kısa ifade
- **Kaynak sayfaları:** iç kontrol için PDF sayfaları
- **Rozet adı:** 2–4 kelime, `{değer/kavram} Rozeti`; set genelinde tekil
- **Rozet sembolü:** figürsüz 1–3 kelime
- **Rozet anahtarı:** `{bookKey}-bolum-{no}`
- **Ses yolu planı:** `/sesli-anlatim/{assetSlug}/{assetSlug}-bolum-{no}.mp3`

### 7.2 Hikâye uzunluğu ve dil

- Bölüm başına iki hikâye parçası toplamı **2.500–4.000 karakter** olmalıdır.
  İdeal hedef 2.800–3.500 karakterdir; 4.000'i aşma.
- Her paragraf 150–400 karakter ve tek fikir taşımalıdır.
- Cümleler ortalama 10–14 kelime, kesin üst sınır 18 kelimedir.
- Diyalog oranı olayın izin verdiği bölümlerde toplam metnin yaklaşık üçte
  biridir. Kaynak buna izin vermiyorsa gerçek kişilere konuşma uydurma.
- Diyalog `—` uzun çizgisiyle başlar.
- Anlatıcı sıcak olabilir; bölüm başına en fazla 1–2 kez çocuğa “sen” diye
  seslenir.
- “Hikâye — 1. Kısım” gerçek karar/gerilim anında biter.
- “Hikâye Devam Ediyor” aynı olayın çözümünü ve değerin sonucunu gösterir.
- İkinci parça bütün seçenekler için aynıdır; dallanma yoktur.
- Son paragraf değeri yumuşakça toplar veya sonraki bölüme köprü kurar.
- Ağır olaylar ayrıntılı sahnelenmez; sonuç, güvenlik ve umut merkezde kalır.
- Her bölümde ilk geçişte peygamber için `Hz. ... (a.s.)`, sonrasında `Hz. ...`
  kullanılır. Halife/sahabe için `(a.s.)` kullanılmaz.

### 7.3 Metin blokları

Hikâye yalnızca aşağıdaki bloklarla teslim edilir:

1. **Düz metin:** Bir paragraf.
2. **Etkileşimli kelime:** Öncesi + kelime + sonrası + standart anlam.
3. **Anahtar paragraf:** Bölüm başına en fazla 1; paragrafın tamamı sakin kutu
   olarak ayrılır. Kelime bazlı renk/alt çizgi vurgusu yoktur.
4. **Tanık Sayfası:** Uygunsa ayrı blok.
5. **İllüstrasyon:** Sahne, metindeki tam yerinden sonra eklenir; sayfa numarasına
   bağlanmaz.

İlk gerçek hikâye paragrafı için yalnızca `Başlangıç harfi: büyük` notu verilebilir.
Diğer paragraflarda büyük başlangıç harfi kullanılmaz.

### 7.4 Etkileşimli kelime

- Bölüm başına 1–2 kelime.
- Terim yalnız kitapta ilk geçtiği yerde etkileşimli olur; tekrar kutulanmaz.
- Öncesi + kelime + sonrası birleştiğinde doğal tek paragraf oluşturmalıdır.
- Anlam tek, kısa ve 8–11 yaşa uygun cümledir.
- Standart sözlükçedeki tanım harfiyen kullanılmalıdır.

Format:

```text
[KELİME]
Öncesi: "..."
Kelime: ...
Anlamı: ...
Sonrası: "..."
Standart sözlükçede mevcut mu?: evet/hayır
```

### 7.5 Tanık Sayfası — isteğe bağlı

- Kitapta 0 veya 2–3 kez kullanılabilir; her kitapta zorunlu değildir.
- Kullanılıyorsa tanık kitap boyunca aynı kişidir.
- Tarihî çocuk/genç tanık varsa belgelenmiş kimliği seçilir.
- Yoksa isimsiz kurgusal tanık kullanılabilir ve açıkça işaretlenir.
- 400–700 karakter, birinci tekil şahıs, günlük üslubu.
- Peygamber/halife/sahabe görünüşü tarif edilmez.
- Kurgusal tanık olaylara yeni tarihî bilgi ekleyemez.

Format:

```text
[TANIK SAYFASI]
Tanık adı: ...
Tanık etiketi: ...
Kurgusal mı?: evet/hayır
Metin: ...
Kaynak/kurgu sınırı notu: ...
```

### 7.6 Sen Olsaydın? — her bölümde zorunlu

- Karar noktası Hikâye — 1. Kısım'dan doğal biçimde doğar.
- Soru çocuğun okul, ev veya arkadaşlık hayatına taşınır ve “Ne yaparsın?” ile
  biter.
- Üç seçenek vardır: biri değeri yaşatan davranış, ikisi gerçekçi fakat daha
  zayıf davranış.
- Seçenekler kişisel davranış kipinde yazılır: “... yapardım / ... isterdim”.
- Doğru harf kitap genelinde A/B/C arasında dengeli dağılır; harflerin kullanım
  sayıları arasındaki fark en fazla 1 olur. Aynı harf üç bölüm üst üste gelmez.
- Seçim anında geri bildirim yoktur. Sabit nötr not:
  **“Cevabını aklında tut. Hikâyenin devamında neler olduğunu birlikte görelim.”**

### 7.7 Seçimini Karşılaştır — her şık için zorunlu

- Hikâye devamından sonra yalnız seçilen şıkkın metni gösterilir.
- Her seçenek için 1–2 cümle yazılır.
- Doğru seçenek, seçimi hikâyedeki değerle ilişkilendirir.
- Zayıf seçenekler çocuğu utandırmaz; “yanlış”, “hata yaptın”, “kötü seçim”
  ifadelerini kullanmaz.
- Metin, hikâyenin devamında gerçekten görülen sonuca atıf yapar.

### 7.8 Ne Öğrendik — her bölümde zorunlu

- Tam olarak 3 madde.
- Her madde 60–130 karakter ve tek cümledir.
- İlk madde ana değeri, diğerleri hikâyedeki somut olayı anlatır.
- Ders veren veya çocuğu değerlendiren ton kullanılmaz.

### 7.9 Bugüne Taşı — koşullu

Görev için doğal fırsat bulunan bölümler seçilir. Editoryal hedef kitabın yaklaşık
%40–50'sidir: 4–5 bölümlük kitapta 2, 6–7 bölümlük kitapta 2–3, 8–10 bölümlük
kitapta 3–5 görev düşünülebilir. Sayıyı doldurmak için yapay görev üretme.

Her görevde:

```text
Görev ID: {bookKey}-{bölümNo}-{kısa-ad}
Görev adı: 2–4 kelime
Kategori: öğrenme / iyilik / sorumluluk / duygu yönetimi / paylaşma / ...
Çocuğa görünen açıklama: net ve güvenli görev
Tahmini süre: gerçekçi süre
Tamamlanma ölçütü: çocuğun “tamamladım” diyebileceği somut ölçüt
Güvenlik notu: yalnız gerekiyorsa
Profil eylemi: Görevi Listeme Ekle / Şimdilik Değil
```

Para, alışveriş, sosyal medya, kanıt/fotoğraf, tehlikeli araç, yabancıyla temas
ve ibadet dayatması içeren görev yazma. Gerekli durumda yetişkin desteğini açıkça
belirt.

---

## 8. GÖRSEL İÇERİK PAKETİ

### 8.1 Genel stil

- Kitaba özgü tek bir görsel dünya ve tutarlı renk/ışık dili tanımla.
- Görseller masalsı çocuk kitabı illüstrasyonu niteliğinde olmalı, fotoğraf gibi
  sert veya korkutucu olmamalıdır.
- Görselin içinde yazı, logo, arayüz, rozet etiketi veya filigran bulunmaz.
- Peygamber, halife, sahabe, melek, yüz, beden, el veya insan silüeti gösterme.
- Olayı doğa, mekân, eşya, iz, ışık ve sembollerle anlat.
- İsimsiz kalabalık ancak tarihî ve editoryal olarak gerçekten gerekliyse,
  merkezî kutsal kişileri temsil etmeyecek şekilde kullanılabilir.

### 8.2 Kitap başına görseller

| Varlık | Boyut/oran | Dosya planı | Teslim edilecek bilgi |
|---|---|---|---|
| Kitap kapağı | 600×900, 2:3 | `/kapaklar/kapak-{bookKey}.png` | Ana kompozisyon ve üretim promptu |
| Bölüm rotası arka planı | kare/yüksek çözünürlük | `/kitaplar/{assetSlug}-kitap-arkaplan.png` | Durakların üstüne geleceği sakin merkezli sahne |
| Kitap madalyası | 512×512 şeffaf | `/madalyalar/madalya-{bookKey}.png` | Sembol, çerçeve, renk ve prompt |
| Bölüm rozeti | 512×512 şeffaf | `/rozetler/rozet-{bookKey}-bolum-{no}.png` | Bölüme özel sembol ve prompt |

Kapak ve rota görseli aynı kitaba ait görünmeli; fakat aynı kompozisyonun basit
kopyası olmamalıdır. Rota arka planında başlık ve durakların okunacağı alanlar
fazla kalabalık olmamalıdır.

### 8.3 Bölüm içi illüstrasyonlar

- Editoryal hedef bölüm başına genellikle **3–4 güçlü görsel duraktır**; her
  okuma sayfasına görsel üretme.
- Her görsel, metindeki anlamlı bir paragrafın hemen ardından konumlandırılır.
- Sayfa numarası verme; bunun yerine “Şu paragraftan sonra” şeklinde kesin metin
  çapası belirt.
- Her ana sahne için iki responsive uyarlama gerekir:
  - yatay: 4:3, önerilen 1448×1086
  - dikey: 3:4, önerilen 1086×1448
- İki sürüm aynı sahne, nesne, renk, ışık ve resim dilini korumalı; yalnız kadraj
  uyarlanmalıdır.
- Görsel ayrılan alanı tamamen doldurabilecek kompozisyonda olmalı; kenarlarda
  boş şerit/letterbox tasarlama.

Dosya planı:

```text
/icerik/{bookKey}-bolum-{no}-{kisa-sahne}-yatay.png
/icerik/{bookKey}-bolum-{no}-{kisa-sahne}-dikey.png
```

Her görsel durağı için teslim et:

```text
Görsel ID: ...
Metin çapası: “... paragrafından sonra”
Sahnenin amacı: ...
Yatay dosya: ...
Dikey dosya: ...
Alt metin: ...
Altyazı: [yalnız gerekiyorsa]
Ana üretim promptu: ...
Yatay kadraj notu: ...
Dikey kadraj notu: ...
Negatif prompt/kesin yasaklar: ...
```

### 8.4 Dokun ve Keşfet — çok seyrek, isteğe bağlı

- Her bölümde kullanılmaz. Kitapta 0–2 güçlü açılış sahnesi yeterlidir.
- Gizli nesne oyunu değildir; puan, doğru/yanlış ve ilerleme şartı üretmez.
- Görsel üzerinde tam olarak 3 görünür keşif noktası kullanılır.
- Her nokta kısa bir gözlem ve hikâyeyle bağlantı verir; “Ne Öğrendik” alanını
  tekrar etmez.
- Konumlar yüzde olarak `x` ve `y` (0–100) biçiminde verilir ve hem yatay hem
  dikey kadraj için ayrı ayrı kontrol edilir.

Format:

```text
Keşif komutu: Görseldeki 3 keşif izine dokun.
Tamamlanma metni: Üç izi de keşfettin. Şimdi hikâyeye başlayabilirsin.
Nokta 1 ID / x / y / başlık / açıklama: ...
Nokta 2 ID / x / y / başlık / açıklama: ...
Nokta 3 ID / x / y / başlık / açıklama: ...
Dikey kadraj konum notları: ...
```

---

## 9. BÜYÜK FİNAL TESTİ

- Soru sayısı bölüm sayısına eşittir: **N bölüm = N soru**.
- Her bölümden tam olarak 1 soru gelir.
- Yaklaşık yarısı olay bilgisi, yarısı değer/kavrayış sorusudur.
- Yalnızca kitap metninde açıkça bulunan bilgi sorulur.
- Her soruda üç seçenek ve tek doğru cevap vardır.
- Çeldiriciler mantıklı ama çocukta gereksiz kuşku yaratmayacak kadar açık olur.
- “Hangisi yanlıştır?” gibi olumsuz soru kalıbı kullanılmaz.
- Doğru harfler A/B/C arasında dengeli dağılır.
- İç kontrol için kaynak bölüm ve PDF sayfası yazılır; bunlar çocuğa gösterilmez.

Format:

```text
Soru 1: ...
A) ...
B) ...
C) ...
Doğru seçenek: B
Kaynak bölüm: 1
Kaynak PDF sayfası: ...
Soru türü: olay / değer
```

---

## 10. VELİ RAPORU İÇERİĞİ

### 10.1 Değişken veli özeti

Her kitap için üç ayrı metin yaz:

- **high:** çocuk kararların çoğunda bölüm değerini yakalamış olabilir.
- **mixed:** bazı kararlarda değeri yakalamış, bazılarında başka seçenekleri
  değerlendirmiş olabilir.
- **low:** çoğu kararda daha zayıf seçeneklere yönelmiş olabilir.

Her özet 2–3 cümle, sakin ve gözlemsel olmalıdır. Çocuğu etiketleme; “artık
sabırlı”, “imanı güçlendi”, “iyi/kötü çocuk” gibi sonuç cümleleri kurma.
`mixed` metni ayrıca varsayılan veli özeti olarak kullanılacaktır.

### 10.2 Aile sohbet soruları

- 2–3 adet açık uçlu soru.
- Yemekte veya yatmadan önce konuşulabilecek kadar doğal olmalı.
- Çocuğu sınava çeker gibi bilgi sormamalı; kıssayı duygu, seçim ve gündelik
  hayatla bağlamalı.

### 10.3 Çocuğunuz Sorarsa

- Kitabın hassasiyetine göre 3–6 soru ve yaklaşım.
- Ölüm, mucize, afet, aile kaybı, şiddet, kardeş çatışması, korku veya tartışmalı
  rivayet kitapta geçiyorsa ilgili soru mutlaka eklenir.
- Yaklaşım 2–5 cümle; sakin, dürüst, güven veren ve yaşa uygun olmalıdır.
- Bilinmeyeni kesinleştirme; velinin çocuğun asıl duygusunu anlamasına yardım et.
- Güvenlik konusu varsa açık davranış önerisi ver: uzaklaş, güvenli yere geç,
  güvendiğin yetişkine haber ver.

---

## 11. STANDART SÖZLÜKÇE

Bu tanımları değiştirme:

| Terim | Sabit tanım |
|---|---|
| Hicret | Bir yerden başka bir yere göç etmek demektir. |
| Müşrik | Bir olan Allah'a inanmayıp putlara tapan kimse demektir. |
| Vahiy | Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır. |
| Halife | Peygamberimizden sonra Müslümanların başına geçen yöneticiye denir. |
| Sahabe | Peygamberimizi görmüş ve ona inanmış kimselere denir. |
| Peygamber | Allah'ın, mesajlarını insanlara ulaştırmak için seçtiği elçidir. |
| Kâbe | Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır. |
| Put | İnsanların kendi elleriyle yapıp taptıkları heykellerdir. |
| Tevekkül | Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır. |
| Mucize | Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır. |
| Zekât | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. |

Yeni terim gerekiyorsa:

1. Neden gerekli olduğunu yaz.
2. 8–11 yaşa uygun tek cümlelik tanım öner.
3. “Editör onayı bekliyor” olarak işaretle.
4. Onaylanmamış tanımı kitap boyunca değiştirerek kullanma.

---

## 12. AĞIR KONULARI YUMUŞATMA

- Savaş ve çatışmayı “mücadele” düzeyinde anlat; yaralanma/ölüm ayrıntısı verme.
- Zulüm, işkence, tufan, kuyu, kayıp gibi olayları kısa, sonuç ve umut odaklı
  çerçevele.
- Ölümü inkâr etmeden, korkutucu ayrıntısız ve güven veren dille anlat.
- İnsanları tek boyutlu “kötü/düşman” olarak etiketleme.
- Korku sahnesini aynı bölüm içinde güven, yardım veya çözümle dengele.
- Hüzünlü iki bölümü art arda ağırlaştırma; araya umut ve toparlanma ritmi koy.
- Abartı, yarışma ve baskı dili kullanma: “hayatını değiştirecek”, “kesinlikle”,
  “en iyi”, “birinci ol”, “kazanmak zorundasın” yasaktır.

---

## 13. ZORUNLU TESLİM İSKELETİ

Teslim edilen tek Markdown dosyası aşağıdaki sırayı aynen izlemelidir:

```markdown
# KİTAP: [KİTAP ADI]

## A. KAYNAK DENETİMİ
### A1. PDF künyesi
### A2. Olay envanteri
### A3. Rivayet ve doğrulama tablosu
### A4. Bölüm kaynak haritası
### A5. Kullanılmayan içerikler ve gerekçeleri

## B. KİTAP KİMLİĞİ
Kitap adı:
booksTsId:
bookKey:
assetSlug:
routePrefix:
dbKeywords:
Seri sırası:
Alt başlık:
Tanıtım paragrafı:
Keşif haritası açıklaması:
Üst etiket:
Madalya adı:
Madalya sembolü:
Bölüm sayısı: [KATALOGDAKİ HEDEF]
Ana değerler:
Görsel dünya:
Kaynak ilkeleri:
Kitaba özgü yasaklar:
Duygusal yay:
Ekim-kapanış halkaları:
Etkileşim kararı:
Bugüne Taşı dağılımı:
Tanık kararı:

## C. GÖRSEL VARLIK ANA BRİFLERİ
### C1. Kitap kapağı
### C2. Bölüm rotası arka planı
### C3. Kitap madalyası

## D. BÖLÜMLER

### D1. BÖLÜM 1: [BÖLÜM ADI]
Bölüm no:
Bölüm ID:
Özet:
Ana olay:
Ana değer:
Kaynak PDF sayfaları:
Rozet adı:
Rozet sembolü:
Rozet anahtarı:
Ses yolu planı:
Seslendirme notları:

#### HİKÂYE — 1. KISIM
[Blokları sırayla yaz. İllüstrasyonun metin çapasını yerinde göster.]

#### TANIK SAYFASI
[Yoksa “Bu bölümde yok.”]

#### SEN OLSAYDIN
Soru:
A)
B)
C)
Doğru seçenek:
Seçim sonrası nötr not:

#### HİKÂYE DEVAM EDİYOR
[Bütün seçimlerde aynı metin.]

#### SEÇİMİNİ KARŞILAŞTIR
A)
B)
C)

#### NE ÖĞRENDİK
1.
2.
3.

#### BUGÜNE TAŞI
[Yoksa “Bu bölümde yok.”]

#### BÖLÜM İLLÜSTRASYONLARI
[3–4 güçlü görsel durağı; her biri yatay+dikey brif.]

#### DOKUN VE KEŞFET
[Yoksa “Bu bölümde yok.”]

#### BÖLÜM İÇ KALİTE ÖZETİ
Toplam hikâye karakteri:
Paragraf sayısı:
Tahmini diyalog oranı:
18 kelimeyi aşan cümle var mı?:
Etkileşimli kelimeler:
Görsel durağı sayısı:
Kaynak dışı bilgi var mı?:

### D2. BÖLÜM 2: ...
[D1 yapısını hedef bölüm sayısı N'e kadar D2, D3 ... DN olarak tekrarla.]

## E. BÜYÜK FİNAL TESTİ
[N soru; her bölümden 1 soru.]

## F. VELİ RAPORU
### F1. Özet high
### F2. Özet mixed / varsayılan özet
### F3. Özet low
### F4. Aile sohbet soruları
### F5. Çocuğunuz Sorarsa

## G. SÖZLÜKÇE VE SESLENDİRME
### G1. Kullanılan standart terimler
### G2. Yeni terim önerileri — editör onayı bekliyor
### G3. İsim ve özel kelime telaffuz notları

## H. GÖRSEL DOSYA ENVANTERİ
[Kapak + rota + madalya + N rozet + tüm yatay/dikey içerik görselleri]

## I. SON KALİTE RAPORU
### I1. Bölüm ve uzunluk tablosu
### I2. Doğru seçenek A/B/C dağılımı
### I3. Final testi bölüm kapsamı
### I4. Bugüne Taşı dağılımı
### I5. Tanık Sayfası dağılımı
### I6. Rozet tekillik kontrolü
### I7. Hassasiyet/yumuşatma kontrolü
### I8. Kaynak sadakati ve açık editör soruları
```

---

## 14. TESLİM ÖNCESİ ZORUNLU KALİTE KONTROLÜ

Ajan, teslim sonunda her maddeyi `tamam / sorun var` olarak raporlamalıdır:

- [ ] PDF baştan sona analiz edildi ve sayfa aralıkları kaydedildi.
- [ ] Kullanılan, yumuşatılan, çıkarılan ve doğrulama isteyen bilgiler ayrıldı.
- [ ] Kitap kimliğinin bütün alanları dolu.
- [ ] Katalogdaki hedef kadar bölüm var; kronoloji ve duygusal ritim dengeli.
- [ ] Bölüm adları yaklaşık 28 karakteri aşmıyor; özetler 60–110 karakter.
- [ ] Her bölümün toplam hikâyesi 2.500–4.000 karakter.
- [ ] Cümle ortalaması 10–14 kelime; hiçbir cümle 18 kelimeyi aşmıyor.
- [ ] Her bölüm iki parçalı ve ilk parça gerçek karar anında bitiyor.
- [ ] Hikâye dallanmıyor; devam metni bütün seçimler için aynı.
- [ ] Her bölümde 1 Sen Olsaydın, 3 seçenek ve 3 karşılaştırma metni var.
- [ ] Doğru seçenekler A/B/C arasında dengeli.
- [ ] Zayıf seçenek geri bildirimleri çocuğu utandırmıyor.
- [ ] Her bölümde tam olarak 3 Ne Öğrendik maddesi var.
- [ ] Bugüne Taşı yalnız doğal bölümlerde ve bütün meta alanlarıyla yazıldı.
- [ ] Tanık kullanıldıysa aynı kişi ve tarihî/kurgu sınırı açık.
- [ ] Etkileşimli kelimeler yalnız ilk geçişte; tanımlar sabit sözlükçeyle aynı.
- [ ] Her bölümde genellikle 3–4 anlamlı görsel durağı var; gereksiz görsel yok.
- [ ] Her içerik görselinin 4:3 yatay ve 3:4 dikey brifi var.
- [ ] Bütün görsel tarifleri figür/tasvir ve anakronizm yasağına uyuyor.
- [ ] Final soru sayısı bölüm sayısına eşit ve her bölüm bir kez temsil ediliyor.
- [ ] Veli raporunda 3 özet, 2–3 sohbet sorusu ve 3–6 zor soru bulunuyor.
- [ ] Hassas konular veli alanında karşılandı ve çocuk metninde yumuşatıldı.
- [ ] Rozet adları verilen merkezi rozet listesiyle çakışmıyor.
- [ ] Uzun alıntı, kaynak dışı olay, kesinleştirilmiş belirsiz rivayet yok.
- [ ] Açık editör soruları teslimin sonunda ayrıca listelendi.

---

## 15. AJANIN DURMASI GEREKEN DURUMLAR

Aşağıdakilerden biri oluşursa eksik kitabı tamamlamış gibi teslim etme; kullanıcıya
net sorular sor:

- PDF okunamıyor, sayfalar eksik veya OCR ciddi biçimde bozuksa
- Kitap adı, `bookKey`, keşif bölgesi, seri sırası veya hedef bölüm sayısı belirsizse
- Katalogdaki hedef sayıda sağlam bölüm omurgası kaynakta kurulamıyorsa; içeriği
  doldurmak için tekrar veya zayıf rivayet ekleme
- Merkezî rozet listesi verilmediği için tekillik doğrulanamıyorsa
- Tartışmalı bir rivayet kitabın ana olay örgüsünü belirliyorsa
- Ağır bir olayın çıkarılması kitabın anlamını değiştiriyorsa
- Kullanıcının kaynak sadakati isteği ile 8–11 yaş güvenliği çatışıyorsa

Bu durumlarda önce bulguyu, sonra 1–3 kısa karar sorusunu yaz. Kullanıcı cevap
verdikten sonra üretime devam et.
