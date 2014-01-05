/**
 * Messages module
 *
 * @module views/messages
 */
define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!views/templates/messages.ejs'
], function($, _, View, template) {
  'use strict';
  
  /**
   * Global messages view for app
   *
   * @class MessagesView
   * @constructor
   * @extends View
   */
  var MessagesView = View.extend({
    /**
     * Publishing message view initialize
     *
     * @method constructor
     */
    constructor: function() {
      View.prototype.constructor.apply(this, arguments);
      
      this.publishEvent('messagesView:ready');
    },
    /** 
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /** 
     * @property className
     * @type {string}
     */
    className: 'messages',
    /** 
     * @property region
     * @type {string}
     */
    region: 'messages',
    /** 
     * @property id
     * @type {string}
     */
    id: 'messages',
    /** 
     * @property template
     * @type {string}
     */
    template: template,
    /** 
     * Message format {
     *  type: {error|warning|success},
     *  message: '',
     *  description: ''
     * }
     *
     * @property messages
     * @type {array}
     */
    messages: [],
    /** 
     * @property listen
     * @type {object}
     */
    listen: {
      'errorHandler:throw mediator': 'addErrorMessagesAndRender'
    },
    /** 
     * @property events
     * @type {object}
     */
    events: {
      'click [data-dissmis="alert"]': 'removeMessage'
    },
    /**
     * Adding additional action
     * clearing messages
     *
     * @method render
     */
    render: function() {
      View.prototype.render.apply(this, arguments);
      this.messages = [];
    },
    /**
     * Extend base data object with messages
     *
     * @method getTemplateData
     * @return {object}
     */
    getTemplateData: function() {
      var object = View.prototype.getTemplateData.apply(this, arguments);

      object.messages = this.messages;

      return object;
    },
    /**
     * Adding error messages and rendering 
     * was done for ErrorHandler
     *
     * @method addErrorMessagesAndRender
     * @see ErrorHandler
     * @param {array} messages
     */
    addErrorMessagesAndRender: function(messages) {
      var _this = this;
      
      _.forEach(messages, function(message) {
        _this.addErrorMessage(message);
      });
      
      this.render();
    },
    /**
     * Adding success message 
     *
     * @method addSuccessMessage
     */
    addSuccessMessage: function(message) {
      this.addMessage('success', message);
    },
    /**
     * Adding error message
     *
     * @method addErrorMessage
     */
    addErrorMessage: function(message) {
      this.addMessage('error', message);
    },
    /**
     * Adding info message
     *
     * @method addInfoMessage
     */
    addInfoMessage: function(message) {
      this.addMessage('info', message);
    },
    /**
     * Adding warning message
     *
     * @method addWarningMessage
     */
    addWarningMessage: function(message) {
      this.addMessage('warning', message);
    },
    /**
     * Adding message
     *
     * @method addMessage
     * @param {string|object} type|message
     * @param {object} [message]
     */
    addMessage: function() {
      var type,
          message;

      if (arguments.length === 2) {
        type = arguments[0];
        message = arguments[1];
        message.type = type;
      } else {
        message = arguments[0];
      }

      this.messages.push(message);
    },
    /**
     * Remove message from dom
     *
     * @method removeMessage
     * @param {Event} event
     */
    removeMessage: function(event) {
      $(event.target).parent().remove();
    }
  });

  return MessagesView;
});
