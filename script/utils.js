const handleEscapeKeyDown = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  };
}

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKeyDown);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKeyDown);
}

export const enableSubmitButton = (button, classNameDisabled) => {
  button.classList.remove(classNameDisabled);
  button.disabled = false;
}

export const disableSubmitButton = (button, classNameDisabled) => {
  button.classList.add(classNameDisabled);
  button.disabled = true;
}
