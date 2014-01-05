/**
 * Sessions helper module
 *
 * @module helpers/sessions
 */
define([
  'mediator'
], function(mediator) {
  'use strict';
  
  /**
   * Sessions helper object
   * Consist of app help functions for sessions
   *
   * @class sessionsHelper
   * @static
   */
  return {
    /**
     * Will return is user signed in
     *
     * @method isSignedIn
     */
    isSignedIn: function() {
      return Boolean(mediator.user);
    }
  };

});
