define([
  'jquery',
  'underscore',
  'chaplin'
], function($, _, Chaplin) {
  'use strict';

  var utils = Chaplin.utils.beget(Chaplin.utils);

  _.extend(utils, {
    ajax: function(url, type, data) {

      return $.ajax({
        url: url,
        data: data || {},
        type: type || 'GET',
        dataType: 'json'
      });
    }
  });

  return utils;
});
    