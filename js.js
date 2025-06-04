const words = ["javascript", "programa", "computador", "navegador", "internet"];
let secretWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let attempts = 0;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const attemptsLeftDisplay = document.getElementById("attemptsLeft");
const messageDisplay = document.getElementById("message");

function startGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongLetters = [];
  attempts = 0;
  letterInput.value = "";
  messageDisplay.textContent = "";
  updateDisplay();
}

function updateDisplay() {
  const display = secretWord
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");
  
  wordDisplay.textContent = display;
  wrongLettersDisplay.textContent = wrongLetters.join(", ");
  attemptsLeftDisplay.textContent = maxAttempts - attempts;
}

function guessLetter() {
  const letter = letterInput.value.toLowerCase();

  if (!letter || !letter.match(/[a-z]/i)) {
    alert("Digite uma letra válida!");
    return;
  }

  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
    alert("Você já tentou essa letra!");
    return;
  }

  if (secretWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongLetters.push(letter);
    attempts++;
  }

  letterInput.value = "";
  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  const currentWord = secretWord
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join("");

  if (currentWord === secretWord) {
    messageDisplay.textContent = "🎉 Parabéns! Você venceu!";
  } else if (attempts >= maxAttempts) {
    messageDisplay.textContent = `💀 Você perdeu! A palavra era: ${secretWord}`;
  }
}

// Inicia o jogo ao carregar a página
startGame();
