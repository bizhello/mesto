function enableValidation(config) {
const form = document.querySelector(config.form);

form.addEventListener('submit', handlerFormSubmit);
form.addEventListener('input',(evt) => handlerFormInput(evt, config));

}
function handlerFormSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const button = form.querySelector('.popup__button');
    button.setAttribute('disabled','disabled');
}
function handlerFormInput(evt, config) {
    const form = evt.currentTarget;
    const input = evt.target;
    setCustomError(input, config);
    setFieldError(input);
    setSubmitButtonState(form, config);
}
function setCustomError(input, config) {
    const validity = input.validity;

    input.setCustomValidity('');
    input.classList.remove(config.nameError);

    if(!input.validity.valid) {
        input.classList.add(config.nameError);
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
function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}
function setSubmitButtonState(form, config) {
    const button = form.querySelector('.popup__button');
    const isValid = form.checkValidity();

    if (!isValid) {
        button.classList.add(config.buttonInvalid);
        button.classList.remove(config.buttonValid)
        button.setAttribute('disabled', 'disabled');
    } else {
        button.classList.remove(config.buttonInvalid);
        button.classList.add(config.buttonValid);
        button.removeAttribute('disabled');
    }
}

enableValidation({
    form: '.popup__container[name="profile-popup"]',
    nameError : 'popup__name_error',
    buttonInvalid: 'popup__button_invalid',
    buttonValid : 'popup__button_valid',
})
enableValidation({
    form: '.popup__container[name="popup-add-element"]',
    nameError : 'popup__name_error',
    buttonInvalid: 'popup__button_invalid',
    buttonValid : 'popup__button_valid',
})

