define([
  'expect',
  'underscore',
  'jquery',
  'mediator',

  'models/base/model',
  'config/application',
  'lib/utils'
], function(expect, _, $, mediator, Model, applicationConfig, utils) {
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

    describe('#urlPath', function() {
      it('should return empty string', function() {
        expect(model.urlPath).to.be('');
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

    describe('#urlParams()', function() {
      context('when access token exists', function() {
        it('should take it from mediator user', function() {
          mediator.createUser();
          mediator.user.set('accessToken', 'test');

          expect(model.urlParams()).to.eql({
            'access_token': mediator.user.get('accessToken')
          });

          mediator.removeUser();
        });
      });

      context('when access token not exists', function() {
        it('should return empty object', function() {
          expect(model.urlParams()).to.be.empty();
        });
      });
    });

    describe('#url()', function() {
      context('when payload exists', function() {
        it('should merge #urlRoot() with payload by ?', function() {
          var url = '/test',
              params = { test: 'test' };

          model.urlPath = url;
          model.urlParams = function() {
            return params;
          };

          expect(model.url()).to.
            be(applicationConfig.api.root + url + '?' + $.param(params));
        });
        it('should merge #urlRoot() with payload by &', function() {
          var url = '/test?test1=test1',
              params = { test: 'test' };

          model.urlPath = url;
          model.urlParams = function() {
            return params;
          };

          expect(model.url()).to.
            be(applicationConfig.api.root + url + '&' + $.param(params));
        });
      });

      context('when payload not exists', function() {
        it('should return #urlRoot()', function() {
          var url = '/test',
              params = {};

          model.urlPath = url;
          model.urlParams = function() {
            return params;
          };

          expect(model.url()).to.be(applicationConfig.api.root + url);
        });
      });
    });
  });
});