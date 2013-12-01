define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!views/templates/messages.jade'
], function($, _, View, template) {
  'use strict';
  
  var MessagesView = View.extend({
    constructor: function() {
      View.prototype.constructor.apply(this, arguments);
      
      this.publishEvent('messagesView:ready');
    },
    autoRender: true,
    className: 'messages',
    region: 'messages',
    id: 'messages',
    template: template,
    // Format
    // type: error|warning|success,
    // message: '',
    // description: ''
    messages: [],
    listen: {
      'errorHandler:throw mediator': 'addErrorMessagesAndRender'
    },
    events: {
      'click [data-dissmis="alert"]': 'removeMessage'
    },
    render: function() {
      View.prototype.render.apply(this, arguments);
      this.messages = [];
    },
    getTemplateData: function() {
      var object = View.prototype.getTemplateData.apply(this, arguments);

      object.messages = this.messages;

      return object;
    },
    addErrorMessagesAndRender: function(messages) {
      var _this = this;
      
      _.forEach(messages, function(message) {
        _this.addErrorMessage(message);
      });
      
      this.render();
    },
    addSuccessMessage: function(message) {
      this.addMessage('success', message);
    },
    addErrorMessage: function(message) {
      this.addMessage('error', message);
    },
    addInfoMessage: function(message) {
      this.addMessage('info', message);
    },
    addWarningMessage: function(message) {
      this.addMessage('warning', message);
    },
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
    removeMessage: function(event) {
      $(event.target).parent().remove();
    }
  });

  return MessagesView;
});
