define([
  'jquery',
  'chaplin',
  'nprogress'
], function($, Chaplin, NProgress) {
  'use strict';

  var Layout = Chaplin.Layout.extend({
    listen: {
      'dispatcher:dispatch mediator': 'actionReady',
      'controller:actionStart mediator': 'showLoader',
      'controller:actionDone mediator': 'hideLoader'
    },
    actionReady: function() {
      if (!$.active) {
        this.hideLoader();
      }
    },
    showLoader: function() {
      NProgress.start();
    },
    hideLoader: function() {
      NProgress.done(true);
    }
  });

  return Layout;
});
