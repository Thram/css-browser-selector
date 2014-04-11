module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/cssbs.js',
                dest: 'dist/<%= pkg._shortName %>-<%= pkg.version %>.min.js'
            }
        },
        karma: {
            options: {
                files: [
                    'src/cssbs.js',
                    'test/ua_strings.js'
                ],
                background: true,
                frameworks: ['jasmine'],
                plugins: [
                    'karma-chrome-launcher',
                    'karma-firefox-launcher',
                    'karma-phantomjs-launcher',
                    'karma-jasmine'
                ]
            },
            continuous: {
                singleRun: true,
                background: false,
                browsers: ['PhantomJS']
            },
            dev: {
                browsers: ['Chrome', 'Firefox']
            }
        },
        watch: {
            karma: {
                files: ['src/*.js', 'test/*.js'],
                tasks: ['jshint:dev', 'karma:dev:run']
            }
        },
        jscs: {
            src: '<%= jshint.files %>',
            options: {
                "requireSpacesInAnonymousFunctionExpression": {
                    "beforeOpeningRoundBrace": true,
                    "beforeOpeningCurlyBrace": true
                },
                "requireSpacesInNamedFunctionExpression": {
                    "beforeOpeningCurlyBrace": true
                },
                "requireCurlyBraces": [
                    "if",
                    "else",
                    "for",
                    "while",
                    "do",
                    "try",
                    "catch"
                ],
                "requireSpaceAfterKeywords": [
                    "if",
                    "else",
                    "for",
                    "while",
                    "do",
                    "switch",
                    "return",
                    "try",
                    "catch"
                ]
            }
        },
        jshint: {
            files: ['src/cssbs.js'],
            options: {force: true}
        },
        clean: ['/dist'],
        copy: {
            main: {
                src: 'src/cssbs.js',
                dest: 'dist/<%= pkg._shortName %>-<%= pkg.version %>.js'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint', 'jscs', 'karma:continuous', 'clean', 'copy', 'uglify']);
    grunt.registerTask('dev', ['jshint', 'jscs', 'karma:dev', 'watch']);
};