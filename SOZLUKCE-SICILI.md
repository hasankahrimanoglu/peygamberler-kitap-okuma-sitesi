# MERKEZÎ SÖZLÜKÇE SİCİLİ

> **Proje:** Peygamberler Keşif Dünyası
>
> **Belge tarihi:** 25 Temmuz 2026
>
> **Durum:** Yaşayan belge. Her yeni kitap içeriği geldiğinde güncellenir.

Bu belge, uygulamadaki **bütün etkileşimli kelimelerin tek kaydıdır.**
`ROZET-MATRISI.md` ile aynı işi yapar; farkı, rozet adları yerine sözcük
tanımlarını yönetmesidir.

İki işi birden görür:

1. **Tekillik sicili** — bir terim set genelinde **yalnız bir kez** kutulanır ve
   **tek bir tanımı** vardır. Yeni kitabın etkileşimli kelimeleri buradaki
   dizinle karşılaştırılmadan `books.ts`'e aktarılmaz.
2. **Kelime Defterim'in kaynağı** — çocuk `/kelime-defterim` ekranında okuduğu
   kitaplardaki kelimeleri görür. Aynı kelimenin iki farklı tanımı bu ekranda
   doğrudan çelişki olarak görünür.

---

## 1. SABİT KURALLAR

- **Bir terim = bir tanım.** Aynı kelime iki kitapta farklı cümleyle
  tanımlanamaz.
- **Bir terim = bir kutu.** Terim, set genelinde ilk geçtiği bölümde
  etkileşimli olur; sonraki bölümlerde ve sonraki kitaplarda **düz metin**
  kalır (`YENI-KITAP-ICERIK-URETIM-BRIFI.md` §7.4).
- **Sabit sözlükçe değiştirilemez.** Brif §11'deki 11 terimin tanımı harfiyen
  kullanılır.
- Tanım tek cümle, kısa ve **8–11 yaşa uygun** olmalıdır.
- Yeni terim önerisi editör onayından geçmeden kitap boyunca kullanılmaz;
  onaylanana kadar bu sicile **"onay bekliyor"** olarak yazılır.
- Kutu yalnız gerçekten açıklama gerektiren terimlerde kullanılır — bölüm
  başına 1–2 kelime.

---

## 2. SABİT SÖZLÜKÇE (brif §11 — değiştirilemez)

Bu 11 terimin tanımı projenin standardıdır. Bir kitapta geçtiğinde bu tanım
**harfiyen** kullanılır.

| Terim | Sabit tanım | Kutulandı mı? |
|---|---|---|
| Hicret | Bir yerden başka bir yere göç etmek demektir. | Henüz yok |
| Müşrik | Bir olan Allah'a inanmayıp putlara tapan kimse demektir. | Henüz yok |
| Vahiy | Allah'ın, peygamberlerine melek aracılığıyla gönderdiği mesajlardır. | Henüz yok |
| Halife | Peygamberimizden sonra Müslümanların başına geçen yöneticiye denir. | Henüz yok |
| Sahabe | Peygamberimizi görmüş ve ona inanmış kimselere denir. | Henüz yok |
| Peygamber | Allah'ın, mesajlarını insanlara ulaştırmak için seçtiği elçidir. | Henüz yok |
| Kâbe | Mekke'de bulunan, Müslümanların namazda yöneldiği kutsal yapıdır. | Henüz yok |
| Put | İnsanların kendi elleriyle yapıp taptıkları heykellerdir. | Henüz yok |
| Tevekkül | Elinden geleni yaptıktan sonra sonucu Allah'a bırakmaktır. | Henüz yok |
| Mucize | Allah'ın izniyle peygamberlerin gösterdiği olağanüstü olaylardır. | Henüz yok |
| Zekât | Zenginlerin, mallarının bir kısmını ihtiyaç sahipleriyle paylaşmasıdır. | Henüz yok |

> "Kutulandı mı?" sütunu, terimin hangi kitap/bölümde etkileşimli hâle
> geldiğini gösterir. Terim bir kez kutulandıktan sonra buraya kitap ve bölüm
> yazılır; sonraki kitaplarda tekrar kutulanmaz.

---

## 3. KİTAPLARDAN GELEN TERİMLER

`books.ts` içinde fiilen kutulanmış terimler. **Yeni kitabın kelimeleri önce bu
listeyle karşılaştırılır.**

