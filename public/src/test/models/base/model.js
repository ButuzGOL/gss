define([
  'expect',
  'underscore',

  'models/base/model',
  'config/application'
], function(expect, _, Model, applicationConfig) {
  'use strict';
  
  describe('Model', function() {
    var model;

    beforeEach(function() {
      model = new Model();
    });

    describe('#apiRoot', function() {
      it('should return api root from config', function() {
        expect(model.apiRoot).to.be(applicationConfig.api.root);
      });
    });

    describe('#urlPath()', function() {
      it('should return empty string', function() {
        expect(model.urlPath()).to.be('');
      });
    });

    describe('#urlRoot()', function() {
      it('should return apiRoot + urlPath()', function() {
        model.urlPath = function() {
          return '/request';
        };

        expect(model.urlRoot()).to.be(model.apiRoot + model.urlPath());
      });
      it('should throw error', function() {
        expect(_.bind(model.urlRoot, model)).to
          .throwError(/Model must redefine urlPath/);
      });
    });
  });
});