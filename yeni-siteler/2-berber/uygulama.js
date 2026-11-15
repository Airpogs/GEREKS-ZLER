(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sakin=matchMedia("(prefers-reduced-motion: reduce)").matches;
const WA="905000000000";

/* ---------- Veri: fiyat ve ekip burada ---------- */
const HIZMET=[
 {id:"sac",ad:"Saç kesimi",acik:"Makas ya da makine. Yıkama ve şekillendirme dahil.",dk:45,f:450},
 {id:"sakal",ad:"Sakal",acik:"Düzeltme, çizgi, sıcak havlu.",dk:25,f:250},
 {id:"sacsakal",ad:"Saç + sakal",acik:"İkisi bir oturuşta.",dk:65,f:620},
 {id:"perdah",ad:"Perdah tıraşı",acik:"Usturayla sinekkaydı. Sıcak havlu, kolonya.",dk:35,f:350},
 {id:"cocuk",ad:"Çocuk kesimi",acik:"12 yaş altı.",dk:30,f:300}
];
const EKSTRA=[
 {id:"yikama",ad:"Yıkama + fön",dk:15,f:180},
 {id:"ense",ad:"Ense ve kaş temizliği",dk:10,f:120},
 {id:"maske",ad:"Siyah maske",dk:15,f:200}
];
const USTA=[
 {id:"halil",ad:"Halil Usta",acik:"Ustura ve klasik kesim. Perdah tıraşını ondan isteyin.",izin:[3]},
 {id:"emre",ad:"Emre",acik:"Fade, modern kesim, saç şekillendirme.",izin:[2]},
 {id:"baran",ad:"Baran",acik:"Sakal tasarımı ve çocuk kesimi. Sabırlıdır.",izin:[0]}
];
const AC=10, KAPA=21, KAPALI_GUN=1; // Pazartesi kapalı
const GUN=["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"], GUNK=["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"];
const AY=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const tl=n=>n.toLocaleString("tr-TR")+" ₺";
const iki=n=>String(n).padStart(2,"0");
const saatYaz=dk=>iki(Math.floor(dk/60))+":"+iki(dk%60);
const anahtar=d=>d.getFullYear()+"-"+iki(d.getMonth()+1)+"-"+iki(d.getDate());
const kacis=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* Örnek doluluk: tarihe, ustaya ve saate göre hep aynı sonucu veren sahte takvim */
function dolu(gunA,ustaId,dk){let h=2166136261;const s=gunA+ustaId+dk;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ((h>>>0)%100)<38}
function ustaCalisir(u,d){return !u.izin.includes(d.getDay())}
function bosUstalar(d,dk){const a=anahtar(d);return USTA.filter(u=>ustaCalisir(u,d)&&!dolu(a,u.id,dk))}
function gunler(){const l=[],b=new Date();b.setHours(0,0,0,0);for(let i=0;i<14;i++){const d=new Date(b);d.setDate(b.getDate()+i);l.push(d)}return l}
function simdiDk(){const n=new Date();return n.getHours()*60+n.getMinutes()}

/* ---------- Fiyat listesi ---------- */
$("#fiyatListe").innerHTML=HIZMET.map((h,i)=>`<li><button type="button" data-h="${h.id}" aria-label="${h.ad}, ${h.dk} dakika, ${tl(h.f)}. Randevuda seç"><span class="f-no">${iki(i+1)}</span><span class="f-ad">${h.ad}</span><span class="f-fiyat">${tl(h.f)}</span><span class="f-acik">${h.acik}</span><span class="f-sure">${h.dk} dk</span></button></li>`).join("");
$("#fiyatListe").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const r=$(`#hizmetSec input[value="${b.dataset.h}"]`);r.checked=true;guncelle();$("#randevu").scrollIntoView({behavior:sakin?"auto":"smooth"});setTimeout(()=>r.focus({preventScroll:true}),sakin?0:600)});

/* ---------- Randevu formu ---------- */
$("#hizmetSec").innerHTML=HIZMET.map(h=>`<label class="sec"><input type="radio" name="hizmet" value="${h.id}"><span><b>${h.ad}</b><small>${h.dk} dk</small><em>${tl(h.f)}</em></span></label>`).join("");
$("#ekstraSec").innerHTML=EKSTRA.map(h=>`<label class="sec"><input type="checkbox" name="ekstra" value="${h.id}"><span><b>${h.ad}</b><small>+${h.dk} dk</small><em>+${tl(h.f)}</em></span></label>`).join("");
$("#ustaSec").innerHTML=`<label class="sec"><input type="radio" name="usta" value="" checked><span><b>Fark etmez</b><small>İlk boş usta</small></span></label>`+USTA.map(u=>`<label class="sec"><input type="radio" name="usta" value="${u.id}"><span><b>${u.ad}</b><small>${GUNK[u.izin[0]]} izinli</small></span></label>`).join("");
const GUNLER=gunler();
$("#gunSec").innerHTML=GUNLER.map((d,i)=>{const kapali=d.getDay()===KAPALI_GUN;return `<label class="sec"><input type="radio" name="gun" value="${i}"${kapali?" disabled":""} aria-label="${d.getDate()} ${AY[d.getMonth()]} ${GUN[d.getDay()]}${kapali?", kapalı":""}"><span><small>${i===0?"Bugün":i===1?"Yarın":GUNK[d.getDay()]}</small><b>${d.getDate()}</b><small>${kapali?"kapalı":AY[d.getMonth()].slice(0,3)}</small></span></label>`}).join("");

