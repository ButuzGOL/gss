/**
 * Sessions controller module
 *
 * @module controllers/sessions
 */
define([
  'mediator',
  'controllers/base/controller'
], function(mediator, Controller) {
  'use strict';

  /**
   * Sessions Controller
   *
   * @class SessionsController
   * @constructor
   * @extends Controller
   */
  var SessionsController = Controller.extend({
    /**
     * Signout action
     *
     * @method signout
     */
    signout: function() {
      mediator.signout();
      this.redirectTo('pages#home');
    }
  });

  return SessionsController;
});
