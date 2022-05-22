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

let profileId = '';
let initialCardsFromServer ;

const popupEditAvatar = new PopupWithForm( (data) => {
    renderLoading(true, '.popup-edit-avatar__button');
  api.changePhotoProfile(data['popup-edit-avatar-src'])
      .then(() => {
          includeUserInfo.setUserAvatar(data['popup-edit-avatar-src']);
          popupEditAvatar.close();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
          renderLoading(false, '.popup-edit-avatar__button');
      })
}, '.popup-edit-avatar');
popupEditAvatar.setEventListeners();


boxAvatar.addEventListener('click', () => {
    editAvatarValidity.setSubmitButtonState();
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
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
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

const apiGetUserInfo = api.getUserInfo();
const apiGetInitialCards = api.getInitialCards();

Promise.all([apiGetUserInfo, apiGetInitialCards])
    .then(data => {
      includeUserInfo.setUserInfo(data[0].name, data[0].about);
      includeUserInfo.setUserAvatar(data[0].avatar);
      profileId = data[0]._id;
      initialCardsFromServer = data[1];

      const cardsContainer = new Section((item) => {
          cardsContainer.addItem(createCard(item.name, item.link, item.likes.length, item._id, item.owner._id, item.likes));
      }, '.elements', initialCardsFromServer);

      function cardFormSubmit(data) {
        renderLoading(true, '.popup-add-element__button')
        api.createCard(data['popup-add-element-name'], data['popup-add-element-src'])
            .then(() => {
                popupCardForm.close();
                cardsContainer.addItemSubmit(createCard(data['popup-add-element-name'], data['popup-add-element-src']));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, '.popup-add-element__button');
            })
      }

      const popupCardForm = new PopupWithForm(cardFormSubmit,'.popup-add-element');
      popupCardForm.setEventListeners();

      buttonAddElement.addEventListener('click', () => {
        newCardFormValidity.setSubmitButtonState();
        popupCardForm.open();
      })

      cardsContainer.renderSection();
    })
    .catch(err => {
        console.log(err);
    });


//смена имени и статуса с api
const popupProfile = new PopupWithForm((data) => {
  renderLoading(true,'.profile-popup__button');
  api.editUserInfo(popupProfile.values['popup-name'], popupProfile.values['popup-status'])
      .then(() => {
        includeUserInfo.setUserInfo(data['popup-name'], data['popup-status']);
        popupProfile.close();
    })
      .catch((err) => {
          console.log(err);
          })
      .finally(() => {
          renderLoading(false, '.profile-popup__button');
          })
}, '.profile-popup');
popupProfile.setEventListeners();


const includeUserInfo = new UserInfo('.profile__name', '.profile__status', '.profile__avatar');
const fullScreenPopup = new PopupWithImage('.popup-fullscreen');
fullScreenPopup.setEventListeners();


function createCard(title, photo, numberLikes, cardId, ownerId, likes) {
  const card = new Card(title, photo,'.template', () => {
    fullScreenPopup.open(title, photo);
  }, numberLikes,ownerId, likes, () => {
      popupDeleteCard.open();
      document.querySelector('.popup-delete-card__button').addEventListener('click', () => {
          api.deleteCard(cardId)
              .then(() => {
                  card.removeElement();
                  popupDeleteCard.close();
              })
              .catch((err) => {
                  console.log(err, 'удаление карточки без присвоенного ID');
              })
      })
  }, (evt)=> {
      if (evt.target.classList.contains('element__like_active')) {
          api.deleteLikeCard(cardId)
              .then(() => {
                  card.deleteLikeCard();
              })
              .catch((err) => {
                  console.log(err, 'не присвоен ID');
              });
      }
      else {
          api.likeCard(cardId)
              .then(() => {
                  card.likeCard();
              })
              .catch((err) => {
                  console.log(err, 'не присвоен ID');
              });
      }
    }, profileId)
  return card.createCard()
}

profileEdit.addEventListener('click', () => {
  const userInfo = includeUserInfo.getUserInfo();
  popupName.value = userInfo.name;
  popupStatus.value = userInfo.status;
  profileFormValidity.setSubmitButtonState();
    popupProfile.open();
});


const editAvatarValidity = new FormValidator(config, editAvatarForm);
const profileFormValidity = new FormValidator(config, profileForm);
const newCardFormValidity = new FormValidator(config, cardElement);

profileFormValidity.setEventListeners();
newCardFormValidity.setEventListeners();
editAvatarValidity.setEventListeners();
