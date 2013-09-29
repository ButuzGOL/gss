define(['chaplin', 'views/layout'], function(Chaplin, Layout) {
  'use strict';

  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: 'Gone in Sixty Seconds',
    initLayout: function (options) {
      this.layout = new Layout(options);
    },
    initMediator: function() {
      Chaplin.mediator.user = null;
      Chaplin.Application.prototype.initMediator.call(this, arguments);
    }
  });

  return Application;
});
