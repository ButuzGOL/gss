define([
  'expect',
  'views/errors/403-page-view'
], function(expect, Errors403PageView) {
  'use strict';
  
  describe('Errors403PageView', function() {
    describe('#template', function() {
      it('should render template', function() {
        Errors403PageView.prototype.autoRender = false;
        
        var errors403pageView = new Errors403PageView();
        
        expect(errors403pageView.template).
          to.be(require('text!views/templates/errors/403-page.jade'));
        
        errors403pageView.dispose();

        Errors403PageView.prototype.autoRender = true;
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(Errors403PageView.prototype.autoRender).to.be(true);
      });
    });
  });
});