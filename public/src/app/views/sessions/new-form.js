/**
 * Sessions new form module
 *
 * @module views/sessions/new-form
 */
define([
  'mediator',
  'helpers/application',
  'views/base/form',
  'text!views/templates/sessions/new-form.ejs'
], function(mediator, applicationHelper, FormView, template) {
  'use strict';

  /**
   * Sessions new form
   *
   * @class SessionsNewFormView
   * @constructor
   * @extends FormView
   */
  var SessionsNewFormView = FormView.extend({
    /** 
     * @property template
     * @type {string}
     */
    template: template,
    /**
     * Just move to another function to make more meaningful
     *
     * @method save
     * @return {Event} event
     */
    save: function(event) {
      this.signin(event);
    },
    /**
     * Signin user and redirect or show validation errors 
     *
     * @method signin
     * @async
     * @return {Event} event
     */
    signin: function() {
      var _this = this;

      this.model.signin().done(function(response) {
        if (response.accessToken) {
          _this.dismiss();
          mediator.signin(response.accessToken).
            done(function() {
              applicationHelper.redirectTo('pages#home', {},
                { forceStartup: true });
            });
        } else if (response.message) {
          _this.errorMessages.push(response.message);
          _this.render();
        }
      }).fail(function() {
        _this.render();
      });
    }
  });

  return SessionsNewFormView;
});
