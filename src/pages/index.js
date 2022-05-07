import '../pages/index.css';

import {initialCards} from'../components/initialCards';
import {Card} from '../components/Card';
import {config} from '../components/config';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';

const cardsContainer = document.querySelector('.elements');
const buttonAddElement = document.querySelector('.profile__button');
const cardElement = document.querySelector('.popup-add-element__container');
const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');

const includeUserInfo = new UserInfo('.profile__name', '.profile__status');

const handleCardClick = (evt) => {
  const fullScreenPopup = new PopupWithImage('.popup-fullscreen');
   const element = evt.currentTarget.closest('.element');
  const cardTitle = element.querySelector('.element__title').textContent;
  const cardPhoto = element.querySelector('.element__photo').src;
  fullScreenPopup.open(cardTitle, cardPhoto);
  fullScreenPopup.setEventListeners();
}

function handleProfileFormSubmit() {
  includeUserInfo.setUserInfo();
}

function createCard(title, photo) {
  const card = new Card(title, photo, '.template', handleCardClick);
  card.createCard();
  cardsContainer.prepend(card.view);
}

profileEdit.addEventListener('click', () => {
  const popup = new PopupWithForm(handleProfileFormSubmit, '.profile-popup');
  popup.setEventListeners();
  includeUserInfo.getUserInfo();
  popupStatus.value =  includeUserInfo.values.status;
  popupName.value =  includeUserInfo.values.name;
  popup.open();
});

const renderInitialCard = new Section(initialCards, (item) => {
  createCard(item.title, item.photo);
}, '.elements');
renderInitialCard.renderSection();

buttonAddElement.addEventListener('click', () => {
  const popupForm = new PopupWithForm(() => {
    popupForm.getInputValues();
    createCard(popupForm.values.valueTop, popupForm.values.valueBottom);
  }, '.popup-add-element');
  popupForm.setEventListeners();
  popupForm.open();
})

const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, cardElement);

profileFormValidity.enableValidation();
newCardFormValidity.enableValidation();

