/**
 * Collection view module
 *
 * @module views/base/collection
 */
define([
  'chaplin',
  'views/base/view'
], function(Chaplin, View) {
  'use strict';

  /**
   * Base collection view class
   *
   * @class CollectionView
   * @constructor
   * @extends Chaplin.CollectionView
   */
  var CollectionView = Chaplin.CollectionView.extend({
    /** 
     * @method getTemplateFunction
     * @see View.getTemplateFunction()
     */
    getTemplateFunction: View.prototype.getTemplateFunction
  });

  return CollectionView;
});
