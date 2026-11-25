(function () {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sakin = matchMedia("(prefers-reduced-motion: reduce)").matches;
const WA = "905000000000";
const wa = m => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;

/* ---------- Örnekler ----------
   yol: örnek sitenin adresi. Siteleri kendi adreslerinde yayınlayınca bu alanları güncelleyin.
   gizli: true olan örnek listede görünmez (Can Auto taslak aşamasında). */
const ISLER = [
  { id: "kafe", sektor: "Kafe", ad: "Gündüz Kahve", isim: "kafem",
    baslik: "Müşteriniz menünüze karekodla ulaşsın.",
    yazi: "Müşteri masadaki karekodu okutur, menüyü telefonunda görür. Fiyat değişince menüyü yeniden bastırmazsınız.",
    ozellik: ["Türkçe ve İngilizce menü", "Arama ve filtre", "WhatsApp'tan rezervasyon"],
    yol: "../1-kafe/", bg: "#F7EDE0", fg: "#2B1A10", vurgu: "#A8401A", vy: "#FFFFFF" },
  { id: "berber", sektor: "Berber", ad: "Perdah Berber", isim: "berber dükkânım",
    baslik: "Müşteriniz randevusunu kendisi alsın.",
    yazi: "Müşteri hizmeti, ustayı ve saati seçer. Randevu talebi WhatsApp'ınıza hazır mesaj olarak gelir.",
    ozellik: ["Hizmet ve fiyat listesi", "Usta ve saat seçimi", "Hazır randevu mesajı"],
    yol: "../2-berber/", bg: "#0E1714", fg: "#EDE6D6", vurgu: "#F0664C", vy: "#14110E" },
  { id: "emlak", sektor: "Emlak", ad: "Eşik Gayrimenkul", isim: "emlak ofisim",
    baslik: "Alıcı evi aramadan önce tanısın.",
    yazi: "Her ilan, kat planı ve oda ölçüleriyle yayınlanır. Alıcı filtreyle aradığını bulur, kredi taksitini de hesaplar.",
    ozellik: ["İlanlar ve filtre", "Kredi hesaplama", "Evinizi satalım formu"],
    yol: "../3-emlak/", bg: "#E9E7DF", fg: "#141B24", vurgu: "#B4371F", vy: "#FFFFFF" },
  { id: "galeri", sektor: "Oto galeri", ad: "Kontak Otomotiv", isim: "galerim",
    baslik: "Araçlarınızın durumu ilanda açıkça görünsün.",
    yazi: "Her araçta boyalı ve değişen parçalar bir şemada gösterilir. Müşteri güvenle gelir, takas teklifini siteden gönderir.",
    ozellik: ["Araç listesi ve filtre", "Ekspertiz şeması", "Takas formu"],
    yol: "../4-galeri/", bg: "#0B0C0E", fg: "#F2F1EC", vurgu: "#F6C915", vy: "#0B0C0E" },
  { id: "mimari", sektor: "Mimari", ad: "Çatkı", isim: "işletmem",
    baslik: "İşinizin kalitesi ilk bakışta anlaşılsın.",
    yazi: "Atölyenizi ve bitmiş işlerinizi etkileyici bir sunumla gösterin. Bu tanıtım sitesi her sektöre uyarlanabilir.",
    ozellik: ["Proje sunumu", "Üretim süreci", "WhatsApp ile iletişim"],
    yol: "../6-mimari/", bg: "#EFE9DD", fg: "#1E1812", vurgu: "#7A5230", vy: "#FFFFFF" },
  { id: "can-auto", sektor: "Oto galeri", ad: "Can Auto", isim: "galerim", gizli: true,
    baslik: "Taslak aşamasında.", yazi: "", ozellik: [],
    yol: "../5-can-auto/", bg: "#F3F4F6", fg: "#0C1424", vurgu: "#1740E6", vy: "#FFFFFF" }
];
const GORUNEN = ISLER.filter(s => !s.gizli);

/* ---------- WhatsApp bağlantıları ---------- */
const MESAJ = {
  genel: "Merhaba, işletmem için web sitesi fiyatı almak istiyorum.",
  bakim: "Merhaba, aylık bakım paketi hakkında bilgi almak istiyorum."
};
$$("[data-wa]").forEach(a => { a.href = wa(MESAJ[a.dataset.wa] || MESAJ.genel); });

/* ---------- Sekmeli vitrin ---------- */
const sekmeler = $("#sekmeler"), kart = $("#kart");
sekmeler.innerHTML = GORUNEN.map((s, i) => `<button type="button" class="sekme" role="tab" id="sekme-${s.id}" aria-controls="kart" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${s.sektor}</button>`).join("");
const dugmeler = $$(".sekme");
let secili = -1;
function kartCiz(s) {
  kart.style.setProperty("--bg", s.bg); kart.style.setProperty("--fg", s.fg); kart.style.setProperty("--vurgu", s.vurgu); kart.style.setProperty("--vy", s.vy);
  kart.setAttribute("aria-labelledby", `sekme-${s.id}`);
  kart.innerHTML = `<div class="k-yazi">
    <p class="k-ust"><span class="f-${s.id}">${s.ad}</span> · ${s.sektor} örneği</p>
    <h3>${s.baslik}</h3>
    <p class="k-acik">${s.yazi}</p>
    <ul class="k-ozellik">${s.ozellik.map(o => `<li>${o}</li>`).join("")}</ul>
    <div class="k-dugmeler">
      <a class="dugme" href="${wa(`Merhaba, ${s.isim} için ${s.ad} örneğine benzer bir site istiyorum. Fiyat bilgisi alabilir miyim?`)}" target="_blank" rel="noopener">Benzerini istiyorum</a>
      <a class="dugme duz ikincil" href="${s.yol}">Örneği aç</a>
    </div>
  </div>
  <div class="k-gorsel" aria-hidden="true">
    <div class="k-tarayici"><img src="gorseller/${s.id}-masaustu.webp" alt="" width="1100" height="672" decoding="async"></div>
    <div class="k-telefon"><img src="gorseller/${s.id}-telefon.webp" alt="" width="520" height="1040" decoding="async"></div>
  </div>`;
}
function sec(i, odakla) {
  if (i === secili) return;
  const ilk = secili === -1; secili = i;
  dugmeler.forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
  if (odakla) dugmeler[i].focus();
  if (ilk || sakin) { kartCiz(GORUNEN[i]); return; }
  kart.classList.add("degisiyor");
  setTimeout(() => { kartCiz(GORUNEN[i]); requestAnimationFrame(() => kart.classList.remove("degisiyor")); }, 160);
}
dugmeler.forEach((b, i) => b.addEventListener("click", () => sec(i)));
sekmeler.addEventListener("keydown", e => {
  const n = dugmeler.length, simdi = Math.max(0, dugmeler.indexOf(document.activeElement)); let i = simdi;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") i = (simdi + 1) % n;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") i = (simdi - 1 + n) % n;
  else if (e.key === "Home") i = 0;
  else if (e.key === "End") i = n - 1;
  else return;
  e.preventDefault(); sec(i, true);
});
sec(0);

/* ---------- Fiyatlar ---------- */
const PAKETLER = [
  { ad: "QR menü", kime: "Kafe, restoran, pastane", fiyat: "2.500 TL",
    madde: ["Karekodla açılan menü", "Türkçe ve İngilizce", "Kategori ve arama", "Baskıya hazır karekod"] },
  { ad: "İşletme sitesi", kime: "Berber, kuaför, kafe, atölye", fiyat: "5.000 TL",
    madde: ["Hizmetler ve fiyatlar", "Online randevu veya rezervasyon", "Çalışma saatleri ve konum", "Tek dokunuşla WhatsApp"] },
  { ad: "İlan sitesi", kime: "Oto galeri, emlak ofisi", fiyat: "10.000 TL",
    madde: ["Araç veya ev ilanları", "Filtre ve ilan sayfaları", "Takas veya değerleme formu", "Ekspertiz ya da kredi bilgisi"] }
];
$("#paketler").innerHTML = PAKETLER.map(p => `<li class="paket"><h3>${p.ad}</h3><p class="kime">${p.kime} için</p>
  <ul>${p.madde.map(m => `<li>${m}</li>`).join("")}</ul>
  <p class="fiyat">${p.fiyat}</p>
  <a class="dugme" href="${wa(`Merhaba, ${p.ad} paketi hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener">WhatsApp'tan sor</a></li>`).join("");

/* ---------- Giriş: telefon yelpazesi ---------- */
const yelpaze = $("#yelpaze");
if (sakin) yelpaze.classList.add("acik"); else setTimeout(() => yelpaze.classList.add("acik"), 250);

/* ---------- Telefonda alt WhatsApp çubuğu ---------- */
const cubuk = $("#altCubuk"), giris = $(".giris"), iletisim = $("#iletisim");
let bekle = false;
function cubukGuncelle() {
  bekle = false;
  const g = giris.getBoundingClientRect(), il = iletisim.getBoundingClientRect();
  cubuk.hidden = !(g.bottom < 0 && il.top > innerHeight * .6);
}
addEventListener("scroll", () => { if (!bekle) { bekle = true; requestAnimationFrame(cubukGuncelle); } }, { passive: true });
addEventListener("resize", cubukGuncelle);
cubukGuncelle();

/* ---------- İletişim: mesaj hazırlayıcı ---------- */
const TUR = ["Kafe / restoran", "Berber / kuaför", "Emlak ofisi", "Oto galeri", "Başka bir iş"], PAKET = ["QR menü", "İşletme sitesi", "İlan sitesi", "Henüz bilmiyorum"];
const hap = (kutu, ad, liste) => { $(kutu).innerHTML = liste.map((d, i) => `<label><input type="radio" name="${ad}" value="${d}"${i === 0 ? " checked" : ""}><span>${d}</span></label>`).join(""); };
hap("#turSec", "tur", TUR); hap("#paketSec", "paket", PAKET);
function brif() {
  const f = Object.fromEntries(new FormData($("#brif"))), ad = (f.ad || "").trim();
  const m = `Merhaba, ${ad ? ad + " için " : "işletmem için "}web sitesi yaptırmak istiyorum.\nİşim: ${f.tur}\n` + (f.paket === "Henüz bilmiyorum" ? "Hangi paketin uygun olduğunu konuşabilir miyiz?" : `İlgilendiğim paket: ${f.paket}`);
  $("#brifMesaj").textContent = m; $("#brifGonder").href = wa(m);
}
$("#brif").addEventListener("input", brif); $("#brif").addEventListener("submit", e => e.preventDefault()); brif();
})();
