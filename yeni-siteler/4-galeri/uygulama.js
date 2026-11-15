(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sakin=matchMedia("(prefers-reduced-motion: reduce)").matches;
const WA="905000000000", ARACLAR=window.ARACLAR;
const tl=n=>n.toLocaleString("tr-TR")+" ₺", km=n=>n.toLocaleString("tr-TR")+" km";
const kacis=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ad=a=>`${a.yil} ${a.marka} ${a.model}`;
const RENK={Beyaz:"#E6E6E0",Gri:"#7D838B","Gümüş":"#B7BCC2",Siyah:"#2B2F36",Lacivert:"#27407A","Kırmızı":"#B3262E",Turuncu:"#C4601F"};
const KASA={sedan:"Sedan",hatchback:"Hatchback",suv:"SUV",station:"Station"};
const PARCA={kaput:"Kaput",tavan:"Tavan",bagaj:"Bagaj kapağı",sof:"Sol ön çamurluk",sok:"Sol ön kapı",sak:"Sol arka kapı",saf:"Sol arka çamurluk",gof:"Sağ ön çamurluk",gok:"Sağ ön kapı",gak:"Sağ arka kapı",gaf:"Sağ arka çamurluk"};
const DURUM={l:"lokal boyalı",b:"boyalı",d:"değişen"};
document.body.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="lokal" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="7" height="7" fill="#1B1E22"/><rect width="3" height="7" fill="#F6C915"/></pattern></defs></svg>`);

/* ---------- Kuşbakışı araç çizimi (vitrin ve ekspertiz aynı çizimi kullanır) ---------- */
const OLCU={sedan:[92,96,58,120],hatchback:[86,112,16,120],suv:[94,134,14,132],station:[92,150,14,120]};
function kus(a,eks){
  const [K,T,B,w]=OLCU[a.kasa], s=20, x0=(200-w)/2, x1=x0+w, y0=12, yT1=y0+24, yK=yT1+K, yC1=yK+30, yTav=yC1+T, yC2=yTav+28, yB=yC2+B, yE=yB+22, yD=yTav+10, yM=(yK+yD)/2, H=yE+12;
  const ic=y=>y<yC1?s+6*(y-yK)/30:y<=yTav?s+6:s+6-6*(y-yTav)/28;
  const boya=RENK[a.renk]||"#888", P=(id,noktalar)=>{const d="M"+noktalar.map(p=>p.join(" ")).join("L")+"Z", ayna="M"+noktalar.map(p=>[200-p[0],p[1]].join(" ")).join("L")+"Z";
    return id.length===1?`<path class="parca govde ${eks?(a.eks[id[0]]||""):""}" d="${d}"${eks?"":` fill="${boya}"`}/>`:`<path class="parca govde ${eks?(a.eks[id[0]]||""):""}" d="${d}"${eks?"":` fill="${boya}"`}/><path class="parca govde ${eks?(a.eks[id[1]]||""):""}" d="${ayna}"${eks?"":` fill="${boya}"`}/>`};
  const tf=eks?"":` fill="${boya}"`;
  return `<svg class="kus${eks?" eks":""}" viewBox="0 0 200 ${H}" role="img" aria-label="${kacis(eks?ad(a)+" ekspertiz şeması":ad(a)+", "+a.renk.toLocaleLowerCase("tr")+", kuşbakışı çizim")}">
  <ellipse class="ayna govde" cx="${x0-4}" cy="${yK+10}" rx="8" ry="4.5"${eks?' fill="#1B1E22"':tf}/><ellipse class="ayna govde" cx="${x1+4}" cy="${yK+10}" rx="8" ry="4.5"${eks?' fill="#1B1E22"':tf}/>
  <path class="tampon govde"${tf} d="M${x0+16} ${y0}Q100 ${y0-9} ${x1-16} ${y0}Q${x1} ${y0+3} ${x1} ${yT1}H${x0}Q${x0} ${y0+3} ${x0+16} ${y0}Z"/>
  <path class="tampon govde"${tf} d="M${x0} ${yB}H${x1}Q${x1} ${yE-3} ${x1-14} ${yE}Q100 ${yE+5} ${x0+14} ${yE}Q${x0} ${yE-3} ${x0} ${yB}Z"/>
  ${P(["kaput"],[[x0+s,yT1],[x1-s,yT1],[x1-s,yK],[x0+s,yK]])}${P(["sof","gof"],[[x0,yT1],[x0+s,yT1],[x0+s,yK],[x0,yK]])}
  ${P(["sok","gok"],[[x0,yK],[x0+s,yK],[x0+s+6,yC1],[x0+s+6,yM],[x0,yM]])}${P(["sak","gak"],[[x0,yM],[x0+s+6,yM],[x0+s+6,yTav],[x0+ic(yD),yD],[x0,yD]])}
  ${P(["saf","gaf"],[[x0,yD],[x0+ic(yD),yD],[x0+s,yC2],[x0+s,yB],[x0,yB]])}${P(["tavan"],[[x0+s+6,yC1],[x1-s-6,yC1],[x1-s-6,yTav],[x0+s+6,yTav]])}${P(["bagaj"],[[x0+s,yC2],[x1-s,yC2],[x1-s,yB],[x0+s,yB]])}
  <path class="cam" d="M${x0+s} ${yK}H${x1-s}L${x1-s-6} ${yC1}H${x0+s+6}Z"/><path class="cam" d="M${x0+s+6} ${yTav}H${x1-s-6}L${x1-s} ${yC2}H${x0+s}Z"/>
  ${eks?"":`<path d="M${x0+s+12} ${yT1+10}V${yK-12}M${x1-s-12} ${yT1+10}V${yK-12}" stroke="#000" stroke-opacity=".18" stroke-width="2" fill="none"/><path d="M${x0+7} ${y0+9}h18M${x1-25} ${y0+9}h18" stroke="#FFF6D0" stroke-width="5" stroke-linecap="round"/><path d="M${x0+7} ${yE-8}h16M${x1-23} ${yE-8}h16" stroke="#D2343B" stroke-width="4" stroke-linecap="round"/>`}</svg>`;
}
function eksOzet(a){const d=Object.values(a.eks);if(!d.length)return ["Boyasız","temiz"];const dg=d.filter(x=>x==="d").length;if(dg)return [dg+" değişen"+(d.length>dg?" + boya":""),"degisen"];const b=d.filter(x=>x==="b").length;return b?[b+" boyalı parça","boyali"]:[d.length+" lokal boya","boyali"]}

/* ---------- Otopark ---------- */
const suzgec=$("#suzgec");
$("#kasaSec").innerHTML=`<label><input type="radio" name="kasa" value="" checked><span>Hepsi</span></label>`+Object.keys(KASA).map(k=>`<label><input type="radio" name="kasa" value="${k}"><span>${KASA[k]}</span></label>`).join("");
$("#sMarka").insertAdjacentHTML("beforeend",[...new Set(ARACLAR.map(a=>a.marka))].sort().map(m=>`<option>${m}</option>`).join(""));
$("#takasHedef").insertAdjacentHTML("beforeend",ARACLAR.map(a=>`<option value="${a.no}">${ad(a)} · ${tl(a.fiyat)}</option>`).join(""));
function otoparkCiz(){
  const f=Object.fromEntries(new FormData(suzgec));
  $("#fiyatO").textContent=+f.fiyat>=2200000?"Fiyat: sınır yok":"En çok "+tl(+f.fiyat);$("#kmO").textContent=+f.km>=200000?"Kilometre: sınır yok":"En çok "+km(+f.km);
  const l=ARACLAR.filter(a=>(!f.kasa||a.kasa===f.kasa)&&(!f.marka||a.marka===f.marka)&&(!f.yakit||a.yakit===f.yakit)&&(!f.vites||a.vites===f.vites)&&(+f.fiyat>=2200000||a.fiyat<=+f.fiyat)&&(+f.km>=200000||a.km<=+f.km)&&(!f.boyasiz||!Object.keys(a.eks).length));
  l.sort({yeni:(a,b)=>b.no.localeCompare(a.no),ucuz:(a,b)=>a.fiyat-b.fiyat,pahali:(a,b)=>b.fiyat-a.fiyat,km:(a,b)=>a.km-b.km,yil:(a,b)=>b.yil-a.yil}[f.sira]);
  $("#parklar").innerHTML=l.map(a=>{const [yazi,sinif]=eksOzet(a);return `<li class="park"><span class="park-no" aria-hidden="true">${a.no.slice(3)}</span><span class="park-rozet ${sinif}">${yazi}</span>
    <div class="park-arac">${kus(a)}</div><div class="kunye"><h3><a href="#arac-${a.no}">${ad(a)}</a></h3><p>${a.paket}</p><p class="km">${km(a.km)} · ${a.yakit} · ${a.vites}</p><strong>${tl(a.fiyat)}</strong></div></li>`}).join("");
  $("#bos").hidden=l.length>0;$("#sayac").textContent=l.length===ARACLAR.length?`${l.length} araç parkta`:`${ARACLAR.length} araçtan ${l.length} tanesi`;
}
suzgec.addEventListener("input",otoparkCiz);suzgec.addEventListener("reset",()=>setTimeout(otoparkCiz));
$("#stokYazi").textContent=`Stokta ${ARACLAR.length} araç · hepsi ekspertizli`;
$("#eksOrnek").innerHTML=kus(ARACLAR.find(a=>a.no==="KT-05"),true)+`<p>Örnek: sol ön kapı değişen, sol ön çamurluk boyalı</p>`;

/* ---------- Araç detayı ---------- */
const dlg=$("#detay");
function detayAc(no){
  const a=ARACLAR.find(x=>x.no===no);if(!a)return;
  const msg=`Merhaba, ${a.no} numaralı ${ad(a)} (${tl(a.fiyat)}) hakkında bilgi almak istiyorum.`, eks=Object.entries(a.eks);
  const oz=(dt,dd)=>`<div><dt>${dt}</dt><dd>${dd}</dd></div>`;
  $("#detayIc").innerHTML=`<div class="d-ust"><span>${a.no} · ${KASA[a.kasa]}</span><button type="button" class="d-kapat" id="dKapat">Kapat ✕</button></div>
  <div class="d-govde"><h2 id="dBaslik">${ad(a)}</h2><p class="d-paket">${a.paket}</p><p class="d-fiyat">${tl(a.fiyat)}</p>
   <dl class="d-ozet">${oz("Kilometre",km(a.km))+oz("Yakıt",a.yakit)+oz("Vites",a.vites)+oz("Motor",a.motor)+oz("Renk",a.renk)+oz("Kasa",KASA[a.kasa])}</dl>
   <h3>Ekspertiz</h3><div class="d-eks">${kus(a,true)}<ul>${eks.length?eks.map(([p,d])=>`<li><i class="${d}"></i>${PARCA[p]}: ${DURUM[d]}</li>`).join("")+`<li><i></i>Diğer ${11-eks.length} parça orijinal</li>`:`<li><i></i>11 parçanın tamamı orijinal</li>`}</ul></div>
   <p class="d-hasar">Hasar kaydı: ${a.hasar?tl(a.hasar):"yok"} · Rapor galeride, isteyene gönderilir</p>
   <h3>Bizim notumuz</h3><p class="d-not">${a.not}</p>
   <h3>Öne çıkan donanım</h3><ul class="d-don">${a.don.map(d=>`<li>${d}</li>`).join("")}</ul>
   <h3>Fotoğraflar</h3><div class="d-foto"><div>Fotoğraf yeri<br>Dış</div><div>Fotoğraf yeri<br>İç</div><div>Fotoğraf yeri<br>Gösterge</div></div></div>
  <div class="d-eylem"><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">WhatsApp'tan sor</a><button type="button" class="dugme hayalet" id="dTakas">Takas teklifi al</button></div>`;
  if(!dlg.open)dlg.showModal();dlg.scrollTop=0;
  $("#dKapat").addEventListener("click",()=>dlg.close());
  $("#dTakas").addEventListener("click",()=>{dlg.close();$("#takasHedef").value=a.no;$("#takas").scrollIntoView({behavior:sakin?"auto":"smooth"});setTimeout(()=>$("#takasForm [name=marka]").focus({preventScroll:true}),sakin?0:600)});
}
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener("close",()=>{if(location.hash.startsWith("#arac-"))history.replaceState(null,"",location.pathname+location.search)});
function yol(){const h=location.hash;if(h.startsWith("#arac-"))detayAc(h.slice(6));else if(dlg.open)dlg.close()}
addEventListener("hashchange",yol);

