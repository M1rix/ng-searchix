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
      scope: true,  // Create isolate scope to inherit from parent
      controller: 'SearchixDialogController',
      controllerAs: '$ctrl',
      bindToController: false  // Don't bind to controller, use scope inheritance
    };
  }

  // Register directive
  angular
    .module('ngSearchixLegacy')
    .directive('ngxSearchixDialog', SearchixDialogDirective);

})(window.angular);
