const express = require('express');
const app = express();
const port = 3000;
const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'brave-monitor-420011', location: 'us-central1'});
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

async function generateContent(request,res) {


  const streamingResp = await generativeModel.generateContentStream(request);
  let response = ''

  for await (const item of streamingResp.stream) {
    // console.log('stream chunk: ' + JSON.stringify(item) + '\n');
    console.log(item)
    response+= JSON.stringify(item);
  }

  process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.send({response:'Hello World!',response});
}

app.get('/', (req, res) => {
  //here
  const request = {
    contents: [
      {role: 'user', parts: [{text: `hi. quiz me on the topic of banana`}]}
    ],
  };

  generateContent(request,res)
    
  });
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
