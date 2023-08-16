import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

export async function chain1() {
  const chat = new ChatOpenAI({
    temperature: 1.7,
    maxTokens: 500,
    streaming: true,
  });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a {assistant_type} assistant."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
  });

  const response = await chain.call({
    assistant_type: "ROBOCOP",
    text: "HELP SAVE THE CITY.",
  });
  return response;
}
