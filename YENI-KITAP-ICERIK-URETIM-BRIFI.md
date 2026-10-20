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
>
> **Son güncelleme: 31 Temmuz 2026** — Bölüm 8 (görsel paketi) koddaki gerçek
> klasör düzeni ve formatlarla eşitlendi: dikey (3:4) varyant kaldırıldı,
> içerik görselleri 16:9 `.jpg`, "Dokun ve Keşfet" kapatıldı. Görsel dosya
> adlarının tek kaynağı `ICERIK-GORSEL-SICILI.md`'dir.
>
> **7 Ağustos 2026** — rozet, madalya ve unvan `.svg`'den **`.png`**'ye alındı
> (PROJE-MODELI 6.1). Ekranda en fazla 72px çizildikleri için vektöre gerek
> yok; brifler ise gradyan, doku ve ışık istiyor.
>
> **12 Ekim 2026** — görsel yoğunluğu artırıldı: bölüm başına **6 görsel**
> (1 açılış + 5 içerik sahnesi; PROJE-MODELI 6.4). Lansman için önerilen
> "seyrek mod" iptal edildi. Tasvir kuralı revize edildi (yüz hiçbir görselde
> yok; peygamberler yüzü görünmeyen figür olabilir). Harita durağı görseli
> (`harita-kapak.jpg`) kapaktan ayrı yazıldı. Kod türettiği için "Üst etiket"
> alanı ve kaldırılmış "Bölüm rotası arka planı" brifi teslimden çıkarıldı.
> Görseller artık Claude oturumunda Magnific bağlantısıyla üretildiği için her
> prompt **Türkçe + İngilizce** yazılır; kitap başına İngilizce ortak stil
> bloğu, ortak negatif prompt ve rozet çerçeve bloğu eklenir (§6, §8.3).
>
> **16 Ekim 2026** — tasvir kuralı yeniden revize edildi (PROJE-MODELI 6.4):
> olayın öznesi insansa sahne figürlüdür. Peygamberler, akrabaları ve saygın
> müminlerin yüzü hiç görünmez; kötü karakterler, çevreleri ve sıradan halkın
> yüzü gösterilebilir. "Figür yalnız gerçekten gerekiyorsa" cümlesi ve ortak
> negatife kitap geneli `human figure` ekleme kuralı kaldırıldı (§6, §8.1).
>
> **13 Ekim 2026** — rozet ve madalya **çerçevesiz kare** üretilir; çerçeveyi
> Hasan Photoshop'ta tek ortak şablonla ekler (ICERIK-GORSEL-SICILI §6.2).
> "Rozet çerçeve bloğu" yerine **"Rozet sembol stili bloğu (EN)"** yazılır:
> yalnız sembolün çizim dilini anlatır; çerçeve, kalkan, madalyon, mine zemin,
> düz gri zemin ve arka plan kaldırma ifadesi içermez.
>
> **16 Ekim 2026** — **§16 Yerleşik editoryal kararlar** eklendi: önceki
> kitaplarda verilen emsal kararlar Faz 1'de yeniden sorulmaz; uygulanır ve
> Faz 1 özetinde olay bazında gösterilir.

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
Merkezî rozet matrisi: ROZET-MATRISI.md [rozet adı çakışma kontrolü için — ZORUNLU]
Merkezî sözlükçe sicili: SOZLUKCE-SICILI.md [etkileşimli kelime kontrolü için — ZORUNLU]
Hazır görseller: [kapak.png var/yok · harita-kapak.jpg var/yok]
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
- **Tasvir kuralı** (REVİZE 16 Ekim 2026 — Hasan; PROJE-MODELI 6.4; ayrıntı
  §8.1): peygamberler (Hz. Muhammed hariç), akrabaları ve saygın müminlerin
  **yüzü hiç görünmez** (arkadan, uzak plan, doğal sebep; önden gerekiyorsa
  yaygın ışık). Kötü karakterler, çevreleri ve sıradan halkın yüzü
  gösterilebilir. Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir
  biçimde gösterilmez (silüet ve el dahil). Melek tasviri yapılmaz.
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

Sınıflandırmada §16'daki yerleşik kararlar uygulanır; bu konular yeniden
soru olarak sorulmaz, Faz 1 özetinde olay bazında gösterilir.

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

### 5.1 Ana ekran (kitap rotası)

Kitaplar ana ekranda katalog sırasıyla tek dikey rotada dizilir; keşif bölgeleri
arayüzde gösterilmez (PROJE-MODELI 3.10.1). Bölge bilgisi yalnız editoryal
gruplama olarak katalogda kalır.

