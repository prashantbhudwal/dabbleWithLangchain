import { NextRequest } from "next/server";
import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { LangChainStream } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, AIMessage } from "langchain/schema";

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

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const { stream, handlers, writer } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  llm
    .call(
      messages.map((m: any) =>
        m.role == "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
