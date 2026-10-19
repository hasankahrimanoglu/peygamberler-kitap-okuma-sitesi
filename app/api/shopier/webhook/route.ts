import crypto from "crypto";
import { PAKETLER } from "../../../../src/data/paketler";
import { epostaNormal, maskele, siparisiIsle } from "../../../../src/lib/odeme/sunucu";

export const runtime = "nodejs";

/**
 * Shopier ödeme bildirimi (OSB) — yalnız Shopier'e özgü kısım (Faz 7, 3. adım;
 * PROJE-MODELI Bölüm 8). Bildirimi doğrular, e-posta / sipariş no / paket
 * çıkarır ve ödeme sisteminden bağımsız `siparisiIsle`'ye verir. Hesap,
 * abonelik, e-posta ve tekrar koruması oradadır; ileride iyzico/PayTR aynı
 * çekirdeği kullanır.
 *
 * Shopier'e "success" dönülmezse bildirim tekrarlanır: işlenmiş ya da deneme
 * bildiriminde de "success" dönülür, yalnız gerçek hatada 500.
 */

type ShopierPayload = {
  email?: string;
  orderid?: string;
  productid?: string | number;
  productlist?: unknown;
  chartdetails?: unknown;
  customernote?: string;
  istest?: string | number;
};

function timingSafeEqualText(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyShopierHash(res: string, receivedHash: string) {
  const osbUsername = process.env.SHOPIER_OSB_USERNAME;
  const osbPassword = process.env.SHOPIER_OSB_PASSWORD;

  if (!osbUsername || !osbPassword) {
    throw new Error("Shopier OSB environment variables are missing.");
  }

  const expectedHash = crypto
    .createHmac("sha256", osbPassword)
    .update(res + osbUsername)
    .digest("hex");

  return timingSafeEqualText(expectedHash, receivedHash);
}

function decodeShopierPayload(res: string): ShopierPayload {
  const decoded = Buffer.from(res, "base64").toString("utf8");
  return JSON.parse(decoded) as ShopierPayload;
}

function stringifyProductData(payload: ShopierPayload) {
  return [
    payload.productid,
    payload.productlist,
    payload.chartdetails,
    payload.customernote,
  ]
    .map((value) => {
      if (!value) return "";
      return typeof value === "string" ? value : JSON.stringify(value);
    })
    .join(" ")
    .toLocaleLowerCase("tr-TR");
}

/**
 * Profil hakkı: önce Vercel'deki ürün kimlikleri (SHOPIER_PACKAGE_{n}_PRODUCT_ID),
 * yoksa ürün bilgisindeki "3 profil / 3 kullanıcı / 3 çocuk", yoksa paket adı
 * ("Kardeş"), hiçbiri yoksa 1.
 */
function resolvePackageLimit(payload: ShopierPayload) {
  const productData = stringifyProductData(payload);

  const explicitProductMappings = [
    { id: process.env.SHOPIER_PACKAGE_10_PRODUCT_ID, limit: 10 },
    { id: process.env.SHOPIER_PACKAGE_5_PRODUCT_ID, limit: 5 },
    { id: process.env.SHOPIER_PACKAGE_4_PRODUCT_ID, limit: 4 },
    { id: process.env.SHOPIER_PACKAGE_3_PRODUCT_ID, limit: 3 },
    { id: process.env.SHOPIER_PACKAGE_2_PRODUCT_ID, limit: 2 },
    { id: process.env.SHOPIER_PACKAGE_1_PRODUCT_ID, limit: 1 },
  ];

  const productId = String(payload.productid ?? "");
  const mappedLimit = explicitProductMappings.find(
    (item) => item.id && item.id === productId,
  )?.limit;

  if (mappedLimit) return mappedLimit;

  if (/(10|on)\s*(kullanıcı|profil|çocuk)/i.test(productData)) return 10;
  if (/(5|beş)\s*(kullanıcı|profil|çocuk)/i.test(productData)) return 5;
  if (/(4|dört)\s*(kullanıcı|profil|çocuk)/i.test(productData)) return 4;
  if (/(3|üç)\s*(kullanıcı|profil|çocuk)/i.test(productData)) return 3;
  if (/(2|iki)\s*(kullanıcı|profil|çocuk)/i.test(productData)) return 2;

  const paket = [...PAKETLER]
    .sort((a, b) => b.profilSayisi - a.profilSayisi)
    .find((p) => productData.includes(p.ad.toLocaleLowerCase("tr-TR")));
  return paket?.profilSayisi ?? 1;
}

export async function POST(request: Request) {
  let siparisNo = "";
  let eposta = "";
  try {
    const formData = await request.formData();
    const res = formData.get("res")?.toString();
    const hash = formData.get("hash")?.toString();

    if (!res || !hash) {
      return new Response("missing parameter", { status: 400 });
    }

    if (!verifyShopierHash(res, hash)) {
      return new Response("invalid hash", { status: 401 });
    }

    const payload = decodeShopierPayload(res);
    eposta = payload.email ? epostaNormal(payload.email) : "";
    siparisNo = payload.orderid?.toString() ?? "";

    if (!eposta || !siparisNo) {
      return new Response("missing order data", { status: 400 });
    }

    await siparisiIsle({
      kaynak: "shopier",
      siparisNo,
      eposta,
      profilHakki: resolvePackageLimit(payload),
      test: String(payload.istest ?? "0") === "1",
    });

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Shopier bildirimi işlenemedi.", {
      siparisNo,
      eposta: eposta ? maskele(eposta) : null,
      hata: error instanceof Error ? error.message : String(error),
    });
    return new Response("webhook error", { status: 500 });
  }
}
