# CLAUDE.md — Peygamberler Keşif Dünyası

## Proje
Peygamber ve Dört Büyük Halife kıssalarını, çocuklara yönelik **oyunlaştırılmış
bir web okuma deneyimi** olarak sunan uygulama. İki yüzü var:
- **Çocuk tarafı:** harita üzerinde ilerleyen, bölüm bölüm okunan yolculuk (uygulama
  gibi: az menü, büyük buton, tek görev odaklı).
- **Veli tarafı:** profil, okuma takibi, gelişim raporu (panel gibi: sekmeli, sakin).

Değer önerisi **okuma → düşünme → uygulama → aile içi konuşma** döngüsüdür.
Duolingo tarzı puan / streak / bildirim baskısı **bilinçli olarak YOKTUR.**
Cihaz önceliği: **tablet yatay > tablet dikey > mobil > masaüstü.**
Stack: Next.js + TypeScript + Tailwind + Supabase. Paket yöneticisi: **npm**.

## Komutlar
> package.json'daki script'lerle doğrula.
- `npm run dev` · `npm run build` · `npm run lint` · `npm start`

---

## DOSYA ROLLERİ — EN ÖNEMLİ BÖLÜM

### Anayasa / uygulanan
- **PROJE-MODELI.md** — projenin anayasasıdır. Terminoloji, tasarım sistemi
  (renk/token/bileşen), özellik kararları, sayfa haritası, görsel varlık sistemi,
  veri modeli, fazlar. **Bir karar değişecekse önce bu doküman güncellenir, sonra
  kod.** Şüphede kalırsan buraya bak.
- **KITAP-KATALOGU-VE-URETIM-PLANI.md** — hangi kitabın hangi keşif bölgesinde,
  kaçıncı sırada ve **kaç bölüm** olacağını belirler (7 bölge · 35 kitap ·
  216 bölüm) + kaynak hassasiyet sınıfları (K1–K4). `src/data/atlasCatalog.ts`
  bu belgeyi izler. Kitap ekleme/çıkarma, bölge veya hedef bölüm sayısı
  değişikliği **Hasan onayı olmadan yapılmaz** (belgenin §12 kuralı).
- **ROZET-MATRISI.md** — 216 rozetin tekillik sicili ve görsel üretim listesi.
  Yeni kitap `books.ts`'e aktarılmadan önce rozet adları **buradaki dizinle
  karşılaştırılır**; çakışma varsa aktarım yapılmaz, önce ad değişikliği sorulur.
  Aktarım bitince matris güncellenir (§6 akışı).
- **SOZLUKCE-SICILI.md** — etkileşimli kelimelerin tekillik sicili. Bir terim
  **set genelinde yalnız bir kez** kutulanır ve **tek tanımı** olur. Aktarımdan
  önce karşılaştırılır; terim sicilde varsa yeni kitapta `interactive_word`
  değil düz `text` olarak aktarılır. Aktarım bitince sicil güncellenir.
- **supabase/schema.sql** — veritabanı şeması.

