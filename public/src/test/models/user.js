define([
  'expect',
  'jquery',

  'models/user'
], function(expect, $, User) {
  'use strict';
  
  describe('User', function() {
    describe('#signin()', function() {
      var user,
          ajax;
          
      beforeEach(function() {
        user = new User({
          email: 'foobar@example.com',
          password: 'foobar'
        });
        ajax = user.signin();
        ajax.abort();
      });

      it('should return deferred object', function() {
        expect(ajax.promise).to.be.an('function');
      });
      it('should send POST request to /signin with user data', function(done) {
        ajax.always(function() {
          expect(this.type).to.be('POST');
          expect(this.url).to.be(user.apiRoot + '/signin');
          expect(this.data).to.be($.param(user.serialize()));

          done();
        });
      });
    });
  });
});