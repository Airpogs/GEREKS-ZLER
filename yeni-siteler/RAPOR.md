# Rapor — yedi yeni site

## Özet

Yedi sitenin hepsi sıfırdan yazıldı ve `yeni-siteler` klasöründe duruyor; eski `siteler` klasörüne dokunulmadı. Her sitenin ayrı bir karakteri, ayrı yazı tipleri ve kendine ait bir "wow anı" var. Hiçbir sitede kütüphane ya da kurulum yok: düz HTML, CSS ve JavaScript. Hepsi telefonda (390 px) ve masaüstünde (1440 px) Playwright ile açılıp ekran görüntüsünden incelendi; formlar, süzgeçler ve randevu akışı tıklanarak denendi, konsolda hata kalmadı.

Higgsfield anahtarı tanımlı olmadığı için görsel üretilmedi, harcama 0 dolar. Siteler görselsiz eksiksiz görünecek şekilde tasarlandı; görsel komutları her sitenin `gorseller` klasöründe hazır.

## Siteler

### 1. Kafe — Gündüz Kahve & Fırın (`1-kafe`)
- **Fikir:** Site, mekân gibi günün saatine göre ışık değiştiriyor. Menü kâğıt menü gibi okunuyor.
- **Wow anı:** Kemerli bir pencerede güneş, açılıştan kapanışa bir yay üzerinde duruyor. Sürükleyince saat ilerliyor; gökyüzü, sitenin renkleri ve o saatte servis edilen menü bölümleri değişiyor. Akşam yıldızlar çıkıyor, evlerin ışıkları yanıyor.
- **Öne çıkanlar:** Yapışkan kategori şeridi, arama, vejetaryen/vegan/glutensiz süzgeçleri, TR/EN, "masa listem" (garsona gösterilecek liste), WhatsApp rezervasyonu, açık/kapalı durumu.

### 2. Berber — Perdah Berber (`2-berber`)
- **Fikir:** Afiş gibi büyük harfler, şişe yeşili zemin, lafı dolandırmayan bir usta dili.
- **Wow anı:** Dev başlık tıraş köpüğüyle kaplı açılıyor. Bir ustura darbesi ilk satırı açıyor, gerisini ziyaretçi parmağıyla siliyor.
- **Öne çıkanlar:** Hizmet, ek hizmet, usta, gün ve saat seçimi; seçtikçe dolan randevu fişi; WhatsApp'a hazır mesaj; fiyat listesinden ve usta kartından tek dokunuşla randevuya geçiş; kaydırdıkça dönen berber direği.

### 3. Emlak — Eşik Gayrimenkul (`3-emlak`)
- **Fikir:** Mimar çizim masası: aydınger kâğıdı, mürekkep çizgi, kırmızı kalemle ölçü. "Fotoğraf yanıltır, plan yanıltmaz."
- **Wow anı:** İlanların yüzü fotoğraf değil, gözünüzün önünde çizilen kat planı. Planlar koddan üretiliyor ve ilanın metrekaresine göre ölçekleniyor.
- **Öne çıkanlar:** 12 ilan, altı süzgeç ve sıralama, hızlı arama, tam ekran ilan sayfası (oda oda metrekare, künye, paylaşılabilir adres), "evinizi satalım" formu, anapara/faiz oranını gösteren kredi hesaplayıcı.

### 4. Galeri — Kontak Otomotiv (`4-galeri`)
- **Fikir:** Gece otoparkı: asfalt, sarı yol çizgisi, net rakam. Ekspertiz ilanın içinde.
- **Wow anı:** Sayfa karanlık açılıyor, farlar kırpışıp yanıyor ve başlığı aydınlatıyor. "Selektör yap" düğmesi uzunları yakıyor.
- **Öne çıkanlar:** Araçlar sarı çizgili park yerlerinde kuşbakışı çizimle duruyor; ilana girince aynı çizim boyalı ve değişen parçayı gösteren ekspertiz şemasına dönüşüyor. Kasa, marka, yakıt, vites, fiyat, kilometre süzgeçleri, "yalnızca boyasız" anahtarı, takas formu.

