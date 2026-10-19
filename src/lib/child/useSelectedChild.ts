"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { profilAvatarliOku } from "../profilFotografi";
import { yayindakiDbKitaplari, type DeriveBookRow, type DeriveProgressRow } from "../derive";
import { useCocukOturumu } from "./cocukOturumu";

export type SelectedChild = {
  id: string;
  name: string;
  avatarType: string;
  /** Veli yüklediyse fotoğrafın kovadaki yolu; boşsa hazır avatar geçerli */
  avatarUrl: string | null;
  title: string | null;
};

type SelectedChildData = {
  isLoading: boolean;
  child: SelectedChild | null;
  books: DeriveBookRow[];
  progress: DeriveProgressRow[];
};

// Çocuk tarafı ekranları (harita, Ödüllerim, Kelimelerim, Görevlerim) için
// ortak veri yükleyici. Önce çocuk oturumu korumasından geçer (Faz 7 —
// `cocukOturumu.ts`: veli oturumu + açık profil ya da bağlı cihaz); sonra o
// çocuğun profilini, kitapları ve ilerlemesini çeker.
export function useSelectedChild(): SelectedChildData {
  const oturum = useCocukOturumu();
  const profilId = oturum.durum === "hazir" ? oturum.profilId : null;
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [books, setBooks] = useState<DeriveBookRow[]>([]);
  const [progress, setProgress] = useState<DeriveProgressRow[]>([]);

  useEffect(() => {
    if (!profilId) return undefined;
    const seciliProfil = profilId;
    let iptal = false;

    async function load() {
      const selectedProfileName = window.localStorage.getItem("selected_child_profile_name");

      setIsLoading(true);
      setChild({
        id: seciliProfil,
        name: selectedProfileName || "Gezgin",
        avatarType: "lantern",
        avatarUrl: null,
        title: null,
      });

      const [profileResult, booksResult, progressResult] = await Promise.all([
        profilAvatarliOku<{
          isim: string | null;
          avatar_tipi: string | null;
          unvan: string | null;
        }>(seciliProfil, "isim, avatar_tipi, unvan"),
        supabase.from("books").select("id, isim, toplam_bolum, sira"),
        supabase
          .from("user_progress")
          .select(
            "book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi, final_title, final_score, final_badge, updated_at",
          )
          .eq("profile_id", seciliProfil),
      ]);
      if (iptal) return;

      if (profileResult.data) {
        setChild({
          id: seciliProfil,
          name: profileResult.data.isim ?? selectedProfileName ?? "Gezgin",
          avatarType: profileResult.data.avatar_tipi ?? "lantern",
          avatarUrl: profileResult.data.avatar_url ?? null,
          title: profileResult.data.unvan ?? null,
        });
      }

      // Yalnız yayındaki kitaplar: eski demo kayıtları madalya ve unvanı şişiriyordu.
      setBooks(yayindakiDbKitaplari((booksResult.data as DeriveBookRow[] | null) ?? []));
      setProgress((progressResult.data as DeriveProgressRow[] | null) ?? []);
      setIsLoading(false);
    }

    void load();
    return () => {
      iptal = true;
    };
  }, [profilId]);

  return { isLoading, child, books, progress };
}
