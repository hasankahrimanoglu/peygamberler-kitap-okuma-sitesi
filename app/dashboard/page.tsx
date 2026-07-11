"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { parentReportBooks, type ParentReportBook } from "../../src/data/books";

type ChildProfile = {
  id: string;
  isim: string;
  avatar_tipi: string;
  unvan: string | null;
  child_username?: string | null;
  child_password?: string | null;
  profile_limit: number;
  created_at: string;
};

type ReportBookRow = {
  id: string;
  isim: string;
  toplam_bolum: number | null;
};

type ReportProgressRow = {
  book_id: string;
  tamamlanan_bolum_sayisi: number | null;
  yuzde: number | null;
  bitti_mi: boolean | null;
  final_title?: string | null;
  final_score?: number | null;
  final_badge?: string | null;
  updated_at: string | null;
};

type CompletedAdventureReport = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
  finalScore: number | null;
  totalQuestions: number;
  successRate: number | null;
  finalTitle: string | null;
  finalBadge: string | null;
  updatedAt: string | null;
  parentMessage: string;
  chatQuestions: string[];
};

type CurrentAdventureHint = {
  bookTitle: string;
  completedCount: number;
  totalChapters: number;
} | null;

type ChildReport = {
  profile: ChildProfile;
  totalBadges: number;
  completedAdventures: CompletedAdventureReport[];
  currentAdventure: CurrentAdventureHint;
};

const profileSelectWithChildLogin =
  "id, isim, avatar_tipi, unvan, child_username, child_password, profile_limit, created_at";
const profileSelectBase =
  "id, isim, avatar_tipi, unvan, profile_limit, created_at";

const avatarOptions = [
  { value: "lantern", label: "Kandil", symbol: "✦" },
  { value: "book", label: "Kitap", symbol: "◈" },
  { value: "star", label: "Yıldız", symbol: "★" },
];

function avatarSymbol(value: string) {
  return avatarOptions.find((avatar) => avatar.value === value)?.symbol ?? "✦";
}

function normalizeBookName(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c");
}

function findReportBook(bookName: string): ParentReportBook | undefined {
  const normalizedName = normalizeBookName(bookName);

  return parentReportBooks.find((book) =>
    book.keywords.some((keyword) => normalizedName.includes(keyword)),
  );
}

function findBookRowForReportBook(
  reportBook: ParentReportBook,
  books: ReportBookRow[],
) {
  return books.find((book) => {
    const normalizedName = normalizeBookName(book.isim);
    return reportBook.keywords.some((keyword) => normalizedName.includes(keyword));
  });
}

