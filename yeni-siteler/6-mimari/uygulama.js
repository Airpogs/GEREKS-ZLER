(function () {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sakin = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add(sakin ? "sakin" : "anim");
const sik = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));
const yumusak = (v, a, b) => { const t = sik(v, a, b); return t * t * (3 - 2 * t); };

/* ---------- Ön cephe çizici: ölçülerden ahşap karkas çizer ---------- */
function cephe(o) {
  const S = 40, g = o.g * S, h = o.h * S, n = o.aks, ak = g / n, ust = Math.tan(o.egim * Math.PI / 180) * g / 2, sacak = 26, kat = o.kat || 1;
  const pad = 46, W = g + pad * 2, H = h * kat + ust + pad * 1.5;
  let i = 0; const yol = [];
  const ekle = (d, sinif) => yol.push(`<path${sinif ? ` class="${sinif}"` : ""} pathLength="1" style="--i:${i++}" d="${d}"/>`);
  for (let k = 0; k < kat; k++) {
    const y0 = -k * h, y1 = y0 - h;
    ekle(`M0 ${y0}H${g}`);                                             // taban kirişi
    for (let a = 0; a <= n; a++) ekle(`M${a * ak} ${y0}V${y1}`);         // dikmeler
    for (let a = 0; a < n; a++) {                                       // kuşak ve göğüslemeler
      const x = a * ak, kapi = k === 0 && a === o.kapi, cam = (o.cam || []).includes(a + k * n);
      if (kapi) { ekle(`M${x + ak * .22} ${y0}V${y0 - h * .78}H${x + ak * .78}V${y0}`, "ince"); continue; }
      if (cam) { ekle(`M${x + ak * .18} ${y0 - h * .36}H${x + ak * .82}V${y0 - h * .82}H${x + ak * .18}Z`, "ince"); ekle(`M${x + ak * .5} ${y0 - h * .36}V${y0 - h * .82}`, "ince"); ekle(`M${x} ${y0 - h * .36}H${x + ak}`); continue; }
      ekle(`M${x} ${y0 - h * .5}H${x + ak}`);
      if (a === 0) ekle(`M${x} ${y0 - h * .5}L${x + ak} ${y0}`, "ince"); else if (a === n - 1) ekle(`M${x + ak} ${y0 - h * .5}L${x} ${y0}`, "ince");
    }
    for (let a = 0; a <= n; a++) {                                      // payandalar
      const x = a * ak, b = Math.min(ak * .3, h * .24);
      if (a > 0) ekle(`M${x} ${y1 + b}L${x - b} ${y1}`, "ince"); if (a < n) ekle(`M${x} ${y1 + b}L${x + b} ${y1}`, "ince");
    }
  }
  const yt = -kat * h, tepe = yt - ust;
  ekle(`M${-sacak} ${yt}H${g + sacak}`);                                 // başlık kirişi
  ekle(`M${-sacak} ${yt}L${g / 2} ${tepe}L${g + sacak} ${yt}`);          // mertekler
  ekle(`M${g / 2} ${yt}V${tepe}`);                                      // baba
  ekle(`M${g * .27} ${yt - ust * .54}H${g * .73}`, "ince");              // kuşaklama
  ekle(`M${g / 2} ${yt - ust * .5}L${g * .3} ${yt}M${g / 2} ${yt - ust * .5}L${g * .7} ${yt}`, "ince");
  if (o.sundurma) { const sx = g + o.sundurma * S; ekle(`M${g} ${-h * .92}L${sx + 14} ${-h * .7}`); ekle(`M${sx} ${-h * .73}V0`); ekle(`M${sx} ${-h * .45}L${sx - h * .2} ${-h * .73}`, "ince"); }
  const olcu = o.olcu === false ? "" : `<path class="olcu-c" d="M0 24H${g}M0 18v12M${g} 18v12"/><text x="${g / 2}" y="44">${String(o.g).replace(".", ",")} m</text>`;
  const sag = o.sundurma ? o.sundurma * S + 20 : 0;
  return `<svg class="cephe" viewBox="${-pad} ${-(H - pad * .9)} ${W + sag} ${H + (o.olcu === false ? 0 : 26)}" aria-hidden="true"><path class="zemin" d="M${-pad} 0H${g + pad + sag}"/>${yol.join("")}${olcu}</svg>`;
}

