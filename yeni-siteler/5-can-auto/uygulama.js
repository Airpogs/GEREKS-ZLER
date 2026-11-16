(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sakin=matchMedia("(prefers-reduced-motion: reduce)").matches;
const A=window.AYAR||{}, ARACLAR=window.ARACLAR||[];
const WA=(A.whatsapp||"").replace(/\D/g,"")||"905000000000";
const kacis=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tl=n=>Number(n).toLocaleString("tr-TR")+" ₺";
/* yer tutucu: değer varsa değeri, yoksa sarı kutuyu döndürür */
const yt=(deger,yer,cok)=>deger?kacis(deger):`<span class="yt${cok?" cok":""}" title="Bu bilgi Can Auto'dan gelecek">${yer}</span>`;
const waLink=m=>`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const KASA={sedan:"Sedan",hatchback:"Hatchback",suv:"SUV",station:"Station"};

/* ---------- İşletme bilgileri ---------- */
$("#taslak").hidden=!A.taslak;
$("#slogan").textContent=A.slogan||"";
$$("[data-wa]").forEach(a=>a.href=waLink(a.dataset.wa));
const telLink=A.telefon?`<a href="tel:${A.telefon.replace(/[^\d+]/g,"")}">${kacis(A.telefon)}</a>`:yt("","0 5XX XXX XX XX");
$("#kunye").innerHTML=`<div><dt>Telefon</dt><dd>${telLink}</dd></div><div><dt>Adres</dt><dd>${yt(A.adres,"[Galeri adresi]")}</dd></div><div><dt>Saatler</dt><dd>${yt(A.saatler,"[Çalışma saatleri]")}</dd></div>`;
$("#ilListe").innerHTML=`<div><dt>Telefon</dt><dd>${telLink}</dd></div>
  <div><dt>WhatsApp</dt><dd><a href="${waLink("Merhaba, bilgi almak istiyorum.")}" target="_blank" rel="noopener">Mesaj yazın</a>${A.whatsapp?"":` ${yt("","[numara gelecek]")}`}</dd></div>
  <div><dt>Adres</dt><dd>${yt(A.adres,"[Galeri adresi]")}${A.harita?` <a href="${kacis(A.harita)}" target="_blank" rel="noopener">Haritada aç</a>`:""}</dd></div>
  <div><dt>Çalışma saatleri</dt><dd>${yt(A.saatler,"[Çalışma saatleri]")}</dd></div>${A.instagram?`<div><dt>Instagram</dt><dd><a href="${kacis(A.instagram)}" target="_blank" rel="noopener">Bizi takip edin</a></dd></div>`:""}`;
$("#hakMetin").innerHTML=(A.hakkinda?`<p>${kacis(A.hakkinda)}</p>`:yt("","[Galeriyi anlatan iki üç cümle buraya gelecek: nerede olduğunuz, nasıl çalıştığınız, müşteriye ne söz verdiğiniz. Can Auto'nun kendi sözleriyle.]",true))+(A.kurulus?`<p style="margin-top:14px;color:var(--soluk)">${kacis(A.kurulus)} yılından beri.</p>`:"");
const ekip=A.ekip&&A.ekip.length?A.ekip:[{},{}];
$("#ekip").innerHTML=ekip.map(k=>`<li><div class="portre">${k.foto?`<img src="${kacis(k.foto)}" alt="${kacis(k.ad||"")}" loading="lazy">`:"Fotoğraf yeri"}</div><span>${yt(k.ad,"[Ad Soyad]")}<small>${yt(k.gorev,"[Görevi]")}</small></span></li>`).join("");
$("#dipNot").innerHTML=A.taslak?"Taslak sürüm. Telefon, adres, çalışma saatleri, araçlar ve fiyatlar Can Auto tarafından girilene kadar yer tutucudur.":"© Can Auto";

/* ---------- Yandan araç çizimi (fotoğraf gelene kadar) ---------- */
const YAN={
 sedan:["M20 105Q20 88 40 84L95 76Q130 48 175 44H250Q285 46 315 76L360 82Q380 86 380 105V112H345A28 28 0 0 0 289 112H131A28 28 0 0 0 75 112H20Z","M112 76Q140 54 176 52H210V76ZM218 52H248Q275 54 298 76H218Z",103,317,24],
 hatchback:["M25 105Q25 88 45 84L100 76Q135 48 180 44H285Q325 50 345 78Q372 84 372 105V112H340A28 28 0 0 0 284 112H136A28 28 0 0 0 80 112H25Z","M117 76Q145 54 181 52H215V76ZM223 52H282Q312 56 328 76H223Z",108,312,24],
 suv:["M20 104Q20 82 42 78L92 70Q122 36 165 32H300Q335 34 350 70Q380 76 380 100V110H350A31 31 0 0 0 288 110H132A31 31 0 0 0 70 110H20Z","M108 70Q132 44 166 40H205V70ZM213 40H298Q322 42 336 70H213Z",101,319,27],
 station:["M20 105Q20 88 40 84L95 76Q130 48 175 44H320Q350 48 362 78Q380 84 380 105V112H345A28 28 0 0 0 289 112H131A28 28 0 0 0 75 112H20Z","M112 76Q140 54 176 52H210V76ZM218 52H270V76H218ZM278 52H318Q340 56 348 76H278Z",103,317,24]};
function yan(kasa){const [g,c,t1,t2,r]=YAN[kasa]||YAN.sedan;return `<svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g transform="translate(0 26)"><path class="yan yan-zemin" d="M0 137H400"/><path class="yan" d="${g}"/><path class="yan" d="${c}" stroke-width="1.6"/><circle class="yan" cx="${t1}" cy="112" r="${r}"/><circle class="yan" cx="${t1}" cy="112" r="${r*.42}" stroke-width="1.6"/><circle class="yan" cx="${t2}" cy="112" r="${r}"/><circle class="yan" cx="${t2}" cy="112" r="${r*.42}" stroke-width="1.6"/></g></svg>`}

/* ---------- Araçlar ---------- */
/* Gerçek araç yokken gösterilen yerler: yalnızca kategori taşır, araç bilgisi taşımaz */
const YERLER=[["sedan","Benzin","Otomatik"],["suv","Dizel","Otomatik"],["hatchback","Benzin","Manuel"],["sedan","Dizel","Manuel"],["station","Dizel","Otomatik"],["hatchback","Hibrit","Otomatik"],["suv","Benzin","Otomatik"],["sedan","LPG","Manuel"]]
  .map((y,i)=>({no:"Yer "+String(i+1).padStart(2,"0"),kasa:y[0],yakit:y[1],vites:y[2],yer:true}));
const gercek=ARACLAR.length>0, LISTE=gercek?ARACLAR:YERLER;
$("#yerNotu").hidden=gercek;
if(!gercek){$("#sira").disabled=true;$("#sira").title="Sıralama, araçlar eklenince açılır"}
const hap=(kutu,ad,degerler,etiket)=>{$(kutu).innerHTML=`<label><input type="radio" name="${ad}" value="" checked><span>Hepsi</span></label>`+degerler.map(d=>`<label><input type="radio" name="${ad}" value="${d}"><span>${etiket?etiket[d]||d:d}</span></label>`).join("")};
const tekil=k=>[...new Set(LISTE.map(a=>a[k]).filter(Boolean))];
hap("#kasaSec","kasa",Object.keys(KASA).filter(k=>tekil("kasa").includes(k)),KASA);hap("#yakitSec","yakit",tekil("yakit"));hap("#vitesSec","vites",tekil("vites"));
const baslik=a=>a.yer?yt("","[Marka Model]"):kacis([a.yil,a.marka,a.model].filter(Boolean).join(" "));
function aracCiz(){
  const f=Object.fromEntries(new FormData($("#suzgec")));
  const l=LISTE.filter(a=>(!f.kasa||a.kasa===f.kasa)&&(!f.yakit||a.yakit===f.yakit)&&(!f.vites||a.vites===f.vites));
  if(gercek)l.sort({yeni:()=>0,ucuz:(a,b)=>a.fiyat-b.fiyat,pahali:(a,b)=>b.fiyat-a.fiyat,km:(a,b)=>a.km-b.km}[f.sira||"yeni"]);
  $("#satirlar").innerHTML=l.map(a=>`<li class="satir"><div class="s-cizim">${a.foto&&a.foto[0]?`<img src="${kacis(a.foto[0])}" alt="${baslik(a).replace(/<[^>]+>/g,"")}" loading="lazy">`:yan(a.kasa)+`<small>Fotoğraf yeri</small>`}</div>
    <div><p class="s-no">${kacis(a.no||"")}</p><h3><a href="#arac-${encodeURIComponent(a.no)}">${baslik(a)}</a></h3>
    <p class="s-ozet"><span>${KASA[a.kasa]||""}</span><span>${kacis(a.yakit||"")}</span><span>${kacis(a.vites||"")}</span>${a.yer?yt("","[Yıl]")+yt("","[Kilometre]"):`<span>${Number(a.km).toLocaleString("tr-TR")} km</span>`}</p></div>
    <p class="s-fiyat">${a.yer||!a.fiyat?yt("","[Fiyat]"):tl(a.fiyat)}</p></li>`).join("");
  $("#bos").hidden=l.length>0;
  $("#sayac").textContent=gercek?(l.length===LISTE.length?`${l.length} araç`:`${LISTE.length} araçtan ${l.length} tanesi`):(l.length===LISTE.length?`${l.length} araç yeri`:`${LISTE.length} yerden ${l.length} tanesi`);
}
$("#suzgec").addEventListener("input",aracCiz);$("#suzgec").addEventListener("reset",()=>setTimeout(aracCiz));

/* ---------- Araç detayı ---------- */
const dlg=$("#detay");
function detayAc(no){
  const a=LISTE.find(x=>x.no===no);if(!a)return;
  const adi=a.yer?"":[a.yil,a.marka,a.model].filter(Boolean).join(" ");
  const msg=a.yer?"Merhaba, sitenizdeki araçlar hakkında bilgi almak istiyorum.":`Merhaba, ${a.no} numaralı ${adi} hakkında bilgi almak istiyorum.`;
  const sat=(k,v)=>`<tr><th scope="row">${k}</th><td>${v}</td></tr>`;
  const foto=a.foto&&a.foto.length?a.foto.slice(0,3).map(f=>`<img src="${kacis(f)}" alt="${kacis(adi)}" loading="lazy">`).join(""):`<div>Fotoğraf yeri<br>Dış</div><div>Fotoğraf yeri<br>İç</div><div>Fotoğraf yeri<br>Gösterge</div>`;
  $("#detayIc").innerHTML=`<div class="d-ic"><div class="d-ust"><span>${kacis(a.no)} · ${KASA[a.kasa]||""}</span><button type="button" class="d-kapat" id="dKapat">Kapat</button></div>
   <h2 id="dBaslik">${baslik(a)}</h2>${a.paket?`<p>${kacis(a.paket)}</p>`:""}<p class="d-fiyat">${a.yer||!a.fiyat?yt("","[Fiyat]"):tl(a.fiyat)}</p>
   <div class="d-foto">${foto}</div>
   <table class="d-tablo"><tbody>${sat("Kasa",KASA[a.kasa]||"")+sat("Yakıt",kacis(a.yakit||""))+sat("Vites",kacis(a.vites||""))+sat("Model yılı",a.yer?yt("","[Yıl]"):kacis(a.yil||""))+sat("Kilometre",a.yer?yt("","[Kilometre]"):Number(a.km).toLocaleString("tr-TR")+" km")+sat("Renk",yt(a.renk,"[Renk]"))+sat("Boya ve değişen",yt(a.boya,"[Ekspertiz bilgisi]"))+sat("Hasar kaydı",yt(a.hasar,"[Hasar kaydı bilgisi]"))}</tbody></table>
   <div class="d-acik">${a.aciklama?`<p>${kacis(a.aciklama)}</p>`:yt("","[Araç hakkında galerinin kısa notu]",true)}</div>
   <a class="dugme" target="_blank" rel="noopener" href="${waLink(msg)}">WhatsApp'tan sorun</a></div>`;
  if(!dlg.open)dlg.showModal();dlg.scrollTop=0;
  $("#dKapat").addEventListener("click",()=>dlg.close());
}
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener("close",()=>{if(location.hash.startsWith("#arac-"))history.replaceState(null,"",location.pathname+location.search)});
function yolla(){const h=location.hash;if(h.startsWith("#arac-"))detayAc(decodeURIComponent(h.slice(6)));else if(dlg.open)dlg.close()}
addEventListener("hashchange",yolla);

