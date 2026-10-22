import type { Metadata } from "next";
import type { ReactNode } from "react";
import { veliYaziSiniflari } from "../../../src/components/veli/yazilar";

export const metadata: Metadata = {
  title: "Veli Paneli · Önizleme",
  robots: { index: false, follow: false },
};

export default function VeliPaneliOnizlemeDuzeni({ children }: { children: ReactNode }) {
  return <div className={veliYaziSiniflari}>{children}</div>;
}
