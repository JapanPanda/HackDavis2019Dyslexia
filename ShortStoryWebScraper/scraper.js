const rp = require('request-promise');
const $ = require('cheerio');
const animalstoriesurl = 'http://www.english-for-students.com/Animal-Stories.html';
const shortstoryurl = 'https://americanliterature.com/100-great-short-stories'
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
      var links = $('ol li a');
      console.log(links.length);
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
  var urloptions = {
    uri: urllist[1],
    transform: function(body) {
      return $.load(body);
    }
  }
  var jsonOutput = [];

  var jsonObject = await rp(urloptions)
    .then(($) => {
      console.log('Loaded ' + urloptions.uri);
      var title = $('h3').eq(0).text();
      var text;
      for (x in $('span')) {
        if ($(x).attr('ezoic-ad') == null) {
          console.log('hi');
          text = $(x).text();
          console.log(text);
        }
      }
      var _jsonObject = {};
      _jsonObject['title'] = title;
      _jsonObject['text'] = text;
      return _jsonObject;
    })
    .catch((err) => {
      console.error('Error loading ' + urloptions.uri);
    });
  console.log(jsonObject);
  // for (url in urllist) {
  //   var urloptions = {
  //     uri: url,
  //     transform: function(body) {
  //       return $.load(body);
  //     }
  //   }
  //   promiseList.push(new Promise(rp(urloptions)
  //     .then(($) => {
  //       console.log
  //     })
  //     .catch((err) => {
  //
  //     });
  //   ));
  // }

}

async function main() {
  console.log('Running short story scraper');
  await scrapeshortstoryurl();
}

main();