| Alan | Kullanım | Kural |
|---|---|---|
| Kitap sırası | Rotadaki yeri | Katalogdaki sıra; pozitif tam sayı |
| Kitap adı | Rota, panel, kütüphane | `Hz. + isim` |
| Alt başlık | Kitap kartı | 15–45 karakter, tek satıra sığmalı. Kısa ve net olması iyidir; uzatmak için doldurma yapma |
| Keşif açıklaması | Seçili kitap paneli | 100–180 karakter; ana değerleri merak uyandırarak anlatır. Kodda `atlasCatalog.ts` → `description` alanına girer |
| Kitap kapağı brifi | Kütüphane, kitap paneli, veli kartı | 2:3 dikey, yazısız. **Klasörde zaten varsa yazılmaz** |
| Harita durağı görseli brifi | Rotadaki yuvarlak durak | Kare, yazısız, ana sembol merkezde. **Klasörde zaten varsa yazılmaz** |
| Bölüm sayısı | İlerleme | Katalogdaki hedef; 4–10 |
| Kitap madalyası adı | Final ve ödül ekranları | `{Kitap adı} Yolculuk Madalyası` |

Durum metinleri ("Tekrar Oku", "Devam Et", "Yeni" etiketi vb.) sistem tarafından
üretilir; içerik dosyasında ayrıca yazılmaz.

### 5.2 Bölüm listesi

Her bölüm için şunlar gerekir: bölüm numarası, bölüm adı, bölüm özeti, rozet adı,
rozet sembolü ve varsa Bugüne Taşı görev özeti. Bölüm adı listede tek satıra
sığmalıdır.

### 5.3 Okuma ekranı

Her bölüm için şunların tümü gerekir:

- bölüm kimliği ve ses dosyası planı (sesli anlatım her bölümde vardır)
- bölüm açılış sahnesi (zorunlu)
- Hikâye — 1. Kısım
- etkileşimli kelimeler
- isteğe bağlı Tanık Sayfası
- Sen Olsaydın?
- Hikâye Devam Ediyor
- her seçenek için Seçimini Karşılaştır metni
- Ne Öğrendik (3 madde)
- varsa Bugüne Taşı görevi
- 5 içerik sahnesi için 16:9 sahne brifi (tek kadraj; açılışla birlikte 6 görsel)
- rozet kapısı metaverisi

### 5.4 Çocuk ek ekranları

- **Kazanımlarım:** bölüm rozet adı/sembolü, kitap madalyası adı/sembolü.
- **Kelime Defterim:** etkileşimli kelime ve standart anlamı.
- **Görevlerim:** görev ID, ad, kategori, açıklama, süre, tamamlanma ölçütü ve
  gerekliyse güvenlik notu.
- **Final testi:** soru, A/B/C seçenekleri ve doğru seçenek.

### 5.5 Veli ekranları

- Kitap adı, alt başlık, keşif açıklaması ve bölüm sayısı
- Çocuğun mevcut kitabında görünen bölüm adları ve ilerleme
- Kazanılan rozet adları ve madalya adı
- 3 değişken veli özeti (`high`, `mixed`, `low`)
- 2–3 aile sohbet sorusu
- En az 3 “Çocuğunuz Sorarsa” sorusu (üst sınır yok, §10.3) ve veli yaklaşımı
- Bugüne Taşı görevlerinin bütün meta alanları

İlerleme sayıları, tarihler, final sonucu ve durum etiketleri sistem tarafından
türetilir; içerik ajanı bunları uydurmaz.

---

## 6. KİTAP KİMLİĞİ — ZORUNLU ALANLAR

Bazı alanları kod **kendisi türetir**. Bunlar aşağıda *(doğrulama amaçlı)*
olarak işaretlendi: yine de teslimde yazılır, ama veri olarak saklanmaz —
kodun ürettiği değerle eşleşip eşleşmediğini kontrol etmeye yararlar. Eşleşmiyorsa
aktarım yapılmadan önce sorulur.

