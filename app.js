/* Galeri web sitesi — uygulama kodu.
   Site bilgileri config.js dosyasındadır; bu dosyayı düzenlemeniz gerekmez. */
"use strict";
const S=window.SITE||{};
const AGENTS=(S.agents&&S.agents.length)?S.agents:[{ad:S.name||"Galeri",rol:"Satış",tel:S.phone||"",c:"#24364F"}];
const DAY=864e5;

/* ======================= ÖRNEK ARAÇLAR VE ÇİZİMLER ======================= */
const COL={"Beyaz":"#ECEEEF","Siyah":"#1C1F23","Gri metalik":"#7F868E","Kırmızı":"#A8242A","Lacivert":"#22355C","Füme":"#474D55","Gümüş":"#BCC1C6","Mavi":"#2D62A6","Bordo":"#5E1E25"};
const PARTS={onTampon:"Ön tampon",kaput:"Motor kaputu",solOnCam:"Sol ön çamurluk",sagOnCam:"Sağ ön çamurluk",solOnKapi:"Sol ön kapı",sagOnKapi:"Sağ ön kapı",solArkaKapi:"Sol arka kapı",sagArkaKapi:"Sağ arka kapı",tavan:"Tavan",solArkaCam:"Sol arka çamurluk",sagArkaCam:"Sağ arka çamurluk",bagaj:"Bagaj kapağı",arkaTampon:"Arka tampon"};
const ST={o:["Orijinal","#D9DDE1"],l:["Lokal boyalı","#F5D77E"],b:["Boyalı","#EE9F3B"],d:["Değişen","#D2463C"]};
const DEFAULTS=[
 {id:2051,marka:"BMW",model:"3 Serisi",paket:"320i M Sport",yil:2020,km:68400,yakit:"Benzin",vites:"Otomatik",kasa:"Sedan",renk:"Mavi",motor:"1.597 cc · 170 hp",cekis:"Arkadan itiş",fiyat:2950000,tramer:0,exp:{},gun:1,ag:0,kokpit:"siyah",
  acik:["Tek sahibinden, tüm bakımları yetkili serviste yapılmış. Bakım geçmişi ve faturaları mevcut.","M Sport paket, deri koltuk, geri görüş kamerası ve adaptif LED farlar. Hatasız, boyasız, tramer kaydı yoktur."],
  don:["Deri koltuk","Hafızalı sürücü koltuğu","Geri görüş kamerası","Adaptif LED far","Navigasyon","Apple CarPlay","Şerit takip","Park sensörü"]},
 {id:2050,marka:"Toyota",model:"Corolla",paket:"1.8 Hybrid Flame X-Pack",yil:2022,km:41200,yakit:"Hibrit",vites:"Otomatik",kasa:"Sedan",renk:"Beyaz",motor:"1.798 cc · 122 hp",cekis:"Önden çekiş",fiyat:1850000,tramer:12400,exp:{arkaTampon:"b"},gun:2,ag:0,kokpit:"siyah",
  acik:["Şehir içi 4,5 litre civarı yakıt tüketimi olan hibrit Corolla. Garantisi devam ediyor.","Arka tampon park hasarı nedeniyle boyalıdır, onun dışında orijinaldir."],
  don:["Adaptif hız sabitleyici","Şerit takip","Geri görüş kamerası","Kablosuz şarj","Çift bölgeli klima","LED far"]},
 {id:2049,marka:"Peugeot",model:"3008",paket:"1.5 BlueHDi GT Line",yil:2022,km:57800,yakit:"Dizel",vites:"Otomatik",kasa:"SUV",renk:"Gri metalik",motor:"1.499 cc · 130 hp",cekis:"Önden çekiş",fiyat:2450000,tramer:0,exp:{},gun:2,ag:1,kokpit:"siyah",
  acik:["GT Line paket, panoramik cam tavan ve dijital gösterge paneli. Hatasız ve boyasızdır.","Lastikleri yeni, bir sonraki periyodik bakımı 75.000 km'de."],
  don:["Panoramik cam tavan","Dijital gösterge","360° kamera","Elektrikli bagaj","Kör nokta uyarısı","Anahtarsız giriş"]},
 {id:2048,marka:"Fiat",model:"Egea",paket:"1.4 Fire Urban",yil:2021,km:96500,yakit:"Benzin & LPG",vites:"Manuel",kasa:"Sedan",renk:"Beyaz",motor:"1.368 cc · 95 hp",cekis:"Önden çekiş",fiyat:1150000,tramer:28600,exp:{sagOnKapi:"b",sagArkaKapi:"l",onTampon:"b"},gun:3,ag:1,kokpit:"siyah",
  acik:["Fabrika çıkışlı LPG'li, ekonomik aile aracı. LPG muayenesi yeni yapıldı.","Sağ ön kapı boyalı, sağ arka kapıda lokal boya, ön tampon boyalıdır. Değişen parçası yoktur."],
  don:["Klima","Bluetooth","Hız sabitleyici","Elektrikli camlar","Park sensörü"]},
 {id:2047,marka:"Renault",model:"Clio",paket:"1.0 TCe Touch",yil:2021,km:52300,yakit:"Benzin",vites:"Manuel",kasa:"Hatchback",renk:"Kırmızı",motor:"999 cc · 90 hp",cekis:"Önden çekiş",fiyat:1050000,tramer:0,exp:{},gun:5,ag:0,kokpit:"siyah",
  acik:["İlk sahibinden, kadın sürücü kullanımında. Hatasız ve boyasız.","Şehir içi kullanım için ideal, düşük yakıt tüketimi."],
  don:["Dokunmatik ekran","Apple CarPlay","Hız sabitleyici","Otomatik klima","LED gündüz farı"]},
 {id:2046,marka:"Volkswagen",model:"Passat",paket:"1.6 TDI Business",yil:2019,km:142000,yakit:"Dizel",vites:"Otomatik",kasa:"Sedan",renk:"Siyah",motor:"1.598 cc · 120 hp",cekis:"Önden çekiş",fiyat:2150000,tramer:46200,exp:{kaput:"b",solOnCam:"d",onTampon:"b"},gun:6,ag:2,kokpit:"bej",
  acik:["Uzun yol kullanılmış, tüm bakımları zamanında yapılmış Passat. DSG şanzıman bakımı 130.000 km'de yapıldı.","Motor kaputu ve ön tampon boyalı, sol ön çamurluk değişendir. Hava yastıkları orijinaldir."],
  don:["Deri koltuk","Koltuk ısıtma","Navigasyon","Adaptif hız sabitleyici","Geri görüş kamerası","Elektrikli bagaj"]},
 {id:2045,marka:"Hyundai",model:"i20",paket:"1.4 MPI Style",yil:2022,km:33900,yakit:"Benzin",vites:"Otomatik",kasa:"Hatchback",renk:"Lacivert",motor:"1.368 cc · 100 hp",cekis:"Önden çekiş",fiyat:1090000,tramer:0,exp:{},gun:8,ag:2,kokpit:"siyah",
  acik:["Düşük kilometreli, otomatik vitesli i20. Garantisi devam ediyor.","Hatasız, boyasız, tramer kaydı yoktur."],
  don:["Dijital gösterge","Geri görüş kamerası","Şerit takip","Kablosuz CarPlay","Otomatik far"]},
 {id:2044,marka:"Honda",model:"Civic",paket:"1.5 VTEC Eco Elegance",yil:2021,km:61000,yakit:"Benzin & LPG",vites:"Otomatik",kasa:"Sedan",renk:"Füme",motor:"1.498 cc · 129 hp",cekis:"Önden çekiş",fiyat:1750000,tramer:9800,exp:{bagaj:"l"},gun:9,ag:0,kokpit:"siyah",
  acik:["Fabrika çıkışlı LPG'li Eco Civic. Yakıt masrafı çok düşük.","Bagaj kapağında lokal boya vardır, diğer parçalar orijinaldir."],
  don:["Sunroof","Geri görüş kamerası","Hız sabitleyici","Otomatik klima","Yağmur sensörü"]},
 {id:2043,marka:"Dacia",model:"Duster",paket:"1.3 TCe Prestige",yil:2023,km:24500,yakit:"Benzin",vites:"Manuel",kasa:"SUV",renk:"Gümüş",motor:"1.332 cc · 150 hp",cekis:"Önden çekiş",fiyat:1390000,tramer:0,exp:{},gun:11,ag:1,kokpit:"siyah",
  acik:["Neredeyse sıfır ayarında Duster. Garantisi 2028'e kadar devam ediyor.","Hatasız ve boyasızdır."],
  don:["360° kamera","Navigasyon","Anahtarsız giriş","Tavan rayı","Otomatik klima"]},
 {id:2042,marka:"Ford",model:"Kuga",paket:"1.5 EcoBlue Titanium",yil:2021,km:88700,yakit:"Dizel",vites:"Otomatik",kasa:"SUV",renk:"Bordo",motor:"1.499 cc · 120 hp",cekis:"Önden çekiş",fiyat:2100000,tramer:21300,exp:{solArkaKapi:"b",solArkaCam:"l"},gun:13,ag:2,kokpit:"bej",
  acik:["Titanium paket, geniş bagaj hacmi ile aile kullanımına uygun SUV.","Sol arka kapı boyalı, sol arka çamurlukta lokal boya vardır."],
  don:["Elektrikli bagaj","Koltuk ısıtma","Geri görüş kamerası","Adaptif hız sabitleyici","Şerit takip","Kablosuz şarj"]}
];


