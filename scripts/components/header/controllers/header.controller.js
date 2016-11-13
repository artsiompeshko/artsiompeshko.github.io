import HeaderView from 'components/header/views/header.view';
import HeaderModel from 'components/header/models/header.model';

export default class HeaderController {
    constructor(headerView, headerModel) {
        this._headerView = headerView;
        this._headerModel = headerModel;

        this._updateView();
    }

    _updateView() {
        this._headerView.updateView(this._headerModel.getHeaders());
    }
}
