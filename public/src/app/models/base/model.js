define([
  'jquery',
  'chaplin',
  'config/application'
], function($, Chaplin, applicationConfig) {
  'use strict';

  var Model = Chaplin.Model.extend({
    apiRoot: applicationConfig.api.root,
    urlPath: function() {
      return '';
    },
    urlRoot: function() {
      var urlPath = this.urlPath();

      if (urlPath) {
        return this.apiRoot + urlPath;
      } else {
        throw new Error('Model must redefine urlPath');
      }
    },
    ajax: function(type, url, data) {
      url = this.apiRoot + url;
      
      return $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: 'json'
      });
    }
  });
  
  return Model;
});
