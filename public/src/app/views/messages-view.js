define([
  'jquery',
  'views/base/view',
  'text!views/templates/messages.jade'
], function($, View, template) {
  'use strict';

  var MessagesView = View.extend({
    autoRender: true,
    className: 'messages',
    region: 'messages',
    id: 'messages',
    template: template,
    initialize: function() {
      $(document).ajaxError(function(event, jqxhr, settings, exception) {
        log('ajax-error', event, jqxhr, settings);
        log('---');
      });

      $(document).ajaxComplete(function(event, xhr, settings) {
        log('ajax-complete', event, xhr, settings);
        log('ajax-count', $.active);
        log('---');
      });
    }
  });

  return MessagesView;
});


// listen to ajax->error
//   add error message
// listen to ajax->active 
//   render messages views
// 
