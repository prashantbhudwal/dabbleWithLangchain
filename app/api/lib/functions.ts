import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
export async function myFirstFunction() {
  const extractionFunctionSchema = {
    name: "extractor",
    description: "Extracts fields from the input.",
    parameters: zodToJsonSchema(
      z.object({
        tone: z
          .enum(["positive", "negative"])
          .describe("The overall tone of the input"),
        entity: z.string().describe("The entity mentioned in the input"),
        word_count: z.number().describe("The number of words in the input"),
        chat_response: z.string().describe("A response to the human's input"),
        final_punctuation: z
          .optional(z.string())
          .describe("The final punctuation mark in the input, if any."),
      })
    ),
  };

  const test = zodToJsonSchema(
    z.object({
      tone: z
        .enum(["positive", "negative"])
        .describe("The overall tone of the input"),
      entity: z.string().describe("The entity mentioned in the input"),
      word_count: z.number().describe("The number of words in the input"),
      chat_response: z.string().describe("A response to the human's input"),
      final_punctuation: z
        .optional(z.string())
        .describe("The final punctuation mark in the input, if any."),
    })
  );

  console.log(test);
  
  const model = new ChatOpenAI({
    modelName: "gpt-4",
  }).bind({
    functions: [extractionFunctionSchema],
    function_call: { name: "extractor" },
  });

  const result = await model.invoke([
    new HumanMessage("What a beautiful day!"),
  ]);

  console.log(result);
}
