import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { GIZLILIK_POLITIKASI } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(GIZLILIK_POLITIKASI);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={GIZLILIK_POLITIKASI} />;
}
