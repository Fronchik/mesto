const overlayEl = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = overlayEl.querySelector('.popup__close-button')

const toggleOverlay = () => {
  overlayEl.classList.toggle('popup__opened');
}

openPopupButton.addEventListener('click', () => {
  toggleOverlay();
})

closePopupButton.addEventListener('click', () => {
  toggleOverlay();
})

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__description');

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__text').textContent = job;

  toggleOverlay();
}

formElement.addEventListener('submit', formSubmitHandler);

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

const createCard = (title, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.picture__name').textContent = title;
  const cardImg = cardElement.querySelector('.picture__image');
  cardImg.src = link;
  cardImg.alt = title;
  cardElement.querySelector('.picture__button').addEventListener('click', handleLikeClick);
  cardElement.querySelector('.picture__basket').addEventListener('click', handleDeleteClick);
  return cardElement;
}

const cardList = document.querySelector('.pictures__list');

const loadCards = (cardItems) => {
  cardItems.forEach(item => {
    const card = createCard(item.name, item.link);
    cardList.append(card);
  });
}

loadCards(initialCards);


