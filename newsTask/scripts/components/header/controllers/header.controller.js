import HeaderView from 'components/header/views/header.view';

export default class HeaderController {
    constructor(headerView, sourceHeaders) {
        this._headerView = headerView;
        this._sourceHeaders = sourceHeaders;
        this._updateView();
    }

    _updateView() {
        this._headerView.updateView(this._sourceHeaders);
    }
}
