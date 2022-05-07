import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(callbackSubmitForm ,selectorPopup) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._inputList = this.popup.querySelectorAll('.popup__name');
    }
    close() {
        super.close();
    }
    getInputValues() {
        this.values = {
            valueTop : this._inputList[0].value,
            valueBottom : this._inputList[1].value
        }
        return this.values;
    }
    setEventListeners() {
        this._inputList[0].value = '';
        this._inputList[1].value = '';
        super.setEventListeners();
        this.popup.addEventListener('submit', () => {
            this._callbackSubmitForm();
            this.close();
        })
    }

}