### 5. Can Auto (`5-can-auto`)
- **Fikir:** Kontak'ın tersi: aydınlık, kobalt mavi, dev harfler. Gerçek işletme olduğu için tasarımın merkezinde dürüstlük var.
- **Wow anı:** Sayfanın içinden kıvrılan bir yol; kaydırdıkça küçük bir araba ilerliyor, geçtiği yol maviye boyanıyor, her durakta bir adım açılıyor. Girişte "Auto"nun "o"su dönen bir jant.
- **Öne çıkanlar:** Can Auto'dan gelmemiş her bilgi sarı, kesik çizgili **yer tutucu** olarak görünüyor. Bilgiler `ayarlar.js` ve `araclar.js` dosyalarına yazıldıkça yer tutucular kendiliğinden kayboluyor (deneme verisiyle sınandı). Süzgeçler yer tutucularla bile çalışıyor.
- **Uydurma bilgi yok:** telefon, adres, saat, kuruluş yılı, araç, fiyat, çalışan girilmedi.

### 6. Mimari — Çatkı (`6-mimari`)
- **Fikir:** Sergi duvarı gibi: çok boşluk, az söz, ince büyük harfler. Ağaçla başlayıp evle biten bir anlatı.
- **Wow anı:** Açılışta bir tomruğun yıl halkaları tarayıcıda canlı çiziliyor (WebGL, fotoğraf değil). Kaydırdıkça tomruk kesiliyor, kirişe dönüşüyor, kiriş yerini çizgi çizgi beliren ev iskeletine bırakıyor.
- **Öne çıkanlar:** Dört evin ön cephe çizimi ölçülerden koddan üretiliyor; sürüklenen "geçme" oyuncağı (kiriş dikmeye oturuyor, kavela kilitleniyor).

### 7. Portfolyo (`7-portfolyo`)
- **Fikir:** Tek kişilik stüdyo, esnafla esnaf gibi konuşuyor. Sahne işlerin kendisi.
- **Wow anı:** "İşler" bölümünde ekran sabitleniyor; kaydırdıkça telefondaki site değişiyor ve sayfanın tamamı o sitenin rengine ve yazı tipine bürünüyor.
- **Öne çıkanlar:** Altı sitenin gerçek ekran görüntüleri, paketler (2.500 / 5.000 / 10.000 TL, bakım 750 TL/ay), işletme türü ve paket seçilince kendiliğinden hazırlanan WhatsApp mesajı. Ad ve numara yer tutucu: `[Adın Soyadın]`, `[0 5XX XXX XX XX]`.

## Higgsfield

Üretilen görsel: **0**. Harcama: **0 dolar** (`HIGGSFIELD_API_KEY` tanımlı değildi).

Üretmeniz gereken görseller, toplam **12 adet**. Komutlar her sitenin `gorseller/HIGGSFIELD-KOMUTLARI.md` dosyasında.

| Site | Dosyalar |
| --- | --- |
| `1-kafe/gorseller/` | `mekan.webp`, `doku.webp` |
| `2-berber/gorseller/` | `kapak.webp`, `dukkan.webp`, `alet.webp` |
| `3-emlak/gorseller/` | `korfez.webp`, `ofis.webp` |
| `4-galeri/gorseller/` | `gece.webp`, `galeri.webp` |
| `5-can-auto/gorseller/` | `doku.webp` (yalnızca soyut doku) |
| `6-mimari/gorseller/` | `orman.webp`, `atolye.webp` |
| `7-portfolyo/gorseller/` | Yok. Buradakiler gerçek ekran görüntüleri. |

**Nasıl konur:** Bu dosyalar klasörlerde şu an 1×1 piksellik boş yer tutucu olarak duruyor. Ürettiğiniz görseli WebP olarak, **aynı adla üzerine yazın**; site kendiliğinden kullanır, kod değişmez.

Can Auto'da `galeri.webp`, araç ve ekip fotoğrafları yapay zekâyla üretilmemeli; bunlar galerinin kendi fotoğrafları için ayrıldı.

