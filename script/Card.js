import { openPopup } from "./utils.js";

const previewPopup = document.querySelector('.preview-popup');
const previewImg = previewPopup.querySelector('.preview__image');
const previewName = previewPopup.querySelector('.preview__name');

// принимает данные карты и селектор её template-элемента
class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const template = document.querySelector(this._templateSelector)
      .content
      .children[0]
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

  _handleImageClick() {
    openPopup(previewPopup);
    previewImg.src = this._link;
    previewImg.alt = this._name;
    previewName.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.picture__button').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.picture__basket').addEventListener('click', this._handleDeleteClick);
    this._cardImg.addEventListener('click', () => { this._handleImageClick() });
  }
};

export default Card;
