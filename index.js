import express from 'express';
import bodyparse from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const quotes = ['Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth. I am born in every age to protect the good, to destroy evil, and to reestablish dharma.', 
    'At the beginning of time I declared two paths for the pure heart: jnana yoga, the contemplative path of spiritual wisdom, and karma yoga, the active path of selfless service. There are the fundamental different types of yoga.',
    'Perform work in this world, Arjuna, as a man established within himself - without selfish attachments, and alike in success and defeat. For yoga is perfect evenness of mind.', 'You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.','The meaning of Karma is in the intention. The intention behind action is what matters. Those who are motivated only by desire for the fruits of action are miserable, for they are constantly anxious about the results of what they do.',
    'They live in wisdom who see themselves in all and all in them, who have renounced every selfish desire and sense-craving tormenting the heart.', 'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.','I am heat; I give and withhold the rain. I am immortality and I am death; I am what is and what is not.',
    'Whatever you do, make it an offering to me - the food you eat, the sacrifices you make, the help you give, even your suffering.', 'There are three gates to this self-destructive hell: lust, anger, and greed. Renounce these three.','I am time, the destroyer of all; I have come to consume the world.','Just remember that I am, and that I support the entire cosmos with only a fragment of my being.',
    'Just remember that I am, and that I support the entire cosmos with only a fragment of my being.','I am death, which overcomes all, and the source of all beings still to be born.','I am the beginning, middle, and end of creation.','I am the beginning, middle, and end of creation.','Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth. I am born in every age to protect the good, to destroy evil, and to reestablish dharma.'
]
var id = '';

app.use(bodyparse.urlencoded({extended: true}));


app.get('/index.html' && '/', async (req, res) => {
        const randQuote = Math.floor(Math.random() * quotes.length);
        const randChapter = Math.floor(Math.random() * 17);
        const randVerse = Math.floor(Math.random() * 15);
        
    const verse_options = {
        method: 'GET',
        url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${randChapter}/verses/${randVerse}/`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(verse_options);
        // console.log(quotes[randQuote]);
        res.render('index.ejs',{ verse: response.data.text ,verseeng: response.data.transliteration, versedesc: response.data.translations[0].description, quote: quotes[randQuote] });
    } catch (error) {
        console.error(error);
    }
});

app.get('/chapters.html', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/',
        params: {limit: '18'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
    };
    try 
    {
        // const randChapter = Math.floor(Math.random() * 17)
        const response = await axios.request(options);
        res.render('chapters.ejs',{response: response});
    }catch (error) { 
        console.error(error);
    }
});

app.post('/', async (req, res) => {
    try {
        const response = req.body.id;
        console.log(response);
        id = response;
        res.redirect('/slokhas');
    } catch (error) {
        console.log("Failed to make request:", error.message);
    }
});

console.log(id);

app.get('/slokhas', async (req, res) =>{
    const soptions = {
        method: 'GET',
        url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${id}/verses/`,
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
    };
      
    try {
          const response = await axios.request(soptions);
        //   console.log(response.data);
        res.render('slokhas.ejs',{response: response});
      } catch (error) {
          console.error(error);
    }
});

app.listen(port, (req,res) => {
    console.log(`listening on port ${port}`);
})

