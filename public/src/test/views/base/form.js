define([
  'expect'
], function(expect) {
  'use strict';
  
  describe('FormView', function() {
    describe('#getTemplateData()', function() {
      it('should collect template data', function() {
      });
    });
    describe('#listen', function() {
      it('should call #render() on signinStatus', function() {
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
      });
    });
    describe('#events', function() {
      it('should call #dismiss() on click [data-action=cancel]', function() {
      });
      it('should call #submit() on click [data-action=submit]', function() {
      });
      it('should call #submit() on form submit', function() {
      });
    });
    describe('#render()', function() {
      it('should reset template data', function() {
      });
    });
    describe('#publishSave()', function() {
      it('should publish save event', function() {
      });
      it('should throw error if not save event', function() {
      });
    });
    describe('#dismiss()', function() {
      it('should be called if cancel button click', function() {
      });
      it('should dispose view', function() {
      });
    });
    describe('#save()', function() {
      it('should save model', function() {
      });
      it('should call #publishSave() after done', function() {
      });
      it('should call #dismiss() after done', function() {
      });
    });
    describe('#submit()', function() {
      it('should check validity', function() {
      });
      it('should call #disableActions()', function() {
      });
      it('should call #save()', function() {
      });
    });
    describe('#changedAttribute()', function() {
      it('should check validity', function() {
      });
      it('should submit if meta key and key 13 pressed', function() {
      });
      it('should set attribute to model', function() {
      });
    });
    describe('#disableActions()', function() {
      it('should disable actions', function() {
      });
    });
  });
});