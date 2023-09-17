import words from "./words.js";

let correctWord, timer, lives, numberOfPlayers, timeLeft, currentPlayer;

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


lives = 3;
currentPlayer = 0;
livesText.innerText = lives;
numberOfPlayers = parseInt(prompt('Introduzca el numero de jugadores'));
for (let i = 0; i < numberOfPlayers; i++) {
  players[i] = { name: 'Jugador ' + (i + 1), score: 0 }
}
startGame();

function startTimer(maxtime) {
  const interval = 1000;
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxtime > 0) {
      maxtime--;
      timeText.innerText = maxtime;
    } else {
      clearInterval(timer);
      alert(`El tiempo se acabo, ${correctWord.toUpperCase()} era la palabra correcta!`);
      countLives();
      startGame();
    }
  }, interval);
}

function countLives(){
  lives--;
  livesText.innerText = lives;
}

function isLivesOver(){
  if (lives === 0) {
    alert('Fin del juego! No te quedan mas vidas!');
    return;
  }
}

function startGame () {
  playerText.innerText = players[currentPlayer].name;
  scoreText.innerText = players[currentPlayer].score;
  isLivesOver();
  startTimer(30);
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let splitedWords = randomWord.word.split('');
  //reordena aleatoriamente los elementos del array (stackoverflow)
  splitedWords.sort(()=> Math.random() - 0.5);
  wordText.innerText = splitedWords.join('');
  hintText.innerText = randomWord.hint;
  correctWord = randomWord.word.toLowerCase();
  playerInputWord.value = '';
  playerInputWord.setAttribute('maxlength', correctWord.length);
}

function getScore(){
  timeLeft = parseInt(timeText.innerText);
  players[currentPlayer].score += timeLeft * 1;
  scoreText.innerText = players[currentPlayer].score;
}

function displayWinner(){
  if (timeLeft >= winningScore) {
    document.getElementById('container').style.display = 'none';
    const gameOverText = document.getElementById('gameOver');
    gameOverText.innerText = (`GAME OVER \n Enhorabuena, El ${players[currentPlayer].name.toUpperCase()} ha ganado!`);
    gameOverText.style.display = 'block';
  }
}

function checkWord() {
  let userInputWord = playerInputWord.value.toLowerCase();
  if (!userInputWord) return alert('Por favor, indroduzca una palabra!');
  if (userInputWord !== correctWord) {
    alert(`Vaya, ${userInputWord} no es la palabra correcta!`);
  } else {
    clearInterval(timer);
    getScore();
    displayWinner();
    alert(`Enhorabuena, ${userInputWord.toUpperCase()} es la palabra correcta!`);
    currentPlayer++;
    if (currentPlayer >= numberOfPlayers) currentPlayer = 0;
    startGame();
  }
}

newWordButton.addEventListener('click', startGame);
checkButton.addEventListener('click', checkWord);