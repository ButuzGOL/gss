/**
 * Site view module
 *
 * @module views/site
 */
define([
  'views/base/view',
  'text!views/templates/site.ejs'
], function(View, template) {
  'use strict';

  /**
   * Site view class
   *
   * @class SiteView
   * @constructor
   * @extends View
   */
  var SiteView = View.extend({
    /** 
     * @property container
     * @type {string}
     */
    container: 'body',
    /** 
     * @property id
     * @type {string}
     */
    id: 'site-container',
    /** 
     * @property regions
     * @type {object}
     */
    regions: {
      messages: '#messages-container',
      header: '#header-container',
      main: '#main-container',
      footer: '#footer-container',
    },
    /** 
     * @property template
     * @type {string}
     */
    template: template
  });

  return SiteView;
});
