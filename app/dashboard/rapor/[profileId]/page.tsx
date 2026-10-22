import { redirect } from "next/navigation";

// Çocuğun Gelişim Raporu 22 Eki 2026'da Gelişim'e taşındı (PROJE-MODELI 5.2); eski adres kırılmasın.
export default async function RaporYonlendirme({ params }: { params: Promise<{ profileId: string }> }) {
  const { profileId } = await params;
  redirect(`/dashboard/gelisim?cocuk=${encodeURIComponent(profileId)}`);
}
