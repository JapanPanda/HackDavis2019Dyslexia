var current_play = -1;
var isRunning = false;

async function play_audio(audio) {
  if (!isRunning) {
  var sentences = $(".short-story span");
    isRunning = true
    for (var i = 0; i < audio.length; i++) {
      current_play = i
      play_audio_delay(i, audio, sentences);
      await sleep(audio[i].duration * 1000);
      console.log('finished');
    }
    isRunning = false
  }
}

async function play_curr(audio) {
  if (!isRunning) {
    if (current_play < 0) {
      current_play = 0;
    }
    isRunning = true;
    var sentences = $(".short-story span");
    play_audio_delay(current_play, audio, sentences);
    await sleep(audio[current_play].duration * 1000);
    console.log('finished');
    isRunning = false
  }
}

async function play_prev(audio) {
  if (!isRunning) {
    current_play -= 1;
    if (current_play < 0) {
      current_play = 0;
    }
    isRunning = true;
    var sentences = $(".short-story span");
    play_audio_delay(current_play, audio, sentences);
    await sleep(audio[current_play].duration * 1000);
    console.log('finished');
    isRunning = false
  }
}

async function play_one(audio) {
  if (!isRunning) {
    current_play += 1;
    isRunning = true;
    var sentences = $(".short-story span");
    play_audio_delay(current_play, audio, sentences);
    await sleep(audio[current_play].duration * 1000);

    // Set next audio to play
    if (current_play == 0) {
      current_play = 1;
    }
    console.log('finished');
    isRunning = false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play_audio_delay(i, audio, sentences) {
    audio[i].play();
    sentences[i].style.backgroundColor = "yellow";
    audio[i].onended = async function() {
      console.log("ended");
      sentences[i].style.backgroundColor = "white";
    }
}

  /*audio[0].play();
  sentences[0].style.backgroundColor = "yellow";
  audio[0].onended = function() {
    console.log("ended");
    audio[1].play();
    sentences[1].style.backgroundColor = "yellow";
    sentences[0].style.backgroundColor = "white";
  };*/
  /*document.getElementById("sound2").onended = function() {
    console.log("ended");
    audio[2].play();
    sentences[2].style.backgroundColor = "yellow";
    sentences[1].style.backgroundColor = "white";
  };
  document.getElementById("sound3").onended = function() {
    console.log("ended");
    audio[3].play();
    sentences[3].style.backgroundColor = "yellow";
    sentences[2].style.backgroundColor = "white";
  };
  document.getElementById("sound4").onended = function() {
    console.log("ended");
    audio[4].play();
    sentences[4].style.backgroundColor = "yellow";
    sentences[3].style.backgroundColor = "white";
  };
  document.getElementById("sound5").onended = function() {
    console.log("ended");
    sentences[4].style.backgroundColor = "white";
  };
}
*/
