/* jshint camelcase: false */

define([
  'require',
  'underscore',
  'jquery',
  'chaplin',
  'config/application',
  'lib/utils'
], function(require, _, $, Chaplin, applicationConfig, utils) {
  'use strict';

  var Model = Chaplin.Model.extend({
    apiRoot: applicationConfig.api.root,
    urlPath: '',
    urlParams: function() {
      var params = {},
          accessToken,
          mediator;

      mediator = require('mediator');
      if (mediator.user) {
        accessToken = mediator.user.get('accessToken');
      }

      if (accessToken) {
        params.access_token = accessToken;
      }

      return params;
    },
    urlRoot: function() {
      var urlPath = _.isFunction(this.urlPath) ? this.urlPath() : this.urlPath;

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
    },
    url: function() {
      var full = this.urlRoot(),
          payload = utils.queryParams.stringify(this.urlParams()),
          sep,
          url;

      if (payload) {
        sep = (full.indexOf('?') >= 0) ? '&' : '?';
        url = full + sep + payload;
      } else {
        url = full;
      }

      return url;
    }
  });
  
  return Model;
});
