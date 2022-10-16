const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button')

const form = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const popupClose = () => {
  popup.classList.remove('popup_opened');
}

const popupOpen = () => {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupClose();
}

openPopupButton.addEventListener('click', () => {
  popupOpen();
})

closePopupButton.addEventListener('click', () => {
  popupClose();
})

form.addEventListener('submit', formSubmitHandler);

