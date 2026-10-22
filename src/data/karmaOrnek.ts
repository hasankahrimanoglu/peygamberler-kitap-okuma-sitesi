import type { BookContentBlock } from "./books";

/**
 * Karma anlatım tarzının onaylı iki örneği (KARAR 22 Eki 2026, Hasan —
 * PROJE-MODELI 4.1/20). YALNIZ tasarım önizlemesi içindir:
 * `/tasarim/okuma?bolum=adem-4&ornek=karma` ve `?bolum=yusuf-1&ornek=karma`.
 * Gerçek bölümler `books.ts`'teki metinle açılır; bu dosya ürün içeriği değildir.
 * Metnin kaynağı `kitap-icerikleri/ORNEK-KARMA-TARZ.md` (kurgu işaretleri kaldırıldı).
 */
export const KARMA_ORNEKLERI: Record<
  string,
  { contentBlocks: BookContentBlock[]; continuationBlocks: BookContentBlock[] }
> = {
  "adem-4": {
    contentBlocks: [
      {
        type: "text",
        text: "Şimdi seni bir bahçeye götüreceğim. Öyle bir bahçe ki orada ne acıkılır ne susanır; güneş yakmaz, yorgunluk nedir bilinmez. Sabah ışığı yaprakların arasından süzülür, dallar meyvenin ağırlığıyla yere kadar eğilir. Bu bahçede Hz. Âdem (a.s.) ile eşi yaşıyordu.",
        dropCap: true,
      },
      {
        type: "text",
        text: "Allah onlara \"Dilediğiniz yerden yiyin, ama şu ağaca yaklaşmayın\" demişti. Bütün ağaçlar onlarındı. Bir ağaç hariç.",
      },
      {
        type: "text",
        text: "Allah onları bir şeye karşı daha uyarmıştı: \"Bu, sana ve eşine düşmandır. Sakın sizi cennetten çıkarmasın.\" Bu düşman, Hz. Âdem'e secde etmeyen İblis'ti. Hatırlıyor musun?",
      },
      { type: "isil", text: "Düşman mı? O zaman korkunç görünüyordur!" },
      {
        type: "text",
        text: "İşin en şaşırtıcı yanı da bu. İblis kapıyı yumruklayarak gelmedi. Rüzgârın hışırtısına karışan yumuşak bir sesle geldi; tıpkı onları çok seven bir dost gibi fısıldadı.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-adem/bolum-4/tatli-fisilti.jpg",
        alt: "Rüzgârla kıpırdayan yaprakların arasında dağılan ince bir sis",
      },
      {
        type: "interactive_word",
        before: "İçe fısıldanan, yanlışı güzel gösteren bu sözlere ",
        word: "vesvese",
        meaning: "İnsanın içine doğan ve onu yanlış bir davranışa çağıran rahatsız edici düşüncedir.",
        after: " denir. Kulağa hoş gelir, ama insanı yanlışa çağırır.",
      },
      { type: "text", text: "Önce Hz. Âdem'e seslendi:" },
      { type: "text", text: "— Ey Âdem! Sana sonsuzluk ağacını ve hiç bitmeyecek bir saltanatı göstereyim mi?" },
      {
        type: "text",
        text: "Sonsuzluk ağacı! Adına bak, ne kadar güzel. Oysa o ağacın gerçek adı başkaydı: Allah'ın \"yaklaşmayın\" dediği ağaç. İblis ona yeni bir ad takmıştı, o kadar.",
      },
      { type: "text", text: "Sonra ikisine birden şunu fısıldadı:" },
      { type: "text", text: "— Rabbiniz bu ağacı, melek olursunuz veya sonsuza kadar kalırsınız diye yasakladı." },
      { type: "text", text: "Ardından bir de yemin etti: \"Ben sizin iyiliğinizi isteyenlerdenim.\"" },
      { type: "isil", text: "Ama yemin etti! Yemin eden yalan söyler mi?" },
      {
        type: "text",
        text: "Ne yazık ki söyleyebilir. İblis de tam bunu yaptı: Yalanını bir yeminle süsledi. Hz. Âdem ile eşi birbirlerine baktılar. Sonsuza kadar bu bahçede kalmak… Ya doğru söylüyorsa?",
      },
      {
        type: "image",
        src: "/kitaplar/hz-adem/bolum-4/tekrarin-izi.jpg",
        alt: "Durgun suya düşen tek bir damlanın giderek genişleyen halkaları",
      },
      {
        type: "text",
        text: "Fısıltı bir kere söylendi de bitti mi? Bitmedi. Durgun suya düşen bir damla gibi halka halka büyüdü. Aynı söz bir daha geldi, bir daha… Bahçenin sıradan bir köşesinde duran o ağaç, artık gözlerinin önünden gitmiyordu.",
      },
      {
        type: "text",
        text: "Bir yanda Allah'ın açık sözü: \"Yaklaşmayın.\" Öbür yanda tatlı bir fısıltı ve bir yemin. Bir akşam kendilerini o ağacın dibinde buldular. Şimdi bir dakika dur. Devam etmeden önce sana bir şey soracağım.",
      },
    ],
    continuationBlocks: [
      { type: "soru_basligi", text: "Ağaçtan tattıklarında ne oldu?" },
      {
        type: "text",
        text: "Hz. Âdem ile eşi o yemine inandılar. Uyarı bir an akıllarından kaydı ve ağaçtan tattılar. Kur'an bu anı tek cümleyle anlatır: İblis onları aldatarak düşürmüştü.",
      },
      {
        type: "text",
        text: "Tadar tatmaz tatlı fısıltı sustu. Parlayan vaat, bir sabun köpüğü gibi pat diye söndü. Melek olmak yoktu. Sonsuzluk yoktu. İçlerine soğuk bir pişmanlık yayıldı: Ne yaptık biz? Hemen cennet yapraklarını toplayıp üzerlerini örtmeye başladılar.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-adem/bolum-4/yapraklarin-golgesi.jpg",
        alt: "Üst üste savrulmuş geniş bahçe yaprakları ve aralarından sızan solgun ışık",
      },
      { type: "isil", text: "Hz. Havva kandırdı, değil mi? Ben öyle duymuştum." },
      {
        type: "text",
        text: "Öyle anlatan eski hikâyeler var. Ama Kur'an öyle anlatmaz. İblis ikisine birden fısıldamıştı; ikisi birlikte aldandı. Pişmanlık da ikisinindi.",
      },
      {
        type: "bilgi_kutusu",
        text: "Kur'an o ağacın ne ağacı olduğunu söylemez. Elma olduğunu duymuş olabilirsin; bu kesin bir bilgi değildir. Kur'an'ın anlattığı şey ağaç değil, verilen sözdür.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-adem/bolum-4/solan-vaat.jpg",
        alt: "Bir dalın ucunda kurumaya başlamış tek bir yaprak",
      },
      { type: "soru_basligi", text: "Peki şimdi ne olacak?" },
      { type: "text", text: "Rableri onlara seslendi:" },
      { type: "text", text: "— Ben size bu ağacı yasaklamadım mı ve şeytan size apaçık bir düşmandır demedim mi?" },
      {
        type: "text",
        text: "Bahçe sessizdi. Hz. Âdem'in kalbi hızla çarpıyordu. Şimdi ne yapacaklardı? Bahane mi bulacaklardı? Birbirlerini mi suçlayacaklardı? Yoksa… Bunu bir sonraki bölümde göreceğiz. Ama sana şimdiden söyleyeyim: Bu hikâyenin en güzel yeri daha gelmedi.",
      },
    ],
  },
  "yusuf-1": {
    contentBlocks: [
      {
        type: "text",
        text: "Çok eski zamanlarda, Kenan denilen geniş topraklarda akşamlar bambaşkaydı. Otlaklardan dönen sürüler ağıllara girer, keçi kılı çadırların önünde küçük ateşler yanardı. Gökte yıldızlar birer birer belirirdi. Bu çadırlardan birinde Hz. Yakup (a.s.) adında bir peygamber yaşıyordu.",
        dropCap: true,
      },
      {
        type: "text",
        text: "Hz. Yakup insanları bir olan Allah'a inanmaya çağırır, aynı şeyi çocuklarına da sabırla öğretirdi. Birçok oğlu vardı. Bunlardan biri, ileride peygamber olacak olan Hz. Yusuf (a.s.) idi. Hz. Yusuf'un bir de öz kardeşi vardı; anlatılanlara göre adı Bünyamin'di. İki kardeş birbirine çok düşkündü.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-yusuf/bolum-1/iki-kardes.jpg",
        alt: "Akşam ışığında, otlakların arasındaki patikada birkaç kuzuyla birlikte çadırlara doğru yürüyen, sırtları dönük iki çocuk.",
      },
      {
        type: "text",
        text: "Bir gece, küçük Bünyamin yanında mışıl mışıl uyurken, Hz. Yusuf bir rüya gördü. Öyle açık, öyle parlak bir rüya ki uyandığında bile gözlerinin önünden gitmedi.",
      },
      {
        type: "text",
        text: "Rüyasında gökyüzünde on bir yıldız belirdi. Sonra güneş geldi, sonra ay. Ve hepsi, saygıyla onun önünde eğildi.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-yusuf/bolum-1/ruyadaki-gokyuzu.jpg",
        alt: "Masalsı bir gece göğünde yay gibi dizilmiş on bir parlak yıldız, yumuşak ışıklı bir güneş ve dolunay; ışıkları aşağıdaki küçük bir çadıra doğru eğiliyor.",
      },
      { type: "isil", text: "On bir yıldız, bir güneş, bir ay… Neden tam on bir?" },
      {
        type: "text",
        text: "Güzel soru. Bunu Hz. Yusuf da bilmiyordu. Cevap bu kitabın en son bölümünde saklı; oraya gelince bu soruyu hatırla.",
      },
      {
        type: "text",
        text: "Gün ağarırken Hz. Yusuf çadırdan sessizce çıktı, ağılın yanında biraz oyalandı. Koyunlar sabah serinliğinde birbirine sokulmuştu; o ise hâlâ gökyüzüne bakıyordu. Kardeşleri sürüleri alıp çoktan otlağa gitmişti. Babası çadırında sabah ibadetini yeni bitirmişti.",
      },
      {
        type: "text",
        text: "Hz. Yusuf'un içi içine sığmıyordu. Bu rüyayı birine anlatmadan duramayacaktı. Ama kime? Bu kadar önemli bir şey önce kime anlatılırdı?",
      },
    ],
    continuationBlocks: [
      { type: "soru_basligi", text: "Hz. Yusuf rüyasını kime anlattı?" },
      {
        type: "text",
        text: "Hz. Yusuf babasının çadırına yürüdü, içeri girip onun yanına oturdu. Sesi heyecandan biraz titriyordu.",
      },
      { type: "text", text: "— Babacığım, rüyamda on bir yıldızı, güneşi ve ayı gördüm; hepsi önümde eğiliyordu." },
      {
        type: "text",
        text: "Hz. Yakup oğlunu, sözünü hiç kesmeden sonuna kadar dinledi. Sonra bir süre sustu; bunun sıradan bir rüya olmadığını anlamıştı. Elini oğlunun omzuna koydu.",
      },
      {
        type: "text",
        text: "— Oğulcuğum, bu rüyanı kardeşlerine anlatma; yoksa sana bir tuzak kurarlar. Çünkü şeytan, insanın apaçık bir düşmanıdır.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-yusuf/bolum-1/babanin-cadiri.jpg",
        alt: "Sabah ışığında bir çadırın içi: hasırın üstünde, çadırın aralık kapısına dönük yan yana oturan bir baba ile oğlu; sırtları izleyiciye dönük.",
      },
      { type: "isil", text: "Ama neden? Kardeşler birbirine her şeyi anlatmaz mı?" },
      {
        type: "text",
        text: "Çoğu zaman anlatır. Ama Hz. Yakup oğullarını iyi tanıyordu. Bazı sevinçler yanlış zamanda anlatılınca, birinin içindeki kıskançlığı büyütebilir.",
      },
      { type: "text", text: "Sonra Hz. Yakup oğluna güzel bir müjde verdi:" },
      {
        type: "text",
        text: "— Rabbin seni seçecek ve sana rüyaların yorumunu öğretecek. Daha önce ataların İbrahim'e ve İshak'a nimetini tamamladığı gibi, sana da tamamlayacak.",
      },
      { type: "text", text: "Hz. Yusuf babasının öğüdünü tuttu ve rüyasını kimseye anlatmadı." },
      { type: "soru_basligi", text: "Peki kardeşler ne düşünüyordu?" },
      {
        type: "interactive_word",
        before:
          "Kardeşleri, babalarının Hz. Yusuf'a ve öz kardeşine gösterdiği sevgiyi çoktan fark etmişti. Bu sevgi onları her geçen gün biraz daha rahatsız ediyordu. Zamanla kalplerinde derin bir ",
        word: "haset",
        meaning: "Başkasındaki bir iyiliği çekemeyip onun elinden gitmesini istemektir.",
        after: " filizlenmeye başladı.",
      },
      {
        type: "text",
        text: "Bir gün otlakta bir araya geldiler. Öğle sıcağıydı; sürüler akasyanın gölgesine sığınmıştı. İçlerinden geçenleri birbirlerine açıkça söylediler:",
      },
      {
        type: "text",
        text: "— Yusuf ile kardeşi, babamıza bizden daha sevimli geliyor. Oysa biz birbirine destek olan güçlü bir topluluğuz. Babamız apaçık bir yanılgı içinde.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-yusuf/bolum-1/otlaktaki-kardesler.jpg",
        alt: "Öğle sıcağında, uzak bir vadide sürülerinin yanında bir araya toplanmış, sırtları dönük bir grup çoban ve tepede yalnız bir akasya ağacı.",
      },
      {
        type: "bilgi_kutusu",
        text: "Kur'an, Hz. Yusuf'un hikâyesini baştan sona bir arada, Yûsuf suresinde anlatır ve ona \"kıssaların en güzeli\" der. Aynı surede, bu hikâyede soranlar için dersler olduğu da söylenir.",
      },
      {
        type: "text",
        text: "Hz. Yusuf bu konuşmalardan habersizdi; o kardeşlerini içtenlikle seviyordu. Ama otlakta söylenen bu sözler, ailenin önüne uzun ve zor bir yol açacaktı. Ve o yolun sonunda, bir gece görülen o rüya gerçek olacaktı.",
      },
      {
        type: "image",
        src: "/kitaplar/hz-yusuf/bolum-1/sabah-yolu.jpg",
        alt: "Sabah ışığında otlakların arasından ufka doğru uzanan, iki yanı taşlı ince bir patika.",
      },
    ],
  },
};
