define([
  'expect',
  'jquery',
  'chaplin',
  'config/application',
  'views/sessions/new-form-view',
  'models/user',
], function(expect, $, Chaplin, applicationConfig, SessionsNewFormView, UserModel) {
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
          to.be(require('text!views/templates/sessions/new-form.jade'));
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
      var userModel;

      it('should call #model.signin()', function(done) {
        var signin = UserModel.prototype.signin;
        
        UserModel.prototype.signin = function() {
          UserModel.prototype.signin = signin;

          done();
        };

        userModel = new UserModel();

        sessionsNewForm = new SessionsNewFormView({ model: userModel });
        sessionsNewForm.signin();
      });
      context('when done', function() {
        context('when response have access token', function() {
          beforeEach(function() {
            userModel = new UserModel();
            userModel.set({
              email: 'email@email.com',
              password: 'password'
            });
          });
          it('should dismiss', function(done) {
            var dismiss = SessionsNewFormView.prototype.dismiss;
        
            SessionsNewFormView.prototype.dismiss = function() {
              SessionsNewFormView.prototype.dismiss = dismiss;

              done();
            };
            
            sessionsNewForm = new SessionsNewFormView({ model: userModel });
            sessionsNewForm.signin();
          });
          it('should publish events with access token and signin',
            function(done) {
              var callbackSetToken,
                  callbackSignin;

              callbackSetToken = function(token) {
                expect(token).to.not.be.empty();
                Chaplin.mediator.unsubscribe('auth:setToken', callbackSetToken);
              };
              
              callbackSignin = function(serviceProviderName) {
                expect(serviceProviderName).to.be('formProvider');
                Chaplin.mediator.unsubscribe('!signin', callbackSignin);
                done();
              };
        
              Chaplin.mediator.subscribe('auth:setToken', callbackSetToken);
              Chaplin.mediator.subscribe('!signin', callbackSignin);
              
              sessionsNewForm = new SessionsNewFormView({ model: userModel });
              sessionsNewForm.signin();
            }
          );
        });
        context('when response have message', function() {
          beforeEach(function() {
            userModel = new UserModel();
            userModel.set({
              email: 'fail@fail.com',
              password: 'password'
            });
          });
          it('should add error messages', function(done) {
            var render = SessionsNewFormView.prototype.render;

            SessionsNewFormView.prototype.render = function() {};
            
            sessionsNewForm = new SessionsNewFormView({ model: userModel });
            sessionsNewForm.signin();

            $(document).ajaxSuccess(function(event, xhr, settings, response) {
              expect(sessionsNewForm.errorMessages).to.
                contain(response.message);

              SessionsNewFormView.prototype.render = render;

              $(document).off('ajaxSuccess');

              done();
            });
          });
          it('should render', function(done) {
            var render = SessionsNewFormView.prototype.render;

            SessionsNewFormView.prototype.render = function() {

              SessionsNewFormView.prototype.render = render;
              done();
            };
            
            userModel = new UserModel();
            
            SessionsNewFormView.prototype.autoRender = false;
            sessionsNewForm = new SessionsNewFormView({ model: userModel });
            SessionsNewFormView.prototype.autoRender = true;
            sessionsNewForm.signin();
          });
        });
      });
      context('when fail', function() {
        it('should render', function(done) {
          var signin = UserModel.prototype.signin,
              render = SessionsNewFormView.prototype.render;

          UserModel.prototype.signin = function() {
            return $.get(applicationConfig.api.root + '/notfound');
          };

          SessionsNewFormView.prototype.render = function() {
            UserModel.prototype.signin = signin;
            SessionsNewFormView.prototype.render = render;
            done();
          };
          
          userModel = new UserModel();
          
          SessionsNewFormView.prototype.autoRender = false;
          sessionsNewForm = new SessionsNewFormView({ model: userModel });
          SessionsNewFormView.prototype.autoRender = true;
          sessionsNewForm.signin();
        });
      });
    });
  });
});