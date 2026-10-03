"use client";

/**
 * Admin RSVP (Katılım) Sayfası — Yanıtları tablo olarak gösterir,
 * CSV indirme ve silme işlemleri.
 */

import { useEffect, useState } from "react";
import { AdminNavbar } from "../page";
import { Download, Trash2, Check, Users } from "lucide-react";

interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attending: string;
  ceremony: string;
  count: string;
  children: string;
  note: string;
  createdAt: string;
}

export default function AdminRsvp() {
  const [list, setList] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const base = "/davetiye/minelmuhammed/admin/api";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Verileri yükle
  useEffect(() => {
    fetch(`${base}/rsvp`)
      .then((r) => r.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Sil
  const handleDelete = async (id: string) => {
    if (!confirm("Bu yanıtı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`${base}/rsvp`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setList((l) => l.filter((r) => r.id !== id));
        showToast("Yanıt silindi ✓");
      }
    } catch {
      showToast("Silme hatası!");
    }
  };

  // İstatistikler
  const attending = list.filter((r) => r.attending === "yes");
  const notAttending = list.filter((r) => r.attending === "no");
  let totalGuests = 0;
  attending.forEach((r) => {
    totalGuests += (parseInt(r.count) || 1) + (parseInt(r.children) || 0);
  });

  const cerMap: Record<string, string> = { dugun: "Düğün", kina: "Kına", ikisi: "İkisi" };

  if (loading) {
    return (
      <div className="admin-body">
        <AdminNavbar active="rsvp" />
        <div className="admin-container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ color: "#5A3E2B" }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <AdminNavbar active="rsvp" />

      <div className="admin-container">
        {/* İstatistikler */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{list.length}</div>
            <div className="admin-stat-label">Toplam Yanıt</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#dcfce7" }}>
            <div className="admin-stat-value" style={{ color: "#16a34a" }}>{attending.length}</div>
            <div className="admin-stat-label">Katılacak</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#fecaca" }}>
            <div className="admin-stat-value" style={{ color: "#dc2626" }}>{notAttending.length}</div>
            <div className="admin-stat-label">Katılamayacak</div>
          </div>
          <div className="admin-stat-card" style={{ borderColor: "#C9A84C" }}>
            <div className="admin-stat-value" style={{ color: "#C9A84C" }}>{totalGuests}</div>
            <div className="admin-stat-label">Toplam Kişi</div>
          </div>
        </div>

        {/* CSV İndir */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
          <a
            href={`${base}/rsvp/export`}
            className="admin-btn admin-btn-outline admin-btn-sm"
            style={{ textDecoration: "none" }}
          >
            <Download size={14} />
            CSV / Excel İndir
          </a>
        </div>

        {/* Tablo veya boş durum */}
        {list.length === 0 ? (
          <div className="admin-card admin-empty">
            <div className="admin-empty-icon"><Users size={40} /></div>
            <p style={{ fontWeight: 600 }}>Henüz yanıt yok</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
              Misafirler davetiyeden LCV bildirimi gönderdiğinde burada görünecek.
            </p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ad Soyad</th>
                  <th>Durum</th>
                  <th>Merasim</th>
                  <th>Kişi</th>
                  <th>Not</th>
                  <th>Tarih</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.name}</div>
                      {r.phone && (
                        <div style={{ fontSize: "0.75rem", color: "#5A3E2B" }}>{r.phone}</div>
                      )}
                    </td>
                    <td>
                      <span className={`admin-badge ${r.attending === "yes" ? "admin-badge-green" : "admin-badge-red"}`}>
                        {r.attending === "yes" ? "Katılıyor" : "Katılamıyor"}
                      </span>
                    </td>
                    <td>{r.attending === "yes" ? (cerMap[r.ceremony] || "-") : "-"}</td>
                    <td>
                      {r.attending === "yes" ? (
                        <>
                          {r.count} yetişkin
                          {r.children && r.children !== "0" && `, ${r.children} çocuk`}
                        </>
                      ) : "-"}
                    </td>
                    <td style={{ maxWidth: "180px", fontSize: "0.8rem" }}>
                      {r.note || "-"}
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "#5A3E2B", whiteSpace: "nowrap" }}>
                      {new Date(r.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(r.id)}
                        aria-label="Sil"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="admin-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
