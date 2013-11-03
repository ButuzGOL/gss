define([
  'expect',
  'jquery',
  
  'chaplin',

  'views/base/form-view',
  'models/user'
], function(expect, $, Chaplin, FormView, User) {
  'use strict';
  
  describe('FormView', function() {
    var formView;
    
    afterEach(function() {
      if (formView) {
        formView.dispose();
      }
    });

    describe('#tagName', function() {
      it('should be form', function() {
        expect(FormView.prototype.tagName).to.be('form');
      });
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
      it('should call #submit() on form submit', function(done) {
        var submit = FormView.prototype.submit;

        FormView.prototype.submit = function(event) {
          event.preventDefault();

          FormView.prototype.submit = submit;

          done();
        };

        formView = new FormView();

        formView.template =
          '<input type="button" data-action="submit" />';
        formView.render();
        formView.$el.trigger('submit');
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
      it('should check validity', function() {
        var wasCalled = false,
            save = FormView.prototype.save;

        FormView.prototype.save = function() {
          FormView.prototype.save = save;
          
          wasCalled = true;
        };

        formView = new FormView();
        formView.template =
          '<input type="text" required="required" />';
        formView.render();
        formView.$el.trigger('submit');

        expect(wasCalled).to.be(false);
      });
      it('should call #showLoader()', function(done) {
        var showLoader = FormView.prototype.showLoader;

        FormView.prototype.showLoader = function() {
          FormView.prototype.showLoader = showLoader;

          done();
        };

        formView = new FormView();
        formView.template =
          '<input type="text" value="test" required="required" />';
        formView.render();

        formView.$el.trigger('submit');
      });
      it('should call #disableActions()', function(done) {
        var disableActions = FormView.prototype.disableActions;

        FormView.prototype.disableActions = function() {
          FormView.prototype.disableActions = disableActions;

          done();
        };

        formView = new FormView();
        formView.template =
          '<input type="text" value="test" required="required" />';
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
          '<input type="text" value="test" required="required" />';
        formView.render();

        formView.$el.trigger('submit');
      });
    });
    describe('#changedAttribute()', function() {
      it('should check validity', function() {
        var wasCalled = false,
            user = new User();
        
        user.on('change:test', function() {
          wasCalled = true;
        });

        formView = new FormView({ model: user });

        formView.template =
          '<input type="text" name="test" required="required" />';
        formView.render();

        $('[name=test]', formView.$el).trigger('keyup');

        expect(wasCalled).to.be(false);
          
        user.dispose();
      });
      it('should submit if meta key and key 13 pressed', function(done) {
        var submit = FormView.prototype.submit,
            event;

        FormView.prototype.submit = function(event) {
          event.preventDefault();

          FormView.prototype.submit = submit;

          done();
        };

        formView = new FormView();

        formView.template =
          '<input type="text" name="test" />';
        formView.render();
        
        event = $.Event('keydown');
        event.metaKey = true;
        event.keyCode = 13;

        $('[name=test]', formView.$el).trigger(event);
      });
      it('should set attribute to model', function(done) {
        var user = new User();
        user.on('change:test', function() {
          user.dispose();
          done();
        });

        formView = new FormView({ model: user });

        formView.template =
          '<input type="text" value="test" name="test" />';
        formView.render();
        
        $('[name=test]', formView.$el).trigger('keyup');
      });
    });
    describe('#disableActions()', function() {
      it('should disable actions', function() {
        formView = new FormView();
        formView.template =
          '<input type="text" />' +
          '<button></button>' +
          '<select></select>' +
          '<textarea></textarea>';
        formView.render();

        formView.disableActions();
        
        expect($('input, button, textarea, select', formView.$el).
          prop('disabled')).to.be(true);
      });
    });
    describe('#showLoader()', function() {
      it('should show loader', function() {
        formView = new FormView();
        formView.template = '<div class="ui small inline loader"></div>';
        formView.render();

        formView.showLoader();

        expect($(formView.loaderSelector, formView.$el).hasClass('active')).
          to.be(true);
      });
    });
  });
});