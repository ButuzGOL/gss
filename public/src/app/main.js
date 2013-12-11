require.config({
  deps: (typeof window !== 'undefined' && window.mocha) ?
    ['../test/spec/initialize'] : ['initialize'],
  baseUrl: (typeof window !== 'undefined' && window.mocha) ?
    '../../app/' : 'app/',
  paths: {
    backbone: '../bower_components/backbone/backbone',
    chaplin: '../bower_components/chaplin/chaplin',
    expect: '../bower_components/expect/expect',
    i18n: '../bower_components/i18next/release/i18next.amd-1.7.1.min',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/lodash/dist/lodash.compat',
    nprogress: '../bower_components/nprogress/nprogress',
    text: '../bower_components/requirejs-text/text',
    json: '../bower_components/requirejs-plugins/src/json',
    ejs: '../bower_components/ejs/ejs'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    nprogress: {
      deps: ['jquery']
    },
    expect: {
      exports: 'expect'
    },
    ejs: {
      exports: 'ejs'
    }
  }
});