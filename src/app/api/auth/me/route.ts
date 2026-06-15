import { NextResponse } from "next/server";
import { getCurrentUser } from "@/auth/current-user";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
