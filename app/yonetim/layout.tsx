import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function YonetimDuzeni({ children }: { children: ReactNode }) {
  return children;
}
