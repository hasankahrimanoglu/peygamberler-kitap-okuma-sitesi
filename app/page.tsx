"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GlossaryKey = "köle" | "servet" | "Ahad" | "Bilal" | "Ebû Bekir";

type ReadingSection = {
  title: string;
  paragraphs: string[];
};

type DecisionOption = {
  id: "a" | "b" | "c";
  text: string;
};

const glossary: Record<GlossaryKey, { label: string; meaning: string }> = {
  köle: {
    label: "Köle",
    meaning:
      "O dönemde özgürlüğü elinden alınmış, başkası tarafından alınıp satılan insan. Bu büyük bir haksızlıktı.",
  },
  servet: {
    label: "Servet",
    meaning:
      "Bir kişinin sahip olduğu büyük para, mal ve değerli şeylerin tamamı.",
  },
  Ahad: {
    label: "Ahad",
    meaning:
      '"Bir, tek" demektir. Bilal bu sözle Allah birdir diyordu.',
  },
  Bilal: {
    label: "Bilal",
    meaning:
      "İnancını bırakmayan, Ebû Bekir tarafından özgürlüğüne kavuşturulan güzel sesli sahabe.",
  },
  "Ebû Bekir": {
    label: "Ebû Bekir",
    meaning:
      "Peygamberimizin en yakın dostu; cömertliğiyle Bilal'i ve başka insanları özgürlüğüne kavuşturan sahabe.",
  },
};

