import type { CocukSifresiSonucu } from "../../lib/aileGuvenligi";

/** Profil şifresi kaydedilemediğinde veliye gösterilecek açıklama. */
export function cocukSifresiHataMetni(sonuc: CocukSifresiSonucu | null) {
  switch (sonuc) {
    case "veli_pin_ile_ayni":
      return "Bu şifre veli PIN'inizle aynı. Başka bir şifre seçin.";
    case "kardes_sifresiyle_ayni":
      return "Bu şifre başka bir çocuğunuzda kullanılıyor. Her çocuğun şifresi farklı olmalı.";
    case "gecersiz":
      return "Şifre 4 rakam olmalı.";
    default:
      return "Şifre kaydedilemedi. Tekrar deneyin.";
  }
}
