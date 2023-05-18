// Quiz Questions
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "Berlin", "Rome", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the highest mountain in the world?",
    answers: ["Mount Everest", "Mount Kilimanjaro", "Mount Denali", "Mount Fuji"],
    correctAnswer: "Mount Everest"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  }
];

// DOM Elements
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");
const timerCheckbox = document.getElementById("timer-checkbox");
const shuffleCheckbox = document.getElementById("shuffle-checkbox");

// Global Variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;

// Shuffle Array Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start Quiz Function
function startQuiz() {
  // Shuffle Questions and Answers
  if (shuffleCheckbox.checked) {
    shuffleArray(questions);
    questions.forEach(question => {
      shuffleArray(question.answers);
    });
  }

  // Hide Options and Show Quiz
  document.getElementById("options-container").classList.add("hidden");
  quizContainer.classList.remove("hidden");

  // Show First Question
  showQuestion();
}

// Show
// Show Question Function
function showQuestion() {
const question = questions[currentQuestionIndex];
questionContainer.innerText = question.question;

// Clear Answers
answersContainer.innerHTML = "";

// Add Answers
question.answers.forEach(answer => {
const answerElement = document.createElement("li");
answerElement.innerText = answer;
answerElement.addEventListener("click", () => {
checkAnswer(answerElement, answer);
});
answersContainer.appendChild(answerElement);
});

// Show Next Button
nextButton.classList.add("hidden");

// Start Timer
if (timerCheckbox.checked) {
startTimer();
}
}

// Check Answer Function
function checkAnswer(answerElement, answer) {
const question = questions[currentQuestionIndex];
const correctAnswer = question.correctAnswer;

// Disable Answers
answersContainer.childNodes.forEach(child => {
child.removeEventListener("click", () => {
checkAnswer(child, child.innerText);
});
child.classList.add("disabled");
});

// Stop Timer
if (timerCheckbox.checked) {
stopTimer();
}

// Check Answer
if (answer === correctAnswer) {
answerElement.classList.add("correct");
correctAnswers++;
} else {
answerElement.classList.add("incorrect");
answersContainer.childNodes.forEach(child => {
if (child.innerText === correctAnswer) {
child.classList.add("correct");
}
});
}

// Show Next Button
nextButton.classList.remove("hidden");
}

// Next Question Function
function nextQuestion() {
currentQuestionIndex++;

if (currentQuestionIndex >= questions.length) {
endQuiz();
} else {
showQuestion();
}
}

// End Quiz Function
function endQuiz() {
// Hide Quiz and Show Results
quizContainer.classList.add("hidden");
const resultsContainer = document.createElement("div");
resultsContainer.innerHTML = `<h2>Results </h2> <p> Correct Answers: ${correctAnswers}/${questions.length}</p> <button onclick="location.reload()">Restart Quiz</button>`;
//resultsContainer.innerHTML = <h2>Results </h2> <p> Correct Answers: ${correctAnswers}/${questions.length}</p> <button onclick="location.reload()">Restart Quiz</button> ;
quizContainer.parentElement.appendChild(resultsContainer);
}

// Timer Functions
/*
function startTimer() {
  let seconds = 10;
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      stopTimer();
      nextQuestion();
    } else {
      seconds--;
      const timerElement = document.getElementById("timer");
      if (timerElement) {
        timerElement.innerText = `Time: ${seconds} sec`;
      } else {
        console.log("Timer element not found");
      }
    }
  }, 1000);
}
*/

function startTimer() {
  let seconds = 10;
  document.getElementById("timer").innerText = "Time: " + seconds + " sec"; // Update timer element immediately
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      stopTimer();
      nextQuestion();
    } else {
      seconds--;
      document.getElementById("timer").innerText = "Time: " + seconds + " sec"; // Update timer element inside interval
    }
  }, 1000);
}


function stopTimer() {
clearInterval(timerInterval);
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

