
export function checkAnswer(question, answer) {
  return question.correct === answer;
}

export function calculateScore(questions, answers) {
  let score = 0;

  questions.forEach((question, index) => {
    if (checkAnswer(question, answers[index])) {
      score++;
    }
  });

  return score;
}

export function getMessage(score, total) {
  const percent = score / total * 100;

  if (percent >= 80) {
    return "Отличный результат! Вы хорошо знаете информатику.";
  }

  if (percent >= 50) {
    return "Хороший результат! Но есть что повторить.";
  }

  return "Попробуйте повторить материал и пройти викторину ещё раз.";
}
