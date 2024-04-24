const express = require('express');
const app = express();
const port = 3000;
const { VertexAI } = require('@google-cloud/vertexai');
var fs = require('fs');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'brave-monitor-420011', location: 'us-central1' });
const model = 'gemini-1.5-pro-preview-0409';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});

// function to generate quiz and essay based on the parameters set by the user
async function generateContent(request, res) {
  const streamingResp = await generativeModel.generateContentStream(request);
  let response = "";

  for await (const item of streamingResp.stream) {
    response += (item.candidates[0]?.content?.parts[0]?.text);
  }
  console.log(response.substr(response.indexOf("{"), response.lastIndexOf("}") - response.indexOf("{") + 1));
  response = JSON.parse(response.substr(response.indexOf("{"), response.lastIndexOf("}") - response.indexOf("{") + 1));
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.send({ response });
}

// get function to generate quiz
app.get('/quiz', (req, res) => {
  console.log(req.query);
  const request = {
    contents: [{
        role: 'user', 
        parts: [{
          text: `Generate ${req.query.qno} multiple choice questions on the topic of ${req.query.text} in the following format, I should be able to parse the questions and their options as JSON from the response.:
          1:{question: Question text, a: {text: "Option 1"}, b: {text: "Option 2"}, c: {text: Option 3}, d: {text: Option 4}, correctAnswer: a},
          2:{question: Question text, a: {text: "Option 1"}, b: {text: "Option 2"}, c: {text: Option 3}, d: {text: Option 4}, correctAnswer: a}`
        }],
      }],
  };
  generateContent(request, res)
});

// get function to generate essay
app.get('/essay', (req, res) => {
  console.log(req.query);
  const request = {
    contents: [{
        role: 'user', 
        parts: [{
          text: `Generate an essay on the topic of ${req.query.topic} as if it was written by ${req.query.author} intended to be read by ${req.query.reader}. The purpose of the essay is ${req.query.purpose}. The tone of the essay should be ${req.query.tone} and the essay should be ${req.query.wordcount} words long. Refer to ${req.query.sample} for the writing style.
          I should be able to parse the output as a JSON in the following format:{body: "Essay text",title: "Essay title"}`
        }],
      }],
  };
  generateContent(request, res)
});

// function to generate notes based on the file provided by the user
async function generateNotes(request, res) {
  const streamingResp = await generativeModel.generateContentStream(request);
  let response = "";

  for await (const item of streamingResp.stream) {
    response += (item.candidates[0]?.content?.parts[0]?.text);
  }
  console.log(response);
  response = {notes:response};
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.send({ response });
}

// converting file to base16
const image1 = {
  inlineData: {
    mimeType:  'image/jpeg',
    data: fs.readFileSync('./images.jpeg', 'base64'),
  }
}

// get function to generate notes
app.get('/notes', (req, res) => {
  console.log(req.query, image1);
  const request = {
    contents: [
      {role: 'user', parts: [image1, {text: `Generate detailed study notes for the content in the given image. The output should be in plain text without bold subitiles or bullet points. Output should not contain any special characters or text formatting. 
      The output should be a string`}]},
    ],
  };
  generateNotes(request, res)
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
