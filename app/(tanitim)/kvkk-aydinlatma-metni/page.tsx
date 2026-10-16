import { YasalBelgeSayfasi, yasalMetaVerisi } from "../../../src/components/tanitim/YasalBelgeSayfasi";
import { KVKK_AYDINLATMA } from "../../../src/data/yasal";

export const metadata = yasalMetaVerisi(KVKK_AYDINLATMA);

export default function Sayfa() {
  return <YasalBelgeSayfasi belge={KVKK_AYDINLATMA} />;
}
