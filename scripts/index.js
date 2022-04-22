import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'
import {initialCards} from './initialCards.js'

const elements = document.querySelector('.elements');
const buttonAddElement = document.querySelector('.profile__button');
const popupAddElement = document.querySelector('.popup-add-element');
const closeAddElement = document.querySelector('.popup-add-element__close');
const popupFullScreen = document.querySelector('.popup-fullscreen');
const newTitle = document.querySelector('#popup-add-element-name');
const newPhoto = document.querySelector('#popup-add-element-src');
const imagePopup = document.querySelector('.popup-fullscreen');
const imagePopupImage = imagePopup.querySelector('.popup-fullscreen__image');
const imagePopupTitle = imagePopup.querySelector('.popup-fullscreen__title');
const addCardForm = document.querySelector('.popup-add-element__container');
const popupFullScreenClose = document.querySelector('.popup-fullscreen__close');
const profileEdit = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.profile-popup');
const profilePopupClose = document.querySelector('.profile-popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');
const ESC_CODE = 'Escape';
const template = document.querySelector('.template');

//открытие попапа профиль
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//закрытие попапа профиль
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  }

//смена имени и статуса
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopup(profilePopup);
}

profileEdit.addEventListener('click', function () {
  popupName.value= profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  openPopup(profilePopup);
});

profilePopupClose.addEventListener('click', function () {
  closePopup(profilePopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit );

popupFullScreenClose.addEventListener('click', function() {
  closePopup(popupFullScreen);
})

addCardForm.addEventListener('submit', () => {
  let el = new Card(`${newTitle.value}`,`${newPhoto.value}`, template);
  el.createCard();
  elements.prepend(el._view);
  closePopup(popupAddElement);
});

initialCards.forEach((item) => {
  const el = new Card(item.elementTitle, item.elementPhoto, template);
  el.createCard();
  elements.prepend(el._view);
})

buttonAddElement.addEventListener('click', function() {
  const button = document.querySelector(".popup-add-element__button");
  newTitle.value = '';
  newPhoto.value = '';
  button.classList.add('popup__button_invalid');
  button.setAttribute('disabled','disabled');
  openPopup(popupAddElement);

});
closeAddElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});


//6 спринт//
function closePopupTarget(popup) {
  popup.addEventListener('mousedown', function (evt) {
    if(evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
}
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

closePopupTarget(profilePopup);
closePopupTarget(imagePopup);
closePopupTarget(popupAddElement);

//7 спринт//
const config = {
  nameError : 'popup__name_error',
  buttonInvalid: 'popup__button_invalid',
  buttonValid : 'popup__button_valid',
  buttonSubmit:'.popup__button',
}

const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, addCardForm);

profileFormValidity.enableValidation();
newCardFormValidity.enableValidation();

export {imagePopupImage, imagePopupTitle, openPopup, imagePopup, closePopup, popupAddElement, elements}
