# Gündüz Kahve & Fırın — tasarım fikri

**Karakter.** Sabah yedi buçukta simit kokusuyla açılan, gece on birde lambası sönen bir mahalle kahvesi. Site de mekân gibi davranıyor: günün saatine göre ışığı değişiyor. Sakin, sıcak, biraz şakacı. Menü bir restoran sitesi gibi değil, masadaki kâğıt menü gibi okunuyor.

**Wow anı — "Günün saati" penceresi.** Sayfanın başında kemerli bir pencere var. İçinde mahallenin çatıları ve gökyüzü. Güneş, açılıştan kapanışa bir yay üzerinde gerçek saate göre duruyor; sayfa açılırken ufuktan doğup yerine oturuyor. Ziyaretçi güneşi parmağıyla sürükleyince (ya da alttaki kaydırıcıyla) saat ilerliyor: gökyüzü, sitenin renkleri, hatta menüde o saatte servis edilen bölümler değişiyor. Akşam olunca yıldızlar çıkıyor, evlerin ışıkları yanıyor, güneş aya dönüyor. Sadece süs değil: "kahvaltı kaça kadar?" sorusunun cevabı.

**Renk paleti.** Dört zaman, dört palet (zemin / mürekkep / vurgu):
- Sabah: `#F7EDE0` / `#2B1A10` / `#A8401A` (kayısı)
- Öğle: `#F4F1E6` / `#1E1B14` / `#3F6B2A` (yaprak)
- Akşamüstü: `#F2DCC6` / `#2A160F` / `#99301C` (kiremit)
- Gece: `#1A1730` / `#F5EADB` / `#F2B45A` (lamba)

**Yazı tipleri.** Başlıklar *Fraunces* (yumuşak, hafif oyunbaz bir serif; italikleri el yazısı sıcaklığında). Metin ve arayüz *DM Sans*.

**Sayfa düzeni (önce telefon).**
1. Üst şerit: ad + TR/EN.
2. Giriş: büyük başlık, kemerli pencere, saat ve "bu saatte ne var".
3. Menü: yapışkan kategori şeridi, arama, vejetaryen/vegan/glutensiz süzgeçleri. Ürünler kart değil, fiyatı noktalı çizgiyle bağlanan menü satırları. Her ürün "+" ile masa listesine eklenebiliyor; liste garsona gösterilecek tek ekran.
4. Mekân bandı (görsel gelince fotoğraf, gelmezse tipografik).
5. Saatler + WhatsApp rezervasyonu.
Masaüstünde menü iki sütun: solda sabit kategori listesi ve arama, sağda ürünler.

**Hareket.** Tek büyük hareket güneşin doğuşu ve renk geçişleri. `prefers-reduced-motion` açıkken güneş doğrudan yerine konur, geçişler kapanır.

**Görseller.** Üç atmosfer görseli için yer var (`gorseller/`). Dosyalar gelmeden site eksiksiz görünür; pencere sahnesi tamamen SVG ve CSS.
