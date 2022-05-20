import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(callbackSubmitForm ,selectorPopup) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._inputList = this.popup.querySelectorAll('.popup__name');
        this._form = this.popup.querySelector('.popup__container');
    }
    close() {
        super.close();
        this._form.reset();
    }
    _getInputValues() {
        this.values = {};
        this._inputList.forEach(inputElement => {
            this.values[inputElement.name] = inputElement.value;
        })
        return this.values;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
        })
    }
}







