define([
  'views/base/view',
  'jade!views/templates/footer'
], function(View, template) {
  'use strict';

  var FooterView = View.extend({
    autoRender: true,
    className: 'footer',
    region: 'footer',
    id: 'footer',
    template: template
  });

  return FooterView;
});
