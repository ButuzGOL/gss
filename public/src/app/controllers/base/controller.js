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
