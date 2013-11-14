define([
  'expect',

  'chaplin',
  'mediator',
  'routes'
], function(expect, Chaplin, mediator, routes) {
  'use strict';
  
  describe('SessionsController', function() {
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

    describe('#signout()', function() {
      it('should call mediator #signout()', function(done) {
        var wasCalled = false,
            signout = mediator.signout,
            handler;

        mediator.signout = function() {
          mediator.signout = signout;
          wasCalled = true;
        };

        handler = function() {
          expect(wasCalled).to.be(true);
          done();
        };
        
        Chaplin.mediator.setHandler('router:route', handler);
        router.route({ url: '/signout' });
      });
      it('should redirect to pages#home', function(done) {
        var handler = function(routeName) {
          
          expect(routeName).to.be('pages#home');

          done();
        };

        Chaplin.mediator.setHandler('router:route', handler);
        router.route({ url: '/signout' });
      });
    });
  });
});