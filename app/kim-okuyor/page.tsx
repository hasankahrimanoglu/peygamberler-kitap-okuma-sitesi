"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { aileGuvenlikDurumu, cocukSifresiDogrula } from "../../src/lib/aileGuvenligi";
import { profiliAc, profiliKapat } from "../../src/lib/child/cocukOturumu";
import { KimOkuyorEkrani, type KimOkuyorCocugu } from "../../src/components/cocuk/KimOkuyorEkrani";

/**
 * "Kim okuyor?" (Faz 7 — PROJE-MODELI 3.11). Ortak cihazda velinin oturumuyla
 * açılır. Bağlı çocuk cihazı doğrudan haritaya, oturumsuz cihaz girişe gider.
 * Görünüm `KimOkuyorEkrani`'ndadır (girişsiz önizleme: `/tasarim/kim-okuyor`).
 */
export default function KimOkuyorSayfasi() {
  const router = useRouter();
  const [cocuklar, setCocuklar] = useState<KimOkuyorCocugu[]>([]);
  const [sifreAcik, setSifreAcik] = useState(false);
  const [veliPinGerekli, setVeliPinGerekli] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    let iptal = false;

    async function yukle() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      if (session.user.is_anonymous) {
        router.replace("/map");
        return;
      }

      // Bu ekrana gelindiyse açık profil kapanır (Profil değiştir, zaman aşımı).
      profiliKapat();

      const [profilSonucu, durum] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, isim, avatar_tipi, avatar_url")
          .order("created_at", { ascending: true }),
        aileGuvenlikDurumu(),
      ]);
      if (iptal) return;

      const sifreli = new Set(durum?.sifresiOlanProfiller ?? []);
      const liste: KimOkuyorCocugu[] = (
        (profilSonucu.data as {
          id: string;
          isim: string;
          avatar_tipi: string | null;
          avatar_url: string | null;
        }[] | null) ?? []
      ).map((profil) => ({
        id: profil.id,
        isim: profil.isim,
        avatarTipi: profil.avatar_tipi ?? "avatar-1",
        fotografUrl: profil.avatar_url,
        sifreVar: sifreli.has(profil.id),
      }));

      const acik = Boolean(durum?.profilSifresiAcik);
      const pinGerekli = durum ? !durum.veliPinVar : false;

      // Tek çocuk ve şifre kapalıysa seçim ekranı gereksiz: doğrudan haritaya.
      if (!pinGerekli && !acik && liste.length === 1) {
        profiliAc({ id: liste[0].id, isim: liste[0].isim });
        router.replace("/map");
        return;
      }

      setCocuklar(liste);
      setSifreAcik(acik);
      setVeliPinGerekli(pinGerekli);
      setYukleniyor(false);
    }

    void yukle();
    return () => {
      iptal = true;
    };
  }, [router]);

  return (
    <KimOkuyorEkrani
      cocuklar={cocuklar}
      sifreAcik={sifreAcik}
      yukleniyor={yukleniyor}
      veliPinGerekli={veliPinGerekli}
      onSifreDogrula={(cocuk, sifre) => cocukSifresiDogrula(cocuk.id, sifre)}
      onAc={(cocuk) => {
        profiliAc({ id: cocuk.id, isim: cocuk.isim });
        router.push("/map");
      }}
      onVeliPaneli={() => router.push("/dashboard")}
      onVeliPiniBelirle={() => router.push("/dashboard/ayarlar?pin=gerekli&hedef=%2Fkim-okuyor")}
    />
  );
}
