define([
  'views/base/page-view',
  'text!views/templates/errors/500-page.jade'
], function(PageView, template) {
  'use strict';

  var Errors500PageView = PageView.extend({
    id: 'errors-500-page-view',
    autoRender: true,
    template: template,
  });

  return Errors500PageView;
});
