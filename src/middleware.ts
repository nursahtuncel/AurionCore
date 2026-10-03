/**
 * Middleware — Admin sayfalarına erişim kontrolü.
 * Giriş yapılmamışsa login sayfasına yönlendirir.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const adminPath = "/davetiye/minelmuhammed/admin";
  const pathname = request.nextUrl.pathname;

  // Sadece admin rotalarını kontrol et
  if (!pathname.startsWith(adminPath)) {
    return NextResponse.next();
  }

  // Login sayfası ve API rotaları herkese açık
  if (
    pathname === `${adminPath}/login` ||
    pathname.startsWith(`${adminPath}/api/login`) ||
    pathname.startsWith(`${adminPath}/api/logout`)
  ) {
    return NextResponse.next();
  }

  // Oturum kontrolü
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL(`${adminPath}/login`, request.url));
  }

  try {
    await jwtVerify(session, key, { algorithms: ["HS256"] });
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(`${adminPath}/login`, request.url));
  }
}

export const config = {
  matcher: ["/davetiye/minelmuhammed/admin/:path*"],
};
