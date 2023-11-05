export const dynamic = "force-dynamic";
import { myFirstFunction } from "../lib/functions";

import { NextResponse } from "next/server";
import { embedDocuments, embedString } from "../lib/embeddings";
import { pdfLoader } from "../lib/documentLoaders";
import { Test } from "../lib/vectordb";
import { chain1 } from "../lib/chains";
import run from "../lib/templates";
import { extractSentiment } from "../lib/agents/tagging";

export async function GET() {
  const res = await extractSentiment();
  return NextResponse.json("Hello World!");
}
