export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { embedDocuments, embedString } from "../lib/embeddings";
import { pdfLoader } from "../lib/documentLoaders";
import { Test } from "../lib/vectordb";

export async function GET() {
  const res = await Test();
  return NextResponse.json(res);
}
