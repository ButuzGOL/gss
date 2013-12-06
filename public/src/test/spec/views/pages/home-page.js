define([
  'expect',
  'chaplin',
  'views/layout',
  'views/site',
  'models/user',
  'views/base/page',
  'views/pages/home-page',
  'views/sessions/new-form'
], function(expect, Chaplin, Layout, SiteView, User, PageView,
  PagesHomePageView, SessionsNewFormView) {
  'use strict';
  
  describe('PagesHomePageView', function() {
    var layout,
        siteView,
        pagesHomePageView;

    beforeEach(function() {
      layout = new Layout();
      siteView = new SiteView();
    });
    afterEach(function() {
      if (pagesHomePageView) {
        pagesHomePageView.dispose();
      }
      siteView.dispose();
      layout.dispose();
    });

    describe('#template', function() {
      it('should render template', function() {
        PagesHomePageView.prototype.autoRender = false;
        pagesHomePageView = new PagesHomePageView();
        PagesHomePageView.prototype.autoRender = true;
        
        expect(pagesHomePageView.template).
          to.be(require('text!views/templates/pages/home-page.ejs'));
      });
    });
    describe('#autoRender', function() {
      it('should be auto render', function() {
        expect(PagesHomePageView.prototype.autoRender).to.be(true);
      });
    });
    describe('#regions', function() {
      it('should have ids on render', function() {
        PagesHomePageView.prototype.autoRender = false;
        pagesHomePageView = new PagesHomePageView();
        PagesHomePageView.prototype.autoRender = true;
        expect(pagesHomePageView.template).to.
          match(/id="sessions-new-form-container"/);
      });
    });
    describe('#render()', function() {
      it('should call parent #render() and call #createSessionsNewForm()',
        function() {
          var wasCalledTimes = 0,
              render = PageView.prototype.render,
              createSessionsNewForm =
                PagesHomePageView.prototype.createSessionsNewForm;
        
          PageView.prototype.render = function() {
            wasCalledTimes++;
          };

          PagesHomePageView.prototype.createSessionsNewForm = function() {
            wasCalledTimes++;
          };
          
          pagesHomePageView = new PagesHomePageView();
          PageView.prototype.render = render;
          PagesHomePageView.prototype.createSessionsNewForm =
            createSessionsNewForm;
          expect(wasCalledTimes).to.be(2);
        }
      );
    });
    describe('#createSessionsNewForm()', function() {
      it('should dispose old user if exists', function(done) {
        var dispose = User.prototype.dispose;

        User.prototype.dispose = function() {
          User.prototype.dispose = dispose;
          done();
        };

        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.user = new User();
        pagesHomePageView.createSessionsNewForm();
      });
      it('should have user', function() {
        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.createSessionsNewForm();

        expect(pagesHomePageView.user).to.be.a(User);
      });
      it('should create new sessions form subview with attributes and' +
        ' add it to subviews',
        function() {
          pagesHomePageView = new PagesHomePageView();
          pagesHomePageView.createSessionsNewForm();

          expect(pagesHomePageView.subview('sessionsNewForm').model).to.be.
            a(User);
          expect(pagesHomePageView.subview('sessionsNewForm').region).to.
            be('sessions-new-form');
            
          expect(pagesHomePageView.subview('sessionsNewForm')).to.be.
            a(SessionsNewFormView);
        }
      );
      it('should on dispose call #createSessionsNewForm()', function(done) {
        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.createSessionsNewForm();

        pagesHomePageView.createSessionsNewForm = function() {
          done();
        };
        pagesHomePageView.subview('sessionsNewForm').trigger('dispose');
      });
    });
    describe('#dispose()', function() {
      it('should if disposed return', function() {
        var wasCalled = false,
            dispose = PageView.prototype.dispose;

        PageView.prototype.dispose = function() {
          wasCalled = true;
        };

        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.disposed = true;
        pagesHomePageView.dispose();
        PageView.prototype.dispose = dispose;

        expect(wasCalled).to.be(false);
      });
      it('should dispose user if exists', function(done) {
        var dispose = User.prototype.dispose;

        User.prototype.dispose = function() {
          User.prototype.dispose = dispose;
          done();
        };

        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.user = new User();
        pagesHomePageView.dispose();
      });
      it('should call parent #dispose()', function(done) {
        var dispose = PageView.prototype.dispose;

        PageView.prototype.dispose = function() {
          PageView.prototype.dispose = dispose;
          done();
        };

        pagesHomePageView = new PagesHomePageView();
        pagesHomePageView.dispose();
      });
    });
  });
});