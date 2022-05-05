import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(callbackSubmitForm ,selectorPopup) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._selectorPopup = selectorPopup;
        this._inputList = this._selectorPopup.querySelectorAll('.popup__name');
    }
    close() {
        super.close();
    }
    _getInputValues() {
        this._values = {};
        this._inputList.forEach(inputElement => {
            this._values[inputElement.name] = inputElement.value;
        })
        return this._values;
        console.log(this._getInputValues);
    }
    setEventListeners() {
        super.setEventListeners();
        this._selectorPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
            this.close();
        })
    }

}


