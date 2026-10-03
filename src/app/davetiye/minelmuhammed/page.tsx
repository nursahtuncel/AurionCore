"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Heart,
  Pause,
  Play,
  Volume2,
  VolumeX,
  MapPin,
  Navigation,
  CalendarPlus,
  Clock,
  Send,
  Copy,
  Check,
  Sparkles,
  Car,
} from "lucide-react";
import confetti from "canvas-confetti";

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function formatDateTR(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildGoogleCalUrl(e: any) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const d = new Date(e.dateISO);
  const ds =
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${e.startTime.replace(":", "")}00`;
  
  let de = "";
  if (e.endTime) {
    de = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${e.endTime.replace(":", "")}00`;
  } else {
    const [sh, sm] = e.startTime.split(":").map(Number);
    const endH = (sh + 1) % 24;
    de = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(endH)}${pad(sm)}00`;
  }
  const title = encodeURIComponent(`${e.title} — Minel & Muhammed`);
  const loc = encodeURIComponent(`${e.venueName}, ${e.address}, ${e.district}`);
  const details = encodeURIComponent(`Harita: ${e.googleMapsUrl}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${ds}/${de}&location=${loc}&details=${details}&ctz=Europe/Istanbul`;
}

function downloadIcs(e: any) {
  const [sh, sm] = e.startTime.split(":").map(Number);
  
  let eh = sh + 1, em = sm;
  if (e.endTime) {
    const parts = e.endTime.split(":");
    eh = Number(parts[0]);
    em = Number(parts[1]);
  }
  const d = new Date(e.dateISO);
  const pad = (n: number) => String(n).padStart(2, "0");
  const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aurion Core//Davetiye//TR",
    "BEGIN:VEVENT",
    `SUMMARY:${e.title} — Minel & Muhammed`,
    `DTSTART;TZID=Europe/Istanbul:${ymd}T${pad(sh)}${pad(sm)}00`,
    `DTEND;TZID=Europe/Istanbul:${ymd}T${pad(eh)}${pad(em)}00`,
    `LOCATION:${e.venueName}\\, ${e.address}\\, ${e.district}`,
    `DESCRIPTION:Harita: ${e.googleMapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${e.id}-minel-muhammed.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────
// Countdown
// ─────────────────────────────────────────────────────────

function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = +new Date(targetISO) - +new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}

// ─────────────────────────────────────────────────────────
// ScrollReveal hook
// ─────────────────────────────────────────────────────────

