import HeaderController from 'components/header/controllers/header.controller';
import HeaderView from 'components/header/views/header.view';
import {HEADER_GENERAL} from 'components/header/constants/header.constants'
import HEADER_TYPES from 'components/header/constants/header.constants';

import * as EVENTS from 'core/events/constants/events.types.constants';

import NewsController from 'components/news-list/controllers/news-list.controller';
import NewsView from 'components/news-list/views/news-list.view';
import NewsService from 'components/news-list/services/news-list.service';

import FooterView from 'components/footer/views/footer.view';

import headerPubSubInstance from 'components/header/publish-subscribe/pubsub';

import './styles/main.css';

function app() {
    /*
        CORE
        ----------------------------------------------------------------------------
    */

    /*
        HEADER
        ----------------------------------------------------------------------------
    */
    let sourceHeaders = Object.keys(HEADER_TYPES).map(header => HEADER_TYPES[header]);
    let headerView = new HeaderView(),
        headerController = new HeaderController(headerView, sourceHeaders);

    let header = $('header');
    header.append(headerView.getView());


    /*
        NEWS LIST
        ----------------------------------------------------------------------------
    */
    let newsView = new NewsView(),
        newsService = new NewsService(),
        newsController = new NewsController(newsView, newsService);

    // subscribe
    headerPubSubInstance.subscribe(EVENTS.SWITCH_CATEGORY, newsController.updateNews.bind(newsController));

    let main = $('main');
    main.append(newsView.getView());
    newsController.updateNews(HEADER_TYPES.HEADER_GENERAL.category);


    /*
        FOOTER
        ----------------------------------------------------------------------------
    */
    let footerView = new FooterView();

    let footer = $('footer');
    footer.append(footerView.getView());
}

module.exports = app;
