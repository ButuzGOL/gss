define([
  'expect',
  'jquery',
  'underscore',

  'chaplin',

  'views/base/form-view'
], function(expect, $, _, Chaplin, FormView) {
  'use strict';
  
  describe('FormView', function() {
    var formView;
    
    afterEach(function() {
      if (formView) {
        formView.dispose();
      }
    });

    describe('#getTemplateData()', function() {
      it('should collect template data', function() {
        formView = new FormView();
        expect(formView.getTemplateData()).to.have.key('errorMessages');
      });
    });
    describe('#listen', function() {
      it('should call #render() on signinStatus', function(done) {
        var render = FormView.prototype.render;
        
        FormView.prototype.render = function() {
          FormView.prototype.render = render;

          done();
        };
        
        formView = new FormView();
        
        Chaplin.mediator.publish('signinStatus');
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(FormView.prototype.autoRender).to.be(true);
      });
    });
    describe('#events', function() {
      it('should call #dismiss() on click [data-action=cancel]', function(done) {
        var dismiss = FormView.prototype.dismiss;

        FormView.prototype.dismiss = function() {
          FormView.prototype.dismiss = dismiss;

          done();
        };

        formView = new FormView();

        formView.template = '<input type="button" data-action="cancel" />';
        formView.render();
        $('[data-action=cancel]', formView.$el).trigger('click');
      });
      it('should call #submit() on click [data-action=submit]', function(done) {
        var submit = FormView.prototype.submit;

        FormView.prototype.submit = function() {
          FormView.prototype.submit = submit;

          done();
        };

        formView = new FormView();

        formView.template = '<input type="button" data-action="submit" />';
        formView.render();
        $('[data-action=submit]', formView.$el).trigger('click');
      });
      it('should call #submit() on form submit', function() {
      });
    });
    describe('#render()', function() {
      it('should reset template data', function() {
        formView = new FormView();

        formView.errorMessages.push('Test');
        formView.render();

        expect(formView.errorMessages).to.be.empty();
      });
    });
    describe('#publishSave()', function() {
      it('should publish save event', function(done) {
        var callback = function() {
          Chaplin.mediator.unsubscribe('save', callback);
        
          done();
        };

        formView = new FormView();
        formView.saveEvent = 'save';

        Chaplin.mediator.subscribe('save', callback);

        formView.publishSave();
      });
      it('should throw error if not save event', function() {
        formView = new FormView();
        expect(formView.publishSave).to.
          throwError(/FormView must have saveEvent defined/);
      });
    });
    describe('#dismiss()', function() {
      it('should call #dispose()', function(done) {
        var dispose = FormView.prototype.dispose;

        FormView.prototype.dispose = function() {
          FormView.prototype.dispose = dispose;

          done();
        };

        formView = new FormView();
        formView.dismiss();
      });
    });
    // describe('#save()', function() {
    //   it('should save model', function() {
    //   });
    //   it('should call #publishSave() after done', function() {
    //   });
    //   it('should call #dismiss() after done', function() {
    //   });
    // });
    describe('#submit()', function() {
      it('should check validity', function(done) {
        var wasCalled = false,
            save = FormView.prototype.save;

        FormView.prototype.save = function() {
          FormView.prototype.save = save;
          
          wasCalled = true;
        };

        formView = new FormView();
        formView.template =
          '<form><input type="text" required="required" /></form>';
        formView.render();
        formView.$el.trigger('submit');

        _.delay(function() {
          expect(wasCalled).to.be(false);

          done();
        }, 100);
      });
      it('should call #disableActions()', function(done) {
        var disableActions = FormView.prototype.disableActions;

        FormView.prototype.disableActions = function() {
          FormView.prototype.disableActions = disableActions;

          done();
        };

        formView = new FormView();
        formView.template =
          '<form><input type="text" value="test" required="required" />' +
          '</form>';
        formView.render();

        formView.$el.trigger('submit');
      });
      it('should call #save()', function(done) {
        var save = FormView.prototype.save;

        FormView.prototype.save = function() {
          FormView.prototype.save = save;

          done();
        };

        formView = new FormView();
        formView.template =
          '<form><input type="text" value="test" required="required" />' +
          '</form>';
        formView.render();

        formView.$el.trigger('submit');
      });
    });
    // describe('#changedAttribute()', function() {
    //   it('should check validity', function() {
    //   });
    //   it('should submit if meta key and key 13 pressed', function() {
    //   });
    //   it('should set attribute to model', function() {
    //   });
    // });
    // describe('#disableActions()', function() {
    //   it('should disable actions', function() {
    //   });
    // });
  });
});