export class Popup {
    constructor(selectorPopup) {
        this.popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this); // для закрытия на крестик
    }

    open() {
        this.popup.classList.add('popup_opened');
        this._handleEscClose();
        console.log('open',this.popup);
    }

    close() {
        this.popup.classList.remove('popup_opened');
        this.popup.removeEventListener('keydown', this._handleEscClose)
        console.log('close',this.popup);
    }

    _handleEscClose() {
        document.addEventListener('keydown', ((evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        }))
    }

    setEventListeners() {
        this.popup.addEventListener('mousedown', (evt => {
            if(evt.target === evt.currentTarget) {
                this.close();
            }
        }))
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}