/* ======================= YARDIMCILAR ======================= */
const $=s=>document.querySelector(s);
const fmt=n=>Math.round(n).toLocaleString("tr-TR");
const tl=n=>fmt(n)+" ₺";
const today=new Date();
const dateOf=g=>{const d=new Date(today);d.setDate(d.getDate()-g);return d.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"})};
const title=c=>`${c.yil} ${c.marka} ${c.model}`;
const I={
 cam:'<svg class="ico" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 heart:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
 check:'<svg class="ico" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="m5 12 4.5 4.5L19 7"/></svg>',
 l:'<svg class="ico" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
 r:'<svg class="ico" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>'
};

/* ======================= ARAÇ ÇİZİMLERİ ======================= */
let UID=0;
const BODY={
 Sedan:{W:620,wy:-32,r:46,wh:[128,493],belt:-120,
  body:"M10,-45 L10,-95 Q12,-115 40,-120 L170,-128 Q210,-180 260,-188 L380,-190 Q420,-188 470,-135 L580,-122 Q612,-116 615,-90 L615,-50 Q612,-35 595,-32 L545,-32 A52,52 0 0 0 441,-32 L180,-32 A52,52 0 0 0 76,-32 L25,-32 Q10,-34 10,-45 Z",
  win:"M190,-130 Q228,-174 266,-180 L374,-182 Q408,-178 450,-134 Z",pil:[[321,8]],door:[[325,-130,-40],[455,-134,-50],[200,-127,-55]],hand:[[300,-112],[430,-114]],
  head:"M572,-119 L608,-112 Q614,-104 612,-98 L585,-102 Z",tail:"M12,-112 L42,-119 L44,-104 L12,-100 Z",mir:[452,-136],rock:[180,441]},
 Hatchback:{W:540,wy:-32,r:45,wh:[110,420],belt:-132,
  body:"M12,-45 L14,-150 Q18,-195 60,-200 L300,-202 Q340,-200 395,-140 L505,-125 Q535,-118 538,-92 L538,-50 Q535,-34 518,-32 L470,-32 A50,50 0 0 0 370,-32 L160,-32 A50,50 0 0 0 60,-32 L25,-32 Q12,-34 12,-45 Z",
  win:"M34,-142 Q38,-184 66,-189 L296,-191 Q330,-187 378,-140 Z",pil:[[140,16],[262,8]],door:[[266,-140,-40],[386,-138,-50],[152,-142,-55]],hand:[[240,-120],[362,-122]],
  head:"M496,-122 L530,-115 Q536,-106 534,-100 L508,-104 Z",tail:"M14,-152 L32,-152 L32,-118 L14,-116 Z",mir:[378,-141],rock:[160,370]},
 SUV:{W:620,wy:-40,r:50,wh:[127,497],belt:-146,rails:true,
  body:"M10,-55 L12,-150 Q16,-210 60,-218 L400,-222 Q440,-220 490,-152 L590,-138 Q615,-130 616,-100 L616,-60 Q612,-42 595,-40 L555,-40 A58,58 0 0 0 439,-40 L185,-40 A58,58 0 0 0 69,-40 L25,-40 Q10,-42 10,-55 Z",
  win:"M32,-152 Q36,-200 66,-206 L394,-209 Q428,-205 474,-154 Z",pil:[[160,16],[316,8]],door:[[320,-152,-48],[478,-152,-60],[174,-152,-60]],hand:[[294,-132],[450,-134]],
  head:"M576,-138 L610,-128 Q616,-118 614,-110 L588,-114 Z",tail:"M12,-150 L32,-152 L32,-118 L12,-116 Z",mir:[476,-153],rock:[185,439]}
};
function wheel(x,y,r){
  let s=`<circle cx="${x}" cy="${y}" r="${r}" fill="#141619"/><circle cx="${x}" cy="${y}" r="${r*.66}" fill="#25292E" stroke="#C9CED3" stroke-width="${r*.07}"/>`;
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2;s+=`<line x1="${x}" y1="${y}" x2="${(x+Math.cos(a)*r*.6).toFixed(1)}" y2="${(y+Math.sin(a)*r*.6).toFixed(1)}" stroke="#C9CED3" stroke-width="${(r*.15).toFixed(1)}" stroke-linecap="round"/>`}
  return s+`<circle cx="${x}" cy="${y}" r="${r*.15}" fill="#E1E4E7"/><circle cx="${x}" cy="${y}" r="${r*.92}" fill="none" stroke="#2A2D31" stroke-width="2"/>`;
}
function carDefs(u){return `<linearGradient id="${u}cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".36" stop-color="#fff" stop-opacity=".06"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></linearGradient>
 <linearGradient id="${u}cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6A7B8B"/><stop offset=".45" stop-color="#1C2630"/><stop offset="1" stop-color="#0D1318"/></linearGradient>`}
