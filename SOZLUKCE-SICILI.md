# MERKEZÎ SÖZLÜKÇE SİCİLİ

> **Proje:** Peygamberler Keşif Dünyası
>
> **Belge tarihi:** 25 Temmuz 2026
>
> **Durum:** Yaşayan belge. Her yeni kitap içeriği geldiğinde güncellenir.

Bu belge, uygulamadaki **bütün etkileşimli kelimelerin tek kaydıdır.**
`ROZET-MATRISI.md` ile aynı işi yapar; farkı, rozet adları yerine sözcük
tanımlarını yönetmesidir.

İki işi birden görür:

1. **Tekillik sicili** — bir terim set genelinde **yalnız bir kez** kutulanır ve
   **tek bir tanımı** vardır. Yeni kitabın etkileşimli kelimeleri buradaki
   dizinle karşılaştırılmadan `books.ts`'e aktarılmaz.
2. **Kelime Defterim'in kaynağı** — çocuk `/kelime-defterim` ekranında okuduğu
   kitaplardaki kelimeleri görür. Aynı kelimenin iki farklı tanımı bu ekranda
   doğrudan çelişki olarak görünür.

---

## 1. SABİT KURALLAR

- **Bir terim = bir tanım.** Aynı kelime iki kitapta farklı cümleyle
  tanımlanamaz.
- **Bir terim = bir kutu.** Terim, set genelinde ilk geçtiği bölümde
  etkileşimli olur; sonraki bölümlerde ve sonraki kitaplarda **düz metin**
  kalır (`YENI-KITAP-ICERIK-URETIM-BRIFI.md` §7.4).
- **Kutulama yeri okuma sırasına göre belirlenir — "ilk geçtiği yerde
  kutulanır" (KARAR 7 Ağu 2026, Hasan).** Bir terim, kitap sırasında hangi
  kitapta ilk kez geçiyorsa orada kutulanır. Terimin başka bir kitapta daha
  merkezî olması kutuyu oraya taşımaz. Gerekçe: çocuk kitapları sırayla okur;
  terimi "daha uygun" bir kitaba saklamak, çocuğun o kelimeyi aylarca tanımsız
  görmesi demektir. Sonraki kitap terimi kutu olmadan da derinlemesine
  işleyebilir — kutu bir sözlük girdisidir, konunun sahipliği değil.
  *Örnek: `Kâbe` ve `put` Hz. İbrâhim kıssasında daha merkezîdir; ancak set
  sırasında ilk kez Hz. Şît'te geçtikleri için orada kutulanır.*
