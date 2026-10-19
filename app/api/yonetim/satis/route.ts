import crypto from "crypto";
import { PAKETLER } from "../../../../src/data/paketler";
import {
  epostaGecerliMi,
  epostaNormal,
  maskele,
  siparisiIsle,
  yoneticiDogrula,
} from "../../../../src/lib/odeme/sunucu";

export const runtime = "nodejs";

/**
 * Elden satış (WhatsApp, havale/EFT): yönetici ödemeyi kontrol ettikten sonra
 * hesabı açar ya da paketi büyütür. Shopier'le aynı çekirdeği kullanır;
 * sipariş "elden" kaynağıyla kaydedilir. Bağlantı WhatsApp'tan da gönderilebilsin
 * diye cevapta döner (yalnız yöneticiye).
 */
export async function POST(request: Request) {
  if (!(await yoneticiDogrula(request))) {
    return Response.json({ hata: "yetkisiz" }, { status: 403 });
  }

  let govde: { eposta?: unknown; profilHakki?: unknown; not?: unknown } = {};
  try {
    govde = await request.json();
  } catch {
    // Aşağıda geçersiz sayılır.
  }
  const eposta = epostaNormal(String(govde.eposta ?? ""));
  const profilHakki = Number(govde.profilHakki);
  const not = String(govde.not ?? "").trim().slice(0, 200) || null;

  if (!epostaGecerliMi(eposta)) {
    return Response.json({ hata: "gecersiz_eposta" }, { status: 400 });
  }
  if (!PAKETLER.some((paket) => paket.profilSayisi === profilHakki)) {
    return Response.json({ hata: "gecersiz_paket" }, { status: 400 });
  }

  const tarih = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const siparisNo = `E-${tarih}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  try {
    const sonuc = await siparisiIsle({ kaynak: "elden", siparisNo, eposta, profilHakki, not });
    return Response.json(sonuc);
  } catch (hata) {
    console.error("Elden satış işlenemedi.", {
      siparisNo,
      eposta: maskele(eposta),
      hata: hata instanceof Error ? hata.message : String(hata),
    });
    return Response.json({ hata: "sunucu" }, { status: 500 });
  }
}
