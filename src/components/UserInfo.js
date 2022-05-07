export class UserInfo {
    constructor(profileName, profileStatus) {
        this._profileName = document.querySelector(profileName);
        this._profileStatus = document.querySelector(profileStatus);
    }

    getUserInfo() {
        this.values = {
            name : this._profileName.textContent,
            status : this._profileStatus.textContent
        }
        return this.values;
    }
    setUserInfo() {
        this._popupName = document.querySelector('#popup-name');
        this._popupStatus = document.querySelector('#popup-status');
        this._profileName.textContent = this._popupName.value;
        this._profileStatus.textContent = this._popupStatus.value;
    }
}