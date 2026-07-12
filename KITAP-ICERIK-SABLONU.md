# KİTAP İÇERİK ŞABLONU — Peygamberler Keşif Dünyası

> Bu doküman, bir kitabın TÜM içeriğini yazarken teslim edilmesi gereken
> veri alanlarını ve her alanın kurallarını tanımlar. Çıktı birebir bu
> yapıda ve bu sırayla teslim edilmelidir; alan adları değiştirilmez.
> İlk uygulama: **Hz. Âdem (a.s.)** kitabı.

---

## 0. Ürünü Tanı (içeriği yazan için kısa çerçeve)

- Ürün, 7-10 yaş çocuklar için peygamber kıssalarını bölüm bölüm okutan
  bir dijital okuma yolculuğudur. Çocuk her bölümün sonunda bir **ROZET**,
  kitabın tamamı + final testi sonunda bir **MADALYA** kazanır.
- Her bölümün akışı sabittir:
  **Kapak → Hikâye sayfaları → Sen Olsaydın? → Ne Öğrendik? → Bugüne Taşı → Rozet Kapısı**
- Sistem hikâye metnini otomatik olarak ~620 karakterlik ekran sayfalarına
  böler; sayfa planı yapmana gerek yok, sadece paragraf kurallarına uy.

---

## 1. KİTAP KİMLİĞİ (kitap başına 1 kez)

| Alan | Kural | Örnek |
|---|---|---|
| **Kitap adı** | "Hz. + isim". Harita kartında, kitap detayında ve okuma ekranı üst barında görünür. | Hz. Âdem |
| **Alt başlık** | Tek cümlelik slogan, 25-45 karakter. Kartta adın altında. | İlk insan, ilk yolculuk |
| **Tanıtım paragrafı** | Kitap detay sayfası için 1-2 cümle, 120-200 karakter. Kitabın ana temalarını sayar, abartısız. | Hz. Âdem'in yaratılışı, öğrenme yolculuğu, tövbesi ve yeryüzündeki ilk adımları. |
| **Üst etiket (eyebrow)** | Kapak sayfasındaki küçük rozet metni. | Hz. Âdem — Çocuklar İçin |
| **Madalya adı** | SABİT FORMAT: "{Kitap adı} Yolculuk Madalyası". Tek tiptir; altın/gümüş/bronz YOK. | Hz. Âdem Yolculuk Madalyası |
| **Bölüm sayısı** | Hedef 8-10 bölüm (5 de çalışır). Bölümler kitabın kronolojisini izler. | 8 |

---

## 2. HER BÖLÜM İÇİN (bölüm sayısı kadar tekrar)

### 2.1 Bölüm kimliği

| Alan | Kural | Örnek |
|---|---|---|
| **Bölüm no** | 1'den başlayan sıra. | 1 |
| **Bölüm adı** | En fazla ~28 karakter (ekranda TEK SATIR kuralı var). Merak uyandıran, yaşa uygun. | İlk İnsan, İlk Öğrenme |
| **Bölüm özeti** | 1 cümle, 60-110 karakter. Bölüm kapağında ve bölüm listesinde görünür. Soru cümlesi de olabilir. | Hz. Âdem'in yaratılışı ve ilk öğrendikleri |
| **Rozet adı** | SABİT FORMAT: "{Değer/kavram} Rozeti", 2-3 kelime. Bölümün ana değerine bağlı. "Nişan", "ödül", "madalya" kelimeleri YASAK. | İlk Adım Rozeti / Tövbe Rozeti |
| **Rozet sembol fikri** | 1-2 kelime; rozet görseli üretiminde kullanılacak iç sembol. Yüz/figür içermez. | filiz, açık kitap, kandil, yıldız |

### 2.2 Hikâye metni

- **Toplam uzunluk:** bölüm başına 2.500-4.000 karakter (≈ 4-7 ekran sayfası).
- **Paragraflar:** her paragraf 150-400 karakter, tek fikir taşır.
  Paragraflar arasına boş satır konur. Sistem sayfalamayı otomatik yapar.
- **Diyalog:** konuşma satırları uzun çizgiyle başlar: `— İnancından vazgeç!`
  (Sistem bunları italik gösterir.)
- **Anlatıcı sesi:** sıcak, çocuğa zaman zaman "sen" diye seslenen bir
  anlatıcı ("Dur ve düşün...", "Merak ettin, değil mi?"). Her bölümde en
  fazla 1-2 kez; abartma.
- **Bölüm sonu:** son paragraf merak bırakır veya bölümün değerini yumuşakça
  toparlar; bir sonraki bölüme köprü kurabilir.

