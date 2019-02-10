var audio = document.getElementsByTagName('audio');

async function play_audio() {
var current_play = 0
var isRunning = false

  if (!isRunning) {
  var sentences = $(".short-story span");
    isRunning = true
    for (var i = 0; i < audio.length; i++) {
      current_play = i
      play_audio_delay(i, sentences);
      await sleep(audio[i].duration * 1000);
      console.log('finished');
    }
    isRunning = false
  }
}

async function play_one() {
  if (!isRunning) {
    isRunning = true
    var sentences = $(".short-story span");
    play_audio_delay(current_play, sentences);
    await sleep(audio[current_play].duration * 1000);

    // Set next audio to play
    current_play += 1
    if (current_play >= audio.length) {
      current_play = 0
    }
    console.log('finished');
    isRunning = false
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play_audio_delay(i, sentences) {
    audio[i].play();
    sentences[i].style.backgroundColor = "yellow";
    audio[i].onended = async function() {
      console.log("ended");
      sentences[i].style.backgroundColor = "white";
    }
}

function pause_audio() {
  audio[current_play].pause();
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
