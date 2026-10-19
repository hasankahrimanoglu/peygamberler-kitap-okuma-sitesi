import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cihaz bağlamada kullanılan, oturumu kaydetmeyen ikinci istemci (Faz 7).
 * Anonim oturum önce burada açılır; kod tutmadan cihazdaki asıl oturuma
 * (velinin oturumu olabilir) dokunulmaz. Ayrı `storageKey`, iki istemcinin
 * aynı kayıt anahtarında çakışmasını önler.
 */
export function geciciCihazIstemcisi() {
  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: "cihaz-baglama-gecici",
    },
  });
}
