# Karma tarz v2 yeniden yazımı — çalışma kuralları

> Lansman kitaplarının hikâye metinleri yeniden yazılırken (22–24 Ekim 2026, Nûh'tan Dâvûd'a
> dokuz kitap) Hasan'ın verdiği kararların özeti. Kuralların kaynağı brif §4.3, §7.2, §7.10, §16
> ve PROJE-MODELI Bölüm 10'dur; bu dosya onları tekrar etmez, uygulamada çıkan ölçüleri toplar.
> Yan oturum brifin tamamı yerine bu dosyayı ve tek bir örnek kitabı (en son biten) okur;
> bir kuralın ayrıntısı gerekirse brifin ilgili maddesine bakar.

## Akış
1. **Ayrıntı tablosu** `KITAP-HZ-{X}-KARMA-AYRINTI-TABLOSU.md`: Kaynaklar + genel durum ·
   eklenmesi önerilenler · yayındaki metinde değişmesi gerekenler · girmeyenler · her rivayetin
   kaç kaynakta geçtiği · ortak kişi/olay · karar soruları ("Önerim:" ile). Commit, dur.
2. Hasan'ın kararlarıyla **v2** `KITAP-HZ-{X}-ICERIK-v2.md` (iskelet: son biten kitabın v2'si).
   Yalnız iki hikâye parçası değişir; öteki bölümler `books.ts`'ten kopyalanır. Sabit alan
   değişikliği v2'nin ilgili bölümüne yazılır (aktarım betiği Özet ve NE ÖĞRENDİK'i oradan alır);
   veli raporu ve final testi `-final.md`'nin F5 ve E bölümlerinde (betik oradan alır).
3. `node scripts/v2-onizleme-uret.mjs src/data/books.ts {v2} {key} <scratchpad>/x.ts` hatasız
   ayrışmalı. Ölçüler tabloda: bölüm 2.500–4.000 karakter (hedef değil; dar banda sıkışmasın),
   cümle ≤18 kelime, düz metin aralığı ≤~900.
4. `icerik-denetcisi` (raporunu bekle). Mekanik bulgu düzeltilir; Hasan'a bırakılan bulgu
   **uygulanmaz**, karar sorusu olur. Commit; rapor açık kararları tam metinle verir.
5. Aktarımı ana oturum `node scripts/v2-aktar.mjs {key} --yaz` ile yapar; betiğin yazmadığı
   (görsel alt metni, Sen Olsaydın, karşılaştırma, görev) "Aktarım için" listesinde tam metinle durur.

## Kaynak
- **Tek kaynakta geçen rivayet girmez** (yalnız PDF ya da yalnız video). Video yoksa PDF'teki
  rivayet ancak TDV'de ya da onun andığı klasik kaynakta doğrulanırsa girer. İki video tek kaynaktır.
- Tevrat/İncil kaynaklı, İslami kaynakta doğrulanmayan motif girmez (Eyyûb'da genç dost, Dâvûd'da
  taht entrikası ve mabet hazırlığı). Merdud anlatılar hiçbir yerde.
- "Anlatılanlara göre" diye verilen bilgi sahih hadisse **hadis olarak** verilir ("Peygamberimiz
  (s.a.v.) anlatmıştır…"); künye *Hadislerle İslâm* ya da Buhârî/Müslim. Orada bulunmayan hadis
  (ör. yalnız Tirmizî, Beyhakî) çocuk metnine girmez, veli raporuna gider.
- Siyer olayı (Hz. Muhammed dönemi) kaynak ölçüsü belirlenmediği için yalnız veli raporunda.
- Kur'an'daki olayın **sırası** ve "kim inandı, ne oldu" değişmez alandır (Lût'un imanı Ankebût 26'ya
  göre ateşten sonra; halkın imanı yalnız PDF'teyse çıkar). Rivayet yeni mucize eklemez.
- Bir hadisteki söz başka sahneye taşınmaz; gerekiyorsa hatıra olarak anılır.
- Âyet mealleri Diyanet; meal kelimesi yerine kendi kelimeni koyma, sadeleştirdiysen notta belirt;
  Kur'an'da olmayan ayrıntı âyete eklenmez ("ikiye yarıldı" değil "yarıldı").

## Çocuk metni
- **Sayılar:** hadisteki sayılar (yedi tur, iki ziyaret, gecenin üçte biri) ve yaş/yıl/süre girmez;
  sahneyle gösterilir, sayı veli raporuna künyesiyle gider. Kur'an'daki sayı kalabilir, notta belirt.
- Rivayet kalıbı olayın başında bir kez, kısa; Kur'an bilgisinden rivayete dönülürken yeniden açılır.
- Hassas sahnede (ölüm, şiddet, istismar riski, "sebebini sonra anlarsın") Işıl sorusu + anlatıcı
  cevabıyla kısa **güvence paragrafı**: olay özeldi; sana zarar veren/gizli tutulmasını isteyen
  olursa uzaklaş, güvendiğin büyüğe anlat. Emsal: Âdem B7, İsmail B3, Yusuf B4, Eyyûb B2, Musa B10,
  Dâvûd B2. Veli raporuna bunu haber veren bir satır eklenir.
- Peygamberin hatası Kur'an'ın ifadesiyle; anlatıcı onu savunmaya ya da açıklamaya dönmez,
  Kur'an'da olmayan bir davranış (ör. "olanı saklamadı") eklemez.
- Kişi adı rivayetten geliyorsa ve hikâyeye bir şey katmıyorsa verilmez (Züleyha, Kudâr).
- Sözlük kelimesi kutusundan önce geçmez. Bölüm sözlük kelimesiyle açılıyorsa büyük harf verilmez.
- Metinden çıkan bir ayrıntıyı anlatan görsel alt metni "Aktarım için"e yazılır; görsel çoğu
  zaman kalır, alt metin sadeleşir (Eyyûb `ziyaret-patikasi`, Dâvûd `mescit-tepesi`).

## Sabit alanlar, final testi, veli raporu
- Sabit alan önerisi tam metinle karar sorusu olur; kurgu ayrıntısı içermez, aynı bölümün
  Seçimini Karşılaştır metnini tekrar etmez.
- **Final testi** kurguya dayanmaz; rivayete dayanan soru "Hikâyede…" diye kurulur. Şık
  uzunlukları dengeli, yanlış şıklar aynı ekle bitmez. N. soru N. bölümden; dayanak cümle
  bölümde aynı kelimelerle geçer.
- **Veli raporu** (F5): Kur'an'ın söylediği ile kitabın anlatımı ayrılır; kitaptan alıntılar v2 ile
  birebir; cevaplar en fazla 5 cümle; `**kalın**` yok (Sohbet sayfası düz metin çizer); derece
  hükmü ("zayıf rivayet") verilmez. Aileler videodan duymuş olabilir: yaygın yanlışa madde açılır
  (Medâin-i Sâlih, kurt rivayeti).
- final.md D bölümündeki seslendirme notları v2'den sonra eski kalır; seslendirmeden önce güncellenir.
