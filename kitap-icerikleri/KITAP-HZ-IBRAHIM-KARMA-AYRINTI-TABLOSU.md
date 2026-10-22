# HZ. İBRAHİM (a.s.) — KARMA TARZ YENİDEN YAZIMI: AYRINTI TABLOSU

> **Tarih:** 23 Ekim 2026 · **Durum:** 1. aşama. Hasan'ın altı karar sorusuna
> cevabı bekleniyor; v2 yazılmadı.
> **Kural:** brif §4.3 (üç alan, kaynak ölçeği), §7.2 (ölçüler), §7.10 (karma
> tarz, örnek sahne), §16 (yerleşik kararlar; §16/18 ortak olay). Kitabın Faz 1
> kararları (`KITAP-HZ-IBRAHIM-KAYNAK-DENETIMI.md`, karar kaydı 16 Ekim 2026)
> yeni kurala aykırı değilse geçerlidir; durumları 2. bölümün sonundaki tabloda.
> Taramada İbrahim **"orta"** çıktı (PROJE-MODELI 10, 22 Ekim): anlatıcının sesi
> ve bloklar eklenir; ek olarak rivayet kalıbı seyrelir ve ders cümlesiyle biten
> bölüm sonları yeniden kurulur. Bunların bölüm bölüm yeri 2. bölümde (#9, #10,
> #13, #15, #16).
> **Örnek alınan kitaplar:** Hz. Nûh ve Hz. Sâlih ayrıntı tabloları ve v2 dosyaları.

## Kaynaklar

| Kaynak | Yer | Rolü |
|---|---|---|
| Video: "Hz İbrahim'in Hayatı · Yapay Zeka Canlandırmalı · Peygamberler Serisi B2" (Nûh videosuyla aynı seri; yaklaşık 60 dk; Hasan verdi, 23 Ekim 2026) | `kaynak-videolar/hz-ibrahim/` (transkript, altyazı, künye; **video dosyası yok**, görsel üretmediğimiz için gerekmiyor; git'e girmez) | Ayrıntı adayı, yaygınlık göstergesi. Doğrulama ve görsel referans değil; cümleleri kopyalanmadı |
| Kaynak PDF (`kaynak-pdfler/İBRAHİM.pdf`, A. C. Akıncı, 368 s.; sınırlar için `LUT İSMAİL.pdf` = Lİ) | Faz 1 olay envanteri (A2), rivayet tablosu (A3), kaynak haritası (A4) ve çıkarılanlar (A5) üzerinden. PDF bu oturumda açılmadı (metin çıkarma aracı yok); Faz 1'in "baştan sona okundu" kaydı esas alındı | Ayrıntı adayı. **İB ile Lİ aynı yazarın iki cildi: kaynak sayımında tek kaynak** |
| TDV İslâm Ansiklopedisi: "İBRÂHİM" (Ömer Faruk Harman; Türk edebiyatı bölümü Mustafa İsmet Uzun), "NEMRUD" (Cengiz Batuk, İskender Pala), "HÂCER" (Şaban Kuzgun), "SÂRE" (Ömer Faruk Harman), "İSMÂİL" (Ömer Faruk Harman, Mustafa İsmet Uzun), "MİSAFİR" (Mustafa Çağrıcı), "MANCINIK"; erişim 23.10.2026 | islamansiklopedisi.org.tr/ibrahim--peygamber · /nemrud · /hacer · /sare · /ismail--peygamber · /misafir · /mancinik | Doğrulama |
| Diyanet *Hadislerle İslâm* 2/335 (Hâcer'in bırakılışı), 3/313 (ateşteki söz), 6/41–47 (Hz. İbrâhim bölümü) | hadislerleislam.diyanet.gov.tr | Doğrulama, hadis künyesi |
| Diyanet meali (kuran.diyanet.gov.tr, portalın açtığı Diyanet Vakfı meali): Nisâ 4/125, Nahl 16/120–123, Sâffât 37/83–102, Hicr 15/52–56 bu oturumda açıldı. Öteki âyetler Faz 2'de (16 Ekim) *Kur'an Yolu* ile kontrol edildi (final.md §I8). v2'de çocuk metnine giren yeni âyetler *Kur'an Yolu* ile birebir kontrol edilir | kuran.diyanet.gov.tr | Doğrulama |
| Yayındaki metin | `src/data/books.ts` (Hz. İbrahim, 9 bölüm) ve `KITAP-HZ-IBRAHIM-ICERIK-final.md` (veli raporu F5, final testi E) | Karşılaştırma |
| Ortak olay için | `src/data/books.ts` ve `KITAP-HZ-ISMAIL-ICERIK-final.md` (Hz. İsmail); Hz. Yusuf B1 ("Kenan"); `KITAP-HZ-SALIH-ICERIK-v2.md` | §16/18 denetimi |

**Videonun genel durumu.** Omurgası Kur'an: gök cisimleri (En'âm 76–79), babaya
davet ve veda (Meryem 42–48), putları kırma ve sorgu (Enbiyâ 57–67), Bakara 258,
"Ey ateş, serin ve esenlik ol", vadiye bırakılış, misafirler. Bunların hepsi
yayındaki metinde var. Videonun kendine özgü ve doğrulanan katkısı üç ayrıntı:
ateş anındaki **"Allah bize yeter, O ne güzel vekildir"** sözü (Buhârî), **Hâcer'in
birkaç kez sorup cevap alamaması** (Buhârî) ve Hz. İbrahim'in misafirlere söylediği
**"Rabbinin rahmetinden kim ümit keser?"** sözü (Hicr 56). Videonun ad olarak andığı
"Halîlullah" ve "başlı başına bir ümmet" de Kur'an'dan (Nisâ 125, Nahl 120) ve
yayındaki metinde yok. Geri kalanın bir kısmı tek kaynakta ya da doğrulanamıyor
(annesine sorulan "Rabbim kim?" zinciri, putlara "Kendini korusana!", hasta
kadının adağı, Nemrud'un kurbanı), bir kısmı bize uymaz (tokat, iki tutsak,
kavrulan kuşlar, sivrisinekle ölüm, Mısır'daki saray sahnesi, Sâre'nin
kıskançlığı, Cebrâil'in ateşte ve vadide konuşması, kurbanın bıçak ayrıntıları,
uzun vaaz bölümleri). Videonun yarısı (Mısır, zemzem, kurban, Kâbe) bölüşüm gereği
Hz. İsmail ve Hz. İshak kitaplarına ya da veli raporuna ait. **Videodan bize gelen en
değerli ayrıntı ateş anındaki söz: B6'nın kalbindeki duayı romancının cümlesinden
sahih bir kaynağa taşıyor.**

**Taramanın tespiti (ölçüm, `books.ts`).** Anlatıcı dokuz bölümde çocuğa hiç
seslenmiyor ("sen" geçen yerlerin hepsi kişilerin konuşması); Işıl, soru başlığı
ve kutu yok. "Anlatılanlara göre" 15 kez (B4 3, B6 4, B8 3; B1'de hiç yok, öteki bölümlerde birer);
"Kur'an'a göre / Kur'an'da bildirildiğine göre / anlatıldığına göre" 17 kez (B8'de
4); uzun kalıp 1 kez (B8). Ders cümlesiyle biten bölüm üç (B2, B3, B6); B4, B7 ve
B8'de bölüm sonuna yakın açıklama cümlesi var. İki hikâye parçasının toplamı
2.541–3.650 karakter: B1 3.650 · B2 2.925 · B3 3.179 · B4 3.314 · B5 2.730 ·
B6 2.541 · B7 2.796 · B8 2.931 · B9 2.879. Kitabın en önemli anının (ateş) 1.
kısmı en kısa 1. kısım: 1.087 karakter.

---

## 1. Eklenmesi önerilenler

| # | Ayrıntı | Video | PDF (Faz 1) | TDV / Diyanet | Yayındaki metin | Alan · kademe · uygunluk | Öneri |
|---|---|---|---|---|---|---|---|
| 1 | **Ateş anındaki söz: "Allah bize yeter, O ne güzel vekildir!"** (Hasbünallâh ve ni'me'l-vekîl) | ✔ (23:09–23:17) | Benzeri var: "Sen koruyucumsun, yardımın bana yeter" (s. 217); Faz 1 bunu "PDF'in kendi cümlesi" diye aldı | ✔ *Hadislerle İslâm* 3/313: "Ateşe atıldığı zaman, Hz. İbrâhim (as) … 'Hasbünallâh ve ni'me'l-vekîl' (Allah bize yeter. O ne güzel vekildir!) demişti"; künye Buhârî, Tefsîr (Âl-i İmrân) 13, no. 4563 (İbn Abbas'ın sözü; aynı sözü Uhud'dan sonra Peygamberimiz ve ashabı da söyledi, Âl-i İmrân 3/173). 6/42 aynı sözü Taberî'den verir. TDV "İBRÂHİM" ✘ | B6 Devam: "Anlatılanlara göre o an alçak bir sesle şöyle dua etti: — Allah'ım, sen beni koruyansın ve senin yardımın bana yeter!" (romancının cümlesi, tek kaynak; #18) | Rivayet (olayın nasılı) · **B** (sahabi sözü, Buhârî; derece hükmü verilmez) · U1 · 3 kaynak | **B6 Devam'da yayındaki duanın yerine.** Peygamberimizin sözü olmadığı için "Peygamberimiz buyurdu" denmez; kısa kalıp bir kez, künye kaynak notuna. "Vekil"i anlatıcı tek cümleyle açar; kutu açılmaz (sicilde yok, B6'da *esenlik* var). Hadislerle İslâm'daki "bize" korunur. Sen Olsaydın (a) "Allah'a sığındı" ile uyumlu. Veli raporuna Âl-i İmrân 173 bağı. Karar sorusu 1 |
| 2 | **Hâcer'in sorusunu tekrarlaması ve cevap alamaması:** "Bizi bu ıssız vadide bırakıp nereye gidiyorsun?"; sonra "Sana bunu emreden Allah mı?" | ✔ (41:20–42:16; üç kez) | ✘ (Faz 1 soru 4: iki PDF'te de yok) | ✔ *Hadislerle İslâm* 2/335: "Bu sözleri tekrarlayıp durdu Hacer. Ancak Hz. İbrâhim geriye dönüp cevap vermedi"; 6/43 aynı soru (Buhârî, Enbiyâ 9, no. 3364). ✔ TDV "HÂCER": "Bizi hiçbir ekinin bitmediği ve kimsenin yaşamadığı bu vadiye bırakıp gidecek misin?" | Yalnız son üçlü: "Allah mı emretti? — Evet. — Öyleyse Allah bizi sahipsiz bırakmaz" (Faz 1 karar 4b) | Rivayet · **B** (Faz 1'in açtığı aynı Buhârî rivayeti) · U1 · 3 kaynak | **B8 Devam açılışına:** Hâcer arkasından seslenir, cevap gelmez, bir kez daha seslenir; sonra "Allah mı emretti?" sorusu. Kalıp sahnenin başında bir kez. **"Dönüp bakmadı" yazılmaz:** B8 Sen Olsaydın (c) karşılaştırması "Hz. İbrahim ise vadiden ayrılırken durup sevdiklerine döndü" diyor; ayrıca çocuğa terk edilme duygusu verir. Sessizliğe anlatıcı sebep uydurmaz. Karar sorusu 2 |
| 3 | **Hz. İbrahim'in müjdeye şaşırması ve ümit sözü:** "Bana yaşlılık gelmişken mi müjdeliyorsunuz?" · "Rabbinin rahmetinden, yolunu şaşıranlardan başka kim ümit keser?" | ✔ (47:56–48:16) | ✔ (s. 345–355; Faz 1 A4 B9 "Hicr 51–56") | ✔ Diyanet Hicr 15/54, 56 ("Rabbinin rahmetinden, sapıklardan başka kim ümit keser?", Diyanet Vakfı); TDV "İBRÂHİM" Hicr 15/51–60'ı anıyor | İshak müjdesi tek cümle; Hz. İbrahim'in sözü yok | Değişmez · **A** · U1 | **B9 Devam'da**, müjde cümlesinin hemen ardından. Yalnız Hz. İbrahim'in sözü tırnaklı; elçilerin "ümitsizliğe düşme" sözü dolaylı (Faz 1 karar 3a). Sâre'nin şaşkınlığı (Hûd 71–73; Zâriyât 29–30) Hz. İshak kitabında kalır. B8'deki yıllarca süren dua ile halka kurar. Bölüşümün küçük bir genişlemesi: karar sorusu 3 |
| 4 | **"Allah İbrahim'i dost edindi" ve "Halîlullah" adı** | ✔ (01:58 "Halilullah"; 57:19–57:21 "Halilim, yani dostum") | ✔ ("Allah'ın dostu" s. 149, 208, 332; Faz 1 A3: "Faz 2'de Diyanet'ten numara" — Faz 2'de girmedi) | ✔ Diyanet Nisâ 4/125: "Allah İbrahim'i dost edinmiştir"; TDV "İBRÂHİM" (Nisâ 125; edebî adları Halîl, Halîlullah); *Hadislerle İslâm* 6/47 | ✘ | Değişmez · **A** · U1 · 3 kaynak | **B9'a "Biliyor muydun?" kutusu:** Nisâ 125 + "Halîl 'dost' demektir; bu yüzden ona Halîlullah, 'Allah'ın dostu' denir." Yeri misafir sahnesinin sonu. Kutunun bu kısmı soru gerektirmez. ⚠ *Hadislerle İslâm* 6/47'deki "Halil İbrâhim bereketi" cümlesi videoda ve PDF'te yok: karar sorusu 5 |
| 5 | **"İbrahim … Hakk'a yönelen, Allah'a itaat eden bir önderdi; Allah'a ortak koşanlardan değildi"** | ✔ (56:56 "başlı başına bir ümmetti") | ✔ ("tek başına bir ümmetti" s. 144, 152; Faz 1 A3 "B7 ya da B9") | ✔ Diyanet Nahl 16/120 (Diyanet Vakfı "önder"), 16/123 ("O müşriklerden değildi"). TDV "İBRÂHİM": "İbrâhim'in kısa bir süre için bile olsa gök cisimlerini gerçekten tanrı zannettiği şeklinde bir sonuç çıkarılmamalı" | ✘ (B7'de yalnız Nahl 121, şükür) | Değişmez · **A** · U1 (masumiyet) | **B1 Devam'a kutu:** "Kur'an, Hz. İbrahim'in hiçbir zaman Allah'a ortak koşanlardan olmadığını söyler." Yıldız sahnesindeki "Rabbim budur" sözünü iki açıklamadan birini seçmeden (§16/13) güvenceye alır; iki açıklama veli raporunda kalır. "Ümmet" kelimesi kullanılmaz (Diyanet "önder" diyor; anlamı yorumlu). Soru gerektirmez |
| 6 | **Varılan bereketli toprakların adı: Kenan** | ✔ (29:16 "Kenan diyarına"; 28:56 "Şam topraklarına") | ✔ (VIII. bölüm "Kenan", s. 242–272) | ✔ TDV "HÂCER": "Ken'an diyarında (Filistin)"; "İBRÂHİM" İslâmî kısımda "Filistin diyarı"; *Hadislerle İslâm* 6/43 "Şam'a doğru" (Kurtubî) | Yer adı yok (Faz 1: "Yer adı verilmez") | Rivayet · C · U1 · 3 kaynak | **B7'ye kalıpla tek kelime:** "Anlatılanlara göre bu topraklara Kenan denirdi." Hz. Yusuf kitabı "Kenan denilen geniş topraklarda" diye açılıyor. "Filistin" (güncel siyaset, brif §4.4) ve "Şam" kullanılmaz. Faz 1 kararını değiştirdiği için karar sorusu 6 |

## 2. Yayındaki metinde değişmesi gerekenler (yeni kurala göre)

| # | Metindeki ayrıntı | Yer | TDV / Diyanet | Karar | Öneri |
|---|---|---|---|---|---|
| 7 | **"Babası için Rabbinden bağışlanma dilemeyi hiçbir zaman bırakmayacaktı."** ve **"onun için ettiği dua hiç bitmedi."** | B2 Devam (5. paragraf); B7 Devam (son paragraf) | Tevbe 9/114: "…sırf ona verdiği bir sözden ötürüydü. Ama onun bir Allah düşmanı olduğu kendisine belli olunca ondan uzaklaştı" (final.md §I8'de doğrulandı); Mümtehine 60/4. TDV "İBRÂHİM": babası için af dilediği, "fakat bu dileğinin kabul edilmediği" | **Değişmez alan:** Kur'an'daki olayın sonucu. Veli raporu (F5) zaten Tevbe 114'ü söylüyor; çocuk metni ona ters düşüyor | İki cümle de çıkar. Meryem 47'deki söz kalır ("Rabbimden senin için bağışlanma dileyeceğim"): Hz. İbrahim **söz verdi**. "Hiç bırakmadı / hiç bitmedi" yerine B2'de "babasına kırgın değildi", B7'de vedanın sahnesi. Sen Olsaydın B7 (a) "dua edeceğini söyledi" ve final testi 7. soru etkilenmez |
| 8 | B1'de anlatıcının Hz. İbrahim'in gök cisimlerini Rab sandığını ima eden cümleleri: 1. kısım sonu "Aradığı cevap hâlâ ortada yoktu"; Devam "Hz. İbrahim artık her şeyi açıkça anlamıştı" | B1 | TDV "İBRÂHİM": sözlerinden "kısa bir süre için bile olsa gök cisimlerini gerçekten tanrı zannettiği şeklinde bir sonuç çıkarılmamalı"; Enbiyâ 51 ("daha önce ona doğru düşünme yeteneği vermiştik"); Nahl 120 (#5) | **Değişmez alan:** masumiyet (şirk isnat edilmez). §16/13 nötr anlatım korunur | "Rabbim budur" sözleri Kur'an ifadesiyle kalır. Anlatıcı onun yıldıza inandığını ima etmez; "düşündü, sordu, gösterdi" der. #5'teki kutu. Sen Olsaydın B1'in kurduğu "cevabı bulana kadar düşünmek" çizgisi kalır: TDV İslâmî kaynakların bunu "küçük yaşta dinî bir endişe" olarak da yorumladığını yazıyor; sınır, inandığını söylememek |
| 9 | Kalıp sayımı: "Anlatılanlara göre" 15, Kur'an kalıbı 17, uzun kalıp 1 | Tümü | — | §16/8 revize: rivayet kalıbı olayın başında bir kez; Kur'an bilgisi kesin dille | **Kesin dile döner (kalıp kalkar):** B1 "doğru düşünme yeteneği vermişti" ve "Teslim ol" (Bakara 131); B2 "tertemiz bir kalple" (Sâffât 84); B3 "Hz. Lût … inandı" (Ankebût 26; yeğen rivayetinin kalıbı kalır); B4 halkın kendine dönmesi (Enbiyâ 64); B5 güç ve yetki (Bakara 258), "ne diyeceğini bilemedi"; B6 tuzak (Enbiyâ 70), Ankebût 24; B7 Âzer'in sözü, bereketli topraklar (Enbiyâ 71), şükür (Nahl 121); B8 dua ve müjde (Sâffât 100–101), "kutsal evin yanında", İbrâhim 37; B9 Hûd 74, Bakara 124. **Kalır (bir kez):** B2 put ustalığı, B3 yeğen, B4 bayram–balta sahnesinin başı, B5 Nemrud adı (ya da kutu: "Kur'an kralın adını söylemez; anlatılanlara göre…"), B6 mancınık sahnesinin başı ve ateşin içi (#13), B7 Sâre, B8 Hâcer'in kökeni ve İsmail adı, B9 misafirperverlik rivayeti (#17) |
| 10 | Uzun kalıp **"İslam inancına ve tarihî rivayetlere göre bu yolculuk Allah'ın emriyleydi."** | B8 1. kısım | Buhârî, Enbiyâ 9, no. 3364 (*Hadislerle İslâm* 2/335: "Evet (Allah emretti)"); TDV "İBRÂHİM", "HÂCER" | §16/8 revize; vahiy değişmez alanda ve burada sahih rivayete (B) dayanıyor | Uzun kalıp kalkar. Emir bilgisi 1. kısımda bir kez, kalıpsız ("Rabbinin emri böyleydi", yayındaki 1. kısım sonu); kaynak notu Buhârî. Hz. İsmail B1 de "Allah'ın emriyle" diyor, kalıpsız. Hâcer'in sorusu (#2) bu bilgiyi Devam'da onun ağzından yeniden açar |
| 11 | **"Burada ekin yoktu, ağaç yoktu"** | B8 1. kısım | *Hadislerle İslâm* 2/335: "…zemzem kuyusunun bulunduğu yerin biraz yukarısında yer alan **büyük bir ağacın altına** getirdi" (Buhârî 3364) | **Ortak olay çelişkisi (§16/18):** Hz. İsmail B1'de Hâcer "vadinin ortasındaki yaşlı bir akasyanın gölgesine" oturuyor | "Ağaç yoktu" çıkar; vadide tek bir yaşlı ağaç (İsmail kitabıyla aynı). İbrâhim 37'deki "ekin bitmeyen" kalır. `issiz-vadi` görselinin alt metni v2'de kontrol edilir |
| 12 | **"Kur'an'a göre sonunda birbirlerine şöyle dediler: — Eğer bir şey yapacaksanız, yakın onu…"** | B5 Devam | Enbiyâ 68 Kur'an'da sorgunun hemen ardından gelir. TDV "NEMRUD": Bakara 258'deki tartışma "bir rivayete göre … putları kırdıktan sonra atıldığı hapishanede, diğerine göre ise ateşe atıldıktan sonra" (Taberî). *Hadislerle İslâm* 6/42 de sorgu → kral → ateş sırasını verir | Sıra rivayet alanında; Kur'an iki olayı birbirine bağlamaz | Yayındaki sıra kalır (iki kaynak ve video aynı sırayı veriyor). "Sonunda" ile "Kur'an'a göre" yan yana gelmez: Enbiyâ 68 kesin dille verilir, tartışmayla ateş arasındaki bağı anlatıcı kurar |
| 13 | B6'da dört "anlatılanlara göre": ateşin büyüklüğü ve mancınık · dua · yalnız ipler · gül bahçesi | B6 | Kaynak sayımı aşağıdaki tabloda; §16/8'in kendi örneği: "Kur'an ateşin içinde ne olduğunu anlatmaz; anlatılanlara göre…" | §16/8, §16/17c-4 | Mancınık sahnesi (odun → ateş → mancınık) 1. kısımda tek kalıpla. Dua → #1. Ateşin içi (ipler + bahçe) Enbiyâ 69'un ardından tek **"Biliyor muydun?"** kutusunda. Görsel `alevlerde-yesillik` bahçe rivayetine dayanıyor, kalır |
| 14 | B9 **"Hz. İbrahim çok yumuşak kalpli biriydi"** | B9 Devam | Hûd 11/75: "ağır başlı, hassas ruhlu, kendini Allah'a vermiş" (final.md §I8'de doğrulandı); *Hadislerle İslâm* 6/47 "yumuşak huylu" | Kur'an'ın söylediği bilgi anlatıcı yorumu gibi duruyor | Kur'an'a dayandırılır: "Kur'an onu yumuşak huylu, içli ve kendini Allah'a vermiş biri olarak anar." Lût kavmi için konuşmasının (Hûd 74) hemen yanında |
| 15 | **Ders cümlesiyle biten ya da açıklama kalıbı taşıyan sonlar** | B1, B2, B3, B4, B6, B7, B8 | — | §7.10 azaltılacaklar; §7.2 "bölüm ders cümlesiyle bitmez" | **B1:** "Böylece … ders çıkaracak ve inancı … sağlamlaşacaktı" (1. kısım) ile "Hz. İbrahim gökyüzüne her bakışında … yeniden ders çıkarırdı" (son paragrafın ilk cümlesi) kısalır; "Yıldız da ay da güneş de…" paragrafı sonraki "hiç batmazdı" cümlesiyle aynı fikir, birleşir. Köprü cümlesi kalır. **B2:** son paragrafın ilk iki cümlesi ("Doğruyu söylemek her zaman kolay değildi… sevgiyle, sabırla ve saygıyla") Ne Öğrendik 1'i tekrarlıyor, çıkar; bölüm köprüyle biter. **B3:** son paragraf ("bir şey, çok kişi yaptığı için doğru olmazdı. Doğruyu bulmak için düşünmek, sormak ve aramak gerekirdi…") Ne Öğrendik 1 ve Sen Olsaydın (a) tekrarı; sahne ve köprüyle biter. **B4:** "Bunu bağırıp çağırarak değil, yalnızca doğru sorulmuş bir soruyla yapmıştı" Ne Öğrendik 1 tekrarı, çıkar; "Bu, cevabı herkesin kendi içinde saklı olan bir soruydu" ile "İşte Hz. İbrahim'in beklediği cevap…" aynı fikir, biri kalır (amaç cümlesi Faz 1 karar 2a ve final testi 4. soru için kalır). **B6:** son paragraf ("Hz. İbrahim'i kurtaran ne kendi gücüydü…") teolojik özet; Ankebût 24 öne alınır, bölüm sahne ve B7'ye köprüyle biter (§16/6 "kurtaran Allah'tır" Enbiyâ 69 cümlesinde zaten var). **B7:** "Bu, kırgınlığa rağmen sevgiyle yapılmış bir vedaydı" açıklama kalıbı, çıkar; son cümle #7. **B8:** "Hz. İbrahim sevdiklerini kendi gücüne değil, Allah'ın korumasına bırakıyordu…" Ne Öğrendik 1 ve final testi 8. soru tekrarı; imgeye döner |
| 16 | **1. kısımda doğru cevabı işaret eden cümleler** | B3, B6; soru biçimi B1, B5, B7 | — | §7.10: ders karar noktasından önce gelmez | **B3:** "Bu cevap, düşünmeden yapılan bir taklitti" cümlesi (*taklit* kutusu) kalır; ardından gelen üç açıklama cümlesi ("hiçbir zaman sorgulamamış… sormak akıllarına bile gelmiyordu") Sen Olsaydın'ın cevabını veriyor, Devam'a taşınır ya da çıkar. **B6:** "Korkudan çaresizce ağlayabilir… Ya da bütün kalbiyle … Allah'a sığınabilirdi" doğru şıkkı (a) sayıyor; gerilim sahneyle kurulur, anlatıcı duraklamasıyla kesilir. **B1, B5, B7:** iki seçenekli kapanış soruları doğru seçeneği olumlu sıfatla işaretliyor ("sabırla düşünmeye", "sakin ve açık bir cevap", "güzel bir vedayla"); anlatıcı duraklamasına döner ("Devam etmeden önce sana bir şey soracağım") |
| 17 | **"Anlatılanlara göre o, yanında bir misafir olmadan sofraya oturmak bile istemezdi."** | B9 1. kısım | Yalnız PDF (İB s. 345, Lİ s. 124: aynı yazar). TDV "MİSAFİR" genel ünü veriyor: "Misafir ağırlama geleneğini ilk başlatan kimse olduğu nakledilen Hz. İbrâhim (el-Muvatta', 'Sıfatü'n-nebî', 4) 'ebü'd-dîfân' diye meşhurdur." TDV "İBRÂHİM": "ebü'l-adyâf (misafirler babası)". Video: "Âdeti gereği misafirlerine güzel bir yemek hazırladı" (47:33), sofra ayrıntısı yok | Tek kaynakta geçen rivayet kullanılmaz (§4.3; Hz. Nûh "Semha" emsali) | Karar sorusu 4(b) |
| 18 | B6 duası: "Allah'ım, sen beni koruyansın ve senin yardımın bana yeter!" | B6 Devam | Yalnız PDF (s. 217) | Tek kaynak | #1 ile değişir; karar sorusu 1 |
| 19 | B4: yemeklerin "döndüklerinde geri alınıp evlerde yenmek, putlar kutsasın, bolluk getirsin diye" konması | B4 1. kısım | Yemekler Kur'an'da: Sâffât 37/91 ("Yemiyor musunuz?"; Diyanet Vakfı meali parantezi: "Oraya konmuş yemekleri görünce"). Nedeni yalnız PDF'te (s. 198); TDV ✘, video ✘ | Yemek A'ya dayanıyor; neden tek kaynak | Karar sorusu 4(a). Görsel `dokunulmamis-yemekler` etkilenmez |
| 20 | **Kitap göndermeleri:** "O suyun ve vadide yaşananların hikâyesi Hz. İsmail kitabında anlatılıyor" (B8), "Bu iki önemli olay Hz. İsmail kitabında anlatılıyor" (B9), "orada olanlar Hz. Lût kitabında anlatılıyor" (B9) | B8 sonu; B9 açılış ve Devam | — | §7.10: yazara ya da üretime ait ifade azaltılır. **Hz. Lût kitabı lansmanda yok**; çocuk rotada bulamaz | Hz. İsmail köprüsü anlatıcının sesiyle merak kancasına döner ("Onu Hz. İsmail'in hikâyesinde birlikte okuyacağız"); kitap rotada hemen sonra geliyor. Lût göndermesi kalkar: "Elçiler oradan Hz. Lût'un şehrine doğru yola çıktı." Bölüşüm (Faz 1 karar 1a) değişmez, yalnız cümlenin dili |
| 21 | **Veli raporu (F5)** | `final.md` F5 | — | §16/18 bağlı kural; Sâlih dersi: kitaptan alıntılar v2 ile birebir | (a) Alıntılar birebir: "Esen kal, senin için Rabbimden…" → B7 ve final testi 7. soru "Esen kal, Rabbimden senin için bağışlanma dileyeceğim!" diyor; "Bu işi büyükleri yaptı" → B4 "Bu işi şu büyükleri yapmıştır". (b) "Yıldıza mı inandı?" cevabına: "Her iki açıklamada da Hz. İbrahim'in bir an bile yıldıza taptığı düşünülmez; Kur'an onun Allah'a ortak koşanlardan olmadığını söyler (Nahl 120)." (c) **Yeni madde "Kral ne oldu?"** (Faz 1 planındaydı, F5'e girmemiş): "Kur'an kralın sonunu anlatmaz. Anlatılanlara göre burnundan giren bir sivrisinek yüzünden öldü (TDV 'NEMRUD'); kitap bu rivayeti almadı." (d) Karar 1 kabul edilirse ateş cevabına Hasbünallah künyesi ve Âl-i İmrân 173 bağı. (e) "Kur'an'ın söylediği" ile "kitabın anlattığı" ayrı cümlelerde kalır |

**Yayındaki rivayetlerin kaynak sayımı** (Sâlih dersi: her rivayet için kaç
kaynakta geçtiği)

| Rivayet | Yer | Video | PDF | TDV / Diyanet | Kaynak | Durum |
|---|---|---|---|---|---|---|
| Âzer'in put ustası olması | B2 | ✔ 04:30 | ✔ s. 80–83 | ✔ TDV "İBRÂHİM" ("put ustası olan babası") | 3 | Kalır, kalıpla |
| Hz. Lût'un yeğen olması | B3 | ✔ 29:04 | ✔ s. 150 | ✔ TDV "İBRÂHİM" İslâmî kısım ("yeğeni Lût") | 3 | Kalır, kalıpla |
| Bayram günü | B4 | ✔ 12:30 ("panayır") | ✔ s. 197 | ✔ TDV "İBRÂHİM" ("bir bayram günü … (es-Sâffât 37/88-90)"); *Hadislerle İslâm* 6/42 "şenlik günü" | 4 | Kalır |
| Yemeklerin putların önüne konması | B4 | ✘ | ✔ s. 198, 200 | ✔ Sâffât 91 ve Diyanet meali parantezi | A + 1 | Yemek kalır; nedeni karar 4(a) |
| Baltanın büyük putun boynuna asılması | B4 | ✔ 12:38, 13:39 | ✔ s. 200 | ✔ *Hadislerle İslâm* 6/42 ("elindeki baltayı onun boynuna astı"); TDV ✘ | 3 | Kalır, kalıpla |
| Kralın adı Nemrud | B5 | ✔ 03:24 | ✔ | ✔ TDV "İBRÂHİM", "NEMRUD"; *Hadislerle İslâm* 6/42 | 4 | Kalır; kalıp ya da kutu |
| Ateşin yaklaşılamayacak kadar büyük olması, mancınık | B6 | ✔ 20:28–20:53 | ✔ s. 213 | ✔ TDV "MANCINIK" (Taberî, İbn Kesîr), "İBRÂHİM" Türk edebiyatı bölümü (kısas motifi), "NEMRUD"; *Hadislerle İslâm* 6/42 ("yanına bile yanaşamadıkları harlı ateş") | 4 | Kalır, sahne başında tek kalıp |
| Ateş anındaki dua | B6 | Farklı söz (#1) | ✔ s. 217 | ✘ | 1 | Karar 1 |
| Yalnız iplerin yanması | B6 | ✔ 25:19 | ✔ s. 219, 225 | ✘ | 2 ("TDV'de yok") | Kalır, kutuda |
| Ateşin içinin gül bahçesi gibi olması | B6 | ✘ ("serinlik ve selamet kapısı") | ✔ s. 218–219 | ✔ TDV "İBRÂHİM" Türk edebiyatı bölümü: kısas motifi "düştüğü yerin cennet bahçelerinden bir gül bahçesi haline dönüşmesi" | 2 | Kalır, kutuda; görsel buna bağlı |
| Sâre'nin yolculukta olması | B7 | ✔ 29:04 | ✔ s. 240 | ✔ TDV "İBRÂHİM" İslâmî kısım; *Hadislerle İslâm* 6/43 | 4 | Kalır |
| Hâcer'in Mısırlı olması, Sâre'nin isteğiyle evlilik | B8 | ✔ 34:39–36:07 | ✔ s. 273–277 | ✔ TDV "HÂCER" ("Mısır'dan getirdiği câriyesi Hâcer'i ikinci eş olarak takdim etmiştir") | 3 | Kalır |
| İsmail adının "Allah işitir" anlamı | B8 | ✔ 37:52 | ✔ Lİ s. 173 | ✔ TDV "İSMÂİL": "kelimenin aslı İbrânîce Yişmâ'êl'dir ve 'Tanrı işitir' mânasındadır" (Süryânîce "Allah'a itaatkâr" görüşü de anılıyor) | 3 | Kalır. Hz. Nûh'taki "rahat" anlamından farkı: TDV bunu kelimenin kökü olarak veriyor, Tevrat yorumu olarak değil |
| Bırakılışın Allah'ın emriyle olması; hurma ve su | B8 | ✔ 40:05, 41:14 | ✘ (Lİ dipnot 19 yalnız "bizzat bıraktı") | ✔ Buhârî 3364 (*Hadislerle İslâm* 2/335); TDV "İBRÂHİM", "HÂCER" | B + 2 | Kalır, kalıpsız (#10) |
| Hâcer'in sözü ("sahipsiz bırakmaz") | B8 | ✔ 42:03–42:16 | ✘ | ✔ Buhârî 3364; TDV "HÂCER" | B + 2 | Kalır (Faz 1 karar 4b); ifade Hz. İsmail B1 ile aynı |
| Misafirsiz sofraya oturmama | B9 | ✘ | ✔ İB s. 345, Lİ s. 124 | ✘ (yalnız genel ün, #17) | 1 | Karar 4(b) |

**Ortak kişi ve olay denetimi (§16/18)**

| Konu | Hz. İbrahim (yayında) | Hz. İsmail ve öteki kitaplar (yayında) | Durum |
|---|---|---|---|
| Bırakılışın emri | B8 uzun kalıpla "Allah'ın emriyle" | İsmail B1 "Allah'ın emriyle", kalıpsız | v2'de aynı dil (#10) |
| Erzak | "bir torba hurma ile bir kap su" | İsmail B1 "bir torba hurma ile toprak bir kap su" | ✔ |
| Vadideki ağaç | "ağaç yoktu" | İsmail B1 "yaşlı bir akasyanın gölgesine oturdu"; Buhârî "büyük bir ağaç" | ✘ → #11 |
| Hâcer'in güveni | "Allah bizi sahipsiz bırakmaz" | İsmail B1 "sahipsiz bırakmayacağına … güveniyordu" | ✔ (*Hadislerle İslâm* çevirisi "yok olup gitmemize izin vermeyecektir"; kitapların ortak ifadesi korunur) |
| Suyun kaynaması | B8 sonu "bir su kaynadı"; melek yok | İsmail B1 "Allah'ın izniyle … su kaynıyordu"; melek yok | ✔ |
| Hâcer'in kökeni, Sâre | B8 "Mısırlı bir hanım"; Sâre inanan eş, kıskançlık yok | İsmail'de Sâre ve Mısır yok | ✔ (Sâre'nin kıskançlığı TDV'de ve videoda var, iki kitapta da yok: #40) |
| Ziyaretler | B9 "bereketli topraklardaki çadırına döndü" | İsmail B3 "uzaktaki yurdundan zaman zaman bu vadiye geliyordu" | ✔ |
| Kurban, Kâbe köprüleri | B9 açılışı | İsmail B3 ("el ele geçmişti"), B5 | ✔ |
| Kâbe kelimesi | B8 yalnız "Allah'ın kutsal evi" (İbrâhim 37) | İsmail B1 *Kâbe* kutusu; Sâlih v2 göçte Mekke/Kâbe anmıyor | ✔ İbrahim'de kutulanmaz |
| Hz. Lût | B3 yeğen + iman (Ankebût 26); B7 göç, sonra peygamberlik (Ankebût 28 ve TDV ile uyumlu); helak yok | Lût kitabı lansmanda yok | ✔; kitap göndermesi #20 |
| Hz. İshak | B9 müjde tek cümle | İshak kitabı lansmanda yok | Karar 3 |
| Kenan | Yer adı yok | Hz. Yusuf B1 "Kenan denilen geniş topraklarda" | Karar 6 |

**Sabit alanların v2 hikâyesine bağladığı ayrıntılar** (Sen Olsaydın
karşılaştırmaları, Ne Öğrendik, final testi bunlara dayanıyor; v2 bunları korur)

- **B1:** gece–sabah akışı ("sabaha kadar düşünmeyi sürdürdü"), "Ben batanları sevmem" (final 1), yüzünü yaratana çevirme, "Teslim ol".
- **B2:** atölyeye gidiş, her söze "Babacığım" diye başlama (final 2), kimsenin önünde küçük düşürmeme, babanın kızıp göndermesi, kırıcı söz söylememe.
- **B3:** "atalarımızı böyle yaparken bulduk" (final 3), Hz. İbrahim'in **ertesi gün** yeniden meydana çıkması, Hz. Lût'un inanması.
- **B4:** putlara "Niçin yemiyorsunuz? … konuşmuyorsunuz?", halkın kendine dönmesi, sözün amacını söyleyen anlatıcı cümlesi (final 4; Faz 1 karar 2a). **Işıl "yalan mı?" sorusunu sormaz** (karar 2a: veli raporu).
- **B5:** "Hayat veren ve öldüren benim" ve güneş sözü (final 5), kralın susması.
- **B6:** "Ey ateş, İbrahim'e serin ve esenlik ol!" (final 6), tuzağın boşa çıkması, zarar görmeden çıkış.
- **B7:** "Esen kal! Rabbimden senin için bağışlanma dileyeceğim!" birebir (final 7 alıntılıyor), Hz. Lût'un yolda yanında olması, bereketli topraklar (Enbiyâ 71).
- **B8:** yıllarca evlat duası, Hâcer'in güveni, Hz. İbrahim'in vadiden ayrılırken **durup** onlara dönüp dua etmesi (final 8; karşılaştırma c).
- **B9:** yolcuları hemen buyur edip ağırlama, kızartılmış (besili) buzağı (final 9), Lût'un şehri için konuşma.

**Final testi.** Dokuz sorunun hiçbiri rivayete ya da kurguya dayanmıyor: 1, 3, 5,
6 Kur'an sözü; 2, 7, 8, 9 Kur'an'daki olay ve değeri; 4 Faz 1 karar 2a'daki amaç
cümlesine ve Enbiyâ 64–65'e dayanıyor. Karar soruları final testini etkilemez
(karar 1 B6'daki duayı değiştirir, 6. soru Allah'ın buyruğunu soruyor).

**Faz 1 kararlarının yeni kurala göre durumu**

| Faz 1 kararı | Yeni kurala göre | Durum |
|---|---|---|
| 1 · Bölüşüm (a): vadide kalanlar, kurban, Kâbe İsmail'de; misafirler İbrahim'de; helak Lût'ta; İshak müjdesinin ayrıntısı İshak'ta | Uyumlu (§16/18) | Geçerli; karar 3 küçük bir genişleme önerir |
| 2 · Enbiyâ 63 Kur'an ifadesiyle, amacı anlatıcıdan; Sâffât 89 çocuk metninde yok; "yalan mı?" veli raporunda | Uyumlu (masumiyet, değişmez alan). Videodaki "bir bahaneyle geri çevirdi" (12:35) aynı sözdür | Geçerli |
| 3 · Misafir melekler dolaylı; tırnaklı tek söz "Selam" | Uyumlu (§16/12) | Geçerli; karar 3'te yalnız Hz. İbrahim konuşur |
| 4 · Hâcer'in sözü Buhârî'den (b) | Uyumlu; B kademesi | Geçerli; karar 2 aynı rivayetten genişletir |
| 5 · Kum–buğday rivayeti kullanılmaz | Gerekçe uygunluk (aldatma örneği); yeni kural değiştirmiyor. Videoda yok | Geçerli |
| Yer adı verilmez | Mekân rivayet alanında serbest | Karar sorusu 6 (doğum yeri için kalır: TDV beş görüş sayıyor) |
| Annesi hikâyeye girmez | TDV annenin adı için üç ayrı ad veriyor; mağarada doğum rivayeti bebek öldürme emrine bağlı (U4); videodaki soru zinciri TDV'de yok | Geçerli (#24) |
| Put satma çıkar ("kısas rivayeti; alay dili") | "Kısas rivayeti" gerekçesi düştü (C serbest). TDV'de yok; PDF ve videoda var. Alay dili ve B3'ün "onlarla alay da etmedi" çizgisi kalıyor | Geçerli, gerekçe güncellendi (#25) |
| Kralın tapınılması (Faz 2: romandan geldiği için alınmadı) | Artık C: TDV "İBRÂHİM" Bakara 258'deki kişiyi "tanrılık iddiasında bulunduğu" diye anıyor; "NEMRUD" "insanları kendisine tapınmaya davet eden". Ama Bakara 258'deki diyalog bunu zaten gösteriyor; B5'teki "kendini Allah'ın yerine koymaya kalkıyordu" yeterli | Eklenmez (katkı yok) |
| Cebrâil'in ateşte teklifi veli raporunda | Gayb ve melek konuşması (değişmez alan, §16/12) | Geçerli |
| Mısır'da Sâre veli raporunda | U3 | Geçerli |
| Kralın sonu "veli: Kur'an'da anlatılmaz" | F5'e hiç girmemiş | #21(c) |
| Mancınık, ipler, gül bahçesi birer cümle, kalıpla | Rivayet alanının örneği (brif §4.3); sayım yukarıda | Geçerli; kalıp seyrelir (#13) |
| Uzun kalıp (B8) | §16/8 revize | Değişir (#10) |
| Vefat B9'da tek cümle; yaş yok | Uyumlu (§16/1, §16/9) | Geçerli |

## 3. Videoda olup girmeyenler

| # | Ayrıntı | Neden |
|---|---|---|
| 22 | Çifte açılış ("Büyük bir meydan düşünün"), "kalpler kör", sondaki öğütler ("bize düşen…", "emin olun ki…") (00:01–02:13, 57:02–58:14), "Bunu bana mecbur bıraktın" fragmanı | Karma tarza aykırı (§7.10: vaaz yok); halkı toptan etiketleme (§16/7) |
| 23 | "Babil diyarı, Fırat ile Dicle arası" (02:24–02:29) | TDV doğum yeri için beş görüş veriyor (Sûs, Kûsâ, Verkâ, Harran, Hürmüzcird; müellife göre Urfa daha mâkul); *Hadislerle İslâm* 6/43 "Urfa". Yayındaki "geniş bir nehrin kıyısında" kalır, ad verilmez |
| 24 | Çocuk İbrahim'in annesine "Rabbim kim?" diye sorması, annenin "Benim", "Baban", "Nemrud" demesi; babanın **tokadı** (04:43–05:46) | TDV yalnız "babasına gördüğü şeylerin ne olduğunu ve bir yaratıcısının bulunup bulunmadığını sormuş" der; anne zinciri tek kaynakta. Annenin "Rabbin benim" cevabı çocuğu karıştırır, tokat U3. Faz 1: anne hikâyeye girmez |
| 25 | Putları iple sürükleyip "Bunları kim alır?" diye satmaya çalışması, başlarını suya batırıp "İçin bakalım" demesi (06:03–07:19) | PDF (s. 143) ve videoda var, TDV'de yok. Alay dili; B3'ün "kızmadı, alay da etmedi" çizgisi ve B3/B4 Sen Olsaydın karşılaştırmaları (soru sorarak düşündürmek) bununla çelişir. Faz 1 kararı kalır |
| 26 | Âzer'in Nemrud'un yakını, put rahibi olması; oğlunu Nemrud'a **ihbar etmesi** (04:30–04:40, 10:06–10:19) | Rahiplik ve ihbar tek kaynakta (PDF'te farklı: "evlatlığım" yalanı, kurgu); babayı kötüleştiren ayrıntı B2–B7'deki sevgi çizgisine katkı vermez |
| 27 | Halkın "Bunu bize senin baban öğretti" demesi; "Benim babam da yolunu sapıtanlardandır" (09:38–09:49) | İlki tek kaynak. İkincisi Şuarâ 86'daki duanın ("Babamı bağışla, çünkü o yolunu şaşıranlardandır") bağlamından kopuk hâli |
| 28 | Cebrâil'in vahiy getirmesi, ahireti öğretmesi (10:38–10:47); vadiye giderken Cebrâil'in rehberliği ve burak (40:05–40:16; TDV "İSMÂİL" de anar) | Melek ve vahyin niteliği (§16/12). Yayındaki "Allah ona bildirdi" düzeyi kalır |
| 29 | Bayrama davet edilince "bir bahaneyle" geri çevirmesi (12:35) | Sâffât 89 ("Ben hastayım"); Faz 1 karar 2a: çocuk metnine girmez |
| 30 | Her darbede putlara "Kendini korusana!" demesi (13:06–13:21) | Tek kaynak; kırma sahnesi kısa kalır (Faz 1) |
| 31 | "Kimisinin kalbi yumuşadı, kimisinin öfkesi şiddetlendi" (15:41) | Kim inandı değişmez alanda; Kur'an "sonra eski hallerine döndürüldüler" der (Enbiyâ 65) |
| 32 | Nemrud'un iki tutsak getirtip birini öldürmesi (17:58–18:23) | §16/4, U4; Faz 1 kararı. Veli raporunda karşılığı var |
| 33 | "Üç ay odun toplandı"; hasta kadının "iyileşirsem İbrahim için odun taşırım" adağı (19:34, 20:15–20:20) | Sayı (§16/9). Adak tek kaynakta (PDF'teki Şebbe anlatısı farklı); halkı toptan kötüleyen sahne (§16/7) |
| 34 | Alevlerde **kuşların kavrulup düşmesi** (20:31–20:38); seyircilerin "Hani Rabbin?" diye alay etmesi (21:36–22:04) | U4 (Faz 1 A5); halkı toptan etiketleme. Yayındaki "kimse yaklaşamıyordu" yeterli |
| 35 | **Cebrâil'in teklifi** ("Bir isteğin var mı?" — "Senden hayır") (22:10–22:45) | Melek konuşuyor (§16/12, gayb); isnadı tartışmalı. Faz 1: veli raporunda; orada kalır |
| 36 | Nemrud'un İbrahim'i ateşte diri görmesi, "Çıkmaya gücün yeter mi?" diye sorması, onun yürüyerek çıkması; Nemrud'un "ilahına **dört bin sığır** kurban edeceğim" demesi (24:23–26:52) | Nemrud'un sözleri tek kaynakta ya da PDF'te farklı (Faz 1 A5 "kralın kurbanı", §16/12 grubunda); sayı (§16/9); "kurban" kelimesi Hz. İsmail kitabının konusuyla karışır. Ateşten çıkış Ankebût 24 ve yayındaki cümleyle kalır |
| 37 | **Nemrud'un sivrisinekle ölümü**, kafasına sopalarla vurdurması, "cehenneme yola çıktı" (27:15–28:19) | U4; cehennem hükmü değişmez alan. TDV "NEMRUD" rivayeti "kabul edilir" diye veriyor; yalnız veli raporuna (#21c) |
| 38 | Sâre'nin ateş mucizesinden sonra iman etmesi, evliliğin o zaman olması (28:23–28:43) | PDF'te ateş başında nikâh kurgusu (Faz 1 A5); TDV "SÂRE" akrabalık için birkaç görüş sayar, iman anını söylemez. B7'deki kalıplı cümle yeter |
| 39 | **Mısır:** kuraklık, firavun, "evli ise kocası öldürülür", Sâre'nin saraya götürülüşü, kralın elinin tutulması (29:26–34:44) | Özü sahih hadis (Buhârî, Büyû' 100; Enbiyâ 8, no. 3358), ama evli kadına el uzatma 8–11 yaşa uygun değil (U3). Faz 1 kararı: veli raporunda; orada var |
| 40 | Hâcer'in prenses olması (36:15–36:25); **Sâre'nin kıskançlığı**, evde "misafir gibi" hissetmesi (38:19–39:45) | Prenseslik TDV "HÂCER"de rivayet, katkısı yok; "Mısırlı bir hanım" yeter. Kıskançlık TDV'de de var ama U3; Sâre'yi kötü gösterir, iki kitabın da çizgisi dışında (Faz 1) |
| 41 | Vaaz bölümleri: kaderin sırrı (36:46–37:33), Bakara 216 (42:25–42:35), "bu çölü cennet bahçesine çevirmek için…" (42:49–43:09) | Karma tarza aykırı (§7.10) |
| 42 | Yolda sulak yerlerde durmamaları (40:17–40:23) | Tek kaynak |
| 43 | Susuzluk, Safa–Merve, Cebrâil'in ayağıyla suyu çıkarması, zemzem hadisi, Cürhüm, sa'yde kadın-erkek farkı (43:18–46:38) | Hz. İsmail kitabının ana anlatısı (bölüşüm); melek (§16/12); sa'y hükmü değişmez alan (hüküm) |
| 44 | Meleklerin "insan kılığına girerek" gelmesi; Sâre'nin çığlıkla gelip yüzüne vurması, "kısır kocakarı" (47:16, 48:17–48:28); İshak soyundan "yüzlerce peygamber" (48:55–49:07) | Meleğin görünüşü (§16/12, Faz 1 karar 3a); Sâre'nin tepkisi Hz. İshak kitabında (karar 3); sayı |
| 45 | Kurban: üç gece aynı rüya, "13 yaş", şeytanın üç kez gelmesi, İsmail'in "beni bağla, yüzüstü yatır, gömleğimi anneme ver" istekleri, bıçağın kesmemesi, Cebrâil'in koçla inmesi (49:20–55:15) | Hz. İsmail kitabının ana anlatısı; sayı; bıçak ve boğazlama ayrıntısı U4; melek. İsmail kitabı bunları almadı |
| 46 | Kâbe'nin Nûh tufanında yıkılmış olması, Hac 26, Kâbe'nin son peygambere sığınak olması (55:29–56:52) | Hz. İsmail kitabının alanı; Hz. Şît kitabı Kâbe'yi var olan yapı anlattı, İsmail "temellerini yükseltti" çizgisinde (Faz 1). Hz. Muhammed alanı |
| 47 | Sâffât 95–96: "Yonttuğunuz şeylere mi tapıyorsunuz? Oysa sizi de yaptıklarınızı da Allah yarattı" (09:31) | Kur'an'da var ve doğru; ama Kur'an'da putlar kırıldıktan sonraki sorguda geçer (Sâffât 94–96) ve B4'teki Enbiyâ 66–67 aynı sözü taşıyor. Tekrar olur; B1'deki "İnsanın kendi elleriyle yaptığı bir şey…" cümlesi fikri zaten veriyor |

**Anlatım alanında serbest olanlar (kaynak istemez):** gece gökyüzü ve sabahın
gelişi, atölyenin talaşı ve keskisi, meydan ve pazar, bayram sabahı boşalan
şehir, saray koridoru, odun yığınları ve dumanın ağırlığı, çölde yolculuk,
çadırlar ve kuyular, vadide akşam rüzgârı; Hz. İbrahim'in kralın huzuruna
çağrılınca korkudan çok "belki dinler" umudu taşıması (video 16:12, iç ses), ateş
önündeki sükûneti, vadiden ayrılırken yüreğinin ağırlığı. Bunların çoğu yayındaki
metinde var.

---

## Karar soruları (Hasan)

1. **Ateş anındaki söz (#1, #18).** B6'daki "Allah'ım, sen beni koruyansın ve
   senin yardımın bana yeter!" duası romancının cümlesi; başka kaynakta yok.
   Yerine videodaki ve *Hadislerle İslâm*'daki **"Allah bize yeter, O ne güzel
   vekildir!"** sözü girsin mi?
   *Önerim:* Evet. Kaynağı İbn Abbas'ın Buhârî'deki sözü (Tefsîr, Âl-i İmrân 13,
   no. 4563; *Hadislerle İslâm* 3/313). Peygamberimizin sözü olmadığı için
   "Peygamberimiz buyurdu" denmez; olayın başında bir kez kısa kalıp, künye kaynak
   notuna. "Vekil"i anlatıcı tek cümleyle açar, kutu açılmaz. Veli raporundaki ateş
   cevabına, aynı sözü Peygamberimizin ve arkadaşlarının da söylediği eklenir
   (Âl-i İmrân 173).
2. **Hâcer'in sorusu (#2).** B8 Devam'da Hâcer önce "Bizi bu ıssız vadide bırakıp
   nereye gidiyorsun?" diye birkaç kez seslensin, cevap alamasın, sonra "Bunu
   sana Allah mı emretti?" diye sorsun mu?
   *Önerim:* Evet, ama Hz. İbrahim'in "dönüp bakmadığı" yazılmadan. Hepsi Faz 1'in
   açtığı aynı Buhârî rivayetinde (Enbiyâ 9, no. 3364; *Hadislerle İslâm* 2/335) ve
   videoda var. Sessizlik, Hâcer'in güveni kendi aklıyla bulmasını gösterir.
   "Dönüp bakmadı" ise bölümün Sen Olsaydın (c) karşılaştırmasıyla ("durup
   sevdiklerine döndü") çelişir ve çocuğa terk edilme duygusu verir. Sessizliğe
   anlatıcı sebep uydurmaz.
3. **Hz. İbrahim'in ümit sözü (#3).** B9'da İshak müjdesinin ardından Hz.
   İbrahim'in şaşkınlığı ve **"Rabbinin rahmetinden, yolunu şaşıranlardan başka
   kim ümit keser?"** sözü (Hicr 54–56) girsin mi?
   *Önerim:* Evet, yalnız Hz. İbrahim'in sözü. Faz 1 bölüşümü müjdenin ayrıntısını
   Hz. İshak kitabına vermişti; bu küçük bir genişleme. Elçilerin sözü dolaylı
   kalır (karar 3a), Sâre'nin şaşkınlığı İshak kitabına kalır. B8'deki yıllarca dua
   ile halka kurar, bölüme Kur'an'dan bir ümit cümlesi kazandırır.
4. **Tek kaynakta kalan iki rivayet (#17, #19).** Yeni kurala göre tek kaynakta
   geçen rivayet kullanılmıyor (Hz. Nûh'ta "Semha" bu yüzden çıktı).
   (a) B4'te yemeklerin "döndüklerinde geri alınıp bereket getirsin diye" konması
   yalnız PDF'te. (b) B9'daki "yanında misafir olmadan sofraya oturmazdı" yalnız
   PDF'te (iki cilt, aynı yazar). TDV yalnız genel ünü veriyor: "Misafir ağırlama
   geleneğini ilk başlatan kimse olduğu nakledilen Hz. İbrâhim … 'ebü'd-dîfân' diye
   meşhurdur" ("MİSAFİR"). Ne yapalım?
   *Önerim:* (a) Yemekler kalır (Sâffât 91; Diyanet meali "Oraya konmuş yemekleri
   görünce"), nedenini anlatan cümle çıkar; görsel değişmez. (b) Cümle TDV'nin
   ifadesine döner: "Anlatılanlara göre misafir ağırlamayı ilk başlatan oydu; ona
   'misafirlerin babası' denirdi." ⚠ Bu ifade doğrulayan kaynaktan geliyor (PDF'te
   ve videoda yok); kural doğrulayan kaynağın yeni ayrıntı getirmesine izin vermediği
   için ayrı onayın gerekir. Onaylamazsan cümle tamamen çıkar; misafirperverliği
   Kur'an'daki sahnenin kendisi taşır.
5. **"Halil İbrahim bereketi" (#4).** B9'a girecek "Allah'ın dostu" kutusu (Nisâ
   125; Halîlullah adı) soru gerektirmiyor. Kutunun sonuna "Sofradan kalkarken
   edilen 'Halil İbrahim bereketi' duası da adını ondan alır" cümlesi eklensin mi?
   *Önerim:* Evet. Çocuk bu sözü evde duymuş olabilir; misafir bölümüyle doğal bir
   bağ kurar. ⚠ Kaynağı *Hadislerle İslâm* 6/47 ("İbrâhim'in gününden beri sunulan
   ikram ve yedirilen yemeğe karşı misafirin duası hep 'Halil İbrâhim
   bereketi'dir"); videoda ve PDF'te yok, bu yüzden ayrı onayına bırakıyorum.
6. **Kenan adı (#6).** B7'de varılan bereketli topraklara ad verilsin mi:
   "Anlatılanlara göre bu topraklara Kenan denirdi"?
   *Önerim:* Evet, tek kelime. Faz 1 yer adı vermemişti; yeni kurala göre mekân
   rivayet alanında serbest. Video, PDF ve TDV ("HÂCER": "Ken'an diyarında
   (Filistin)") aynı adı veriyor; Hz. Yusuf kitabı da "Kenan denilen geniş
   topraklarda" diye açılıyor. "Filistin" ve "Şam" kullanılmaz; doğum yerine ad
   verilmez (TDV beş görüş sayıyor).

**Soru gerektirmeyen değişiklikler** (itiraz edilmezse geçerli): Tevbe 114 ile
çelişen iki cümlenin düzelmesi (#7, değişmez alan); B1'de masumiyet çizgisi ve
Nahl 120 kutusu (#5, #8); B9'a Nisâ 125 kutusu (#4, Kur'an kısmı); kalıpların
seyrelmesi ve uzun kalıbın kalkması (#9, #10); B8'de vadideki ağaç (#11, Hz.
İsmail kitabıyla tutarlılık); B5'te sıra cümlesi (#12); B6'da ateşin içi için tek
kutu (#13); B9'da Hûd 75 (#14); ders cümleleri ve 1. kısımda cevabı ele veren
cümleler (#15, #16); kitap göndermelerinin dili ve Lût göndermesinin kalkması
(#20); veli raporunda alıntıların birebirliği, yıldız cevabına Nahl 120 ve yeni
"Kral ne oldu?" maddesi (#21).

Kararlardan sonra sıra: `KITAP-HZ-IBRAHIM-ICERIK-v2.md`. Dokuz bölüm karma
tarzda yazılır; anlatıcı hiç seslenmediği için sesi ve Işıl/soru/kutu blokları her
bölümde. Yayındaki bölümler 2.541–3.650 karakter; B5, B6 ve B7 alt sınıra yakın.
B6'nın 1. kısmı (1.087) kitabın en önemli anı olduğu hâlde en kısası: odun, ateş ve
mancınık sahne olarak yavaşlatılır. Karar 2 ve 3 kabul edilirse B8 ve B9 Devam
uzar; ~900 karakterlik düz metin sınırı aşılırsa yeni görsel gerekir, yazım
notlarında listelenir. Sen Olsaydın, Seçimini Karşılaştır, Ne Öğrendik, görevler,
final testi ve görseller değişmez; veli raporu değişiklikleri `final.md` F5'te
yapılır. Sonra içerik denetçisi ve senin okuman.
