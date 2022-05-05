import {popupName, popupStatus} from './index.js';

export class UserInfo {
    constructor(profileName, profileStatus) {
        this.profileName = profileName;
        this.profileStatus =profileStatus;
    }

    getUserInfo() {
        this._name  = this.profileName.textContent;
        this._status = this.profileStatus.textContent;

        return(this.getUserInfo);
    }
    setUserInfo() {
        this.getUserInfo()
        popupName.value = this._name;
        popupStatus.value = this._status;
    }
}