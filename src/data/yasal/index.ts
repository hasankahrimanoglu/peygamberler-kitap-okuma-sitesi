import { CEREZ_POLITIKASI } from "./cerez";
import { GIZLILIK_POLITIKASI } from "./gizlilik";
import { ILETISIM } from "./iletisim";
import { KULLANIM_KOSULLARI } from "./kullanim";
import { KVKK_AYDINLATMA } from "./kvkk";
import { IPTAL_IADE, MESAFELI_SATIS, ON_BILGILENDIRME } from "./satis";
import type { YasalBelge } from "./tipler";

export { SATICI, YER_TUTUCULAR } from "./satici";
export type { YasalBelge, YasalBolum, YasalIcerik } from "./tipler";
export {
  CEREZ_POLITIKASI,
  GIZLILIK_POLITIKASI,
  ILETISIM,
  IPTAL_IADE,
  KULLANIM_KOSULLARI,
  KVKK_AYDINLATMA,
  MESAFELI_SATIS,
  ON_BILGILENDIRME,
};

/** Altbilgideki sıra. */
export const YASAL_BELGELER: YasalBelge[] = [
  KVKK_AYDINLATMA,
  GIZLILIK_POLITIKASI,
  CEREZ_POLITIKASI,
  KULLANIM_KOSULLARI,
  ON_BILGILENDIRME,
  MESAFELI_SATIS,
  IPTAL_IADE,
];
