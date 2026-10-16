import type { YasalBelge } from "./tipler";

/**
 * İletişim ve satıcı bilgileri. Mesafeli satışta satıcı kimliğinin sitede
 * kolayca bulunabilmesi gerekir; değerler `satici.ts`'ten doldurulur.
 */
export const ILETISIM: YasalBelge = {
  yol: "/iletisim",
  baslik: "İletişim ve Satıcı Bilgileri",
  kisaBaslik: "İletişim",
  ozet: "Sorularınız, önerileriniz ve destek talepleriniz için bize buradan ulaşabilirsiniz.",
  guncelleme: "15 Ekim 2026",
  bolumler: [
    {
      baslik: "Bize ulaşın",
      icerik: [
        "Sorularınızı, önerilerinizi ve destek taleplerinizi {eposta} adresine yazabilirsiniz. İş günlerinde en geç iki gün içinde yanıt veriyoruz.",
        "Hesabınızla ilgili bir konuda yazıyorsanız, satın alırken kullandığınız e-posta adresinden yazmanız işlemi hızlandırır.",
      ],
    },
    {
      baslik: "Satıcı bilgileri",
      icerik: [
        {
          liste: [
            "Unvan: {unvan}",
            "Adres: {adres}",
            "Telefon: {telefon}",
            "E-posta: {eposta}",
            "KEP: {kep}",
            "MERSİS: {mersis}",
            "Vergi dairesi / no: {vergiDairesi} · {vergiNo}",
          ],
        },
      ],
    },
  ],
};
