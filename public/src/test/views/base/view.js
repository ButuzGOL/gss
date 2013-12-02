define([
  'expect',

  'underscore',
  'i18n',
  'chaplin',

  'models/user',
  'views/base/view'
], function(expect, _, i18n, Chaplin, User, View) {
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
      it('should return ejs compile function if template string', function() {
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
        Chaplin.mediator.user = new User();
        
        expect(view.getTemplateData()).to.have.key('currentUser');
        
        Chaplin.mediator.user = null;
      });
      it('should collect template data', function() {
        var object = Chaplin.View.prototype.getTemplateData();

        expect(view.getTemplateData()).to.eql(_.defaults(object,
          { _: _ },
          { i18n: i18n },
          require('helpers/application-helper'),
          require('helpers/sessions-helper')
        ));
      });
    });
    it('should include partial templates', function() {
      expect(require('text!views/templates/shared/form-error-messages.ejs')).
        to.be.a('string');
    });
  });
});