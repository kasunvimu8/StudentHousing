import { NextRequest, NextResponse } from "next/server";
import { getUserType } from "@/actions/profiles";

const isAuthenticated = (request: NextRequest) => true;

async function adminCheckMiddleware(request: NextRequest) {
  // do the admin check
  const userType = await getUserType();
  const isAdmin = userType === "admin";
  const manageProperty =
    request.nextUrl.pathname.startsWith("/manage-properties");
  const manageReservations = request.nextUrl.pathname.startsWith(
    "/manage-reservations"
  );
  const editProperty = request.nextUrl.pathname.startsWith("/property/edit");
  const createProperty =
    request.nextUrl.pathname.startsWith("/property/create");

  if (
    (manageProperty || editProperty || createProperty || manageReservations) &&
    !isAdmin
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  return NextResponse.next();
}

export default async function middleWare(request: NextRequest) {
  if (!isAuthenticated(request)) {
    // Redirect to the login
    return Response.json(
      { success: false, message: "Will redirect to the login page" },
      { status: 401 }
    );
  }

  return await adminCheckMiddleware(request);
}
