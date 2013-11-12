define([
  'underscore',
  'lib/utils',
  'chaplin'
], function(_, utils, Chaplin) {
  'use strict';

  var support = Chaplin.utils.beget(Chaplin.support);

  _.extend(support, {
  });

  return support;
});
