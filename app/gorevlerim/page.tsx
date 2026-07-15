"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import {
  gorevTanimiBul,
  type GorevTanimiDetay,
} from "../../src/lib/derive";
import { Buton, Ikon, Kart } from "../../src/components/ui";

type GorevDurumRow = {
  task_id: string;
  status: "eklendi" | "tamamlandi";
  added_at: string;
  completed_at: string | null;
};

type GorevOgesi = GorevTanimiDetay & {
  status: "eklendi" | "tamamlandi";
  addedAt: string;
};

/**
 * Görevlerim (Faz 6.1 — PROJE-MODELI 5.1). Çocuğun profiline eklediği
 * "Bugüne Taşı" görevleri: Tamamlandı/Tamamlanmadı durumu, "Görevi Tamamladım"
 * eylemi, görev ayrıntısı (varsa güvenlik notu). Son tarih/ceza/seri YOK.
 */
export default function GorevlerimSayfasi() {
  const router = useRouter();
  const { isLoading: cocukYukleniyor, child } = useSelectedChild();
  const [rows, setRows] = useState<GorevDurumRow[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [acikGorev, setAcikGorev] = useState<string | null>(null);
  const [isaretlenen, setIsaretlenen] = useState<string | null>(null);
  const [kutlama, setKutlama] = useState<string | null>(null);

  useEffect(() => {
    async function yukle() {
      if (!child?.id) return;
      setYukleniyor(true);
      const { data } = await supabase
        .from("profile_tasks")
        .select("task_id, status, added_at, completed_at")
        .eq("profile_id", child.id)
        .order("added_at", { ascending: false });
      setRows((data as GorevDurumRow[] | null) ?? []);
      setYukleniyor(false);
    }
    yukle();
  }, [child?.id]);

  const gorevler = useMemo<GorevOgesi[]>(
    () =>
      rows
        .map((row) => {
          const tanim = gorevTanimiBul(row.task_id);
          if (!tanim) return null; // tanımı içerikten kalkmış görev gösterilmez
          return { ...tanim, status: row.status, addedAt: row.added_at };
        })
        .filter((g): g is GorevOgesi => g !== null),
    [rows],
  );

  const bekleyenler = gorevler.filter((g) => g.status === "eklendi");
  const tamamlananlar = gorevler.filter((g) => g.status === "tamamlandi");

  const goreviTamamla = useCallback(
    async (gorev: GorevOgesi) => {
      if (!child?.id) return;
      setIsaretlenen(gorev.gorev.id);
      const { error } = await supabase
        .from("profile_tasks")
        .update({ status: "tamamlandi", completed_at: new Date().toISOString() })
        .eq("profile_id", child.id)
        .eq("task_id", gorev.gorev.id);
      setIsaretlenen(null);

      if (!error) {
        setRows((current) =>
          current.map((row) =>
            row.task_id === gorev.gorev.id
              ? { ...row, status: "tamamlandi", completed_at: new Date().toISOString() }
              : row,
          ),
        );
        // Hafif kutlama — koleksiyon ödülü DEĞİL (PROJE-MODELI 4.3)
        setKutlama(gorev.gorev.ad);
        window.setTimeout(() => setKutlama(null), 2600);
      }
    },
    [child?.id],
  );

  function GorevKarti({ gorev }: { gorev: GorevOgesi }) {
    const acik = acikGorev === gorev.gorev.id;
    const tamamlandi = gorev.status === "tamamlandi";

    return (
      <Kart parlak={!tamamlandi} kilitli={false} className={tamamlandi ? "opacity-80" : ""}>
        <button
          type="button"
          onClick={() => setAcikGorev(acik ? null : gorev.gorev.id)}
          aria-expanded={acik}
          className="flex w-full items-center gap-3 text-left"
        >
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
              tamamlandi ? "bg-eylem text-eylem-metin" : "bg-vurgu-yumusak text-vurgu"
            }`}
          >
            <Ikon ad={tamamlandi ? "onay" : "fener"} boyut={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-baslik text-base font-bold sm:text-lg">
              {gorev.gorev.ad}
            </span>
            <span className="block truncate font-govde text-xs text-murekkep-soluk">
              {gorev.bookTitle} • {gorev.bolumNo}. Bölüm
            </span>
          </span>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 font-govde text-[11px] font-bold ${
              tamamlandi
                ? "bg-eylem-yumusak text-eylem"
                : "bg-yuzey-2 text-murekkep-soluk"
            }`}
          >
            {tamamlandi ? "Tamamlandı" : "Tamamlanmadı"}
          </span>
          <Ikon
            ad="ok-sag"
            boyut={16}
            className={`shrink-0 text-murekkep-soluk transition-transform ${acik ? "rotate-90" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {acik ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="mt-3 border-t border-cizgi pt-3">
                <p className="whitespace-pre-line font-story text-sm font-semibold leading-6 sm:text-base sm:leading-7">
                  {gorev.gorev.aciklama}
                </p>

                <div className="mt-3 grid gap-1.5 font-govde text-sm text-murekkep-soluk">
                  <p className="flex items-start gap-1.5">
                    <Ikon ad="saat" boyut={15} className="mt-0.5 shrink-0" />
                    <span>Tahmini süre: {gorev.gorev.sure}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Ikon ad="onay" boyut={15} className="mt-0.5 shrink-0" />
                    <span>Tamamlandı diyebilmek için: {gorev.gorev.olcut}</span>
                  </p>
                </div>

                {gorev.gorev.guvenlikNotu ? (
                  <p className="mt-3 flex items-start gap-2 rounded-buton bg-vurgu-yumusak px-3 py-2.5 font-govde text-sm font-semibold leading-6">
                    <Ikon ad="kalp" boyut={16} className="mt-0.5 shrink-0 text-vurgu" />
                    {gorev.gorev.guvenlikNotu}
                  </p>
                ) : null}

                {!tamamlandi ? (
                  <div className="mt-4">
                    <Buton
                      varyant="eylem"
                      tamGenislik
                      disabled={isaretlenen === gorev.gorev.id}
                      onClick={() => goreviTamamla(gorev)}
                    >
                      <Ikon ad="onay" boyut={18} />
                      {isaretlenen === gorev.gorev.id
                        ? "İşaretleniyor..."
                        : "Görevi Tamamladım"}
                    </Buton>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Kart>
    );
  }

  const yukleniyorMu = cocukYukleniyor || yukleniyor;

  return (
    <main className="tema-cocuk zemin-yildizli relative min-h-screen text-murekkep">
      <div className="relative mx-auto max-w-3xl px-4 py-6 sm:px-8">
        {/* Üst bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Buton varyant="cerceve" boyut="kucuk" onClick={() => router.push("/map")}>
            <Ikon ad="geri" boyut={16} />
            Haritaya Dön
          </Buton>
          <Buton
            varyant="cerceve"
            boyut="kucuk"
            onClick={() => router.push("/kazanimlarim")}
          >
            <Ikon ad="rozet" boyut={16} />
            Kazanımlarım
          </Buton>
        </div>

        <header className="mb-6">
          <p className="font-govde text-sm text-murekkep-soluk">
            {child?.name ? `${child.name} için` : "Senin için"}
          </p>
          <h1 className="font-baslik text-3xl font-bold sm:text-4xl">Görevlerim</h1>
          <p className="mt-1 font-govde text-sm text-murekkep-soluk">
            Kitaplardan listene eklediğin &quot;Bugüne Taşı&quot; görevleri burada.
            Hepsi gönüllü — kendi hızında.
          </p>
        </header>

        {/* Hafif kutlama bandı */}
        <AnimatePresence>
          {kutlama ? (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
              className="mb-4 flex items-center gap-2 rounded-kart border border-eylem/50 bg-eylem-yumusak px-4 py-3 font-baslik text-sm font-bold text-eylem"
            >
              <Ikon ad="yildiz" boyut={18} />
              &quot;{kutlama}&quot; tamamlandı — eline sağlık!
            </motion.p>
          ) : null}
        </AnimatePresence>

        {yukleniyorMu ? (
          <Kart className="text-center font-govde text-murekkep-soluk">
            Görevlerin hazırlanıyor...
          </Kart>
        ) : gorevler.length === 0 ? (
          <Kart dolgu="genis" className="text-center">
            <p className="font-baslik text-lg font-bold">Listen henüz boş</p>
            <p className="mt-2 font-govde text-sm text-murekkep-soluk">
              Okurken karşına çıkan &quot;Bugüne Taşı&quot; görevlerinde
              &quot;Görevi Listeme Ekle&quot; dersen burada birikir.
            </p>
            <div className="mt-5 flex justify-center">
              <Buton varyant="altin" onClick={() => router.push("/map")}>
                Okumaya Devam Et
              </Buton>
            </div>
          </Kart>
        ) : (
          <div className="space-y-6">
            {bekleyenler.length > 0 ? (
              <section>
                <h2 className="mb-3 font-baslik text-lg font-bold">
                  Seni Bekleyenler ({bekleyenler.length})
                </h2>
                <div className="space-y-3">
                  {bekleyenler.map((gorev) => (
                    <GorevKarti key={gorev.gorev.id} gorev={gorev} />
                  ))}
                </div>
              </section>
            ) : null}

            {tamamlananlar.length > 0 ? (
              <section>
                <h2 className="mb-3 font-baslik text-lg font-bold">
                  Tamamladıkların ({tamamlananlar.length})
                </h2>
                <div className="space-y-3">
                  {tamamlananlar.map((gorev) => (
                    <GorevKarti key={gorev.gorev.id} gorev={gorev} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
