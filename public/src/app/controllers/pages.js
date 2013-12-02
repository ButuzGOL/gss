define([
  'controllers/base/controller',
  'views/pages/home-page',
], function(Controller, PagesHomePageView) {
  'use strict';

  var PagesController = Controller.extend({
    home: function() {
      this.view = new PagesHomePageView();
    }
  });

  return PagesController;
});
