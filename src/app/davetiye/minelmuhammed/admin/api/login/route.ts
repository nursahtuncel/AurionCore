/**
 * Admin giriş API'si — tek kullanıcı, basit şifre kontrolü.
 * Kullanıcı adı ve şifre .env.local'den okunur.
 */

import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // .env.local'den oku
    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (username === validUser && password === validPass) {
      // Başarılı giriş — oturum oluştur
      await createSession(username);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
