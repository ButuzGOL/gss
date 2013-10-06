define([
  'views/base/view'
], function(View) {
  'use strict';

  var PageView = View.extend({
    region: 'main',
    getNavigationData: function() {},
    render: function() {
      View.prototype.render.apply(this, arguments);
      this.publishEvent('navigation:change', this.getNavigationData());
    }
  });

  return PageView;
});
