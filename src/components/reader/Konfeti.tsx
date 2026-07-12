"use client";

import { motion } from "framer-motion";

const parcalar = [
  { left: "8%", delay: 0, renk: "bg-rose-400", donme: -20 },
  { left: "18%", delay: 0.08, renk: "bg-sky-400", donme: 34 },
  { left: "30%", delay: 0.03, renk: "bg-emerald-400", donme: 12 },
  { left: "44%", delay: 0.12, renk: "bg-amber-400", donme: -48 },
  { left: "58%", delay: 0.05, renk: "bg-teal-400", donme: 24 },
  { left: "72%", delay: 0.1, renk: "bg-orange-400", donme: -10 },
  { left: "84%", delay: 0.02, renk: "bg-fuchsia-400", donme: 52 },
  { left: "92%", delay: 0.16, renk: "bg-lime-400", donme: -36 },
];

/** Kutlama anlarında karta yağan kısa konfeti animasyonu. */
export function Konfeti() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {parcalar.map((parca) => (
        <motion.span
          key={`${parca.left}-${parca.delay}`}
          initial={{ y: -18, opacity: 0, rotate: 0 }}
          animate={{ y: 140, opacity: [0, 1, 1, 0], rotate: parca.donme }}
          transition={{ duration: 1.2, delay: parca.delay, ease: "easeOut" }}
          style={{ left: parca.left }}
          className={`absolute top-0 h-3 w-2 rounded-sm ${parca.renk}`}
        />
      ))}
    </div>
  );
}
