let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let profile = document.querySelector('.profile');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let popupContainer = document.querySelector('.popup__container');
let popupStatus = document.querySelector('#popup-status');
let popupName = document.querySelector('#popup-name');

function openPopup() {
  popup.classList.add('popup_opened');
}//открытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}//закрытие попапа

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopup();
}//смена имени и статуса

profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler );
