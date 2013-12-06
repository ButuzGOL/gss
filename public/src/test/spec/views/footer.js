define([
  'expect',
  'views/footer'
], function(expect, FooterView) {
  'use strict';
  
  describe('FooterView', function() {
    describe('#template', function() {
      it('should render template', function() {
        FooterView.prototype.autoRender = false;

        var footerView = new FooterView();
        
        expect(footerView.template).
          to.be(require('text!views/templates/footer.ejs'));
        
        footerView.dispose();

        FooterView.prototype.autoRender = true;
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(FooterView.prototype.autoRender).to.be(true);
      });
    });
    describe('#region', function() {
      it('should be in footer region', function() {
        expect(FooterView.prototype.region).to.be('footer');
      });
    });
  });
});