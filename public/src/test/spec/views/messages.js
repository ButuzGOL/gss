define([
  'expect',
  'underscore',
  'jquery',
  'chaplin',

  'views/layout',
  'views/site',

  'views/messages'
], function(expect, _, $, Chaplin, Layout, SiteView,  MessagesView) {
  'use strict';
  
  describe('MessagesView', function() {
    var layout,
        siteView,
        messagesView;

    beforeEach(function() {
      layout = new Layout();
      siteView = new SiteView();
    });
    afterEach(function() {
      if (messagesView) {
        messagesView.dispose();
      }
      siteView.dispose();
      layout.dispose();
    });

    describe('#template', function() {
      it('should render template', function() {
        MessagesView.prototype.autoRender = false;
        messagesView = new MessagesView();
        MessagesView.prototype.autoRender = true;

        expect(messagesView.template).
          to.be(require('text!views/templates/messages.ejs'));
      });
    });
    describe('#region', function() {
      it('should be in messages region', function() {
        expect(MessagesView.prototype.region).to.be('messages');
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(MessagesView.prototype.autoRender).to.be(true);
      });
    });
    describe('#constructor()', function() {
      it('should publish messagesView:ready', function(done) {
        var callback = function() {
          Chaplin.mediator.unsubscribe('messagesView:ready', callback);

          done();
        };

        Chaplin.mediator.subscribe('messagesView:ready', callback);

        messagesView = new MessagesView();
      });
    });
    describe('#listen', function() {
      it('should have keys and values', function() {
        expect(MessagesView.prototype.listen).to.have.
          property('errorHandler:throw mediator', 'addErrorMessagesAndRender');
      });
    });
    describe('#events', function() {
      it('should have keys and values', function() {
        expect(MessagesView.prototype.events).to.have.
          property('click [data-dissmis="alert"]', 'removeMessage');
      });
    });
    describe('#render()', function() {
      it('should make empty messages', function() {
        messagesView = new MessagesView();
        messagesView.messages = ['Test'];
        
        messagesView.render();
        expect(messagesView.messages).to.be.empty();
      });
    });
    describe('#getTemplateData()', function() {
      it('should add messages', function() {
        messagesView = new MessagesView();
        messagesView.messages = ['Test'];

        expect(messagesView.getTemplateData()).to.have.property('messages');
        expect(messagesView.getTemplateData().messages).to.eql(['Test']);
      });
    });
    describe('#addErrorMessagesAndRender()', function() {
      it('should call #addErrorMessage() messages length times', function() {
        var wasCalledTimes = 0,
            addErrorMessage = MessagesView.prototype.addErrorMessage;
        
        MessagesView.prototype.addErrorMessage = function() {
          wasCalledTimes++;
        };

        messagesView = new MessagesView();
        messagesView.addErrorMessagesAndRender([
          { message: 'Test' },
          { message: 'Test1' }
        ]);
        
        expect(wasCalledTimes).to.be(2);
        
        MessagesView.prototype.addErrorMessage = addErrorMessage;
      });
      it('should call #render()', function(done) {
        var render = MessagesView.prototype.render;

        MessagesView.prototype.render = function() {
          MessagesView.prototype.render = render;
          done();
        };

        MessagesView.prototype.autoRender = false;
        messagesView = new MessagesView();
        MessagesView.prototype.autoRender = true;

        messagesView.addErrorMessagesAndRender();
      });
    });
    describe('#addSuccessMessage()', function() {
      it('should add success message', function() {
        var message = { message: 'Test' };

        messagesView = new MessagesView();
        messagesView.addSuccessMessage(_.clone(message));
        message.type = 'success';
        expect(messagesView.messages).to.eql([message]);
      });
    });
    describe('#addErrorMessage()', function() {
      it('should add error message', function() {
        var message = { message: 'Test' };

        messagesView = new MessagesView();
        messagesView.addErrorMessage(_.clone(message));
        message.type = 'error';
        expect(messagesView.messages).to.eql([message]);
      });
    });
    describe('#addInfoMessage()', function() {
      it('should add info message', function() {
        var message = { message: 'Test' };

        messagesView = new MessagesView();
        messagesView.addInfoMessage(_.clone(message));
        message.type = 'info';
        expect(messagesView.messages).to.eql([message]);
      });
    });
    describe('#addWarningMessage()', function() {
      it('should add warning message', function() {
        var message = { message: 'Test' };

        messagesView = new MessagesView();
        messagesView.addWarningMessage(_.clone(message));
        message.type = 'warning';
        expect(messagesView.messages).to.eql([message]);
      });
    });
    describe('#addMessage()', function() {
      it('should add message with type', function() {
        var message = { message: 'Test' };
        
        messagesView = new MessagesView();
        messagesView.addMessage('error', _.clone(message));
        message.type = 'error';
        expect(messagesView.messages).to.eql([message]);
      });
      it('should add message without type', function() {
        var message = { message: 'Test', type: 'error' };
        
        messagesView = new MessagesView();
        messagesView.addMessage(_.clone(message));
        expect(messagesView.messages).to.eql([message]);
      });
    });
    describe('#removeMessage()', function() {
      it('should remove message from dom', function() {
        messagesView = new MessagesView();
        messagesView.template =
          '<div class="parent"><div data-dissmis="alert"></div></div>';
        messagesView.render();
        $('[data-dissmis="alert"]', messagesView.$el).trigger('click');
        expect($('.parent', messagesView.$el)).to.be.empty();
      });
    });
  });
});