/**
 * Errors controller module
 *
 * @module controllers/errors
 */
define([
  'controllers/base/controller',
  'views/errors/404-page',
  'views/errors/403-page',
  'views/errors/500-page',
], function(Controller, Errors404PageView, Errors403PageView,
  Errors500PageView) {
  'use strict';

  /**
   * Errors Controller
   *
   * @class ErrorsController
   * @constructor
   * @extends Controller
   */
  var ErrorsController = Controller.extend({
    /**
     * On page not found rendering 404 view
     *
     * @method 404
     */
    404: function() {
      this.view = new Errors404PageView();
    },
    /**
     * On access forbidden rendering 403 view
     *
     * @method 403
     */
    403: function() {
      this.view = new Errors403PageView();
    },
    /**
     * On app error rendering 500 view
     *
     * @method 500
     */
    500: function() {
      this.view = new Errors500PageView();
    }
  });

  return ErrorsController;
});
