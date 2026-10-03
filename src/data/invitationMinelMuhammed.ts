/**
 * Davetiye veri yapısı — tüm içerik bu tek dosyadan okunur.
 * Admin paneli bu dosyayı/veritabanı kaydını güncelleyecek.
 */

export interface EventInfo {
  id: string;
  type: "dugun" | "kina";
  title: string;
  date: string;          // "31 Ekim 2026 Cumartesi"
  dateISO: string;       // "2026-10-31"
  startTime: string;     // "13:00"
  endTime?: string;      // opsiyonel
  convoyTime?: string;   // konvoy saati, opsiyonel
  venueName: string;
  venueSubtitle?: string;
  address: string;
  district: string;      // "Kartal / İstanbul"
  googleMapsUrl: string;
}

export interface MusicSettings {
  url: string;
  title: string;
  volume: number;  // 0–1
  loop: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

export interface InvitationSettings {
  slug: string;
  brideName: string;
  brideFullName: string;
  brideParents?: string;   // boşsa gizlenir
  groomName: string;
  groomFullName: string;
  groomParents?: string;   // boşsa gizlenir
  bridePhoto?: string;     // boşsa fotoğraf bölümü gizlenir
  groomPhoto?: string;     // boşsa fotoğraf bölümü gizlenir

  arabicVerse: string;
  arabicVerseTranslation: string;
  arabicVerseSource: string;
  invitationBody: string;
  invitationSignature: string;

  events: EventInfo[];
  music: MusicSettings;

  // LCV
  lcvDeadline: string;     // "25 Ekim 2026"
  lcvDeadlineISO: string;  // "2026-10-25"

  // SEO
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;

  // Guestbook seed
  guestbook: GuestbookEntry[];
}

// ─── Kesin veriler — admin panelinden düzenlenecek ──────────────────────────

export const invitationData: InvitationSettings = {
  slug: "minel-muhammed",

  brideName: "Minel Şevval",
  brideFullName: "Minel Şevval Gözükara",
  brideParents: "",   // boş → gizlenir

  groomName: "Muhammed Şamil",
  groomFullName: "Muhammed Şamil Kuş",
  groomParents: "",   // boş → gizlenir

  bridePhoto: "",    // admin fotoğraf yükleyince dolar
  groomPhoto: "",    // admin fotoğraf yükleyince dolar

  arabicVerse: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ\nوَأَلَّفَ بَيْنَ قُلُوبِهِمْ",
  arabicVerseTranslation: "\"Allah onların kalplerini birbirine ısındırdı.\"",
  arabicVerseSource: "Enfâl, 8/63",
  invitationBody:
    `Kalpleri birleştirenin Allah olduğuna inanarak, bir ömür aynı yolda yürümeye, aynı duaya "Âmin" demeye niyet ettik. Bu niyetimizi bir yuva ile taçlandıracağımız bu güzel günümüzde mutluluğumuzu paylaşmanız ve dualarınızla bizlere eşlik etmeniz dileğiyle…`,
  invitationSignature: "Minel & Muhammed",

  events: [
    {
      id: "kina",
      type: "kina",
      title: "Kına Merasimi",
      date: "28 Ekim 2026 Çarşamba",
      dateISO: "2026-10-28",
      startTime: "13:30",
      venueName: "Hüdaverdi Mescidi",
      venueSubtitle: "Bodrum Mescid — Yeşil Kapı",
      address: "Soğanlı Mah., Hüdaverdi Sok., Fettahoğlu Apt. No:28",
      district: "Bahçelievler / İstanbul",
      googleMapsUrl: "https://maps.google.com/?q=41.009342,28.853327",
    },
    {
      id: "dugun",
      type: "dugun",
      title: "Düğün Töreni",
      date: "31 Ekim 2026 Cumartesi",
      dateISO: "2026-10-31",
      startTime: "13:00",
      endTime: "17:00",
      convoyTime: "11:30",
      venueName: "Besa Albatros Davet & Balo Merkezi",
      address: "Çavuşoğlu, Yakacık Cd. No:131/1",
      district: "Kartal / İstanbul",
      googleMapsUrl: "https://maps.app.goo.gl/cCL8LALS6rrJLCHH6?g_st=ic",
    },
  ],

  music: {
    url: "/davetiye/minelmuhammed/music/masallah.mp3",
    title: "Mustafa Ceceli — Maşallah",
    volume: 0.65,
    loop: true,
  },

  lcvDeadline: "25 Ekim 2026",
  lcvDeadlineISO: "2026-10-25",

  ogTitle: "Minel & Muhammed | Düğün Davetiyesi",
  ogDescription:
    "28 Ekim Kına • 31 Ekim 2026 Cumartesi 13:00 Düğün — Minel & Muhammed'in davetlisiniz. Besa Albatros, Kartal / İstanbul.",
  ogImage: "",

  guestbook: [],
};
