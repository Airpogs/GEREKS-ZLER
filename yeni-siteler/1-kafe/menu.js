/* Menü verisi. Fiyat ya da ürün değiştirmek için yalnızca bu dosyayı düzenleyin.
   s: servis saatleri [başlangıç, bitiş] (ondalık saat; 13.5 = 13:30). Yoksa gün boyu.
   e: etiketler — v: vejetaryen, vg: vegan, g: glutensiz, k: kuruyemiş içerir */
window.SAATLER = [[8.5,22],[7.5,23],[7.5,23],[7.5,23],[7.5,23],[7.5,23],[7.5,23]]; // Pazar..Cumartesi
window.MENU = [
 {id:"kahvalti", tr:"Kahvaltı", en:"Breakfast", s:[7.5,13], ntr:"Yumurtalar köy yumurtası, tereyağı Trabzon'dan.", nen:"Free-range eggs, butter from Trabzon.", urun:[
  {tr:"Gündüz tabağı", en:"The Gündüz plate", dtr:"Ezine peyniri, eski kaşar, zeytin, domates, salatalık, bal-tereyağı, haşlanmış yumurta, simit", den:"Ezine cheese, aged kashar, olives, tomato, cucumber, honey & butter, boiled egg, simit", f:390, e:"v"},
  {tr:"Serpme kahvaltı (2 kişilik)", en:"Breakfast spread (for two)", dtr:"Tabağın genişi; menemen ya da sahanda yumurta ve bir demlik çayla", den:"The big version, with menemen or fried eggs and a pot of tea", f:890, e:"v"},
  {tr:"Menemen", en:"Menemen", dtr:"Domates, sivri biber, yumurta. Soğanlı mı soğansız mı, siz karar verin", den:"Tomato, green pepper, eggs. With or without onion — your call", f:220, e:"v"},
  {tr:"Çılbır", en:"Çılbır", dtr:"Sarımsaklı süzme yoğurt, poşe yumurta, pul biberli tereyağı", den:"Garlic yogurt, poached eggs, chili butter", f:210, e:"v g"},
  {tr:"Sucuklu yumurta", en:"Eggs with sucuk", dtr:"Bakır sahanda, fırından ekmekle", den:"In a copper pan, with bread from our oven", f:250, e:""},
  {tr:"Tahin pekmezli yulaf", en:"Oats with tahini & molasses", dtr:"Yulaf sütü, muz, ceviz", den:"Oat milk, banana, walnuts", f:185, e:"v vg k"}
 ]},
 {id:"firin", tr:"Fırından", en:"From the oven", ntr:"Gün boyu, tükenene kadar. Öğleden sonra seçenek azalır.", nen:"All day, until it runs out. Fewer choices in the afternoon.", urun:[
  {tr:"Simit", en:"Simit", dtr:"Sabah çıkar, bol susamlı", den:"Baked each morning, heavy on the sesame", f:35, e:"v vg"},
  {tr:"Tereyağlı açma", en:"Butter açma", dtr:"Yumuşak, hafif tatlı", den:"Soft and slightly sweet", f:55, e:"v"},
  {tr:"Zeytinli poğaça", en:"Olive poğaça", dtr:"Siyah zeytin ezmesi, çörek otu", den:"Black olive paste, nigella seeds", f:60, e:"v"},
  {tr:"Ispanaklı börek", en:"Spinach börek", dtr:"El açması yufka, dilim", den:"Hand-rolled pastry, by the slice", f:130, e:"v"},
  {tr:"Tahinli çörek", en:"Tahini roll", dtr:"Cevizli", den:"With walnuts", f:75, e:"v vg k"},
  {tr:"Ekşi maya ekmek", en:"Sourdough loaf", dtr:"Bütün somun, eve götürmelik", den:"Whole loaf, to take home", f:160, e:"v vg"}
 ]},
 {id:"kahve", tr:"Kahve ve çay", en:"Coffee & tea", ntr:"Bitki sütü farkı 20 ₺.", nen:"Plant milk +20 ₺.", urun:[
  {tr:"Türk kahvesi", en:"Turkish coffee", dtr:"Közde, yanında lokum", den:"Brewed over embers, with Turkish delight", f:95, e:"v vg g"},
  {tr:"Espresso", en:"Espresso", dtr:"Tek ya da çift", den:"Single or double", f:90, e:"v vg g"},
  {tr:"Cortado", en:"Cortado", dtr:"Espresso kadar süt", den:"Equal parts espresso and milk", f:115, e:"v g"},
  {tr:"Flat white", en:"Flat white", dtr:"Çift shot, ince köpük", den:"Double shot, thin foam", f:135, e:"v g"},
  {tr:"Filtre kahve", en:"Filter coffee", dtr:"Haftanın çekirdeği tahtada yazar", den:"This week's bean is on the board", f:120, e:"v vg g"},
  {tr:"Demlik çay", en:"Pot of tea", dtr:"İki kişilik, Rize", den:"For two, from Rize", f:120, e:"v vg g"},
  {tr:"Ihlamur", en:"Linden tea", dtr:"Bal ve limonla", den:"With honey and lemon", f:95, e:"v g"}
 ]},
 {id:"soguk", tr:"Soğuklar", en:"Cold drinks", urun:[
  {tr:"Cold brew", en:"Cold brew", dtr:"16 saat demlenir", den:"Steeped for 16 hours", f:140, e:"v vg g"},
  {tr:"Buzlu latte", en:"Iced latte", dtr:"", den:"", f:150, e:"v g"},
  {tr:"Ev limonatası", en:"House lemonade", dtr:"Taze nane, az şeker", den:"Fresh mint, not too sweet", f:110, e:"v vg g"},
  {tr:"Naneli ayran", en:"Mint ayran", dtr:"Yayık", den:"Churned", f:60, e:"v g"},
  {tr:"Taze portakal suyu", en:"Fresh orange juice", dtr:"Mevsiminde", den:"In season", f:130, e:"v vg g"}
 ]},
 {id:"ogle", tr:"Öğle tabağı", en:"Lunch plates", s:[12,16], ntr:"Her gün değişir. Bugün ne olduğu kapıdaki tahtada.", nen:"Changes daily. Today's list is on the board by the door.", urun:[
  {tr:"Günün çorbası", en:"Soup of the day", dtr:"Ekmek ve limonla", den:"With bread and lemon", f:140, e:"v"},
  {tr:"Zeytinyağlı tabağı", en:"Olive oil plate", dtr:"Üç çeşit zeytinyağlı, yoğurt", den:"Three vegetables braised in olive oil, yogurt", f:260, e:"v g"},
  {tr:"Fırın makarna", en:"Baked pasta", dtr:"Beşamel, kaşar, bol karabiber", den:"Béchamel, kashar, plenty of black pepper", f:240, e:"v"},
  {tr:"Tavuklu bulgur pilavı", en:"Chicken with bulgur", dtr:"Közlenmiş biber, cacık", den:"Charred peppers, cacık", f:290, e:""},
  {tr:"Izgara köfte", en:"Grilled köfte", dtr:"Piyaz ve közlenmiş domatesle", den:"With bean salad and charred tomato", f:330, e:"g"}
 ]},
 {id:"tatli", tr:"Tatlı", en:"Sweets", urun:[
  {tr:"Fırın sütlaç", en:"Baked rice pudding", dtr:"Üstü iyice yanık", den:"Properly burnt on top", f:150, e:"v g"},
  {tr:"San Sebastián", en:"San Sebastián cheesecake", dtr:"Dilim", den:"By the slice", f:195, e:"v"},
  {tr:"İrmik helvası", en:"Semolina helva", dtr:"Ilık, bir top dondurmayla", den:"Warm, with a scoop of ice cream", f:175, e:"v k"},
  {tr:"Havuçlu kek", en:"Carrot cake", dtr:"Cevizli, tarçınlı", den:"Walnut and cinnamon", f:160, e:"v k"},
  {tr:"Elmalı kurabiye", en:"Apple cookie", dtr:"", den:"", f:70, e:"v"}
 ]},
 {id:"aksam", tr:"Akşamüstü", en:"Evening bites", s:[16,22.5], ntr:"Kahvenin yanına, sohbetin ortasına.", nen:"Something to share over a long chat.", urun:[
  {tr:"Peynir tabağı", en:"Cheese board", dtr:"Dört peynir, incir reçeli, ceviz, ekşi maya", den:"Four cheeses, fig jam, walnuts, sourdough", f:340, e:"v k"},
  {tr:"Humus", en:"Hummus", dtr:"Tereyağlı pul biber, sıcak ekmek", den:"Chili butter, warm bread", f:210, e:"v"},
  {tr:"Fırın patates", en:"Oven potatoes", dtr:"Kekik, sarımsaklı yoğurt", den:"Thyme, garlic yogurt", f:160, e:"v g"}
 ]}
];
