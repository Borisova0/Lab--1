
import { questions } from "./questions.js";

import {
  calculateScore,
  getMessage
} from "./quiz.js";

import {
  showScreen,
  showQuestion,
  selectOption,
  showResult
} from "./ui.js";

// Получаем элементы страницы
const startForm = document.getElementById("startForm");
const nameInput = document.getElementById("userName");
const nameError = document.getElementById("nameError");

const answerList = document.getElementById("answerList");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const quizError = document.getElementById("quizError");

// Данные викторины
let userName = "";
let currentQuestion = 0;
let selectedAnswer = null;
let answers = [];

// Показываем текущий вопрос
function loadQuestion() {
  selectedAnswer = null;
  nextBtn.disabled = true;
  quizError.textContent = "";

  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "Завершить викторину ✓";
  } else {
    nextBtn.textContent = "Следующий вопрос →";
  }

  showQuestion(
    questions[currentQuestion],
    currentQuestion,
    questions.length,
    userName
  );
}

// Кнопка "Начать викторину"
startForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (name.length < 2) {
    nameError.textContent =
      "Введите имя минимум из двух символов!";
    return;
  }

  nameError.textContent = "";
  userName = name;

  currentQuestion = 0;
  selectedAnswer = null;
  answers = [];

  loadQuestion();
  showScreen("quizScreen");
});

// Выбор варианта ответа
answerList.addEventListener("click", function(event) {
  const button = event.target.closest(".answer");

  if (!button || !answerList.contains(button)) {
    return;
  }

  selectedAnswer = Number(button.dataset.index);

  selectOption(selectedAnswer);
  nextBtn.disabled = false;
  quizError.textContent = "";
});

// Кнопка "Следующий вопрос"
nextBtn.addEventListener("click", function() {
  if (selectedAnswer === null) {
    quizError.textContent =
      "Сначала выберите вариант ответа!";
    return;
  }

  answers.push(selectedAnswer);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    const score = calculateScore(questions, answers);

    const message = getMessage(
      score,
      questions.length
    );

    showResult(
      userName,
      score,
      questions.length,
      message
    );

    showScreen("resultScreen");
  }
});

// Кнопка "Пройти заново"
restartBtn.addEventListener("click", function() {
  currentQuestion = 0;
  selectedAnswer = null;
  answers = [];

  nameInput.value = userName;
  nameError.textContent = "";

  showScreen("startScreen");
});

// Начальный экран
showScreen("startScreen");
