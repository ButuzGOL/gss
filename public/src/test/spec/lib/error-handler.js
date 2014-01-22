define([
  'expect',
  'jquery',
  'chaplin',

  'config/application',
  'config/environment',
  'lib/error-handler'
], function(expect, $, Chaplin, applicationConfig, environmentConfig,
  ErrorHandler) {
  'use strict';
  
  describe('ErrorHandler', function() {
    var errorHandler;
      
    beforeEach(function() {
      errorHandler = new ErrorHandler();
    });

    afterEach(function() {
      $(document).off('ajaxError');
      $(document).off('ajaxComplete');
      errorHandler = null;
    });
    describe('#subscribeForAjaxEvents()', function() {
      it('should collect error', function(done) {
        $.get(environmentConfig[applicationConfig.environment].api.root +
          '/lang/test');

        $(document).ajaxError(function() {
          expect(errorHandler.currentErrors).to.have.length(1);
          expect(errorHandler.currentErrors[0]).to.eql({
            code: 404,
            description: '',
            message: undefined
          });
          
          done();
        });
      });

      it('should publish errorHandler:catch with last error', function(done) {
        var callback = function(error) {
          expect(error).to.eql({
            code: 404,
            description: '',
            message: undefined
          });

          Chaplin.mediator.unsubscribe('errorHandler:catch', callback);

          done();
        };
        
        Chaplin.mediator.subscribe('errorHandler:catch', callback);

        $.get(environmentConfig[applicationConfig.environment].api.root +
          '/lang/test');
      });
    });
    describe('#publishCurrentErrors()', function() {
      it('should be called on ajax complete', function(done) {
        errorHandler.publishCurrentErrors = done;
        $.get('/');
      });
      it('should publish errorHandler:throw with current errors after ' +
        'last ajax',
        function(done) {
          var callback = function(errors) {
            expect(errors).to.have.length(2);
            expect(errors).to.eql([{
              code: 404,
              description: '',
              message: undefined
            }, {
              code: 404,
              description: '',
              message: undefined
            }]);

            Chaplin.mediator.unsubscribe('errorHandler:throw', callback);

            done();
          };

          Chaplin.mediator.subscribe('errorHandler:throw', callback);

          $.get(environmentConfig[applicationConfig.environment].api.root +
            '/lang/test');
          $.get(environmentConfig[applicationConfig.environment].api.root +
            '/lang/test');
        }
      );
      it('should not publish if no errors', function(done) {
        var wasCalled = false,
          callback = function() {
            wasCalled = true;
          };

        Chaplin.mediator.subscribe('errorHandler:throw', callback);

        $(document).ajaxComplete(function() {
          expect(wasCalled).to.be(false);

          Chaplin.mediator.unsubscribe('errorHandler:throw', callback);
          
          done();
        });

        $.get('/');
      });
      it('should not publish if locked', function(done) {
        
        var wasCalled = false,
          callback = function() {
            wasCalled = true;
          };

        Chaplin.mediator.subscribe('errorHandler:throw', callback);

        $(document).ajaxComplete(function() {
          expect(wasCalled).to.be(false);

          Chaplin.mediator.unsubscribe('errorHandler:throw', callback);
          
          done();
        });

        errorHandler.isLocked = true;

        $.get(environmentConfig[applicationConfig.environment].api.root +
          '/lang/test');
      });
      it('should collect current errors to errors basket', function(done) {
        $(document).ajaxComplete(function() {
          expect(errorHandler.errorsBasket[0]).to.have.length(1);
          expect(errorHandler.errorsBasket[0][0]).to.eql({
            code: 404,
            description: '',
            message: undefined
          });
          
          done();
        });
        
        $.get(environmentConfig[applicationConfig.environment].api.root +
          '/lang/test');
      });
      it('should clean current errors', function(done) {
        $(document).ajaxComplete(function() {
          expect(errorHandler.currentErrors).to.be.empty();
          
          done();
        });
        
        $.get(environmentConfig[applicationConfig.environment].api.root +
          '/lang/test');
      });
    });
  });
});