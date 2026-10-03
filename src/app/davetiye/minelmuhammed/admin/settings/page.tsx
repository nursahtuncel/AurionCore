"use client";

/**
 * Admin Ayarlar Sayfası — Davetiye bilgilerini düzenleme,
 * müzik seçimi, IBAN bilgileri, bölüm göster/gizle.
 */

import { useEffect, useState, useCallback } from "react";
import { AdminNavbar } from "../page";
import { Check, Music, Eye, EyeOff, Save } from "lucide-react";

// Hazır müzik listesi (client tarafı kopyası)
const PRESET_MUSIC = [
  { id: "masallah", title: "Mustafa Ceceli — Maşallah", file: "/davetiye/minelmuhammed/music/masallah.mp3" },
  { id: "ilahi1", title: "Sami Yusuf — Hasbi Rabbi", file: "/davetiye/minelmuhammed/music/hasbi-rabbi.mp3" },
  { id: "ilahi2", title: "Maher Zain — Baraka Allahu Lakuma", file: "/davetiye/minelmuhammed/music/baraka.mp3" },
  { id: "klasik1", title: "Klasik Ney — Hicaz Taksim", file: "/davetiye/minelmuhammed/music/ney-hicaz.mp3" },
  { id: "klasik2", title: "Piyano — Aşk", file: "/davetiye/minelmuhammed/music/piano-ask.mp3" },
];

