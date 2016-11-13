class NewsController {
    constructor(newsView, newsModel, newsService) {
        this._newsView = newsView;
        this._newsModel = newsModel;
        this._newsService = newsService;

        headerPubSubInstance.subscribe(EVENTS.SWITCH_CATEGORY, this.updateNews.bind(this));
    }

    updateNews(category) {
        let options = {
            category
        };

        this._newsService.fetchNews(options)
            .then(response => response.json())
            .then(data => data.sources)
            .then(news => {
                this._newsModel.setNews(news);
                this._newsView.updateView(news);
            })

    }
}