const chapter = {
  eyebrow: "Hz. Ebû Bekir - Çocuklar İçin",
  title: "4. Bölüm - Özgürlüğe Kavuşanlar",
  audioTitle: "Bölüm 4 Sesli Anlatım",
  beforeDecision: [
    {
      title: "Zor Günler Başlıyor",
      paragraphs: [
        "Zaman geçtikçe Müslümanların sayısı yavaş yavaş artıyordu. Artık haber Mekke'de duyulmuştu: Muhammed, insanları putları bırakıp bir olan Allah'a inanmaya çağırıyordu.",
        "Mekke'nin ileri gelenleri buna çok kızdılar. Çünkü düzenleri bozuluyordu. Ama güçlü ailelerden gelen Müslümanlara kolay kolay dokunamıyorlardı.",
        'Bu yüzden öfkelerini en çok kimsesizlerden çıkardılar: kölelerden. O dönemde "köle" denen insanlar vardı. Bu insanlar çarşıda alınıp satılıyordu ve neredeyse hiçbir hakları yoktu.',
        "İslam, işte bu haksızlığa karşı çıktı. Ve bir insanı özgürlüğüne kavuşturmayı en büyük iyiliklerden saydı.",
      ],
    },
    {
      title: '"Bir! Bir!"',
      paragraphs: [
        "O köle insanlardan biri de Bilâl'di. Habeşistanlı, uzun boylu, gür sesli bir gençti. Bilâl, Müslüman olmuştu ve bunu saklamıyordu.",
        "Sahibi bunu öğrenince küplere bindi. Bilâl'e çölün kızgın kumlarında eziyet etmeye başladı; şöyle diyordu:",
        "— İnancından vazgeç!",
        "Ama Bilâl'in dudaklarından tek bir söz dökülüyordu. Fısıltıyla ama hiç durmadan aynı kelimeyi tekrarlıyordu:",
        "— Ahad!.. Ahad!..",
        'Yani: "Bir!.. Bir!.." Allah birdir, demek istiyordu. Bedeni onların elindeydi ama kalbine kimse dokunamıyordu.',
        "Dur ve düşün: Bilâl'in elinden her şeyi almışlardı. Ama bir şeyi asla alamadılar: inancını. Demek ki insanın en değerli hazinesi, kalbinde taşıdığıdır.",
      ],
    },
    {
      title: "Çarşıda Bir Karar",
      paragraphs: [
        "Bilâl'in çektikleri, Ebû Bekir'in kulağına gitti. Yüreği sızladı. Hemen çarşının yolunu tuttu.",
        "Bilâl'in sahibini buldu. Adam, Bilâl'den kurtulmak istiyordu ama karşısında Mekke'nin zengin tüccarını görünce fiyatı yükseltti. Hem de çok yükseltti.",
        "Ebû Bekir bir an durdu. İstenen para, büyük bir servetti.",
      ],
    },
  ] satisfies ReadingSection[],
  decision: {
    question:
      "Biriktirdiğin büyük bir paran var. Bu parayla bir insanı özgürlüğüne kavuşturabilirsin — ama adam senden çok fazla para istiyor. Ne yaparsın?",
    options: [
      {
        id: "a",
        text: "İstediği parayı öder, onu hemen özgür bırakırdım.",
      },
      {
        id: "b",
        text: "Pazarlık eder, fiyatı düşürmeye çalışırdım.",
      },
      {
        id: "c",
        text: "Önce eve gidip ailemle konuşur, sonra karar verirdim.",
      },
    ] satisfies DecisionOption[],
  },
  afterDecision: [
    {
      title: '"Daha Fazlasını İsteseydin Yine Öderdim"',
      paragraphs: [
        "Ebû Bekir bir saniye bile pazarlık yapmadı. İstenen parayı olduğu gibi saydı, verdi.",
        "Adam şaşırdı. Alaycı bir sesle güldü:",
        "— Sen ne yaptın? Ben onu çok daha ucuza da satardım!",
        "Ebû Bekir'in cevabı tarihe geçti:",
        "— Sen bunun on katını isteseydin, ben yine öderdim.",
        "Sonra Bilâl'e döndü. Gülümsedi ve o güzel cümleyi söyledi:",
        "— Artık özgürsün, ey Bilâl!",
        'Bilâl önce inanamadı. Sonra gözlerinden sevinç yaşları boşandı. Az önce bir "mal" gibi görülen insan, şimdi başı dik, hür bir insandı.',
        "Ebû Bekir için o paranın hiçbir önemi yoktu. Çünkü o gün parayla satın alınamayacak bir şey kazanmıştı: Bir insanın özgürlüğü ve Allah'ın rızası.",
      ],
    },
    {
      title: "Babasının Sorusu",
      paragraphs: [
        "Ebû Bekir bununla da kalmadı. Nerede eziyet gören bir Müslüman köle duysa, koşup onu satın alıyor ve anında özgür bırakıyordu.",
        "Ebû Bekir'in yaşlı babası, oğlunun servetinin eridiğini görüyordu. Bir gün dayanamayıp sordu:",
        "— Oğlum, madem köleleri özgür bırakıyorsun, bari güçlü kuvvetli olanları seç.",
        "Ebû Bekir'in cevabı, niyetinin aynasıydı:",
        "— Babacığım, ben onları kendim için özgür bırakmıyorum ki. Ben bunu Allah için yapıyorum.",
        "Bir iyiliği karşılığında ne alacağım diye değil, sadece iyilik olduğu için yapmak... İşte gerçek cömertlik bu.",
      ],
    },
    {
      title: "Susmayan Ses",
      paragraphs: [
        "Yıllar sonra neler olacağını Bilâl o gün bilmiyordu elbette.",
        'Ama gel, ben sana küçük bir sır vereyim: Çölde "Bir! Bir!" diye fısıldayan o ses, bir gün Medine\'de yükselecek ve bütün şehre ezan okuyacaktı.',
        "Şimdilik Mekke'de günler gittikçe zorlaşıyordu. Müslümanları çok çetin bir sabır sınavı bekliyordu...",
      ],
    },
  ] satisfies ReadingSection[],
  learned: [
    "İnsanın en değerli hazinesi kalbindekidir. Bilâl'in her şeyini aldılar ama inancını alamadılar.",
    'İyilik pazarlık kabul etmez. Ebû Bekir, "on katını isteseydin yine öderdim" dedi.',
    "Gerçek cömertlik, Allah için olandır. Ebû Bekir köleleri kendine destek olsun diye değil, Allah rızası için özgür bıraktı.",
    "Para biriktirilir, harcanır, biter; ama iyilik sonsuza kadar yaşar.",
  ],
};

const confettiPieces = [
  { left: "8%", delay: 0, color: "bg-rose-400", rotate: -20 },
  { left: "18%", delay: 0.08, color: "bg-sky-400", rotate: 34 },
  { left: "30%", delay: 0.03, color: "bg-emerald-400", rotate: 12 },
  { left: "44%", delay: 0.12, color: "bg-amber-400", rotate: -48 },
  { left: "58%", delay: 0.05, color: "bg-teal-400", rotate: 24 },
  { left: "72%", delay: 0.1, color: "bg-orange-400", rotate: -10 },
  { left: "84%", delay: 0.02, color: "bg-fuchsia-400", rotate: 52 },
  { left: "92%", delay: 0.16, color: "bg-lime-400", rotate: -36 },
];

