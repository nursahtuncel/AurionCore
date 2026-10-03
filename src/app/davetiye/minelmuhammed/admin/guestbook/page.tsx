"use client";

/**
 * Admin Misafir Defteri Sayfası — mesajları listele ve sil.
 */

import { useEffect, useState } from "react";
import { AdminNavbar } from "../page";
import { Trash2, Check, MessageSquare } from "lucide-react";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function AdminGuestbook() {
  const [list, setList] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const base = "/davetiye/minelmuhammed/admin/api";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Yükle
  useEffect(() => {
    fetch(`${base}/guestbook`)
      .then((r) => r.json())
      .then((data) => setList(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Sil
  const handleDelete = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`${base}/guestbook`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setList((l) => l.filter((m) => m.id !== id));
        showToast("Mesaj silindi ✓");
      }
    } catch {
      showToast("Silme hatası!");
    }
  };

  if (loading) {
    return (
      <div className="admin-body">
        <AdminNavbar active="guestbook" />
        <div className="admin-container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ color: "#5A3E2B" }}>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <AdminNavbar active="guestbook" />

      <div className="admin-container">
        {/* Başlık */}
        <div className="admin-card" style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Misafir Defteri</h2>
              <p style={{ fontSize: "0.85rem", color: "#5A3E2B" }}>
                {list.length} mesaj
              </p>
            </div>
            <MessageSquare size={28} color="#C9A84C" />
          </div>
        </div>

        {/* Mesajlar veya boş durum */}
        {list.length === 0 ? (
          <div className="admin-card admin-empty">
            <div className="admin-empty-icon"><MessageSquare size={40} /></div>
            <p style={{ fontWeight: 600 }}>Henüz mesaj yok</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
              Misafirler davetiyeden dilek mesajı gönderdiğinde burada görünecek.
            </p>
          </div>
        ) : (
          <div className="admin-card" style={{ padding: 0 }}>
            {list.map((entry) => (
              <div key={entry.id} className="admin-msg-card">
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{entry.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "#5A3E2B" }}>
                      {new Date(entry.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#2C2420", lineHeight: 1.6, fontStyle: "italic" }}>
                    &ldquo;{entry.message}&rdquo;
                  </p>
                </div>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => handleDelete(entry.id)}
                  aria-label="Mesajı sil"
                  style={{ flexShrink: 0, alignSelf: "center" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
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
