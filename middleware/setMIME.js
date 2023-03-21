const express = require('express');
const mime = require('mime');

const app = express();

app.get('/helpers/selectedOptions.js', function(req, res) {
  res.setHeader('Content-Type', mime.getType('js'));
  // your code to send the selectedOptions.js file
});
