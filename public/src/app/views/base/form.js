/**
 * Form view module
 *
 * @module views/base/form
 */
define([
  'jquery',
  'views/base/view'
], function($, View) {
  'use strict';

  /**
   * Base form view class
   *
   * @class FormView
   * @constructor
   * @extends View
   */
  var FormView = View.extend({
    /** 
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /** 
     * @property events
     * @type {object}
     */
    events: {
      'click [data-action=cancel]': 'dismiss',
      'click [data-action=submit]': 'submit',
      'submit': 'submit',
      'keyup input': 'changedAttribute',
      'keydown input': 'changedAttribute'
    },
    /** 
     * @property tagName
     * @type {string}
     */
    tagName: 'form',
    /** 
     * @property errorMessages
     * @type {array}
     */
    errorMessages: [],
    /** 
     * @property loaderSelector
     * @type {string}
     */
    loaderSelector: '.loader',
    
    /**
     * Extend base data object 
     *
     * @method getTemplateData
     * @return {object} with additional data
     */
    getTemplateData: function() {
      var object = View.prototype.getTemplateData.apply(this, arguments);
      
      object.errorMessages = this.errorMessages;

      return object;
    },

    /**
     * Adding additional action
     * clearing error messages 
     *
     * @method render
     * @see View.render()
     */
    render: function() {
      View.prototype.render.apply(this, arguments);

      this.errorMessages = [];
    },
    
    /**
     * Publishing save if not exists throw error
     *
     * @method publishSave
     * @param {object} response on save
     */
    publishSave: function(response) {
      if (this.saveEvent) {
        this.publishEvent(this.saveEvent, response);
      } else {
        throw new Error('FormView must have saveEvent defined');
      }
    },

    /**
     * Reset form fields
     *
     * @method dismiss
     * @param {Event} event
     */
    dismiss: function(event) {
      if (event) {
        event.preventDefault();
      }
      this.trigger('dispose');
      this.dispose();
    },
    
    /**
     * @method save
     */
    save: function() {
    },

    /**
     * Submit form event
     *
     * @method submit
     * @param {Event} event
     */
    submit: function(event) {
      event.preventDefault();
      
      $('input', this.$el).trigger('keyup');

      if (event.currentTarget.checkValidity()) {
        this.showLoader();
        this.disableActions();
        this.save(event);
      }
    },

    /**
     * Sync attribute with model
     *
     * @method changedAttribute
     * @param {Event} event
     */
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
    /**
     * Disable form
     *
     * @method disableActions
     */
    disableActions: function() {
      $('input, button, textarea, select', this.$el).prop('disabled', true);
    },
    /**
     * Show loader
     *
     * @method showLoader
     */
    showLoader: function() {
      $(this.loaderSelector, this.$el).addClass('active');
    }
  });

  return FormView;
});
