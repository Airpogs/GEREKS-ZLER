(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sakin=matchMedia("(prefers-reduced-motion: reduce)").matches;
const WA="905000000000";
const AC=7.5, KAPA=23; // penceredeki yayın uçları

const M={
 tr:{atla:"Menüye geç",altad:"kahve & fırın",h1a:"Günün her saati",h1b:"başka kokar.",girisalt:"Sabah simit, öğlen tencere yemeği, akşamüstü kahve. Güneşi sürükleyin, o saatte tezgâhta ne olduğunu görün.",kaydirEtiket:"Günün saatini seç",menuyeGit:"Menüyü aç",masaAyir:"Masa ayırt",simdi:"Şimdiki saate dön",pencereAlt:"Mahallenin çatıları üzerinde günün saatine göre ilerleyen güneş",ipucu:"Güneşi sürükleyin",menu:"Menü",araEtiket:"Menüde ara",araPh:"Ara: menemen, latte…",vej:"Vejetaryen",vegan:"Vegan",gls:"Glutensiz",bos:"Buna uyan bir şey bulamadık. Süzgeçleri kaldırmayı ya da başka bir kelime yazmayı deneyin.",menuNot:"Fiyatlara KDV dahildir. Alerjiniz varsa sipariş verirken söyleyin, mutfakta aynı tezgâhı kullanıyoruz.",soz1:"Kahve acele sevmez.",soz2:"Biz de.",m1:"Ekmek her sabah 05:30'da fırına girer.",m2:"Çekirdek haftada bir, perşembe günleri kavrulur.",m3:"Bahçede dört masa var; kedilerle paylaşılır.",saatlerB:"Saatler",adres:"Çınaraltı Sokak No: 12 (hayali adres)",rezB:"Masa ayırtın",rezAlt:"Formu doldurun, mesaj WhatsApp'ta hazır açılsın. Onayı biz yazarız.",fAd:"Adınız",fKisi:"Kaç kişi",fSaat:"Saat",fGun:"Gün",fNot:"Not (isteğe bağlı)",fNotPh:"Bahçe olsun, mama sandalyesi…",fGonder:"WhatsApp mesajını hazırla",ornek:"Bu site hayali bir işletme için hazırlanmış örnektir. Adres, telefon ve fiyatlar gerçek değildir.",listeGoster:"Listeyi göster",listeB:"Masa listem",listeAlt:"Bu ekranı garsona gösterin. Sipariş buradan gönderilmez.",toplam:"Toplam",listeSil:"Listeyi temizle",
  gunler:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],suAn:"Şu an",saatinde:s=>`Saat ${s}'${ek(s)}`,acik:"açığız",kapali:"kapalıyız",kapanir:s=>`${s}'${ek(s,1)} kapanır`,acilir:s=>`${s}'${ek(s)} açılır`,servis:"Tezgâhta: ",gunBoyu:"Gün boyu",disi:"şu an servis yok",etk:{v:"Vejetaryen",vg:"Vegan",g:"Glutensiz",k:"Kuruyemiş içerir"},ekle:a=>`${a} listeye ekle`,cikar:a=>`${a} listeden çıkar`,urunSay:n=>`${n} ürün`,hAd:"Adınızı yazar mısınız?",hGun:"Bir gün seçin.",hGec:"Geçmiş bir gün seçilemez.",mesaj:(f,g)=>`Merhaba, ${g} günü saat ${f.saat} için ${f.kisi} kişilik masa ayırtmak istiyorum. İsim: ${f.ad}.${f.not?` Not: ${f.not}`:""}`,hazir:"Mesajınız hazır",waAc:"WhatsApp'ta aç",demo:"Örnek sitede mesaj deneme numarasına gider."},
 en:{atla:"Skip to menu",altad:"coffee & bakery",h1a:"Every hour of the day",h1b:"smells different.",girisalt:"Simit in the morning, a home-cooked lunch, coffee in the late afternoon. Drag the sun to see what's on the counter at that hour.",kaydirEtiket:"Pick a time of day",menuyeGit:"Open the menu",masaAyir:"Book a table",simdi:"Back to now",pencereAlt:"The sun moving over neighbourhood rooftops according to the time of day",ipucu:"Drag the sun",menu:"Menu",araEtiket:"Search the menu",araPh:"Search: eggs, latte…",vej:"Vegetarian",vegan:"Vegan",gls:"Gluten-free",bos:"Nothing matches that. Try removing the filters or another word.",menuNot:"Prices include VAT. If you have an allergy, tell us when ordering — everything shares one kitchen counter.",soz1:"Coffee doesn't like to be rushed.",soz2:"Neither do we.",m1:"Bread goes into the oven at 5:30 every morning.",m2:"Beans are roasted once a week, on Thursdays.",m3:"Four tables in the garden; shared with the cats.",saatlerB:"Hours",adres:"Çınaraltı Sokak No: 12 (fictional address)",rezB:"Book a table",rezAlt:"Fill in the form and the message opens ready in WhatsApp. We confirm by reply.",fAd:"Your name",fKisi:"Guests",fSaat:"Time",fGun:"Date",fNot:"Note (optional)",fNotPh:"Garden table, high chair…",fGonder:"Prepare WhatsApp message",ornek:"This is a sample site made for a fictional business. The address, phone and prices are not real.",listeGoster:"Show list",listeB:"My table list",listeAlt:"Show this screen to your waiter. Orders are not sent from here.",toplam:"Total",listeSil:"Clear list",
  gunler:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],suAn:"Right now",saatinde:s=>`At ${s}`,acik:"we're open",kapali:"we're closed",kapanir:s=>`closes at ${s}`,acilir:s=>`opens at ${s}`,servis:"On the counter: ",gunBoyu:"All day",disi:"not served right now",etk:{v:"Vegetarian",vg:"Vegan",g:"Gluten-free",k:"Contains nuts"},ekle:a=>`Add ${a} to list`,cikar:a=>`Remove ${a} from list`,urunSay:n=>`${n} item${n>1?"s":""}`,hAd:"Please enter your name.",hGun:"Please pick a date.",hGec:"That date is in the past.",mesaj:(f,g)=>`Hello, I'd like to book a table for ${f.kisi} on ${g} at ${f.saat}. Name: ${f.ad}.${f.not?` Note: ${f.not}`:""}`,hazir:"Your message is ready",waAc:"Open in WhatsApp",demo:"On this sample site the message goes to a test number."}
};
// Türkçe saat ekleri: 13:00'te, 07:30'da, 22:00'de
function ek(s){const [h,d]=s.split(":").map(Number), n=d||h;
  if(n%10===0&&n>0){const o={10:"da",20:"de",30:"da",40:"ta",50:"de"}[n];return o||"da"}
  return ["da","de","de","te","te","te","da","de","de","da"][n%10]}

