(function () {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sakin = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add(sakin ? "sakin" : "anim");
const WA = "905000000000";

/* ---------- İşler: her sitenin adresi, kimliği ve tek cümlesi ----------
   Siteleri kendi adreslerinde yayınlayınca "yol" alanlarını o adreslerle değiştirin. */
const ISLER = [
  { id: "kafe", ad: "Gündüz Kahve", tur: "Kafe · QR menü", yazi: "Güneşi sürükleyince saat ilerliyor; menü o saatte ne servis edildiğini gösteriyor. Arama, Türkçe ve İngilizce, WhatsApp'tan rezervasyon.", yol: "../1-kafe/", bg: "#F7EDE0", fg: "#2B1A10", vurgu: "#A8401A" },
  { id: "berber", ad: "Perdah Berber", tur: "Berber · online randevu", yazi: "Başlık tıraş köpüğüyle kaplı açılıyor, parmakla siliniyor. Hizmet, usta, gün ve saat seçilince randevu mesajı fişiyle birlikte hazır.", yol: "../2-berber/", bg: "#0E1714", fg: "#EDE6D6", vurgu: "#F0664C" },
  { id: "emlak", ad: "Eşik Gayrimenkul", tur: "Emlak ofisi · ilan vitrini", yazi: "İlanların yüzü fotoğraf değil, kendini çizen kat planı. Süzgeçler, oda oda metrekare, kredi hesabı ve \"evinizi satalım\" formu.", yol: "../3-emlak/", bg: "#E9E7DF", fg: "#141B24", vurgu: "#B4371F" },
  { id: "galeri", ad: "Kontak Otomotiv", tur: "Oto galeri · stok ve ekspertiz", yazi: "Farlar yanıyor, başlık aydınlanıyor. Araçlar bir otoparkta kuşbakışı duruyor; her ilanda boyalı ve değişen parçayı gösteren ekspertiz şeması.", yol: "../4-galeri/", bg: "#0B0C0E", fg: "#F2F1EC", vurgu: "#F6C915" },
  { id: "can-auto", ad: "Can Auto", tur: "Oto galeri · gerçek işletme, hazırlıkta", yazi: "Kaydırdıkça küçük bir araba satın alma yolunda ilerliyor. Galeriden bilgi gelene kadar her eksik bilgi sarı yer tutucu; uydurma tek satır yok.", yol: "../5-can-auto/", bg: "#F3F4F6", fg: "#0C1424", vurgu: "#1740E6" },
  { id: "mimari", ad: "Çatkı", tur: "Ahşap ev atölyesi · tanıtım", yazi: "Açılışta bir tomruğun yıl halkaları tarayıcıda canlı çiziliyor. Kaydırdıkça tomruk kirişe, kiriş evin iskeletine dönüşüyor.", yol: "../6-mimari/", bg: "#EFE9DD", fg: "#1E1812", vurgu: "#7A5230" }
];
const N = ISLER.length, iki = n => String(n).padStart(2, "0");
$("#vTelefon").innerHTML = ISLER.map((s, i) => `<img src="gorseller/${s.id}-telefon.webp" alt="" width="520" height="1040"${i ? ' loading="lazy"' : ""} decoding="async">`).join("");
$("#vTarayici").insertAdjacentHTML("beforeend", ISLER.map(s => `<img src="gorseller/${s.id}-masaustu.webp" alt="" width="1100" height="672" loading="lazy" decoding="async">`).join(""));
$("#vYazi").innerHTML = ISLER.map((s, i) => `<article class="is" style="--bg:${s.bg};--fg:${s.fg};--vurgu:${s.vurgu}" aria-label="${s.ad}">
  <img class="kucuk-tel" src="gorseller/${s.id}-telefon.webp" alt="${s.ad} sitesinin telefondaki görünümü" width="520" height="1040" loading="lazy" decoding="async">
  <p class="is-tur">${iki(i + 1)} · ${s.tur}</p><h3 class="f-${s.id}">${s.ad}</h3><p>${s.yazi}</p>${s.yol ? `<a class="is-bag" href="${s.yol}">Siteyi açın <span aria-hidden="true">→</span></a>` : ""}</article>`).join("");
$("#vNokta").innerHTML = ISLER.map((s, i) => `<li><button type="button" aria-label="${s.ad}"></button></li>`).join("");
const vitrin = $("#vitrin"), isler = $("#isler"), yazilar = $$(".is"), telImg = $$("#vTelefon img"), tarImg = $$("#vTarayici img"), noktalar = $$("#vNokta button");
let secili = -1;
function sec(i) {
  if (i === secili) return; secili = i; const s = ISLER[i];
  vitrin.style.setProperty("--bg", s.bg); vitrin.style.setProperty("--fg", s.fg); vitrin.style.setProperty("--vurgu", s.vurgu);
  [telImg, tarImg].forEach(l => l.forEach((im, k) => { im.classList.toggle("on", k === i); im.classList.toggle("gecti", k < i); }));
  yazilar.forEach((y, k) => y.classList.toggle("on", k === i));
  noktalar.forEach((b, k) => k === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current"));
  $("#vSay").textContent = `${iki(i + 1)} / ${iki(N)}`;
}
function kaydi() {
  if (sakin) return; const r = isler.getBoundingClientRect(), p = Math.max(0, Math.min(.9999, -r.top / (r.height - innerHeight)));
  sec(Math.floor(p * N));
}
noktalar.forEach((b, i) => b.addEventListener("click", () => { const ust = isler.getBoundingClientRect().top + scrollY; scrollTo({ top: ust + (i + .5) / N * (isler.offsetHeight - innerHeight), behavior: sakin ? "auto" : "smooth" }); }));
let bekle = false; addEventListener("scroll", () => { if (!bekle) { bekle = true; requestAnimationFrame(() => { bekle = false; kaydi(); }); } }, { passive: true });
addEventListener("resize", kaydi);
sec(0); kaydi();

/* ---------- Giriş: telefon yelpazesi ---------- */
const yelpaze = $("#yelpaze");
if (sakin) yelpaze.classList.add("acik"); else {
  setTimeout(() => yelpaze.classList.add("acik"), 350);
  addEventListener("pointermove", e => { if (e.pointerType !== "mouse" || scrollY > innerHeight) return; yelpaze.style.setProperty("--kx", ((e.clientX / innerWidth - .5) * -26).toFixed(1) + "px"); }, { passive: true });
}

/* ---------- İletişim: mesaj hazırlayıcı ---------- */
const TUR = ["Kafe ya da lokanta", "Berber ya da kuaför", "Oto galeri", "Emlak ofisi", "Başka bir iş"], PAKET = ["QR menü", "İşletme sitesi", "Sektörel site", "Emin değilim"];
const hap = (kutu, ad, liste) => { $(kutu).innerHTML = liste.map((d, i) => `<label><input type="radio" name="${ad}" value="${d}"${i === 0 ? " checked" : ""}><span>${d}</span></label>`).join(""); };
hap("#turSec", "tur", TUR); hap("#paketSec", "paket", PAKET);
function brif() {
  const f = Object.fromEntries(new FormData($("#brif"))), ad = (f.ad || "").trim();
  const isim = { "Kafe ya da lokanta": "kafem", "Berber ya da kuaför": "dükkânım", "Oto galeri": "galerim", "Emlak ofisi": "emlak ofisim", "Başka bir iş": "işletmem" }[f.tur];
  const m = `Merhaba, ${isim}${ad ? " (" + ad + ")" : ""} için web sitesi yaptırmak istiyorum. ` + (f.paket === "Emin değilim" ? "Hangi paketin uygun olduğunu konuşabilir miyiz?" : `${f.paket} paketini düşünüyorum. Bilgi alabilir miyim?`);
  $("#brifMesaj").textContent = m; $("#brifGonder").href = `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
}
$("#brif").addEventListener("input", brif); $("#brif").addEventListener("submit", e => e.preventDefault()); brif();
})();
