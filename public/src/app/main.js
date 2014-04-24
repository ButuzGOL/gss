var deps,
    baseUrl;

if (typeof window !== 'undefined') {
  if (window.__karma__) {
    deps  = ['/base/src/test/spec/initialize.js'];
    baseUrl = '/base/src/app/';
  } else if (window.mocha) {
    deps = ['../test/spec/initialize'];
    baseUrl = '../../app/';
  } else if (window.Benchmark) {
    deps = ['../test/benchmark/initialize'];
    baseUrl = '../../app/';
  } else {
    deps = ['initialize'];
    baseUrl = 'app/';
  }
} else {
  deps = ['initialize'];
  baseUrl = 'app/';
}

require.config({
  deps: deps,
  baseUrl: baseUrl,
  paths: {
    backbone: '../bower_components/backbone/backbone',
    chaplin: '../bower_components/chaplin/chaplin',
    sinon: '../bower_components/sinonjs/sinon',
    expect: '../bower_components/expect/expect',
    i18n: '../bower_components/i18next/i18next.amd.min',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/lodash/dist/lodash.compat',
    nprogress: '../vendor/scripts/nprogress/nprogress',
    text: '../bower_components/requirejs-text/text',
    json: '../bower_components/requirejs-plugins/src/json',
    ejs: '../bower_components/ejs/ejs',
    has: '../bower_components/has/has'
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
    sinon: {
      exports: 'sinon'
    },
    ejs: {
      exports: 'ejs'
    }
  }
});
