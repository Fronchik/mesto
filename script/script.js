const profileOverlay = document.querySelector('.popup');
const openProfilePopupButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = profileOverlay.querySelector('.popup__close-button')

const toggleProfileOverlay = () => {
  profileOverlay.classList.toggle('popup__opened');
}

openProfilePopupButton.addEventListener('click', () => {
  toggleProfileOverlay();
})

closeProfilePopupButton.addEventListener('click', () => {
  toggleProfileOverlay();
})

const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__description');

const formSubmitHandler = (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__text').textContent = job;

  toggleProfileOverlay();
}

profileForm.addEventListener('submit', formSubmitHandler);

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

const cardTemplate = document.querySelector('#card-template').content.querySelector('.picture');

const handleLikeClick = (e) => {
  e.target.classList.toggle("picture__button_active");
}

const handleDeleteClick = (e) => {
  e.target.parentElement.remove();
}

const preview = document.querySelector('.preview');
const closePreviewButton = preview.querySelector('.preview__close-button')

const previewToggle = () => {
  preview.classList.toggle('preview__opened');
}

closePreviewButton.addEventListener('click', () => {
  previewToggle();
})

const createCard = (title, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.picture__name').textContent = title;
  const cardImg = cardElement.querySelector('.picture__image');
  cardImg.src = link;
  cardImg.alt = title;
  cardElement.querySelector('.picture__button').addEventListener('click', handleLikeClick);
  cardElement.querySelector('.picture__basket').addEventListener('click', handleDeleteClick);
  cardElement.querySelector('.picture__image').addEventListener('click', () => {
    previewToggle();
    preview.querySelector('.preview__image').src = link;
    preview.querySelector('.preview__name').textContent = title;
  });

  return cardElement;
}

const cardContainer = document.querySelector('.pictures__list');

const loadCards = (cardItems) => {
  cardItems.forEach(item => {
    const card = createCard(item.name, item.link);
    cardContainer.append(card);
  });
}

loadCards(initialCards);

const overlayCreation = document.querySelector('.creation');
const openCreationButton = document.querySelector('.profile__add-button');
const closeCreationButton = overlayCreation.querySelector('.creation__close-button')

const toggleProfileOverlayCreation = () => {
  overlayCreation.classList.toggle('creation__opened');
}

openCreationButton.addEventListener('click', () => {
  toggleProfileOverlayCreation();
})

closeCreationButton.addEventListener('click', () => {
  toggleProfileOverlayCreation();
})

const cardForm = document.querySelector('.creation__form');
const cardNameInput = document.querySelector('.creation__name');
const cardLinkInput = document.querySelector('.creation__link');


const formNewCard = (e) => {
  e.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const card = createCard(name, link);
  cardContainer.prepend(card);
  toggleProfileOverlayCreation();
}

cardForm.addEventListener('submit', formNewCard);
