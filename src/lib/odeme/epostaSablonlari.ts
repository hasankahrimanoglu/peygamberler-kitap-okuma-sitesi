/**
 * Veliye giden e-postalar ve WhatsApp mesajı (Faz 7, 3. adım — PROJE-MODELI
 * Bölüm 8). Saf fonksiyonlardır: gizli bilgi kullanmaz, gönderim yapmaz;
 * önizleme sayfası (`/tasarim/epostalar`) da bunları çizer. Gönderim
 * `eposta.ts`'tedir.
 *
 * E-posta istemcileri CSS değişkeni ve sınıf tanımadığı için renkler burada
 * satır içi yazılır; değerler `.tema-veli` tokenlarının aynısıdır.
 */

import { MARKA } from "../../data/marka";

export type EpostaIcerigi = { konu: string; html: string; metin: string };

const RENK = {
  zemin: "#faf6ed",
  yuzey: "#fffdf8",
  cizgi: "#e7dcc5",
  murekkep: "#3d2b1f",
  soluk: "#7d6656",
  eylem: "#2e7d5b",
} as const;

const YAZI = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Bağlantının geçerlilik süresi (Supabase "Email OTP Expiration" = 86400). */
export const BAGLANTI_SURESI_SAAT = 24;

function kacis(metin: string) {
  return metin
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraf(icerik: string, renk: string = RENK.murekkep) {
  return `<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${renk};">${icerik}</p>`;
}

function dugme(adres: string, etiket: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="border-radius:12px;background:${RENK.eylem};"><a href="${kacis(adres)}" style="display:inline-block;padding:14px 28px;font-family:${YAZI};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">${kacis(etiket)}</a></td></tr></table>`;
}

function cerceve({ onMetin, govde, eposta }: { onMetin: string; govde: string; eposta: string }) {
  return `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${kacis(MARKA.ad)}</title></head>
<body style="margin:0;padding:0;background:${RENK.zemin};">
<div style="display:none;max-height:0;overflow:hidden;">${kacis(onMetin)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${RENK.zemin};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${RENK.yuzey};border:1px solid ${RENK.cizgi};border-radius:20px;">
<tr><td style="padding:32px 28px 8px;font-family:${YAZI};">
<p style="margin:0 0 24px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${RENK.soluk};">${kacis(MARKA.ad)}</p>
${govde}
</td></tr>
</table>
<p style="max-width:560px;margin:16px auto 0;font-family:${YAZI};font-size:13px;line-height:20px;color:${RENK.soluk};">Bu e-posta ${kacis(MARKA.ad)} tarafından ${kacis(eposta)} adresine gönderildi. Sorularınız için bu e-postayı yanıtlayabilirsiniz.</p>
</td></tr>
</table>
</body>
</html>`;
}

function metinAltBilgi(eposta: string) {
  return `\n\n—\nBu e-posta ${MARKA.ad} tarafından ${eposta} adresine gönderildi. Sorularınız için bu e-postayı yanıtlayabilirsiniz.`;
}

/** ① Yeni hesap (ya da şifresi hiç belirlenmemiş hesap): şifre belirleme bağlantısı. */
export function hosGeldinEpostasi({
  eposta,
  profilHakki,
  baglanti,
}: {
  eposta: string;
  profilHakki: number;
  baglanti: string;
}): EpostaIcerigi {
  const konu = "Hesabınız hazır: şifrenizi belirleyin";
  const govde = [
    paragraf("Merhaba,"),
    paragraf(
      `Ödemeniz alındı ve ${kacis(MARKA.ad)} hesabınız açıldı. Paketinizle <strong>${profilHakki} çocuk profili</strong> oluşturabilirsiniz.`,
    ),
    paragraf("Başlamak için şifrenizi belirleyin:"),
    dugme(baglanti, "Şifremi Belirle"),
    paragraf(
      `Bu bağlantı ${BAGLANTI_SURESI_SAAT} saat geçerlidir ve bir kez kullanılabilir. Süresi dolarsa giriş sayfasındaki “Şifremi unuttum” ile yenisini alabilirsiniz.`,
      RENK.soluk,
    ),
    paragraf("Şifrenizi belirledikten sonra:"),
    `<ol style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:26px;color:${RENK.murekkep};"><li>Veli panelinde çocuğunuzun profilini oluşturun.</li><li>Çocuğunuzun okuyacağı cihazda panelden haritasını açın.</li></ol>`,
    paragraf(`Giriş e-postanız: <strong>${kacis(eposta)}</strong>`, RENK.soluk),
  ].join("\n");

  const metin = [
    "Merhaba,",
    "",
    `Ödemeniz alındı ve ${MARKA.ad} hesabınız açıldı. Paketinizle ${profilHakki} çocuk profili oluşturabilirsiniz.`,
    "",
    "Başlamak için şifrenizi belirleyin:",
    baglanti,
    "",
    `Bu bağlantı ${BAGLANTI_SURESI_SAAT} saat geçerlidir ve bir kez kullanılabilir. Süresi dolarsa giriş sayfasındaki "Şifremi unuttum" ile yenisini alabilirsiniz.`,
    "",
    "Şifrenizi belirledikten sonra:",
    "1. Veli panelinde çocuğunuzun profilini oluşturun.",
    "2. Çocuğunuzun okuyacağı cihazda panelden haritasını açın.",
    "",
    `Giriş e-postanız: ${eposta}`,
  ].join("\n");

  return {
    konu,
    html: cerceve({ onMetin: "Ödemeniz alındı. Başlamak için şifrenizi belirleyin.", govde, eposta }),
    metin: metin + metinAltBilgi(eposta),
  };
}

/** ② Şifresi olan mevcut hesaba yeni ödeme: paket güncellendi. */
export function paketGuncellendiEpostasi({
  eposta,
  profilHakki,
  hakArtmadi,
  girisAdresi,
}: {
  eposta: string;
  profilHakki: number;
  /** Hesaptaki hak bu paketten zaten yüksekti; hak değişmedi. */
  hakArtmadi: boolean;
  girisAdresi: string;
}): EpostaIcerigi {
  const konu = "Ödemeniz alındı: paketiniz güncellendi";
  const hakArtmadiMetni =
    "Hesabınızdaki profil hakkı bu paketten zaten yüksek olduğu için değişmedi. Bu satın almayı yanlışlıkla yaptıysanız bize yazın.";
  const govde = [
    paragraf("Merhaba,"),
    paragraf(`Ödemeniz alındı ve hesabınıza işlendi. Profil hakkınız: <strong>${profilHakki}</strong>.`),
    dugme(girisAdresi, "Giriş Yap"),
    paragraf(
      `Giriş e-postanız: <strong>${kacis(eposta)}</strong>. Şifrenizi hatırlamıyorsanız giriş sayfasındaki “Şifremi unuttum” ile yenisini belirleyebilirsiniz.`,
      RENK.soluk,
    ),
    hakArtmadi ? paragraf(hakArtmadiMetni) : "",
  ].join("\n");

  const metin = [
    "Merhaba,",
    "",
    `Ödemeniz alındı ve hesabınıza işlendi. Profil hakkınız: ${profilHakki}.`,
    "",
    `Giriş: ${girisAdresi}`,
    "",
    `Giriş e-postanız: ${eposta}. Şifrenizi hatırlamıyorsanız giriş sayfasındaki "Şifremi unuttum" ile yenisini belirleyebilirsiniz.`,
    ...(hakArtmadi ? ["", hakArtmadiMetni] : []),
  ].join("\n");

  return {
    konu,
    html: cerceve({ onMetin: `Ödemeniz alındı. Profil hakkınız: ${profilHakki}.`, govde, eposta }),
    metin: metin + metinAltBilgi(eposta),
  };
}

/** ③ "Şifremi unuttum" ve yönetim sayfasındaki "Yeni bağlantı". */
export function sifreBaglantisiEpostasi({
  eposta,
  baglanti,
}: {
  eposta: string;
  baglanti: string;
}): EpostaIcerigi {
  const konu = "Şifre belirleme bağlantınız";
  const sureMetni = `Bağlantı ${BAGLANTI_SURESI_SAAT} saat geçerlidir ve bir kez kullanılabilir. Bu isteği siz yapmadıysanız bu e-postayı dikkate almayın; şifreniz değişmez.`;
  const govde = [
    paragraf("Merhaba,"),
    paragraf(`${kacis(MARKA.ad)} hesabınız için şifre belirleme bağlantısı istendi.`),
    dugme(baglanti, "Şifremi Belirle"),
    paragraf(sureMetni, RENK.soluk),
  ].join("\n");

  const metin = [
    "Merhaba,",
    "",
    `${MARKA.ad} hesabınız için şifre belirleme bağlantısı istendi.`,
    "",
    baglanti,
    "",
    sureMetni,
  ].join("\n");

  return {
    konu,
    html: cerceve({ onMetin: "Şifrenizi belirlemek için bağlantınız.", govde, eposta }),
    metin: metin + metinAltBilgi(eposta),
  };
}

/** ④ Elden satışta WhatsApp'tan gönderilecek mesaj (yönetim sayfası). */
export function whatsappMesaji({ eposta, baglanti }: { eposta: string; baglanti: string }) {
  return [
    `Merhaba, ödemeniz alındı ve ${MARKA.ad} hesabınız açıldı. Şifrenizi belirlemek için bu bağlantıya dokunun (${BAGLANTI_SURESI_SAAT} saat geçerli, bir kez kullanılır): ${baglanti}`,
    `Giriş e-postanız: ${eposta}`,
  ].join("\n");
}
