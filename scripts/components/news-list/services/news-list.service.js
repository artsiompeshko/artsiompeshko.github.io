class NewsService {
    constructor() {

    }

    fetchNews(options) {
        return fetch(API.REST + `?category=${options.category}`);
    }
}
