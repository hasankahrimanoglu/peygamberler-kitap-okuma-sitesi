/**
 * Çocuk tarafı üst barının profil özeti.
 *
 * Dört bileşen (atlas haritası, kitap rotası, keşif menüsü, menü kabuğu) aynı
 * özeti alıyor; alan eklendiğinde dördü birden kaysın diye tip tek yerde durur.
 * `avatarFotografi` veli panelinden yüklenen fotoğraftır (KARAR 8 Ağu 2026) —
 * boşsa `avatarAnahtari`ndaki hazır avatar geçerlidir.
 */
export type KesifProfili = {
  ad: string;
  avatarAnahtari: string;
  avatarFotografi?: string | null;
  unvan: string;
};
