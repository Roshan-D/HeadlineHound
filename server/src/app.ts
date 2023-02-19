import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());

dotenv.config()

const PORT = 3000;

app.route("/summarize").get(async (req, res) => {
    const url = req.query.url;

    const options = {
        method: 'GET',
        url: 'https://article-extractor2.p.rapidapi.com/article/parse',
        params: {url: 'https://rapidapi.com/blog/rapidapi-marketplace-is-now-rapidapi-hub/'},
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

        return res.send(resp);
    } catch (error) {
        console.log(error);
    }                              
});

app.listen(PORT, () => {
    return console.log(`Server is listening on ${PORT}`);
});