export class Popup {
    constructor(selectorPopup) {
        this.popup = document.querySelector(selectorPopup);
    }

    open() {
        this.popup.classList.add('popup_opened');
        this._handleEscClose();
    }

    close = () => {
        this.popup.classList.remove('popup_opened');
        this.popup.removeEventListener('keydown', ((evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        }))
    }

    _handleEscClose() {
        document.addEventListener('keydown', ((evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        }))
    }

    setEventListeners() {
        this.popup.addEventListener('mousedown', ((evt) => {
            if(evt.target === evt.currentTarget) {
                this.close();
            }
        }))
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}