## Siteleri açmak

```bash
cd yeni-siteler && python3 -m http.server 8000
```

Sonra tarayıcıda `localhost:8000` adresini açın; yedi sitenin dizini gelir. Telefonda görmek için tarayıcının geliştirici araçlarındaki telefon görünümünü kullanın.

## Sizin yapmanız gerekenler

1. 12 Higgsfield görselini üretip yukarıdaki adlarla klasörlere koymak.
2. Portfolyoda `[Adın Soyadın]` ve `[0 5XX XXX XX XX]` yerlerini doldurmak; bütün sitelerdeki `905000000000` WhatsApp numarasını değiştirmek.
3. Can Auto'dan gerçek bilgileri alıp `5-can-auto/ayarlar.js` ve `araclar.js` dosyalarına yazmak. Slogan ve "Anahtara giden yol" metinleri benim önerim; galerinin onaylaması gerekir. Can Auto'yu portfolyoda göstermeden önce izinlerini alın.
4. Portfolyodaki paket açıklamalarını okuyup kendi verdiğiniz hizmete göre düzeltmek (fiyatlar sizin verdiğiniz, içerikler benim önerim).
5. Siteleri yayınlayınca portfolyodaki site bağlantılarını (`7-portfolyo/uygulama.js` içindeki `yol` alanları ve paketlerdeki linkler) gerçek adreslerle değiştirmek.

## Verdiğim kararlar

- **Git:** `yeni-siteler` içinde ayrı bir depo başlatmadım. Klasör zaten bir git deposunun içinde; iç içe depo GitHub'a gönderilemezdi. Her site aynı depoda ayrı commit olarak duruyor ve `claude/focused-clarke-e1dxr3` dalına gönderildi.
- **Kütüphane yok:** three.js ve GSAP kullanmadım. Çalıştığım ortamdan CDN'lere erişilemiyordu, yani ekleseydim test edemezdim. Bütün hareket düz JavaScript, SVG ve WebGL ile yazıldı; siteler bu sayede daha hafif (portfolyo dışında her site 50 KB'ın altında).
- **Yer tutucu görseller:** "Dosya varsa kullan" denetimi eksik dosyada konsola hata yazdırdığı için, 1×1 piksellik boş dosyalar koyup üzerine yazma yöntemini seçtim.
- **Kafe dili:** Varsayılan Türkçe; İngilizce düğmeyle açılıyor.
- **Önceki istek:** İlk mesajınızdaki zip'i `siteler` klasörüne açıp "orijinal" adıyla kaydetmiştim; o klasör o hâliyle duruyor.

## Açık kalan eksikler

- **Gerçek cihazda denenmedi.** Testler yalnızca Chromium'da, telefon boyutunda öykünmeyle yapıldı. iPhone Safari ve Firefox'ta bakılmadı.
- **Mimari sitesindeki WebGL sahnesi** yalnızca yazılım tabanlı çizicide sınandı. Eski ya da zayıf telefonlarda akıcılığı bilinmiyor; WebGL hiç yoksa sade bir halka deseni gösteriliyor.
- **Kontrast** göz kararı ve ana renk çiftleri için hesapla ayarlandı; otomatik bir erişilebilirlik denetimi çalıştırılmadı. Klavye ile gezinme elle baştan sona denenmedi.
- **Formlar hiçbir yere kayıt yapmıyor.** Hepsi WhatsApp mesajı hazırlıyor. Berberdeki dolu saatler rastgele üretiliyor, gerçek takvim yok. Galeri ve emlak ilanları dosyadan okunuyor; yönetim paneli yok.
- **Yazı tipleri Google Fonts'tan geliyor.** İnternet yokken siteler yedek yazı tipiyle açılır.
- **Portfolyodaki ekran görüntüleri sabit.** Siteleri değiştirirseniz yeniden çekilmeleri gerekir.
- Hayali sitelerdeki fiyatlar, ilanlar ve adresler uydurmadır; her birinin altında bunu söyleyen not var.
