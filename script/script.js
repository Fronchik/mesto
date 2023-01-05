const profilePopup = document.querySelector('.profile-popup');
const profilePopupButton = document.querySelector('.profile__edit-button');
const profilePopupSubmitButton = profilePopup.querySelector('.popup__save');

const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_name');
const jobInput = profilePopup.querySelector('.popup__input_description');

const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.picture');

const previewPopup = document.querySelector('.preview-popup');
const previewImg = previewPopup.querySelector('.preview__image');
const previewName = previewPopup.querySelector('.preview__name');

const cardContainer = document.querySelector('.pictures__list');

const popupCreation = document.querySelector('.creation-popup');
const сreationButton = document.querySelector('.profile__add-button');

const cardForm = popupCreation.querySelector('.popup__form');
const cardNameInput = popupCreation.querySelector('.popup__input_name');
const cardLinkInput = popupCreation.querySelector('.popup__input_description');


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
  enableSubmitButton(profilePopupSubmitButton, popupInvalid);
})

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

const handleLikeClick = (e) => {
  e.target.classList.toggle("picture__button_active");
}

const handleDeleteClick = (e) => {
  e.target.closest('.picture').remove();
}

const createCard = (title, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.picture__name').textContent = title;
  const cardImg = cardElement.querySelector('.picture__image');
  cardImg.src = link;
  cardImg.alt = title;
  cardElement.querySelector('.picture__button').addEventListener('click', handleLikeClick);
  cardElement.querySelector('.picture__basket').addEventListener('click', handleDeleteClick);
  cardImg.addEventListener('click', () => {
    openPopup(previewPopup);
    previewImg.src = link;
    previewImg.alt = title;
    previewName.textContent = title;
  });

  return cardElement;
}

const loadCards = (cardItems) => {
  cardItems.forEach(item => {
    const card = createCard(item.name, item.link);
    cardContainer.append(card);
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
  const card = createCard(name, link);
  cardContainer.prepend(card);
  closePopup(popupCreation);
  e.target.reset();
  disableSubmitButton(e.submitter, popupInvalid);
}

cardForm.addEventListener('submit', handleCardFormSubmit);
