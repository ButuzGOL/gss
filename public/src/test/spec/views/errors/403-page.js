define([
  'expect',
  'views/errors/403-page'
], function(expect, Errors403PageView) {
  'use strict';
  
  describe('Errors403PageView', function() {
    describe('#template', function() {
      it('should render template', function() {
        Errors403PageView.prototype.autoRender = false;
        var errors403pageView = new Errors403PageView();
        Errors403PageView.prototype.autoRender = true;

        expect(errors403pageView.template).
          to.be(require('text!views/templates/errors/403-page.ejs'));
        
        errors403pageView.dispose();

        
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(Errors403PageView.prototype.autoRender).to.be(true);
      });
    });
  });
});