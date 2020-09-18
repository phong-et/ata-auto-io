const express = require('express'),
  app = express();

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = app
