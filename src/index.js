import './pages/index.css';

import Card from "./script/Card.js";
import FormValidator from "./script/FormValidator.js";
import { initialCards } from "./script/cards.js";

const profilePopup = document.querySelector('.profile-popup');
const profilePopupButton = document.querySelector('.profile__edit-button');

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

const previewPopup = document.querySelector('.preview-popup');
const previewImg = previewPopup.querySelector('.preview__image');
const previewName = previewPopup.querySelector('.preview__name');

const popupInvalid = 'popup__invalid';

const formValidators = {};

const handleEscapeKeyDown = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  };
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKeyDown);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKeyDown);
}

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
  formValidators[profileForm.getAttribute('name')].resetValidation();
})

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


const handleCardClick = (name, link) => {
  previewImg.src = link;
  previewImg.alt = name;
  previewName.textContent = name;
  openPopup(previewPopup);
}

const createCard = (item) => {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}


// загружает карточки из массива объектов
const loadCards = (cardItems) => {
  cardItems.forEach(item => {
    const cardElement = createCard(item)
    cardContainer.append(cardElement);
  });
}

сreationButton.addEventListener('click', () => {
  openPopup(popupCreation);
  cardForm.reset();
  formValidators[cardForm.getAttribute('name')].resetValidation();
})

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const cardElement = createCard({ name, link })
  cardContainer.prepend(cardElement);

  closePopup(popupCreation);
}

cardForm.addEventListener('submit', handleCardFormSubmit);

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

loadCards(initialCards);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: popupInvalid,
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
