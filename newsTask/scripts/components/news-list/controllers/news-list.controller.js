import * as EVENTS from 'core/events/constants/events.types.constants';

export default class NewsController {
    constructor(newsView, newsService) {
        this._newsView = newsView;
        this._newsService = newsService;
    }

    updateNews(category) {
        let options = {
            category
        };

        this._newsService.fetchNews(options)
            .then(response => response.json())
            .then(data => data.sources)
            .then(news => {
                this._newsView.updateView(news);
            })

    }
}
