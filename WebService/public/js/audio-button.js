function play_audio(audio) {
  var sentences = $(".short-story span");
  for (var i = 0; i < audio.length; i++) {
    play_audio_delay(i, audio)
  }

function play_audio_delay(i, audio) {
    audio[i].play();
    sentences[i].style.backgroundColor = "yellow";
    audio[i].onended = function() {
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
*/
}


