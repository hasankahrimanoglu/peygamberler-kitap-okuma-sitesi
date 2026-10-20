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
- **Çerçeve üretimde çizilmez (KARAR 13 Eki 2026 — Hasan):** görsel oturumu
  sembolü çerçevesiz kare olarak teslim eder; çerçeveyi Hasan Photoshop'ta tek
  ortak şablonla ekler ve aynı adla kaydeder. Ayrıntı: ICERIK-GORSEL-SICILI
  §6.2 "Rozet ve madalya — çerçevesiz kare".
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
| 17 | Dimdik Duruş Rozeti | Hz. Nûh | 1 | Nihai |
| 18 | Yumuşak Cesaret Rozeti | Hz. Nûh | 2 | Nihai |
| 19 | Açık Kapı Rozeti | Hz. Nûh | 3 | Nihai |
| 20 | Asırlık Sabır Rozeti | Hz. Nûh | 4 | Nihai |
| 21 | Vaktinde Hazırlık Rozeti | Hz. Nûh | 5 | Nihai |
| 22 | Dalgada Güven Rozeti | Hz. Nûh | 6 | Nihai |
| 23 | Şefkatli Çağrı Rozeti | Hz. Nûh | 7 | Nihai |
| 24 | Bereketli İniş Rozeti | Hz. Nûh | 8 | Nihai |
| 25 | Vaade Güven Rozeti | Hz. Musa | 1 | Nihai |
| 26 | Göz Aydınlığı Rozeti | Hz. Musa | 2 | Nihai |
| 27 | Doğru Taraf Rozeti | Hz. Musa | 3 | Nihai |
| 28 | Karşılıksız İyilik Rozeti | Hz. Musa | 4 | Nihai |
| 29 | Çözülen Düğüm Rozeti | Hz. Musa | 5 | Nihai |
| 30 | Korkuyu Aşan Adım Rozeti | Hz. Musa | 6 | Nihai |
| 31 | Gerçeği Kabul Rozeti | Hz. Musa | 7 | Nihai |
| 32 | İbret Alan Göz Rozeti | Hz. Musa | 8 | Nihai |
| 33 | Açılan Yol Rozeti | Hz. Musa | 9 | Nihai |
| 34 | Öğrenen Yolcu Rozeti | Hz. Musa | 10 | Nihai |
| 35 | Paylaşılan Nimet Rozeti | Hz. Eyyûb | 1 | Nihai |
| 36 | İlk Andaki Sabır Rozeti | Hz. Eyyûb | 2 | Nihai |
| 37 | Zor Günde Vefa Rozeti | Hz. Eyyûb | 3 | Nihai |
| 38 | Merhamete Sığınma Rozeti | Hz. Eyyûb | 4 | Nihai |
| 39 | Sabrın Pınarı Rozeti | Hz. Eyyûb | 5 | Nihai |
| 40 | Batmayan Işık Rozeti | Hz. İbrahim | 1 | Nihai |
| 41 | Saygılı Öğüt Rozeti | Hz. İbrahim | 2 | Nihai |
| 42 | Düşünerek İnanma Rozeti | Hz. İbrahim | 3 | Nihai |
| 43 | Uyandıran Soru Rozeti | Hz. İbrahim | 4 | Nihai |
| 44 | Açık Delil Rozeti | Hz. İbrahim | 5 | Nihai |
| 45 | Ateşte Esenlik Rozeti | Hz. İbrahim | 6 | Nihai |
| 46 | Yola Çıkan İman Rozeti | Hz. İbrahim | 7 | Nihai |
| 47 | Duayla Emanet Rozeti | Hz. İbrahim | 8 | Nihai |
| 48 | Misafir Sevinci Rozeti | Hz. İbrahim | 9 | Nihai |
| 49 | Doğru Kişiye Danışma Rozeti | Hz. Yusuf | 1 | Nihai |
| 50 | Yalnız Değilim Rozeti | Hz. Yusuf | 2 | Nihai |
| 51 | Özenli Hizmet Rozeti | Hz. Yusuf | 3 | Nihai |
| 52 | Korunan İffet Rozeti | Hz. Yusuf | 4 | Nihai |
| 53 | Haksızlıkta Sabır Rozeti | Hz. Yusuf | 5 | Nihai |
| 54 | Aklanan İsim Rozeti | Hz. Yusuf | 6 | Nihai |
| 55 | Güvenilir Bekçi Rozeti | Hz. Yusuf | 7 | Nihai |
| 56 | Kardeşe Sahip Çıkma Rozeti | Hz. Yusuf | 8 | Nihai |
| 57 | Başa Kakmayan Af Rozeti | Hz. Yusuf | 9 | Nihai |
| 58 | Kucaklayan Şükür Rozeti | Hz. Yusuf | 10 | Nihai |
| 59 | Adil Çözüm Rozeti | Hz. Süleyman | 1 | Nihai |
| 60 | Şükürle Çalışma Rozeti | Hz. Süleyman | 2 | Nihai |
| 61 | Küçük Canlıya Özen Rozeti | Hz. Süleyman | 3 | Nihai |
| 62 | Önce Dinleme Rozeti | Hz. Süleyman | 4 | Nihai |
| 63 | Gönül Tokluğu Rozeti | Hz. Süleyman | 5 | Nihai |
| 64 | Nimette Tevazu Rozeti | Hz. Süleyman | 6 | Nihai |
| 65 | Bilgide Tevazu Rozeti | Hz. Süleyman | 7 | Nihai |
| 66 | Görev Bilinci Rozeti | Hz. Yunus | 1 | Nihai |
| 67 | Dürüst İtiraf Rozeti | Hz. Yunus | 2 | Nihai |
| 68 | Karanlıktaki Dua Rozeti | Hz. Yunus | 3 | Nihai |
| 69 | Rahmet Gölgesi Rozeti | Hz. Yunus | 4 | Nihai |
| 70 | Kırgınlığı Bırakma Rozeti | Hz. Yunus | 5 | Nihai |
| 71 | Teslim Olan Kalp Rozeti | Hz. Îsâ | 1 | Nihai |
| 72 | Silkelenen Dal Rozeti | Hz. Îsâ | 2 | Nihai |
| 73 | Söz Orucu Rozeti | Hz. Îsâ | 3 | Nihai |
| 74 | Hepimizin Rabbi Rozeti | Hz. Îsâ | 4 | Nihai |
| 75 | Allah'ın İzniyle Rozeti | Hz. Îsâ | 5 | Nihai |
| 76 | Gönüllü Yardım Rozeti | Hz. Îsâ | 6 | Nihai |
| 77 | Herkes İçin Dua Rozeti | Hz. Îsâ | 7 | Nihai |
| 78 | Tükenmeyen Umut Rozeti | Hz. Îsâ | 8 | Nihai |
| 79 | Umutla Çaba Rozeti | Hz. İsmail | 1 | Nihai |
| 80 | Güzel Komşuluk Rozeti | Hz. İsmail | 2 | Nihai |
| 81 | Birlikte Teslimiyet Rozeti | Hz. İsmail | 3 | Nihai |
| 82 | Tatlı Dil Rozeti | Hz. İsmail | 4 | Nihai |
| 83 | El Birliği Rozeti | Hz. İsmail | 5 | Nihai |
| 84 | Vaadinde Sadakat Rozeti | Hz. İsmail | 6 | Nihai |

