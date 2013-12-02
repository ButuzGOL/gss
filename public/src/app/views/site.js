define([
  'views/base/view',
  'text!views/templates/site.ejs'
], function(View, template) {
  'use strict';

  var SiteView = View.extend({
    container: 'body',
    id: 'site-container',
    regions: {
      messages: '#messages-container',
      header: '#header-container',
      main: '#main-container',
      footer: '#footer-container',
    },
    template: template
  });

  return SiteView;
});
