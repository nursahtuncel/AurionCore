export const dynamic = 'force-dynamic';
/**
 * Admin Misafir Defteri API'si — mesajları listele ve sil.
 */

import { NextResponse } from "next/server";
import { getGuestbook, deleteGuestbookEntry } from "@/lib/db";

// Tüm mesajları getir
export async function GET() {
  try {
    const list = await getGuestbook();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Veriler okunamadı" }, { status: 500 });
  }
}

// Mesaj sil
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deleted = await deleteGuestbookEntry(id);
    if (!deleted) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
  }
}
