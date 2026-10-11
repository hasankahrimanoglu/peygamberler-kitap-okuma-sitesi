import { isilGorseli, YEDEK, type IsilPozu } from "../../lib/varlikYollari";
import { YedekliGorsel } from "../ui";

/**
 * Rehber karakter Işıl (PROJE-MODELI 3.10.5). Hasan'ın çizimi
 * `public/isil/isil-{poz}.png` adıyla gelene kadar konsept eskiz görünür.
 * Dekoratiftir: söylediği cümle her zaman yanındaki metindedir.
 */
export function IsilGorseli({
  poz = "durus",
  boyut = 52,
  className = "",
}: {
  poz?: IsilPozu;
  boyut?: number;
  className?: string;
}) {
  return (
    <YedekliGorsel
      src={isilGorseli(poz)}
      yedekSrc={YEDEK.isil}
      alt=""
      width={boyut}
      height={boyut}
      className={className}
    />
  );
}
