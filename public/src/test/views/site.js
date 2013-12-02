define([
  'expect',
  'views/layout',
  'views/site'
], function(expect, Layout, SiteView) {
  'use strict';
  
  describe('SiteView', function() {
    var layout,
        siteView;

    beforeEach(function() {
      layout = new Layout();
      siteView = new SiteView();
    });
    afterEach(function() {
      siteView.dispose();
      layout.dispose();
    });

    describe('#regions', function() {
      it('should have ids on render', function() {
        expect(siteView.template).to.match(/id="messages-container"/);
        expect(siteView.template).to.match(/id="header-container"/);
        expect(siteView.template).to.match(/id="main-container"/);
        expect(siteView.template).to.match(/id="footer-container"/);
      });
    });
    describe('#template', function() {
      it('should render template', function() {
        expect(siteView.template).
          to.be(require('text!views/templates/site.ejs'));
      });
    });
  });
});