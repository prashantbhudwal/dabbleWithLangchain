export const dynamic = "force-dynamic";
import { myFirstFunction } from "../lib/function-calling/1_basics";

import { NextResponse } from "next/server";
import { embedDocuments, embedString } from "../lib/embeddings";
import { pdfLoader } from "../lib/documentLoaders";
import { Test } from "../lib/vectordb";
import { chain1 } from "../lib/chains";
import run from "../lib/templates";
import { tagSentiment } from "../lib/function-calling/2_tagging";
import { extractInformation } from "../lib/function-calling/3_extraction";

export async function GET() {
  const res = await extractInformation();
  return NextResponse.json("Hello World!");
}
