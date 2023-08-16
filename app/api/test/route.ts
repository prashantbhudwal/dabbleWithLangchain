export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { embedDocuments, embedString } from "../lib/embeddings";
import { pdfLoader } from "../lib/documentLoaders";
import { Test } from "../lib/vectordb";
import { chain1 } from "../lib/chains";
import run from "../lib/templates";

export async function GET() {
  const res = await run();
  return NextResponse.json(res);
}
