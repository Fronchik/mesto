const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  };
}

const disabledChangeButton = (inputs, button, config) => {
  const formValid = inputs.every(input => input.validity.valid);
  if (formValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled';
  };
};

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, config);
        disabledChangeButton(inputs, button, config);
      });
    });
    form.addEventListener('reset', (e) => {
      // таймаут нужен для того, чтобы дождаться очищения формы
      setTimeout(() => { disabledChangeButton(inputs, button, config); }, 1);
    });
  });

};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});

