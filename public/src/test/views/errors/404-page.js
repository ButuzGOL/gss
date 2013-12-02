define([
  'expect',
  'views/errors/404-page-view'
], function(expect, Errors404PageView) {
  'use strict';
  
  describe('Errors404PageView', function() {
    describe('#template', function() {
      it('should render template', function() {
        Errors404PageView.prototype.autoRender = false;
        var errors404pageView = new Errors404PageView();
        Errors404PageView.prototype.autoRender = true;

        expect(errors404pageView.template).
          to.be(require('text!views/templates/errors/404-page.ejs'));
        
        errors404pageView.dispose();

        
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(Errors404PageView.prototype.autoRender).to.be(true);
      });
    });
  });
});