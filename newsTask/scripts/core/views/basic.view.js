export default class BasicView {
    constructor() {
        this._view = this._buildView();
    }
    getView() {
        return this._view;
    }
}
