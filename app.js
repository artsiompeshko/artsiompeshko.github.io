(function() {
    'use strict';
    /*
        CORE
        ----------------------------------------------------------------------------
    */
    const API = {
        REST: 'https://newsapi.org/v1/sources'
    };

    let EVENTS = {
        SWITCH_CATEGORY: 'SWITCH_CATEGORY'
    }

    /*
        Very rough realization of jquery
    */


    let $ = function(selector) {
        if(typeof selector === 'string' || typeof selector === 'object') {
            return new CustomJquery(selector);
        } else if(typeof selector === 'function') {
            document.addEventListener("DOMContentLoaded", selector);
        }
    }

    class CustomJquery {
        constructor(stringElement) {
            if(typeof stringElement === 'string') {
                let elements = this._createElement(stringElement);
                this.nodeList = Array.prototype.slice.call(elements);
            } else if (stringElement instanceof NodeList) {
                this.nodeList = Array.prototype.slice.call(stringElement);
            } else if (stringElement instanceof HTMLElement) {
                this.nodeList = [];
                this.nodeList.push(stringElement);
            }
        }

        _createElement(stringElement) {
            if(stringElement.includes('<')) {
                let div = document.createElement('div');
                div.innerHTML = stringElement;
                return div.childNodes;
            } else {
                return document.querySelectorAll(stringElement);
            }
        }

        empty() {
            while (this.nodeList[0].firstChild) {
                this.nodeList[0].removeChild(this.nodeList[0].firstChild);
            }
        }

        click(handler) {
            this._forEach((element) => {
                element.addEventListener('click', handler);
            })
        }

        find(selector) {
            return $(this.nodeList[0].querySelectorAll(selector));
        }

        append(jqueryElement) {
            this._forEach((element) => {
                element.appendChild(jqueryElement.nodeList[0]);
            });
        }

        _forEach(fn) {
            this.nodeList.forEach(fn);
        }
    }


    class BasicView {
        constructor() {
            this._view = this._buildView();
        }

        getView() {
            return this._view;
        }
    }

    /*
        HEADER
        ----------------------------------------------------------------------------
    */

    const HEADER_TYPES = {
        HEADER_BUSINESS: {
            title: 'Business',
            category: 'business'
        },
        HEADER_ENTERTAINMENT: {
            title: 'Entertainment',
            category: 'entertainment'
        },
        HEADER_GAMING: {
            title: 'Gaming',
            category: 'gaming'
        },
        HEADER_GENERAL: {
            title: 'General',
            category: 'general'
        },
        HEADER_MUSIC: {
            title: 'Music',
            category: 'music'
        },
        HEADER_SCIENCE_AND_NATURE: {
            title: 'Science And Nature',
            category: 'science-and-nature'
        },
        HEADER_SPORT: {
            title: 'Sport',
            category: 'sport'
        },
        HEADER_TECHNOLOGY: {
            title: 'Technology',
            category: 'technology'
        }
    };

    class HeaderController {
        constructor(headerView, sourceHeaders) {
            this._headerView = headerView;
            this._sourceHeaders = sourceHeaders;

            this._updateView();
        }

        _updateView() {
            this._headerView.updateView(this._sourceHeaders);
        }
    }

    let sourceHeaders = Object.keys(HEADER_TYPES).map(header => HEADER_TYPES[header]);

    let headerPubSubInstance = {
        topics: {},

        subscribe: function(topic, handler) {
            if(!this.topics.topic) {
                this.topics.topic = [];
            }

            this.topics.topic.push(handler);
        },

        publish: function(topic, args) {
            if(!this.topics.topic) {
                return false;
            }

            var handlers = this.topics.topic;
            for (let handler of handlers) {
                if(handler) {
                    handler(args);
                }
            }

            return true;
        }
    };

    class HeaderView extends BasicView {
        constructor() {
            super();
        }

        _buildView() {
            let view = $(`<nav class="navbar">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="#${HEADER_TYPES.HEADER_GENERAL.category}">News</a>
                                </div>
                                <ul class="nav navbar-nav">
                                </ul>
                            </div>
                        </nav>`);

            view.find('a.navbar-brand').click(e => headerPubSubInstance.publish(EVENTS.SWITCH_CATEGORY, HEADER_TYPES.HEADER_GENERAL.category));

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


    let headerView = new HeaderView(),
        headerController = new HeaderController(headerView, sourceHeaders);

    $(function() {
        let header = $('header');
        header.append(headerView.getView());
    });


    /*
        NEWS LIST
        ----------------------------------------------------------------------------
    */

    class NewsController {
        constructor(newsView) {
            this._newsView = newsView;
        }

        updateNews(category) {
            let options = {
                category
            };

            fetchNews(options)
                .then(response => response.json())
                .then(data => data.sources)
                .then(news => {
                    this._newsView.updateView(news);
                })

        }
    }

    let fetchNews = (options) => fetch(API.REST + `?category=${options.category}`);

    class NewsView extends BasicView {
        constructor() {
            super();
        }

        _buildView() {
            return $(
                `<div>
                    <div class='news'></div>
                </div>`
            );
        }

        updateView(news) {
            let container = this._view.find('.news');
            container.empty();

            for (let data of news) {
                let newsItem = $(
                    `<div class="jumbotron">
                        <img src="${data.urlsToLogos.medium}" class="img-fluid" alt="image of a news site">
                        <p class="lead">${data.description}</p>
                            <hr>
                            <p class="lead">
                                <a class="btn btn-primary btn-lg" href="${data.url}" role="button">Read News</a>
                            </p>
                    </div>`
                );

                container.append(newsItem);
            }
        }
    }

    let newsView = new NewsView(),
        newsController = new NewsController(newsView);

    // subscribe
    headerPubSubInstance.subscribe(EVENTS.SWITCH_CATEGORY, newsController.updateNews.bind(newsController));

    $(function() {
        let main = $('main');
        main.append(newsView.getView());
        newsController.updateNews(HEADER_TYPES.HEADER_GENERAL.category);
    });


    /*
        FOOTER
        ----------------------------------------------------------------------------
    */
    class FooterView extends BasicView {
        constructor() {
            super();
        }

        _buildView() {
            return  $(`<span>Provided by <a href='https://newsapi.org/'>https://newsapi.org/</a></span>`);
        }
    }

    let footerView = new FooterView();

    $(function() {
        let footer = $('footer');
        footer.append(footerView.getView());
    });
}());
