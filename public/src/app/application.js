define([
  'jquery',
  'underscore',
  'chaplin',
  'mediator',
  'config/application',
  'config/backend',
  'i18n',
  'routes',
  'nprogress',
  'views/layout',
  'lib/error-handler'
], function($, _, Chaplin, mediator, applicationConfig, backendConfig,
  i18n, routes, NProgress, Layout, ErrorHandler) {
  'use strict';
  
  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: applicationConfig.title,
    start: function() {
      var _this = this,
          callback = function() {
            _this.unsubscribeEvent('signinStatus', callbackWithDelay);

            Chaplin.Application.prototype.start.apply(_this);
          },
          callbackWithDelay = _.after(2, callback);
      
      NProgress.start();

      this.initErrorHandler();
      this.initConfig().done(function() {
        _this.initAuth(callbackWithDelay);
        _this.initLocale(callbackWithDelay);
      }).fail(function() {
        mediator.applicationError = true;
        callback();
      });
    },
    initErrorHandler: function() {
      mediator.errorHandler = new ErrorHandler();
      mediator.errorHandler.isLocked = true;

      var _this = this,
          callback = function() {
        _this.unsubscribeEvent('messagesView:ready', callback);

        mediator.errorHandler.isLocked = false;
        mediator.errorHandler.publishCurrentErrors();
      };

      this.subscribeEvent('messagesView:ready', callback);
    },
    initAuth: function(callback) {
      this.subscribeEvent('signinStatus', callback);
      // new AuthController();
    },
    initConfig: function(callback) {
      return $.get(applicationConfig.api.root + '/config').done(function(response) {
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
  
          prepareCallback(data ? _.extend(data, response) : response);

        }).fail(function() {
          prepareCallback(data);
        });
      };

      require(['json!config/locales/' + applicationConfig.locale + '.json'],
        localeCallback, function() {
          localeCallback(null);
        }
      );
    },
    initLayout: function(options) {
      this.layout = new Layout(_.defaults(options, { title: this.title }));
    },
    initMediator: function() {
      mediator.errorHandler = null;
      mediator.applicationError = false;
      
      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
