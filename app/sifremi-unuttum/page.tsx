"use client";

import { HesapSayfasi, YeniBaglantiFormu } from "../../src/components/giris/HesapSayfasi";

/**
 * Şifremi unuttum (Faz 7, 3. adım — PROJE-MODELI Bölüm 8). Hoş geldin
 * e-postası kaybolan ya da süresi dolan veli de bağlantıyı buradan alır.
 */
export default function SifremiUnuttumSayfasi() {
  return (
    <HesapSayfasi>
      <h1 className="font-baslik text-2xl font-bold">Şifremi unuttum</h1>
      <p className="mt-3 text-base font-medium leading-7 text-murekkep-soluk">
        Hesabınızın e-posta adresini yazın; şifre belirleme bağlantısı gönderelim. İlk
        e-postanız kaybolduysa da bağlantıyı buradan alabilirsiniz.
      </p>
      <div className="mt-6">
        <YeniBaglantiFormu />
      </div>
    </HesapSayfasi>
  );
}
