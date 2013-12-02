define([
  'views/base/page',
  'text!views/templates/errors/404-page.ejs'
], function(PageView, template) {
  'use strict';

  var Errors404PageView = PageView.extend({
    id: 'errors-404-page',
    autoRender: true,
    template: template
  });

  return Errors404PageView;
});
