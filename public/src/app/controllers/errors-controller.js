define([
  'controllers/base/controller',
  'views/errors/404-page-view',
  'views/errors/403-page-view',
  'views/errors/500-page-view',
], function(Controller, Errors404PageView, Errors403PageView,
  Errors500PageView) {
  'use strict';

  var ErrorsController = Controller.extend({
    404: function() {
      this.view = new Errors404PageView();
    },
    403: function() {
      this.view = new Errors403PageView();
    },
    500: function() {
      this.view = new Errors500PageView();
    }
  });

  return ErrorsController;
});
