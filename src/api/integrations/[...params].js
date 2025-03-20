import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  // You can still modify headers if needed
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-custom-header", "your-value");
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}