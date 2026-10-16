import type { YasalBelge } from "./tipler";

/**
 * Satışla ilgili üç belge: Ön Bilgilendirme Formu, Mesafeli Satış Sözleşmesi,
 * İptal ve İade Koşulları. Mesafeli Sözleşmeler Yönetmeliği'ne göre hazırlanmış
 * TASLAKLARDIR — yayından önce hukukçu tarafından gözden geçirilmelidir.
 *
 * Cayma hakkı: dijital içerik, ödeme onaylandıktan sonra anında erişime
 * açıldığı için Yönetmelik m.15/1-ğ istisnası kapsamındadır. İstisnanın
 * geçerli olması için alıcının ödeme öncesinde bunu onaylaması gerekir; bu
 * onay Shopier ödeme sayfasındaki sözleşme onayıyla alınmalıdır.
 */

export const ON_BILGILENDIRME: YasalBelge = {
  yol: "/on-bilgilendirme-formu",
  baslik: "Ön Bilgilendirme Formu",
  kisaBaslik: "Ön Bilgilendirme Formu",
  ozet: "Satın almadan önce satıcı, ürün, fiyat, teslim ve cayma hakkı hakkında bilmeniz gerekenler.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "1. Satıcı bilgileri",
      icerik: [
        {
          liste: [
            "Unvan: {unvan}",
            "Adres: {adres}",
            "Telefon: {telefon}",
            "E-posta: {eposta}",
            "MERSİS / Vergi no: {mersis} · {vergiDairesi} {vergiNo}",
          ],
        },
      ],
    },
    {
      baslik: "2. Ürünün temel nitelikleri",
      icerik: [
        "{marka}; peygamberlerin ve Dört Büyük Halife'nin hayatını anlatan kitapların, sesli anlatımlı ve etkileşimli bölümler hâlinde sunulduğu dijital okuma hizmetidir. Paketler yalnızca oluşturulabilecek çocuk profili sayısıyla ayrışır; içerik ve özellikler tüm paketlerde aynıdır.",
        "Hizmet internet tarayıcısı üzerinden kullanılır. Güncel bir tarayıcıya sahip tablet, telefon veya bilgisayar ve internet bağlantısı gerekir.",
      ],
    },
    {
      baslik: "3. Fiyat ve ödeme",
      icerik: [
        "Paketin vergiler dahil toplam fiyatı sipariş sayfasında gösterilir. Ödeme, Shopier ödeme altyapısı üzerinden tek seferde alınır; abonelik veya otomatik yenileme yoktur. Ödeme kartı bilgileri satıcıyla paylaşılmaz.",
      ],
    },
    {
      baslik: "4. Teslim",
      icerik: [
        "Ödemenin onaylanmasının ardından veli hesabı oluşturulur ve giriş bilgileri sipariş sırasında bildirilen e-posta adresine gönderilir. Bu işlem genellikle birkaç dakika içinde, en geç 24 saat içinde tamamlanır.",
      ],
    },
    {
      baslik: "5. Cayma hakkı",
      icerik: [
        "Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin 1. fıkrasının (ğ) bendi uyarınca, elektronik ortamda anında ifa edilen hizmetlerde ve tüketiciye anında teslim edilen gayrimaddi mallarda cayma hakkı bulunmamaktadır. Ödemeyi tamamlayarak içeriğe anında erişimin başlamasını onaylamış olursunuz.",
        "Teknik bir sorun nedeniyle hizmete erişim sağlanamaması hâlinde uygulanacak iade koşulları İptal ve İade Koşulları sayfasında yer alır.",
      ],
    },
    {
      baslik: "6. Şikâyet ve itiraz",
      icerik: [
        "Şikâyetlerinizi {eposta} adresine iletebilirsiniz. Uyuşmazlık hâlinde Ticaret Bakanlığınca her yıl ilan edilen parasal sınırlar dahilinde tüketici hakem heyetlerine, bu sınırları aşan durumlarda tüketici mahkemelerine başvurabilirsiniz.",
      ],
    },
  ],
};

