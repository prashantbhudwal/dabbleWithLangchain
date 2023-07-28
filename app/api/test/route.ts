export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { splitMarkdown } from "../lib/textSplitters";

export async function GET() {
  const res = await splitMarkdown();
  return NextResponse.json(res);
}
