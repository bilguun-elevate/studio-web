import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const country = req.headers.get("x-vercel-ip-country") ?? "US";
  res.cookies.set("geo_country", country, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60,
  });
  return res;
}

export const config = { matcher: "/" };
