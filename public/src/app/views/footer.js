/**
 * Footer view module
 *
 * @module views/footer
 */
define([
  'views/base/view',
  'text!views/templates/footer.ejs'
], function(View, template) {
  'use strict';

  /**
   * Footer view class
   *
   * @class FooterView
   * @constructor
   * @extends View
   */
  var FooterView = View.extend({
    /** 
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /** 
     * @property className
     * @type {string}
     */
    className: 'footer',
    /** 
     * @property region
     * @type {string}
     */
    region: 'footer',
    /** 
     * @property id
     * @type {string}
     */
    id: 'footer',
    /** 
     * @property template
     * @type {string}
     */
    template: template
  });

  return FooterView;
});
