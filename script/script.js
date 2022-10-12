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
