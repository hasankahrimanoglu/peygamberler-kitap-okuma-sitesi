"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Buton,
  DurumCipi,
  IlerlemeCubugu,
  Kart,
  OdulIkonu,
} from "../../src/components/ui";

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

// PROJE-MODELI.md Bölüm 2 — unvan, tamamlanan kitap sayısına bağlıdır (puan yok)
function getGlobalProfileTitle({
  completedBookCount,
}: Omit<GlobalProfileStats, "title">) {
  if (completedBookCount >= 15) return "Hikâye Ustası";
  if (completedBookCount >= 10) return "Bilge Yolcu";
  if (completedBookCount >= 6) return "Yol Arkadaşı";
  if (completedBookCount >= 3) return "Değer Toplayıcısı";
  if (completedBookCount >= 1) return "Yol Kaşifi";
  return "Yeni Gezgin";
}

function getMatchedAdventureId(bookName: string) {
  const normalizedName = normalizeText(bookName);
  const matchedEntry = Object.entries(adventureBookKeywords).find(([, keywords]) =>
    keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  return matchedEntry ? Number(matchedEntry[0]) : null;
}

function unvanAnahtari(unvan: string) {
  return normalizeText(unvan).replaceAll(" ", "-");
}

function KapakMini({
  bookKey,
  title,
}: {
  bookKey: string | null;
  title: string;
}) {
  const [kaynak, setKaynak] = useState(
    bookKey ? `/kapaklar/kapak-${bookKey}.png` : "/kapaklar/placeholder.svg",
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={kaynak}
      alt={`${title} kitap kapağı`}
      onError={() => {
        if (kaynak !== "/kapaklar/placeholder.svg")
          setKaynak("/kapaklar/placeholder.svg");
      }}
      className="w-24 shrink-0 rounded-lg shadow-kart-gece sm:w-28"
      draggable={false}
    />
  );
}

function KitapKarti({
  adventure,
  bookKey,
  oncekiAd,
  isShaking,
  onLockedClick,
  onOpen,
}: {
  adventure: AdventureCard;
  bookKey: string | null;
  oncekiAd: string | null;
  isShaking: boolean;
  onLockedClick: (id: number) => void;
  onOpen?: () => void;
}) {
  const kilitli = adventure.status === "locked";
  const tamamlandi = adventure.status === "completed";
  const hicBaslamadi =
    adventure.status === "active" && (adventure.earnedBadgeCount ?? 0) === 0;
  const tiklanabilir = !kilitli && Boolean(onOpen);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isShaking ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-w-0 flex-1"
    >
      <Kart
        parlak={adventure.status === "active"}
        kilitli={kilitli}
        dolgu="genis"
        role="button"
        tabIndex={0}
        aria-label={
          kilitli ? `${adventure.name} kilitli` : `${adventure.name} kitabını aç`
        }
        onClick={() => {
          if (kilitli) onLockedClick(adventure.id);
          else onOpen?.();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (kilitli) onLockedClick(adventure.id);
            else onOpen?.();
          }
        }}
        className={tiklanabilir ? "cursor-pointer" : kilitli ? "cursor-not-allowed" : ""}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex justify-center sm:block">
            <KapakMini bookKey={bookKey} title={adventure.name} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-baslik text-xs font-semibold uppercase tracking-widest text-vurgu">
              {adventure.id}. Kitap
            </p>
            <h2 className="font-baslik text-2xl font-bold sm:text-3xl">
              {adventure.name}
            </h2>
            <p className="font-govde text-sm text-murekkep-soluk">
              {adventure.subtitle}
            </p>

            {!kilitli ? (
              <>
                <IlerlemeCubugu
                  className="mt-4 max-w-md"
                  yuzde={adventure.progress}
                  etiket={`${adventure.earnedBadgeCount ?? 0} / ${adventure.totalBadgeCount ?? 0} bölüm tamamlandı`}
                />
                <p className="mt-2 font-govde text-sm text-murekkep-soluk">
                  🏅 {adventure.earnedBadgeCount ?? 0} Kazanılan Rozet
                </p>
              </>
            ) : (
              <p className="mt-4 flex items-center gap-2 font-govde text-sm text-murekkep-soluk">
                🔒 Kilidi henüz açılmadı
              </p>
            )}
          </div>

          <div className="w-full shrink-0 sm:w-60">
            {tamamlandi ? (
              <div className="rounded-buton border border-altin-400/50 bg-yuzey-2 p-4 text-center">
                <p className="font-baslik text-[11px] font-semibold uppercase tracking-widest text-vurgu">
                  Kazanılan Madalya
                </p>
                <div className="mt-2 flex justify-center">
                  <OdulIkonu
                    tip="madalya"
                    anahtar={bookKey ?? "kitap"}
                    boyut={64}
                    kazanildi
                  />
                </div>
                <p className="mt-1 font-baslik text-sm font-bold text-vurgu">
                  {adventure.name} Madalyası
                </p>
                <Buton
                  varyant="cerceve"
                  boyut="kucuk"
                  tamGenislik
                  className="mt-3"
                >
                  Tekrar Oku
                </Buton>
              </div>
            ) : kilitli ? (
              <div className="rounded-buton border border-cizgi bg-yuzey-2 p-4 text-center">
                <p className="font-baslik text-[11px] font-semibold uppercase tracking-widest text-murekkep-soluk">
                  Açılma Koşulu
                </p>
                <p className="mt-2 font-govde text-sm text-murekkep-soluk">
                  {oncekiAd
                    ? `${oncekiAd} kitabındaki Büyük Final Testi'ni tamamladığında bu kitap açılacak.`
                    : "Önceki kitabı tamamladığında bu kitap açılacak."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-stretch gap-2.5">
                <DurumCipi
                  durum={hicBaslamadi ? "yeni" : "devam"}
                  className="self-center sm:self-end"
                />
                <Buton varyant={hicBaslamadi ? "altin" : "eylem"} tamGenislik>
                  {hicBaslamadi ? "Yolculuğa Başla ✦" : "Devam Et →"}
                </Buton>
              </div>
            )}
          </div>
        </div>
      </Kart>
    </motion.article>
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

  function cikisYap() {
    window.localStorage.removeItem("selected_child_profile_id");
    window.localStorage.removeItem("selected_child_profile_name");
    router.push("/dashboard");
  }

  return (
    <main className="tema-cocuk zemin-yildizli relative min-h-screen text-murekkep">
      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-8">
        <header className="mb-10">
          <Kart className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Sol: avatar + isim */}
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-altin-400/60 bg-yuzey-2">
                <OdulIkonu
                  tip="avatar"
                  anahtar={selectedChildProfile.avatarType}
                  boyut={58}
                  alt={`${selectedChildProfile.name} avatarı`}
                />
              </div>
              <div>
                <p className="font-govde text-sm text-murekkep-soluk">Merhaba,</p>
                <h1 className="font-baslik text-2xl font-bold">
                  {selectedChildProfile.name}!
                </h1>
              </div>
            </div>

            {/* Orta: UNVAN VİTRİNİ — her unvanın kendi ikonu var */}
            <div className="flex items-center gap-3 self-center rounded-kart border border-altin-400/60 bg-yuzey-2 px-5 py-2.5 shadow-parlama">
              <OdulIkonu
                tip="unvan"
                anahtar={unvanAnahtari(selectedChildProfile.title)}
                boyut={52}
                alt=""
              />
              <div>
                <p className="font-baslik text-[11px] font-semibold uppercase tracking-[0.18em] text-vurgu">
                  Unvanın
                </p>
                <p className="font-baslik text-lg font-bold text-vurgu">
                  {selectedChildProfile.title}
                </p>
              </div>
            </div>

            {/* Sağ: sayaçlar + çıkış */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-buton bg-yuzey-2 px-4 py-2 text-center">
                <p className="font-baslik text-xl font-bold">
                  {totalEarnedBadgeCount}
                </p>
                <p className="font-govde text-xs text-murekkep-soluk">
                  Toplam Rozet
                </p>
              </div>
              <div className="rounded-buton bg-yuzey-2 px-4 py-2 text-center">
                <p className="font-baslik text-xl font-bold">
                  {totalCompletedBookCountValue}
                </p>
                <p className="font-govde text-xs text-murekkep-soluk">
                  Kitap Tamamlandı
                </p>
              </div>
              <Buton varyant="cerceve" boyut="kucuk" onClick={cikisYap}>
                Çıkış Yap
              </Buton>
            </div>
          </Kart>
        </header>

        {isProfileProgressLoading ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-kart border border-cizgi bg-yuzey px-5 py-4 font-govde text-sm text-murekkep-soluk"
          >
            {selectedChildProfile.name} için harita ilerlemesi hazırlanıyor...
          </motion.div>
        ) : null}

        <section className="mb-10 text-center">
          <h2 className="font-baslik text-4xl font-bold sm:text-5xl">
            ✦ Keşif Dünyası ✦
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-govde text-murekkep-soluk">
            Okuduğun kitaplarla yolculuğunu sürdür; yeni rozetler, madalyalar ve
            unvanlar kazan!
          </p>
        </section>

        <AnimatePresence>
          {warning || success ? (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className={[
                "fixed left-1/2 top-6 z-[60] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-kart border px-5 py-4 text-center font-baslik text-base font-bold shadow-kart-gece backdrop-blur",
                success
                  ? "border-eylem/60 bg-eylem-yumusak text-eylem"
                  : "border-altin-400/60 bg-gece-800 text-vurgu",
              ].join(" ")}
              role="status"
            >
              {success ?? warning}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Kitap yolu: dikey zaman çizgisi + kitap kartları */}
        <section className="relative pb-16">
          <div
            aria-hidden
            className="absolute bottom-8 left-[21px] top-2 w-0.5 border-l-2 border-dashed border-altin-400/40 sm:left-[25px]"
          />
          <ol className="space-y-6">
            {visibleAdventures.map((adventure, index) => {
              const bookKey = adventureBookKeys[adventure.id];
              const kilitli = adventure.status === "locked";
              const tamamlandi = adventure.status === "completed";

              return (
                <li key={adventure.id} className="relative flex gap-4 sm:gap-6">
                  <div
                    className={`relative z-10 mt-6 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-baslik text-base font-bold sm:h-[52px] sm:w-[52px] ${
                      tamamlandi
                        ? "border-altin-400 bg-vurgu-yumusak text-vurgu shadow-parlama"
                        : adventure.status === "active"
                          ? "border-eylem bg-eylem-yumusak text-eylem"
                          : "border-cizgi bg-yuzey text-murekkep-soluk"
                    }`}
                  >
                    {tamamlandi ? "✓" : kilitli ? "🔒" : adventure.id}
                  </div>

                  <KitapKarti
                    adventure={adventure}
                    bookKey={bookKey}
                    oncekiAd={adventures[index - 1]?.name ?? null}
                    isShaking={shakingCardId === adventure.id}
                    onLockedClick={handleLockedCardClick}
                    onOpen={
                      bookKey && adventure.status !== "locked"
                        ? () => router.push(`/kitap/${bookKey}`)
                        : undefined
                    }
                  />
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </main>
  );
}