**Nihai** = dinî doğruluk onayı verilmiş, kalıcı ad. Değiştirilmez.

> **16 Ekim 2026 — Hz. İsmail nihai içerikle eklendi.** Altı ad da §2'deki önceki
> 78 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-ISMAIL-KAYNAK-DENETIMI.md` §C1 ve `KITAP-HZ-ISMAIL-ICERIK-final.md` §I6,
> Hasan onayı; "Çaba" ve "Komşu" kelimeleri matriste ilk kez geçiyor). Nüans ayrışmaları:
> *Teslim Olan Kalp* (Îsâ 1) bireysel kabul, *Birlikte Teslimiyet* **baba ile oğlun
> Allah'ın emrine birlikte teslim olmasıdır** (Sâffât 103). *Vaade Güven* (Musa 1)
> Allah'ın sözüne güvenmek, *Vaadinde Sadakat* **kendi verdiği sözü tutmaktır**
> (Meryem 54); *Sözü Koruma* (Âdem 3) ve *Güvenilen Söz* (İdrîs 4) ile adı ayrı.
> *Gelen Umut* (Şît 1) ve *Tükenmeyen Umut* (Îsâ 8) umudu korumak, *Umutla Çaba*
> **umudu oturup beklemek yerine harekete dökmektir**. *Misafir Sevinci* (İbrahim 9)
> misafiri ağırlamak, *Güzel Komşuluk* **yabancıyı komşu olarak yanına almak ve suyu
> kurallı, adil paylaşmaktır**. *Saygılı Öğüt* (İbrahim 2) ve *Yumuşak Cesaret* (Nûh 2)
> doğruyu nazikçe söylemek, *Tatlı Dil* **evdeki sözün şükürle ve güzellikle
> kurulmasıdır**. *El Birliği* **aile içinde büyükle küçüğün aynı işi birlikte
> yapmasıdır**; *Gönüllü Yardım* (Îsâ 6) ve §2.1'deki serbest *Dayanışma* ile
> karıştırılmaz. Kitap adı hiçbir rozet adında geçmiyor.

> **16 Ekim 2026 — Hz. Îsâ nihai içerikle eklendi.** Sekiz ad da §2'deki önceki
> 70 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-ISA-KAYNAK-DENETIMI.md` §C1 ve `KITAP-HZ-ISA-ICERIK-final.md` §I6,
> Hasan onayı). Nüans ayrışmaları: *Dikkatli Kalp* (Âdem 4) fısıltıya karşı kendini
> korumak, *Teslim Olan Kalp* **anlaşılması zor bir haberi saygıyla sorup Allah'a
> güvenle kabul etmektir**. *Silkelenen Dal* en zor anda küçük adımı atmaktır (sette
> benzersiz). *Sözü Koruma* (Âdem 3) verilen sözü tutmak, *Güvenilen Söz* (İdrîs 4)
> başkalarının güvenmesi; *Söz Orucu* **gerektiğinde susabilmektir** (yakın sahne:
> *Aklanan İsim*, Yusuf 6 — adı farklı). *Hepimizin Rabbi* setteki ilk tevhid adıdır.
> *Nimette Tevazu* / *Bilgide Tevazu* (Süleyman 6–7) ile ayrışma: *Allah'ın İzniyle*
> **başarıyı kendine mal etmemektir**. *Karşılıksız İyilik* (Musa 4) yabancıya
> karşılıksız yardım; *Gönüllü Yardım* **çağrıya ilk cevap vermektir** (§2.1'deki serbest
> *Dayanışma* ile karıştırılmaz). "Dua" üç adda, nüanslar ayrı: *Duayla Emanet*
> (İbrahim 8), *Karanlıktaki Dua* (Yunus 3) ve *Herkes İçin Dua* **duaya herkesi
> katmaktır**; *Merhamete Sığınma* (Eyyûb 4) ise kendi derdini Allah'a açmaktır. *Gelen Umut* (Şît 1)
> kayıptan sonra teselli; *Tükenmeyen Umut* **tehlike anında umudu korumaktır**. Kitap
> adı hiçbir rozet adında geçmiyor.

