"use client";

import type { ChildProfile } from "../../lib/parent/ParentDataProvider";
import { OdulIkonu } from "../ui";

type VeliCocukSeciciProps = {
  profiles: ChildProfile[];
  aktifCocukId: string | null;
  onSec: (profileId: string) => void;
};

/** Kütüphane ve Ödüller için ortak, dokunma dostu çocuk seçici. */
export function VeliCocukSecici({
  profiles,
  aktifCocukId,
  onSec,
}: VeliCocukSeciciProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <p className="text-sm font-bold text-murekkep-soluk">Çocuk</p>
      <div className="flex flex-wrap gap-2">
        {profiles.map((child) => {
          const secili = child.id === aktifCocukId;
          return (
            <button
              key={child.id}
              type="button"
              onClick={() => onSec(child.id)}
              aria-pressed={secili}
              className={`flex min-h-12 items-center gap-2 rounded-buton border px-3 py-2 text-base font-bold transition-colors ${
                secili
                  ? "border-eylem bg-eylem-yumusak text-eylem-koyu"
                  : "border-cizgi bg-yuzey text-murekkep hover:bg-yuzey-2"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-yuzey">
                <OdulIkonu
                  tip="avatar"
                  anahtar={child.avatar_tipi}
                  boyut={30}
                  alt=""
                />
              </span>
              {child.isim}
            </button>
          );
        })}
      </div>
    </div>
  );
}
