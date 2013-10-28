define([
  'expect',
  'jquery',
  'chaplin',

  'config/application',
  'lib/error-handler'
], function(expect, $, Chaplin, applicationConfig, ErrorHandler) {
  'use strict';
  
  describe('ErrorHandler', function() {
    var errorHandler;
      
    beforeEach(function() {
      errorHandler = new ErrorHandler();
    });

    afterEach(function() {
      errorHandler = null;
    });
    describe('#subscribeForAjaxEvents()', function() {
      it('should collect error', function(done) {
        $.get(applicationConfig.api.root + '/lang/test');
        $(document).ajaxError(function(event, jqxhr, settings, exception) {
          expect(errorHandler.currentErrors).to.have.length(1);
          expect(errorHandler.currentErrors[0]).to.eql({
            code: 404,
            description: '',
            message: 'Cannot GET /lang/test'
          });
          
          $(document).off('ajaxError');

          done();
        });
      });

      it('should publish errorHandler:catch with last error', function(done) {
        var callback = function(error) {
          expect(error).to.eql({
            code: 404,
            description: '',
            message: 'Cannot GET /lang/test'
          });

          Chaplin.mediator.unsubscribe('errorHandler:catch', callback);

          done();
        };
        
        Chaplin.mediator.subscribe('errorHandler:catch', callback);

        $.get(applicationConfig.api.root + '/lang/test');
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
            expect(errors[1]).to.eql({
              code: 404,
              description: '',
              message: 'Cannot GET /lang/test'
            });
            Chaplin.mediator.unsubscribe('errorHandler:throw', callback);

            done();
          };

          Chaplin.mediator.subscribe('errorHandler:throw', callback);

          $.get(applicationConfig.api.root + '/lang/test');
          $.get(applicationConfig.api.root + '/lang/test');
        }
      );
      it('should not publish if no errors', function() {
      });
      it('should not publish if locked', function() {
      });
      it('should collect current errors to errors basket', function(done) {
        $(document).ajaxError(function(event, jqxhr, settings, exception) {
          debugger
          expect(errorHandler.errorsBasket[0]).to.have.length(1);
          expect(errorHandler.errorsBasket[0][0]).to.eql({
            code: 404,
            description: '',
            message: 'Cannot GET /lang/test'
          });
          
          $(document).off('ajaxError');

          done();
        });
        debugger
        $.get(applicationConfig.api.root + '/lang/test');
      });
      it('should clean current errors', function() {
      });
    });
  });
});