> **16 Ekim 2026 — Hz. Yunus nihai içerikle eklendi.** Beş ad da §2'deki önceki
> 65 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-YUNUS-KAYNAK-DENETIMI.md` §C1 ve `KITAP-HZ-YUNUS-ICERIK-final.md` §I6,
> Hasan onayı; "Göreve Sahip Çıkma" Yusuf'taki kalıp tekrarı yüzünden "Görev Bilinci"
> oldu). Nüans ayrışmaları: *Asırlık Sabır* (Nûh 4) ve *Vazgeçmeyen El* (İdrîs 3)
> sonucu görmeden sürdürme sabrı/emeği; *Görev Bilinci* **verilen görevi, fark
> edilmese de sorumlulukla sürdürmektir**. *Gerçeği Kabul* (Musa 7) ve *Aklanan İsim*
> (Yusuf 6) ile ayrışma: *Dürüst İtiraf* **kimse görmemişken kendi hatasını
> söylemektir**. *Tövbe* (Âdem 5) adının kendisi kullanılmadı. "Dua" üç adda,
> nüanslar ayrı: *Duayla Emanet* (İbrahim 8) ayrılıkta sevdiklerini emanet etmek,
> *Karanlıktaki Dua* **en zor anda hatayı kabul edip Allah'a yönelmek**, Îsâ'nın
> açık taslağındaki *Herkes İçin Dua* ise başkaları için dua. *Merhamete Sığınma*
> (Eyyûb 4) derdi Allah'a açmak, *Sabrın Pınarı* (Eyyûb 5) sabrın sonundaki rahmet;
> *Rahmet Gölgesi* **yorgunken gelen küçük iyiliği fark edip şükretmektir**. *Başa
> Kakmayan Af* (Yusuf 9) affeden tarafın tutumu; *Kırgınlığı Bırakma* **eski
> kırgınlığı geride bırakıp sevinçle karşılamaktır**. Kitap adı hiçbir rozet adında
> geçmiyor.

> **16 Ekim 2026 — Hz. Süleyman nihai içerikle eklendi.** Yedi ad da §2'deki önceki
> 58 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-SULEYMAN-KAYNAK-DENETIMI.md` §C1 ve `KITAP-HZ-SULEYMAN-ICERIK-final.md` §I6,
> Hasan onayı). Nüans ayrışmaları: §2.1'deki serbest *Adalet Rozeti* ileride
> kullanılabilir; *Adil Çözüm* **iki tarafı da gözeten karardır**. *Bereketli İniş*
> (Nûh 8), *Paylaşılan Nimet* (Eyyûb 1) ve *Kucaklayan Şükür* (Yusuf 10; kavuşma anında
> suçlamadan şükür) ile ayrışma: *Şükürle Çalışma* **şükrü çabayla göstermektir**
> (Sebe 13). *Şefkatli Çağrı* (Nûh 7) insana şefkat; *Küçük Canlıya Özen* merhametin
> **hayvan** nüansıdır. *Doğruyu Arama* (Şît 2) aramak; *Önce Dinleme* **hüküm vermeden
> önce dinlemektir**. *Karşılıksız İyilik* (Musa 4) ve *Paylaşılan Nimet* (Eyyûb 1)
> vermekle ilgili; *Gönül Tokluğu* **hediyeyle/malla etkilenmemektir**. *Nimette
> Tevazu* setteki ilk "tevazu" adıdır (*Sakin Güç* — Âdem 7 — öfkeyi tutmak); *Bilgide
> Tevazu* **bilmediğini kabul etmektir** (*Meraklı Zihin* — Âdem 2 — ve *Öğrenen Yolcu* —
> Musa 10 — öğrenmek). Kitapta iki tevazu, iki uç (Eyyûb'daki iki sabır emsali).
> **Sonraki kitaplar için:** katalogda tevazu Hz. Hûd ve Hz. Ömer'de de var; onlara
> başka nüans kalır (tavır, makamda tevazu). Yakın nüans (açık taslak): *Nimette
> Tevazu* / *Bilgide Tevazu* – Îsâ *Allah'ın İzniyle* (adlar farklı, sorun değil).

> **16 Ekim 2026 — Hz. Yusuf nihai içerikle eklendi.** On ad da §2'deki önceki
> 48 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-YUSUF-KAYNAK-DENETIMI.md` §C1 ve `KITAP-HZ-YUSUF-ICERIK-final.md` §I6,
> Hasan onayı). Nüans ayrışmaları: *Çözülen Düğüm* (Musa 5) Allah'tan yardım
> istemek, *Doğru Kişiye Danışma* **güvendiğin büyüğe danışmaktır**. *Gelen Umut*
> (Şît 1), *Dalgada Güven* (Nûh 6) ve *Açılan Yol* (Musa 9) ile ayrışma: *Yalnız
> Değilim* **terk edilmişken Allah'ın yanında olduğunu bilmektir**. *Yılmayan Emek*
> (Şît 3) ve *Vazgeçmeyen El* (İdrîs 3) ile ayrışma: *Özenli Hizmet* **kendi
> seçmediği bir yerde işi özenle yapmaktır**. *Dikkatli Kalp* (Âdem 4) içten gelen
> fısıltıya karşı korunmak, *Korunan İffet* **dışarıdan gelen yanlış isteğe "hayır"
> demektir**. *Haksızlıkta Sabır* **haksız yere bekletilirken** sabırdır (Öğreten /
> Asırlık / İlk Andaki / Sabrın Pınarı'ndan ayrı). *Gerçeği Kabul* (Musa 7)
> başkasının gerçeği kabul etmesi, *Aklanan İsim* **kendi adının dürüstçe temize
> çıkmasını istemektir**. *Güvenilen Söz* (İdrîs 4) söze güvenilmesi, *Güvenilir
> Bekçi* **emanet edilen malı korumaktır**. *Kardeşe Sahip Çıkma* **suçlanan
> kardeşi bırakmamaktır**. *Tövbe* (Âdem 5) af dileyenin tarafı, *Başa Kakmayan Af*
> **affedenin tarafıdır**. *Bereketli İniş* (Nûh 8), *Paylaşılan Nimet* (Eyyûb 1) ve
> *Göz Aydınlığı* (Musa 2) ile ayrışma: *Kucaklayan Şükür* **kavuşma anında kimseyi
> suçlamadan şükretmektir**. **Sonraki kitaplar için:** *Güzel Sabır* hâlâ Hz.
> Yakup'a ayrılmıştır; Hz. Hârûn (#17) kitabındaki "kardeşine destek" nüansı
> *Kardeşe Sahip Çıkma*'dan **yardımcı olmak** yönüne ayrışmalı. Yakın nüanslar
> (açık taslaklar): *Aklanan İsim* – Îsâ *Söz Orucu*, *Kucaklayan Şükür* – Süleyman
> *Şükürle Çalışma*, *Başa Kakmayan Af* – Yunus *Kırgınlığı Bırakma*.

> **16 Ekim 2026 — Hz. İbrahim nihai içerikle eklendi.** Dokuz ad da §2'deki
> önceki 39 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-IBRAHIM-ICERIK-final.md` §I6, Faz 1 ve Faz 2 Hasan onayı). Nüans
> ayrışmaları: *Doğruyu Arama* (Şît 2) kendi gözüyle bakıp gerçeği öğrenmek,
> *Batmayan Işık* **geçici olanın ötesinde hiç batmayanı aramak**, *Düşünerek
> İnanma* ise **"herkes böyle yapıyor" baskısında taklit etmeden düşünmektir**.
> *Yumuşak Cesaret* (Nûh 2) doğruyu nazik dille söylemek; *Saygılı Öğüt* **sevilen
> bir büyüğe saygıyla doğruyu söylemektir** (baba–oğul). *Gerçeği Kabul* (Musa 7)
> gördüğün gerçeği kabul etmek, *Uyandıran Soru* **soruyla başkasını düşündürmek**,
> *Açık Delil* **güçlü biri karşısında sakin ve açık kanıt göstermektir**. *Dalgada
> Güven* (Nûh 6) ve *Vaade Güven* (Musa 1) ile ayrışma: *Ateşte Esenlik* **tehlikenin
> ortasında Allah'a sığınıp korunmaktır**. *Yola Çıkan İman* setteki ilk "iman"
> adıdır (doğru bildiği için yurdundan ayrılmak); *iman* kutusu Musa'da kalır.
> *Devralınan Emanet* (Şît 4) ve *Huzurlu Miras* (Âdem 8) ile ayrışma: *Duayla
> Emanet* **ayrılıkta sevdiklerini duayla Allah'a emanet etmektir**; paralel
> taslaklardaki *Karanlıktaki Dua* (Yunus) ve *Herkes İçin Dua* (Îsâ) ile nüans
> ayrı. *Açık Kapı* (Nûh 3) dışlanana sahip çıkmak, *Paylaşılan Nimet* (Eyyûb 1)
> bolluğu paylaşmak; *Misafir Sevinci* **yeni geleni sevinçle karşılayıp
> ağırlamaktır**.

