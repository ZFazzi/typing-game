// Variables for the DOM elements
const word_element = document.getElementById("word");
const text_element = document.getElementById("text");
const score_element = document.getElementById("score");
const time_element = document.getElementById("time");
const endGameContainer = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const selectDifficulty = document.getElementById("difficulty");

// Array
const words = [
  "dependent", "dog", "superficial", "admit", "juice", "javascript",
  "developer", "airplane", "great", "fun", "manipulate", "cat",
  "transition", "school", "computer", "programming", "drag",
  "beautiful", "thoughtful", "run", "train", "calculate", "flower",
  "insightful", "mountain", "understand", "ocean", "celebrate",
  "determine", "organize", "freedom", "integrity", "commitment", "courage",
  "determination", "ambition", "creativity", "motivation", "improvement",
  "exploration", "relaxation", "confidence", "humility", "vision",
  "perfection", "happiness", "growth", "teamwork", "curiosity", "friendship",
  "inspiration", "reflection", "patience", "empathy", "kindness", "strength",
  "respect", "communication", "simplicity", "equality", "awareness",
  "explore", "game", "important", "amazing", "bicycle", "jump",
  "curious", "challenge", "analyze", "window", "react", "happy",
  "discover", "strategy", "forest", "optimize", "dynamic", "storm",
  "intelligent", "travel", "fast", "simple", "container", "reflect",
  "expand", "system", "frequent", "exceptional", "river", "puzzle",
  "achieve", "adjust", "interactive", "celebration", "creative",
  "growth", "design", "inspire", "connect", "imagine", "collect",
  "wander", "success", "positive", "engineer", "mechanical",
  "structure", "resource", "develop", "perfect"
];
// Variables
let randomWord;
let score = 0;
let time = 100;
let difficulty = selectDifficulty.value; // Initial difficulty setting
let countdownStarted = false; // Flag to track countdown status
let timeInterval; // Reference to the countdown interval

// Generate a random word from the arrays and display it
function addWordToDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word_element.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  score_element.innerText = score;
}

// Start the countdown
function startCountdown() {
  countdownStarted = true;
  timeInterval = setInterval(updateTime, 1000);
}

// Reset the game timer and variables
function resetGameTimer() {
  clearInterval(timeInterval); // Stop the ongoing countdown, if there is one running
  time = difficulty === "hard" ? 10 : difficulty === "medium" ? 20 : 30; // Set time left based on difficulty
  time_element.innerText = time + "s";
  countdownStarted = false; // Reset the countdown timer
}

// Update time
function updateTime() {
  time--;
  time_element.innerText = time + "s";

  // Check if time has run out
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over, shows end screen
function gameOver() {
  endGameContainer.innerHTML = 
  `<h1>Time's up!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
  endGameContainer.style.display = "flex";
}

// Event listener for typing input
text_element.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (!countdownStarted) {
    startCountdown(); // Start the countdown on the first letter written
  }

  if (insertedText === randomWord) {
    // Correct word entered
    updateScore();
    addWordToDOM();
    e.target.value = ""; // Clear the word written before

    // Adds time based on difficulty
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime(); // Updates time display every time the user enters the word correctly
  }
});

// Changes difficulty level
selectDifficulty.addEventListener("change", (e) => {
  difficulty = e.target.value;
  resetGameTimer(); // Reset the timer and wait for the first word to be written before it starts counting down
  addWordToDOM(); // Display a new random word every time the right word is entered
  text_element.value = ""; // Clear input field
});

// Makes the settings (easy, medium, hard) show/hide
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Focus input on start
text_element.focus();

// Start the game with the initial difficulty setting
addWordToDOM(); 
resetGameTimer(); // Reset the timer and wait for the first word to be written