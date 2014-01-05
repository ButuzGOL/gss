/**
 * 404 page module
 *
 * @module views/errors/404-page
 */
define([
  'views/base/page',
  'text!views/templates/errors/404-page.ejs'
], function(PageView, template) {
  'use strict';

  /**
   * Base view class
   *
   * @class Errors404PageView
   * @constructor
   * @extends PageView
   */
  var Errors404PageView = PageView.extend({
    /**
     * @property id
     * @type {string}
     */
    id: 'errors-404-page',
    /**
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /**
     * @property template
     * @type {string}
     */
    template: template
  });

  return Errors404PageView;
});
