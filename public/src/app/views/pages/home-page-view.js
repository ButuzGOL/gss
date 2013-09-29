define([
  'views/base/page-view',
  'text!views/templates/pages/home-page.hbs'
], function(PageView, template) {
  'use strict';

  var PagesHomePageView = PageView.extend({
    autoRender: true,
    template: template
  });

  return PagesHomePageView;
});
