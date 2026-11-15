# Kontak Otomotiv — tasarım fikri

**Karakter.** Ankara'da, lafı uzatmayan bir ikinci el galerisi. Gece otoparkı gibi: koyu asfalt, sarı yol çizgileri, net rakamlar. Galericilere duyulan güvensizliği bilen ve cevabını tasarımla veren bir site: her aracın ekspertizi ilanın içinde, sormadan.

**Wow anı — farlar yanıyor.** Sayfa karanlık açılır; yalnızca bir otomobilin ön silueti seçilir. Kontak çevrilir, farlar bir iki kez kırpışıp yanar ve ışık başlığı aydınlatır. "Selektör yap" düğmesiyle uzunlar yakılıp söndürülebilir. Görsel yok, video yok; tamamı SVG ve CSS ışığı.

**İkinci imza — otopark ve ekspertiz şeması.** Vitrin bir otopark: her araç sarı çizgili bir park yerinde, kuşbakışı çizimle duruyor (fotoğraf yerine). Araca girince aynı çizim ekspertiz şemasına dönüşüyor: boyalı parça sarı, değişen parça kırmızı. Türkiye'de araç alan herkesin ilk sorduğu soru, ilk gördüğü şey oluyor.

**Renk paleti.**
- Asfalt `#0B0C0E`, koyu gri `#15171A`, çizgi grisi `#2A2D33`
- Yol sarısı `#F6C915`
- Far beyazı `#F2F1EC`
- Soluk yazı `#9CA1A8`
- Değişen kırmızısı `#E5484D`

**Yazı tipleri.** Başlıklar *Unbounded* (geniş, kendinden emin). Metin *Barlow* (otoyol tabelalarından esinli). Rakamlar, plakalar ve teknik bilgiler *DM Mono*.

**Sayfa düzeni (önce telefon).**
1. Giriş: far animasyonu, başlık, stok sayısı.
2. Otopark (vitrin): kasa tipi, yakıt, vites, marka, fiyat ve kilometre süzgeçleri; "yalnızca boyasız" anahtarı.
3. Araç detayı: yandan açılan panel; künye, ekspertiz şeması, hasar kaydı, donanım, fotoğraf yer tutucuları, WhatsApp ve takas.
4. "Ekspertizi nasıl okuruz": şemanın açıklaması.
5. Takas formu.
6. Galeri ve iletişim.

**Hareket.** Far animasyonu ve park yerlerinin üzerine gelince hafif kıpırtı. `prefers-reduced-motion` açıkken farlar doğrudan yanık gelir.

**Görseller.** İki atmosfer görseli için yer var. Araç fotoğrafları yapay zekâyla üretilmez; ilanlarda yer tutucu kalır.