### Referans (koda ait DEĞİL)
- **YENI-KITAP-ICERIK-URETIM-BRIFI.md** — **güncel** içerik üretim brifidir.
  Kitap içeriğinin hangi kurallara göre *yazıldığını* anlatır: cümle uzunluğu,
  sözlükçe, "Sen Olsaydın", veli metni, görsel brifleri, teslim iskeleti.
  Bu **içerik kurallarını KODLAMAYA ÇALIŞMA.** Sadece bilgi amaçlı.
  (Eski `KITAP-ICERIK-SABLONU.md` 12 Eki 2026'da silindi; yerine bu brif geçti.)

---

## İÇERİK & VERİ
- **İki ayrı veri dosyası, karıştırma:**
  - `src/data/books.ts` → bölüm metinleri, "Sen Olsaydın", Ne Öğrendik,
    Bugüne Taşı görevleri, rozet adları, veli raporu.
  - `src/data/quizzes.ts` → **Büyük Final Testi soruları.** (Eskiden quiz
    sayfasının içindeydi; 25 Tem 2026'da ayrıldı.) Yeni kitap eklerken **her iki
    dosya da** güncellenir; final testini atlamak en kolay yapılan hatadır.
  - `src/data/atlasCatalog.ts` → kitap adı, alt başlık, keşif açıklaması,
    bölüm sayısı, yayımlanma durumu. Katalog belgesini izler.
- Kitap içeriği **`src/data/books.ts`** içinde statik tutulur. Kitap sayısının 20'yi aşması
  tek başına Supabase'e taşıma gerekçesi değildir; böyle bir taşıma ancak ayrı
  bir teknik karar ve faz ile yapılır.
- Kitap içeriği **ayrı bir içerik oturumunda** `YENI-KITAP-ICERIK-URETIM-BRIFI.md`
  ve `KITAP-KATALOGU-VE-URETIM-PLANI.md`'ye göre üretilir, sana **doldurulmuş
  metin** olarak gelir. Senin işin onu `books.ts` formatına **EKLEMEK** —
  içeriği kendin yazma, değiştirme, kısaltma.
- **İÇERİK OTURUMU İSTİSNASI.** Oturum açıkça "içerik oturumu" olarak
  başlatıldıysa (Hasan, kaynak PDF ile bir kitabın Faz 1 / Faz 2 içeriğini
  istediyse) yukarıdaki "içeriği kendin yazma" kuralı **uygulanmaz**; o oturumun
  işi içeriği yazmaktır. Kurallar:
  - Tek kural kaynağı `YENI-KITAP-ICERIK-URETIM-BRIFI.md`; akış ve dosya listesi
    katalog belgesinin §11.2'sinde.
  - Yalnız `kitap-icerikleri/` altına yazılır. `src/`, `app/`, `public/`,
    `supabase/` ve sicillere (`ROZET-MATRISI.md`, `SOZLUKCE-SICILI.md`,
    `ICERIK-GORSEL-SICILI.md`) **dokunulmaz**; siciller okunur, güncellemesi
    aktarım oturumunun işidir.
  - Kaynak PDF'ler `kaynak-pdfler/` klasöründedir (git'e girmez, telifli).
  - Faz 1 onaylanmadan Faz 2 yazılmaz. Commit atılmaz.
- **Rozet görsel anahtarı `books.ts`'te alan DEĞİLDİR.** `src/lib/derive.ts`
  içindeki `rozetIconKey(bookKey, no)` ile `hz-{bookKey}/bolum-{no}` olarak
  türetilir → `public/rozetler/hz-{bookKey}/bolum-{no}.png`. Bölümlere
  `rozetIcon` alanı ekleme.
- Supabase tabloları: `profiles`, `parent_subscriptions`, `books`, `user_progress`.
- **Kitap listesi tek kaynaktan (18 Eki 2026):** çocuk ekranları ve veli paneli
  kitapları `derive.ts:yayindakiKitaplar()`'dan alır (katalogda `published` +
  `books.ts`'te içerik). Elle kitap listesi ya da anahtar tablosu TUTMA; Supabase
  `books` satırı yalnız ilerleme anahtarıdır, ad katalogdan gelir.
- Türetilen kavramlar tablo GEREKTİRMEZ: rozet (`tamamlanan_bölüm >= sıra`),
  madalya (`bitti_mi = true`), unvan (tamamlanan kitap sayısı → eşik tablosu).

---

## TERMİNOLOJİ (SABİT — Bölüm 2)
Ekranda, kodda ve metinlerde **yalnızca üç kavram**: **ROZET · MADALYA · UNVAN.**
- ROZET = her bölüm bitince · MADALYA = kitap + final testi bitince · UNVAN =
  tamamlanan kitap sayısı eşiğinde.
- "Nişan / ödül rozeti / kitap rozeti / puan / skor" YASAK.
- Madalya **tek tiptir** — altın/gümüş/bronz kademesi YOK.
- Unvan **puana değil**, kitap sayısına bağlı. **Puan sistemi YOK.**

---

## KOD DOKUNURKEN KURALLAR
- **İki görsel dünya, karıştırma (Bölüm 3.1):**
  - Veli tarafı: krem zemin (#FAF6ED), nane/yeşil aksiyon (#2E7D5B), sıcak kahve
    başlık, altın vurgu. Sakin.
  - Çocuk tarafı: koyu lacivert + yıldız (#0E1A34), altın (#E8B84B) + yeşil
    vurgu; uzun okuma metni **daima krem açık zemin** üzerinde.
  - Renkler Tailwind token'ı olarak tek kaynaktan yönetilir; **sayfaya gömülü hex
    bırakma.**
- **Buton semantiği sabit (3.3):** yeşil = devam/onayla, altın = başla/final,
  lacivert = ikincil, ghost = geri/iptal, kırmızı = silme.
- **Durum dili (3.4):** Tamamlandı→Tekrar Oku, Devam ediyor→Devam Et, Yeni
  açıldı→Yolculuğa Başla, Kilitli→buton yok + açılma şartı SOMUT yazılır
  ("Hz. Nuh, Hz. Âdem finalini bitirince açılacak" — "önceki görevleri bekliyor"
  gibi soyut ifade yasak). **REVİZE 12 Eki 2026 (3.10.2, Faz C):** kitap kilidi
  kalkıyor; kilit yalnız bölümlerde ve Büyük Final Testi'nde kalır.
- **Ölçü standartları (3.5):** buton ≥48px, dokunma alanı ≥44×44px, gövde metni
  ≥16px. Mobilde metin+görsel yan yana KONMAZ (tek sütun).
- **Tasvir kuralı (REVİZE 16 Eki 2026 — Hasan; PROJE-MODELI 6.4):** görsel
  hikâyeyi anlatır; **olayın öznesi insansa sahne figürlüdür.** Üç katman:
  **1)** peygamberler (Hz. Muhammed hariç), yakın akrabaları (inançlı/inkârcı fark
  etmez) ve saygın müminler (Âsiye, Hızır vb.) — **yüz hiç görünmez** (arkadan,
  uzak plan, doğal sebep; önden gerekiyorsa yüz bölgesi yaygın ışıkla tamamen
  örtülü; boş yüz yok). **2)** kötü karakterler ve çevreleri (Firavun,
  saraydakiler, büyücüler) ve **3)** sıradan halk — yüz gösterilebilir; korkutucu
  ve karikatür değil. **Hz. Muhammed (s.a.v.), ailesi, sahabe ve halifeler hiçbir
  biçimde gösterilmez** (silüet ve el dahil); o dönemdeki isimsiz halk için karar
  henüz yok. Melek tasviri yok. Şiddette darbe anı, kan, yara yok. Cami-kubbe-minare
  gibi dönemle uyumsuz dekor da kullanılmaz. Önceki kitapların "figür yok" kayıtları
  o günkü uygulamadır; yeni kural sonraki üretimlerde geçerlidir.
