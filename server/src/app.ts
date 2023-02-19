import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());

dotenv.config()

const PORT = 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.route("/summarize").get(async (req, res) => {
    const queryURL = req.query.url;

    const options = {
        method: 'GET',
        url: 'https://article-extractor2.p.rapidapi.com/article/parse',
        params: {url: queryURL},
        headers: {
          'X-RapidAPI-Key': process.env.XRAPIDAPIKEY,
          'X-RapidAPI-Host': process.env.XRAPIDAPIHOST,
        }
    };

    try {
        const response = await axios.request(options); 
        const resp = {
            "title": response.data.data.title,
            "content": response.data.data.content,
        };

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Summarize this following CNN News Article: " + response.data.data.content,
            max_tokens: 100,
        });

        return res.send({
            "title": response.data.data.title,
            "content": completion.data.choices[0].text
        });

    } catch (error) {
        console.log(error);
    }                              
});

app.listen(PORT, () => {
    return console.log(`Server is listening on ${PORT}`);
});