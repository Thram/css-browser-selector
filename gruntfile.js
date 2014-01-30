module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    karma: {
      options: {
        files : [
          'css_browser_selector.js',
          'tests/ua_strings.js'
        ],
        background: true,
        frameworks: ['jasmine'],
        plugins : [
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
        ]
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        browsers: ['Chrome']
      }
    },
    watch: {
      karma: {
        files: ['*.js', 'tests/*.js'],
        tasks: ['jshint:dev', 'karma:dev:run']
      }
    },
    jshint: {
      dev: ['css_browser_selector.js'],
      options:{force:true}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma:continuous', 'uglify']);
  grunt.registerTask('devmode', ['jshint:dev', 'karma:dev', 'watch']);

};