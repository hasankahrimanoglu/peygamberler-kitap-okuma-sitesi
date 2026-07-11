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

---

## 4. Özellik Kararları

### 4.1 EKLENECEK

| # | Özellik | Açıklama | Veri maliyeti |
|---|---|---|---|
| 1 | Terminoloji standardizasyonu | Tüm ekran metinleri rozet/madalya/unvan sözlüğüne çekilir | Yok (adlandırma) |
| 2 | Tasarım sistemi | Bölüm 3'teki tokenlar + ortak bileşenler (Card, Button, Badge, ProgressBar) | Yok |
| 3 | Veli paneli yeniden kurgusu | Sol menülü (mobilde alt menülü) çok sayfalı yapı: Ana Sayfa, Kütüphane, Ödüller, Gelişim Raporları | Yok — mevcut veriden türetilir |
| 4 | Veli ana sayfası | Çocuk kartları: avatar, unvan, okunan kitap, ilerleme, son rozet + "Okumaya Devam Et / Gelişim Raporu / Profili Düzenle". Profil ekleme formu ayrı ekrana taşınır; "Şifre Değiştir" sağ üst hesap menüsüne girer | Yok |
| 5 | Kütüphane sayfası (veli) | Tüm kitaplar, çocuk/durum filtresi, arama, kilitli kitap açıklamaları | Yok — books + user_progress |
| 6 | Ödüller sayfası (veli) | Rozetler / Madalyalar / Unvanlar sekmeleri, rozet detay paneli | Yok — türetilir |
| 7 | Gelişim raporu: modal → sekmeli tam sayfa | Genel Bakış, Kitaplar, Ödüller, Sohbet Önerileri sekmeleri; mobilde tam ekran | Yok |
| 8 | Çocuk kitap detayı: modal → tam ekran sayfa | Bölüm listesi, kazanılacak rozet, final testi kartı (kilitli/açık), çift scrollbar sorunu biter | Yok |
| 9 | Harita durum dili | 3.4'teki durum tablosu uygulanır; "Maceraya Başla" tutarsızlığı düzelir | Yok |
| 10 | Unvan sistemi | Bölüm 2'deki eşik tablosu; `profiles.unvan` alanı zaten mevcut | Çok düşük |
| 11 | Sistem değerlendirme dili | Rapor metinleri kesin hüküm değil gözlem bildirir ("...temaları öne çıktı") | Yok (metin) |
| 12 | Final testi dili | Çocuk ekranında pozitif dil ("5 sorunun 5'ini doğru cevapladın"); veli ekranında sayısal (5 Doğru / 0 Yanlış) | Yok |

### 4.2 SONRAYA BIRAKILDI (ayrı fazlarda)

| # | Özellik | Neden sonra | Gerektirdiği |
|---|---|---|---|
| S1 | Son okuma hareketleri (aktivite akışı) | Yeni event tablosu ister; ilk sürümde `user_progress.updated_at`'ten "son aktivite" özeti gösterilir | `activity_events` tablosu |
| S2 | Ses çubuğu geliştirmeleri (hız, 10sn ileri/geri, kaldığı yerden devam) | Pozisyon kaydı ister | progress'e ses pozisyonu alanı |
| S3 | Hesap aktivasyon akışı (şifre maili yerine tek kullanımlık bağlantı) | Çalışan Shopier akışını bozmadan, kendi fazında | E-posta şablonu + token akışı |
| S4 | Çocuk girişi PIN'e geçiş + parola güvenliği | S3 ile birlikte ele alınır (bkz. Bölüm 8) | Şema + RLS değişikliği |
| S5 | "Sen Olsaydın" cevaplarının kaydedilip veli raporunda gösterilmesi | Değerli ama zorunlu değil | Yeni tablo |

### 4.3 EKLENMEYECEK (bilinçli karar)

- Puan sistemi (420/800 vb.) — unvanlar kitap sayısına bağlı.
- Altın/gümüş/bronz madalya kademeleri.
- Günlük seri (streak), ekran süresi yönetimi, sürekli bildirim.
- Değer radar grafiği (ölçülemeyen psikolojik puanlama üretir).
- Seri kartları ("Peygamber Hikâyeleri Serisi" paketleri) — tek yol var.
- "Sen Olsaydın" seçeneklerinde özel görsel (bkz. Bölüm 6.3).

---

## 5. Sayfa Haritası

### 5.1 Çocuk tarafı

| Rota | Ekran | Not |
|---|---|---|
| `/map` | Keşif Dünyası (harita) | Masaüstü/tablet: hafif zikzak dikey yol; mobil: düz dikey yol. Aktif kitap en büyük kart |
| `/kitap/[bookId]` | Kitap Yolculuğu (detay) | YENİ — modal yerine tam sayfa. Bölüm listesi + final testi kartı |
| `/reader/[chapterId]` | Okuma akışı | Mevcut rota korunur. Sayfa tipleri: hikâye, Sen Olsaydın, Ne Öğrendik, Bugüne Taşı, Rozet Kapısı |
| `/quiz/[bookId]` | Büyük Final Testi | Mevcut rota korunur |

