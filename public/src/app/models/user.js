define([
  'models/base/model'
], function(Model) {
  'use strict';

  var User = Model.extend({
    signin: function() {
      return this.ajax('/signin', 'POST', this.serialize());
    },
    fetchCurrent: function() {
      return this.ajax('/users/me', 'GET', {
        'access_token': this.get('accessToken')
      });
    }
  });

  return User;
});