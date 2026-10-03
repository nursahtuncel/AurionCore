"use client";

/**
 * Admin Giriş Sayfası — Tek kullanıcı, basit form.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/davetiye/minelmuhammed/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/davetiye/minelmuhammed/admin");
      } else {
        setError(data.error || "Giriş başarısız");
      }
    } catch {
      setError("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF7F2",
        padding: "1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "380px",
          width: "100%",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          border: "1px solid #E6D5BE",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #E8C97A, #C9A84C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.75rem",
            }}
          >
            <Heart size={24} color="#2C2420" fill="#2C2420" />
          </div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2C2420", margin: 0 }}>
            Yönetici Girişi
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#5A3E2B", marginTop: "0.25rem" }}>
            Davetiye yönetim paneli
          </p>
        </div>

        {/* Hata mesajı */}
        {error && (
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "#FEE2E2",
              color: "#B91C1C",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#5A3E2B",
                marginBottom: "0.3rem",
              }}
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: "100%",
                padding: "0.75rem 0.875rem",
                borderRadius: "8px",
                border: "1.5px solid #E6D5BE",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "0.9rem",
                backgroundColor: "#FAF7F2",
                boxSizing: "border-box",
                minHeight: "48px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#5A3E2B",
                marginBottom: "0.3rem",
              }}
            >
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.75rem 0.875rem",
                borderRadius: "8px",
                border: "1.5px solid #E6D5BE",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "0.9rem",
                backgroundColor: "#FAF7F2",
                boxSizing: "border-box",
                minHeight: "48px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.875rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2C2420",
              color: "#FAF7F2",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              minHeight: "48px",
              transition: "background-color 0.2s ease",
            }}
          >
            <LogIn size={16} />
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
