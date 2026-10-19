import { getSupabaseAdmin } from "../../../../lib/supabase-admin";
import { yoneticiDogrula } from "../../../../src/lib/odeme/sunucu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Yönetim sayfası: son 50 sipariş (bütün kaynaklar). Yalnız yönetici. */
export async function GET(request: Request) {
  if (!(await yoneticiDogrula(request))) {
    return Response.json({ hata: "yetkisiz" }, { status: 403 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("siparisler")
    .select("id, kaynak, siparis_no, eposta, profil_hakki, durum, eposta_gonderildi, not_metni, hata, olusturuldu")
    .order("olusturuldu", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Siparişler okunamadı.", { hata: error.message });
    return Response.json({ hata: "sunucu" }, { status: 500 });
  }
  return Response.json({ siparisler: data ?? [] });
}
