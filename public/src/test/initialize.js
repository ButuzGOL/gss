require([
  '../test/lib/error-handler',
  '../test/lib/utils',
  '../test/lib/support',
  
  '../test/helpers/application',
  '../test/helpers/sessions',

  '../test/application',
  '../test/mediator',

  '../test/controllers/base/controller',
  '../test/controllers/pages',
  '../test/controllers/errors',
  '../test/controllers/sessions',
  
  '../test/models/base/model',
  '../test/models/base/collection',
  '../test/models/user',

  '../test/views/layout',
  '../test/views/base/view',
  '../test/views/base/collection',
  '../test/views/base/page',
  '../test/views/base/form',
  '../test/views/site',
  '../test/views/header',
  '../test/views/footer',
  '../test/views/messages',
  '../test/views/errors/403-page',
  '../test/views/errors/404-page',
  '../test/views/errors/500-page',
  '../test/views/pages/home-page',
  '../test/views/sessions/new-form'
], function() {
  'use strict';

  if (window.mochaPhantomJS) {
    window.mochaPhantomJS.run();
  } else {
    window.mocha.run();
  }
});