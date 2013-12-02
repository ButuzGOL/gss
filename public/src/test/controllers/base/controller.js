define([
  'expect',
  'jquery',
  
  'chaplin',
  'config/routes',
  'config/application',
  'controllers/base/controller'
], function(expect, $, Chaplin, routes, applicationConfig, Controller) {
  'use strict';
  
  describe('Controller', function() {
    var router,
        dispatcher,
        layout,
        composer;

    beforeEach(function() {
      router = new Chaplin.Router();
      routes(router.match);
      dispatcher = new Chaplin.Dispatcher({
        controllerSuffix: applicationConfig.controllerSuffix
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

    describe('#beforeAction()', function() {
      it('should publish event controller:actionStart', function(done) {
        var callback = function() {
          Chaplin.mediator.unsubscribe('controller:actionStart', callback);
          done();
        };

        Chaplin.mediator.subscribe('controller:actionStart', callback);
        router.route({ url: '/' });
      });
      it('should redirect to 505 on application error', function(done) {
        var callback = function(controller, params, route) {
          expect(route.name).to.be('errors#500');

          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);
          Chaplin.mediator.applicationError = false;
        
          done();
        };
        Chaplin.mediator.applicationError = true;
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);
        router.route({ url: '/' });
      });
      it('should make composition', function(done) {
        var callback = function() {
          expect(composer.compositions).to.only.have.keys('site', 'messages',
            'header', 'footer');
          
          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);
          
          done();
        };
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);

        router.route({ url: '/' });
      });
      it('should call #afterAction() if no ajax', function(done) {
        var afterAction = Controller.prototype.afterAction;

        Controller.prototype.afterAction = function() {
          Controller.prototype.afterAction = afterAction;
          done();
        };

        router.route({ url: '/' });
      });
      it('should not call #afterAction() if ajax', function(done) {
        var afterAction = Controller.prototype.afterAction;

        Controller.prototype.afterAction = function() {
          Controller.prototype.afterAction = afterAction;

          expect($.active).to.be(0);

          done();
        };

        router.route({ url: '/' });
      });
    });
    describe('#afterAction()', function() {
      it('should publish event controller:actionDone', function(done) {
        var callback = function() {
          
          Chaplin.mediator.unsubscribe('controller:actionDone', callback);
          
          done();
        };
        Chaplin.mediator.subscribe('controller:actionDone', callback);

        router.route({ url: '/' });
      });
    });
  });
});