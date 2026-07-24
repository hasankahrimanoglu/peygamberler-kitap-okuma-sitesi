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
- **KITAP-ICERIK-SABLONU.md** — ⛔ **GEÇERSİZ / ARŞİV.** Yerini yukarıdaki brif
  aldı. Yeni işte kullanma, referans verme.

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
- **Rozet görsel anahtarı `books.ts`'te alan DEĞİLDİR.** `src/lib/derive.ts`
  içindeki `rozetIconKey(bookKey, no)` ile `{bookKey}-bolum-{no}` olarak türetilir
  → `public/rozetler/rozet-{bookKey}-bolum-{no}.png`. Bölümlere `rozetIcon`
  alanı ekleme.
- Supabase tabloları: `profiles`, `parent_subscriptions`, `books`, `user_progress`.
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
  gibi soyut ifade yasak).
- **Ölçü standartları (3.5):** buton ≥48px, dokunma alanı ≥44×44px, gövde metni
  ≥16px. Mobilde metin+görsel yan yana KONMAZ (tek sütun).
- **Tasvir yasağı:** peygamber/halife/sahabe yüzü/bedeni hiçbir görselde çizilmez
  (silüet bile değil). Cami-kubbe-minare gibi dönemle uyumsuz dekor da kullanılmaz.
- **Türkçe karakterler** (ş, ğ, ı, İ, ç, ö, ü, â) — font, veri, UI'da test et.
- **Rapor dili gözlem bildirir**, kesin hüküm vermez ("...temaları öne çıktı"),
  çocuğu derecelendirmez.

---

## GÖRSEL VARLIKLAR (Bölüm 6)
- Kod görseli **iconKey üzerinden** bulur; placeholder'la yazılır, Hasan aynı
  isimle gerçek dosyayı klasöre atınca kod değişmeden yayına girer.
- Klasör/isim sabit: `public/rozetler/rozet-{iconKey}.png`,
  `public/kapaklar/kapak-{bookKey}.png`, `public/madalyalar/`, `public/unvanlar/`,
  `public/avatarlar/`. Dosya adları küçük harf, Türkçe karaktersiz, tireli.
- **Rozet = bölüm başına özel görsel** (Karar: Seçenek B). Anahtar veriye yazılmaz,
  `rozetIconKey(bookKey, no)` ile türetilir (`adem-bolum-1` gibi). Tek şablon
  ailesi; kilitli/kazanılmış durum ayrı görsel değil, CSS ile soluklaştırma.
  Rozet adlarının set genelinde tekilliği **ROZET-MATRISI.md** ile yönetilir.
- **"Sen Olsaydın" salt metindir** (Karar 11 Tem 2026) — seçeneklerde görsel yok.

---

## YENİ DAVRANIŞSAL ÖZELLİKLER (kitap metninden ayrı, ayrı prompt gelir)
- **Hedef yaş: 8–11.** Tüm içerik ve arayüz dili bu aralığa göre.
- **Bölüm içi akış (KARAR 15 Tem 2026 — Faz 6.1'de uygulanacak, onaysız başlama):**
  Hikâye — 1. Kısım → Sen Olsaydın → Hikâye Devam Ediyor → Seçimini Karşılaştır →
  Ne Öğrendik (3 madde) → (varsa) Bugüne Taşı → İllüstrasyon → Rozet Kapısı.
  Kurallar: seçim hikâyeyi DALLANDIRMAZ; doğru cevap seçim anında AÇIKLANMAZ;
  bölüm sonunda YALNIZCA seçilen şıkkın karşılaştırma metni gösterilir; seçim
  aynı okuma oturumunda tutulur (kalıcı kayıt S5'tir, karıştırma).
- **"Bugüne Taşı" görevleri KOŞULLUDUR** — her bölümde değil (kitabın yaklaşık
  %40–50'si; editoryal hedef, teknik sınır olarak KODLANMAZ). Gönüllüdür: "Görevi Listeme
  Ekle / Şimdilik Değil". İlerleme/rozet/madalya ŞARTI DEĞİLDİR; göreve ayrı
  ödül/puan YOK. Kalıcı durum (Tamamlandı/Tamamlanmadı) Faz 6.1'de yeni tabloyla
  gelir (`user_progress`'e sıkıştırılmaz). Görev meta alanları: ID, ad, kategori,
  açıklama, süre, ölçüt, (varsa) güvenlik notu.
- **Değişken veli özeti:** veli panelindeki özet, çocuğun "Sen Olsaydın"
  performansına göre `high`/`mixed`/`low` varyantından seçilir (≥%70 high,
  %40-70 mixed, <%40 low; hiç cevap yoksa mixed). Metinler içerik verisinden
  gelir; kod yalnızca oranı hesaplayıp varyant seçer. *(Not: "Sen Olsaydın"
  cevaplarının KALICI kaydı PROJE-MODELI'de S5 olarak sonraya bırakılmış — bu
  özellik o kayıt altyapısına bağlıdır, önce onu doğrula. Oturum içi seçim
  tutma S5 DEĞİLDİR.)*
- **Tanık Sayfası:** okuma akışına giren el yazısı/defter görünümlü sayfa tipi
  (kullanılan kitaplarda 2-3 kez; her kitapta olmayabilir). Alanlar: witnessName,
  witnessLabel, body, isFictional.

---

## GÜVENLİK — ŞİMDİ DOKUNMA (Bölüm 8, Faz 7)
`child_password` düz metin ve gevşek RLS gibi bilinen açıklar var ama bunlar
**kendi fazında** ele alınacak. İstenmedikçe auth/RLS/şifre akışına dokunma.
`.env.local` (Supabase anahtarları) asla commit edilmez.

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
- [ ] Bölüm sayısı = rozet sayısı = final testi soru sayısı
- [ ] Her bölümde hikâye iki parça (1. Kısım + Devam) ve Sen Olsaydın karar noktasında; her şık için ayrı Seçimini Karşılaştır metni var
- [ ] Bugüne Taşı YALNIZCA görev tanımlı bölümlerde; meta alanları tam; her bölümde görev ZORUNLU DEĞİL
- [ ] Madalya adı "{Kitap adı} Yolculuk Madalyası"
- [ ] `atlasCatalog.ts`'te `availability` ve `description` (keşif açıklaması)
      güncellendi
- [ ] Türkçe karakterler doğru render oluyor
- [ ] İçerik hiçbir yerde peygamber/halife/sahabe yüzü tarif etmiyor
- [ ] **`ROZET-MATRISI.md` güncellendi** (§2 dizinine adlar, §4 satırları, §5 sayaçlar)
- [ ] **`SOZLUKCE-SICILI.md` güncellendi** (yeni terimler, çözülen çakışmalar)

## BÖLGE METİNLERİ — TEK KAYNAK
Keşif bölgelerinin çocuk açıklaması iki yerde yazılıdır:
`KITAP-KATALOGU-VE-URETIM-PLANI.md` (editoryal kaynak) ve
`src/data/atlasCatalog.ts` (`AtlasRegion.description`). **İkisi birebir aynı
tutulur.** Metin değişecekse önce katalog belgesi, sonra kod güncellenir;
asla tek tarafta değiştirilmez.
