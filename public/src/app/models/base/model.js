define([
  'chaplin',
  'config'
], function(Chaplin, config) {
  'use strict';

  var Model = Chaplin.Model.extend({
    apiRoot: config.api.root,
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
