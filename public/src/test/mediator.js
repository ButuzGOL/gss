define([
  'expect'
], function(expect) {
  'use strict';
  
  describe('Mediator', function() {
    it('should begets from Chaplin mediator', function() {
    });
    describe('#createUser()', function() {
      it('should create new user', function() {
      });
    });
    describe('#removeUser()', function() {
      it('should remove user', function() {
      });
    });
    describe('#signin()', function() {
      it('should return if user exists', function() {
      });
      it('should set access token to window.localStorage', function() {
      });
      it('should create user with calling #createUser() and' +
        ' set accesss token', function() {
      });
      it('should call #user.fetchCurrent()', function() {
      });
      it('should publish signinStatus true on then #user.fetchCurrent()',
        function() {
        }
      );
    });
    describe('#signout()', function() {
      it('should return if user not exists', function() {
      });
      it('should remove access token from window.localStorage', function() {
      });
      it('should remove user with calling #removeUser()', function() {
      });
      it('should publish signinStatus false', function() {
      });
    });
  });
});