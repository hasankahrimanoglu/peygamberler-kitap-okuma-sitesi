import type { YasalBelge } from "./tipler";

/**
 * TASLAK. Bugünkü durum: site çerez kullanmıyor; yalnız tarayıcı depolaması
 * (localStorage / sessionStorage) zorunlu amaçlarla kullanılıyor.
 *
 * DİKKAT: Siteye ölçüm veya reklam aracı (Google Analytics, Meta Pixel vb.)
 * eklenirse bu metin güncellenmeli ve araç, ziyaretçinin açık rızası alınmadan
 * çalıştırılmamalıdır (çerez onay paneli gerekir).
 */
export const CEREZ_POLITIKASI: YasalBelge = {
  yol: "/cerez-politikasi",
  baslik: "Çerez Politikası",
  kisaBaslik: "Çerez Politikası",
  ozet: "Sitenin çalışması için tarayıcınızda hangi bilgilerin saklandığını ve neden saklandığını açıklar.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "Çerez ve benzeri teknolojiler",
      icerik: [
        "Çerezler ve tarayıcı depolaması, bir sitenin cihazınızda küçük bilgiler saklamasını sağlayan teknolojilerdir. {marka}, bu teknolojileri yalnızca hizmetin çalışması için zorunlu olan amaçlarla kullanır.",
        "Sitede analiz, reklam veya üçüncü taraf izleme çerezi kullanılmaz.",
      ],
    },
    {
      baslik: "Kullandığımız kayıtlar",
      icerik: [
        {
          tablo: {
            basliklar: ["Kayıt", "Amaç", "Süre"],
            satirlar: [
              ["Oturum bilgisi", "Giriş yaptığınızı hatırlamak; her sayfada yeniden giriş istememek", "Çıkış yapılana kadar"],
              ["Seçili çocuk profili", "Hangi çocuğun okuduğunu bilmek ve ilerlemeyi doğru profile kaydetmek", "Çıkış yapılana veya profil değişene kadar"],
              ["Okuma tercihleri", "Yazı boyutu gibi ayarları ve rehber karakterin tanıtımının görüldüğünü hatırlamak", "Tarayıcı verisi silinene kadar"],
              ["Bölüm içi seçim", "“Sen olsaydın?” seçiminin sayfa yenilenince kaybolmaması", "Sekme kapanınca silinir"],
            ],
          },
        },
        "Bu kayıtlar zorunlu niteliktedir; bunlar olmadan giriş yapılamaz ve okuma ilerlemesi kaydedilemez. Bu nedenle ayrıca onay istenmez.",
      ],
    },
    {
      baslik: "Kayıtları yönetmek",
      icerik: [
        "Tarayıcınızın ayarlarından site verilerini dilediğiniz zaman silebilirsiniz. Sildiğinizde oturumunuz kapanır; okuma ilerlemesi hesabınızda saklandığı için kaybolmaz.",
      ],
    },
    {
      baslik: "İletişim",
      icerik: ["Sorularınız için {eposta} adresine yazabilirsiniz."],
    },
  ],
};
