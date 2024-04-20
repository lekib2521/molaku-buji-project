const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.send({response:'Hello World!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
