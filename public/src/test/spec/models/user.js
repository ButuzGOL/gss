define([
  'expect',
  'jquery',

  'models/user'
], function(expect, $, User) {
  'use strict';
  
  describe('User', function() {
    describe('#urlPath', function() {
      it('should return /users/me', function() {
        expect(User.prototype.urlPath).to.be('/users/me');
      });
    });
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

      afterEach(function() {
        user.dispose();
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