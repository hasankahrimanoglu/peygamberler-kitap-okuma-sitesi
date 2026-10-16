import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { KULLANIM_KOSULLARI } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(KULLANIM_KOSULLARI);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={KULLANIM_KOSULLARI} />;
}