| Alan | Kural |
|---|---|
| Kitap adı | `Hz. + isim` |
| `booksTsId` | `books.ts` kimliği; `hz-` önekli, ör. `hz-nuh` |
| `bookKey` | Küçük harf, Türkçe karaktersiz, boşluksuz; ör. `nuh` |
| `assetSlug` | *(doğrulama amaçlı)* Dosya adlarında kullanılır; `bookKey`'den türer |
| `routePrefix` | *(doğrulama amaçlı)* `bookKey` ile aynıdır, ör. `nuh` |
| `dbKeywords` | Veritabanındaki kitap adını eşleştiren normalize anahtarlar; ör. `nuh` |
| Seri sırası | Pozitif tam sayı |
| Alt başlık | 15–45 karakter, tek satıra sığmalı |
| Keşif haritası açıklaması | 100–180 karakter, 1–2 cümle. Kitabın tek tanıtım metnidir; ayrıca "tanıtım paragrafı" yazılmaz |
| Madalya adı | *(doğrulama amaçlı)* Kod `{Kitap adı} Yolculuk Madalyası` olarak türetir |
| Madalya sembol fikri | Figürsüz nesne/sembol, 1–3 kelime |
| Bölüm sayısı | Katalogdaki hedef; 4–10 |
| Ana değerler | 4–5 değer |
| Görsel dünya | Mekân, nesne, ışık, atmosfer ve renk dili |
| Ortak stil bloğu (EN) | Kitabın bütün sahne promptlarının sonuna **aynen** eklenecek tek paragraf İngilizce stil cümlesi: resim tekniği, ışık, palet, doku, ton, 16:9 yatay kadraj. 48 görselin aynı kitaptan çıkmış gibi görünmesini bu blok sağlar |
| Ortak negatif prompt (EN) | Bütün sahnelerde geçerli İngilizce yasak listesi: melek, cami/kubbe/minare, yazı/harf/logo/filigran, kan/yara/darbe, letterbox vb. **Yüz ve insan figürü ortak listeye yazılmaz** (REVİZE 16 Ekim 2026 — Hasan): figürsüz sahnenin kendi negatifine `human figure, person`; Katman 1 kişinin (peygamber, akraba, saygın mümin) bulunduğu sahnenin kendi negatifine `visible face, facial features, eyes, mouth, profile, blank face, featureless face` eklenir (§8.1) |
| Karakter blokları (EN) | (16 Ekim 2026) Birden fazla sahnede görünen her Katman 1 kişi için tek satır sabit tarif: giysi rengi, başlık, asa/eşya, duruş, boy — yüz tarifi yok. Figürlü sahne promptuna aynen eklenir. Figürlü kişi yoksa "yok" yazılır |
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
- **Rozet adı:** 2–4 kelime, `{değer/kavram} Rozeti`; set genelinde tekil.
  Tekillik `ROZET-MATRISI.md` §2 diziniyle karşılaştırılarak doğrulanır
- **Rozet sembolü:** figürsüz 1–3 kelime
- **Rozet anahtarı:** *(doğrulama amaçlı)* Kod `hz-{bookKey}/bolum-{no}` olarak
  türetir → `public/rozetler/hz-{bookKey}/bolum-{no}.png`; veriye yazılmaz
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
- **Zayıf seçenekler gerçek bir ikilemdir (KARAR 20 Eki 2026, Hasan):** 8–11
  yaşta bir çocuğun o anda gerçekten yapabileceği, kendince haklı bir gerekçesi
  olan davranışlar yazılır. Çocuk okuyunca “bunu ben de yapabilirdim” demeli.
  Açıkça kötü, tembel ya da kaba davranış zayıf seçenek olarak yazılmaz.
  - Zayıf: “Kendi derdim yeter diye onunla hiç konuşmazdım.”
  - Güçlü: “Onu üzmemek için konuyu açmaz, teneffüste birlikte oynardım.”
- **Ele veren kelime kullanılmaz:** zayıf seçeneklerde “hiç”, “asla”, “bir
  daha”, “umursamazdım”, “karıştırırdım”, “beklerdim”, “vazgeçerdim” gibi
  davranışı baştan kötü gösteren kelimeler; doğru seçenekte de yalnız ona
  ait “sakin olur, düşünüp, nazikçe” gibi süslemeler yer almaz.
- **Üç seçenek benzer uzunlukta ve tondadır:** karakter sayıları arasındaki
  fark %20'yi geçmez; doğru seçenek en uzun seçenek olarak tekrar etmez
  (kitap genelinde en fazla bölüm sayısının üçte biri kadar). Çocuk şıkkı
  uzunluğundan ya da tonundan değil, düşünerek seçmelidir.
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
- **Tasvir kuralı (REVİZE 16 Ekim 2026 — Hasan; PROJE-MODELI 6.4):** görsel
  hikâyeyi anlatır. **Olayın öznesi insansa sahne figürlüdür.** Kavga, sürüyü
  sulayan çobanlar, saraydaki büyücüler gibi anlar insanla gösterilir; dökülmüş
  sepet, ayak izi veya boş sokakla geçiştirilmez. Doğa, mekân ve eşya sahneleri
  yine kullanılır; bölümdeki 6 görselin yaklaşık 2–4'ünün figürlü olması
  beklenir, ama bu kota değildir — ölçüt olayın öznesidir.
- **Katman 1 — yüz hiç görünmez:** peygamberler (Hz. Muhammed hariç), yakın
  akrabaları (anne, baba, kardeş, eş, çocuk; inançlı veya inkârcı fark etmez)
  ve saygın müminler (ör. Âsiye, Hızır). Arkadan kadraj, uzak plan veya doğal
  bir sebep (gölge, başörtüsü, kontra ışık); önden açı gerekiyorsa yüz bölgesi
  yaygın bir ışıkla tamamen örtülür. Sakin, saygılı; kahramanlaştırılmaz.
