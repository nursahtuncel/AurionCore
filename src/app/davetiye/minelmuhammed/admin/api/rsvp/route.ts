export const dynamic = 'force-dynamic';
/**
 * Admin RSVP API'si — yanıtları listele ve sil.
 */

import { NextResponse } from "next/server";
import { getRsvpList, deleteRsvp } from "@/lib/db";

// Tüm RSVP yanıtlarını getir
export async function GET() {
  try {
    const list = await getRsvpList();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Veriler okunamadı" }, { status: 500 });
  }
}

// RSVP yanıtını sil
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deleted = await deleteRsvp(id);
    if (!deleted) {
      return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
  }
}
