# Sosyal Medya Başlangıç Planı — Proje (Lansman) Hesabı

> **Kapsam değişti (18 Eki 2026, Hasan):** Bu belge projenin **kendi** hesabı içindir. Bu hesap, proje yayına alınmaya karar verildiğinde açılacak. Şimdi açılacak olan, projeden bağımsız genel hesaptır; onun planı `~/Desktop/HUDHUD ANLATIYOR/belgeler/GENEL-HESAP-PLANI.md`'de.
>
> Durum: **Lansman için saklanıyor** · ilk taslak 17 Eki 2026
> Kapsam: hesap adı, profil metinleri, ilk 30 gün takvimi, 3 örnek "Sen Olsaydın?" senaryosu.
> Senaryolardaki hikâye bilgisi `src/data/books.ts`'teki yayımlanmış bölümlerden alındı; seçenek ve karşılaştırma metinleri uygulamadakiyle aynı.

---

## 0. Önce bir düzeltme: Işıl'ın yeri

İlk mesajda "Işıl hesabın yüzü olsun" dedim. Proje kuralı bunu sınırlıyor: **Işıl hikâyede ve dinî yorumda asla yer almaz; landing'de de dinî içeriğin yanında yok.** Sosyal medyada da aynı kural geçerli olmalı:

- Işıl **yalnız açılış karesinde** ("Bugün bir karar anı var") ve **kapanış/CTA karesinde** görünür. İkisi de lacivert zeminde, hikâye görsellerinden ayrı.
- Hikâye görsellerinin üstüne Işıl **konmaz**. "Sen Olsaydın?" soru kartı da Işıl'sız, krem zeminde olur.
- Işıl peygamberler hakkında yorum yapmaz, hikâyeyi anlatmaz. Hikâyeyi her zaman anlatıcı (kadın ses) anlatır.

**Karar senin:** Soru kartında Işıl'ın soruyu sorması (soru günlük hayattan bir ikilem, dinî yorum değil) kabul edilebilir mi? Ben şimdilik güvenli tarafta kalıp hayır dedim.

---

## 1. Hesap adı

Hesap adı = ürün adı olmalı. Şu anki ad ("Peygamberler Keşif Dünyası") hafızadaki nota göre geçici. Kullanıcı adı olarak uzun, aramada da jenerik.

| Öneri | Kullanıcı adı | Artısı | Eksisi |
|---|---|---|---|
| **Kıssa Yolu** ⭐ | @kissayolu | Kısa, akılda kalır. Ana ekrandaki altın ışık izli rotayla birebir örtüşür. Veliler "kıssa" kelimesiyle arama yapar. | "Yol" kelimesi sık kullanılıyor, müsaitlik kontrolü şart. |
| **Yıldızlı Kıssalar** | @yildizlikissalar | Lacivert-yıldız görsel kimliğiyle aynı dili konuşur, sıcak ve çocuksu. | Uzun. "Masal" çağrışımı yapabilir; kıssaların gerçekliğini gölgeleme riski var. |
| **Sen Olsaydın** | @senolsaydin | En güçlü içerik kancası. Ürünün ayırt edici özelliğini adında taşır. | Ne olduğunu söylemiyor; tek başına marka adı olarak zayıf. Seri adı olarak kullanmak daha doğru. |

**Önerim:** Marka **Kıssa Yolu**, ana video serisi **"Sen Olsaydın?"**.

**Yapılacak kontrol (benim yapamadığım):** Instagram, TikTok ve YouTube'da kullanıcı adı, `.com` / `.com.tr` alan adı ve TÜRKPATENT'te marka araştırması. Üçü birden müsait değilse ad değişmeli. Sonradan ad değiştirmek birikmiş tanınırlığı yakar.

> Ad kesinleşirse sitede tek kaynak `src/data/marka.ts`. Ama ad değişikliği ayrı bir iş; bu belge koda dokunmaz.

---

## 2. Profil metinleri

### Instagram (en fazla 150 karakter)

**Seçenek A — veli odaklı (önerim):**
```
8–11 yaş için peygamber kıssaları
Oku · Düşün · Seç · Ailece konuş
Her pazartesi yeni bir "Sen Olsaydın?"
↓ Erken erişim listesi
```

**Seçenek B — daha sıcak:**
```
Kıssaları birlikte okuyan aileler için 🌙
Her hafta bir hikâye, bir karar anı, bir aile görevi
↓ Açıldığında ilk sen haberdar ol
```

