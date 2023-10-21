const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('placeholder app');
});

app.listen(3000, function () {
  console.log('placeholder app');
});