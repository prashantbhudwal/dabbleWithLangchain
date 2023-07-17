import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import fs from "fs";
export async function pdfLoader() {
  const filePath = "./public/schools.pdf";
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent]);

  const loader = new PDFLoader(blob);

  const pdf = await loader.load();
  console.log(pdf.length);
  const pageOne = pdf[0];
  // SHow first 50 characters of the string
  console.log(pageOne.pageContent.slice(0, 500));
  const metaData = pageOne.metadata;
  console.log(metaData);
  return metaData;
}

export async function documentLoader() {

}
