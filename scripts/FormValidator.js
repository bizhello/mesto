class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
    }
    enableValidation = () => {
        const formElement = this._formSelector;
        this._setEventListeners(formElement);
    }
    _setEventListeners = (formElement) => {
        formElement.addEventListener('submit', this._handlerFormSubmit);
        formElement.addEventListener('input',  this._handlerFormInput);
    }
    _handlerFormSubmit = (evt) => {
        evt.preventDefault();
    }
    _handlerFormInput = (evt) => {
        const input = evt.target;
        this._setCustomError(input);
        this._setFieldError(input);
        this._setSubmitButtonState();
    }
    _setCustomError = (input) => {
        const validity = input.validity;

        input.setCustomValidity('');
        input.classList.remove(this._config.nameError);

        if(!input.validity.valid) {
            input.classList.add(this._config.nameError);
        }
        if(validity.tooShort || validity.tooLong) {
            const currentLength = input.value.length;
            const min = input.getAttribute('minlength');
            input.setCustomValidity(`Минимальное количество символов ${min}. Длина текста сейчас: ${currentLength} символ.`
            );
        }
        if(validity.typeMismatch) {
            input.setCustomValidity('Введите адрес сайта.');
        }
        if(input.value ==='') {
            input.setCustomValidity('Вы пропустили это поле.');
        }
    }
    _setFieldError = (input) => {
        const span = document.querySelector(`#${input.id}-error`);
        span.textContent = input.validationMessage;
    }
    _setSubmitButtonState = () => {
        const button = this._formSelector.querySelector(this._config.buttonSubmit);
        const isValid = this._formSelector.checkValidity();

        if (!isValid) {
            button.classList.add(this._config.buttonInvalid);
            button.classList.remove(this._config.buttonValid)
            button.setAttribute('disabled', 'disabled');
        } else {
            button.classList.remove(this._config.buttonInvalid);
            button.classList.add(this._config.buttonValid);
            button.removeAttribute('disabled');
        }
    }

}