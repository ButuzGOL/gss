define([
  'expect',
  'underscore',

  'models/base/model',
  'config/application',
  'lib/utils'
], function(expect, _, Model, applicationConfig, utils) {
  'use strict';
  
  describe('Model', function() {
    var model;

    beforeEach(function() {
      model = new Model();
    });
    afterEach(function() {
      model.dispose();
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
          return '/test';
        };

        expect(model.urlRoot()).to.be(model.apiRoot + model.urlPath());
      });
      it('should throw error', function() {
        expect(_.bind(model.urlRoot, model)).to
          .throwError(/Model must redefine urlPath/);
      });
    });

    describe('#ajax()', function() {
      it('should call utils #ajax() with modified url and arguments',
        function(done) {
          var ajax = utils.ajax,
              url = '/test',
              method = 'POST',
              data = { test: 'test' };

          utils.ajax = function() {
            expect(arguments[0]).to.be(model.apiRoot + url);
            expect(arguments[1]).to.be(method);
            expect(arguments[2]).to.be(data);

            utils.ajax = ajax;

            done();
          };

          model.ajax(url, method, data);
        }
      );
    });
  });
});