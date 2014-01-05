/**
 * Application helper module
 *
 * @module helpers/application
 */
define([
  'require',
  'ejs',
  'chaplin'
], function(require, ejs, Chaplin) {
  'use strict';
  
  /**
   * Application helper object
   * Consist of app help functions can be used in any place
   *
   * @class applicationHelper
   * @static
   */
  return {
    /**
     * Building url on routes
     *
     * @method url
     * @param {string} routeName - depends on config/routes
     * @see Chaplin.helpers.reverse
     */
    url: function(routeName) {
      var params = [].slice.call(arguments, 1);
      
      return Chaplin.helpers.reverse(routeName, params);
    },
    /**
     * Make redirect to another route
     *
     * @method redirectTo
     * @see Chaplin.helpers.redirectTo
     */
    redirectTo: function() {
      Chaplin.helpers.redirectTo.apply(this, arguments);
    },
    /**
     * Rendering template based on path and data
     * Tempate should be required before using here so 
     * require won't be async
     *
     * @method render
     * @param {string} path - get template by this path
     * @param {object} data - object with data to render
     */
    render: function(path, data) {
      var template = require('text!views/templates/' + path + '.ejs');
      return ejs.compile(template)(data);
    }
  };

});
