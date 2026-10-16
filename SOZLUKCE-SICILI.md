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
| Zekât | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. | Hz. İsmail · 6 |

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
| 43 | Rab | Her şeyi yaratan, besleyen ve yöneten Allah'ı anlatan bir addır. | Hz. İbrahim · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 44 | davet | Birini güzel sözlerle doğru yola çağırmaktır. | Hz. İbrahim · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 45 | taklit | Düşünmeden başkalarının yaptığını aynen yapmaktır. | Hz. İbrahim · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 46 | tapınak | İnsanların putlarına ibadet etmek için yaptıkları yapıdır. | Hz. İbrahim · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 47 | delil | Bir şeyin doğru olduğunu gösteren açık işarettir. | Hz. İbrahim · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 48 | esenlik | Zarar görmeden, huzur ve güven içinde olmaktır. | Hz. İbrahim · 6 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 49 | bereket | Bir şeyin artarak bol ve faydalı olmasıdır. | Hz. İbrahim · 7 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 50 | vadi | İki dağ ya da tepe arasında uzanan alçak yerdir. | Hz. İbrahim · 8 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 51 | misafirperver | Misafirlerini sevinçle karşılayıp onlara en güzel şekilde ikram eden kimsedir. | Hz. İbrahim · 9 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 52 | haset | Başkasındaki bir iyiliği çekemeyip onun elinden gitmesini istemektir. | Hz. Yusuf · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 53 | kervan | Yük taşıyan hayvanlarla birlikte uzun yola çıkan yolcu topluluğudur. | Hz. Yusuf · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 54 | dirhem | Eski zamanlarda kullanılan küçük gümüş paradır. | Hz. Yusuf · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 55 | Aziz | Eski Mısır'da kraldan sonra gelen büyük yöneticiye verilen unvandır. | Hz. Yusuf · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 56 | iffet | Kendini utanç verici ve yasak davranışlardan koruyup temiz kalmaktır. | Hz. Yusuf · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 57 | zindan | Eski zamanlarda insanların kapatıldığı kapalı ve karanlık hapishanedir. | Hz. Yusuf · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 58 | kıtlık | Yiyeceğin çok azaldığı ve insanların zorlukla geçindiği dönemdir. | Hz. Yusuf · 6 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 59 | ambar | Tahıl ve yiyeceklerin uzun süre saklandığı büyük depodur. | Hz. Yusuf · 7 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 60 | kefil | Bir sözün yerine getirileceğine kendi adıyla güvence veren kişidir. | Hz. Yusuf · 8 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 61 | af | Bize yanlış yapan birini bağışlayıp ona kin tutmamaktır. | Hz. Yusuf · 9 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 62 | hasret | Uzakta olan birini ya da bir yeri çok özlemektir. | Hz. Yusuf · 10 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 63 | dava | İki tarafın anlaşamadığı bir konuyu karar vermesi için birine götürmesidir. | Hz. Süleyman · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 64 | cin | Allah'ın yarattığı, gözle göremediğimiz varlıklardır. | Hz. Süleyman · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 65 | sıvazlamak | Elini bir yerin üzerinde yavaşça gezdirerek okşamaktır. | Hz. Süleyman · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 66 | hüdhüd | Başında taç gibi tüyleri olan, ibibik de denen bir kuştur. | Hz. Süleyman · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 67 | melike | Bir ülkeyi yöneten kadın hükümdardır. | Hz. Süleyman · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 68 | billur | Çok saydam ve parlak bir cam türüdür. | Hz. Süleyman · 6 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 69 | gayb | Yalnız Allah'ın bildiği, insanların göremediği ve bilemediği şeylerdir. | Hz. Süleyman · 7 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 70 | elçi | Bir mesajı başkalarına ulaştırmakla görevlendirilen kişidir. | Hz. Yunus · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 71 | kura | Bir işin kime düşeceğini belirlemek için yapılan çekiliştir. | Hz. Yunus · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 72 | tesbih | Allah'ı her türlü eksiklikten uzak tutup O'nu yüceltmektir. | Hz. Yunus · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 73 | rahmet | Allah'ın kullarına gösterdiği sınırsız şefkat ve iyiliktir. | Hz. Yunus · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 74 | lakap | Birine, bir özelliği ya da yaşadığı bir olay yüzünden verilen ikinci addır. | Hz. Yunus · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 75 | mabet | İnsanların Allah'a ibadet etmek için toplandığı yerdir. | Hz. Îsâ · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 76 | müjde | Sevindirici bir haberi önceden bildirmektir. | Hz. Îsâ · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026; KARAR 6a) |
| 77 | tasa | İnsanın içini kaplayan üzüntü ve kaygıdır. | Hz. Îsâ · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 78 | iftira | Birinin yapmadığı kötü bir şeyi ona yüklemektir. | Hz. Îsâ · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 79 | Tevrat | Allah'ın Hz. Musa'ya indirdiği kutsal kitaptır. | Hz. Îsâ · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 80 | İncil | Allah'ın Hz. Îsâ'ya indirdiği kutsal kitaptır. | Hz. Îsâ · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 81 | cüzzam | Deride yaralar açan, eskiden insanların çok korktuğu bulaşıcı bir hastalıktır. | Hz. Îsâ · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 82 | havari | Hz. Îsâ'ya inanıp Allah yolunda ona yardım eden yakın arkadaşlarına verilen addır. | Hz. Îsâ · 6 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 83 | şölen | Birçok kişinin bir araya gelip sevinçle yemek yediği toplantıdır. | Hz. Îsâ · 7 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 84 | şüphe | Bir şeyin doğru olup olmadığından emin olamamaktır. | Hz. Îsâ · 8 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026; KARAR 6a) |
| 85 | zemzem | Kâbe'nin yakınında, Hz. İsmail'in bebekliğinde kaynayan ve bugün de akan su kaynağıdır. | Hz. İsmail · 1 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 86 | göçebe | Bir yere yerleşmeden, hayvanlarıyla birlikte yer değiştirerek yaşayan kimsedir. | Hz. İsmail · 2 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 87 | teslimiyet | Allah'ın emrine ve takdirine gönülden bağlanıp onları kabul etmektir. | Hz. İsmail · 3 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026; tanım Faz 2 denetiminden sonra Hasan kararıyla) |
| 88 | eşik | Bir evin kapısının altında, içeriyi dışarıdan ayıran kısımdır. | Hz. İsmail · 4 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 89 | temel | Bir yapının toprağa oturan ve onu ayakta tutan en alt kısmıdır. | Hz. İsmail · 5 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 90 | hac | Belirli günlerde Kâbe'yi ve çevresindeki kutsal yerleri ziyaret ederek yapılan ibadettir. | Hz. İsmail · 6 | Yeni terim — **onaylandı** (Hasan, 16 Eki 2026) |
| 91 | zekât | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. | Hz. İsmail · 6 | Sabit sözlükçe (§2) |

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