- **Katman 2 — yüz gösterilebilir:** kötü karakterler (Firavun, Nemrut, Kârûn
  vb.) ve çevreleri (saraydakiler, yardımcılar, büyücüler). Korkutucu ve
  karikatür değil; tarihî anlatıma uygun, sakin görünüm.
- **Katman 3 — yüz gösterilebilir:** sıradan halk (kavga edenler, çobanlar,
  pazardakiler, kalabalık).
- **Hz. Muhammed, ailesi, sahabe, halifeler ve melekler hiçbir biçimde
  gösterilmez.** O dönemde geçen sahnelerde isimsiz halk için karar henüz
  yoktur; o kitabın Faz 1'inde Hasan'a sorulur.
- **"Boş yüz" yazılmaz:** yüz, yüzü olmayan bir kafa olarak değil, doğal bir
  sebeple görünmeyen yüz olarak tarif edilir (boş yüzlü figür ürkütücüdür).
- **Karakter bloğu:** Katman 1 kişi birden fazla sahnede görünecekse kitap
  kimliğinde (§6) bir kez sabit tarif yazılır (giysi rengi, başlık, asa,
  duruş, boy) ve o kişinin bulunduğu her sahne promptuna aynen eklenir.
- **Karma sahne:** aynı karede Katman 1 ile Katman 2/3 varsa Katman 1 kişi
  promptta ayrıca "seen from behind" veya "face fully hidden by soft light"
  diye yazılır.
- **Şiddet:** darbe anı değil gerginlik (iki adamın yakalarına yapışması,
  aralarına giren figür); kan, yara ve silah darbesi yoktur.
- Kitaba özgü daha sıkı karar (bir kişinin hiç gösterilmemesi gibi) Faz 1'de
  verilebilir ve kitap kimliğine yazılır.

### 8.2 Kitap başına görseller

> **Tek kaynak:** dosya adları, klasörler ve oranlar için `ICERIK-GORSEL-SICILI.md`
> geçerlidir. Aşağıdaki tablo onun özetidir; ikisi çelişirse **sicil** doğrudur.
> Yol üretimi kodda `src/lib/varlikYollari.ts` üzerindendir.

| Varlık | Boyut/oran | Dosya planı | Teslim edilecek bilgi |
|---|---|---|---|
| Kitap kapağı | 600×900, 2:3, `.png` | `public/kitaplar/hz-{bookKey}/kapak.png` | Ana kompozisyon ve üretim promptu |
| Harita durağı görseli | Kare, 512×512 veya üstü, `.jpg` | `public/kitaplar/hz-{bookKey}/harita-kapak.jpg` | Merkezdeki tek sembol ve prompt |
| Kitap madalyası | 512×512, **`.png`** (üretimde çerçevesiz kare) | `public/madalyalar/hz-{bookKey}.png` | Sembol, renk ve prompt — çerçeve yazılmaz |
| Bölüm rozeti | 512×512, **`.png`** (üretimde çerçevesiz kare) | `public/rozetler/hz-{bookKey}/bolum-{n}.png` | Bölüme özel sembol ve prompt — çerçeve yazılmaz |

**Kapak ve harita durağı görseli iki ayrı dosyadır** (KARAR 8 Ağustos 2026).
Dikey kapak kütüphanede, kitap panelinde ve veli kartında tam boy görünür. Ana
ekran rotasındaki yuvarlak durak ise `harita-kapak.jpg` kullanır: kare hazırlanır,
daireyi CSS çizer, ekranda yaklaşık 70px görünür. Bu yüzden durak görselinde
**tek ve merkezde duran bir sembol** olmalı; kenardaki ayrıntı kaybolur.

**Kapak veya durak görseli klasörde zaten varsa brifi yazılmaz.** Kullanıcı
§1'de belirtir; belirtmediyse ajan sorar.

**Kitap paketinde bölge sahnesi ve bölüm rotası arka planı YOKTUR.** Ana ekran
rotasının arka planı kodla çizilir; bölge sahneleri ise kitap başına değil bölge
başına üretilir ve hazırdır.

### 8.3 Bölüm içi illüstrasyonlar

**Bölüm başına hedef 6 görsel (KARAR 12 Ekim 2026 — PROJE-MODELI 6.4):**
1 açılış sahnesi (`kapak.jpg`) + **5 içerik sahnesi.** Çocuk kitabıdır; okuma tek
sütunda kaydırılır ve görsel, metin duvarını bölen asıl moladır.

