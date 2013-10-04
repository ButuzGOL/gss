define([
  'controllers/base/controller'
], function(Controller) {
  'use strict';

  var AuthController = Controller.extend({
    signout: function(params) {
      this.publishEvent('auth:setToken', null);
      this.redirectTo('pages#home');
      this.publishEvent('logout');
    }
  });

  return AuthController;
});
