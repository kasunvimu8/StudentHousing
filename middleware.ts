import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { adminType } from "./constants";

const publicRoutes = ["/login", "/register"];
const adminRouts = [
  "/manage-properties",
  "/property/edit",
  "/property/create",
  "/manage-reservations",
];

export default async function middleWare(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session: any = cookie ? await decrypt(cookie) : undefined;
  const isAdminPath = adminRouts.some((adminRoute) =>
    request.nextUrl.pathname.startsWith(adminRoute)
  );
  const isAdmin = session?.user?.role
    ? session?.user?.role === adminType
    : false;

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL("/not-found", request.nextUrl));
  }

  if (!isPublicRoute && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images/logo.svg).*)",
  ],
};