- **Alt sınır 5 görseldir (açılış + 4 sahne).** Bu sınıra yalnız bölüm kısaysa
  (yaklaşık 2.800 karakterin altı) ya da kaynakta gösterilecek ayrı bir an
  gerçekten yoksa inilir. Gerekçe, bölümün iç kalite özetine yazılır.
- **Dağılım:** Hikâye — 1. Kısım'da en az 2, Hikâye Devam Ediyor'da en az 2
  içerik sahnesi olur. Görseller hikâye bölümlerinin içindedir. Sen Olsaydın,
  Seçimini Karşılaştır, Ne Öğrendik ve Bugüne Taşı alanlarına görsel konmaz.
- **Ritim:** İki görsel art arda gelmez; aralarında en az bir paragraf bulunur.
  Ölçü olarak yaklaşık her 2–3 paragrafta bir görsel düşer.
- **Her görsel ayrı bir an gösterir.** Aynı kompozisyonu tekrarlama: uzak plan,
  yakın nesne, mekân, ışık değişimi ve iz gibi kadrajları dönüşümlü kullan.
  Sayıyı doldurmak için anlamsız manzara üretme. Gösterilecek ayrı an yoksa alt
  sınır kuralını uygula.
- Her görsel, metindeki anlamlı bir paragrafın hemen ardından konumlandırılır.
- Sayfa numarası verme; bunun yerine “Şu paragraftan sonra” şeklinde kesin metin
  çapası belirt.
- Her sahne **tek dosyadır: 16:9, önerilen 1920×1080, `.jpg`.** Dikey varyant
  üretilmez; okuma tek sütunda aktığı için 16:9 sahne her cihazda tam genişlikte
  durur.
- Görsel ayrılan alanı tamamen doldurabilecek kompozisyonda olmalı; kenarlarda
  boş şerit/letterbox tasarlama.

Dosya planı:

```text
public/kitaplar/hz-{bookKey}/bolum-{n}/kapak.jpg          ← bölüm açılış sahnesi
public/kitaplar/hz-{bookKey}/bolum-{n}/{kisa-sahne}.jpg   ← bölüm içi sahne
```

Dosya adları küçük harf, Türkçe karaktersiz, tireli olur.

Her görsel durağı için teslim et:

```text
Görsel ID: ...
Metin çapası: “... paragrafından sonra”
Sahnenin amacı: ...
Dosya: bolum-{n}/{kisa-sahne}.jpg
Alt metin: ...
Altyazı: [yalnız gerekiyorsa]
Ana üretim promptu: ... [Türkçe — editör okuması için]
Ana üretim promptu (EN): ... [görsel modeline gidecek metin; Türkçe promptun
  birebir karşılığı, yalnız sahneyi anlatır — ortak stil bloğunu TEKRARLAMA]
Kadraj notu: ...
Figür: yok / [varsa her kişi için: kim, katman (1/2/3), nasıl — Katman 1'de yüz
  görünmez: arkadan, uzak plan, doğal sebep veya yaygın ışık; karakter bloğu]
Negatif prompt/kesin yasaklar: ... [ortak negatif prompta EK olarak bu sahneye
  özgü yasaklar, İngilizce. Figürsüz sahnede `human figure, person`; Katman 1
  kişi varsa `visible face, facial features, eyes, mouth, profile, blank face,
  featureless face`]
```

Görsel üretim oturumu her sahnenin promptunu şöyle kurar:
`Ana üretim promptu (EN)` + (figürlü sahnede) ilgili `Karakter blokları (EN)`
satırı + `Ortak stil bloğu (EN)`; negatif:
`Ortak negatif prompt (EN)` + sahneye özgü yasaklar. Bu yüzden İngilizce alanlar
çeviri gerektirmeyecek kadar eksiksiz yazılır.

Rozet ve madalya brifleri de aynı biçimde **Türkçe + İngilizce** prompt taşır.
Rozetler tek şablon ailesidir (aynı palet ve çizim dili; değişen yalnız
sembol — ROZET-MATRISI §1.3). **Çerçeve promptta yazılmaz** (KARAR 13 Eki
2026): rozet ve madalya çerçevesiz kare üretilir, çerçeveyi Hasan Photoshop'ta
tek ortak şablonla ekler. Bu yüzden kitabın rozetleri için ortak bir **rozet
sembol stili bloğu (EN)** yazılır: sembolün çizim dili, ışığı, dokusu ve
paleti; her rozette yalnız sembol değişir. Blokta çerçeve, kenarlık, kalkan,
madalyon, halka, kurdele, mine zemin, düz gri zemin veya "arka planı sonra
kaldırılacak" ifadesi **yer almaz**. Sembolün arkasındaki zemin yumuşak, boyalı
ve kareyi kenardan kenara doldurur; sembol karenin ortasındaki yaklaşık %60'lık
alanda kalır ve 72 px'te okunacak kadar sadedir. Figür içermez.

