export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { splitPDF } from "../lib/textSplitters";

export async function GET() {
  const res = await splitPDF();
  return NextResponse.json(res);
}
