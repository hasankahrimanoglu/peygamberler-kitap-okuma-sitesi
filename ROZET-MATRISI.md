# MERKEZÎ ROZET MATRİSİ

> **Proje:** Peygamberler Keşif Dünyası
>
> **Belge tarihi:** 25 Temmuz 2026
>
> **Kapsam:** 7 keşif bölgesi · 35 kitap · 216 bölüm/rozet hedefi
>
> **Durum:** Yaşayan belge. Her yeni kitap içeriği geldiğinde güncellenir.

Bu belge `PROJE-MODELI.md` Bölüm 6.1'de tanımlanan **Merkezî Rozet Matrisi**dir.
İki işi birden yapar:

1. **Tekillik sicili** — rozet adları set genelinde tekildir. Yeni bir kitabın
   rozet adları buradaki dizinle karşılaştırılmadan onaylanmaz.
2. **Görsel üretim listesi** — 216 rozet görselinin dosya adı, durumu ve
   üretim sırası buradan izlenir.

`YENI-KITAP-ICERIK-URETIM-BRIFI.md` §1 bu dosyayı **zorunlu girdi** olarak ister;
§15 matris verilmediğinde ajanın durmasını şart koşar. İçerik üretim oturumuna
daima bu dosyanın güncel hâli verilir.

---

## 1. SABİT KURALLAR

### 1.1 Rozet adı

- Biçim: `{değer/kavram} Rozeti` — 2–4 kelime.
- **Set genelinde tekildir.** Aynı değer birden çok kitapta işlenirse her biri
  farklı ad ve farklı nüansla gelir (bkz. §3 değer çakışma haritası).
- Rozet adını **içerik ajanı yazar**, bu belge yazmaz. Matris adı üretmez;
  gelen adı kaydeder ve çakışma denetler.
- Ad, bölümün ana değerinden doğar; kitap adını içermez ("Hz. Nûh Rozeti" gibi
  bir ad kullanılmaz).

### 1.2 Rozet görsel anahtarı — türetilir, yazılmaz

Anahtar `books.ts`'te alan olarak tutulmaz. Kod `src/lib/derive.ts:132`
üzerinden türetir:

```
rozetIconKey(bookKey, bölümNo)  →  {bookKey}-bolum-{no}
dosya                           →  public/rozetler/rozet-{bookKey}-bolum-{no}.png
```

Örnek: `adem-bolum-1` → `public/rozetler/rozet-adem-bolum-1.png`

Sonuç: rozet görsel adı **kitabın `bookKey`'i ve bölüm numarasıyla otomatik
belirlidir.** İçerik ajanının ayrıca anahtar üretmesine gerek yoktur; brifte
istenen "rozet anahtarı" alanı bu türetmenin doğrulanması içindir.

### 1.3 Görsel

- 512×512, PNG şeffaf, tek şablon ailesi (aynı çerçeve, aynı palet; değişen
  yalnız iç sembol).
- Kilitli/kazanılmış için **ayrı dosya üretilmez** — CSS ile soluklaştırılır.
- Dosya adı küçük harf, Türkçe karaktersiz, tireli.
- Figür yasağı: peygamber/halife/sahabe yüzü, bedeni, eli veya silüeti yok.
  Sembol nesne, doğa ve ışık üzerinden kurulur.
- Dosya yoksa kod `public/rozetler/placeholder.svg`'ye düşer; eksik görsel
  ekranı bozmaz.

---

## 2. KAYITLI ROZET ADLARI DİZİNİ

Yeni kitabın rozet adları **önce bu listeyle karşılaştırılır.** Listede olan bir
ad ikinci kez kullanılamaz.

