/**
 * Utils module
 *
 * @module lib/utils
 */
define([
  'jquery',
  'underscore',
  'chaplin'
], function($, _, Chaplin) {
  'use strict';

  /**
   * Utils object with functions to be usefull in any place
   *
   * @class utils
   * @static
   * @extends Chaplin.utils
   */
  var utils = Chaplin.utils.beget(Chaplin.utils);

  _.extend(utils, {
    /**
     * Wrapper to $.ajax
     *
     * @method ajax
     * @return {Deferred} to manipulate with request
     */
    ajax: function(url, type, data) {

      return $.ajax({
        url: url,
        data: data || {},
        type: type || 'GET',
        dataType: 'json'
      });
    }
  });

  return utils;
});
    