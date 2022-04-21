export class Card {
    constructor(elementTitle, elementPhoto, template) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
        this._template = template;
    }

    _removeElement = () => {
        this._view = null;
    }
    _setElementFullScreen = () => {
        imagePopupImage.src = this._elementPhoto;
        imagePopupImage.alt = this._elementTitle;
        imagePopupTitle.textContent = this._elementTitle;
        openPopup(imagePopup);
    }

    _listener = () => {
        this._view.querySelector('.element__like').addEventListener('click', (evt => {
            evt.target.classList.toggle('element__like_active')}));
        this._view.querySelector('.element__trash').addEventListener('click', this._removeElement);
        this._view.querySelector('.element__photo').addEventListener('click',this._setElementFullScreen);
    }

    _renderCard = () => {
        elements.prepend(this._view);
    }

    createCard = () => {
        this._view = this._template.content.cloneNode(true).querySelector('.element');
        this._view.querySelector('.element__title').textContent = this._elementTitle;
        this._view.querySelector('.element__photo').src = this._elementPhoto;

        this._listener();
        this._renderCard();
   }
}
import {imagePopupImage, imagePopupTitle, openPopup, imagePopup, elements} from './index.js'