export const MESAFELI_SATIS: YasalBelge = {
  yol: "/mesafeli-satis-sozlesmesi",
  baslik: "Mesafeli Satış Sözleşmesi",
  kisaBaslik: "Mesafeli Satış Sözleşmesi",
  ozet: "Satıcı ile alıcı arasında, dijital okuma hizmetinin satışına ilişkin hak ve yükümlülükleri düzenleyen sözleşme.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "Madde 1 — Taraflar",
      icerik: [
        "Satıcı: {unvan}, {adres}, {eposta}, {telefon}, MERSİS: {mersis}.",
        "Alıcı: Sipariş sırasında ad soyad ve e-posta bilgilerini bildiren kişi.",
      ],
    },
    {
      baslik: "Madde 2 — Konu",
      icerik: [
        "Bu sözleşmenin konusu, Alıcı'nın {alanAdi} üzerinden sipariş verdiği {marka} dijital okuma hizmeti paketinin satışı ve kullanıma açılmasına ilişkin olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.",
      ],
    },
    {
      baslik: "Madde 3 — Ürün ve fiyat",
      icerik: [
        "Satın alınan paket, paketin içerdiği çocuk profili sayısı ve vergiler dahil toplam fiyat sipariş sayfasında ve sipariş onayında belirtildiği gibidir. Ödeme tek seferde alınır.",
      ],
    },
    {
      baslik: "Madde 4 — İfa ve teslim",
      icerik: [
        "Satıcı, ödemenin onaylanmasının ardından Alıcı adına veli hesabı oluşturur ve giriş bilgilerini Alıcı'nın bildirdiği e-posta adresine en geç 24 saat içinde gönderir. Teslim, giriş bilgilerinin gönderilmesiyle gerçekleşmiş sayılır.",
      ],
    },
    {
      baslik: "Madde 5 — Cayma hakkı",
      icerik: [
        "Hizmet, elektronik ortamda anında ifa edilen ve anında teslim edilen dijital içerik niteliğinde olduğundan Yönetmelik'in 15. maddesinin 1. fıkrasının (ğ) bendi uyarınca cayma hakkı kapsamı dışındadır. Alıcı, ödemeyi tamamlamadan önce bu durumu bildiğini ve içeriğe anında erişimin başlamasını onayladığını kabul eder.",
      ],
    },
    {
      baslik: "Madde 6 — Tarafların yükümlülükleri",
      icerik: [
        {
          liste: [
            "Satıcı, hizmeti ürün tanıtımında belirtilen niteliklere uygun olarak sunmakla yükümlüdür.",
            "Alıcı, hesap bilgilerini korumak ve hizmeti Kullanım Koşulları'na uygun olarak, aile içinde ve ticari olmayan amaçla kullanmakla yükümlüdür.",
            "Hizmete erişimi engelleyen ve Satıcı'dan kaynaklanan bir sorun giderilemezse İptal ve İade Koşulları uygulanır.",
          ],
        },
      ],
    },
    {
      baslik: "Madde 7 — Uyuşmazlıkların çözümü",
      icerik: [
        "Bu sözleşmeden doğan uyuşmazlıklarda Ticaret Bakanlığınca ilan edilen parasal sınırlar dahilinde Alıcı'nın yerleşim yerindeki veya işlemin yapıldığı yerdeki tüketici hakem heyetleri, bu sınırları aşan durumlarda tüketici mahkemeleri yetkilidir.",
      ],
    },
    {
      baslik: "Madde 8 — Yürürlük",
      icerik: [
        "Alıcı, ödeme öncesinde Ön Bilgilendirme Formu'nu ve bu sözleşmeyi okuyup kabul ettiğini beyan eder. Sözleşme, ödemenin onaylanmasıyla yürürlüğe girer.",
      ],
    },
  ],
};

export const IPTAL_IADE: YasalBelge = {
  yol: "/iptal-ve-iade",
  baslik: "İptal ve İade Koşulları",
  kisaBaslik: "İptal ve İade Koşulları",
  ozet: "Dijital içerik satışında cayma hakkı, iade yapılan durumlar ve başvuru yolu.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "Cayma hakkı",
      icerik: [
        "{marka} dijital bir hizmettir ve ödeme onaylandıktan sonra anında kullanıma açılır. Bu nedenle Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca cayma hakkı bulunmamaktadır.",
      ],
    },
    {
      baslik: "İade yapılan durumlar",
      icerik: [
        {
          liste: [
            "Ödeme alındığı hâlde giriş bilgilerinin size ulaşmaması ve sorunun bildiriminizden sonra çözülememesi",
            "Satıcıdan kaynaklanan ve giderilemeyen bir teknik sorun nedeniyle hizmetin kullanılamaması",
            "Aynı sipariş için birden fazla ödeme alınması (mükerrer ödeme)",
          ],
        },
      ],
    },
    {
      baslik: "Başvuru ve süreç",
      icerik: [
        "İade talebinizi sipariş numaranızla birlikte {eposta} adresine iletebilirsiniz. Talepler incelenir ve uygun bulunan iadeler en geç {iadeSuresi} içinde, ödemenin yapıldığı araca Shopier üzerinden yapılır. Tutarın hesabınıza yansıma süresi bankanıza göre değişebilir.",
      ],
    },
    {
      baslik: "Paket değişikliği",
      icerik: [
        "Daha fazla çocuk profiline ihtiyaç duyarsanız {eposta} adresine yazın; mevcut paketinizden üst pakete geçiş seçenekleri hakkında bilgi verelim.",
      ],
    },
  ],
};
