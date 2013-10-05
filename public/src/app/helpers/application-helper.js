define([
  'chaplin'
], function(Chaplin) {
  'use strict';
  
  return {
    url: function(routeName) {
      var params = [].slice.call(arguments, 1),
          options = params.pop();
      return Chaplin.helpers.reverse(routeName, params);
    }
  };

});