/* ---------- Evler ---------- */
const EVLER = [
  { ad: "Ardıç Evi", yer: "Mudurnu, 2023", acik: "Vadiye bakan yamaçta, tek katlı bir ev. Güney cephesi boydan boya cam; kışın güneş salonun dibine kadar girer.", m2: 96, sure: "9 ay", agac: "Kestane", c: { g: 10.5, h: 2.9, egim: 30, aks: 5, kapi: 2, cam: [1, 3], sundurma: 2.2 } },
  { ad: "Göl Evi", yer: "Abant, 2022", acik: "İki katlı, dik çatılı. Kar yükü için mertekler sık, saçak geniş. Üst kat tek bir uyku salonu.", m2: 128, sure: "11 ay", agac: "Köknar", c: { g: 8, h: 2.7, egim: 48, aks: 4, kat: 2, kapi: 1, cam: [2, 4, 5, 6, 7] } },
  { ad: "Bağ Evi", yer: "Göynük, 2024", acik: "Bağın ortasında, hasat zamanı kalınan küçük bir ev. Tek oda, bir sofa, geniş bir sundurma.", m2: 48, sure: "5 ay", agac: "Sarıçam", c: { g: 6, h: 2.6, egim: 35, aks: 3, kapi: 1, cam: [0], sundurma: 3 } },
  { ad: "Atölye Ev", yer: "Taraklı, 2021", acik: "Altı bir seramik atölyesi, üstü ev. Zemin katta dikmeler açık bırakıldı; iskelet içeriden okunuyor.", m2: 164, sure: "13 ay", agac: "Kestane", c: { g: 12, h: 3, egim: 26, aks: 6, kat: 2, kapi: 3, cam: [0, 1, 4, 5, 7, 8, 9, 10] } }
];
$("#evListe").innerHTML = EVLER.map((e, i) => `<li class="ev"><div class="ev-yazi"><p class="ev-no">${String(i + 1).padStart(2, "0")} / ${String(EVLER.length).padStart(2, "0")}</p><h3>${e.ad}</h3><p class="ev-yer">${e.yer}</p><p class="ev-acik">${e.acik}</p>
  <dl><div><dt>Alan</dt><dd>${e.m2} m²</dd></div><div><dt>Yapım</dt><dd>${e.sure}</dd></div><div><dt>Ağaç</dt><dd>${e.agac}</dd></div></dl></div>
  <div class="ev-cizim" role="img" aria-label="${e.ad} ön cephe çizimi, genişlik ${String(e.c.g).replace(".", ",")} metre">${cephe(e.c)}</div></li>`).join("");
if ("IntersectionObserver" in window && !sakin) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("gorundu"); io.unobserve(e.target); } }), { threshold: .3 });
  $$(".ev").forEach(e => io.observe(e));
} else $$(".ev").forEach(e => e.classList.add("gorundu"));

/* ---------- Hikâye sahnesi ---------- */
const iskelet = $("#iskelet");
iskelet.innerHTML = cephe({ g: 9, h: 2.8, egim: 38, aks: 4, kapi: 1, cam: [2], olcu: false });
const isCephe = iskelet.querySelector(".cephe");
const perdeler = $$(".perde"), sahne = $(".sahne"), hikaye = $("#hikaye"), tuval = $("#agac");

