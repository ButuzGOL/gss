define([
  'jquery',
  'chaplin',
  'mediator',
  'config/application'
], function($, Chaplin, mediator, applicationConfig) {
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
    }
  });
  
  return Model;
});
