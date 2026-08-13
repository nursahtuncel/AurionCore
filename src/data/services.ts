export const serviceCategories = [
  {
    id: "web-sitesi",
    title: "Web Sitesi",
    emoji: "🌐",
    description: "Firmana özel, hızlı ve mobil uyumlu web siteleri. Tasarım dahil, fiyatı baştan belli — ne ödeyeceğini sürpriz olmadan görürsün.",
    services: [
      { id: "ozel-tasarim", title: "Özel Tasarım Web Sitesi", description: "İşletmenize özel tasarlanan kurumsal site", price: "₺15.000" },
      { id: "e-ticaret", title: "E-Ticaret Sitesi", description: "Ödeme ve kargo entegrasyonlu, satışa hazır online mağaza", price: "₺35.000" },
      { id: "landing-page", title: "Landing Page (Kampanya Sayfası)", description: "Tek hedefe odaklı, dönüşüm getiren açılış sayfası", price: "₺7.500" },
      { id: "ultra-premium", title: "Ultra Premium Animasyonlu Site", description: "Sektörünüzün en gösterişli sitesi — animasyonlu, premium", price: "₺20.000" },
      { id: "yonetim-paneli", title: "Yönetim Paneli (web sitesine ek)", description: "Sitenizin içeriğini kendiniz güncelleyin", price: "₺10.000" }
    ]
  },
  {
    id: "tasarim",
    title: "Tasarım",
    emoji: "🎨",
    description: "Kullanıcı odaklı, modern ve akılda kalıcı arayüzlerle dijital ürünlerinizi öne çıkarıyoruz.",
    services: [
      { id: "ui-ux", title: "UI/UX Tasarımı", description: "Modern ve kullanıcı dostu arayüz tasarımları", price: "₺5.000" },
      { id: "logo-kurumsal", title: "Logo & Kurumsal Kimlik", description: "Markanızı yansıtan profesyonel kimlik çalışması", price: "₺3.000" }
    ]
  },
  {
    id: "qr-yerel",
    title: "QR & Yerel Görünürlük",
    emoji: "📍",
    description: "Müşterilerinizin sizi bulmasını ve yorum bırakmasını kolaylaştıran dijital çözümler.",
    services: [
      { id: "qr-menu", title: "QR Menü (Dijital Menü)", description: "Masadaki QR'dan telefonda açılan menü", price: "₺2.500" },
      { id: "google-yorum", title: "Google Yorum Kartı (QR Plaket)", description: "Müşterin 10 saniyede 5 yıldızını versin", price: "₺2.500" },
      { id: "google-isletme", title: "Google İşletme Profili Kurulum + Optimizasyon", description: "Haritalarda eksiksiz ve profesyonel görünün", price: "₺7.500" }
    ]
  },
  {
    id: "dijital-kartlar",
    title: "Dijital Kartlar & İçerik",
    emoji: "🃏",
    description: "Kağıdın yerini alan, her cihazda açılan akıllı dijital kimlik çözümleri.",
    services: [
      { id: "dijital-kartvizit", title: "Dijital Kartvizit (QR + vCard)", description: "Kağıt kartvizitin akıllı hali", price: "₺3.000" },
      { id: "bio-link", title: "Link Sayfası (Bio Link)", description: "Instagram biyografin için tek link", price: "₺3.000" },
      { id: "online-katalog", title: "Online Katalog", description: "Ürünlerin web + PDF katalogu", price: "₺5.000" },
      { id: "dijital-brosur", title: "Dijital Broşür", description: "Mobil uyumlu şirket tanıtımı", price: "₺5.000" }
    ]
  },
  {
    id: "isletme-sistemleri",
    title: "İşletme Sistemleri",
    emoji: "⚙️",
    description: "İşletmenizi otomatize eden, müşteri deneyimini zirveye taşıyan entegre yazılım çözümleri.",
    services: [
      { id: "online-randevu", title: "Online Randevu Sistemi", description: "Müşterin telefondan randevu alsın", price: "₺5.000" },
      { id: "rezervasyon", title: "Rezervasyon Sistemi", description: "Masa/salon rezervasyonu tek sistemde", price: "₺8.000" },
      { id: "online-siparis", title: "Online Sipariş Sistemi", description: "Komisyonsuz kendi sipariş kanalın", price: "₺10.000" },
      { id: "teklif-hazirlama", title: "Teklif Hazırlama Sistemi", description: "Logolu profesyonel PDF teklifler", price: "₺7.500" },
      { id: "kupon-kampanya", title: "Kupon & Kampanya Sistemi", description: "İndirim kodlarıyla satışı hızlandır", price: "₺5.000" },
      { id: "sadakat-sistemi", title: "Dijital Sadakat Sistemi", description: "Müşterini geri getiren puan sistemi", price: "₺10.000" },
      { id: "referans-sistemi", title: "Referans (Arkadaşını Getir) Sistemi", description: "Müşterin sana müşteri getirsin", price: "₺8.500" },
      { id: "crm", title: "CRM (Müşteri Yönetim Sistemi)", description: "Satış ekibinin tam takip sistemi", price: "₺20.000" }
    ]
  },
  {
    id: "ai-cozumleri",
    title: "Yapay Zekâ Çözümleri",
    emoji: "🤖",
    description: "Yapay zekâyı işinizin merkezine koyun. 7/24 çalışan, yorulmayan, hatasız asistanlar.",
    services: [
      { id: "whatsapp-botu", title: "Yapay Zekâ WhatsApp Botu", description: "7/24 müşteri karşılayan AI", price: "₺30.000" },
      { id: "instagram-botu", title: "Instagram DM Botu", description: "DM'leri yapay zekâ yanıtlasın", price: "₺25.000" },
      { id: "telefon-asistani", title: "AI Telefon Asistanı", description: "Telefonu yanıtlayan sesli yapay zekâ", price: "₺60.000" },
      { id: "cagri-merkezi", title: "Yapay Zekâ Çağrı Merkezi", description: "Aramaları yöneten AI + CRM", price: "₺150.000" },
      { id: "satis-asistani", title: "AI Satış Asistanı", description: "Satış ekibine yapay zekâ katmanı", price: "₺60.000" }
    ]
  },
  {
    id: "reklam",
    title: "Reklam & Büyüme",
    emoji: "📈",
    description: "Doğru kitleye, doğru mesajla ulaşın. Reklam bütçenizi boşa harcamayın.",
    services: [
      { id: "ads-meta", title: "Google Ads + Meta Reklam Yönetimi", description: "Reklamını profesyonel yönetelim", price: "₺5.000/ay" }
    ]
  },
  {
    id: "seo",
    title: "SEO",
    emoji: "🔍",
    description: "Arama motorlarında üst sıralara çıkarak organik trafiğinizi ve satışlarınızı artırın.",
    services: [
      { id: "teknik-seo", title: "Teknik SEO Analizi", description: "Sitenizin altyapısını arama motorlarına uyumlu hale getirin", price: "₺4.000" },
      { id: "icerik-seo", title: "İçerik Stratejisi & SEO", description: "Doğru anahtar kelimelerle hedef kitlenize ulaşın", price: "₺4.500" }
    ]
  },
  {
    id: "dijital-urunler",
    title: "Dijital Ürünler",
    emoji: "📦",
    description: "Bir kez öde, anında e-postana gelsin. Kargo yok, bekleme yok — indir ve hemen kullan.",
    services: [
      { id: "mega-paket", title: "Mega Paket — Tüm Dijital Ürünler", description: "10 ürünün tamamı tek pakette, yarı fiyatına yakın", price: "Yakında" },
      { id: "sosyal-medya", title: "30 Günlük Sosyal Medya İçerik Paketi", description: "Bir ay boyunca ne paylaşacağını düşünme — hazır", price: "Yakında" },
      { id: "ai-komut", title: "İşletmeler için 250+ AI Komut Paketi", description: "Yapay zekâyı işine koşan hazır komutlar", price: "Yakında" },
      { id: "e-kitap-pazarlama", title: "E-Kitap: Dijital Pazarlama Rehberi", description: "Ajansa bağımlı kalmadan pazarlamanın el kitabı", price: "Yakında" },
      { id: "yerel-seo", title: "Google Haritalar'da Öne Çıkma: Yerel SEO", description: "Seni önce haritada bulsunlar", price: "Yakında" },
      { id: "instagram-kanca", title: "300 Instagram Kancası + Bio Arşivi", description: "İlk 3 saniyede durduran cümleler", price: "Yakında" },
      { id: "excel-sablonu", title: "Gelir-Gider & Nakit Akışı Excel Şablonu", description: "İşletmenin parasını tek sayfada gör", price: "Yakında" },
      { id: "whatsapp-mesaj", title: "WhatsApp Satış Mesajı Şablonları", description: "Karşılamadan tahsilata hazır mesaj akışları", price: "Yakında" },
      { id: "teklif-sablon", title: "Teklif + Sözleşme + Ön Bilgilendirme Şablon Seti", description: "Serbest çalışanın evrak altyapısı hazır", price: "Yakında" },
      { id: "cv-sablon", title: "CV & Ön Yazı Şablon Paketi", description: "İK'nın elediği değil, aradığı CV", price: "Yakında" },
      { id: "e-kitap-ai", title: "E-Kitap: Yapay Zekâ ile İşini Büyüt", description: "KOBİ'ler için pratik yapay zekâ el kitabı", price: "Yakında" }
    ]
  }
];
