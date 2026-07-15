"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useParentData } from "../../lib/parent/ParentDataProvider";
import { Ikon } from "../ui";
import { HesapMenusu } from "./HesapMenusu";
import { VeliAltNav, VeliYanMenu } from "./VeliNav";

// Veli panelinin ortak kabuğu (PROJE-MODELI.md 5.2). tema-veli krem dünyası;
// sol menü (masaüstü), üst bar (hesap menüsü), mobil alt navigasyon.
export function VeliKabuk({ children }: { children: ReactNode }) {
  const { notice, error } = useParentData();

  return (
    <div className="tema-veli min-h-screen bg-zemin text-murekkep">
      <div className="flex min-h-screen">
        <VeliYanMenu />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-cizgi bg-zemin/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="grid h-10 w-10 place-items-center rounded-buton bg-vurgu-yumusak text-vurgu">
                <Ikon ad="fener" boyut={22} />
              </span>
              <span className="font-baslik text-base font-bold text-murekkep">
                Veli Paneli
              </span>
            </div>
            <div className="hidden lg:block" />
            <HesapMenusu />
          </header>

          <AnimatePresence>
            {notice || error ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="status"
                className={`mx-4 mt-4 rounded-kart border px-4 py-3 text-sm font-semibold sm:mx-6 lg:mx-8 ${
                  error
                    ? "border-tehlike/40 bg-tehlike/10 text-tehlike"
                    : "border-eylem/40 bg-eylem-yumusak text-eylem-koyu"
                }`}
              >
                {error ?? notice}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <main className="flex-1 px-4 pb-[calc(6rem_+_env(safe-area-inset-bottom))] pt-5 sm:px-6 lg:px-8 lg:pb-10">
            {children}
          </main>
        </div>
      </div>

      <VeliAltNav />
    </div>
  );
}
