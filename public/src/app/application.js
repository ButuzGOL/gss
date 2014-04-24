/**
 * Provide application bootstrap
 *
 * @module application
 */
define([
  'jquery',
  'underscore',
  'chaplin',
  'mediator',
  'config/application',
  'config/environment',
  'config/backend',
  'i18n',
  'nprogress',
  'views/layout',
  'lib/error-handler',
  'lib/utils',

  'controllers/pages',
  'controllers/errors',
  'controllers/sessions'
], function($, _, Chaplin, mediator, applicationConfig, environmentConfig,
  backendConfig, i18n, NProgress, Layout, ErrorHandler, utils) {
  'use strict';

  /**
   * Application bootstrap
   *
   * @class Application
   * @constructor
   * @extends Chaplin.Application
   */
  var Application = Chaplin.Application.extend({
    /**
     * Base title would be included in html head
     *
     * @property title
     * @type {string}
     */
    title: applicationConfig.title,
    /**
     * Runs on initialize
     * 1. Fetching config if fail App will have 500 error else 2
     * 2. Init Auth
     * 3. Init Locale
     *
     * @method start
     * @see Chaplin.Application.start()
     */
    start: function() {
      var _this = this,
          callback,
          callbackWithDelay;

      // Forward up after all ready
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
    /**
     * Lock errorHandler then
     * subscribing to messageView:ready and
     * on event unlock errorHandler and
     * if will have errors show them
     *
     * @method initErrorHandler
     * @async
     */
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
    /**
     * If haven't accessToken then callback else
     * make signin and callback.
     *
     * method initAuth
     * @async
     * @param {function} callback - will be calling after auth ready
     */
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
    /**
     * Fetching config on success extend locale config
     *
     * method initConfig
     * @async
     * @return {Deferred} to manipulate with request
     */
    initConfig: function() {
      return utils.ajax(
        environmentConfig[applicationConfig.environment].api.root + '/config').
      done(
        function(response) {
          _.extend(backendConfig, response);
        }
      );
    },
    /**
     * Getting current locale, fetching locale from backend and
     * merge them, if error en by default
     *
     * method initLocale
     * @async
     * @param {function} callback - will be calling after locale ready
     */
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

        // If error en locale by default
        if (!data) {
          require(['json!config/locales/en.json'], function(data) {
            processCallback(data, 'en');
          });
        } else {
          processCallback(data);
        }
      };

      localeCallback = function(data) {
        utils.ajax(environmentConfig[applicationConfig.environment].api.root +
          '/locales/' + applicationConfig.locale).done(
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
    /**
     * Initialize layout with options and this.title
     *
     * @method initLayout
     * @param {object} options - options for layout
     */
    initLayout: function(options) {
      this.layout = new Layout(_.defaults(options, { title: this.title }));
    },
    /**
     * Setting some params to mediator before freeze
     *
     * @method initMediator
     * @see Chaplin.Application.initMediator()
     */
    initMediator: function() {
      mediator.user = null;
      mediator.errorHandler = null;
      mediator.applicationError = false;

      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
