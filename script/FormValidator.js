import { enableSubmitButton, disableSubmitButton } from "./utils.js";


class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._button = form.querySelector(config.submitButtonSelector);
    this._form = form;
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

  _setSubmitButtonState = (inputs) => {
    const formValid = inputs.every(input => input.validity.valid);
    if (formValid) {
      enableSubmitButton(this._button, this._config.inactiveButtonClass);
    } else {
      disableSubmitButton(this._button, this._config.inactiveButtonClass);
    };
  };

  enableValidation() {
    const inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setSubmitButtonState(inputs);
      });
    });
    this._setSubmitButtonState(inputs);
  }
}

export default FormValidator;
