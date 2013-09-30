define([
  'chaplin',
  'views/site-view',
  'views/header-view',
  'views/footer-view'
], function(Chaplin, SiteView, HeaderView, FooterView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    beforeAction: function(params, route) {
      this.compose('site', SiteView);
      this.compose('header', HeaderView);
      this.compose('footer', FooterView);
    }
  });

  return Controller;
});
