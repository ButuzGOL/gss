define([
  'require',
  'underscore',
  'jade',
  'chaplin',
  'lib/utils',
  'helpers/application-helper',
  'helpers/sessions-helper'
], function(require, _, Jade, Chaplin, utils) {
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
        apply(this, arguments),
          globalTemplateData = {};

      if (Chaplin.mediator.user) {
        globalTemplateData.currentUser = utils.serialize(Chaplin.mediator.user);
      }

      return _.extend(
        require('helpers/application-helper'),
        require('helpers/sessions-helper'),
        globalTemplateData,
        object);
    }
  });

  return View;
});
