import { ChatOpenAI } from "langchain/chat_models/openai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatPromptTemplate } from "langchain/prompts";
const MODEL_NAME = "gpt-4";

const extractionFunctionJsonSchema = zodToJsonSchema(
  z.object({
    sentiment: z
      .enum(["positive", "negative", "neutral"])
      .describe("The overall sentiment of the text"),
    language: z
      .string()
      .describe("The language of the text (should be ISO 639-1 code)"),
  })
);

export async function extractSentiment() {
  console.log(extractionFunctionJsonSchema);

  const taggingFunction = {
    name: "tag_sentiment",
    description: "```Tag a piece of text with sentiment info.```",
    parameters: extractionFunctionJsonSchema,
  };

  const model = new ChatOpenAI({
    modelName: MODEL_NAME,
    temperature: 0,
  });

  const functionBoundModel = model.bind({
    functions: [taggingFunction], // bind the function to the model
    function_call: { name: "tag_sentiment" }, // force it to always do tagging
  });

  const systemTemplate =
    "Think carefully, and then tag the sentiment of this text as instructed.";
  const humanTemplate = "{input}";
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", humanTemplate],
  ]);

  const formattedPrompt = await prompt.formatMessages({
    input: "I love this product!",
  });

  const result = await functionBoundModel.invoke(formattedPrompt);
  console.log("⚪️", result);

  // Using LECL
  const taggingChain = prompt.pipe(functionBoundModel);
  const result2 = await taggingChain.invoke({
    input: "Menu eh product bahut changa lagda hai!",
  });
  console.log("⚫️", result2);
  return { result, result2 };
}
