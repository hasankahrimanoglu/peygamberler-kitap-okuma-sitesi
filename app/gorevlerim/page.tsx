"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useSelectedChild } from "../../src/lib/child/useSelectedChild";
import { gorevDurumDetaylari, type GorevDurumDetay, type GorevDurumSatiri } from "../../src/lib/derive";
import { yolculukKitaplari } from "../../src/lib/child/yolculuk";
import { KesifSayfaKabugu } from "../../src/components/atlas/KesifSayfaKabugu";
import { GorevlerimEkrani } from "../../src/components/cocuk/GorevlerimEkrani";

/**
 * Görevlerim (Faz 6.1 — PROJE-MODELI 5.1, 3.10.8). Çocuğun profiline eklediği
 * "Bugüne Taşı" görevleri ve "Görevi Tamamladım" eylemi. Veri burada çekilir ve
 * yazılır; görünüm `GorevlerimEkrani`'ndadır (girişsiz önizleme:
 * `/tasarim/gorevler`). Son tarih / ceza / seri YOK.
 */
export default function GorevlerimSayfasi() {
  const { isLoading: cocukYukleniyor, child, books, progress } = useSelectedChild();
  const [rows, setRows] = useState<GorevDurumSatiri[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [isaretlenen, setIsaretlenen] = useState<string | null>(null);
  const [sonTamamlanan, setSonTamamlanan] = useState<string | null>(null);

  useEffect(() => {
    async function yukle() {
      if (!child?.id) return;
      setYukleniyor(true);
      const { data } = await supabase
        .from("profile_tasks")
        .select("task_id, status, added_at, completed_at")
        .eq("profile_id", child.id)
        .order("added_at", { ascending: false });
      setRows((data as GorevDurumSatiri[] | null) ?? []);
      setYukleniyor(false);
    }
    yukle();
  }, [child?.id]);

  // Veli Gelişim Raporu ile aynı birleştirme; içerikten kalkmış görev gösterilmez.
  const gorevler = useMemo(() => gorevDurumDetaylari(rows), [rows]);
  const kitaplar = useMemo(() => yolculukKitaplari(books, progress), [books, progress]);

  const childId = child?.id;
  const goreviTamamla = useCallback(
    async (gorev: GorevDurumDetay) => {
      if (!childId) return;
      setIsaretlenen(gorev.gorev.id);
      const simdi = new Date().toISOString();
      const { error } = await supabase
        .from("profile_tasks")
        .update({ status: "tamamlandi", completed_at: simdi })
        .eq("profile_id", childId)
        .eq("task_id", gorev.gorev.id);
      setIsaretlenen(null);

      if (!error) {
        setRows((current) =>
          current.map((row) =>
            row.task_id === gorev.gorev.id ? { ...row, status: "tamamlandi", completed_at: simdi } : row,
          ),
        );
        // Hafif onay anı — koleksiyon ödülü DEĞİL (PROJE-MODELI 4.3).
        setSonTamamlanan(gorev.gorev.id);
      }
    },
    [childId],
  );

  const biten = kitaplar.filter((kitap) => kitap.bitti).length;
  const rozet = kitaplar.reduce((toplam, kitap) => toplam + kitap.tamamlanan, 0);
  const yukleniyorMu = cocukYukleniyor || yukleniyor;

  return (
    <KesifSayfaKabugu
      profil={{
        ad: child?.name ?? "Gezgin",
        avatarAnahtari: child?.avatarType ?? "avatar-1",
        avatarFotografi: child?.avatarUrl,
      }}
      toplamRozet={rozet}
      tamamlananKitap={biten}
      yukleniyor={yukleniyorMu}
    >
      <GorevlerimEkrani
        gorevler={gorevler}
        kitaplar={kitaplar}
        yukleniyor={yukleniyorMu}
        isaretlenen={isaretlenen}
        sonTamamlanan={sonTamamlanan}
        onTamamla={goreviTamamla}
      />
    </KesifSayfaKabugu>
  );
}
