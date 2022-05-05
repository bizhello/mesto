export class Section {
    constructor(items, renderer, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderSection() {
        this._renderer();
    }

    addItem(item) {
        this._containerSelector.prepend(item);
    }

}