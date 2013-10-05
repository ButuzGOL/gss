define([
  'chaplin'
], function(Chaplin) {
  'use strict';
  
  return {
    isSignedIn: function() {
      return Boolean(Chaplin.mediator.user);
    }
  };

});
