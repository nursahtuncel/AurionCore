import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { db as firestore } from "./firebase";

// ─── Tip tanımları ─────────────────────────────────────

export interface EventInfo {
  id: string;
  type: "dugun" | "kina";
  title: string;
  date: string;
  dateISO: string;
  startTime: string;
  endTime?: string;
  convoyTime?: string;
  venueName: string;
  venueSubtitle?: string;
  address: string;
  district: string;
  googleMapsUrl: string;
}

export interface MusicSettings {
  enabled: boolean;
  source: "preset" | "custom";
  presetId: string;
  customUrl: string;
  title: string;
  volume: number;
  loop: boolean;
}

export interface IbanInfo {
  bankName: string;
  accountHolder: string;
  iban: string;
}

export interface SectionVisibility {
  countdown: boolean;
  gallery: boolean;
  program: boolean;
  venue: boolean;
  iban: boolean;
  rsvp: boolean;
  guestbook: boolean;
}

export interface InvitationSettings {
  brideName: string;
  brideFullName: string;
  groomName: string;
  groomFullName: string;
  arabicVerse: string;
  arabicVerseTranslation: string;
  arabicVerseSource: string;
  invitationBody: string;
  invitationSignature: string;
  events: EventInfo[];
  music: MusicSettings;
  lcvDeadline: string;
  lcvDeadlineISO: string;
  ibanInfo: IbanInfo;
  sections: SectionVisibility;
  coverPhoto: string;
  gallery: string[];
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attending: "yes" | "no";
  ceremony: string;
  count: string;
  children: string;
  note: string;
  createdAt: string;
  whatsappGuestId?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  isVisible?: boolean;
}

export const PRESET_MUSIC = [
  { id: "masallah", title: "Mustafa Ceceli — Maşallah", file: "/davetiye/minelmuhammed/music/masallah.mp3" },
  { id: "ilahi1", title: "Sami Yusuf — Hasbi Rabbi", file: "/davetiye/minelmuhammed/music/hasbi-rabbi.mp3" },
  { id: "ilahi2", title: "Maher Zain — Baraka Allahu Lakuma", file: "/davetiye/minelmuhammed/music/baraka.mp3" },
  { id: "klasik1", title: "Klasik Ney — Hicaz Taksim", file: "/davetiye/minelmuhammed/music/ney-hicaz.mp3" },
  { id: "klasik2", title: "Piyano — Aşk", file: "/davetiye/minelmuhammed/music/piano-ask.mp3" },
];

const DEFAULT_SETTINGS: InvitationSettings = {
  brideName: "Minel Şevval",
  brideFullName: "Minel Şevval Gözükara",
  groomName: "Muhammed Şamil",
  groomFullName: "Muhammed Şamil Kuş",
  arabicVerse: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ\nوَأَلَّفَ بَيْنَ قُلُوبِهِمْ",
  arabicVerseTranslation: "\"Allah onların kalplerini birbirine ısındırdı.\"",
  arabicVerseSource: "Enfâl, 8/63",
  invitationBody: "Kalpleri birleştirenin Allah olduğuna inanarak, bir ömür aynı yolda yürümeye, aynı duaya \"Âmin\" demeye niyet ettik. Bu niyetimizi bir yuva ile taçlandıracağımız bu güzel günümüzde mutluluğumuzu paylaşmanız ve dualarınızla bizlere eşlik etmeniz dileğiyle…",
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
    enabled: true,
    source: "preset",
    presetId: "masallah",
    customUrl: "",
    title: "Mustafa Ceceli — Maşallah",
    volume: 0.65,
    loop: true,
  },
  lcvDeadline: "25 Ekim 2026",
  lcvDeadlineISO: "2026-10-25",
  ibanInfo: {
    bankName: "",
    accountHolder: "",
    iban: "",
  },
  sections: {
    countdown: true,
    gallery: false,
    program: true,
    venue: true,
    iban: false,
    rsvp: true,
    guestbook: true,
  },
  coverPhoto: "",
  gallery: [],
};

const SETTINGS_DOC_ID = "minelmuhammed-settings";

export interface WhatsAppSettings {
  template: string;
  template2?: string;
  template3?: string;
  reminderTemplate: string;
  thankYouTemplate: string;
  personalGreeting: string;
}

export interface WhatsAppGuest {
  id: string;
  name: string;
  phone: string;
  hash: string;
  sent: boolean;
  messageSentAt?: number;
  reminderSentAt?: number;
  thankYouSentAt?: number;
  rsvpStatus?: "yes" | "no" | "none";
  rsvpCount?: string;
  rsvpChildren?: string;
  rsvpNote?: string;
  createdAt: string;
}

const DEFAULT_WA_SETTINGS: WhatsAppSettings = {
  template: "Kıymetli {isim},\n\nSizleri {tarih} tarihinde saat {saat} itibarıyla {mekan}'da gerçekleşecek olan en mutlu günümüzde aramızda görmekten onur duyarız.\n\n{cift}\n\nDavetiyemiz ve konum bilgisi:\n{link}",
  template2: "Sevgili {isim},\n\nMutluluğumuzu paylaşmaya, en güzel günümüze şahitlik etmeye sizi de bekliyoruz. {tarih} günü {mekan}'da görüşmek üzere!\n\n{cift}\n\nDavetiyemiz:\n{link}",
  template3: "{isim} merhaba,\n\nDüğünümüze mutlaka bekliyoruz!\nTarih: {tarih} - {saat}\nYer: {mekan}\n\n{cift}\n\nDavetiye:\n{link}",
  reminderTemplate: "Merhaba {isim},\n\n{tarih} tarihindeki düğünümüz için katılım durumunuzu henüz bildirmediniz. Aşağıdaki linkten tek dokunuşla yanıt verebilirsiniz 🤍\n\n{link}",
  thankYouTemplate: "Sevgili {isim},\n\nKatılımınız için teşekkür ederiz. Sizi aramızda göreceğimiz için çok mutluyuz.\n\nKonum ve detaylar için:\n{link}",
  personalGreeting: "Sevgili {isim}, sizi aramızda görmek istiyoruz."
};

