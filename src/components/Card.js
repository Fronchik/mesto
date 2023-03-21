class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const template = document.querySelector(this._templateSelector)
      .content
      .querySelector('.picture')
      .cloneNode(true);

    return template;
  };

  generateCard() {
    // Запишем разметку в приватное поле _element
    this._element = this._getTemplate();
    this._element.querySelector('.picture__name').textContent = this._name;

    this._cardImg = this._element.querySelector('.picture__image');
    this._cardImg.alt = this._name;
    this._cardImg.src = this._link;
    this._element.querySelector('.picture__likes').textContent = this._likes;

    // добавим обработчики
    this._setEventListeners();
    return this._element;
  };

  _handleLikeClick(e) {
    e.target.classList.toggle('picture__button_active');
  };

  _handleDeleteClick(e) {
    e.target.closest('.picture').remove();
  };

  _setEventListeners() {
    this._element.querySelector('.picture__button').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.picture__basket').addEventListener('click', this._handleDeleteClick);
    this._cardImg.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
  }
};

export default Card;
