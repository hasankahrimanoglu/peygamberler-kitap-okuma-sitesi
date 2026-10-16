import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { CEREZ_POLITIKASI } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(CEREZ_POLITIKASI);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={CEREZ_POLITIKASI} />;
}
