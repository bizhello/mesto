import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._imagePopup = document.querySelector('.popup-fullscreen__image');
        this._titlePopup = document.querySelector('.popup-fullscreen__title');
    }
    open(elementTitle, elementPhoto) {
        this._imagePopup.src = elementPhoto;
        this._imagePopup.alt = elementTitle;
        this._titlePopup.textContent = elementTitle;

        super.open();
    }
}