- **Kitaplar katalog sırasıyla yazılmadığında kutu, terimin ilk geçtiği
  yayımlanmış kitapta kalır (KARAR 10b, 13 Eki 2026 — Hasan).** Sonradan yazılan
  ve katalogda daha önce gelen kitaplar o terimi **düz metin** kullanır; kutu
  geriye taşınmaz. Yukarıdaki "ilk geçtiği yerde" kuralı, yayımlanma sırası
  katalog sırasıyla aynı olduğu sürece aynen geçerlidir.
  *Örnek: Hz. Musa (#16), Hz. Hûd, Hz. Sâlih ve Hz. İbrâhim'den önce aktarıldı;
  zulüm, iman, ibret ve hikmet o kitaplarda da geçecek ama kutu Hz. Musa'da kalır.*
- **Hiç kutulanmamış bir terim, onu merkeze alan kitapta kutulanabilir (KARAR 6a,
  13 Eki 2026 — Hasan).** Bir terim daha önce yayımlanmış kitaplarda yalnız
  **kutusuz** geçtiyse ve hiçbir yerde kutulanmadıysa, kutu terimi merkeze alan
  kitapta açılabilir. Yayımlanmış kitaplar değişmez; kutusuz geçişler düz metin
  kalır. Bu istisna **daha önce kutulanmış** bir terimi taşımaz (KARAR 10b ve "bir
  terim = bir kutu" aynen geçerli).
  *Örnek: Hz. Eyyûb'da sabır (Âdem, Şît, İdrîs, Nûh ve Musa'da kutusuz), musibet
  (İdrîs 4'te kutusuz) ve cömert (Âdem 3'te "cömertliğini", kutusuz).*
- **Sabit sözlükçe değiştirilemez.** Brif §11'deki 11 terimin tanımı harfiyen
  kullanılır.
- Tanım tek cümle, kısa ve **8–11 yaşa uygun** olmalıdır.
- Yeni terim önerisi editör onayından geçmeden kitap boyunca kullanılmaz;
  onaylanana kadar bu sicile **"onay bekliyor"** olarak yazılır.
- Kutu yalnız gerçekten açıklama gerektiren terimlerde kullanılır — bölüm
  başına 1–2 kelime.

---

## 2. SABİT SÖZLÜKÇE (brif §11 — değiştirilemez)

Bu 11 terimin tanımı projenin standardıdır. Bir kitapta geçtiğinde bu tanım
**harfiyen** kullanılır.

| Terim | Sabit tanım | Kutulandı mı? |
|---|---|---|
| Hicret | Bir yerden başka bir yere göç etmek demektir. | Henüz yok |
| Müşrik | Bir olan Allah'a inanmayıp putlara tapan kimse demektir. | Hz. Nûh · 1 |
| Vahiy | Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır. | Hz. Şît · 4 |
| Halife | Peygamberimizden sonra Müslümanların başına geçen yöneticiye denir. | Henüz yok |
| Sahabe | Peygamberimizi görmüş ve ona inanmış kimselere denir. | Henüz yok |
| Peygamber | Allah'ın, mesajlarını insanlara ulaştırmak için seçtiği elçidir. | Henüz yok |
| Kâbe | Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır. | Hz. Şît · 1 |
| Put | İnsanların kendi elleriyle yapıp taptıkları heykellerdir. | Hz. Şît · 4 |
| Tevekkül | Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır. | Hz. Nûh · 6 |
| Mucize | Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır. | Hz. İdrîs · 4 |
| Zekât | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. | Henüz yok |

> "Kutulandı mı?" sütunu, terimin hangi kitap/bölümde etkileşimli hâle
> geldiğini gösterir. Terim bir kez kutulandıktan sonra buraya kitap ve bölüm
> yazılır; sonraki kitaplarda tekrar kutulanmaz.

---

## 3. KİTAPLARDAN GELEN TERİMLER

`books.ts` içinde fiilen kutulanmış terimler. **Yeni kitabın kelimeleri önce bu
listeyle karşılaştırılır.**

| # | Terim | Tanım | İlk geçtiği yer | Durum |
|---:|---|---|---|---|
| 1 | emanet | Korumamız ve özen göstermemiz için bize güvenilerek verilen şeydir. | Hz. Âdem · 8 | **Kanonik** |
| 2 | secde | Allah'ın emriyle yapılan, derin saygıyı gösteren özel bir davranıştır. | Hz. Âdem · 1 | Kanonik |
| 3 | nimet | Allah'ın insanlara verdiği yiyecek, sağlık, sevgi ve benzeri güzelliklerin her biridir. | Hz. Âdem · 3 | Kanonik |
| 4 | vesvese | İnsanın içine doğan ve onu yanlış bir davranışa çağıran rahatsız edici düşüncedir. | Hz. Âdem · 4 | Kanonik |
| 5 | tövbe | Yaptığımız bir yanlıştan pişman olup Allah'tan bağışlanma istemek ve o yanlışı bırakmaktır. | Hz. Âdem · 5 | Kanonik |
| 6 | rehberlik | Doğru yolu bulabilmesi için birine yol göstermek ve yardımcı olmaktır. | Hz. Âdem · 6 | Kanonik |
| 7 | kurban | Allah'a yakınlaşmak amacıyla sunulan şey veya yapılan ibadettir. | Hz. Âdem · 7 | Kanonik |
| 8 | sıla | İnsanın özlediği yere veya sevdiklerine kavuşmasıdır. | Hz. Âdem · 8 | Kanonik |
| 9 | Kâbe | Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır. | Hz. Şît · 1 | Sabit sözlükçe (§2) |
| 10 | tedbir | Bir tehlike gelmeden önce alınan önlem ve yapılan hazırlıktır. | Hz. Şît · 2 | Yeni terim — **onaylandı** (Hasan, 10 Ağu 2026) |
| 11 | harç | Yapı taşlarını birbirine tutturmak için hazırlanan, kuruyunca sertleşen karışımdır. | Hz. Şît · 3 | Yeni terim — **onaylandı** (Hasan, 10 Ağu 2026) |
| 12 | vahiy | Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır. | Hz. Şît · 4 | Sabit sözlükçe (§2) |
| 13 | put | İnsanların kendi elleriyle yapıp taptıkları heykellerdir. | Hz. Şît · 4 | Sabit sözlükçe (§2) |
| 14 | basiret | Bir işin sonunu önceden görebilmek ve ona göre davranmaktır. | Hz. İdrîs · 1 | Yeni terim — **onaylandı** (Hasan, 12 Ağu 2026) |
| 15 | kılavuz | Yolu bilmeyenlere doğru yönü gösteren kişi ya da işarettir. | Hz. İdrîs · 2 | Yeni terim — **onaylandı** (Hasan, 12 Ağu 2026) |
| 16 | dokuma | İplikleri alt alta ve üst üste geçirerek kumaş yapmaktır. | Hz. İdrîs · 3 | Yeni terim — **onaylandı** (Hasan, 12 Ağu 2026) |
| 17 | mucize | Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır. | Hz. İdrîs · 4 | Sabit sözlükçe (§2) |
| 18 | müşrik | Bir olan Allah'a inanmayıp putlara tapan kimse demektir. | Hz. Nûh · 1 | Sabit sözlükçe (§2) |
| 19 | kavim | Aynı soydan gelen ve bir arada yaşayan insan topluluğudur. | Hz. Nûh · 2 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 20 | kibir | Kendini başkalarından üstün görüp onları küçümsemektir. | Hz. Nûh · 3 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 21 | nesil | Aşağı yukarı aynı yıllarda doğup büyüyen insanların hepsidir. | Hz. Nûh · 4 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 22 | alay | Birini küçük düşürmek için onunla eğlenmektir. | Hz. Nûh · 5 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 23 | tevekkül | Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır. | Hz. Nûh · 6 | Sabit sözlükçe (§2) |
| 24 | tufan | Her yeri sular altında bırakan çok büyük su baskınıdır. | Hz. Nûh · 6 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 25 | şefkat | Birini çok sevip ona iyilik ve koruma göstermektir. | Hz. Nûh · 7 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 26 | şükür | Allah'ın verdiği nimetler için teşekkür etmek ve bunu davranışla göstermektir. | Hz. Nûh · 8 | Yeni terim — **onaylandı** (Hasan, 12 Eki 2026) |
| 27 | zulüm | Birine haksızlık edip ona acı ve zarar vermektir. | Hz. Musa · 1 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 28 | sütanne | Bir bebeği kendi annesinin yerine emziren kadındır. | Hz. Musa · 2 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 29 | hikmet | Bilgiyi doğru yerde ve doğru biçimde kullanabilmektir. | Hz. Musa · 3 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 30 | sözleşme | İki kişinin bir iş için anlaşıp uymaya söz verdiği karardır. | Hz. Musa · 4 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 31 | asa | Yürürken dayanmak için kullanılan uzun değnektir. | Hz. Musa · 5 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 32 | sihir | Gözleri aldatarak bir şeyi olduğundan farklı gösterme işidir. | Hz. Musa · 6 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 33 | iman | Allah'a ve O'nun bildirdiklerine yürekten inanmaktır. | Hz. Musa · 7 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 34 | ibret | Yaşanan bir olaydan ders çıkarmaktır. | Hz. Musa · 8 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 35 | özgürlük | İnsanın baskı altında kalmadan kendi seçimini yapabilmesidir. | Hz. Musa · 9 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 36 | ilim | Araştırıp öğrenerek edinilen bilgidir. | Hz. Musa · 10 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 37 | cömert | Sahip olduklarını başkalarıyla seve seve paylaşan kimsedir. | Hz. Eyyûb · 1 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026; KARAR 6a) |
| 38 | musibet | İnsanın başına gelen büyük sıkıntı ve acıdır. | Hz. Eyyûb · 2 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026; KARAR 6a) |
| 39 | sabır | Zor bir durumda umudunu kaybetmeden dayanabilmektir. | Hz. Eyyûb · 2 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026; KARAR 6a) |
| 40 | vefa | Zor günde de sevdiklerini bırakmayıp onlara bağlı kalmaktır. | Hz. Eyyûb · 3 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 41 | imtihan | Allah'ın insanı iyi ve zor günlerle denemesidir. | Hz. Eyyûb · 4 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |
| 42 | şifa | Bir hastalıktan kurtulup iyileşmektir. | Hz. Eyyûb · 5 | Yeni terim — **onaylandı** (Hasan, 13 Eki 2026) |

