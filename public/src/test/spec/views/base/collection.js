define([
  'expect',

  'views/base/view',
  'views/base/collection'
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