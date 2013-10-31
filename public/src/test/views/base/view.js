define([
  'expect',
  
  'views/base/view'
], function(expect, View) {
  'use strict';
  
  describe('View', function() {
    var view;

    beforeEach(function() {
      view = new View();
    });
    afterEach(function() {
      view.dispose();
    });

    describe('#getTemplateFunction()', function() {
      it('should return jade compile function if template string', function() {
        view.template = 'Test';
        expect(view.getTemplateFunction()).to.be.an('function');
      });
      it('should return template if template not string', function() {
        view.template = function() {};
        expect(view.getTemplateFunction()).to.be(view.template);
      });
    });

    describe('#getTemplateData()', function() {
      it('should add user object if signed in', function() {
      });
      it('should collect template data', function() {
      });
    });
    it('should include partial templates', function() {
    });
  });
});