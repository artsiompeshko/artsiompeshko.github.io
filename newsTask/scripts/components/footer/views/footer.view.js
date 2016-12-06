import BasicView from 'core/views/basic.view';
export default class FooterView extends BasicView {
    constructor() {
        super();
    }

    _buildView() {
        return  $(`
            <span>Provided by <a href='https://newsapi.org/'>https://newsapi.org/</a></span>
        `);
    }
}
