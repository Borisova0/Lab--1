
export function showScreen(screenId) {
  const screens = [
    "startScreen",
    "quizScreen",
    "resultScreen"
  ];

  screens.forEach(id => {
    document.getElementById(id).hidden = id !== screenId;
  });
}

export function showQuestion(question, index, total, name) {
  document.getElementById("greeting").textContent =
    "УЧАСТНИК: " + name;

  document.getElementById("counter").textContent =
    `Вопрос ${index + 1} из ${total}`;

  const percent = Math.round((index + 1) / total * 100);

  document.getElementById("percent").textContent =
    percent + "%";

  document.getElementById("progressFill").style.width =
    percent + "%";

  document.getElementById("questionTitle").textContent =
    question.text;

  const answerList = document.getElementById("answerList");
  answerList.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer";
    button.textContent =
      String.fromCharCode(65 + index) + ". " + option;

    button.dataset.index = index;

    answerList.appendChild(button);
  });
}

export function selectOption(index) {
  document.querySelectorAll(".answer").forEach(button => {
    button.classList.toggle(
      "selected",
      Number(button.dataset.index) === index
    );
  });
}

export function showResult(name, score, total, message) {
  document.getElementById("resultTitle").textContent =
    name + ", викторина завершена!";

  document.getElementById("resultScore").textContent =
    `${score} из ${total} правильных`;

  document.getElementById("resultMessage").textContent =
    message;
}
