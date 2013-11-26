define([
  'expect',

  'chaplin',
  'config/routes',

  'views/errors/404-page-view',
  'views/errors/403-page-view',
  'views/errors/500-page-view'
], function(expect, Chaplin, routes, Errors404PageView, Errors403PageView,
  Errors500PageView) {
  'use strict';
  
  describe('ErrorsController', function() {
    var router,
        dispatcher,
        layout,
        composer;

    beforeEach(function() {
      router = new Chaplin.Router();
      routes(router.match);
      dispatcher = new Chaplin.Dispatcher({
        controllerSuffix: '-controller'
      });
      layout = new Chaplin.Layout();
      composer = new Chaplin.Composer();
    });
    afterEach(function() {
      dispatcher.dispose();
      router.dispose();
      composer.dispose();
      layout.dispose();
    });

    describe('#404()', function() {
      it('should render 404 view', function(done) {
        var callback = function(controller) {
          expect(controller.view).to.be.an(Errors404PageView);
          expect(Errors404PageView.prototype.autoRender).to.be(true);

          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);

          done();
        };
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);
        router.route({ url: '/404' });
      });
    });
    describe('#403()', function() {
      it('should render 403 view', function(done) {
        var callback = function(controller) {
          expect(controller.view).to.be.an(Errors403PageView);
          expect(Errors403PageView.prototype.autoRender).to.be(true);

          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);

          done();
        };
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);
        router.route({ url: '/403' });
      });
    });
    describe('#500()', function() {
      it('should render 500 view', function(done) {
        var callback = function(controller) {
          expect(controller.view).to.be.an(Errors500PageView);
          expect(Errors500PageView.prototype.autoRender).to.be(true);

          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);

          done();
        };
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);
        router.route({ url: '/500' });
      });
    });
  });
});