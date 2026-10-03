export const dynamic = 'force-dynamic';
/**
 * Halka açık Misafir Defteri API'si — misafirler buraya dilek mesajı gönderir.
 * GET → onaylı mesajları listeler (davetiye sayfasında gösterilir).
 */

import { NextResponse } from "next/server";
import { addGuestbookEntry, getGuestbook } from "@/lib/db";

// Tüm mesajları getir (davetiye sayfası için)
export async function GET() {
  try {
    const list = await getGuestbook();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Veriler okunamadı" }, { status: 500 });
  }
}

// Yeni mesaj ekle
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Ad ve mesaj zorunludur." }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "Mesaj en fazla 500 karakter olabilir." }, { status: 400 });
    }

    const entry = await addGuestbookEntry({ name: name.trim(), message: message.trim() });
    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 });
  }
}
