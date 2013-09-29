define([
  'chaplin',
  'views/site-view',
  'views/header-view'
], function(Chaplin, SiteView, HeaderView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    beforeAction: function(params, route) {
      this.compose('site', SiteView);
      this.compose('header', HeaderView);
    }
  });

  return Controller;
});
