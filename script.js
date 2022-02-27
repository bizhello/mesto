let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

function togglePopup(){
  popup.classList.toggle('popup__opened');
}

profileEdit.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);

let profile = document.querySelector('.profile');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let popupButton = document.querySelector('.popup__button');
let popupStatus = document.querySelector('.popup__status');
let popupName = document.querySelector('.popup__name');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
}

popupButton.addEventListener('click', formSubmitHandler);
popupButton.addEventListener('click', togglePopup);
