define([
  'require',
  'expect',

  'chaplin',
  'config/routes',
  'helpers/application-helper'
], function(require, expect, Chaplin, routes, applicationHelper) {
  'use strict';
  
  describe('ApplicationHelper', function() {
    describe('#redirectTo()', function() {
      it('should call chaplin helper method #redirectTo()', function(done) {
        var redirectTo = Chaplin.helpers.redirectTo;

        Chaplin.helpers.redirectTo = function() {
          Chaplin.helpers.redirectTo = redirectTo;
        
          done();
        };

        applicationHelper.redirectTo('pages#home');
      });
    });
    describe('#url()', function() {
      var router;

      before(function() {
        router = new Chaplin.Router();
        routes(router.match);
      });
      after(function() {
        router.dispose();
      });

      it('should make url', function() {
        expect(applicationHelper.url('pages#home')).to.be('/');
        expect(applicationHelper.url('pages#show', 'home')).to.
          be('/pages/home');
      });
    });
    describe('#render()', function() {
      it('should render template', function(done) {
        require(['views/base/view'], function() {
          var template = applicationHelper.
            render('shared/form-error-messages', { errorMessages: ['Test'] });
          
          expect(template).to.match(/Test/);
      
          done();
        });
      });
    });
  });
});