import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login"];

function isProtectedAdmin(pathname: string): boolean {
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) return false;
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedAdmin(pathname)) {
    const session = request.cookies.get("ssa_admin_session");
    if (!session?.value || !session.value.includes(".")) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|uploads|fonts).*)",
  ],
};
