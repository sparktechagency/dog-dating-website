import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getFromLocalStorage } from "./utils/local-storage";
const { jwtDecode } = require("jwt-decode"); // Use CommonJS import for jwt-decode

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get("woof_spot_accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the token
    const decodedData = jwtDecode(accessToken);

    const role = decodedData?.role;

    // Admin-only routes
    const adminRoutes = [
      "/dashboard/all-products",
      "/dashboard/shelter",
      "/dashboard/donation",
      "/dashboard/members",
    ];

    // Check if the route is an admin-only route
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (role === "admin") {
        return NextResponse.next(); // Allow admin access
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // General private routes (accessible to all logged-in users)
    const privateRoutes = [
      "/friends",
      "/woof-mail",
      "/fetch-worthy-finds",
      "/featured-pups",
      "/profile",
    ];

    if (privateRoutes.some((route) => pathname.startsWith(route))) {
      if (role === "admin" || role === "user") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/friends",
    "/woof-mail",
    "/fetch-worthy-finds",
    "/featured-pups",
    "/dashboard/all-products",
    "/dashboard/shelter",
    "/dashboard/donation",
    "/dashboard/members",
    "/profile",
  ],
};