let dil="tr"; try{dil=localStorage.getItem("gunduz-dil")||"tr"}catch(e){}
const t=()=>M[dil];
const fiyat=n=>n.toLocaleString("tr-TR")+" ₺";
const sStr=h=>{const m=Math.round(h*60);return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0")};
const kucuk=s=>s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ı/g,"i");

/* ---------- Günün saati penceresi ---------- */
const kaydir=$("#saatKaydir");
let canli=true, secili=0; // secili: ondalık saat
const simdiSaat=()=>{const d=new Date();return d.getHours()+d.getMinutes()/60};
const GOK=[[0,"#0E0E24","#1E1B3A"],[4.5,"#17163A","#3A2F5A"],[6,"#2B2A4F","#D98A6A"],[7.5,"#A9C4DA","#F8CFA0"],[10,"#93C3E8","#E6F0E4"],[13,"#7DB6E4","#DCEBEB"],[16,"#8DB5D8","#F3DDB4"],[18,"#6E7FB3","#F2A66E"],[19,"#3B3A6B","#D9785A"],[20.2,"#1B1A3A","#4A3562"],[23.5,"#0E0E24","#1E1B3A"]];
const GUNES=[[0,"#F3EBD3"],[5,"#F3EBD3"],[6.5,"#FF9A4A"],[8,"#FFD86B"],[16,"#FFD86B"],[18.6,"#FF8A3D"],[19.6,"#F3EBD3"],[24,"#F3EBD3"]];
const CATI=[[0,"#0C0B1C"],[5,"#0C0B1C"],[8,"#27352C"],[17,"#27352C"],[19.5,"#0C0B1C"],[24,"#0C0B1C"]];
const hex=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const kar=(a,b,k)=>{const A=hex(a),B=hex(b);return "rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(",")+")"};
function ara(tablo,h,kol){kol=kol||1;if(h<=tablo[0][0])return tablo[0][kol];for(let i=1;i<tablo.length;i++){if(h<=tablo[i][0]){const k=(h-tablo[i-1][0])/(tablo[i][0]-tablo[i-1][0]);return kar(tablo[i-1][kol],tablo[i][kol],k)}}return tablo[tablo.length-1][kol]}
function zamanAdi(h){return h<11?"sabah":h<16?"ogle":h<19?"aksam":"gece"}
function gunSaat(){const g=new Date().getDay();return window.SAATLER[g]}
function acikMi(h){const [a,k]=gunSaat();return h>=a&&h<k}
function servisVar(kat,h){return !kat.s||(h>=kat.s[0]&&h<kat.s[1])}

