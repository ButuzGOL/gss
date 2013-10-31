define([
  'expect'
], function(expect) {
  'use strict';
  
  describe('SessionsNewFormView', function() {
    describe('#template', function() {
      it('should render template', function() {
      });
    });
    describe('#events', function() {
      it('should call #changedAttribute() on keyup [name=email]',
        function() {
        }
      );
      it('should call #changedAttribute() on keydown [name=email]',
        function() {
        }
      );
      it('should call #changedAttribute() on keyup [name=password]',
        function() {
        }
      );
      it('should call #changedAttribute() on keydown [name=password]',
        function() {
        }
      );
    });
    describe('#save()', function() {
      it('should call #signin()', function() {
      });
    });
    describe('#signin()', function() {
      describe('should call #model.signin()', function() {
        context('when done', function() {
          context('when response have access token', function() {
            it('should dismiss', function() {
            });
            it('should publish events with access token and signin',
              function() {
              }
            );
          });
          context('when response have message', function() {
            it('should add error messages', function() {
            });
            it('should render', function() {
            });
          });
        });
        context('when fail', function() {
          it('should render', function() {
          });
        });
      });
    });
  });
});