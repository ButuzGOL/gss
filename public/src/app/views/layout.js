define([
  'jquery',
  'chaplin',
  'nprogress',
  'semantic'
], function($, Chaplin, NProgress) {
  'use strict';

  var Layout = Chaplin.Layout.extend({
    listen: {
      'controller:actionStart mediator': 'showLoader',
      'controller:actionDone mediator': 'hideLoader'
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