| # | Terim | Tanım | İlk geçtiği yer | Durum |
|---:|---|---|---|---|
| 1 | emanet | Korumamız ve özen göstermemiz için bize güvenilerek verilen şeydir. | Hz. Âdem · 8 | **Kanonik** |
| 2 | secde | Allah'ın emriyle yapılan, derin saygıyı gösteren özel bir davranıştır. | Hz. Âdem · 1 | Kanonik |
| 3 | nimet | Allah'ın insanlara verdiği yiyecek, sağlık, sevgi ve benzeri güzelliklerin her biridir. | Hz. Âdem · 3 | Kanonik |
| 4 | vesvese | İnsanın içine doğan ve onu yanlış bir davranışa çağıran rahatsız edici düşüncedir. | Hz. Âdem · 4 | Kanonik |
| 5 | tövbe | Yaptığımız bir yanlıştan pişman olup Allah'tan bağışlanma istemek ve o yanlışı bırakmaktır. | Hz. Âdem · 5 | Kanonik |
| 6 | rehberlik | Doğru yolu bulabilmesi için birine yol göstermek ve yardımcı olmaktır. | Hz. Âdem · 6 | Kanonik |
| 7 | kurban | Allah'a yakınlaşmak amacıyla sunulan şey veya yapılan ibadettir. | Hz. Âdem · 7 | Kanonik |
| 8 | sıla | İnsanın özlediği yere veya sevdiklerine kavuşmasıdır. | Hz. Âdem · 8 | Kanonik |

**Kanonik** = onaylı Hz. Âdem içeriğinden gelir, değiştirilmez.

### 3.1 Kod tarafındaki ikinci kopya

`src/data/demoChapters.ts` içindeki `glossary` sözlüğü eski okuma bileşenleri
için küçük bir kopya tutar. Şu an yalnız **`emanet`** girdisi vardır ve
yukarıdaki kanonik tanımla **eşitlenmiştir**. Bu tanım değişecekse önce bu
sicil, sonra `demoChapters.ts` güncellenir.

---

## 4. ÇÖZÜLEN ÇAKIŞMALAR

| Tarih | Terim | Sorun | Çözüm |
|---|---|---|---|
| 25 Tem 2026 | emanet | Üç yerde, iki farklı tanım: Hz. Âdem (onaylı), Hz. Şît demo, `demoChapters.ts`. Çocuk Kelime Defterim'de aynı kelimeyi iki anlamla görüyordu. | Hz. Âdem'in tanımı kanonik kabul edildi. `demoChapters.ts` eşitlendi. Hz. Şît'teki ikinci kutu **düz metne** çevrildi (cümle korundu). |
| 25 Tem 2026 | tevekkül | Eski Hz. Nuh demo verisindeki tanım brif §11'deki sabit tanımdan farklıydı. | Ölü demo verisi `books.ts`'ten silindi; sapma ortadan kalktı. Terim henüz hiçbir yayımlanmış kitapta kutulanmıyor. |

---

## 5. YENİ KİTAP GELİNCE — SİCİL GÜNCELLEME AKIŞI

1. İçerik teslimi geldiğinde, kitabın etkileşimli kelimeleri §2 ve §3
   listeleriyle karşılaştırılır.
2. **Terim §2'de (sabit sözlükçe) varsa:** tanım harfiyen sabit sözlükçedeki
   olmalıdır. Farklıysa aktarım yapılmaz; içerik ajanına düzeltme sorulur.
3. **Terim §3'te zaten varsa:** kelime ikinci kez kutulanmaz. İlgili blok
   `interactive_word` yerine düz `text` olarak aktarılır.
4. **Terim yeniyse:** §3'e eklenir, ilk geçtiği kitap/bölüm ve durum yazılır.
5. Sabit sözlükçedeki bir terim ilk kez kutulanıyorsa §2'deki "Kutulandı mı?"
   sütununa kitap ve bölüm yazılır.
6. Çakışma çözüldüyse §4 tablosuna bir satır eklenir.

---

## 6. AÇIK UYARILAR

- **Sabit sözlükçedeki 11 terimin hiçbiri henüz kutulanmadı.** Hz. Muhammed ve
  Dört Büyük Halife kitapları geldiğinde *hicret · vahiy · halife · sahabe ·
  müşrik · Kâbe* terimlerinin **hangi kitapta ilk kez** kutulanacağına önceden
  karar verilmelidir; yoksa aynı terim dört ayrı kitapta kutulanmaya çalışılır.
- Hz. Şît'in etkileşimli kelimesi kaldırıldığı için o geçici demo kitapta şu an
  hiç kutulanmış kelime yoktur. Nihai kaynaklı içerik geldiğinde bu yeniden
  değerlendirilecektir.
