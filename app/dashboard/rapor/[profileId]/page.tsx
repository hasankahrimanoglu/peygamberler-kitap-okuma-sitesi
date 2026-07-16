"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useParentData } from "../../../../src/lib/parent/ParentDataProvider";
import {
  cocukOzeti,
  gorevDurumDetaylari,
  madalyaVitrini,
  rozetVitrini,
} from "../../../../src/lib/derive";
import {
  buildChildReport,
  formatReportDate,
} from "../../../../src/lib/parent/report";
import { goreliZaman } from "../../../../src/lib/zaman";
import { Buton, Ikon, Kart } from "../../../../src/components/ui";

type Sekme = "genel" | "kitaplar" | "oduller" | "gorevler" | "sohbet";

const sekmeler: { deger: Sekme; etiket: string }[] = [
  { deger: "genel", etiket: "Genel Bakış" },
  { deger: "kitaplar", etiket: "Kitaplar" },
  { deger: "oduller", etiket: "Ödüller" },
  { deger: "gorevler", etiket: "Görevler" },
  { deger: "sohbet", etiket: "Sohbet Önerileri" },
];

export default function GelisimRaporuSayfasi() {
  const params = useParams<{ profileId: string }>();
  const profileId = params?.profileId;
  const { profiles, books, progressByProfile, tasksByProfile, isLoading } =
    useParentData();
  const [sekme, setSekme] = useState<Sekme>("genel");

  const profile = profiles.find((p) => p.id === profileId) ?? null;

  const veriler = useMemo(() => {
    if (!profile) return null;
    const progress = progressByProfile[profile.id] ?? [];
    const rapor = buildChildReport(profile, progress, books);
    const ozet = cocukOzeti(progress, books);
    const rozetler = rozetVitrini(books, progress);
    const madalyalar = madalyaVitrini(books, progress);
    const gorevler = gorevDurumDetaylari(tasksByProfile[profile.id] ?? []);
    return {
      rapor,
      ozet,
      gorevler,
      bekleyenGorev: gorevler.filter((g) => g.status === "eklendi"),
      tamamlananGorev: gorevler.filter((g) => g.status === "tamamlandi"),
      kazanilanRozet: rozetler.filter((r) => r.kazanildi).length,
      toplamRozet: rozetler.length,
      kazanilanMadalya: madalyalar.filter((m) => m.kazanildi).length,
      toplamMadalya: madalyalar.length,
    };
  }, [profile, progressByProfile, tasksByProfile, books]);

  const geriLink = (
    <Link
      href="/dashboard"
      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-murekkep-soluk transition-colors hover:text-murekkep"
    >
      <Ikon ad="geri" boyut={18} />
      Ana Sayfa
    </Link>
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">{geriLink}</div>
        <Kart className="text-center font-semibold text-murekkep-soluk">
          Rapor yükleniyor...
        </Kart>
      </div>
    );
  }

  if (!profile || !veriler) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">{geriLink}</div>
        <Kart dolgu="genis" className="text-center">
          <p className="font-baslik text-lg font-bold text-murekkep">
            Profil bulunamadı
          </p>
          <p className="mt-2 text-sm font-medium text-murekkep-soluk">
            Bu rapora ait çocuk profili artık mevcut değil.
          </p>
          <div className="mt-5 flex justify-center">
            <Link href="/dashboard">
              <Buton varyant="cerceve">Ana Sayfaya Dön</Buton>
            </Link>
          </div>
        </Kart>
      </div>
    );
  }

  const { rapor, ozet } = veriler;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4">{geriLink}</div>

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vurgu">
          Gelişim Raporu
        </p>
        <h1 className="mt-1 font-baslik text-3xl font-bold text-murekkep sm:text-4xl">
          {profile.isim}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-eylem">
          <Ikon ad="yildiz" boyut={15} />
          {ozet.unvan}
        </p>
      </div>

      {/* Sekmeler */}
      <div className="relative mb-6">
        <div
          role="tablist"
          aria-label="Rapor bölümleri"
          className="flex gap-1 overflow-x-auto rounded-buton border border-cizgi bg-yuzey-2 p-1 scrollbar-none"
        >
          {sekmeler.map((s) => {
            const secili = sekme === s.deger;
            return (
              <button
                key={s.deger}
                type="button"
                role="tab"
                id={`sekme-${s.deger}`}
                aria-selected={secili}
                aria-controls="rapor-paneli"
                onClick={(olay) => {
                  setSekme(s.deger);
                  // Mobilde tıklanan sekme görünür alana kaysın (yatay liste).
                  olay.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                  });
                }}
                className={`min-h-[44px] shrink-0 rounded-[0.7rem] px-4 py-1.5 text-sm font-semibold transition-colors ${
                  secili
                    ? "bg-yuzey text-murekkep shadow-kart"
                    : "text-murekkep-soluk hover:text-murekkep"
                }`}
              >
                {s.etiket}
              </button>
            );
          })}
        </div>
        {/* Mobilde sağda devam eden sekmeler olduğunu gösteren kaydırma ipucu */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-buton bg-gradient-to-l from-yuzey-2 to-transparent sm:hidden"
        />
      </div>

      <div role="tabpanel" id="rapor-paneli" aria-labelledby={`sekme-${sekme}`}>

      {/* Genel Bakış */}
      {sekme === "genel" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="rozet" boyut={22} />
                {veriler.kazanilanRozet}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Rozet
              </p>
            </Kart>
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="madalya" boyut={22} />
                {veriler.kazanilanMadalya}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Madalya
              </p>
            </Kart>
            <Kart className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-baslik text-2xl font-bold text-vurgu">
                <Ikon ad="kitap" boyut={22} />
                {ozet.tamamlananKitap}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Tamamlanan Kitap
              </p>
            </Kart>
          </div>

          {goreliZaman(ozet.sonAktiviteZamani) ? (
            <p className="flex items-center gap-1.5 px-1 text-sm font-medium text-murekkep-soluk">
              <Ikon ad="saat" boyut={16} />
              Son okuma: {goreliZaman(ozet.sonAktiviteZamani)}
            </p>
          ) : null}

          <Kart className="bg-vurgu-yumusak">
            <p className="text-xs font-semibold uppercase tracking-wide text-vurgu">
              Gelecek Durak
            </p>
            <p className="mt-2 text-base font-semibold leading-7 text-murekkep">
              {rapor.currentAdventure
                ? `Şu Anki Macera: ${rapor.currentAdventure.bookTitle} — ${profile.isim} yeni durağı keşfetmeye başladı, ${rapor.currentAdventure.completedCount}/${rapor.currentAdventure.totalChapters} rozet yolunda ilerliyor.`
                : `${profile.isim} için sıradaki güzel macera haritada onu bekliyor.`}
            </p>
          </Kart>
        </div>
      ) : null}

      {/* Kitaplar */}
      {sekme === "kitaplar" ? (
        rapor.completedAdventures.length === 0 ? (
          <Kart dolgu="genis" className="text-center">
            <p className="font-baslik font-bold text-murekkep">
              Henüz tamamlanan bir macera bulunmuyor.
            </p>
            <p className="mt-2 text-sm font-medium text-murekkep-soluk">
              Çocuk profilinden haritaya girerek ilk macerayı başlatabilirsiniz.
            </p>
          </Kart>
        ) : (
          <div className="space-y-4">
            {rapor.completedAdventures.map((adventure) => {
              const wrongCount =
                adventure.finalScore === null
                  ? null
                  : Math.max(0, adventure.totalQuestions - adventure.finalScore);
              return (
                <Kart key={`${adventure.bookTitle}-${adventure.updatedAt}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-vurgu">
                        Kitap Yolculuğu
                      </p>
                      <h2 className="mt-1 font-baslik text-lg font-bold text-murekkep">
                        {adventure.bookTitle}
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-murekkep-soluk">
                        Yolculuk Günlüğü: {formatReportDate(adventure.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-murekkep-soluk">
                        Bölüm
                      </p>
                      <p className="mt-1 font-baslik text-lg font-bold text-murekkep">
                        {adventure.completedCount}/{adventure.totalChapters}
                      </p>
                    </div>
                    <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-murekkep-soluk">
                        Final Testi
                      </p>
                      <p className="mt-1 font-baslik text-base font-bold text-murekkep">
                        {adventure.finalScore === null || wrongCount === null
                          ? "Kayıt yok"
                          : `${adventure.finalScore} doğru · ${wrongCount} yanlış`}
                      </p>
                    </div>
                    <div className="rounded-buton border border-cizgi bg-yuzey-2 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-murekkep-soluk">
                        Madalya
                      </p>
                      <p className="mt-1 text-sm font-bold text-murekkep">
                        {adventure.medalName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-kart border border-eylem/25 bg-eylem-yumusak p-4">
                    <p className="text-sm font-medium leading-7 text-murekkep">
                      {adventure.parentMessage}
                    </p>
                  </div>
                </Kart>
              );
            })}
          </div>
        )
      ) : null}

      {/* Ödüller özeti */}
      {sekme === "oduller" ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Kart>
              <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Rozetler
              </p>
              <p className="mt-1 font-baslik text-2xl font-bold text-murekkep">
                {veriler.kazanilanRozet}
                <span className="text-base text-murekkep-soluk"> / {veriler.toplamRozet}</span>
              </p>
            </Kart>
            <Kart>
              <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Madalyalar
              </p>
              <p className="mt-1 font-baslik text-2xl font-bold text-murekkep">
                {veriler.kazanilanMadalya}
                <span className="text-base text-murekkep-soluk"> / {veriler.toplamMadalya}</span>
              </p>
            </Kart>
            <Kart>
              <p className="text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Güncel Unvan
              </p>
              <p className="mt-1 font-baslik text-lg font-bold text-eylem">{ozet.unvan}</p>
            </Kart>
          </div>
          <Link
            href="/dashboard/oduller"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-eylem hover:underline"
          >
            Tüm ödülleri gör
            <Ikon ad="ok-sag" boyut={16} />
          </Link>
        </div>
      ) : null}

      {/* Görevler — çocuğun "Bugüne Taşı" görev takibi (PROJE-MODELI 4.1/18) */}
      {sekme === "gorevler" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Kart className="text-center">
              <p className="font-baslik text-2xl font-bold text-vurgu">
                {veriler.bekleyenGorev.length}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Listesinde
              </p>
            </Kart>
            <Kart className="text-center">
              <p className="font-baslik text-2xl font-bold text-eylem">
                {veriler.tamamlananGorev.length}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-murekkep-soluk">
                Tamamladı
              </p>
            </Kart>
          </div>

          {veriler.gorevler.length === 0 ? (
            <Kart dolgu="genis" className="text-center">
              <p className="font-baslik font-bold text-murekkep">
                Henüz listeye eklenmiş görev yok.
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-murekkep-soluk">
                &quot;Bugüne Taşı&quot; görevleri gönüllüdür. {profile.isim} okurken
                bir görevi listesine eklerse burada durumuyla birlikte görünür.
              </p>
            </Kart>
          ) : (
            <div className="space-y-3">
              {veriler.gorevler.map((gorev) => {
                const tamamlandi = gorev.status === "tamamlandi";
                return (
                  <Kart
                    key={gorev.gorev.id}
                    className="flex items-start gap-3"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        tamamlandi
                          ? "bg-eylem-yumusak text-eylem"
                          : "bg-vurgu-yumusak text-vurgu"
                      }`}
                    >
                      <Ikon ad={tamamlandi ? "onay" : "fidan"} boyut={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-baslik text-base font-bold text-murekkep">
                          {gorev.gorev.ad}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            tamamlandi
                              ? "bg-eylem-yumusak text-eylem"
                              : "bg-yuzey-2 text-murekkep-soluk"
                          }`}
                        >
                          {tamamlandi ? "Tamamladı" : "Listesinde"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-semibold text-murekkep-soluk">
                        {gorev.bookTitle} • {gorev.bolumNo}. Bölüm · {gorev.gorev.kategori}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-6 text-murekkep">
                        {gorev.gorev.aciklama.split("\n")[0]}
                      </p>
                      <p className="mt-2 text-xs font-medium text-murekkep-soluk">
                        {tamamlandi && gorev.completedAt
                          ? `Tamamlandı: ${formatReportDate(gorev.completedAt)}`
                          : `Listeye eklendi: ${formatReportDate(gorev.addedAt)}`}
                      </p>
                    </div>
                  </Kart>
                );
              })}
            </div>
          )}

          <p className="px-1 text-xs font-medium leading-5 text-murekkep-soluk">
            Görevler tamamen gönüllüdür ve çocuğun kendi bildirimidir; tamamlanmamış
            bir görev bir eksiklik değildir.
          </p>
        </div>
      ) : null}

      {/* Sohbet Önerileri */}
      {sekme === "sohbet" ? (
        rapor.completedAdventures.length === 0 ? (
          <Kart dolgu="genis" className="text-center">
            <p className="font-baslik font-bold text-murekkep">
              Sohbet önerileri tamamlanan kitaplardan gelir.
            </p>
            <p className="mt-2 text-sm font-medium text-murekkep-soluk">
              İlk kitap tamamlandığında burada akşam sohbeti için öneriler görünecek.
            </p>
          </Kart>
        ) : (
          <div className="space-y-4">
            {rapor.completedAdventures.map((adventure) => (
              <Kart key={`sohbet-${adventure.bookTitle}-${adventure.updatedAt}`}>
                <h2 className="font-baslik text-lg font-bold text-murekkep">
                  {adventure.bookTitle}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-vurgu">
                  <Ikon ad="dusunce" boyut={16} />
                  Akşam İçin Sohbet Başlatıcıları
                </p>
                <div className="mt-2 grid gap-2">
                  {adventure.chatQuestions.slice(0, 3).map((question) => (
                    <p
                      key={question}
                      className="rounded-buton bg-yuzey-2 px-4 py-2.5 text-sm font-medium leading-6 text-murekkep"
                    >
                      {question}
                    </p>
                  ))}
                </div>

                {adventure.parentFaq.length > 0 ? (
                  <div className="mt-4">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-vurgu">
                      <Ikon ad="kalp" boyut={16} />
                      Çocuğunuz Sorarsa
                    </p>
                    <div className="mt-2 space-y-2">
                      {adventure.parentFaq.map((faq) => (
                        <div
                          key={faq.question}
                          className="rounded-kart border border-cizgi bg-yuzey-2 p-3"
                        >
                          <p className="text-sm font-bold text-murekkep">{faq.question}</p>
                          <p className="mt-1 text-sm font-medium leading-6 text-murekkep-soluk">
                            {faq.approach}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Kart>
            ))}
          </div>
        )
      ) : null}
      </div>
    </div>
  );
}
