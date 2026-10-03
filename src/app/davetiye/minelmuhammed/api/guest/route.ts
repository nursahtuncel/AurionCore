export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getWhatsAppGuestByHash, getWhatsAppSettings } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const hash = url.searchParams.get("m");
    if (!hash) return NextResponse.json({ error: "Hash gerekli" }, { status: 400 });
    
    const guest = await getWhatsAppGuestByHash(hash);
    if (!guest) {
      return NextResponse.json({ error: "Misafir bulunamadı" }, { status: 404 });
    }
    
    const settings = await getWhatsAppSettings();
    const greeting = settings.personalGreeting.replace(/{isim}/g, guest.name);
    
    return NextResponse.json({ ...guest, greeting });
  } catch (error) {
    return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
  }
}

