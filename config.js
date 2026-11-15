/* =====================================================================
   SİTE AYARLARI
   Yeni bir galeri için siteyi uyarlarken önce bu dosyayı düzenleyin.
   Tırnak işaretlerinin (" ") içindeki yazıları değiştirin, tırnakları silmeyin.
   ===================================================================== */

window.SITE = {
  name: "Can Auto",               // Galerinin tam adı
  short: "CAN",                        // Logodaki kısa ad
  tagline: "Auto",                  // Logonun altındaki küçük yazı
  legalName: "Can Auto",           // KVKK metninde geçecek resmi unvan
  seoTitle: "Ekspertizli ikinci el araç alım, satım ve takas",
  heroEyebrow: "İkinci el araç alım · satım · takas",
  founded: 0,                        // Kuruluş yılı (tecrübe yılı buradan hesaplanır, 0 ise kutu gizlenir)

  phone: "0 5XX XXX XX XX",              // Sitede görünen telefon
  whatsapp: "",           // WhatsApp numarası
  email: "info@canauto.com",
  address1: "Galeri adresi buraya gelecek",
  address2: "İlçe / İl",
  hoursShort: "Pzt–Cmt 09.00–20.00 · Pazar 11.00–18.00",
  hoursLong: "Pazartesi–Cumartesi 09.00–20.00 · Pazar 11.00–18.00",
  mapsUrl: "https://www.google.com/maps",
  mapQuery: "",                         // Doluysa iletişim bölümünde gerçek Google haritası çıkar. Örn. "Can Auto, Ataşehir, İstanbul"
  instagram: "",                        // Örn. "https://instagram.com/galeriadi" (boşsa buton gizlenir)
  ilanUrl: "",                          // Sahibinden / Arabam.com galeri sayfası (boşsa buton gizlenir)
  ilanLabel: "Tüm ilanlarımız",         // O butonun üzerindeki yazı
  about: "Ekspertizli ikinci el araç alım, satım ve takas.",

  heroImage: "",                        // Kapak görseli. Boşsa vitrindeki ilk aracın fotoğrafı kullanılır. Örn. "img/kapak.jpg"
  showroomImage: "",                    // "Neden biz" bölümündeki galeri görseli. Örn. "img/galeri.jpg"

  // Satış danışmanları (c = profil rengi). Boş bırakılırsa "Ekibimiz" bölümü gizlenir.
  agents: [],                          // Örn. {ad:"Ad Soyad", rol:"Satış danışmanı", tel:"0 5XX XXX XX XX", c:"#1D4FB8"}

  demoNotice: true,      // true: "örnek tasarım" notları görünür. Gerçek müşteride false yapın.
  demoPassword: "canauto2026" // Sadece veritabanı bağlı değilken (demo modu) kullanılan panel şifresi
};

/* =====================================================================
   VERİTABANI BAĞLANTISI (Supabase)
   Kurulum rehberindeki adımlarla doldurun.
   Boş bırakılırsa site "demo modunda" çalışır: panelde yapılan değişiklikler
   sadece o tarayıcıda saklanır.
   ===================================================================== */

window.SUPABASE_URL = "";       // Örn. "https://abcdxyz.supabase.co"
window.SUPABASE_ANON_KEY = "";  // Supabase'deki anon (public) ya da publishable anahtar
