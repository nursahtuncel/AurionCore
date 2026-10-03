"use client";

/**
 * Admin Dashboard — Özet istatistikler ve hızlı erişim.
 */

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Heart, Users, FileText, Settings, Eye, LogOut, MessageSquare, Download, MessageCircle } from "lucide-react";

// ─── Navbar bileşeni ───────────────────────────────────

function AdminNavbar({ active }: { active: string }) {
  const router = useRouter();
  const base = "/davetiye/minelmuhammed/admin";

  const handleLogout = async () => {
    await fetch(`${base}/api/logout`, { method: "POST" });
    router.push(`${base}/login`);
  };

  const links = [
    { id: "dashboard", label: "Panel", icon: <Heart size={14} />, href: base },
    { id: "settings", label: "Ayarlar", icon: <Settings size={14} />, href: `${base}/settings` },
    { id: "rsvp", label: "Katılım", icon: <Users size={14} />, href: `${base}/rsvp` },
    { id: "guestbook", label: "Defteri", icon: <MessageSquare size={14} />, href: `${base}/guestbook` },
    { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={14} />, href: `${base}/whatsapp` },
  ];

  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-navbar-title">
            <span>✦</span> Yönetim Paneli
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <a
              href="/davetiye/minelmuhammed"
              target="_blank"
              className="admin-btn admin-btn-outline admin-btn-sm"
              rel="noopener noreferrer"
            >
              <Eye size={13} />
              <span>Önizle</span>
            </a>
            <button onClick={handleLogout} className="admin-btn admin-btn-outline admin-btn-sm">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </nav>
      <div className="admin-nav-links">
        {links.map((l) => (
          <button
            key={l.id}
            className={`admin-nav-link ${active === l.id ? "active" : ""}`}
            onClick={() => router.push(l.href)}
          >
            {l.icon}
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}

export { AdminNavbar };

// ─── Dashboard sayfası ─────────────────────────────────

export default function AdminDashboard() {
  const [rsvpCount, setRsvpCount] = useState({ total: 0, attending: 0, notAttending: 0, totalGuests: 0 });
  const [gbCount, setGbCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const base = "/davetiye/minelmuhammed/admin/api";

  useEffect(() => {
    async function load() {
      try {
        const [rsvpRes, gbRes] = await Promise.all([
          fetch(`${base}/rsvp`),
          fetch(`${base}/guestbook`),
        ]);
        const rsvpData = await rsvpRes.json();
        const gbData = await gbRes.json();

        const safeRsvpData = Array.isArray(rsvpData) ? rsvpData : [];
        const safeGbData = Array.isArray(gbData) ? gbData : [];

        const attending = safeRsvpData.filter((r: any) => r.attending === "yes");
        const notAttending = safeRsvpData.filter((r: any) => r.attending === "no");

        // Toplam misafir sayısı
        let totalGuests = 0;
        attending.forEach((r: any) => {
          const adults = parseInt(r.count) || 1;
          const kids = parseInt(r.children) || 0;
          totalGuests += adults + kids;
        });

        setRsvpCount({
          total: safeRsvpData.length,
          attending: attending.length,
          notAttending: notAttending.length,
          totalGuests,
        });
        setGbCount(safeGbData.length);
      } catch {
        // sessiz hata
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="admin-body">
        <AdminNavbar active="dashboard" />
        <div className="admin-container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ color: "#5A3E2B" }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <AdminNavbar active="dashboard" />

      <div className="admin-container">
        {/* Hoş geldin */}
        <div className="admin-card" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>💍</p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Hoş Geldiniz!
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#5A3E2B" }}>
            Davetiye yönetim panelinize buradan ulaşabilirsiniz.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{rsvpCount.total}</div>
            <div className="admin-stat-label">Toplam Yanıt</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#dcfce7" }}>
            <div className="admin-stat-value" style={{ color: "#16a34a" }}>{rsvpCount.attending}</div>
            <div className="admin-stat-label">Katılacak</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#fecaca" }}>
            <div className="admin-stat-value" style={{ color: "#dc2626" }}>{rsvpCount.notAttending}</div>
            <div className="admin-stat-label">Katılamayacak</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#C9A84C" }}>
            <div className="admin-stat-value" style={{ color: "#C9A84C" }}>{rsvpCount.totalGuests}</div>
            <div className="admin-stat-label">Toplam Kişi</div>
          </div>
        </div>

        {/* Mesaj sayısı */}
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "#5A3E2B", fontWeight: 600 }}>Misafir Defteri</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800 }}>{gbCount} mesaj</p>
            </div>
            <MessageSquare size={28} color="#C9A84C" />
          </div>
        </div>

        {/* Hızlı erişim */}
        <div className="admin-card" style={{ marginTop: "1rem" }}>
          <h3 className="admin-card-title">⚡ Hızlı Erişim</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <a
              href="/davetiye/minelmuhammed"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-gold"
              style={{ textDecoration: "none" }}
            >
              <Eye size={15} />
              Davetiyeyi Önizle
            </a>
            <a
              href={`${base}/rsvp/export`}
              className="admin-btn admin-btn-outline"
              style={{ textDecoration: "none" }}
            >
              <Download size={15} />
              CSV İndir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
