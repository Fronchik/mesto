export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return this._request(this.baseUrl + '/users/me', {
      headers: this.headers
    });
  }

  //  Загрузка карточек с сервера
  getInitialCards() {
    return this._request(this.baseUrl + '/cards', {
      headers: this.headers
    });
  }

  // Редактирование профиля
  editProfile(name, about) {
    return this._request(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name, about
      })
    })
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return this._request(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name, link
      })
    })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  // Постановка лайка
  setLike(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
  }

  // Снятие лайка
  deleteLike(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  // Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return this._request(this.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
  }
}
