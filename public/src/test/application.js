define([
  'expect'
], function(expect) {
  'use strict';
  
  describe('Application', function() {
    describe('#title', function() {
      it('should be application config title', function() {
      });
    });
    describe('#start()', function() {
      it('should start loader', function() {
      });
      it('should call #initErrorHandler()', function() {
      });
      describe('#initConfig()', function() {
        it('should call #initConfig()', function() {
        });
        context('when done', function() {
          it('should call #initAuth() with callback', function() {
          });
          it('should call #initLocale() with callback', function() {
          });
        });
        context('when fail', function() {
          it('should set mediator application error true', function() {
          });
          it('should call callback', function() {
          });
        });
      });
    });
    describe('#initErrorHandler()', function() {
      it('should set mediator error handler with ErrorHandler', function() {
      });
      it('should set mediator error handler locked', function() {
      });
      describe('subscribe to messagesView:ready and call callback', function() {
        it('should subscribe to event', function() {
        });
        context('when callback', function() {
          it('should unsubscribe to event', function() {
          });
          it('should set mediator error handler unlocked', function() {
          });
          it('should call error handler #publishCurrentErrors()', function() {
          });
        });
      });
    });
    describe('#initAuth()', function() {
      it('should if access token call callback', function() {
      });
      describe('subscribe to signinStatus and call callback', function() {
        it('should subscribe to event', function() {
        });
        context('when callback', function() {
          it('should unsubscribe to event', function() {
          });
          it('should call callback', function() {
          });
        });
      });
      it('should call mediator #signin() with access token', function() {
      });
    });
    describe('#initConfig()', function() {
      describe('calling for config from backend', function() {
        it('should call api root + /config', function() {
        });
        context('when done', function() {
          it('should extend backend config with exists', function() {
          });
        });
        context('when always', function() {
          it('should call callback', function() {
          });
        });
      });
    });
    describe('#initLocale()', function() {
      describe('require localization', function() {
        it('should require local localization based on config', function() {
        });
        context('when done', function() {
          describe('call backend for localization', function() {
            it('should call backend for localization', function() {
            });
            context('when done', function() {
              it('should extend data', function() {
              });
              it('should initialize language lib', function() {
              });
              it('should call callback', function() {
              });
            });
            context('when fail', function() {
              it('should send exists data', function() {
              });
            });
          });
        });
        context('when fail', function() {
          describe('call backend for localization', function() {
            context('when done', function() {
              it('should not extend data', function() {
              });
            });
            context('when fail', function() {
              it('should send null', function() {
              });
              it('should require default english localization', function() {
              });
            });
          });
        });
      });
    });
    describe('#initLayout()', function() {
      it('should create layout with attributes', function() {
      });
    });
    describe('#initMediator()', function() {
      it('should set attributes', function() {
      });
      it('should call parent', function() {
      });
    });
  });
});