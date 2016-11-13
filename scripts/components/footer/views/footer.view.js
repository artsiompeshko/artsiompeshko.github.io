export default class FooterView {
    constructor() {
        this._view = this._buildView();
    }

    _buildView() {
        return  $(`
            <span>Provided by <a href='https://newsapi.org/'>https://newsapi.org/</a></span>
        `);
    }

    getView() {
        return this._view;
    }
}