> **15 Ekim 2026 — Hz. Eyyûb nihai içerikle eklendi.** Beş ad da §2'deki önceki
> 34 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-EYYUB-KAYNAK-DENETIMI.md` §C1, Hasan onayı). Nüans ayrışmaları:
> *Karşılıksız İyilik* (Musa 4) yabancıya karşılık beklemeden yardımdır,
> *Paylaşılan Nimet* **bolluğu şükürle paylaşmaktır**. *Öğreten Sabır* (İdrîs 2)
> tekrar tekrar anlatma, *Asırlık Sabır* (Nûh 4) sonucu görmeden çok uzun
> sürdürme sabrıdır; *İlk Andaki Sabır* **kötü haberin ilk anındaki** sabırdır,
> *Sabrın Pınarı* ise **sabrın sonundaki rahmettir** (kitapta iki sabır adı, iki
> ayrı uç). *Şefkatli Çağrı* (Nûh 7) insana şefkattir; *Merhamete Sığınma* derdi
> **Allah'ın merhametine açmaktır** (Enbiyâ 83). *Zor Günde Vefa* setteki ilk
> "vefa" adıdır; Muhammed — Veda ve Emanet ile Ebû Bekir kitaplarına dostluğa ve
> söze vefa nüansı kalır. §2.1'deki serbest *Sabır Başlangıç Rozeti* anlamca
> *İlk Andaki Sabır*'a yakın olduğu için ileride kullanılmamalıdır. *Güzel Sabır*
> bilinçli olarak kullanılmadı (Hz. Yakup kitabına kalır).

> **13 Ekim 2026 — Hz. Musa nihai içerikle eklendi.** On ad da §2'deki önceki
> 24 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-MUSA-KAYNAK-DENETIMI.md` §C1, Hasan onayı). Nüans ayrışmaları:
> *Dalgada Güven* (Nûh 6) hazırlıktan sonra sonucu Allah'a bırakmaktır;
> *Vaade Güven* Allah'ın sözüne güvenip **en sevdiğini bırakabilmek**, *Açılan
> Yol* ise **hiçbir çıkış görünmezken** güvenmektir. *Gelen Umut* (Şît 1) kayıptan
> sonra teselli, *Göz Aydınlığı* **ayrılıktan sonra kavuşmadır**. *Yumuşak
> Cesaret* (Nûh 2) doğruyu nazik dille söylemektir; *Korkuyu Aşan Adım* bilinçli
> olarak **korkuya rağmen gitme** nüansına kaydırıldı (§3 cesaret stratejisi).
> *Doğruyu Arama* (Şît 2) aramak, *Gerçeği Kabul* **gördüğün gerçeği herkesin
> önünde kabul etmektir**. *İbret Alan Göz* uyarıdan ders çıkarmaktır; *Sözü
> Koruma* (Âdem 3) ve *Güvenilen Söz* (İdrîs 4) var olduğu için adda "söz"
> kullanılmadı. *Meraklı Zihin* (Âdem 2) merak edip öğrenmek, *Öğrenen Yolcu*
> **bilgili olduğu hâlde öğrenmek için yola çıkıp sabretmektir**. *Doğru Taraf*
> (haksızın yanında durmamak), *Karşılıksız İyilik* ve *Çözülen Düğüm*
> (yardım istemek) sette benzersizdir.