const form=$("#rForm");
function secim(){
  const f=new FormData(form), h=HIZMET.find(x=>x.id===f.get("hizmet")), eks=f.getAll("ekstra").map(id=>EKSTRA.find(x=>x.id===id));
  const gi=f.get("gun"), gun=gi===null?null:GUNLER[+gi], usta=USTA.find(u=>u.id===f.get("usta"))||null;
  const sure=(h?h.dk:0)+eks.reduce((a,e)=>a+e.dk,0), tutar=(h?h.f:0)+eks.reduce((a,e)=>a+e.f,0);
  return {h,eks,gun,usta,sure,tutar,saat:f.get("saat")===null?null:+f.get("saat"),ad:(f.get("ad")||"").trim(),tel:(f.get("tel")||"").trim()};
}
function saatleriCiz(s){
  const kutu=$("#saatSec");
  if(!s.h||!s.gun){kutu.innerHTML="";$("#saatBekle").hidden=false;$("#saatNot").hidden=true;return}
  const a=anahtar(s.gun), bugun=anahtar(new Date())===a, simdi=simdiDk()+20;
  if(s.usta&&!ustaCalisir(s.usta,s.gun)){kutu.innerHTML="";$("#saatBekle").hidden=false;$("#saatBekle").textContent=`${s.usta.ad} ${GUN[s.gun.getDay()]} günleri izinli. Başka bir gün ya da usta seç.`;$("#saatNot").hidden=true;return}
  let html="",bos=0;
  for(let dk=AC*60;dk+s.sure<=KAPA*60;dk+=30){
    const gecmis=bugun&&dk<simdi, d=gecmis||(s.usta?dolu(a,s.usta.id,dk):bosUstalar(s.gun,dk).length===0);
    if(!d)bos++;
    html+=`<label class="sec"><input type="radio" name="saat" value="${dk}"${d?" disabled":""}${s.saat===dk&&!d?" checked":""} aria-label="${saatYaz(dk)}${d?", dolu":""}"><span>${saatYaz(dk)}</span></label>`;
  }
  $("#saatBekle").hidden=bos>0;$("#saatBekle").textContent=bos?"":"Bu gün için boş saat kalmadı. Başka bir gün dene.";
  kutu.innerHTML=bos?html:"";$("#saatNot").hidden=!bos;
}
function fisCiz(s){
  const usta=s.usta?s.usta.ad:(s.saat!==null&&s.gun?(bosUstalar(s.gun,s.saat)[0]||{}).ad+" (ilk boş)":"Fark etmez");
  const satir=(dt,dd)=>`<div><dt>${dt}</dt><dd${dd?"":' class="yok"'}>${dd||"seçilmedi"}</dd></div>`;
  $("#fisIc").innerHTML=satir("Hizmet",s.h?s.h.ad:"")+s.eks.map(e=>satir("Ek",e.ad)).join("")+satir("Usta",usta)+satir("Gün",s.gun?`${s.gun.getDate()} ${AY[s.gun.getMonth()]} ${GUN[s.gun.getDay()]}`:"")+satir("Saat",s.saat!==null?saatYaz(s.saat)+" – "+saatYaz(s.saat+s.sure):"")+satir("Süre",s.sure?s.sure+" dk":"");
  $("#fisToplam").textContent=s.tutar?tl(s.tutar):"— ₺";
  $("#a1").classList.toggle("tamam",!!s.h);$("#a2").classList.toggle("tamam",true);$("#a3").classList.toggle("tamam",!!s.gun);$("#a4").classList.toggle("tamam",s.saat!==null);$("#a5").classList.toggle("tamam",!!s.ad&&s.tel.replace(/\D/g,"").length>=10);
  return usta;
}
let sonAnahtar="";
function guncelle(){
  let s=secim();
  const k=[s.h&&s.h.id,s.sure,s.gun&&anahtar(s.gun),s.usta&&s.usta.id].join("|");
  if(k!==sonAnahtar){sonAnahtar=k;saatleriCiz(s);s=secim()}
  fisCiz(s);$("#rSonuc").hidden=true;$("#rHata").hidden=true;
}
form.addEventListener("change",guncelle);form.addEventListener("input",e=>{if(e.target.matches("[name=ad],[name=tel]"))fisCiz(secim())});
form.addEventListener("submit",e=>{
  e.preventDefault();const s=secim(), hata=$("#rHata");let m="",odak=null;
  $$(".alan input").forEach(i=>i.removeAttribute("aria-invalid"));
  if(!s.h){m="Önce bir hizmet seç.";odak=$("#hizmetSec input")}
  else if(!s.gun){m="Bir gün seç.";odak=$("#gunSec input:not(:disabled)")}
  else if(s.saat===null){m="Bir saat seç.";odak=$("#saatSec input:not(:disabled)")||$("#gunSec input:not(:disabled)")}
  else if(!s.ad){m="Adını yaz.";odak=form.ad}
  else if(s.tel.replace(/\D/g,"").length<10){m="Telefon numaran eksik görünüyor.";odak=form.tel}
  if(m){hata.textContent=m;hata.hidden=false;$("#rSonuc").hidden=true;if(odak){if(odak.matches(".alan input"))odak.setAttribute("aria-invalid","true");odak.focus()}return}
  const usta=s.usta?s.usta.ad:(bosUstalar(s.gun,s.saat)[0]||{ad:"ilk boş usta"}).ad;
  const msg=`Merhaba, Perdah Berber'den randevu almak istiyorum.\nHizmet: ${[s.h.ad,...s.eks.map(x=>x.ad)].join(", ")}\nUsta: ${usta}\nGün: ${s.gun.getDate()} ${AY[s.gun.getMonth()]} ${GUN[s.gun.getDay()]}, saat ${saatYaz(s.saat)}\nSüre: yaklaşık ${s.sure} dk · Tutar: ${tl(s.tutar)}\nAd: ${s.ad} · Tel: ${s.tel}`;
  const kutu=$("#rSonuc");hata.hidden=true;kutu.hidden=false;
  kutu.innerHTML=`<strong>Mesajın hazır.</strong><pre>${kacis(msg)}</pre><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">WhatsApp'ta aç</a><small>Örnek sitede mesaj deneme numarasına gider.</small>`;
  kutu.scrollIntoView({block:"nearest",behavior:sakin?"auto":"smooth"});
});
guncelle();

