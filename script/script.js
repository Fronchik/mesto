const profilePopup = document.querySelector('.profile-popup');
const openProfilePopupButton = document.querySelector('.profile__edit-button');

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
const openCreationButton = document.querySelector('.profile__add-button');

const cardForm = popupCreation.querySelector('.popup__form');
const cardNameInput = popupCreation.querySelector('.popup__input_name');
const cardLinkInput = popupCreation.querySelector('.popup__input_description');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

document.querySelectorAll('.popup__close-button').forEach(button => {
  button.addEventListener('click', (e) => {
    closePopup(e.target.closest('.popup'));
  });
});

openProfilePopupButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
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
  cardElement.querySelector('.picture__image').addEventListener('click', () => {
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

openCreationButton.addEventListener('click', () => {
  openPopup(popupCreation);
})

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = createCard(name, link);
  cardContainer.prepend(card);
  closePopup(popupCreation);
  e.target.reset();
}

cardForm.addEventListener('submit', handleCardFormSubmit);