function formatReportDate(value: string | null) {
  if (!value) return "Tarih kaydı yok";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getParentMessage({
  childName,
  successRate,
  reportBook,
}: {
  childName: string;
  successRate: number | null;
  reportBook?: ParentReportBook;
}) {
  if (successRate === null) {
    return `${childName} bu macerayı tamamladı. Final testi puanı henüz kaydedilmemiş olsa da, kitabı bitirme emeği başlı başına çok kıymetli. Akşam ona yolculukta en çok hangi bölümü sevdiğini sorabilirsiniz.`;
  }

  if (successRate >= 80) {
    return (
      reportBook?.parent_summary ??
      `${childName} bu kitabı çok güçlü bir dikkatle tamamladı. Okuma emeğini fark ettirmek ve sevdiği bölümü konuşmak, bu güzel kazanımı daha da kalıcı hale getirebilir.`
    );
  }

  if (successRate >= 55) {
    return `${childName} bu uzun ve güzel kitabı büyük bir emekle tamamladı! Kıssanın genel duygusunu çok güzel yakaladı, final testindeki bazı detay sorularında ise o anki odaklanmasına bağlı küçük tatlı dalgınlıklar olmuş olabilir, bu çok normal. Akşam onunla kitapta en çok hangi bölümü sevdiğini konuşup bu güzel yolculuğu birlikte taçlandırmaya ne dersiniz?`;
  }

  return `${childName} bu uzun macerayı başarıyla bitirdi ve harika bir okuma gayreti gösterdi! Bir sonraki heyecanlı kitaba bir an önce geçmek için final testindeki soruları biraz hızlıca geçmiş veya o an sıkılıp sallamış olabilir, bu çok doğal. Önemli olan bu güzel kitabı keyifle bitirmiş olması.`;
}

function getDefaultChatQuestions(childName: string) {
  return [
    `${childName} bu kitapta en çok hangi sahneyi sevmiş olabilir?`,
    "Bu hikayeden evde birlikte uygulayabileceğiniz küçük bir iyilik ne olabilir?",
  ];
}

function isMissingChildLoginColumn(message?: string) {
  const normalized = (message ?? "").toLocaleLowerCase("tr-TR");

  return (
    normalized.includes("child_username") ||
    normalized.includes("child_password") ||
    normalized.includes("column")
  );
}

export default function ParentDashboardPage() {
  const router = useRouter();
  const [parentId, setParentId] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [profileLimit, setProfileLimit] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [childName, setChildName] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [avatarType, setAvatarType] = useState("lantern");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [editChildUsername, setEditChildUsername] = useState("");
  const [editChildPassword, setEditChildPassword] = useState("");
  const [isUpdatingChildLogin, setIsUpdatingChildLogin] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);
  const [activeReportProfile, setActiveReportProfile] =
    useState<ChildProfile | null>(null);
  const [childReport, setChildReport] = useState<ChildReport | null>(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canAddProfile = profiles.length < profileLimit;

  useEffect(() => {
    async function loadProfiles() {
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

      const [profileResult, subscriptionResult] = await Promise.all([
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
      setIsLoading(false);
    }

    loadProfiles();
  }, [router]);

  useEffect(() => {
    if (!notice && !error) return undefined;

    const timer = window.setTimeout(() => {
      setNotice(null);
      setError(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [notice, error]);

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (newPassword.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalı.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError("Şifre güncellenemedi. Lütfen tekrar dene.");
      return;
    }

    setNewPassword("");
    setIsPasswordModalOpen(false);
    setNotice("Şifren başarıyla güncellendi.");
  }

  async function handleAddProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!parentId) return;
    if (!canAddProfile) {
      setError("Profil limitin dolu. Yeni profil ekleyemezsin.");
      return;
    }

    const trimmedName = childName.trim();
    const trimmedUsername = childUsername.trim();

    if (!trimmedName) {
      setError("Çocuğun ismini yazmalısın.");
      return;
    }

    if (!trimmedUsername || !childPassword.trim()) {
      setError("Çocuğun kullanıcı adı ve şifresi zorunlu.");
      return;
    }

    setIsAddingProfile(true);

    let insertNoticeMessage = `${trimmedName} profili eklendi.`;
    const insertResult = await supabase
      .from("profiles")
      .insert({
        veli_id: parentId,
        isim: trimmedName,
        avatar_tipi: avatarType,
        child_username: trimmedUsername,
        child_password: childPassword,
        profile_limit: profileLimit,
      })
      .select(profileSelectWithChildLogin)
      .single();
    let createdProfile = insertResult.data as ChildProfile | null;
    let insertError = insertResult.error;

    if (insertError && isMissingChildLoginColumn(insertError.message)) {
      const fallback = await supabase
        .from("profiles")
        .insert({
          veli_id: parentId,
          isim: trimmedName,
          avatar_tipi: avatarType,
          profile_limit: profileLimit,
        })
        .select(profileSelectBase)
        .single();

      createdProfile = fallback.data as ChildProfile | null;
      insertError = fallback.error;

      if (!fallback.error) {
        insertNoticeMessage = `${trimmedName} profili eklendi. Çocuk girişi için veritabanına child_username ve child_password sütunlarını eklemelisin.`;
      }
    }

    setIsAddingProfile(false);

    if (insertError || !createdProfile) {
      setError("Profil eklenemedi. Lütfen tekrar dene.");
      return;
    }

    setProfiles((current) => [...current, createdProfile]);
    setChildName("");
    setChildUsername("");
    setChildPassword("");
    setAvatarType("lantern");
    setNotice(insertNoticeMessage);
  }

  function openEditProfile(profile: ChildProfile) {
    setEditingProfile(profile);
    setEditChildUsername(profile.child_username ?? "");
    setEditChildPassword(profile.child_password ?? "");
    setIsDeleteConfirmOpen(false);
  }

  async function handleChildLoginUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!editingProfile) return;

    const trimmedUsername = editChildUsername.trim();
    const trimmedPassword = editChildPassword.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Çocuk kullanıcı adı ve şifresi boş bırakılamaz.");
      return;
    }

    setIsUpdatingChildLogin(true);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        child_username: trimmedUsername,
        child_password: trimmedPassword,
      })
      .eq("id", editingProfile.id);

    setIsUpdatingChildLogin(false);

    if (updateError) {
      setError(
        isMissingChildLoginColumn(updateError.message)
          ? "Çocuk giriş bilgilerini kaydetmek için Supabase profiles tablosuna child_username ve child_password sütunlarını eklemelisin."
          : "Çocuk giriş bilgileri güncellenemedi. Lütfen tekrar dene.",
      );
      return;
    }

    setProfiles((current) =>
      current.map((profile) =>
        profile.id === editingProfile.id
          ? {
              ...profile,
              child_username: trimmedUsername,
              child_password: trimmedPassword,
            }
          : profile,
      ),
    );
    setEditingProfile(null);
    setNotice(`${editingProfile.isim} için çocuk girişi güncellendi.`);
  }

  async function handleDeleteProfile() {
    setError(null);
    setNotice(null);

    if (!editingProfile) return;

    setIsDeletingProfile(true);

    const { error: deleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", editingProfile.id);

    setIsDeletingProfile(false);

    if (deleteError) {
      setError("Profil silinemedi. Lütfen tekrar dene.");
      return;
    }

    setProfiles((current) =>
      current.filter((profile) => profile.id !== editingProfile.id),
    );

    if (
      window.localStorage.getItem("selected_child_profile_id") === editingProfile.id
    ) {
      window.localStorage.removeItem("selected_child_profile_id");
      window.localStorage.removeItem("selected_child_profile_name");
      window.localStorage.removeItem("selected_child_name");
    }

    setNotice(`${editingProfile.isim} profili silindi.`);
    setEditingProfile(null);
    setIsDeleteConfirmOpen(false);
  }

  function selectProfile(profile: ChildProfile) {
    window.localStorage.setItem("selected_child_profile_id", profile.id);
    window.localStorage.setItem("selected_child_profile_name", profile.isim);
    window.localStorage.setItem("selected_child_name", profile.isim);
    router.push("/map");
  }

  async function openStatistics(profile: ChildProfile) {
    setActiveReportProfile(profile);
    setChildReport(null);
    setIsReportLoading(true);
    setError(null);
    setNotice(null);

    const [booksResult, progressResult, profileResult] = await Promise.all([
      supabase.from("books").select("id, isim, toplam_bolum"),
      supabase
        .from("user_progress")
        .select(
          "book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi, final_title, final_score, final_badge, updated_at",
        )
        .eq("profile_id", profile.id),
      supabase
        .from("profiles")
        .select(profileSelectWithChildLogin)
        .eq("id", profile.id)
        .maybeSingle(),
    ]);

    setIsReportLoading(false);

    if (booksResult.error || progressResult.error || profileResult.error) {
      setError("Gelişim raporu yüklenemedi. Lütfen tekrar dene.");
      return;
    }

    const freshProfile =
      (profileResult.data as ChildProfile | null) ?? profile;
    const books = (booksResult.data ?? []) as ReportBookRow[];
    const progressRows = (progressResult.data ?? []) as ReportProgressRow[];
    const progressByBookId = new Map(
      progressRows.map((progress) => [progress.book_id, progress]),
    );

    const reportSources = parentReportBooks.map((reportBook) => {
      const matchedBook = findBookRowForReportBook(reportBook, books);
      return {
        reportBook,
        book: matchedBook,
        progress: matchedBook ? progressByBookId.get(matchedBook.id) : undefined,
      };
    });

    const totalBadges = reportSources.reduce((sum, source) => {
      const totalChapters =
        source.book?.toplam_bolum || source.reportBook.totalQuizQuestions || 1;
      const completedCount = Math.min(
        totalChapters,
        Math.max(0, source.progress?.tamamlanan_bolum_sayisi ?? 0),
      );

      return sum + completedCount;
    }, 0);

    const completedAdventures = reportSources
      .map(({ reportBook, book, progress }) => {
        const totalChapters = book?.toplam_bolum || reportBook.totalQuizQuestions || 1;
        const completedCount = Math.min(
          totalChapters,
          Math.max(0, progress?.tamamlanan_bolum_sayisi ?? 0),
        );
        const isFinished = Boolean(progress?.bitti_mi);

        if (!isFinished) return null;

        const totalQuestions =
          reportBook.totalQuizQuestions ||
          book?.toplam_bolum ||
          progress?.final_score ||
          1;
        const finalScore = Math.max(
          0,
          progress?.final_score ?? NaN,
        );
        const normalizedFinalScore = Number.isFinite(finalScore) ? finalScore : null;
        const successRate =
          normalizedFinalScore === null
            ? null
            : Math.round((normalizedFinalScore / totalQuestions) * 100);

        return {
          bookTitle: reportBook.title,
          completedCount,
          totalChapters,
          finalScore: normalizedFinalScore,
          totalQuestions,
          successRate,
          finalTitle: progress?.final_title ?? freshProfile.unvan ?? null,
          finalBadge: progress?.final_badge ?? null,
          updatedAt: progress?.updated_at ?? null,
          parentMessage: getParentMessage({
            childName: freshProfile.isim,
            successRate,
            reportBook,
          }),
          chatQuestions:
            reportBook.chat_questions?.length
              ? reportBook.chat_questions
              : getDefaultChatQuestions(freshProfile.isim),
        } satisfies CompletedAdventureReport;
      })
      .filter((report): report is CompletedAdventureReport => report !== null)
      .sort((first, second) => {
        const firstDate = first.updatedAt ? new Date(first.updatedAt).getTime() : 0;
        const secondDate = second.updatedAt ? new Date(second.updatedAt).getTime() : 0;
        return secondDate - firstDate;
      });

    const currentProgress = reportSources
      .map(({ reportBook, book, progress }) => {
        const totalChapters = book?.toplam_bolum || reportBook.totalQuizQuestions || 1;
        const completedCount = Math.min(
          totalChapters,
          Math.max(0, progress?.tamamlanan_bolum_sayisi ?? 0),
        );
        const isFinished = Boolean(progress?.bitti_mi);

        if (isFinished || completedCount <= 0) return null;

        return {
          bookTitle: reportBook.title,
          completedCount,
          totalChapters,
          updatedAt: progress?.updated_at,
        };
      })
      .filter(
        (
          item,
        ): item is CurrentAdventureHint & {
          updatedAt: string | null;
        } => item !== null,
      )
      .sort((first, second) => {
        const firstDate = first.updatedAt ? new Date(first.updatedAt).getTime() : 0;
        const secondDate = second.updatedAt ? new Date(second.updatedAt).getTime() : 0;
        return secondDate - firstDate;
      })[0];

    setChildReport({
      profile: freshProfile,
      totalBadges,
      completedAdventures,
      currentAdventure: currentProgress
        ? {
            bookTitle: currentProgress.bookTitle,
            completedCount: currentProgress.completedCount,
            totalChapters: currentProgress.totalChapters,
          }
        : null,
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-amber-50 px-5 py-8 text-stone-900 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(251,191,36,0.28),transparent_26%),radial-gradient(circle_at_86%_12%,rgba(45,212,191,0.18),transparent_28%),linear-gradient(180deg,rgba(255,251,235,0),rgba(254,243,199,0.62))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-emerald-100/75 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-amber-200 bg-white/80 p-5 shadow-2xl shadow-amber-900/10 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Veli Paneli
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-normal text-amber-950 sm:text-5xl">
              Çocuk Profilleri
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="rounded-2xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-black text-amber-950 shadow-sm transition hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300/60"
          >
            Şifre Değiştir
          </button>
        </header>

        <AnimatePresence>
          {notice || error ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={[
                "mb-6 rounded-2xl border px-5 py-4 text-sm font-bold shadow-sm",
                error
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800",
              ].join(" ")}
              role="status"
            >
              {error ?? notice}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="mb-8 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-amber-900/10 backdrop-blur sm:p-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-normal text-amber-950">
                Yeni Çocuk Profili Ekle
              </h2>
              <p className="mt-1 text-sm font-semibold text-stone-600">
                {profiles.length} / {profileLimit} profil kullanılıyor.
              </p>
            </div>
            {!canAddProfile ? (
              <span className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm font-bold text-stone-500">
                Limit doldu
              </span>
            ) : null}
          </div>

          <form className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_14rem_auto]" onSubmit={handleAddProfile}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">
                Çocuğun İsmi
              </span>
              <input
                value={childName}
                onChange={(event) => setChildName(event.target.value)}
                disabled={!canAddProfile}
                className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
                placeholder="Örn. Ahmet"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">
                Çocuğun Kullanıcı Adı
              </span>
              <input
                value={childUsername}
                onChange={(event) => setChildUsername(event.target.value)}
                disabled={!canAddProfile}
                autoComplete="username"
                className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
                placeholder="Örn. hasan01"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">
                Çocuğun Şifresi
              </span>
              <input
                type="password"
                value={childPassword}
                onChange={(event) => setChildPassword(event.target.value)}
                disabled={!canAddProfile}
                autoComplete="new-password"
                className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
                placeholder="Çocuk şifresi"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">
                Avatar Tipi
              </span>
              <select
                value={avatarType}
                onChange={(event) => setAvatarType(event.target.value)}
                disabled={!canAddProfile}
                className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
              >
                {avatarOptions.map((avatar) => (
                  <option key={avatar.value} value={avatar.value}>
                    {avatar.symbol} {avatar.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={!canAddProfile || isAddingProfile}
              className="h-14 self-end rounded-2xl bg-amber-900 px-6 text-base font-black text-amber-50 shadow-lg shadow-amber-900/15 transition hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-none xl:whitespace-nowrap"
            >
              {isAddingProfile ? "Ekleniyor..." : "Yeni Çocuk Profili Ekle"}
            </button>
          </form>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-black tracking-normal text-amber-950">
            Profiller
          </h2>

          {isLoading ? (
            <div className="rounded-3xl border border-amber-200 bg-white/75 p-7 text-center font-bold text-stone-600">
              Profiller yükleniyor...
            </div>
          ) : profiles.length === 0 ? (
            <div className="rounded-3xl border border-amber-200 bg-white/75 p-7 text-center">
              <p className="text-lg font-black text-amber-950">
                Henüz çocuk profili yok
              </p>
              <p className="mt-2 text-sm font-semibold text-stone-600">
                İlk profili ekleyince okuma yolculuğu başlayacak.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="group relative overflow-hidden rounded-3xl border border-amber-200 bg-white/85 p-5 text-left shadow-xl shadow-amber-900/10 transition"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/45 blur-3xl transition group-hover:bg-amber-300/50" />
                  <div className="relative flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-300 bg-amber-100 text-3xl text-amber-900 shadow-inner">
                      {avatarSymbol(profile.avatar_tipi)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-normal text-amber-950">
                        {profile.isim}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        {profile.unvan ?? "Yeni Gezgin"}
                      </p>
                      <p className="mt-1 text-xs font-bold text-stone-500">
                        Kullanıcı adı: {profile.child_username || "Henüz yok"}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => selectProfile(profile)}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                    >
                      Haritaya Gir
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditProfile(profile)}
                      className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-black text-amber-900 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200"
                    >
                      Profili Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => openStatistics(profile)}
                      className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-black text-sky-800 transition hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-sky-200 sm:col-span-2"
                    >
                      İstatistikler
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {editingProfile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 px-5 backdrop-blur-sm"
            onClick={() => setEditingProfile(null)}
          >
            <motion.form
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={handleChildLoginUpdate}
              className="w-full max-w-md rounded-3xl border border-amber-200 bg-white p-6 shadow-2xl shadow-amber-950/20"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Çocuk Girişi
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-normal text-amber-950">
                    {editingProfile.isim}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  aria-label="Pencereyi kapat"
                  className="grid h-10 w-10 place-items-center rounded-full border border-amber-200 bg-amber-50 text-xl font-black text-amber-900 transition hover:bg-amber-100"
                >
                  ×
                </button>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Kullanıcı Adı
                </span>
                <input
                  value={editChildUsername}
                  onChange={(event) => setEditChildUsername(event.target.value)}
                  autoComplete="username"
                  className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                  placeholder="Örn. hasan01"
                  required
                />
              </label>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Çocuk Şifresi
                </span>
                <input
                  type="password"
                  value={editChildPassword}
                  onChange={(event) => setEditChildPassword(event.target.value)}
                  autoComplete="new-password"
                  className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                  placeholder="Yeni çocuk şifresi"
                  required
                />
              </label>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="h-12 flex-1 rounded-2xl border border-stone-200 bg-white text-sm font-black text-stone-700 transition hover:bg-stone-50"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingChildLogin}
                  className="h-12 flex-1 rounded-2xl bg-amber-900 text-sm font-black text-amber-50 transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                >
                  {isUpdatingChildLogin ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
                {isDeleteConfirmOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm font-bold leading-6 text-rose-800">
                      Bu profile ait tüm ilerleme ve rozetler kalıcı olarak
                      silinecektir. Emin misiniz?
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setIsDeleteConfirmOpen(false)}
                        className="h-11 rounded-2xl border border-rose-200 bg-white text-sm font-black text-rose-800 transition hover:bg-rose-50"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteProfile}
                        disabled={isDeletingProfile}
                        className="h-11 rounded-2xl bg-rose-700 text-sm font-black text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                      >
                        {isDeletingProfile ? "Siliniyor..." : "Evet, Sil"}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmOpen(true)}
                    className="h-12 w-full rounded-2xl border border-rose-300 bg-white text-sm font-black text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200"
                  >
                    Profili Sil
                  </button>
                )}
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeReportProfile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 px-4 py-6 backdrop-blur-sm"
            onClick={() => {
              setActiveReportProfile(null);
              setChildReport(null);
            }}
          >
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 shadow-2xl shadow-amber-950/25"
            >
              <div className="flex items-start justify-between gap-4 border-b border-amber-200 bg-white/80 p-5 backdrop-blur">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Gelişim Raporu
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-normal text-amber-950 sm:text-3xl">
                    {activeReportProfile.isim}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveReportProfile(null);
                    setChildReport(null);
                  }}
                  aria-label="Raporu kapat"
                  className="grid h-11 w-11 place-items-center rounded-full border border-amber-200 bg-amber-100 text-xl font-black text-amber-900 transition hover:bg-amber-200"
                >
                  ×
                </button>
              </div>

              <div className="max-h-[calc(90vh-92px)] overflow-y-auto p-5 sm:p-6">
                {isReportLoading ? (
                  <div className="rounded-3xl border border-amber-200 bg-white/80 p-8 text-center font-black text-amber-950">
                    Rapor hazırlanıyor...
                  </div>
                ) : childReport ? (
                  <div className="space-y-5">
                    <section className="grid gap-4 rounded-3xl border border-emerald-200 bg-white/85 p-5 shadow-lg shadow-amber-900/10 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                          Genel Özet
                        </p>
                        <h3 className="mt-2 text-2xl font-black tracking-normal text-amber-950">
                          {childReport.profile.isim}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          {childReport.profile.unvan ?? "Yeni Gezgin"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                        <p className="text-3xl font-black text-amber-900">
                          🏅 {childReport.totalBadges}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                          Rozet
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="mb-3 text-xl font-black tracking-normal text-amber-950">
                        Tamamlanan Maceralar
                      </h3>

                      {childReport.completedAdventures.length === 0 ? (
                        <div className="rounded-3xl border border-amber-200 bg-white/85 p-6 text-center shadow-lg shadow-amber-900/10">
                          <p className="text-lg font-black text-amber-950">
                            Henüz tamamlanan bir macera bulunmuyor.
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
                            Çocuk profilinden haritaya girerek ilk macerayı
                            başlatabilirsiniz!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {childReport.completedAdventures.map((adventure) => {
                            const wrongCount =
                              adventure.finalScore === null
                                ? null
                                : Math.max(
                                    0,
                                    adventure.totalQuestions - adventure.finalScore,
                                  );

                            return (
                              <article
                                key={`${adventure.bookTitle}-${adventure.updatedAt}`}
                                className="rounded-3xl border border-amber-200 bg-white/85 p-5 shadow-lg shadow-amber-900/10"
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                                      Kitap Yolculuğu
                                    </p>
                                    <h4 className="mt-2 text-xl font-black tracking-normal text-amber-950">
                                      {adventure.bookTitle}
                                    </h4>
                                    <p className="mt-1 text-sm font-bold text-stone-500">
                                      Yolculuk Günlüğü: {formatReportDate(adventure.updatedAt)}
                                    </p>
                                  </div>

                                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                                    {adventure.finalScore === null || wrongCount === null
                                      ? "Final puanı yok"
                                      : `${adventure.finalScore} Doğru / ${wrongCount} Yanlış`}
                                  </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-3">
                                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
                                      Bölüm
                                    </p>
                                    <p className="mt-1 text-lg font-black text-amber-950">
                                      {adventure.completedCount}/{adventure.totalChapters}
                                    </p>
                                  </div>
                                  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-3">
                                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
                                      Başarı
                                    </p>
                                    <p className="mt-1 text-lg font-black text-sky-900">
                                      {adventure.successRate === null
                                        ? "Kayıt yok"
                                        : `%${adventure.successRate}`}
                                    </p>
                                  </div>
                                  <div className="rounded-2xl border border-yellow-100 bg-yellow-50/80 p-3">
                                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
                                      Nişan
                                    </p>
                                    <p className="mt-1 text-sm font-black text-amber-950">
                                      {adventure.finalTitle ??
                                        adventure.finalBadge ??
                                        "Okuma Emeği"}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                  <p className="text-sm font-bold leading-7 text-emerald-900">
                                    {adventure.parentMessage}
                                  </p>
                                </div>

                                <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">
                                    Akşam İçin Sohbet Başlatıcıları
                                  </p>
                                  <div className="mt-3 grid gap-2">
                                    {adventure.chatQuestions.slice(0, 2).map((question) => (
                                      <p
                                        key={question}
                                        className="rounded-2xl bg-white/75 px-4 py-3 text-sm font-bold leading-6 text-sky-950"
                                      >
                                        💬 {question}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </section>

                    <section className="rounded-3xl border border-amber-200 bg-amber-100/70 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
                        Gelecek Durak
                      </p>
                      <p className="mt-2 text-base font-black leading-7 text-amber-950">
                        {childReport.currentAdventure
                          ? `Şu Anki Macera: ${childReport.currentAdventure.bookTitle} — ${childReport.profile.isim} yeni durağı keşfetmeye başladı, ${childReport.currentAdventure.completedCount}/${childReport.currentAdventure.totalChapters} rozet yolunda ilerliyor!`
                          : `${childReport.profile.isim} için sıradaki güzel macera haritada onu bekliyor.`}
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-amber-200 bg-white/85 p-8 text-center font-bold text-stone-600">
                    Raporu açmak için profil bilgileri hazırlanıyor.
                  </div>
                )}
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isPasswordModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 px-5 backdrop-blur-sm"
            onClick={() => setIsPasswordModalOpen(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              onSubmit={handlePasswordUpdate}
              className="w-full max-w-md rounded-3xl border border-amber-200 bg-white p-6 shadow-2xl shadow-amber-950/20"
            >
              <h2 className="text-2xl font-black tracking-normal text-amber-950">
                Şifre Değiştir
              </h2>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Yeni Şifre
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 text-base font-semibold outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                  placeholder="En az 6 karakter"
                  required
                />
              </label>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="h-12 flex-1 rounded-2xl border border-stone-200 bg-white text-sm font-black text-stone-700 transition hover:bg-stone-50"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="h-12 flex-1 rounded-2xl bg-amber-900 text-sm font-black text-amber-50 transition hover:bg-amber-800"
                >
                  Kaydet
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
