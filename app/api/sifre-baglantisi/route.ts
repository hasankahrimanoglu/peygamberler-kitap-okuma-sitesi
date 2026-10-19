import { after } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import { sifreBaglantisiEpostasi } from "../../../src/lib/odeme/epostaSablonlari";
import {
  epostaGecerliMi,
  epostaGonder,
  epostaNormal,
  maskele,
  ozet,
  sifreBaglantisiUret,
  veliBul,
} from "../../../src/lib/odeme/sunucu";

export const runtime = "nodejs";

/**
 * "Şifremi unuttum" ve süresi dolmuş bağlantının yenisi (Faz 7, 3. adım).
 * Cevap her zaman aynıdır: adresin kayıtlı olup olmadığı anlaşılmasın. Sınır:
 * adres başına dakikada 1, saatte 5; bağlantı noktası başına saatte 20.
 * E-posta cevaptan SONRA gönderilir (`after`), süre farkı da bir şey söylemesin.
 */
export async function POST(request: Request) {
  let eposta = "";
  try {
    const govde = (await request.json()) as { eposta?: unknown };
    eposta = epostaNormal(String(govde.eposta ?? ""));
  } catch {
    // Gövde okunamadı: aşağıda geçersiz e-posta sayılır.
  }
  if (!epostaGecerliMi(eposta)) {
    return Response.json({ hata: "gecersiz" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    null;

  const { data: izinli, error } = await getSupabaseAdmin().rpc("sifre_istegi_izinli", {
    p_eposta_ozeti: ozet(eposta),
    p_ip_ozeti: ip ? ozet(ip) : null,
  });
  if (error) {
    console.error("Şifre isteği sınırı okunamadı.", { hata: error.message });
    return Response.json({ hata: "sunucu" }, { status: 500 });
  }
  if (!izinli) {
    return Response.json({ hata: "cok_istek" }, { status: 429 });
  }

  after(async () => {
    try {
      const veli = await veliBul(eposta);
      if (!veli.veliId) return;
      const baglanti = await sifreBaglantisiUret(eposta);
      await epostaGonder(eposta, sifreBaglantisiEpostasi({ eposta, baglanti }));
    } catch (hata) {
      console.error("Şifre bağlantısı gönderilemedi.", {
        eposta: maskele(eposta),
        hata: hata instanceof Error ? hata.message : String(hata),
      });
    }
  });

  return Response.json({ tamam: true });
}