### 8.4 Görsel üzerinde etkileşim yoktur

"Dokun ve Keşfet" kapatıldı (27 Temmuz 2026). Keşif noktası, koordinat veya
keşif komutu yazma.

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

- **En az 3 soru; üst sınır yok** (REVİZE 16 Ekim 2026 — Hasan). Kitapta geçen her
  hassas konu karşılanır; soru sayısı kitabın hassasiyetine göre belirlenir.
  8'i aşarsa sorular hassasiyet sırasına dizilir (en hassas önce).
- Ölüm, mucize, afet, aile kaybı, şiddet, kardeş çatışması, korku veya tartışmalı
  rivayet kitapta geçiyorsa ilgili soru mutlaka eklenir.
- Yaklaşım 2–5 cümle; sakin, dürüst, güven veren ve yaşa uygun olmalıdır.
- Bilinmeyeni kesinleştirme; velinin çocuğun asıl duygusunu anlamasına yardım et.
- Güvenlik konusu varsa açık davranış önerisi ver: uzaklaş, güvenli yere geç,
  güvendiğin yetişkine haber ver.

---

## 11. STANDART SÖZLÜKÇE

> **Sicil:** Kutulanmış bütün terimlerin güncel kaydı `SOZLUKCE-SICILI.md`
> belgesindedir. Bir terim **set genelinde yalnız bir kez** kutulanır ve **tek
> bir tanımı** olur. Etkileşimli kelimeleri yazmadan önce o sicile bak: terim
> daha önce başka bir kitapta kutulandıysa bu kitapta düz metin kalır.

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
Keşif haritası açıklaması:
Madalya adı:
Madalya sembolü:
Bölüm sayısı: [KATALOGDAKİ HEDEF]
Ana değerler:
Görsel dünya:
Ortak stil bloğu (EN):
Ortak negatif prompt (EN):
Karakter blokları (EN):
Rozet sembol stili bloğu (EN):
Kaynak ilkeleri:
Kitaba özgü yasaklar:
Duygusal yay:
Ekim-kapanış halkaları:
Etkileşim kararı:
Bugüne Taşı dağılımı:
Tanık kararı:

