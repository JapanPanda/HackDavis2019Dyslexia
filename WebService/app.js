const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log('Started server on ' + port);
});
