define([
  'expect',
  'views/errors/500-page'
], function(expect, Errors500PageView) {
  'use strict';
  
  describe('Errors500PageView', function() {
    describe('#template', function() {
      it('should render template', function() {
        Errors500PageView.prototype.autoRender = false;
        var errors500pageView = new Errors500PageView();
        Errors500PageView.prototype.autoRender = true;
        
        expect(errors500pageView.template).
          to.be(require('text!views/templates/errors/500-page.ejs'));
        
        errors500pageView.dispose();
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(Errors500PageView.prototype.autoRender).to.be(true);
      });
    });
  });
});