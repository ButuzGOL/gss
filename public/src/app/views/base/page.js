/**
 * Page view module
 *
 * @module views/base/page
 */
define([
  'views/base/view'
], function(View) {
  'use strict';

  /**
   * Base page view class
   *
   * @class PageView
   * @constructor
   * @extends View
   */
  var PageView = View.extend({
    /** 
     * @property region
     * @type {string}
     */
    region: 'main'
  });

  return PageView;
});
