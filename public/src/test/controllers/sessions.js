define([
  'expect',

  'chaplin',
  'routes'
], function(expect, Chaplin, routes) {
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
      it('should publishEvent auth:setToken', function(done) {
        var callback = function(token) {
          expect(token).to.be(null);

          Chaplin.mediator.unsubscribe('auth:setToken', callback);

          done();
        };

        Chaplin.mediator.subscribe('auth:setToken', callback);

        Chaplin.mediator.setHandler('router:route', function() {});
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
      it('should publishEvent auth:setToken', function(done) {
        var callback = function(token) {
          Chaplin.mediator.unsubscribe('signout', callback);

          done();
        };

        Chaplin.mediator.subscribe('signout', callback);

        Chaplin.mediator.setHandler('router:route', function() {});
        router.route({ url: '/signout' });
      });
    });
  });
});