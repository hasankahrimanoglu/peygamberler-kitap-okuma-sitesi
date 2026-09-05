/**
 * Çocuk profili fotoğrafı — yükleme, küçültme ve silme (KARAR 8 Ağu 2026, Hasan).
 *
 * Hazır avatar seti (`avatar_tipi`) KALDIRILMADI; fotoğraf onun üzerine gelen
 * isteğe bağlı bir katmandır. `profiles.avatar_url` doluysa ekranlar fotoğrafı,
 * boşsa hazır avatarı gösterir (`CocukAvatari`).
 *
 * Dosya, sunucuya gitmeden önce tarayıcıda 512×512 kare JPEG'e indirilir:
 * telefon fotoğrafı 3–8 MB gelir, ekranda en fazla 64px çizilir. Küçültme hem
 * yükleme süresini hem depolama maliyetini onda birine indirir.
 */

import { supabase } from "../../lib/supabase";
import {
  PROFIL_FOTOGRAFI_KOVASI,
  profilFotografiAnahtari,
} from "./varlikYollari";

/** Yüklenen fotoğrafın kaydedildiği kenar uzunluğu (kare). */
const HEDEF_BOYUT = 512;

/** Seçilebilecek en büyük ham dosya — küçültme öncesi kaba emniyet sınırı. */
const EN_BUYUK_HAM_DOSYA = 12 * 1024 * 1024;

const KABUL_EDILEN_TIPLER = ["image/jpeg", "image/png", "image/webp"];

/** `<input type="file">` için accept değeri; UI ile bu liste tek yerden gelir. */
export const FOTOGRAF_KABUL_EDILEN = KABUL_EDILEN_TIPLER.join(",");

export type FotografSonucu =
  | { tamam: true; url: string }
  | { tamam: false; hata: string };

/**
 * Supabase hata mesajı "bu sütun/kova henüz yok" mu diyor?
 *
 * Migration çalıştırılmadan panel açılırsa kullanıcıya "tekrar dene" demek
 * yanıltıcı olur; ne yapması gerektiğini söyleyebilmek için ayırt ediyoruz.
 */
export function eksikKurulumHatasi(mesaj?: string) {
  const normalize = (mesaj ?? "").toLocaleLowerCase("tr-TR");
  return (
    normalize.includes("avatar_url") ||
    normalize.includes("bucket") ||
    normalize.includes("not found")
  );
}

/**
 * Çocuk tarafı profil okuması — istenen alanlara `avatar_url` ekler, sütun
 * henüz yoksa aynı sorguyu fotoğrafsız tekrarlar.
 *
 * Çocuk ekranlarında veli panelindeki gibi bir uyarı şeridi yok; kurulum eksikse
 * sessizce hazır avatarla devam etmek doğru davranıştır — harita açılmamazlık
 * etmemeli.
 */
export async function profilAvatarliOku<T>(
  profilId: string,
  alanlar: string,
): Promise<{
  data: (T & { avatar_url?: string | null }) | null;
  error: { message: string } | null;
}> {
  const tam = await supabase
    .from("profiles")
    .select(`${alanlar}, avatar_url`)
    .eq("id", profilId)
    .maybeSingle();

  if (!tam.error || !eksikKurulumHatasi(tam.error.message)) {
    return tam as unknown as {
      data: (T & { avatar_url?: string | null }) | null;
      error: { message: string } | null;
    };
  }

  const fotografsiz = await supabase
    .from("profiles")
    .select(alanlar)
    .eq("id", profilId)
    .maybeSingle();

  return fotografsiz as unknown as {
    data: (T & { avatar_url?: string | null }) | null;
    error: { message: string } | null;
  };
}

/**
 * Dosyayı kare kadrajda `HEDEF_BOYUT` piksele küçültüp JPEG blob döndürür.
 * Kadraj merkezden kırpılır (yüz genelde ortadadır); orantı bozulmaz.
 */
async function kareyeOlcekle(dosya: File): Promise<Blob> {
  const kaynakUrl = URL.createObjectURL(dosya);
  try {
    const gorsel = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Görsel okunamadı."));
      img.src = kaynakUrl;
    });

    const kenar = Math.min(gorsel.naturalWidth, gorsel.naturalHeight);
    const kaynakX = (gorsel.naturalWidth - kenar) / 2;
    const kaynakY = (gorsel.naturalHeight - kenar) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = HEDEF_BOYUT;
    canvas.height = HEDEF_BOYUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Görsel işlenemedi.");
    ctx.drawImage(
      gorsel,
      kaynakX,
      kaynakY,
      kenar,
      kenar,
      0,
      0,
      HEDEF_BOYUT,
      HEDEF_BOYUT,
    );

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Görsel dönüştürülemedi.")),
        "image/jpeg",
        0.86,
      );
    });
  } finally {
    URL.revokeObjectURL(kaynakUrl);
  }
}

/**
 * Fotoğrafı yükler ve `avatar_url` için kullanılacak public URL'i döndürür.
 *
 * Anahtar profil başına sabittir (upsert) — eski fotoğraf birikmez. Aynı
 * anahtar CDN'de önbelleğe alındığı için URL'e sürüm damgası eklenir; damgasız
 * URL'de veli fotoğrafı değiştirdiğinde ekranda eskisi kalıyordu.
 */
export async function profilFotografiYukle(
  veliId: string,
  profilId: string,
  dosya: File,
): Promise<FotografSonucu> {
  if (!KABUL_EDILEN_TIPLER.includes(dosya.type)) {
    return { tamam: false, hata: "Yalnızca JPG, PNG veya WEBP yükleyebilirsin." };
  }
  if (dosya.size > EN_BUYUK_HAM_DOSYA) {
    return { tamam: false, hata: "Fotoğraf çok büyük. En fazla 12 MB olmalı." };
  }

  let kucultulmus: Blob;
  try {
    kucultulmus = await kareyeOlcekle(dosya);
  } catch {
    return { tamam: false, hata: "Fotoğraf okunamadı. Başka bir dosya dene." };
  }

  const anahtar = profilFotografiAnahtari(veliId, profilId);
  const { error: yuklemeHatasi } = await supabase.storage
    .from(PROFIL_FOTOGRAFI_KOVASI)
    .upload(anahtar, kucultulmus, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (yuklemeHatasi) {
    return {
      tamam: false,
      hata: eksikKurulumHatasi(yuklemeHatasi.message)
        ? "Fotoğraf yükleme alanı Supabase'de kurulu değil. supabase/migration-profil-fotografi.sql dosyasını çalıştırmalısın."
        : "Fotoğraf yüklenemedi. Lütfen tekrar dene.",
    };
  }

  const { data } = supabase.storage
    .from(PROFIL_FOTOGRAFI_KOVASI)
    .getPublicUrl(anahtar);

  return { tamam: true, url: `${data.publicUrl}?v=${Date.now()}` };
}

/**
 * Fotoğrafı kovadan siler. Depolama hatası kullanıcıya YANSITILMAZ: asıl iş
 * `avatar_url`ün boşalmasıdır (ekran hazır avatara döner), artık dosya en fazla
 * yer kaplar. Yine de sonucu döndürüyoruz ki çağıran isterse kullansın.
 */
export async function profilFotografiSil(veliId: string, profilId: string) {
  const { error } = await supabase.storage
    .from(PROFIL_FOTOGRAFI_KOVASI)
    .remove([profilFotografiAnahtari(veliId, profilId)]);
  return !error;
}
