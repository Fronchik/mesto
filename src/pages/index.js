import './index.css';

import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from "../components/UserInfo.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const popupAvatarButton = document.querySelector('.profile__avatar-button');
const popupProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('#profile-form');
const сreationButton = document.querySelector('.profile__add-button');
const cardForm = document.querySelector('#card-form');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__text',
  avatarSelector: '.profile__image'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '13dd71e2-a4cb-4a97-bac3-d4ec058f8440',
    'Content-Type': 'application/json'
  }
});

const previewPopup = new PopupWithImage('.preview-popup');
previewPopup.setEventListeners();

// попап с подтверждением
const popupAgree = new PopupWithSubmit('.agree-popup');
popupAgree.setEventListeners();

// Создание массива и добавление карточек
const cardsList = new Section(
  (item, myId) => {
    const card = new Card(item, '#card-template',
      (name, link) => { previewPopup.open(name, link) },
      (cardId, onSuccess) => {
        popupAgree.open();
        popupAgree.onSubmit(() => {
          api.deleteCard(cardId)
            .then((result) => {
              onSuccess();
              popupAgree.close();
            })
            .catch((err) => {
              console.log(err);
            });
        })
      },
      (cardId, updateLikes) => {
        api.setLike(cardId)
          .then(result => {
            updateLikes(result.likes)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (cardId, updateLikes) => {
        api.deleteLike(cardId)
          .then(result => {
            updateLikes(result.likes)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      myId
    );
    const cardElement = card.generateCard();
    return cardElement;
  }
  , ".pictures__list")

// Загрузка информации о пользователе с сервера, Загрузка карточек с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards, userData._id);
  })
  .catch((err) => {
    console.log(err);
  });

const popupAvatar = new PopupWithForm('.avatar-popup', (formData) => {
  popupAvatar.renderLoading(true);
  api.updateUserAvatar(formData.link)
    .then((result) => {
      userInfo.setUserInfo(result);
      // userInfo.setUserInfo(result.name, result.about, result.avatar, result.link);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    })
});
popupAvatar.setEventListeners();

const popupProfile = new PopupWithForm('.profile-popup', (formData) => {
  popupProfile.renderLoading(true);
  api.editProfile(formData.name, formData.description)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    })
});
popupProfile.setEventListeners();

const popupCreation = new PopupWithForm('.creation-popup', (formData) => {
  popupCreation.renderLoading(true);
  api.addNewCard(formData.name, formData.link)
    .then((result) => {
      const cardElement = cardsList.renderer(result, result.owner._id);
      cardsList.addItem(cardElement);
      popupCreation.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCreation.renderLoading(false);
    })
});
popupCreation.setEventListeners();

const popupInvalid = 'popup__invalid';

const formValidators = {};

popupAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formValidators[cardForm.getAttribute('name')].resetValidation();
})

popupProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info)
  popupProfile.open();

  formValidators[profileForm.getAttribute('name')].resetValidation();
})

сreationButton.addEventListener('click', () => {
  popupCreation.open();
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
