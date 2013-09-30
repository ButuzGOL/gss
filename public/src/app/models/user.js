define([
  'jquery',
  'models/base/model'
], function($, Model) {
  'use strict';

  var User = Model.extend({
    signIn: function() {
      return $.ajax({
        url: this.apiRoot + '/sessions/signIn',
        data: this.serialize()
      });
    }
  });

  return User;
});
