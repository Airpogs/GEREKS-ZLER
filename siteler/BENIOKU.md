# Web siteleri

Bu klasörde Claude ile hazırlanmış 7 site var. Her biri kendi klasöründe ve tarayıcıda doğrudan açılabiliyor. Hiçbir sitede kurulum ya da build adımı yok, hepsi düz HTML/CSS/JavaScript.

| Klasör | Ne | Durum |
| --- | --- | --- |
| 1-portfolyo | Freelance vitrin sayfası: örnek işler, paketler (QR menü 2.500 TL, işletme sitesi 5.000 TL, sektörel site 10.000 TL, bakım 750 TL/ay), iletişim | Ad ve WhatsApp numarası yer tutucu ([Adın Soyadın], [0 5XX XXX XX XX], wa.me/905000000000). "Demoyu aç" linkleri claude.ai'deki demolara gidiyor, kendi yayın adresleri olunca güncellenmeli |
| 2-mavera-kahve-qr-menu | Hayali kafe için QR menü: TR/EN, arama, vejetaryen/glutensiz filtre, açık/kapalı durumu, WhatsApp rezervasyon | Demo. Menü verisi index.html içindeki MENU dizisinde |
| 3-usta-makas-berber | Hayali berber: online randevu (hizmet, usta, gün, saat seçimi, WhatsApp mesajı), fiyat listesi, ekip | Demo. Dolu saatler sahte (busy fonksiyonu), gerçek takvim yok |
| 4-avlu-gayrimenkul-emlak | Hayali Eskişehir emlak ofisi: ilan filtreleri, ilan detayı, değerleme formu, kredi hesaplayıcı | Demo |
| 5-rota-otomotiv-galeri | Hayali Bursa oto galerisi: araç vitrini, filtreler, detay sayfası, takas ve "aracınızı alalım" formları, KVKK, yönetim paneli (demo şifresi rota2026) | Ayarlar config.js'te. Supabase bağlanınca gerçek veritabanı ile çalışıyor |
| 6-can-auto-galeri | Rota'nın Can Auto'ya uyarlanmış hali, mavi tema (panel şifresi canauto2026) | Telefon, adres, kuruluş yılı, danışmanlar ve araçlar henüz gerçek değil |
| 7-harrow-and-beam-3d | Hayali İngiliz ahşap ev yapımcısı için kaydırdıkça 3D evin kurulduğu konsept site (İngilizce) | Gösteri amaçlı, dosya büyük (yaklaşık 1,6 MB) |

## Ortak notlar
- WhatsApp butonları örnek numaraya (905000000000) gidiyor. Gerçek müşteride değiştirilmeli.
- Fotoğraf yerine SVG çizimler kullanıldı. Gerçek müşteride gerçek fotoğraflar konmalı.
- Demo sitelerdeki işletmeler hayali. Gerçek bir işletmeye uyarlarken sahte bilgi bırakılmamalı.
- Yerelde açmak için: klasöre gir, `python3 -m http.server 8000` çalıştır, tarayıcıda `localhost:8000` adresini aç.
