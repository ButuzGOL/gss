define([
  'jquery',
  'underscore',
  'chaplin',
  'mediator',
  'config/application',
  'config/backend',
  'i18n',
  'nprogress',
  'views/layout',
  'lib/error-handler',
  'lib/utils'
], function($, _, Chaplin, mediator, applicationConfig, backendConfig,
  i18n, NProgress, Layout, ErrorHandler, utils) {
  'use strict';
  
  var Application = Chaplin.Application.extend({
    title: applicationConfig.title,
    start: function() {
      var _this = this,
          callback,
          callbackWithDelay;
      
      callback = function() {
        Chaplin.Application.prototype.start.apply(_this);
      };
      
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
      var _this = this,
          callback;
      
      mediator.errorHandler = new ErrorHandler();
      mediator.errorHandler.isLocked = true;

      callback = function() {
        _this.unsubscribeEvent('messagesView:ready', callback);

        mediator.errorHandler.isLocked = false;
        mediator.errorHandler.publishCurrentErrors();
      };

      this.subscribeEvent('messagesView:ready', callback);
    },
    initAuth: function(callback) {
      var _this = this,
          modifiedCallback,
          accessToken = window.localStorage.getItem('accessToken');
      
      if (!accessToken) {
        callback();
      } else {
        modifiedCallback = function() {
          _this.unsubscribeEvent('signinStatus', modifiedCallback);
          callback();
        };
        this.subscribeEvent('signinStatus', modifiedCallback);
        mediator.signin(accessToken);
      }
    },
    initConfig: function() {
      return utils.ajax(applicationConfig.api.root + '/config').done(
        function(response) {
          _.extend(backendConfig, response);
        }
      );
    },
    initLocale: function(callback) {
      var localeCallback,
          prepareCallback;
      
      prepareCallback = function(data) {
        var processCallback = function(data, locale) {
          var resStore = {},
              ns = 'translation';

          if (!locale) {
            locale = applicationConfig.locale;
          }

          resStore[locale] = {};
          resStore[locale][ns] = data;
          
          i18n.init({
            lng: locale,
            resStore: resStore
          });

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
        utils.ajax(applicationConfig.api.root + '/locales/' +
          applicationConfig.locale).done(
          function(response) {
            prepareCallback(data ? _.extend({}, data, response) : response);
          }
        ).fail(function() {
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
      mediator.user = null;
      mediator.errorHandler = null;
      mediator.applicationError = false;
      
      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
