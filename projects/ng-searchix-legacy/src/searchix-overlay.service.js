/**
 * Searchix Overlay Service - Manages modal overlay
 */

(function(angular) {
  'use strict';

  SearchixOverlayService.$inject = ['$compile', '$rootScope', '$document', '$timeout', 'searchixConfig'];

  function SearchixOverlayService($compile, $rootScope, $document, $timeout, searchixConfig) {
    var service = {
      isOpen: isOpen,
      open: open,
      close: close
    };

    var overlayElement = null;
    var backdropElement = null;
    var overlayScope = null;

    return service;

    function isOpen() {
      return !!overlayElement;
    }

    function open(items, config, onSelect, onClose) {
      // Close existing overlay
      if (overlayElement) {
        close();
      }

      var defaults = searchixConfig.getDefaults();
      var mergedConfig = angular.extend({}, defaults, config);

      // Create new scope for dialog
      overlayScope = $rootScope.$new(true);
      overlayScope.items = items || [];
      overlayScope.config = mergedConfig;
      overlayScope.onSelect = onSelect;
      overlayScope.onClose = onClose;

      // Debug logging
      console.log('[searchix-overlay] Opening with items:', overlayScope.items.length, 'items');

      // Create backdrop
      backdropElement = angular.element('<div class="ngx-searchix-backdrop"></div>');
      backdropElement.on('click', function() {
        $timeout(function() {
          close();
        });
      });

      // Create panel
      var panelElement = angular.element('<div class="ngx-searchix-panel"></div>');

      // Create dialog
      overlayElement = angular.element('<div ngx-searchix-dialog></div>');

      // Compile dialog
      $compile(overlayElement)(overlayScope);

      // Add to DOM
      panelElement.append(overlayElement);
      var body = $document.find('body');
      body.append(backdropElement);
      body.append(panelElement);

      // Handle escape key
      var escapeHandler = function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
          event.preventDefault();
          $timeout(function() {
            close();
          });
        }
      };
      $document.on('keydown', escapeHandler);

      // Store panel for cleanup
      overlayElement._panel = panelElement;
      overlayElement._escapeHandler = escapeHandler;

      // Focus input after digest
      $timeout(function() {
        var input = overlayElement.find('input')[0];
        if (input) {
          input.focus();
        }
      }, 50);

      // Return unsubscribe function
      return function unsubscribe() {
        close();
      };
    }

    function close() {
      if (!overlayElement) {
        return;
      }

      // Remove escape handler
      if (overlayElement._escapeHandler) {
        $document.off('keydown', overlayElement._escapeHandler);
      }

      // Remove elements
      if (backdropElement) {
        backdropElement.remove();
        backdropElement = null;
      }

      if (overlayElement) {
        if (overlayElement._panel) {
          overlayElement._panel.remove();
        }
        overlayElement.remove();
        overlayElement = null;
      }

      // Destroy scope
      if (overlayScope) {
        if (overlayScope.onClose) {
          overlayScope.onClose();
        }
        overlayScope.$destroy();
        overlayScope = null;
      }
    }

  }

  /**
   * Dialog Controller
   */
  SearchixDialogController.$inject = ['$scope', '$timeout'];

  function SearchixDialogController($scope, $timeout) {
    var $ctrl = this;

    // State
    $ctrl.query = '';
    $ctrl.results = [];
    $ctrl.activeIndex = 0;
    $ctrl.searchMs = 0;
    $ctrl.items = $scope.items || [];
    $ctrl.config = $scope.config || {};

    // Methods
    $ctrl.onQueryChange = onQueryChange;
    $ctrl.onKeydown = onKeydown;
    $ctrl.select = select;
    $ctrl.openExternal = openExternal;
    $ctrl.close = close;

    // Initialize
    init();

    function init() {
      $ctrl.results = filter('');
    }

    function onQueryChange() {
      $ctrl.activeIndex = 0;
      $ctrl.results = filter($ctrl.query || '');
    }

    function onKeydown(event) {
      if (event.key === 'ArrowDown' || event.keyCode === 40) {
        event.preventDefault();
        $ctrl.activeIndex = Math.min($ctrl.activeIndex + 1, Math.max(0, $ctrl.results.length - 1));
      } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
        event.preventDefault();
        $ctrl.activeIndex = Math.max($ctrl.activeIndex - 1, 0);
      } else if (event.key === 'Enter' || event.keyCode === 13) {
        var item = $ctrl.results[$ctrl.activeIndex];
        if (item) {
          event.preventDefault();
          select(item);
        }
      }
    }

    function select(item) {
      // Default navigation behavior if href exists and autoNavigate is enabled
      if (item.href && $ctrl.config.autoNavigate !== false) {
        var href = item.href;
        var hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(href);

        if (hasProtocol) {
          // External link - open in new tab
          console.log('[searchix] Opening external link:', href);
          window.open(href, '_target', 'noopener,noreferrer');
        } else {
          // Internal route - navigate using window.location
          // For AngularJS apps with hash routing, this will work with routes like "/dashboard" or "#/dashboard"
          if (href.charAt(0) !== '#' && href.charAt(0) !== '/') {
            href = '#/' + href;
          }
          console.log('[searchix] Navigating to internal route:', href);
          window.location.href = href;
        }
      }

      // Call user callback
      if ($scope.onSelect) {
        $scope.onSelect(item);
      }

      if ($ctrl.config.closeOnSelect !== false) {
        close();
      }
    }

    function openExternal(event, item) {
      event.stopPropagation();
      event.preventDefault();

      // Open external link in new tab
      if (item.href) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      }

      // Optionally call callback
      if ($ctrl.config.emitOnExternalOpen && $scope.onSelect) {
        $scope.onSelect(item);
      }
    }

    function close() {
      if ($scope.onClose) {
        $scope.onClose();
      }
    }

    function filter(q) {
      var start = performance.now();
      var query = (q || '').trim().toLowerCase();
      var items = $ctrl.items || [];
      var max = $ctrl.config.maxResults || 50;

      // Use custom filter function if provided
      if ($ctrl.config.filterFn) {
        var result = $ctrl.config.filterFn(query, items) || [];
        return result.slice(0, max);
      }

      // Return all if no query
      if (!query) {
        return items.slice(0, max);
      }

      // Simple contains matching
      var filtered = items.filter(function(it) {
        var title = (it.title || '').toLowerCase();
        var subtitle = (it.subtitle || '').toLowerCase();
        return title.indexOf(query) !== -1 || subtitle.indexOf(query) !== -1;
      });

      $ctrl.searchMs = Math.round(performance.now() - start);
      return filtered.slice(0, max);
    }
  }

  // Register service
  angular
    .module('ngSearchixLegacy')
    .service('searchixOverlay', SearchixOverlayService)
    .controller('SearchixDialogController', SearchixDialogController);

})(window.angular);
