class HeaderView {
    constructor() {
        this._view = this._buildView();
    }

    getView() {
        return this._view;
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

        view.find('a.navbar-brand').click((e) => {
            headerPubSubInstance.publish(EVENTS.SWITCH_CATEGORY, HEADER_TYPES.HEADER_GENERAL.category);
        });

        return view;
    }

    updateView(headers) {
        let list = this._view.find('.nav');

        for (let headerItem of headers) {
            let menuItem = $(
                `<li class='nav-menu'><a href="#${headerItem.category}">${headerItem.title}</a></li>`
            );

            menuItem.click((e) => {
                headerPubSubInstance.publish(EVENTS.SWITCH_CATEGORY, headerItem.category);
            })

            list.append(menuItem);
        }
    }
}