// Section labels
const SECTION_LABELS: Record<string, string> = {
  countdown: "Geri Sayım",
  program: "Program Akışı",
  venue: "Mekân ve Harita",
  iban: "IBAN / Hediye Bilgisi",
  rsvp: "Katılım (LCV) Formu",
  guestbook: "Misafir Defteri",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const base = "/davetiye/minelmuhammed/admin/api";

  // Ayarları yükle
  useEffect(() => {
    fetch(`${base}/settings`)
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Toast göster
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Kaydet
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${base}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showToast("Kaydedildi ✓");
      } else {
        showToast("Kaydetme hatası!");
      }
    } catch {
      showToast("Bağlantı hatası!");
    } finally {
      setSaving(false);
    }
  };

  // Müzik önizleme
  const handlePreviewMusic = (file: string, id: string) => {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }
    if (playingId === id) {
      setPlayingId(null);
      return;
    }
    const audio = new Audio(file);
    audio.volume = 0.5;
    audio.play().catch(() => {});
    audio.onended = () => setPlayingId(null);
    setPreviewAudio(audio);
    setPlayingId(id);
  };

  // Ayar güncelleme yardımcısı
  const update = (key: string, value: any) => {
    setSettings((s: any) => ({ ...s, [key]: value }));
  };

  const updateEvent = (idx: number, key: string, value: string) => {
    setSettings((s: any) => {
      const events = [...s.events];
      events[idx] = { ...events[idx], [key]: value };
      return { ...s, events };
    });
  };

  const updateMusic = (key: string, value: any) => {
    setSettings((s: any) => ({ ...s, music: { ...s.music, [key]: value } }));
  };

  const updateIban = (key: string, value: string) => {
    setSettings((s: any) => ({ ...s, ibanInfo: { ...s.ibanInfo, [key]: value } }));
  };

  const toggleSection = (key: string) => {
    setSettings((s: any) => ({
      ...s,
      sections: { ...s.sections, [key]: !s.sections[key] },
    }));
  };

  if (loading || !settings) {
    return (
      <div className="admin-body">
        <AdminNavbar active="settings" />
        <div className="admin-container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ color: "#5A3E2B" }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <AdminNavbar active="settings" />

      <div className="admin-container">
        {/* ── Çift Bilgileri ── */}
        <div className="admin-card">
          <h3 className="admin-card-title">💑 Çift Bilgileri</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Gelin Adı</label>
              <input
                className="admin-input"
                value={settings.brideName}
                onChange={(e) => update("brideName", e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Gelin Tam Adı</label>
              <input
                className="admin-input"
                value={settings.brideFullName}
                onChange={(e) => update("brideFullName", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Damat Adı</label>
              <input
                className="admin-input"
                value={settings.groomName}
                onChange={(e) => update("groomName", e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Damat Tam Adı</label>
              <input
                className="admin-input"
                value={settings.groomFullName}
                onChange={(e) => update("groomFullName", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Davet Metni ── */}
        <div className="admin-card">
          <h3 className="admin-card-title">📜 Davet Metni</h3>

          <div className="admin-form-group">
            <label className="admin-label">Arapça Ayet</label>
            <textarea
              className="admin-textarea"
              value={settings.arabicVerse}
              onChange={(e) => update("arabicVerse", e.target.value)}
              rows={2}
              dir="rtl"
              style={{ fontFamily: "serif", fontSize: "1.1rem" }}
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Ayet Meali</label>
              <input
                className="admin-input"
                value={settings.arabicVerseTranslation}
                onChange={(e) => update("arabicVerseTranslation", e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Kaynak</label>
              <input
                className="admin-input"
                value={settings.arabicVerseSource}
                onChange={(e) => update("arabicVerseSource", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Davet Yazısı</label>
            <textarea
              className="admin-textarea"
              value={settings.invitationBody}
              onChange={(e) => update("invitationBody", e.target.value)}
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">İmza</label>
            <input
              className="admin-input"
              value={settings.invitationSignature}
              onChange={(e) => update("invitationSignature", e.target.value)}
            />
          </div>
        </div>

        {/* ── Etkinlikler ── */}
        {settings.events.map((ev: any, idx: number) => (
          <div className="admin-card" key={ev.id}>
            <h3 className="admin-card-title">
              {ev.type === "kina" ? "🕌" : "💒"} {ev.title}
            </h3>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Tarih</label>
                <input
                  className="admin-input"
                  value={ev.date}
                  onChange={(e) => updateEvent(idx, "date", e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tarih (ISO)</label>
                <input
                  className="admin-input"
                  type="date"
                  value={ev.dateISO}
                  onChange={(e) => updateEvent(idx, "dateISO", e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Başlangıç Saati</label>
                <input
                  className="admin-input"
                  type="time"
                  value={ev.startTime}
                  onChange={(e) => updateEvent(idx, "startTime", e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Bitiş Saati</label>
                <input
                  className="admin-input"
                  type="time"
                  value={ev.endTime || ""}
                  onChange={(e) => updateEvent(idx, "endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Mekan Adı</label>
              <input
                className="admin-input"
                value={ev.venueName}
                onChange={(e) => updateEvent(idx, "venueName", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Adres</label>
              <input
                className="admin-input"
                value={ev.address}
                onChange={(e) => updateEvent(idx, "address", e.target.value)}
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">İlçe / İl</label>
                <input
                  className="admin-input"
                  value={ev.district}
                  onChange={(e) => updateEvent(idx, "district", e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Google Maps Linki</label>
                <input
                  className="admin-input"
                  value={ev.googleMapsUrl}
                  onChange={(e) => updateEvent(idx, "googleMapsUrl", e.target.value)}
                />
              </div>
            </div>

            {ev.type === "dugun" && (
              <div className="admin-form-group">
                <label className="admin-label">Konvoy Saati</label>
                <input
                  className="admin-input"
                  type="time"
                  value={ev.convoyTime || ""}
                  onChange={(e) => updateEvent(idx, "convoyTime", e.target.value)}
                />
              </div>
            )}
          </div>
        ))}

        {/* ── IBAN ── */}
        <div className="admin-card">
          <h3 className="admin-card-title">🏦 IBAN / Hediye Bilgisi</h3>

          <div className="admin-form-group">
            <label className="admin-label">Banka Adı</label>
            <input
              className="admin-input"
              value={settings.ibanInfo.bankName}
              onChange={(e) => updateIban("bankName", e.target.value)}
              placeholder="Ziraat Bankası"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hesap Sahibi</label>
            <input
              className="admin-input"
              value={settings.ibanInfo.accountHolder}
              onChange={(e) => updateIban("accountHolder", e.target.value)}
              placeholder="Minel Şevval Gözükara"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">IBAN</label>
            <input
              className="admin-input"
              value={settings.ibanInfo.iban}
              onChange={(e) => updateIban("iban", e.target.value)}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
            />
          </div>
        </div>

        {/* ── Bölüm Göster/Gizle ── */}
        <div className="admin-card">
          <h3 className="admin-card-title">
            <Eye size={16} /> Bölüm Göster / Gizle
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#5A3E2B", marginBottom: "0.75rem" }}>
            Kapatılan bölümler davetiyede görünmez, içeriği silinmez.
          </p>

          {Object.entries(SECTION_LABELS).map(([key, label]) => (
            <div 
              className="admin-toggle-row" 
              key={key} 
              onClick={() => toggleSection(key)}
              style={{ cursor: "pointer" }}
            >
              <span className="admin-toggle-label">
                {settings.sections[key] ? (
                  <Eye size={14} style={{ marginRight: "0.35rem", verticalAlign: "middle", color: "#16a34a" }} />
                ) : (
                  <EyeOff size={14} style={{ marginRight: "0.35rem", verticalAlign: "middle", color: "#dc2626" }} />
                )}
                {label}
              </span>
              <button
                className={`admin-toggle ${settings.sections[key] ? "active" : ""}`}
                aria-label={`${label} göster/gizle`}
                onClick={(e) => {
                  // Prevent double toggling if clicked exactly on the button
                  e.stopPropagation();
                  toggleSection(key);
                }}
              />
            </div>
          ))}
        </div>

        {/* ── LCV Son Tarih ── */}
        <div className="admin-card">
          <h3 className="admin-card-title">📅 LCV Son Tarih</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Görünen Tarih</label>
              <input
                className="admin-input"
                value={settings.lcvDeadline}
                onChange={(e) => update("lcvDeadline", e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tarih (ISO)</label>
              <input
                className="admin-input"
                type="date"
                value={settings.lcvDeadlineISO}
                onChange={(e) => update("lcvDeadlineISO", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Kaydet Butonu ── */}
        <div style={{ position: "sticky", bottom: "1rem", marginTop: "1rem" }}>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ width: "100%" }}
          >
            <Save size={16} />
            {saving ? "Kaydediliyor..." : "Tüm Ayarları Kaydet"}
          </button>
        </div>
      </div>

      {/* Toast bildirimi */}
      {toast && (
        <div className="admin-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
