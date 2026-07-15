"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { DeriveBookRow, DeriveProgressRow } from "../derive";

export type ChildProfile = {
  id: string;
  isim: string;
  avatar_tipi: string;
  unvan: string | null;
  child_username?: string | null;
  child_password?: string | null;
  profile_limit: number;
  created_at: string;
};

const profileSelectWithChildLogin =
  "id, isim, avatar_tipi, unvan, child_username, child_password, profile_limit, created_at";
const profileSelectBase =
  "id, isim, avatar_tipi, unvan, profile_limit, created_at";
const progressSelect =
  "profile_id, book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi, final_title, final_score, final_badge, updated_at";

export function isMissingChildLoginColumn(message?: string) {
  const normalized = (message ?? "").toLocaleLowerCase("tr-TR");
  return (
    normalized.includes("child_username") ||
    normalized.includes("child_password") ||
    normalized.includes("column")
  );
}

type ProgressWithProfile = DeriveProgressRow & { profile_id: string };

export type ProfileTaskRow = {
  profile_id: string;
  task_id: string;
  status: "eklendi" | "tamamlandi";
  added_at: string;
  completed_at: string | null;
};

type ParentDataValue = {
  parentId: string | null;
  profiles: ChildProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<ChildProfile[]>>;
  profileLimit: number;
  books: DeriveBookRow[];
  /** profile_id → o çocuğun user_progress satırları */
  progressByProfile: Record<string, DeriveProgressRow[]>;
  /** profile_id → o çocuğun profile_tasks satırları (Faz 6.1; tablo yoksa boş) */
  tasksByProfile: Record<string, ProfileTaskRow[]>;
  isLoading: boolean;
  notice: string | null;
  error: string | null;
  setNotice: (value: string | null) => void;
  setError: (value: string | null) => void;
  reload: () => Promise<void>;
};

const ParentDataContext = createContext<ParentDataValue | null>(null);

export function useParentData() {
  const context = useContext(ParentDataContext);
  if (!context) {
    throw new Error("useParentData yalnızca ParentDataProvider içinde kullanılır.");
  }
  return context;
}

export function ParentDataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [parentId, setParentId] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [profileLimit, setProfileLimit] = useState(1);
  const [books, setBooks] = useState<DeriveBookRow[]>([]);
  const [progressByProfile, setProgressByProfile] = useState<
    Record<string, DeriveProgressRow[]>
  >({});
  const [tasksByProfile, setTasksByProfile] = useState<
    Record<string, ProfileTaskRow[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    setParentId(user.id);

    const [profileResult, subscriptionResult, booksResult] = await Promise.all([
      supabase
        .from("profiles")
        .select(profileSelectWithChildLogin)
        .eq("veli_id", user.id)
        .order("created_at", { ascending: true }),
      supabase
        .from("parent_subscriptions")
        .select("profile_limit, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle(),
      supabase.from("books").select("id, isim, toplam_bolum, sira"),
    ]);

    let profileRows = profileResult.data as ChildProfile[] | null;
    let profilesError = profileResult.error;

    if (profilesError && isMissingChildLoginColumn(profilesError.message)) {
      const fallback = await supabase
        .from("profiles")
        .select(profileSelectBase)
        .eq("veli_id", user.id)
        .order("created_at", { ascending: true });

      profileRows = fallback.data as ChildProfile[] | null;
      profilesError = fallback.error;

      if (!fallback.error) {
        setNotice(
          "Çocuk giriş bilgileri için Supabase'e child_username ve child_password sütunlarını eklemelisin.",
        );
      }
    }

    if (profilesError) {
      setError("Çocuk profilleri yüklenemedi. Lütfen tekrar dene.");
      setIsLoading(false);
      return;
    }

    if (subscriptionResult.error) {
      setNotice("Aktif paket bilgisi bulunamadı. Varsayılan 1 profillik hak tanımlandı.");
    }

    const loadedProfiles = profileRows ?? [];
    setProfiles(loadedProfiles);
    setProfileLimit(subscriptionResult.data?.profile_limit ?? 1);
    setBooks((booksResult.data as DeriveBookRow[] | null) ?? []);

    // Tüm çocukların ilerleme + görev durumunu tek seferde çek, profile_id'ye
    // göre grupla. profile_tasks migration'ı henüz çalıştırılmadıysa görevler
    // sessizce boş kalır (görevler gönüllü — panel bozulmaz).
    const profileIds = loadedProfiles.map((profile) => profile.id);
    if (profileIds.length > 0) {
      const [progressResult, tasksResult] = await Promise.all([
        supabase
          .from("user_progress")
          .select(progressSelect)
          .in("profile_id", profileIds),
        supabase
          .from("profile_tasks")
          .select("profile_id, task_id, status, added_at, completed_at")
          .in("profile_id", profileIds),
      ]);

      const grouped: Record<string, DeriveProgressRow[]> = {};
      for (const row of (progressResult.data as ProgressWithProfile[] | null) ?? []) {
        (grouped[row.profile_id] ??= []).push(row);
      }
      setProgressByProfile(grouped);

      const groupedTasks: Record<string, ProfileTaskRow[]> = {};
      for (const row of (tasksResult.data as ProfileTaskRow[] | null) ?? []) {
        (groupedTasks[row.profile_id] ??= []).push(row);
      }
      setTasksByProfile(groupedTasks);
    } else {
      setProgressByProfile({});
      setTasksByProfile({});
    }

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!notice && !error) return undefined;
    const timer = window.setTimeout(() => {
      setNotice(null);
      setError(null);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [notice, error]);

  const value = useMemo<ParentDataValue>(
    () => ({
      parentId,
      profiles,
      setProfiles,
      profileLimit,
      books,
      progressByProfile,
      tasksByProfile,
      isLoading,
      notice,
      error,
      setNotice,
      setError,
      reload: load,
    }),
    [parentId, profiles, profileLimit, books, progressByProfile, tasksByProfile, isLoading, notice, error, load],
  );

  return (
    <ParentDataContext.Provider value={value}>
      {children}
    </ParentDataContext.Provider>
  );
}