> **12 Ekim 2026 — Hz. Nûh nihai içerikle eklendi.** Sekiz ad da §2'deki
> önceki 16 adla ve §2.1'deki serbest adlarla çakışmıyor (gerekçeler
> `KITAP-HZ-NUH-KAYNAK-DENETIMI.md` §C1, Hasan onayı). Nüans ayrışmaları:
> *Dikkatli Kalp* (Âdem 4) içten gelen fısıltıya karşı **kendini korumayı**,
> *Dimdik Duruş* **kalabalığın baskısına** rağmen doğruda kalmayı anlatır.
> *Öğreten Sabır* (İdrîs 2) **tekrar tekrar anlatma**, *Asırlık Sabır* **sonucu
> görmeden çok uzun süre sürdürme** sabrıdır. *Ölçülü Buluş* (İdrîs 1) sonucu
> **tartmayı**, *Vaktinde Hazırlık* tehlike gelmeden **hazırlanmayı** anlatır.
> *Dalgada Güven* yalın "Güven" yerine kitaba özgü nüansı taşır; §2.1'deki
> serbest *Güven Rozeti* ileriki kitaplar için açık kalır. *Yeni Başlangıç*
> (Âdem 6) tövbe sonrası kurulan hayat, *Gelen Umut* (Şît 1) kayıptan sonra
> teselli, *Bereketli İniş* ise **kurtuluştan sonra şükürle** başlamaktır.

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

