/**
 * Base controller module
 *
 * @module controllers/base/controller
 */
define([
  'jquery',
  'chaplin',
  'mediator',
  'views/site',
  'views/messages',
  'views/header',
  'views/footer'
], function($, Chaplin, mediator, SiteView, MessagesView, HeaderView,
  FooterView) {
  'use strict';

  /**
   * Base Controller
   *
   * @class Controller
   * @constructor
   * @extends Chaplin.Controller
   */
  var Controller = Chaplin.Controller.extend({
    /**
     * Runs before action
     * 1. Checking if application error
     * 2. Composing views
     *
     * @method beforeAction
     * @async
     * @param {object} params - params in url
     * @param {object} route - current app route
     */
    beforeAction: function(params, route) {
      var _this = this;

      if (mediator.applicationError && route.name !== 'errors#500') {
        return this.redirectTo('errors#500');
      }

      this.publishEvent('controller:actionStart');
      
      this.compose('site', SiteView);
      this.compose('messages', MessagesView);
      this.compose('header', HeaderView);
      this.compose('footer', FooterView);

      this.subscribeEvent('dispatcher:dispatch', function() {
        if (!$.active) {
          _this.afterAction();
        }
      });
    },
    /**
     * Runs after action
     *
     * @method afterAction
     */
    afterAction: function() {
      this.publishEvent('controller:actionDone');
    }
  });

  return Controller;
});
