define([
  'views/base/view',
  'jade!views/templates/header'
], function(View, template) {
  'use strict';

  var HeaderView = View.extend({
    autoRender: true,
    className: 'header',
    region: 'header',
    id: 'header',
    template: template
  });

  return HeaderView;
});
