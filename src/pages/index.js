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
const fullScreenPopup = new PopupWithImage('.popup-fullscreen');
fullScreenPopup.setEventListeners();

const popupForm = new PopupWithForm((data) => {
  includeUserInfo.setUserInfo(data['popup-name'], data['popup-status']);
}, '.profile-popup');
  popupForm.setEventListeners();

  const popupCardForm = new PopupWithForm(cardFormSubmit,'.popup-add-element');
popupCardForm.setEventListeners();

function cardFormSubmit(data) {
  cardInitial.addItem(createCard(data['popup-add-element-name'], data['popup-add-element-src']))
}

function createCard(title, photo) {
  const card = new Card(title, photo, '.template', () => {
    fullScreenPopup.open(title, photo);
  });
  card.createCard();
  return card.createCard();
}

profileEdit.addEventListener('click', () => {
  newCardFormValidity.setSubmitButtonState();
  includeUserInfo.getUserInfo();
  popupName.value = includeUserInfo.values.name;
  popupStatus.value = includeUserInfo.values.status;
  popupForm.open();
});

const cardInitial = new Section(initialCards, (item) => {
  cardInitial.addItem(createCard(item.title, item.photo));
}, '.elements');
cardInitial.renderSection();

buttonAddElement.addEventListener('click', () => {
  popupCardForm.open();
})

const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, cardElement);

profileFormValidity.setEventListeners();
newCardFormValidity.setEventListeners();