- **Türkçe karakterler** (ş, ğ, ı, İ, ç, ö, ü, â) — font, veri, UI'da test et.
- **Animasyon kütüphanesi tektir: Motion** (`framer-motion` paketi; `HareketAyari`
  azaltılmış hareket ayarını yönetir). GSAP, HyperFrames, Lottie gibi ikinci bir
  animasyon kütüphanesi EKLENMEZ; global GSAP/HyperFrames skill'leri bu projede
  kullanılmaz.
- **Rapor dili gözlem bildirir**, kesin hüküm vermez ("...temaları öne çıktı"),
  çocuğu derecelendirmez.

---

## GÖRSEL VARLIKLAR (Bölüm 6)
- Kod görseli **iconKey üzerinden** bulur; placeholder'la yazılır, Hasan aynı
  isimle gerçek dosyayı klasöre atınca kod değişmeden yayına girer.
- **Klasör düzeni (REVİZE 27 Tem 2026 — PROJE-MODELI 6.1):** kitap → bölüm
  hiyerarşisi klasöre taşındı. Yol üretimi **yalnız `src/lib/varlikYollari.ts`**
  üzerinden yapılır; ekranlar kendi içinde yol string'i KURMAZ.
  `public/kitaplar/hz-{bookKey}/kapak.png` · `.../bolum-{n}/kapak.jpg` ·
  `.../bolum-{n}/{kisa-ad}.jpg` · `public/rozetler/hz-{bookKey}/bolum-{n}.png` ·
  `public/madalyalar/hz-{bookKey}.png` · `public/unvanlar/{anahtar}.png` ·
  `public/avatarlar/avatar-{1..10}.jpg` · `public/ikonlar/final-kapisi.svg` ·
  `public/sesli-anlatim/hz-{bookKey}/hz-{bookKey}-bolum-{n}.mp3`.
  **Okuma sayfası görselleri 16:9 ve `.jpg`** (sabit). **Rozet/madalya/unvan
  512×512 şeffaf PNG** (REVİZE 7 Ağu 2026 — eskiden SVG'ydi; ekranda en fazla
  72px çizildikleri için vektör avantajı karşılıksızdı, brifler ise gradyan ve
  doku istiyor). Yedek placeholder'lar ve `final-kapisi.svg` SVG kalır.
  Dosya adları küçük harf, Türkçe karaktersiz, tireli. İçerik görsellerinin
  sicili: `ICERIK-GORSEL-SICILI.md`.
