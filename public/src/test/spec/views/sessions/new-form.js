define([
  'expect',
  'sinon',
  'jquery',
  'underscore',
  'chaplin',
  'mediator',
  'config/application',
  'views/sessions/new-form',
  'models/user'
], function(expect, sinon, $, _, Chaplin, mediator, applicationConfig,
  SessionsNewFormView, User) {
  'use strict';
  
  describe('SessionsNewFormView', function() {
    var sessionsNewForm;

    afterEach(function() {
      if (sessionsNewForm) {
        sessionsNewForm.dispose();
      }
    });
    describe('#template', function() {
      it('should render template', function() {
        SessionsNewFormView.prototype.autoRender = false;
        sessionsNewForm = new SessionsNewFormView();
        SessionsNewFormView.prototype.autoRender = true;
        
        expect(sessionsNewForm.template).
          to.be(require('text!views/templates/sessions/new-form.ejs'));
      });
    });
    describe('#save()', function() {
      it('should call #signin()', function(done) {
        var signin = SessionsNewFormView.prototype.signin;
        
        SessionsNewFormView.prototype.signin = function() {
          SessionsNewFormView.prototype.signin = signin;
          done();
        };

        sessionsNewForm = new SessionsNewFormView();
        sessionsNewForm.signin();
      });
    });
    describe('#signin()', function() {
      var user;

      it('should call #model.signin()', function(done) {
        var signin = User.prototype.signin;
        
        User.prototype.signin = function() {
          User.prototype.signin = signin;

          done();

          return $.Deferred();
        };

        user = new User();

        sessionsNewForm = new SessionsNewFormView({ model: user });
        sessionsNewForm.signin();
      });
      context('when done', function() {
        context('when response has access token', function() {
          beforeEach(function() {
            user = new User();
            user.set({
              email: 'email@email.com',
              password: 'password'
            });
          });
          it('should dismiss', function(done) {
            var wasCalled = false,
                signin = mediator.signin,
                dismiss = SessionsNewFormView.prototype.dismiss,
                deferred = new $.Deferred();
        
            sinon.stub(User.prototype, 'signin').returns(deferred);

            SessionsNewFormView.prototype.dismiss = function() {
              SessionsNewFormView.prototype.dismiss = dismiss;

              wasCalled = true;
            };

            mediator.signin = function() {
              expect(wasCalled).to.be(true);
              mediator.signin = signin;

              User.prototype.signin.restore();
              done();

              return $.Deferred();
            };
            
            sessionsNewForm = new SessionsNewFormView({ model: user });
            sessionsNewForm.signin();
            deferred.resolveWith(null, [{ accessToken: 'test' }]);
          });
          it('should call mediator #signin() with access token',
            function(done) {
              var signin = mediator.signin,
                  responseAccessToken = 'test',
                  deferred = new $.Deferred();

              sinon.stub(User.prototype, 'signin').returns(deferred);

              mediator.signin = function(accessToken) {
                mediator.signin = signin;
                
                expect(accessToken).to.be(responseAccessToken);
                User.prototype.signin.restore();
                done();
                
                return $.Deferred();
              };

              sessionsNewForm = new SessionsNewFormView({ model: user });
              sessionsNewForm.signin();
              deferred.resolveWith(null,
                [{ accessToken: responseAccessToken }]);
            }
          );
          context('when #mediator.signin() done', function() {
            it('should redirect to pages#home', function(done) {
              var deferred = new $.Deferred(),
                  mediatorDeferred = new $.Deferred();
        
              sinon.stub(User.prototype, 'signin').returns(deferred);
              sinon.stub(mediator, 'signin').returns(mediatorDeferred);

              var handler = function(routeName) {
                expect(routeName).to.be('pages#home');
                User.prototype.signin.restore();
                mediator.signin.restore();
                done();
              };

              Chaplin.mediator.setHandler('router:route', handler);
              
              sessionsNewForm = new SessionsNewFormView({ model: user });
              sessionsNewForm.signin();
              deferred.resolveWith(null, [{ accessToken: 'test' }]);
              mediatorDeferred.resolveWith(null, [{}]);
            });
          });
        });
        context('when response has message', function() {
          beforeEach(function() {
            user = new User();
            user.set({
              email: 'fail@fail.com',
              password: 'password'
            });
          });
          it('should add error messages', function() {
            var render = SessionsNewFormView.prototype.render,
                deferred = $.Deferred(),
                message = 'test';

            sinon.stub(User.prototype, 'signin').returns(deferred);

            SessionsNewFormView.prototype.render = function() {};
            
            sessionsNewForm = new SessionsNewFormView({ model: user });
            sessionsNewForm.signin();

            deferred.resolveWith(null, [{ message: message }]);
            expect(sessionsNewForm.errorMessages).to.contain(message);

            SessionsNewFormView.prototype.render = render;
            User.prototype.signin.restore();
          });
          it('should render', function(done) {
            var render = SessionsNewFormView.prototype.render;

            SessionsNewFormView.prototype.render = function() {

              SessionsNewFormView.prototype.render = render;
              done();
            };
            
            user = new User();
            
            SessionsNewFormView.prototype.autoRender = false;
            sessionsNewForm = new SessionsNewFormView({ model: user });
            SessionsNewFormView.prototype.autoRender = true;
            sessionsNewForm.signin();
          });
        });
      });
      context('when fail', function() {
        it('should render', function(done) {
          var signin = User.prototype.signin,
              render = SessionsNewFormView.prototype.render;

          User.prototype.signin = function() {
            return $.get(applicationConfig.api.root + '/notfound');
          };

          SessionsNewFormView.prototype.render = function() {
            User.prototype.signin = signin;
            SessionsNewFormView.prototype.render = render;
            done();
          };
          
          user = new User();
          
          SessionsNewFormView.prototype.autoRender = false;
          sessionsNewForm = new SessionsNewFormView({ model: user });
          SessionsNewFormView.prototype.autoRender = true;
          sessionsNewForm.signin();
        });
      });
    });
  });
});