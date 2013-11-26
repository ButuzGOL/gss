define([
  'expect',

  'chaplin',
  'config/routes',
  'views/pages/home-page-view'
], function(expect, Chaplin, routes, PagesHomePageView) {
  'use strict';
  
  describe('PagesController', function() {
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

    describe('#home()', function() {
      it('should render home page view', function(done) {
        var callback = function(controller) {
          expect(controller.view).to.be.an(PagesHomePageView);
          expect(PagesHomePageView.prototype.autoRender).to.be(true);
          
          Chaplin.mediator.unsubscribe('dispatcher:dispatch', callback);

          done();
        };
        Chaplin.mediator.subscribe('dispatcher:dispatch', callback);
        router.route({ url: '/' });
      });
    });
  });
});