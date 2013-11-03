define([
  'models/base/model'
], function(Model) {
  'use strict';

  var User = Model.extend({
    signin: function() {
      return this.ajax('POST', '/signin', this.serialize());
    }
  });

  return User;
});