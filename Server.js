const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Get API token from environment variables
const token = process.env.TOKEN;

// Set up OpenAI configuration and API objects
const configuration = new Configuration({ apiKey: token });
const openai = new OpenAIApi(configuration);

// Create Express application
const app = express();

// Set up middleware to parse JSON data from request bodies
app.use(bodyParser.json());

// Set up middleware to enable cross-origin resource sharing
app.use(cors());

// Define route to handle incoming POST requests to /message
app.post('/message', (req, res) => {
  // Use OpenAI API to generate a response based on the prompt in the request body
  const response = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000
  });

  // Send the response back to the client as a JSON object
  response.then((data) => {
    res.send({ message: data.data.choices[0].text });
  });
});

// Start listening for incoming requests on port 5000
app.listen(5000, () => {
  console.log('listening on port 5000');
});
