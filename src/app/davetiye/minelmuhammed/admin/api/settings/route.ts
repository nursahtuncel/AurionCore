export const dynamic = 'force-dynamic';
/**
 * Davetiye ayarları API'si.
 * GET  → mevcut ayarları döndür
 * PUT  → ayarları güncelle
 */

import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db";

// Ayarları getir
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Ayarlar okunamadı" }, { status: 500 });
  }
}

// Ayarları güncelle
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = await updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ error: "Ayarlar kaydedilemedi" }, { status: 500 });
  }
}
