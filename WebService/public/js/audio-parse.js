// Gets array of sentences, then gets audio for each
async function get_audio(inp) {
	const textToSpeech = require('@google-cloud/text-to-speech');
	const fs = require('fs');
	const util = require('util');

	const client = new textToSpeech.TextToSpeechClient();

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
		const outputFileName = 'audio/output' + i + '.mp3';

		//play_audio(response.audioContent);
		await writeFile(outputFileName, response.audioContent, 'binary');

		console.log(`Audio content written to file: ${outputFileName}`);
	}
}

function play_audio(file) {
	var player = require('play-sound')(opts = {})
	player.play(file);
}

function split(inp) {
	return inp.match( /[^\.!\?]+[\.!\?]+["']?/g );
}

function doSetTimeout(iter, cur_delay) {
	setTimeout(function() { 
		var name = './audio/output' + iter + '.mp3'
		play_audio(name);
	}, cur_delay);
}

async function setup(inp) {
	var arrLength = [];
	var text = split(inp);
	await get_audio(text)

	var duration = require('mp3-duration');

	// Gather duration of each mp3 in array
	for (var i = 0; i < text.length; i++) {
		var name = './audio/output' + i + '.mp3'
		await duration(name, function (err, duration) {
			if (err) return console.log(err.message);

			console.log(duration + ' seconds');
			arrLength.push(duration)
		});
	}

	var arrDelay = []
	var prevDelay = 0
	var delay = 500; // milliseconds of delay between mp3s

	// For the first delay = 0
	arrDelay.push(prevDelay)

	// Gather actual delay required for each
	for (var i = 1; i < arrLength.length + 1; i++) {
		prevDelay += arrLength[i-1] * 1000 + delay;
		arrDelay.push(prevDelay)
		console.log(prevDelay)
	}

	return arrDelay;
}



function main(arrDelay) {
	var name = './audio/output' + 0 + '.mp3'
	play_audio(name);
	var prevDelay = 0

	for (var i = 1; i < arrDelay.length; i++) {
		doSetTimeout(i, arrDelay[i]);
	}
}


/*
async function test(inp) {
	var arrDelay = await setup(inp);
	main(arrDelay);
}

test('I LOVE LISA YEE. I DON\'T KNOW WHAT SHE IS THINKING. BLAH BLAH! GO BEARS. IS THIS WORKING?');
*/

