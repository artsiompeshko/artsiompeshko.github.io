'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    'use strict';
    /*
        CORE
        ----------------------------------------------------------------------------
    */

    var API = {
        REST: 'https://newsapi.org/v1/sources'
    };

    var EVENTS = {
        SWITCH_CATEGORY: 'SWITCH_CATEGORY'
    };

    /*
        Very rough realization of jquery
    */

    var $ = function $(selector) {
        if (typeof selector === 'string' || (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
            return new CustomJquery(selector);
        } else if (typeof selector === 'function') {
            document.addEventListener("DOMContentLoaded", selector);
        }
    };

    var CustomJquery = function () {
        function CustomJquery(stringElement) {
            _classCallCheck(this, CustomJquery);

            if (typeof stringElement === 'string') {
                var elements = this._createElement(stringElement);
                this.nodeList = Array.prototype.slice.call(elements);
            } else if (stringElement instanceof NodeList) {
                this.nodeList = Array.prototype.slice.call(stringElement);
            } else if (stringElement instanceof HTMLElement) {
                this.nodeList = [];
                this.nodeList.push(stringElement);
            }
        }

        CustomJquery.prototype._createElement = function _createElement(stringElement) {
            if (stringElement.includes('<')) {
                var div = document.createElement('div');
                div.innerHTML = stringElement;
                return div.childNodes;
            } else {
                return document.querySelectorAll(stringElement);
            }
        };

        CustomJquery.prototype.empty = function empty() {
            while (this.nodeList[0].firstChild) {
                this.nodeList[0].removeChild(this.nodeList[0].firstChild);
            }
        };

        CustomJquery.prototype.click = function click(handler) {
            this._forEach(function (element) {
                element.addEventListener('click', handler);
            });
        };

        CustomJquery.prototype.find = function find(selector) {
            return $(this.nodeList[0].querySelectorAll(selector));
        };

        CustomJquery.prototype.append = function append(jqueryElement) {
            this._forEach(function (element) {
                element.appendChild(jqueryElement.nodeList[0]);
            });
        };

        CustomJquery.prototype._forEach = function _forEach(fn) {
            this.nodeList.forEach(fn);
        };

        return CustomJquery;
    }();

    var BasicView = function () {
        function BasicView() {
            _classCallCheck(this, BasicView);

            this._view = this._buildView();
        }

        BasicView.prototype.getView = function getView() {
            return this._view;
        };

        return BasicView;
    }();

    /*
        HEADER
        ----------------------------------------------------------------------------
    */

    var HEADER_TYPES = {
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

    var HeaderController = function () {
        function HeaderController(headerView, sourceHeaders) {
            _classCallCheck(this, HeaderController);

            this._headerView = headerView;
            this._sourceHeaders = sourceHeaders;

            this._updateView();
        }

        HeaderController.prototype._updateView = function _updateView() {
            this._headerView.updateView(this._sourceHeaders);
        };

        return HeaderController;
    }();

    var sourceHeaders = Object.keys(HEADER_TYPES).map(function (header) {
        return HEADER_TYPES[header];
    });

    var headerPubSubInstance = {
        topics: {},

        subscribe: function subscribe(topic, handler) {
            if (!this.topics.topic) {
                this.topics.topic = [];
            }

            this.topics.topic.push(handler);
        },

        publish: function publish(topic, args) {
            if (!this.topics.topic) {
                return false;
            }

            var handlers = this.topics.topic;
            for (var _iterator = handlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var handler = _ref;

                if (handler) {
                    handler(args);
                }
            }

            return true;
        }
    };

    var HeaderView = function (_BasicView) {
        _inherits(HeaderView, _BasicView);

        function HeaderView() {
            _classCallCheck(this, HeaderView);

            return _possibleConstructorReturn(this, _BasicView.call(this));
        }

        HeaderView.prototype._buildView = function _buildView() {
            var view = $('<nav class="navbar">\n                            <div class="container-fluid">\n                                <div class="navbar-header">\n                                    <a class="navbar-brand" href="#' + HEADER_TYPES.HEADER_GENERAL.category + '">News</a>\n                                </div>\n                                <ul class="nav navbar-nav">\n                                </ul>\n                            </div>\n                        </nav>');

            view.find('a.navbar-brand').click(function (e) {
                return headerPubSubInstance.publish(EVENTS.SWITCH_CATEGORY, HEADER_TYPES.HEADER_GENERAL.category);
            });

            return view;
        };

        HeaderView.prototype.updateView = function updateView(headers) {
            var list = this._view.find('.nav');

            var _loop = function _loop() {
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) return 'break';
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) return 'break';
                    _ref2 = _i2.value;
                }

                var headerItem = _ref2;

                var menuItem = $('<li class=\'nav-menu\'><a href="#' + headerItem.category + '">' + headerItem.title + '</a></li>');

                menuItem.click(function (e) {
                    headerPubSubInstance.publish(EVENTS.SWITCH_CATEGORY, headerItem.category);
                });

                list.append(menuItem);
            };

            for (var _iterator2 = headers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                var _ret = _loop();

                if (_ret === 'break') break;
            }
        };

        return HeaderView;
    }(BasicView);

    var headerView = new HeaderView(),
        headerController = new HeaderController(headerView, sourceHeaders);

    $(function () {
        var header = $('header');
        header.append(headerView.getView());
    });

    /*
        NEWS LIST
        ----------------------------------------------------------------------------
    */

    var NewsController = function () {
        function NewsController(newsView) {
            _classCallCheck(this, NewsController);

            this._newsView = newsView;
        }

        NewsController.prototype.updateNews = function updateNews(category) {
            var _this2 = this;

            var options = {
                category: category
            };

            fetchNews(options).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.sources;
            }).then(function (news) {
                _this2._newsView.updateView(news);
            });
        };

        return NewsController;
    }();

    var fetchNews = function fetchNews(options) {
        return fetch(API.REST + ('?category=' + options.category));
    };

    var NewsView = function (_BasicView2) {
        _inherits(NewsView, _BasicView2);

        function NewsView() {
            _classCallCheck(this, NewsView);

            return _possibleConstructorReturn(this, _BasicView2.call(this));
        }

        NewsView.prototype._buildView = function _buildView() {
            return $('<div>\n                    <div class=\'news\'></div>\n                </div>');
        };

        NewsView.prototype.updateView = function updateView(news) {
            var container = this._view.find('.news');
            container.empty();

            for (var _iterator3 = news, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var data = _ref3;

                var newsItem = $('<div class="jumbotron">\n                        <img src="' + data.urlsToLogos.medium + '" class="img-fluid" alt="image of a news site">\n                        <p class="lead">' + data.description + '</p>\n                            <hr>\n                            <p class="lead">\n                                <a class="btn btn-primary btn-lg" href="' + data.url + '" role="button">Read News</a>\n                            </p>\n                    </div>');

                container.append(newsItem);
            }
        };

        return NewsView;
    }(BasicView);

    var newsView = new NewsView(),
        newsController = new NewsController(newsView);

    // subscribe
    headerPubSubInstance.subscribe(EVENTS.SWITCH_CATEGORY, newsController.updateNews.bind(newsController));

    $(function () {
        var main = $('main');
        main.append(newsView.getView());
        newsController.updateNews(HEADER_TYPES.HEADER_GENERAL.category);
    });

    /*
        FOOTER
        ----------------------------------------------------------------------------
    */

    var FooterView = function (_BasicView3) {
        _inherits(FooterView, _BasicView3);

        function FooterView() {
            _classCallCheck(this, FooterView);

            return _possibleConstructorReturn(this, _BasicView3.call(this));
        }

        FooterView.prototype._buildView = function _buildView() {
            return $('<span>Provided by <a href=\'https://newsapi.org/\'>https://newsapi.org/</a></span>');
        };

        return FooterView;
    }(BasicView);

    var footerView = new FooterView();

    $(function () {
        var footer = $('footer');
        footer.append(footerView.getView());
    });
})();