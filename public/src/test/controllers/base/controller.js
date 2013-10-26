define([
  // 'expect',
  // 'sinon',
  
  'chaplin',
  'controllers/base/controller',
  'controllers/pages-controller',
  'controllers/errors-controller',
  'routes'
], function(/*expect, sinon,*/ Chaplin,
  Controller, PagesController, ErrorsController, routes) {
  'use strict';
  
  describe('Controller', function() {
    var router,
        dispatcher,
        layout,
        composer,
        dispatchCallback,
        actionStartCallback;

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
      dispatcher = null;
      router.dispose();
      composer.dispose();
      layout.dispose();
      Chaplin.mediator.applicationError = false;
      Chaplin.mediator.unsubscribe('dispatcher:dispatch', dispatchCallback);
    });

    describe('#beforeAction()', function() {
      it('should publish event controller:actionStart', function() {
        // Chaplin.mediator.subscribe('controller:actionStart', function() {
        //   console.log('3');
        //   done();
        // });
        // console.log('1')
        // router.route({ url: '/' });
        // console.log('2')
        var spy = sinon.spy();
        Chaplin.mediator.subscribe('controller:actionStart', spy);
        console.log('1');
        router.route({ url: '/' });
        console.log('2');
        console.log(expect(spy).was);
        expect(spy).was.calledOnce();
        console.log('3');
      });
      // it('should redirect to 505 on application error', function(done) {
      //   Chaplin.mediator.applicationError = true;
      //   dispatchCallback = function(controller, params, route) {
      //     expect(route.name).to.be('errors#500');
      //     done();
      //   };
      //   Chaplin.mediator.subscribe('dispatcher:dispatch', dispatchCallback);
      //   router.route({ url: '/' });
      // });
      // it('should make composition', function(done) {
      //   dispatchCallback = function(controller, params, route) {
      //     expect(composer.composition).to.only.have.keys('site', 'messages',
      //       'header', 'footer');
      //     done();
      //   };
      //   Chaplin.mediator.subscribe('dispatcher:dispatch', dispatchCallback);
      //   router.route({ url: '/' });
      // });
    });
    describe('#afterAction()', function() {
      it('should publish event controller:actionDone', function() {
      });
    });
  });
});