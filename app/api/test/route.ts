export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { splitIntoTokens } from "../lib/textSplitters";

export async function GET() {
  const res = await splitIntoTokens();
  return NextResponse.json(res);
}