**Etkileşimli kelime (Kelime Kutusu):** bölüm başına 1-2 adet.
Çocuğun bilemeyeceği bir kelime seçilir; tıklayınca anlamı açılır.
Şu formatta teslim edilir:

```
[KELİME]
Öncesi: "Ebû Bekir bir an durdu. İstenen para, büyük bir "
Kelime: servet
Anlamı: Bir kişinin sahip olduğu büyük para, mal ve değerli şeylerin tamamı.
Sonrası: "ti."
```

(Öncesi + kelime + sonrası birleşince akıcı tek paragraf oluşmalı.
Anlam açıklaması çocuk diliyle tek cümledir.)

### 2.3 Sen Olsaydın? (her bölümde 1 adet — ZORUNLU)

Hikâyedeki ikilemi çocuğun kendi hayatına çevirir. Format:

```
Soru: Yeni ve zor bir şey öğrenirken hata yaptığını fark ediyorsun. Ne yaparsın?
A) Hemen bırakır, bir daha denemezdim.
B) Sakin kalır, hatamı anlayıp yeniden denerdim.   ← DOĞRU
C) Kimse görmesin diye konuyu kapatırdım.
Övgü cümlesi: Harika bir karar! Öğrenen kalp hata yapınca pes etmez, yeniden dener.
```

Kurallar:
- Soru 1-2 cümle, çocuğun günlük hayatından (okul, ev, arkadaş) ve
  "Ne yaparsın?" ile biter.
- 3 seçenek; hepsi "…yapardım / …denerdim" kipinde kişisel davranış cümlesi.
- 1 doğru (bölümün değerini yaşatan davranış) + 2 gerçekçi ama zayıf
  alternatif. Seçeneklerde alay, aşağılama, korkutma OLMAZ.
- Doğru şık her soruda aynı harfte olmasın (A/B/C dağıt).
- Övgü cümlesi 1 cümledir, değeri adlandırır, abartmaz.

### 2.4 Ne Öğrendik? (her bölümde — ZORUNLU)

- **3 madde** (en fazla 4). Her madde tek cümle, 60-130 karakter.
- İlk madde bölümün ana değerini söyler; diğerleri hikâyedeki somut
  olaya bağlanır ("Bilâl'in her şeyini aldılar ama inancını alamadılar." gibi).
- Ders verir gibi değil, keşfettirir gibi: "…demek ki…", "…öğrendik ki…"
  kalıpları serbest ama her maddede tekrarlanmaz.

### 2.5 Bugüne Taşı (her bölümde — ZORUNLU)

- **1 görev cümlesi.** Bugün ya da bu hafta yapılabilecek, küçük ve
  gözlemlenebilir bir davranış. Bölümün değerine birebir bağlı.
- Ölçülü ve uygulanabilir: "Bu hafta bir iyilik yap ama kimseye söyleme.
  Sadece doğru ve güzel olduğu için yap." gibi.
- Para, alışveriş, ekran, sosyal medya içeren görev verilmez; ibadet
  görevleri dayatılmaz.

### 2.6 Bölüm illüstrasyon önerisi (opsiyonel ama istenir)

- Bölüm başına 1-2 sahne tarifi (görsel üretiminde kullanılacak).
- Kurallar: peygamberin yüzü/bedeni TASVİR EDİLMEZ (arkadan silüet bile
  tercih edilmez; tabiat, mekân, sembol sahneleri kullanılır).
  Hz. Âdem kitabının görsel dünyası: tabiat, bahçe, ışık, gökyüzü, ilk
  sabah. Cami-kubbe-minare gibi dönemle uyumsuz dekor KULLANILMAZ.
- Örnek: "Gün doğumunda ışıkla yıkanan yemyeşil bir vadi, ortada kıvrılan
  bir patika, uzakta dağlar; huzurlu ve masalsı atmosfer."

---

## 3. BÜYÜK FİNAL TESTİ (kitap başına 1 kez)

- **5 soru.** Sorular bölümlere dağıtılır (her 1-2 bölümden 1 soru);
  hem olay bilgisi hem değer kavrayışı ölçülür (yaklaşık yarı yarıya).
- Her soru şu formatta:

```
Soru 1: Hz. Âdem'e isimlerin öğretilmesi ona hangi gücü kazandırdı?
A) Çok hızlı koşma gücü
B) Öğrenme ve bilgiyi güzel kullanma gücü   ← DOĞRU
C) Kimseye ihtiyaç duymama gücü
```

Kurallar:
- 3 seçenek; çeldiriciler mantıklı ama açıkça yanlış (kafa karıştırmak
  için değil, düşündürmek için).
- Doğru şıklar A/B/C arasında dağıtılır.
- Soru dili pozitif; "hangisi YANLIŞTIR" kalıbı kullanılmaz.

