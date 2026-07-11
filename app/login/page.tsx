"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M5.5 4.2h7.1c1.9 0 3.4 1.5 3.4 3.4v12.2c0 .4-.4.7-.8.5a4.9 4.9 0 0 0-2.6-.8H5.5a1.9 1.9 0 0 1-1.9-1.9V6.1c0-1.1.8-1.9 1.9-1.9Zm2.2 3.2a.9.9 0 0 0 0 1.8h4.9a.9.9 0 0 0 0-1.8H7.7Zm0 3.7a.9.9 0 0 0 0 1.8h3.8a.9.9 0 0 0 0-1.8H7.7Z"
        fill="currentColor"
      />
      <path
        d="M17.4 5.2c1.7.3 3 1.8 3 3.5v8.7c0 1.1-.8 1.9-1.9 1.9h-.9V7.6c0-.8-.1-1.6-.2-2.4Z"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4Zm3.9 5.3-2.4 5.4a2 2 0 0 1-1 1l-5.4 2.4 2.4-5.4a2 2 0 0 1 1-1l5.4-2.4Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="1.4" fill="#fff7ed" opacity=".8" />
    </svg>
  );
}

function isMissingChildLoginColumn(message?: string) {
  const normalized = (message ?? "").toLocaleLowerCase("tr-TR");

  return (
    normalized.includes("child_username") ||
    normalized.includes("child_password") ||
    normalized.includes("column")
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [parentError, setParentError] = useState<string | null>(null);
  const [childError, setChildError] = useState<string | null>(null);
  const [isParentSubmitting, setIsParentSubmitting] = useState(false);
  const [isChildSubmitting, setIsChildSubmitting] = useState(false);

  async function handleParentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setParentError(null);
    setIsParentSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsParentSubmitting(false);

    if (signInError) {
      setParentError("E-posta veya şifre hatalı. Lütfen tekrar dene.");
      return;
    }

    router.push("/dashboard");
  }

  async function handleChildSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChildError(null);
    setIsChildSubmitting(true);

    const trimmedUsername = childUsername.trim();
    const trimmedPassword = childPassword.trim();

    const { data, error } = await supabase
      .from("profiles")
      .select("id, isim")
      .eq("child_username", trimmedUsername)
      .eq("child_password", trimmedPassword)
      .maybeSingle();

    setIsChildSubmitting(false);

    if (error) {
      setChildError(
        isMissingChildLoginColumn(error.message)
          ? "Çocuk girişi için Supabase profiles tablosuna child_username ve child_password sütunlarını eklemelisin."
          : "Çocuk girişi kontrol edilemedi. Lütfen tekrar dene.",
      );
      return;
    }

    if (!data) {
      setChildError("Kullanıcı adı veya şifre hatalı. Lütfen tekrar dene.");
      return;
    }

    window.localStorage.setItem("selected_child_profile_id", data.id);
    window.localStorage.setItem("selected_child_profile_name", data.isim);
    window.localStorage.setItem("selected_child_name", data.isim);
    router.push("/map");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-amber-50 px-5 py-10 text-stone-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(251,191,36,0.28),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.2),transparent_26%),linear-gradient(180deg,rgba(255,251,235,0),rgba(254,243,199,0.62))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-emerald-100/70 to-transparent" />

      <div className="relative w-full max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Peygamberler Kitap Okuma
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-amber-950 sm:text-5xl">
            Hoş Geldin
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-amber-200 bg-white/85 p-6 shadow-2xl shadow-amber-900/10 backdrop-blur sm:p-8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />
            <div className="relative mb-8 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-amber-300 bg-amber-100 text-amber-900 shadow-inner">
                <BookIcon />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Veli Girişi
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-amber-950">
                Yönetim Paneli
              </h2>
            </div>

            <form className="relative space-y-5" onSubmit={handleParentSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  E-posta
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                  placeholder="ornek@mail.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Şifre
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-14 w-full rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60"
                  placeholder="Şifren"
                />
              </label>

              {parentError ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-rose-700"
                  role="alert"
                >
                  {parentError}
                </motion.p>
              ) : null}

              <button
                type="submit"
                disabled={isParentSubmitting}
                className="mt-2 h-14 w-full rounded-2xl bg-amber-900 px-5 py-3 text-base font-black text-amber-50 shadow-lg shadow-amber-900/15 transition hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-none"
              >
                {isParentSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.06, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-white/85 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur sm:p-8"
          >
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-emerald-200/55 blur-3xl" />
            <div className="relative mb-8 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-300 bg-emerald-100 text-emerald-800 shadow-inner">
                <CompassIcon />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Çocuk Girişi
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-emerald-950">
                Keşif Haritası
              </h2>
            </div>

            <form className="relative space-y-5" onSubmit={handleChildSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Kullanıcı Adı
                </span>
                <input
                  value={childUsername}
                  onChange={(event) => setChildUsername(event.target.value)}
                  required
                  autoComplete="username"
                  className="h-14 w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-200/60"
                  placeholder="Örn. hasan01"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-stone-700">
                  Şifre
                </span>
                <input
                  type="password"
                  value={childPassword}
                  onChange={(event) => setChildPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-14 w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-base font-semibold text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-200/60"
                  placeholder="Şifren"
                />
              </label>

              {childError ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-rose-700"
                  role="alert"
                >
                  {childError}
                </motion.p>
              ) : null}

              <button
                type="submit"
                disabled={isChildSubmitting}
                className="mt-2 h-14 w-full rounded-2xl bg-emerald-800 px-5 py-3 text-base font-black text-emerald-50 shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-none"
              >
                {isChildSubmitting ? "Harita Açılıyor..." : "Maceraya Başla"}
              </button>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