> **16 Eki 2026 — Hz. İbrahim'de dokuz kutu var** (kitap katalogda henüz
> "preparing"). Hepsi yeni terim ve Faz 1'de Hasan tarafından onaylandı: *Rab* (1),
> *davet* (2), *taklit* (3), *tapınak* (4), *delil* (5), *esenlik* (6), *bereket* (7),
> *vadi* (8), *misafirperver* (9). Sabit sözlükçeden kutulanan yok: *peygamber*
> (Âdem'e geriye dönük karar) ve *put* düz metin. *kavim, nimet, emanet, şükür* ve
> *alay* metinde geçiyor ama §1 gereği ikinci kez kutulanmadı, düz `text` olarak
> aktarıldı. Rotada İbrahim'den sonra gelen Eyyûb ve Musa'da kutulu ağır terimler
> (*hikmet, ibret, imtihan, musibet, vefa, zulüm, şifa, iman*; kutu olarak *sabır*)
> ile Îsâ B1'e ayrılan *müjde* ve *hicret* çocuk metninde bilerek kullanılmadı
> (KARAR 10b; *sabırla* zarf olarak düz geçer). *Rab*'ın türevleri (Rabbim, Rabbine)
> B1'deki kutudan sonra düz metindir. *esenlik* kutusu konuşma satırı içeren
> paragrafta yalnız "— Ey ateş, İbrahim'e serin ve esenlik ol!" satırındadır; anlatı
> satırı ayrı `text` bloğudur. Ek kutunun dışındadır (*taklit* + "ti", *tapınak* +
> "ta", *delil* + "di", *bereket* + "li", *vadi* + "ye"). **Sonraki aktarımlar
> için:** *vadi* ve *bereket* Hz. İsmail'de düz metin kalır; *Rab, davet, taklit,
> tapınak, delil, esenlik, misafirperver* de artık hiçbir kitapta ikinci kez
> kutulanmaz.

> **16 Eki 2026 — Hz. Yusuf'ta on bir kutu var** (kitap katalogda henüz
> "preparing"). Hepsi yeni terim ve Faz 1'de Hasan tarafından onaylandı: *haset* (1),
> *kervan* (2), *dirhem* (3), *Aziz* (4), *iffet* (4), *zindan* (5), *kıtlık* (6),
> *ambar* (7), *kefil* (8), *af* (9), *hasret* (10). Sabit sözlükçeden kutulanan yok:
> *peygamber* (Âdem'e geriye dönük karar) düz metin; *hicret* kullanılmadı.
> *nimet, şefkat, sabır, emanet, hikmet, ilim, tedbir* ve *şükür* metinde geçiyor ama
> §1 gereği ikinci kez kutulanmadı, düz `text` olarak aktarıldı; *Rab* ve *bereket*
> (Hz. İbrahim · 1 ve 7'de kutulu) da düz metindir. Kutudan önce terim geçmez:
> *Aziz* B3'te "evin efendisi", *zindan* B4'te "hapis", *af* B9'a kadar
> "bağışlanma", *hasret* B10'a kadar "özlem" diye geçer. Ek kutunun dışındadır
> (*iffet* + "ini", *zindan* + "daydı", *ambar* + "lara", *kefil* + "im"). *kervan*
> kutusu konuşma satırı içeren paragrafta yalnız terimin geçtiği satırdadır. B5
> etkileşimli kelimeyle (*zindan*) açıldığı için o bölümde büyük başlangıç harfi
> görünmez (Hz. İbrahim B2 emsali; `interactive_word`'de `dropCap` alanı yok).
> **Sonraki aktarımlar için:** *müjde* bu kitapta düz metin, kutusu Hz. Îsâ B1'de
> (KARAR 6a); *rahmet* (B9) ve *elçi* (B6) bu kitapta düz metin — Hz. Yunus taslağı
> bunları kutulamayı öneriyor; Hz. Yusuf önce yayımlanırsa kutu Yunus'ta KARAR 6a
> ile açılabilir (içerik dosyası §I11). *haset, kervan, dirhem, Aziz, iffet, zindan,
> kıtlık, ambar, kefil, af, hasret* artık hiçbir kitapta ikinci kez kutulanmaz.

> **16 Eki 2026 — Hz. Süleyman'da yedi kutu var** (kitap katalogda henüz
> "preparing"). Hepsi yeni terim ve Faz 1'de Hasan tarafından onaylandı: *dava* (1),
> *cin* (2), *sıvazlamak* (3), *hüdhüd* (4), *melike* (5), *billur* (6), *gayb* (7).
> Sabit sözlükçeden kutulanan yok: *peygamber* (Âdem'e geriye dönük karar) düz metin.
> *hikmet, ilim, şükür, nimet, sihir, emanet, secde, asa, iman* ve *sabır* metinde
> geçiyor ama §1 gereği ikinci kez kutulanmadı, düz `text` olarak aktarıldı; *vadi*
> ve *Rab* (Hz. İbrahim · 8 ve 1'de kutulu) da düz metindir. Kutudan önce terim geçmez:
> B4'te Sebe'nin yöneticisi "kadın hükümdar" diye anılır, *melike* ilk kez B5'teki
> kutuda geçer. *sıvazlamak* Kelime Defterim'de mastar görünsün diye cümle mastarla
> kuruldu ("…sevgiyle sıvazlamak oldu"). Ek kutunun dışındadır (*cin* + "ler",
> *sıvazlamak* + " oldu", *hüdhüd* + " kuşuydu", *melike* + "nin", *billur* + "dan",
> *gayb* + "ı"). *hüdhüd* kutusu konuşma satırı içeren paragrafta yalnız terimin
> geçtiği satırdadır; konuşma satırı ayrı `text` bloğudur. Lansman koordinasyonu
> gereği *rahmet, elçi, tesbih* (Hz. Yunus) ve *müjde, mabet, şüphe, iftira* (Hz. Îsâ)
> bu kitabın hikâye metninde bilerek kullanılmadı. **Sonraki aktarımlar için:** *dava,
> cin, sıvazlamak, hüdhüd, melike, billur, gayb* artık hiçbir kitapta ikinci kez
> kutulanmaz.

> **16 Eki 2026 — Hz. Yunus'ta beş kutu var** (kitap katalogda henüz "preparing").
> Hepsi yeni terim ve Faz 1'de Hasan tarafından onaylandı: *elçi* (1), *kura* (2),
> *tesbih* (3), *rahmet* (4), *lakap* (5). *elçi* daha önce yalnız **kutusuz** geçti
> (yayımlanmış Hz. Nûh ve Hz. Musa; preparing Hz. İbrahim ve Hz. Yusuf), *rahmet* de
> öyle (yayımlanmış Hz. Âdem, Hz. Eyyûb ve Hz. Musa; preparing Hz. Yusuf · 9); ikisi de
> hiçbir yerde kutulanmadığı için §1'deki **KARAR 6a** ile kutu Yunus'ta açıldı. O
> kitaplar değişmedi; kutusuz geçişler düz metin kalır. Sabit sözlükçeden kutulanan
> yok: *peygamber* (Âdem'e geriye dönük karar) ve *put* düz metin; *peygamber*
> tanımındaki "elçi" sabit sözlükçedir, değişmedi. *iman, alay, tövbe, sabır* ve
> *Rab* (Hz. İbrahim · 1) metinde geçiyor ama §1 gereği ikinci kez kutulanmadı, düz
> `text` olarak aktarıldı; *kervan* (Hz. Yusuf · 2) B1'de "kervanların" diye düz
> geçer; *şükür* "şükretti" fiiliyle düz geçer. *rahmet* B5'te kutusuz tekrar geçer.
> Ek kutunun dışındadır (*elçi* + "lerden", *rahmet* + "in", *lakap* + "la").
> **Sonraki aktarımlar için:** *elçi, kura, tesbih, rahmet, lakap* artık hiçbir kitapta
> ikinci kez kutulanmaz (Îsâ'da Zekeriyyâ'nın kurası ve İsmail'de geçebilecek *elçi*
> / *rahmet* düz metin kalır).

> **16 Eki 2026 — Hz. Îsâ'da on kutu var** (kitap katalogda henüz "preparing"). Hepsi
> yeni terim ve Faz 1'de Hasan tarafından onaylandı: *mabet* (1), *müjde* (1), *tasa* (2),
> *iftira* (3), *Tevrat* (4), *İncil* (4), *cüzzam* (5), *havari* (6), *şölen* (7),
> *şüphe* (8). *müjde* ve *şüphe* daha önce yalnız **kutusuz** geçti (*müjde*:
> yayımlanmış Hz. Şît, Hz. İdrîs, Hz. Nûh ve preparing Hz. Yusuf; *şüphe*: yayımlanmış
> Hz. Âdem, Hz. İdrîs, Hz. Nûh) ve hiçbir yerde kutulanmadığı için §1'deki **KARAR 6a** ile kutu Îsâ'da açıldı; o kitaplar
> değişmedi. *müjde* kutusunun Îsâ B1'de kalması koordinasyon kararıdır (Hasan, 16 Eki
> 2026: "Îsâ lansmanda, İshak değil"); Hz. İshak'ta düz metin. Sabit sözlükçeden kutulanan yok: *peygamber*
> (Âdem'e geriye dönük karar) düz metin; *zekât* B3'te ("namazı, zekâtı") **düz metindir**,
> kutusu Hz. İsmail B6'da açılır (Îsâ içerik dosyası §I11, K1 koşulu). *mucize, secde,
> emanet, nimet, hikmet, ibret, iman, şifa* ve *sabır* metinde geçiyor ama §1 gereği
> ikinci kez kutulanmadı, düz `text` olarak aktarıldı. Kutudan önce terim geçmez; *müjde, tasa, Tevrat, havari* ve
> *mabet*'in sonraki geçişleri (müjdelenen, tasanın, Tevrat'ı, havariler, mabedin) düz
> metindir. Ek kutunun dışındadır (*mabet* + "te", *Tevrat* + "'ı"). *şölen* kutusu
> konuşma satırı içeren paragrafta yalnız terimin geçtiği satırdadır; ilk satır ayrı
> `text` bloğudur. **Sonraki aktarımlar için:** *mabet, müjde, tasa, iftira, Tevrat,
> İncil, cüzzam, havari, şölen, şüphe* artık hiçbir kitapta ikinci kez kutulanmaz
> (Hz. Zekeriyyâ ve Hz. Yahyâ'daki *mabet* / *müjde* dahil).

> **16 Eki 2026 — Hz. İsmail'de yedi kutu var** (kitap katalogda henüz "preparing").
> Altısı yeni terim ve Faz 1'de Hasan tarafından onaylandı: *zemzem* (1), *göçebe* (2),
> *teslimiyet* (3), *eşik* (4), *temel* (5), *hac* (6). *teslimiyet*'in tanımı Faz 2
> denetiminden sonra Hasan kararıyla "Allah'ın emrine ve takdirine gönülden bağlanıp onları
> kabul etmektir." oldu (kurban bölümünde "boyun eğmek" çağrışımı nedeniyle). Sabit
> sözlükçeden *zekât* (6) **set genelinde ilk kez** kutulandı; tanım §2 ile harfiyen aynı
> (Hz. Îsâ B3'teki "zekâtı" düz metindir — Îsâ içerik dosyası §I11, K1 koşulu). *peygamber*
> (Âdem'e geriye dönük karar) düz metin. *Kâbe, kurban, şükür, şefkat* ve *Rab* metinde
> geçiyor ama §1 gereği ikinci kez kutulanmadı, düz `text` olarak aktarıldı; *vadi* ve
> *bereket* (Hz. İbrahim · 8 ve 7'de kutulu) da düz metindir. *imtihan* (Hz. Eyyûb · 4)
> yalnız B3'teki Sâffât 106 cümlesinde ve bölüm sonunda, *sabreden* yalnız Kur'an sözlerinde
> (Sâffât 102, Enbiyâ 85) düz geçer; *sabır* kutu olarak kullanılmadı. Lansman koordinasyonu
> gereği *rahmet, elçi, müjde, tasa, mabet, kervan, şüphe* ile rotada sonra gelen Musa ve
> Eyyûb kutuları (*hikmet, ibret, iman, zulüm, vefa, musibet, şifa, cömert*) çocuk metninde
> bilerek kullanılmadı. Kutudan önce terim geçmez; *zemzem* B1'den sonra düz metindir.
> *eşik* kutusu Türkçe ünsüz yumuşaması yüzünden öğüt cümlesindeki "eşiğini"de değil,
> 1. Kısım'daki "taş eşikte durdu" cümlesindedir; "eşiğini" düz metindir. Ek kutunun
> dışındadır (*göçebe* + "lerdi", *eşik* + "te", *temel* + "lerini", *zekât* + "ı").
> Kutulu terimlerin hiçbiri konuşma satırında değildir. **Sonraki aktarımlar için:**
> *zemzem, göçebe, teslimiyet, eşik, temel, hac, zekât* artık hiçbir kitapta ikinci kez
> kutulanmaz.

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
  *hicret · halife · sahabe · peygamber · zekât* kaldı. 16 Eki 2026'da Hz. İsmail
  içeriğiyle **zekât** kutulandı; geriye *hicret · halife · sahabe · peygamber* kaldı.
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
