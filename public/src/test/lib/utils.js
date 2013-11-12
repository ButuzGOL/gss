define([
  'expect',
  'chaplin',
  'lib/utils'
], function(expect, Chaplin, utils) {
  'use strict';
  
  describe('Utils', function() {
    it('should begets from Chaplin.utils', function() {
      expect(utils).to.have.keys(Object.keys(Chaplin.utils));
    });
    describe('#ajax()', function() {
      // var ajax,
      //     type = 'POST',
      //     url = '/request';

      // beforeEach(function() {
      //   ajax = model.ajax(type, url, {});
      //   ajax.abort();
      // });

      it('should return deferred object', function() {
        // expect(ajax.promise).to.be.an('function');
      });
      it('should set arguments', function(done) {
        // ajax.always(function() {
        //   expect(this.type).to.be(type);
        //   expect(this.url).to.match(new RegExp(url));
        //   expect(this.data).to.be('');

        //   done();
        // });
      });
      it('should set GET method if not set', function(done) {
      });
      it('should set {} data if not set', function(done) {
      });
      it('should modify url', function(done) {
        // ajax.always(function() {
        //   expect(this.url).to.be(model.apiRoot + url);
          
        //   done();
        // });
      });
    });
  });
});