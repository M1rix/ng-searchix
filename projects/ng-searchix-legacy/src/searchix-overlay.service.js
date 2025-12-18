/**
 * Searchix Overlay Service - Manages modal overlay
 */

(function(angular) {
  'use strict';

  var SEARCHIX_RECENTS_KEY = 'searchix-recents';

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

    function open(items, config, recentItems, onSelect, onClose) {
      // Close existing overlay
      if (overlayElement) {
        close();
      }

      var defaults = searchixConfig.getDefaults();
      var mergedConfig = angular.extend({}, defaults, config);

      // Create new scope for dialog
      overlayScope = $rootScope.$new(true);
      overlayScope.items = items || [];
      overlayScope.recentItems = recentItems;
      overlayScope.config = mergedConfig;
      overlayScope.onSelect = onSelect;
      overlayScope.onClose = onClose;
      overlayScope.SEARCHIX_RECENTS_KEY = SEARCHIX_RECENTS_KEY;

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
    $ctrl.recents = [];
    $ctrl.activeIndex = 0;
    $ctrl.searchMs = 0;
    $ctrl.items = $scope.items || [];
    $ctrl.config = $scope.config || {};

    // Computed properties
    Object.defineProperty($ctrl, 'isShowingRecents', {
      get: function() {
        var searchValue = $ctrl.query || '';
        return searchValue.trim() === '' && $ctrl.recents.length > 0;
      }
    });

    Object.defineProperty($ctrl, 'displayItems', {
      get: function() {
        return $ctrl.isShowingRecents ? $ctrl.recents : $ctrl.results;
      }
    });

    Object.defineProperty($ctrl, 'isSearchEmpty', {
      get: function() {
        var searchValue = $ctrl.query || '';
        return searchValue.trim() === '';
      }
    });

    // Methods
    $ctrl.onQueryChange = onQueryChange;
    $ctrl.onKeydown = onKeydown;
    $ctrl.select = select;
    $ctrl.openExternal = openExternal;
    $ctrl.removeRecent = removeRecent;
    $ctrl.close = close;

    // Initialize
    init();

    function init() {
      // Load recents from input or localStorage
      $ctrl.recents = loadRecents();
      // Initialize results with empty search
      $ctrl.results = filter('');
    }

    function onQueryChange() {
      $ctrl.activeIndex = 0;
      $ctrl.results = filter($ctrl.query || '');
    }

    function onKeydown(event) {
      // Handle keyboard navigation for both recents and search results
      if (event.key === 'ArrowDown' || event.keyCode === 40) {
        event.preventDefault();
        $ctrl.activeIndex = Math.min($ctrl.activeIndex + 1, Math.max(0, $ctrl.displayItems.length - 1));
        // Scroll into view
        $timeout(function() {
          var elem = document.querySelector('#searchix__item-' + $ctrl.activeIndex);
          if (elem) {
            elem.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
          }
        }, 0);
      } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
        event.preventDefault();
        $ctrl.activeIndex = Math.max($ctrl.activeIndex - 1, 0);
        // Scroll into view
        $timeout(function() {
          var elem = document.querySelector('#searchix__item-' + $ctrl.activeIndex);
          if (elem) {
            elem.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
          }
        }, 0);
      } else if (event.key === 'Enter' || event.keyCode === 13) {
        var item = $ctrl.displayItems[$ctrl.activeIndex];
        if (item) {
          event.preventDefault();
          select(item);
        }
      }
    }

    function select(item) {
      // Add selected item to recents
      addToRecents(item);

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

    function removeRecent(event, item) {
      event.stopPropagation();

      // Remove from recents array
      $ctrl.recents = $ctrl.recents.filter(function(it) {
        return it.id !== item.id;
      });

      // Save to localStorage
      saveRecentsToLocalStorage();

      // Reset active index to avoid pointing to removed item
      $ctrl.activeIndex = 0;

      // Update results if search is empty
      if (!$ctrl.query || $ctrl.query.trim() === '') {
        $ctrl.results = filter('');
      }
    }

    function addToRecents(item) {
      // Remove duplicate if exists
      $ctrl.recents = $ctrl.recents.filter(function(it) {
        return it.id !== item.id;
      });

      // Add to the beginning
      $ctrl.recents.unshift(item);

      // Limit to 10 recent items
      var maxRecents = 10;
      if ($ctrl.recents.length > maxRecents) {
        $ctrl.recents = $ctrl.recents.slice(0, maxRecents);
      }

      // Save to localStorage
      saveRecentsToLocalStorage();
    }

    function loadRecents() {
      // If recentItems provided as input, use them as initial value
      // Note: they will be updated and saved to localStorage on select/remove
      if ($scope.recentItems && $scope.recentItems.length > 0) {
        return angular.copy($scope.recentItems); // Create a copy to avoid mutating input
      }

      // Otherwise, load from localStorage
      try {
        var stored = localStorage.getItem($scope.SEARCHIX_RECENTS_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Failed to load recents from localStorage:', e);
      }

      return [];
    }

    function saveRecentsToLocalStorage() {
      try {
        localStorage.setItem($scope.SEARCHIX_RECENTS_KEY, JSON.stringify($ctrl.recents));
      } catch (e) {
        console.warn('Failed to save recents to localStorage:', e);
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

      // If query is empty, show recents
      if (!query) {
        if ($ctrl.recents.length > 0) {
          return $ctrl.recents.slice(0, max);
        }
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
