const subjectInput = document.querySelector("#subject");
const timeInput = document.querySelector("#time");
const auditoryInput = document.querySelector("#auditory");
const addBtn = document.querySelector("#add-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");
const scheduleList = document.querySelector("#schedule-list");
const counterBadge = document.querySelector("#counter");

const STORAGE_KEY = "lab8_schedule_items";
let schedule = [];

// Загрузка и безопасный парсинг данных из localStorage
try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(savedData || "[]");
    schedule = Array.isArray(parsed) ? parsed : [];
} catch (error) {
    console.error("Ошибка при чтении JSON из localStorage:", error);
    schedule = [];
}

// Функция сохранения данных и обновления интерфейса
function saveAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    render();
}

// Функция отрисовки списка занятий
function render() {
    scheduleList.replaceChildren();
    
    // Обновляем счетчик элементов
    counterBadge.textContent = `Всего: ${schedule.length}`;

    if (schedule.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = "Список занятий пока пуст";
        scheduleList.append(emptyLi);
        return;
    }

    schedule.forEach((item, index) => {
        const li = document.createElement("li");
        
        // Красивое разделение блоков внутри элемента списка
        const infoDiv = document.createElement("div");
        infoDiv.className = "schedule-info";
        
        const subjectEl = document.createElement("span");
        subjectEl.className = "subject-name";
        subjectEl.textContent = item.subject;
        
        const detailsEl = document.createElement("span");
        detailsEl.className = "schedule-details";
        detailsEl.textContent = `⏰ ${item.time} | 🚪 ${item.auditory}`;
        
        infoDiv.append(subjectEl, detailsEl);

        // Кнопка удаления конкретной записи
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", () => {
            schedule.splice(index, 1);
            saveAndRender();
        });

        li.append(infoDiv, deleteBtn);
        scheduleList.append(li);
    });
}

// Обработчик добавления нового занятия
addBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    const time = timeInput.value.trim();
    const auditory = auditoryInput.value.trim();

    // Проверка на пустой ввод
    if (!subject || !time || !auditory) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Добавление объекта в массив
    schedule.push({ subject, time, auditory });

    // Очистка полей ввода
    subjectInput.value = "";
    timeInput.value = "";
    auditoryInput.value = "";

    saveAndRender();
});

// Дополнительная функция: очистка всего хранилища
clearAllBtn.addEventListener("click", () => {
    if (schedule.length === 0) return;
    
    if (confirm("Вы уверены, что хотите удалить все занятия?")) {
        schedule = [];
        localStorage.removeItem(STORAGE_KEY); // или localStorage.clear()
        render();
    }
});

// Первичная отрисовка при загрузке страницы
render();
