define([
  'expect',

  'views/base/view',
  'views/base/collection-view'
], function(expect, View, CollectionView) {
  'use strict';
  
  describe('CollectionView', function() {
    describe('#getTemplateFunction()', function() {
      it('should be the same as in View', function() {
        expect(CollectionView.prototype.getTemplateFunction).to.
          be(View.prototype.getTemplateFunction);
      });
    });
  });
});