define([
  'require',
  'underscore',
  'i18n',
  'jade',
  'chaplin',
  'mediator',
  'lib/utils',
  'helpers/application-helper',
  'helpers/sessions-helper',
  'text!views/templates/shared/form-error-messages.jade'
], function(require, _, i18n, Jade, Chaplin, mediator, utils) {
  'use strict';

  var View = Chaplin.View.extend({

    getTemplateFunction: function() {
      var template = this.template,
          templateFunc = null;

      if (_.isString(template)) {
        templateFunc = Jade.compile(template, { compileDebug: true });
        // this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },

    getTemplateData: function() {
      var object = Chaplin.View.prototype.getTemplateData.
        apply(this, arguments);
      
      if (mediator.user) {
        object.currentUser = utils.serialize(mediator.user);
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
