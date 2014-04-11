/*
 CSS Browser Selector
 Andrew Carpenter @ Techtopia (http://www.techtopia.com/) 2014
 https://github.com/techtopia/css-browser-selector

 Originally written by Rafael Lima (http://rafael.adm.br)
 http://rafael.adm.br/css_browser_selector
 License: http://creativecommons.org/licenses/by/2.5/
 */
(function () {
    var Matcher = function () {
        var Matcher = function (options) {
            this.className = options.className;
            this.filterRegex = options.filterRegex;
            this.subMatchers = options.subMatchers;
        };


        Matcher.prototype = {
            className: null,	// string/function(ua){}
            subMatchers: null,	// [MatcherGroups]
            filterRegex: null,
            evaluateSubMatchers: function (ua) {
                var classNames = [];
                for (var i in this.subMatchers) {
                    classNames = classNames.concat(this.subMatchers[i].evaluate(ua));
                }
                return classNames;
            },
            evaluate: function (ua) {
                var classNames = [];

                if (!this.filterRegex || this.filterRegex.test(ua)) {
                    if (this.className) {
                        classNames = classNames.concat(this._getClassName(ua) || []);
                    }

                    if (this.subMatchers) {
                        classNames = classNames.concat(this.evaluateSubMatchers(ua));
                    }
                }

                return classNames;
            },
            _getClassName: function (ua) {
                if (typeof(this.className) == 'string' || this.className instanceof Array) {
                    return this.className;
                } else if (typeof(this.className) == 'function') {
                    return this.className(ua);
                }
            }
        };

        return Matcher;
    }();

    var MatcherGroup = function () {
        var MatcherGroup = function (matcherArray, exclusive) {
            this.matcherArray = matcherArray;
            this.exclusive = exclusive;
        };

        MatcherGroup.prototype = {
            matcherArray: null,
            exclusive: null,
            evaluate: function (ua) {
                var classNames = [];

                for (var i in this.matcherArray) {
                    var subClassNames = this.matcherArray[i].evaluate(ua);
                    if (typeof(subClassNames) != 'undefined' && subClassNames.length > 0) {
                        classNames = classNames.concat(subClassNames);
                        if (this.exclusive) {
                            return classNames;
                        }
                    }
                }
                return classNames;
            }
        };

        return MatcherGroup;
    }();

    /* Matcher Definitions */
    var browserMatcherGroup = new MatcherGroup([
        new Matcher({
            className: 'opera',
            filterRegex: /opera/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /version\/((\d+)(\.(\d+))(\.\d+)*)/i.exec(ua);
                            if (matches)
                                return ['opera' + matches[2], 'opera' + matches[2] + '_' + matches[4]];
                        }
                    }),
                    new Matcher({
                        className: function (ua) {
                            var matches = /opera(\s|\/)(\d+)\.(\d+)/i.exec(ua);
                            if (matches)
                                return ['opera' + matches[2], 'opera' + matches[2] + '_' + matches[3]];
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({
            className: 'ie',
            filterRegex: /msie|trident/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var classNames = [],
                                matches = /msie\s(\d{1,2})/i.exec(ua),
                                version;
                            if (matches && matches[1]) {
                                classNames.push('ie' + matches[1]);
                                version = parseInt(matches[1], 10);
                            } else {
                                var verMap = {'7': '11', '6': '10', '5': '9', '4': '8'};
                                matches = /trident\/(\d+)\.0/i.exec(ua);
                                if (matches && matches[1] && verMap[matches[1]]) {
                                    classNames.push('ie' + verMap[matches[1]]);
                                    version = parseInt(verMap[matches[1]], 10);
                                }
                            }
                            if (version && version < 11) classNames.push('lt_ie11');


                            return classNames;
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({className: 'konqueror', filterRegex: /konqueror/i }),
        new Matcher({className: ['webkit', 'iron'], filterRegex: /iron/i }),
        new Matcher({
            className: 'blackberry',
            filterRegex: /blackberry/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /Version\/(\d+)(\.(\d+)+)/i.exec(ua);

                            if (matches) {
                                var classes = ['blackberry' + matches[1]];
                                if (matches[3] > 0)
                                    classes.push('blackberry' + matches[1] + '_' + matches[3]);
                                return classes;
                            }
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({
            className: ['webkit', 'chrome'],
            filterRegex: /chrome/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /chrome\/((\d+)(\.(\d+))(\.\d+)*)/i.exec(ua);
                            if (matches)
                                return ['chrome' + matches[2] , 'chrome' + matches[2] + "_" + matches[4]];
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({
            className: ['webkit', 'safari'],
            filterRegex: /applewebkit/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /version\/((\d+)(\.(\d+))(\.\d+)*)/.exec(ua);
                            if (matches) {
                                var classNames = ['safari' + matches[2]];
                                if (matches[4] > 0)
                                    classNames.push('safari' + (matches[2] + matches[3]).replace('.', '_'));
                                return classNames;
                            }

                            matches = / Safari\/(\d+)/i.exec(ua);
                            var wkVersion = parseInt(matches[1], 10);
                            if (wkVersion) {
                                if (wkVersion < 100) return ['safari1_0'];
                                else if (wkVersion < 125) return ['safari1_2'];
                                else if (wkVersion < 412) return ['safari1_3'];
                                else if (wkVersion < 522) return ['safari2_0'];
                            }
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({
            className: 'gecko',
            filterRegex: /gecko/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /firefox\/((\d+)(\.(\d+))(\.\d+)*)/i.exec(ua);
                            if (matches) {
                                var classes = ['ff' + matches[2]];
                                if (matches[4] > 0)
                                    classes.push('ff' + matches[2] + '_' + matches[4]);
                                return classes;
                            }
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({className: 'gecko', filterRegex: /mozilla/i })
    ], true);


    var osMatcherGroup = new MatcherGroup([
        new Matcher({
            filterRegex: /ipad|ipod|iphone/i,
            className: function (ua) {
                var classNames = [];
                var matches = /CPU( iPhone)? OS ((\d+)[_|\.]\d+([_|\.]\d+)*)/i.exec(ua);
                if (matches && matches[3]) {
                    classNames.push('ios' + matches[3]);
                }

                matches = /(ip(ad|od|hone))/gi.exec(ua);
                if (matches)
                    classNames.push(matches[1]);

                return classNames;
            }
        }),
        new Matcher({
            className: 'mac',
            filterRegex: /mac/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({
                        className: function (ua) {
                            var matches = /mac os x ((\d+)[.|_](\d+))/.exec(ua);
                            if (matches) {
                                return ['mac' + matches[2], 'mac' + matches[1].replace('.', "_")];
                            }
                        }
                    })
                ], true)
            ]
        }),
        new Matcher({
            className: 'win',
            filterRegex: /[^r]win/i,
            subMatchers: [
                new MatcherGroup([
                    new Matcher({className: 'win8', filterRegex: /windows nt 6.2/i}),
                    new Matcher({className: 'win7', filterRegex: /windows nt 6.1/i}),
                    new Matcher({className: 'vista', filterRegex: /windows nt 6.0/i}),
                    new Matcher({className: 'win_2k3', filterRegex: /windows nt 5.1/i}),
                    new Matcher({className: 'win_xp', filterRegex: /windows nt 5.2/i}),
                    new Matcher({className: 'win_2k', filterRegex: /windows nt 5.0/i}),
                    new Matcher({className: 'win_nt', filterRegex: /windows nt 4.0/i}),
                ], true)
            ]
        }),
        new Matcher({className: 'playbook', filterRegex: /playbook/i}),
        new Matcher({className: 'kindle', filterRegex: /kindle|silk/i}),
        new Matcher({className: 'freebsd', filterRegex: /freebsd/i}),
        new Matcher({className: 'linux', filterRegex: /x11|linux/i}),
        new Matcher({className: 'j2me', filterRegex: /j2me/i})
    ], true);

    var mobileMatcher = new Matcher({
        filterRegex: /android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk/i,
        className: 'mobile'
    });

    var languageMatcher = new Matcher({
        className: function (ua) {
            var matches = /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.exec(ua);
            if (matches) {
                var classNames = [];
                classNames.push(('lang_' + matches[2]).replace('-', '_'));
                if (matches[3]) {
                    classNames.push(('lang_' + matches[1]).replace('-', '_'));
                }

                return classNames;
            }
        }
    });

    var css_browser_selector = function (ua, el, userMatchers) {
        var newClassNames = ['js'],
            matchers = [
                browserMatcherGroup,
                osMatcherGroup,
                mobileMatcher,
                languageMatcher
            ].concat(userMatchers || []);

        ua = (ua || navigator.userAgent).toLowerCase();
        el = el || document.documentElement;

        for (var i in matchers) {
            newClassNames = newClassNames.concat(matchers[i].evaluate(ua));
        }

        el.className = el.className.replace(/\b(no[-|_]?)?js\b/g, "").replace(/^ /, "").replace(/ +/g, " ");
        el.className += ' ' + newClassNames.join(' ');

        screenSize(el);

        return newClassNames;
    };

    window.css_browser_selector = css_browser_selector;

    var screenSize = function (el) {
        var w = window.outerWidth || el.clientWidth,
            h = window.outerHeight || el.clientHeight,
            screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560],
            maxW;

        el.className = el.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");

        for (var i = screens.length - 1; i > 0 && screens[i] >= w; i--) {
            maxW = screens[i];
        }

        el.className += ' orientation_' + (w < h ? 'portrait' : 'landscape') + ' maxw_' + maxW;
    };
}());

css_browser_selector(navigator.userAgent);


