define([
  'expect',
  'views/header-view'
], function(expect, HeaderView) {
  'use strict';
  
  describe('HeaderView', function() {
    describe('#template', function() {
      it('should render template', function() {
        HeaderView.prototype.autoRender = false;
        
        var headerView = new HeaderView();
        
        expect(headerView.template).
          to.be(require('text!views/templates/header.ejs'));
        
        headerView.dispose();

        HeaderView.prototype.autoRender = true;
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(HeaderView.prototype.autoRender).to.be(true);
      });
    });
    describe('#region', function() {
      it('should be in header region', function() {
        expect(HeaderView.prototype.region).to.be('header');
      });
    });
  });
});