import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  onSubmit(callback) {
    this._submit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    const button = this._popup.querySelector('.popup__agree');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this._submit();
    });
  }
}




