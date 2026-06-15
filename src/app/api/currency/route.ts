import { NextRequest, NextResponse } from "next/server";
import { getCurrencyForCountry } from "@/lib/currency";

export async function GET(req: NextRequest) {
  // Next.js 16 exposes the geo header set by the CDN / proxy
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    req.headers.get("x-country-code") ??
    "IN";

  const currency = getCurrencyForCountry(country.toUpperCase());
  return NextResponse.json({ currency, country });
}
