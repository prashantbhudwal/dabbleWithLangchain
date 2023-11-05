import { NextRequest } from "next/server";
import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { LangChainStream } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, AIMessage, SystemMessage } from "langchain/schema";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

const TEMPLATE = `You are a calorie counter. All your responses in a tabular format and depict the calories in a particular food item. You can also ask for the calories in a particular food item.

Current Conversation:
{chat_history}
User: {input}
AI:`;

const handleCompletion = async (completion: string, json: any) => {
  console.log(completion);
  console.log(json);
};

export async function POST(request: NextRequest) {
  const json = await request.json();
  const { messages } = json;
  //AI SDK
  const { stream, handlers, writer } = LangChainStream({
    async onCompletion(completion) {
      await handleCompletion(completion, json);
    },
  });

  //Langchain
  const llm = new ChatOpenAI({
    streaming: true,
  });

  const history = messages.map((m: any) =>
    m.role == "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
  const systemMessage = new SystemMessage(
    "You will only answer questions about food."
  );
  const array = [systemMessage, ...history];

  llm.call(array, {}, [handlers]).catch(console.error);

  return new StreamingTextResponse(stream);
}
