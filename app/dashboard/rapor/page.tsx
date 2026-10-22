import { redirect } from "next/navigation";

// Gelişim Raporları 22 Eki 2026'da Gelişim'e taşındı (PROJE-MODELI 5.2); eski adres kırılmasın.
export default function RaporlarYonlendirme() {
  redirect("/dashboard/gelisim");
}
