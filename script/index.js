import { openPopup, closePopup, disableSubmitButton, enableSubmitButton } from "./utils.js";
import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


const profilePopup = document.querySelector('.profile-popup');
const profilePopupButton = document.querySelector('.profile__edit-button');
const profilePopupSubmitButton = profilePopup.querySelector('.popup__save');

const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_name');
const jobInput = profilePopup.querySelector('.popup__input_description');

const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const cardContainer = document.querySelector('.pictures__list');

const popupCreation = document.querySelector('.creation-popup');
const сreationButton = document.querySelector('.profile__add-button');

const cardForm = popupCreation.querySelector('.popup__form');
const cardNameInput = popupCreation.querySelector('.popup__input_name');
const cardLinkInput = popupCreation.querySelector('.popup__input_description');

const popupInvalid = 'popup__invalid';

document.querySelectorAll('.popup').forEach(container => {
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(container);
    }
  });
});

document.querySelectorAll('.popup__close-button').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (e) => {
    closePopup(popup);
  });
});

profilePopupButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
  enableSubmitButton(profilePopupSubmitButton, popupInvalid);
})

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// загружает карточки из массива объектов
const loadCards = (cardItems) => {
  cardItems.forEach(item => {
    const card = new Card(item, '#card-template');
    cardContainer.append(card.generateCard());
  });
}

loadCards(initialCards);

сreationButton.addEventListener('click', () => {
  openPopup(popupCreation);
  cardForm.reset();
})

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = new Card({ name, link }, '#card-template');
  cardContainer.prepend(card.generateCard());
  closePopup(popupCreation);
  e.target.reset();
  disableSubmitButton(e.submitter, popupInvalid);
}

cardForm.addEventListener('submit', handleCardFormSubmit);


const enableValidationAll = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(form => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation()
  });
};

enableValidationAll({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: popupInvalid,
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
