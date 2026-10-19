import { sifreBaglantisiEpostasi } from "../../../../src/lib/odeme/epostaSablonlari";
import {
  epostaGecerliMi,
  epostaGonder,
  epostaNormal,
  maskele,
  sifreBaglantisiUret,
  veliBul,
  yoneticiDogrula,
} from "../../../../src/lib/odeme/sunucu";

export const runtime = "nodejs";

/**
 * Yönetim sayfası: bir veliye yeni şifre belirleme bağlantısı. E-posta da
 * gönderilir; bağlantı WhatsApp'tan gönderilebilsin diye cevapta döner.
 */
export async function POST(request: Request) {
  if (!(await yoneticiDogrula(request))) {
    return Response.json({ hata: "yetkisiz" }, { status: 403 });
  }

  let eposta = "";
  try {
    const govde = (await request.json()) as { eposta?: unknown };
    eposta = epostaNormal(String(govde.eposta ?? ""));
  } catch {
    // Aşağıda geçersiz sayılır.
  }
  if (!epostaGecerliMi(eposta)) {
    return Response.json({ hata: "gecersiz_eposta" }, { status: 400 });
  }

  try {
    const veli = await veliBul(eposta);
    if (!veli.veliId) {
      return Response.json({ hata: "veli_yok" }, { status: 404 });
    }
    const baglanti = await sifreBaglantisiUret(eposta);
    const epostaGonderildi = await epostaGonder(eposta, sifreBaglantisiEpostasi({ eposta, baglanti }));
    return Response.json({ baglanti, epostaGonderildi });
  } catch (hata) {
    console.error("Yönetim: bağlantı üretilemedi.", {
      eposta: maskele(eposta),
      hata: hata instanceof Error ? hata.message : String(hata),
    });
    return Response.json({ hata: "sunucu" }, { status: 500 });
  }
}
