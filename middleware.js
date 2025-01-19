import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const { jwtDecode } = require("jwt-decode"); // Use CommonJS import for jwt-decode

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the accessToken from cookies
  const accessToken = cookies().get("woof_spot_accessToken")?.value;
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the token
    const decodedData = jwtDecode(accessToken);
    console.log("Decoded Data:", decodedData);

    const role = decodedData?.role;
    console.log("User Role:", role);

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
        console.log("Unauthorized: User is not an admin.");
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
      return NextResponse.next(); // Allow access to logged-in users
    }

    console.log("Unauthorized access to an undefined route.");
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Error decoding token:", error.message);
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
