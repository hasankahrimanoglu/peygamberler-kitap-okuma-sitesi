"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { HASSAS_IMLEC, useHareketiAzalt, useMedya } from "./medya";

/**
 * Hero'daki cihaz grubu: fareyle hafifçe eğilir (3B), sayfa kaydıkça
 * zeminden biraz daha yavaş yükselir (paralaks). Yalnız fareli geniş
 * ekranda çalışır; dokunmatikte ve "hareketi azalt"ta durağandır.
 */
export function CihazSahnesi({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const azalt = useHareketiAzalt();
  const etkin = useMedya(HASSAS_IMLEC) && !azalt;

  const yay = { stiffness: 90, damping: 18, mass: 0.6 };
  const egimX = useSpring(0, yay);
  const egimY = useSpring(0, yay);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const paralaks = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <m.div
      ref={ref}
      className={className}
      style={etkin ? { rotateX: egimX, rotateY: egimY, y: paralaks, transformPerspective: 1400 } : undefined}
      onPointerMove={(olay) => {
        if (!etkin || !ref.current) return;
        const kutu = ref.current.getBoundingClientRect();
        const px = (olay.clientX - kutu.left) / kutu.width - 0.5;
        const py = (olay.clientY - kutu.top) / kutu.height - 0.5;
        egimY.set(px * 9);
        egimX.set(-py * 7);
      }}
      onPointerLeave={() => {
        egimX.set(0);
        egimY.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
