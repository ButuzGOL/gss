define([
  'jquery',
  'underscore',
  'chaplin',
  'config/application'
], function($, _, Chaplin, applicationConfig) {
  'use strict';

  var utils = Chaplin.utils.beget(Chaplin.utils);

  _.extend(utils, {
    ajax: function(url, type, data) {
      url = applicationConfig.api.root + url;

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
    