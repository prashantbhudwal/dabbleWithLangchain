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

export async function GET() {
  const res = await usingATemplate();
  return NextResponse.json(res);
}
