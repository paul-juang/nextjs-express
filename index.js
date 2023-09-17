const express = require('express');
const app = express();

const cors = require('cors');
/*
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
*/
require('dotenv').config();

const path = require('path');

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const bodyParser = require('body-parser');

app.use(cors());

app.get('/', (req, res) => {
    res.render("chatgpt")
})

app.post("/chatGPT", async (req, res) => {
    let answer = "hello world"
    res.json({answer})

/*
  let prompt = req.body.prompt;

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const chatGPT = async (prompt) => {
    try {
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:prompt}]
         })
        let answer = response["data"]["choices"][0]["message"]["content"]
        res.json({answer})
       } 
    catch(error) {
        res.json({error})
       }
    }

   chatGPT(prompt)
*/
  })
  
app.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
});