| # | Rozet adı | Kitap | Bölüm | Durum |
|---:|---|---|---:|---|
| 1 | İlk Adım Rozeti | Hz. Âdem | 1 | Nihai |
| 2 | Meraklı Zihin Rozeti | Hz. Âdem | 2 | Nihai |
| 3 | Sözü Koruma Rozeti | Hz. Âdem | 3 | Nihai |
| 4 | Dikkatli Kalp Rozeti | Hz. Âdem | 4 | Nihai |
| 5 | Tövbe Rozeti | Hz. Âdem | 5 | Nihai |
| 6 | Yeni Başlangıç Rozeti | Hz. Âdem | 6 | Nihai |
| 7 | Sakin Güç Rozeti | Hz. Âdem | 7 | Nihai |
| 8 | Huzurlu Miras Rozeti | Hz. Âdem | 8 | Nihai |
| 9 | Emanet Rozeti | Hz. Şît | 1 | **Geçici demo** |
| 10 | Doğru Söz Rozeti | Hz. Şît | 2 | **Geçici demo** |
| 11 | Dayanışma Rozeti | Hz. Şît | 3 | **Geçici demo** |
| 12 | Güzel İz Rozeti | Hz. Şît | 4 | **Geçici demo** |

**Nihai** = dinî doğruluk onayı verilmiş, kalıcı ad. Değiştirilmez.
**Geçici demo** = kaynaklı içerik geldiğinde bütünüyle değişecek. Ad rezerve
sayılmaz; ancak nihai Hz. Şît içeriği gelene kadar başka kitapta da kullanılmaz.

### 2.1 Serbest bırakılmış adlar (kullanılabilir)

25 Temmuz 2026'da ölü demo verisi koddan **tamamen silindi.** Aşağıdaki 14 ad
artık hiçbir yerde tanımlı değildir ve yeni içerikte kullanılabilir:

