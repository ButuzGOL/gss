define([
  'views/base/form-view',
  'text!views/templates/sessions/new-form.hbs'
], function(FormView, template) {
  'use strict';

  var SessionsNewFormView = FormView.extend({
    template: template,
    events: {
      'keyup [name=email]': 'changedAttribute',
      'keydown [name=email]': 'changedAttribute',
      'keyup [name=password]': 'changedAttribute',
      'keydown [name=password]': 'changedAttribute'
    },
    save: function(event) {
      this.signIn(event);
    },
    signIn: function(event) {
      var _this = this;
      this.model.signin().done(function(response) {
        _this.dismiss();
        _this.publishEvent('auth:setToken', response.accessToken);
        _this.publishEvent('!signin', 'formProvider');
      });
    }
  });

  return SessionsNewFormView;
});
