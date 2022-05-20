import '../pages/index.css';

import {Card} from '../components/Card';
import {config} from '../components/config';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';
import {Api} from '../components/Api';
import {Popup} from "../components/Popup";

const elementSection = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonAddElement = document.querySelector('.profile__button');
const cardElement = document.querySelector('.popup-add-element__container');
const profileChangeAvatar = document.querySelector('.profile__change-avatar');
const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');
const boxAvatar = document.querySelector('.profile__box-avatar');
const editAvatarForm = document.querySelector('.popup-edit-avatar__container');


const popupEditAvatar = new PopupWithForm( (data) => {
  profileAvatar.src = data['popup-edit-avatar-src'];
    renderLoading(true, '.popup-edit-avatar__button');
  api.changePhotoProfile(data['popup-edit-avatar-src'])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
          popupEditAvatar.close();
          renderLoading(false, '.popup-edit-avatar__button');
      })
}, '.popup-edit-avatar');
popupEditAvatar.setEventListeners();

boxAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});
boxAvatar.addEventListener('mouseout', () => {
  profileChangeAvatar.style.display = 'none';
  profileAvatar.style.opacity = '1';
})
boxAvatar.addEventListener('mouseover', () => {
  profileChangeAvatar.style.display = 'block';
  profileAvatar.style.opacity = '0.6';
})


const api = new Api({
  url: 'https://mesto.nomoreparties.co.',
  headers: {
    "authorization": 'a8fa9cc1-52e1-4272-a720-87f73d0acb6d',
    "content-type": "application/json"
  }
})

const popupDeleteCard = new Popup('.popup-delete-card');
popupDeleteCard.setEventListeners();

function renderLoading(isLoading, popupSelector) {
    const popup = document.querySelector(popupSelector)
    if (isLoading) {
        popup.textContent = 'Сохранение...';
    } else {
        popup.textContent = 'Сохранить';
    }
}

//получение данных о пользователе с api
const apiGetUserInfo = api.getUserInfo();
apiGetUserInfo
    .then((data) => {
  profileName.textContent = data.name;
  profileStatus.textContent = data.about;
  profileAvatar.src = data.avatar;
})
    .catch((err) => {
      console.log(err);
    })

//инициализация карточек с api
const apiGetInitialCards = api.getInitialCards();
apiGetInitialCards
    .then((data) => {
    const cardInitial = new Section(data, (item) => {
      cardInitial.addItem(createCard(item.name, item.link, item.likes.length, item._id, item.owner._id));
      }, '.elements');
  cardInitial.renderSection();
})
    .catch((err) => {
      console.log(err);
    });

//смена имени и статуса с api
const popupForm = new PopupWithForm((data) => {
  includeUserInfo.setUserInfo(data['popup-name'], data['popup-status']);
  renderLoading(true,'.profile-popup__button');
  api.editUserInfo()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
          popupForm.close();
          renderLoading(false, '.profile-popup__button');
      })
}, '.profile-popup');
popupForm.setEventListeners();

const includeUserInfo = new UserInfo('.profile__name', '.profile__status');
const fullScreenPopup = new PopupWithImage('.popup-fullscreen');
fullScreenPopup.setEventListeners();

const popupCardForm = new PopupWithForm(cardFormSubmit,'.popup-add-element');
popupCardForm.setEventListeners();

function cardFormSubmit(data) {
  elementSection.prepend(createCard(data['popup-add-element-name'], data['popup-add-element-src']));
    renderLoading(true, '.popup-add-element__button')
  api.createCard(data['popup-add-element-name'], data['popup-add-element-src'])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
          popupCardForm.close();
          renderLoading(false, '.popup-add-element__button');
      })
}

function createCard(title, photo, likes, cardId, ownerId) {
  const card = new Card(title, photo,'.template', () => {
    fullScreenPopup.open(title, photo);
  }, popupDeleteCard, likes, cardId, api, ownerId);
  return card.createCard();
}

profileEdit.addEventListener('click', () => {
  const userInfo = includeUserInfo.getUserInfo();
  popupName.value = userInfo.name;
  popupStatus.value = userInfo.status;
  profileFormValidity.setSubmitButtonState();
  popupForm.open();
});

buttonAddElement.addEventListener('click', () => {
  newCardFormValidity.setSubmitButtonState();
  popupCardForm.open();
})
const editAvatarValidity = new FormValidator(config, editAvatarForm);
const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, cardElement);

profileFormValidity.setEventListeners();
newCardFormValidity.setEventListeners();
editAvatarValidity.setEventListeners();