function car(u,c){
  const b=BODY[c.kasa],col=COL[c.renk];
  let s=`<path d="${b.body}" fill="${col}"/><path d="${b.body}" fill="url(#${u}cb)"/>`;
  s+=`<path d="M${b.rock[0]},${b.wy} L${b.rock[1]},${b.wy} L${b.rock[1]},${b.wy-13} L${b.rock[0]},${b.wy-13} Z" fill="#000" opacity=".28"/>`;
  s+=`<path d="${b.win}" fill="url(#${u}cg)"/>`;
  b.pil.forEach(([x,w])=>s+=`<rect x="${x}" y="${b.belt-75}" width="${w}" height="72" fill="#0E1216"/>`);
  s+=`<path d="${b.win}" fill="none" stroke="#0E1216" stroke-width="5"/>`;
  s+=`<polygon points="${b.wh[0]+70},${b.belt-20} ${b.wh[0]+120},${b.belt-62} ${b.wh[0]+150},${b.belt-62} ${b.wh[0]+100},${b.belt-20}" fill="#fff" opacity=".1"/>`;
  b.door.forEach(([x,y1,y2])=>s+=`<line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="#000" stroke-opacity=".28" stroke-width="2"/>`);
  b.hand.forEach(([x,y])=>s+=`<rect x="${x}" y="${y}" width="24" height="5" rx="2.5" fill="#000" opacity=".35"/>`);
  s+=`<path d="M40,${b.belt+2} L${b.W-50},${b.belt+4}" stroke="#fff" stroke-opacity=".38" stroke-width="2.5"/>`;
  s+=`<path d="${b.head}" fill="#F3F1EA" stroke="#2A2D31" stroke-width="2"/><path d="${b.tail}" fill="#B3121C" stroke="#4A0A0E" stroke-width="2"/>`;
  s+=`<path d="M${b.mir[0]},${b.mir[1]} l16,-9 l9,0 l0,11 l-20,4 z" fill="${col}" stroke="#0E1216" stroke-width="2"/>`;
  if(b.rails)s+=`<rect x="80" y="-228" width="300" height="7" rx="3" fill="#1A1D21"/>`;
  b.wh.forEach(x=>s+=wheel(x,b.wy,b.r));
  return s;
}
function placeCar(u,c,cx,gy,tw,refl){
  const b=BODY[c.kasa],s=tw/620,x=cx-b.W*s/2;
  let o=`<ellipse cx="${cx}" cy="${gy+2}" rx="${b.W*s*.52}" ry="${14*s}" fill="#000" opacity=".35"/>`;
  if(refl)o+=`<g transform="translate(${x.toFixed(1)} ${gy}) scale(${s.toFixed(3)} ${(-s).toFixed(3)})" opacity="${refl}">${car(u+"r",c)}</g>`;
  return o+`<g transform="translate(${x.toFixed(1)} ${gy}) scale(${s.toFixed(3)})">${car(u,c)}</g>`;
}
function showroom(u,c,o){
  const W=o.w||800,H=o.h||520,gy=o.gy||440,dark=o.dark;
  const wall=dark?["#262B32","#14171B"]:["#F1F2F3","#D6D9DC"],floor=dark?["#2C3138","#0F1114"]:["#CBCFD3","#A3A8AE"];
  let s=`<defs>${carDefs(u)}${carDefs(u+"r")}<linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${wall[0]}"/><stop offset="1" stop-color="${wall[1]}"/></linearGradient><linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${floor[0]}"/><stop offset="1" stop-color="${floor[1]}"/></linearGradient><radialGradient id="${u}sp" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff" stop-opacity="${dark?.22:.55}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
  s+=`<rect width="${W}" height="${H}" fill="url(#${u}w)"/>`;
  for(let x=W/8;x<W;x+=W/8)s+=`<line x1="${x}" x2="${x}" y1="0" y2="${gy-110}" stroke="${dark?"#fff":"#000"}" stroke-opacity=".05"/>`;
  s+=`<text x="${o.cx||W/2}" y="${gy-150}" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="900" font-stretch="125%" font-size="${W*.19}" fill="${dark?"#fff":"#000"}" opacity="${dark?.05:.045}">${esc(S.short)}</text>`;
  s+=`<rect y="${gy-100}" width="${W}" height="${H-gy+100}" fill="url(#${u}f)"/><line x1="0" x2="${W}" y1="${gy-100}" y2="${gy-100}" stroke="${dark?"#3A4048":"#B6BBC0"}" stroke-width="2"/>`;
  [.3,.5,.7].forEach(p=>{const cx=(o.cx?o.cx-W*.2+W*.4*((p-.3)/.4):W*p);s+=`<ellipse cx="${cx}" cy="0" rx="${W*.13}" ry="${gy-60}" fill="url(#${u}sp)"/><rect x="${cx-24}" y="0" width="48" height="6" rx="3" fill="${dark?"#555":"#fff"}"/>`});
  s+=placeCar(u,c,o.cx||W/2,gy,o.tw||620,dark?.12:.2);
  return s;
}
function outdoor(u,c){
  let s=`<defs>${carDefs(u)}<linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5C93CC"/><stop offset=".7" stop-color="#B9D5EA"/><stop offset="1" stop-color="#EEF2EE"/></linearGradient><radialGradient id="${u}t" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#86A86C"/><stop offset="1" stop-color="#2D4D2B"/></radialGradient></defs>`;
  s+=`<rect width="800" height="520" fill="url(#${u}s)"/><g fill="#fff" opacity=".6"><ellipse cx="150" cy="70" rx="80" ry="16"/><ellipse cx="190" cy="58" rx="44" ry="15"/><ellipse cx="560" cy="100" rx="64" ry="12"/></g>`;
  s+=`<path d="M0 300 Q 140 230 300 270 T 600 250 T 800 262 V 330 H0z" fill="#7C95A6" opacity=".55"/>`;
  s+=`<rect x="40" y="200" width="330" height="128" fill="#E9EBEC"/><rect x="40" y="200" width="330" height="26" fill="#1D4FB8"/><text x="205" y="219" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="900" font-stretch="125%" font-size="17" fill="#fff">${esc(S.name.toLocaleUpperCase("tr-TR"))}</text>`;
  s+=`<rect x="56" y="240" width="300" height="88" fill="#2E4252" opacity=".85"/>`;for(let x=116;x<356;x+=60)s+=`<line x1="${x}" x2="${x}" y1="240" y2="328" stroke="#E9EBEC" stroke-width="4"/>`;
  s+=`<path d="M370 214 Q 520 236 700 210" stroke="#666" fill="none"/>`;for(let i=0;i<10;i++){const x=385+i*32,y=219+Math.sin(i/9*Math.PI)*16;s+=`<polygon points="${x},${y} ${x+16},${y} ${x+8},${y+16}" fill="${["#1D4FB8","#ECEEEF","#24364F"][i%3]}"/>`}
  s+=`<rect y="328" width="800" height="192" fill="#62666B"/>`;
  for(let i=-1;i<7;i++)s+=`<line x1="${i*150+80}" y1="328" x2="${i*150+20}" y2="520" stroke="#ECEAE2" stroke-width="5" opacity=".8"/>`;
  s+=`<rect x="720" y="214" width="6" height="114" fill="#4A3A2C"/><ellipse cx="723" cy="196" rx="46" ry="52" fill="url(#${u}t)"/><ellipse cx="700" cy="220" rx="28" ry="26" fill="url(#${u}t)"/>`;
  return s+placeCar(u,c,410,462,560,0);
}
function kokpit(u,c){
  const bej=c.kokpit==="bej",dash=bej?"#C8B597":"#1F2226",dash2=bej?"#A8946F":"#121417";
  let s=`<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6C9ED1"/><stop offset="1" stop-color="#DCE8EE"/></linearGradient><linearGradient id="${u}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dash}"/><stop offset="1" stop-color="${dash2}"/></linearGradient><linearGradient id="${u}sc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16324A"/><stop offset="1" stop-color="#0B1520"/></linearGradient></defs>`;
  s+=`<rect width="800" height="520" fill="url(#${u}s)"/><path d="M0 200 Q 200 170 400 186 T 800 180 V 260 H0z" fill="#86A07A"/><polygon points="360,196 440,196 700,300 100,300" fill="#5E6268"/><line x1="400" y1="200" x2="400" y2="300" stroke="#F2F0E8" stroke-width="4" stroke-dasharray="14 12"/>`;
  s+=`<polygon points="0,0 120,0 40,260 0,300" fill="#14171A"/><polygon points="800,0 680,0 760,260 800,300" fill="#14171A"/><rect width="800" height="26" fill="#14171A"/>`;
  s+=`<path d="M0 250 Q 400 205 800 250 V 520 H0z" fill="url(#${u}d)"/><path d="M0 250 Q 400 205 800 250" stroke="#000" stroke-opacity=".3" stroke-width="3" fill="none"/>`;
  s+=`<rect x="160" y="252" width="230" height="84" rx="16" fill="#0B0D10"/><circle cx="222" cy="296" r="34" fill="#11161C" stroke="#3A4A5A" stroke-width="3"/><circle cx="328" cy="296" r="34" fill="#11161C" stroke="#3A4A5A" stroke-width="3"/><line x1="222" y1="296" x2="246" y2="278" stroke="#5C8DF0" stroke-width="3"/><line x1="328" y1="296" x2="312" y2="274" stroke="#5C8DF0" stroke-width="3"/><text x="275" y="300" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="13" fill="#9FD0FF">${fmt(c.km)}</text><text x="275" y="316" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#5F7A92">KM</text>`;
  s+=`<rect x="450" y="262" width="190" height="112" rx="10" fill="url(#${u}sc)" stroke="#0B0D10" stroke-width="5"/><path d="M462 340 C 500 300, 540 330, 580 290 S 620 300, 630 280" stroke="#4DA3FF" stroke-width="4" fill="none"/><path d="M470 300 H 620 M 520 270 V 370" stroke="#2A4560" stroke-width="2"/><circle cx="560" cy="306" r="6" fill="#5C8DF0"/>`;
  s+=`<rect x="470" y="392" width="150" height="20" rx="6" fill="#0B0D10" opacity=".85"/>${[0,1,2,3,4].map(i=>`<rect x="${478+i*29}" y="397" width="20" height="10" rx="2" fill="#2D3238"/>`).join("")}`;
  s+=`<rect x="70" y="270" width="64" height="28" rx="8" fill="#0B0D10" opacity=".8"/><rect x="680" y="270" width="64" height="28" rx="8" fill="#0B0D10" opacity=".8"/>`;
  s+=`<circle cx="275" cy="430" r="122" fill="none" stroke="#0E1012" stroke-width="28"/><path d="M175 470 Q 275 420 375 470 L 330 520 H 220z" fill="#0E1012"/><circle cx="275" cy="440" r="40" fill="#16191D"/><text x="275" y="446" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="800" font-size="14" fill="#8C96A0">${c.marka.toUpperCase().slice(0,4)}</text><path d="M163 404 Q 275 380 387 404" stroke="#2A2E33" stroke-width="5" fill="none" opacity=".6"/>`;
  return s;
}
function ekspertiz(u,c){
  const f=k=>ST[c.exp[k]||"o"][1];
  const R=(k,x,y,w,h,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx||8}" fill="${f(k)}" stroke="#5B636B" stroke-width="2"><title>${PARTS[k]}: ${ST[c.exp[k]||"o"][0]}</title></rect>`;
  let s=`<rect width="800" height="520" fill="#F6F6F4"/>`;
  s+=`<text x="40" y="52" font-family="Archivo,Arial,sans-serif" font-weight="800" font-size="22" fill="#11161C">Ekspertiz şeması</text><text x="40" y="76" font-family="JetBrains Mono,monospace" font-size="12" fill="#5D6670">${title(c)} · İlan #${c.id}</text>`;
  for(const[x,y]of[[190,100],[530,100],[190,404],[530,404]])s+=`<rect x="${x}" y="${y}" width="66" height="22" rx="8" fill="#1A1D21"/>`;
  s+=R("arkaTampon",138,150,36,220,16)+R("onTampon",640,150,38,220,16);
  s+=R("bagaj",176,174,74,172)+R("tavan",282,174,206,172)+R("kaput",522,174,116,172);
  s+=`<rect x="252" y="178" width="28" height="164" rx="6" fill="#8FA4B6"/><rect x="490" y="178" width="30" height="164" rx="6" fill="#8FA4B6"/>`;
  s+=R("solArkaCam",176,120,104,52)+R("solArkaKapi",282,120,118,52)+R("solOnKapi",402,120,118,52)+R("solOnCam",522,120,116,52);
  s+=R("sagArkaCam",176,348,104,52)+R("sagArkaKapi",282,348,118,52)+R("sagOnKapi",402,348,118,52)+R("sagOnCam",522,348,116,52);
  s+=`<path d="M508 116 l14 -14 h10 v14z" fill="#5B636B"/><path d="M508 404 l14 14 h10 v-14z" fill="#5B636B"/>`;
  s+=`<text x="700" y="265" font-family="JetBrains Mono,monospace" font-size="13" font-weight="600" fill="#11161C">ÖN →</text><text x="62" y="265" font-family="JetBrains Mono,monospace" font-size="13" font-weight="600" fill="#11161C">ARKA</text>`;
  s+=`<text x="400" y="104" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#5D6670">SOL TARAF</text><text x="400" y="436" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#5D6670">SAĞ TARAF</text>`;
  let lx=150;Object.values(ST).forEach(([n,col])=>{s+=`<rect x="${lx}" y="466" width="16" height="16" rx="4" fill="${col}" stroke="#5B636B"/><text x="${lx+22}" y="479" font-family="Manrope,sans-serif" font-size="13" font-weight="600" fill="#11161C">${n}</text>`;lx+=n.length*8+56});
  return s;
}
const LABEL={vitrin:"Showroom",dis:"Dış çekim",kokpit:"Kokpit",ekspertiz:"Ekspertiz şeması"};
const labelOf=k=>/^p\d+$/.test(k)?`Fotoğraf ${+k.slice(1)+1}`:LABEL[k];
function scene(c,k){
  if(/^p\d+$/.test(k)){const i=+k.slice(1);return `<img class="img" src="${c.photos[i]}" alt="${title(c)}, fotoğraf ${i+1}">`}
  const u="r"+(++UID);
  const body=k==="vitrin"?showroom(u,c,{}):k==="dis"?outdoor(u,c):k==="kokpit"?kokpit(u,c):ekspertiz(u,c);
  return `<svg class="img" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${title(c)} · ${LABEL[k]}">${body}</svg>`;
}


/* ======================= GENEL YARDIMCILAR ======================= */
function prep(c){
  c.exp=c.exp||{};c.don=c.don||[];c.acik=c.acik||[];c.photos=c.photos||[];c.sold=!!c.sold;c.tramer=+c.tramer||0;
  c.gun=c.added?Math.max(0,Math.floor((Date.now()-c.added)/DAY)):(c.gun||0);
  c.sc=c.photos.length?c.photos.map((_,i)=>"p"+i).concat("ekspertiz"):["vitrin","dis","kokpit","ekspertiz"];
  c.hatasiz=!Object.keys(c.exp).length&&!c.tramer;
  if(c.ag==null||!AGENTS[c.ag])c.ag=0;
  return c;
}
const seedList=()=>JSON.parse(JSON.stringify(DEFAULTS)).map(c=>({...c,added:Date.now()-(c.gun||0)*DAY}));
let C=[],LOADED=false,LOADERR="";

const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const clean=s=>String(s??"").replace(/[<>"`]/g,"").trim();
const digits=s=>String(s||"").replace(/\D/g,"");
const waNum=t=>{const d=digits(t);return d.startsWith("90")?d:"90"+d.replace(/^0/,"")};
const wa=(t,msg)=>`https://wa.me/${waNum(t)}${msg?`?text=${encodeURIComponent(msg)}`:""}`;
const telHref=t=>`tel:+${waNum(t)}`;
const initials=n=>String(n).split(" ").filter(Boolean).map(x=>x[0]).join("").slice(0,2);

function toast(m){let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";t.setAttribute("role","status");document.body.appendChild(t)}t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,3400)}
function errMsg(e){
  const m=String((e&&(e.message||e.error_description))||e||"");
  if((e&&e.code==="42501")||/row-level security|permission denied|not authorized|unauthorized/i.test(m))return "Bu işlem için yetkiniz yok. Yönetici e-postasının kurulum dosyasına doğru yazıldığını kontrol edin.";
  if(/Invalid login credentials/i.test(m))return "E-posta ya da şifre hatalı.";
  if(/Email not confirmed/i.test(m))return "Bu e-posta onaylanmamış. Kullanıcıyı eklerken 'Auto Confirm User' seçeneğini işaretleyin.";
  if(/Failed to fetch|NetworkError|Load failed|network/i.test(m))return "Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.";
  if(/Payload too large|exceeded the maximum/i.test(m))return "Fotoğraf çok büyük. Daha küçük bir fotoğraf deneyin.";
  return m||"Bir hata oluştu. Tekrar deneyin.";
}
function shrinkBlob(file){return new Promise(res=>{
  const url=URL.createObjectURL(file),im=new Image();
  im.onload=()=>{const s=Math.min(1,1600/im.width),cv=document.createElement("canvas");cv.width=Math.round(im.width*s);cv.height=Math.round(im.height*s);cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);cv.toBlob(b=>{URL.revokeObjectURL(url);res(b)},"image/jpeg",.82)};
  im.onerror=()=>{URL.revokeObjectURL(url);res(null)};im.src=url;
})}
const blobToDataURL=b=>new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.onerror=()=>res(null);fr.readAsDataURL(b)});

