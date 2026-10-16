import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { MESAFELI_SATIS } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(MESAFELI_SATIS);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={MESAFELI_SATIS} />;
}
