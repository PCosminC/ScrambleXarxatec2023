import words from "./words.js";

// Definir las constantes
const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hint span');
const playerText = document.querySelector('.player span');
const timeText = document.querySelector('.timer span');
const newWordButton = document.querySelector('.new_word');
const livesText = document.querySelector('.lives span');
const checkButton = document.querySelector('.check_word');
const playerInputWord = document.querySelector('input');
const scoreText = document.querySelector('.score span');
const winningScore = 25;
const players = [];

// Definir variables del juego
let correctWord, timer, lives, numberOfPlayers, currentPlayer;

// Iniciar el temporizador
function startTimer(maxtime) {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxtime > 0) {
      maxtime--;
      timeText.innerText = maxtime;
    } else {
      clearInterval(timer);
      endRound(false);
    }
  }, 1000);
}

// Iniciar un nuevo juego o acabarlo si no quedan vidas
function startGame() {
  playerText.innerText = players[currentPlayer].name;
  scoreText.innerText = players[currentPlayer].score;

  if (lives === 0) {
    alert('Fin del juego. ¡No te quedan más vidas!');
    return;
  }

  startTimer(30);
  const randomWord = getRandomWord();
  displayWord(randomWord);
}

// Obtener una palabra aleatoria
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Mezclar las letras de la palabra
function shuffleWord(word) {
  const splitedWords = word.split('');
  for (let i = splitedWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [splitedWords[i], splitedWords[j]] = [splitedWords[j], splitedWords[i]];
  }
  return splitedWords.join('');
}

// Mostrar la palabra y su pista
function displayWord(wordInfo) {
  const shuffledWord = shuffleWord(wordInfo.word);
  wordText.innerText = shuffledWord;
  hintText.innerText = wordInfo.hint;
  correctWord = wordInfo.word.toLowerCase();
  playerInputWord.value = '';
  playerInputWord.setAttribute('maxlength', correctWord.length);
}

// Finalizar una ronda del juego
function endRound(isCorrect) {
  clearInterval(timer);
  if (!isCorrect) {
    lives--;
    livesText.innerText = lives;
    alert(`El tiempo se agotó. La palabra correcta era "${correctWord.toUpperCase()}".`);
  }
  currentPlayer++;
  if (currentPlayer >= numberOfPlayers) currentPlayer = 0;
  startGame();
}

// Comprobar si la palabra ingresada es la correcta
function checkWord() {
  const userInputWord = playerInputWord.value.toLowerCase();
  if (!userInputWord) {
    alert('Por favor, ingrese una palabra.');
    return;
  }
  if (userInputWord !== correctWord) {
    alert(`Lo siento, "${userInputWord}" no es la palabra correcta.`);
  } else {
    const timeLeft = parseInt(timeText.innerText);
    players[currentPlayer].score += timeLeft * 1;
    scoreText.innerText = players[currentPlayer].score;
    if (timeLeft >= winningScore) {
      endGame();
      return;
    }
    alert(`¡Correcto! "${userInputWord.toUpperCase()}" es la palabra correcta.`);
  }
  endRound(true);
}

// Finalizar el juego si se averigua en 5segs un o menos
function endGame() {
  document.getElementById('container').style.display = 'none';
  const gameOverText = document.getElementById('gameOver');
  gameOverText.innerText = `GAME OVER\n¡Enhorabuena, ${players[currentPlayer].name.toUpperCase()} ha ganado!`;
  gameOverText.style.display = 'block';
}

// Inicialización del juego
lives = 3;
livesText.innerText = lives;
numberOfPlayers = parseInt(prompt('Introduzca el número de jugadores'));
for (let i = 0; i < numberOfPlayers; i++) {
  players[i] = { name: `Jugador ${i + 1}`, score: 0 };
}
currentPlayer = 0;
startGame();

// eventos de los botones
newWordButton.addEventListener('click', startGame);
checkButton.addEventListener('click', checkWord);
