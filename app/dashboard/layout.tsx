import type { ReactNode } from "react";
import { ParentDataProvider } from "../../src/lib/parent/ParentDataProvider";
import { VeliKabuk } from "../../src/components/dashboard/VeliKabuk";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ParentDataProvider>
      <VeliKabuk>{children}</VeliKabuk>
    </ParentDataProvider>
  );
}
