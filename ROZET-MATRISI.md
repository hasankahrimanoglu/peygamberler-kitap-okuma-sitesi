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

Anahtar `books.ts`'te alan olarak tutulmaz. Kod `src/lib/derive.ts:129`
üzerinden türetir:

```
rozetIconKey(bookKey, bölümNo)  →  hz-{bookKey}/bolum-{no}
dosya                           →  public/rozetler/hz-{bookKey}/bolum-{no}.png
```

Örnek: `hz-adem/bolum-1` → `public/rozetler/hz-adem/bolum-1.png`

> **Düzeltme (7 Ağu 2026).** Bu bölüm 27 Tem 2026 klasör revizyonunda
> güncellenmemişti ve düz dosya adı (`rozet-adem-bolum-1.png`) tarif ediyordu.
> Doğrusu yukarıdaki **kitap → bölüm klasör** düzenidir; tek kaynak
> `src/lib/varlikYollari.ts`.

Sonuç: rozet görsel adı **kitabın `bookKey`'i ve bölüm numarasıyla otomatik
belirlidir.** İçerik ajanının ayrıca anahtar üretmesine gerek yoktur; brifte
istenen "rozet anahtarı" alanı bu türetmenin doğrulanması içindir.

### 1.3 Görsel

- **512×512, şeffaf PNG** (KARAR 7 Ağu 2026 — PROJE-MODELI 6.1). Ödül görselleri
  ekranda en fazla 72px çizildiği için vektöre gerek yoktur; brifler ise gradyan,
  doku ve ışık istiyor. Tek şablon ailesi (aynı çerçeve, aynı palet; değişen
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
| 9 | Gelen Umut Rozeti | Hz. Şît | 1 | Nihai |
| 10 | Doğruyu Arama Rozeti | Hz. Şît | 2 | Nihai |
| 11 | Yılmayan Emek Rozeti | Hz. Şît | 3 | Nihai |
| 12 | Devralınan Emanet Rozeti | Hz. Şît | 4 | Nihai |
| 13 | Ölçülü Buluş Rozeti | Hz. İdrîs | 1 | Nihai |
| 14 | Öğreten Sabır Rozeti | Hz. İdrîs | 2 | Nihai |
| 15 | Vazgeçmeyen El Rozeti | Hz. İdrîs | 3 | Nihai |
| 16 | Güvenilen Söz Rozeti | Hz. İdrîs | 4 | Nihai |

**Nihai** = dinî doğruluk onayı verilmiş, kalıcı ad. Değiştirilmez.

> **12 Ağustos 2026 — Hz. İdrîs nihai içerikle eklendi.** Dört ad da §2'deki
> önceki 12 adla ve §2.1'deki serbest adlarla çakışmıyor. Nüans ayrışmaları:
> *Meraklı Zihin* (Âdem 2) merak edip **öğrenmeyi**, *Ölçülü Buluş* ise
> öğrendiğini **yaymadan önce sonucunu tartmayı** anlatır. *Sakin Güç* (Âdem 7)
> öfkeyi tutmayı, *Öğreten Sabır* **tekrar tekrar anlatma** sabrını anlatır
> (§3'teki "sabır" ayrışmasının bu kitaba düşen nüansı). *Yılmayan Emek*
> (Şît 3) **toplulukça** sürdürülen emeği, *Vazgeçmeyen El* ise **tek başına ve
> sonucu çok küçük kalan** emeği anlatır. *Sözü Koruma* (Âdem 3) verilen sözü
> **korumayı**, *Güvenilen Söz* ise **başkalarının sana güvenmesini** anlatır.

> **10 Ağustos 2026 — Hz. Şît nihai içerikle güncellendi.** Kitabın dört geçici
> demo adı (*Emanet · Doğru Söz · Dayanışma · Güzel İz Rozeti*) artık hiçbir
> yerde kullanılmıyor ve §2.1'e serbest bırakıldı. Nüans ayrışması: *Huzurlu
> Miras* (Hz. Âdem 8) emaneti **bırakan** tarafı, *Devralınan Emanet* ise
> **devralan** tarafı anlatır — "miras" kelimesi Hz. Şît'te hiç kullanılmadı.
> *Yeni Başlangıç* (Hz. Âdem 6) tövbe sonrası yeniden kurulan hayattır,
> *Gelen Umut* ise kayıptan sonra gelen tesellidir.

### 2.1 Serbest bırakılmış adlar (kullanılabilir)

25 Temmuz 2026'da ölü demo verisi koddan **tamamen silindi.** Aşağıdaki 14 ad
artık hiçbir yerde tanımlı değildir ve yeni içerikte kullanılabilir:

**Eski Hz. Nuh demo akışı** (`books.ts`'ten silindi): Sabır Başlangıç Rozeti ·
Emek Rozeti · Güven Rozeti · Tevekkül Rozeti · Yeni Başlangıç Rozeti

**Eski Hz. Şît demo akışı** (10 Ağu 2026'da nihai içerikle değiştirildi):
Emanet Rozeti · Doğru Söz Rozeti · Güzel İz Rozeti · Dayanışma Rozeti

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

> ⚠️ **"Yeni Başlangıç Rozeti" istisnadır** — §2'de Hz. Âdem'e kayıtlıdır,
> serbest değildir. *"Dayanışma Rozeti"* ise 10 Ağu 2026'da serbest kaldı:
> Hz. Şît'in nihai içeriği bu adı kullanmıyor.
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
**11 Ağustos 2026 itibarıyla 12 rozet görseli teslim edildi** (Hz. Âdem 8 ·
Hz. Şît 4); hepsi 512×512 şeffaf PNG. Kalan 204 rozet görseli bekliyor.

### Bölge 1 — İlk İzler Vadisi (6 kitap · 34 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Âdem | `adem` | 8 | `hz-adem/bolum-1…8` | öğrenme, sorumluluk, tövbe, umut | ✅ Nihai (§2) | ✓ 8/8 |
| Hz. Şît | `sit` | 4 | `hz-sit/bolum-1…4` | emanet, devamlılık, aile, doğruluk | ✅ Nihai (§2) | ✓ 4/4 |
| Hz. İdrîs | `idris` | 4 | `hz-idris/bolum-1…4` | bilgi, doğruluk, sabır, emek | ✅ Nihai (§2) | — 0/4 |
| Hz. Nûh | `nuh` | 8 | `hz-nuh/bolum-1…8` | sabır, güven, tedbir, umut | Bekliyor (K1) | — |
| Hz. Hûd | `hud` | 5 | `hz-hud/bolum-1…5` | tevazu, cesaret, doğruluk, sorumluluk | Bekliyor (K1) | — |
| Hz. Sâlih | `salih` | 5 | `hz-salih/bolum-1…5` | emanet, ölçülülük, sözünde durma, saygı | Bekliyor (K1) | — |

### Bölge 2 — Bereketli Aile Yolu (6 kitap · 39 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. İbrahim | `ibrahim` | 9 | `hz-ibrahim/bolum-1…9` | tevhid, cesaret, teslimiyet, misafirperverlik | Bekliyor (K1) | — |
| Hz. Lût | `lut` | 5 | `hz-lut/bolum-1…5` | ahlâk, cesaret, koruma, doğruluk | Bekliyor (K1) | — |
| Hz. İsmail | `ismail` | 6 | `hz-ismail/bolum-1…6` | teslimiyet, çalışma, aile, sözünde durma | Bekliyor (K1) | — |
| Hz. İshak | `ishak` | 4 | `hz-ishak/bolum-1…4` | şükür, aile, sabır, devamlılık | Bekliyor (K2) | — |
| Hz. Yakup | `yakup` | 5 | `hz-yakup/bolum-1…5` | sabır, sevgi, umut, bağışlama | Bekliyor (K1) | — |
| Hz. Yusuf | `yusuf` | 10 | `hz-yusuf/bolum-1…10` | sabır, iffet, güvenilirlik, bağışlama | Bekliyor (K1) | — |

### Bölge 3 — Sabır ve Cesaret Geçidi (6 kitap · 33 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Eyyûb | `eyyub` | 5 | `hz-eyyub/bolum-1…5` | sabır, şükür, umut, dayanıklılık | Bekliyor (K1) | — |
| Hz. Şuayb | `suayb` | 5 | `hz-suayb/bolum-1…5` | dürüstlük, adalet, ölçülülük, cesaret | Bekliyor (K1) | — |
| Hz. Zülkifl | `zulkifl` | 4 | `hz-zulkifl/bolum-1…4` | sabır, emanet, sözünde durma, düzen | Bekliyor (K2) | — |
| Hz. Musa | `musa` | 10 | `hz-musa/bolum-1…10` | cesaret, özgürlük, adalet, güven | Bekliyor (K1) | — |
| Hz. Hârûn | `harun` | 5 | `hz-harun/bolum-1…5` | kardeşlik, destek, iletişim, sorumluluk | Bekliyor (K1) | — |
| Hz. Yûşa | `yusa` | 4 | `hz-yusa/bolum-1…4` | sadakat, cesaret, emanet, kararlılık | Bekliyor (**K3**) | — |

### Bölge 4 — Hikmet Sarayları (4 kitap · 22 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Dâvûd | `davud` | 6 | `hz-davud/bolum-1…6` | cesaret, adalet, emek, şükür | Bekliyor (K1) | — |
| Hz. Süleyman | `suleyman` | 7 | `hz-suleyman/bolum-1…7` | hikmet, şükür, merhamet, adalet | Bekliyor (K1) | — |
| Hz. İlyas | `ilyas` | 5 | `hz-ilyas/bolum-1…5` | tevhid, cesaret, sabır, doğruluk | Bekliyor (K2) | — |
| Hz. Elyesa | `elyesa` | 4 | `hz-elyesa/bolum-1…4` | emanet, devamlılık, iyilik, sabır | Bekliyor (K2) | — |

### Bölge 5 — Umut Işıkları Diyarı (5 kitap · 26 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Yunus | `yunus` | 5 | `hz-yunus/bolum-1…5` | tövbe, umut, sorumluluk, sabır | Bekliyor (K1) | — |
| Hz. Şa‘yâ | `saya` | 4 | `hz-saya/bolum-1…4` | doğruluk, umut, cesaret, emanet | Bekliyor (**K3**) | — |
| Hz. Zekeriyyâ | `zekeriyya` | 5 | `hz-zekeriyya/bolum-1…5` | dua, hizmet, umut, güven | Bekliyor (K1) | — |
| Hz. Yahyâ | `yahya` | 4 | `hz-yahya/bolum-1…4` | hikmet, merhamet, doğruluk, sadelik | Bekliyor (K2) | — |
| Hz. Îsâ | `isa` | 8 | `hz-isa/bolum-1…8` | merhamet, tevhid, umut, yardım, doğruluk | Bekliyor (K1) | — |

### Bölge 6 — Rahmet Yolculuğu (4 kitap · 36 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Muhammed — İlk Yıllar | `muhammed-ilk-yillar` | 8 | `hz-muhammed-ilk-yillar/bolum-1…8` | güvenilirlik, merhamet, emek, adalet | Bekliyor (K4) | — |
| Hz. Muhammed — Mekke Yılları | `muhammed-mekke` | 10 | `hz-muhammed-mekke/bolum-1…10` | sabır, cesaret, tevhid, dayanışma | Bekliyor (K4) | — |
| Hz. Muhammed — Medine Yılları | `muhammed-medine` | 10 | `hz-muhammed-medine/bolum-1…10` | kardeşlik, adalet, barış, sorumluluk | Bekliyor (K4) | — |
| Hz. Muhammed — Veda ve Emanet | `muhammed-veda` | 8 | `hz-muhammed-veda/bolum-1…8` | merhamet, eşitlik, emanet, vefa | Bekliyor (K4) | — |

> Bu dört kitabın rozet adları **birlikte** planlanır. Dördü tek hayatın
> yolculuklarıdır; aynı değerin dört kez tekrarlanması riski en yüksek burada.

### Bölge 7 — Emaneti Taşıyan Dört Dost (4 kitap · 26 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Ebû Bekir | `ebubekir` | 6 | `hz-ebubekir/bolum-1…6` | sadakat, güven, cömertlik, vefa | Bekliyor (K4) | — |
| Hz. Ömer | `omer` | 7 | `hz-omer/bolum-1…7` | adalet, cesaret, tevazu, sorumluluk | Bekliyor (K4) | — |
| Hz. Osman | `osman` | 6 | `hz-osman/bolum-1…6` | hayâ, cömertlik, sabır, hizmet | Bekliyor (K4) | — |
| Hz. Ali | `ali` | 7 | `hz-ali/bolum-1…7` | ilim, cesaret, sadakat, adalet | Bekliyor (K4) | — |

> Halife kitaplarında rozet adı `(a.s.)` içermez ve peygamberlik çağrıştıran
> ifade kullanmaz.

---

## 5. TOPLAM VE İLERLEME

| | Sayı |
|---|---:|
| Planlanan rozet (216 bölüm) | 216 |
| Nihai rozet adı kayıtlı | 16 |
| Geçici demo adı kayıtlı | 0 |
| Ad bekleyen | 200 |
| Üretilmiş rozet görseli | 12 |
| Rozet görseli bekleyen | 204 |

Üretilmiş 12 görsel: `rozetler/hz-adem/bolum-1…8.png` ve
`rozetler/hz-sit/bolum-1…4.png` (11 Ağu 2026, 512×512 şeffaf PNG).
Madalya görselleri bu matriste izlenmez; sicilleri `ICERIK-GORSEL-SICILI.md`
§7'dedir (`madalyalar/hz-adem.png` ve `hz-sit.png` teslim edildi).

> **12 Ağu 2026 — Hz. İdrîs:** dört rozet **adı** nihai olarak kaydedildi
> (12 → 16), ama **görselleri henüz üretilmedi.** `rozetler/hz-idris/bolum-1…4.png`
> ve `madalyalar/hz-idris.png` şu an yer tutucudur; bu yüzden görsel sayaçları
> 12/204 olarak DEĞİŞMEDİ. Brifler teslimin §H'sindedir.

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

- ~~**`public/rozetler/` boş.**~~ **KAPANDI (11 Ağu 2026)** — içeriği yazılmış
  iki kitabın 12 rozetinin tamamı teslim edildi. Kalan 204 rozet, ait olduğu
  kitabın içeriği geldikçe üretilecek. Görsel üretimi içerikten bağımsız
  ilerleyebilir; anahtarlar §1.2'deki kuralla önceden bellidir.
- ~~**Eski Hz. Nuh demo verisi `books.ts`'te duruyor.**~~ **KAPANDI (25 Tem
  2026)** — demo verisi koddan silindi (§2.1). O akıştaki beş rozet adı serbesttir;
  nihai Hz. Nûh içeriği bunları yeniden kullanabilir, ama §2 dizinindeki güncel
  adlarla yine karşılaştırılır.
- ~~**Hz. Şît'in dört rozeti geçicidir.**~~ **KAPANDI (10 Ağu 2026)** — kaynaklı
  içerik `books.ts`'e aktarıldı; dört ad da §2'de "Nihai" olarak kayıtlı.
  Rozet görselleri de **11 Ağu 2026'da teslim edildi**
  (`public/rozetler/hz-sit/bolum-1…4.png`); eski `.svg` dosyaları klasörde
  kalmadı, kod artık yedeğe düşmüyor.
