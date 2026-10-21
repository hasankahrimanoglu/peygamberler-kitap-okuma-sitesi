"use client";

import Link from "next/link";
import { Buton, butonSiniflari } from "./Buton";
import { Ikon } from "./Ikon";

export type HataDunyasi = "cocuk" | "veli";

type Donus = { adres: string; etiket: string };

/**
 * Beklenmedik hata ekranı (`app/error.tsx`, `app/global-error.tsx`).
 * Next'in İngilizce varsayılan sayfası yerine iki dünyadan birinde, Türkçe
 * çıkar: çocuk ekranlarında gece zemini ve haritaya dönüş, veli paneli ile
 * tanıtım sayfalarında krem zemin. Önizleme: `/tasarim/hata`.
 */
const DUNYA_METINLERI: Record<HataDunyasi, { etiket: string; baslik: string; aciklama: string }> = {
  cocuk: {
    etiket: "Küçük Bir Aksilik",
    baslik: "Bu sayfa şu an açılamadı",
    aciklama:
      "Bir şeyler beklediğimiz gibi gitmedi. Merak etme, bu senin yüzünden olmadı. Bir kez daha deneyelim; olmazsa haritaya dönebilirsin.",
  },
  veli: {
    etiket: "Bir Sorun Oluştu",
    baslik: "Sayfa yüklenemedi",
    aciklama:
      "Beklenmedik bir hata oluştu. Sayfayı yeniden deneyebilir ya da geri dönebilirsiniz.",
  },
};

/**
 * Hatanın çıktığı adrese göre dünya ve dönüş bağlantısı. Çocuk ekranları
 * haritaya, veli paneli panele, geri kalan her şey (tanıtım, yasal sayfalar,
 * giriş, şifre, yönetim) ana sayfaya döner.
 */
export function hataDunyasiBul(adres: string): { dunya: HataDunyasi; donus: Donus } {
  const cocukRotalari = ["/map", "/reader", "/quiz", "/kazanimlarim", "/kelime-defterim", "/gorevlerim", "/kim-okuyor", "/cihaz-bagla", "/kitap"];
  if (cocukRotalari.some((rota) => adres === rota || adres.startsWith(`${rota}/`))) {
    return { dunya: "cocuk", donus: { adres: "/map", etiket: "Haritaya Dön" } };
  }
  if (adres === "/dashboard" || adres.startsWith("/dashboard/")) {
    return { dunya: "veli", donus: { adres: "/dashboard", etiket: "Veli Paneline Dön" } };
  }
  return { dunya: "veli", donus: { adres: "/", etiket: "Ana Sayfaya Dön" } };
}

export function HataEkrani({
  dunya,
  donus,
  tekrarDene,
  hataKodu,
}: {
  dunya: HataDunyasi;
  donus: Donus;
  tekrarDene: () => void;
  /** Sunucu hatalarında Next'in verdiği `digest`; destek yazışmasında işe yarar. Yalnız veli dünyasında gösterilir. */
  hataKodu?: string;
}) {
  const metin = DUNYA_METINLERI[dunya];
  const zemin = dunya === "cocuk" ? "tema-cocuk zemin-yildizli" : "tema-veli bg-zemin";

  return (
    <main
      className={`${zemin} flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center font-govde text-murekkep`}
    >
      <p className="font-baslik text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">{metin.etiket}</p>
      <h1 className="font-baslik text-3xl font-bold sm:text-4xl">{metin.baslik}</h1>
      <p className="max-w-md text-base leading-7 text-murekkep-soluk">{metin.aciklama}</p>
      {dunya === "veli" ? (
        <p className="max-w-md text-base leading-7 text-murekkep-soluk">
          Sorun devam ederse{" "}
          <Link href="/iletisim" className="font-semibold text-vurgu underline underline-offset-4">
            iletişim sayfasından
          </Link>{" "}
          bize yazabilirsiniz.
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Buton varyant="eylem" onClick={tekrarDene}>
          Tekrar Dene
        </Buton>
        <Link href={donus.adres} className={butonSiniflari("cerceve")}>
          <Ikon ad="geri" boyut={18} />
          {donus.etiket}
        </Link>
      </div>
      {dunya === "veli" && hataKodu ? (
        <p className="mt-4 text-sm text-murekkep-soluk">Hata kodu: {hataKodu}</p>
      ) : null}
    </main>
  );
}