// ─── Kısayol fonksiyonları ─────────────────────────────

/** Sadece ayarları oku */
export async function getSettings(): Promise<InvitationSettings> {
  try {
    const docRef = doc(firestore, "settings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as InvitationSettings;
    } else {
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error("Firebase getSettings error:", error);
    return DEFAULT_SETTINGS;
  }
}

/** Ayarları güncelle */
export async function updateSettings(newSettings: Partial<InvitationSettings>): Promise<InvitationSettings> {
  const currentSettings = await getSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  const docRef = doc(firestore, "settings", SETTINGS_DOC_ID);
  await setDoc(docRef, updatedSettings);
  return updatedSettings;
}

/** Yeni RSVP yanıtı ekle */
export async function addRsvp(entry: Omit<RsvpEntry, "id" | "createdAt">): Promise<RsvpEntry> {
  const rsvpRef = collection(firestore, "rsvp");
  const docRef = await addDoc(rsvpRef, {
    ...entry,
    createdAt: new Date().toISOString()
  });
  return {
    ...entry,
    id: docRef.id,
    createdAt: new Date().toISOString()
  };
}

/** Tüm RSVP yanıtlarını getir */
export async function getRsvpList(): Promise<RsvpEntry[]> {
  const rsvpRef = collection(firestore, "rsvp");
  const querySnapshot = await getDocs(rsvpRef);
  const result: RsvpEntry[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() } as RsvpEntry);
  });
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}

/** Yeni misafir defteri mesajı ekle */
export async function addGuestbookEntry(entry: { name: string; message: string }): Promise<GuestbookEntry> {
  const gbRef = collection(firestore, "guestbook");
  const docRef = await addDoc(gbRef, {
    ...entry,
    createdAt: new Date().toISOString()
  });
  return {
    ...entry,
    id: docRef.id,
    createdAt: new Date().toISOString()
  };
}

/** Tüm misafir defteri mesajlarını getir */
export async function getGuestbook(): Promise<GuestbookEntry[]> {
  const gbRef = collection(firestore, "guestbook");
  const querySnapshot = await getDocs(gbRef);
  const result: GuestbookEntry[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() } as GuestbookEntry);
  });
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}

/** Misafir defteri mesajını sil */
export async function deleteGuestbookEntry(id: string): Promise<boolean> {
  try {
    const docRef = doc(firestore, "guestbook", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

/** RSVP yanıtını sil */
export async function deleteRsvp(id: string): Promise<boolean> {
  try {
    const docRef = doc(firestore, "rsvp", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

/** WhatsApp Ayarları */
export async function getWhatsAppSettings(): Promise<WhatsAppSettings> {
  try {
    const docRef = doc(firestore, "settings", "minelmuhammed-wa-settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as WhatsAppSettings;
    } else {
      await setDoc(docRef, DEFAULT_WA_SETTINGS);
      return DEFAULT_WA_SETTINGS;
    }
  } catch (error) {
    return DEFAULT_WA_SETTINGS;
  }
}

export async function updateWhatsAppSettings(newSettings: Partial<WhatsAppSettings>): Promise<WhatsAppSettings> {
  const currentSettings = await getWhatsAppSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  const docRef = doc(firestore, "settings", "minelmuhammed-wa-settings");
  await setDoc(docRef, updatedSettings);
  return updatedSettings;
}

/** WhatsApp Misafirleri */
export async function getWhatsAppGuests(): Promise<WhatsAppGuest[]> {
  const ref = collection(firestore, "whatsapp_guests");
  const querySnapshot = await getDocs(ref);
  const result: WhatsAppGuest[] = [];
  querySnapshot.forEach((docSnap) => {
    result.push({ id: docSnap.id, ...docSnap.data() } as WhatsAppGuest);
  });
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}

export async function addWhatsAppGuest(entry: Omit<WhatsAppGuest, "id" | "createdAt" | "hash" | "sent" | "rsvpStatus">): Promise<WhatsAppGuest> {
  const ref = collection(firestore, "whatsapp_guests");
  
  // Create a random unique hash (e.g. k8x2p9)
  const hash = Math.random().toString(36).substring(2, 8);
  
  const docRef = await addDoc(ref, {
    ...entry,
    hash,
    sent: false,
    rsvpStatus: "none",
    createdAt: new Date().toISOString()
  });
  return {
    ...entry,
    id: docRef.id,
    hash,
    sent: false,
    rsvpStatus: "none",
    createdAt: new Date().toISOString()
  };
}

export async function updateWhatsAppGuest(id: string, updates: Partial<WhatsAppGuest>): Promise<boolean> {
  try {
    const docRef = doc(firestore, "whatsapp_guests", id);
    await updateDoc(docRef, updates);
    return true;
  } catch {
    return false;
  }
}

export async function deleteWhatsAppGuest(id: string): Promise<boolean> {
  try {
    const docRef = doc(firestore, "whatsapp_guests", id);
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
}

export async function getWhatsAppGuestByHash(hash: string): Promise<WhatsAppGuest | null> {
  const ref = collection(firestore, "whatsapp_guests");
  const q = query(ref, where("hash", "==", hash));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as WhatsAppGuest;
}


export async function updateGuestbookVisibility(id: string, isVisible: boolean): Promise<boolean> {
  try {
    const docRef = doc(firestore, "guestbook", id);
    await updateDoc(docRef, { isVisible });
    return true;
  } catch (error) {
    return false;
  }
}
