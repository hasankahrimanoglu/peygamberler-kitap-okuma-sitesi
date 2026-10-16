import type { YasalBelge } from "./tipler";

/**
 * TASLAK — yayından önce hukukçu tarafından gözden geçirilmelidir.
 * Güvenlik bölümü Faz 7 (hesap ve erişim güvenliği) tamamlandıktan sonra
 * somut önlemlerle yeniden yazılmalıdır; o güne kadar genel ifade kullanıldı.
 */
export const GIZLILIK_POLITIKASI: YasalBelge = {
  yol: "/gizlilik-politikasi",
  baslik: "Gizlilik Politikası",
  kisaBaslik: "Gizlilik Politikası",
  ozet: "Hangi bilgileri neden topladığımızı, çocuğunuzun verilerini nasıl koruduğumuzu ve neleri asla yapmadığımızı sade bir dille anlatır.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "Kısaca",
      icerik: [
        {
          liste: [
            "Yalnızca hizmeti sunmak için gereken bilgileri toplarız.",
            "Sitede reklam yoktur; verileriniz reklam veya pazarlama amacıyla kullanılmaz ve satılmaz.",
            "Çocuk profillerini veli oluşturur; çocuktan e-posta, telefon gibi iletişim bilgisi istenmez.",
            "Çocukların başka kullanıcılarla mesajlaşabileceği, yorum yazabileceği bir alan yoktur.",
          ],
        },
      ],
    },
    {
      baslik: "Topladığımız bilgiler",
      icerik: [
        "Veliden: satın alma sırasında ödeme sağlayıcısının ilettiği ad soyad ve e-posta adresi, satın alınan paket ve sipariş numarası.",
        "Çocuk profilinden: velinin belirlediği profil adı ve kullanıcı adı, seçilen avatar ya da velinin isteğe bağlı olarak yüklediği fotoğraf.",
        "Kullanım sırasında: okunan bölümler, kazanılan rozet, madalya ve unvanlar, final testi sonuçları ve listeye eklenen görevlerin durumu. Bu bilgiler veli panelindeki gelişim raporunu oluşturmak için kullanılır.",
      ],
    },
    {
      baslik: "Bilgileri nasıl kullanırız",
      icerik: [
        "Topladığımız bilgileri hesabınızı açmak, okuma deneyimini sunmak, çocuğunuzun ilerlemesini kaydetmek, veli panelini hazırlamak ve destek taleplerinizi yanıtlamak için kullanırız. Ayrıntılı amaç ve hukuki sebepler için KVKK Aydınlatma Metni'ne bakabilirsiniz.",
      ],
    },
    {
      baslik: "Kimlerle paylaşırız",
      icerik: [
        "Bilgileriniz yalnızca hizmetin çalışması için birlikte çalıştığımız hizmet sağlayıcılarla (barındırma, veritabanı, e-posta gönderimi ve ödeme) ve yasal zorunluluk hâlinde yetkili kurumlarla paylaşılır. Ödeme kartı bilgileriniz ödeme sağlayıcısında kalır, bize ulaşmaz.",
      ],
    },
    {
      baslik: "Bilgileri nasıl koruruz",
      icerik: [
        "Site ile tarayıcınız arasındaki veri trafiği şifreli bağlantı üzerinden taşınır. Veli hesabı şifreleri açık metin olarak saklanmaz. Kişisel verilere erişim, hizmetin işletilmesi için yetkilendirilmiş kişilerle sınırlıdır.",
      ],
    },
    {
      baslik: "Çocukların gizliliği",
      icerik: [
        "Hizmet 8–11 yaş çocukların veli gözetiminde kullanması için tasarlanmıştır. Çocuk hesabını yalnızca veli açabilir, düzenleyebilir ve silebilir. Çocuk profilinde dış bağlantı, reklam veya satın alma teklifi gösterilmez.",
      ],
    },
    {
      baslik: "Haklarınız ve hesabın silinmesi",
      icerik: [
        "Verilerinize erişme, düzeltilmesini veya silinmesini isteme hakkınız vardır. Hesabınızın ve çocuk profillerinizin silinmesini {eposta} adresine yazarak talep edebilirsiniz.",
      ],
    },
    {
      baslik: "Değişiklikler",
      icerik: [
        "Bu politika güncellendiğinde yeni metin bu sayfada yayımlanır ve sayfanın başındaki tarih değişir. Önemli değişiklikleri kayıtlı e-posta adresinize de bildiririz.",
      ],
    },
  ],
};
