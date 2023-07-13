import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const talkToOpenAI = async function () {
  const model = new OpenAI({
    temperature: 2,
    maxTokens: 500,
  });

  const res = await model.call("What are you doing?");
  return res;
};

export async function GET() {
  const res = await talkToOpenAI();
  return NextResponse.json(res);
}
