import {
  RecursiveCharacterTextSplitter,
  CharacterTextSplitter,
  TokenTextSplitter,
  MarkdownTextSplitter,
} from "langchain/text_splitter";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import fs from "fs";

export async function splitter() {
  const recursiveSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 2,
  });

  const characterSplitter = new CharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 2,
  });

  const text = "This is a test string. It will be split into pieces";

  const recursiveSplit = await recursiveSplitter.splitText(text);
  const characterSplit = await characterSplitter.splitText(text);

  console.log(recursiveSplit);
  console.log(characterSplit);
  return "test";
}
export async function splitPDF() {
  const filePath = "./public/schools.pdf";
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent]);
  const loader = new PDFLoader(blob);

  const pdf = await loader.load();

  const recursiveSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 100,
  });

  const splitPages = await recursiveSplitter.splitDocuments(pdf);

  console.log(pdf.length);
  return splitPages.length;
}
export async function splitIntoTokens() {
  const text =
    "This is a sample of a philosophical text that I have written. DOODlyou think it works.";

  const tokenSplitter = new TokenTextSplitter({
    chunkSize: 1,
    chunkOverlap: 0,
    encodingName: "gpt2",
  });

  const tokenSplit = await tokenSplitter.splitText(text);

  console.log(tokenSplit);
  return tokenSplit;
}
export async function splitMarkdown() {
  const text = `
# Large Language Models (LLMs)

Large Language Models (LLMs) are state-of-the-art models in natural language processing (NLP). They are designed to understand and generate human-like text.

## Key Features

### Language Understanding

LLMs possess advanced language understanding capabilities. They can comprehend the meaning and context of natural language text.

### Text Generation

LLMs excel at generating coherent and contextually relevant text. They can produce human-like responses based on given input.

### Language Translation

LLMs are proficient in language translation tasks. They can convert text from one language to another accurately.

**Example Code:**

\`\`\`javascript
const llm = new LargeLanguageModel();
const inputText = "Some input text";
const generatedText = llm.generateText(inputText);
console.log(generatedText);
\`\`\`

To learn more about LLMs, check out the [LLM Handbook](https://example.com/llm-handbook).
`;

  const markdownSplitter = new MarkdownTextSplitter({
    chunkSize: 10,
    chunkOverlap: 5,
  });

  const markdownSplit = await markdownSplitter.splitText(text);
  console.log(markdownSplit);
  return markdownSplit;
}
