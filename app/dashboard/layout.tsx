import type { ReactNode } from "react";
import { ParentDataProvider } from "../../src/lib/parent/ParentDataProvider";
import { VeliKapisi } from "../../src/components/dashboard/VeliKapisi";
import { VeliPaneliCanli } from "../../src/components/veli/VeliPaneliCanli";
import { veliYaziSiniflari } from "../../src/components/veli/yazilar";

// Veli paneli (PROJE-MODELI 5.2, REVİZE 22 Eki 2026): veri → veli kapısı (PIN)
// → panel kabuğu ve ekranlar. Ekranların görünümü `src/components/veli/`.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ParentDataProvider>
      <div className={veliYaziSiniflari}>
        <VeliKapisi>
          <VeliPaneliCanli>{children}</VeliPaneliCanli>
        </VeliKapisi>
      </div>
    </ParentDataProvider>
  );
}
