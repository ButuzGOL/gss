require.config({
  deps: window.mocha ? ['../test/initialize'] : ['initialize'],
  baseUrl: window.mocha ? '../app/' : 'app/',
  // urlArgs: 'bust=' +  (new Date()).getTime(),
  paths: {
    jquery: '../components/scripts/jquery/jquery',
    underscore: '../components/scripts/lodash/lodash',
    backbone: '../components/scripts/backbone/backbone',
    jade: '../components/scripts/jade/jade',
    text: '../components/scripts/requirejs-text/text',
    json: '../components/scripts/requirejs-plugins/json',
    chaplin: '../components/scripts/chaplin/chaplin',

    nprogress: '../components/scripts/nprogress/nprogress',

    semantic: '../components/scripts/semantic-ui/semantic',

    i18n: '../components/scripts/i18next/i18next.amd-1.7.1',

    expect: '../components/scripts/expect/expect',
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