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

      localStorage.setItem('accessToken', accessToken);
      
      this.createUser();
      this.user.set({ accessToken: accessToken });
      this.user.fetch().then(function() {
        _this.publish('signinStatus', true);
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