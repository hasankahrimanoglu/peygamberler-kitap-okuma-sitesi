import { redirect } from "next/navigation";

// Ödüller 22 Eki 2026'da Gelişim'in sekmesi oldu (PROJE-MODELI 5.2); eski adres kırılmasın.
export default function OdullerYonlendirme() {
  redirect("/dashboard/gelisim?sekme=oduller");
}
