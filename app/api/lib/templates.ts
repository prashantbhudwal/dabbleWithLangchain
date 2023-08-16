import { PromptTemplate } from "langchain/prompts";

export default async function run() {
  await templateOne();
}

export async function templateOne() {
  const prompt = PromptTemplate.fromTemplate(
    "What do you hate about {subject}?"
  );

  console.log(prompt);

  const formattedPrompt = await prompt.format({
    subject: "Chemistry",
  });

  console.log(formattedPrompt)
  return formattedPrompt;
}
