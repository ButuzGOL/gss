define([
  'underscore',
  'lib/utils',
  'chaplin'
], function(_, utils, Chaplin) {
  'use strict';

  var support = utils.beget(Chaplin.support);

  _(support).extend({
  });

  return support;
});
