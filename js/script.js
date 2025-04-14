const targetWord = "panda"; // Palavra a ser adivinhada
let currentRow = 0;

function submitGuess() {
  const input = document.getElementById("word-input");
  const guess = input.value.toLowerCase();

  if (guess.length !== 5) {
    showMessage("A palavra deve ter 5 letras.");
    return;
  }

  addGuessToBoard(guess);
  input.value = "";

  if (guess === targetWord) {
    showMessage("Parabéns! Você acertou!");
    disableInput();
  } else {
    currentRow++;
    if (currentRow >= 6) {
      showMessage(`Fim de jogo! A palavra era "${targetWord.toUpperCase()}".`);
      disableInput();
    }
  }
}

function addGuessToBoard(guess) {
  const board = document.getElementById("game-board");
  const row = document.createElement("div");
  row.classList.add("row");

  const targetArray = targetWord.split("");
  const guessArray = guess.split("");

  const letterCount = {};
  for (let letter of targetArray) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  guessArray.forEach((letter, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = letter;

    if (letter === targetArray[i]) {
      tile.classList.add("correct");
      letterCount[letter]--;
    }

    row.appendChild(tile);
  });


  guessArray.forEach((letter, i) => {
    const tile = row.children[i];
    if (!tile.classList.contains("correct")) {
      if (targetArray.includes(letter) && letterCount[letter] > 0) {
        tile.classList.add("present");
        letterCount[letter]--;
      } else {
        tile.classList.add("absent");
      }
    }
  });

  board.appendChild(row);
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function disableInput() {
  document.getElementById("word-input").disabled = true;
}
