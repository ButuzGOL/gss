define([
  'jquery',
  'underscore',
  'chaplin',
  'config/application',
  'config/backend',
  'i18n',
  'routes',
  'nprogress',
  'views/layout',
  'controllers/auth-controller',
  'lib/error-handler'
], function($, _, Chaplin, applicationConfig, backendConfig, i18n, routes,
  NProgress, Layout, AuthController, ErrorHandler) {
  'use strict';
  
  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: applicationConfig.title,
    start: function() {
      var _this = this,
          callback = _.after(3, function() {
            _this.unsubscribeEvent('signinStatus', callback);

            Chaplin.Application.prototype.start.apply(_this);

            Chaplin.mediator.globalVars.errorHandler.isLocked = false;
            Chaplin.mediator.globalVars.errorHandler.publishCurrentErrors();
          });
      
      NProgress.start();

      this.initErrorHandler();
      this.initAuth(callback);
      this.initConfig(callback);
      this.initLocale(callback);
    },
    initErrorHandler: function() {
      Chaplin.mediator.globalVars.errorHandler = new ErrorHandler();
      Chaplin.mediator.globalVars.errorHandler.isLocked = true;
    },
    initAuth: function(callback) {
      this.subscribeEvent('signinStatus', callback);
      new AuthController();
    },
    initConfig: function(callback) {
      $.get(applicationConfig.api.root + '/config').done(function(response) {
        _.extend(backendConfig, response);
      }).always(callback);
    },
    initLocale: function(callback) {
      var localeCallback,
          prepareCallback;
      
      prepareCallback = function(data) {
        var processCallback = function(data, locale) {
          if (!locale) {
            locale = applicationConfig.locale;
          }

          var resStore = {},
              ns = 'translation';
      
          resStore[locale] = {};
          resStore[locale][ns] = data;
          
          i18n.init({ lng: locale, resStore: resStore });

          callback();
        };

        if (!data) {
          require(['json!config/locales/en.json'], function(data) {
            processCallback(data, 'en');
          });
        } else {
          processCallback(data);
        }
      };
      
      localeCallback = function(data) {
        $.get(
          applicationConfig.api.root + '/locales/' + applicationConfig.locale).
          done(function(response) {
  
          prepareCallback((data) ? _.extend(data, response) : response);

        }).fail(function() {
          prepareCallback(data);
        });
      };

      require(['json!config/locales/' + applicationConfig.locale + '.json'],
        localeCallback, function(error) {
          localeCallback(null);
        }
      );
    },
    initLayout: function(options) {
      this.layout = new Layout(_.defaults(options, { title: this.title }));
    },
    initMediator: function() {
      if (!Chaplin.mediator.user) {
        Chaplin.mediator.user = null;
      }
      Chaplin.mediator.globalVars = {};

      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
