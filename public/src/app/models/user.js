define([
  'models/base/model'
], function(Model) {
  'use strict';

  var User = Model.extend({
    urlPath: '/users/me',
    signin: function() {
      return this.ajax('/signin', 'POST', this.serialize());
    }
  });

  return User;
});