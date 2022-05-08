export class Card {
    constructor(elementTitle, elementPhoto, template, handleCardClick) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
        this._template = document.querySelector(template);
        this._handleCardClick = handleCardClick;
    }

    _removeElement = () => {
        this.view.remove();
        this.view = null;
    }

    _setListener = () => {
        this.view.querySelector('.element__like').addEventListener('click', (evt => {
            evt.target.classList.toggle('element__like_active')
        }));
        this.view.querySelector('.element__trash').addEventListener('click', this._removeElement);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    createCard = () => {
        this.view = this._template.content.cloneNode(true).querySelector('.element');
        this._cardImage = this.view.querySelector('.element__photo');
        this.view.querySelector('.element__title').textContent = this._elementTitle;
        this._cardImage.alt = this._elementTitle;
        this._cardImage.src = this._elementPhoto;

        this._setListener();
        return this.view;
   }
}
