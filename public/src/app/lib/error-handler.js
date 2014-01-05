/**
 * Error handler module
 *
 * @module lib/error-handler
 */
define([
  'jquery',
  'underscore',
  'chaplin'
], function($, _, Chaplin) {
  'use strict';

  /**
   * Error handler subscribing to ajax errors and
   * publishing it
   *
   * @class ErrorHandler
   * @constructor
   * @extends Chaplin.EventBroker
   */
  var ErrorHandler = function() {
    this.subscribeForAjaxEvents();

    this.errorsBasket = [];
    this.currentErrors = [];
  };

  _.extend(ErrorHandler.prototype, Chaplin.EventBroker);

  _.extend(ErrorHandler.prototype, {
    /**
     * Basket for published errors
     *
     * @property errorsBasket
     * @type {array}
     */
    errorsBasket: [],
    /**
     * Current errors not published
     *
     * @property currentErrors
     * @type {array}
     */
    currentErrors: [],
    /**
     * Is locked for publishing errors
     *
     * @property isLocked
     * @type {boolean}
     */
    isLocked: false
  });

  /**
   * Subscibing for ajax event and 
   * listening for errors
   * After ajax complete moving them
   *
   * @method subscribeForAjaxEvents
   * @async
   */
  ErrorHandler.prototype.subscribeForAjaxEvents = function() {
    var _this = this;
    
    $(document).ajaxError(function(event, jqxhr) {
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

    $(document).ajaxComplete(function() {
      _this.publishCurrentErrors();
    });
  };

  /**
   * Publishing current errors 
   * if it hasn't ajax reqeusts and isn't locked
   *
   * @method publishCurrentErrors
   */
  ErrorHandler.prototype.publishCurrentErrors = function() {
    if ($.active <= 1 && this.currentErrors.length && !this.isLocked) {
      this.publishEvent('errorHandler:throw', this.currentErrors);
      this.errorsBasket.push(this.currentErrors);
      this.currentErrors = [];
    }
  };

  return ErrorHandler;
});
