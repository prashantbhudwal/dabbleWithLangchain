import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate, PipelinePromptTemplate } from "langchain/prompts";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

export default async function run() {
  return await Promise.all([
    templateOne(),
    templateTwo(),
    chatTemplate(),
    pipelineTemplate(),
  ]);
}
//Method 1: using fromTemplate
export async function templateOne() {
  const prompt = PromptTemplate.fromTemplate(
    "What do you hate about {subject}?"
  );

  const formattedPrompt = await prompt.format({
    subject: "Chemistry",
  });

  return formattedPrompt;
}

//Method 2: Using prompt template class
export async function templateTwo() {
  const prompt = new PromptTemplate({
    template: "What do you hate about {subject} and {dog}?",
    inputVariables: ["subject", "dog"],
  });

  const formattedPrompt = await prompt.format({
    subject: "Chemistry",
    dog: "dog",
  });

  return formattedPrompt;
}

//Chat Models

export async function chatTemplate() {
  const systemTemplate =
    "You translate {input_language} to {output_language}. Never include the any text in the input language.";
  const systemPrompt = SystemMessagePromptTemplate.fromTemplate(systemTemplate);

  const humanTemplate = "{text}";

  const humanPrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    systemPrompt,
    humanPrompt,
  ]);

  const formattedPrompt = await chatPrompt.formatMessages({
    input_language: "English",
    output_language: "Hindi",
    text: "Hello, how are you?",
  });

  const model = new ChatOpenAI({
    temperature: 0.7,
  });

  return model.call(formattedPrompt);
}

//Pipeline Prompt

export async function pipelineTemplate() {
  const prompt = PromptTemplate.fromTemplate(`
{prompt 1}

{prompt 2}

{prompt 3}
`);

  const prompt1 = PromptTemplate.fromTemplate(`
You are a helpful assistant.
`);

  const prompt2 = PromptTemplate.fromTemplate(`
  You convert {input_language} to {output_language}.
  `);

  const prompt3 = PromptTemplate.fromTemplate(`
  {text}`);

  const composedPrompt = new PipelinePromptTemplate({
    pipelinePrompts: [
      {
        name: "prompt 1",
        prompt: prompt1,
      },
      {
        name: "prompt 2",
        prompt: prompt2,
      },
      {
        name: "prompt 3",
        prompt: prompt3,
      },
    ],
    finalPrompt: prompt,
  });

  const formattedPrompt = await composedPrompt.format({
    input_language: "English",
    output_language: "Hindi",
    text: "Hello, how are you?",
  });

  console.log(formattedPrompt);

  const model = new OpenAI({
    temperature: 0.7,
  });
  return model.call(formattedPrompt);
}
