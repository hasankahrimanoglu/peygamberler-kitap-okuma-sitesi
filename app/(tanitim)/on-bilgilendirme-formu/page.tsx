import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { ON_BILGILENDIRME } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(ON_BILGILENDIRME);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={ON_BILGILENDIRME} />;
}
