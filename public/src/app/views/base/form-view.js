define([
  'jquery',
  'views/base/view'
], function($, View) {
  'use strict';

  var FormView = View.extend({
    autoRender: true,
    events: {
      'click [data-action=cancel]': 'dismiss',
      'click [data-action=submit]': 'submit',
      'submit': 'submit'
    },
    listen: {
      'signinStatus mediator': 'render'
    },
    tagName: 'form',
    errorMessages: null,
    
    getTemplateData: function() {
      var object = View.prototype.getTemplateData.apply(this, arguments);
      object.errorMessages = this.errorMessages;
      return object;
    },
    
    publishSave: function(response) {
      if (this.saveEvent) {
        this.publishEvent(this.saveEvent, response);
      } else {
        throw new Error('FormView must have saveEvent defined');
      }
    },

    dismiss: function(event) {
      if (event) {
        event.preventDefault();
      }
      this.trigger('dispose');
      this.dispose();
    },

    save: function(event) {
      var _this = this;
      this.model.save().done(function(response) {
        _this.publishSave(response);
        _this.dismiss();
      });
    },

    submit: function(event) {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) {
        this.save(event);
      }
    },

    changedAttribute: function(event) {
      var setObject = {};

      if (!event.currentTarget.validity.valid) {
        return;
      }

      if (event.metaKey && event.keyCode === 13) {
        this.$el.trigger('submit');
      } else {
        setObject[$(event.currentTarget).attr('name')] = $(event.currentTarget).val();
        this.model.set(setObject);
      }
    }
  });

  return FormView;
});
