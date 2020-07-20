const words = ['computer', 'engineering', 'program', 'software', 'debug', 'interface', 'application'];
let word = '';
let guesses = [];
let mistakes = 0;
let stopped = false;

$(document).ready(function() {
  reset();  
})

function reset() {
  word = words[Math.floor(Math.random() * words.length)];
  mistakes = 0;
  guesses = [];
  stopped = false;

  hideElementByClass('hidden');
  showElementById("hangman_input", null);
  showElementById("hangman_word", getGuessedWord());

  document.getElementById('guess_input').value = '';
}

function guess(e) {
  let guess = e.value.charAt(0);

  //Return if game stopped or already guessed
  if (stopped || guesses.indexOf(guess) > -1) {
    return;
  }

  guesses.push(guess);

  //Update the word
  showElementById("hangman_word", getGuessedWord());
  
  //Update the guessed letter list
  showElementById("hangman_guess", guesses.join(''));

  if (word.indexOf(guess) < 0) {
    
    // Incorrect guess
    mistakes++;

    //Show hangman character
    showElementById("hangman_" + mistakes, null);

    if (mistakes === 6) {
      showElementById("hangman_end", "Game Over!<br/>The word was: " + word);
      stopped = true;
      return;
    }
  } else if (word.indexOf(getGuessedWord()) !== -1) {
    showElementById("hangman_end", "You made it!<br/>The word was: " + word);
    stopped = true;
    return;
  }
}

function getGuessedWord() {
  let result = '', i;

  for (i =0; i < word.length; i++) {
    result += (guesses.indexOf(word[i]) > -1) ? word[i] : '_';
  }

  return result;
}

function showElementById(el, content) {
  if (content != null) {
    document.getElementById(el).innerHTML = content;
  }
  document.getElementById(el).style.opacity = 1;
}


function hideElementByClass(elClass) {
  var elements = document.getElementsByClassName(elClass), i;
  for (i = 0; i < elements.length; i++) {
      elements[i].style.opacity = 0;
  }
};

 