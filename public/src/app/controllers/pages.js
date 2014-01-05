/**
 * Pages controller module
 *
 * @module controllers/pages
 */
define([
  'controllers/base/controller',
  'views/pages/home-page',
], function(Controller, PagesHomePageView) {
  'use strict';

  /**
   * Pages Controller
   *
   * @class PagesController
   * @constructor
   * @extends Controller
   */
  var PagesController = Controller.extend({
    /**
     * Rendering home page view
     *
     * @method home
     */
    home: function() {
      this.view = new PagesHomePageView();
    }
  });

  return PagesController;
});
