define([
  'mediator',
  'controllers/base/controller'
], function(mediator, Controller) {
  'use strict';

  var SessionsController = Controller.extend({
    signout: function() {
      mediator.signout();
      this.redirectTo('pages#home');
    }
  });

  return SessionsController;
});