/* ======================= VERİ KATMANI ======================= */
const BUCKET="arac-fotograflari";
const strip=c=>{const {sc,hatasiz,gun,...r}=c;return r};
const carToRow=c=>{const {id,sold,sc,hatasiz,gun,added,...data}=c;return {data,sold:!!sold}};
const rowToCar=r=>prep({...(r.data||{}),id:r.id,sold:r.sold,added:Date.parse(r.created_at)});
const pathOf=u=>String(u).split(`/object/public/${BUCKET}/`)[1];

let sb=null;
try{if(window.SUPABASE_URL&&window.SUPABASE_ANON_KEY&&window.supabase)sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY)}catch(e){console.error(e)}

const DbAPI={
  mode:"db",
  async list(){const {data,error}=await sb.from("cars").select("*").order("id",{ascending:false});if(error)throw error;return data.map(rowToCar)},
  async create(c){const {error}=await sb.from("cars").insert(carToRow(c));if(error)throw error},
  async createMany(list){const rows=list.map(c=>({...carToRow(c),created_at:new Date(c.added||Date.now()).toISOString()}));const {error}=await sb.from("cars").insert(rows);if(error)throw error},
  async update(c){const {error}=await sb.from("cars").update(carToRow(c)).eq("id",c.id);if(error)throw error},
  async remove(c){const {error}=await sb.from("cars").delete().eq("id",c.id);if(error)throw error;await this.removePhotos(c.photos)},
  async removePhotos(urls){const p=(urls||[]).map(pathOf).filter(Boolean);if(p.length){const {error}=await sb.storage.from(BUCKET).remove(p);if(error)console.warn(error)}},
  async upload(blob){const path=`araclar/${Date.now()}-${Math.random().toString(36).slice(2,8)}.jpg`;const {error}=await sb.storage.from(BUCKET).upload(path,blob,{contentType:"image/jpeg",cacheControl:"31536000"});if(error)throw error;return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl},
  async login(email,pass){const {error}=await sb.auth.signInWithPassword({email,password:pass});if(error)throw error},
  async logout(){await sb.auth.signOut()},
  async session(){const {data}=await sb.auth.getSession();return !!(data&&data.session)},
  async addLead(l){const {error}=await sb.from("leads").insert(l);if(error)throw error},
  async leads(){const {data,error}=await sb.from("leads").select("*").order("created_at",{ascending:false}).limit(300);if(error)throw error;return data},
  async leadUpdate(id,done){const {error}=await sb.from("leads").update({done}).eq("id",id);if(error)throw error},
  async leadDelete(id){const {error}=await sb.from("leads").delete().eq("id",id);if(error)throw error}
};

const IDB={
  open(){return new Promise((res,rej)=>{try{const r=indexedDB.open("galeriSitesi",1);r.onupgradeneeded=()=>r.result.createObjectStore("kv");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}})},
  async get(k){try{const d=await IDB.open();return await new Promise(res=>{const q=d.transaction("kv").objectStore("kv").get(k);q.onsuccess=()=>res(q.result??null);q.onerror=()=>res(null)})}catch(e){return null}},
  async set(k,v){try{const d=await IDB.open();await new Promise((res,rej)=>{const t=d.transaction("kv","readwrite");t.objectStore("kv").put(v,k);t.oncomplete=()=>res();t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)})}catch(e){console.warn(e)}}
};
let memCars=null,memLeads=null,memIn=false;
const LocalAPI={
  mode:"local",
  async _cars(){if(!memCars){const s=await IDB.get("cars");memCars=Array.isArray(s)?s:seedList()}return memCars},
  async _leads(){if(!memLeads){const s=await IDB.get("leads");memLeads=Array.isArray(s)?s:[]}return memLeads},
  async list(){return (await this._cars()).map(c=>prep({...c})).sort((a,b)=>b.id-a.id)},
  async create(c){const all=await this._cars();all.unshift({...strip(c),id:Math.max(2000,...all.map(x=>x.id))+1,added:c.added||Date.now()});await IDB.set("cars",all)},
  async createMany(list){for(const c of list)await this.create(c)},
  async update(c){const all=await this._cars(),i=all.findIndex(x=>x.id===c.id);if(i>-1)all[i]=strip({...c});await IDB.set("cars",all)},
  async remove(c){memCars=(await this._cars()).filter(x=>x.id!==c.id);await IDB.set("cars",memCars)},
  async removePhotos(){},
  async upload(blob){const d=await blobToDataURL(blob);if(!d)throw new Error("Fotoğraf okunamadı.");return d},
  async login(email,pass){if(pass!==S.demoPassword)throw new Error("Şifre hatalı.");memIn=true;try{sessionStorage.setItem("galeriAdmin","1")}catch(e){}},
  async logout(){memIn=false;try{sessionStorage.removeItem("galeriAdmin")}catch(e){}},
  async session(){if(memIn)return true;try{return sessionStorage.getItem("galeriAdmin")==="1"}catch(e){return false}},
  async addLead(l){const all=await this._leads();all.unshift({...l,id:Date.now(),created_at:new Date().toISOString(),done:false});await IDB.set("leads",all)},
  async leads(){return [...(await this._leads())]},
  async leadUpdate(id,done){const l=(await this._leads()).find(x=>x.id===id);if(l)l.done=done;await IDB.set("leads",memLeads)},
  async leadDelete(id){memLeads=(await this._leads()).filter(x=>x.id!==id);await IDB.set("leads",memLeads)},
  async reset(){memCars=seedList();await IDB.set("cars",memCars)}
};
const API=sb?DbAPI:LocalAPI;

/* ======================= SİTE BİLGİLERİ ======================= */
function bindSite(){
  document.querySelectorAll("[data-site]").forEach(el=>{const v=S[el.dataset.site];if(v!=null)el.textContent=v});
  document.querySelectorAll("[data-tel]").forEach(a=>a.href=telHref(S.phone));
  document.querySelectorAll("[data-mail]").forEach(a=>a.href="mailto:"+S.email);
  document.querySelectorAll("[data-wa]").forEach(a=>a.href=wa(S.whatsapp||S.phone,a.dataset.wa||""));
  document.querySelectorAll("[data-maps]").forEach(a=>a.href=S.mapsUrl||"#iletisim");
  document.querySelectorAll("[data-ig]").forEach(a=>{if(S.instagram)a.href=S.instagram;else a.hidden=true});
  document.querySelectorAll("[data-years]").forEach(el=>{if(+S.founded>0){el.textContent=new Date().getFullYear()-S.founded}else if(el.parentElement){el.parentElement.hidden=true}});
  document.querySelectorAll("[data-demo]").forEach(el=>el.hidden=!S.demoNotice);
  $("#yearNow").textContent=new Date().getFullYear();
  document.title=`${S.name} | ${S.seoTitle||"İkinci el araç"}`;
  $("#team").innerHTML=AGENTS.map(a=>`<div class="person"><div class="avatar" style="background:${esc(a.c||"#24364F")}">${esc(initials(a.ad))}</div><div><b>${esc(a.ad)}</b><span>${esc(a.rol)}</span><a class="ph-n num" href="${telHref(a.tel)}">${esc(a.tel)}</a></div></div>`).join("");
  for(let y=new Date().getFullYear();y>=2000;y--)$("#sYil").add(new Option(y));
  $("#sYil").value=String(new Date().getFullYear()-6);
  $("#mapBox").innerHTML=`<svg class="img" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Galeri konumunu gösteren temsili harita">
<rect width="600" height="340" fill="#E9EBE7"/>
<g fill="#D8DCD6">${[[30,30,110,70],[170,20,120,90],[330,30,120,60],[480,20,100,80],[30,140,100,60],[360,120,100,60],[480,130,110,50],[40,270,140,60],[420,270,160,60]].map(r=>`<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="6"/>`).join("")}</g>
<rect x="165" y="130" width="155" height="70" rx="8" fill="#F3DCDB"/>
<g stroke="#fff" stroke-width="12"><line x1="0" y1="112" x2="600" y2="104"/><line x1="148" y1="0" x2="160" y2="340"/><line x1="335" y1="0" x2="340" y2="340"/></g>
<path d="M0 232 L600 240" stroke="#F4C66A" stroke-width="18"/>
<circle cx="250" cy="150" r="30" fill="#1D4FB8" opacity=".16"/><path d="M250 154 l-15 -21 a17 17 0 1 1 30 0z" fill="#1D4FB8"/><circle cx="250" cy="122" r="6" fill="#fff"/>
<rect x="272" y="100" width="${Math.max(120,S.name.length*8.6+26)}" height="32" rx="8" fill="#fff"/><text x="284" y="121" font-family="Manrope,sans-serif" font-size="13" font-weight="700" fill="#11161C">${esc(S.name)}</text></svg>`;
}

/* ======================= ANA SAYFA ======================= */
let markalar=[];
function refreshHome(){
  const live=C.filter(c=>!c.sold),feat=live[0];
  const hv=feat||prep(JSON.parse(JSON.stringify(DEFAULTS[0])));
  $("#heroBg").innerHTML=hv.photos.length?`<img class="img" src="${esc(hv.photos[0])}" alt="${esc(title(hv))}">`:`<svg class="img" viewBox="0 0 1400 600" preserveAspectRatio="xMaxYMid slice" role="img" aria-label="Showroomda bir araç">${showroom("hero",hv,{w:1400,h:600,gy:520,cx:990,tw:700,dark:true})}</svg>`;
  if(feat){$("#heroBadge").hidden=false;$("#heroBadge").href=`#arac-${feat.id}`;$("#heroBadge").innerHTML=`<span>Haftanın aracı</span><b>${esc(title(feat))}</b><span class="num">${tl(feat.fiyat)} · ${fmt(feat.km)} km</span>`}
  else $("#heroBadge").hidden=true;
  $("#stockNote").textContent=LOADED?`Stokta ${live.length} araç · tamamı ekspertizli`:"";
  markalar=[...new Set(C.map(c=>c.marka))].sort((a,b)=>a.localeCompare(b,"tr"));
  const sel=$("#fMarka"),cur=sel.value;sel.length=1;markalar.forEach(m=>sel.add(new Option(m)));sel.value=markalar.includes(cur)?cur:"Tümü";
}
function brandChips(){
  if(!C.length){$("#brands").innerHTML="";return}
  const cur=$("#fMarka").value;
  $("#brands").innerHTML=[["Tümü",C.length],...markalar.map(m=>[m,C.filter(c=>c.marka===m).length])].map(([m,n])=>`<button type="button" class="brand" data-brand="${esc(m)}" aria-pressed="${cur===m}">${m==="Tümü"?"Tüm markalar":esc(m)}<span>${n}</span></button>`).join("");
}
$("#brands").onclick=e=>{const b=e.target.closest("[data-brand]");if(!b)return;$("#fMarka").value=b.dataset.brand;render()};

