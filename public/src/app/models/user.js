define([
  'models/base/model',
  'lib/utils'
], function(Model, utils) {
  'use strict';

  var User = Model.extend({
    signin: function() {
      return utils.ajax('/signin', 'POST', this.serialize());
    },
    fetchCurrent: function() {
      return utils.ajax('/users/me', 'GET', {
        'access_token': this.get('accessToken')
      });
    }
  });

  return User;
});