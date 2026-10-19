"use client";

import { FormEvent, useState } from "react";
import { PAKETLER } from "../../data/paketler";
import { whatsappMesaji } from "../../lib/odeme/epostaSablonlari";
import {
  YONETIM_HATA_METNI,
  type BaglantiSonucu,
  type SatisGirdisi,
  type SatisSonucu,
  type YonetimHatasi,
  type YonetimSiparisi,
} from "../../lib/odeme/yonetimTurleri";
import { Buton, Kart } from "../ui";

type YonetimEkraniProps = {
  siparisler: YonetimSiparisi[];
  yukleniyor: boolean;
  onSatis: (girdi: SatisGirdisi) => Promise<SatisSonucu | YonetimHatasi>;
  onBaglanti: (eposta: string) => Promise<BaglantiSonucu | YonetimHatasi>;
  onYenile: () => void;
};

const KAYNAK_ADI: Record<YonetimSiparisi["kaynak"], string> = {
  shopier: "Shopier",
  iyzico: "iyzico",
  paytr: "PayTR",
  elden: "Elden",
};

const DURUM: Record<YonetimSiparisi["durum"], { ad: string; sinif: string }> = {
  islendi: { ad: "İşlendi", sinif: "bg-eylem-yumusak text-eylem-koyu" },
  hata: { ad: "Hata", sinif: "bg-yuzey-2 text-tehlike" },
  test: { ad: "Deneme", sinif: "bg-yuzey-2 text-murekkep-soluk" },
  isleniyor: { ad: "İşleniyor", sinif: "bg-vurgu-yumusak text-murekkep" },
  alindi: { ad: "Alındı", sinif: "bg-vurgu-yumusak text-murekkep" },
};

function hataMi<T extends object>(sonuc: T | YonetimHatasi): sonuc is YonetimHatasi {
  return "hata" in sonuc;
}