const favs=new Set();try{JSON.parse(localStorage.getItem("galeriFav")||"[]").forEach(x=>favs.add(x))}catch(e){}
const saveFav=()=>{try{localStorage.setItem("galeriFav",JSON.stringify([...favs]))}catch(e){}};

["fMarka","fKasa","fYakit","fVites","sort"].forEach(id=>$("#"+id).onchange=render);
["fMax","fKm"].forEach(id=>$("#"+id).oninput=render);
$("#search").onsubmit=e=>{e.preventDefault();render();go("araclar")};
$("#clear").onclick=()=>{["fMarka","fKasa","fYakit","fVites"].forEach(id=>$("#"+id).value="Tümü");$("#fMax").value="";$("#fKm").value="";render()};
document.addEventListener("click",e=>{const q=e.target.closest("[data-quick]");if(!q)return;e.preventDefault();const[f,v]=q.dataset.quick.split("|");$("#clear").click();$("#f"+f).value=v;render();if($("#home").hidden)location.hash="araclar";else go("araclar")});

function card(c){
  return `<a class="card ${c.sold?"sold":""}" href="#arac-${c.id}">
    <div class="ph">${scene(c,c.sc[0])}
      <div class="pills">${c.sold?'<span class="pill sold">Satıldı</span>':`${c.hatasiz?'<span class="pill ok">Hatasız</span>':""}${c.gun<=3?'<span class="pill new">Yeni geldi</span>':""}`}<span class="pill">${esc(c.kasa)}</span></div>
      <span class="pcount">${I.cam}${c.sc.length}</span>
    </div>
    <div class="cbody">
      <div class="cprice num">${tl(c.fiyat)}</div>
      <div class="ctitle">${esc(title(c))}</div>
      <div class="csub">${esc(c.paket)}</div>
      <div class="cspec"><span><small>Yıl</small><b>${c.yil}</b></span><span><small>KM</small><b>${fmt(c.km)}</b></span><span><small>Yakıt</small><b>${esc(c.yakit.replace("Benzin & LPG","LPG"))}</b></span><span><small>Vites</small><b>${esc(c.vites)}</b></span></div>
    </div>
    <div class="cfoot"><span>İlan no #${c.id}</span><span>${c.tramer?"Tramer "+tl(c.tramer):"Tramer kaydı yok"}</span></div>
    <button class="fav" type="button" data-fav="${c.id}" aria-label="Favorilere ekle" aria-pressed="${favs.has(c.id)}">${I.heart}</button>
  </a>`;
}
function render(){
  if(!LOADED){$("#grid").innerHTML=`<div class="loading">Araçlar yükleniyor…</div>`;$("#count").textContent="";return}
  if(!C.length){$("#grid").innerHTML=`<div class="empty">${LOADERR?`Araçlar şu an yüklenemedi. Sayfayı yenileyin ya da bizi arayın.`:`Yeni araçlarımız çok yakında burada. Stoktaki araçları sormak için <a href="${wa(S.whatsapp||S.phone,"Merhaba, stoktaki araçları öğrenmek istiyorum.")}" target="_blank" rel="noopener">WhatsApp'tan yazın</a>.`}</div>`;$("#count").textContent="";brandChips();return}
  const m=$("#fMarka").value,k=$("#fKasa").value,y=$("#fYakit").value,v=$("#fVites").value,mx=+$("#fMax").value||Infinity,km=+$("#fKm").value||Infinity,sort=$("#sort").value;
  const r=C.filter(c=>(m==="Tümü"||c.marka===m)&&(k==="Tümü"||c.kasa===k)&&(y==="Tümü"||c.yakit===y)&&(v==="Tümü"||c.vites===v)&&c.fiyat<=mx&&c.km<=km);
  const so={asc:(a,b)=>a.fiyat-b.fiyat,desc:(a,b)=>b.fiyat-a.fiyat,km:(a,b)=>a.km-b.km,yil:(a,b)=>b.yil-a.yil,new:(a,b)=>a.gun-b.gun||b.id-a.id};
  r.sort((a,b)=>(a.sold-b.sold)||so[sort](a,b));
  $("#count").textContent=`${r.length} araç listeleniyor`;
  $("#grid").innerHTML=r.length?r.map(card).join(""):`<div class="empty">Bu kriterlere uygun araç şu an stokta yok. Bizi arayın, aradığınız aracı sizin için bulalım.</div>`;
  brandChips();
}
document.addEventListener("click",e=>{const f=e.target.closest("[data-fav]");if(!f)return;e.preventDefault();e.stopPropagation();const id=+f.dataset.fav;favs.has(id)?favs.delete(id):favs.add(id);saveFav();document.querySelectorAll(`[data-fav="${id}"]`).forEach(b=>b.setAttribute("aria-pressed",favs.has(id)))},true);

/* Araç alım formu */
$("#sellForm").onsubmit=async e=>{
  e.preventDefault();const f=e.target,btn=f.querySelector("button[type=submit]");
  const d={marka:clean($("#sMarka").value),model:clean($("#sModel").value),yil:$("#sYil").value,km:clean($("#sKm").value)};
  const name=clean($("#sAd").value),phone=clean($("#sTel").value);
  if(digits(phone).length<10){toast("Telefon numarasını kontrol edin.");$("#sTel").focus();return}
  btn.disabled=true;btn.textContent="Gönderiliyor…";
  try{
    await API.addLead({type:"Araç alım teklifi",name,phone,details:d});
    btn.textContent="Talebiniz alındı ✓";
    $("#sOk").innerHTML=`Teşekkürler ${esc(name)}, en kısa sürede sizi arayacağız. Beklemek istemezseniz <a href="${wa(S.whatsapp||S.phone,`Merhaba, aracım için teklif almak istiyorum: ${d.yil} ${d.marka} ${d.model}${d.km?`, ${d.km} km`:""}.`)}" target="_blank" rel="noopener">WhatsApp'tan da yazabilirsiniz</a>.`;
    $("#sOk").hidden=false;
  }catch(err){btn.disabled=false;btn.textContent="Ön teklif iste";toast(errMsg(err))}
};

/* ======================= ARAÇ DETAY ======================= */
function detail(c){
  const a=AGENTS[c.ag]||AGENTS[0]||{ad:S.name,rol:"",tel:S.phone,c:"#24364F"};
  const rows=[["İlan no",`#${c.id}`],["İlan tarihi",dateOf(c.gun)],["Marka",c.marka],["Model",c.model],["Paket",c.paket],["Model yılı",c.yil],["Kilometre",fmt(c.km)+" km"],["Yakıt",c.yakit],["Vites",c.vites],["Kasa tipi",c.kasa],["Motor",c.motor],["Çekiş",c.cekis],["Renk",c.renk],["Ağır hasar kaydı","Yok"],["Takasa uygun","Evet"],["Kimden","Galeriden"]];
  const ex=Object.entries(c.exp);
  const sim=C.filter(x=>x.id!==c.id&&!x.sold&&(x.kasa===c.kasa||Math.abs(x.fiyat-c.fiyat)<500000)).slice(0,3);
  const msg=`Merhaba, #${c.id} numaralı ${title(c)} ilanı hakkında bilgi almak istiyorum.`;
  $("#detail").innerHTML=`<div class="wrap">
    <nav class="crumbs" aria-label="Sayfa yolu"><a href="#anasayfa">Ana sayfa</a><span>/</span><a href="#araclar">${esc(c.marka)}</a><span>/</span><span>${esc(c.model)}</span></nav>
    <div class="dhead">
      <div><span class="eyebrow">İlan no #${c.id} · ${dateOf(c.gun)}</span><h1 style="margin-top:8px">${esc(title(c))}</h1><div class="muted" style="margin-top:6px;font-weight:600">${esc(c.paket)}</div></div>
      <div class="dprice num">${c.sold?'<span style="color:var(--muted)">Satıldı</span>':tl(c.fiyat)}</div>
    </div>
    <div class="gallery"><div class="gmain" id="gMain"></div>
      <div class="gthumbs">${c.sc.slice(0,4).map((k,i)=>`<button type="button" data-g="${i}" aria-current="${i===0}" aria-label="${labelOf(k)}">${scene(c,k)}<span class="lbl">${labelOf(k)}</span></button>`).join("")}</div></div>
    <div class="dgrid">
      <div>
        <div class="panel">
          <div class="keyrow">${[["Model yılı",c.yil],["Kilometre",fmt(c.km)],["Yakıt",c.yakit],["Vites",c.vites]].map(([k,v])=>`<div><span>${k}</span><b class="num">${esc(v)}</b></div>`).join("")}</div>
          <h2>Açıklama</h2><div class="desc">${c.acik.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
        </div>
        <div class="panel"><h2>Ekspertiz ve hasar kaydı</h2>
          <div class="exp">
            <div><div class="diag">${scene(c,"ekspertiz")}</div></div>
            <div style="display:grid;gap:14px">
              <div class="tramer ${c.tramer?"some":"zero"}"><span class="note" style="color:inherit;font-weight:600">Tramer kaydı</span><b class="num">${c.tramer?tl(c.tramer):"Kayıt yok"}</b></div>
              <dl class="exlist" style="margin:0">${ex.length?ex.map(([k,s])=>`<div><dt>${PARTS[k]}</dt><dd>${ST[s][0]}</dd></div>`).join(""):`<div><dt>Boyalı / değişen parça</dt><dd style="color:var(--ok)">Yok, hatasız</dd></div>`}
                <div><dt>Diğer parçalar</dt><dd>Orijinal</dd></div></dl>
              <p class="note">Bağımsız ekspertiz firmasının raporu galeride incelenebilir. Raporla uyuşmayan bir durum çıkarsa aracı geri alıyoruz.</p>
            </div>
          </div>
        </div>
        <div class="panel"><h2>Araç bilgileri</h2><dl class="ftable">${rows.map(([k,v])=>`<div><dt>${k}</dt><dd class="num">${esc(v)}</dd></div>`).join("")}</dl></div>
        <div class="panel"><h2>Donanım</h2><div class="chips">${c.don.map(x=>`<span>${I.check}${esc(x)}</span>`).join("")}</div></div>
      </div>
      <aside class="side">
        <div class="panel">
          <div class="agent"><div class="avatar" style="background:${esc(a.c||"#24364F")}">${esc(initials(a.ad))}</div><div><b>${esc(a.ad)}</b><span>${esc(a.rol)}</span></div></div>
          <div class="sidebtns">
            <a class="btn btn-wa" target="_blank" rel="noopener" href="${wa(a.tel,msg)}">WhatsApp'tan sor</a>
            <a class="btn btn-ghost num" href="${telHref(a.tel)}">Ara: ${esc(a.tel)}</a>
          </div>
        </div>
        ${c.sold?"":`<div class="panel"><h2>Test sürüşü</h2>
          <form class="mini" id="randevu">
            <div class="field"><label for="rAd">Ad soyad</label><input id="rAd" required maxlength="80" autocomplete="name"></div>
            <div class="field"><label for="rTel">Telefon</label><input id="rTel" required maxlength="20" inputmode="tel" autocomplete="tel" placeholder="05xx xxx xx xx"></div>
            <div class="field"><label for="rGun">Uygun gün</label><select id="rGun">${[1,2,3,4,5,6].map(i=>{const d=new Date(today);d.setDate(d.getDate()+i);return `<option>${d.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</option>`}).join("")}</select></div>
            <label class="consent"><input type="checkbox" id="rKvkk" required><span><a href="#kvkk" target="_blank" rel="noopener">KVKK aydınlatma metnini</a> okudum.</span></label>
            <button class="btn btn-primary" type="submit">Randevu talep et</button>
            <p class="okline" id="rOk" hidden></p>
          </form>
        </div>
        <div class="panel"><h2>Taşıt kredisi</h2><div class="mini">
          <div class="field"><label for="kPes">Peşinat (₺)</label><input id="kPes" type="number" value="${Math.round(c.fiyat*.5/10000)*10000}" min="0" step="10000"></div>
          <div class="field"><label for="kVade">Vade (ay)</label><select id="kVade"><option>12</option><option selected>24</option><option>36</option></select></div>
          <div class="field"><label for="kFaiz">Aylık faiz (%)</label><input id="kFaiz" type="number" value="3.29" step="0.01" min="0"></div>
          <span class="note">Aylık taksit</span><div class="big num" id="kTak">—</div>
          <div class="r"><span class="muted">Kredi tutarı</span><b class="num" id="kKre">—</b></div>
          <div class="r"><span class="muted">Toplam geri ödeme</span><b class="num" id="kTop">—</b></div>
          <p class="note">Faiz oranı örnektir. Taşıt kredisinde vade ve kredi oranı, aracın fiyatına göre yasal sınırlara tabidir.</p></div></div>`}
      </aside>
    </div>
    ${sim.length?`<section style="padding-block:56px 0"><div class="sec-head"><div><div class="eyebrow">Benzer araçlar</div><h2>Bunlara da göz atın</h2></div></div><div class="grid">${sim.map(card).join("")}</div></section>`:""}
  </div>`;
  let gi=0;const gm=$("#gMain");
  const show=i=>{gi=(i+c.sc.length)%c.sc.length;gm.innerHTML=scene(c,c.sc[gi])+`<button class="gnav p" type="button" aria-label="Önceki fotoğraf">${I.l}</button><button class="gnav n" type="button" aria-label="Sonraki fotoğraf">${I.r}</button><span class="gcount num">${gi+1} / ${c.sc.length} · ${labelOf(c.sc[gi])}</span>`;
    gm.querySelector(".p").onclick=()=>show(gi-1);gm.querySelector(".n").onclick=()=>show(gi+1);
    document.querySelectorAll("[data-g]").forEach(b=>b.setAttribute("aria-current",+b.dataset.g===gi))};
  document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>show(+b.dataset.g));
  show(0);
  if(c.sold)return;
  $("#randevu").onsubmit=async e=>{
    e.preventDefault();const btn=e.target.querySelector("button[type=submit]");
    const name=clean($("#rAd").value),phone=clean($("#rTel").value),gun=$("#rGun").value;
    if(digits(phone).length<10){toast("Telefon numarasını kontrol edin.");$("#rTel").focus();return}
    btn.disabled=true;btn.textContent="Gönderiliyor…";
    try{
      await API.addLead({type:"Test sürüşü",name,phone,details:{arac:`#${c.id} ${title(c)}`,gun}});
      btn.textContent="Talep alındı ✓";
      $("#rOk").innerHTML=`Talebiniz alındı, randevuyu onaylamak için sizi arayacağız. İsterseniz <a href="${wa(a.tel,`${msg} ${gun} günü test sürüşü yapmak istiyorum.`)}" target="_blank" rel="noopener">WhatsApp'tan da yazabilirsiniz</a>.`;
      $("#rOk").hidden=false;
    }catch(err){btn.disabled=false;btn.textContent="Randevu talep et";toast(errMsg(err))}
  };
  const calc=()=>{const P=Math.min(c.fiyat,Math.max(0,+$("#kPes").value||0)),n=+$("#kVade").value,r=(+$("#kFaiz").value||0)/100,K=c.fiyat-P,t=r?K*r/(1-Math.pow(1+r,-n)):K/n;$("#kTak").textContent=tl(t);$("#kKre").textContent=tl(K);$("#kTop").textContent=tl(t*n)};
  ["kPes","kFaiz"].forEach(id=>$("#"+id).oninput=calc);$("#kVade").onchange=calc;calc();
}

