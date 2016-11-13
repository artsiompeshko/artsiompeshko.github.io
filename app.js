import HeaderController from 'components/header/controllers/header.controller';
import HeaderView from 'components/header/views/header.view';
import HeaderModel from 'components/header/models/header.model';
import {HEADER_GENERAL} from 'components/header/constants/header.constants'

import NewsController from 'components/news-list/controllers/news-list.controller';
import NewsView from 'components/news-list/views/news-list.view';
import NewsModel from 'components/news-list/models/news-list.model';
import NewsService from 'components/news-list/services/news-list.service';

import FooterView from 'components/footer/views/footer.view';

/*
    CORE
    ----------------------------------------------------------------------------
*/

/*
    HEADER
    ----------------------------------------------------------------------------
*/
let headerModel = new HeaderModel(),
    headerView = new HeaderView(),
    headerController = new HeaderController(headerView, headerModel);

$(function() {
    let header = $('header');
    header.append(headerView.getView());
});


/*
    NEWS LIST
    ----------------------------------------------------------------------------
*/
let newsModel = new NewsModel(),
    newsView = new NewsView(),
    newsService = new NewsService(),
    newsController = new NewsController(newsView, newsModel, newsService);

$(function() {
    let main = $('main');
    main.append(newsView.getView());
    newsController.updateNews(HEADER_GENERAL.category);
});


/*
    FOOTER
    ----------------------------------------------------------------------------
*/
let footerView = new FooterView();
$(function() {
    let footer = $('footer');
    footer.append(footerView.getView());
});
