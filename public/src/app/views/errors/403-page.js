define([
  'views/base/page',
  'text!views/templates/errors/403-page.ejs'
], function(PageView, template) {
  'use strict';

  var Errors403PageView = PageView.extend({
    id: 'errors-403-page',
    autoRender: true,
    template: template
  });

  return Errors403PageView;
});