## C. GÖRSEL VARLIK ANA BRİFLERİ
### C1. Kitap kapağı [klasörde varsa “Hazır — üretilmeyecek” yaz]
### C2. Harita durağı görseli [klasörde varsa “Hazır — üretilmeyecek” yaz]
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
[1 açılış (`kapak.jpg`) + 5 içerik sahnesi = 6 görsel; her biri TEK 16:9 brif.
1. Kısım'da en az 2, Devam'da en az 2 sahne. 5'e inildiyse gerekçesini yaz.]

#### BÖLÜM İÇ KALİTE ÖZETİ
Toplam hikâye karakteri:
Paragraf sayısı:
Tahmini diyalog oranı:
18 kelimeyi aşan cümle var mı?:
Etkileşimli kelimeler:
Görsel sayısı (açılış + sahne; 1. Kısım / Devam dağılımı):
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
[Kapak (.png) ve harita durağı (.jpg) — hazır değilse + madalya (.png) + N rozet
(.png) + tüm 16:9 sahne görselleri (.jpg; bölüm başına 6). Her satırda dosya yolu
ve alt metin. Bölge sahnesi bu envantere GİRMEZ.]

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
- [ ] Zayıf seçenekler gerçekçi ikilem; ele veren kelime yok; üç seçenek
      benzer uzunlukta, doğru seçenek kitap genelinde sürekli en uzun değil.
- [ ] Zayıf seçenek geri bildirimleri çocuğu utandırmıyor.
- [ ] Her bölümde tam olarak 3 Ne Öğrendik maddesi var.
- [ ] Bugüne Taşı yalnız doğal bölümlerde ve bütün meta alanlarıyla yazıldı.
- [ ] Tanık kullanıldıysa aynı kişi ve tarihî/kurgu sınırı açık.
- [ ] Etkileşimli kelimeler yalnız ilk geçişte; tanımlar sabit sözlükçeyle aynı.
- [ ] Etkileşimli kelimeler `SOZLUKCE-SICILI.md` ile karşılaştırıldı; daha önce
      başka kitapta kutulanmış terim bu kitapta düz metin bırakıldı.
- [ ] Her bölümde 6 görsel var (1 açılış + 5 sahne); 5'e inilen bölümün
      gerekçesi yazılı. 1. Kısım ve Devam'da en az 2'şer sahne; art arda iki
      görsel yok; aynı kompozisyon tekrar etmiyor.
- [ ] Her içerik görselinin TEK 16:9 brifi var (dikey varyant üretilmez).
- [ ] Ortak stil bloğu, ortak negatif prompt ve rozet sembol stili bloğu
      İngilizce yazıldı; her sahne, rozet ve madalyada Türkçe + İngilizce
      prompt var. Rozet ve madalya promptlarında çerçeve tarifi yok.
- [ ] Görsel dosya adları `ICERIK-GORSEL-SICILI.md` düzenine uyuyor
      (`bolum-{n}/{kisa-ad}.jpg`); rozet ve madalya 512×512 `.png`.
- [ ] Bütün görsel tarifleri tasvir kuralına (§8.1 katmanları) ve anakronizm
      yasağına uyuyor; öznesi insan olan olay figürlü sahneyle anlatıldı.
- [ ] Final soru sayısı bölüm sayısına eşit ve her bölüm bir kez temsil ediliyor.
- [ ] Veli raporunda 3 özet, 2–3 sohbet sorusu ve en az 3 zor soru bulunuyor;
      kitaptaki her hassas konu karşılandı, 8'i aşarsa hassasiyet sırasına dizildi.
- [ ] Hassas konular veli alanında karşılandı ve çocuk metninde yumuşatıldı.
- [ ] Rozet adları `ROZET-MATRISI.md` §2 diziniyle çakışmıyor.
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
- `ROZET-MATRISI.md` veya `SOZLUKCE-SICILI.md` verilmediği için tekillik
  doğrulanamıyorsa
- Tartışmalı bir rivayet kitabın ana olay örgüsünü belirliyorsa
- Ağır bir olayın çıkarılması kitabın anlamını değiştiriyorsa
- Kullanıcının kaynak sadakati isteği ile 8–11 yaş güvenliği çatışıyorsa

Bu durumlarda önce bulguyu, sonra 1–3 kısa karar sorusunu yaz. Kullanıcı cevap
verdikten sonra üretime devam et.

---

## 16. YERLEŞİK EDİTORYAL KARARLAR (KARAR 16 Ekim 2026 — Hasan)

Aşağıdaki maddeler, yayımlanan kitapların Faz 1 karar kayıtlarında Hasan'ın
verdiği emsal kararlardır (`kitap-icerikleri/*-KAYNAK-DENETIMI.md`). Faz 1 bu
konuları **yeniden soru olarak sormaz; uygular ve uyguladığını gösterir.**

- **Görünürlük zorunludur.** Faz 1 özetinde, karar sorularının hemen ardından
  **"Yerleşik kararlara göre uygulananlar"** tablosu verilir: *olay · uygulanan
  madde · ne yapıldı.* Tablo genel ifadeyle değil, o kitabın kendi olaylarıyla
  yazılır. Hasan itiraz etmezse geçerlidir.
- **İtiraz:** Hasan "bu kitapta farklı olsun" derse kitap istisnası yazılır
  (karar kaydına); "bundan sonra hep böyle olsun" derse bu bölüm güncellenir.
- **Emsal uymuyorsa sorulur.** Kitaba özgü bir sebeple bir maddeden ayrılmak
  gerekiyorsa, ya da madde olayı tam karşılamıyorsa, konu karar sorusu olarak
  açılır.

### A. Zor konuların dili

1. **Ölüm** saklanmaz: açık, sakin, tek cümle; gerekiyorsa sebebi sade biçimde
   verilir ("Ev yıkıldı."). Sahne, ayrıntı, korku dili yok. "Akıbeti hiç anma"
   seçeneği önerilmez. Deprem/sel çağrışımı tek başına çıkarma gerekçesi
   değildir. *(Nûh 1, Eyyûb 1)*
2. **Kur'an'ın bildirmediği ölüm biçimi anlatılmaz** (ör. Âsiye'nin
   işkenceyle öldürülmesi rivayeti). Kişi hikâyeden sessizce çekilir; veli
   raporunda "ölümüyle ilgili anlatımlar rivayettir" denir. *(Musa 2d)*
3. **Helak ve ceza** Kur'an'ın ifadesiyle tek cümle. "Ceza, azap, gazap"
   kelimeleri çocuk metninde kullanılmaz. *(Nûh 1, Musa 2b)*
4. **Ağır tehdit** ayrıntısız verilir: "Onları çok ağır cezalarla korkutmak
   istedi." El-ayak kesme, asma vb. yazılmaz. *(Musa 2c)*
5. **Beddua aktarılmaz**, Kur'an'da geçse bile çocuk metnine girmez.
   *(Nûh, Musa, Eyyûb)*
6. **Kahramanlaştırma yok.** Kurtaran Allah'tır; "ilk kaptan", "dünyayı
   kurtardı", "insanlığın atası" gibi nitelemeler kullanılmaz. *(Nûh 5)*
7. **Bir halk toptan etiketlenmez.** Bir halkı veya etnik grubu suçlayan,
   güncel siyasete uzanan pasajlardan tek cümle bile alınmaz. Karşı taraf
   "kavminin ileri gelenleri" düzeyinde anlatılır. *(Musa, Nûh 4)*

### B. Kaynak ve rivayet

8. **Rivayet kalıbı:** "İslam inancına ve tarihî rivayetlere göre…". Kısa,
   tek cümlelik rivayette "Anlatılanlara göre…" da olur. *(İdrîs, Nûh 9, Musa 7a)*
9. **Sayılar:** yalnız Kur'an'daki sayılar, "Kur'an'da bildirildiğine göre"
   ile verilir (950 yıl, sekiz ya da on yıl, dokuz âyet). Yaş, yıl, ömür,
   nüfus, ordu, ölçü, süre verilmez. *(İdrîs, Nûh 6, Musa, Eyyûb)*
10. **Adlar:** Kur'an'daki adlar ve yaygın-güvenli adlar verilir (Âsiye, Nil,
    Hârûn). Rivayet kaynaklı aile adları gerekmiyorsa verilmez; gerekiyorsa
    bir kez, rivayet kalıbıyla. Romancının uydurduğu adlar hiç verilmez.
    *(Nûh 4, Musa 7b, Eyyûb 4)*
11. **Romancının kurgusu alınmaz:** uydurma kişiler ve olay örgüleri
    (entrika, casus, kötü karakter zinciri) hikâyeye girmez; dönemin havası
    için en fazla fikir düzeyinde kullanılır. *(Nûh 4, Eyyûb A5)*
12. **Melek ve vahiy:** melek konuşturulmaz, sahneye çıkmaz. Vahiy "Allah
    bildirdi" / "ağacın yanından seslenildi" düzeyinde; sesin ve ışığın
    niteliği tarif edilmez. *(Musa 7h, Nûh 7g, Eyyûb 2)*
13. **İki geçerli yorum** varsa Kur'an'ın kendi ifadesiyle nötr anlatım
    kurulur; hiçbir yoruma "yanlış" denmez, farklı anlatımlar veli raporunda.
    *(Nûh 3)*
14. **Bilinen ama çocuğa uygun olmayan ya da zayıf rivayet** çocuk metninden
    çıkar, veli raporunun "Çocuğunuz Sorarsa" alanına taşınır (ör. yemin ve
    demet sap, kekemeliğin sebebi, aşure). *(Eyyûb 3, Musa 9, Nûh 8)*
15. **Kur'an'da olup çocuğa ağır gelen olay** saklanmaz: adı konmadan,
    ayrıntısız anılır; tam anlatım veli raporunda (ör. Hızır kıssasındaki
    çocuk). *(Musa 1)*
16. **Maddî ödüllü rivayet** tamamen çıkarılmaz; yumuşak dille, rivayet
    kalıbıyla bir kez anılır. Değer şükre bağlanır; "sabredene altın yağar"
    çıkarımı kurulmaz; görselde altın ve servet çizilmez. *(Eyyûb 8h)*
17. **Diyanet meali** (kuran.diyanet.gov.tr) yalnız doğrulama içindir: âyet
    anlamı ve numarası. Yeni olay veya ayrıntı eklenmez. Kaynak kitaptaki âyet
    numaraları yanlış olabilir; çocuk metnine giren her âyet buradan kontrol
    edilir ve kaynak notuna yazılır. *(Musa, Eyyûb 7)*

### C. Kitaplar arası ve yapı

18. **Ortak olay:** ana anlatıyı tek kitap taşır, öbürü tek cümle köprü kurar.
    Başka kitaba ait olay, aynı ciltte diye taşınmaz. *(katalog §1.5, Musa 4,
    Eyyûb 5)*
19. **Sözlükçe kutusu** ilk yayımlanan kitapta kalır; istisna kitap bazında
    kararla açılır. *(Musa 10, Eyyûb 6)*
20. **Tanık Sayfası:** Faz 1 öneri yapar, soru sormaz (yok / tarihî tanık /
    isimsiz kurgusal tanık); öneri onay listesinde görünür.
    *(Nûh 12, Eyyûb 9, Musa 5)*

### D. Faz 1 özetinin düzeni

21. Özetin başında **yalnız o kitaba özgü 3–6 karar sorusu** durur. Ardından
    "Yerleşik kararlara göre uygulananlar" tablosu gelir. Bölüm planı, rozet
    adları, yeni terimler ve Bugüne Taşı dağılımı **onay listesi** olarak
    sunulur; itiraz edilmezse önerildiği gibi geçerlidir. Çıkarılan olaylar
    yine her biri için *kaynakta ne anlatılıyor + neden çıktı* biçiminde
    kısaca yazılır.