/* ======================= KVKK SAYFASI ======================= */
function kvkkHTML(){return `<div class="wrap"><article class="prose">
  <div class="eyebrow">Kişisel verilerin korunması</div><h1>KVKK Aydınlatma Metni</h1>
  ${S.demoNotice?`<p class="banner">Bu metin örnek bir taslaktır. Gerçek bir işletmede yayına almadan önce bir hukukçuya kontrol ettirilmelidir.</p>`:""}
  <p>${esc(S.legalName||S.name)} olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan şekilde işliyoruz.</p>
  <h2>Hangi verileri işliyoruz?</h2><p>Sitemizdeki formlar aracılığıyla ilettiğiniz ad soyad, telefon numarası, araç bilgileri (marka, model, model yılı, kilometre) ve randevu tercihleriniz.</p>
  <h2>Hangi amaçla işliyoruz?</h2><p>Araç alım teklifi ve test sürüşü taleplerinize dönüş yapmak, randevu oluşturmak ve sizinle iletişim kurmak.</p>
  <h2>Verileriniz nerede saklanıyor?</h2><p>Verileriniz, sitemizin altyapı hizmetini aldığımız barındırma sağlayıcısının sunucularında saklanır. Bu sunucular yurt dışında bulunabilir. Verileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz.</p>
  <h2>Ne kadar süre saklıyoruz?</h2><p>Talebiniz sonuçlandıktan sonra, mevzuatın öngördüğü süreler saklı kalmak kaydıyla en geç 1 yıl içinde silinir.</p>
  <h2>Haklarınız</h2><p>Kanun'un 11. maddesi uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini ya da silinmesini isteme ve diğer haklarınızı kullanmak için <a href="mailto:${esc(S.email)}">${esc(S.email)}</a> adresine yazabilirsiniz.</p>
  <p style="margin-top:28px"><a class="btn btn-ghost" href="#anasayfa">← Ana sayfaya dön</a></p>
</article></div>`}