### TikTok (en fazla 80 karakter)
```
Peygamber kıssaları ve karar anları · 8–11 yaş ve aileleri
```

### YouTube kanal açıklaması
```
Kıssa Yolu, 8–11 yaş çocuklar ve aileleri için peygamber kıssalarını
kısa bölümlerle anlatır. Her hikâyenin bir karar anında durur ve sorarız:
"Sen olsaydın ne yapardın?"

Okuyoruz, düşünüyoruz, seçiyoruz ve ailece konuşuyoruz. Puan yok, yarış
yok; yalnızca birlikte düşünmek var.

Görsellerimizde peygamberlerin yüzleri gösterilmez. Hikâyelerimiz Kur'an'a
ve güvenilir kaynaklara dayanır; rivayet olan bilgileri ayrıca belirtiriz.

Yeni hikâyeler her pazartesi ve çarşamba.
```

### Profil görseli
Lacivert yıldızlı zemin + altın logo işareti. Işıl'ı profil fotoğrafı yapmayı **önermiyorum**: küçük dairede okunmaz ve marka = Işıl algısı oluşturur.

### Bio linki
Bekleme listesi sayfasına gitmeli. **Dikkat:** Şu anki landing'de böyle bir kayıt formu yok, satın alma akışı var. Hesap açılmadan önce basit bir "Erken erişim listesi" sayfası gerekiyor (e-posta veya WhatsApp Kanalı). Bu ayrı bir iş.

---

## 3. İçerik kuralları (her paylaşımdan önce kontrol)