/* ---------- Takas formu ---------- */
$("#takasForm [name=km]").addEventListener("input",e=>{const d=e.target.value.replace(/\D/g,"").slice(0,7);e.target.value=d?(+d).toLocaleString("tr-TR"):""});
$("#takasForm").addEventListener("submit",e=>{
  e.preventDefault();const fm=e.target, f=Object.fromEntries(new FormData(fm)), hata=$("#takasHata");let m="",odak=null;
  $$("#takasForm [aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));
  if(!f.marka.trim()){m="Aracınızın markasını yazın.";odak=fm.marka}
  else if(!f.model.trim()){m="Aracınızın modelini yazın.";odak=fm.model}
  else if(f.yil&&(+f.yil<1990||+f.yil>2026)){m="Model yılı 1990 ile 2026 arasında olmalı.";odak=fm.yil}
  else if(!f.ad.trim()){m="Adınızı yazın.";odak=fm.ad}
  else if(f.tel.replace(/\D/g,"").length<10){m="Telefon numaranız eksik görünüyor.";odak=fm.tel}
  hata.hidden=!m;hata.textContent=m;if(m){odak.setAttribute("aria-invalid","true");odak.focus();$("#takasSonuc").hidden=true;return}
  const hedef=ARACLAR.find(a=>a.no===f.hedef);
  const msg=`Merhaba, takas için teklif almak istiyorum.\nAracım: ${f.yil?f.yil+" ":""}${f.marka.trim()} ${f.model.trim()}${f.km?", "+f.km+" km":""}, ${f.yakit}, ${f.vites}\nDurum: ${f.durum}\nBaktığım araç: ${hedef?`${hedef.no} ${ad(hedef)}`:"henüz karar vermedim"}\nAd: ${f.ad.trim()} · Tel: ${f.tel.trim()}`;
  const s=$("#takasSonuc");s.hidden=false;
  s.innerHTML=`<strong>Mesajınız hazır.</strong><pre>${kacis(msg)}</pre><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">WhatsApp'ta aç</a><small>Örnek sitede mesaj deneme numarasına gider; bilgileriniz hiçbir yere kaydedilmez.</small>`;
  s.scrollIntoView({block:"nearest",behavior:sakin?"auto":"smooth"});
});

/* ---------- Farlar ---------- */
(function(){
  const g=$(".giris"), yak=v=>g.classList.toggle("yanik",v);
  if(sakin){yak(true)}else{[[700,1],[790,0],[900,1],[980,0],[1130,1]].forEach(([t,v])=>setTimeout(()=>yak(!!v),t))}
  let mesgul=false;
  $("#selektor").addEventListener("click",()=>{yak(true);if(mesgul||sakin)return;mesgul=true;[[0,1],[130,0],[260,1],[420,0]].forEach(([t,v])=>setTimeout(()=>{g.classList.toggle("uzun",!!v);if(t===420)mesgul=false},t))});
})();

/* ---------- Görseller ---------- */
$$("[data-foto] > .foto").forEach(img=>{const bak=()=>{if(img.naturalWidth>8)img.parentElement.classList.add("foto-var")};img.complete?bak():img.addEventListener("load",bak)});

otoparkCiz();yol();
})();
