// отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // который возвращает объект с данными пользователя.
  //  Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      _id: this._id
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = name;
    this._id = _id;
  }
}
