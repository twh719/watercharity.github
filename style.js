// === Game State Variables ===
let score = 5;
let filters = 1;
let timeLeft = 19;
let goal = 15;
let level = 1;
let timerInterval;

// === Element References ===
const scoreEl = document.getElementById("score");
const filtersEl = document.getElementById("filters");
const timeEl = document.getElementById("time");
const levelEl = document.getElementById("level");
const quizSection = document.querySelector(".quiz-section");
const droplets = document.querySelectorAll(".droplet");
const closeQuizBtn = document.querySelector(".btn-close");

// === Update Display ===
function updateStats() {
  scoreEl.textContent = score;
  filtersEl.textContent = filters;
  timeEl.textContent = `${timeLeft}s`;
  levelEl.textContent = level;
}

// === Handle Droplet Click ===
droplets.forEach(droplet => {
  droplet.addEventListener("click", () => {
    const emoji = droplet.textContent.trim();

    switch (emoji) {
      case "💧":
        score++;
        break;
      case "🛑":
        score--;
        break;
      case "🪴":
        score += 3;
        filters++;
        break;
    }

    // Clamp score and check status
    if (score < 0) score = 0;
    updateStats();

    if (score >= goal) {
      clearInterval(timerInterval);
      showQuiz();
    }

    if (score === 0) {
      clearInterval(timerInterval);
      alert("Game Over! You ran out of water.");
      resetGame();
    }
  });
});

// === Timer Logic ===
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateStats();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      if (score >= goal) {
        showQuiz();
      } else {
        alert("Time’s up! Try again to reach your goal.");
        resetGame();
      }
    }
  }, 1000);
}

// === Quiz Logic ===
function showQuiz() {
  quizSection.scrollIntoView({ behavior: "smooth" });
  quizSection.style.display = "block";
}

// === Reset Game ===
function resetGame() {
  score = 5;
  filters = 1;
  timeLeft = 19;
  level = 1;
  updateStats();
  quizSection.style.display = "none";
  startTimer();
}

// === Start Game ===
window.onload = () => {
  updateStats();
  startTimer();
};

// === Close Quiz Button ===
closeQuizBtn.addEventListener("click", () => {
  quizSection.style.display = "none";
  level++;
  score = 5;
  filters = 1;
  timeLeft = 19;
  updateStats();
  startTimer();
});

// === Add Reset Button ===
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
resetBtn.style.background = "#0077cc";
resetBtn.style.color = "#fff";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "8px";
resetBtn.style.padding = "0.7rem 2rem";
resetBtn.style.fontSize = "1.1rem";
resetBtn.style.cursor = "pointer";
resetBtn.style.margin = "1rem auto";
resetBtn.style.display = "block";

// Insert the button into the DOM (e.g., after the quiz section)
document.body.insertBefore(resetBtn, quizSection.nextSibling);

// Reset button logic
resetBtn.addEventListener("click", () => {
  score = 5;
  filters = 1;
  timeLeft = 19;
  level = 1;
  updateStats();
  quizSection.style.display = "none";
  clearInterval(timerInterval);
  startTimer();
});
