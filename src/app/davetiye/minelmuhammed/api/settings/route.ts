export const dynamic = 'force-dynamic';
/**
 * Halka açık Ayarlar API'si — davetiye sayfası bu endpoint'ten ayarları okur.
 * Yalnızca GET desteklenir.
 */

import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Ayarlar okunamadı" }, { status: 500 });
  }
}
