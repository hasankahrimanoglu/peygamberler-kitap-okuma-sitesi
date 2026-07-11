"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type AdventureStatus = "completed" | "active" | "locked";

type AdventureCard = {
  id: number;
  name: string;
  subtitle: string;
  status: AdventureStatus;
  progress: number;
  badge?: string;
  earnedBadgeCount?: number;
  totalBadgeCount?: number;
  lastEarnedBadge?: string;
  isBookFinalized?: boolean;
  isNewlyUnlockedBook?: boolean;
  finalTitleBadge?: string;
  accent: string;
  symbol: string;
};

type ChapterStop = {
  id: string;
  title: string;
  badgeName: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  isNewlyUnlocked?: boolean;
};

type ActiveBookModal = "adem" | "nuh" | "ebubekir" | "omer" | null;

type SelectedChildProfile = {
  id: string;
  name: string;
  avatarType: string;
  title: string;
};

type BookRow = {
  id: string;
  isim: string;
  toplam_bolum: number | null;
};

type UserProgressRow = {
  book_id: string;
  tamamlanan_bolum_sayisi: number | null;
  yuzde: number | null;
  bitti_mi: boolean | null;
  final_title?: string | null;
  final_score?: number | null;
  final_badge?: string | null;
};

type AdventureProgress = {
  completedCount: number;
  totalCount: number;
  progress: number;
  isFinished: boolean;
};

type GlobalProfileStats = {
  earnedBadgeCount: number;
  totalBadgeCount: number;
  completedBookCount: number;
  totalBookCount: number;
  title: string;
};

const ebubekirChapterCatalog = [
  {
    id: "4",
    title: "Özgürlüğe Kavuşanlar",
    badgeName: "Mekke Çarşısı Rozeti",
  },
  {
    id: "5",
    title: "Sabır Yılları",
    badgeName: "Habeşistan Yolu Çıkartması",
  },
  { id: "6", title: "O Söylüyorsa Doğrudur", badgeName: "Doğruluk Rozeti" },
  { id: "7", title: "Mağara Arkadaşı", badgeName: "Tevekkül Rozeti" },
  { id: "8", title: "Medine'de Yeni Sabah", badgeName: "Kardeşlik Rozeti" },
  { id: "9", title: "Birlikte Güçlüyüz", badgeName: "Dayanışma Rozeti" },
  { id: "10", title: "Zor Günde Sakinlik", badgeName: "Teselli Rozeti" },
  { id: "11", title: "Emaneti Taşıyan", badgeName: "Sorumluluk Rozeti" },
  { id: "12", title: "Kararlılık Zamanı", badgeName: "Kararlılık Rozeti" },
  { id: "13", title: "En Kutsal Görev", badgeName: "Vefa Rozeti" },
];