**Kanonik** = onaylı Hz. Âdem içeriğinden gelir, değiştirilmez.

> **12 Ağu 2026 — Hz. İdrîs'te dört kutu var.** *basiret* (1), *kılavuz* (2),
> *dokuma* (3) ve *mucize* (4). *tedbir* sicilde Hz. Şît · 2'de kutulu olduğu
> için bu kitapta kullanılmadı; yerine *basiret* geçti. *peygamber, emanet,
> nimet* ve *rehberlik* metinde geçiyor ama §1 gereği ikinci kez kutulanmadı,
> düz `text` olarak aktarıldı. *sabır* ve *musibet* de metinde kutusuz geçiyor.
> **Düzeltme (15 Eki 2026):** bu not eskiden *sabır*'ı "ikinci kez kutulanmadı"
> diye sayıyordu; terim o tarihte hiçbir yerde kutulu değildi (`books.ts` ile
> doğrulandı). Kutusu Hz. Eyyûb · 2'de açıldı (§1 KARAR 6a).

> **12 Eki 2026 — Hz. Nûh'ta dokuz kutu var.** Sabit sözlükçeden *müşrik* (1) ve
> *tevekkül* (6) ilk kez kutulandı; tanımlar §2 ile harfiyen aynı. Yeni terimler:
> *kavim* (2), *kibir* (3), *nesil* (4), *alay* (5), *tufan* (6), *şefkat* (7),
> *şükür* (8). *peygamber, put, tedbir* ve *nimet* metinde geçiyor ama §1 gereği
> ikinci kez kutulanmadı, düz `text` olarak aktarıldı. *şefkat* kutusunda iyelik
> eki kutunun dışındadır ("şefkat" + "i vardı").

