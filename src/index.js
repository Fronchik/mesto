import './pages/index.css';

import Section from "./script/Section.js";
import PopupWithImage from "./script/PopupWithImage.js"
import PopupWithForm from "./script/PopupWithForm.js"
import UserInfo from "./script/UserInfo.js"
import Card from "./script/Card.js";
import FormValidator from "./script/FormValidator.js";
import { initialCards } from "./script/cards.js";


const popupProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_name');
const jobInput = profileForm.querySelector('.popup__input_description');
const сreationButton = document.querySelector('.profile__add-button');
const cardForm = document.querySelector('.popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_name');
const cardLinkInput = cardForm.querySelector('.popup__input_description');


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__text'
});


const previewPopup = new PopupWithImage('.preview-popup');
previewPopup.setEventListeners();

// создание массива и добавление карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', (name, link) => { previewPopup.open(name, link) });
    const cardElement = card.generateCard();
    return cardElement;
  }
}, ".pictures__list")

cardsList.renderItems();


const popupProfile = new PopupWithForm('.profile-popup', (e) => {
  e.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
});
popupProfile.setEventListeners();


const popupCreation = new PopupWithForm('.creation-popup', (e) => {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const cardElement = cardsList.renderer({ name, link })
  cardsList.addItem(cardElement);
});
popupCreation.setEventListeners();


const popupInvalid = 'popup__invalid';

const formValidators = {};

popupProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.description;
  popupProfile.open();

  formValidators[profileForm.getAttribute('name')].resetValidation();
})

сreationButton.addEventListener('click', () => {
  popupCreation.open();
  cardForm.reset();
  formValidators[cardForm.getAttribute('name')].resetValidation();
})

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: popupInvalid,
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
