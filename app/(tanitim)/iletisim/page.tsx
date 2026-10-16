import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { ILETISIM } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(ILETISIM);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={ILETISIM} />;
}
