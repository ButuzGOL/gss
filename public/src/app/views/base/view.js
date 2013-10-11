define([
  'require',
  'underscore',
  'i18n',
  'jade',
  'chaplin',
  'lib/utils',
  'helpers/application-helper',
  'helpers/sessions-helper',
  'text!views/templates/shared/form-error-messages.jade'
], function(require, _, i18n, Jade, Chaplin, utils) {
  'use strict';

  var View = Chaplin.View.extend({

    getTemplateFunction: function() {
      var template = this.template,
          templateFunc = null;

      if (_.isString(template)) {
        // Compile the template string to a function and save it
        // on the prototype. This is a workaround since an instance
        // shouldn’t change its prototype normally.
        templateFunc = Jade.compile(template, { compileDebug: true });
        this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },

    getTemplateData: function() {
      var object = Chaplin.View.prototype.getTemplateData.
        apply(this, arguments);
      
      if (Chaplin.mediator.user) {
        object.currentUser = utils.serialize(Chaplin.mediator.user);
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
