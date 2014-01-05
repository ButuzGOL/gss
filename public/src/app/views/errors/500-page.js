/**
 * 500 page module
 *
 * @module views/errors/500-page
 */
define([
  'views/base/page',
  'text!views/templates/errors/500-page.ejs'
], function(PageView, template) {
  'use strict';

  /**
   * Base view class
   *
   * @class Errors500PageView
   * @constructor
   * @extends PageView
   */
  var Errors500PageView = PageView.extend({
    /**
     * @property id
     * @type {string}
     */
    id: 'errors-500-page',
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

  return Errors500PageView;
});
