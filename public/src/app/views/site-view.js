define([
  'views/base/view',
  'text!views/templates/site.hbs'
], function(View, template) {
  'use strict';

  var SiteView = View.extend({
    container: 'body',
    id: 'site-container',
    regions: {
      header: '#header-container',
      main: '#main-container'
    },
    template: template
  });

  return SiteView;
});
