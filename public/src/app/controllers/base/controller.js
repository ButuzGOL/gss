define([
  'jquery',
  'chaplin',
  'mediator',
  'views/site-view',
  'views/messages-view',
  'views/header-view',
  'views/footer-view'
], function($, Chaplin, mediator, SiteView, MessagesView, HeaderView,
  FooterView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
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
    afterAction: function() {
      this.publishEvent('controller:actionDone');
    }
  });

  return Controller;
});
