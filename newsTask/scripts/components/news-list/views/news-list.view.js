import BasicView from 'core/views/basic.view';
export default class NewsView extends BasicView {
    constructor() {
        super();
    }

    _buildView() {
        return $('<div><div class=\'news\'></div></div>');
    }

    updateView(news) {
        let container = this._view.find('.news');
        container.empty();

        for (let data of news) {
            let newsItem = $(`
                <div class="jumbotron">
                    <img src="${data.urlsToLogos.medium}" class="img-fluid" alt="image of a news site">
                    <p class="lead">${data.description}</p>
                        <hr class="my-2">
                        <p class="lead">
                            <a class="btn btn-primary btn-lg" href="${data.url}" role="button">Read News</a>
                        </p>
                </div>
            `);

            container.append(newsItem);
        }
    }
}
