import crypto from "crypto";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";

export const runtime = "nodejs";

type ShopierPayload = {
  email?: string;
  orderid?: string;
  productid?: string | number;
  productlist?: unknown;
  chartdetails?: unknown;
  customernote?: string;
  buyername?: string;
  buyersurname?: string;
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

function generatePassword() {
  return `Peygamber-${crypto.randomBytes(4).toString("hex")}`;
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
  return 1;
}

function resolvePackageName(profileLimit: number) {
  return `${profileLimit} Kullanıcılı Paket`;
}

async function findUserByEmail(email: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const normalizedEmail = email.toLocaleLowerCase("tr-TR");
  let page = 1;

  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 100,
    });

    if (error) {
      throw error;
    }

    const users = data.users as Array<{ id: string; email?: string | null }>;
    const foundUser = users.find(
      (user) => user.email?.toLocaleLowerCase("tr-TR") === normalizedEmail,
    );

    if (foundUser) {
      return foundUser;
    }

    if (data.users.length < 100) {
      return null;
    }

    page += 1;
  }

  return null;
}

async function createOrRefreshParentUser(email: string, password: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      existingUser.id,
      {
        password,
        email_confirm: true,
      },
    );

    if (error) {
      throw error;
    }

    return data.user;
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    throw error;
  }

  return data.user;
}

async function sendWelcomeEmail(params: {
  email: string;
  password: string;
  profileLimit: number;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const mailFrom = process.env.MAIL_FROM;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!resendApiKey || !mailFrom) {
    console.log("Shopier parent login:", {
      email: params.email,
      password: params.password,
      profileLimit: params.profileLimit,
      loginUrl: `${siteUrl}/login`,
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: mailFrom,
      to: params.email,
      subject: "Peygamberler Keşif Dünyası giriş bilgileriniz",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#3b1f0f">
          <h2>Peygamberler Keşif Dünyası hazır</h2>
          <p>Satın aldığınız paket hesabınıza tanımlandı.</p>
          <p><strong>Profil hakkı:</strong> ${params.profileLimit}</p>
          <p><strong>Giriş e-postası:</strong> ${params.email}</p>
          <p><strong>Geçici şifre:</strong> ${params.password}</p>
          <p><a href="${siteUrl}/login">Giriş ekranına git</a></p>
          <p>Giriş yaptıktan sonra veli panelinden şifrenizi değiştirebilirsiniz.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Welcome email could not be sent: ${detail}`);
  }
}

export async function POST(request: Request) {
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
    const email = payload.email?.trim().toLocaleLowerCase("tr-TR");
    const orderId = payload.orderid?.toString();

    if (!email || !orderId) {
      return new Response("missing order data", { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const profileLimit = resolvePackageLimit(payload);
    const packageName = resolvePackageName(profileLimit);
    const password = generatePassword();
    const parentUser = await createOrRefreshParentUser(email, password);

    const { error: subscriptionError } = await supabaseAdmin
      .from("parent_subscriptions")
      .upsert(
        {
          user_id: parentUser.id,
          email,
          package_name: packageName,
          profile_limit: profileLimit,
          shopier_order_id: orderId,
          status: "active",
        },
        { onConflict: "email" },
      );

    if (subscriptionError) {
      throw subscriptionError;
    }

    try {
      await sendWelcomeEmail({ email, password, profileLimit });
    } catch (emailError) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      console.error("Shopier welcome email error:", emailError);
      console.log("Shopier parent login fallback:", {
        email,
        password,
        profileLimit,
        loginUrl: `${siteUrl}/login`,
      });
    }

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Shopier webhook error:", error);
    return new Response("webhook error", { status: 500 });
  }
}
