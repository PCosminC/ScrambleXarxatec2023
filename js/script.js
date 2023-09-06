let correctWord, timer, lives;
const words = [
    {
        "word": "Casa",
        "hint": "Lugar donde vives."
    },
    {
        "word": "Perro",
        "hint": "Un amigo peludo."
    },
    {
        "word": "Flor",
        "hint": "Puede ser rosa o margarita."
    },
    {
        "word": "Sol",
        "hint": "Fuente de luz y calor en el cielo."
    },
    {
        "word": "Lago",
        "hint": "Cuerpo de agua más pequeño que un océano."
    },
    {
        "word": "Bicicleta",
        "hint": "Medio de transporte con dos ruedas."
    },
    {
        "word": "Computadora",
        "hint": "Dispositivo para navegar en internet."
    },
    {
        "word": "Jardín",
        "hint": "Espacio con flores y plantas."
    },
    {
        "word": "Guitarra",
        "hint": "Instrumento musical de cuerdas."
    },
    {
        "word": "Reloj",
        "hint": "Marca las horas y minutos."
    },
    {
        "word": "Maleta",
        "hint": "Se usa para llevar ropa de viaje."
    },
    {
        "word": "Helado",
        "hint": "Postre frío y delicioso."
    },
    {
        "word": "Astronomía",
        "hint": "Ciencia que estudia el espacio."
    },
    {
        "word": "Biblioteca",
        "hint": "Lugar lleno de libros."
    },
    {
        "word": "Experimento",
        "hint": "Prueba para investigar algo."
    },
    {
        "word": "Galaxia",
        "hint": "Conjunto de estrellas y planetas."
    },
    {
        "word": "Microscopio",
        "hint": "Instrumento para ver cosas pequeñas."
    },
    {
        "word": "Ecología",
        "hint": "Estudia la relación entre seres vivos y su entorno."
    },
    {
        "word": "Química",
        "hint": "Ciencia de elementos y compuestos."
    },
    {
        "word": "Matemáticas",
        "hint": "Trata de números y operaciones."
    }    
]

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".timer span");
const newWordButton = document.querySelector(".new_word");
const livesText = document.querySelector(".lives span");
const checkButton = document.querySelector(".check_word");
const playerInputWord = document.querySelector("input");

function startTimer(maxtime){
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxtime > 0) {
            maxtime--;
            return timeText.innerText = maxtime;
        }
        clearInterval(timer);
        alert(`El tiempo se acabo, ${correctWord.toUpperCase()} era la palabra correcta!`);
        lives--;
        
        livesText.innerText= lives
        startGame();
    }, 1000)
}

function startGame(){
    if (lives === 0){
        alert("no quedan mas vidas")
        return;
}
    startTimer(30);
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let splitedWords = randomWord.word.split("");
    for (let i = splitedWords.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let temporary = splitedWords[i];
        splitedWords[i] = splitedWords[j];
        splitedWords[j] = temporary;
    }
    wordText.innerText = splitedWords.join("");
    hintText.innerText = randomWord.hint;
    correctWord = randomWord.word.toLowerCase();
    playerInputWord.value = "";
    playerInputWord.setAttribute("maxlength", correctWord.length);
}

lives = 3;
livesText.innerText = lives;
startGame();

function checkWord(){
    let userInputWord = playerInputWord.value.toLocaleLowerCase();
    if (!userInputWord) return alert("Por favor, indroduzca una palabra!");
    if (userInputWord !== correctWord)
        return alert(`Vaya, ${userInputWord} no es la palabra correcta!`);
    alert(`Enhorabuena, ${userInputWord.toUpperCase()} es la palabra correcta!`);
    startGame();
}

newWordButton.addEventListener("click", startGame);
checkButton.addEventListener("click", checkWord);