define([
  'mediator',
  'helpers/application-helper',
  'views/base/form',
  'text!views/templates/sessions/new-form.ejs'
], function(mediator, applicationHelper, FormView, template) {
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
