define([
  'require',
  'chaplin',
  'views/site-view',
  'views/header-view',
  'views/footer-view'
], function(require, Chaplin, SiteView, HeaderView, FooterView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    beforeAction: function(params, route) {
      this.compose('site', SiteView);
      this.compose('header', HeaderView);
      this.compose('footer', FooterView);
      this.compose('sessions', function() {
        var _this = this;
        
        require(['controllers/sessions-controller'], function(SessionsController) {
          _this.controller = new SessionsController();
        });
      });
    }
  });

  return Controller;
});
