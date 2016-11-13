(function() {
    'use strict';
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
        newsController.updateNews(HEADER_TYPES.HEADER_GENERAL.category);
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
}());
