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
      'submit': 'submit',
      'keyup input': 'changedAttribute',
      'keydown input': 'changedAttribute'
    },
    tagName: 'form',
    errorMessages: [],
    loaderSelector: '.loader',
    
    getTemplateData: function() {
      var object = View.prototype.getTemplateData.apply(this, arguments);
      
      object.errorMessages = this.errorMessages;

      return object;
    },

    render: function() {
      View.prototype.render.apply(this, arguments);

      this.errorMessages = [];
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
    },

    submit: function(event) {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) {
        this.showLoader();
        this.disableActions();
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
        setObject[$(event.currentTarget).attr('name')] =
          $(event.currentTarget).val();
        this.model.set(setObject);
      }
    },

    disableActions: function() {
      $('input, button, textarea, select', this.$el).prop('disabled', true);
    },
    showLoader: function() {
      $(this.loaderSelector, this.$el).addClass('active');
    }
  });

  return FormView;
});