function useReveal(deps: any[] = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".d-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ─────────────────────────────────────────────────────────
// Cover / Envelope Screen
// ─────────────────────────────────────────────────────────

function CoverScreen({ onPlayStart, onClose, data }: { onPlayStart: () => void; onClose: () => void; data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPlayStart(); // Müzik eşzamanlı başlar
    
    // Zarf açılma animasyonları sekansı
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#D4AF37", "#C9A84C", "#FFFFFF", "#8A6D2C"],
        zIndex: 2147483647
      });
      setFading(true);
      setTimeout(() => {
        onClose();
      }, 1600);
    }, 3200); // 2000'den 3200'e çıkarıldı
  };

  // Zarf kağıdı dokusu (hafif bir CSS deseniyle gerçekçi kağıt hissi)
  const paperStyle = {
    backgroundColor: "#F4F0EA",
    backgroundImage: "url('/davetiye/minelmuhammed/envelope-texture.jpg')",
    backgroundSize: "200px",
    backgroundBlendMode: "multiply",
  } as React.CSSProperties;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        width: "100vw",
        height: "100dvh",
        backgroundColor: "var(--d-cream)",
        backgroundImage: "url('/davetiye/minelmuhammed/couple.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: fading ? "opacity 1.6s ease, visibility 1.6s ease" : undefined,
        opacity: fading ? 0 : 1,
        visibility: fading ? "hidden" : "visible",
        pointerEvents: fading ? "none" : "auto",
        perspective: "1200px"
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(30, 25, 20, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }} />

      {/* Zarf Konteyneri - Dikey (Portrait) */}
      <div 
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: "380px",
          aspectRatio: "0.68",
          cursor: isOpen ? "default" : "pointer",
          zIndex: 2,
          transform: isOpen ? "scale(1.05) translateY(40px)" : "scale(1)",
          transition: "transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)", // 1.8s -> 2.5s
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
        }}
        onClick={handleClick}
      >
         {/* Zarfın Arka Yüzü (İç kısmı) */}
         <div style={{
           position: "absolute", inset: 0,
           backgroundColor: "#D0C4B4",
           backgroundImage: "url('/davetiye/minelmuhammed/envelope-texture.jpg')",
           backgroundSize: "200px",
           backgroundBlendMode: "multiply",
           borderRadius: "4px",
           boxShadow: "inset 0 10px 20px rgba(0,0,0,0.2)",
         }} />

         {/* İçindeki Kart */}
         <div style={{
           position: "absolute",
           inset: "15px",
           backgroundColor: "#FAF7F2",
           borderRadius: "4px",
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           transform: isOpen ? "translateY(-160px)" : "translateY(0)",
           transition: "transform 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s", // Daha yavaş çıkış
           boxShadow: "0 -4px 15px rgba(0,0,0,0.15)",
           zIndex: isOpen ? 3 : 1
         }}>
            <p className="d-script" style={{ color: "var(--d-gold-dark)", fontSize: "3.5rem", lineHeight: 1 }}>
              Davetiye
            </p>
            <p className="d-sans" style={{ color: "var(--d-espresso)", fontSize: "0.9rem", letterSpacing: "0.2em", marginTop: "1rem", textTransform: "uppercase", textAlign: "center" }}>
              Minel<br />&<br />Muhammed
            </p>
         </div>

         {/* Sol Kanat */}
         <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "drop-shadow(3px 0 6px rgba(0,0,0,0.15))" }}>
           <div style={{
             position: "absolute", inset: 0,
             clipPath: "polygon(0 0, 52% 52%, 0 100%)",
             borderRadius: "4px 0 0 4px",
             ...paperStyle
           }} />
         </div>
         
         {/* Sağ Kanat */}
         <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "drop-shadow(-3px 0 6px rgba(0,0,0,0.15))" }}>
           <div style={{
             position: "absolute", inset: 0,
             clipPath: "polygon(100% 0, 48% 52%, 100% 100%)",
             borderRadius: "0 4px 4px 0",
             ...paperStyle
           }} />
         </div>

         {/* Alt Kanat */}
         <div style={{ position: "absolute", inset: 0, zIndex: 3, filter: "drop-shadow(0 -4px 8px rgba(0,0,0,0.15))" }}>
           <div style={{
             position: "absolute", inset: 0,
             clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
             borderRadius: "0 0 4px 4px",
             ...paperStyle
           }} />
           
           {/* Zarfın Üzerindeki Yazı (Sadece açılmadan önce görünür) */}
           <div style={{
             position: "absolute", bottom: "10%", left: 0, right: 0,
             textAlign: "center",
             opacity: isOpen ? 0 : 1,
             transition: "opacity 0.4s",
           }}>
             <p className="d-script" style={{ color: "var(--d-gold-dark)", fontSize: "2.5rem", lineHeight: 1, textShadow: "1px 1px 0px rgba(255,255,255,0.8)" }}>
               Davetiye
             </p>
             <p className="d-sans" style={{ color: "var(--d-espresso)", fontSize: "0.75rem", letterSpacing: "0.1em", marginTop: "0.5rem" }}>
               Açmak için mühre dokunun
             </p>
           </div>
         </div>

         {/* Üst Kanat (Kapak) */}
         <div style={{ 
           position: "absolute", inset: 0, zIndex: isOpen ? 0 : 4,
           transformOrigin: "top",
           transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
           transition: "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.6s", // Daha yavaş açılma
           filter: isOpen ? "none" : "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
         }}>
           <div style={{
             position: "absolute", inset: 0,
             clipPath: "polygon(0 0, 50% 52%, 100% 0)",
             borderRadius: "4px 4px 0 0",
             ...paperStyle
           }} />
         </div>

         {/* Mühür */}
         <div style={{
           position: "absolute",
           top: "52%", left: "50%",
           transform: `translate(-50%, -50%) scale(${isOpen ? 0 : 1})`,
           opacity: isOpen ? 0 : 1,
           transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", // Daha yavaş silinme
           zIndex: 5,
           width: "clamp(70px, 20vw, 90px)",
           aspectRatio: "1",
           borderRadius: "50%",
           background: "radial-gradient(circle at 35% 35%, #F4D068 0%, #AA771C 40%, #5C3A00 80%, #301E00 100%)",
           boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 4px 10px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(0,0,0,0.8)",
           display: "flex", alignItems: "center", justifyContent: "center",
           border: "1px solid rgba(255,255,255,0.2)"
         }}>
           <div style={{
             width: "78%", height: "78%", borderRadius: "50%",
             border: "2px solid rgba(138, 109, 44, 0.7)",
             boxShadow: "inset 0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(255,255,255,0.5)",
             display: "flex", alignItems: "center", justifyContent: "center",
             background: "radial-gradient(circle at 50% 50%, #AA771C 0%, #8A5A19 100%)"
           }}>
             <span className="d-script" style={{
               color: "#F4D068", fontSize: "clamp(2rem, 5vw, 3rem)",
               textShadow: "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.4)",
               lineHeight: 1, transform: "translateY(-2px)"
             }}>M</span>
           </div>
         </div>
      </div>
    </div>
  );
}

function MusicPlayer({
  audioRef,
  isPlaying,
  onToggle,
  hasError,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onToggle: () => void;
  hasError: boolean;
}) {
  if (hasError) return null;

  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Müziği durdur" : "Müziği çal"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 8000,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--d-espresso)",
        border: "1px solid var(--d-gold)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--d-gold)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.2s ease",
      }}
    >
      {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ transform: "translateX(1px)" }} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// Section label helper
// ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
      <div style={{ height: "1px", width: "30px", background: "var(--d-gold)" }} />
      <p
        className="d-sans"
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--d-gold-dark)",
          fontWeight: 600,
          margin: 0
        }}
      >
        {children}
      </p>
      <div style={{ height: "1px", width: "30px", background: "var(--d-gold)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Countdown Block
// ─────────────────────────────────────────────────────────

function CountdownSection({ data }: { data: any }) {
  const dugun = data.events.find((e: any) => e.type === "dugun")!;
  const t = useCountdown(`${dugun.dateISO}T${dugun.startTime}:00+03:00`);

  const blocks = [
    { label: "GÜN", value: t.d },
    { label: "SAAT", value: t.h },
    { label: "DAKİKA", value: t.m },
    { label: "SANİYE", value: t.s },
  ];

  return (
    <section className="d-section d-reveal" style={{ textAlign: "center" }}>
      <SectionLabel>Düğünümüze Kalan Süre</SectionLabel>
      <h2
        className="d-serif"
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
          color: "var(--d-espresso)",
          marginBottom: "2rem",
          fontWeight: 500,
        }}
      >
        Büyük Gün
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.625rem",
          maxWidth: "480px",
          margin: "0 auto 2.5rem",
        }}
      >
        {blocks.map((b) => (
          <div
            key={b.label}
            style={{
              padding: "1rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid var(--d-gold)",
              borderRadius: "8px",
              background: "transparent",
            }}
          >
            <span
              className="d-serif"
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                color: "var(--d-espresso)",
                lineHeight: 1,
              }}
            >
              {String(b.value).padStart(2, "0")}
            </span>
            <span
              className="d-sans"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "var(--d-brown)",
                marginTop: "0.5rem",
                textTransform: "uppercase",
              }}
            >
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          justifyContent: "center",
        }}
      >
        <a
          href={buildGoogleCalUrl(dugun)}
          target="_blank"
          rel="noopener noreferrer"
          className="d-btn-outline"
          aria-label="Düğünü Google Takvim'e ekle"
        >
          <CalendarPlus size={14} />
          <span>Google Takvim</span>
        </a>
        <button
          className="d-btn-outline"
          onClick={() => downloadIcs(dugun)}
          aria-label="Düğünü Apple Takvim'e ekle (.ics)"
        >
          <CalendarPlus size={14} />
          <span>Apple Takvim (.ics)</span>
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Event Card
// ─────────────────────────────────────────────────────────