/* ---------- İlk boş saat ---------- */
(function(){
  for(const d of GUNLER){if(d.getDay()===KAPALI_GUN)continue;const bugun=anahtar(d)===anahtar(new Date());
    for(let dk=AC*60;dk<=KAPA*60-45;dk+=30){if(bugun&&dk<simdiDk()+20)continue;const b=bosUstalar(d,dk);
      if(b.length){const gun=bugun?"Bugün":d.getTime()-GUNLER[0].getTime()===864e5?"Yarın":GUN[d.getDay()];$("#ilkBos").innerHTML=`İlk boş koltuk: <b>${gun} ${saatYaz(dk)}</b> · ${b[0].ad}`;return}}}
})();

/* ---------- Ustalar ---------- */
$("#ustaListe").innerHTML=USTA.map(u=>`<li><div class="portre" role="img" aria-label="${u.ad} için fotoğraf yeri"><b aria-hidden="true">${u.ad[0]}</b><small>Fotoğraf işletmeden gelecek</small></div><h3>${u.ad}</h3><p>${u.acik}</p><p class="gunler">${GUN[u.izin[0]]} izinli</p><button type="button" class="cizgi-dugme" data-u="${u.id}">${u.ad.split(" ")[0]}'${/[eiöü]/.test(u.ad.split(" ")[0].replace(/[^aeıioöuü]/gi,"").slice(-1))?"de":"da"}n randevu al</button></li>`).join("");
$("#ustaListe").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const r=$(`#ustaSec input[value="${b.dataset.u}"]`);r.checked=true;guncelle();$("#randevu").scrollIntoView({behavior:sakin?"auto":"smooth"});setTimeout(()=>r.focus({preventScroll:true}),sakin?0:600)});

/* ---------- Saat tablosu ---------- */
$("#saatTablo").innerHTML=[1,2,3,4,5,6,0].map(i=>`<tr class="${i===new Date().getDay()?"bugun ":""}${i===KAPALI_GUN?"kapali":""}"><td>${GUN[i]}</td><td>${i===KAPALI_GUN?"Kapalı":iki(AC)+":00 – "+KAPA+":00"}</td></tr>`).join("");

/* ---------- Berber direği + yüzen düğme ---------- */
const direk=$(".direk"), yuzen=$("#yuzen");let bekle=false;
function kaydi(){bekle=false;if(!sakin)direk.style.setProperty("--kay",(scrollY*.35).toFixed(0)+"px");
  const r=$("#randevu").getBoundingClientRect();yuzen.classList.toggle("gizle",scrollY<300||(r.top<innerHeight*.6&&r.bottom>200))}