const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FS = `precision highp float;
uniform vec2 r;uniform vec2 c;uniform vec2 m;uniform float p;uniform float g;uniform float R;
float h21(vec2 v){v=fract(v*vec2(123.34,456.21));v+=dot(v,v+45.32);return fract(v.x*v.y);}
float gur(vec2 v){vec2 i=floor(v),f=fract(v);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 v){float s=0.,k=.5;for(int i=0;i<5;i++){s+=k*gur(v);v=v*2.03+17.1;k*=.5;}return s;}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
  vec3 kagit=vec3(.937,.914,.867);
  kagit-=.018*(fbm(uv*220.)-.5);
  float z=mix(1.,3.2,smoothstep(.6,.92,p));
  vec2 q=(uv-c)*z;
  float aci=atan(q.y,q.x);
  float d=length(q*vec2(1.,1.05));
  float dd=d+.05*(fbm(q*2.6+3.)-.5)+.018*(fbm(q*8.+9.)-.5)+.006*sin(aci*5.+fbm(q*3.)*6.);
  float buyu=R*g;
  float hal=dd/R*80.;
  float fr=fract(hal);
  float gec=smoothstep(0.,.35,fr)*(1.-smoothstep(.72,1.,fr));
  vec3 ilk=vec3(.905,.80,.63),son=vec3(.66,.47,.28);
  float yil=h21(vec2(floor(hal),3.));
  vec3 odun=mix(son,ilk,gec*(.75+.25*yil));
  odun=mix(odun*vec3(.80,.70,.60),odun,smoothstep(.05,.55,dd/R));
  odun*=.955+.09*gur(vec2(aci*70.,dd*160.));
  odun+=.035*smoothstep(.72,1.,gur(vec2(aci*110.,dd*9.)));
  float catlak=smoothstep(.012,0.,abs(aci-1.9+.25*(fbm(q*5.)-.5))*dd)*smoothstep(.05,.2,dd)*(1.-smoothstep(buyu*.55,buyu*.75,dd));
  odun*=1.-.5*catlak;
  float kabukIc=buyu-.022*smoothstep(.2,1.,g);
  vec3 kabuk=vec3(.24,.17,.11)*(.8+.5*fbm(vec2(aci*30.,dd*40.)));
  odun=mix(odun,kabuk,smoothstep(kabukIc,kabukIc+.006,dd)*step(.05,g));
  odun+=.05*exp(-7.*distance(uv,m));
  float govde=1.-smoothstep(buyu-.004,buyu+.003,dd);
  float golge=(1.-smoothstep(buyu*.9,buyu+.09,length((q-vec2(.018,-.028))*vec2(1.,1.05))))*.2;
  vec3 col=mix(kagit*(1.-golge),odun,govde);
  float s=R*.56;
  float k1=smoothstep(.24,.36,p),k2=smoothstep(.4,.58,p);
  float cizgi=(smoothstep(.0045,.0015,abs(abs(q.x)-s))+smoothstep(.0045,.0015,abs(abs(q.y)-s)))*govde;
  col=mix(col,vec3(.12,.09,.07),clamp(cizgi,0.,1.)*k1*(1.-k2*.6));
  float kare=step(abs(q.x),s)*step(abs(q.y),s);
  float kg=(1.-smoothstep(s*.9,s+.07,max(abs(q.x-.014),abs(q.y+.022))))*.22;
  vec3 kesik=mix(kagit*(1.-kg*k2),col,kare);
  col=mix(col,kesik,k2);
  col=mix(col,kagit,smoothstep(.8,.95,p));
  gl_FragColor=vec4(col,1.);
}`;
let gl = null, U = {}, buyume = sakin ? 1 : 0, fare = [0, 0], ilerleme = 0, kirli = true;
function glKur() {
  try { gl = tuval.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" }); } catch (e) { gl = null; }
  if (!gl) return false;
  const derle = (tip, kod) => { const s = gl.createShader(tip); gl.shaderSource(s, kod); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const v = derle(gl.VERTEX_SHADER, VS), f = derle(gl.FRAGMENT_SHADER, FS); if (!v || !f) return false;
  const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
  gl.useProgram(pr); gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  ["r", "c", "m", "p", "g", "R"].forEach(n => U[n] = gl.getUniformLocation(pr, n));
  return true;
}
let genis = 0, yuk = 0;
function boyut() {
  const b = tuval.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1.5 : 1.25);
  genis = Math.max(2, Math.round(b.width * dpr)); yuk = Math.max(2, Math.round(b.height * dpr));
  if (tuval.width !== genis || tuval.height !== yuk) { tuval.width = genis; tuval.height = yuk; }
  kirli = true;
}
function ciz() {
  if (!gl || !kirli) return; kirli = false;
  const yatay = genis > yuk * 1.15, oran = Math.max(genis, yuk) / Math.min(genis, yuk);
  gl.viewport(0, 0, genis, yuk);
  gl.uniform2f(U.r, genis, yuk);
  if (sakin) gl.uniform2f(U.c, 0, 0); else gl.uniform2f(U.c, yatay ? Math.min(.36, oran / 2 - .46) : 0, yatay ? .02 : Math.min(.3, oran / 2 - .5));
  gl.uniform2f(U.m, fare[0], fare[1]); gl.uniform1f(U.p, sakin ? 0 : ilerleme); gl.uniform1f(U.g, buyume); gl.uniform1f(U.R, yatay ? .4 : .43);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function sahneGuncelle() {
  const r = hikaye.getBoundingClientRect(), p = sakin ? 0 : sik(-r.top / (r.height - innerHeight), 0, 1);
  if (p !== ilerleme) { ilerleme = p; kirli = true; }
  if (sakin) return;
  const gor = [1 - yumusak(p, .16, .26), yumusak(p, .28, .36) * (1 - yumusak(p, .54, .62)), yumusak(p, .68, .78)];
  perdeler.forEach((el, i) => { el.style.opacity = gor[i].toFixed(3); el.style.transform = `translateY(${((1 - gor[i]) * (i === 0 ? -24 : 24)).toFixed(1)}px)`; el.style.pointerEvents = gor[i] > .5 ? "auto" : "none"; });
  iskelet.style.opacity = yumusak(p, .66, .76).toFixed(3);
  isCephe.style.setProperty("--ciz", (1 - yumusak(p, .68, .96)).toFixed(3));
  $(".sayac").style.opacity = (1 - yumusak(p, .2, .3)).toFixed(3);
  $("#ipucu").style.opacity = p > .02 ? 0 : 1;
}
if (glKur()) {
  boyut();
  const t0 = performance.now();
  (function dongu(n) {
    if (buyume < 1) { const k = Math.min(1, (n - t0 - 250) / 3200); buyume = k <= 0 ? 0 : 1 - Math.pow(1 - k, 2.4); $("#halka").textContent = Math.round(buyume * 80); kirli = true; }
    ciz(); requestAnimationFrame(dongu);
  })(t0);
  if (sakin) $("#halka").textContent = "80";
  addEventListener("resize", () => { boyut(); sahneGuncelle(); });
  addEventListener("pointermove", e => { if (e.pointerType !== "mouse" || ilerleme > .6) return; const b = tuval.getBoundingClientRect(), k = Math.min(b.width, b.height); fare = [(e.clientX - b.left - b.width / 2) / k, -(e.clientY - b.top - b.height / 2) / k]; kirli = true; }, { passive: true });
  tuval.addEventListener("webglcontextlost", e => e.preventDefault());
  tuval.addEventListener("webglcontextrestored", () => { glKur(); kirli = true; });
} else { tuval.remove(); sahne.classList.add("gl-yok"); $("#halka").textContent = "80"; }
let bekle = false;
addEventListener("scroll", () => { if (!bekle) { bekle = true; requestAnimationFrame(() => { bekle = false; sahneGuncelle(); }); } }, { passive: true });
sahneGuncelle();

/* ---------- Geçme ---------- */
(function () {
  const kol = $("#gecmeKol"), kiris = $("#gecmeKiris"), kavela = $("#gecmeKavela"), durum = $("#gecmeDurum");
  let oynatildi = false;
  function uygula() {
    const v = kol.value / 100; kiris.setAttribute("transform", `translate(${((1 - v) * 130).toFixed(1)} 0)`);
    kavela.classList.toggle("var", v > .985);
    durum.textContent = v > .985 ? "Oturdu, kilitlendi." : v > .55 ? "Az kaldı" : v > .05 ? "Geliyor" : "Açık";
    kol.setAttribute("aria-valuetext", durum.textContent);
  }
  kol.addEventListener("input", () => { oynatildi = true; uygula(); });
  uygula();
  if (!sakin && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting || oynatildi) return; oynatildi = true; io.disconnect();
      const t0 = performance.now(); (function adim(n) { const k = Math.min(1, (n - t0 - 300) / 1500); if (k > 0) { kol.value = Math.round((k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2) * 100); uygula(); } if (k < 1) requestAnimationFrame(adim); })(t0);
    }), { threshold: .6 });
    io.observe($(".gecme-cizim"));
  }
})();

/* ---------- Görseller ---------- */
$$("[data-foto] > .foto").forEach(img => { const bak = () => { if (img.naturalWidth > 8) img.parentElement.classList.add("foto-var"); }; img.complete ? bak() : img.addEventListener("load", bak); });
})();
