const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res) => {
  var stories = JSON.parse(fs.readFileSync('../ShortStoryWebScraper/stories/shortstories.json', 'utf-8'));
  var chosenStory = stories[Math.floor(Math.random() * stories.length - 1)];
  while (chosenStory == null) {
    chosenStory = stories[Math.floor(Math.random() * stories.length - 1)];
  }
  console.log(chosenStory);
  var text = chosenStory['text'].replace(/\n/g, "<br/><br/>");
  var textArray = text.match(/[^\.!\?]+[\.!\?]+["']?/g);
  for (i in textArray) {
    textArray[i] = '<span>' + textArray[i];
    textArray[i] = textArray[i] + '</span>';
  }

  console.log(textArray.join(""));
  res.render('index', {title: chosenStory['title'], author: chosenStory['author'], text: textArray.join("")});
});

app.listen(port, () => {
  console.log('Started server on ' + port);
});
