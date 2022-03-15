const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupContainer = document.querySelector('.popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');


function openPopup() {
  popup.classList.add('popup_opened');
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
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
const saveElement = document.querySelector('.popup-add-element__button');
const popupFullScreen = document.querySelector('.popup-fullscreen');

function addElement(evt) {
  evt.preventDefault();
  const newTitle = document.querySelector('#popup-add-element-name').value;
  const newPhoto = document.querySelector('#popup-add-element-src').value;
  const initialCard = {
    elementTitle: `${newTitle}`,
    elementPhoto: `${newPhoto}`
  };
  renderElement(initialCard);
  closePopupAddElement();
}
function renderElement(item) {
  const element = template.cloneNode(true);
  element.querySelector('.element__title').textContent = item.elementTitle;
  element.querySelector('.element__photo').src = item.elementPhoto;
  element.querySelector('.element__photo').alt = item.elementTitle;
  setElemetActionsListeners(element);
  setElemetLike(element);
  setElemetFullScreen(element);
  elements.prepend(element);
}
function openPopupAddElement() {
  popupAddElement.classList.add('popup-add-element_opened');
  document.querySelector('#popup-add-element-name').value = null;
  document.querySelector('#popup-add-element-src').value = null;
}
function closePopupAddElement() {
  popupAddElement.classList.remove('popup-add-element_opened');
}


//закрытие фулскрина
const popupFullScreenClose = document.querySelector('.popup-fullscreen__close');
popupFullScreenClose.addEventListener('click', function(){
  popupFullScreen.classList.remove('popup-fullscreen_opened');
})


//удаление элемента
function removeElement(evt) {
  const element = evt.currentTarget.closest('.element');
  element.remove();
}
function setElemetActionsListeners(element) {
  element.querySelector('.element__trash').addEventListener('click',removeElement);
}

//кнопка лайк
function toggleLike(evt) {
  const elementLike = evt.currentTarget.closest('.element__like');
  elementLike.classList.toggle('element__like_active');
}
function setElemetLike(element) {
  element.querySelector('.element__like').addEventListener('click',toggleLike);
}

//открытие фулсрин Картинки;
function openPopupFullScreen(evt) {
  const elementPhoto = evt.currentTarget.closest('.element__photo').src;
  const elementTitle = evt.currentTarget.closest('.element__photo').alt;
  const popupFullScreen = document.querySelector('.popup-fullscreen');
  popupFullScreen.classList.add('popup-fullscreen_opened');
  popupFullScreen.querySelector('.popup-fullscreen__image').src = elementPhoto;
  popupFullScreen.querySelector('.popup-fullscreen__title').textContent = elementTitle;
}
function setElemetFullScreen(element) {
  element.querySelector('.element__photo').addEventListener('click',openPopupFullScreen);
}


saveElement.addEventListener('click', addElement);
buttonAddElement.addEventListener('click', openPopupAddElement);
closeAddElement.addEventListener('click', closePopupAddElement);

initialCards.forEach(renderElement);

/*
document.body.addEventListener('click', evt => {
  const element = evt.currentTarget.closest('.element');
  if (!element) {
    return
  }
  if (evt.target.classList.contains('element__trash')) {
    removeElement(element);
    console.log('треш!');
  } else if(evt.target.classList.contains('element__like')) {
    toggleLike(element);
    console.log('лайк!');
  } else if(evt.target.classList.contains('element__photo')) {
    openPopupFullScreen(element);
    console.log('опенКартинку!');
  }
})

*/
