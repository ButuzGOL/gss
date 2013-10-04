define([
  'handlebars',
  'chaplin',
  'lib/utils'
], function(Handlebars, Chaplin, utils) {
  'use strict';

  // Application-specific Handlebars helpers
  // -------------------------------------------

  // Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}.
  Handlebars.registerHelper('url', function(routeName) {
    var params = [].slice.call(arguments, 1),
        options = params.pop();
    return Chaplin.helpers.reverse(routeName, params);
  });

  // Choose block by user signin status
  Handlebars.registerHelper('ifSignin', function(options) {
    var method = (Chaplin.mediator.user) ? options.fn : options.inverse;
    return method(this);
  });

  // Evaluate block with context being current user
  Handlebars.registerHelper('withUser', function(options) {
    var context = Chaplin.mediator.user.getAttributes();
    return Handlebars.helpers.with.call(this, context, options);
  });

});