addEventListener("scroll",()=>{if(!bekle){bekle=true;requestAnimationFrame(kaydi)}},{passive:true});kaydi();

/* ---------- Görseller ---------- */
$$("[data-foto] > .foto").forEach(img=>{const bak=()=>{if(img.naturalWidth>8)img.parentElement.classList.add("foto-var")};img.complete?bak():img.addEventListener("load",bak)});

/* ---------- Köpük ---------- */
(function(){
  const c=$("#kopuk"), alan=$("#kopukAlan"), ipucu=$("#ipucu");
  if(sakin||!c.getContext){c.remove();return}
  const ctx=c.getContext("2d");let W=0,H=0,dpr=1,dokundu=false,bitti=false,oto=null;
  let tohum=7;const rnd=()=>{tohum=(tohum*16807)%2147483647;return tohum/2147483647};
  function kopukCiz(){
    dpr=Math.min(2,devicePixelRatio||1);const r=c.getBoundingClientRect();W=r.width;H=r.height;
    c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);tohum=7;
    const adim=W<600?24:32;
    ctx.fillStyle="#F4F3EC";
    for(let y=adim*.8;y<H-adim*.5;y+=adim*.8)for(let x=adim*.6;x<W-adim*.4;x+=adim*.8){ctx.beginPath();ctx.arc(x+(rnd()-.5)*adim*.7,y+(rnd()-.5)*adim*.7,adim*(.8+rnd()*.5),0,7);ctx.fill()}
    const n=Math.round(W*H/(adim*adim)*2.2);
    for(let i=0;i<n;i++){const r=adim*(.14+rnd()*rnd()*.62), x=adim+rnd()*(W-adim*2), y=adim+rnd()*(H-adim*2), g=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.05,x,y,r);
      g.addColorStop(0,"#FFFFFF");g.addColorStop(.75,"#F8F7F1");g.addColorStop(1,"rgba(214,218,208,.85)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
  }
  function sil(x0,y0,x1,y1,kal){ctx.globalCompositeOperation="destination-out";ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=kal;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();ctx.globalCompositeOperation="source-over"}
  function darbe(yOran,sure,bitince){
    const y0=H*yOran, kal=H/satir()*.92, t0=performance.now();let ox=-kal,oy=y0;
    (function adim(n){if(bitti)return;const k=Math.min(1,(n-t0)/sure), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2, x=-kal+(W+kal*2)*e, y=y0+Math.sin(k*3.1)*H*.03;
      sil(ox,oy,x,y,kal);ox=x;oy=y;if(k<1)requestAnimationFrame(adim);else bitince&&bitince()})(t0);
  }
  const satir=()=>innerWidth<960?4:2;
  function bitir(){if(bitti)return;bitti=true;c.classList.add("bitti");ipucu.classList.add("git");setTimeout(()=>c.remove(),1100)}
  function kalan(){try{const d=ctx.getImageData(0,0,c.width,c.height).data;let dolu=0,top=0;for(let i=3;i<d.length;i+=4*97){top++;if(d[i]>40)dolu++}return dolu/top}catch(e){return 0}}
  function basla(){
    kopukCiz();
    const n=satir(), yer=i=>(i+.5)/n;
    setTimeout(()=>darbe(yer(0),900),500);
    oto=setTimeout(()=>{if(dokundu)return;ipucu.classList.add("git");let i=1;(function sonraki(){if(i<n)darbe(yer(i++),700,sonraki);else setTimeout(bitir,400)})()},5200);
  }
  let sx=0,sy=0,cizim=false;
  const yer=e=>{const r=c.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  c.addEventListener("pointerdown",e=>{cizim=true;[sx,sy]=yer(e)});
  c.addEventListener("pointermove",e=>{if(bitti)return;if(e.pointerType!=="mouse"&&!cizim)return;const [x,y]=yer(e);if(e.pointerType==="mouse"&&!cizim&&!dokundu){sx=x;sy=y;cizim=true}
    dokundu=true;clearTimeout(oto);sil(sx,sy,x,y,e.pointerType==="mouse"?Math.max(60,H*.16):Math.max(50,H*.17));sx=x;sy=y});
  ["pointerup","pointercancel","pointerleave"].forEach(n=>c.addEventListener(n,e=>{if(e.pointerType!=="mouse")cizim=false;if(dokundu&&kalan()<.3)bitir()}));
  setInterval(()=>{if(dokundu&&!bitti&&kalan()<.3)bitir()},700);
  let gen=innerWidth;addEventListener("resize",()=>{if(bitti||Math.abs(innerWidth-gen)<40)return;gen=innerWidth;kopukCiz()});
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(basla);
})();
})();
