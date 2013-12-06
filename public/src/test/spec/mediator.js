define([
  'expect',
  'jquery',
  'chaplin',
  'mediator',
  'models/user',
  'config/application'
], function(expect, $, Chaplin, mediator, User, applicationConfig) {
  'use strict';
  
  describe('Mediator', function() {
    it('should be Chaplin mediator', function() {
      expect(mediator).to.equal(Chaplin.mediator);
    });
    describe('#createUser()', function() {
      it('should create new user', function() {
        mediator.createUser();
        expect(mediator.user).to.be.a(User);
        mediator.removeUser();
      });
    });
    describe('#removeUser()', function() {
      it('should remove user', function() {
        mediator.user = new User();
        mediator.removeUser();
        expect(mediator.user).to.be(null);
      });
    });
    describe('#signin()', function() {
      var accessToken = 'test';
      
      it('should return deferred object', function(done) {
        var signin = mediator.signin(accessToken);

        signin.fail(function() {
          done();
        });

        expect(signin.promise).to.be.an('function');
      });
      it('should return if user exists', function() {
        var wasCalled = false,
            createUser = mediator.createUser;

        mediator.createUser = function() {
          this.user = new User();
          wasCalled = true;
        };

        mediator.user = new User();
        mediator.signin(accessToken);

        expect(wasCalled).to.be(false);

        mediator.createUser = createUser;

        mediator.removeUser();
      });
      it('should set access token to window.localStorage', function(done) {
        mediator.signin(accessToken).fail(function() {
          done();
        });
        
        expect(window.localStorage.getItem('accessToken')).to.be(accessToken);
      });
      it('should create user with calling #createUser()', function(done) {
        var createUser = mediator.createUser,
            wasCalled = false,
            callback = function() {
              expect(wasCalled).to.be(true);
              done();
            };

        mediator.createUser = function() {
          this.user = new User();
          mediator.createUser = createUser;
          wasCalled = true;
        };

        mediator.signin(accessToken).fail(callback);
      });
      describe('#user.fetch()', function() {
        it('should call #user.fetch()', function(done) {
          var fetch = User.prototype.fetch;

          User.prototype.fetch = function() {
            User.prototype.fetch = fetch;
            
            mediator.removeUser();
            
            done();

            return $.Deferred();
          };

          mediator.signin(accessToken);
        });
        context('when done', function() {
          it('should publish signinStatus true',
            function(done) {
              var callback,
                  fetch = User.prototype.fetch;
                  
              User.prototype.fetch = function() {
                User.prototype.fetch = fetch;
                return $.get('/');
              };

              callback = function(status) {
                expect(status).to.be(true);
                Chaplin.mediator.unsubscribe('signinStatus', callback);

                mediator.removeUser();

                done();
              };

              Chaplin.mediator.subscribe('signinStatus', callback);

              mediator.signin(accessToken);
            }
          );
        });
        context('when fail', function() {
          it('should publish signinStatus false and remove user',
            function(done) {
              var callback,
                  fetch = User.prototype.fetch;

              User.prototype.fetch = function() {
                User.prototype.fetch = fetch;
                return $.get(applicationConfig.api.root + '/notfound');
              };


              callback = function(status) {
                expect(status).to.be(false);
                expect(mediator.user).to.be(null);

                Chaplin.mediator.unsubscribe('signinStatus', callback);

                done();
              };

              Chaplin.mediator.subscribe('signinStatus', callback);

              mediator.signin(accessToken);
            }
          );
        });
      });
    });
    describe('#signout()', function() {
      it('should return if user not exists', function() {
        var wasCalled = false,
            removeUser = mediator.removeUser;

        mediator.removeUser = function() {
          wasCalled = true;
        };

        mediator.signout();

        expect(wasCalled).to.be(false);

        mediator.removeUser = removeUser;
      });
      it('should remove access token from window.localStorage', function() {
        window.localStorage.setItem('accessToken', 'test');

        mediator.user = new User();
        mediator.signout();
        
        expect(window.localStorage.getItem('accessToken')).to.be(null);
      });
      it('should remove user with calling #removeUser()', function(done) {
        var removeUser = mediator.removeUser;

        mediator.removeUser = function() {
          mediator.removeUser = removeUser;
          mediator.removeUser();
          done();
        };

        mediator.user = new User();
        mediator.signout();
      });
      it('should publish signinStatus false', function(done) {
        var callback = function(status) {
          expect(status).to.be(false);
          Chaplin.mediator.unsubscribe('signinStatus', callback);

          done();
        };

        Chaplin.mediator.subscribe('signinStatus', callback);

        mediator.user = new User();
        mediator.signout();
      });
    });
  });
});