**Eski Hz. Nuh demo akışı** (`books.ts`'ten silindi): Sabır Başlangıç Rozeti ·
Emek Rozeti · Güven Rozeti · Tevekkül Rozeti · Yeni Başlangıç Rozeti

**Eski statik listeler** (`derive.ts` `KITAP_ANAHTARLARI`'ndan silindi):
- *Ebû Bekir:* Işık Rozeti · Gönül Dostu Rozeti · İlk Güven Rozeti ·
  Mekke Çarşısı Rozeti · Habeşistan Yolu Çıkartması · Doğruluk Rozeti ·
  Tevekkül Rozeti · Kardeşlik Rozeti · Dayanışma Rozeti · Teselli Rozeti
- *Ömer:* Adalet Rozeti · Kararlılık Rozeti · Merhamet Rozeti
- *Osman:* Hayâ Rozeti

Bu listeler üç ayrı kuralı çiğniyordu ve bu yüzden kaldırıldı:

| Sorun | Ayrıntı |
|---|---|
| Terminoloji | *"Habeşistan Yolu Çıkartması"* — "Çıkartma" yasaklı terim (yalnız ROZET · MADALYA · UNVAN) |
| Çakışma | *"Yeni Başlangıç Rozeti"* Hz. Âdem 6. bölümle, *"Dayanışma Rozeti"* Hz. Şît 3. bölümle aynıydı |
| Katalog uyumsuzluğu | Ebû Bekir 10, Ömer 3, Osman 1 rozet; katalog hedefi **6 / 7 / 6** |

> ⚠️ **"Yeni Başlangıç Rozeti" ve "Dayanışma Rozeti" istisnadır** — bunlar §2'de
> Hz. Âdem ve Hz. Şît'e kayıtlıdır, serbest değildir.
>
> Rozet adı artık **yalnızca `books.ts` içeriğinden** gelir. Katalogda
> "Hazırlanıyor" durumundaki kitapta rozet listesi boştur (PROJE-MODELI 3.7).

---

## 3. DEĞER ÇAKIŞMA HARİTASI

Katalogdaki 35 kitabın "Ana değerler" sütunundan çıkarılmıştır. **Yüksek
frekanslı değerlerde rozet adı, değerin kendisi değil kitaba özgü nüansı
taşımalıdır** — yoksa 12 kitapta 12 kez "Sabır Rozeti" gerekir.

| Değer | Kaç kitapta | Ad stratejisi |
|---|---:|---|
| **Cesaret** | 12 | Ada asla yalın "Cesaret" konmaz. Cesaretin türü ayrıştırılır: doğruyu söyleme, yalnız kalabilme, korkuya rağmen ilerleme, savunma. |
| **Sabır** | 12 | Sabrın süresi ve konusu ayrıştırılır: uzun bekleyiş, hastalıkta dayanma, tekrar tekrar anlatma, ayrılığa katlanma. |
| **Adalet** | 8 | Karar verme, ölçü-tartı, yönetimde denge, hak gözetme olarak ayrışır. |
| **Umut** | 8 | Yeniden başlama, kayıptan sonra, karanlıkta ışık, bekleyen kalp olarak ayrışır. |
| **Doğruluk** | 8 | Sözde, ticarette, tanıklıkta, yalnızken doğruluk olarak ayrışır. |
| **Emanet** | 7 | Devralınan, korunan, aktarılan, sınırı çizilen emanet olarak ayrışır. |
| **Sorumluluk** | 6 | Kendine, aileye, topluma, verilen göreve karşı olarak ayrışır. |
| **Merhamet** | 5 | Hasta, yetim, hayvan, düşman karşısında merhamet olarak ayrışır. |
| Güven · Şükür · Tevhid | 4 | Ayrışma gerekir. |
| Sadakat · Aile · Devamlılık · Emek · Sözünde durma | 3 | Ayrışma gerekir. |
| Tevazu · Ölçülülük · Bağışlama · Teslimiyet · Kardeşlik · Vefa · Cömertlik · Hikmet · Hizmet · İlim · Güvenilirlik | 2 | Dikkat edilir. |

Örnek nüans çifti (`PROJE-MODELI.md` 6.1'den): *"Sadakat Rozeti"* /
*"Bekleyen Kalp Rozeti"* — aynı değer, iki ayrı kitap, iki ayrı ad.

---

## 4. KİTAP KİTAP MATRİS

Bölüm sayıları ve değerler `KITAP-KATALOGU-VE-URETIM-PLANI.md`'den alınmıştır.
İçeriği yazılmamış kitaplarda rozet adı satırı **boş bırakılır** — bu belge ad
üretmez.

**Görsel durumu kısaltmaları:** `—` üretilmedi · `✓` teslim edildi.
Şu an `public/rozetler/` içinde yalnız `placeholder.svg` bulunuyor; **216
rozet görselinin tamamı üretilmeyi bekliyor.**

### Bölge 1 — İlk İzler Vadisi (6 kitap · 34 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Âdem | `adem` | 8 | `adem-bolum-1…8` | öğrenme, sorumluluk, tövbe, umut | ✅ Nihai (§2) | — |
| Hz. Şît | `sit` | 4 | `sit-bolum-1…4` | emanet, devamlılık, aile, doğruluk | ⚠️ Geçici demo | — |
| Hz. İdrîs | `idris` | 4 | `idris-bolum-1…4` | bilgi, doğruluk, sabır, emek | Bekliyor (K2) | — |
| Hz. Nûh | `nuh` | 8 | `nuh-bolum-1…8` | sabır, güven, tedbir, umut | Bekliyor (K1) | — |
| Hz. Hûd | `hud` | 5 | `hud-bolum-1…5` | tevazu, cesaret, doğruluk, sorumluluk | Bekliyor (K1) | — |
| Hz. Sâlih | `salih` | 5 | `salih-bolum-1…5` | emanet, ölçülülük, sözünde durma, saygı | Bekliyor (K1) | — |

### Bölge 2 — Bereketli Aile Yolu (6 kitap · 39 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. İbrahim | `ibrahim` | 9 | `ibrahim-bolum-1…9` | tevhid, cesaret, teslimiyet, misafirperverlik | Bekliyor (K1) | — |
| Hz. Lût | `lut` | 5 | `lut-bolum-1…5` | ahlâk, cesaret, koruma, doğruluk | Bekliyor (K1) | — |
| Hz. İsmail | `ismail` | 6 | `ismail-bolum-1…6` | teslimiyet, çalışma, aile, sözünde durma | Bekliyor (K1) | — |
| Hz. İshak | `ishak` | 4 | `ishak-bolum-1…4` | şükür, aile, sabır, devamlılık | Bekliyor (K2) | — |
| Hz. Yakup | `yakup` | 5 | `yakup-bolum-1…5` | sabır, sevgi, umut, bağışlama | Bekliyor (K1) | — |
| Hz. Yusuf | `yusuf` | 10 | `yusuf-bolum-1…10` | sabır, iffet, güvenilirlik, bağışlama | Bekliyor (K1) | — |

### Bölge 3 — Sabır ve Cesaret Geçidi (6 kitap · 33 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Eyyûb | `eyyub` | 5 | `eyyub-bolum-1…5` | sabır, şükür, umut, dayanıklılık | Bekliyor (K1) | — |
| Hz. Şuayb | `suayb` | 5 | `suayb-bolum-1…5` | dürüstlük, adalet, ölçülülük, cesaret | Bekliyor (K1) | — |
| Hz. Zülkifl | `zulkifl` | 4 | `zulkifl-bolum-1…4` | sabır, emanet, sözünde durma, düzen | Bekliyor (K2) | — |
| Hz. Musa | `musa` | 10 | `musa-bolum-1…10` | cesaret, özgürlük, adalet, güven | Bekliyor (K1) | — |
| Hz. Hârûn | `harun` | 5 | `harun-bolum-1…5` | kardeşlik, destek, iletişim, sorumluluk | Bekliyor (K1) | — |
| Hz. Yûşa | `yusa` | 4 | `yusa-bolum-1…4` | sadakat, cesaret, emanet, kararlılık | Bekliyor (**K3**) | — |

### Bölge 4 — Hikmet Sarayları (4 kitap · 22 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Dâvûd | `davud` | 6 | `davud-bolum-1…6` | cesaret, adalet, emek, şükür | Bekliyor (K1) | — |
| Hz. Süleyman | `suleyman` | 7 | `suleyman-bolum-1…7` | hikmet, şükür, merhamet, adalet | Bekliyor (K1) | — |
| Hz. İlyas | `ilyas` | 5 | `ilyas-bolum-1…5` | tevhid, cesaret, sabır, doğruluk | Bekliyor (K2) | — |
| Hz. Elyesa | `elyesa` | 4 | `elyesa-bolum-1…4` | emanet, devamlılık, iyilik, sabır | Bekliyor (K2) | — |

### Bölge 5 — Umut Işıkları Diyarı (5 kitap · 26 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Yunus | `yunus` | 5 | `yunus-bolum-1…5` | tövbe, umut, sorumluluk, sabır | Bekliyor (K1) | — |
| Hz. Şa‘yâ | `saya` | 4 | `saya-bolum-1…4` | doğruluk, umut, cesaret, emanet | Bekliyor (**K3**) | — |
| Hz. Zekeriyyâ | `zekeriyya` | 5 | `zekeriyya-bolum-1…5` | dua, hizmet, umut, güven | Bekliyor (K1) | — |
| Hz. Yahyâ | `yahya` | 4 | `yahya-bolum-1…4` | hikmet, merhamet, doğruluk, sadelik | Bekliyor (K2) | — |
| Hz. Îsâ | `isa` | 8 | `isa-bolum-1…8` | merhamet, tevhid, umut, yardım, doğruluk | Bekliyor (K1) | — |

### Bölge 6 — Rahmet Yolculuğu (4 kitap · 36 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Muhammed — İlk Yıllar | `muhammed-ilk-yillar` | 8 | `muhammed-ilk-yillar-bolum-1…8` | güvenilirlik, merhamet, emek, adalet | Bekliyor (K4) | — |
| Hz. Muhammed — Mekke Yılları | `muhammed-mekke` | 10 | `muhammed-mekke-bolum-1…10` | sabır, cesaret, tevhid, dayanışma | Bekliyor (K4) | — |
| Hz. Muhammed — Medine Yılları | `muhammed-medine` | 10 | `muhammed-medine-bolum-1…10` | kardeşlik, adalet, barış, sorumluluk | Bekliyor (K4) | — |
| Hz. Muhammed — Veda ve Emanet | `muhammed-veda` | 8 | `muhammed-veda-bolum-1…8` | merhamet, eşitlik, emanet, vefa | Bekliyor (K4) | — |

> Bu dört kitabın rozet adları **birlikte** planlanır. Dördü tek hayatın
> yolculuklarıdır; aynı değerin dört kez tekrarlanması riski en yüksek burada.

### Bölge 7 — Emaneti Taşıyan Dört Dost (4 kitap · 26 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Ebû Bekir | `ebubekir` | 6 | `ebubekir-bolum-1…6` | sadakat, güven, cömertlik, vefa | Bekliyor (K4) | — |
| Hz. Ömer | `omer` | 7 | `omer-bolum-1…7` | adalet, cesaret, tevazu, sorumluluk | Bekliyor (K4) | — |
| Hz. Osman | `osman` | 6 | `osman-bolum-1…6` | hayâ, cömertlik, sabır, hizmet | Bekliyor (K4) | — |
| Hz. Ali | `ali` | 7 | `ali-bolum-1…7` | ilim, cesaret, sadakat, adalet | Bekliyor (K4) | — |

> Halife kitaplarında rozet adı `(a.s.)` içermez ve peygamberlik çağrıştıran
> ifade kullanmaz.

---

## 5. TOPLAM VE İLERLEME

| | Sayı |
|---|---:|
| Planlanan rozet (216 bölüm) | 216 |
| Nihai rozet adı kayıtlı | 8 |
| Geçici demo adı kayıtlı | 4 |
| Ad bekleyen | 204 |
| Üretilmiş rozet görseli | 0 |

---

## 6. YENİ KİTAP GELİNCE — MATRİS GÜNCELLEME AKIŞI

1. İçerik oturumuna bu dosyanın **güncel hâli** verilir (brif §1, "Mevcut
   merkezi rozet listesi").
2. Teslim gelince rozet adları §2 dizinindeki adlarla karşılaştırılır.
   Çakışma varsa `books.ts`'e aktarım **yapılmaz**; içerik ajanına ad
   değişikliği sorulur.
3. Çakışma yoksa:
   - §4'teki ilgili kitap satırı, bölüm bölüm satırlara açılır (Hz. Âdem
     biçiminde: bölüm no · rozet adı · değer · anahtar).
   - Adlar §2 dizinine eklenir, durumu **Nihai** yazılır.
   - §5 sayaçları güncellenir.
4. Görsel üretimi bittiğinde §4'teki "Görsel" sütunu `✓` yapılır.
5. Bölüm sayısı değişmesi gerekiyorsa önce `KITAP-KATALOGU-VE-URETIM-PLANI.md`
   §12 onay kuralı işletilir; matris kendi başına bölüm sayısı değiştirmez.

---

## 7. AÇIK UYARILAR

- **`public/rozetler/` boş.** 216 görselin hiçbiri üretilmedi; şu an bütün
  rozetler `placeholder.svg` ile gösteriliyor. Görsel üretimi, içerik
  üretiminden bağımsız ilerleyebilir — anahtarlar §1.2'deki kuralla zaten
  belirli olduğu için Hz. Âdem'in 8 rozeti bugün üretilebilir.
- **Eski Hz. Nuh demo verisi `books.ts`'te duruyor** ve Hz. Âdem'le çakışan bir
  rozet adı içeriyor (§2.1). Üründe görünmüyor, ama nihai Hz. Nûh içeriği
  yazılırken hata kaynağı olabilir.
- **Hz. Şît'in dört rozeti geçicidir.** Kaynaklı içerik geldiğinde adlar
  büyük olasılıkla değişecek; §2 dizininde "Nihai" sayılmazlar.
