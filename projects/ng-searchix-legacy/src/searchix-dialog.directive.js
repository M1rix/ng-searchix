/**
 * Searchix Dialog Directive
 */

(function(angular) {
  'use strict';

  SearchixDialogDirective.$inject = [];

  function SearchixDialogDirective() {
    return {
      restrict: 'A',
      templateUrl: 'ngx-searchix/dialog.html',
      scope: false
    };
  }

  // Register directive
  angular
    .module('ngSearchixLegacy')
    .directive('ngxSearchixDialog', SearchixDialogDirective);

})(window.angular);
