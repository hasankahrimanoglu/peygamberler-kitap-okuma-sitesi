/**
 * Rakamdan sonra gelen Türkçe ekler: "4 bölümün 1'i", "1'ini okudun".
 * Ek, sayının okunuşunun son hecesine uyar (bir → 1'i, üç → 3'ü, altı → 6'sı).
 */
const BIRLER = ["", "i", "si", "ü", "ü", "i", "sı", "si", "i", "u"];
// sıfır, on, yirmi, otuz, kırk, elli, altmış, yetmiş, seksen, doksan
const ONLAR = ["ı", "u", "si", "u", "ı", "si", "ı", "i", "i", "ı"];

/** İyelik eki (3. tekil): 1 → "i", 2 → "si", 3 → "ü", 6 → "sı", 10 → "u". */
export function iyelikEki(sayi: number) {
  const n = Math.abs(Math.trunc(sayi));
  if (n % 10 !== 0) return BIRLER[n % 10];
  if (n > 0 && n % 100 === 0) return "ü";
  return ONLAR[Math.floor(n / 10) % 10];
}

/** İyelik + belirtme: 1 → "ini", 2 → "sini", 3 → "ünü", 6 → "sını". */
export function belirtmeEki(sayi: number) {
  const ek = iyelikEki(sayi);
  return `${ek}n${ek.at(-1)}`;
}
