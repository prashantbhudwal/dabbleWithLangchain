import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/dist/document";

const openaiEmbeddings = new OpenAIEmbeddings({});

export async function embedString(sentence: string) {
  const embeddings = await openaiEmbeddings.embedQuery(sentence);
  return embeddings;
}

export async function embedDocuments(documents: string[]) {
  const embeddings = await openaiEmbeddings.embedDocuments(documents);
  return embeddings;
}