function EventCard({ event }: { event: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddr = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.address}, ${event.district}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const accent = event.type === "kina" ? "var(--d-rose)" : "var(--d-gold)";

  return (
    <div
      className="d-card"
      style={{
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        borderTop: `1px solid ${accent}`,
        borderRadius: "4px",
      }}
    >
      {/* Badge + Time */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span
          className="d-sans"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "var(--d-cream-dark)",
            color: "var(--d-espresso)",
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            border: `1px solid ${accent}`
          }}
        >
          {event.title}
        </span>
        <span className="d-sans" style={{ fontSize: "0.85rem", color: "var(--d-brown)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Clock size={14} color={accent} />
          {event.startTime}
          {event.endTime ? ` – ${event.endTime}` : ""}
        </span>
      </div>

      {/* Venue & Date */}
      <div>
        <h3 className="d-serif" style={{ fontSize: "clamp(1.4rem, 5vw, 1.8rem)", fontWeight: 500, color: "var(--d-espresso)", lineHeight: 1.2 }}>
          {event.venueName}
        </h3>
        {event.venueSubtitle && (
          <p className="d-serif" style={{ fontSize: "1rem", color: "var(--d-brown)", marginTop: "0.3rem", fontStyle: "italic" }}>
            {event.venueSubtitle}
          </p>
        )}
        <p className="d-sans" style={{ fontSize: "0.8rem", color: accent, marginTop: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {formatDateTR(event.dateISO)}
        </p>
      </div>

      {/* Address */}
      <div
        style={{
          background: "var(--d-cream)",
          border: "1px solid var(--d-gold-light)",
          borderRadius: "4px",
          padding: "1rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}
      >
        <MapPin size={16} color="var(--d-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div className="d-sans" style={{ fontSize: "0.85rem", color: "var(--d-espresso)", lineHeight: 1.6 }}>
          <div>{event.address}</div>
          <div style={{ color: "var(--d-brown)", marginTop: "0.2rem" }}>{event.district}</div>
        </div>
      </div>

      {/* Convoy note */}
      {event.convoyTime && (
        <div
          className="d-sans"
          style={{
            fontSize: "0.8rem",
            color: "var(--d-brown)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--d-cream-dark)",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            border: "1px solid var(--d-gold-light)",
          }}
        >
          <Car size={15} color="var(--d-gold)" />
          <span>Konvoy hareket saati: <strong style={{fontWeight: 500}}>{event.convoyTime}</strong></span>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "0.5rem" }}>
        <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="d-btn-dark" aria-label="Haritada Aç">
          <Navigation size={14} color="var(--d-gold-light)" />
          <span>Haritada Aç</span>
        </a>
        <button className="d-btn-outline" onClick={handleCopyAddr} aria-label="Adresi kopyala">
          {copied ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
          <span>{copied ? "Kopyalandı!" : "Adresi Kopyala"}</span>
        </button>
        <a href={buildGoogleCalUrl(event)} target="_blank" rel="noopener noreferrer" className="d-btn-outline" aria-label="Google Takvim'e ekle">
          <CalendarPlus size={13} />
          <span>Google Takvim</span>
        </a>
        <button className="d-btn-outline" onClick={() => downloadIcs(event)} aria-label="Apple Takvim (.ics) indir">
          <CalendarPlus size={13} />
          <span>Apple Takvim</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// RSVP / LCV Section
// ─────────────────────────────────────────────────────────

type Attending = "yes" | "no";

interface RsvpState {
  name: string;
  phone: string;
  attending: Attending;
  ceremony: string;
  count: string;
  children: string;
  note: string;
  kvkk: boolean;
}

function LcvSection({ guestName, guestHash, data }: { guestName?: string; guestHash?: string; data: any }) {
  const [form, setForm] = useState<RsvpState>({
    name: guestName ?? "",
    phone: "",
    attending: "yes",
    ceremony: "dugun",
    count: "1",
    children: "0",
    note: "",
    kvkk: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [showKvkk, setShowKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (guestName) setForm((f) => ({ ...f, name: guestName }));
  }, [guestName]);

  const update = (k: keyof RsvpState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) {
      alert("Lütfen aydınlatma metnini onaylayınız.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/davetiye/minelmuhammed/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          attending: form.attending,
          ceremony: form.ceremony,
          count: form.count,
          children: form.children,
          note: form.note,
          hash: guestHash,
        }),
      });
      setSubmitted(true);
      localStorage.setItem("lcv_minel_muhammed", JSON.stringify({ ...form, submittedAt: Date.now() }));
    } catch {
      // sessiz hata
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = () => {
    const saved = localStorage.getItem("lcv_minel_muhammed");
    if (saved) {
      const data = JSON.parse(saved);
      setForm({ ...form, ...data });
    }
    setSubmitted(false);
  };

  if (submitted) {
    let summary = "Katılamayacağım";
    if (form.attending === "yes") {
      const cerMap: Record<string, string> = { dugun: "Düğün", kina: "Kına", ikisi: "Düğün ve Kına" };
      const childStr = form.children === "0" ? "" : `, ${form.children} çocuk`;
      summary = `Katılacağım • ${cerMap[form.ceremony]} • ${form.count} yetişkin${childStr}`;
    }

    return (
      <div className="d-card d-reveal" style={{ padding: "2.5rem 2rem", textAlign: "center", borderRadius: "4px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "var(--d-cream-dark)",
            border: "1px solid var(--d-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <Check size={28} color="var(--d-gold-dark)" />
        </div>
        <h3 className="d-serif" style={{ fontSize: "1.6rem", color: "var(--d-espresso)", marginBottom: "0.5rem" }}>
          Teşekkür ederiz, {form.name}!
        </h3>
        <p className="d-serif" style={{ fontSize: "1.1rem", color: "var(--d-brown)", maxWidth: "360px", margin: "0 auto", fontStyle: "italic" }}>
          {form.attending === "yes"
            ? `Katılım bildiriminiz alındı. Sizi aramızda görmekten mutluluk duyacağız!`
            : "Yanıtınız için teşekkür ederiz. Dualarınızla yanımızda olduğunuzu biliyoruz."}
        </p>
        
        <p className="d-sans" style={{ fontSize: "0.8rem", color: "var(--d-gold)", marginTop: "1.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <strong>Özet:</strong> {summary}
        </p>

        <button
          className="d-btn-outline"
          style={{ marginTop: "1.5rem" }}
          onClick={handleUpdate}
        >
          Yanıtımı Güncelle
        </button>
      </div>
    );
  }

  const isAttending = form.attending === "yes";

  return (
    <div className="d-card d-reveal" style={{ padding: "2.5rem 1.5rem", borderRadius: "4px" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <SectionLabel>Katılım Bildirimi</SectionLabel>
        <h2
          className="d-script"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--d-espresso)" }}
        >
          Lütfen Cevap Veriniz
        </h2>
        <p
          className="d-sans"
          style={{ fontSize: "0.85rem", color: "var(--d-brown)", marginTop: "0.75rem", maxWidth: "380px", margin: "0.75rem auto 0" }}
        >
          Hazırlıklarımızı eksiksiz yapabilmemiz için lütfen en geç{" "}
          <strong style={{fontWeight: 500, color: "var(--d-espresso)"}}>{formatDateTR(data.lcvDeadlineISO)}</strong> tarihine kadar yanıtlayınız.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Attending choice - Elegant Radio Boxes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {(["yes", "no"] as Attending[]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => update("attending", val)}
              style={{
                padding: "1rem 0.5rem",
                borderRadius: "4px",
                border: `1px solid ${form.attending === val ? "var(--d-gold)" : "var(--d-gold-light)"}`,
                background: form.attending === val ? "var(--d-espresso)" : "var(--d-cream)",
                color: form.attending === val ? "var(--d-cream)" : "var(--d-brown)",
                fontFamily: "var(--d-font-sans)",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: form.attending === val ? "0 4px 12px rgba(59,42,32,0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
              }}
              aria-pressed={form.attending === val}
            >
              {val === "yes" ? (
                <><Heart size={14} fill={form.attending === "yes" ? "var(--d-gold)" : "none"} color={form.attending === "yes" ? "var(--d-gold)" : "var(--d-brown)"} />Katılıyorum</>
              ) : (
                <span>Katılamıyorum</span>
              )}
            </button>
          ))}
        </div>

        {/* Name */}
        <input
          className="d-input"
          type="text"
          placeholder={guestName ? guestName : "Değerli misafirimiz (Adınız ve soyadınız)"}
          value={form.name}
          required
          onChange={(e) => update("name", e.target.value)}
          aria-label="Ad soyad"
        />

        {/* Phone */}
        <input
          className="d-input"
          type="tel"
          placeholder="Telefon (opsiyonel)"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-label="Telefon numarası"
        />

        {/* Fields shown only if attending */}
        {isAttending && (
          <>
            <select
              className="d-input"
              value={form.ceremony}
              onChange={(e) => update("ceremony", e.target.value)}
              aria-label="Hangi merasime katılacaksınız"
              style={{ appearance: "auto" }}
            >
              <option value="dugun">Düğün (31 Ekim)</option>
              <option value="kina">Kına (28 Ekim)</option>
              <option value="ikisi">Her İkisi</option>
            </select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <select
                className="d-input"
                value={form.count}
                onChange={(e) => update("count", e.target.value)}
                aria-label="Gelecek yetişkin sayısı"
                style={{ appearance: "auto" }}
              >
                {["1", "2", "3", "4", "5+"].map((v) => (
                  <option key={v} value={v}>{v} Yetişkin</option>
                ))}
              </select>
              <select
                className="d-input"
                value={form.children}
                onChange={(e) => update("children", e.target.value)}
                aria-label="Gelecek çocuk sayısı"
                style={{ appearance: "auto" }}
              >
                {["0", "1", "2", "3", "4+"].map((v) => (
                  <option key={v} value={v}>{v} Çocuk</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Note */}
        <textarea
          className="d-textarea"
          rows={3}
          placeholder="Notunuz veya özel isteğiniz (alerji, özel durum vb.)"
          value={form.note}
          onChange={(e) => update("note", e.target.value)}
          aria-label="Notunuz"
        />

        {/* KVKK */}
        <label
          className="d-sans"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.6rem",
            fontSize: "0.75rem",
            color: "var(--d-brown)",
            cursor: "pointer",
            lineHeight: 1.6,
          }}
        >
          <input
            type="checkbox"
            checked={form.kvkk}
            onChange={(e) => update("kvkk", e.target.checked)}
            required
            style={{ marginTop: "3px", accentColor: "var(--d-gold)", cursor: "pointer" }}
          />
          <span>
            Paylaştığım ad, katılım durumu, telefon ve mesaj bilgilerinin yalnızca düğün
            organizasyonu amacıyla işleneceğini okudum, onaylıyorum.{" "}
            <button
              type="button"
              style={{ color: "var(--d-gold-dark)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", padding: 0 }}
              onClick={() => setShowKvkk(true)}
            >
              Aydınlatma Metni
            </button>
          </span>
        </label>

        <button
          className="d-btn-dark"
          type="submit"
          disabled={!form.kvkk || submitting}
          style={{ width: "100%", opacity: form.kvkk ? 1 : 0.5, marginTop: "0.5rem" }}
          aria-label="Bildirimi gönder"
        >
          <Send size={15} />
          <span>{submitting ? "Gönderiliyor..." : "LCV Gönder"}</span>
        </button>
      </form>

      {/* KVKK Modal */}
      {showKvkk && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 9500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowKvkk(false)}
        >
          <div
            className="d-card"
            style={{ maxWidth: "480px", padding: "2rem", maxHeight: "80vh", overflowY: "auto", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="d-serif" style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "var(--d-espresso)" }}>
              Kişisel Veri Aydınlatma Metni
            </h3>
            <p className="d-sans" style={{ fontSize: "0.85rem", color: "var(--d-brown)", lineHeight: 1.7 }}>
              Bu form aracılığıyla toplanan <strong>ad-soyad, katılım durumu, telefon numarası ve mesaj</strong>{" "}
              bilgileri, yalnızca <strong>Minel & Muhammed düğün organizasyonunun</strong> planlanması
              ve yönetilmesi amacıyla işlenmektedir. Bilgileriniz üçüncü taraflarla paylaşılmamakta
              ve etkinlik sonrası silinmektedir. KVKK kapsamında erişim, düzeltme ve silme haklarınız
              saklıdır.
            </p>
            <button
              className="d-btn-dark"
              style={{ marginTop: "1.5rem", width: "100%" }}
              onClick={() => setShowKvkk(false)}
            >
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Guestbook
// ─────────────────────────────────────────────────────────

function GuestbookSection() {
  const [entries, setEntries] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Mesajları API'den yükle
  useEffect(() => {
    fetch("/davetiye/minelmuhammed/api/guestbook")
      .then((r) => r.json())
      .then((data) => setEntries(data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/davetiye/minelmuhammed/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: msg.trim() }),
      });
      if (res.ok) {
        const { entry } = await res.json();
        setEntries((prev) => [entry, ...prev]);
      }
    } catch { /* sessiz hata */ }
    setSubmitting(false);
    setSent(true);
    setName("");
    setMsg("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="d-section d-reveal" style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <SectionLabel>Sevgi &amp; Dilekler</SectionLabel>
        <h2
          className="d-script"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--d-espresso)" }}
        >
          Dua &amp; Tebrik Duvarı
        </h2>
        <div className="d-divider" style={{ marginTop: "1rem" }}>
          <Heart size={14} fill="var(--d-gold)" color="var(--d-gold)" />
        </div>
      </div>

      {/* Write message */}
      {sent ? (
        <div
          className="d-card"
          style={{ padding: "2.5rem", textAlign: "center", marginBottom: "1.5rem", borderRadius: "4px" }}
        >
          <p className="d-serif" style={{ fontSize: "1.3rem", color: "var(--d-espresso)", fontStyle: "italic" }}>
            Mesajınız alındı! Onaylandıktan sonra yayınlanacak. ✨
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="d-card"
          style={{ padding: "2rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem", borderRadius: "4px" }}
        >
          <input
            className="d-input"
            type="text"
            placeholder="Adınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Adınız"
          />
          <div style={{ position: "relative" }}>
            <textarea
              className="d-textarea"
              rows={4}
              placeholder="Güzel dileklerinizi yazın…"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              maxLength={500}
              required
              aria-label="Mesajınız"
            />
            <span
              className="d-sans"
              style={{
                position: "absolute",
                bottom: "0.75rem",
                right: "0.75rem",
                fontSize: "0.7rem",
                color: msg.length >= 500 ? "#ef4444" : "var(--d-brown)",
              }}
            >
              {msg.length}/500
            </span>
          </div>
          <p
            className="d-sans"
            style={{ fontSize: "0.75rem", color: "var(--d-brown)", textAlign: "center", marginTop: "-0.5rem" }}
          >
            Mesajınız onaylandıktan sonra yayınlanır.
          </p>
          <button className="d-btn-dark" type="submit" aria-label="Mesaj gönder" disabled={submitting}>
            <Send size={15} />
            <span>{submitting ? "Gönderiliyor..." : "Deftere Yaz"}</span>
          </button>
        </form>
      )}

      {/* Existing approved messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="d-card d-msg-new"
            style={{ padding: "1.5rem", borderRadius: "4px", border: "1px solid var(--d-gold-light)", background: "var(--d-cream)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "center" }}>
              <span className="d-serif" style={{ fontWeight: 600, fontSize: "1.2rem", color: "var(--d-espresso)" }}>
                <Heart size={14} fill="var(--d-gold-dark)" color="var(--d-gold-dark)" style={{ marginRight: "0.4rem" }} />
                {entry.name}
              </span>
              <span className="d-sans" style={{ fontSize: "0.75rem", color: "var(--d-brown)", letterSpacing: "0.05em" }}>
                {formatDateTR(entry.createdAt)}
              </span>
            </div>
            <p
              className="d-serif"
              style={{ fontSize: "1.1rem", color: "var(--d-espresso)", lineHeight: 1.7, fontStyle: "italic" }}
            >
              &ldquo;{entry.message}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────

export default function DavetiyeMinelMuhammedPage() {
  const [coverVisible, setCoverVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [data, setData] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [ibanCopied, setIbanCopied] = useState(false);

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 2500);
  };

  // Ayarları API'den yükle
  useEffect(() => {
    fetch("/davetiye/minelmuhammed/api/settings")
      .then((r) => r.json())
      .then((d) => { setData(d); setDataLoaded(true); })
      .catch(() => setDataLoaded(true));
  }, []);

  // Guest name from URL param (?m=hash)
  const [guestName, setGuestName] = useState("");
  const [guestGreeting, setGuestGreeting] = useState("");
  const [guestHash, setGuestHash] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("m");
    if (m) {
      setGuestHash(m);
      fetch(`/davetiye/minelmuhammed/api/guest?m=${m}`)
        .then((r) => r.json())
        .then((g) => {
          if (g.name) {
            setGuestName(g.name);
            setGuestGreeting(g.greeting);
          }
        })
        .catch(() => {});
    } else {
      // Fallback to old ?misafir= param just in case
      const oldM = params.get("misafir");
      if (oldM) setGuestName(decodeURIComponent(oldM));
    }
  }, []);

  // ScrollReveal
  useReveal([dataLoaded, coverVisible]);

  // Müzik URL'sini belirle
  const musicUrl = data?.music?.enabled
    ? (data.music.source === "custom" && data.music.customUrl
        ? data.music.customUrl
        : `/davetiye/minelmuhammed/music/${data.music.presetId || "masallah"}.mp3`)
    : "";

  // Audio setup
  useEffect(() => {
    if (!dataLoaded || !data?.music?.enabled || !musicUrl) return;
    const audio = new Audio();
    audio.src = musicUrl;
    audio.loop = data.music.loop;
    audio.volume = 0;
    audio.preload = "auto";
    audio.currentTime = 18; // Start at 18 seconds
    audioRef.current = audio;

    audio.addEventListener("error", () => setAudioError(true));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [dataLoaded, musicUrl]);

  // Tab visibility: pause/resume
  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (isPlaying) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  // Fade in audio
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !data?.music) return;
    const targetVol = data.music.volume;
    audio.volume = 0;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(audioRef.current.volume + 0.04, targetVol);
      audioRef.current.volume = next;
      if (next >= targetVol && fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, 80);
  }, [data?.music?.volume]);

  const handleMusicStart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeIn();
      })
      .catch(() => {});
  }, [fadeIn]);

  const handleCoverClose = useCallback(() => {
    setCoverVisible(false);
  }, []);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          if (audio.volume < 0.1) fadeIn();
        })
        .catch(() => {});
    }
  };

  // Yükleniyor durumu
  if (!dataLoaded || !data) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F2" }}>
        <p style={{ color: "#5A3E2B", fontFamily: "var(--d-font-sans)" }}>Yükleniyor...</p>
      </div>
    );
  }

  // Kısayol: bölüm görünürlüğü
  const sec = data.sections || {};

  return (
    <>
      {/* Cover screen */}
      {coverVisible && <CoverScreen onPlayStart={handleMusicStart} onClose={handleCoverClose} data={data} />}

      {/* Floating player — sadece müzik açıksa */}
      {data.music.enabled && (
        <MusicPlayer
          audioRef={audioRef}
          isPlaying={isPlaying}
          onToggle={handleTogglePlay}
          hasError={audioError}
        />
      )}

      {/* Main content */}
      <main
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 0 6rem",
        }}
      >
        {/* ── Hero ── */}
        <section className="d-section" style={{ position: "relative", textAlign: "center" }}>
          
          {/* Bismillah Text at top */}
          <div className="d-reveal d-arabic" style={{ fontSize: "1.75rem", color: "var(--d-gold-dark)", marginBottom: "1.5rem" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          
          {/* Decorative monogram (Solid Gold Circle) */}
          <div
            className="d-reveal d-float"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--d-gold-light) 0%, var(--d-gold) 50%, var(--d-gold-dark) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              boxShadow: "0 4px 12px rgba(184, 146, 74, 0.2)",
            }}
          >
            <span
              className="d-serif"
              style={{ fontSize: "1.2rem", color: "var(--d-cream)", fontWeight: 600, letterSpacing: "1px" }}
            >
              M&M
            </span>
          </div>

          {/* Guest greeting & Name */}
          {guestGreeting && sec.greeting !== false ? (
            <p
              className="d-sans d-reveal"
              style={{
                fontSize: "1rem",
                color: "#C9A84C", // Lüks altın rengi
                marginBottom: "1rem",
                fontWeight: 600,
                padding: "0 1rem"
              }}
            >
              {guestGreeting}
            </p>
          ) : null}

          {guestName && sec.greeting !== false ? (
            <p
              className="d-sans d-reveal"
              style={{
                fontSize: "0.85rem",
                color: "#5A3E2B", // Yumuşak kahverengi
                marginBottom: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              Sayın Misafirimiz: <strong>{guestName}</strong>
            </p>
          ) : null}

          {/* Names in elegant serif */}
          <h1
            className="d-serif d-reveal"
            style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", color: "var(--d-espresso)", lineHeight: 1.1, fontWeight: 500 }}
          >
            {data.brideName.split(" ")[0]}
          </h1>

          <div
            className="d-reveal"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5rem 0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--d-gold)">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </div>

          <h1
            className="d-serif d-reveal"
            style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", color: "var(--d-espresso)", lineHeight: 1.1, fontWeight: 500 }}
          >
            {data.groomName.split(" ")[0]}
          </h1>

          {/* Kına / Düğün badges - Dotted style like image */}
          <div
            className="d-reveal d-sans"
            style={{
              marginTop: "1.5rem",
              fontSize: "clamp(0.7rem, 2.5vw, 0.8rem)",
              color: "var(--d-espresso)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontWeight: 500
            }}
          >
            <span>28 EKİM ÇARŞAMBA</span>
            <span style={{color: "var(--d-gold)"}}>•</span>
            <span>31 EKİM CUMARTESİ</span>
          </div>

          {/* Arched Image Frame */}
          <div 
            className="d-reveal"
            style={{
              marginTop: "3rem",
              marginInline: "auto",
              width: "100%",
              maxWidth: "280px",
              aspectRatio: "2/3",
              border: "1px solid var(--d-gold-light)",
              borderRadius: "140px 140px 0 0",
              padding: "0.5rem",
              boxShadow: "0 10px 30px rgba(90, 62, 43, 0.05)",
              overflow: "hidden"
            }}
          >
            <div
              className="d-slow-zoom"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "140px 140px 0 0",
                background: "url('/davetiye/minelmuhammed/couple.jpg') center/cover",
                position: "relative"
              }}
            >
              {/* Optional: Add a subtle overlay for romance */}
              <div style={{position: "absolute", inset: 0, background: "rgba(250,246,239,0.1)"}}></div>
            </div>
          </div>
        </section>

        {/* ── Arabic Verse ── */}
        <section
          className="d-section d-reveal"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Corner ornament (top-left, top-right) */}
          <div
            style={{
              background: "var(--d-cream-dark)",
              border: "1px solid var(--d-gold)",
              boxShadow: "0 0 0 4px var(--d-cream), 0 0 0 5px var(--d-gold-light)", // Double gold border trick
              borderRadius: "4px", // Print cards usually aren't too rounded
              padding: "2.5rem 1.5rem",
              position: "relative",
            }}
          >
            {/* Corner SVG accents */}
            {["tl", "tr", "bl", "br"].map((corner) => (
              <svg
                key={corner}
                width="24"
                height="24"
                viewBox="0 0 32 32"
                style={{
                  position: "absolute",
                  top: corner.startsWith("t") ? "12px" : "auto",
                  bottom: corner.startsWith("b") ? "12px" : "auto",
                  left: corner.endsWith("l") ? "12px" : "auto",
                  right: corner.endsWith("r") ? "12px" : "auto",
                  opacity: 0.6,
                  transform: `rotate(${corner === "tr" ? 90 : corner === "br" ? 180 : corner === "bl" ? 270 : 0}deg)`,
                }}
              >
                <path d="M2 2 L14 14" stroke="var(--d-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M14 2 L2 14" stroke="var(--d-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="8" cy="8" r="2" fill="var(--d-gold-dark)" />
              </svg>
            ))}

            {/* Arabic text */}
            <p
              className="d-arabic"
              style={{
                fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
                lineHeight: 1.8,
                color: "var(--d-espresso)",
                marginBottom: "0.75rem",
                whiteSpace: "pre-line",
              }}
            >
              {data.arabicVerse}
            </p>

            <div className="d-divider" style={{ margin: "1.2rem auto" }}>
              <Heart size={10} color="var(--d-gold)" fill="var(--d-gold)" />
            </div>

            <p
              className="d-serif"
              style={{
                fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
                fontStyle: "italic",
                color: "var(--d-espresso)",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {data.arabicVerseTranslation}
            </p>
            <p
              className="d-sans"
              style={{ fontSize: "0.7rem", color: "var(--d-brown)", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {data.arabicVerseSource}
            </p>
          </div>
        </section>

        {/* ── Invitation Body ── */}
        <section
          className="d-section d-reveal"
          style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}
        >
          <p
            className="d-serif"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 1.45rem)",
              lineHeight: 1.8,
              color: "var(--d-espresso)",
              fontStyle: "italic",
            }}
          >
            {data.invitationBody}
          </p>
          <p
            className="d-script"
            style={{
              fontSize: "clamp(2rem, 8vw, 3rem)",
              color: "var(--d-gold)",
              marginTop: "1.5rem",
            }}
          >
            {data.invitationSignature}
          </p>
        </section>

        {/* ── Countdown ── */}
        {sec.countdown !== false && <CountdownSection data={data} />}

        {/* ── Events (venue) ── */}
        {sec.venue !== false && (
          <section className="d-section" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="d-reveal" style={{ textAlign: "center", marginBottom: "1rem" }}>
              <SectionLabel>Merasim Bilgileri</SectionLabel>
              <h2
                className="d-script"
                style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--d-espresso)" }}
              >
                Etkinlik Detayları
              </h2>
            </div>
            {data.events.map((ev: any) => (
              <div key={ev.id} className="d-reveal">
                <EventCard event={ev} />
              </div>
            ))}
          </section>
        )}

        {/* ── IBAN ── */}
        {sec.iban && data.ibanInfo?.iban && (
          <section className="d-section d-reveal" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <SectionLabel>Hediye</SectionLabel>
            <h2 className="d-script" style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--d-espresso)", marginBottom: "1.5rem" }}>
              IBAN Bilgisi
            </h2>
            <div className="d-card" style={{ padding: "1.5rem", textAlign: "left", borderRadius: "4px" }}>
              {data.ibanInfo.bankName && (
                <p className="d-sans" style={{ fontSize: "0.85rem", color: "var(--d-brown)", marginBottom: "0.35rem" }}>
                  <strong>Banka:</strong> {data.ibanInfo.bankName}
                </p>
              )}
              {data.ibanInfo.accountHolder && (
                <p className="d-sans" style={{ fontSize: "0.85rem", color: "var(--d-brown)", marginBottom: "0.35rem" }}>
                  <strong>Hesap Sahibi:</strong> {data.ibanInfo.accountHolder}
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem", background: "var(--d-cream-dark)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--d-gold-light)" }}>
                <code className="d-sans" style={{ fontSize: "0.9rem", color: "var(--d-espresso)", flex: 1, wordBreak: "break-all", fontWeight: 500 }}>
                  {data.ibanInfo.iban}
                </code>
                <button
                  className="d-btn-outline"
                  style={{ flexShrink: 0, padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                  onClick={() => handleCopyIban(data.ibanInfo.iban)}
                >
                  {ibanCopied ? "Kopyalandı!" : "Kopyala"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── LCV ── */}
        {sec.rsvp !== false && (
          <section className="d-section" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <LcvSection guestName={guestName} guestHash={guestHash} data={data} />
          </section>
        )}

        {/* ── Guestbook ── */}
        {sec.guestbook !== false && <GuestbookSection />}

        {/* ── Footer ── */}
        <footer
          className="d-sans"
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            borderTop: "1px solid var(--d-gold-light)",
            marginTop: "3rem",
            fontSize: "0.75rem",
            color: "var(--d-brown)",
          }}
        >
          <p className="d-script" style={{ fontSize: "2rem", color: "var(--d-espresso)", marginBottom: "0.5rem" }}>
            {data.brideName.split(" ")[0]} &amp; {data.groomName.split(" ")[0]}
          </p>
          <p style={{ opacity: 0.8, marginTop: "1rem", letterSpacing: "0.05em" }}>
            © 2026 Aurion Core Dijital Davetiyeler
          </p>
        </footer>
      </main>
    </>
  );
}

