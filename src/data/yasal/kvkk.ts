import type { YasalBelge } from "./tipler";

/**
 * TASLAK — yayından önce hukukçu tarafından gözden geçirilmelidir.
 * Aktarım bölümü kullanılan hizmet sağlayıcılarına göre kesinleştirilmelidir.
 */
export const KVKK_AYDINLATMA: YasalBelge = {
  yol: "/kvkk-aydinlatma-metni",
  baslik: "KVKK Aydınlatma Metni",
  kisaBaslik: "KVKK Aydınlatma Metni",
  ozet: "Kişisel verilerinizin ve çocuğunuzun verilerinin hangi amaçla, hangi hukuki sebeple işlendiğini ve haklarınızı açıklar.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "1. Veri sorumlusu",
      icerik: [
        "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla {unvan} (“{marka}”) tarafından aşağıda açıklanan kapsamda işlenmektedir.",
        { liste: ["Adres: {adres}", "E-posta: {eposta}", "KEP: {kep}"] },
      ],
    },
    {
      baslik: "2. İşlenen kişisel veriler",
      icerik: [
        "Hizmeti yalnızca veli satın alır ve kullanır; çocuk profilleri velinin hesabı altında, veli tarafından oluşturulur.",
        {
          tablo: {
            basliklar: ["Kişi", "Veri kategorisi", "Örnekler"],
            satirlar: [
              ["Veli", "Kimlik ve iletişim", "Ad soyad, e-posta adresi"],
              ["Veli", "Müşteri işlem", "Sipariş numarası, satın alınan paket, profil hakkı"],
              ["Veli", "İşlem güvenliği", "Hesap giriş kayıtları, oturum bilgisi"],
              ["Çocuk", "Profil", "Profil adı, kullanıcı adı, seçilen avatar veya velinin yüklediği fotoğraf"],
              ["Çocuk", "Kullanım", "Okuma ilerlemesi, kazanılan rozet, madalya ve unvanlar, final testi sonuçları, görev durumları"],
            ],
          },
        },
        "Ödeme kartı bilgileri ödeme hizmet sağlayıcısı tarafından işlenir; bu bilgiler {marka} sistemlerine ulaşmaz ve saklanmaz.",
      ],
    },
    {
      baslik: "3. İşleme amaçları",
      icerik: [
        {
          liste: [
            "Satın alma işleminin tamamlanması ve veli hesabının oluşturulması",
            "Çocuk profillerinin oluşturulması ve okuma deneyiminin sunulması",
            "Okuma ilerlemesinin kaydedilmesi, rozet, madalya ve unvanların gösterilmesi",
            "Veli paneli ve gelişim raporlarının hazırlanması",
            "Destek taleplerinin yanıtlanması ve hizmetle ilgili bilgilendirme yapılması",
            "Bilgi güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi",
          ],
        },
        "Çocuklara ait veriler reklam, pazarlama veya profilleme amacıyla kullanılmaz.",
      ],
    },
    {
      baslik: "4. Hukuki sebepler",
      icerik: [
        "Kişisel verileriniz KVKK'nın 5. maddesinin 2. fıkrasında yer alan şu hukuki sebeplere dayanılarak işlenir:",
        {
          liste: [
            "Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (c bendi)",
            "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi (ç bendi)",
            "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (f bendi)",
          ],
        },
        "Çocuk profiline fotoğraf yüklemek isteğe bağlıdır; fotoğraf yüklenmezse hazır avatarlardan biri kullanılır.",
      ],
    },
    {
      baslik: "5. Toplama yöntemi",
      icerik: [
        "Kişisel veriler; satın alma sırasında ödeme hizmet sağlayıcısından iletilen sipariş bildirimi, veli panelindeki formlar ve hizmetin kullanımı sırasında otomatik yollarla (oturum bilgisi, tarayıcı depolaması) elektronik ortamda toplanır.",
      ],
    },
    {
      baslik: "6. Aktarım",
      icerik: [
        "Kişisel veriler, yalnızca hizmetin sunulması için gerekli olduğu ölçüde ve KVKK'nın 8. ve 9. maddelerine uygun olarak şu alıcı gruplarına aktarılabilir:",
        {
          liste: [
            "Barındırma ve veritabanı hizmeti: {barindirma}",
            "Ödeme hizmet sağlayıcısı: Shopier",
            "E-posta gönderim hizmeti (giriş bilgilerinin iletilmesi)",
            "Talep hâlinde yetkili kamu kurum ve kuruluşları",
          ],
        },
        "Hizmet sağlayıcılarından birinin sunucularının yurt dışında bulunması hâlinde aktarım, KVKK'nın 9. maddesinde öngörülen güvencelerle yapılır.",
      ],
    },
    {
      baslik: "7. Saklama süresi",
      icerik: [
        "Kişisel veriler hesap açık kaldığı sürece saklanır. Hesap kapatıldığında veriler, ilgili mevzuatta öngörülen saklama süreleri sonunda silinir, yok edilir veya anonim hâle getirilir. Bir çocuk profilinin silinmesi, o profile ait okuma ve ödül kayıtlarını da siler.",
      ],
    },
    {
      baslik: "8. Haklarınız",
      icerik: [
        "KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak:",
        {
          liste: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
            "KVKK'nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
            "Düzeltme ve silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme",
            "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
            "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
          ],
        },
        "haklarına sahipsiniz. Veli, çocuğunun verilerine ilişkin bu hakları kanuni temsilci sıfatıyla kullanabilir.",
      ],
    },
    {
      baslik: "9. Başvuru",
      icerik: [
        "Başvurularınızı, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak yazılı şekilde {adres} adresine, KEP ile {kep} adresine veya sistemimizde kayıtlı e-posta adresinizden {eposta} adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.",
      ],
    },
  ],
};
