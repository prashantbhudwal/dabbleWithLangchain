import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import fs from "fs";
export async function pdfLoader() {
  const filePath = "./public/ch11.pdf";
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent]);

  const loader = new PDFLoader(blob);

  const pdf = await loader.load();
  console.log(pdf.length);
  //merge all pages into one string
  let allPages = "";
  for (let i = 0; i < pdf.length; i++) {
    allPages += pdf[i].pageContent;
  }
  console.log(allPages.length);
  // const pageOne = pdf[0];
  // // SHow first 50 characters of the string
  // console.log(pageOne.pageContent.slice(0, 500));
  // const metaData = pageOne.metadata;
  // console.log(metaData);
  return allPages;
}
