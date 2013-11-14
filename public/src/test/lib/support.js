define([
  'expect',
  'chaplin',
  'lib/support'
], function(expect, Chaplin, support) {
  'use strict';
  
  describe('Support', function() {
    it('should begets from Chaplin support', function() {
      expect(Object.getPrototypeOf(support)).to.eql(Chaplin.support);
    });
  });
});