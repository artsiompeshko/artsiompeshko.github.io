import pubSubInstance from 'components/header/publish-subscribe/pubsub';
import * as EVENTS from 'core/events/constants/events.types.constants';
import HEADER_TYPES from 'components/header/constants/header.constants';
import BasicView from 'core/views/basic.view';

export default class HeaderView extends BasicView {
    constructor() {
        super();
    }

    _buildView() {
        let view = $(`<nav class="navbar navbar-default">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="#${HEADER_TYPES.HEADER_GENERAL.category}">News</a>
                            </div>
                            <ul class="nav navbar-nav">
                            </ul>
                        </div>
                    </nav>`);

        view.find('a.navbar-brand').click(e => pubSubInstance.publish(EVENTS.SWITCH_CATEGORY, HEADER_TYPES.HEADER_GENERAL.category));

        return view;
    }

    updateView(headers) {
        let list = this._view.find('.nav');

        for (let headerItem of headers) {
            let menuItem = $(
                `<li class='nav-menu'><a href="#${headerItem.category}">${headerItem.title}</a></li>`
            );

            menuItem.click(e => pubSubInstance.publish(EVENTS.SWITCH_CATEGORY, headerItem.category));
            list.append(menuItem);
        }
    }
}
