export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getUserInfo() {
       return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
           method: 'GET',
           headers: this._headers
        })
           .then(res => {
               if (res.ok) {
                   return res.json();
               }
               return Promise.reject(`Ошибка: ${res.status}`);
           });
    }
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    editUserInfo() {
        const popupStatus = document.querySelector('#popup-status').value;
        const popupName = document.querySelector('#popup-name').value;
        return  fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${popupName}`,
                about: `${popupStatus}`
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    createCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`,
                likes: []
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteLikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    changePhotoProfile(avatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}

