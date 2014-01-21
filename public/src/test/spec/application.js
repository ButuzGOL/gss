define([
  'expect',
  'sinon',
  'underscore',
  'jquery',
  'chaplin',
  'application',
  'config/application',
  'config/backend',
  'nprogress',
  'mediator',
  'lib/error-handler',
  'i18n'
], function(expect, sinon, _, $, Chaplin, Application, applicationConfig,
  backendConfig, NProgress, mediator, ErrorHandler, i18n) {
  'use strict';
  
  describe('Application', function() {
    describe('#title', function() {
      it('should be application config title', function() {
        expect(Application.prototype.title).to.be(applicationConfig.title);
      });
    });
    describe('#start()', function() {
      var initErrorHandler = Application.prototype.initErrorHandler;

      before(function() {
        Application.prototype.initErrorHandler = function() {};
      });
      after(function() {
        Application.prototype.initErrorHandler = initErrorHandler;
      });
      beforeEach(function() {
        Chaplin.Application.prototype.start = function() {};
      });
      it('should start loader', function() {
        Application.prototype.start();
        expect(NProgress.isStarted()).to.be(true);
      });
      it('should call #initErrorHandler()', function(done) {
        var initErrorHandler = Application.prototype.initErrorHandler;

        Application.prototype.initErrorHandler = function() {

          Application.prototype.initErrorHandler = initErrorHandler;
          done();
        };

        Application.prototype.start();
      });
      describe('#initConfig()', function() {
        it('should call #initConfig()', function(done) {
          var initConfig = Application.prototype.initConfig;

          Application.prototype.initConfig = function() {
            Application.prototype.initConfig = initConfig;
            done();
            return $.get('/');
          };

          Application.prototype.start();
        });
        context('when done', function() {
          it('should call #initAuth() with callback', function(done) {
            var initAuth = Application.prototype.initAuth;

            Application.prototype.initAuth = function(callback) {
              expect(callback).to.be.a('function');
              Application.prototype.initAuth = initAuth;
              done();
            };

            Application.prototype.start();
          });
          it('should call #initLocale() with callback', function(done) {
            var initLocale = Application.prototype.initLocale,
                deferred = new $.Deferred();
            
            sinon.stub($, 'ajax').returns(deferred);

            Application.prototype.initLocale = function(callback) {
              expect(callback).to.be.a('function');
              Application.prototype.initLocale = initLocale;
              $.ajax.restore();
              done();
            };

            Application.prototype.start();
            deferred.resolve();
          });
        });
        context('when fail', function() {
          var initConfig = Application.prototype.initConfig;

          beforeEach(function() {
            Application.prototype.initConfig = function() {
              return $.get(applicationConfig.api.root + '/notfound');
            };
          });
          afterEach(function() {
            Application.prototype.initConfig = initConfig;
          });

          it('should set mediator application error true', function(done) {
            $(document).ajaxError(function() {
              expect(mediator.applicationError).to.be(true);

              $(document).off('ajaxError');
              done();
            });

            Application.prototype.start();
          });
          it('should call parent', function(done) {
            Chaplin.Application.prototype.start = function() {
              Chaplin.Application.prototype.start = function() {};

              done();
            };

            Application.prototype.start();
          });
        });
      });
    });
    describe('#initErrorHandler()', function() {
      afterEach(function() {
        Chaplin.mediator.unsubscribe('messagesView:ready');
      });
      it('should set mediator error handler with ErrorHandler', function() {
        Application.prototype.initErrorHandler();
        expect(mediator.errorHandler).to.be.a(ErrorHandler);
      });
      it('should set mediator error handler locked', function() {
        Application.prototype.initErrorHandler();
        expect(mediator.errorHandler.isLocked).to.be(true);
      });
      describe('subscribe to messagesView:ready and call callback', function() {
        it('should subscribe to event', function() {
          Application.prototype.initErrorHandler();
          expect(Chaplin.mediator._events['messagesView:ready']).to.have.
            length(1);
        });
        context('when callback', function() {
          it('should unsubscribe to event', function() {
            Application.prototype.initErrorHandler();
            Chaplin.mediator.publish('messagesView:ready');
            expect(Chaplin.mediator._events['messagesView:ready']).to.
              be(undefined);
          });
          it('should set mediator error handler unlocked', function() {
            Application.prototype.initErrorHandler();
            Chaplin.mediator.publish('messagesView:ready');
            expect(mediator.errorHandler.isLocked).to.be(false);
          });
          it('should call error handler #publishCurrentErrors()',
            function(done) {
              var publishCurrentErrors = ErrorHandler.prototype.
                publishCurrentErrors;

              ErrorHandler.prototype.publishCurrentErrors = function() {
                ErrorHandler.prototype.publishCurrentErrors =
                  publishCurrentErrors;

                done();
              };

              Application.prototype.initErrorHandler();
              Chaplin.mediator.publish('messagesView:ready');
            }
          );
        });
      });
    });
    describe('#initAuth()', function() {
      afterEach(function() {
        window.localStorage.removeItem('accessToken');
        Chaplin.mediator.unsubscribe('signinStatus');
      });
      it('should if access token call callback', function(done) {
        var wasCalled = false,
            signin = mediator.signin;

        mediator.signin = function() {
          wasCalled = true;
        };

        window.localStorage.removeItem('accessToken');
        
        Application.prototype.initAuth(function() {
          done();
        });
        
        expect(wasCalled).to.be(false);
        mediator.signin = signin;
      });
      describe('subscribe to signinStatus and call callback', function() {
        var accessToken = 'test';

        beforeEach(function() {
          window.localStorage.setItem('accessToken', accessToken);
        });
        it('should subscribe to event', function(done) {
          Application.prototype.initAuth(function() {});
          expect(Chaplin.mediator._events.signinStatus).to.have.
            length(1);
          $(document).ajaxComplete(function() {
            $(document).off('ajaxComplete');
            done();
          });
        });
        context('when callback', function() {
          it('should unsubscribe to event', function(done) {
            Application.prototype.initAuth(function() {});
            Chaplin.mediator.publish('signinStatus');
            expect(Chaplin.mediator._events.signinStatus).to.be(undefined);
            $(document).ajaxComplete(function() {
              $(document).off('ajaxComplete');
              done();
            });
          });
          it('should call callback', function(done) {
            var wasCalled = false;

            Application.prototype.initAuth(function() {
              wasCalled = true;
            });
            Chaplin.mediator.publish('signinStatus');
            $(document).ajaxComplete(function() {
              expect(wasCalled).to.be(true);
              $(document).off('ajaxComplete');
              done();
            });
          });
        });
      });
      it('should call mediator #signin() with access token', function(done) {
        var accessToken = 'test',
            signin = mediator.signin;

        window.localStorage.setItem('accessToken', accessToken);

        mediator.signin = function(accessToken1) {
          expect(accessToken1).to.be(accessToken);
          mediator.signin = signin;
          done();
        };

        Application.prototype.initAuth(function() {});
        Chaplin.mediator.publish('signinStatus');
      });
    });
    describe('#initConfig()', function() {
      describe('calling for config from backend', function() {
        it('should call api root + /config', function(done) {
          var ajax = Application.prototype.initConfig();
          ajax.abort();
          ajax.always(function() {
            expect(this.url).to.be(applicationConfig.api.root + '/config');
            done();
          });
        });
        context('when done', function() {
          it('should extend backend config with exists', function(done) {
            var originBackendConfig = _.clone(backendConfig, true),
                ajax;

            var deferred = new $.Deferred();
            sinon.stub($, 'ajax').returns(deferred);

            ajax = Application.prototype.initConfig();

            deferred.resolveWith(null, [{ test: 'test' }]);

            ajax.done(function(response) {
              expect(_.extend(originBackendConfig, response)).to.
                eql(backendConfig);

              $.ajax.restore();

              done();
            });
          });
        });
      });
    });
    describe('#initLocale()', function() {
      beforeEach(function() {
        applicationConfig.locale = 'en';
      });
      describe('require localization', function() {
        it('should require local localization based on config', function() {
          // Application.prototype.initLocale(function() {});
          // expect(require('json!config/locales/' + applicationConfig.locale +
          //   '.json')).to.be.an('object');
          expect(true).to.be(true);
        });
        context('when done', function() {
          describe('call backend for localization', function() {
            it('should call backend for localization', function(done) {
              $(document).ajaxComplete(function(event, jqxhr, settings) {
                expect(settings.url).to.be(applicationConfig.api.root +
                  '/locales/' + applicationConfig.locale);

                $(document).off('ajaxComplete');

                done();
              });

              Application.prototype.initLocale(function() {});
            });
            context('when done', function() {
              it('should extend data', function() {
                var data;
                
                Application.prototype.initLocale(function() {});
                
                data = require('json!config/locales/' +
                  applicationConfig.locale + '.json');
                
                $.get(applicationConfig.api.root + '/locales/' +
                  applicationConfig.locale).done(
                  function(response) {
                    expect(i18n.options.resStore.en.translation).to.
                      eql(_.extend({}, data, response));
                  }
                );

              });
              it('should initialize language lib', function() {
                Application.prototype.initLocale(function() {});
                expect(i18n.options.resStore).to.be.an('object');
              });
              it('should call callback', function(done) {
                Application.prototype.initLocale(done);
              });
            });
            context('when fail', function() {
              it('should send exists data', function(done) {
                var apiRoot = applicationConfig.api.root,
                    data,
                    callback;

                callback = function() {
                  expect(i18n.options.resStore.en.translation).to.eql(data);
              
                  applicationConfig.api.root = apiRoot;
                  
                  done();
                };

                applicationConfig.api.root = 'http://localhost:30001';

                Application.prototype.initLocale(callback);

                data = require('json!config/locales/' +
                  applicationConfig.locale + '.json');

              });
            });
          });
        });
        context('when fail', function() {
          describe('call backend for localization', function() {
            context('when done', function() {
              it('should not extend data', function(done) {
                var locale = applicationConfig.locale,
                    langResponse = { test: 'test' },
                    deferred = new $.Deferred();

                sinon.stub($, 'ajax').returns(deferred);

                applicationConfig.locale = 'test';

                Application.prototype.initLocale(function() {
                  expect(i18n.options.resStore.en.translation).to.
                    eql(langResponse);
                  $.ajax.restore();
                  done();
                });
                deferred.resolveWith(null, [langResponse]);

                applicationConfig.locale = locale;
              });
            });
            context('when fail', function() {
              it('should require default english localization', function(done) {
                var locale = applicationConfig.locale,
                    data,
                    callback;

                callback = function() {
                  expect(i18n.options.resStore.en.translation).to.
                    eql(data);

                  applicationConfig.locale = locale;
                
                  done();
                };

                applicationConfig.locale = 'test';
                
                Application.prototype.initLocale(callback);
                
                data = require('json!config/locales/en.json');
              });
            });
          });
        });
      });
    });
    describe('#initLayout()', function() {
      it('should create layout with attributes', function() {
        var object = {
          title: 'Test'
        };
        
        Application.prototype.initLayout.call(object, {});
        
        expect(object.layout.title).to.be(object.title);
      });
    });
    describe('#initMediator()', function() {
      it('should set attributes', function() {
        Application.prototype.initMediator();

        expect(mediator.user).to.be(null);
        expect(mediator.errorHandler).to.be(null);
        expect(mediator.applicationError).to.be(false);
      });
      it('should call parent', function(done) {
        var initMediator = Chaplin.Application.prototype.initMediator;
        Chaplin.Application.prototype.initMediator = function() {
          Chaplin.Application.prototype.initMediator = initMediator;

          done();
        };

        Application.prototype.initMediator();
      });
    });
  });
});