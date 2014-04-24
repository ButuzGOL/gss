module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',

    frameworks: ['mocha', 'requirejs'],

    files: [
      {
        pattern: 'src/bower_components/backbone/backbone.js',
        included: false
      }, {
        pattern: 'src/bower_components/chaplin/chaplin.js',
        included: false
      }, {
        pattern: 'src/bower_components/sinonjs/sinon.js',
        included: false
      }, {
        pattern: 'src/bower_components/expect/expect.js',
        included: false
      }, {
        pattern: 'src/bower_components/i18next/i18next.amd.min.js',
        included: false
      }, {
        pattern: 'src/bower_components/jquery/jquery.js',
        included: false
      }, {
        pattern: 'src/bower_components/lodash/dist/lodash.compat.js',
        included: false
      }, {
        pattern: 'src/bower_components/i18next/i18next.amd.min.js',
        included: false
      }, {
        pattern: 'src/vendor/scripts/nprogress/nprogress.js',
        included: false
      }, {
        pattern: 'src/bower_components/requirejs-text/text.js',
        included: false
      }, {
        pattern: 'src/bower_components/requirejs-plugins/src/json.js',
        included: false
      }, {
        pattern: 'src/bower_components/ejs/ejs.js',
        included: false
      }, {
        pattern: 'src/bower_components/has/has.js',
        included: false
      },

      { pattern: 'src/app/**/!(main).js', included: false },
      { pattern: 'src/app/views/templates/**/*.ejs', included: false },
      { pattern: 'src/app/config/locales/**/*.json', included: false },

      { pattern: 'src/test/spec/**/*.js', included: false },

      'src/app/main.js'
    ],

    exclude: [],
    client: {
      mocha: {
        ui: 'bdd'
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    captureTimeout: 20000,
    singleRun: false,
    reportSlowerThan: 500,
    plugins: [
      'karma-mocha',
      'karma-requirejs',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-ie-launcher'
    ]
  });
};
