import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const publicRoutes = ["/login", "/register", "/"];

export default async function middleWare(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : undefined;

  if (!isPublicRoute && !session?.userId) {
    // return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
