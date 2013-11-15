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
    describe('#fetchCurrent()', function() {
      var user,
          ajax,
          accessToken = 'test';
          
      beforeEach(function() {
        user = new User({
          accessToken: accessToken
        });
        ajax = user.fetchCurrent();
        ajax.abort();
      });

      it('should return deferred object', function() {
        expect(ajax.promise).to.be.an('function');
      });
      
      it('should send GET request to /users/me with access token',
        function(done) {
          ajax.always(function() {
            expect(this.type).to.be('GET');
            expect(this.url).to.be(
              user.apiRoot + '/users/me?' + $.param({
                'access_token': user.get('accessToken')
              })
            );
            expect(this.data).to.be();
            done();
          }
        );
      });

    });
  });
});