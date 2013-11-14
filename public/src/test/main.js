// Configure the AMD module loader
require.config({
  // The path where your JavaScripts are located
  baseUrl: '../app',
  // For easier development, disable browser caching
  // Of course, this should be removed in a production environment
  // urlArgs: 'bust=' +  (new Date()).getTime(),
  // Specify the paths of vendor libraries
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
    expect: '../components/scripts/expect/expect'
  },
  // Underscore and Backbone are not AMD-capable per default,
  // so we need to use the AMD wrapping of RequireJS
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

require([
  '../test/lib/error-handler',
  '../test/lib/utils',
  '../test/lib/support',
  
  // '../test/helpers/application',
  // '../test/helpers/sessions',

  //! '../test/application',
  //! '../test/mediator',

  // '../test/controllers/base/controller',
  // '../test/controllers/pages',
  // '../test/controllers/errors',
  // '../test/controllers/sessions',
  
  //! '../test/models/base/model',
  // '../test/models/base/collection',
  // '../test/models/user',

  // '../test/views/layout',
  // '../test/views/base/view',
  // '../test/views/base/collection',
  // '../test/views/base/page',
  // '../test/views/base/form',
  // '../test/views/site',
  // '../test/views/header',
  // '../test/views/footer',
  // '../test/views/messages',
  // '../test/views/errors/403-page',
  // '../test/views/errors/404-page',
  // '../test/views/errors/500-page',
  // '../test/views/pages/home-page',
  // '../test/views/sessions/new-form'
], function() {
  'use strict';
  
  if (window.mochaPhantomJS) {
    window.mochaPhantomJS.run();
  } else {
    window.mocha.run();
  }
});