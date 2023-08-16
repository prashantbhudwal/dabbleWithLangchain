export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { embedDocuments, embedString } from "../lib/embeddings";
import { pdfLoader } from "../lib/documentLoaders";
import { Test } from "../lib/vectordb";
import { chain1 } from "../lib/chains";

export async function GET() {
  const res = await chain1();
  return NextResponse.json(res);
}