/* ======================= YÖNETİM PANELİ ======================= */
const ADM={tab:"cars",edit:null,photos:[],q:"",arm:null,authed:null,busy:false,leads:null};
async function admin(){
  const el=$("#admin");
  if(ADM.authed===null){el.innerHTML=`<div class="wrap"><div class="loading">Yükleniyor…</div></div>`;ADM.authed=await API.session().catch(()=>false)}
  if(!ADM.authed)return loginView(el);
  if(ADM.leads===null){ADM.leads=await API.leads().catch(e=>{toast(errMsg(e));return []})}
  if($("#admin").hidden)return;
  if(ADM.tab==="form")return formView(el);
  if(ADM.tab==="leads")return leadsView(el);
  return listView(el);
}
function loginView(el){
  const db=API.mode==="db";
  el.innerHTML=`<div class="wrap"><form class="login panel" id="loginF">
    <div class="eyebrow">Galerici girişi</div><h1>Yönetim paneli</h1>
    <p class="muted" style="margin:0">Araç eklemek, düzenlemek ve gelen talepleri görmek için giriş yapın.</p>
    ${db?`<div class="field"><label for="lMail">E-posta</label><input id="lMail" type="email" required autocomplete="username"></div>`:""}
    <div class="field"><label for="lPass">Şifre</label><input id="lPass" type="password" autocomplete="current-password" required></div>
    <p class="err" id="lErr" hidden></p>
    <button class="btn btn-primary" type="submit">Giriş yap</button>
    ${db?"":`<p class="note">Demo modu: veritabanı henüz bağlanmadı. Şifre: <span class="copyable">${esc(S.demoPassword)}</span></p>`}
  </form></div>`;
  $("#loginF").onsubmit=async e=>{
    e.preventDefault();const b=e.target.querySelector("button");b.disabled=true;b.textContent="Giriş yapılıyor…";
    try{await API.login(db?$("#lMail").value.trim():"",$("#lPass").value);ADM.authed=true;ADM.leads=null;admin()}
    catch(err){$("#lErr").textContent=errMsg(err);$("#lErr").hidden=false;b.disabled=false;b.textContent="Giriş yap"}
  };
}
function admTop(){
  const n=(ADM.leads||[]).filter(l=>!l.done).length;
  return `${API.mode==="local"?`<div class="banner"><b>Demo modu.</b> Veritabanı bağlı değil, değişiklikler yalnızca bu tarayıcıda saklanır. Kurulum rehberindeki adımları tamamlayınca herkes aynı araçları görür.</div>`:""}
  <div class="adm-top"><div><div class="eyebrow">${esc(S.name)}</div><h1>Yönetim paneli</h1></div>
    <div class="acts"><button class="btn btn-primary" type="button" data-nav="new">+ Yeni araç ekle</button><a class="btn btn-ghost" href="#araclar">Siteyi görüntüle</a><button class="btn btn-ghost" type="button" data-nav="out">Çıkış yap</button></div></div>
  <div class="tabs" role="tablist"><button class="tab" role="tab" type="button" data-nav="cars" aria-selected="${ADM.tab==="cars"}">Araçlar</button><button class="tab" role="tab" type="button" data-nav="leads" aria-selected="${ADM.tab==="leads"}">Gelen talepler${n?`<span class="n">${n}</span>`:""}</button></div>`;
}
function wireTop(el){el.querySelectorAll("[data-nav]").forEach(b=>b.onclick=async()=>{
  const n=b.dataset.nav;ADM.arm=null;
  if(n==="new"){Object.assign(ADM,{tab:"form",edit:null,photos:[]});admin();scrollTo(0,0)}
  else if(n==="out"){await API.logout().catch(()=>{});Object.assign(ADM,{authed:false,leads:null,tab:"cars"});location.hash="anasayfa"}
  else if(n==="leads"){ADM.tab="leads";try{ADM.leads=await API.leads()}catch(e){toast(errMsg(e))}admin()}
  else{ADM.tab=n;admin()}
})}
async function act(fn,msg){
  if(ADM.busy)return;ADM.busy=true;
  try{await fn();C=await API.list();refreshHome();render();toast(msg)}catch(e){toast(errMsg(e))}
  finally{ADM.busy=false;admin()}
}
function listView(el){
  const live=C.filter(c=>!c.sold),q=ADM.q.toLocaleLowerCase("tr");
  const list=C.filter(c=>!q||`${c.marka} ${c.model} ${c.paket} ${c.id}`.toLocaleLowerCase("tr").includes(q)).sort((a,b)=>(a.sold-b.sold)||(a.gun-b.gun)||(b.id-a.id));
  const thumb=c=>c.photos.length?`<img src="${esc(c.photos[0])}" alt="">`:scene(c,"vitrin");
  const emptyDb=API.mode==="db"&&!C.length;
  el.innerHTML=`<div class="wrap adm">${admTop()}
    <div class="kpis">
      <div class="kpi"><span>Yayındaki araç</span><b class="num">${live.length}</b></div>
      <div class="kpi"><span>Satıldı</span><b class="num">${C.length-live.length}</b></div>
      <div class="kpi"><span>Stok değeri</span><b class="num">${tl(live.reduce((s,c)=>s+c.fiyat,0))}</b></div>
      <div class="kpi"><span>Bekleyen talep</span><b class="num">${(ADM.leads||[]).filter(l=>!l.done).length}</b></div>
    </div>
    ${C.length?`<div class="field" style="margin-bottom:14px"><label for="aQ">Araç ara</label><input id="aQ" placeholder="Marka, model ya da ilan no" value="${esc(ADM.q)}"></div>`:""}
    <div class="rows">${list.length?list.map(c=>`<div class="row ${c.sold?"sold":""}">
      <a class="th" href="#arac-${c.id}" aria-label="${esc(title(c))} ilanını sitede aç">${thumb(c)}</a>
      <div style="min-width:0"><b>${esc(title(c))}</b><div class="muted" style="font-size:14px">${esc(c.paket)} · ${fmt(c.km)} km · #${c.id}</div><div class="cprice num" style="font-size:19px">${tl(c.fiyat)}</div></div>
      <span class="chip ${c.sold?"off":"on"}">${c.sold?"Satıldı":"Yayında"}</span>
      <div class="acts"><button type="button" class="sbtn" data-a="edit" data-id="${c.id}">Düzenle</button><button type="button" class="sbtn" data-a="sold" data-id="${c.id}">${c.sold?"Yeniden yayına al":"Satıldı olarak işaretle"}</button><button type="button" class="sbtn danger ${ADM.arm===c.id?"armed":""}" data-a="del" data-id="${c.id}">${ADM.arm===c.id?"Silmeyi onayla":"Sil"}</button></div>
    </div>`).join(""):`<div class="empty">${C.length?"Aramanızla eşleşen araç yok.":`Henüz araç yok. "Yeni araç ekle" ile ilk aracınızı ekleyin.${emptyDb?`<div style="margin-top:14px"><button type="button" class="btn btn-ghost" data-a="seed">Örnek 10 aracı ekle</button><p class="note" style="margin-top:8px">Siteyi denemek için. Sonra tek tek silebilirsiniz.</p></div>`:""}`}</div>`}</div>
    <div class="adm-foot"><p class="note">${API.mode==="db"?"Değişiklikler kaydedildiği anda sitede herkes tarafından görülür.":"Demo modunda değişiklikler yalnızca bu tarayıcıda saklanır."}</p>
      ${API.mode==="local"?`<button type="button" class="sbtn ${ADM.arm==="reset"?"danger armed":""}" data-a="reset">${ADM.arm==="reset"?"Tüm değişiklikler silinecek, onaylıyorum":"Örnek araçlara geri dön"}</button>`:""}</div>
  </div>`;
  wireTop(el);
  const qi=$("#aQ");if(qi)qi.oninput=e=>{ADM.q=e.target.value;const p=e.target.selectionStart;listView(el);const i=$("#aQ");i.focus();i.setSelectionRange(p,p)};
  el.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{
    const a=b.dataset.a,id=+b.dataset.id,c=C.find(x=>x.id===id);
    if(a==="edit"){Object.assign(ADM,{tab:"form",edit:id,photos:c.photos.map(u=>({src:u})),arm:null});admin();scrollTo(0,0);return}
    if(a==="sold"){ADM.arm=null;b.disabled=true;return act(()=>API.update({...c,sold:!c.sold}),c.sold?"Araç yeniden yayında":"Araç satıldı olarak işaretlendi")}
    if(a==="del"){if(ADM.arm!==id){ADM.arm=id;return listView(el)}ADM.arm=null;b.disabled=true;b.textContent="Siliniyor…";return act(()=>API.remove(c),"Araç silindi")}
    if(a==="seed"){b.disabled=true;b.textContent="Ekleniyor…";return act(()=>API.createMany(seedList()),"Örnek araçlar eklendi")}
    if(a==="reset"){if(ADM.arm!=="reset"){ADM.arm="reset";return listView(el)}ADM.arm=null;return act(()=>API.reset(),"Örnek araçlar geri yüklendi")}
  });
}
function leadsView(el){
  const L=ADM.leads||[];
  const LBL={marka:"Marka",model:"Model",yil:"Yıl",km:"Km",arac:"Araç",gun:"Gün"};
  const when=d=>new Date(d).toLocaleString("tr-TR",{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});
  el.innerHTML=`<div class="wrap adm">${admTop()}
    <div class="rows">${L.length?L.map(l=>`<div class="lrow ${l.done?"done":""}">
      <div><span class="chip ${l.done?"off":"on"}">${l.done?"Dönüş yapıldı":"Yeni"}</span><div class="note" style="margin-top:6px">${when(l.created_at)}</div></div>
      <div style="min-width:0"><b>${esc(l.type)}</b> · ${esc(l.name)}
        <div style="margin:2px 0"><a class="num" href="${telHref(l.phone)}">${esc(l.phone)}</a> · <a href="${wa(l.phone,`Merhaba ${l.name}, ${S.name} olarak talebiniz için yazıyoruz.`)}" target="_blank" rel="noopener">WhatsApp</a></div>
        <div class="muted" style="font-size:14px">${Object.entries(l.details||{}).filter(([,v])=>v).map(([k,v])=>`${esc(LBL[k]||k)}: ${esc(v)}`).join(" · ")}</div></div>
      <div class="acts"><button type="button" class="sbtn" data-l="done" data-id="${l.id}">${l.done?"Yeni olarak işaretle":"Dönüş yapıldı"}</button><button type="button" class="sbtn danger ${ADM.arm==="l"+l.id?"armed":""}" data-l="del" data-id="${l.id}">${ADM.arm==="l"+l.id?"Silmeyi onayla":"Sil"}</button></div>
    </div>`).join(""):`<div class="empty">Henüz talep yok. Sitedeki "Aracınızı alalım" ve test sürüşü formlarından gelen talepler burada görünür.</div>`}</div>
    <div class="adm-foot"><p class="note">Yeni talepleri görmek için yenileyin.</p><button type="button" class="sbtn" id="lRef">Yenile</button></div>
  </div>`;
  wireTop(el);
  const after=async(fn,msg)=>{try{await fn();ADM.leads=await API.leads();if(msg)toast(msg)}catch(e){toast(errMsg(e))}admin()};
  $("#lRef").onclick=()=>after(async()=>{},"Talepler güncellendi");
  el.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{
    const id=+b.dataset.id,l=L.find(x=>x.id===id);
    if(b.dataset.l==="done"){ADM.arm=null;b.disabled=true;return after(()=>API.leadUpdate(id,!l.done))}
    if(ADM.arm!=="l"+id){ADM.arm="l"+id;return leadsView(el)}
    ADM.arm=null;b.disabled=true;after(()=>API.leadDelete(id),"Talep silindi");
  });
}
function formView(el){
  const c=ADM.edit?C.find(x=>x.id===ADM.edit):null;
  const v=c||{marka:"",model:"",paket:"",yil:new Date().getFullYear()-4,km:"",fiyat:"",yakit:"Benzin",vites:"Manuel",kasa:"Sedan",renk:"Beyaz",motor:"",cekis:"Önden çekiş",tramer:0,exp:{},don:[],acik:[],ag:0};
  const opt=(arr,sel)=>arr.map(o=>`<option ${String(o)===String(sel)?"selected":""}>${esc(o)}</option>`).join("");
  const F=(label,id,html,cls)=>`<div class="field ${cls||""}"><label for="${id}">${label}</label>${html}</div>`;
  el.innerHTML=`<div class="wrap adm"><form id="carF" novalidate>
    <div class="adm-top"><div><div class="eyebrow">${c?"İlan no #"+c.id:"Yeni ilan"}</div><h1>${c?"Aracı düzenle":"Yeni araç ekle"}</h1></div><button class="btn btn-ghost" type="button" id="fBack">← Araç listesine dön</button></div>
    <div class="fsec"><h2>Fotoğraflar</h2>
      <label class="drop" for="e_ph"><b>Fotoğraf seçin</b><span class="muted">Telefonunuzdan ya da bilgisayarınızdan en fazla 12 fotoğraf. İlk fotoğraf kapak olur.</span><input id="e_ph" type="file" accept="image/*" multiple></label>
      <div class="phgrid" id="phGrid"></div>
      <p class="note">Fotoğraf yüklemezseniz ilan, seçtiğiniz kasa tipi ve renge göre hazır bir görselle yayınlanır. Fotoğraflar yüklenirken otomatik olarak küçültülür.</p>
    </div>
    <div class="fsec"><h2>Araç bilgileri</h2><div class="fgrid">
      ${F("Marka *","e_mk",`<input id="e_mk" required value="${esc(v.marka)}" placeholder="Örn. Renault" list="e_mkl"><datalist id="e_mkl">${markalar.map(m=>`<option value="${esc(m)}">`).join("")}</datalist>`)}
      ${F("Model *","e_md",`<input id="e_md" required value="${esc(v.model)}" placeholder="Örn. Clio">`)}
      ${F("Paket / motor seçeneği","e_pk",`<input id="e_pk" value="${esc(v.paket==="—"?"":v.paket)}" placeholder="Örn. 1.0 TCe Touch">`)}
      ${F("Model yılı *","e_yl",`<input id="e_yl" type="number" inputmode="numeric" required min="1980" max="${new Date().getFullYear()+1}" value="${esc(v.yil)}">`)}
      ${F("Kilometre *","e_km",`<input id="e_km" type="number" inputmode="numeric" required min="0" value="${esc(v.km)}" placeholder="Örn. 85000">`)}
      ${F("Fiyat (₺) *","e_fy",`<input id="e_fy" type="number" inputmode="numeric" required min="1" value="${esc(v.fiyat)}" placeholder="Örn. 1250000">`)}
      ${F("Yakıt","e_yk",`<select id="e_yk">${opt(["Benzin","Dizel","Hibrit","Benzin & LPG","Elektrik"],v.yakit)}</select>`)}
      ${F("Vites","e_vt",`<select id="e_vt">${opt(["Manuel","Otomatik"],v.vites)}</select>`)}
      ${F("Kasa tipi","e_ks",`<select id="e_ks">${opt(["Sedan","Hatchback","SUV"],v.kasa)}</select>`)}
      ${F("Renk","e_rk",`<select id="e_rk">${opt(Object.keys(COL),v.renk)}</select>`)}
      ${F("Motor","e_mt",`<input id="e_mt" value="${esc(v.motor==="—"?"":v.motor)}" placeholder="Örn. 1.598 cc · 120 hp">`)}
      ${F("Çekiş","e_ck",`<select id="e_ck">${opt(["Önden çekiş","Arkadan itiş","4x4"],v.cekis)}</select>`)}
      ${F("İlgilenen danışman","e_ag",`<select id="e_ag">${AGENTS.map((a,i)=>`<option value="${i}" ${i===v.ag?"selected":""}>${esc(a.ad)}</option>`).join("")}</select>`,"wide")}
    </div></div>
    <div class="fsec"><h2>Ekspertiz</h2>
      <div class="fgrid">${F("Tramer kaydı (₺)","e_tr",`<input id="e_tr" type="number" inputmode="numeric" min="0" value="${esc(v.tramer||0)}">`)}</div>
      <div class="expgrid">${Object.entries(PARTS).map(([k,n])=>F(n,"x_"+k,`<select id="x_${k}" data-exp>${Object.entries(ST).map(([s,[t]])=>`<option value="${s}" ${(v.exp[k]||"o")===s?"selected":""}>${t}</option>`).join("")}</select>`)).join("")}</div>
    </div>
    <div class="fsec"><h2>Donanım ve açıklama</h2><div class="fgrid">
      ${F("Donanım (her satıra bir özellik)","e_dn",`<textarea id="e_dn" rows="6" placeholder="Geri görüş kamerası&#10;Hız sabitleyici&#10;Park sensörü">${esc(v.don.join("\n"))}</textarea>`,"wide")}
      ${F("Açıklama (paragrafları boş satırla ayırın)","e_ac",`<textarea id="e_ac" rows="6" placeholder="Aracın geçmişi, bakımları ve öne çıkan özellikleri">${esc(v.acik.join("\n\n"))}</textarea>`,"wide")}
    </div></div>
    <p class="err" id="fErr" hidden>Yıldızlı alanları doldurun: marka, model, model yılı, kilometre ve fiyat.</p>
    <div class="savebar"><button class="btn btn-ghost" type="button" id="fCancel">Vazgeç</button><button class="btn btn-primary" type="submit" id="fSave">${c?"Değişiklikleri kaydet":"Kaydet ve yayınla"}</button></div>
  </form></div>`;
  const back=()=>{ADM.photos.forEach(p=>{if(p.blob)URL.revokeObjectURL(p.src)});Object.assign(ADM,{tab:"cars",edit:null,photos:[]});admin();scrollTo(0,0)};
  $("#fBack").onclick=back;$("#fCancel").onclick=back;
  const paintExp=s=>{s.style.borderLeftColor=ST[s.value][1]};
  el.querySelectorAll("[data-exp]").forEach(s=>{paintExp(s);s.onchange=()=>paintExp(s)});
  const renderPh=()=>{
    $("#phGrid").innerHTML=ADM.photos.map((p,i)=>`<div class="phitem"><img src="${esc(p.src)}" alt="Fotoğraf ${i+1}">${i===0?'<span class="tag">Kapak</span>':""}<div class="pb">${i>0?`<button type="button" data-cover="${i}">Kapak yap</button>`:""}<button type="button" data-rm="${i}">Kaldır</button></div></div>`).join("");
    $("#phGrid").querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{const [p]=ADM.photos.splice(+b.dataset.rm,1);if(p.blob)URL.revokeObjectURL(p.src);renderPh()});
    $("#phGrid").querySelectorAll("[data-cover]").forEach(b=>b.onclick=()=>{ADM.photos.unshift(...ADM.photos.splice(+b.dataset.cover,1));renderPh()});
  };
  renderPh();
  $("#e_ph").onchange=async e=>{
    const files=[...e.target.files].slice(0,Math.max(0,12-ADM.photos.length));
    if(!files.length){toast("En fazla 12 fotoğraf ekleyebilirsiniz");return}
    toast("Fotoğraflar hazırlanıyor…");
    let n=0;for(const f of files){const b=await shrinkBlob(f);if(b){ADM.photos.push({src:URL.createObjectURL(b),blob:b});n++}}
    e.target.value="";renderPh();toast(n?`${n} fotoğraf eklendi, kaydedince yüklenecek`:"Fotoğraf okunamadı");
  };
  $("#carF").onsubmit=async e=>{
    e.preventDefault();
    const g=id=>$("#"+id).value;
    const need=["e_mk","e_md","e_yl","e_km","e_fy"];
    const miss=need.find(id=>!clean(g(id)));
    if(miss||+g("e_fy")<=0){$("#fErr").hidden=false;$("#"+(miss||"e_fy")).focus();return}
    const exp={};Object.keys(PARTS).forEach(k=>{const s=g("x_"+k);if(s!=="o")exp[k]=s});
    const obj={marka:clean(g("e_mk")),model:clean(g("e_md")),paket:clean(g("e_pk"))||"—",yil:+g("e_yl"),km:+g("e_km"),fiyat:+g("e_fy"),
      yakit:g("e_yk"),vites:g("e_vt"),kasa:g("e_ks"),renk:g("e_rk"),motor:clean(g("e_mt"))||"—",cekis:g("e_ck"),ag:+g("e_ag"),tramer:+g("e_tr")||0,exp,
      don:g("e_dn").split("\n").map(clean).filter(Boolean),acik:g("e_ac").split(/\n\s*\n/).map(clean).filter(Boolean),kokpit:c?c.kokpit:"siyah"};
    if(!obj.acik.length)obj.acik=["Aracın detayları için bizi arayın ya da WhatsApp'tan yazın."];
    if(!obj.don.length)obj.don=["Detaylı donanım listesi için bizi arayın"];
    const btn=$("#fSave"),label=btn.textContent;btn.disabled=true;
    try{
      const nNew=ADM.photos.filter(p=>p.blob).length;let k=0;const urls=[];
      for(const p of ADM.photos){if(p.blob){btn.textContent=`Fotoğraflar yükleniyor (${++k}/${nNew})…`;urls.push(await API.upload(p.blob))}else urls.push(p.src)}
      btn.textContent="Kaydediliyor…";obj.photos=urls;
      if(c){const removed=c.photos.filter(u=>!urls.includes(u));await API.update({...c,...obj});if(removed.length)await API.removePhotos(removed)}
      else await API.create({...obj,sold:false,added:Date.now()});
      ADM.photos.forEach(p=>{if(p.blob)URL.revokeObjectURL(p.src)});
      C=await API.list();refreshHome();render();
      Object.assign(ADM,{tab:"cars",edit:null,photos:[]});
      toast(c?"Değişiklikler kaydedildi":"Araç sitede yayınlandı");admin();scrollTo(0,0);
    }catch(err){toast(errMsg(err));btn.disabled=false;btn.textContent=label}
  };
}

