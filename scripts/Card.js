class Card {
    constructor(elementTitle, elementPhoto) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
    }
   static _template = document.querySelector('.template').content;

    _toggleLike = (evt) => {
        evt.target.classList.toggle('element__like_active')
    }
    _removeElement = () => {
        this._view.remove();
    }
    _setElementFullScreen = () => {
        imagePopupImage.src = this._elementPhoto;
        imagePopupImage.alt = this._elementTitle;
        imagePopupTitle.textContent = this._elementTitle;
        openPopup(imagePopup);
    }

    createCard = () => {
    this._view = Card._template.cloneNode(true).children[0];
    this._view.querySelector('.element__title').textContent = this._elementTitle;
    this._view.querySelector('.element__photo').src = this._elementPhoto;

    this._view.querySelector('.element__like').addEventListener('click', this._toggleLike);
    this._view.querySelector('.element__trash').addEventListener('click', this._removeElement);
    this._view.querySelector('.element__photo').addEventListener('click',this._setElementFullScreen);

    closePopup(popupAddElement);
    elements.prepend(this._view);
   }
}