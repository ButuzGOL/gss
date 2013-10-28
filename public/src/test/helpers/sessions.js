define([
  'expect',

  'chaplin',
  'helpers/sessions-helper',
  'models/user'
], function(expect, Chaplin, sessionsHelper, User) {
  'use strict';
  
  describe('SessionsHelper', function() {
    describe('#isSignedIn()', function() {
      it('should be signin', function() {
        Chaplin.mediator.user = new User();
        expect(sessionsHelper.isSignedIn()).to.be(true);
        Chaplin.mediator.user = null;
      });
      it('should not be signin', function() {
        expect(sessionsHelper.isSignedIn()).to.be(false);
      });
    });
  });
});