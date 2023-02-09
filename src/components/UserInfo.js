// отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  // который возвращает объект с данными пользователя.
  //  Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    };
  }

  // который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}


