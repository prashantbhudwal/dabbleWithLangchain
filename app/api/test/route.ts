import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { documentLoader } from "../lib/documentLoaders";
export const dynamic = "force-dynamic";
const talkToOpenAI = async function () {
  const model = new OpenAI({
    temperature: 2,
    maxTokens: 500,
  });
  const res = await model.call("What are you doing?");
  return res;
};

const usingATemplate = async function () {
  const firstQuestion = "Can you tell me what do you like about {sport}?";

  const template = new PromptTemplate({
    template: firstQuestion,
    inputVariables: ["sport"],
  });

  const finalPrompt = await template.format({
    sport: "hockey",
  });

  const model = new OpenAI({
    temperature: 0.5,
  });

  return model.call(finalPrompt);
};

const creatingAChain = async function () {
  const templateBase = "What do you hate about {subject}?";

  const prompt = new PromptTemplate({
    template: templateBase,
    inputVariables: ["subject"],
  });

  const model = new OpenAI({
    temperature: 0.7,
  });

  const chain = new LLMChain({
    llm: model,
    prompt: prompt,
  });

  return chain.call({
    subject: "Chemistry",
  });
};

export async function GET() {
  const res = await documentLoader();
  return NextResponse.json(res);
}