function tarih(deger: string) {
  return new Date(deger).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function kopyala(metin: string) {
  try {
    await navigator.clipboard.writeText(metin);
    return true;
  } catch {
    return false;
  }
}

/** Şifre belirleme bağlantısını WhatsApp'tan göndermek için. */
function BaglantiPaylas({ eposta, baglanti }: { eposta: string; baglanti: string }) {
  const [kopyalandi, setKopyalandi] = useState<"baglanti" | "mesaj" | "hata" | null>(null);
  const mesaj = whatsappMesaji({ eposta, baglanti });

  async function kopyalaVeBildir(tur: "baglanti" | "mesaj") {
    setKopyalandi((await kopyala(tur === "baglanti" ? baglanti : mesaj)) ? tur : "hata");
  }

  return (
    <div className="mt-4 space-y-3">
      <input
        readOnly
        value={baglanti}
        aria-label="Şifre belirleme bağlantısı"
        onFocus={(olay) => olay.currentTarget.select()}
        className="h-12 w-full rounded-buton border border-cizgi bg-zemin px-3 text-sm font-medium text-murekkep"
      />
      <div className="flex flex-wrap gap-2">
        <Buton varyant="ikincil" boyut="kucuk" onClick={() => void kopyalaVeBildir("baglanti")}>
          Bağlantıyı Kopyala
        </Buton>
        <Buton varyant="ikincil" boyut="kucuk" onClick={() => void kopyalaVeBildir("mesaj")}>
          WhatsApp Mesajını Kopyala
        </Buton>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(mesaj)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-buton bg-eylem px-4 font-baslik text-sm font-semibold text-eylem-metin hover:bg-eylem-koyu"
        >
          WhatsApp&apos;ta Aç
        </a>
      </div>
      {kopyalandi ? (
        <p role="status" className="text-sm font-semibold text-murekkep-soluk">
          {kopyalandi === "hata"
            ? "Kopyalanamadı; bağlantıyı kutudan seçip kopyalayın."
            : kopyalandi === "baglanti"
              ? "Bağlantı kopyalandı."
              : "Mesaj kopyalandı."}
        </p>
      ) : null}
      <p className="text-sm font-medium leading-6 text-murekkep-soluk">
        Bağlantı 24 saat geçerli ve bir kez kullanılabilir. Yalnız hesabın sahibine gönderin.
      </p>
    </div>
  );
}

/**
 * Yönetim: elden satış (WhatsApp, havale/EFT) ve sipariş listesi (Faz 7,
 * 3. adım — PROJE-MODELI Bölüm 8). Veri yüklemesi sayfadadır; önizleme:
 * `/tasarim/yonetim`.
 */
export function YonetimEkrani({ siparisler, yukleniyor, onSatis, onBaglanti, onYenile }: YonetimEkraniProps) {
  const [eposta, setEposta] = useState("");
  const [profilHakki, setProfilHakki] = useState<number | null>(null);
  const [not, setNot] = useState("");
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [satis, setSatis] = useState<{ eposta: string; sonuc: SatisSonucu } | null>(null);
  const [satisHatasi, setSatisHatasi] = useState<string | null>(null);
  const [satirBaglantisi, setSatirBaglantisi] = useState<
    Record<string, { durum: "bekliyor" } | { durum: "hazir"; sonuc: BaglantiSonucu } | { durum: "hata"; metin: string }>
  >({});

  async function satisiKaydet(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault();
    setSatisHatasi(null);
    setSatis(null);
    if (!profilHakki) {
      setSatisHatasi(YONETIM_HATA_METNI.gecersiz_paket);
      return;
    }
    setKaydediliyor(true);
    const girdi = { eposta: eposta.trim(), profilHakki, not };
    const sonuc = await onSatis(girdi);
    setKaydediliyor(false);
    if (hataMi(sonuc)) {
      setSatisHatasi(YONETIM_HATA_METNI[sonuc.hata] ?? YONETIM_HATA_METNI.sunucu);
      return;
    }
    setSatis({ eposta: girdi.eposta.toLowerCase(), sonuc });
    setEposta("");
    setNot("");
    setProfilHakki(null);
    onYenile();
  }

  async function yeniBaglanti(siparis: YonetimSiparisi) {
    setSatirBaglantisi((onceki) => ({ ...onceki, [siparis.id]: { durum: "bekliyor" } }));
    const sonuc = await onBaglanti(siparis.eposta);
    setSatirBaglantisi((onceki) => ({
      ...onceki,
      [siparis.id]: hataMi(sonuc)
        ? { durum: "hata", metin: YONETIM_HATA_METNI[sonuc.hata] ?? YONETIM_HATA_METNI.sunucu }
        : { durum: "hazir", sonuc },
    }));
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-vurgu">Yönetim</p>
        <h1 className="mt-1 font-baslik text-3xl font-bold sm:text-4xl">Satışlar</h1>
        <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
          WhatsApp ya da havale/EFT ile gelen satışları buradan işleyin; Shopier satışları kendiliğinden
          listeye düşer.
        </p>
      </div>

      <Kart dolgu="genis">
        <h2 className="font-baslik text-xl font-bold">Elden satış</h2>
        <p className="mt-2 text-base font-medium leading-7 text-murekkep-soluk">
          Ödemenin hesabınıza geçtiğini kontrol ettikten sonra kaydedin. Hesap yoksa açılır, varsa
          paketi büyütülür; veliye e-posta gider.
        </p>
        <form onSubmit={satisiKaydet} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Velinin e-postası</span>
            <input
              type="email"
              required
              value={eposta}
              onChange={(olay) => setEposta(olay.target.value)}
              autoComplete="off"
              placeholder="veli@ornek.com"
              className="h-12 w-full rounded-buton border border-cizgi bg-zemin px-4 text-base font-semibold outline-none focus:border-eylem"
            />
          </label>
          <fieldset>
            <legend className="mb-2 block text-sm font-bold">Paket</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {PAKETLER.map((paket) => {
                const secili = profilHakki === paket.profilSayisi;
                return (
                  <button
                    key={paket.kimlik}
                    type="button"
                    aria-pressed={secili}
                    onClick={() => setProfilHakki(paket.profilSayisi)}
                    className={`min-h-14 rounded-buton border px-4 py-2 text-left transition-colors ${
                      secili ? "border-eylem bg-eylem-yumusak" : "border-cizgi bg-zemin hover:bg-yuzey-2"
                    }`}
                  >
                    <span className="block font-baslik text-base font-bold">{paket.ad}</span>
                    <span className="block text-sm font-medium text-murekkep-soluk">
                      {paket.profilSayisi} profil
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Not (isteğe bağlı)</span>
            <input
              value={not}
              onChange={(olay) => setNot(olay.target.value)}
              maxLength={200}
              placeholder="WhatsApp, EFT 20 Eki"
              className="h-12 w-full rounded-buton border border-cizgi bg-zemin px-4 text-base font-medium outline-none focus:border-eylem"
            />
          </label>
          {satisHatasi ? (
            <p role="alert" className="rounded-buton bg-yuzey-2 px-4 py-3 text-base font-semibold text-tehlike">
              {satisHatasi}
            </p>
          ) : null}
          <Buton type="submit" varyant="eylem" tamGenislik disabled={kaydediliyor}>
            {kaydediliyor ? "Kaydediliyor…" : "Hesabı Aç ve E-posta Gönder"}
          </Buton>
        </form>

        {satis && satis.sonuc.durum === "islendi" ? (
          <div role="status" className="mt-6 rounded-kart border border-eylem/30 bg-eylem-yumusak p-5">
            <p className="font-baslik text-lg font-bold text-eylem-koyu">
              {satis.sonuc.yeniHesap ? "Hesap açıldı" : "Paket işlendi"} · {satis.sonuc.profilHakki} profil
            </p>
            <p className="mt-1 text-base font-medium text-murekkep">{satis.eposta}</p>
            <p className="mt-2 text-base font-medium leading-7 text-murekkep">
              {satis.sonuc.epostaGonderildi
                ? "E-posta gönderildi."
                : "E-posta gönderilemedi; bağlantıyı WhatsApp'tan gönderin."}
              {!satis.sonuc.hakArtti
                ? " Profil hakkı değişmedi: hesaptaki hak bu paketten zaten yüksek."
                : ""}
            </p>
            {satis.sonuc.baglanti ? (
              <BaglantiPaylas eposta={satis.eposta} baglanti={satis.sonuc.baglanti} />
            ) : (
              <p className="mt-2 text-sm font-medium text-murekkep-soluk">
                Velinin şifresi zaten var; ona &quot;Paket güncellendi&quot; e-postası gitti.
              </p>
            )}
          </div>
        ) : null}
      </Kart>

      <Kart dolgu="genis">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-baslik text-xl font-bold">Son siparişler</h2>
          <Buton varyant="cerceve" boyut="kucuk" onClick={onYenile}>
            Yenile
          </Buton>
        </div>
        {yukleniyor ? (
          <p className="mt-4 text-base font-medium text-murekkep-soluk">Yükleniyor…</p>
        ) : siparisler.length === 0 ? (
          <p className="mt-4 text-base font-medium text-murekkep-soluk">Henüz sipariş yok.</p>
        ) : (
          <ul className="mt-4 divide-y divide-cizgi rounded-kart border border-cizgi">
            {siparisler.map((siparis) => {
              const satir = satirBaglantisi[siparis.id];
              return (
                <li key={siparis.id} className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="break-all font-semibold text-murekkep">{siparis.eposta}</p>
                      <p className="mt-1 text-sm font-medium text-murekkep-soluk">
                        {tarih(siparis.olusturuldu)} · {KAYNAK_ADI[siparis.kaynak]} · {siparis.profil_hakki} profil
                        {siparis.durum === "islendi"
                          ? siparis.eposta_gonderildi
                            ? " · e-posta gitti"
                            : " · e-posta gitmedi"
                          : ""}
                        {siparis.not_metni ? ` · ${siparis.not_metni}` : ""}
                      </p>
                      {siparis.durum === "hata" && siparis.hata ? (
                        <p className="mt-1 text-sm font-medium text-tehlike">{siparis.hata}</p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-sm font-bold ${DURUM[siparis.durum].sinif}`}>
                        {DURUM[siparis.durum].ad}
                      </span>
                      {siparis.durum === "islendi" ? (
                        <Buton
                          varyant="cerceve"
                          boyut="kucuk"
                          disabled={satir?.durum === "bekliyor"}
                          onClick={() => void yeniBaglanti(siparis)}
                        >
                          {satir?.durum === "bekliyor" ? "Üretiliyor…" : "Yeni bağlantı"}
                        </Buton>
                      ) : null}
                    </div>
                  </div>
                  {satir?.durum === "hazir" ? (
                    <>
                      <p className="mt-3 text-sm font-semibold text-murekkep">
                        {satir.sonuc.epostaGonderildi
                          ? "Yeni bağlantı e-postayla gönderildi."
                          : "E-posta gönderilemedi; bağlantıyı WhatsApp'tan gönderin."}
                      </p>
                      <BaglantiPaylas eposta={siparis.eposta} baglanti={satir.sonuc.baglanti} />
                    </>
                  ) : satir?.durum === "hata" ? (
                    <p role="alert" className="mt-3 text-sm font-semibold text-tehlike">
                      {satir.metin}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Kart>
    </div>
  );
}
