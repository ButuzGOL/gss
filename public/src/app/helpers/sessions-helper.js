define([
  'mediator'
], function(mediator) {
  'use strict';
  
  return {
    isSignedIn: function() {
      return Boolean(mediator.user);
    }
  };

});
