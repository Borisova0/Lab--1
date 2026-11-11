
const { useState } = React;
const h = React.createElement;

const questions = [
  {
    title: "Какой формат обучения вам подходит?",
    options: [
      "Очное обучение",
      "Онлайн-обучение",
      "Смешанный формат",
      "Самостоятельное обучение"
    ]
  },
  {
    title: "В какое время вам удобнее учиться?",
    options: [
      "Утром",
      "Днем",
      "Вечером",
      "В любое время"
    ]
  },
  {
    title: "Какой способ обучения вам нравится?",
    options: [
      "Практические задания",
      "Видеоуроки",
      "Лекции и конспекты",
      "Групповая работа"
    ]
  },
  {
    title: "Что для вас самое важное в учебе?",
    options: [
      "Новые знания",
      "Хорошие оценки",
      "Практический опыт",
      "Будущая карьера"
    ]
  },
  {
    title: "Сколько времени в день вы уделяете учебе?",
    options: [
      "Меньше 1 часа",
      "1–2 часа",
      "3–4 часа",
      "Больше 4 часов"
    ]
  },
  {
    title: "Что чаще всего мешает вам учиться?",
    options: [
      "Недостаток времени",
      "Усталость",
      "Отсутствие мотивации",
      "Социальные сети"
    ]
  },
  {
    title: "Как удобнее выполнять задания?",
    options: [
      "Самостоятельно",
      "В паре",
      "В группе",
      "С преподавателем"
    ]
  },
  {
    title: "Какие предметы вам интереснее?",
    options: [
      "Программирование",
      "Математика",
      "Гуманитарные науки",
      "Иностранные языки"
    ]
  },
  {
    title: "Как вы готовитесь к экзаменам?",
    options: [
      "Начинаю заранее",
      "За несколько дней",
      "В последний день",
      "Повторяю регулярно"
    ]
  },
  {
    title: "Что бы вы хотели улучшить в обучении?",
    options: [
      "Больше практики",
      "Меньше домашних заданий",
      "Интересные лекции",
      "Гибкое расписание"
    ]
  }
];

// Компонент вопроса
function Question({ title, options, selected, onSelect }) {
  return h("div", null,
    h("h2", null, title),

    h("div", { className: "options" },
      ...options.map((option, index) =>
        h("button", {
          key: index,
          className: "option" +
            (selected === index ? " active" : ""),
          onClick: () => onSelect(index)
        },
          h("span", { className: "letter" },
            String.fromCharCode(65 + index)
          ),
          h("span", null, option)
        )
      )
    )
  );
}

// Главный компонент
function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const completed = answers.filter(
    answer => answer !== null
  ).length;

  function selectAnswer(index) {
    setAnswers(prev =>
      prev.map((answer, i) =>
        i === current ? index : answer
      )
    );
  }

  function next() {
    if (answers[current] === null) return;

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(prev => prev + 1);
    }
  }

  function back() {
    setCurrent(prev => Math.max(0, prev - 1));
  }

  function restart() {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);
  }

  return h("div", { className: "page" },

    h("header", null,
      h("div", { className: "logo" },
        "student", h("span", null, ".survey")
      ),
      h("div", { className: "header-label" },
        "STUDENT EXPERIENCE"
      )
    ),

    h("main", null,

      h("span", { className: "tag" },
        "ОБРАЗОВАНИЕ · ОПРОС"
      ),

      h("h1", null,
        finished
          ? "Опрос завершён."
          : "Ваше мнение важно."
      ),

      h("p", { className: "description" },
        finished
          ? "Спасибо за участие. Вот ваши ответы."
          : "Ответьте на 10 вопросов о своих учебных предпочтениях."
      ),

      finished

        ? h("div", { className: "card" },

            h("div", { className: "complete-icon" }, "✓"),

            h("h2", null, "Спасибо за участие!"),

            h("p", { className: "description" },
              `Вы ответили на ${completed} из ${questions.length} вопросов.`
            ),

            ...questions.map((question, index) =>
              h("div", {
                className: "result-item",
                key: index
              },
                h("p", null, question.title),
                h("strong", null,
                  question.options[answers[index]]
                )
              )
            ),

            h("div", { className: "actions" },
              h("button", {
                className: "btn btn-primary",
                onClick: restart
              }, "Пройти опрос заново")
            )
          )

        : h("div", { className: "card" },

            h("div", { className: "progress-info" },
              h("span", null, "Ваш прогресс"),
              h("span", null,
                `${completed} из ${questions.length}`
              )
            ),

            h("div", { className: "progress-track" },
              h("div", {
                className: "progress-fill",
                style: {
                  width: (completed / questions.length * 100) + "%"
                }
              })
            ),

            h("div", { className: "question-number" },
              `ВОПРОС ${String(current + 1).padStart(2, "0")}`
            ),

            h(Question, {
              title: questions[current].title,
              options: questions[current].options,
              selected: answers[current],
              onSelect: selectAnswer
            }),

            h("div", { className: "actions" },

              ...(current > 0
                ? [h("button", {
                    key: "back",
                    className: "btn btn-secondary",
                    onClick: back
                  }, "← Назад")]
                : []),

              h("button", {
                className: "btn btn-primary",
                disabled: answers[current] === null,
                onClick: next
              },
                current === questions.length - 1
                  ? "Завершить опрос ✓"
                  : "Продолжить →"
              )
            ),

            h("p", { className: "helper" },
              "Выберите один вариант ответа"
            )
          )
    ),

    h("footer", null,
      "Student Survey © 2026 · Учебный проект на React"
    )
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(h(App));
