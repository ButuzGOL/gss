define([
  'jquery',
  'underscore',
  'chaplin'
], function($, _, Chaplin) {
  'use strict';

  var ErrorHandler = function() {
    this.subscribeForAjaxEvents();
  };

  _.extend(ErrorHandler.prototype, Chaplin.EventBroker);

  _.extend(ErrorHandler.prototype, {
    errorsBasket: [],
    currentErrors: [],
    isLocked: false
  });

  ErrorHandler.prototype.subscribeForAjaxEvents = function() {
    var _this = this;
    
    $(document).ajaxError(function(event, jqxhr, settings, exception) {
      var error;
      if (jqxhr.responseJSON) {
        error = jqxhr.responseJSON;
      } else {
        error = {
          code: jqxhr.status,
          message: jqxhr.responseText,
          description: ''
        };
      }

      _this.currentErrors.push(error);
      _this.publishEvent('errorHandler:catch', _.last(_this.currentErrors));
    });

    $(document).ajaxComplete(function(event, xhr, settings) {
      _this.publishCurrentErrors();
    });
  };

  ErrorHandler.prototype.publishCurrentErrors = function() {
    if ($.active <= 1 && this.currentErrors.length && !this.isLocked) {
      this.publishEvent('errorHandler:throw', this.currentErrors);
      this.errorsBasket.push(this.currentErrors);
      this.currentErrors = [];
    }
  };

  return ErrorHandler;
});
