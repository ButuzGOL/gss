define([
  'chaplin',
  'config',
  'routes',
  'views/layout',
  'controllers/auth-controller'
], function(Chaplin, config, routes, Layout, AuthController) {
  'use strict';
  
  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: config.title,
    initialize: function() {
      var _this = this,
          args = arguments,
          callback = function() {
            Chaplin.Application.prototype.initialize.apply(_this, args);

            _this.unsubscribeEvent('signinStatus', callback);
          };

      this.subscribeEvent('signinStatus', callback);

      new AuthController();
    },
    initLayout: function (options) {
      this.layout = new Layout(options);
    },
    initMediator: function() {
      if (!Chaplin.mediator.user) {
        Chaplin.mediator.user = null;
      }

      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