> **13 Eki 2026 — Hz. Musa'da on kutu var.** Hepsi yeni terim ve Faz 1'de Hasan
> tarafından onaylandı: *zulüm* (1), *sütanne* (2), *hikmet* (3), *sözleşme* (4),
> *asa* (5), *sihir* (6), *iman* (7), *ibret* (8), *özgürlük* (9), *ilim* (10).
> Sabit sözlükçeden kutulanan yok: *peygamber* (Âdem'e geriye dönük karar) düz
> metin; *hicret* bilinçli olarak kullanılmadı (kutusu Hz. Muhammed kitaplarına
> kalır). *emanet, nimet, secde, kavim, alay, şükür* ve *tedbir* metinde geçiyor
> ama §1 gereği ikinci kez kutulanmadı, düz `text` olarak aktarıldı. Hz. Musa
> katalog sırasından önce aktarıldığı için §1'deki KARAR 10b ilk kez burada
> uygulandı.

> **15 Eki 2026 — Hz. Eyyûb'da altı kutu var.** Hepsi yeni terim ve Faz 1'de Hasan
> tarafından onaylandı: *cömert* (1), *musibet* (2), *sabır* (2), *vefa* (3),
> *imtihan* (4), *şifa* (5). *cömert, musibet* ve *sabır* daha önce yayımlanmış
> kitaplarda yalnız kutusuz geçtiği için §1'deki **KARAR 6a** istisnası ilk kez
> burada uygulandı; yayımlanmış kitaplar değişmedi. Sabit sözlükçeden kutulanan
> yok: *peygamber* ve *put* düz metin. *nimet, şükür* ve *put* metinde geçiyor
> ama §1 gereği ikinci kez kutulanmadı, düz `text` olarak aktarıldı. *hikmet*
> metinden çıkarıldı (kitap rotada Hz. Musa'dan önce okunduğu için açıklamasız
> kalıyordu); *ibret* yerine "öğüt" kullanıldı. *musibet* ve *vefa* kutularında
> ek kutunun dışındadır ("musibet" + "lerin", "vefa" + "yla"). Konuşma satırı
> içeren paragraflarda kutu yalnız terimin geçtiği satırdadır; öbür satırlar ayrı
> `text` bloğudur (Hz. Nûh'taki *alay* ve *şefkat* gibi).

### 3.1 Kod tarafındaki ikinci kopya

`src/data/demoChapters.ts` içindeki `glossary` sözlüğü eski okuma bileşenleri
için küçük bir kopya tutar. Şu an yalnız **`emanet`** girdisi vardır ve
yukarıdaki kanonik tanımla **eşitlenmiştir**. Bu tanım değişecekse önce bu
sicil, sonra `demoChapters.ts` güncellenir.

---

## 4. ÇÖZÜLEN ÇAKIŞMALAR

| Tarih | Terim | Sorun | Çözüm |
|---|---|---|---|
| 25 Tem 2026 | emanet | Üç yerde, iki farklı tanım: Hz. Âdem (onaylı), Hz. Şît demo, `demoChapters.ts`. Çocuk Kelime Defterim'de aynı kelimeyi iki anlamla görüyordu. | Hz. Âdem'in tanımı kanonik kabul edildi. `demoChapters.ts` eşitlendi. Hz. Şît'teki ikinci kutu **düz metne** çevrildi (cümle korundu). |
| 10 Ağu 2026 | emanet | Nihai Hz. Şît içeriğinde terim yine geçiyor (Bölüm 4, birkaç kez). | Sicil §3 gereği ikinci kez kutulanmadı; düz `text` olarak aktarıldı. Çakışma oluşmadı. |
| 25 Tem 2026 | tevekkül | Eski Hz. Nuh demo verisindeki tanım brif §11'deki sabit tanımdan farklıydı. | Ölü demo verisi `books.ts`'ten silindi; sapma ortadan kalktı. Terim henüz hiçbir yayımlanmış kitapta kutulanmıyor. |

---

## 5. YENİ KİTAP GELİNCE — SİCİL GÜNCELLEME AKIŞI

1. İçerik teslimi geldiğinde, kitabın etkileşimli kelimeleri §2 ve §3
   listeleriyle karşılaştırılır.
2. **Terim §2'de (sabit sözlükçe) varsa:** tanım harfiyen sabit sözlükçedeki
   olmalıdır. Farklıysa aktarım yapılmaz; içerik ajanına düzeltme sorulur.
3. **Terim §3'te zaten varsa:** kelime ikinci kez kutulanmaz. İlgili blok
   `interactive_word` yerine düz `text` olarak aktarılır.
4. **Terim yeniyse:** §3'e eklenir, ilk geçtiği kitap/bölüm ve durum yazılır.
5. Sabit sözlükçedeki bir terim ilk kez kutulanıyorsa §2'deki "Kutulandı mı?"
   sütununa kitap ve bölüm yazılır.
6. Çakışma çözüldüyse §4 tablosuna bir satır eklenir.

---

## 6. AÇIK UYARILAR

- ~~**Sabit sözlükçedeki 11 terimin hiçbiri henüz kutulanmadı.**~~ **KAPANDI
  (7 Ağu 2026)** — §1'deki "ilk geçtiği yerde kutulanır" kuralı bu soruyu kalıcı
  olarak çözer. Ayrıca bir karar gerekmez: *hicret · vahiy · halife · sahabe ·
  müşrik · Kâbe* dahil her terim, set sırasında ilk geçtiği kitapta kutulanır.
  10 Ağu 2026'da Hz. Şît içeriğiyle **Kâbe · vahiy · put** kutulandı,
  12 Ağu 2026'da Hz. İdrîs içeriğiyle **mucize**, 12 Eki 2026'da Hz. Nûh
  içeriğiyle **müşrik · tevekkül** kutulandı; sabit sözlükçeden geriye
  *hicret · halife · sahabe · peygamber · zekât* kaldı.
- ~~Hz. Şît'in etkileşimli kelimesi kaldırıldığı için o geçici demo kitapta
  hiç kutulanmış kelime yoktur.~~ **KAPANDI (10 Ağu 2026)** — nihai içerik
  aktarıldı; kitapta beş kutu var: Kâbe (1), tedbir (2), harç (3), vahiy ve
  put (4). `emanet` sicilde zaten kanonik olduğu için düz metin bırakıldı.
- ~~⚠️ **"Peygamber" terimi hâlâ kutulanmadı.**~~ **KARARA BAĞLANDI
  (12 Ağu 2026 — Hasan):** kutu **Hz. Âdem'e geriye dönük eklenecektir**;
  §1'deki "ilk geçtiği yerde kutulanır" kuralı Hz. Âdem'i işaret ediyor.
  Hz. İdrîs kitabında terim bu yüzden düz `text` olarak aktarıldı.
  ⏳ **Uygulama bekliyor:** geriye dönük kutu `books.ts`'teki Hz. Âdem
  içeriğine henüz EKLENMEDİ — bu ayrı bir görevdir, Hz. İdrîs aktarımına
  dahil değildi. Kutu eklendiğinde §2'deki "Peygamber" satırının
  "Kutulandı mı?" sütunu ve §3 dizini güncellenir.
