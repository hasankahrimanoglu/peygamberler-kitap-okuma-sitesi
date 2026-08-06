/**
 * Keşif İskelesi bağlantıları — TEK KAYNAK.
 *
 * Aynı üçlü iki ekranda birden görünür: atlas haritası (`AtlasHarita`) ve
 * kitabın bölüm rotası (`KitapBolumRotasi`). İkisi ayrı CSS modülü kullandığı
 * için görünüm her ekranda kendi sınıfıyla verilir; DEĞİŞMEYEN kısım — hangi
 * bağlantı, hangi ikon, hangi sıra — burada durur. Liste iki dosyaya
 * kopyalansaydı yeni bir menü eklenirken birinin unutulması işten değildi.
 *
 * Bağlantılar masaüstünde (≥960px) üst barda şerit olarak görünür; dar
 * ekranlarda yerini atlasta alttaki Keşif İskelesi'ne, bölüm rotasında ise
 * hamburger menüsüne (`KesifMenusu`) bırakır.
 */
export const ISKELE_BAGLANTILARI = [
  { yol: "/kazanimlarim", ikon: "rozet", ad: "Kazanımlarım" },
  { yol: "/kelime-defterim", ikon: "kitap", ad: "Kelime Defterim" },
  { yol: "/gorevlerim", ikon: "fener", ad: "Görevlerim" },
] as const;
