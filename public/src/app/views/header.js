/**
 * Header view module
 *
 * @module views/header
 */
define([
  'views/base/view',
  'text!views/templates/header.ejs'
], function(View, template) {
  'use strict';

  /**
   * Header view class
   *
   * @class HeaderView
   * @constructor
   * @extends View
   */
  var HeaderView = View.extend({
    /** 
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /** 
     * @property className
     * @type {string}
     */
    className: 'header',
    /** 
     * @property region
     * @type {string}
     */
    region: 'header',
    /** 
     * @property id
     * @type {string}
     */
    id: 'header',
    /** 
     * @property template
     * @type {string}
     */
    template: template
  });

  return HeaderView;
});
