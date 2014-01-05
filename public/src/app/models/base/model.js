/* jshint camelcase: false */
/**
 * Model module
 *
 * @module models/base/model
 */
define([
  'require',
  'underscore',
  'jquery',
  'chaplin',
  'config/application',
  'lib/utils'
], function(require, _, $, Chaplin, applicationConfig, utils) {
  'use strict';

  /**
   * Base model class
   *
   * @class Model
   * @constructor
   * @extends Chaplin.Model
   */
  var Model = Chaplin.Model.extend({
    /**
     * Api root property
     *
     * @property apiRoot
     * @type {string}
     */
    apiRoot: applicationConfig.api.root,
    /**
     * Url path for crud will throw error if undefined so 
     * it should be overridden
     *
     * @property urlPath
     * @type {string}
     */
    urlPath: '',
    /**
     * Will gather additional params before request
     *
     * @method urlParams
     */
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
    /**
     * Will build url root
     *
     * @method urlRoot
     */
    urlRoot: function() {
      var urlPath = _.isFunction(this.urlPath) ? this.urlPath() : this.urlPath;

      if (urlPath) {
        return this.apiRoot + urlPath;
      } else {
        throw new Error('Model must redefine urlPath');
      }
    },
    /**
     * Extends from lib/utils ajax method but
     * before modify url
     *
     * @method ajax
     * @return {Deferred} to manipulate with request
     */
    ajax: function(url) {
      var args = arguments,
          fullUrl = this.apiRoot + url;
      
      args[0] = fullUrl;

      return utils.ajax.apply(this, args);
    },
    /**
     * Modified url based on params and url root
     *
     * @method url
     * @return {string} modified url
     * @see Backbone.url()
     */
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
