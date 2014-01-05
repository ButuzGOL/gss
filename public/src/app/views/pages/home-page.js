/**
 * Home page module
 *
 * @module views/pages/home-page
 */
define([
  'views/base/page',
  'views/sessions/new-form',
  'models/user',
  'text!views/templates/pages/home-page.ejs'
], function(PageView, SessionsNewFormView, User, template) {
  'use strict';

  /**
   *  Home page view class
   *
   * @class PagesHomePageView
   * @constructor
   * @extends PageView
   */
  var PagesHomePageView = PageView.extend({
    /** 
     * @property id
     * @type {string}
     */
    id: 'pages-home-page',
    /** 
     * @property autoRender
     * @type {boolean}
     */
    autoRender: true,
    /** 
     * @property template
     * @type {string}
     */
    template: template,
    /** 
     * @property regions
     * @type {object}
     */
    regions: {
      'sessions-new-form': '#sessions-new-form-container'
    },
    /**
     * Adding additional action
     * calling for creating sessions new form
     *
     * @method render
     */
    render: function() {
      PageView.prototype.render.apply(this, arguments);
      this.createSessionsNewForm();
    },
    /**
     * Creating sessions new form subview
     *
     * @method createSessionsNewForm
     */
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
    /**
     * Additional to disposing
     * clearing user
     *
     * @method dispose
     */
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
