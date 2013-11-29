define([
  'require',
  'underscore',
  'i18n',
  'chaplin',
  'mediator',
  'helpers/application-helper',
  'helpers/sessions-helper',
  'jade!views/templates/shared/form-error-messages'
], function(require, _, i18n, Chaplin, mediator) {
  'use strict';

  var View = Chaplin.View.extend({

    getTemplateFunction: function() {
      return this.template;
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
