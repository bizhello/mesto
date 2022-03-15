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
  let element = template.cloneNode(true);
  element.querySelector('.element__title').textContent = item.elementTitle;
  element.querySelector('.element__photo').src = item.elementPhoto;
  //setElemetActionsListeners(element);
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

initialCards.forEach(renderElement);




//Ставим лайк
let elementLikes = document.querySelectorAll('.element__like');
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
}
elementLikes.forEach(button => {
  button.addEventListener('click', toggleLike);
});




//закрытие фулскрина
const popupFullScreenClose = document.querySelector('.popup-fullscreen__close');
popupFullScreenClose.addEventListener('click', function(){
  popupFullScreen.classList.remove('popup-fullscreen_opened');
})

saveElement.addEventListener('click', addElement);
buttonAddElement.addEventListener('click', openPopupAddElement);
closeAddElement.addEventListener('click', closePopupAddElement);


/*
const popupFullScreen = document.querySelector('.popup-fullscreen');
let elementsForFullScreen = document.querySelectorAll('.element');
function openPopupFullScreen(item) {
  popupFullScreen.querySelector('.popup-fullscreen__image').src = item.elementPhoto.src;
  popupFullScreen.querySelector('.popup-fullscreen__title').textContent = item.elementTitle.textContent;
  popupFullScreen.classList.add('popup-fullscreen_opened');
}
elementsForFullScreen.forEach(item => {
  const initialElement = {
    elementTitle: item.querySelector('.element__title'),
    elementPhoto: item.querySelector('.element__photo')
  }
//  initialElement.elementPhoto.addEventListener('click', openPopupFullScreen(initialElement));
});

/*



//удаление элемента

function removeElement(evt) {
  const element = evt.currentTarget.closest('.element');
  element.remove();
}

function setElemetActionsListeners(element) {
  element.
  querySelector('.element__trash').
  addEventListener('click',removeElement);
}
/*
//фулскрин
function openFullScreen(evt) {
  const element = evt.currentTarget.closest('.element');
  popupFullScreen.querySelector('.popup-fullscreen__image').src = elementPhoto.src;
  popupFullScreen.querySelector('.popup-fullscreen__title').textContent = item.elementTitle.textContent;
  popupFullScreen.classList.add('popup-fullscreen_opened');
}
function setElemetFullScreen



/*
function removeElement(element) {
  element.remove();
}

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


//Картинку во весь ЭКРАН

*/
