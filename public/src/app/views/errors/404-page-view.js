define([
  'views/base/page-view',
  'text!views/templates/errors/404-page.jade'
], function(PageView, template) {
  'use strict';

  var Errors404PageView = PageView.extend({
    id: 'errors-404-page-view',
    autoRender: true,
    template: template
  });

  return Errors404PageView;
});
