define([
  'chaplin',
  'views/site-view',
  'views/messages-view',
  'views/header-view',
  'views/footer-view'
], function(Chaplin, SiteView, MessagesView, HeaderView, FooterView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    beforeAction: function(params, route) {
      if (Chaplin.mediator.applicationError && route.name !== 'errors#500') {
        return this.redirectTo('errors#500');
      }

      this.publishEvent('controller:actionStart');
      
      this.compose('site', SiteView);
      this.compose('messages', MessagesView);
      this.compose('header', HeaderView);
      this.compose('footer', FooterView);
    },
    afterAction: function(params, route) {
      this.publishEvent('controller:actionDone');
    }
  });

  return Controller;
});
