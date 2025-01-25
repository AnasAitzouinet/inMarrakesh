import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(req: NextRequest) {


  // 1. Get the current hostname
  const hostname = req.headers.get('host') || ''
  // 2. If the request comes from admin.example.com,
  //    rewrite the request path to /admin/<whatever>
  if (hostname === 'admin.localhost:3000') {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: req.nextUrl.origin,
        headers: {
          //get the cookie from the request
          cookie: req.headers.get("cookie") || "",
        },
      },
    );
    // Clone the NextURL object so we can modify it
    const url = req.nextUrl.clone()

    // e.g. If path is '/', rewrite to '/admin'
    //      If path is '/some-page', rewrite to '/admin/some-page'
    url.pathname = '/Admin' + url.pathname

    return NextResponse.rewrite(url)
  }

  // Otherwise, allow the request to pass through normally
  return NextResponse.next()
}

// middleware.ts
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}