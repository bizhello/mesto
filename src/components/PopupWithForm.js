import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(callbackSubmitForm ,selectorPopup) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._inputList = this.popup.querySelectorAll('.popup__name');
    }
    close() {
        super.close();
        this._inputList.forEach((input) => { //не работает
            input.value = '';
        })
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
        this.popup.addEventListener('submit', () => {
            this._callbackSubmitForm(this._getInputValues());
            this.close();
            this._inputList.forEach(input => { //а при сабмите - очищает
                input.value = '';
                })
            })
        }
}