/* ======================= YÖNLENDİRME ======================= */
function go(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"})}
function route(){
  const h=decodeURIComponent(location.hash.slice(1)),m=h.match(/^arac-(\d+)$/),wasAway=$("#home").hidden;
  ["#admin","#detail","#page"].forEach(s=>$(s).hidden=true);
  if(h==="yonetim"){$("#home").hidden=true;$("#admin").hidden=false;admin();scrollTo(0,0);return}
  if(h==="kvkk"){$("#home").hidden=true;$("#page").hidden=false;$("#page").innerHTML=kvkkHTML();scrollTo(0,0);return}
  if(m){
    $("#home").hidden=true;$("#detail").hidden=false;const c=C.find(x=>x.id===+m[1]);
    if(c)detail(c);else $("#detail").innerHTML=`<div class="wrap"><div class="empty" style="margin-top:40px">${LOADED?`Bu ilan yayından kaldırılmış olabilir. <a href="#araclar">Tüm araçlara göz atın</a>.`:"İlan yükleniyor…"}</div></div>`;
    scrollTo(0,0);return;
  }
  $("#home").hidden=false;
  if(h&&h!=="anasayfa")requestAnimationFrame(()=>go(h));else if(wasAway||h==="anasayfa")scrollTo(0,0);
}
window.addEventListener("hashchange",route);

/* ======================= BAŞLAT ======================= */
bindSite();refreshHome();render();route();
(async()=>{
  try{C=await API.list()}catch(e){console.error(e);LOADERR=errMsg(e);C=[]}
  LOADED=true;refreshHome();render();
  if(!$("#detail").hidden)route();
  else if(!$("#admin").hidden&&ADM.authed)admin();
})();