---

## 4. VELİ RAPORU METİNLERİ (kitap başına 1 kez)

**Veli özeti (2-3 cümle):** Velinin panelinde görünür. GÖZLEM dili
kullanılır, kesin hüküm ve psikolojik değerlendirme YASAK:
- Doğru: "Çocuğunuz Hz. Âdem yolculuğunda öğrenme, hata sonrası yeniden
  deneme ve sorumluluk alma değerlerini güçlü biçimde yakalamış görünüyor."
- Yanlış: "Çocuğunuz artık sorumluluk sahibi oldu." / "İmanı güçlendi."

**Aile sohbet soruları (2 adet):** Yemekte/yatmadan önce sorulabilecek,
açık uçlu, suçlayıcı olmayan sorular. Örnek:
- "Hz. Âdem'in öğrendiği isimler sana neyi hatırlattı?"
- "Bir hata yaptığında yeniden denemek için sana ne cesaret verir?"

---

## 5. DİL VE KAYNAK KURALLARI (tüm metinler için geçerli)

1. **Hedef yaş 7-10.** Kısa cümleler, bilinen kelimeler; bilinmeyen kelime
   kullanılacaksa Kelime Kutusu'na alınır.
2. **Kaynak çerçevesi:** Bahar Yayıncılık "Peygamberler Tarihi" serisi
   (Ahmet Cemil Akıncı) 1. cilt Hz. Âdem anlatısı + Kur'an kıssasının ana
   hattı. **Kaynakta olmayan olay, isim, diyalog, ayrıntı UYDURULMAZ.**
   Emin olunmayan yer genel ifadeyle geçilir.
3. **Kesin dinî hüküm ve yorum yazılmaz;** kıssa anlatımına bağlı kalınır.
   Âyet meali birebir alıntılanmaz, anlatım diliyle aktarılır.
4. **"(a.s.)" kullanımı:** her bölümde ilk geçişte "Hz. Âdem (a.s.)",
   sonrasında "Hz. Âdem".
5. **Peygamber tasviri yok:** fiziksel görünüş betimlemesi yapılmaz
   (yüz, boy, ten rengi vb.).
6. **Hâbil-Kâbil kıssası bu kitaba DAHİL EDİLMEZ** (yaş grubuna ağır —
   proje kararı). Bölüm planı bu kıssayı atlayarak kurulur.
7. **Abartı yasak:** "hayatını değiştirecek", "kesinlikle", "en iyi",
   "mutlaka" gibi kalıplar hiçbir metinde kullanılmaz.
8. **Korku öğesi ölçülü:** çocukta kaygı yaratacak sahneleşme yapılmaz;
   zorluklar umut ve çözümle dengelenir.
9. **Puan/yarışma dili yok:** "kazanmak için", "en hızlı", "birinci ol"
   gibi ifadeler kullanılmaz. Rozet bir yarışın değil, tamamlamanın ödülüdür.

---

## 6. TESLİM FORMATI

İçerik tek dosyada, şu iskeletle teslim edilir (1. bölüm örnek doldurulmuştur):

```markdown
# KİTAP: Hz. Âdem
Alt başlık: İlk insan, ilk yolculuk
Tanıtım: Hz. Âdem'in yaratılışı, öğrenme yolculuğu, tövbesi ve yeryüzündeki ilk adımları.
Üst etiket: Hz. Âdem — Çocuklar İçin
Madalya: Hz. Âdem Yolculuk Madalyası
Bölüm sayısı: 8

## BÖLÜM 1: İlk İnsan, İlk Öğrenme
Özet: Hz. Âdem'in yaratılışı ve ilk öğrendikleri
Rozet: İlk Adım Rozeti
Rozet sembolü: filiz

### HİKÂYE
(paragraf 1)

(paragraf 2)

— (diyalog satırı örneği)

[KELİME]
Öncesi: "..."
Kelime: ...
Anlamı: ...
Sonrası: "..."

(devam paragrafları)

### SEN OLSAYDIN
Soru: ...
A) ...
B) ...   ← DOĞRU
C) ...
Övgü: ...

### NE ÖĞRENDİK
1. ...
2. ...
3. ...

### BUGÜNE TAŞI
Görev: ...

### İLLÜSTRASYON
Sahne: ...

## BÖLÜM 2: ...
(aynı yapı)

## FİNAL TESTİ
Soru 1: ...
A) ... B) ... C) ...  (doğru şık işaretli)
(5 soru)

## VELİ RAPORU
Özet: ...
Sohbet sorusu 1: ...
Sohbet sorusu 2: ...
```

Bu yapıda gelen içerik, kod değişikliği olmadan sisteme (books.ts)
aktarılabilir.
