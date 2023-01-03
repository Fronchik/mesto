const popupInvalid = 'popup__invalid';

const showInputError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
};

const hideInputError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, config);
  };
}

const enableSubmitButton = (button, classNameDisabled) => {
  button.classList.remove(classNameDisabled);
  button.disabled = '';
}

const disableSubmitButton = (button, classNameDisabled) => {
  button.classList.add(classNameDisabled);
  button.disabled = 'disabled';
}

const setSubmitButtonState = (inputs, button, config) => {
  const formValid = inputs.every(input => input.validity.valid);
  if (formValid) {
    enableSubmitButton(button, config.inactiveButtonClass);
  } else {
    disableSubmitButton(button, config.inactiveButtonClass);
  };
};

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, config);
        setSubmitButtonState(inputs, button, config);
      });
    });
    setSubmitButtonState(inputs, button, config);
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

