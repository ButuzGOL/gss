define([
  'require',
  'underscore',
  'i18n',
  'ejs',
  'chaplin',
  'mediator',
  'helpers/application-helper',
  'helpers/sessions-helper',
  'text!views/templates/shared/form-error-messages.ejs'
], function(require, _, i18n, ejs, Chaplin, mediator) {
  'use strict';

  var View = Chaplin.View.extend({

    getTemplateFunction: function() {
      var template = this.template,
          templateFunc = null;

      if (_.isString(template)) {
        templateFunc = ejs.compile(template);
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },

    getTemplateData: function() {
      var object = Chaplin.View.prototype.getTemplateData.
        apply(this, arguments);
      
      if (mediator.user) {
        object.currentUser = mediator.user.serialize();
      }
      
      return _.defaults(object,
        { _: _ },
        { i18n: i18n },
        require('helpers/application-helper'),
        require('helpers/sessions-helper')
      );
    }
  });

  return View;
});