- [ ] Peygamber, yakın akrabaları ve saygın müminlerin **yüzü görünmüyor** (uygulamadaki tasvir kuralı).
- [ ] Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler **hiçbir biçimde** yok. İlk aylarda bu kitaplardan içerik üretilmiyor.
- [ ] Melek tasviri, şiddet anı, kan ve yara yok.
- [ ] Rivayet olan bilgi "anlatılır ki" kalıbıyla veriliyor, kesin bilgi gibi sunulmuyor.
- [ ] "Doğru cevap" ve "yanlış cevap" ifadeleri yok. Seçimler karşılaştırılıyor, derecelendirilmiyor (uygulamanın dili).
- [ ] Puan, yarış ve "kaç kişi bildi" söylemi yok.
- [ ] Yapılmamış özellik tanıtılmıyor.
- [ ] Müzik platformun kendi kütüphanesinden alınıyor. Kaynak kitaplardan (kaynak PDF'ler) metin alınmıyor.
- [ ] Bahar Yayıncılık hesaplarıyla görsel, metin ve dil karışmıyor.

---

## 4. Format sözlüğü

| Kod | Format | Kanal | Süre / boyut |
|---|---|---|---|
| **SO-1** | "Sen Olsaydın?" — soru videosu | Reels · Shorts · TikTok | 40–50 sn, 9:16 |
| **SO-2** | "Sen Olsaydın?" — devam ve karşılaştırma videosu | Reels · Shorts · TikTok | 35–45 sn, 9:16 |
| **VR** | Veli rehberi | Instagram kaydırmalı post | 6–8 kare, 4:5 |
| **KK** | Kelime kartı (sözlükçeden) | Instagram post + 15 sn'lik kısa video | 4:5 / 9:16 |
| **AG** | Hafta sonu aile görevi ("Bugüne Taşı") | Instagram kaydırmalı post + story | 4–5 kare |
| **YS** | Yapım süreci (Hasan anlatıyor, ekran kaydı) | Reels · TikTok | 30–60 sn |
| **ST** | Story anketi (Sen Olsaydın şıkları) | Instagram story | Günlük |

**Story anketi notu:** Instagram'ın **anket** etiketi kullanılır, **test (quiz)** etiketi kullanılmaz. Test etiketi doğru cevabı işaretler, bu da "doğru cevap seçim anında açıklanmaz" kuralına aykırı.

**Haftalık ritim:**

| Gün | Paylaşım |
|---|---|
| Pazartesi | SO-1 (soru) |
| Salı | VR (veli rehberi) |
| Çarşamba | SO-2 (devam) |
| Perşembe | KK (kelime kartı) |
| Cuma | AG (hafta sonu aile görevi) |
| Cumartesi | YS (yapım süreci) |
| Pazar | Paylaşım yok. Story'de haftanın anket sonucu. |

Yani haftada 3 video + 1 kısa video + 2 kaydırmalı post. Tek kişi için sınırda. Zorlanırsan önce YS'yi iki haftada bire düşür, SO serisine dokunma.

---

## 5. İlk 30 gün takvimi

### Hafta 0 — Hazırlık (hesap açılmadan önce)
- Ad kesinleşir, kullanıcı adları alınır.
- Profil görseli, kapak şablonları (soru kartı, kelime kartı, veli rehberi) hazırlanır.
- Bekleme listesi sayfası hazırlanır.
- **Stok:** 1. ve 2. haftanın tüm içeriği önceden hazırlanır (12 parça).
- Anlatıcı sesi seçilir ve 2 senaryoyla test kaydı yapılır.

### Hafta 1 — Hz. Musa · Medyen'deki Kuyu (karşılık beklemeden iyilik)

| Gün | Kod | İçerik |
|---|---|---|
| Pzt | SO-1 | **Senaryo 1** (aşağıda) |
| Sal | VR | "İyiliği ödülle değil örnekle büyütmek: 'Ne alacağım?' diyen çocuğa 4 cümle" |
| Çar | SO-2 | Senaryo 1 devamı |
| Per | KK | **nimet** — "Allah'ın insanlara verdiği yiyecek, sağlık, sevgi ve benzeri güzelliklerin her biridir." |
| Cum | AG | **Sessiz Bir İyilik** — karşılık beklemeden bir yardım, övünmeden (güvenlik notu dahil) |
| Cmt | YS | "Çocuklar için bir okuma dünyası yapıyorum — neden puan koymadım?" |

### Hafta 2 — Hz. Yusuf · Kıtlıkta Gelen Kafile (kırgınken adil olmak)

| Gün | Kod | İçerik |
|---|---|---|
| Pzt | SO-1 | **Senaryo 2** (aşağıda) |
| Sal | VR | "Çocuğunuz kendisini üzen biriyle ne yapmalı? Affetmeyi zorlamadan adaleti konuşmak" |
| Çar | SO-2 | Senaryo 2 devamı |
| Per | KK | **emanet** — "Korumamız ve özen göstermemiz için bize güvenilerek verilen şeydir." |
| Cum | AG | **Herkese Adil Pay** — evde bir şeyi herkese eşit paylaştırmak (bıçak uyarısı dahil) |
| Cmt | YS | "Peygamberlerin yüzünü neden hiç göstermiyoruz?" (görsel üretim süreci, önce/sonra) |

### Hafta 3 — Hz. Süleyman · Karınca Vadisi (küçük canlıları gözetmek)

| Gün | Kod | İçerik |
|---|---|---|
| Pzt | SO-1 | **Senaryo 3** (aşağıda) |
| Sal | VR | "Güçlü olmak ne demek? Çocukla 'güç' ve 'merhamet' üzerine 5 dakikalık sohbet" |
| Çar | SO-2 | Senaryo 3 devamı |
| Per | KK | **şükür** — "Allah'ın verdiği nimetler için teşekkür etmek ve bunu davranışla göstermektir." |
| Cum | AG | **Karınca Yolunu İzle** — dokunmadan izle, ailene anlat (bir büyükle birlikte) |
| Cmt | YS | "Bir bölüm nasıl yazılıyor? 8–11 yaş için cümle kısaltma" |

### Hafta 4 — Hz. Nûh · Karada Yapılan Gemi (alaya rağmen hazırlığı sürdürmek)

| Gün | Kod | İçerik |
|---|---|---|
| Pzt | SO-1 | Hook: "Ortada ne deniz var ne yağmur. Ama o, gemi yapıyordu." Soru: Okul gösterisine haftalar önce hazırlanıyorsun, arkadaşların dalga geçiyor. |
| Sal | VR | "Çocuğunuzla alay edildiğinde: doğruyu korumasını nasıl destekleriz?" |
| Çar | SO-2 | Devam + karşılaştırma |
| Per | KK | **tevekkül** — "Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır." |
| Cum | AG | **Akşamdan Hazırlık** — üç akşam boyunca ertesi günün çantasını hazırlamak |
| Cmt | — | **Ay değerlendirmesi** (aşağıdaki ölçütlerle). Paylaşım yerine veri. |

**Not:** Hz. Nûh haftasında oğlunun tufanda boğulduğu bölüm (8. bölüm) bilinçli olarak seçilmedi. Uygulamada bağlamıyla okunuyor, ama kısa videoda bağlamsız kalırsa çocuk için ağır gelir.

### 30 günün sonunda bakılacak sayılar
- Hangi formatın **kaydetme** ve **paylaşım** oranı yüksek? (Takipçi sayısından önemli.)
- SO-1 yorumlarında A/B/C yazan kaç kişi var? Çocuklar mı yazıyor, veliler mi?
- Profil ziyaretinden bio linkine tıklama ve bekleme listesine kayıt.
- Hangi platform öne çıkıyor? İkinci ayda zayıf platforma ayrı emek harcanmaz, yalnız aynı video yüklenir.

---

## 6. Örnek senaryolar

**Ortak yapı (SO-1):**
`0–2 sn kanca` → `2–4 sn Işıl açılış karesi` → `4–35 sn hikâye (görseller + anlatıcı)` → `35–45 sn soru kartı (krem zemin, 3 şık)` → `45–50 sn CTA karesi`

- Görseller 16:9; dikeyde yavaş kaydırma ve yakınlaştırma (Ken Burns) ya da üst-alt genişletme kullanılır.
- Ekranda altyazı her zaman açık. Seslendirme 8–11 yaşa uygun hızda olur (saniyede yaklaşık 2 kelime).
- Soru, uygulamadaki gibi **çocuğun kendi hayatından** sorulur. "Hz. Musa ne yapmalı?" diye **sorulmaz**: peygamberin davranışını oylamaya açmak hem saygısızlık riski taşır hem de projenin yaklaşımına aykırıdır.

---

### Senaryo 1 — Hz. Musa · "Kuyunun Başında"
**Kaynak:** Hz. Musa, 4. bölüm "Medyen'deki Kuyu" · Kasas 23–24
**Görseller:** `hz-musa/bolum-4/medyen-suyu.jpg` → `bekleyen-suru.jpg` → (SO-2) `agac-golgesi.jpg`, `yasli-babanin-avlusu.jpg`

**SO-1 — Soru videosu**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–2 sn | `medyen-suyu` yakın plan | **Ekran yazısı:** "Yorgunsun. Açsın. Kimseyi tanımıyorsun." |
| 2–4 sn | Işıl açılış karesi | Işıl balonu: "Bugün bir karar anı var." |
| 4–16 sn | `medyen-suyu` yavaş açılır | **Anlatıcı:** "Hz. Musa günlerce çölde yürüdü. Ne azığı vardı ne de yol gösteren biri. Sonunda yorgun ve tozlu hâlde Medyen'deki bir suyun başına geldi." |
| 16–27 sn | Çobanlar, kalabalık | "Orada çobanlar birbirini itiyor, herkes önce kendi sürüsünü suluyordu. Kalabalığın gerisinde ise iki kız sabırla bekliyordu." |
| 27–35 sn | `bekleyen-suru` | "Babaları çok yaşlıydı. Çobanlar çekilmeden hayvanlarını sulayamıyorlardı. Böyle giderse sıra akşama kadar gelmeyecekti." |
| 35–45 sn | **Soru kartı** (krem) | **Anlatıcı:** "Şimdi sen düşün. Uzun bir günün sonunda çok yorgunsun. Ağır çantasını taşıyamayan küçük bir çocuk görüyorsun. Kimse yardım etmiyor. Ne yaparsın?" <br>**A** Ben de yorgunum, görmezden gelirdim. <br>**B** Yardım ederdim ama karşılığında bir şey isterdim. <br>**C** Yorgunluğuma rağmen yardım eder, karşılık beklemezdim. |
| 45–50 sn | CTA karesi (Işıl) | "Cevabını yoruma harf olarak yaz. Hikâyenin devamı çarşamba." |

**Açıklama metni:**
```
Yorgun, aç ve yabancı bir şehirde… Hz. Musa kuyunun başında bekleyen
iki kızı gördü. 🌙

Sen olsaydın ne yapardın? A, B ya da C — yoruma yaz.
Çocuğunla birlikte izle, cevabını birlikte konuşun.

Hikâyenin devamı çarşamba.

#peygamberkıssaları #hzmusa #çocuklaiçinkıssa #aileceokuyalım #senolsaydın
```

**SO-2 — Devam ve karşılaştırma**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–3 sn | Soru kartının küçük hâli | "Pazartesi sorduk: Yorgunken yardım eder miydin?" |
| 3–18 sn | `bekleyen-suru` → sulama | **Anlatıcı:** "Hz. Musa kızların hayvanlarını suladı. Sonra hiçbir şey istemeden bir ağacın gölgesine çekildi ve dua etti: 'Rabbim, bana göndereceğin her türlü hayra muhtacım.'" |
| 18–26 sn | `yasli-babanin-avlusu` | "Kızların yaşlı babası onu evine çağırdı. Karşılık beklemeden yapılan küçük bir iyilik, Hz. Musa'ya yepyeni bir yuva açtı." |
| 26–38 sn | Üç seçim kartı sırayla | **A:** "Yorgunken dinlenmek istemek çok doğal. Hz. Musa ise yorgunluğuna rağmen yardım etti." <br>**B:** "Emeğinin karşılığını istemek anlaşılır. Hz. Musa ise hiçbir şey istemeden gölgeye çekildi." <br>**C:** "Sen de Hz. Musa gibi düşündün." |
| 38–45 sn | CTA (Işıl) | "Bu hafta karşılık beklemeden bir iyilik yapmaya ne dersin? Aile görevi cuma burada." |

> **Rivayet notu:** Yaşlı babanın Hz. Şuayb olduğu bilgisi rivayettir. Bu yüzden videoda isim verilmiyor, "yaşlı baba" deniyor. Uygulamadaki dil de böyle.

---

### Senaryo 2 — Hz. Yusuf · "Kapıya Gelen Kardeşler"
**Kaynak:** Hz. Yusuf, 7. bölüm "Kıtlıkta Gelen Kafile" · Yusuf 58–59
**Görseller:** `hz-yusuf/bolum-7/catlak-toprak.jpg` → `ambarin-ici.jpg` → `yuklenen-cuvallar.jpg` → (SO-2) `uzaklasan-kafile.jpg`

**SO-1 — Soru videosu**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–2 sn | `catlak-toprak` | **Ekran yazısı:** "Seni kuyuya bırakanlar, bir gün kapına yardım istemeye gelse?" |
| 2–4 sn | Işıl açılış karesi | "Bugün bir karar anı var." |
| 4–16 sn | `ambarin-ici` | **Anlatıcı:** "Yıllar geçmişti. Hz. Yusuf ülkenin hazinelerini koruyordu. Bereketli yıllarda buğdayı başağıyla ambarlarda saklamıştı." |
| 16–24 sn | `catlak-toprak` | "Sonra kıtlık geldi. Uzak diyarlardan insanlar erzak almaya geliyordu." |
| 24–35 sn | `yuklenen-cuvallar` | "Bir gün kapıya bir kafile geldi. Hz. Yusuf onları hemen tanıdı: Bunlar onu yıllar önce kuyuya bırakan kardeşleriydi. Onlar ise onu tanımadı." |
| 35–45 sn | **Soru kartı** | **Anlatıcı:** "Şimdi sen düşün. Sınıfta kalemleri dağıtma görevi sende. Daha önce seni üzen bir arkadaşın da sıraya girdi. Ne yaparsın?" <br>**A** Ona en kötü kalemi verirdim. <br>**B** Onu görmezden gelir, sırasını en sona bırakırdım. <br>**C** Ona da herkese verdiğim gibi tam payını verirdim. |
| 45–50 sn | CTA (Işıl) | "Yoruma harfini yaz. Devamı çarşamba." |

**SO-2 — Devam ve karşılaştırma**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–3 sn | Soru kartının küçük hâli | "Pazartesi sorduk: Seni üzen birine payını verir miydin?" |
| 3–20 sn | `yuklenen-cuvallar` → `uzaklasan-kafile` | **Anlatıcı:** "Hz. Yusuf kardeşlerine kızmadı. Onlara da herkese verdiği gibi tam ölçek verdi ve erzaklarını eksiksiz yükletti." |
| 20–34 sn | Üç seçim kartı | **A:** "Kırgınlığını hatırlaman çok doğal. Hz. Yusuf ise kendisini kuyuya bırakan kardeşlerine bile payını eksiksiz verdi." <br>**B:** "Uzak durmak istemen anlaşılır. Hz. Yusuf ise onlara herkese davrandığı gibi davrandı." <br>**C:** "Sen de Hz. Yusuf gibi düşündün." |
| 34–42 sn | CTA (Işıl) | "Kırgın olduğumuz biri karşısında bile adil olabiliriz. Bu hafta evde bir şeyi herkese adil paylaştırmaya ne dersin?" |

> **Not:** Kardeşlerin Hz. Yusuf'u kuyuya bırakması olayı videoda yalnızca bir cümleyle anılıyor, sahnesi gösterilmiyor. Kanca güçlü ama içerik şiddet anı taşımıyor.

---

### Senaryo 3 — Hz. Süleyman · "Ordunun Önündeki Karınca"
**Kaynak:** Hz. Süleyman, 3. bölüm "Karınca Vadisi" · Neml 18–19
**Görseller:** `hz-suleyman/bolum-3/vadide-toz.jpg` → `karinca-yolu.jpg` → (SO-2) `yuvaya-donus.jpg`, `aksam-vadisi.jpg`

**SO-1 — Soru videosu**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–2 sn | `karinca-yolu` makro | **Ekran yazısı:** "Koca bir ordu yürüyordu. Önlerinde minicik bir karınca vardı." |
| 2–4 sn | Işıl açılış karesi | "Bugün bir karar anı var." |
| 4–18 sn | `vadide-toz` | **Anlatıcı:** "Hz. Süleyman ordusuyla bir vadiye geldi. Ayak sesleri yeri titretiyor, toz bulutu gökyüzüne yükseliyordu." |
| 18–32 sn | `karinca-yolu` | "O vadide küçük bir karınca, ordunun yaklaştığını gördü ve arkadaşlarına seslendi: 'Ey karıncalar, yuvalarınıza girin; Süleyman ve ordusu farkına varmadan sizi ezmesin!'" |
| 32–44 sn | **Soru kartı** | **Anlatıcı:** "Şimdi sen düşün. Okul bahçesinde arkadaşlarınla top oynuyorsunuz. Birden oyun alanının ortasında uzun bir karınca yolu görüyorsun. Ne yaparsın?" <br>**A** Arkadaşlarıma haber verir, oyunu biraz öteye taşımayı önerirdim. <br>**B** Oyunu bölmemek için bir şey söylemeden devam ederdim. <br>**C** Karıncaları elimle kenara itip oynamaya devam ederdim. |
| 44–50 sn | CTA (Işıl) | "Yoruma harfini yaz. Devamı çarşamba." |

**SO-2 — Devam ve karşılaştırma**

| Zaman | Ekran | Ses / yazı |
|---|---|---|
| 0–3 sn | Soru kartının küçük hâli | "Pazartesi sorduk: Karınca yolunu görsen ne yapardın?" |
| 3–18 sn | `yuvaya-donus` → `aksam-vadisi` | **Anlatıcı:** "Hz. Süleyman karıncanın sözünü duydu ve gülümsedi. Koca bir ordunun içinde minicik bir sesi önemsedi. Sonra kendisine verilen nimetler için Rabbine şükretti." |
| 18–32 sn | Üç seçim kartı | **A:** "Sen de Hz. Süleyman gibi düşündün." <br>**B:** "Oyunun keyfini bozmak istememek anlaşılır. Hz. Süleyman ise kalabalığın içinde bile küçük bir canlının sesini fark etti." <br>**C:** "Karıncaları düşünmen güzel. Hz. Süleyman ise karıncanın sesini fark edip önemsedi." |
| 32–40 sn | CTA (Işıl) | "Bu hafta sonu bir karınca yolunu dokunmadan izlemeye ne dersin? Gördüklerini ailene anlat." |

> **Neden bu senaryo ilk 3'te:** Görsel olarak en çekici ve en "güvenli" kıssa. Şiddet yok, kayıp yok, rivayet tartışması yok. Çocuk izleyicide en kolay yorum getirmesi beklenen format bu.

---

## 7. Açık sorular — Hasan'ın kararı gerekiyor

1. **Ad:** "Kıssa Yolu" mu, başka bir öneri mi? (Kullanıcı adı ve alan adı kontrolünden sonra.)
2. **Işıl soru kartında olabilir mi?** (Bkz. §0.)
3. **Anlatıcı sesi:** ~~Kendi sesin mi, seslendirmen mi?~~ **Karar (18 Eki 2026, Hasan):** Projenin sesli anlatımı kadın sesiyle yapılacak; bu hesabın videoları da aynı sesi kullanır. Genel hesabın erkek sesiyle karıştırılmaz.
4. **YouTube:** Hikâye videoları "Çocuklara özel" işaretlenecek (yorum ve bitiş ekranı kapanır). Veli rehberleri ayrı bir oynatma listesinde, çocuklara özel olmadan mı yayınlansın?
5. **Bekleme listesi:** E-posta mı, WhatsApp Kanalı mı, ikisi mi?
6. **Hesap açılış tarihi:** Hafta 0 hazırlığı için en az 10 gün gerekiyor.
