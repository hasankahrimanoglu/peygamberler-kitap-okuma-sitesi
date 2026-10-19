import type { ReactNode } from "react";
import { ParentDataProvider } from "../../src/lib/parent/ParentDataProvider";
import { VeliKabuk } from "../../src/components/dashboard/VeliKabuk";
import { VeliKapisi } from "../../src/components/dashboard/VeliKapisi";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ParentDataProvider>
      <VeliKapisi>
        <VeliKabuk>{children}</VeliKabuk>
      </VeliKapisi>
    </ParentDataProvider>
  );
}
