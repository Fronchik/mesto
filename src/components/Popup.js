// отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа, закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    const button = this._popup.querySelector('.popup__close-button');
    button.addEventListener('click', (e) => {
      this.close();
    });

    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