function ciz(h){
  secili=h;
  const k=Math.max(0,Math.min(1,(h-AC)/(KAPA-AC)));
  const x=200-170*Math.cos(Math.PI*k), y=400-250*Math.sin(Math.PI*k);
  $("#gunes").setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  $("#gok").style.background=`linear-gradient(${ara(GOK,h,1)},${ara(GOK,h,2)})`;
  $("#gunesDaire").setAttribute("fill",ara(GUNES,h));
  $("#catilar").style.fill=ara(CATI,h);
  const gece=h<6.5?Math.max(0,Math.min(1,6.5-h)):Math.max(0,Math.min(1,(h-18.7)/1.3));
  $("#yildizlar").setAttribute("opacity",gece.toFixed(2));
  $("#isiklar").setAttribute("opacity",gece.toFixed(2));
  const z=acikMi(h)||canli===false?zamanAdi(h):"gece";
  if(document.documentElement.dataset.zaman!==z){document.documentElement.dataset.zaman=z;
    const tc={sabah:"#F7EDE0",ogle:"#F4F1E6",aksam:"#F2DCC6",gece:"#1A1730"}[z];document.querySelector('meta[name=theme-color]').content=tc}
  yazilar();
}
function yazilar(){
  const h=secili, s=sStr(h), T=t(), acik=acikMi(h), [a,kp]=gunSaat();
  $("#saatYazi").textContent=s;
  $("#nokta").classList.toggle("kapali",!acik);
  const on=canli?T.suAn:T.saatinde(s);
  $("#durumYazi").textContent=`${on} ${acik?T.acik:T.kapali}`+(canli?` · ${acik?T.kapanir(sStr(kp)):T.acilir(sStr(h<a?a:window.SAATLER[(new Date().getDay()+1)%7][0]))}`:"");
  const var_=window.MENU.filter(c=>servisVar(c,h)).map(c=>c[dil]);
  $("#servisYazi").textContent=acik?T.servis+var_.join(", "):"";
  kaydir.setAttribute("aria-valuetext",s+" — "+(acik?T.acik:T.kapali));
  $("#simdi").hidden=canli;
  $$(".bolum").forEach(b=>{const c=window.MENU.find(c=>c.id===b.id);const yok=!servisVar(c,h);b.classList.toggle("disi",yok);
    const r=b.querySelector(".bolum-saat");if(r)r.textContent=(c.s?sStr(c.s[0])+" – "+sStr(c.s[1]):T.gunBoyu)+(yok?" · "+T.disi:"")});
  $$("#katNav li").forEach(li=>{const c=window.MENU.find(c=>"#"+c.id===li.firstChild.getAttribute("href"));li.classList.toggle("yok",!servisVar(c,h))});
}
function saatAyarla(h,kullanici){
  if(kullanici){canli=false;$("#ipucu").classList.add("git")}
  kaydir.value=Math.round(h*60);
  ciz(h);
}
kaydir.addEventListener("input",()=>saatAyarla(kaydir.value/60,true));
$("#simdi").addEventListener("click",()=>{canli=true;const h=simdiSaat();kaydir.value=Math.round(Math.max(AC,Math.min(KAPA,h))*60);ciz(h);kaydir.focus()});
// güneşi sürükleme
(function(){
  const p=$("#pencere");let surukle=false,bx=0,by=0,karar=false;
  const kOku=e=>{const r=p.getBoundingClientRect(), nx=((e.clientX-r.left)/r.width-.5)*400/170;return Math.acos(Math.max(-1,Math.min(1,-nx)))/Math.PI};
  const uygula=e=>saatAyarla(Math.round((AC+kOku(e)*(KAPA-AC))*6)/6,true);
  p.addEventListener("pointerdown",e=>{surukle=true;karar=e.pointerType==="mouse";bx=e.clientX;by=e.clientY;if(karar){p.setPointerCapture(e.pointerId);uygula(e)}});
  p.addEventListener("pointermove",e=>{if(!surukle)return;if(!karar){const dx=Math.abs(e.clientX-bx),dy=Math.abs(e.clientY-by);if(dx<8&&dy<8)return;if(dy>dx){surukle=false;return}karar=true;try{p.setPointerCapture(e.pointerId)}catch(_){}}uygula(e)});
  ["pointerup","pointercancel"].forEach(n=>p.addEventListener(n,()=>{surukle=false}));
  p.addEventListener("touchmove",e=>{if(surukle&&karar)e.preventDefault()},{passive:false});
})();
// saat işaretleri
(function(){let s="";[9,12,15,18,21].forEach(h=>{const k=(h-AC)/(KAPA-AC),x=200-170*Math.cos(Math.PI*k),y=400-250*Math.sin(Math.PI*k),ox=200-150*Math.cos(Math.PI*k),oy=400-226*Math.sin(Math.PI*k);
  s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/><text x="${ox.toFixed(1)}" y="${(oy+4).toFixed(1)}">${String(h).padStart(2,"0")}</text>`});$("#saatIsaret").innerHTML=s})();

/* ---------- Menü ---------- */
let liste={}; try{liste=JSON.parse(sessionStorage.getItem("gunduz-liste")||"{}")}catch(e){}
const anahtar=(c,i)=>c.id+"-"+i;
function menuCiz(){
  const T=t(), q=kucuk($("#q").value.trim()), fv=$("#fV").checked, fvg=$("#fVg").checked, fg=$("#fG").checked;
  let toplam=0, html="";
  window.MENU.forEach(c=>{
    const satir=c.urun.map((u,i)=>({u,i})).filter(({u})=>{
      const e=u.e.split(" ");
      if(fv&&!e.includes("v"))return false; if(fvg&&!e.includes("vg"))return false; if(fg&&!e.includes("g"))return false;
      return !q||kucuk([u.tr,u.en,u.dtr,u.den,c.tr,c.en].join(" ")).includes(q);
    });
    toplam+=satir.length; if(!satir.length)return;
    html+=`<section class="bolum" id="${c.id}" aria-labelledby="b-${c.id}"><div class="bolum-bas"><h3 id="b-${c.id}">${c[dil]}</h3><span class="bolum-saat"></span></div>${c["n"+dil]?`<p class="bolum-not">${c["n"+dil]}</p>`:""}<ul class="urunler">`+
    satir.map(({u,i})=>{const k=anahtar(c,i), n=liste[k]||0, e=u.e.split(" ").filter(x=>x&&!(x==="v"&&u.e.includes("vg")));
      return `<li class="urun"><div class="urun-ust"><h4>${u[dil]}</h4><span class="urun-nokta" aria-hidden="true"></span><span class="urun-fiyat">${fiyat(u.f)}</span></div>
      <button class="ekle" type="button" data-k="${k}" aria-pressed="${n>0}" aria-label="${T.ekle(u[dil])}">${n?`<b>${n}</b>`:"+"}</button>
      ${u["d"+dil]?`<p class="urun-acik">${u["d"+dil]}</p>`:""}${e.length?`<p class="urun-etk">${e.map(x=>`<span class="${x}">${T.etk[x]}</span>`).join("")}</p>`:""}</li>`}).join("")+`</ul></section>`;
  });
  $("#menuListe").innerHTML=html; $("#bos").hidden=toplam>0;
  yazilar(); izle();
}
function navCiz(){$("#katNav").innerHTML=window.MENU.map((c,i)=>`<li><a href="#${c.id}"${i===0?' aria-current="true"':""}>${c[dil]}</a></li>`).join("")}
let io;
function izle(){
  if(io)io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;$$("#katNav a").forEach(a=>{const on=a.getAttribute("href")==="#"+e.target.id;if(on){a.setAttribute("aria-current","true");const ul=a.closest("ul");if(ul.scrollWidth>ul.clientWidth)ul.scrollTo({left:a.offsetLeft-ul.clientWidth/2+a.offsetWidth/2,behavior:sakin?"auto":"smooth"})}else a.removeAttribute("aria-current")})}),{rootMargin:"-35% 0px -60% 0px"});
  $$(".bolum").forEach(b=>io.observe(b));
}
["input","change"].forEach(o=>["#q","#fV","#fVg","#fG"].forEach(s=>$(s).addEventListener(o,menuCiz)));

/* ---------- Masa listesi ---------- */
function urunBul(k){const [id,i]=k.split("-");const c=window.MENU.find(c=>c.id===id);return c&&c.urun[+i]}
function listeKaydet(){try{sessionStorage.setItem("gunduz-liste",JSON.stringify(liste))}catch(e){}listeCiz()}
function listeCiz(){
  const T=t(), anahtarlar=Object.keys(liste).filter(k=>liste[k]>0&&urunBul(k));
  const adet=anahtarlar.reduce((a,k)=>a+liste[k],0), tutar=anahtarlar.reduce((a,k)=>a+liste[k]*urunBul(k).f,0);
  $("#listeCubuk").hidden=adet===0;
  $("#listeOzet").textContent=`${T.urunSay(adet)} · ${fiyat(tutar)}`;
  $("#listeIc").innerHTML=anahtarlar.map(k=>{const u=urunBul(k);return `<li><span>${u[dil]}</span><span class="adet"><button type="button" data-k="${k}" data-d="-1" aria-label="${T.cikar(u[dil])}">−</button><span>${liste[k]}</span><button type="button" data-k="${k}" data-d="1" aria-label="${T.ekle(u[dil])}">+</button></span><span>${fiyat(u.f*liste[k])}</span></li>`}).join("");
  $("#listeToplam").textContent=fiyat(tutar);
  $$(".ekle").forEach(b=>{const n=liste[b.dataset.k]||0;b.setAttribute("aria-pressed",n>0);b.innerHTML=n?`<b>${n}</b>`:"+"});
  if(adet===0&&$("#listeDlg").open)$("#listeDlg").close();
}
$("#menuListe").addEventListener("click",e=>{const b=e.target.closest(".ekle");if(!b)return;liste[b.dataset.k]=(liste[b.dataset.k]||0)+1;listeKaydet()});
$("#listeIc").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const k=b.dataset.k;liste[k]=Math.max(0,(liste[k]||0)+ +b.dataset.d);if(!liste[k])delete liste[k];listeKaydet()});
$("#listeAc").addEventListener("click",()=>$("#listeDlg").showModal());
$("#listeKapat").addEventListener("click",()=>$("#listeDlg").close());
$("#listeDlg").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
$("#listeSil").addEventListener("click",()=>{liste={};listeKaydet()});

/* ---------- Saatler + rezervasyon ---------- */
function saatTablo(){const T=t(), g=new Date().getDay();
  $("#saatTablo tbody").innerHTML=[1,2,3,4,5,6,0].map(i=>`<tr${i===g?' class="bugun"':""}><td>${T.gunler[i]}</td><td>${sStr(window.SAATLER[i][0])} – ${sStr(window.SAATLER[i][1])}</td></tr>`).join("")}
(function(){let o="";for(let h=8;h<=21.5;h+=.5)o+=`<option${h===19?" selected":""}>${sStr(h)}</option>`;$("#rezSaat").innerHTML=o;
  const d=new Date(),yerel=new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);const g=$("#rezForm [name=gun]");g.min=yerel;g.value=yerel})();
$("#rezForm").addEventListener("submit",e=>{
  e.preventDefault();const T=t(), f=Object.fromEntries(new FormData(e.target)), hata=$("#rezHata"), ad=e.target.ad, gun=e.target.gun;
  f.ad=f.ad.trim();f.not=(f.not||"").trim();
  let m="";ad.removeAttribute("aria-invalid");gun.removeAttribute("aria-invalid");
  if(!f.ad){m=T.hAd;ad.setAttribute("aria-invalid","true");ad.focus()}
  else if(!f.gun){m=T.hGun;gun.setAttribute("aria-invalid","true");gun.focus()}
  else if(f.gun<gun.min){m=T.hGec;gun.setAttribute("aria-invalid","true");gun.focus()}
  hata.hidden=!m;hata.textContent=m;if(m){$("#rezSonuc").hidden=true;return}
  const gunYazi=new Date(f.gun+"T12:00").toLocaleDateString(dil==="tr"?"tr-TR":"en-GB",{day:"numeric",month:"long",weekday:"long"});
  const msg=T.mesaj(f,gunYazi), s=$("#rezSonuc");
  s.hidden=false;s.innerHTML=`<strong>${T.hazir}</strong><blockquote></blockquote><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">${T.waAc}</a><small>${T.demo}</small>`;
  s.querySelector("blockquote").textContent=msg;s.scrollIntoView({block:"nearest",behavior:sakin?"auto":"smooth"});
});

/* ---------- Dil ---------- */
function dilUygula(){
  const T=t();document.documentElement.lang=dil;
  $$("[data-i18n]").forEach(el=>{const v=T[el.dataset.i18n];if(typeof v==="string")el.textContent=v});
  $$("[data-i18n-ph]").forEach(el=>el.placeholder=T[el.dataset.i18nPh]);
  $("#q").placeholder=T.araPh;
  $$(".dil button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.dil===dil));
  navCiz();menuCiz();saatTablo();listeCiz();
}
$$(".dil button").forEach(b=>b.addEventListener("click",()=>{dil=b.dataset.dil;try{localStorage.setItem("gunduz-dil",dil)}catch(e){}dilUygula()}));

/* ---------- Görseller: gorseller/ klasörüne gerçek dosya konunca kendiliğinden görünür ---------- */
$$("[data-foto] > .foto").forEach(img=>{const bak=()=>{if(img.naturalWidth>8)img.parentElement.classList.add("foto-var")};img.complete?bak():img.addEventListener("load",bak)});

/* ---------- Başlat ---------- */
dilUygula();
(function(){
  const hedef=simdiSaat(), hk=Math.max(AC,Math.min(KAPA,hedef));
  kaydir.value=Math.round(hk*60);
  if(sakin||!acikMi(hedef)){ciz(hedef);return}
  // güneş ufuktan doğup şimdiki saate oturur
  const t0=performance.now(), sure=1700;
  (function adim(n){const k=Math.min(1,(n-t0)/sure), e=1-Math.pow(1-k,3);if(!canli)return;ciz(AC+(hk-AC)*e);if(k<1)requestAnimationFrame(adim);else ciz(hedef)})(t0);
})();
setInterval(()=>{if(canli){const h=simdiSaat();kaydir.value=Math.round(Math.max(AC,Math.min(KAPA,h))*60);ciz(h)}},60000);
})();
