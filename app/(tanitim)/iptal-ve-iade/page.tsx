import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { IPTAL_IADE } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(IPTAL_IADE);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={IPTAL_IADE} />;
}
