define([
  'require',
  'jquery',
  'chaplin',
], function(require, $, Chaplin) {
  'use strict';
  
  return {
    url: function(routeName) {
      var params = [].slice.call(arguments, 1);
      
      return Chaplin.helpers.reverse(routeName, params);
    },
    render: function(path, data) {
      var template = require('jade!views/templates/' + path);
      return template(data);
    }
  };

});
