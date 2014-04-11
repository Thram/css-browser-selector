module.exports = function(grunt) {
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
        files : [
          'src/cssbs.js',
          'test/ua_strings.js'
        ],
        background: true,
        frameworks: ['jasmine'],
        plugins : [
          'karma-chrome-launcher',
          'karma-firefox-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
        ]
      },
      continuous: {
        singleRun: true,
        background:false,
        browsers: ['PhantomJS']
      },
      dev: {
        browsers: ['Chrome','Firefox']
      }
    },
    watch: {
      karma: {
        files: ['src/*.js', 'test/*.js'],
        tasks: ['jshint:dev', 'karma:dev:run']
      }
    },
    jshint: {
      dev: ['src/cssbs.js'],
      options:{force:true}
    },
    clean: ['/dist'],
    copy: {main: {src: 'src/cssbs.js', dest: 'dist/<%= pkg._shortName %>-<%= pkg.version %>.js'}}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma:continuous', 'clean', 'copy', 'uglify']);
  grunt.registerTask('devmode', ['jshint:dev', 'karma:dev', 'watch']);

};