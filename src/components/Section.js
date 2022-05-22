import {apiItems} from './../pages/index'

export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderSection() {
        apiItems.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(item) {
        this._containerSelector.append(item);
    }

    addItemSubmit(item) {
        this._containerSelector.prepend(item);
    }
}