/*
/// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as cheerio from 'cheerio'
import axios from 'axios'
import { OpenAI } from "langchain/llms";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { Configuration, OpenAIApi }  from "openai";


const llm = new OpenAI({});
const chain = loadQAChain(llm);
const docs = [
  new Document({ pageContent: "harrison went to harvard" }),
  new Document({ pageContent: "ankush went to princeton" }),
];

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Creates a fetch request to beam api and returns answer back based on query given
export default async function handler(req, res) {

  const fetchText = async () => {
    try {
          // const response = await openai.createCompletion({
          //   model: "text-davinci-003",
          //   prompt: "Say this is a test",
          //   temperature: 0,
          //   max_tokens: 7,
          // });
          // console.log('the response is' , response)

          const res = await chain.call({
            input_documents: docs,
            question: "Where did harrison go to college",
          });
          console.log({ res });
          if (res.status !== 200) {
            res.json ({text:'something went wrong' }) 
          }
          return res
        // const response = await axios.get('https://www.gardendesign.com/seeds/starting.html#:~:text=Plants%20have%20basic%20needs%20of,to%20develop%20into%20healthy%20plants')

        // const html = response.data;

        // const $ = cheerio.load(html);

        // const text = $.text();

        // const filteredText = text.match(/\w+/g);

        // return filteredText;
          
        } catch (error) {
            console.error(error)
        }
      };

      const {data}= await fetchText();
      console.log(data)
      res.status(200).json( data.choices[0])
    }
    */
    import { LLMChain } from "langchain";
    import { OpenAI } from "langchain/llms";
    import { PromptTemplate } from "langchain/prompts";
   
    const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 }); 
    const template = "According to {website}, {question}?";

    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ["question", "website"],
    });

    const chain = new LLMChain({ llm: model, prompt: prompt });

    export default async function handler(req, res) {
      const body = JSON.parse(req.body)
      console.log(body.question)
       res.json( await chain.call({ question: body.question, website: body.website }))
       console.log(res);
  }

