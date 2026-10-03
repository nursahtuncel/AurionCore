"use client";

import { useEffect, useState, useRef } from "react";
import { AdminNavbar } from "../page";
import { Save, Send, Copy, Plus, Trash2, Search, Filter, Upload, MessageCircle, ChevronDown, ChevronUp, Check, CheckCircle2, XCircle, HelpCircle, FileText, Download, Clock, AlertCircle } from "lucide-react";

export default function WhatsAppPage() {
  const [settings, setSettings] = useState<any>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for templates
  const [template, setTemplate] = useState("");
  const [template2, setTemplate2] = useState("");
  const [template3, setTemplate3] = useState("");
  const [reminderTemplate, setReminderTemplate] = useState("");
  const [thankYouTemplate, setThankYouTemplate] = useState("");
  const [personalGreeting, setPersonalGreeting] = useState("");
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  // States for new guest
  const [newGuest, setNewGuest] = useState({ name: "", phone: "", count: "", note: "" });
  const [addingGuest, setAddingGuest] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  
  // Filter/Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  
  // CSV Import
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  // Bulk Reminder Modal
  const [showBulkReminder, setShowBulkReminder] = useState(false);
  const [bulkReminderQueue, setBulkReminderQueue] = useState<any[]>([]);
  const [rsvpList, setRsvpList] = useState<any[]>([]);

  const base = "/davetiye/minelmuhammed/admin/api";
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const davetiyePath = "/davetiye/minelmuhammed";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [setRes, gstRes, rsvpRes] = await Promise.all([
        fetch(`${base}/whatsapp/settings`),
        fetch(`${base}/whatsapp/guests`),
        fetch(`${base}/rsvp`)
      ]);
      const set = await setRes.json();
      const gst = await gstRes.json();
      const rsvp = await rsvpRes.json();
      
      setSettings(set);
      setTemplate(set.template || "");
      setTemplate2(set.template2 || "");
      setTemplate3(set.template3 || "");
      setReminderTemplate(set.reminderTemplate || "");
      setThankYouTemplate(set.thankYouTemplate || "");
      setPersonalGreeting(set.personalGreeting || "");
      setGuests(gst);
      setRsvpList(Array.isArray(rsvp) ? rsvp : []);
    } catch (e) {
      alert("Veriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  const saveSettings = async () => {
    setSavingTemplate(true);
    try {
      await fetch(`${base}/whatsapp/settings`, {
        method: "POST",
        body: JSON.stringify({ template, template2, template3, reminderTemplate, thankYouTemplate, personalGreeting }),
      });
      alert("Şablonlar kaydedildi!");
    } catch {
      alert("Hata oluştu.");
    } finally {
      setSavingTemplate(false);
    }
  };

  const formatPhone = (phone: any) => {
    if (!phone) return "";
    let p = String(phone).replace(/[^0-9]/g, "");
    if (p.startsWith("0")) p = "90" + p.substring(1);
    else if (!p.startsWith("90") && p.length === 10) p = "90" + p;
    return p;
  };

  const addGuest = async () => {
    if (!newGuest.name) return alert("İsim zorunludur.");
    
    // Check duplicate phone
    if (newGuest.phone) {
      const formatted = formatPhone(newGuest.phone);
      if (guests.some(g => g.phone && formatPhone(g.phone) === formatted)) {
        if (!confirm("Bu telefon numarası listede zaten var. Yine de eklemek istiyor musunuz?")) return;
      }
    }

    setAddingGuest(true);
    try {
      const res = await fetch(`${base}/whatsapp/guests`, {
        method: "POST",
        body: JSON.stringify(newGuest),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sunucu hatası");
      setGuests([data, ...guests]);
      setNewGuest({ name: "", phone: "", count: "", note: "" });
      setShowAddSuccess(true);
      setTimeout(() => setShowAddSuccess(false), 2000);
    } catch (e: any) {
      console.error(e);
      alert("Eklenemedi: " + e.message);
    } finally {
      setAddingGuest(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addGuest();
    }
  };

  const deleteGuest = async (id: string) => {
    if (!confirm("Bu misafiri silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`${base}/whatsapp/guests?id=${id}`, { method: "DELETE" });
      setGuests(guests.filter(g => g.id !== id));
    } catch {
      alert("Silinemedi.");
    }
  };

  const updateStatus = async (id: string, rsvpStatus: "yes"|"no"|"none") => {
    try {
      await fetch(`${base}/whatsapp/guests`, {
        method: "PUT",
        body: JSON.stringify({ id, rsvpStatus }),
      });
      setGuests(guests.map(g => g.id === id ? { ...g, rsvpStatus } : g));
    } catch {
      alert("Güncellenemedi.");
    }
  };

  const parseCSV = async () => {
    if (!importText) return;
    const lines = importText.split("\n");
    const parsed = lines.map(line => {
      const parts = line.includes("\t") ? line.split("\t") : line.split(",");
      return {
        name: parts[0]?.trim(),
        phone: parts[1]?.trim() || "",
        count: parts[2]?.trim() || "",
        note: parts[3]?.trim() || ""
      };
    }).filter(g => g.name);

    if (parsed.length === 0) return alert("Geçerli veri bulunamadı.");

    try {
      const res = await fetch(`${base}/whatsapp/guests`, {
        method: "POST",
        body: JSON.stringify(parsed),
      });
      const newGuests = await res.json();
      setGuests([...newGuests, ...guests]);
      setShowImport(false);
      setImportText("");
      alert(`${parsed.length} kişi eklendi.`);
    } catch {
      alert("İçe aktarma başarısız.");
    }
  };

  const getWaLink = (guest?: any, type: "invite" | "invite2" | "invite3" | "reminder" | "thankyou" | "generic" = "invite") => {
    const isGeneric = type === "generic" || !guest;
    const cift = "Minel & Muhammed";
    const tarih = "31 Ekim 2026";
    const saat = "13:00";
    const mekan = "Besa Albatros";
    const isim = isGeneric ? "Değerli Büyüğümüz/Arkadaşımız" : guest.name;
    const link = isGeneric ? `${appUrl}${davetiyePath}` : `${appUrl}${davetiyePath}?m=${guest.hash}`;
    
    let baseTemplate = template;
    if (type === "invite2") baseTemplate = template2;
    if (type === "invite3") baseTemplate = template3;
    if (type === "reminder") baseTemplate = reminderTemplate;
    if (type === "thankyou") baseTemplate = thankYouTemplate;

    let text = baseTemplate;
    
    // Otomatik isim ekleme mantığı
    if (!text.includes("{isim}") && !isGeneric) {
      if (text.includes("Misafirimiz")) {
        text = text.replace("Misafirimiz", guest.name);
      } else {
        text = `Sayın ${guest.name},\n\n` + text;
      }
    }

    text = text
      .replace(/{isim}/g, isim)
      .replace(/{cift}/g, cift)
      .replace(/{tarih}/g, tarih)
      .replace(/{saat}/g, saat)
      .replace(/{mekan}/g, mekan)
      .replace(/{link}/g, link);

    const encoded = encodeURIComponent(text);
    
    if (isGeneric || !guest?.phone) {
      return `https://wa.me/?text=${encoded}`;
    } else {
      return `https://wa.me/${formatPhone(guest.phone)}?text=${encoded}`;
    }
  };

  const copyLink = (guest?: any) => {
    const isGeneric = !guest;
    const link = isGeneric ? `${appUrl}${davetiyePath}` : `${appUrl}${davetiyePath}?m=${guest.hash}`;
    navigator.clipboard.writeText(link);
    alert("Link kopyalandı!");
  };

  const appendToTemplate = (tag: string, setter: any) => {
    setter((prev: string) => prev + tag);
  };

  const handleSend = async (guest: any, type: "invite" | "invite2" | "invite3" | "reminder" | "thankyou", customText?: string) => {
    let url = "";
    if (customText) {
      const encoded = encodeURIComponent(customText);
      url = guest?.phone ? `https://wa.me/${formatPhone(guest.phone)}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    } else {
      url = getWaLink(guest, type);
    }
    window.open(url, "_blank");

    const updates: any = { id: guest.id };
    if (type.startsWith("invite")) {
      updates.sent = true;
      updates.messageSentAt = Date.now();
    } else if (type === "reminder") {
      updates.reminderSentAt = Date.now();
    } else if (type === "thankyou") {
      updates.thankYouSentAt = Date.now();
    }

    try {
      await fetch(`${base}/whatsapp/guests`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      setGuests(guests.map(g => g.id === guest.id ? { ...g, ...updates } : g));
    } catch {}
  };

  const exportExcel = () => {
    let csv = "İsim,Telefon,Katılım,Kişi Sayısı,Not,Mesaj Durumu,Özel Link\n";
    guests.forEach(g => {
      const status = g.rsvpStatus === "yes" ? "Katılıyor" : g.rsvpStatus === "no" ? "Katılamıyor" : "Yanıt Yok";
      const msgStatus = g.sent ? "Davet Gönderildi" : "Gönderilmedi";
      const link = `${appUrl}${davetiyePath}?m=${g.hash}`;
      csv += `"${g.name}","${g.phone}","${status}","${g.rsvpCount || ''}","${g.note || g.rsvpNote || ''}","${msgStatus}","${link}"\n`;
    });
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "misafir_listesi.csv";
    link.click();
  };

  const openBulkReminder = () => {
    const unresponded = guests.filter(g => g.rsvpStatus !== "yes" && g.rsvpStatus !== "no" && g.sent);
    setBulkReminderQueue(unresponded.map(g => ({ ...g, status: "pending" })));
    setShowBulkReminder(true);
  };

  // Modal states
  const [sendModalGuest, setSendModalGuest] = useState<any>(null);
  const [modalCustomText1, setModalCustomText1] = useState("");
  const [modalCustomText2, setModalCustomText2] = useState("");
  const [modalCustomText3, setModalCustomText3] = useState("");

  const openSendModal = (guest: any) => {
    setSendModalGuest(guest);
    setModalCustomText1(decodeURIComponent(getWaLink(guest, "invite").split("text=")[1] || ""));
    setModalCustomText2(decodeURIComponent(getWaLink(guest, "invite2").split("text=")[1] || ""));
    setModalCustomText3(decodeURIComponent(getWaLink(guest, "invite3").split("text=")[1] || ""));
  };
  
  const handleBulkSend = async (index: number) => {
    const guest = bulkReminderQueue[index];
    await handleSend(guest, "reminder");
    
    setBulkReminderQueue(q => q.map((g, i) => i === index ? { ...g, status: "done" } : g));
  };

  const linkRsvpToGuest = async (rsvp: any, guestId: string) => {
    try {
      // 1. Update WhatsAppGuest
      await fetch(`${base}/whatsapp/guests`, {
        method: "PUT",
        body: JSON.stringify({
          id: guestId,
          rsvpStatus: rsvp.attending,
          rsvpCount: rsvp.count || "1",
          rsvpChildren: rsvp.children || "0",
          rsvpNote: rsvp.note || ""
        }),
      });
      // 2. Remove from unmatched RSVPs in UI (by faking the ID addition, backend update not strictly necessary if UI clears it)
      setRsvpList(list => list.map(r => r.id === rsvp.id ? { ...r, whatsappGuestId: guestId } : r));
      // 3. Update Guests in UI
      setGuests(guests.map(g => g.id === guestId ? { ...g, rsvpStatus: rsvp.attending, rsvpCount: rsvp.count, rsvpNote: rsvp.note } : g));
      alert("Eşleştirme başarılı!");
    } catch {
      alert("Eşleştirme sırasında hata oluştu.");
    }
  };

  const createGuestFromRsvp = async (rsvp: any) => {
    try {
      const res = await fetch(`${base}/whatsapp/guests`, {
        method: "POST",
        body: JSON.stringify({
          name: rsvp.name,
          phone: rsvp.phone,
        }),
      });
      const newGuest = await res.json();
      await linkRsvpToGuest(rsvp, newGuest.id);
    } catch {
      alert("Yeni misafir oluşturulamadı.");
    }
  };

  if (loading) return <div className="admin-body"><AdminNavbar active="whatsapp" /><div className="admin-container" style={{ textAlign: "center", padding: "4rem" }}>Yükleniyor...</div></div>;

  const filteredGuests = guests.filter(g => {
    if (filter === "attending" && g.rsvpStatus !== "yes") return false;
    if (filter === "not-attending" && g.rsvpStatus !== "no") return false;
    if (filter === "no-response" && (g.rsvpStatus === "yes" || g.rsvpStatus === "no")) return false;
    if (filter === "unsent" && g.sent) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalGuestsCount = guests.length;
  const attendingCount = guests.filter(g => g.rsvpStatus === "yes").length;
  const attendingPeopleCount = guests.filter(g => g.rsvpStatus === "yes").reduce((acc, g) => acc + (parseInt(g.rsvpCount) || 1), 0);
  const notAttendingCount = guests.filter(g => g.rsvpStatus === "no").length;
  const noResponseCount = guests.filter(g => g.rsvpStatus !== "yes" && g.rsvpStatus !== "no").length;

  const unmatchedRsvps = rsvpList.filter(r => !r.whatsappGuestId);

  return (
    <div className="admin-body">
      <AdminNavbar active="whatsapp" />
      <div className="admin-container">
        
        {/* 1. Özet Kartları */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div className="admin-stat-card" style={{ cursor: "pointer", border: filter === "all" ? "2px solid var(--admin-text)" : "" }} onClick={() => setFilter("all")}>
            <div className="admin-stat-title">Toplam Davetli</div>
            <div className="admin-stat-value">{totalGuestsCount}</div>
          </div>
          <div className="admin-stat-card" style={{ cursor: "pointer", border: filter === "attending" ? "2px solid #16a34a" : "" }} onClick={() => setFilter("attending")}>
            <div className="admin-stat-title" style={{ color: "#16a34a" }}><CheckCircle2 size={16} style={{display:"inline", marginBottom:"-2px"}}/> Katılıyor</div>
            <div className="admin-stat-value" style={{ color: "#16a34a" }}>{attendingCount} <span style={{fontSize:"1rem", fontWeight:"normal"}}>({attendingPeopleCount} kişi)</span></div>
          </div>
          <div className="admin-stat-card" style={{ cursor: "pointer", border: filter === "not-attending" ? "2px solid #dc2626" : "" }} onClick={() => setFilter("not-attending")}>
            <div className="admin-stat-title" style={{ color: "#dc2626" }}><XCircle size={16} style={{display:"inline", marginBottom:"-2px"}}/> Katılamıyor</div>
            <div className="admin-stat-value" style={{ color: "#dc2626" }}>{notAttendingCount}</div>
          </div>
          <div className="admin-stat-card" style={{ cursor: "pointer", border: filter === "no-response" ? "2px solid #64748b" : "" }} onClick={() => setFilter("no-response")}>
            <div className="admin-stat-title" style={{ color: "#64748b" }}><HelpCircle size={16} style={{display:"inline", marginBottom:"-2px"}}/> Yanıt Vermedi</div>
            <div className="admin-stat-value" style={{ color: "#64748b" }}>{noResponseCount}</div>
          </div>
        </div>

        {/* 2. Misafir Ekle */}
        <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 className="admin-card-title" style={{ marginBottom: 0 }}>Misafir Ekle</h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setShowImport(!showImport)}>
                <Upload size={14} /> Toplu İçe Aktar
              </button>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={exportExcel}>
                <Download size={14} /> Listeyi İndir (Excel)
              </button>
            </div>
          </div>

          {showImport && (
            <div style={{ padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "1rem" }}>
              <p className="admin-hint">Excel'den ad ve telefon sütunlarını buraya yapıştırın. (Satır satır: İsim, Telefon, Kişi Sayısı)</p>
              <textarea 
                className="admin-input" 
                rows={5} 
                value={importText} 
                onChange={e => setImportText(e.target.value)} 
                placeholder="Örn:&#10;Ahmet Yılmaz&#9;05321234567&#9;2" 
              />
              <button className="admin-btn admin-btn-gold" style={{ marginTop: "0.5rem" }} onClick={parseCSV}>
                İçe Aktar
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <input type="text" className="admin-input" placeholder="Ad Soyad *" value={newGuest.name} onChange={e => setNewGuest({...newGuest, name: e.target.value})} onKeyDown={handleKeyDown} style={{ flex: "1 1 200px" }} />
            <input type="text" className="admin-input" placeholder="Telefon (İsteğe Bağlı)" value={newGuest.phone} onChange={e => setNewGuest({...newGuest, phone: e.target.value})} onKeyDown={handleKeyDown} style={{ flex: "1 1 150px" }} />
            <button className="admin-btn admin-btn-gold" onClick={addGuest} disabled={addingGuest}>
              <Plus size={16} /> Ekle
            </button>
            {showAddSuccess && <span style={{ color: "#16a34a", fontWeight: "bold", marginLeft: "0.5rem" }}>Eklendi ✓</span>}
          </div>
        </div>

        {/* 3. Misafir Listesi */}
        <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 className="admin-card-title" style={{ marginBottom: 0 }}>Misafir Listesi</h2>
            
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "0.75rem", color: "#999" }} />
                <input type="text" className="admin-input" placeholder="Misafir ara..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2.5rem", width: "200px" }} />
              </div>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setFilter("all")} style={{ background: filter === "all" ? "rgba(201,168,76,0.15)" : "" }}>Tümü</button>
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setFilter("unsent")} style={{ background: filter === "unsent" ? "rgba(201,168,76,0.15)" : "" }}>Gönderilmedi</button>
              
              <button className="admin-btn admin-btn-gold admin-btn-sm" onClick={openBulkReminder}>
                <Clock size={14} /> Yanıt Vermeyenlere Hatırlat
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }} className="mobile-table-card">
              <thead>
                <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", background: "#fafafa" }}>
                  <th style={{ padding: "0.875rem" }}>Misafir</th>
                  <th style={{ padding: "0.875rem" }}>Katılım</th>
                  <th style={{ padding: "0.875rem" }}>Mesaj</th>
                  <th style={{ padding: "0.875rem", textAlign: "right" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map(g => (
                  <tr key={g.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "0.875rem" }}>
                      <div style={{ fontWeight: 600 }}>{g.name}</div>
                      {g.phone && <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "2px" }}>{g.phone}</div>}
                    </td>
                    <td style={{ padding: "0.875rem" }}>
                      {g.rsvpStatus === "yes" && <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", background: "#dcfce7", color: "#16a34a", padding: "0.25rem 0.5rem", borderRadius: "1rem", fontSize: "0.75rem", fontWeight: 600 }}><CheckCircle2 size={12}/> Katılıyor ({g.rsvpCount} kişi)</span>}
                      {g.rsvpStatus === "no" && <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", background: "#fee2e2", color: "#dc2626", padding: "0.25rem 0.5rem", borderRadius: "1rem", fontSize: "0.75rem", fontWeight: 600 }}><XCircle size={12}/> Katılamıyor</span>}
                      {(!g.rsvpStatus || g.rsvpStatus === "none") && <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", background: "#f1f5f9", color: "#64748b", padding: "0.25rem 0.5rem", borderRadius: "1rem", fontSize: "0.75rem", fontWeight: 600 }}><HelpCircle size={12}/> Yanıt Yok</span>}
                      {g.rsvpNote && <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "4px", fontStyle: "italic", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={g.rsvpNote}><FileText size={10} style={{display:"inline"}}/> {g.rsvpNote}</div>}
                    </td>
                    <td style={{ padding: "0.875rem", color: "#666", fontSize: "0.75rem" }}>
                      {!g.sent && "Gönderilmedi"}
                      {g.sent && g.messageSentAt && <div>Davet: {new Date(g.messageSentAt).toLocaleDateString("tr-TR")}</div>}
                      {g.sent && !g.messageSentAt && <div>Davet: Gönderildi</div>}
                      {g.reminderSentAt && <div>Hatırlatma: {new Date(g.reminderSentAt).toLocaleDateString("tr-TR")}</div>}
                    </td>
                    <td style={{ padding: "0.875rem", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "0.35rem", alignItems: "center" }}>
                      {(!g.rsvpStatus || g.rsvpStatus === "none") && (
                        <>
                          {!g.sent ? (
                            <button className="admin-btn admin-btn-sm" style={{ background: "#25D366", color: "#fff" }} onClick={() => openSendModal(g)}>
                              <Send size={14} /> Davet Gönder
                            </button>
                          ) : (
                            <button className="admin-btn admin-btn-sm" style={{ background: "#f97316", color: "#fff" }} onClick={() => handleSend(g, "reminder")}>
                              <Clock size={14} /> Hatırlat
                            </button>
                          )}
                        </>
                      )}
                      
                      {g.rsvpStatus === "yes" && (
                         <button className="admin-btn admin-btn-sm" style={{ background: "#3b82f6", color: "#fff" }} onClick={() => handleSend(g, "thankyou")}>
                           <MessageCircle size={14} /> Teşekkür
                         </button>
                      )}
                      
                      {/* Simple dropdown or manual actions could go here. For now, inline minimal actions */}
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => copyLink(g)} title="Linki Kopyala"><Copy size={14} /></button>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" style={{ color: "#dc2626", borderColor: "#fecaca" }} onClick={() => deleteGuest(g.id)} title="Sil"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
                {filteredGuests.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>Kayıt bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3.5. Eşleşmemiş Yanıtlar (Genel Linkten Gelenler) */}
        {unmatchedRsvps.length > 0 && (
          <div className="admin-card" style={{ marginBottom: "1.5rem", borderLeft: "4px solid #f97316" }}>
            <h2 className="admin-card-title" style={{ marginBottom: "0.5rem", color: "#f97316" }}>Eşleşmemiş Yanıtlar (Genel Linkten Gelenler)</h2>
            <p className="admin-hint" style={{ marginBottom: "1rem" }}>Aşağıdaki kişiler özel link yerine genel davetiye linkinden (isimsiz) LCV formunu doldurmuş. Onları mevcut bir misafir kaydıyla eşleştirebilirsiniz.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {unmatchedRsvps.map(rsvp => (
                <div key={rsvp.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "#fff", border: "1px solid #eee", borderRadius: "8px", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{rsvp.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>Tel: {rsvp.phone || "-"} | {rsvp.attending === "yes" ? `Katılıyor (${rsvp.count} kişi)` : "Katılamıyor"}</div>
                    {rsvp.note && <div style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#999" }}>Not: {rsvp.note}</div>}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <select 
                      className="admin-input" 
                      style={{ minWidth: "150px" }}
                      onChange={e => e.target.value && linkRsvpToGuest(rsvp, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Misafir Seç (Eşleştir)</option>
                      {guests.filter(g => !g.rsvpStatus || g.rsvpStatus === "none").map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => createGuestFromRsvp(rsvp)}>
                      Yeni Misafir Olarak Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Mesaj Şablonları (Collapsible) */}
        <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
          <div 
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", margin: "-1.25rem", padding: "1.25rem" }}
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <h2 className="admin-card-title" style={{ marginBottom: 0 }}>Mesaj Şablonlarını Düzenle</h2>
            {showTemplates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {showTemplates && (
            <div style={{ marginTop: "1.5rem" }}>
              <div className="admin-field">
                <label className="admin-label">Değişkenler (Tıklayıp ekleyin)</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {["{isim}", "{cift}", "{tarih}", "{saat}", "{mekan}", "{link}"].map(tag => (
                    <button key={tag} onClick={() => appendToTemplate(tag, setTemplate)} className="admin-btn admin-btn-outline admin-btn-sm" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                {/* Davet */}
                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px" }}>
                  <label className="admin-label">1. Davet Mesajı</label>
                  <textarea className="admin-input" rows={5} value={template} onChange={e => setTemplate(e.target.value)} />
                </div>
                {/* Hatırlatma */}
                <div style={{ background: "#fffbeb", padding: "1rem", borderRadius: "8px" }}>
                  <label className="admin-label">2. Hatırlatma Mesajı</label>
                  <textarea className="admin-input" rows={4} value={reminderTemplate} onChange={e => setReminderTemplate(e.target.value)} />
                </div>
                {/* Teşekkür */}
                <div style={{ background: "#eff6ff", padding: "1rem", borderRadius: "8px" }}>
                  <label className="admin-label">3. Teşekkür / Bilgi Mesajı</label>
                  <textarea className="admin-input" rows={4} value={thankYouTemplate} onChange={e => setThankYouTemplate(e.target.value)} />
                </div>
                {/* Karşılama */}
                <div style={{ background: "#fdfbf7", padding: "1rem", borderRadius: "8px", border: "1px solid var(--admin-border)" }}>
                  <label className="admin-label">Kişiye Özel Davetiye Karşılama Metni</label>
                  <p className="admin-hint">Misafir siteyi açtığında en üstte görünür.</p>
                  <input type="text" className="admin-input" value={personalGreeting} onChange={e => setPersonalGreeting(e.target.value)} />
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                <button className="admin-btn admin-btn-gold" onClick={saveSettings} disabled={savingTemplate}>
                  <Save size={16} /> {savingTemplate ? "Kaydediliyor..." : "Şablonları Kaydet"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. Genel Paylaşım */}
        <div className="admin-card" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
          <h2 className="admin-card-title">Genel Paylaşım (İsimsiz)</h2>
          <p className="admin-hint" style={{ marginBottom: "1rem" }}>Herkese açık genel davetiye linki (Kişiye özel hitap içermez).</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <a href={getWaLink(null, "generic")} target="_blank" rel="noopener noreferrer" className="admin-btn" style={{ backgroundColor: "#25D366", color: "#fff", flex: 1, textDecoration: "none", minWidth: "200px" }}>
              <Send size={16} /> WhatsApp'ta Paylaş
            </a>
            <button className="admin-btn admin-btn-outline" onClick={() => copyLink()}>
              <Copy size={16} /> Linki Kopyala
            </button>
          </div>
        </div>

      </div>

      {/* Bulk Reminder Modal */}
      {showBulkReminder && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div className="admin-card" style={{ width: "90%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setShowBulkReminder(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}><XCircle size={24} color="#666" /></button>
            <h2 className="admin-card-title" style={{ color: "#f97316" }}><Clock size={20} /> Yanıt Vermeyenlere Hatırlat</h2>
            <p className="admin-hint">Yanıt vermemiş {bulkReminderQueue.length} misafir bulundu. Sırayla gönder butonuna basarak hızla ilerleyebilirsiniz.</p>
            
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {bulkReminderQueue.map((g, idx) => (
                <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", border: "1px solid #eee", borderRadius: "8px", background: g.status === "done" ? "#f0fdf4" : "#fff" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: g.status === "done" ? "#999" : "#333", textDecoration: g.status === "done" ? "line-through" : "none" }}>{g.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>{g.phone}</div>
                  </div>
                  {g.status === "done" ? (
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>Gönderildi ✓</span>
                  ) : (
                    <button className="admin-btn admin-btn-sm" style={{ background: "#25D366", color: "#fff" }} onClick={() => handleBulkSend(idx)}>
                      <Send size={14} /> Gönder
                    </button>
                  )}
                </div>
              ))}
              {bulkReminderQueue.length === 0 && (
                <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>Hatırlatma gönderilecek kimse kalmadı.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Template Selection Modal */}
      {sendModalGuest && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div className="admin-card" style={{ width: "90%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setSendModalGuest(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}><XCircle size={24} color="#666" /></button>
            <h2 className="admin-card-title" style={{ color: "#25D366" }}><Send size={20} /> Şablon Seçimi</h2>
            <p className="admin-hint"><strong>{sendModalGuest.name}</strong> adlı misafire göndermek istediğiniz davet şablonunu seçin.</p>
            
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.5rem", color: "#333" }}>1. Şablon (Ana Davet)</div>
                <textarea 
                  className="admin-input" 
                  rows={4} 
                  value={modalCustomText1} 
                  onChange={(e) => setModalCustomText1(e.target.value)} 
                  style={{ background: "#f9fafb", padding: "0.5rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
                <button className="admin-btn admin-btn-sm" style={{ background: "#25D366", color: "#fff", width: "100%", marginTop: "0.5rem" }} onClick={() => { handleSend(sendModalGuest, "invite", modalCustomText1); setSendModalGuest(null); }}>Bu Şablonla Gönder</button>
              </div>

              <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.5rem", color: "#333" }}>2. Şablon (Samimi)</div>
                <textarea 
                  className="admin-input" 
                  rows={4} 
                  value={modalCustomText2} 
                  onChange={(e) => setModalCustomText2(e.target.value)} 
                  style={{ background: "#f9fafb", padding: "0.5rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
                <button className="admin-btn admin-btn-sm" style={{ background: "#25D366", color: "#fff", width: "100%", marginTop: "0.5rem" }} onClick={() => { handleSend(sendModalGuest, "invite2", modalCustomText2); setSendModalGuest(null); }}>Bu Şablonla Gönder</button>
              </div>

              <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.5rem", color: "#333" }}>3. Şablon (Kısa)</div>
                <textarea 
                  className="admin-input" 
                  rows={4} 
                  value={modalCustomText3} 
                  onChange={(e) => setModalCustomText3(e.target.value)} 
                  style={{ background: "#f9fafb", padding: "0.5rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
                <button className="admin-btn admin-btn-sm" style={{ background: "#25D366", color: "#fff", width: "100%", marginTop: "0.5rem" }} onClick={() => { handleSend(sendModalGuest, "invite3", modalCustomText3); setSendModalGuest(null); }}>Bu Şablonla Gönder</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Style overrides for this page responsive mobile table cards */}
      <style dangerouslySetInnerHTML={{__html:`
        .template-hover:hover {
          border-color: #25D366 !important;
          background-color: #f0fdf4 !important;
        }
        @media (max-width: 768px) {
          .mobile-table-card thead { display: none; }
          .mobile-table-card tbody tr {
            display: block;
            border: 1px solid var(--admin-border) !important;
            border-radius: 8px;
            margin-bottom: 1rem;
            padding: 0.5rem;
          }
          .mobile-table-card td {
            display: block;
            text-align: left !important;
            padding: 0.5rem !important;
          }
          .mobile-table-card td:last-child {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            border-top: 1px solid #eee;
            margin-top: 0.5rem;
            padding-top: 0.75rem !important;
          }
        }
      `}} />
    </div>
  );
}