Okuma ekranı düzeni:
- **Tablet yatay:** solda metin, sağda illüstrasyon; üstte ses çubuğu; altta Önceki/Sonraki.
- **Tablet dikey / mobil:** üstte görsel, altta metin, kelime kutusu metnin altında; ses çubuğu üstte kompakt sabit.
- Sayfa göstergesi tek formatta: **"Sayfa 3 / 12"**. Ses süresi ayrı: "01:18 / 06:45".
- Alt navigasyonda yalnızca Önceki/Sonraki; "Sayfayı Çevir" tekrarı kaldırılır.
  Ortadaki büyük buton yalnızca özel anlarda: Maceraya Başla / Kararını Onayla /
  Bölümü Bitir / Final Testine Geç.

### 5.2 Veli tarafı

| Rota | Ekran | Not |
|---|---|---|
| `/dashboard` | Ana Sayfa (çocuk kartları + kısa bakış) | Sekme yapısının merkezi |
| `/dashboard/kutuphane` | Kütüphane | Filtre: çocuk + durum; arama |
| `/dashboard/oduller` | Ödüller | Rozetler / Madalyalar / Unvanlar sekmeleri |
| `/dashboard/rapor/[profileId]` | Gelişim Raporu | Tam sayfa, sekmeli |

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

- **Faz 5:** `activity_events` tablosu (id, profile_id, event_type, payload jsonb,
  created_at) — tam aktivite akışı için. RLS: veli kendi çocuklarınınkini okur.
- **Faz 6:** bkz. Bölüm 8.
- **S2 için:** `user_progress`e `audio_position` (jsonb veya ayrı kolon).

---

## 8. Güvenlik Notları (Faz 6'da ele alınacak — ŞİMDİ DOKUNULMUYOR)

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
| **3** | Okuma akışı: reader sayfa tipleri (hikâye, Sen Olsaydın, Ne Öğrendik, Bugüne Taşı, Rozet Kapısı) yeni tasarım + navigasyon sadeleşmesi | Okuma deneyimi tamam |
| **4** | Veli paneli: ana sayfa, Kütüphane, Ödüller, Gelişim Raporu (tam sayfa) + mobil alt navigasyon | Veli deneyimi tamam |
| **5** | Unvan hesaplama + son aktivite; istenirse `activity_events` | Küçük veri eklemeleri |
| **6** | Güvenlik/hesap akışı (Bölüm 8) | Aktivasyon bağlantısı + PIN |
| **7** | Landing page'in gerçek özelliklerle güncellenmesi | Pazarlama yüzü güncel |

Kurallar:
- Her faz kendi içinde mobil + tablet + masaüstü ile birlikte biter
  (responsive ayrı faz değildir).
- Her fazın sonunda çalışan sistem bozulmamış olmalı; büyük ekran
  değişimlerinde eski ekran, yenisi bitene kadar silinmez.
- Yapılmamış özellik landing page'de TANITILMAZ.

---

## 10. Karar Kaydı (11 Temmuz 2026 — Hasan onayı)

- [x] Unvan eşik tablosu (Bölüm 2): **ONAYLANDI**, adlar bu haliyle kalıyor.
- [x] Rozet görsel stratejisi: **Seçenek B** — bölüm başına özel görsel
      (~150–200 adet, tek şablon ailesinde).
- [x] Avatar seti: **8 adet** (4 erkek + 4 kız), 3D çocuk illüstrasyonu stili.
- [x] "Sen Olsaydın" seçenekleri: **salt metin**, sembol yok.
- [x] Marka adı: **"Peygamberler Keşif Dünyası"** (ileride değişebilir;
      ekranlarda tek kaynaktan yönetilecek).

## 11. İçerik Durumu

| Kitap | Durum |
|---|---|
| Hz. Âdem | ✅ Gerçek içerik yazıldı (5 bölüm + final testi) — kaynak: Peygamberler Tarihi serisi çerçevesi, Kur'an kıssası ana hattı. Hasan'ın dini doğruluk onayı bekleniyor |
| Hz. Nuh | Demo içerik (kalite iyi; gerçek kaynak kontrolüyle gözden geçirilecek) |
| Diğer kitaplar | İçerik yok; fazlar ilerlerken kitap kitap eklenecek |

İçerik yazım kuralları: Bahar Yayıncılık yazım kuralları esas alınır
(peygamber adlarında "(a.s.)" ilk geçişte; kaynak dışına taşan kesin ifade yok;
abartısız, sıcak, 7–10 yaş dili; peygamber tasviri yok).
Hz. Âdem içeriğinde Hâbil-Kâbil kıssası bilinçli olarak DAHİL EDİLMEDİ
(yaş grubuna ağır); istenirse ileride ayrı bölüm olarak değerlendirilir.
