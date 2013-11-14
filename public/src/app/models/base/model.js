define([
  'jquery',
  'chaplin',
  'mediator',
  'config/application',
  'lib/utils'
], function($, Chaplin, mediator, applicationConfig, utils) {
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
    ajax: function(url) {
      var args = arguments,
          fullUrl = this.apiRoot + url;
      
      args[0] = fullUrl;

      return utils.ajax.apply(this, args);
    }
  });
  
  return Model;
});
