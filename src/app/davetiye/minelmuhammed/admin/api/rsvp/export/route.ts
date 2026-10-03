export const dynamic = 'force-dynamic';
/**
 * Admin RSVP CSV/Excel dışa aktarma API'si.
 */

import { NextResponse } from "next/server";
import { getRsvpList } from "@/lib/db";

export async function GET() {
  try {
    const list = await getRsvpList();

    // CSV başlıkları
    const headers = ["Ad Soyad", "Telefon", "Katılım", "Merasim", "Yetişkin", "Çocuk", "Not", "Tarih"];
    const rows = list.map((r) => [
      r.name,
      r.phone || "-",
      r.attending === "yes" ? "Katılıyor" : "Katılamıyor",
      r.ceremony || "-",
      r.count || "-",
      r.children || "-",
      r.note || "-",
      new Date(r.createdAt).toLocaleString("tr-TR"),
    ]);

    // CSV oluştur (BOM ile Excel uyumlu)
    const bom = "\uFEFF";
    const csv = bom + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="katilim-listesi.csv"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Dışa aktarma hatası" }, { status: 500 });
  }
}
