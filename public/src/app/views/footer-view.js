define([
  'views/base/view',
  'text!views/templates/footer.hbs'
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
