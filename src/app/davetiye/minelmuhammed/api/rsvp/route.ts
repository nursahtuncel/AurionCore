/**
 * Halka açık RSVP (LCV) API'si — misafirler buraya form gönderir.
 */

import { NextResponse } from "next/server";
import { addRsvp, getWhatsAppGuestByHash, updateWhatsAppGuest } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, attending, ceremony, count, children, note, hash } = body;

    if (!name || !attending) {
      return NextResponse.json({ error: "Ad ve katılım bilgisi zorunludur." }, { status: 400 });
    }

    let whatsappGuestId = undefined;
    
    // If a hash was provided (guest opened personalized link)
    if (hash) {
      const guest = await getWhatsAppGuestByHash(hash);
      if (guest) {
        whatsappGuestId = guest.id;
        // Update the guest row with RSVP details
        await updateWhatsAppGuest(guest.id, {
          rsvpStatus: attending,
          rsvpCount: count || "1",
          rsvpChildren: children || "0",
          rsvpNote: note || "",
        });
      }
    }

    const payload: any = {
      name,
      phone: phone || "",
      attending,
      ceremony: ceremony || "",
      count: count || "1",
      children: children || "0",
      note: note || ""
    };
    
    if (whatsappGuestId) {
      payload.whatsappGuestId = whatsappGuestId;
    }

    const entry = await addRsvp(payload);

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 });
  }
}
