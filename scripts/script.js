const profileEdit = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.profile-popup');
const profilePopupClose = document.querySelector('.profile-popup__close');
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');


//открытие попапа профиль
function openPopup(item) {
  item.classList.add('popup_opened');
}
//закрытие попапа профиль
function closePopup(item) {
  item.classList.remove('popup_opened');
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

//Пятый спринт!!!!
const initialCards = [
  {
    elementTitle: 'Архыз',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    elementTitle: 'Челябинская область',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    elementTitle: 'Иваново',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    elementTitle: 'Камчатка',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    elementTitle: 'Холмогорский район',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    elementTitle: 'Байкал',
    elementPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const template = document.querySelector('.template').content;
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

function addElement(evt) {
  evt.preventDefault();
  const initialCard = {
    elementTitle: `${newTitle.value}`,
    elementPhoto: `${newPhoto.value}`
  };
  renderElement(initialCard);
  closePopup(popupAddElement);
}
function renderElement(item) {
  const element = createCard(item);
  elements.prepend(element);
}
//создание карточки
function createCard(item) {
  const element = template.cloneNode(true);
  const elementPhoto = element.querySelector('.element__photo');
  element.querySelector('.element__title').textContent = item.elementTitle;
  elementPhoto.src = item.elementPhoto;
  elementPhoto.alt = item.elementTitle;
  removeElement(element);
  toggleLike(element);
  setElemetFullScreen(element);
  return element;
}
//удаление элемента
function removeElement(element) {
  element.querySelector('.element__trash').addEventListener('click',function(evt) {
    const element = evt.currentTarget.closest('.element');
    element.remove();
  });
}
//кнопка лайк
function toggleLike(element) {
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    const element = evt.currentTarget;
    element.classList.toggle('element__like_active');
  });
}
//открытие картинки во весь экран
function setElemetFullScreen(element) {
  const cardImage = element.querySelector('.element__photo');
  element.querySelector('.element__photo').addEventListener('click',function(evt) {
    imagePopupImage.src = cardImage.src;
    imagePopupImage.alt = cardImage.alt;
    imagePopupTitle.textContent = cardImage.alt;
    openPopup(imagePopup);
  });
}

popupFullScreenClose.addEventListener('click', function() {
  closePopup(popupFullScreen);
})
addCardForm.addEventListener('submit', addElement);
buttonAddElement.addEventListener('click', function() {
  newTitle.value = null;
  newPhoto.value = null;
  openPopup(popupAddElement);
});
closeAddElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});
initialCards.forEach(renderElement);
