import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._button = this._form.querySelector('.popup__save');
    this._submitBtnText = this._button.textContent;
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
