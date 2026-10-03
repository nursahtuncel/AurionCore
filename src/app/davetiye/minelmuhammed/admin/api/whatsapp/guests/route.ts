export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getWhatsAppGuests, addWhatsAppGuest, deleteWhatsAppGuest, updateWhatsAppGuest } from "@/lib/db";

export async function GET() {
  try {
    const guests = await getWhatsAppGuests();
    return NextResponse.json(guests);
  } catch {
    return NextResponse.json({ error: "Misafirler okunamadı" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if it's a bulk insert (array) or single insert (object)
    if (Array.isArray(body)) {
      const results = [];
      for (const guest of body) {
        if (!guest.name) continue;
        const result = await addWhatsAppGuest(guest);
        results.push(result);
      }
      return NextResponse.json(results);
    } else {
      const result = await addWhatsAppGuest(body);
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json({ error: "Misafir eklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    
    const success = await updateWhatsAppGuest(id, updates);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Misafir güncellenemedi" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    
    const success = await deleteWhatsAppGuest(id);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Silinemedi" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
