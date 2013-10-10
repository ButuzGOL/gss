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
      this.initLocales(callback);
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
    initLocales: function(callback) {
      var localeCallback1 = function(locale, data, hasError) {
            var callback = function(data) {
              var resStore = {},
                  ns = 'translation';
          
              resStore[locale] = {};
              resStore[locale][ns] = data;
              
              i18n.init({ resStore: resStore });

              log(i18n.t('hello'), i18n.t('men'));
            };

            if (hasError) {
              require(['json!config/locales/en.json'], callback);
            } else {
              callback(data);
            }
          },


          localeCallback = function(data, hasError) {
        $.get(
          applicationConfig.api.root + '/locales/' + applicationConfig.locale).
          done(function(response) {
  
          localeCallback1(applicationConfig.locale, _.extend(data, response));

        }).fail(function() {
          localeCallback1('en', data, hasError);
        }).always(callback);
      };

      require(['json!config/locales/' + applicationConfig.locale + '.json'],
        localeCallback,
        function(error) {
          localeCallback({}, true);
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
