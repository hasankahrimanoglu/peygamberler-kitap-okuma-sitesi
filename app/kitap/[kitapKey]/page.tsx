import { redirect } from "next/navigation";

/**
 * Ayrı bölüm rotası sayfası kaldırıldı (KARAR 12 Eki 2026 — PROJE-MODELI
 * 3.10.7). Kitap ve bölümleri artık ana ekranda açılır: mobilde alttan sayfa,
 * geniş ekranda sağ panel. Eski bağlantılar (quiz dönüşü, veli kütüphanesi)
 * kırılmasın diye bu rota haritaya, kitabı açık hâlde yönlendirir.
 */
export default async function KitapYonlendirme({
  params,
}: {
  params: Promise<{ kitapKey: string }>;
}) {
  const { kitapKey } = await params;
  redirect(`/map?kitap=${encodeURIComponent(kitapKey)}`);
}
