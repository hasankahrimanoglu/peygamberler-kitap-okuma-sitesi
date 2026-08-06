"use client";

import { usePathname, useRouter } from "next/navigation";
import { Ikon } from "../ui";
import styles from "./kesif-iskele.module.css";
import { ISKELE_BAGLANTILARI } from "./iskeleBaglantilari";

/**
 * Üst bardaki Keşif İskelesi şeridi (KARAR 6 Ağu 2026 — Hasan).
 *
 * Atlas haritası, kitap bölüm rotası ve menü sayfalarının kabuğu — üçü de bunu
 * kullanır. `KesifMenusu` ile aynı kalıp: kendi CSS modülü vardır, ekranların
 * modüllerine bağlı değildir.
 *
 * Bulunduğun sayfa `usePathname` ile işaretlenir; şerit menü sayfalarında asıl
 * gezinme aracı olduğu için aktif durum orada gerekli. Atlas ve kitap rotası
 * şeritteki hiçbir yola karşılık gelmez, orada hiçbiri işaretlenmez.
 */
export function KesifIskelesi() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className={styles.serit} aria-label="Keşif menüsü">
      {ISKELE_BAGLANTILARI.map((baglanti) => {
        const aktif = pathname === baglanti.yol;
        return (
          <button
            type="button"
            key={baglanti.yol}
            aria-current={aktif ? "page" : undefined}
            onClick={() => router.push(baglanti.yol)}
          >
            <Ikon ad={baglanti.ikon} boyut={18} /> {baglanti.ad}
          </button>
        );
      })}
    </nav>
  );
}
