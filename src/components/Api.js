export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //  Загрузка карточек с сервера
  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Редактирование профиля
  editProfile(name, about) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name, about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name, link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Постановка лайка
  setLike(likes) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        likes
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Снятие лайка
  deleteLike(likes) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
        likes
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}






