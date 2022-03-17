const profileEdit = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.profile-popup');
const profilePopupClose = document.querySelector('.profile-popup__close');
const profile = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileSubmit = document.querySelector('.profile-popup__container');
const popupStatus = document.querySelector('#popup-status');
const popupName = document.querySelector('#popup-name');


//открытие попапа профиль
function openPopup(item) {
  item.classList.add('popup-fullscreen_opened');
}
//закрытие попапа профиль
function closePopup(item) {
  item.classList.remove('popup-fullscreen_opened');
}

//смена имени и статуса
function profileFormSubmit (evt) {
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
profileSubmit.addEventListener('submit', profileFormSubmit );

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
const submitAddElement = document.querySelector('.popup-add-element__container');
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
  const element = createCard(item)
  createCard(element);
  removeElement(element);
  toggleLike(element);
  setElemetFullScreen(element);
  elements.prepend(element);
}
//создание карточки
function createCard(item) {
  const element = template.cloneNode(true);
  element.querySelector('.element__title').textContent = item.elementTitle;
  element.querySelector('.element__photo').src = item.elementPhoto;
  element.querySelector('.element__photo').alt = item.elementTitle;
  return element;
}

//удаление элемента
function removeElement(element) {
  element.querySelector('.element__trash').addEventListener('click',function(evt){
    const element = evt.currentTarget.closest('.element');
    element.remove();
  });
}

//кнопка лайк
function toggleLike(element) {
  element.querySelector('.element__like').addEventListener('click', function(evt){
    const element = evt.currentTarget.closest('.element__like');
    element.classList.toggle('element__like_active');
  });
}

//открытие картинки во весь экран
function setElemetFullScreen(element) {
  element.querySelector('.element__photo').addEventListener('click',function(evt){
    const element = evt.currentTarget.closest('.element__photo');
    openPopup(imagePopup);
    imagePopup.querySelector('.popup-fullscreen__image').src = element.src;
    imagePopup.querySelector('.popup-fullscreen__title').textContent = element.alt;
  });
}


popupFullScreenClose.addEventListener('click', function(){
  closePopup(popupFullScreen);
})
submitAddElement.addEventListener('submit', addElement);
buttonAddElement.addEventListener('click', function() {
  newTitle.value = null;
  newPhoto.value = null;
  openPopup(popupAddElement);
});
closeAddElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});
initialCards.forEach(renderElement);
