define([
  'expect',

  'models/base/collection',
  'models/base/model'
], function(expect, Collection, Model) {
  'use strict';
  
  describe('Collection', function() {
    var collection;

    beforeEach(function() {
      collection = new Collection();
    });
    afterEach(function() {
      collection.dispose();
    });

    describe('#model', function() {
      it('should return base model', function() {
        expect(collection.model).to.be(Model);
      });
    });
  });
});