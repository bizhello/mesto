export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._button = this._formElement.querySelector(this._config.buttonSubmit);
    }
    enableValidation = () => {
        this._setEventListeners(this._formElement);
    }
    _setEventListeners = (formElement) => {
        formElement.addEventListener('submit', this._handleFormSubmit);
        formElement.addEventListener('input',  this._handleFormInput);
    }
    _handleFormSubmit = (evt) => {
        evt.preventDefault();
    }
    _handleFormInput = (evt) => {
        const input = evt.target;
        this._setCustomError(input);
        this._setFieldError(input);
        this._setSubmitButtonState();
    }
    _setCustomError = (input) => {
        input.setCustomValidity('');
        input.classList.remove(this._config.nameError);

        if(!input.validity.valid) {
            input.classList.add(this._config.nameError);
        }
    }
    _setFieldError = (input) => {
        const span = document.querySelector(`#${input.id}-error`);
        span.textContent = input.validationMessage;
    }
    _setSubmitButtonState = () => {
        const isValid = this._formElement.checkValidity();

        if (!isValid) {
            this._button.classList.add(this._config.buttonInvalid);
            this._button.classList.remove(this._config.buttonValid);
            this._button.setAttribute('disabled', 'true');
        } else {
            this._button.classList.remove(this._config.buttonInvalid);
            this._button.classList.add(this._config.buttonValid);
            this._button.removeAttribute('disabled');
        }
    }
}
