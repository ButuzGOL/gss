/**
 * User module
 *
 * @module models/user
 */
define([
  'models/base/model'
], function(Model) {
  'use strict';

  /**
   * User model class
   *
   * @class User
   * @constructor
   * @extends Model
   */
  var User = Model.extend({
    /**
     * Base url
     *
     * @property urlPath
     * @type {string}
     */
    urlPath: '/users/me',
    /**
     * Request to signin user
     *
     * @method signin
     * @return {Deferred} to manipulate with request
     */
    signin: function() {
      return this.ajax('/signin', 'POST', this.serialize());
    }
  });

  return User;
});