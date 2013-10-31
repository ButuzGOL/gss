define([
  'require',
  'expect',
  
  'chaplin',
  
  'views/layout',
  'nprogress'
], function(require, expect, Chaplin, Layout) {
  'use strict';
  
  describe('Layout', function() {
    var layout;

    beforeEach(function() {
      layout = new Layout();
    });
    afterEach(function() {
      layout.dispose();
    });

    describe('#showLoader()', function() {
      it('should be called on controller:actionStart', function(done) {
        var showLoader = Layout.prototype.showLoader,
            callback = function() {
              Layout.prototype.showLoader = showLoader;

              done();
            };

        Layout.prototype.showLoader = callback;

        layout = new Layout();

        Chaplin.mediator.publish('controller:actionStart');
      });
      it('should be started loader', function(done) {
        var callback = function() {
          expect(require('nprogress').isStarted()).to.be(true);

          Chaplin.mediator.unsubscribe('controller:actionStart', callback);

          done();
        };

        Chaplin.mediator.subscribe('controller:actionStart', callback);

        Chaplin.mediator.publish('controller:actionStart');
      });
    });
    describe('#hideLoader()', function() {
      it('should be called on controller:actionDone', function(done) {
        var hideLoader = Layout.prototype.hideLoader,
            callback = function() {
              Layout.prototype.hideLoader = hideLoader;

              done();
            };

        Layout.prototype.hideLoader = callback;

        layout = new Layout();

        Chaplin.mediator.publish('controller:actionDone');
      });
      it('should be started loader', function(done) {
        var callback = function() {
          expect(require('nprogress').isStarted()).to.be(false);
          
          Chaplin.mediator.unsubscribe('controller:actionDone', callback);

          done();
        };

        Chaplin.mediator.subscribe('controller:actionDone', callback);

        Chaplin.mediator.publish('controller:actionDone');
      });
    });
  });
});