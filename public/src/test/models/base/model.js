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

    describe('#ajax()', function() {
      var ajax,
          type = 'POST',
          url = '/request';

      beforeEach(function() {
        ajax = model.ajax(type, url, {});
        ajax.abort();
      });

      it('should return deferred object', function() {
        expect(ajax.promise).to.be.an('function');
      });
      it('should set arguments', function(done) {
        ajax.always(function() {
          expect(this.type).to.be(type);
          expect(this.url).to.match(new RegExp(url));
          expect(this.data).to.be('');

          done();
        });
      });
      it('should modify url', function(done) {
        ajax.always(function() {
          expect(this.url).to.be(model.apiRoot + url);
          
          done();
        });
      });
    });
  });
});