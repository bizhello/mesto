import {ESC_CODE} from './index.js';

export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        this._handleEscClose();
        this.setEventListeners();
    }

    close = () => {
        this._selectorPopup.classList.remove('popup_opened');
    }

    _handleEscClose() {
        document.addEventListener('keydown', ((evt) => {
            if (evt.key === ESC_CODE) {
                this.close();
            }
        }))
    }

    setEventListeners() {
        this._selectorPopup.addEventListener('mousedown', ((evt) => {
            if(evt.target === evt.currentTarget) {
                this.close();
            }
        }))
        this._selectorPopup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}