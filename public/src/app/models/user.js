define([
  'models/base/model'
], function(Model) {
  'use strict';

  var User = Model.extend({
    signIn: function() {
      return this.ajax('POST', '/signin', this.serialize());
    }
  });

  return User;
});
