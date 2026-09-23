import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { WeddingSettings, DEFAULT_SETTINGS } from './types';
import { InvitationView } from './components/InvitationView';
import { AdminPanel } from './components/AdminPanel';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// ─── Admin Credentials ───────────────────────────────────────────────────────
const ADMIN_USERNAME = 'minel';
const ADMIN_PASSWORD = 'delikodlar';
const SESSION_KEY = 'admin_auth_session';
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [settings, setSettings] = useState<WeddingSettings>(DEFAULT_SETTINGS);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // 1. URL params parsing (?to=... or ?davetli=...)
  const [guestName, setGuestName] = useState<string>('Değerli Misafirimiz');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('davetli');
    if (toParam) {
      setGuestName(toParam.trim());
    }

    // Check if initial URL is /admin or ?admin=true or hash #admin
    if (
      window.location.pathname.includes('/admin') ||
      params.get('admin') === 'true' ||
      window.location.hash === '#admin'
    ) {
      setIsAdminRoute(true);
    }

    // Restore session
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // 2. Fetch site settings from Firestore
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsRef = doc(db, 'settings', 'general');
        const snap = await getDoc(settingsRef);
        if (snap.exists()) {
          setSettings({ ...DEFAULT_SETTINGS, ...(snap.data() as WeddingSettings) });
        } else {
          try {
            await setDoc(settingsRef, DEFAULT_SETTINGS);
          } catch {
            // Unauthenticated users might not have write access yet
          }
        }
      } catch (err) {
        console.warn('Could not fetch settings from Firestore, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // 4. Update settings handler
  const handleUpdateSettings = async (newSettings: WeddingSettings) => {
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, newSettings, { merge: true });
    setSettings(newSettings);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    } else {
      setAuthError('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
    setUsername('');
    setPassword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif-title text-[#5C4533] text-lg font-semibold tracking-wider">
          Davetiye Hazırlanıyor...
        </p>
      </div>
    );
  }

  // If in admin mode
  if (isAdminRoute) {
    // Not logged in → show login screen
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-[#E7D6B8] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF3E5] border border-[#E9DCBF] text-[#AA771C] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest text-[#B38728] uppercase">
                Yönetici Girişi
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl text-[#4A3324] font-bold mt-1">
                Gelin & Damat Paneli
              </h2>
              <p className="text-xs text-[#7D6657] mt-1.5 leading-relaxed">
                Katılım cevaplarını, davetli listesini ve ayarları yönetmek için giriş yapınız.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3 text-left">
              <div>
                <label className="text-xs font-semibold text-[#6B4F3A] mb-1 block">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı girin"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-xl border border-[#E0CCA8] bg-[#FDFAF4] text-sm text-[#3A2A1A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6B4F3A] mb-1 block">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrenizi girin"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E0CCA8] bg-[#FDFAF4] text-sm text-[#3A2A1A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C7A4A] hover:text-[#6B4F3A] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#C59B27] hover:bg-[#A87E1A] text-white text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer mt-2"
              >
                Giriş Yap
              </button>
            </form>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsAdminRoute(false);
                  window.history.pushState({}, '', window.location.pathname.replace('/admin', '') || '/');
                }}
                className="text-xs text-[#8C6B28] hover:underline cursor-pointer"
              >
                ← Davetiye Görünümüne Geri Dön
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Authenticated → show admin panel
    return (
      <AdminPanel
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        currentUser={null}
        onBackToInvitation={() => {
          setIsAdminRoute(false);
          window.history.pushState({}, '', window.location.pathname.replace('/admin', '') || '/');
        }}
        onLogout={handleLogout}
      />
    );
  }

  // Public Invitation View
  return (
    <InvitationView
      settings={settings}
      guestName={guestName}
      onOpenAdmin={() => {
        setIsAdminRoute(true);
        window.history.pushState({}, '', '#admin');
      }}
    />
  );
}
