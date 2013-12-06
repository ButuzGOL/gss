define([
  'expect',
  'jquery',
  'chaplin',
  'lib/utils'
], function(expect, $, Chaplin, utils) {
  'use strict';
  
  describe('Utils', function() {
    it('should begets from Chaplin.utils', function() {
      expect(Object.getPrototypeOf(utils)).to.eql(Chaplin.utils);
    });
    describe('#ajax()', function() {
      var ajax,
          type = 'POST',
          url = '/test',
          data = { test: 'test' };

      it('should return deferred object', function() {
        ajax = utils.ajax(url, type, data);
        ajax.abort();

        expect(ajax.promise).to.be.an('function');
      });
      it('should set arguments', function(done) {
        ajax = utils.ajax(url, type, data);
        ajax.abort();
        
        ajax.always(function() {
          expect(this.type).to.be(type);
          expect(this.url).to.be(url);
          expect(this.data).to.be($.param(data));

          done();
        });
      });
      it('should set GET method and {} data if not set', function(done) {
        ajax = utils.ajax(url);
        ajax.abort();
        
        ajax.always(function() {
          expect(this.type).to.be('GET');
          expect(this.data).to.be('');

          done();
        });
      });
    });
  });
});