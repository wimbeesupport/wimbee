import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/autodiscover") ||
    pathname === "/xmlrpc.php" ||
    pathname.startsWith("/wp-") ||
    pathname.endsWith(".php") ||
    pathname === "/.env" ||
    pathname.startsWith("/.git") ||
    pathname.startsWith("/cgi-bin") ||
    pathname.startsWith("/vendor/")
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  // matcher: "/((?!api|static|.*\\..*|_next).*)" skips paths with dots (like .php, .env).
  // We remove the dot-file exclusion so our bot blocker can catch them, 
  // and manually exclude known static asset extensions if needed, or rely on Next's default handling.
  matcher: [
    "/((?!api|static|_next/static|_next/image|favicon.ico|.*\\.(?:css|js|jpe?g|webp|png|gif|svg|ico|woff2?|ttf|eot)).*)",
  ],
};
