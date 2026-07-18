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

Hedef içerik hacmi: **12–20 kitap**, kitap başına ortalama **8–10 bölüm**.
Tüm kurgular bu ölçeğe göre tasarlanır (ör. veli raporu 20 kitapta da
okunabilir kalmalı).

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

### Unvan eşikleri (öneri — içerik büyüdükçe güncellenebilir)

| Tamamlanan kitap | Unvan |
|---|---|
| 0 | Yeni Gezgin |
| 1 | Yol Kaşifi |
| 3 | Değer Toplayıcısı |
| 6 | Yol Arkadaşı |
| 10 | Bilge Yolcu |
| 15 | Hikâye Ustası |

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

**Çocuk tarafı (macera, gece gökyüzü):**
- Zemin: koyu lacivert (#0E1A34 civarı) + yıldız dokusu
- Kart zemini: lacivertin bir ton açığı, altın konturlu
- Okuma yüzeyi: krem (#FBF6E9) — uzun metin daima açık zemin üzerinde
- Vurgu: altın (#E8B84B) ve yeşil (#34A06B)

Kesin renk değerleri Faz 1'de `chatgpt-tasarim/` görsellerinden örneklenip
Tailwind config'e token olarak yazılır. Renkler tek kaynaktan yönetilir;
sayfa içine gömülü hex değeri bırakılmaz.

### 3.2 Ortak kurallar (iki dünyada aynı)

- Aynı köşe yuvarlaklığı ölçeği, aynı ikon ailesi, aynı buton yüksekliği,
  aynı gölge mantığı, aynı rozet/madalya çizim stili.
- Başlıklarda yuvarlak hatlı font; paragraf ve hikâye metninde okunabilirliği
  yüksek sade bir font. Her yerde dekoratif font KULLANILMAZ.
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

### 3.5 Dokunma ve ölçü standartları

- Buton yüksekliği ≥ 48px, dokunma alanı ≥ 44×44px
- Gövde metni ≥ 16px; mobil yatay boşluk 16px, tablet 24–32px
- Mobilde metin ve görsel yan yana KONMAZ; tek sütun.

### 3.6 Masalsı Keşif Atlası yönü (ONAY — 16 Temmuz 2026)

Çocuk tarafının harita, bölüm rotası ve Hz. Âdem okuma ekranında ortak görsel
yön **“Masalsı Keşif Atlası”**dır:

- Harita, büyük dashboard kartları yerine kıvrımlı yol üzerindeki keşif
  duraklarından oluşur; katmanlı gece göğü, dağ, nehir, bitki ve pusula
  ayrıntıları responsive CSS ile kurulur.
- Tablet yatayda harita baskın alanda, seçili kitap bilgisi sağ paneldedir;
  tablet dikey ve mobilde alanlar alt alta geçer.
- Kitap detayında bölümler, aynı atlas dünyasında kıvrımlı bölüm rotası olarak
  gösterilir; kilit koşulları somut yazılır.
- Hz. Âdem okuma ekranında üst bar ve okuma yüzeyi aynı genişlikte hizalanır.
  Tablet yatay/masaüstünde metin ve illüstrasyon yan yana; dikey cihazlarda
  illüstrasyon üstte, metin alttadır.
- Hz. Âdem Büyük Final Testi de aynı atlas dünyasında gösterilir: ortak keşif
  üst barı, katmanlı gece/doğa zemini ve krem soru yüzeyi kullanılır. Seçenekler
  tek sütunda kalır; onay/devam eylemleri yeşil, sonucu görme ve ilk madalya
  kutlaması altın semantiğini korur. Alıştırma girişi ve sonucu açıkça
  "Alıştırma" olarak ayrışır; kayıtlı final sonucu, madalya, ilerleme ve
  `updated_at` davranışı görsel değişiklikten etkilenmez.
- “Sen Olsaydın?” sorusu ile seçenekler alt alta yerleşir. Seçenek grubu geniş
  ekranlarda metni gereksiz boşlukla çevrelemeyecek biçimde en fazla 620px'tir;
  dar ekranlarda kullanılabilir genişliğe uyum sağlar.
- Production rotalarında “Tasarım Önizlemesi” etiketi kullanılmaz. Önizleme
  rotaları tasarım karşılaştırması için ayrı kalabilir.
- Bu entegrasyonun içerik referansı yalnızca Hz. Âdem'dir. Diğer kitapların
  mevcut detay, okuma ve final testi düzenleri, içerikleri güncellenene kadar
  korunur.

---

## 4. Özellik Kararları

### 4.1 EKLENECEK

| # | Özellik | Açıklama | Veri maliyeti |
|---|---|---|---|
| 1 | Terminoloji standardizasyonu | Tüm ekran metinleri rozet/madalya/unvan sözlüğüne çekilir | Yok (adlandırma) |
| 2 | Tasarım sistemi | Bölüm 3'teki tokenlar + ortak bileşenler (Card, Button, Badge, ProgressBar) | Yok |
| 3 | Veli paneli yeniden kurgusu | Sol menülü (mobilde alt menülü) çok sayfalı yapı: Ana Sayfa, Kütüphane, Ödüller, Gelişim Raporları | Yok — mevcut veriden türetilir |
| 4 | Veli ana sayfası | Çocuk kartları: avatar, unvan, okunan kitap, ilerleme, son rozet + **çocuğun güncel "Bugüne Taşı" görevi (tek satır, en güncel görev — veli kartı geçmiş görev listesi GÖSTERMEZ; çocuğun tam görev listesi kendi "Görevlerim" ekranındadır, bkz. madde 17)** + "Okumaya Devam Et / Gelişim Raporu / Profili Düzenle". Profil ekleme formu ayrı ekrana taşınır; "Şifre Değiştir" sağ üst hesap menüsüne girer | Yok |
| 5 | Kütüphane sayfası (veli) | Tüm kitaplar, çocuk/durum filtresi, arama, kilitli kitap açıklamaları | Yok — books + user_progress |
| 6 | Ödüller sayfası (veli) | Rozetler / Madalyalar / Unvanlar sekmeleri, rozet detay paneli | Yok — türetilir |
| 7 | Gelişim raporu: modal → sekmeli tam sayfa | Genel Bakış, Kitaplar, Ödüller, **Görevler**, Sohbet Önerileri sekmeleri; mobilde tam ekran | Yok (Görevler `profile_tasks`'tan) |
| 8 | Çocuk kitap detayı: modal → tam ekran sayfa | Bölüm listesi, kazanılacak rozet, final testi kartı (kilitli/açık), çift scrollbar sorunu biter | Yok |
| 9 | Harita durum dili | 3.4'teki durum tablosu uygulanır; "Maceraya Başla" tutarsızlığı düzelir | Yok |
| 10 | Unvan sistemi | Bölüm 2'deki eşik tablosu; `profiles.unvan` alanı zaten mevcut | Çok düşük |
| 11 | Sistem değerlendirme dili | Rapor metinleri kesin hüküm değil gözlem bildirir ("...temaları öne çıktı") | Yok (metin) |
| 12 | Final testi dili | Çocuk ekranında pozitif dil ("5 sorunun 5'ini doğru cevapladın"); veli ekranında sayısal (5 Doğru / 0 Yanlış) | Yok |
| 13 | Final testi geçme ve tekrar mantığı | **Testi ilk kez tamamlamak** madalyayı kazandırır; doğru sayısı şartı YOK. Test bir engel değil, hatırlama+kutlama anıdır. Çocuk kaç doğru yaparsa yapsın testi bitirince madalyayı alır ve sonraki kitap açılır. Doğru sayısı yalnızca veli panelinde sayısal görünür; çocuk ekranında yanlışlar utandırıcı vurgulanmaz. İlk tamamlanma kaydı son sorunun bitirilmesiyle başlar; sonuç ekranındaki dönüş eylemi kayıt başlatmaz. Kayıt anında kitabın bütün bölümlerinin tamamlandığı doğrulanır; doğrudan quiz URL'sine gitmek eksik bölüm ilerlemesini `%100` veya `bitti_mi = true` yapmaz. Madalya kutlaması ve yeni kitabın açıldığı mesajı yalnız kalıcı kayıt başarıyla kesinleştikten sonra gösterilir. Kayıt sürerken bekleme durumu, hata hâlinde aynı cevaplar korunarak **Tekrar Dene** gösterilir; başarı olmadan haritadaki final kutlamasına geçilmez. Yazma idempotenttir: `bitti_mi = true` olan kaydın ilk final sonucu, madalyası ve `updated_at` alanı yeniden yazılmaz. Tamamlanan final yeniden açılabilir; bu giriş açıkça **Alıştırma** olarak gösterilir ve `user_progress`, kayıtlı final sonucu, madalya veya `updated_at` alanlarını değiştirmez. Alıştırma modu yalnız kayıtlı `bitti_mi = true` durumundan türetilir; URL parametresi tek başına alıştırma yetkisi vermez. ("Derecelendirmeme" felsefesinin gereği.) | Yok |
| 14 | Kazanımlarım ekranı (çocuk) | Çocuğun kendi rozet/madalya/ünvan koleksiyonunu gördüğü vitrin (`/kazanimlarim`). Oyunlaştırmanın çocuk tarafındaki karşılığı; başarı görünür olur | Yok — türetilir |
| 15 | Kelime Defterim ekranı (çocuk) | Çocuğun okuduğu kitaplardaki Kelime Kutusu kelimeleri, anlamlarıyla, aranabilir liste (`/kelime-defterim`). Öğrenilen kelimeler tek yerde birikir | Yok — books.ts'ten türetilir |
| 16 | Bölüm içi karar akışı (KARAR 15 Tem 2026) | "Sen Olsaydın" bağımsız bir bölüm sonu sorusu DEĞİLDİR; hikâyenin karar/doruk noktasına yerleşir. Akış: **Hikâye — 1. Kısım → Sen Olsaydın → Hikâye Devam Ediyor → Seçimini Karşılaştır**. Seçim hikâyeyi DALLANDIRMAZ (tek hikâye); doğru cevap seçim anında AÇIKLANMAZ; hikâye devamı bittikten sonra yalnızca **seçilen şıkkın** karşılaştırma metni gösterilir (her şık için ayrı metin içerikte hazır). Seçim aynı okuma oturumu içinde tutulur (kalıcı kayıt ayrı iştir — bkz. S5) | Yok — books.ts + oturum içi state |
| 17 | "Bugüne Taşı" görev takibi (KARAR 15 Tem 2026) | Görev KOŞULLUDUR (her bölümde değil; 8 bölümde ~3-4 görev editoryal hedeftir, teknik sınır olarak kodlanmaz) ve GÖNÜLLÜDÜR. Çocuk görevde "Görevi Listeme Ekle / Şimdilik Değil" seçer; eklediği görevleri "Görevlerim" ekranında görür, "Görevi Tamamladım" ile işaretler; Tamamlandı/Tamamlanmadı durumu KALICI saklanır (öz bildirim yeterli, kanıt istenmez). Görev; bölüm rozetinin, madalyanın, sonraki kitabın veya ilerlemenin ŞARTI DEĞİLDİR. Son tarih, ceza, seri YOK | Yeni tablo (bkz. 7.3 — Faz 6.1) |
| 18 | Veli tarafında görev görünürlüğü (KARAR 15 Tem 2026 akşam) | Veli, çocuğun aldığı TÜM görevleri ve durumlarını Gelişim Raporu'ndaki **Görevler sekmesinden** görür (Alındı / Tamamlandı, hangi kitap-bölüm, tarih). Ana Sayfa kartı ise yalnız EN GÜNCEL tek görevi durum çipiyle ("Alındı"/"Tamamlandı") gösterir — tam liste değil. Veli görevleri yalnız GÖRÜR, düzenlemez/tamamlamaz (öz bildirim çocuğundur). Rapor dili gözlem bildirir; tamamlanmamış görev eksiklik/başarısızlık olarak sunulmaz | Yok — `profile_tasks`'tan türetilir |

### 4.2 SONRAYA BIRAKILDI (ayrı fazlarda)

| # | Özellik | Neden sonra | Gerektirdiği |
|---|---|---|---|
| S1 | Son okuma hareketleri (aktivite akışı) | Yeni event tablosu ister; ilk sürümde `user_progress.updated_at`'ten "son aktivite" özeti gösterilir | `activity_events` tablosu |
| S2 | Ses çubuğu geliştirmeleri (hız, 10sn ileri/geri, kaldığı yerden devam) | Pozisyon kaydı ister | progress'e ses pozisyonu alanı |
| S3 | Hesap aktivasyon akışı (şifre maili yerine tek kullanımlık bağlantı) | Çalışan Shopier akışını bozmadan, kendi fazında | E-posta şablonu + token akışı |
| S4 | Çocuk girişi PIN'e geçiş + parola güvenliği | S3 ile birlikte ele alınır (bkz. Bölüm 8) | Şema + RLS değişikliği |
| S5 | "Sen Olsaydın" cevaplarının **kalıcı** kaydı (geçmiş cevapların saklanması + veli raporunda `high/mixed/low` özet seçimi) | Değerli ama zorunlu değil. **İki ihtiyaç karıştırılmamalı:** seçimin AYNI OKUMA OTURUMUNDA tutulup bölüm sonunda "Seçimini Karşılaştır"da kullanılması S5 DEĞİLDİR — okuma akışının temel parçasıdır (4.1/16, Faz 6.1; oturum içi state, tablo gerektirmez). S5 yalnızca veritabanına kalıcı kayıttır | Yeni tablo |

> **Not (değişken veli özeti):** İçerik şablonunda veli özeti üç varyant olarak
> yazılır (`high` / `mixed` / `low`) ve çocuğun "Sen Olsaydın" performansına göre
> seçilmesi hedeflenir. Bu seçim S5'e (cevap kaydı) bağlıdır; **S5 gelene kadar
> sistem varsayılan olarak `mixed` varyantını gösterir.** Varyantlar içerikte hazır
> bekler, S5 ile otomatik devreye girer.

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
| `/map` | Keşif Dünyası (harita) | Masaüstü/tablet: hafif zikzak dikey yol; mobil: düz dikey yol. Aktif kitap en büyük kart |
| `/kitap/[bookId]` | Kitap Yolculuğu (detay) | YENİ — modal yerine tam sayfa. Bölüm listesi + final testi kartı |
| `/reader/[chapterId]` | Okuma akışı | Mevcut rota korunur. Sayfa tipleri: hikâye (**1. Kısım + Hikâye Devam Ediyor**), **Tanık Sayfası**, Sen Olsaydın, **Seçimini Karşılaştır**, Ne Öğrendik, Bugüne Taşı (**varsa**), Rozet Kapısı. Bölüm içi sıra için aşağıdaki "Bölüm içi akış" kararına bak |
| `/quiz/[bookId]` | Büyük Final Testi | Mevcut rota korunur |
| `/kazanimlarim` | Kazanımlarım (çocuk) | YENİ — çocuğun topladığı rozetler, madalyalar ve ünvanı gördüğü vitrin ekranı. Koleksiyon/başarı hissi verir; veri türetilir (yeni tablo yok) |
| `/kelime-defterim` | Kelime Defterim (çocuk) | YENİ — çocuğun okuduğu kitaplardaki Kelime Kutusu kelimeleri, anlamlarıyla, aranabilir liste. Kelimeler `books.ts`'te zaten var; çocuğun gördükleri toplanıp gösterilir |
| `/gorevlerim` | Görevlerim (çocuk) | PLANLANDI (Faz 6.1 — onaysız başlamaz) — çocuğun profiline eklediği "Bugüne Taşı" görevleri: görev adı, geldiği kitap+bölüm, Tamamlandı/Tamamlanmadı durumu, "Görevi Tamamladım" eylemi, görev ayrıntısı (varsa güvenlik notu görünür). **Rota adı ve giriş noktası ONAYLANDI (15 Tem 2026):** rota `/gorevlerim`; giriş, haritadaki Kazanımlarım / Kelime Defterim buton grubuna eklenen üçüncü buton |

**Bölüm içi akış (KARAR 15 Tem 2026):** Her bölüm şu sırayla okunur:
1. **Hikâye — 1. Kısım** (karar/gerilim noktasında biter)
2. **Sen Olsaydın?** (her bölümde; soru hikâyenin doğal akışından doğar)
3. **Hikâye Devam Ediyor** (kararın doğurabileceği sonuç hikâyede görülür)
4. **Seçimini Karşılaştır** (yalnızca çocuğun seçtiği şıkka ait metin gösterilir)
5. **Ne Öğrendik** (üç kısa madde)
6. **Bugüne Taşı** (yalnızca görev tanımlanan bölümlerde)
7. **İllüstrasyon** ve **Rozet Kapısı** (mevcut sistemdeki yeriyle)

Kuralları: seçim hikâyeyi DALLANDIRMAZ; doğru cevap seçim anında AÇIKLANMAZ;
seçim aynı okuma oturumunda tutulur (kalıcı kayıt S5'tir). **Sayfa yenilenirse
seçim korunur (KARAR 15 Tem 2026 — `sessionStorage`; tablo gerektirmez),** bölüm
ilerlemesinin yenilemede korunması davranışıyla tutarlı olması için. Tanık
Sayfası, kullanılan kitaplarda hikâye sayfalarının içinde kalmaya devam eder.

Okuma ekranı düzeni:
- **Tablet yatay:** solda metin, sağda illüstrasyon; üstte ses çubuğu; altta Önceki/Sonraki.
- **Tablet dikey / mobil:** üstte görsel, altta metin, kelime kutusu metnin altında; ses çubuğu üstte kompakt sabit.
- Sayfa göstergesi tek formatta: **"Sayfa 3 / 12"**. Ses süresi ayrı: "01:18 / 06:45".
- Alt navigasyonda yalnızca Önceki/Sonraki; "Sayfayı Çevir" tekrarı kaldırılır.
  Ortadaki büyük buton yalnızca özel anlarda: Maceraya Başla / Kararını Onayla /
  Bölümü Bitir / Final Testine Geç.
- **Tanık Sayfası:** okuma akışına giren özel bir sayfa tipi; olayları hikâyedeki
  bir çocuk/genç karakterin günlüğünden anlatır (el yazısı font + defter görünümü).
  **Tamamen opsiyoneldir** — kullanılan kitaplarda 2-3 kez, bölümün doruk
  noktasından sonra; her kitapta bulunmak zorunda değildir (Hz. Âdem'de yoktur). Veri alanları: `witnessName`,
  `witnessLabel`, `body`, `isFictional` (kurgusal karakterde sayfa altına "Bu
  sayfadaki çocuk hayalîdir; anlattığı olaylar gerçektir." notu gösterilir).
- **Sesli anlatım (KARAR — Model A):** Play'e basıldığında **bölümün tamamı**
  baştan sona kesintisiz çalar; ses, sayfa kaydırmasına bağlı DEĞİLDİR (çocuk
  dinlerken sayfaları kendi takip eder veya sadece dinler). Bu, "telefon =
  dinleyerek devam etme cihazı" kararıyla (Bölüm 1) uyumludur. "Kaldığı yerden
  devam" (ses pozisyonu kaydı) S2'de eklenir; Model A bu özellikle anlamlı çalışır.

### 5.2 Veli tarafı

| Rota | Ekran | Not |
|---|---|---|
| `/dashboard` | Ana Sayfa (çocuk kartları + kısa bakış) | Sekme yapısının merkezi |
| `/dashboard/kutuphane` | Kütüphane | Filtre: çocuk + durum; arama |
| `/dashboard/oduller` | Ödüller | Rozetler / Madalyalar / Unvanlar sekmeleri |
| `/dashboard/rapor/[profileId]` | Gelişim Raporu | Tam sayfa, sekmeli: Genel Bakış · Kitaplar · Ödüller · **Görevler** · Sohbet Önerileri |

Navigasyon:
- **Masaüstü/tablet yatay:** sol dikey menü (tablette daraltılabilir).
- **Mobil:** alt sabit navigasyon, en fazla 5 sekme: Ana Sayfa, Kütüphane,
  Ödüller, Raporlar, Hesap.
- Sağ üst hesap menüsü: Hesap Bilgileri, Şifre Değiştir, Çıkış.

### 5.3 Ekran metni düzeltmeleri

- "Haritaya Gir" → **"Okumaya Devam Et"** (ana aksiyon) + "Keşif Haritasını Aç"
- "İstatistikler" → **"Gelişim Raporu"**
- Avatar seçimi açılır liste değil **görsel kartlarla** yapılır.

---

## 6. Görsel Varlık Sistemi

### 6.1 Klasör ve isimlendirme (SABİT)

```
public/
  avatarlar/    avatar-{key}.png          ör. avatar-erkek-1.png, avatar-kiz-2.png
  kapaklar/     kapak-{bookKey}.png       ör. kapak-adem.png, kapak-nuh.png
  rozetler/     rozet-{iconKey}.png       ör. rozet-sabir.png, rozet-bilgi.png
  madalyalar/   madalya-{bookKey}.png     ör. madalya-adem.png
  unvanlar/     unvan-{key}.png           ör. unvan-yol-kasifi.png
  semboller/    sembol-{key}.png          "Sen Olsaydın" sabit seti (6 adet)
```

- Kod, görseli **iconKey üzerinden** bulur. `books.ts` içindeki her bölüme
  `rozetIcon` anahtarı eklenir.
- **KARAR (11 Temmuz 2026): Seçenek B** — her bölüme özel rozet görseli.
  iconKey bölüme özel yazılır: `adem-bolum-1`, `nuh-bolum-3` gibi.
  Hedef hacim: 12–20 kitap × 8–10 bölüm ≈ **150–200 rozet görseli**.
  Hepsi aynı şablon ailesinde üretilir (aynı çerçeve, aynı palet, değişen
  yalnızca iç sembol). Gerekirse ara çözüm: bazı bölümler değer havuzundan
  ortak sembol kullanabilir — sistem iconKey sayesinde ikisini de destekler.
- Dosya adı küçük harf, Türkçe karaktersiz, tire ile ayrılır.
- **Merkezî Rozet Matrisi:** Tüm serinin rozetleri tek bir tabloda planlanır
  (kolonlar: kitap · bölüm no · rozet adı · değer · rozetIcon). Bu tablo iki işi
  birden yönetir: (a) **rozet adları set genelinde tekildir** — aynı değer birden
  çok kitapta işlenirse her biri farklı ad + farklı nüansla gelir ("Sadakat
  Rozeti" / "Bekleyen Kalp Rozeti"), (b) 150–200 rozet görselinin üretim listesidir.
  İçerik şablonundaki "rozet adı" ve buradaki "rozetIcon" aynı satırda buluşur.
  Yeni kitap eklenirken bu matrise bakılır; matris yaşayan belgedir.

### 6.2 Teknik özellikler

| Varlık | Boyut | Format | Not |
|---|---|---|---|
| Rozet | 512×512 | PNG şeffaf | Altıgen çerçeve + iç sembol; tek stil ailesi |
| Madalya | 512×512 | PNG şeffaf | Madalyon + kurdele; kitap başına 1 |
| Unvan | 512×512 | PNG şeffaf | Arma/nişan stili, 6 adet |
| Avatar | 512×512 | PNG şeffaf | 8 adet (4 erkek + 4 kız çocuk illüstrasyonu, 3D stil ailesi) |
| Kapak | 600×900 (2:3) | PNG/JPG | Kitap başına 1; ChatGPT görsellerindeki süslü cilt dili |
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
- Kural: peygamber yüzü/bedeni tasvir edilmez; saygılı atmosfer.
- Her kitabın kendi görsel dünyası olur (Âdem: tabiat/bahçe/ışık; Nuh:
  gemi/yağmur/dağ; İbrahim: çöl/yıldızlı gök...). Cami-kubbe-minare gibi
  dönemle uyumsuz genel dini dekor kullanılmaz.

---

## 7. Veri Modeli

### 7.1 Mevcut yapı (değişmiyor)

- `profiles` — çocuk profilleri (veli_id, isim, avatar_tipi, unvan, child_username/password, profile_limit)
- `parent_subscriptions` — Shopier abonelikleri
- `books` — kitap meta (isim, sıra, toplam bölüm)
- `user_progress` — profil+kitap başına ilerleme (bölüm sayısı, %, bitti_mi, final skoru)
- İçerik (bölümler, metinler, sorular, rozet adları) `src/data/books.ts`
  içinde statik dosyada. **Bu fazlarda taşınmaz** — 20 kitaba kadar sorunsuz;
  ileride gerekirse Supabase'e taşıma ayrı proje olur.

### 7.2 Türetilen kavramlar (tablo GEREKTİRMEZ)

| Kavram | Nasıl türetilir |
|---|---|
| Bölüm rozeti kazanıldı mı | `tamamlanan_bolum_sayisi >= bölüm sırası` |
| Madalya kazanıldı mı | `bitti_mi = true` (final testi dahil) |
| Unvan | Tamamlanan kitap sayısı → Bölüm 2 eşik tablosu; sonuç `profiles.unvan`a yazılır |
| Kütüphane/Ödüller sayfaları | books + user_progress + books.ts birleşimi |
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

## 8. Güvenlik Notları (Faz 7'de ele alınacak — ŞİMDİ DOKUNULMUYOR)

1. `child_password` düz metin saklanıyor → PIN'e geçiş + hash.
2. `"Children can login with profile credentials"` RLS politikası, kimliği
   doğrulanmamış herkese `child_username/password` dolu satırları SELECT
   ettirebiliyor → giriş doğrulaması server-side API'ye alınmalı, politika
   daraltılmalı.
3. Veli hesabı: otomatik şifre maili yerine tek kullanımlık aktivasyon
   bağlantısı; velinin şifresini kendisinin belirlemesi.
4. Shopier webhook'una çift bildirim gelirse çift hesap oluşmamalı
   (`shopier_order_id unique` mevcut — davranış test edilmeli).
5. Giriş e-posta ile olmalı (yalnızca Gmail sınırı varsa kaldırılmalı);
   "e-postayı yeniden gönder" seçeneği eklenmeli.
6. Profil silmede ilerlemenin de silineceği açıkça yazılmalı; mümkünse
   önce "arşivle" seçeneği.

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
| **7** | Güvenlik/hesap akışı (Bölüm 8) | Aktivasyon bağlantısı + PIN |
| **8** | Landing page'in gerçek özelliklerle güncellenmesi | Pazarlama yüzü güncel |

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
> migration-profile-tasks.sql` — **Supabase'de manuel çalıştırılması bekliyor**);
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

## 11. İçerik Durumu

| Kitap | Durum |
|---|---|
| Hz. Âdem | ✅ Yeni içerik yazıldı ve **dini doğruluk onayı verildi (Hasan, 15 Tem 2026)** — **8 bölüm + Büyük Final Testi**. **Geçerli tek kaynak dosya: `kitap-icerikleri/KITAP-HZ-ADEM-ICERIK-final.md`** (eski `KITAP-HZ-ADEM-ICERIK.md` geçersizdir). Yeni bölüm akışıyla: iki parçalı hikâye + Seçimini Karşılaştır. Hâbil-Kâbil kıssası **Bölüm 7** olarak dahil — Mâide 5/27-31 merkezli, şiddet ayrıntısı gösterilmeden (kitaba özgü karar, genel kural değil). **4 koşullu "Bugüne Taşı" görevi** (Bölüm 2, 3, 5, 7). **`books.ts`'e + final testine + veli raporuna Faz 6.1'de aktarıldı (birebir).** |
| Hz. Nuh | Demo içerik (kalite iyi; gerçek kaynak kontrolüyle gözden geçirilecek; yeni bölüm akışına Faz 6.1 sonrası uyarlanacak) |
| Diğer kitaplar | İçerik yok; fazlar ilerlerken kitap kitap eklenecek |

İçerik yazım kuralları: Bahar Yayıncılık yazım kuralları esas alınır
(peygamber adlarında "(a.s.)" ilk geçişte; kaynak dışına taşan kesin ifade yok;
abartısız, sıcak, 8-11 yaş dili; peygamber tasviri yok).
Kitaba özgü kıssa/rivayet kararları (hangi rivayet kullanılmaz, hassas kıssa
nasıl çerçevelenir) genel kural DEĞİLDİR; her kitabın kimliğindeki "Kitaba özgü
kararlar" alanında tutulur. Örnek: Hz. Âdem'de Hâbil-Kâbil'in Mâide merkezli,
şiddet ayrıntısız işlenmesi.
