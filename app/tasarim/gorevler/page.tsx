"use client";

import { useEffect, useMemo, useState } from "react";
import { gorevDurumDetaylari, type GorevDurumSatiri } from "../../../src/lib/derive";
import { yolculukKitaplari } from "../../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../../src/components/atlas/KesifSayfaKabugu";
import { GorevlerimEkrani } from "../../../src/components/cocuk/GorevlerimEkrani";
import { ORNEK_ILERLEME, ORNEK_KITAPLAR, ORNEK_PROFIL, ornekGorevSatirlari } from "../ornekVeri";

/**
 * Görevlerim önizlemesi — giriş gerektirmez, kayıt Supabase'e gitmez. Gerçek
 * ekran `/gorevlerim`'dir.
 *   ?durum=bos      → hiç görev yok
 *   ?durum=bekleyen → bekleyen görev yok, yalnız tamamlananlar
 */
export default function GorevlerOnizleme() {
  const [rows, setRows] = useState<GorevDurumSatiri[]>([]);
  const [isaretlenen, setIsaretlenen] = useState<string | null>(null);
  const [sonTamamlanan, setSonTamamlanan] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const durum = new URLSearchParams(window.location.search).get("durum");
      const ornek = ornekGorevSatirlari();
      setRows(
        durum === "bos"
          ? []
          : durum === "bekleyen"
            ? ornek.filter((row) => row.status === "tamamlandi")
            : ornek,
      );
    });
  }, []);

  const gorevler = useMemo(() => gorevDurumDetaylari(rows), [rows]);
  const kitaplar = yolculukKitaplari(ORNEK_KITAPLAR, ORNEK_ILERLEME);

  return (
    <KesifSayfaKabugu profil={ORNEK_PROFIL} toplamRozet={13} tamamlananKitap={1}>
      <GorevlerimEkrani
        gorevler={gorevler}
        kitaplar={kitaplar}
        yukleniyor={false}
        isaretlenen={isaretlenen}
        sonTamamlanan={sonTamamlanan}
        onTamamla={(gorev) => {
          setIsaretlenen(gorev.gorev.id);
          window.setTimeout(() => {
            setIsaretlenen(null);
            setRows((onceki) =>
              onceki.map((row) =>
                row.task_id === gorev.gorev.id
                  ? { ...row, status: "tamamlandi", completed_at: new Date().toISOString() }
                  : row,
              ),
            );
            setSonTamamlanan(gorev.gorev.id);
          }, 500);
        }}
      />
    </KesifSayfaKabugu>
  );
}
