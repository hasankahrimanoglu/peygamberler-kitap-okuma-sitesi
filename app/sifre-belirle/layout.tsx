import type { Metadata } from "next";
import type { ReactNode } from "react";

// Adreste tek kullanımlık anahtar var: arama motoruna girmesin, başka siteye
// yönlendirme bilgisi (referrer) olarak gitmesin.
export const metadata: Metadata = {
  title: "Şifrenizi belirleyin",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function SifreBelirleDuzeni({ children }: { children: ReactNode }) {
  return children;
}
