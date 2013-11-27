require.config({
  deps: (typeof window !== 'undefined' && window.mocha) ?
    ['../test/initialize'] : ['initialize'],
  baseUrl: (typeof window !== 'undefined' && window.mocha) ?
    '../app/' : 'app/',
  // urlArgs: 'bust=' +  (new Date()).getTime(),
  paths: {
    backbone: '../bower_components/backbone/backbone',
    chaplin: '../bower_components/chaplin/chaplin',
    expect: '../bower_components/expect/expect',
    i18n: '../bower_components/i18next/release/i18next.amd-1.7.1.min',
    jade: '../bower_components/jade/jade',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/lodash/dist/lodash.compat',
    mocha: '../bower_components/mocha/mocha',
    nprogress: '../bower_components/nprogress/nprogress',
    json: '../bower_components/requirejs-plugins/src/json',
    text: '../bower_components/requirejs-plugins/lib/text',
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
    }
  }
});