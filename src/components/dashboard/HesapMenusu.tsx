"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../lib/supabase";
import { useParentData } from "../../lib/parent/ParentDataProvider";
import { Buton, Ikon } from "../ui";

// PROJE-MODELI.md 5.2 — sağ üst hesap menüsü: Hesap Bilgileri, Şifre Değiştir, Çıkış.
export function HesapMenusu() {
  const router = useRouter();
  const { setNotice, setError } = useParentData();
  const [email, setEmail] = useState<string | null>(null);
  const [acik, setAcik] = useState(false);
  const [sifreModalAcik, setSifreModalAcik] = useState(false);
  const [yeniSifre, setYeniSifre] = useState("");
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [cikisYapiliyor, setCikisYapiliyor] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  useEffect(() => {
    if (!acik) return undefined;
    function disaTiklama(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAcik(false);
      }
    }
    document.addEventListener("mousedown", disaTiklama);
    return () => document.removeEventListener("mousedown", disaTiklama);
  }, [acik]);

  async function cikisYap() {
    setCikisYapiliyor(true);
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function sifreGuncelle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (yeniSifre.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalı.");
      return;
    }

    setKaydediliyor(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: yeniSifre,
    });
    setKaydediliyor(false);

    if (updateError) {
      setError("Şifre güncellenemedi. Lütfen tekrar dene.");
      return;
    }

    setYeniSifre("");
    setSifreModalAcik(false);
    setNotice("Şifren başarıyla güncellendi.");
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setAcik((v) => !v)}
        aria-label="Hesap menüsünü aç"
        aria-haspopup="menu"
        aria-expanded={acik}
        className="flex min-h-[44px] items-center gap-2 rounded-buton border border-cizgi bg-yuzey px-3 py-2 font-baslik text-base font-semibold text-murekkep transition-colors hover:bg-yuzey-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-vurgu-yumusak text-vurgu">
          <Ikon ad="hesap" boyut={20} />
        </span>
        <span>Hesap</span>
        <Ikon ad="ok-sag" boyut={16} className="rotate-90 text-murekkep-soluk" />
      </button>

      <AnimatePresence>
        {acik ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            role="menu"
            className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-kart border border-cizgi bg-yuzey shadow-kart"
          >
            <div className="border-b border-cizgi bg-yuzey-2 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Hesap Bilgileri
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-murekkep">
                {email ?? "—"}
              </p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setAcik(false);
                setSifreModalAcik(true);
              }}
              className="flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left text-base font-semibold text-murekkep transition-colors hover:bg-yuzey-2"
            >
              <Ikon ad="kilit" boyut={18} className="text-murekkep-soluk" />
              Şifre Değiştir
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={cikisYap}
              disabled={cikisYapiliyor}
              className="flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left text-base font-semibold text-tehlike transition-colors hover:bg-yuzey-2 disabled:opacity-60"
            >
              <Ikon ad="cikis" boyut={18} />
              {cikisYapiliyor ? "Çıkış yapılıyor..." : "Çıkış Yap"}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {sifreModalAcik ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-gece-950/45 px-5 backdrop-blur-sm"
            onClick={() => setSifreModalAcik(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={sifreGuncelle}
              className="w-full max-w-md rounded-kart border border-cizgi bg-yuzey p-6 shadow-kart"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-baslik text-2xl font-bold text-murekkep">
                  Şifre Değiştir
                </h2>
                <button
                  type="button"
                  onClick={() => setSifreModalAcik(false)}
                  aria-label="Pencereyi kapat"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cizgi text-murekkep-soluk transition-colors hover:bg-yuzey-2"
                >
                  <Ikon ad="kapat" boyut={18} />
                </button>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-murekkep">
                  Yeni Şifre
                </span>
                <input
                  type="password"
                  value={yeniSifre}
                  onChange={(event) => setYeniSifre(event.target.value)}
                  className="h-12 w-full rounded-buton border border-cizgi bg-yuzey-2 px-4 text-base font-medium text-murekkep outline-none transition focus:border-eylem focus:bg-yuzey focus:ring-2 focus:ring-eylem/30"
                  placeholder="En az 6 karakter"
                  required
                />
              </label>
              <div className="mt-6 flex gap-3">
                <Buton
                  type="button"
                  varyant="cerceve"
                  tamGenislik
                  onClick={() => setSifreModalAcik(false)}
                >
                  Vazgeç
                </Buton>
                <Buton type="submit" varyant="eylem" tamGenislik disabled={kaydediliyor}>
                  {kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
                </Buton>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
