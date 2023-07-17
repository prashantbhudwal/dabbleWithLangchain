import {
  RecursiveCharacterTextSplitter,
  CharacterTextSplitter,
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