const ademChapterCatalog: ChapterStop[] = [
  {
    id: "1",
    title: "İlk İnsan, İlk Öğrenme",
    badgeName: "İlk Adım Rozeti",
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: "2",
    title: "İsimlerin Sırrı",
    badgeName: "Bilgi Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "3",
    title: "Unutmak ve Hatırlamak",
    badgeName: "Tövbe Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "4",
    title: "Yeryüzünde İlk Sabah",
    badgeName: "Sorumluluk Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "5",
    title: "İlk Aile, İlk İyilik",
    badgeName: "Aile ve Merhamet Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
];

const nuhChapterCatalog: ChapterStop[] = [
  {
    id: "1",
    title: "Sabırlı Bir Davet",
    badgeName: "Sabır Başlangıç Rozeti",
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: "2",
    title: "Geminin Hazırlığı",
    badgeName: "Emek Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "3",
    title: "Yağmur Başlayınca",
    badgeName: "Güven Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "4",
    title: "Güvenle Yolculuk",
    badgeName: "Tevekkül Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "5",
    title: "Yeni Bir Başlangıç",
    badgeName: "Yeni Başlangıç Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
];

const omerChapterCatalog: ChapterStop[] = [
  {
    id: "1",
    title: "Adalet Kapısı Açılıyor",
    badgeName: "Adalet Başlangıç Rozeti",
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: "2",
    title: "Güçlü Bir Karar",
    badgeName: "Cesaret Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: "3",
    title: "Halkın Yanında",
    badgeName: "Sorumluluk Rozeti",
    isUnlocked: false,
    isCompleted: false,
  },
];

const defaultChildProfile: SelectedChildProfile = {
  id: "",
  name: "Gezgin",
  avatarType: "lantern",
  title: "Yeni Gezgin",
};

const defaultGlobalProfileStats: GlobalProfileStats = {
  earnedBadgeCount: 0,
  totalBadgeCount: 0,
  completedBookCount: 0,
  totalBookCount: 0,
  title: "Yeni Gezgin",
};

const adventures: AdventureCard[] = [
  {
    id: 1,
    name: "Hz. Adem",
    subtitle: "İlk insan, ilk yolculuk",
    status: "completed",
    progress: 100,
    badge: "Yeryüzü Başlangıç Rozeti",
    accent: "from-emerald-300 via-teal-200 to-amber-200",
    symbol: "✦",
  },
  {
    id: 2,
    name: "Hz. Nuh",
    subtitle: "Sabır ve güven gemisi",
    status: "completed",
    progress: 100,
    badge: "Sabır Gemisi Rozeti",
    accent: "from-cyan-300 via-sky-200 to-amber-200",
    symbol: "◈",
  },
  {
    id: 3,
    name: "Hz. Ebû Bekir",
    subtitle: "Sadakat ve cömertlik durağı",
    status: "active",
    progress: 30,
    badge: "Mekke Çarşısı Rozeti Kazanıldı",
    accent: "from-amber-200 via-yellow-300 to-orange-300",
    symbol: "✧",
  },
  {
    id: 4,
    name: "Hz. Ömer",
    subtitle: "Adalet kapısı",
    status: "locked",
    progress: 0,
    accent: "from-slate-500 via-slate-400 to-slate-300",
    symbol: "◇",
  },
  {
    id: 5,
    name: "Hz. Osman",
    subtitle: "Hayâ ve iyilik bahçesi",
    status: "locked",
    progress: 0,
    accent: "from-slate-500 via-slate-400 to-slate-300",
    symbol: "◇",
  },
];

const adventureBookKeywords: Record<number, string[]> = {
  1: ["adem"],
  2: ["nuh"],
  3: ["ebu bekir", "ebubekir"],
  4: ["omer"],
  5: ["osman"],
};

const adventureBookKeys: Record<number, ActiveBookModal> = {
  1: "adem",
  2: "nuh",
  3: "ebubekir",
  4: "omer",
  5: null,
};

const localTotalChapterCounts: Record<number, number> = {
  1: ademChapterCatalog.length,
  2: nuhChapterCatalog.length,
  3: ebubekirChapterCatalog.length,
  4: omerChapterCatalog.length,
  5: 1,
};

function normalizeText(value: string) {
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

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function getGlobalProfileTitle({
  earnedBadgeCount,
  totalBadgeCount,
  completedBookCount,
  totalBookCount,
}: Omit<GlobalProfileStats, "title">) {
  if (earnedBadgeCount <= 0) return "Yeni Gezgin";

  const completionRate =
    totalBadgeCount > 0 ? earnedBadgeCount / totalBadgeCount : 0;
  const allBooksCompleted =
    totalBookCount > 0 && completedBookCount >= totalBookCount;

  if (allBooksCompleted) return "Büyük Değer Rehberi";
  if (completionRate >= 0.85) return "Değer Rehberi";
  if (completionRate >= 0.6) return "Hikmet Kâşifi";
  if (completionRate >= 0.35) return "Yolculuk Ustası";
  if (completionRate >= 0.15) return "Değer Toplayıcısı";
  if (completedBookCount > 0) return "Altın Yol Arkadaşı";

  return "Meraklı Kâşif";
}

function getMatchedAdventureId(bookName: string) {
  const normalizedName = normalizeText(bookName);
  const matchedEntry = Object.entries(adventureBookKeywords).find(([, keywords]) =>
    keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  return matchedEntry ? Number(matchedEntry[0]) : null;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M7.5 10V8.2C7.5 5.6 9.4 3.6 12 3.6s4.5 2 4.5 4.6V10h.4c1.1 0 2 .9 2 2v6.4c0 1.1-.9 2-2 2H7.1c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h.4Zm2.1 0h4.8V8.2c0-1.5-1-2.5-2.4-2.5S9.6 6.7 9.6 8.2V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path
        d="M9.7 16.8a1.1 1.1 0 0 1-.8-.3l-3.3-3.3a1.1 1.1 0 1 1 1.6-1.6l2.5 2.5 7.1-7.1a1.1 1.1 0 0 1 1.6 1.6l-7.9 7.9c-.2.2-.5.3-.8.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5.5 4.2h7.1c1.9 0 3.4 1.5 3.4 3.4v12.2c0 .4-.4.7-.8.5a4.9 4.9 0 0 0-2.6-.8H5.5a1.9 1.9 0 0 1-1.9-1.9V6.1c0-1.1.8-1.9 1.9-1.9Zm2.2 3.2a.9.9 0 0 0 0 1.8h4.9a.9.9 0 0 0 0-1.8H7.7Zm0 3.7a.9.9 0 0 0 0 1.8h3.8a.9.9 0 0 0 0-1.8H7.7Z"
        fill="currentColor"
      />
      <path
        d="M17.4 5.2c1.7.3 3 1.8 3 3.5v8.7c0 1.1-.8 1.9-1.9 1.9h-.9V7.6c0-.8-.1-1.6-.2-2.4Z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}

function LanternAvatar() {
  return (
    <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-amber-300/40 bg-slate-900 text-amber-200 shadow-lg shadow-amber-400/20">
      <div className="absolute inset-2 rounded-xl bg-amber-300/10 blur-md" />
      <svg viewBox="0 0 24 24" aria-hidden="true" className="relative h-8 w-8">
        <path
          d="M9 4.2h6l.9 2.4H8.1L9 4.2Zm-1.6 4h9.2l1.1 8.2c.2 1.5-.9 2.9-2.4 2.9H8.7c-1.5 0-2.6-1.4-2.4-2.9l1.1-8.2Z"
          fill="currentColor"
          opacity=".9"
        />
        <path
          d="M12 10.2c1.2 1.2 1.9 2.3 1.9 3.4 0 1.2-.8 2.1-1.9 2.1s-1.9-.9-1.9-2.1c0-1.1.7-2.2 1.9-3.4Z"
          fill="#f97316"
        />
        <path
          d="M8.5 6.6h7M10.1 3.6c.2-1 1-1.7 1.9-1.7s1.7.7 1.9 1.7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

function AdventureSilhouette({ adventure }: { adventure: AdventureCard }) {
  const baseClass =
    "pointer-events-none absolute -bottom-8 -right-10 h-52 w-52 text-white opacity-20 blur-[0.2px] transition duration-300 group-hover:opacity-30 sm:h-60 sm:w-60";

  if (adventure.status === "locked" || adventure.id === 4) {
    return (
      <motion.svg
        viewBox="0 0 160 160"
        aria-hidden="true"
        initial={false}
        animate={
          adventure.status === "locked"
            ? { opacity: 0.2, scale: 1 }
            : { opacity: 0, scale: 0.72, y: -18 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`${baseClass} text-slate-300 group-hover:opacity-20`}
      >
        <path
          d="M45 70V52c0-21 14.4-36 35-36s35 15 35 36v18h5c9.4 0 17 7.6 17 17v38c0 9.4-7.6 17-17 17H40c-9.4 0-17-7.6-17-17V87c0-9.4 7.6-17 17-17h5Zm19 0h32V52c0-10.6-6.4-17.8-16-17.8S64 41.4 64 52v18Z"
          fill="currentColor"
        />
        <path
          d="M81 97c7 0 12.5 5.2 12.5 11.8 0 4.2-2.3 7.8-5.8 9.9v10.4H74.3v-10.4c-3.5-2.1-5.8-5.7-5.8-9.9C68.5 102.2 74 97 81 97Z"
          fill="#020617"
          opacity=".45"
        />
      </motion.svg>
    );
  }

  if (adventure.id === 1) {
    return (
      <svg
        viewBox="0 0 180 180"
        aria-hidden="true"
        className={`${baseClass} -right-12 -top-8 text-emerald-100 opacity-25`}
      >
        <circle cx="92" cy="88" r="43" fill="currentColor" opacity=".38" />
        <path
          d="M92 26v-16M92 170v-16M154 88h16M10 88h16M136 44l11-11M33 143l11-11M136 132l11 11M33 33l11 11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="7"
          opacity=".42"
        />
        <path
          d="M54 84c11-11 22-16 36-16 18 0 28 8 38 20-9 15-22 25-40 25-14 0-25-5-34-14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="8"
          opacity=".64"
        />
        <path
          d="M90 45c-12 16-18 30-18 43 0 14 6 30 18 48M101 46c10 15 15 30 15 43 0 15-6 29-17 46"
          fill="none"
          stroke="#020617"
          strokeLinecap="round"
          strokeWidth="5"
          opacity=".22"
        />
      </svg>
    );
  }

  if (adventure.id === 2) {
    return (
      <svg
        viewBox="0 0 190 180"
        aria-hidden="true"
        className={`${baseClass} -bottom-4 -right-14 text-cyan-100 opacity-25`}
      >
        <path
          d="M43 104h106c-9 24-27 37-54 37s-43-13-52-37Z"
          fill="currentColor"
          opacity=".5"
        />
        <path
          d="M96 38v61M96 44l40 55H96V44Z"
          fill="currentColor"
          opacity=".48"
        />
        <path
          d="M96 44 56 99h40V44Z"
          fill="currentColor"
          opacity=".32"
        />
        <path
          d="M24 136c13-9 26-9 39 0s26 9 39 0 26-9 39 0 25 9 37 0M18 154c14-8 28-8 42 0s28 8 42 0 28-8 42 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="8"
          opacity=".62"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 180 180"
      aria-hidden="true"
      className={`${baseClass} -bottom-10 -right-8 text-amber-100 opacity-25`}
    >
      <path
        d="M71 28h38l5.6 14.5H65.4L71 28Zm-10 26h58l7 61.5c1.5 13.6-9.2 25.5-22.9 25.5H76.9c-13.7 0-24.4-11.9-22.9-25.5L61 54Z"
        fill="currentColor"
        opacity=".5"
      />
      <path
        d="M90 75c13 13 20 24.8 20 36.2 0 12.5-8.3 22-20 22s-20-9.5-20-22C70 99.8 77 88 90 75Z"
        fill="#f59e0b"
        opacity=".62"
      />
      <path
        d="M63 42.5h54M74 25c1.8-9.4 8.3-16 16-16s14.2 6.6 16 16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="8"
        opacity=".62"
      />
      <path
        d="M42 150h96"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="9"
        opacity=".35"
      />
    </svg>
  );
}

function AdventureCardItem({
  adventure,
  index,
  isShaking,
  onLockedClick,
  onActiveClick,
}: {
  adventure: AdventureCard;
  index: number;
  isShaking: boolean;
  onLockedClick: (id: number) => void;
  onActiveClick?: () => void;
}) {
  const isLocked = adventure.status === "locked";
  const isCompleted = adventure.status === "completed";
  const isActive = adventure.status === "active";
  const isClickable = !isLocked && Boolean(onActiveClick);
  const sideOffset = index % 2 === 0 ? "md:mr-24" : "md:ml-24";

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={!isLocked ? { y: -8, scale: 1.025 } : undefined}
      whileTap={isLocked ? { rotate: [0, -1.5, 1.5, -1, 0] } : isClickable ? { scale: 0.99 } : undefined}
      className={[
        "relative mx-auto w-full max-w-xl",
        sideOffset,
        isLocked ? "cursor-not-allowed" : isClickable ? "cursor-pointer" : "",
      ].join(" ")}
    >
      <motion.div
        role={isLocked || isClickable ? "button" : undefined}
        tabIndex={isLocked || isClickable ? 0 : undefined}
        onClick={() => {
          if (isLocked) onLockedClick(adventure.id);
          if (!isLocked) onActiveClick?.();
        }}
        onKeyDown={(event) => {
          if (!isLocked && !isClickable) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (isLocked) onLockedClick(adventure.id);
            if (!isLocked) onActiveClick?.();
          }
        }}
        animate={isShaking ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.42 }}
        aria-label={
          isLocked
            ? `${adventure.name} kilitli`
            : isClickable
              ? `${adventure.name} bölüm seçimi`
              : `${adventure.name} macera kartı`
        }
        className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <div
          className={[
            "relative overflow-hidden rounded-2xl border p-[1px] transition",
            isLocked
              ? "border-slate-700/80 opacity-55"
              : "border-amber-300/40 shadow-2xl shadow-amber-950/40",
            isCompleted ? "shadow-emerald-500/10" : "",
            isActive ? "shadow-amber-400/20" : "",
          ].join(" ")}
        >
          <div
            className={[
              "absolute inset-0 bg-gradient-to-br opacity-40",
              adventure.accent,
              isLocked ? "opacity-10" : "",
            ].join(" ")}
          />
          {adventure.isNewlyUnlockedBook ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0.45, 0],
                boxShadow: [
                  "0 0 0 rgba(250, 204, 21, 0)",
                  "0 0 42px rgba(250, 204, 21, 0.55)",
                  "0 0 24px rgba(250, 204, 21, 0.28)",
                  "0 0 0 rgba(250, 204, 21, 0)",
                ],
              }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-2xl border border-yellow-300/70"
            />
          ) : null}
          {!isLocked ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_40%)]" />
          ) : null}

          <div className="relative min-h-72 overflow-hidden rounded-2xl bg-slate-950/88 p-6 backdrop-blur">
            <AdventureSilhouette adventure={adventure} />

            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-200/80">
                  Macera Durağı {adventure.id}
                </p>
                <h2 className="text-3xl font-black tracking-normal text-white sm:text-4xl">
                  {adventure.name}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  {adventure.subtitle}
                </p>
              </div>

              <div
                className={[
                  "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-2xl",
                  isLocked
                    ? "border-slate-600 bg-slate-900 text-slate-400"
                    : "border-amber-200/50 bg-amber-300/10 text-amber-100",
                ].join(" ")}
              >
                {isLocked ? <LockIcon /> : adventure.symbol}
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold",
                  isCompleted
                    ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-400"
                    : isActive
                      ? "border-amber-300/40 bg-amber-400/15 text-amber-100"
                      : "border-slate-600 bg-slate-800 text-slate-300",
                ].join(" ")}
              >
                {isCompleted ? "✅" : isLocked ? <LockIcon /> : "⟡"}
                {isCompleted
                  ? "Tamamlandı"
                  : isActive
                    ? "Devam Ediyor"
                    : "Kilitli"}
              </span>

              {adventure.isBookFinalized ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full space-y-3"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(16, 185, 129, 0)",
                        "0 0 28px rgba(16, 185, 129, 0.34)",
                        "0 0 0 rgba(16, 185, 129, 0)",
                      ],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.1 }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/60 bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-100"
                  >
                    🏆 Tüm Rozetler Kazanıldı!
                  </motion.div>

                  {adventure.finalTitleBadge ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: [
                          "0 0 0 rgba(250, 204, 21, 0)",
                          "0 0 30px rgba(250, 204, 21, 0.38)",
                          "0 0 0 rgba(250, 204, 21, 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.9,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                      }}
                      className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-yellow-300/60 bg-yellow-300/15 px-4 py-2 text-sm font-black text-yellow-100"
                    >
                      {adventure.finalTitleBadge}
                    </motion.div>
                  ) : null}
                </motion.div>
              ) : adventure.earnedBadgeCount !== undefined &&
                adventure.totalBadgeCount !== undefined ? (
                <>
                  <span className="rounded-full border border-amber-300/35 bg-slate-900/75 px-3 py-1.5 text-sm font-black text-amber-100">
                    🏅 {adventure.earnedBadgeCount} / {adventure.totalBadgeCount} Rozet
                  </span>
                  <span className="rounded-full border border-sky-300/25 bg-slate-900/75 px-3 py-1.5 text-sm font-semibold text-sky-100">
                    ⚡ Son Kazanılan: {adventure.lastEarnedBadge ?? "Henüz yok"}
                  </span>
                </>
              ) : adventure.badge ? (
                <span className="rounded-full border border-amber-300/30 bg-slate-900/70 px-3 py-1.5 text-sm font-semibold text-amber-100">
                  {adventure.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-auto">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-300">
                <span>İlerleme</span>
                <span>{adventure.progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${adventure.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.06 }}
                  className={[
                    "h-full rounded-full bg-gradient-to-r",
                    isLocked
                      ? "from-slate-600 to-slate-500"
                      : isCompleted
                        ? "from-emerald-400 to-teal-200"
                        : "from-amber-300 to-orange-300",
                  ].join(" ")}
                />
              </div>
            </div>

            {isCompleted ? (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.3 + index * 0.08 }}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-400/30"
              >
                <CheckIcon />
              </motion.div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function BookJourneyModal({
  isOpen,
  onClose,
  bookTitle = "Hz. Ebû Bekir",
  description = "Bölümler sırayla açılır. Tamamlanan duraklar parlar, yeni duraklar keşif için seni bekler.",
  chapterStops,
  progress,
  showFinalTest = true,
  onChapterClick,
  onLockedChapterClick,
  onLockedFinalTestClick,
  onFinalTestClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
  description?: string;
  chapterStops: ChapterStop[];
  progress: number;
  showFinalTest?: boolean;
  onChapterClick: (chapterId: string) => void;
  onLockedChapterClick: () => void;
  onLockedFinalTestClick: () => void;
  onFinalTestClick: () => void;
}) {
  const isFinalTestUnlocked = progress === 100;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 px-4 py-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.section
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-amber-300/25 bg-slate-950 shadow-2xl shadow-amber-950/50"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-journey-title"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(251,191,36,0.2),transparent_34%),radial-gradient(circle_at_86%_16%,rgba(56,189,248,0.12),transparent_30%)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Pencereyi kapat"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-amber-200/25 bg-slate-900/80 text-amber-100 shadow-lg shadow-slate-950/30 transition hover:border-amber-200/60 hover:bg-amber-300/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              ×
            </button>

            <div className="relative border-b border-white/10 px-5 pb-5 pt-7 sm:px-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-200/80">
                Kitap Yolculuk Penceresi
              </p>
              <h2
                id="book-journey-title"
                className="text-3xl font-black tracking-normal text-white sm:text-4xl"
              >
                {bookTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                {description}
              </p>
            </div>

            <div className="relative overflow-y-auto px-5 py-5 sm:px-7">
              <div className="relative space-y-4 pb-2">
                <div className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-emerald-300 via-amber-300 to-slate-700/70" />

                {chapterStops.map((stop) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: Number(stop.id) * 0.015 }}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-3"
                  >
                    <motion.div
                      animate={
                        stop.isNewlyUnlocked
                          ? {
                              scale: [1, 1.16, 1],
                              boxShadow: [
                                "0 0 0 rgba(250, 204, 21, 0)",
                                "0 0 28px rgba(250, 204, 21, 0.5)",
                                "0 0 0 rgba(250, 204, 21, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.1,
                        repeat: stop.isNewlyUnlocked ? 2 : 0,
                      }}
                      className={[
                        "relative z-10 mt-5 grid h-10 w-10 place-items-center rounded-full border",
                        stop.isCompleted
                          ? "border-emerald-300/50 bg-emerald-400/20 text-emerald-100"
                          : stop.isUnlocked
                            ? "border-amber-300/60 bg-amber-400/20 text-amber-100"
                            : "border-slate-600 bg-slate-900 text-slate-500",
                      ].join(" ")}
                    >
                      {stop.isCompleted ? <CheckIcon /> : stop.isUnlocked ? "✦" : <LockIcon />}
                    </motion.div>

                    <div
                      className={[
                        "rounded-2xl border p-4 shadow-lg",
                        stop.isUnlocked
                          ? "border-amber-300/25 bg-slate-900/80 shadow-amber-950/20"
                          : "border-slate-700/70 bg-slate-900/45 shadow-slate-950/20",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Bölüm {stop.id}
                          </p>
                          <h3
                            className={[
                              "mt-1 text-lg font-black tracking-normal",
                              stop.isUnlocked ? "text-white" : "text-slate-500",
                            ].join(" ")}
                          >
                            {stop.title}
                          </h3>
                          <div
                            className={[
                              "mt-2 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold leading-6",
                              stop.isCompleted
                                ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100 shadow-lg shadow-emerald-950/20"
                                : "border-slate-700 bg-slate-950/60 text-slate-500",
                            ].join(" ")}
                          >
                            <motion.span
                              animate={
                                stop.isCompleted
                                  ? {
                                      scale: [1, 1.12, 1],
                                      filter: [
                                        "drop-shadow(0 0 0 rgba(250,204,21,0))",
                                        "drop-shadow(0 0 8px rgba(250,204,21,0.55))",
                                        "drop-shadow(0 0 0 rgba(250,204,21,0))",
                                      ],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 1.5,
                                repeat: stop.isCompleted ? Infinity : 0,
                                repeatDelay: 1.4,
                              }}
                              className="shrink-0"
                            >
                              {stop.isCompleted ? "✨🏅" : "🔒 🏅"}
                            </motion.span>
                            <span className="min-w-0 truncate">
                              {stop.badgeName}
                              {stop.isCompleted ? " kazanıldı" : ""}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!stop.isUnlocked) {
                              onLockedChapterClick();
                              return;
                            }

                            onChapterClick(stop.id);
                          }}
                          className={[
                            "shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-amber-300",
                            stop.isUnlocked
                              ? "bg-amber-300 text-slate-950 hover:bg-amber-200"
                              : "cursor-not-allowed border border-slate-700 bg-slate-900 text-slate-500",
                          ].join(" ")}
                        >
                          {stop.isUnlocked ? "Maceraya Başla" : "Kilitli"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {showFinalTest ? (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.22 }}
                  className="relative grid grid-cols-[2.5rem_1fr] gap-3 pt-2"
                >
                  <motion.div
                    animate={
                      isFinalTestUnlocked
                        ? {
                            scale: [1, 1.14, 1],
                            boxShadow: [
                              "0 0 0 rgba(250, 204, 21, 0)",
                              "0 0 34px rgba(250, 204, 21, 0.6)",
                              "0 0 0 rgba(250, 204, 21, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.4,
                      repeat: isFinalTestUnlocked ? Infinity : 0,
                      repeatDelay: 1.2,
                    }}
                    className={[
                      "relative z-10 mt-5 grid h-10 w-10 place-items-center rounded-full border text-lg",
                      isFinalTestUnlocked
                        ? "border-yellow-300 bg-yellow-300/20 text-yellow-100"
                        : "border-slate-600 bg-slate-900 text-slate-500",
                    ].join(" ")}
                  >
                    {isFinalTestUnlocked ? "🏆" : <LockIcon />}
                  </motion.div>

                  <div
                    className={[
                      "relative overflow-hidden rounded-2xl border p-4 shadow-lg",
                      isFinalTestUnlocked
                        ? "border-yellow-300/60 bg-yellow-300/10 shadow-yellow-950/30"
                        : "border-slate-700/70 bg-slate-900/45 shadow-slate-950/20",
                    ].join(" ")}
                  >
                    {isFinalTestUnlocked ? (
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(250,204,21,0.24),transparent_36%)]" />
                    ) : null}
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200/80">
                          Büyük Final
                        </p>
                        <h3
                          className={[
                            "mt-1 text-xl font-black tracking-normal",
                            isFinalTestUnlocked ? "text-yellow-100" : "text-slate-500",
                          ].join(" ")}
                        >
                          🏆 Kitap Final Testi
                        </h3>
                        <p
                          className={[
                            "mt-1 text-sm leading-6",
                            isFinalTestUnlocked ? "text-yellow-100/80" : "text-slate-500",
                          ].join(" ")}
                        >
                          {isFinalTestUnlocked
                            ? "13 soruluk büyük test seni bekliyor"
                            : "Tüm bölümleri tamamlayınca açılır"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!isFinalTestUnlocked) {
                            onLockedFinalTestClick();
                            return;
                          }

                          onFinalTestClick();
                        }}
                        className={[
                          "shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-yellow-300",
                          isFinalTestUnlocked
                            ? "bg-yellow-300 text-slate-950 hover:bg-yellow-200"
                            : "cursor-not-allowed border border-slate-700 bg-slate-900 text-slate-500",
                        ].join(" ")}
                      >
                        {isFinalTestUnlocked ? "Teste Başla" : "Kilitli"}
                      </button>
                    </div>
                  </div>
                </motion.div>
                ) : null}
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shakingCardId, setShakingCardId] = useState<number | null>(null);
  const [selectedChildProfile, setSelectedChildProfile] =
    useState<SelectedChildProfile>(defaultChildProfile);
  const [globalProfileStats, setGlobalProfileStats] =
    useState<GlobalProfileStats>(defaultGlobalProfileStats);
  const [bookProgressByAdventure, setBookProgressByAdventure] = useState<
    Record<number, AdventureProgress>
  >({});
  const [isProfileProgressLoading, setIsProfileProgressLoading] = useState(true);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  const [newlyUnlockedChapter, setNewlyUnlockedChapter] = useState<string | null>(null);
  const [activeBookModal, setActiveBookModal] = useState<ActiveBookModal>(null);
  const [finalTitleBadge, setFinalTitleBadge] = useState<string | null>(null);
  const [finalTitleByBook, setFinalTitleByBook] = useState<Record<string, string | null>>(
    {},
  );
  const [newlyUnlockedBookId, setNewlyUnlockedBookId] = useState<number | null>(null);

  useEffect(() => {
    async function loadSelectedChildProgress() {
      const selectedProfileId = window.localStorage.getItem(
        "selected_child_profile_id",
      );
      const selectedProfileName = window.localStorage.getItem(
        "selected_child_profile_name",
      );

      if (!selectedProfileId) {
        router.push("/dashboard");
        return;
      }

      setIsProfileProgressLoading(true);
      setSelectedChildProfile({
        ...defaultChildProfile,
        id: selectedProfileId,
        name: selectedProfileName || defaultChildProfile.name,
      });

      const [profileResult, booksResult, progressResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("isim, avatar_tipi, unvan")
          .eq("id", selectedProfileId)
          .maybeSingle(),
        supabase.from("books").select("id, isim, toplam_bolum"),
        supabase
          .from("user_progress")
          .select(
            "book_id, tamamlanan_bolum_sayisi, yuzde, bitti_mi, final_title, final_score, final_badge",
          )
          .eq("profile_id", selectedProfileId),
      ]);

      if (profileResult.data) {
        setSelectedChildProfile({
          id: selectedProfileId,
          name: profileResult.data.isim ?? selectedProfileName ?? "Gezgin",
          avatarType: profileResult.data.avatar_tipi ?? "lantern",
          title: profileResult.data.unvan ?? "Yeni Gezgin",
        });
      }

      if (profileResult.error || booksResult.error || progressResult.error) {
        setWarning("Profil ilerlemesi yüklenirken bir sorun oldu.");
      }

      const books = (booksResult.data ?? []) as BookRow[];
      const progressRows = (progressResult.data ?? []) as UserProgressRow[];
      const progressByBookId = new Map(
        progressRows.map((progress) => [progress.book_id, progress]),
      );
      const computedProgress = adventures.reduce<Record<number, AdventureProgress>>(
        (result, adventure) => {
          const keywords = adventureBookKeywords[adventure.id] ?? [];
          const matchedBook = books.find((book) => {
            const normalizedName = normalizeText(book.isim);
            return keywords.some((keyword) => normalizedName.includes(keyword));
          });
          const totalCount =
            matchedBook?.toplam_bolum && matchedBook.toplam_bolum > 0
              ? matchedBook.toplam_bolum
              : localTotalChapterCounts[adventure.id] ?? 1;
          const progressRow = matchedBook
            ? progressByBookId.get(matchedBook.id)
            : undefined;
          const remoteCompletedCount = Math.min(
            totalCount,
            Math.max(0, progressRow?.tamamlanan_bolum_sayisi ?? 0),
          );
          const completedCount = remoteCompletedCount;
          const progress =
            progressRow?.yuzde !== null && progressRow?.yuzde !== undefined
              ? Math.max(
                  clampProgress(progressRow.yuzde),
                  clampProgress((completedCount / totalCount) * 100),
                )
              : clampProgress((completedCount / totalCount) * 100);

          result[adventure.id] = {
            completedCount,
            totalCount,
            progress,
            isFinished: Boolean(progressRow?.bitti_mi),
          };

          return result;
        },
        {},
      );

      const globalProgressItems =
        books.length > 0
          ? books.map((book) => {
              const matchedAdventureId = getMatchedAdventureId(book.isim);
              const progressRow = progressByBookId.get(book.id);
              const totalCount =
                book.toplam_bolum && book.toplam_bolum > 0
                  ? book.toplam_bolum
                  : matchedAdventureId
                    ? localTotalChapterCounts[matchedAdventureId]
                    : 1;
              const completedCount = Math.min(
                totalCount,
                Math.max(progressRow?.tamamlanan_bolum_sayisi ?? 0),
              );

              return {
                completedCount,
                totalCount,
                isFinished: Boolean(progressRow?.bitti_mi),
              };
            })
          : Object.values(computedProgress);
      const nextGlobalStatsBase = globalProgressItems.reduce(
        (stats, item) => ({
          earnedBadgeCount: stats.earnedBadgeCount + item.completedCount,
          totalBadgeCount: stats.totalBadgeCount + item.totalCount,
          completedBookCount: stats.completedBookCount + (item.isFinished ? 1 : 0),
          totalBookCount: stats.totalBookCount + 1,
        }),
        {
          earnedBadgeCount: 0,
          totalBadgeCount: 0,
          completedBookCount: 0,
          totalBookCount: 0,
        },
      );
      const nextGlobalStats: GlobalProfileStats = {
        ...nextGlobalStatsBase,
        title: getGlobalProfileTitle(nextGlobalStatsBase),
      };

      setBookProgressByAdventure(computedProgress);
      setGlobalProfileStats(nextGlobalStats);
      setCompletedChapters(
        Object.fromEntries(
          ebubekirChapterCatalog.map((chapter, index) => [
            chapter.id,
            index < (computedProgress[3]?.completedCount ?? 0),
          ]),
        ),
      );

      const finalTitles = adventures.reduce<Record<string, string | null>>(
        (titles, adventure) => {
          const bookKey = adventureBookKeys[adventure.id];
          if (!bookKey) return titles;

          const matchedBook = books.find((book) => {
            const normalizedName = normalizeText(book.isim);
            return (adventureBookKeywords[adventure.id] ?? []).some((keyword) =>
              normalizedName.includes(keyword),
            );
          });
          const progressRow = matchedBook
            ? progressByBookId.get(matchedBook.id)
            : undefined;

          titles[bookKey] = progressRow?.final_title ?? null;
          return titles;
        },
        {},
      );
      const earnedFinalTitle = finalTitles.ebubekir ?? null;
      const queryParams = new URLSearchParams(window.location.search);
      const completedBook = queryParams.get("completedBook") as ActiveBookModal;
      const completedChapterId = queryParams.get("chapter");
      const completedBadge = queryParams.get("badge");
      const newFinalBook = queryParams.get("final");

      setFinalTitleByBook(finalTitles);
      setFinalTitleBadge(earnedFinalTitle);
      setSelectedChildProfile((current) => ({
        ...current,
        title: nextGlobalStats.title,
      }));

      if (profileResult.data?.unvan !== nextGlobalStats.title) {
        await supabase
          .from("profiles")
          .update({ unvan: nextGlobalStats.title })
          .eq("id", selectedProfileId);
      }

      if (completedBook && completedChapterId) {
        const completedIndex = ebubekirChapterCatalog.findIndex(
          (chapter) => chapter.id === completedChapterId,
        );
        const completedChapter = ebubekirChapterCatalog[completedIndex];
        const nextChapter = ebubekirChapterCatalog[completedIndex + 1];

        setSuccess(
          `${completedBadge || completedChapter?.badgeName || "Rozet"} haritana işlendi!`,
        );
        setNewlyUnlockedChapter(
          completedBook === "ebubekir" ? (nextChapter?.id ?? null) : null,
        );
        setActiveBookModal(completedBook);
      }

      if (newFinalBook) {
        const title =
          finalTitles[newFinalBook] ??
          "Final Unvanı";
        setSuccess(`${title} unvanı haritana işlendi!`);
        setActiveBookModal(null);
        setNewlyUnlockedBookId(newFinalBook === "ebubekir" ? 4 : null);
        window.setTimeout(() => setNewlyUnlockedBookId(null), 2600);
      }

      if (completedBook || newFinalBook) {
        window.history.replaceState(null, "", "/map");
      }

      setIsProfileProgressLoading(false);
    }

    loadSelectedChildProgress();
  }, [router]);

  useEffect(() => {
    if (!success) return undefined;

    const timer = window.setTimeout(() => {
      setSuccess(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [success]);

  const ebubekirProgressData = bookProgressByAdventure[3] ?? {
    completedCount: 0,
    totalCount: ebubekirChapterCatalog.length,
    progress: 0,
    isFinished: false,
  };
  const completedEbubekirCount = ebubekirProgressData.completedCount;
  const ebubekirProgress = ebubekirProgressData.progress;
  const isEbubekirFinalized = ebubekirProgressData.isFinished;
  const visibleEarnedBadgeCount = Object.values(bookProgressByAdventure).reduce(
    (total, progress) => total + progress.completedCount,
    0,
  );
  const visibleCompletedBookCount = Object.values(bookProgressByAdventure).filter(
    (progress) => progress.isFinished,
  );
  const totalEarnedBadgeCount =
    globalProfileStats.totalBookCount > 0
      ? globalProfileStats.earnedBadgeCount
      : visibleEarnedBadgeCount;
  const totalCompletedBookCountValue =
    globalProfileStats.totalBookCount > 0
      ? globalProfileStats.completedBookCount
      : visibleCompletedBookCount.length;
  const ebubekirChapterStops: ChapterStop[] = ebubekirChapterCatalog.map(
    (chapter, index) => {
      const isUnlocked = index <= completedEbubekirCount;

      return {
        ...chapter,
        isUnlocked,
        isCompleted: Boolean(completedChapters[chapter.id]),
        isNewlyUnlocked: chapter.id === newlyUnlockedChapter,
      };
    },
  );

  function buildChapterStops(catalog: ChapterStop[], adventureId: number) {
    const progressData = bookProgressByAdventure[adventureId] ?? {
      completedCount: 0,
      totalCount: catalog.length,
      progress: 0,
      isFinished: false,
    };

    return catalog.map((chapter, index) => ({
      ...chapter,
      isCompleted: index < progressData.completedCount || progressData.isFinished,
      isUnlocked: index <= progressData.completedCount || progressData.isFinished,
      isNewlyUnlocked: false,
    }));
  }

  const ademChapterStops = buildChapterStops(ademChapterCatalog, 1);
  const nuhChapterStops = buildChapterStops(nuhChapterCatalog, 2);
  const omerChapterStops = buildChapterStops(omerChapterCatalog, 4);

  function getLatestEarnedBadgeName(adventureId: number, completedCount: number) {
    const catalogByAdventure: Record<number, { badgeName: string }[]> = {
      1: ademChapterCatalog,
      2: nuhChapterCatalog,
      3: ebubekirChapterCatalog,
      4: omerChapterCatalog,
    };
    const catalog = catalogByAdventure[adventureId];

    if (!catalog || completedCount <= 0) return undefined;

    return catalog[Math.min(completedCount, catalog.length) - 1]?.badgeName;
  }

  const visibleAdventures = adventures.map((adventure, index) => {
    const progressData = bookProgressByAdventure[adventure.id] ?? {
      completedCount: 0,
      totalCount: localTotalChapterCounts[adventure.id] ?? 1,
      progress: 0,
      isFinished: false,
    };
    const previousAdventure = adventures[index - 1];
    const previousProgress = previousAdventure
      ? bookProgressByAdventure[previousAdventure.id]
      : undefined;
    const hasStarted = progressData.completedCount > 0 || progressData.progress > 0;
    const isUnlocked =
      adventure.id === 1 || Boolean(previousProgress?.isFinished) || hasStarted;
    const status: AdventureStatus = progressData.isFinished
      ? "completed"
      : isUnlocked
        ? "active"
        : "locked";
    const bookKey = adventureBookKeys[adventure.id];
    const finalTitle =
      bookKey && bookKey !== "omer" ? finalTitleByBook[bookKey] : undefined;

    return {
      ...adventure,
      status,
      progress: progressData.progress,
      badge:
        adventure.id === 4 && status === "active" && isEbubekirFinalized
          ? "Yeni kitap açıldı"
          : status === "completed"
            ? adventure.badge
            : undefined,
      earnedBadgeCount:
        adventure.id === 3 ? completedEbubekirCount : progressData.completedCount,
      totalBadgeCount:
        adventure.id === 3 ? ebubekirChapterCatalog.length : progressData.totalCount,
      lastEarnedBadge: getLatestEarnedBadgeName(
        adventure.id,
        adventure.id === 3 ? completedEbubekirCount : progressData.completedCount,
      ),
      isBookFinalized: Boolean(finalTitle),
      isNewlyUnlockedBook: newlyUnlockedBookId === adventure.id,
      finalTitleBadge: finalTitle ?? undefined,
      accent:
        adventure.id === 4 && status !== "locked"
          ? "from-emerald-200 via-amber-200 to-yellow-300"
          : adventure.accent,
      symbol: adventure.id === 4 && status !== "locked" ? "✦" : adventure.symbol,
    };
  });

  function handleLockedCardClick(id: number) {
    setWarning("Bu maceraya başlamak için önceki durakları tamamlamalısın!");
    setShakingCardId(id);

    window.setTimeout(() => setShakingCardId(null), 460);
    window.setTimeout(() => setWarning(null), 2600);
  }

  function showTemporaryWarning(message: string) {
    setWarning(message);
    window.setTimeout(() => setWarning(null), 2600);
  }

  function handleLockedFinalTestClick() {
    showTemporaryWarning("Kitap Final Testi için önce bütün bölümleri tamamlamalısın!");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_80%_8%,rgba(56,189,248,0.14),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.7))]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.78)_1px,transparent_1px),radial-gradient(rgba(251,191,36,0.45)_1px,transparent_1px)] [background-position:0_0,36px_54px] [background-size:78px_78px,112px_112px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-500/10 via-sky-300/5 to-transparent blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="mb-12 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-slate-950/40 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
              <LanternAvatar />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/80">
                  {selectedChildProfile.title}
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-normal text-white">
                  {selectedChildProfile.name}
                </h1>
              </div>
            </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-80">
            <div className="rounded-xl border border-amber-300/20 bg-slate-900/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Değer Rozeti
              </p>
              <p className="mt-1 text-xl font-black text-amber-100">
                🏅 {totalEarnedBadgeCount} Rozet
              </p>
            </div>
            <div className="rounded-xl border border-sky-300/20 bg-slate-900/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Kitaplar
              </p>
              <p className="mt-1 flex items-center gap-2 text-xl font-black text-sky-100">
                <BookIcon /> {totalCompletedBookCountValue} Tamamlandı
              </p>
            </div>
          </div>
        </header>

        {isProfileProgressLoading ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-sky-300/20 bg-slate-900/70 px-5 py-4 text-sm font-bold text-sky-100 shadow-lg shadow-slate-950/30"
          >
            {selectedChildProfile.name} için harita ilerlemesi hazırlanıyor...
          </motion.div>
        ) : null}

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-200">
            Ana Harita
          </p>
          <h2 className="text-4xl font-black tracking-normal text-white sm:text-6xl">
            Keşif Dünyası
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300 sm:text-xl">
            Her durak yeni bir hayat dersi saklıyor. Tamamlanan maceralar parlar,
            devam eden yol seni çağırır, kilitli kapılar ise önceki görevleri bekler.
          </p>
        </section>

        <AnimatePresence>
          {warning || success ? (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className={[
                "fixed left-1/2 top-6 z-[60] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border bg-slate-900/95 px-5 py-4 text-center text-base font-bold shadow-2xl backdrop-blur",
                success
                  ? "border-emerald-300/40 text-emerald-100 shadow-emerald-950/40"
                  : "border-amber-300/40 text-amber-100 shadow-amber-950/40",
              ].join(" ")}
              role="status"
            >
              {success ?? warning}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="relative pb-20 pt-4">
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-300 via-amber-300 to-slate-700 opacity-50 md:block" />
          <div className="space-y-8 md:space-y-12">
            {visibleAdventures.map((adventure, index) => (
              <AdventureCardItem
                key={adventure.id}
                adventure={adventure}
                index={index}
                isShaking={shakingCardId === adventure.id}
                onLockedClick={handleLockedCardClick}
                onActiveClick={
                  adventure.id === 1
                    ? () => setActiveBookModal("adem")
                    : adventure.id === 2
                      ? () => setActiveBookModal("nuh")
                      : adventure.id === 3
                    ? () => setActiveBookModal("ebubekir")
                    : adventure.id === 4 && adventure.status !== "locked"
                      ? () => setActiveBookModal("omer")
                      : undefined
                }
              />
            ))}
          </div>
        </section>
      </div>

      <BookJourneyModal
        isOpen={activeBookModal === "adem"}
        onClose={() => setActiveBookModal(null)}
        bookTitle="Hz. Adem"
        description="İlk insanın öğrenme, sorumluluk ve tövbe yolculuğunu 5 kısa demo bölümle keşfet."
        chapterStops={ademChapterStops}
        progress={bookProgressByAdventure[1]?.progress ?? 0}
        onChapterClick={(chapterId) => router.push(`/reader/adem-${chapterId}`)}
        onLockedChapterClick={() => handleLockedCardClick(1)}
        onLockedFinalTestClick={handleLockedFinalTestClick}
        onFinalTestClick={() => router.push("/quiz/adem")}
      />
      <BookJourneyModal
        isOpen={activeBookModal === "nuh"}
        onClose={() => setActiveBookModal(null)}
        bookTitle="Hz. Nuh"
        description="Sabır, emek ve güven değerlerini 5 kısa demo bölümle takip et."
        chapterStops={nuhChapterStops}
        progress={bookProgressByAdventure[2]?.progress ?? 0}
        onChapterClick={(chapterId) => router.push(`/reader/nuh-${chapterId}`)}
        onLockedChapterClick={() => handleLockedCardClick(2)}
        onLockedFinalTestClick={handleLockedFinalTestClick}
        onFinalTestClick={() => router.push("/quiz/nuh")}
      />
      <BookJourneyModal
        isOpen={activeBookModal === "ebubekir"}
        onClose={() => setActiveBookModal(null)}
        chapterStops={ebubekirChapterStops}
        progress={ebubekirProgress}
        onChapterClick={(chapterId) => router.push(`/test-reader?chapter=${chapterId}`)}
        onLockedChapterClick={() => handleLockedCardClick(3)}
        onLockedFinalTestClick={handleLockedFinalTestClick}
        onFinalTestClick={() => router.push("/quiz/ebubekir")}
      />
      <BookJourneyModal
        isOpen={activeBookModal === "omer"}
        onClose={() => setActiveBookModal(null)}
        bookTitle="Hz. Ömer"
        description="Bu kitap yeni açıldı. Şimdilik demo durakları görüyorsun; gerçek bölümler bağlandığında yolculuk buradan devam edecek."
        chapterStops={omerChapterStops}
        progress={bookProgressByAdventure[4]?.progress ?? 0}
        showFinalTest={false}
        onChapterClick={() =>
          showTemporaryWarning(
            "Hz. Ömer kitabı demo olarak açıldı. Bölümler yakında bağlanacak!",
          )
        }
        onLockedChapterClick={() => handleLockedCardClick(4)}
        onLockedFinalTestClick={() =>
          showTemporaryWarning(
            "Hz. Ömer final testi için önce demo bölümleri tamamlamalısın!",
          )
        }
        onFinalTestClick={() =>
          showTemporaryWarning("Hz. Ömer final testi yakında bu kapıdan açılacak!")
        }
      />
    </main>
  );
}
