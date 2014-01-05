/**
 * Mediator module
 *
 * @module mediator
 */
define([
  'underscore',
  'chaplin',
  'lib/utils',
  'models/user'
], function(_, Chaplin, utils, User) {
  'use strict';

  /**
   * Mediator object
   *
   * @class mediator
   * @static
   * @extends Chaplin.mediator
   */
  var mediator = Chaplin.mediator;

  _.extend(mediator, {
    /**
     * Creates current user
     *
     * @method createUser
     */
    createUser: function() {
      this.user = new User();
    },
    /**
     * Removes current user
     *
     * @method removeUser
     */
    removeUser: function() {
      this.user.dispose();
      this.user = null;
    },
    /**
     * Signin current user. Saves access token to storage, 
     * create user in mediator and
     * publish event singin status
     *
     * @method signin
     * @async
     * @param {string} accessToken - saves this param to locale storage
     * @return {Deferred} to manipulate with request
     */
    signin: function(accessToken) {
      var _this = this;

      if (this.user) {
        return;
      }

      window.localStorage.setItem('accessToken', accessToken);
      
      this.createUser();
      this.user.set({ accessToken: accessToken });

      return this.user.fetch().done(function() {
        _this.publish('signinStatus', true);
      }).fail(function() {
        _this.removeUser();
        _this.publish('signinStatus', false);
      });
    },
    /**
     * Signout current user. Remove access token from storage,
     * remove user in mediator and
     * publish event signin status
     *
     * @method signout
     */
    signout: function() {
      if (!this.user) {
        return;
      }
      
      localStorage.removeItem('accessToken');
      this.removeUser();
      this.publish('signinStatus', false);
    }
  });

  return mediator;
});