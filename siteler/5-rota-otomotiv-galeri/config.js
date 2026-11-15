/* =====================================================================
   SİTE AYARLARI
   Yeni bir galeri için siteyi uyarlarken önce bu dosyayı düzenleyin.
   Tırnak işaretlerinin (" ") içindeki yazıları değiştirin, tırnakları silmeyin.
   ===================================================================== */

window.SITE = {
  name: "Rota Otomotiv",               // Galerinin tam adı
  short: "ROTA",                        // Logodaki kısa ad
  tagline: "Otomotiv",                  // Logonun altındaki küçük yazı
  legalName: "Rota Otomotiv",           // KVKK metninde geçecek resmi unvan
  seoTitle: "Bursa'da ekspertizli ikinci el araç",
  heroEyebrow: "Bursa · Nilüfer · 2011'den beri",
  founded: 2011,                        // Kuruluş yılı (tecrübe yılı buradan hesaplanır)

  phone: "0224 555 16 16",              // Sitede görünen telefon
  whatsapp: "0224 555 16 16",           // WhatsApp numarası
  email: "satis@rotaotomotiv.com",
  address1: "Oto Galericiler Sitesi, B Blok No: 14",
  address2: "Nilüfer / Bursa",
  hoursShort: "Pzt–Cmt 09.00–20.00 · Pazar 11.00–18.00",
  hoursLong: "Pazartesi–Cumartesi 09.00–20.00 · Pazar 11.00–18.00",
  mapsUrl: "https://www.google.com/maps/search/Nil%C3%BCfer+Bursa",
  instagram: "",                        // Örn. "https://instagram.com/galeriadi" (boşsa buton gizlenir)
  about: "Bursa'da 2011'den beri ekspertizli ikinci el araç alım, satım ve takas.",

  // Satış danışmanları (c = profil rengi)
  agents: [
    { ad: "Murat Yıldız", rol: "Galeri sahibi · Satış", tel: "0532 555 40 12", c: "#A3262A" },
    { ad: "Burak Şahin",  rol: "Takas ve araç alımı",   tel: "0533 555 71 09", c: "#24364F" },
    { ad: "Ece Korkmaz",  rol: "Kredi ve noter işlemleri", tel: "0535 555 28 66", c: "#6B5A3E" }
  ],

  demoNotice: true,      // true: "örnek tasarım" notları görünür. Gerçek müşteride false yapın.
  demoPassword: "rota2026" // Sadece veritabanı bağlı değilken (demo modu) kullanılan panel şifresi
};

/* =====================================================================
   VERİTABANI BAĞLANTISI (Supabase)
   Kurulum rehberindeki adımlarla doldurun.
   Boş bırakılırsa site "demo modunda" çalışır: panelde yapılan değişiklikler
   sadece o tarayıcıda saklanır.
   ===================================================================== */

window.SUPABASE_URL = "";       // Örn. "https://abcdxyz.supabase.co"
window.SUPABASE_ANON_KEY = "";  // Supabase'deki anon (public) ya da publishable anahtar
