import { TanitimHareketi } from "../../src/components/tanitim/hareket/TanitimHareketi";
import { TanitimAltbilgi } from "../../src/components/tanitim/TanitimAltbilgi";
import { TanitimUstMenu } from "../../src/components/tanitim/TanitimUstMenu";

/**
 * Tanıtım (landing) ve yasal sayfaların ortak düzeni: gece mavisi üst menü,
 * içerik, altbilgi. Uygulama ekranları (çocuk ve veli tarafı) bu düzeni
 * kullanmaz.
 *
 * `overflow-x: clip`: yandan kayarak giren öğeler ve ekran dışından uçan Işıl
 * mobilde yatay kaydırma çubuğu oluşturmasın. `clip` kaydırma kabı yaratmadığı
 * için yapışkan üst menü bozulmaz.
 */
export default function TanitimDuzeni({ children }: { children: React.ReactNode }) {
  return (
    <TanitimHareketi>
      <div className="tema-veli min-h-svh overflow-x-clip bg-zemin font-govde text-murekkep">
        <TanitimUstMenu />
        {children}
        <TanitimAltbilgi />
      </div>
    </TanitimHareketi>
  );
}
