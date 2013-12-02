define([
  'chaplin',
  'views/base/view'
], function(Chaplin, View) {
  'use strict';

  var CollectionView = Chaplin.CollectionView.extend({
    getTemplateFunction: View.prototype.getTemplateFunction
  });

  return CollectionView;
});
