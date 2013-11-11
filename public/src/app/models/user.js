define([
  'models/base/model'
], function(Model) {
  'use strict';

  var User = Model.extend({
    signin: function() {
      return this.ajax('POST', '/signin', this.serialize());
    },
    fetchCurrent: function() {
      return this.ajax('GET', '/users/me', {
        'access_token': this.get('accessToken')
      });
    }
  });

  return User;
});