function resolveTerm(value: string): GlossaryKey | null {
  const normalized = value.toLocaleLowerCase("tr-TR");

  if (normalized.startsWith("ebû bekir")) return "Ebû Bekir";
  if (normalized.startsWith("bilâl") || normalized.startsWith("bilal")) {
    return "Bilal";
  }
  if (normalized.startsWith("ahad")) return "Ahad";
  if (normalized.startsWith("köle")) return "köle";
  if (normalized.startsWith("servet")) return "servet";

  return null;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8 5.4v13.2c0 .9 1 1.4 1.7.9l9.2-6.6c.6-.4.6-1.4 0-1.8L9.7 4.5C9 4 8 4.5 8 5.4Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7.5 5h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3H7.5c-.8 0-1.3-.5-1.3-1.3V6.3C6.2 5.5 6.7 5 7.5 5Zm6.8 0h2.2c.8 0 1.3.5 1.3 1.3v11.4c0 .8-.5 1.3-1.3 1.3h-2.2c-.8 0-1.3-.5-1.3-1.3V6.3c0-.8.5-1.3 1.3-1.3Z" />
    </svg>
  );
}

function GlossaryText({
  text,
  activeGlossary,
  setActiveGlossary,
}: {
  text: string;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  const parts = useMemo(() => {
    const termRegex =
      /(Ebû Bekir(?:['’][\p{L}]+)?|Bilâl(?:['’][\p{L}]+)?|Bilal(?:['’][\p{L}]+)?|Ahad(?:['’][\p{L}]+)?|köle[\p{L}'’]*|servet[\p{L}'’]*)/giu;

    return text.split(termRegex).filter(Boolean);
  }, [text]);

  return (
    <>
      {parts.map((part, index) => {
        const term = resolveTerm(part);
        const glossaryId = `${term}-${index}-${part}`;
        const isActive = activeGlossary === glossaryId;

        if (!term) return <span key={`${part}-${index}`}>{part}</span>;

        return (
          <span
            key={glossaryId}
            className="relative inline-block"
            data-glossary-root
          >
            <button
              type="button"
              className="rounded-sm text-amber-950 underline decoration-amber-500/60 decoration-dotted decoration-[1.5px] underline-offset-4 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() => setActiveGlossary(isActive ? null : glossaryId)}
            >
              {part}
            </button>

            <AnimatePresence>
              {isActive ? (
                <motion.span
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 rounded-lg border border-amber-200 bg-white px-4 py-3 text-left text-sm leading-6 text-stone-700 shadow-xl shadow-amber-900/10"
                  role="tooltip"
                >
                  <span className="mb-1 block text-base font-bold text-amber-900">
                    {glossary[term].label}
                  </span>
                  {glossary[term].meaning}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>
        );
      })}
    </>
  );
}

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 380;
  const currentSeconds = Math.round((duration * progress) / 100);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.9));
    }, 650);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="sticky top-0 z-40 border-b border-amber-200/70 bg-amber-50/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <button
          type="button"
          aria-label={isPlaying ? "Sesli anlatımı duraklat" : "Sesli anlatımı oynat"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((value) => !value)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-900 text-amber-50 shadow-sm transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-50"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold text-amber-950">
              {chapter.audioTitle}
            </p>
            <p className="shrink-0 tabular-nums text-xs font-medium text-stone-500">
              {formatTime(currentSeconds)} / {formatTime(duration)}
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-amber-200">
            <motion.div
              className="h-full rounded-full bg-emerald-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  activeGlossary,
  setActiveGlossary,
}: {
  section: ReadingSection;
  activeGlossary: string | null;
  setActiveGlossary: (value: string | null) => void;
}) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold tracking-normal text-amber-950 sm:text-3xl">
        {section.title}
      </h2>
      <div className="space-y-6">
        {section.paragraphs.map((paragraph) => {
          const isDialogue = paragraph.trim().startsWith("—");

          return (
            <p
              key={paragraph}
              className={[
                "text-xl leading-9 sm:text-2xl sm:leading-10",
                isDialogue
                  ? "font-semibold text-amber-950"
                  : "text-stone-800",
              ].join(" ")}
            >
              <GlossaryText
                text={paragraph}
                activeGlossary={activeGlossary}
                setActiveGlossary={setActiveGlossary}
              />
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default function ReaderPage() {
  const [activeGlossary, setActiveGlossary] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<DecisionOption["id"] | null>(
    null,
  );
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);

  useEffect(() => {
    function closeGlossaryOnOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;
      if (target.closest("[data-glossary-root]")) return;

      setActiveGlossary(null);
    }

    document.addEventListener("pointerdown", closeGlossaryOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeGlossaryOnOutsideClick);
    };
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 text-stone-900">
      <AudioPlayer />

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <header className="mb-12 border-b border-amber-200 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {chapter.eyebrow}
          </p>
          <h1 className="text-4xl font-black tracking-normal text-amber-950 sm:text-5xl">
            {chapter.title}
          </h1>
        </header>

        <div className="space-y-12">
          {chapter.beforeDecision.map((section) => (
            <SectionBlock
              key={section.title}
              section={section}
              activeGlossary={activeGlossary}
              setActiveGlossary={setActiveGlossary}
            />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mt-14 overflow-hidden rounded-lg border border-amber-200 bg-white p-5 shadow-lg shadow-amber-900/10 sm:p-7"
        >
          <AnimatePresence>
            {selectedOption ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {confettiPieces.map((piece) => (
                  <motion.span
                    key={`${piece.left}-${piece.delay}`}
                    initial={{ y: -18, opacity: 0, rotate: 0 }}
                    animate={{ y: 128, opacity: [0, 1, 1, 0], rotate: piece.rotate }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.15, delay: piece.delay, ease: "easeOut" }}
                    style={{ left: piece.left }}
                    className={`absolute top-0 h-3 w-2 rounded-sm ${piece.color}`}
                  />
                ))}
              </div>
            ) : null}
          </AnimatePresence>

          <div className="relative">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              Sen Olsaydın?
            </p>
            <h2 className="mb-6 text-2xl font-black tracking-normal text-amber-950 sm:text-3xl">
              Çarşıda Bir Karar
            </h2>
            <p className="mb-6 text-xl leading-9 text-stone-800 sm:text-2xl sm:leading-10">
              <GlossaryText
                text={chapter.decision.question}
                activeGlossary={activeGlossary}
                setActiveGlossary={setActiveGlossary}
              />
            </p>

            <div className="grid gap-3">
              {chapter.decision.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isDimmed = selectedOption !== null && !isSelected;

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={selectedOption !== null}
                    onClick={() => setSelectedOption(option.id)}
                    className={[
                      "rounded-lg border px-4 py-4 text-left text-lg font-semibold leading-7 transition focus:outline-none focus:ring-2 focus:ring-emerald-500",
                      isSelected
                        ? "border-emerald-500 bg-emerald-100 text-emerald-950 shadow-sm"
                        : "border-amber-200 bg-amber-50 text-stone-800 hover:border-amber-300 hover:bg-amber-100",
                      isDimmed ? "opacity-55" : "",
                    ].join(" ")}
                  >
                    <span className="mr-2 font-black uppercase text-amber-800">
                      {option.id})
                    </span>
                    {option.text}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedOption ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.28 }}
                  className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
                  aria-live="polite"
                >
                  <p className="text-lg font-bold text-emerald-950">
                    Harika bir karar! Sayfayı çevirip sonucunu gör.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsResultOpen(true)}
                    className="mt-4 rounded-full bg-emerald-700 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
                  >
                    Sayfayı Çevir
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.section>

        <AnimatePresence>
          {isResultOpen ? (
            <motion.div
              initial={{ opacity: 0, rotateX: -14, y: 26 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-14 origin-top space-y-12"
              style={{ perspective: 1000 }}
            >
              {chapter.afterDecision.map((section) => (
                <SectionBlock
                  key={section.title}
                  section={section}
                  activeGlossary={activeGlossary}
                  setActiveGlossary={setActiveGlossary}
                />
              ))}

              <section className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm shadow-amber-900/5 sm:p-7">
                <h2 className="mb-5 text-2xl font-black tracking-normal text-amber-950">
                  Ne Öğrendik?
                </h2>
                <ul className="space-y-4">
                  {chapter.learned.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-lg leading-8 text-stone-800 sm:text-xl"
                    >
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                      <span>
                        <GlossaryText
                          text={item}
                          activeGlossary={activeGlossary}
                          setActiveGlossary={setActiveGlossary}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center sm:p-7">
                <AnimatePresence mode="wait">
                  {badgeEarned ? (
                    <motion.div
                      key="badge"
                      initial={{ opacity: 0, scale: 0.86, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.35 }}
                      className="mx-auto max-w-sm"
                    >
                      <div className="mx-auto mb-4 grid h-28 w-28 place-items-center rounded-full border-8 border-amber-300 bg-amber-100 text-center shadow-inner">
                        <span className="text-sm font-black uppercase leading-5 text-amber-950">
                          Mekke
                          <br />
                          Çarşısı
                          <br />
                          Rozeti
                        </span>
                      </div>
                      <h2 className="text-2xl font-black tracking-normal text-emerald-950">
                        Rozetin Hazır
                      </h2>
                      <p className="mt-2 text-lg leading-8 text-emerald-900">
                        Bu bölümde cömertliği, özgürlüğü ve karşılıksız iyiliği
                        tamamladın.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="finish"
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBadgeEarned(true)}
                      className="rounded-full bg-amber-900 px-6 py-4 text-lg font-black text-amber-50 shadow-lg shadow-amber-900/15 transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
                    >
                      Bölümü Bitir ve Rozetini Kazan
                    </motion.button>
                  )}
                </AnimatePresence>
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </article>
    </main>
  );
}