**Görsel durumu kısaltmaları:** `—` üretilmedi · `□` kare teslim edildi,
çerçeve betiği henüz çalışmadı · `✓` çerçeveli son dosya yerinde. 20 Eki
2026'dan itibaren çerçeveyi `npm run odul-cerceve -- kitap {key}` kodla ekler
(ICERIK-GORSEL-SICILI §6.2, PROJE-MODELI 6.1); üretim oturumu kare teslimden
sonra betiği çalıştırır.
**20 Ekim 2026:** Musa, Eyyûb, Yunus, İbrahim, Yusuf, Süleyman, Îsâ ve İsmail'in
60 rozeti ortak çerçeveyle `✓` oldu (`99e2f49`). Âdem, Şît ve Nûh eski tek parça
çerçeveli görselleriyle `✓` kalır; ortak çerçeveye geçmeleri için çerçevesiz
yeniden üretim gerekir (Hasan kararı).
**17 Ekim 2026 itibarıyla 74 rozet görseli teslim edildi** (Hz. Âdem 8 ·
Hz. Şît 4 · Hz. Nûh 8 — 512×512 şeffaf PNG, çerçeveli; Hz. Musa 10 · Hz. Eyyûb 5 ·
Hz. Yunus 5 · Hz. İbrahim 9 · Hz. Yusuf 10 · Hz. Süleyman 7 · Hz. Îsâ 8 — 512×512 kare PNG, çerçeve bekliyor). Kalan 142 rozet görseli bekliyor.

### Bölge 1 — İlk İzler Vadisi (6 kitap · 34 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Âdem | `adem` | 8 | `hz-adem/bolum-1…8` | öğrenme, sorumluluk, tövbe, umut | ✅ Nihai (§2) | ✓ 8/8 |
| Hz. Şît | `sit` | 4 | `hz-sit/bolum-1…4` | emanet, devamlılık, aile, doğruluk | ✅ Nihai (§2) | ✓ 4/4 |
| Hz. İdrîs | `idris` | 4 | `hz-idris/bolum-1…4` | bilgi, doğruluk, sabır, emek | ✅ Nihai (§2) | — 0/4 |
| Hz. Nûh | `nuh` | 8 | `hz-nuh/bolum-1…8` | sabır, güven, tedbir, umut | ✅ Nihai (§2) | ✓ 8/8 |
| Hz. Hûd | `hud` | 5 | `hz-hud/bolum-1…5` | tevazu, cesaret, doğruluk, sorumluluk | Bekliyor (K1) | — |
| Hz. Sâlih | `salih` | 5 | `hz-salih/bolum-1…5` | emanet, ölçülülük, sözünde durma, saygı | Bekliyor (K1) | — |

### Bölge 2 — Bereketli Aile Yolu (6 kitap · 39 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. İbrahim | `ibrahim` | 9 | `hz-ibrahim/bolum-1…9` | tevhid, cesaret, teslimiyet, misafirperverlik | ✅ Nihai (§2) | ✓ 9/9 |
| Hz. Lût | `lut` | 5 | `hz-lut/bolum-1…5` | ahlâk, cesaret, koruma, doğruluk | Bekliyor (K1) | — |
| Hz. İsmail | `ismail` | 6 | `hz-ismail/bolum-1…6` | teslimiyet, çalışma, aile, sözünde durma | ✅ Nihai (§2) | ✓ 6/6 |
| Hz. İshak | `ishak` | 4 | `hz-ishak/bolum-1…4` | şükür, aile, sabır, devamlılık | Bekliyor (K2) | — |
| Hz. Yakup | `yakup` | 5 | `hz-yakup/bolum-1…5` | sabır, sevgi, umut, bağışlama | Bekliyor (K1) | — |
| Hz. Yusuf | `yusuf` | 10 | `hz-yusuf/bolum-1…10` | sabır, iffet, güvenilirlik, bağışlama | ✅ Nihai (§2) | ✓ 10/10 |

### Bölge 3 — Sabır ve Cesaret Geçidi (6 kitap · 33 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Eyyûb | `eyyub` | 5 | `hz-eyyub/bolum-1…5` | sabır, şükür, umut, dayanıklılık | ✅ Nihai (§2) | ✓ 5/5 |
| Hz. Şuayb | `suayb` | 5 | `hz-suayb/bolum-1…5` | dürüstlük, adalet, ölçülülük, cesaret | Bekliyor (K1) | — |
| Hz. Zülkifl | `zulkifl` | 4 | `hz-zulkifl/bolum-1…4` | sabır, emanet, sözünde durma, düzen | Bekliyor (K2) | — |
| Hz. Musa | `musa` | 10 | `hz-musa/bolum-1…10` | cesaret, özgürlük, adalet, güven | ✅ Nihai (§2) | ✓ 10/10 |
| Hz. Hârûn | `harun` | 5 | `hz-harun/bolum-1…5` | kardeşlik, destek, iletişim, sorumluluk | Bekliyor (K1) | — |
| Hz. Yûşa | `yusa` | 4 | `hz-yusa/bolum-1…4` | sadakat, cesaret, emanet, kararlılık | Bekliyor (**K3**) | — |

### Bölge 4 — Hikmet Sarayları (4 kitap · 22 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Dâvûd | `davud` | 6 | `hz-davud/bolum-1…6` | cesaret, adalet, emek, şükür | Bekliyor (K1) | — |
| Hz. Süleyman | `suleyman` | 7 | `hz-suleyman/bolum-1…7` | hikmet, şükür, merhamet, adalet | ✅ Nihai (§2) | ✓ 7/7 |
| Hz. İlyas | `ilyas` | 5 | `hz-ilyas/bolum-1…5` | tevhid, cesaret, sabır, doğruluk | Bekliyor (K2) | — |
| Hz. Elyesa | `elyesa` | 4 | `hz-elyesa/bolum-1…4` | emanet, devamlılık, iyilik, sabır | Bekliyor (K2) | — |

