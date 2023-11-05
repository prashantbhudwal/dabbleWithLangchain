import { ChatOpenAI } from "langchain/chat_models/openai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatPromptTemplate } from "langchain/prompts";
import {
  JsonOutputFunctionsParser,
  JsonKeyOutputFunctionsParser,
} from "langchain/output_parsers";

const SAMPLE_TEXT =
  "Amid the tapestry of urban life, where the hum of the digital age is ever-present, there lies a quaint abode where the fusion of classic and contemporary is palpably felt. Here dwells an individual, a maven in the esoteric art of algorithms and code, who has tethered his fortunes to the dynamic realms of Silicon Valley's technological crusade. Known in professional circles by the moniker ‘Smith’, his digital signature traverses the cyber corridors in the form of an electronic alias, serving as a beacon for vocational dialogues. His abode, a fusion of red bricks and modern trimmings, stands proudly in the embrace of a city that pulses with innovation, its location a well-kept whisper among the streets named for sylvan trees. Within the confines of this metropolitan burrow, ‘Smith’ contemplates the binary complexities of his vocation, his contributions to the tech leviathan Quantum Solutions, a testament to his unspoken role in the grand tapestry of the Information Age.";
const SAMPLE_TEXT_2 = `
In the intricate weave of the city's heartbeat, where shadows play with the light, there resides a figure known in select circles as 'J.D.' At the crossroads of ‘Maple Street’ and anonymity, he has anchored his residence, an abode numbered '404', which blends seamlessly into the backdrop of the urban expanse. This street, lined with the echoes of footsteps and the silent songs of the city, falls within the embrace of a ZIP code '94107', a cipher to a location steeped in the city’s lore, which the dwellers fondly refer to as the 'Golden Gate' city.

J.D.'s daily pilgrimage takes him through the heart of innovation to the steel and glass citadel of 'Vertex Innovations', where he dons the mantle of a software savant. His digital avatar, j.doe@vertexinnovate.com, serves as a virtual herald, announcing his thoughts and conquests in the binary battlegrounds of code and data. The state that cradles this urban odyssey, renowned for its pioneering spirit, and the country, a tapestry of diversity, provide a stage for J.D.'s quiet performance in the grand narrative of the tech era.

His voice is a rare note across the cellular waves, yet it leaves a profound echo, a testament to the impact of his digital presence. The world knows of J.D. not through a broadcasted presence but rather through the silent digital footprints that trace back to his doorstep on 'Maple Street', the city's unassuming nexus of life and dreams.
`;

const zodSchemaForExtraction = z.object({
  name: z.string().describe("The name of the person"),
  email: z.string().describe("The email of the person"),
  phone: z.string().describe("The phone number of the person"),
  address: z.string().describe("The address of the person"),
  city: z.string().describe("The city of the person"),
  state: z.string().describe("The state of the person"),
  country: z.string().describe("The country of the person"),
  zip: z.string().describe("The zip code of the person"),
  job: z.string().describe("The job of the person"),
  company: z.string().describe("The company of the person"),
});

const MODEL_OPTIONS = {
  name: "gpt-4",
  temperature: 0,
};

export async function extractInformation() {
  const extractionJson = zodToJsonSchema(zodSchemaForExtraction);
  const extractionFunction = {
    name: "extract_personal_info",
    description: "Extracts the personal info from the input.",
    parameters: extractionJson,
  };

  const model = new ChatOpenAI({
    modelName: MODEL_OPTIONS.name,
    temperature: MODEL_OPTIONS.temperature,
  });

  const functionBoundModel = model.bind({
    function_call: { name: "extract_personal_info" },
    functions: [extractionFunction],
  });

  const systemTemplate =
    "Extract the personal information from the text. The information might be hidden in the obscure text. Also the names might not be mentioned explicitly by their formal names. If you don't find any information, don't return anything, don't guess.";
  const humanTemplate = "{input}";

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", humanTemplate],
  ]);

  const jsonOutputParser = new JsonOutputFunctionsParser();
  const extractionChain = prompt
    .pipe(functionBoundModel)
    .pipe(jsonOutputParser);

  const result = await extractionChain.invoke({
    input: SAMPLE_TEXT_2,
  });

  const jsonKeyParser = new JsonKeyOutputFunctionsParser({
    attrName: "name",
  });

  const extractionChainWithJsonKeyParser = prompt
    .pipe(functionBoundModel)
    .pipe(jsonKeyParser);

  const result_keyOnly = await extractionChainWithJsonKeyParser.invoke({
    input: SAMPLE_TEXT_2,
  });

  console.log(result_keyOnly);
}
