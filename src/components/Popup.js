export class Popup {
    constructor(selectorPopup) {
        this.popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
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
        this.popup.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}
