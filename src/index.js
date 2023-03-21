import './pages/index.css';

import Api from "./components/Api.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js"
import PopupWithForm from "./components/PopupWithForm.js"
import UserInfo from "./components/UserInfo.js"
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";

const popupProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('#profile-form');
const сreationButton = document.querySelector('.profile__add-button');
const cardForm = document.querySelector('#card-form');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__text',
  avatarSelector: '.profile__image'
});


// здесь ниже код по 9-ой проектной
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '13dd71e2-a4cb-4a97-bac3-d4ec058f8440',
    'Content-Type': 'application/json'
  }
});

api.getProfileInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar);
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


const previewPopup = new PopupWithImage('.preview-popup');
previewPopup.setEventListeners();

// создание массива и добавление карточек
const cardsList = new Section(
  (item) => {
    const card = new Card(item, '#card-template', (name, link) => { previewPopup.open(name, link) });
    const cardElement = card.generateCard();
    return cardElement;
  }
  , ".pictures__list")

api.getInitialCards()
  .then((result) => {
    cardsList.renderItems(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


const popupProfile = new PopupWithForm('.profile-popup', (formData) => {
  api.editProfile(formData.name, formData.description)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })
    .catch((err) => {
      console.log(err);
    });
});
popupProfile.setEventListeners();


const popupCreation = new PopupWithForm('.creation-popup', (formData) => {
  const cardElement = cardsList.renderer(formData)
  cardsList.addItem(cardElement);
});
popupCreation.setEventListeners();


const popupInvalid = 'popup__invalid';

const formValidators = {};

popupProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info)
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