### Bölge 5 — Umut Işıkları Diyarı (5 kitap · 26 rozet)

| Kitap | bookKey | Böl. | Anahtar aralığı | Ana değerler | İçerik | Görsel |
|---|---|---:|---|---|---|---|
| Hz. Yunus | `yunus` | 5 | `hz-yunus/bolum-1…5` | tövbe, umut, sorumluluk, sabır | ✅ Nihai (§2) | ✓ 5/5 |
| Hz. Şa‘yâ | `saya` | 4 | `hz-saya/bolum-1…4` | doğruluk, umut, cesaret, emanet | Bekliyor (**K3**) | — |
| Hz. Zekeriyyâ | `zekeriyya` | 5 | `hz-zekeriyya/bolum-1…5` | dua, hizmet, umut, güven | Bekliyor (K1) | — |
| Hz. Yahyâ | `yahya` | 4 | `hz-yahya/bolum-1…4` | hikmet, merhamet, doğruluk, sadelik | Bekliyor (K2) | — |
| Hz. Îsâ | `isa` | 8 | `hz-isa/bolum-1…8` | merhamet, tevhid, umut, yardım, doğruluk | ✅ Nihai (§2) | ✓ 8/8 |

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
| Nihai rozet adı kayıtlı | 84 |
| Geçici demo adı kayıtlı | 0 |
| Ad bekleyen | 132 |
| Üretilmiş rozet görseli | 80 |
| Rozet görseli bekleyen | 136 |

Üretilmiş 80 görsel: `rozetler/hz-adem/bolum-1…8.png` ve
`rozetler/hz-sit/bolum-1…4.png` (11 Ağu 2026), `rozetler/hz-nuh/bolum-1…8.png`
(13 Eki 2026) — 512×512 şeffaf PNG; `rozetler/hz-musa/bolum-1…10.png`
(13 Eki 2026), `rozetler/hz-eyyub/bolum-1…5.png` (15 Eki 2026) ve
`rozetler/hz-yunus/bolum-1…5.png` (16 Eki 2026), `rozetler/hz-ibrahim/bolum-1…9.png`
`rozetler/hz-yusuf/bolum-1…10.png`, `rozetler/hz-suleyman/bolum-1…7.png`, `rozetler/hz-isa/bolum-1…8.png` ve `rozetler/hz-ismail/bolum-1…6.png` (17 Eki 2026) — kare teslim edildi, 20 Eki 2026'da ortak çerçeveyle 512×512 şeffaf PNG oldu (`✓`).
Madalya görselleri bu matriste izlenmez; sicilleri `ICERIK-GORSEL-SICILI.md`
§5'tedir (`madalyalar/hz-adem.png`, `hz-sit.png` ve `hz-nuh.png` teslim edildi;
`hz-musa.png`, `hz-eyyub.png`, `hz-yunus.png`, `hz-ibrahim.png`, `hz-yusuf.png`, `hz-suleyman.png`, `hz-isa.png` ve `hz-ismail.png` kare
teslim edildi, 20 Eki 2026'da ortak çerçeveye alındı).

> **12 Ağu 2026 — Hz. İdrîs:** dört rozet **adı** nihai olarak kaydedildi
> (12 → 16), ama **görselleri henüz üretilmedi.** `rozetler/hz-idris/bolum-1…4.png`
> ve `madalyalar/hz-idris.png` şu an yer tutucudur; bu yüzden görsel sayaçları
> 12/204 olarak DEĞİŞMEDİ. Brifler teslimin §H'sindedir.

> **12 Eki 2026 — Hz. Nûh:** sekiz rozet **adı** nihai olarak kaydedildi
> (16 → 24); görselleri henüz üretilmedi. `rozetler/hz-nuh/bolum-1…8.png` ve
> `madalyalar/hz-nuh.png` yer tutucudur, görsel sayaçları 12/204 olarak kaldı.
> Brifler `KITAP-HZ-NUH-ICERIK-final.md` §H'sindedir.
>
> **13 Eki 2026 — Hz. Nûh görselleri teslim edildi** (`/gorsel-uretim nuh`):
> sekiz rozet ve kitap madalyası gerçek 512×512 şeffaf PNG; görsel sayaçları
> 12 → 20 / 204 → 196.

> **13 Eki 2026 — Hz. Musa:** on rozet **adı** nihai olarak kaydedildi
> (24 → 34); görselleri henüz üretilmedi. `rozetler/hz-musa/bolum-1…10.png` ve
> `madalyalar/hz-musa.png` yer tutucudur, görsel sayaçları 20/196 olarak kaldı.
> Brifler `KITAP-HZ-MUSA-ICERIK-final.md` §H'sindedir.
>
> **13 Eki 2026 — Hz. Musa görselleri teslim edildi** (`/gorsel-uretim musa`):
> on rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 2K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 20 → 30 / 196 → 186.

