const rp = require('request-promise');
const $ = require('cheerio');
const animalstoriesurl = 'https://www.bedtime.com/category/stories/animal-stories/';
const fs = require('fs');


async function scrapeshortstoryurl() {
  console.log('Grabbing short short stories');
  var options = {
    uri: animalstoriesurl,
    transform: function(body) {
        return $.load(body);
    }
  }

  var urllist = await rp(options)
    .then(($) => {
      console.log('Successfully loaded webpage. Initializing scraping.');
      var _urllist = [];
      var links = $('h2 a');
      for(var i = 0; i < links.length; i++) {
        url = links.eq(i).attr('href');
        console.log(url);
        _urllist.push(url);
      }
      return _urllist;
    })
    .catch((err) => {
      console.error('Something went wrong when accessing short short story website.');
      console.error(err);
    });

  var promiseList = [];
  var jsonOutput = [];
  for (i in urllist) {
    console.log(urllist[i]);
    promiseList.push(scrapeIndividualPage(urllist[i]));
  }
  jsonOutput = await scrapeAllPages(promiseList, jsonOutput);
  jsonOutput = jsonOutput.filter((el) => {
    return el != null;
  });
  console.log('Finished scraping');
  fs.writeFileSync('./stories/shortstories.json', JSON.stringify(jsonOutput, null, 2), 'utf-8');
}

async function scrapeAllPages(promiseList, jsonOutput) {
  console.log('Starting to scrape now');
  return Promise.all(promiseList)
    .then((jsonObject) => {
      return jsonObject;
    })
    .catch((err) => {
      console.error('Something went wrong');
      console.error(err);
    });
}

async function scrapeIndividualPage(url) {
  var urloptions = {
    uri: url,
    transform: function(body) {
      return $.load(body);
    }
  }
  return rp(urloptions)
      .then(($) => {
        console.log('Loaded ' + urloptions.uri);
        if ($('.download').text() != '') {
          console.log('Requires pdf, not adding...');
          return;
        }
        var title = $('h1').text().split('  ')[0];
        var text = $('.entry-content').text().replace('\n\n      Like this story\n    \n', '');
        var author = $("span[itemprop='name'] a").text();
        var _jsonObject = {};
        _jsonObject['title'] = title;
        _jsonObject['author'] = author;
        _jsonObject['text'] = text;
        return _jsonObject;
      })
      .catch((err) => {
        console.error('Error loading ' + urloptions.uri);
        console.error(err);
      })
}
async function main() {
  console.log('Running short story scraper');
  await scrapeshortstoryurl();
}

main();
