import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._formValues = {};
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._submit(e);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

