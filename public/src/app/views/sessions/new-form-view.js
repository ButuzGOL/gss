define([
  'views/base/form-view',
  'text!views/templates/sessions/new-form.jade'
], function(FormView, template) {
  'use strict';

  var SessionsNewFormView = FormView.extend({
    template: template,
    save: function(event) {
      this.signin(event);
    },
    signin: function() {
      var _this = this;

      this.model.signin().done(function(response) {
        if (response.accessToken) {
          _this.dismiss();
          _this.publishEvent('auth:setToken', response.accessToken);
          _this.publishEvent('!signin', 'formProvider');
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
