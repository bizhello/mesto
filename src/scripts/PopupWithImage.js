import {Popup} from './Popup.js';
import {imagePopupTitle, imagePopupImage} from './index.js';


export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }
    open(elementTitle, elementPhoto) {
        imagePopupImage.src = elementPhoto;
        imagePopupImage.alt = elementTitle;
        imagePopupTitle.textContent = elementTitle;

        super.open();
    }
}
