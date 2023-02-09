class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._submitButton = form.querySelector(config.submitButtonSelector);
  }

  _showInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  };

  _hideInputError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    };
  }

  _enableSubmitButton = () => {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableSubmitButton = () => {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setSubmitButtonState = () => {
    const formValid = this._inputList.every(input => input.validity.valid);
    if (formValid) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    };
  };

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setSubmitButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._setSubmitButtonState();
  }

  resetValidation() {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
}

export default FormValidator;
