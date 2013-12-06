define([
  'expect',
  'views/base/page'
], function(expect, PageView) {
  'use strict';
  
  describe('PageView', function() {
    describe('#region', function() {
      it('should region set to main', function() {
        expect(PageView.prototype.region).to.be('main');
      });
    });
  });
});