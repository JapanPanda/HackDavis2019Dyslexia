async function button_press() {
	/*
	// THIS IS A TEST
	current_sentence = ["I LOVE LISA YEE.", "I DON'T KNOW WHAT SHE IS THINKING.", "BLAH BLAH!"]
	delay = [1000, 2000, 3000, 4000]
	// THIS IS A TEST
	*/  

  total_text = $('.short-story').text()
  total_text = total_text.replace("<span>", "");
  total_text = total_text.replace("<\span>", "");
  total_text = total_text.replace("<break>", "");
  current_sentence = split(total_text)

	delay = await setup(total_text)
	main(arrDelay)

	for (var i = 0; i < delay.length - 1; i++) {
		doSetTimeout(i, delay[i])
	}

	// Delay has one more element than current_sentence
	finalIndex = delay.length - 1
        setTimeout(function() {
		highlight_current(current_sentence[finalIndex - 1], "")
        }, delay[finalIndex])
}

function doSetTimeout(iter, cur_delay) {
        setTimeout(function() {
		if (iter != 0) {
			highlight_current(current_sentence[iter - 1], current_sentence[iter])
		} else {
			highlight_current('', current_sentence[iter])
		}
        }, cur_delay);
}

function highlight_current(old_sentence, current_sentence) {
	old_sentence = old_sentence.replace("'", "\\'")
	current_sentence = current_sentence.replace("'", "\\'")
	// Unhighlight old
	if (old_sentence != '') {
		inp = "span:contains('" + old_sentence + "')"
		select = $(inp)
		$(select).css("background-color","white");
	}

	// Highlight new
	if (current_sentence != "") {
		inp = "span:contains('" + current_sentence + "')"
		select = $(inp)
		console.log(inp)
		$(select).css("background-color","yellow");
	}
};
