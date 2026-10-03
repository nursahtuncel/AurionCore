export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getWhatsAppSettings, updateWhatsAppSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getWhatsAppSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Ayarlar okunamadı" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = await updateWhatsAppSettings(body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Ayarlar güncellenemedi" }, { status: 500 });
  }
}