> **15 Eki 2026 — Hz. Eyyûb:** beş rozet **adı** nihai olarak kaydedildi
> (34 → 39); görselleri henüz üretilmedi. `rozetler/hz-eyyub/bolum-1…5.png` ve
> `madalyalar/hz-eyyub.png` yer tutucudur, görsel sayaçları 30/186 olarak kaldı.
> Brifler `KITAP-HZ-EYYUB-ICERIK-final.md` §H'sindedir.
>
> **15 Eki 2026 — Hz. Eyyûb görselleri teslim edildi** (`/gorsel-uretim eyyub`):
> beş rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 2K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 30 → 35 / 186 → 181.

> **16 Eki 2026 — Hz. İbrahim:** dokuz rozet **adı** nihai olarak kaydedildi
> (39 → 48); görselleri henüz üretilmedi. `rozetler/hz-ibrahim/bolum-1…9.png` ve
> `madalyalar/hz-ibrahim.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-IBRAHIM-ICERIK-final.md` §H'sindedir. Kitap katalogda
> "preparing" durumunda (yayına alınmadı).

> **16 Eki 2026 — Hz. Yusuf:** on rozet **adı** nihai olarak kaydedildi
> (48 → 58); görselleri henüz üretilmedi. `rozetler/hz-yusuf/bolum-1…10.png` ve
> `madalyalar/hz-yusuf.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-YUSUF-ICERIK-final.md` §H'sindedir. Kitap katalogda
> "preparing" durumunda (yayına alınmadı).

> **16 Eki 2026 — Hz. Süleyman:** yedi rozet **adı** nihai olarak kaydedildi
> (58 → 65); görselleri henüz üretilmedi. `rozetler/hz-suleyman/bolum-1…7.png` ve
> `madalyalar/hz-suleyman.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-SULEYMAN-ICERIK-final.md` §H'sindedir. Kitap katalogda
> "preparing" durumunda (yayına alınmadı).
>
> **17 Eki 2026 — Hz. Süleyman görselleri teslim edildi** (`/gorsel-uretim suleyman`):
> yedi rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 2K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 59 → 66 / 157 → 150.

> **16 Eki 2026 — Hz. Yunus:** beş rozet **adı** nihai olarak kaydedildi
> (65 → 70); görselleri henüz üretilmedi. `rozetler/hz-yunus/bolum-1…5.png` ve
> `madalyalar/hz-yunus.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-YUNUS-ICERIK-final.md` §H'sindedir (B2 sembolü "dalgalarda beyaz
> yelken ve ışık"; Faz 1'deki kura çubukları değil). Kitap katalogda "preparing"
> durumunda (yayına alınmadı).
>
> **16 Eki 2026 — Hz. Yunus görselleri teslim edildi** (`/gorsel-uretim yunus`):
> beş rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 2K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 35 → 40 / 181 → 176.

> **16 Eki 2026 — Hz. Îsâ:** sekiz rozet **adı** nihai olarak kaydedildi
> (70 → 78); görselleri henüz üretilmedi. `rozetler/hz-isa/bolum-1…8.png` ve
> `madalyalar/hz-isa.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-ISA-ICERIK-final.md` §H'sindedir. Kitap katalogda "preparing"
> durumunda (yayına alınmadı).
>
> **17 Eki 2026 — Hz. Îsâ görselleri teslim edildi** (`/gorsel-uretim isa`):
> sekiz rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 1.5K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 66 → 74 / 150 → 142.

> **17 Eki 2026 — Hz. İsmail görselleri teslim edildi** (`/gorsel-uretim ismail`):
> altı rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 1.5K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 74 → 80 / 142 → 136.

> **16 Eki 2026 — Hz. İsmail:** altı rozet **adı** nihai olarak kaydedildi
> (78 → 84); görselleri henüz üretilmedi. `rozetler/hz-ismail/bolum-1…6.png` ve
> `madalyalar/hz-ismail.png` yer tutucudur, görsel sayaçları 35/181 olarak kaldı.
> Brifler `KITAP-HZ-ISMAIL-ICERIK-final.md` §H'sindedir. Kitap katalogda "preparing"
> durumunda (yayına alınmadı).

> **17 Eki 2026 — Hz. İbrahim görselleri teslim edildi** (`/gorsel-uretim ibrahim`):
> dokuz rozet ve kitap madalyası **çerçevesiz kare** (§6.2 kuralı) 512×512 PNG;
> 2K ana dosyalar `gorsel-kaynaklari/` altında. Görsel sütunu `□` — çerçeveyi
> Hasan ekleyince `✓` olur. Görsel sayaçları 40 → 49 / 176 → 167.

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
4. Görsel üretimi bittiğinde kare ana dosyalar `gorsel-kaynaklari/` altına
   konur ve `npm run odul-cerceve -- kitap {key}` çalıştırılır; §4'teki
   "Görsel" sütunu `✓` yapılır. Betik çalışmadıysa sütun `□` kalır (REVİZE
   20 Eki 2026 — eskiden çerçeveyi Hasan Photoshop'ta ekliyordu).
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
