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

    setUserInfo(name, status) {
        this._profileName.textContent = name;
        this._profileStatus.textContent = status;
    }
}