/* ---------- Takas formu ---------- */
$("#takasForm [name=km]").addEventListener("input",e=>{const d=e.target.value.replace(/\D/g,"").slice(0,7);e.target.value=d?(+d).toLocaleString("tr-TR"):""});
$("#takasForm").addEventListener("submit",e=>{
  e.preventDefault();const fm=e.target, f=Object.fromEntries(new FormData(fm)), hata=$("#takasHata");let m="",odak=null;
  $$("#takasForm [aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));
  if(!f.marka.trim()){m="Aracınızın markasını yazın.";odak=fm.marka}
  else if(!f.model.trim()){m="Aracınızın modelini yazın.";odak=fm.model}
  else if(f.yil&&(+f.yil<1980||+f.yil>2026)){m="Model yılını kontrol edin.";odak=fm.yil}
  else if(!f.ad.trim()){m="Adınızı yazın.";odak=fm.ad}
  else if(f.tel.replace(/\D/g,"").length<10){m="Telefon numaranız eksik görünüyor.";odak=fm.tel}
  hata.hidden=!m;hata.textContent=m;if(m){odak.setAttribute("aria-invalid","true");odak.focus();$("#takasSonuc").hidden=true;return}
  const msg=`Merhaba, aracım için görüşmek istiyorum.\nİstek: ${f.istek}\nAraç: ${f.yil?f.yil+" ":""}${f.marka.trim()} ${f.model.trim()}${f.km?", "+f.km+" km":""}, ${f.yakit}, ${f.vites}${f.durum.trim()?`\nDurum: ${f.durum.trim()}`:""}\nAd: ${f.ad.trim()} · Tel: ${f.tel.trim()}`;
  const s=$("#takasSonuc");s.hidden=false;
  s.innerHTML=`<strong>Mesajınız hazır.</strong><pre>${kacis(msg)}</pre><a class="dugme" target="_blank" rel="noopener" href="${waLink(msg)}">WhatsApp'ta açın</a>${A.whatsapp?"":`<small>Galerinin WhatsApp numarası henüz girilmedi; mesaj deneme numarasına gider.</small>`}`;
  s.scrollIntoView({block:"nearest",behavior:sakin?"auto":"smooth"});
});

/* ---------- Kaydırdıkça ilerleyen yol ---------- */
(function(){
  const alan=$("#yolAlan"), svg=$("#yolSvg"), yollar=$$("#yolSvg > path"), arac=$("#yolArac"), adimlar=$$(".adim");
  let uz=0, durakUz=[], H=0;
  function kur(){
    const W=alan.clientWidth;H=alan.clientHeight;const genis=W>=1040, cx=genis?W/2:42, gen=genis?54:18, kal=genis?40:26;
    svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
    const n=[[cx,0]];adimlar.forEach((li,i)=>n.push([cx+(i%2?gen:-gen),li.offsetTop+(genis?li.offsetHeight/2:54)]));n.push([cx,H]);
    let d=`M${n[0][0]} ${n[0][1]}`;for(let i=1;i<n.length;i++){const [x0,y0]=n[i-1],[x1,y1]=n[i],o=(y0+y1)/2;d+=`C${x0} ${o} ${x1} ${o} ${x1} ${y1}`}
    yollar.forEach(p=>p.setAttribute("d",d));yollar[0].style.strokeWidth=kal;yollar[1].style.strokeWidth=kal;
    uz=yollar[0].getTotalLength();yollar[1].style.strokeDasharray=uz;
    durakUz=n.slice(1,-1).map(([,y])=>{let a=0,b=uz;for(let k=0;k<22;k++){const m=(a+b)/2;yollar[0].getPointAtLength(m).y<y?a=m:b=m}return a});
    $("#yolDurak").innerHTML=n.slice(1,-1).map(([x,y])=>`<circle class="durak" cx="${x}" cy="${y}" r="${genis?11:9}"/>`).join("");
    ilerle();
  }
  function ilerle(){
    if(!uz)return;const r=alan.getBoundingClientRect();
    const p=sakin?1:Math.max(0,Math.min(1,(innerHeight*.62-r.top)/r.height)), l=p*uz, n=yollar[0].getPointAtLength(l), s=yollar[0].getPointAtLength(Math.min(uz,l+1.5)), o=yollar[0].getPointAtLength(Math.max(0,l-1.5));
    const aci=Math.atan2(s.y-o.y,s.x-o.x)*180/Math.PI+90;
    arac.setAttribute("transform",`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) rotate(${(aci+180).toFixed(1)})`);
    yollar[1].style.strokeDashoffset=uz-l;
    const duraklar=$$("#yolDurak .durak");durakUz.forEach((du,i)=>{const g=l>=du-4;adimlar[i].classList.toggle("aktif",g);if(duraklar[i])duraklar[i].classList.toggle("gecildi",g)});
  }
  let bekle=false;const tetik=()=>{if(!bekle){bekle=true;requestAnimationFrame(()=>{bekle=false;ilerle();if(!sakin)document.documentElement.style.setProperty("--don",(scrollY*.35).toFixed(1)+"deg")})}};
  addEventListener("scroll",tetik,{passive:true});
  let gen=0;const yeniden=()=>{if(Math.abs(innerWidth-gen)>4||!uz){gen=innerWidth;kur()}};
  addEventListener("resize",yeniden);addEventListener("load",()=>{gen=0;yeniden()});
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{gen=0;yeniden()});
  yeniden();
})();

/* ---------- Görseller ---------- */
$$("[data-foto] > .foto").forEach(img=>{const bak=()=>{if(img.naturalWidth>8)img.parentElement.classList.add("foto-var")};img.complete?bak():img.addEventListener("load",bak)});

aracCiz();yolla();
})();
