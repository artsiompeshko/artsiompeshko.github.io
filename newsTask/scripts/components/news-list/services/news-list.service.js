import * as API from 'core/api/api.constants';

export default class NewsService {
    constructor() {

    }

    fetchNews(options) {
        return fetch(API.REST + `?category=${options.category}`);
    }
}
