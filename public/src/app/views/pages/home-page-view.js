define([
  'views/base/page-view',
  'views/sessions/new-form-view',
  'models/user',
  'text!views/templates/pages/home-page.jade'
], function(PageView, SessionsNewFormView, User, template) {
  'use strict';

  var PagesHomePageView = PageView.extend({
    id: 'pages-home-page-view',
    autoRender: true,
    template: template,
    regions: {
      'sessions-new-form': '#sessions-new-form-container'
    },
    render: function() {
      PageView.prototype.render.apply(this, arguments);
      this.createSessionsNewForm();
    },
    createSessionsNewForm: function() {
      var _this = this,
          sessionsNewForm;
      
      if (this.user) {
        this.user.dispose();
      }
      this.user = new User();

      sessionsNewForm = new SessionsNewFormView({
        model: this.user,
        region: 'sessions-new-form'
      });

      sessionsNewForm.on('dispose', function() {
        _this.createSessionsNewForm();
      });

      this.subview('sessionsNewForm', sessionsNewForm);
    },
    dispose: function() {
      if (this.disposed) {
        return;
      }

      if (this.user) {
        this.user.dispose();
      }
      
      PageView.prototype.dispose.apply(this, arguments);
    }
  });

  return PagesHomePageView;
});
