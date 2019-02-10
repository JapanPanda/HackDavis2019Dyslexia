const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();

async function main() {
  var obj = JSON.parse(fs.readFileSync('../ShortStoryWebScraper/stories/shortstories.json', 'utf-8'));
  for (i in obj) {
    if (!fs.existsSync('./public/audio/' + obj[i]['title'])) {
      fs.mkdirSync('./public/ audio/' + obj[i]['title']);
    }
    await getAudioFiles(split(obj[i]['text'].replace('“', '"').replace('”', '"')), obj[i]['title']);
  }
}

async function getAudioFiles(inp, title) {
  for (var i = 0; i < inp.length; i++) {
		const request = {
		  input: {text: inp[i]},
		  voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
		  audioConfig: {audioEncoding: 'MP3'},
		};

		const [response] = await client.synthesizeSpeech(request).catch((err)=> {
			console.log(err);
		});


		const writeFile = util.promisify(fs.writeFile);
		const outputFileName = './public/audio/' + title + '/' + 'output' + i + '.mp3';

		//play_audio(response.audioContent);
		await writeFile(outputFileName, response.audioContent, 'binary').catch((err) => {
			console.log(err);
		});

		console.log(`Audio content written to file: ${outputFileName}`);
  }
}

function split(inp) {
	return inp.match( /[^\.!\?]+[\.!\?]/g );
}

main();
