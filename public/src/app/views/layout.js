/**
 * Layout module
 *
 * @module views/layout
 */
define([
  'jquery',
  'chaplin',
  'nprogress'
], function($, Chaplin, NProgress) {
  'use strict';

  /**
   * Layout class
   *
   * @class Layout
   * @constructor
   * @extends Chaplin.Layout
   */
  var Layout = Chaplin.Layout.extend({
    /** 
     * @property listen
     * @type {boolean}
     */
    listen: {
      'controller:actionStart mediator': 'showLoader',
      'controller:actionDone mediator': 'hideLoader'
    },
    /**
     * Show loader on page start loading event
     *
     * @method showLoader
     */
    showLoader: function() {
      NProgress.start();
    },
    /**
     * Hide loader on page loading done event
     *
     * @method hideLoader
     */
    hideLoader: function() {
      NProgress.done(true);
    }
  });

  return Layout;
});
