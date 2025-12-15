/**
 * Searchix Component - Main trigger button
 */

(function(angular) {
  'use strict';

  function SearchixComponent() {
    return {
      templateUrl: 'ngx-searchix/searchix.html',
      bindings: {
        items: '<',              // SearchItem[]
        placeholder: '@?',       // string
        hotkey: '@?',           // string (e.g., 'ctrl+k')
        closeOnSelect: '<?',    // boolean
        showMs: '<?',           // boolean
        maxResults: '<?',       // number
        iconTemplate: '@?',     // template URL
        iconRenderer: '@?',     // template URL
        buttonTemplate: '@?',   // template URL
        emitOnExternalOpen: '<?', // boolean
        onItemSelected: '&?',   // callback(item)
        onOpened: '&?',         // callback()
        onClosed: '&?'          // callback()
      },
      controller: SearchixController
    };
  }

  SearchixController.$inject = ['$scope', '$element', '$document', 'searchixOverlay', 'searchixConfig'];

  function SearchixController($scope, $element, $document, searchixOverlay, searchixConfig) {
    var $ctrl = this;
    var defaults = searchixConfig.getDefaults();
    var subscription = null;

    // Lifecycle hooks
    $ctrl.$onInit = onInit;
    $ctrl.$onDestroy = onDestroy;

    // Public methods
    $ctrl.open = open;
    $ctrl.close = close;
    $ctrl.getHotkey = getHotkey;

    function onInit() {
      // Bind keyboard listener
      $document.on('keydown', onKeyDown);
    }

    function onDestroy() {
      $document.off('keydown', onKeyDown);
      if (subscription) {
        subscription();
        subscription = null;
      }
    }

    function open() {
      var config = {
        placeholder: $ctrl.placeholder || defaults.placeholder,
        hotkey: $ctrl.hotkey || defaults.hotkey,
        closeOnSelect: $ctrl.closeOnSelect !== undefined ? $ctrl.closeOnSelect : defaults.closeOnSelect,
        showMs: $ctrl.showMs !== undefined ? $ctrl.showMs : defaults.showMs,
        maxResults: $ctrl.maxResults || defaults.maxResults,
        iconRenderer: $ctrl.iconRenderer || defaults.iconRenderer,
        emitOnExternalOpen: $ctrl.emitOnExternalOpen !== undefined ? $ctrl.emitOnExternalOpen : defaults.emitOnExternalOpen
      };

      // Emit opened event
      if ($ctrl.onOpened) {
        $ctrl.onOpened();
      }

      // Unsubscribe from previous
      if (subscription) {
        subscription();
      }

      // Open overlay and subscribe to selection
      subscription = searchixOverlay.open($ctrl.items || [], config, function(item) {
        // On item selected
        if ($ctrl.onItemSelected) {
          $ctrl.onItemSelected({ $item: item });
        }
      }, function() {
        // On closed
        subscription = null;
        if ($ctrl.onClosed) {
          $ctrl.onClosed();
        }
      });
    }

    function close() {
      if (subscription) {
        subscription();
        subscription = null;
      }
      searchixOverlay.close();
      if ($ctrl.onClosed) {
        $ctrl.onClosed();
      }
    }

    function getHotkey() {
      return ($ctrl.hotkey || defaults.hotkey || 'Ctrl+K');
    }

    function onKeyDown(event) {
      var hk = ($ctrl.hotkey || defaults.hotkey || 'ctrl+k').toLowerCase();
      var connector = hk.replace(/\w/gm, '');
      var wantCtrl = hk.indexOf('ctrl') !== -1;
      var wantCmd = hk.indexOf('cmd') !== -1 || hk.indexOf('meta') !== -1;
      var keyParts = hk.split(connector);
      var key = keyParts[keyParts.length - 1];

      var pressedCtrl = event.ctrlKey;
      var pressedCmd = event.metaKey;

      var modOk = (wantCtrl && pressedCtrl) ||
                  (wantCmd && pressedCmd) ||
                  (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));

      if (modOk && key && event.key.toLowerCase() === key) {
        event.preventDefault();
        $scope.$apply(function() {
          if (searchixOverlay.isOpen()) {
            $ctrl.close();
          } else {
            $ctrl.open();
          }
        });
      }
    }
  }

  // Export component factory
  angular
    .module('ngSearchixLegacy')
    .component('ngxSearchix', SearchixComponent());

})(window.angular);
