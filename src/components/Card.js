export class Card {
    constructor(elementTitle, elementPhoto, template, handleCardClick, popupDeleteCard ,likes, cardId, api, ownerId) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
        this._template = document.querySelector(template);
        this._handleCardClick = handleCardClick;
        this._popupDeleteCard = popupDeleteCard;
        this._likes = likes;
        this._cardId = cardId;
        this._api = api;
        this._ownerId = ownerId;
    }

    _removeElement = () => {
        this.view.remove();
        this.view = null;
    }

    _setListener = () => {
        this.view.querySelector('.element__like').addEventListener('click', ((evt) => {
            evt.target.classList.toggle('element__like_active');
            if (this._cardId == undefined) {
                if(this.view.querySelector('.element__number').textContent < 1) {
                    this.view.querySelector('.element__number').textContent ++;
                }
                else {
                    this.view.querySelector('.element__number').textContent --;
                }
                return;
            }
            if (evt.target.classList.contains('element__like_active')) {
                this._api.likeCard(this._cardId)
                    .then( () => {
                        this.view.querySelector('.element__number').textContent ++;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                this._api.deleteLikeCard(this._cardId)
                .then( () => {
                    this.view.querySelector('.element__number').textContent --;
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }));
        this.view.querySelector('.element__trash').addEventListener('click', () => {
            this._popupDeleteCard.open();
            document.querySelector('.popup-delete-card__button').addEventListener('click', () => {
                this._api.deleteCard(this._cardId)
                    .catch((err) => {
                        console.log(err);
                    })
                this._removeElement();
                this._popupDeleteCard.close();
            })
        });
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    createCard = () => {
        this.view = this._template.content.cloneNode(true).querySelector('.element');
        this._cardImage = this.view.querySelector('.element__photo');
        this.view.querySelector('.element__title').textContent = this._elementTitle;
        this._cardImage.alt = this._elementTitle;
        this._cardImage.src = this._elementPhoto;
        this.view.querySelector('.element__number').textContent = this._likes;
        this._setListener();
        this._api.getUserInfo()
            .then((data) => {
                if(data._id !== this._ownerId) {
                    this.view.querySelector('.element__trash').style.display = 'none';
                }
                if(this._ownerId == undefined) {
                    this.view.querySelector('.element__trash').style.display = 'block';
                }
            })
        return this.view;
   }
}
