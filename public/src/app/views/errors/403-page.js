/**
 * 403 page module
 *
 * @module views/errors/403-page
 */
define([
  'views/base/page',
  'text!views/templates/errors/403-page.ejs'
], function(PageView, template) {
  'use strict';

  /**
   * Base view class
   *
   * @class Errors403PageView
   * @constructor
   * @extends PageView
   */
  var Errors403PageView = PageView.extend({
    /**
     * @property id
     * @type {string}
     */
    id: 'errors-403-page',
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

  return Errors403PageView;
});
