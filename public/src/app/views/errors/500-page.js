define([
  'views/base/page',
  'text!views/templates/errors/500-page.ejs'
], function(PageView, template) {
  'use strict';

  var Errors500PageView = PageView.extend({
    id: 'errors-500-page',
    autoRender: true,
    template: template
  });

  return Errors500PageView;
});