- **Rozet = bölüm başına özel görsel** (Karar: Seçenek B). Anahtar veriye yazılmaz,
  `rozetIconKey(bookKey, no)` ile türetilir (`hz-adem/bolum-1` gibi). Tek şablon
  ailesi; kilitli/kazanılmış durum ayrı görsel değil, CSS ile soluklaştırma.
  Rozet adlarının set genelinde tekilliği **ROZET-MATRISI.md** ile yönetilir.
- **Ortak ödül çerçevesi kodla çizilir (KARAR 20 Eki 2026 — PROJE-MODELI 6.1):**
  rozet = kalkan, madalya = defneli halka, unvan = kitap temalı pano;
  `scripts/odul-cerceveleri.mjs`. İç görsel çerçevesiz üretilip
  `gorsel-kaynaklari/` altına konur, `npm run odul-cerceve -- kitap {bookKey}`
  (ya da `-- unvan`) çerçeveyi çizip `public/`'e aynı adla yazar. Ödül PNG'si
  `public/`'e elle konmaz; çerçeve değişecekse yalnız betik değişir. Âdem, Şît,
  Nûh eski tek parça (çerçevesiz kaynakları yok); rota durağı çerçevesi hazır
  ama ekrana girmedi (ilerleme halkası kararı açık).
- **"Sen Olsaydın" salt metindir** (Karar 11 Tem 2026) — seçeneklerde görsel yok.
- **Sesli anlatım her bölümde vardır (KARAR 12 Eki 2026 — PROJE-MODELI 6.5).** Yol
  `varlikYollari.ts:sesliAnlatim()` ile türetilir; `books.ts`'te ses alanı YOKTUR
  (rozet anahtarı gibi). Kayıt gelene kadar `public/sesli-anlatim/placeholder-ses.mp3`
  kopyası durur; Hasan aynı adla üzerine yazar. Yer tutucu başka bölümün anlatımıdır.
  Kitap yer tutucularla yayına alınabilir; gerçek görsel ve ses aktarımdan sonraki
  üretim turunda aynı adla üzerine yazılır (KARAR 13 Eki 2026 — Hasan).
- **Görsel üretim oturumu (KARAR 12 Eki 2026):** kitap görselleri ayrı bir oturumda
  Magnific bağlantısıyla, **yalnız aktarımdan ve yer tutucular açıldıktan sonra**
  üretilir. Liste `ICERIK-GORSEL-SICILI.md`'den, promptlar
  `kitap-icerikleri/KITAP-HZ-{ANAHTAR}-ICERIK-final.md`'den okunur. Kurallar ve
  akış sicilin §6.2'sinde. O oturum yalnız `public/` altındaki yer tutucuların
  üzerine aynı adla yazar (rozet/madalya: kaynağı `gorsel-kaynaklari/`'na koyup
  `npm run odul-cerceve -- kitap {bookKey}` çalıştırır) ve sicil durumlarını
  günceller; koda dokunmaz.

---

