define([
  'require',
  'jquery',
  'chaplin',
  'jade'
], function(require, $, Chaplin, Jade) {
  'use strict';
  
  return {
    url: function(routeName) {
      var params = [].slice.call(arguments, 1);
      
      return Chaplin.helpers.reverse(routeName, params);
    },
    redirectTo: function(pathDesc, params, options) {
      Chaplin.helpers.redirectTo(pathDesc, params, options);
    },
    render: function(path, data) {
      var template = require('text!views/templates/' + path + '.jade');
      return Jade.compile(template, { compileDebug: true })(data);
    }
  };

});
