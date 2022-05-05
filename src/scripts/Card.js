import {PopupWithImage} from './PopupWithImage.js';
import {imagePopup} from "./index.js";

export class Card {
    constructor(elementTitle, elementPhoto, template ) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
        this._template = template;
    }

    _removeElement = () => {
        this._view.remove();
        this._view = null;
    }

    _setListener = () => {
        this._view.querySelector('.element__like').addEventListener('click', (evt => {
            evt.target.classList.toggle('element__like_active')
        }));
        this._view.querySelector('.element__trash').addEventListener('click', this._removeElement);
        this._view.querySelector('.element__photo').addEventListener('click', () => {
            const fullScreenPopup = new PopupWithImage(imagePopup);
            fullScreenPopup.open(this._elementTitle, this._elementPhoto);
        });
    }


    createCard = () => {
        this._view = this._template.content.cloneNode(true).querySelector('.element');
        this._view.querySelector('.element__title').textContent = this._elementTitle;
        this._view.querySelector('.element__photo').src = this._elementPhoto;

        this._setListener();
        return this._view;
   }
}

