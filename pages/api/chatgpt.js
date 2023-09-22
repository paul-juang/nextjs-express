import { Configuration, OpenAIApi } from 'openai';
/*
export async function getStaticProps() {
  const db = await myDB.connect({
    apiKey: process.env.OPENAI_API_KEY
  })
  return(
  )
}*/
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default function handler(req,res) {

  let prompt = req.body.prompt;
   //res.status(200).json({ prompt: 'welcome from chatgpt'})

  
  const chatGPT = async (prompt) => {
    try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        res.status(200).json({ prompt: answer})
       } 
    catch(error) {
        res.status(500).json({error})
       }
    }
   chatGPT(prompt)
   
}