## ÇOCUK ARAYÜZÜ SADELEŞTİRME (KARAR 11–12 Eki 2026 — PROJE-MODELI 3.10)
Faz A, B (okuma ekranı), C (ana ekran) ve **D (Işıl) uygulandı;** sırada 5 çocukla
gözlem testi var. Ana ekran bileşenleri `src/components/cocuk/`, veri modeli
`src/lib/child/yolculuk.ts`, girişsiz önizlemeler `/tasarim/ana-ekran`,
`/tasarim/okuma?bolum=adem-2` (rozet kaydı Supabase'e gitmez), `/tasarim/final?kitap=idris`
(Büyük Final Testi; kayıt yok), `/tasarim/oduller`, `/tasarim/kelimeler`, `/tasarim/gorevler`
(`?durum=bos`) ve `/tasarim/isil`. Veli tarafının girişsiz önizlemesi
`/tasarim/veli-rapor` (Gelişim Raporu'nun Kitaplar ve Sohbet Önerileri sekmeleri;
`?durum=bos|tek`, `?sekme=kitaplar`; görünüm `src/components/dashboard/Rapor*Sekmesi.tsx`).
"Kim okuyor?" önizlemesi `/tasarim/kim-okuyor` (`?sifre=1`; örnek şifre 1234;
`?kurulum=1` ana ekran notu); "Bu cihazı çocuğunuz kullanacak mı?" sorusu
`/tasarim/cihaz-sorusu` (`?durum=baglandi`). Giriş sayfası açık oturumu tanır
ve yönlendirir (3.11 "Çocuğun geri dönüşü"). **iOS 26'da ana ekran simgesi
tarayıcıdan ayrı hafızalı uygulamadır** (Hasan denedi): oturumsuz çocuk ekranı
`/login?cocuk=1`'e gider, veli girişi cihazı çocuğa verir; çocuğun kendi
cihazında kod simgeden açılan ekranda girilir. Web manifest şimdilik eklenmez. Ödüllerim · Kelimelerim · Görevlerim: açık krem zemin
+ gece mavisi menü bantları (unvan kartı gece mavisi), görünüm `src/components/cocuk/*Ekrani.tsx`, sayfalar yalnız veri çeker (3.10.8). Final testi görünümü
`src/components/final/FinalTesti.tsx`; okuma ekranının modülünü ve rozet anıyla ortak
`KutlamaSahnesi`'ni kullanır.
**Işıl görsel dosya DEĞİLDİR:** kodla çizilmiş, canlandırılmış SVG karakter
(`src/components/cocuk/Isil.tsx`, pozlar `durus` · `konusma` · `kutlama`); PNG
isteme, `public/isil/` klasörü yok. Özet:
keşif bölgeleri arayüzden kalkar, kitaplar katalog sırasıyla **tek dikey rotada**;
yayında olmayan kitap görünmez (sonda tek "Yakında" kartı); sonradan yayınlanan kitap
kendi yerine girer + "Yeni" etiketi; **kitap kilidi kalkar, bölüm kilidi kalır**;
ana ekranda "Sıradaki bölümün" kartı ("Kaldığın yer" DEĞİL — tamamlanan bölüm
sayısından); okuma ekranı tamamen açık zemin, adım çubuğu, rozetten sonra doğrudan
sıradaki bölüm; mekân metaforları (İskele/Rota/Kapı/Durak/Atlas) arayüz metninden
çıkar, "Kazanımlarım → Ödüllerim"; rehber karakter **Işıl** (ateşböceği, yalnız
metin balonu, hikâyede ve dinî yorumda asla; ana ekranda okunan kitabın yanında
"Buradasın"; sözlük kelimesine dokununca anlam kartını uçarak getirir — tanımı
kendisi söylemez, tanım içerik verisidir). Okuma açılışında künye, bölüm adı ve
(< 1024 px) rozet kapak görselinin ortasındadır (REVİZE 12 Eki 2026). Hamburger menü yerine profil kartı; ayrı bölüm rotası sayfası yerine
alttan sayfa / sağ panel; okunan yol altın ışık izi, durak halkası = kitap ilerlemesi;
rota arka planı boyalı, dikişsiz alt alta tekrar eden çayır görseli
(`ROTA_ARKAPLANI`) + kodla çizilen canlı çayır katmanı (`CanliCayir`: su ve
balıklar, rüzgâr, sallanan çiçek/saz, kelebek, tavşan, kuş sürüsü — KARAR
17–18 Eki 2026; test ekranı `/tasarim/canli-cayir`;
görsel değişirse `node scripts/canli-cayir-irmaklari.mjs`); geniş ekranda gece manzarası zemin,
üst menü ve kartlar eşit köşeli, aralarında boşluklu (REVİZE 12 Eki 2026). Velinin okuma
sırası ayarı YAPILMAZ.
Ayrıntı ve ölçümler 3.10'da; bu kararları yeniden tartışmaya açma.

## YENİ DAVRANIŞSAL ÖZELLİKLER (kitap metninden ayrı, ayrı prompt gelir)
- **Hedef yaş: 8–11.** Tüm içerik ve arayüz dili bu aralığa göre.
- **Bölüm içi akış (KARAR 15 Tem 2026 — Faz 6.1'de uygulandı):**
  Hikâye — 1. Kısım → Sen Olsaydın → Hikâye Devam Ediyor → Seçimini Karşılaştır →
  Ne Öğrendik (3 madde) → (varsa) Bugüne Taşı → Rozet Kapısı.
  Kurallar: seçim hikâyeyi DALLANDIRMAZ; doğru cevap seçim anında AÇIKLANMAZ;
  bölüm sonunda YALNIZCA seçilen şıkkın karşılaştırma metni gösterilir; seçim
  yalnız sayfa yenilenince korunur, bölüm haritadan ya da başka bölümden
  açılınca soru yeniden cevaplanır (REVİZE 20 Eki 2026; ilk seçim kalıcı S5
  kaydında kalır, karıştırma).
- **Bölüm TEK SAYFADA KAYDIRILIR (KARAR 26 Tem 2026 — Faz 6.2):** sayfa yok,
  **durak** var. Sayfa bölme / sayfa çevirme / iç kaydırma alanı KULLANILMAZ;
  alt gezinme çubuğu ve "Sayfa 3 / 12" göstergesi KALDIRILDI. Yerine **adım
  çubuğu** gelir (Faz B, 12 Eki 2026: Oku · Seç · Oku · Öğren · (Görev) · Rozet;
  her adımın çizgisi okundukça altınla dolar; ≥1024 px solda adım sütunu). Bu
  gösterge opsiyonel değil, sayfa metaforunun zorunlu telafisidir.
  İllüstrasyon ayrı bir adım DEĞİLDİR — hikâye akışının içine, ait olduğu
  sahnenin geldiği yere serpiştirilir; metin ve görsel hiçbir kırılımda yan yana
  konmaz. "Sen Olsaydın" bir **kapıdır**: onaylanmadan sonrası **render edilmez**
  (bulanıklaştırma/kilit ile gizleme değil — DOM'da hiç bulunmaz).
  **"Kaldığın yer" özelliği YOK (KARAR 28 Tem 2026 — kaldırıldı):** kaydırma
  konumu okunan yerin güvenilir göstergesi değil; çocuk metni okumadan sayfayı
  kaydırıp çıkabiliyor. Bölüm her açılışta baştan başlar. Yeniden ÖNERME.
  Üretim rotası `/reader/[chapterId]` **28 Tem 2026'da AtlasScrollReader'a
  geçti**; sayfalı okuyucu (`AtlasReader`, `sayfalar.ts`, sayfa bileşenleri ve
  `/tasarim/okuma-yeni` · `/tasarim/okuma-kaydirmali` önizlemeleri)
  **30 Tem 2026'da silindi**. `src/components/reader/` içinde artık yalnız
  `AtlasScrollReader` + `AdimCubugu` + `RozetKutlamasi` + `akis.ts` + `Konfeti`
  vardır; sayfa metaforuna dönüş ÖNERİLMEZ.
- **"Bugüne Taşı" görevleri KOŞULLUDUR** — her bölümde değil (kitabın yaklaşık
  %40–50'si; editoryal hedef, teknik sınır olarak KODLANMAZ). Gönüllüdür: "Görevi Listeme
  Ekle / Şimdilik Değil". İlerleme/rozet/madalya ŞARTI DEĞİLDİR; göreve ayrı
  ödül/puan YOK. Kalıcı durum (Tamamlandı/Tamamlanmadı) Faz 6.1'de yeni tabloyla
  gelir (`user_progress`'e sıkıştırılmaz). Görev meta alanları: ID, ad, kategori,
  açıklama, süre, ölçüt, (varsa) güvenlik notu.
- **Değişken veli özeti (REVİZE 20 Eki 2026 — S5 kuruldu):** kitap sonu veli
  özeti, çocuğun kayıtlı ilk "Sen Olsaydın" seçimlerinin oranına göre
  `high`/`mixed`/`low` varyantından seçilir (≥%70 high, %40-70 mixed, <%40
  low). **Kayıt yoksa (ya da bölümlerin yarısından azında kayıt varsa) özet
  paragrafı GÖSTERİLMEZ** — eski "cevap yoksa mixed" kuralı kalktı. Metinler
  içerik verisinden gelir; kod yalnız oranı hesaplayıp varyant seçer. Veli tek
  tek seçimleri ve oranı görmez; çocuk ekranında puan/oran yok. Kayıt
  `sen_olsaydin_secimleri` (ilk seçim kalır, değiştirilemez). Oturum içi seçim
  tutma ("Seçimini Karşılaştır") ayrıdır.
- **Tanık Sayfası:** okuma akışına giren el yazısı/defter görünümlü sayfa tipi
  (kullanılan kitaplarda 2-3 kez; her kitapta olmayabilir). Alanlar: witnessName,
  witnessLabel, body, isFictional.

---

## GÜVENLİK (Bölüm 8, Faz 7 — 19 Eki 2026; PROJE-MODELI 3.11)
- **Çocuk hesabı yoktur.** Çocuk verisine yalnız velinin oturumu
  (`veli_id = auth.uid()`) ya da o çocuğa bağlanmış cihaz (Supabase anonim
  oturumu + `cihaz_baglantilari`) erişir. Ortak cihazda giriş "Kim okuyor?"
  (`/kim-okuyor`), kendi cihazında eşleme kodu (`/cihaz-bagla`).
- **Herkese açık anahtarla çalışan açık RLS kuralı YAZMA.** Çocuk verisi tutan
  her yeni tablo veli + bağlı cihaz desenini izler. Gizli değerler (şifre
  özetleri, kodlar) kuralı olmayan tablolarda durur, yalnız `SECURITY DEFINER`
  fonksiyonlar okur. Anonim oturum veli işlemi yapamaz.
- Profil fotoğrafı kapalı kovadadır; `CocukAvatari` imzalı adres üretir.
  Fotoğrafı `getPublicUrl` ile gösterme.
- Çocuk ekranları `src/lib/child/cocukOturumu.ts` korumasından geçer (profil
  şifresi, 30 dk zaman aşımı, bağlı cihaz); yeni çocuk ekranı eklerken bu
  korumayı kullan. Veli paneli `VeliKapisi` ile korunur.
- **Çocuk modu görünmeden açılmaz (REVİZE 19 Eki 2026):** panelden çocuk
  ekranına geçiş `useCocukEkraniGecisi` ile yapılır; cihaz çocuk modunda
  değilse "Bu cihazı çocuğunuz kullanacak mı?" sorulur (Evet → veli PIN'i +
  çocuk modu + "Kim okuyor?"; Hayır → göz atma, kilit yok). Panelde çocuk
  ekranına yeni bir giriş eklerken `cocukEkraninaGec`'i doğrudan çağırma.
- **Satın alma (Faz 7, 3. adım — 20 Eki 2026; PROJE-MODELI Bölüm 8):** ödeme
  sisteminden bağımsız çekirdek `src/lib/odeme/sunucu.ts` (`siparisiIsle`);
  Shopier bildirimi yalnız doğrulayıp onu çağırır, elden satış `/yonetim`'den
  aynı çekirdeği kullanır. Şifre üretme/gönderme/kayda yazma YOK: veli
  `/sifre-belirle` bağlantısıyla şifresini kendisi koyar; "Şifremi unuttum"
  `/sifremi-unuttum`. E-posta metinleri `src/lib/odeme/epostaSablonlari.ts`
  (önizleme `/tasarim/epostalar`). E-postaları `toLowerCase()` ile karşılaştır,
  `tr-TR` ile değil. Yeni ödeme kaynağı (iyzico/PayTR) yalnız ince katman ekler.
- `.env.local` (Supabase anahtarları) asla commit edilmez.

---

## ÇALIŞMA DİSİPLİNİ (Bölüm 9)
- Her faz mobil + tablet + masaüstü ile birlikte biter (responsive ayrı faz değil).
- Faz sonunda çalışan sistem bozulmaz; büyük değişimde eski ekran, yenisi bitene
  kadar silinmez.
- **Yapılmamış özellik landing page'de tanıtılmaz.**

---

## YENİ KİTAP EKLERKEN HIZLI KONTROL
- [ ] **Rozet adları `ROZET-MATRISI.md` §2 diziniyle karşılaştırıldı — çakışma yok**
      (çakışma varsa aktarım YAPILMAZ, önce ad değişikliği sorulur)
- [ ] **Etkileşimli kelimeler `SOZLUKCE-SICILI.md` ile karşılaştırıldı**; sicilde
      olan terim düz `text` olarak aktarıldı, ikinci kez kutulanmadı
- [ ] Bölüm sayısı `KITAP-KATALOGU-VE-URETIM-PLANI.md`'deki hedefle aynı
- [ ] Doldurulmuş içerik `src/data/books.ts` formatına eklendi
- [ ] **Final testi soruları `src/data/quizzes.ts`'e eklendi ve `quizConfig`'e
      kitap anahtarı tanımlandı** (unutulmaya en açık adım)
- [ ] Bölüm sayısı = rozet sayısı = final testi soru sayısı; **N. soru N. bölümden**
      (final sonucundaki "Tekrar bakmak istersen" bağlantısı sıraya dayanır)
- [ ] Her bölümde hikâye iki parça (1. Kısım + Devam) ve Sen Olsaydın karar noktasında; her şık için ayrı Seçimini Karşılaştır metni var
- [ ] Bugüne Taşı YALNIZCA görev tanımlı bölümlerde; meta alanları tam; her bölümde görev ZORUNLU DEĞİL
- [ ] Madalya adı "{Kitap adı} Yolculuk Madalyası"
- [ ] `atlasCatalog.ts`'te `availability`, `description` (keşif açıklaması) ve
      **`yayinTarihi`** (YYYY-AA-GG) güncellendi. Kitap bu alanlarla ana ekrandaki
      rotaya kendiliğinden girer; harita kodu elle değiştirilmez (3.10.1). Yayın
      tarihi "Yeni" etiketini ve tek seferlik duyuruyu açar
- [ ] **Supabase `books` satırı eklendi** — `supabase/schema.sql`'e insert yazıldı
      VE canlı veritabanında çalıştırıldı (`isim` katalog başlığıyla eşleşir,
      `toplam_bolum` = bölüm sayısı). Satır yoksa okuma ekranı "kaydı bulunamadı"
      der; rozet ve madalya kaydedilmez. `/tasarim/*` önizlemeleri Supabase'e
      yazmadığı için bu eksik orada GÖRÜNMEZ (Hz. Musa, 15 Eki 2026)
- [ ] Türkçe karakterler doğru render oluyor
- [ ] İçerik hiçbir yerde peygamber/halife/sahabe yüzü tarif etmiyor
- [ ] **`ROZET-MATRISI.md` güncellendi** (§2 dizinine adlar, §4 satırları, §5 sayaçlar)
- [ ] **`SOZLUKCE-SICILI.md` güncellendi** (yeni terimler, çözülen çakışmalar)
- [ ] **Görsel ve ses yer tutucuları açıldı:** `npm run gorsel-yertutucu -- {bookKey}`
      (KARAR 11 Ağu 2026 — Hasan; ses 12 Eki 2026). Bölümdeki her sahne AYRI
      `.jpg`, rozet ve madalya AYRI adlarla 512×512 şeffaf `.png`, her bölüme bir
      `hz-{bookKey}-bolum-{n}.mp3`. Hasan gerçek dosyayı aynı adla üzerine yazar.
      Ayrıntı: `ICERIK-GORSEL-SICILI.md` §6.1, PROJE-MODELI 6.5
- [ ] `ICERIK-GORSEL-SICILI.md`'ye kitabın görsel tablosu ve sayaçları eklendi

## BÖLGE METİNLERİ — TEK KAYNAK
> **Arayüzde artık kullanılmıyor (Faz C, 12 Eki 2026):** bölgeler ve bölge
> açıklamaları ekranda gösterilmez (PROJE-MODELI 3.10.1). Bölgeler yalnız katalog
> belgesinde editoryal gruplama olarak kalır; aşağıdaki kural yalnız katalog ile
> `atlasCatalog.ts` verisinin tutarlılığı içindir.

Keşif bölgelerinin çocuk açıklaması iki yerde yazılıdır:
`KITAP-KATALOGU-VE-URETIM-PLANI.md` (editoryal kaynak) ve
`src/data/atlasCatalog.ts` (`AtlasRegion.description`). **İkisi birebir aynı
tutulur.** Metin değişecekse önce katalog belgesi, sonra kod güncellenir;
asla tek tarafta değiştirilmez.
