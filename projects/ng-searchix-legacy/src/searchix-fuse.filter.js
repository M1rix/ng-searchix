/**
 * Searchix Fuse Filter - Creates fuzzy search filter using Fuse.js
 */

(function(angular) {
  'use strict';

  createFuseFilterFactory.$inject = [];

  function createFuseFilterFactory() {
    return function createFuseFilter(options) {
      var fuse = null;

      return function filter(query, items) {
        if (!query) return items;

        // Get Fuse constructor at runtime
        var Fuse = window.Fuse;

        // Check if Fuse.js is available
        if (typeof Fuse === 'undefined') {
          console.error('[ng-searchix-legacy] Fuse.js is not loaded. Please include Fuse.js before ng-searchix-legacy. Falling back to simple search.');

          // Fallback to simple contains matching
          var q = query.toLowerCase();
          return items.filter(function(item) {
            var title = (item.title || '').toLowerCase();
            var subtitle = (item.subtitle || '').toLowerCase();
            return title.indexOf(q) !== -1 || subtitle.indexOf(q) !== -1;
          });
        }

        // Reinitialize fuse if items changed
        if (!fuse || fuse.getIndex().toJSON().records.length !== items.length) {
          var defaultOptions = {
            keys: ['title', 'subtitle'],
            threshold: 0.35,
            ignoreLocation: true
          };

          // Merge user options with defaults
          var fuseOptions = angular.extend({}, defaultOptions, options || {});
          fuse = new Fuse(items, fuseOptions);
        }

        return fuse.search(query).map(function(result) {
          return result.item;
        });
      };
    };
  }

  // Register factory
  angular
    .module('ngSearchixLegacy')
    .factory('createFuseFilter', createFuseFilterFactory);

})(window.angular);
