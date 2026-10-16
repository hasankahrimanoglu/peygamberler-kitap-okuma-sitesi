# GÖRSEL YENİDEN ÜRETİM ADAYLARI — Yayındaki kitaplar

> **Durum:** Aday listesi, 16 Ekim 2026. **Karar Hasan'ın.** Bu dosya hiçbir
> görseli, sicili veya içerik dosyasını değiştirmez.
>
> **Ölçüt:** PROJE-MODELI 6.4, tasvir kuralı (REVİZE 16 Ekim 2026). Olayın
> öznesi insansa sahnede insan figürü olur. Kitaba özgü ek yasaklar (Musa'da
> bebek, ordu, asker, at; Nûh'ta boğulan insan; Eyyûb'da hasta beden vb.)
> yeniden üretimde de geçerlidir. Bu yasakları çiğnemeden figürlü
> anlatılamayan sahneler listeye alınmadı (her kitabın sonunda "Bilerek dışarıda
> bırakılanlar").
>
> **Kaynaklar:** `ICERIK-GORSEL-SICILI.md` (dosya, alt metin, kitap kayıtları),
> `kitap-icerikleri/*-final.md` (Figür alanı), `src/data/books.ts` (görselin
> hemen önündeki ve sonrasındaki paragraf).

**Kısaltmalar.** **K1:** yüz hiç görünmez (peygamber, yakın akrabası, saygın
mümin; arkadan, uzak plan, başörtüsü/gölge/kontra ışık). **K2:** kötü karakter
ve çevresi, yüz gösterilebilir. **K3:** sıradan halk, yüz gösterilebilir.
**Karma:** aynı karede K1 ile K2/K3 birlikte, elle kontrol gerekir (sicil §6.2).

**Öncelik.** **Yüksek:** görselin hemen önündeki paragraf bir insanın
eylemini anlatıyor, görsel ise boş mekân, iz veya nesne gösteriyor; okur olayı
görselde bulamıyor. **Orta:** insan eylemi var ama mevcut nesne/mekân görseli
paragrafı kısmen taşıyor. **Düşük:** figür eklemek hikâyeye az şey katar.

---

## 0. Önce karar verilmesi gereken beş nokta

1. **Kitap kayıtlarındaki kişi yasakları.** Sicilde Musa için "anne, abla,
   Âsiye, Hârûn, Şuayb ve kızları, Firavun, sihirbazlar, Hızır gösterilmez",
   Nûh için "oğlu, eşi ve kavmin insanları gösterilmez", Eyyûb için "eşi,
   çocukları, dostları, köy halkı ve haberci gösterilmez" yazıyor. Şît ve
   İdrîs'te hiç insan yok. PROJE-MODELI 6.4 bunları **o günkü uygulamanın
   kaydı** sayıyor; bu liste de bu yorumla hazırlandı. Ancak Nûh'ta 13 Ekim'de
   "figür kuralı kitaptaki gibi kalır" kararı var. Bu listeler kitaba özgü
   kalıcı yasak sayılırsa ilgili satırlar düşer. **Önce bunun
   netleşmesi gerekir.**
2. **İman eden sihirbazlar** (Musa B7 `bos-meydan`). İman etmeden önce K2'dir.
   İman ettikleri ve tehdide direndikleri sahnede **K1 gibi işlenmesini**
   (yüz görünmez) öneriyorum, çünkü sahnenin anlamı onların saygın müminliği.
3. **Hz. Eyyûb'un elleri.** Eyyûb kaydındaki "eller yok" kuralı K1 kuralından
   sıkıdır; kitaba özgü bir karar gibi duruyor. Öneriler bunu koruyacak şekilde
   yazıldı.
4. **Şît'te mezar imgesi.** `bekleyen-yamac` brifinde "mezar, toprak yığını,
   ağlayan figür" ayrıca yasaklanmış. Öneri: Hz. Âdem ayakta, arkadan;
   mezar taşı yok, gözyaşı görünmez.
5. **İdrîs aslında hiç üretilmemiş (bkz. §6).** 20 dosyanın 20'si de aynı yer
   tutucu (md5 `1440680d…`, 38.133 bayt). Sicil 4 kapağı "✅ Hazır" gösteriyor
   ama diskteki kapaklar da yer tutucu. İdrîs için yapılacak iş yeniden üretim
   değil, **ilk üretimden önce promptların yeni kurala göre revizyonu.**

---

## 1. Hz. Musa — 34 aday (yüksek 11 · orta 16 · düşük 7)

Mevcut figürlü sahneler: `bolum-4/agac-golgesi`, `bolum-9/acilan-yol` (Musa,
arkadan). Bunlar kostüm ve ölçek için **görsel referans** olarak verilmeli;
Musa'nın başlığı ve giysisi kitap boyunca aynı kalsın. Ortak negatif
promptta `crowd` ve `human figure, person, silhouette, hands` var; figürlü
sahnelerde bunlar çıkarılmalı. `baby, soldiers, army, chariots` kalır, at
yasağı da sürer.

| Dosya | Metindeki olay | Şu anki görsel | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-musa/bolum-1/hazir-sandik.jpg` | Anne şafaktan önce sandığı nehre indirir; suyun kenarına koyar, ellerini üstünden çekemez. | Sazlık dibinde kapalı sandık | Anne · K1 · sazlıkta diz çökmüş, arkadan, başörtülü; elleri kapalı sandığın kapağında. Orta plan, şafak mavisi. Sandık kapalı, bebek yok | **Yüksek** |
| `hz-musa/bolum-1/nehirdeki-sandik.jpg` | Anne sandığı suya bırakır, gözden kaybolana kadar arkasından bakar. | Nehrin ortasında süzülen sandık | Anne ve abla · K1 · kıyıda yan yana, arkadan; sandık nehirde küçük. Uzak plan | Orta |
| `hz-musa/bolum-1/sazlik-yolu.jpg` | Abla, sazlıkların arasından görünmeden kıyı boyunca yürüyüp sandığı izler. | Sazlıkta patika ve küçük ayak izleri | Abla (küçük kız) · K1 · papirüslerin arasında eğilmiş, arkadan; uzakta nehirde sandık. Orta-uzak plan | **Yüksek** |
| `hz-musa/bolum-2/dallardaki-sandik.jpg` | Firavun ailesinden biri sandığı fark edip kıyıya çektirir. | Söğüt dalları ve nilüferler arasında sandık | İki saray hizmetkârı · K2 · sığ suda sandığı kıyıya çekiyor; yüz görünebilir, sakin. Kapak kapalı. Orta plan | Orta |
| `hz-musa/bolum-2/saray-salonu.jpg` | Şehirden gelen sütanneler çaresiz geri döner. | Salonda boş beşik | Salondan çıkan iki üç kadın · K3 · önden veya yandan; beşik arka planda örtülü. Âsiye · K1 · beşiğin yanında arkadan oturur. Bebek görünmez | Orta |
| `hz-musa/bolum-2/saraya-giden-yol.jpg` | Abla koşup annesine haber verir, anne kızıyla saraya gelir. | Saraya giden yol ve tozda ayak izleri | Anne ve abla · K1 · el ele, arkadan, saraya yürüyor; saray ufukta. Uzak plan | **Yüksek** |
| `hz-musa/bolum-3/dar-sokak.jpg` | Musa dar bir sokakta biri kendi halkından iki adamın kavgasını görür. | Boş sokakta devrik sepet ve hurmalar | Kavga eden iki adam · K3 · yakalarından tutmuş, gerginlik anı, darbe yok; yüz görünebilir, korkutucu değil. Musa · K1 · ön planda sokak ağzında arkadan. **Karma.** Kuralın kendi örneği | **Yüksek** |
| `hz-musa/bolum-3/sabaha-kadar-kandil.jpg` | Musa o gece hiç uyumaz, korku içinde sabahlar. | Pencerede kandil, sabaha dönen gök | Musa · K1 · pencere önünde arkadan oturuyor, kandil yanında | Düşük |
| `hz-musa/bolum-3/sabah-sokagi.jpg` | Ertesi sabah öteki adam Musa'nın kendisine vuracağını sanıp korkuyla bağırır. | Kavşakta toz ve düşmüş testi | Geri çekilen adam · K3 · eli kalkık, ürkmüş; Musa · K1 · durmuş, arkadan. `dar-sokak` ile aynı sokak, farklı ışık. **Karma** | Orta |
| `hz-musa/bolum-3/sehir-kapisi.jpg` | Musa korku içinde şehirden çıkar, dua eder. | Kapı aralığından görünen boş çöl yolu | Musa · K1 · kapı aralığında küçük, arkadan, çöle yürüyor | Orta |
| `hz-musa/bolum-3/col-yolu.jpg` | Musa'nın önünde uzun ve yalnız bir çöl yolu vardır. | Kum tepeleri arasında ayak izli yol | Musa · K1 · çok uzakta, arkadan, küçük | Düşük |
| `hz-musa/bolum-4/medyen-suyu.jpg` | Çobanlar kuyunun başında birbirini iterek, bağırarak hayvanlarını sular. | Kuyuda karışmış sürüler, toz | Birkaç çoban · K3 · kova ve sürülerle itişiyor; yüz görünebilir, sakin üslup. Musa yok ya da kenarda arkadan. Orta plan | **Yüksek** |
| `hz-musa/bolum-4/bekleyen-suru.jpg` | İki kız hayvanlarını kalabalıktan uzak tutup sabırla bekler. | Ağaç gölgesinde bekleyen sürü | İki kız (Hz. Şuayb'ın kızları) · K1 · ağaç gölgesinde, başörtülü, arkadan; önlerinde küçük sürü, arkada kuyudaki kalabalık uzakta | **Yüksek** |
| `hz-musa/bolum-4/yasli-babanin-avlusu.jpg` | Kız, babasına Musa'yı çalıştırmasını söyler; yaşlı baba teklif yapar. | Avluda hasır, ekmek, testi | Yaşlı baba · K1 · hasırda oturuyor, yüzü başlık gölgesinde; Musa · K1 · karşısında arkadan. Orta plan | Orta |
| `hz-musa/bolum-4/otlaktaki-suru.jpg` | Musa yıllarca değneğiyle sürü güder. | Yamaçta koyunlar, kayaya dayalı değnek | Musa · K1 · uzakta sürünün arkasında, değnekli | Düşük |
| `hz-musa/bolum-5/kamp-atesi.jpg` | Musa peygamber olarak, şafakta ailesinin yanına döner. | Çadır önünde ateş ve asa | Musa · K1 · asasıyla çadıra yürüyor, arkadan; aile · K1 · ateş başında uzak, yüzsüz | Orta |
| `hz-musa/bolum-6/buyuk-kapi.jpg` | İki kardeş Firavun'un sarayının büyük kapısının önünde durur. | Kapalı dev kapı ve ışık şeridi | Musa ve Hârûn · K1 · kapının önünde, arkadan, küçük; ölçek kapıyla kurulur | **Yüksek** |
| `hz-musa/bolum-6/sutunlu-salon.jpg` | Firavun, Musa'yı geçmişiyle suçlar; Musa dürüstçe cevap verir. | Boş taht, tek ışık hüzmesi | Firavun · K2 · tahtta, yüz görünebilir; soğuk ama karikatür değil; birkaç saraylı · K2. Ön planda Musa ve Hârûn · K1 · arkadan. **Karma** | **Yüksek** |
| `hz-musa/bolum-6/dagilan-ulaklar.jpg` | Sihirbazları toplamak için ülkeye haber salınır. | Farklı yönlere uzanan yollarda toz | Yaya ulaklar · K2 · uzakta, farklı yollarda. **At yok** | Düşük |
| `hz-musa/bolum-6/aksam-nehri.jpg` | İki kardeş, korkularına rağmen doğruyu söylemiş olarak saraydan çıkar. | Nehir kıyısında iki sıra ayak izi | Musa ve Hârûn · K1 · kıyıda yan yana, arkadan, uzakta | Düşük |
| `hz-musa/bolum-7/ziynet-meydani.jpg` | Ziynet Günü meydanın her köşesi süslenmiş insanlarla dolar; sihirbazlar gelir. | **Ortası boş** meydan | Kalabalık · K3 · gölgeliklerin altında renkli giysilerle; sihirbazlar · K2 · bir kenarda grup. Geniş plan. Bu sahnede `crowd` negatiften çıkar | **Yüksek** |
| `hz-musa/bolum-7/kivrilan-ipler.jpg` | Sihirbazlar iplerini atar, ipler kıvrılıyor gibi görünür, kalabalık geri çekilir. | Kumda ipler ve kıvrık gölgeleri | Sihirbazlar · K2 · yarım daire; kalabalık · K3 · geri çekiliyor; Musa · K1 · arkadan. İpler ip kalır, yılan yok. **Karma** | Orta |
| `hz-musa/bolum-7/sessiz-kum.jpg` | Asa her şeyi yutar, meydana sessizlik çöker, sihirbazlar donup kalır. | Boş kum, uzun gölge | Sihirbazlar · K2 · şaşkın, durmuş; Musa · K1 · asası elinde, arkadan. Asa-yılan dönüşümü gösterilmez | Orta |
| `hz-musa/bolum-7/bos-meydan.jpg` | Sihirbazlar iman eder; Firavun tehdit eder, onlar geri adım atmaz. | Boşalan meydan, devrik altın kâse | İman eden sihirbazlar · **K1 önerisi** (bkz. §0.2) · uzakta, arkadan, diz çökmüş; yükseltide Firavun · K2 · küçük. **Karma** | **Yüksek** |
| `hz-musa/bolum-8/kuru-tarla.jpg` | Mısır halkı kıtlık ve ürün kaybıyla uyarılır. | Kuru tarla, boş kanal | Çiftçi · K3 · kuru tarlanın kenarında boş küpe bakıyor | Düşük |
| `hz-musa/bolum-8/irmak-ve-saray.jpg` | Firavun halkını toplayıp "Bu ırmaklar ayaklarımın altından akmıyor mu?" diye böbürlenir. | Nehir kıyısında saray terası | Firavun · K2 · terasta; aşağıda toplanmış halk · K3 · uzak | Orta |
| `hz-musa/bolum-8/kandilli-evler.jpg` | İnananlar evlerde toplanır, birlikte dua eder. | Kerpiç evlerin kandilli pencereleri | Oda içi · birkaç aile · K3 · yere oturmuş, dua ediyor; orta plan, sakin | Orta |
| `hz-musa/bolum-9/ay-isiginda-izler.jpg` | İnananlar gece sessizce yola çıkar; uzun bir kafile denize yürür. | Kumda sayısız ayak izi | Kafile · K3 · çocuklar, yaşlılar, yük taşıyanlar, arkadan; önde Musa ve Hârûn · K1 · küçük. Ay ışığı. At ve asker yok | **Yüksek** |
| `hz-musa/bolum-9/toz-bulutu.jpg` | Ordu ufukta belirir; çocuklar annelerine sarılır, herkes Musa'ya bakar. | Ufukta toz bulutu | Kafile · K3 · arkadan, denize dönük; ufukta yalnız toz. **Ordu görünmez** | Orta |
| `hz-musa/bolum-9/karsi-kiyi.jpg` | Kurtulanlar karşı kıyıda Rablerine şükreder. | Kıyıdan tepeye uzanan izler | Kalabalık · K3 · tepede, arkadan, gün doğumuna dönük. Denizde hiçbir iz yok | Orta |
| `hz-musa/bolum-10/kaya-ve-deniz.jpg` | Musa ve genç arkadaşı kayanın yanında dinlenir; balık denize atlar. | Kaya dibinde iki renkli su, suda iz | Musa ve genç yol arkadaşı · K1 · kaya dibinde oturmuş, arkadan; suda kıvrılan iz. Uzak plan | Orta |
| `hz-musa/bolum-10/kiyidaki-izler.jpg` | Kayanın yanında Hızır'ı bulurlar; Musa ondan öğrenmek ister. | Islak kumda ayak izleri | Hızır · K1 · kayanın yanında, kontra ışık; Musa ve genç · K1 · ona yaklaşıyor, arkadan. Uzak plan | Orta |
| `hz-musa/bolum-10/duzelen-duvar.jpg` | Hızır yıkılmak üzere olan duvarı düzeltir. | Düzeltilmiş duvar, taze harç | Hızır · K1 · duvarın dibinde çalışıyor, arkadan; Musa · K1 · yanında | Orta |
| `hz-musa/bolum-10/ayrilan-yollar.jpg` | Hızır sebepleri açıklar, yolları ayrılır. | Kıyıda ikiye ayrılan yol | İki figür · K1 · ayrılan yollarda, arkadan, uzak | Düşük |

**Bilerek dışarıda bırakılanlar:** `bolum-1/gece-penceresi` ve
`bolum-2/yumusak-ortu` (olay bebeğe bağlı, bebek yasak); `bolum-5/cikarilan-pabuclar`
(kutsal vadi anı, figürsüz kalması daha saygılı); `bolum-5/yerdeki-asa`
(asa-yılan, yılan yasağı); `bolum-9/sakin-deniz` (boğulma anı);
`bolum-8/cekirge-bulutu` (öznesi doğa olayı). Kalan sahneler (`nilufer`,
`gun-dogarken`, `karanlik-vadi`, `yildizli-gece`, `uzak-saray`, `ilk-yildiz`,
`safak-yolu`, `serce-ve-damla`) düşünme veya geçiş paragrafına bağlı; mevcut
hâlleri işini görüyor.

---

## 2. Hz. Nûh — 20 aday (yüksek 5 · orta 11 · düşük 4)

Mevcut figürlü sahneler: `bolum-2/yeni-sabah`, `bolum-4/tepedeki-yol`,
`bolum-8/dagilan-hayvanlar` (Nûh, arkadan). Bunlar referans verilmeli. Kitaba
özgü yasaklar sürer: güvercin, zeytin dalı, gökkuşağı, karga, boğulan insan,
yıkım; putlar odakta değil. **§0.1 kararı Nûh'ta özellikle önemli:**
13 Ekim'deki "kitaptaki gibi kalır" kararı geçerliyse Nûh listesinin
tamamı düşer.

| Dosya | Metindeki olay | Şu anki görsel | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-nuh/bolum-1/kucuk-tekne.jpg` | Küçük Nûh yonttuğu tekneyi arkta yüzdürür. | Arkta yüzen oyuncak tekne | Çocuk Nûh · K1 · ark kenarında çömelmiş, arkadan; tekne ön planda | Orta |
| `hz-nuh/bolum-1/birakilan-keski.jpg` | Komşular tezgâhın başında toplanır; Nûh "Öyleyse ona neden eğiliyorsunuz?" diye sorar. | Tezgâhta keski ve tahta | Birkaç komşu · K3 · tezgâhın çevresinde, şaşkın; genç Nûh · K1 · arkadan. **Karma** | Orta |
| `hz-nuh/bolum-2/sacilan-aletler.jpg` | Kalabalık Nûh'u iter, aletleri yola saçılır; o doğrulup aletlerini toplar, kimseye karşılık vermez. | Yola saçılmış aletler, devrik testi | Darbe anı değil, sonrası: Nûh · K1 · diz çökmüş aletleri topluyor, arkadan; kalabalık · K3 · arkası dönük uzaklaşıyor. **Karma** | **Yüksek** |
| `hz-nuh/bolum-3/zengin-avlu.jpg` | Nûh ileri gelenlerin avlusunda tevhidi anlatır; kibarca gülümser, ciddiye almazlar. | Boş avlu, yastıklar, bakır kaplar | İleri gelenler · K3 · yastıklarda oturmuş, yüz görünebilir; Nûh · K1 · ayakta, arkadan. **Karma** | Orta |
| `hz-nuh/bolum-3/meydan-golgesi.jpg` | Nûh yoksulların arasında eski hasıra oturur; yoksullar çekinerek yaklaşır. | Ağaç altında taşlar, hasır, ekmek sepeti | Yoksullar · K3 · halka olmuş, kimi yaklaşıyor; Nûh · K1 · hasırda oturmuş, arkadan. Orta plan. **Karma** | **Yüksek** |
| `hz-nuh/bolum-3/uzaklasan-izler.jpg` | İleri gelenler öfkeyle meydandan uzaklaşır; yoksullar başlarını eğmez. | Uzaklaşan ayak izleri | İleri gelenler · K3 · arkası dönük uzaklaşıyor; ağaç altında oturan yoksullar · K3 | Orta |
| `hz-nuh/bolum-3/bas-kose.jpg` | Nûh'un sofrasında inanan herkes baş köşede oturur. | Kandilli boş sofra | İnananlar · K3 · sofrada, yan yana; Nûh · K1 · arkadan veya kontra ışıkta | Orta |
| `hz-nuh/bolum-4/ocak-basi.jpg` | Nûh evlenir, oğulları olur; biri yolundan ayrılır. | Ocak başı, sandaletler, oyuncaklar | Aile · K1 · ocak çevresinde, arkadan, uzak | Düşük |
| `hz-nuh/bolum-4/ay-ve-gunes.jpg` | Gelip geçenlerin bazıları göğe bakar, çoğu omuz silkip geçer. | Batan güneş, doğan ay, ova | Yolcular · K3 · yolda, biri durmuş göğe bakıyor | Düşük |
| `hz-nuh/bolum-5/tahta-yigini.jpg` | Nûh ve üç oğlu büyük ağacı keser, tahtalar biçer. | Kütük ve istif tahtalar | Nûh ve üç oğlu · K1 · tahta taşıyor, arkadan, uzak. Balta darbesi gösterilmez | Orta |
| `hz-nuh/bolum-5/gemi-iskeleti.jpg` | Kupkuru düzlükte yükselen gemiye yoldan geçenler bakıp kahkahalarla güler. | Kaburgaları görünen gemi gövdesi | Ön planda gülen yolcular · K3 · yüz görünebilir, karikatür değil; gövdede çalışan küçük figürler · K1 · uzak. **Karma.** Ölçek rakamsız | **Yüksek** |
| `hz-nuh/bolum-5/ailecek-is.jpg` | Aileden biri tahta taşır, biri çivi çakar, biri su ve yiyecek getirir. | Gemi gölgesinde testi, sepet, aletler | Aile · K1 · üç dört figür işte, arkadan veya uzak | Orta |
| `hz-nuh/bolum-6/hayvan-izleri.jpg` | Hayvanlar ikişer ikişer gemiye gelir; aile eşyalarını sırtlayıp kapıya yönelir. | Çamurda ikişer hayvan izi | Hayvan çiftleri gemiye yürüyor; aile · K1 · eşyalarla rampada, arkadan, uzak. Hayvanların kendisi de şu an yok | Orta |
| `hz-nuh/bolum-6/kandil-ve-yagmur.jpg` | Gemidekiler kandil ışığında el ele tutuşup dua eder. | Pencerede kandil, yağmur | İnananlar · K3 ve aile · K1 · kandil çevresinde oturmuş, sırtları dönük, el ele | Orta |
| `hz-nuh/bolum-7/dalgalar.jpg` | Nûh geminin kenarından bakar; suların içindeki tepede oğlunu görür. | Dalgalar ve sisli tepe | Nûh · K1 · küpeşteye dayanmış, arkadan; tepede oğlu · K1 · çok küçük, tek başına. Boğulma imgesi yok. Bölümün duygusal merkezi | **Yüksek** |
| `hz-nuh/bolum-7/uzak-tepe.jpg` | Oğlu babasına bakar ama yerinden kıpırdamaz: "Ben yüksek bir dağa çıkarım." | Sisle sarılı ıssız tepe | Oğlu · K1 · tepede, sırtı gemiye dönük, uzak. `dalgalar` yenilenirse bu sahne olduğu gibi kalabilir | Orta |
| `hz-nuh/bolum-7/kandil-penceresi.jpg` | Gemidekiler hüzünlü Nûh'un yanına gelip sessizce oturur. | Rafta kandil, dışarıda yağmur | Nûh ve yanındakiler · K1/K3 · loş, sırtları dönük | Düşük |
| `hz-nuh/bolum-8/cudide-gemi.jpg` | Gemi Cûdî'ye oturur; gemidekiler sevinçle birbirine sarılır. | Yamaçta gemi, çekilen sular | Güvertede küçük figürler · K1/K3 · uzak | Düşük |
| `hz-nuh/bolum-8/yeni-koy.jpg` | Herkes işe koyulur: kimi duvar örer, kimi toprak kazar, kimi fidan diker. | Yarım evler, kazılmış toprak, fidanlar | İnananlar · K3 · duvar örüyor, kazıyor, fidan dikiyor; Nûh · K1 · uzakta arkadan. Orta-geniş plan. **Karma** | **Yüksek** |
| `hz-nuh/bolum-8/yeni-fidan.jpg` | Nûh yamacın en güzel yerine kendi eliyle bir fidan diker. | Yamaçta fidan, uzakta gemi | Nûh · K1 · fidanın başında diz çökmüş, arkadan; uzakta gemi | Orta |

**Bilerek dışarıda bırakılanlar:** `komurde-elmas`, `dik-fidan` (metafor);
`yagmurlu-bahce` (Nûh'un konuşmasının içeriği); `yuzen-gemi`
(dışarıda kalanlar boğulma çağrışımı yapar); `gemi-ici`, `sonsuz-su`,
`ilk-yildizlar`, `tamamlanan-gemi`, `dagdaki-gemi`, `kara-bulutlar` (öznesi
gemi, su, gök); `oymali-kapi`, `uzak-sehir`, `bos-yol`, `cekic-ve-civiler`
(nesne veya geçiş paragrafı).

---

## 3. Hz. Eyyûb — 10 aday (yüksek 4 · orta 4 · düşük 2)

Mevcut figürlü sahneler: `bolum-1/bugday-tarlasi`, `bolum-5/pinar-basinda`
(Eyyûb, arkadan, geniş pelerin; el ve kol yok). Kitaba özgü yasaklar sürer:
hasta ya da yatan beden, yara, yıkıntı, mezar, altın, şeytan veya ışık-figür.
**Bu yüzden Eyyûb hastalık döneminde gösterilmez**; B3–B4 önerileri onu
kadraj dışında bırakır.

| Dosya | Metindeki olay | Şu anki görsel | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-eyyub/bolum-1/acik-sofra.jpg` | Eyyûb yetimlere, yaşlılara, kimsesizlere bakar; yurdunda yoksul kalmaz. | Çardak altında boş uzun sofra | Sofrada yetimler, yaşlılar · K3 · yüz görünebilir; Eyyûb · K1 · sofranın başında ayakta, arkadan, ekmek dağıtıyor (el görünmez, pelerin) | **Yüksek** |
| `hz-eyyub/bolum-1/meydan-agaci.jpg` | Eyyûb, ona inanan az sayıdaki dostuyla birlikte Allah'ı anar. | Akşam meydanında çınar ve taş sekiler | Dostlar · K3 · sekilerde oturmuş; Eyyûb · K1 · arkadan. Orta plan | Orta |
| `hz-eyyub/bolum-1/dolu-ambar.jpg` | Hasattan sonra ambarlar ağzına kadar dolar. | Tavana kadar çuval | İşçiler · K3 · çuval taşıyor, kapıda | Düşük |
| `hz-eyyub/bolum-2/tozlu-yol.jpg` | Haberci köyün yolunda soluk soluğa koşar, kötü haberi getirir. | Toprak yol, havada toz izi | Haberci · K3 · yolda koşuyor, yüz görünebilir; korku değil, telaş. Orta-uzak plan | **Yüksek** |
| `hz-eyyub/bolum-2/tek-kandil.jpg` | Eyyûb, ağlayan eşi için dua eder; sonra köy halkını toplayıp teselli eder. | Avluda kandil, küllenmiş ocak | Eşi · K1 · başörtülü, arkadan; Eyyûb · K1 · yanında, arkadan. Sakin | Düşük |
| `hz-eyyub/bolum-2/kapidaki-sandaletler.jpg` | İnanan dostları koşup gelir, yanında oturup acısını paylaşır. | Eşikte sandaletler, aralık kapı | Kapı aralığından içeride oturan dostlar · K3 · sırtları ve omuzları; Eyyûb görünmez veya kontra ışıkta | Orta |
| `hz-eyyub/bolum-3/gidip-gelen-izler.jpg` | Eşi vefayla yanında kalır; her gün testisiyle köyden su taşır. | Patikada gidip gelen ayak izleri | Eşi · K1 · omzunda testi, patikada zeytin ağacına yürüyor, arkadan, uzak | **Yüksek** |
| `hz-eyyub/bolum-4/ziyaret-patikasi.jpg` | İki dostu ve onlardan genç bir arkadaşı yine çıkagelir. | Patikada farklı boylarda ayak izleri | Üç dost · K3 · patikadan ağaca çıkıyor, sırtları dönük; ağaç altındaki hasır uzakta, Eyyûb kadraj dışında | **Yüksek** |
| `hz-eyyub/bolum-5/iki-testi.jpg` | İyileşen Eyyûb eşini de pınar suyuyla yıkar, ikisi yeniden dinç olur. | Pınar kenarında iki dolu testi | Eyyûb ve eşi · K1 · pınar başında yan yana ayakta, arkadan; sağlıklı, sabah ışığı | Orta |
| `hz-eyyub/bolum-5/yeseren-bag.jpg` | Yurtta pek çok insan iman eder; bağlar ve tarlalar yeniden verir. | Yeşeren bağlar, taş evler | Bağda çalışan köylüler · K3 · üzüm topluyor, uzak | Orta |

**Bilerek dışarıda bırakılanlar:** `bos-tarla`, `koy-disi`, `dolu-testi`,
`huzurlu-safak`, `gece-gogu`, `kaynayan-pinar` (Eyyûb hasta; hasta beden
yasağı); `kirik-dal`, `genc-fidan` (metafor); `tas-sekiler` (boşluğu bilerek
anlatıyor); `bos-agil`, `bos-ambar` (kaybın kendisi, boşluk anlamlı).

---

## 4. Hz. Şît — 11 aday (yüksek 2 · orta 6 · düşük 3)

Kayıtta "insan figürü hiçbir görselde yoktur". Kitaba özgü yasaklar sürer:
**tanınabilir Kâbe biçimi** (`dagilan-duvar`, `dokunulmayan-tas`,
`yikanmis-taslar`), Şît'in yüzündeki nurun fiziksel tasviri, mezar imgesi.
Kişiler: Hz. Âdem, Hz. Havva, Hz. Şît, eşi Hazura, oğlu Enuş (K1); komşular
ve köylüler (K3).

| Dosya | Metindeki olay | Şu anki görsel | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-sit/bolum-1/bekleyen-yamac.jpg` | Hz. Âdem yamaçta, Hâbil'in yattığı yerin başında sessizce durur. Metin açıkça "uzun boylu bir adam ayakta duruyordu" der. | Otlar arasında toprak kabartısı, sarı kuş | Hz. Âdem · K1 · yamaçta ayakta, arkadan; asası taşın dibinde. Mezar taşı yok, gözyaşı görünmez (bkz. §0.4) | Orta |
| `hz-sit/bolum-1/aksam-mujdesi.jpg` | Hz. Âdem müjdeyi duyunca çadıra doğru adımlarını hızlandırır. | Çadırlar ve küçük ateş | Hz. Âdem · K1 · çadırlara yürüyor, arkadan, uzak | Düşük |
| `hz-sit/bolum-2/ufuktaki-isaret.jpg` | Şît fırtınayı fark eder; Hazura sürüyü vadiye sürer, Şît çadır kazıklarını söker. | Ufukta toz perdesi, hurma | Şît · K1 · kazık sökerken, arkadan; Hazura · K1 · sürüyle uzakta | Orta |
| `hz-sit/bolum-2/duyulmayan-ses.jpg` | Şît komşuları uyarır; kimi omuz silkip yürür, biri onu tersler. | Tek sökülmüş çadır, diğerleri yerinde | Komşular · K3 · çadırlarının önünde, umursamaz, yüz görünebilir; Şît · K1 · arkadan, elinde kazık. **Karma** | **Yüksek** |
| `hz-sit/bolum-2/vadideki-siginak.jpg` | Şît ve Hazura vadide fırtınanın dinmesini bekler. | Kayaların altında çadır bezleri | İki figür · K1 · çadır bezinin altında oturmuş, arkadan | Düşük |
| `hz-sit/bolum-2/kendi-gozuyle.jpg` | Hazura bir kayanın arkasından bakar: Şît taş yontuyor, herkesin dışladığı komşuya da yardım ediyor. | Dere yatağında yontulmuş taş ve aletler | Ön planda Hazura · K1 · kayanın arkasında, sırtı dönük; aşağıda Şît · K1 · taşın başında, uzak; yanında dışlanan komşu · K3. Bakış açısı sahnesi | **Yüksek** |
| `hz-sit/bolum-3/ilk-tas-oda.jpg` | Hz. Âdem çıkagelir, ilk taş odayı uzun uzun inceler. | Üstü açık küçük taş oda | Hz. Âdem ve Şît · K1 · odanın önünde, arkadan | Düşük |
| `hz-sit/bolum-3/dagilan-tas-yigini.jpg` | Sarsıntıda oda yıkılır; Şît koşup gelir, taşların yanına çöküp uzun süre bakar. | Yere serilmiş taşlar, toz | Şît · K1 · dağılmış taşların başında diz çökmüş, arkadan; arkasında susan köylüler · K3 · uzak | Orta |
| `hz-sit/bolum-3/birlikte-kurulan-koy.jpg` | Herkes iş bölümüyle çalışır, evler yan yana yükselir; ilk köy kurulur. | Tamamlanmış taş evler, yollar, kuyular | Köy halkı · K3 · son çatıyı örtüyor, kuyudan su çekiyor; geniş plan. Şît · K1 · uzakta | Orta |
| `hz-sit/bolum-4/dokunulmayan-tas.jpg` | Şît yardım ister, taşlara kıyamayan halktan kimse öne çıkmaz. | Duvar önünde bırakılmış aletler | Halk · K3 · geride, kollar kavuşturulmuş; Şît · K1 · aletlerin yanında, arkadan. Duvar sade taş, Kâbe biçimi yok. **Karma** | Orta |
| `hz-sit/bolum-4/yikanmis-taslar.jpg` | Gün ağarınca herkes koşar; duvarlar yıkılmış, taşlar sel suyuyla yıkanıp parlamıştır. | Islak zeminde parlayan taşlar | Halk · K3 · taşların çevresinde, şaşkın; Kâbe biçimi yok | Orta |

**Bilerek dışarıda bırakılanlar:** `gelen-armagan` (bebek Şît ve yüzündeki
nur; fiziksel tasvir yasak); `pencereden-gorunen` (Şît'in vefatı);
`birakilan-avadanlik` (vahiy anı); `dagilan-duvar` (Kâbe yapısı, Kâbe biçimi
yasağı); `kirlangic-yuvasi` (öznesi doğa).

---

## 5. Hz. Âdem — 6 aday (yüksek 1 · orta 3 · düşük 2)

Âdem kitabı bilinçli olarak düşünce ağırlıklı yazılmış; görsellerin çoğu bir
olaya değil, anlatıcının yorum paragrafına bağlı ve öyle kalabilir. Yaratılış,
melekler, İblis, örtünme (`yapraklarin-golgesi`, kayıtta "figür yok") ve Hâbil
ile Kâbil sahneleri (`duran-yol`, `karganin-ogrettigi`; "beden yok") listeye
alınmadı. Cennette Hz. Âdem ile eşini göstermek ayrıca bir karar gerektirir;
o yüzden bu sahneler en fazla orta önceliktedir.

| Dosya | Metindeki olay | Şu anki görsel | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-adem/bolum-6/ilk-ocak.jpg` | "Yeryüzü artık yalnız ve sessiz değildi. İlk aileyle birlikte sevgi, paylaşma ve öğretme de başlamıştı." | Taş ocak, toprak kaplar; brifte **"insan yok"** | İlk aile · K1 · Âdem, Havva ve küçük çocuklar ocağın çevresinde, sırtları dönük, kontra ateş ışığı. Paragraf ile görsel birbirine ters düşüyor | **Yüksek** |
| `hz-adem/bolum-3/sinir-cizgisi.jpg` | Allah, Âdem ile eşine yalnız bir ağaca yaklaşmamalarını bildirir. | Tek ağaca uzanan taşlı patika | Âdem ve eşi · K1 · patikanın başında, arkadan, uzak; sade giysili. Ağacın türü yine belirsiz | Orta |
| `hz-adem/bolum-5/donus-sozleri.jpg` | Âdem, Allah'ın öğrettiği sözlerle eşiyle birlikte bağışlanma diler. | Çiyli toprakta yeni su yolu | Âdem ve eşi · K1 · şafakta toprağa diz çökmüş, arkadan, uzak | Orta |
| `hz-adem/bolum-7/buyuyen-yurt.jpg` | Aile büyür; Âdem öğrendiklerini ailesine öğretir. | Ekili tarlalar, yerleşim vadisi | Aile · K1 · tarla kenarında halka, Âdem arkadan konuşuyor; geniş plan | Orta |
| `hz-adem/bolum-6/ilk-sabah.jpg` | Yeryüzündeki ilk sabah; insanlık bu toprağı emanet olarak koruyacak. | Sisi çekilen ova | Âdem ve eşi · K1 · ovanın kenarında, arkadan, çok küçük | Düşük |
| `hz-adem/bolum-8/uzun-yol.jpg` | Misafirin ailesi büyümüş, dünya insan sesleriyle tanışmıştır. | Ufka uzanan patika | Patikada uzakta yürüyen birkaç kuşak · K1 · çok küçük | Düşük |

Ayrı not: `hz-adem/bolum-1/kapak.jpg` hâlâ 4:3 (sicilde açık kalem). Bölüm
açılışı olduğu ve insan henüz yaratılmadığı için figürsüz kalır; yalnız oran
için yeniden üretilmeli.

---

## 6. Hz. İdrîs — yeniden üretim değil, ilk üretim öncesi prompt revizyonu (8 sahne)

**Bulgu:** `public/kitaplar/hz-idris/` altındaki 20 `.jpg` dosyasının hepsi
aynı yer tutucu (aynı md5, 38.133 bayt, 1920×1080). Sicil §4c 16 sahneyi
"⬜ Bekliyor", 4 kapağı "✅ Hazır" gösteriyor; diskte kapaklar da yer tutucu.
Ya kapaklar hiç gelmedi ya da sonraki bir `gorsel-yertutucu` çalıştırması
üzerlerine yazdı (git bunları ayrı göstermiyor). Hasan'ın elinde kapak
dosyaları varsa yeniden konmalı; sicil satırı ayrıca düzeltilmeli.

Henüz üretim yapılmadığı için yeni kural doğrudan geçerli. Final MD §H'deki
promptların tamamı "insan, yüz, el, silüet yok" negatifiyle yazılmış. Aşağıdaki
sahnelerin promptu üretimden önce figürlü olarak yeniden yazılmalı. Kitaba
özgü yasaklar sürer: savaş, silah, **eyer, koşum, ordu, süvari**; `ilk-koy`'da
Kâbe biçimi; `topraktaki-ders`'te okunabilir harf. Atlar eyersiz ve
koşumsuz olabilir. Kişiler: İdrîs, akrabası Mişke, babası (K1); öğrenciler ve
köylüler (K3).

| Dosya | Metindeki olay | Planlanan figürsüz brif | Önerilen figürlü sahne (kim · katman · kadraj) | Öncelik |
|---|---|---|---|---|
| `hz-idris/bolum-1/yaprak-golgelik.jpg` | İdrîs iri yapraklardan gölgelik örüp Mişke'nin başına geçirir. | Taşın üstünde iki yaprak gölgelik | Genç İdrîs ve Mişke · K1 · arkadan, ikisinin başında yaprak gölgelik; sürü yanlarında. Orta plan | **Yüksek** |
| `hz-idris/bolum-2/topraktaki-ders.jpg` | İdrîs öğrencilerine sorar, onlara kendi ağızlarından anlattırır. | Toprakta şekiller, çubuk, çakıllar | Öğrenciler · K3 · toprağa çizilmiş şekillerin çevresinde oturmuş, yüz görünebilir; İdrîs · K1 · çubukla, arkadan. **Karma** | **Yüksek** |
| `hz-idris/bolum-2/suyun-yolu.jpg` | Anlamayan öğrenci suyun yolunu parmağıyla değiştirir, yüzü aydınlanır. | Arkta su ve ince set | Öğrenci · K3 · yakın plan, parmağı arkta, yüzünde anlama sevinci (K3 olduğu için gösterilebilir); İdrîs · K1 · kadrajın kenarında, arkadan | **Yüksek** |
| `hz-idris/bolum-3/meydandaki-soz-tasi.jpg` | İdrîs söz taşına çıkar: "Elimde hafif bir örtü var." | Söz taşında rüzgârda kalkan bez | Köylüler · K3 · taşın çevresinde toplanmış, merakla bakıyor; İdrîs · K1 · taşın üstünde, arkadan, bezi tutuyor. **Karma** | **Yüksek** |
| `hz-idris/bolum-4/tanimadigimiz-hayvanlar.jpg` | İdrîs elinde otla bir ata yaklaşır, at kaçmaz ve avucundan yer. | Yamaçta otlayan at sürüsü | İdrîs · K1 · arkadan, ot uzattığı eyersiz bir atın önünde; sürü arkada. Sonraki paragraftaki köylüler de eklenebilir · K3 | **Yüksek** |
| `hz-idris/bolum-1/kizgin-oglen.jpg` | İdrîs ile Mişke kızgın güneşte sürü otlatır; İdrîs değneğine dayanıp düşünür. | Sıcak hava, kuru otlar | İdrîs ve Mişke · K1 · uzakta, sürüyle, arkadan; titreşen hava | Orta |
| `hz-idris/bolum-3/orumcek-agi.jpg` | İdrîs saatlerce örümceği izler, aklında dokuma fikri doğar. | Sırıklar arasında çiyli ağ | Ön planda ağ; arkasında İdrîs · K1 · çömelmiş, arkadan, flu | Orta |
| `hz-idris/bolum-3/bir-karis-bez.jpg` | Altı ay sonra İdrîs avucundaki bir karış bezi uzun uzun çevirir. | Gergefte küçük bez | İdrîs'in omzu üstünden bakış · K1 · avucunda küçük bez, yüz kadraj dışında | Orta |

Kalan 8 sahne (`kuruyan-yaprak`, `yol-isaretleri`, `kuzeydeki-yildiz`,
`ilk-koy`, `denenip-birakilanlar`, `ufuktaki-toz`, `bos-yemlik`,
`ufka-uzanan-yol`) ve kapaklar figürsüz brifle üretilebilir.
`ufka-uzanan-yol` İdrîs'in yükseltilmesine bağlı olduğu için **figürsüz kalmalı.**

---

## 7. Toplam

| Kitap | Aday | Yüksek | Orta | Düşük |
|---|---|---|---|---|
| Hz. Musa | 34 | 11 | 16 | 7 |
| Hz. Nûh | 20 | 5 | 11 | 4 |
| Hz. Şît | 11 | 2 | 6 | 3 |
| Hz. Eyyûb | 10 | 4 | 4 | 2 |
| Hz. Âdem | 6 | 1 | 3 | 2 |
| **Yeniden üretim toplamı** | **81** | **23** | **40** | **18** |
| Hz. İdrîs (ilk üretim, prompt revizyonu) | 8 | 5 | 3 | — |

Gerçek görseli olan beş kitabın 163 sahne görselinden (bölüm açılışları hariç) 81'i aday. Gerçekçi bir ilk
tur için yalnız **yüksek** öncelikli 23 görsel yeterli; orta öncelikliler kitap
bazında ikinci tura kalabilir.

## 8. Önerilen ilk 10

Seçim ölçütü: hikâye kazancı en büyük, kitaba özgü yasakla çatışma riski en
düşük ve kitaplar arasında dengeli olanlar.

| # | Dosya | Neden |
|---|---|---|
| 1 | `hz-musa/bolum-3/dar-sokak.jpg` | Kuralın kendi örneği; bölümün adı "Bir Anlık Kavga", görselde kimse yok |
| 2 | `hz-musa/bolum-4/medyen-suyu.jpg` | Paragrafın tamamı çobanların davranışı; bölümün değer dersi buradan çıkıyor |
| 3 | `hz-musa/bolum-7/ziynet-meydani.jpg` | Metin "meydan insanlarla doldu" diyor, görsel "ortası boş meydan" |
| 4 | `hz-musa/bolum-6/sutunlu-salon.jpg` | Kitabın ana yüzleşmesi; şu an boş taht |
| 5 | `hz-musa/bolum-9/ay-isiginda-izler.jpg` | Çıkış yolculuğu; kafile yalnız ayak izi olarak var |
| 6 | `hz-nuh/bolum-7/dalgalar.jpg` | Kitabın duygusal merkezi (baba ve oğul); boş tepe olayı anlatamıyor |
| 7 | `hz-nuh/bolum-3/meydan-golgesi.jpg` | "Kapısı Herkese Açık" bölümünün özü, yoksullarla oturan Nûh |
| 8 | `hz-eyyub/bolum-2/tozlu-yol.jpg` | Tek K3 figürlü, risksiz; bölümün kırılma anı |
| 9 | `hz-eyyub/bolum-1/acik-sofra.jpg` | Eyyûb'un cömertliği paylaşılan sofrayla anlatılıyor, sofra boş |
| 10 | `hz-sit/bolum-2/duyulmayan-ses.jpg` | "Duyulmayan Uyarı" bölümünün özü; dinlemeyen komşular görünmüyor |

Sıradakiler: `hz-musa/bolum-1/sazlik-yolu`, `hz-musa/bolum-1/hazir-sandik`,
`hz-musa/bolum-4/bekleyen-suru` (tek K1 figür, üretimi kolay);
`hz-musa/bolum-7/bos-meydan` (§0.2 kararından sonra); `hz-nuh/bolum-5/gemi-iskeleti`.

## 9. Yeniden üretim yapılırsa dokunulacak yerler (bu oturumun işi değil)

- Aynı dosya adıyla `public/` üzerine yazım (§6.2 akışı; stil referansı ve
  Seedream 5 Pro standardı).
- **`src/data/books.ts` içindeki `alt` metni**: görsel değişince alt metin de
  değişmeli, yoksa ekran okuyucu eski figürsüz sahneyi anlatır. Bu bir kod/aktarım
  işidir.
- `ICERIK-GORSEL-SICILI.md` tablosu ve kitap kaydındaki "insan figürü yok"
  satırı; `kitap-icerikleri/*-final.md` içindeki Figür alanı ve prompt.
- Her karma sahne ve her K1 figürü üretimden sonra elle kontrol edilir: yüz,
  profil ve yüz hattı yok; K2 ve K3 yüzleri korkutucu veya karikatür değil.
