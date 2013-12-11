define([
  'underscore',
  'chaplin',
  'lib/utils',
  'models/user'
], function(_, Chaplin, utils, User) {
  'use strict';

  var mediator = Chaplin.mediator;

  _.extend(mediator, {
    createUser: function() {
      this.user = new User();
    },
    removeUser: function() {
      this.user.dispose();
      this.user = null;
    },
    signin: function(accessToken) {
      var _this = this;

      if (this.user) {
        return;
      }

      window.localStorage.setItem('accessToken', accessToken);
      
      this.createUser();
      this.user.set({ accessToken: accessToken });

      return this.user.fetch().done(function() {
        _this.publish('signinStatus', true);
      }).fail(function() {
        _this.removeUser();
        _this.publish('signinStatus', false);
      });
    },
    signout: function() {
      if (!this.user) {
        return;
      }
      
      localStorage.removeItem('accessToken');
      this.removeUser();
      this.publish('signinStatus', false);
    }
  });

  return mediator;
});