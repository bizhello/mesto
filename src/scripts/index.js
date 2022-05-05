import '../pages/index.css';

import {initialCards} from'./initialCards';
import {Popup} from './Popup';
import {Card} from './Card';
import {config} from './config';
import {FormValidator} from './FormValidator';
import {PopupWithForm} from './PopupWithForm';
import {PopupWithImage} from './PopupWithImage';
import {Section} from './Section';
import {UserInfo} from './UserInfo';


const elements = document.querySelector('.elements');
const buttonAddElement = document.querySelector('.profile__button');
const popupAddElement = document.querySelector('.popup-add-element');
const newTitle = document.querySelector('#popup-add-element-name');
const newPhoto = document.querySelector('#popup-add-element-src');
const imagePopup = document.querySelector('.popup-fullscreen');
const imagePopupImage = imagePopup.querySelector('.popup-fullscreen__image');
const imagePopupTitle = imagePopup.querySelector('.popup-fullscreen__title');
const addCardForm = document.querySelector('.popup-add-element__container');
const profileEdit = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.profile-popup');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');
const ESC_CODE = 'Escape';
const template = document.querySelector('.template');


function handleProfileFormSubmit() {
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
}

profileEdit.addEventListener('click', () => {
  const popup = new PopupWithForm(handleProfileFormSubmit, profilePopup);
  popup.open();
  const includeUserInfo = new UserInfo(profileName, profileStatus);
  includeUserInfo.setUserInfo();
});

addCardForm.addEventListener('submit', () => {
  const el = new Card(`${newTitle.value}`,`${newPhoto.value}`, template);
  el.createCard();
  elements.prepend(el._view);
  const popupClose = new Popup(popupAddElement);
  popupClose.close();
});



const renderInitialCard = new Section(initialCards, () => {
  initialCards.forEach((item) => {
    const card = new Card(item.elementTitle, item.elementPhoto, template);
    card.createCard();
    renderInitialCard.addItem(card._view);
  })
}, elements);
renderInitialCard.renderSection();


buttonAddElement.addEventListener('click', () => {
  const popupElement = new Popup(popupAddElement);
  popupElement.open();
  const button = document.querySelector(".popup-add-element__button");
  newTitle.value = '';
  newPhoto.value = '';
  button.classList.add('popup__button_invalid');
  button.setAttribute('disabled','disabled');
});

const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, addCardForm);

profileFormValidity.enableValidation();
newCardFormValidity.enableValidation();

export {imagePopupImage, imagePopupTitle, imagePopup, popupAddElement, elements, ESC_CODE, popupStatus, popupName}
