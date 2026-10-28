


const albumsContainer = document.querySelector("#albums");
const photosContainer = document.querySelector("#photos");
const albumStatus = document.querySelector("#albumStatus");
const photoStatus = document.querySelector("#photoStatus");
const photoTitle = document.querySelector("#photoTitle");
const retryButton = document.querySelector("#retryButton");

const API = "https://jsonplaceholder.typicode.com";

let selectedAlbumId = null;
let requestNumber = 0;

// Получение данных с сервера
async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("HTTP ошибка: " + response.status);
    }

    return await response.json();
}

// Загрузка списка альбомов
async function loadAlbums() {
    albumStatus.textContent = "Загрузка альбомов...";
    albumsContainer.replaceChildren();

    try {
        const albums = await getData(
            `${API}/albums?_limit=20`
        );

        if (albums.length === 0) {
            albumStatus.textContent = "Альбомы не найдены";
            return;
        }

        albumStatus.textContent =
            `Успешно загружено альбомов: ${albums.length}`;

        albums.forEach((album) => {
            const card = document.createElement("div");
            card.className = "album-card";

           
const albumNames = [
    "Мои воспоминания",
    "Красивые моменты",
    "Путешествия",
    "Природа и пейзажи",
    "Любимые фотографии",
    "Летние дни",
    "Семья и близкие",
    "Время с друзьями",
    "Маленькие радости",
    "Морские приключения",
    "Городские прогулки",
    "Счастливые мгновения",
    "Закаты и рассветы",
    "Мир вокруг нас",
    "Особенные события",
    "Зимняя сказка",
    "Весеннее настроение",
    "Уютные вечера",
    "Незабываемые дни",
    "Моя коллекция"
];

const title = document.createElement("h3");
title.textContent = albumNames[album.id - 1] || album.title;


            const number = document.createElement("p");
            number.textContent = `Альбом №${album.id}`;

            const button = document.createElement("button");
            button.textContent = "Открыть фотографии";

            // Нажатие на кнопку альбома
            button.addEventListener("click", () => {
                loadPhotos(album.id);
            });

            card.append(title, number, button);
            albumsContainer.appendChild(card);
        });

    } catch (error) {
        albumStatus.textContent =
            "Ошибка загрузки альбомов: " + error.message;

        const retry = document.createElement("button");
        retry.textContent = "Повторить загрузку";
        retry.addEventListener("click", loadAlbums);
        albumsContainer.appendChild(retry);
    }
}

// Загрузка фотографий выбранного альбома
async function loadPhotos(albumId) {
    selectedAlbumId = albumId;
    const currentRequest = ++requestNumber;

    photoTitle.textContent =
        `Фотографии альбома №${albumId}`;

    photoStatus.textContent = "Загрузка фотографий...";
    photosContainer.replaceChildren();
    retryButton.hidden = true;

    try {
        const photos = await getData(
            `${API}/photos?albumId=${albumId}`
        );

        // Не показываем результат старого запроса
        if (currentRequest !== requestNumber) return;

        if (photos.length === 0) {
            photoStatus.textContent =
                "В этом альбоме нет фотографий";
            return;
        }

        photoStatus.textContent =
            `Успешно загружено фотографий: ${photos.length}`;

        photos.forEach((photo) => {
            const card = document.createElement("div");
            card.className = "photo-card";

            const image = document.createElement("img");
            image.alt = photo.title;
            image.loading = "lazy";

            const title = document.createElement("p");
            title.textContent = photo.title;

            const errorText = document.createElement("p");
            errorText.textContent = "Изображение недоступно";
            errorText.hidden = true;

            image.addEventListener("error", () => {
                image.hidden = true;
                errorText.hidden = false;
            });

            image.src = photo.thumbnailUrl;

            card.append(image, errorText, title);
            photosContainer.appendChild(card);
        });

    } catch (error) {
        if (currentRequest !== requestNumber) return;

        photoStatus.textContent =
            "Ошибка загрузки фотографий: " + error.message;

        retryButton.hidden = false;
    }
}

// Повторная попытка загрузки фотографий
retryButton.addEventListener("click", () => {
    if (selectedAlbumId !== null) {
        loadPhotos(selectedAlbumId);
    }
});

// Запуск загрузки альбомов при открытии сайта
loadAlbums();
