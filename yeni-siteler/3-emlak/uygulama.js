(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sakin=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!sakin)document.documentElement.classList.add("anim");
const WA="905000000000", PLANLAR=window.PLANLAR, ILANLAR=window.ILANLAR;
const tl=n=>Math.round(n).toLocaleString("tr-TR")+" ₺";
const mt=n=>n.toFixed(2).replace(".",",")+" m";
const kacis=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ISLEM={satilik:"Satılık",kiralik:"Kiralık"};
const fiyatYaz=i=>tl(i.fiyat)+(i.islem==="kiralik"?"<small>/ ay</small>":"");

/* ---------- Kat planı çizici ---------- */
function olcek(sablon,net){const P=PLANLAR[sablon];return net?Math.sqrt(net/(P.g*P.d)):1}
function odalar(il){const P=PLANLAR[il.plan], k=olcek(il.plan,il.planNet||il.net);return P.o.map(o=>({ad:o[0],m2:o[3]*o[4]*k*k,tip:o[5]}))}
function plan(sablon,o){
  o=o||{};const P=PLANLAR[sablon], K=40, W=P.g*K, H=P.d*K, pad=o.etiket?54:44, k=olcek(sablon,o.net), f=o.etiket?13:Math.round((W+pad*2)*.05);
  let i=0, s="", dolgu="", yazi="";
  P.o.forEach(r=>{const x=(o.ayna?P.g-r[1]-r[3]:r[1])*K, y=r[2]*K, w=r[3]*K, h=r[4]*K;i++;
    if(r[5])dolgu+=`<rect class="dolgu" style="--i:${i}" x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${r[5]==="b"?"tarama":"nokta"})"/>`;
    s+=`<rect class="oda d" pathLength="1" style="--i:${i}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    if(o.etiket){const kucuk=w<95||h<60, ad=r[0].split(" ");
      yazi+=`<g class="y${kucuk?" kucuk":""}" style="--i:${i+4}"><text class="ad" x="${x+w/2}" y="${y+h/2-(kucuk?1:ad.length>1&&w<150?12:3)}">${ad.length>1&&w<150?`<tspan x="${x+w/2}">${ad[0]}</tspan><tspan x="${x+w/2}" dy="1.1em">${ad.slice(1).join(" ")}</tspan>`:r[0]}</text><text class="m2" x="${x+w/2}" y="${y+h/2+(kucuk?13:ad.length>1&&w<150?30:16)}">${(r[3]*r[4]*k*k).toFixed(1).replace(".",",")} m²</text></g>`}
  });
  const n=P.o.length+2;
  const olcu=`<path class="olcu d" pathLength="1" style="--i:${n}" d="M0 -22H${W}M0 -28v12M${W} -28v12"/><path class="olcu d" pathLength="1" style="--i:${n+1}" d="M-22 0V${H}M-28 0h12M-28 ${H}h12"/>
    <text class="olcu-yazi y" style="--i:${n+2};font-size:${f}px" x="${W/2}" y="${o.etiket?-30:-30}">${mt(P.g*k)}</text><text class="olcu-yazi y" style="--i:${n+2};font-size:${f}px" transform="translate(${o.etiket?-30:-30} ${H/2}) rotate(-90)">${mt(P.d*k)}</text>`;
  return `<svg class="plan${o.etiket?" etiketli":""}" viewBox="${-pad} ${-pad-(o.etiket?0:8)} ${W+pad+16} ${H+pad+16+(o.etiket?0:8)}" role="img" aria-label="${kacis(o.alt||"Kat planı")}">${dolgu}<rect class="dis d" pathLength="1" style="--i:0" x="0" y="0" width="${W}" height="${H}"/>${s}${olcu}${yazi}</svg>`;
}
const io=("IntersectionObserver" in window)&&!sakin?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("ciz");io.unobserve(e.target)}}),{threshold:.2}):null;
function planlariIzle(kok){(kok||document).querySelectorAll(".plan:not(.ciz)").forEach(p=>io?io.observe(p):p.classList.add("ciz"))}

/* ---------- Giriş planı ---------- */
$("#girisPlan").innerHTML=plan("uc",{etiket:true,net:117,alt:"Örnek 3+1 daire planı: salon, mutfak, üç oda, banyo, WC ve balkon"})+`<figcaption><span>Örnek pafta · 3+1</span><span>117 m² net</span><span>Ölçek 1:100</span></figcaption>`;

/* ---------- İlçe listeleri ---------- */
const ILCELER=[...new Set(ILANLAR.map(i=>i.ilce))].sort((a,b)=>a.localeCompare(b,"tr"));
["#hizliIlce","#sIlce"].forEach(s=>$(s).insertAdjacentHTML("beforeend",ILCELER.map(i=>`<option>${i}</option>`).join("")));
$("#satIlce").insertAdjacentHTML("beforeend",["Balçova","Bayraklı","Bornova","Buca","Çiğli","Gaziemir","Güzelbahçe","Karabağlar","Karşıyaka","Konak","Narlıdere","Urla","Diğer"].map(i=>`<option>${i}</option>`).join(""));

/* ---------- Vitrin ---------- */
const suzgec=$("#suzgec");
function vitrinCiz(){
  const f=Object.fromEntries(new FormData(suzgec));
  let l=ILANLAR.filter(i=>(!f.islem||i.islem===f.islem)&&(!f.ilce||i.ilce===f.ilce)&&(!f.tur||i.tur===f.tur)&&(!f.oda||i.oda===f.oda)&&i.net>=+f.m2);
  l.sort({yeni:(a,b)=>a.gun-b.gun,artan:(a,b)=>a.fiyat-b.fiyat,azalan:(a,b)=>b.fiyat-a.fiyat,m2:(a,b)=>b.net-a.net}[f.sira]);
  $("#paftalar").innerHTML=l.map(i=>`<li class="pafta"><div class="pafta-plan">${plan(i.plan,{ayna:i.ayna,net:i.planNet||i.net,alt:i.oda+" kat planı"})}</div>
    <div class="antet"><p class="a-ust"><span>${i.no}${i.gun<=3?'<span class="yeni">Yeni</span>':""}</span><span class="islem">${ISLEM[i.islem]} · ${i.tur}</span></p>
    <h3><a href="#ilan-${i.no}">${i.baslik}</a></h3><p class="a-yer">${i.mah}, ${i.ilce}</p>
    <p class="a-ozet"><span>${i.oda}</span><span>${i.net} m² net</span><span>${/\d/.test(i.kat[0])?"Kat "+i.kat:i.kat}</span></p><p class="a-fiyat">${fiyatYaz(i)}</p></div></li>`).join("");
  $("#bos").hidden=l.length>0;
  $("#sayac").textContent=l.length===ILANLAR.length?`${l.length} ilan`:`${ILANLAR.length} ilandan ${l.length} tanesi`;
  planlariIzle($("#paftalar"));
}
suzgec.addEventListener("change",vitrinCiz);
suzgec.addEventListener("reset",()=>setTimeout(vitrinCiz));
$("#hizli").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);suzgec.reset();["islem","ilce","oda"].forEach(k=>suzgec.elements[k].value=f.get(k));vitrinCiz();$("#vitrin").scrollIntoView({behavior:sakin?"auto":"smooth"})});

/* ---------- İlan detayı ---------- */
const dlg=$("#detay");
function detayAc(no){
  const i=ILANLAR.find(x=>x.no===no);if(!i)return;
  const msg=`Merhaba, ${i.no} numaralı ilan (${i.baslik}, ${i.mah} ${i.ilce}) hakkında bilgi almak istiyorum.`;
  const oda=odalar(i), satir=(a,b)=>`<tr><th scope="row">${a}</th><td>${b}</td></tr>`;
  $("#detayIc").innerHTML=`<div class="d-ust"><span>${i.no} · ${ISLEM[i.islem]} · ${i.tur}</span><button type="button" class="d-kapat" id="dKapat">Kapat ✕</button></div>
  <div class="d-bas"><h2 id="dBaslik">${i.baslik}</h2><p>${i.mah}, ${i.ilce} · ${i.oda} · ${i.net} m² net</p><p class="d-fiyat">${fiyatYaz(i)}</p></div>
  <div class="d-govde"><div><div class="d-plan">${plan(i.plan,{ayna:i.ayna,net:i.planNet||i.net,etiket:true,alt:i.baslik+" kat planı"})}<p>Ölçüler iç ölçüdür, yuvarlanmıştır. Kapı ve pencere yerleri için bizimle evi görün.${i.planNet?" Plan yalnızca zemin katı gösterir.":""}</p></div>
    <div class="d-yan"><h3>Fotoğraflar</h3><div class="d-foto"><div>Fotoğraf yeri<br>Salon</div><div>Fotoğraf yeri<br>Mutfak</div><div>Fotoğraf yeri<br>Cephe</div></div></div></div>
  <div class="d-yan"><h3>Ev hakkında</h3><p>${i.acik}</p><ul class="d-etiket">${i.oz.map(o=>`<li>${o}</li>`).join("")}</ul>
    <h3>Künye</h3><table class="d-tablo"><tbody>${satir("Brüt / net",i.brut+" / "+i.net+" m²")+satir("Oda",i.oda)+satir("Kat",i.kat)+satir("Bina yaşı",i.yas?i.yas+" yıl":"Sıfır")+satir("Isıtma",i.isitma)+satir("Aidat",i.aidat?tl(i.aidat)+" / ay":"Yok")}</tbody></table>
    <h3>Odalar</h3><table class="d-tablo"><tbody>${oda.map(o=>satir(o.ad,o.m2.toFixed(1).replace(".",",")+" m²")).join("")}</tbody></table>
    <div class="d-eylem"><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">WhatsApp'tan sorun</a>${i.islem==="satilik"?`<button type="button" class="dugme cizgili" id="dKredi">Kredisini hesapla</button>`:""}</div></div></div>`;
  if(!dlg.open)dlg.showModal();dlg.scrollTop=0;
  $("#dKapat").addEventListener("click",()=>dlg.close());
  const kb=$("#dKredi");if(kb)kb.addEventListener("click",()=>{dlg.close();$("#kFiyat").value=i.fiyat.toLocaleString("tr-TR");krediHesap();$("#kredi").scrollIntoView({behavior:sakin?"auto":"smooth"})});
  requestAnimationFrame(()=>requestAnimationFrame(()=>dlg.querySelectorAll(".plan").forEach(p=>p.classList.add("ciz"))));
}
dlg.addEventListener("close",()=>{if(location.hash.startsWith("#ilan-"))history.replaceState(null,"",location.pathname+location.search)});
function yol(){const h=decodeURIComponent(location.hash);if(h.startsWith("#ilan-"))detayAc(h.slice(6));else if(dlg.open)dlg.close()}
addEventListener("hashchange",yol);

/* ---------- Evinizi satalım ---------- */
$("#satForm").addEventListener("submit",e=>{
  e.preventDefault();const fm=e.target, f=Object.fromEntries(new FormData(fm)), hata=$("#satHata");let m="",odak=null;
  $$("#satForm [aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));
  if(!f.ilce){m="Evin hangi ilçede olduğunu seçin.";odak=fm.ilce}
  else if(!f.ad.trim()){m="Adınızı yazın.";odak=fm.ad}
  else if(f.tel.replace(/\D/g,"").length<10){m="Telefon numaranız eksik görünüyor.";odak=fm.tel}
  else if(!f.onay){m="Size dönebilmemiz için onay kutusunu işaretleyin.";odak=fm.onay}
  hata.hidden=!m;hata.textContent=m;if(m){odak.setAttribute("aria-invalid","true");odak.focus();$("#satSonuc").hidden=true;return}
  const msg=`Merhaba, evim için görüşmek istiyorum.\nİstek: ${f.niyet}\nEv: ${f.ilce}, ${f.oda}${f.m2?`, yaklaşık ${f.m2} m²`:""}${f.yas?`, ${f.yas} yaşında bina`:""}\nAd: ${f.ad.trim()} · Tel: ${f.tel.trim()}${f.not.trim()?`\nNot: ${f.not.trim()}`:""}`;
  const s=$("#satSonuc");s.hidden=false;
  s.innerHTML=`<strong>Mesajınız hazır.</strong><pre>${kacis(msg)}</pre><a class="dugme" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">WhatsApp'ta açın</a><small>Örnek sitede mesaj deneme numarasına gider; bilgileriniz hiçbir yere kaydedilmez.</small>`;
  s.scrollIntoView({block:"nearest",behavior:sakin?"auto":"smooth"});
});

/* ---------- Kredi hesabı ---------- */
function krediHesap(){
  const fiyat=+$("#kFiyat").value.replace(/\D/g,"")||0, p=+$("#kPesin").value, n=+$("#kVade").value, r=(parseFloat($("#kFaiz").value.replace(",","."))||0)/100;
  const kredi=fiyat*(1-p/100), taksit=kredi<=0?0:r>0?kredi*r/(1-Math.pow(1+r,-n)):kredi/n, toplam=taksit*n, faiz=Math.max(0,toplam-kredi);
  $("#kPesinO").textContent=`%${p} · ${tl(fiyat*p/100)}`;$("#kVadeO").textContent=`${n} ay (${n/12} yıl)`;
  $("#kTaksit").textContent=taksit?tl(taksit):"—";$("#kKredi").textContent=tl(kredi);$("#kToplamFaiz").textContent=tl(faiz);$("#kToplam").textContent=tl(toplam);
  const ao=toplam?kredi/toplam*100:100;$("#kAna").style.width=ao+"%";$("#kFz").style.width=(100-ao)+"%";
  $("#kCubuk").setAttribute("aria-label",`Geri ödemenin yüzde ${Math.round(ao)} kadarı anapara, yüzde ${Math.round(100-ao)} kadarı faiz`);
}
$("#krediForm").addEventListener("input",e=>{if(e.target.id==="kFiyat"){const d=e.target.value.replace(/\D/g,"").slice(0,11);e.target.value=d?(+d).toLocaleString("tr-TR"):""}krediHesap()});
$("#krediForm").addEventListener("submit",e=>e.preventDefault());

/* ---------- Görseller ---------- */
$$("[data-foto] > .foto").forEach(img=>{const bak=()=>{if(img.naturalWidth>8)img.parentElement.classList.add("foto-var")};img.complete?bak():img.addEventListener("load",bak)});

vitrinCiz();krediHesap();planlariIzle();yol();
})();
