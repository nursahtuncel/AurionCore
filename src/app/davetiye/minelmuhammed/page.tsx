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

function useReveal() {
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
  }, []);
}

// ─────────────────────────────────────────────────────────
// Cover / Envelope Screen
// ─────────────────────────────────────────────────────────

function CoverScreen({ onOpen, data }: { onOpen: () => void; data: any }) {
  const [opening, setOpening] = useState(false);
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    setTimeout(() => setFading(true), 1400);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#2A1F1A",
        padding: "1.5rem 1rem",
        overflow: "hidden",
        transition: fading ? "opacity 1s ease, visibility 1s ease" : undefined,
        opacity: fading ? 0 : 1,
        visibility: fading ? "hidden" : "visible",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(201,162,75,0.13) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Gold dust particles — fixed positions, slow pulse */}
      {[
        { x: 10, y: 18, dur: 4.2, delay: 0 },
        { x: 84, y: 13, dur: 5.5, delay: 1.1 },
        { x: 20, y: 72, dur: 3.8, delay: 0.6 },
        { x: 78, y: 78, dur: 6.0, delay: 2.0 },
        { x: 52, y: 88, dur: 4.5, delay: 1.5 },
      ].map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "rgba(201,162,75,0.5)",
            boxShadow: "0 0 7px 2px rgba(201,162,75,0.28)",
            animation: `d-dust-pulse ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Content (above particles) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Label */}
        <p
          className="d-sans"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(201,162,75,0.75)",
            marginBottom: "1.5rem",
          }}
        >
          ✦ Özel Davetiyeniz ✦
        </p>

        {/* ── Envelope ── */}
        <div
          onClick={handleClick}
          role="button"
          aria-label="Davetiyeyi aç"
          style={{
            position: "relative",
            width: "min(85vw, 340px)",
            aspectRatio: "4 / 3",
            cursor: "pointer",
            marginBottom: "1.75rem",
            filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.5))",
            flexShrink: 0,
          }}
        >
          {/* Envelope body */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              background: "linear-gradient(160deg, #F5EDE0 0%, #E6D5BE 100%)",
              border: "1px solid rgba(201,162,75,0.38)",
            }}
          />

          {/* Flaps container */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: "12px",
              pointerEvents: "none",
            }}
          >
            {/* Left */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", background: "#EDE0CC", clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
            {/* Right */}
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%", background: "#E4D5BC", clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
            {/* Bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "#DDD0B8", clipPath: "polygon(0 100%, 50% 0, 100% 100%)", borderTop: "1px solid rgba(201,162,75,0.18)" }} />
          </div>

          {/* Top flap — opens on click */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              background: "#F0E4CE",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transformOrigin: "top center",
              transform: opening ? "rotateX(165deg)" : "rotateX(0deg)",
              transition: opening ? "transform 0.75s ease-in-out" : "none",
              transformStyle: "preserve-3d",
              zIndex: 5,
              pointerEvents: "none",
              borderBottom: "1px solid rgba(201,162,75,0.22)",
            }}
          />

          {/* Bordo wax seal — sits at the flap junction */}
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              width: "clamp(44px, 13vw, 62px)",
              height: "clamp(44px, 13vw, 62px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 32%, #A33040 0%, #6B1520 55%, #3D0B10 100%)",
              border: "1.5px solid rgba(201,162,75,0.7)",
              boxShadow:
                "inset 2px 2px 4px rgba(255,255,255,0.18), inset -2px -2px 5px rgba(0,0,0,0.4), 0 4px 14px rgba(107,21,32,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: opening ? "opacity 0.25s ease" : "none",
              opacity: opening ? 0 : 1,
              fontFamily: "var(--d-font-script)",
              fontSize: "clamp(0.7rem, 2.2vw, 0.95rem)",
              color: "#F5EDE0",
            }}
          >
            M&amp;M
          </div>
        </div>

        {/* ── Names below envelope — multi-line, no ellipsis ── */}
        <h1
          className="d-script"
          style={{
            fontSize: "clamp(2.4rem, 10vw, 4.2rem)",
            color: "#F0E4CE",
            lineHeight: 1.1,
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            wordBreak: "break-word",
            textShadow: "0 1px 2px rgba(0,0,0,0.25)",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            width: "100%",
          }}
        >
          <span>{data.brideName.split(" ")[0]}</span>
          <span
            className="d-serif"
            style={{
              fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
              color: "rgba(201,162,75,0.7)",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            &amp;
          </span>
          <span>{data.groomName.split(" ")[0]}</span>
        </h1>

        {/* Date line */}
        <p
          className="d-sans"
          style={{
            marginTop: "0.85rem",
            fontSize: "clamp(0.64rem, 2.2vw, 0.78rem)",
            letterSpacing: "0.09em",
            color: "rgba(201,162,75,0.8)",
            marginBottom: "1.75rem",
          }}
        >
          28 Ekim&nbsp;•&nbsp;Kına&nbsp;&nbsp;|&nbsp;&nbsp;31 Ekim 2026&nbsp;•&nbsp;Düğün
        </p>

        {/* ── Open button — single heart icon ── */}
        <button
          onClick={handleClick}
          disabled={opening}
          aria-label="Davetiyeyi aç"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.875rem 2.25rem",
            borderRadius: "9999px",
            border: "none",
            background:
              "linear-gradient(135deg, #E8C97A 0%, #C9A24B 50%, #A67C1F 100%)",
            color: "#2A1F1A",
            fontFamily: "var(--d-font-sans)",
            fontWeight: 700,
            fontSize: "clamp(0.875rem, 3vw, 1rem)",
            letterSpacing: "0.06em",
            cursor: opening ? "default" : "pointer",
            minHeight: "52px",
            minWidth: "190px",
            boxShadow: "0 8px 24px rgba(201,162,75,0.35)",
            opacity: opening ? 0.65 : 1,
            transition: "opacity 0.2s ease, transform 0.2s ease",
            touchAction: "manipulation",
          }}
        >
          <Heart size={16} fill="#2A1F1A" style={{ flexShrink: 0 }} />
          <span>{opening ? "Açılıyor…" : "Davetiyeyi Aç"}</span>
        </button>

        {/* Micro note */}
        <p
          className="d-sans"
          style={{
            marginTop: "0.75rem",
            fontSize: "0.68rem",
            letterSpacing: "0.06em",
            color: "rgba(201,162,75,0.48)",
          }}
        >
          Müzik eşliğinde açılır
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Floating Music Player
// ─────────────────────────────────────────────────────────

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
  const [muted, setMuted] = useState(false);

  if (hasError) return null;

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1rem",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {/* Track name bubble */}
      {isPlaying && (
        <div
          className="d-sans"
          style={{
            background: "rgba(44,36,32,0.88)",
            color: "#FAF7F2",
            fontSize: "0.7rem",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            border: "1px solid rgba(201,168,76,0.3)",
            maxWidth: "160px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          ♫
        </div>
      )}

      {/* Controls pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          background: "rgba(44,36,32,0.9)",
          border: "1px solid rgba(201,168,76,0.4)",
          borderRadius: "9999px",
          padding: "0.35rem 0.6rem",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Equalizer bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            height: "18px",
            padding: "0 6px",
          }}
        >
          {[...Array(4)].map((_, i) =>
            isPlaying ? (
              <span
                key={i}
                className="d-eq-bar"
                style={{
                  display: "block",
                  width: "3px",
                  background: "#C9A84C",
                  borderRadius: "2px",
                  minHeight: "4px",
                }}
              />
            ) : (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "3px",
                  height: "4px",
                  background: "rgba(201,168,76,0.4)",
                  borderRadius: "2px",
                }}
              />
            )
          )}
        </div>

        {/* Play/Pause */}
        <button
          onClick={onToggle}
          aria-label={isPlaying ? "Müziği durdur" : "Müziği çal"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E8C97A, #C9A84C)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2C2420",
            transition: "transform 0.15s ease",
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Sesi aç" : "Sesi kapat"}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: muted ? "#ef4444" : "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Section label helper
// ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="d-sans"
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#C9A84C",
        marginBottom: "0.5rem",
        fontWeight: 600,
      }}
    >
      {children}
    </p>
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
        className="d-script"
        style={{
          fontSize: "clamp(1.8rem, 7vw, 3rem)",
          color: "#2C2420",
          marginBottom: "2rem",
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
          margin: "0 auto 2rem",
        }}
      >
        {blocks.map((b) => (
          <div
            key={b.label}
            className="d-card"
            style={{
              padding: "0.875rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              className="d-serif"
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                fontWeight: 700,
                color: "#2C2420",
                lineHeight: 1,
              }}
            >
              {String(b.value).padStart(2, "0")}
            </span>
            <span
              className="d-sans"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "#5A3E2B",
                marginTop: "0.35rem",
                fontWeight: 600,
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
          gap: "0.625rem",
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
          <span>Düğünü Takvime Ekle (Google)</span>
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

  const accent = event.type === "kina" ? "#B5674A" : "#C9A84C";

  return (
    <div
      className="d-card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderTop: `3px solid ${accent}`,
      }}
    >
      {/* Badge + Time */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          className="d-sans"
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: `${accent}22`,
            color: accent,
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
          }}
        >
          {event.title}
        </span>
        <span
          className="d-sans"
          style={{ fontSize: "0.8rem", color: "#5A3E2B", display: "flex", alignItems: "center", gap: "0.3rem" }}
        >
          <Clock size={13} color={accent} />
          {event.startTime}
          {event.endTime ? ` – ${event.endTime}` : ""}
        </span>
      </div>

      {/* Venue */}
      <div>
        <h3
          className="d-serif"
          style={{ fontSize: "clamp(1.2rem, 4.5vw, 1.65rem)", fontWeight: 700, color: "#2C2420", lineHeight: 1.2 }}
        >
          {event.venueName}
        </h3>
        {event.venueSubtitle && (
          <p
            className="d-sans"
            style={{ fontSize: "0.8rem", color: "#5A3E2B", marginTop: "0.2rem", fontStyle: "italic" }}
          >
            {event.venueSubtitle}
          </p>
        )}
      </div>

      {/* Date */}
      <p className="d-sans" style={{ fontSize: "0.875rem", fontWeight: 700, color: accent }}>
        {formatDateTR(event.dateISO)}
      </p>

      {/* Address */}
      <div
        style={{
          background: "#FFFDF9",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "0.875rem",
          padding: "0.875rem",
          display: "flex",
          gap: "0.625rem",
          alignItems: "flex-start",
        }}
      >
        <MapPin size={16} color="#C9A84C" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div className="d-sans" style={{ fontSize: "0.85rem", color: "#2C2420", lineHeight: 1.5 }}>
          <div>{event.address}</div>
          <div style={{ color: "#5A3E2B", marginTop: "0.1rem" }}>{event.district}</div>
        </div>
      </div>

      {/* Convoy note */}
      {event.convoyTime && (
        <div
          className="d-sans"
          style={{
            fontSize: "0.8rem",
            color: "#5A3E2B",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(201,168,76,0.08)",
            padding: "0.6rem 0.875rem",
            borderRadius: "0.75rem",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <Car size={14} color="#C9A84C" />
          <span>Konvoy hareket saati: <strong>{event.convoyTime}</strong></span>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <a
          href={event.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-btn-dark"
          aria-label={`${event.venueName} konumunu Google Harita'da aç`}
        >
          <Navigation size={14} color="#C9A84C" />
          <span>Haritada Aç</span>
        </a>

        <button
          className="d-btn-outline"
          onClick={handleCopyAddr}
          aria-label="Adresi kopyala"
        >
          {copied ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
          <span>{copied ? "Kopyalandı!" : "Adresi Kopyala"}</span>
        </button>

        <a
          href={buildGoogleCalUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="d-btn-outline"
          aria-label="Google Takvim'e ekle"
        >
          <CalendarPlus size={13} />
          <span>Google Takvim</span>
        </a>

        <button
          className="d-btn-outline"
          onClick={() => downloadIcs(event)}
          aria-label="Apple Takvim (.ics) indir"
        >
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
    if (!form.kvkk) return;
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
      <div className="d-card d-reveal" style={{ padding: "2rem", textAlign: "center" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(22,163,74,0.12)",
            border: "1.5px solid rgba(22,163,74,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <Check size={28} color="#16a34a" />
        </div>
        <h3 className="d-serif" style={{ fontSize: "1.5rem", color: "#2C2420", marginBottom: "0.5rem" }}>
          Teşekkür ederiz, {form.name}!
        </h3>
        <p className="d-sans" style={{ fontSize: "0.9rem", color: "#5A3E2B", maxWidth: "360px", margin: "0 auto" }}>
          {form.attending === "yes"
            ? `Katılım bildiriminiz alındı. Sizi aramızda görmekten mutluluk duyacağız!`
            : "Yanıtınız için teşekkür ederiz. Dualarınızla yanımızda olduğunuzu biliyoruz."}
        </p>
        
        <p className="d-sans" style={{ fontSize: "0.85rem", color: "#C9A84C", marginTop: "1rem" }}>
          <strong>Özet:</strong> {summary}
        </p>

        <button
          className="d-btn-outline"
          style={{ marginTop: "1.25rem" }}
          onClick={handleUpdate}
        >
          Yanıtımı Güncelle
        </button>
      </div>
    );
  }

  const isAttending = form.attending === "yes";

  return (
    <div className="d-card d-reveal" style={{ padding: "1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <SectionLabel>Katılım Bildirimi</SectionLabel>
        <h2
          className="d-script"
          style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)", color: "#2C2420" }}
        >
          LCV
        </h2>
        <p
          className="d-sans"
          style={{ fontSize: "0.85rem", color: "#5A3E2B", marginTop: "0.5rem", maxWidth: "380px", margin: "0.5rem auto 0" }}
        >
          Hazırlıklarımızı eksiksiz yapabilmemiz için lütfen en geç{" "}
          <strong>{formatDateTR(data.lcvDeadlineISO)}</strong> tarihine kadar yanıtlayınız.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Attending choice */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
          {(["yes", "no"] as Attending[]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => update("attending", val)}
              style={{
                padding: "0.75rem",
                borderRadius: "0.875rem",
                border: `1.5px solid ${form.attending === val ? "#C9A84C" : "rgba(201,168,76,0.3)"}`,
                background: form.attending === val ? "#2C2420" : "#FFFDF9",
                color: form.attending === val ? "#FAF7F2" : "#2C2420",
                fontFamily: "var(--d-font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                minHeight: "48px",
              }}
              aria-pressed={form.attending === val}
            >
              {val === "yes" ? (
                <><Heart size={14} fill={form.attending === "yes" ? "#C9A84C" : "none"} color="#C9A84C" />Katılıyorum</>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
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
            fontSize: "0.78rem",
            color: "#5A3E2B",
            cursor: "pointer",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={form.kvkk}
            onChange={(e) => update("kvkk", e.target.checked)}
            required
            style={{ marginTop: "2px", accentColor: "#C9A84C", cursor: "pointer" }}
          />
          <span>
            Paylaştığım ad, katılım durumu, telefon ve mesaj bilgilerinin yalnızca düğün
            organizasyonu amacıyla işleneceğini okudum, onaylıyorum.{" "}
            <button
              type="button"
              style={{ color: "#C9A84C", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}
              onClick={() => setShowKvkk(true)}
            >
              Aydınlatma Metni
            </button>
          </span>
        </label>

        <button
          className="d-btn-gold"
          type="submit"
          disabled={!form.kvkk}
          style={{ width: "100%", opacity: form.kvkk ? 1 : 0.5 }}
          aria-label="Bildirimi gönder"
        >
          <Send size={15} />
          <span>Bildirimi Gönder</span>
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
            style={{ maxWidth: "480px", padding: "1.5rem", maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="d-serif" style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
              Kişisel Veri Aydınlatma Metni
            </h3>
            <p className="d-sans" style={{ fontSize: "0.85rem", color: "#5A3E2B", lineHeight: 1.7 }}>
              Bu form aracılığıyla toplanan <strong>ad-soyad, katılım durumu, telefon numarası ve mesaj</strong>{" "}
              bilgileri, yalnızca <strong>Minel & Muhammed düğün organizasyonunun</strong> planlanması
              ve yönetilmesi amacıyla işlenmektedir. Bilgileriniz üçüncü taraflarla paylaşılmamakta
              ve etkinlik sonrası silinmektedir. KVKK kapsamında erişim, düzeltme ve silme haklarınız
              saklıdır.
            </p>
            <button
              className="d-btn-gold"
              style={{ marginTop: "1rem", width: "100%" }}
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
    setSent(true);
    setName("");
    setMsg("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="d-section d-reveal" style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <SectionLabel>Sevgi &amp; Dilekler</SectionLabel>
        <h2
          className="d-script"
          style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", color: "#2C2420" }}
        >
          Dua &amp; Tebrik Duvarı
        </h2>
        <div className="d-divider" style={{ marginTop: "0.75rem" }}>
          <Heart size={14} fill="#C9A84C" color="#C9A84C" />
        </div>
      </div>

      {/* Write message */}
      {sent ? (
        <div
          className="d-card"
          style={{ padding: "1.5rem", textAlign: "center", marginBottom: "1.5rem" }}
        >
          <p className="d-serif" style={{ fontSize: "1.1rem", color: "#2C2420" }}>
            Mesajınız alındı! Onaylandıktan sonra yayınlanacak. ✨
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="d-card"
          style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}
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
              rows={3}
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
                bottom: "0.5rem",
                right: "0.5rem",
                fontSize: "0.65rem",
                color: msg.length >= 500 ? "#ef4444" : "rgba(201,168,76,0.6)",
              }}
            >
              {msg.length}/500
            </span>
          </div>
          <p
            className="d-sans"
            style={{ fontSize: "0.75rem", color: "#5A3E2B", textAlign: "center", marginTop: "-0.25rem" }}
          >
            Mesajınız onaylandıktan sonra yayınlanır.
          </p>
          <button className="d-btn-gold" type="submit" aria-label="Mesaj gönder">
            <Send size={14} />
            <span>Gönder</span>
          </button>
        </form>
      )}

      {/* Existing approved messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="d-card d-msg-new"
            style={{ padding: "1.25rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span className="d-serif" style={{ fontWeight: 700, fontSize: "1rem", color: "#2C2420" }}>
                <Heart size={12} fill="#C9A84C" color="#C9A84C" style={{ marginRight: "0.35rem" }} />
                {entry.name}
              </span>
              <span className="d-sans" style={{ fontSize: "0.7rem", color: "#5A3E2B" }}>
                {formatDateTR(entry.createdAt)}
              </span>
            </div>
            <p
              className="d-serif"
              style={{ fontSize: "0.975rem", color: "#2C2420", lineHeight: 1.65, fontStyle: "italic" }}
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
  useReveal();

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

  const handleCoverOpen = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeIn();
        // Hide cover after animation
        setTimeout(() => setCoverVisible(false), 2100);
      })
      .catch(() => {
        // Audio blocked — hide cover anyway
        setTimeout(() => setCoverVisible(false), 2100);
      });
  }, [fadeIn]);

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
      {coverVisible && <CoverScreen onOpen={handleCoverOpen} data={data} />}

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
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 0 6rem",
        }}
      >
        {/* ── Hero ── */}
        <section className="d-section" style={{ textAlign: "center" }}>
          {/* Decorative monogram */}
          <div
            className="d-ring-glow"
            style={{
              width: "clamp(72px, 20vw, 100px)",
              height: "clamp(72px, 20vw, 100px)",
              borderRadius: "50%",
              border: "2px solid rgba(201,168,76,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              background: "linear-gradient(160deg, #FFFDF9, #F5EFE6)",
            }}
          >
            <div
              style={{
                width: "calc(100% - 10px)",
                height: "calc(100% - 10px)",
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="d-script"
                style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)", color: "#C9A84C" }}
              >
                M &amp; M
              </span>
            </div>
          </div>

          {/* Guest greeting */}
          {guestGreeting ? (
            <p
              className="d-sans d-reveal"
              style={{
                fontSize: "1rem",
                color: "#C9A84C",
                marginBottom: "1rem",
                fontWeight: 600,
                padding: "0 1rem"
              }}
            >
              {guestGreeting}
            </p>
          ) : guestName ? (
            <p
              className="d-sans d-reveal"
              style={{
                fontSize: "0.85rem",
                color: "#5A3E2B",
                marginBottom: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              Sayın Misafirimiz: <strong>{guestName}</strong>
            </p>
          ) : null}

          {/* Names */}
          <h1
            className="d-script d-reveal"
            style={{
              fontSize: "clamp(2.4rem, 10vw, 5rem)",
              color: "#2C2420",
              lineHeight: 1.1,
              overflow: "hidden",
            }}
          >
            {data.brideName.split(" ")[0]}
          </h1>

          <div
            className="d-reveal"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.875rem",
              margin: "0.6rem 0",
            }}
          >
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <Heart size={18} fill="#C9A84C" color="#C9A84C" />
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          <h1
            className="d-script d-reveal"
            style={{
              fontSize: "clamp(2.4rem, 10vw, 5rem)",
              color: "#2C2420",
              lineHeight: 1.1,
              overflow: "hidden",
            }}
          >
            {data.groomName.split(" ")[0]}
          </h1>

          {/* Kına / Düğün badges */}
          <div
            className="d-reveal d-sans"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
              color: "#5A3E2B",
              letterSpacing: "0.07em",
            }}
          >
            28 Ekim Çarşamba&nbsp;•&nbsp;Kına&nbsp;&nbsp;|&nbsp;&nbsp;31 Ekim Cumartesi&nbsp;•&nbsp;Düğün
          </div>
        </section>

        {/* ── Arabic Verse ── */}
        <section
          className="d-section d-reveal"
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Corner ornament (top-left, top-right) */}
          <div
            style={{
              background: "rgba(255,253,249,0.9)",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: "1.5rem",
              padding: "2rem 1.5rem",
              position: "relative",
            }}
          >
            {/* Corner SVG accents */}
            {["tl", "tr", "bl", "br"].map((corner) => (
              <svg
                key={corner}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{
                  position: "absolute",
                  top: corner.startsWith("t") ? "8px" : "auto",
                  bottom: corner.startsWith("b") ? "8px" : "auto",
                  left: corner.endsWith("l") ? "8px" : "auto",
                  right: corner.endsWith("r") ? "8px" : "auto",
                  opacity: 0.45,
                  transform: `rotate(${corner === "tr" ? 90 : corner === "br" ? 180 : corner === "bl" ? 270 : 0}deg)`,
                }}
              >
                <path
                  d="M2 2 Q2 14 14 14"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="2" cy="2" r="1.5" fill="#C9A84C" />
              </svg>
            ))}

            {/* Arabic text */}
            <p
              className="d-arabic"
              style={{
                fontSize: "clamp(1.25rem, 4.5vw, 1.75rem)",
                lineHeight: 2,
                color: "#2C2420",
                marginBottom: "0.75rem",
                whiteSpace: "pre-line",
              }}
            >
              {data.arabicVerse}
            </p>

            <div className="d-divider" style={{ margin: "0.75rem auto" }}>
              <Sparkles size={13} color="#C9A84C" />
            </div>

            <p
              className="d-serif"
              style={{
                fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
                fontStyle: "italic",
                color: "#2C2420",
                marginBottom: "0.4rem",
              }}
            >
              {data.arabicVerseTranslation}
            </p>
            <p
              className="d-sans"
              style={{ fontSize: "0.75rem", color: "#5A3E2B", letterSpacing: "0.1em" }}
            >
              {data.arabicVerseSource}
            </p>
          </div>
        </section>

        {/* ── Invitation Body ── */}
        <section
          className="d-section d-reveal"
          style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}
        >
          <p
            className="d-serif"
            style={{
              fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
              lineHeight: 1.85,
              color: "#2C2420",
              fontStyle: "italic",
            }}
          >
            {data.invitationBody}
          </p>
          <p
            className="d-script"
            style={{
              fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
              color: "#C9A84C",
              marginTop: "1rem",
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
            <div className="d-reveal" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              <SectionLabel>Merasim Bilgileri</SectionLabel>
              <h2
                className="d-script"
                style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", color: "#2C2420" }}
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
          <section className="d-section d-reveal" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <SectionLabel>Hediye</SectionLabel>
            <h2 className="d-script" style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)", color: "#2C2420", marginBottom: "1rem" }}>
              IBAN Bilgisi
            </h2>
            <div className="d-card" style={{ padding: "1.25rem", textAlign: "left" }}>
              {data.ibanInfo.bankName && (
                <p className="d-sans" style={{ fontSize: "0.85rem", color: "#5A3E2B", marginBottom: "0.35rem" }}>
                  <strong>Banka:</strong> {data.ibanInfo.bankName}
                </p>
              )}
              {data.ibanInfo.accountHolder && (
                <p className="d-sans" style={{ fontSize: "0.85rem", color: "#5A3E2B", marginBottom: "0.35rem" }}>
                  <strong>Hesap Sahibi:</strong> {data.ibanInfo.accountHolder}
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                <code className="d-sans" style={{ fontSize: "0.85rem", color: "#2C2420", flex: 1, wordBreak: "break-all" }}>
                  {data.ibanInfo.iban}
                </code>
                <button
                  className="d-btn-outline"
                  style={{ flexShrink: 0 }}
                  onClick={() => { navigator.clipboard.writeText(data.ibanInfo.iban); }}
                >
                  Kopyala
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── LCV ── */}
        {sec.rsvp !== false && (
          <section className="d-section" style={{ maxWidth: "560px", margin: "0 auto" }}>
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
            padding: "2.5rem 1rem",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            marginTop: "2rem",
            fontSize: "0.75rem",
            color: "#5A3E2B",
          }}
        >
          <p className="d-script" style={{ fontSize: "1.6rem", color: "#2C2420", marginBottom: "0.5rem" }}>
            {data.brideName.split(" ")[0]} &amp; {data.groomName.split(" ")[0]}
          </p>
          <p style={{ opacity: 0.6 }}>
            © 2026 Aurion Core Dijital Davetiyeler
          </p>
        </footer>
      </main>
    </>
  );
}
