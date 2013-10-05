define([
  'views/base/view',
  'text!views/templates/site.jade'
], function(View, template) {
  'use strict';

  var SiteView = View.extend({
    container: 'body',
    id: 'site-container',
    regions: {
      header: '#header-container',
      main: '#main-container',
      footer: '#footer-container',
    },
    template: template
  });

  return SiteView;
});
