/**
 * ng-searchix-legacy v1.0.0
 * Advanced search interface for AngularJS 1.5.8+
 * https://github.com/yourusername/ng-searchix-legacy
 * @license MIT
 */

/**
 * ng-searchix-legacy - Advanced search interface for AngularJS 1.5.8+
 * @version 1.0.0
 * @license MIT
 */

(function (angular) {
    'use strict';

    /**
     * Main module for ng-searchix-legacy
     *
     * Usage:
     * angular.module('myApp', ['ngSearchixLegacy'])
     *   .config(function(searchixConfigProvider) {
     *     searchixConfigProvider.setDefaults({
     *       placeholder: 'Search...',
     *       hotkey: 'ctrl+k',
     *       closeOnSelect: true,
     *       maxResults: 50
     *     });
     *   });
     */
    angular
        .module('ngSearchixLegacy', [])
        .provider('searchixConfig', SearchixConfigProvider)
        .run(SearchixRun);

    /**
     * Configuration provider for default settings
     */
    function SearchixConfigProvider() {
        var defaults = {
            placeholder: 'Search...',
            label: 'Lookup',
            hotkey: 'ctrl+k',
            closeOnSelect: true,
            showMs: false,
            showResultsCount: false,
            maxResults: 50,
            emitOnExternalOpen: false,
            autoNavigate: true  // Automatically navigate to href on select
        };

        this.setDefaults = function (config) {
            angular.extend(defaults, config);
        };

        this.$get = function () {
            return {
                getDefaults: function () {
                    return angular.copy(defaults);
                }
            };
        };
    }

    /**
     * Initialize templates on module run
     */
    SearchixRun.$inject = ['$templateCache'];

    function SearchixRun($templateCache) {
        // Templates will be registered here
        $templateCache.put('ngx-searchix/searchix.html',
            '<div ng-if="$ctrl.buttonTemplate" ng-include="$ctrl.buttonTemplate"></div>' +
            '<button ng-if="!$ctrl.buttonTemplate" type="button" class="ngx-searchix-trigger" ng-click="$ctrl.open()">' +
            '<svg ng-if="!$ctrl.iconTemplate" class="ngx-searchix-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="11" cy="11" r="8"></circle>' +
            '<path d="m21 21-4.35-4.35"></path>' +
            '</svg>' +
            '<div ng-if="$ctrl.iconTemplate" ng-include="$ctrl.iconTemplate"></div>' +
            '<span class="ngx-searchix-label">{{ ($ctrl.label || \'Lookup\') }}</span>' +
            '<code class="ngx-searchix-hint">{{ $ctrl.getHotkey() }}</code>' +
            '</button>'
        );
        var template = [
            '<div class="searchix" role="dialog" aria-modal="true">',

            '  <div class="searchix__header">',
            '    <svg class="searchix__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '      <circle cx="11" cy="11" r="8"></circle>',
            '      <path d="m21 21-4.35-4.35"></path>',
            '    </svg>',

            '    <input class="searchix__input"',
            '           ng-model="$ctrl.query"',
            '           placeholder="{{ $ctrl.config.placeholder || \'Search...\' }}"',
            '           ng-change="$ctrl.onQueryChange()"',
            '           ng-keydown="$ctrl.onKeydown($event)"',
            '           id="searchix-input"',
            '           autofocus />',

            '    <kbd class="searchix__kbd">esc</kbd>',
            '  </div>',

            '  <!-- Empty State -->',
            '  <div class="searchix__content" ng-if="!$ctrl.displayItems.length">',
            '    <div class="searchix__empty">',
            '      <svg class="searchix__empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '        <circle cx="11" cy="11" r="8"></circle>',
            '        <path d="m21 21-4.35-4.35"></path>',
            '      </svg>',
            '      <p>{{ $ctrl.isSearchEmpty ? \'No recent searches\' : \'No results found\' }}</p>',
            '    </div>',
            '  </div>',

            '  <!-- Results List -->',
            '  <div ng-if="$ctrl.displayItems.length">',

            '    <div class="searchix__recents-header" ng-if="$ctrl.isShowingRecents">',
            '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '        <circle cx="12" cy="12" r="10"></circle>',
            '        <polyline points="12 6 12 12 16 14"></polyline>',
            '      </svg>',
            '      <span>Recents</span>',
            '    </div>',

            '    <div class="searchix__list">',

            '      <button type="button" class="searchix__item"',
            '              ng-repeat="item in $ctrl.displayItems track by item.id"',
            '              id="searchix__item-{{$index}}"',
            '              ng-click="$ctrl.select(item)"',
            '              ng-class="{active: $index === $ctrl.activeIndex}">',

            '        <div class="searchix__item-content">',

            '          <div class="searchix__item-icon" ng-if="item.icon">',
            '            <div ng-if="$ctrl.config.iconRenderer" ng-include="$ctrl.config.iconRenderer" ng-init="icon=item.icon"></div>',
            '            <svg ng-if="!$ctrl.config.iconRenderer" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>',
            '              <polyline points="14 2 14 8 20 8"></polyline>',
            '            </svg>',
            '          </div>',

            '          <div class="searchix__item-text">',
            '            <div class="searchix__item-title">{{ item.title }}</div>',
            '            <div class="searchix__item-subtitle" ng-if="item.subtitle">{{ item.subtitle }}</div>',
            '          </div>',

            '        </div>',

            '        <div class="searchix__item-actions">',

            '          <div class="searchix__item-delete"',
            '                  ng-show="$ctrl.isShowingRecents"',
            '                  title="Remove from recents"',
            '                  ng-click="$ctrl.removeRecent($event, item)">',
            '            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '              <line x1="18" y1="6" x2="6" y2="18"></line>',
            '              <line x1="6" y1="6" x2="18" y2="18"></line>',
            '            </svg>',
            '          </div>',

            '          <a ng-show="item.href" class="searchix__item-external"',
            '             ng-href="{{ item.href }}"',
            '             target="_blank"',
            '             rel="noopener noreferrer"',
            '             ng-click="$ctrl.openExternal($event, item)"',
            '             title="Open in new tab">',
            '            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>',
            '              <polyline points="15 3 21 3 21 9"></polyline>',
            '              <line x1="10" y1="14" x2="21" y2="3"></line>',
            '            </svg>',
            '          </a>',

            '        </div>',
            '      </button>',

            '    </div>',

            '    <div class="searchix__footer">',
            '      <div class="searchix__footer-info">',
            '        <span class="searchix__footer-count" ng-if="$ctrl.config.showResultsCount">',
            '          {{ ($ctrl.displayItems.length || 0) }} {{ ($ctrl.displayItems.length || 0) === 1 ? "result" : "results" }}',
            '        </span>',
            '        <span ng-if="$ctrl.config.showMs" class="searchix__footer-time">{{ $ctrl.searchMs }}ms</span>',
            '      </div>',

            '      <div class="searchix__footer-hints">',
            '        <kbd class="searchix__footer-kbd">',
            '          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '            <polyline points="18 15 12 9 6 15"></polyline>',
            '          </svg>',
            '          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
            '               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '            <polyline points="6 9 12 15 18 9"></polyline>',
            '          </svg>',
            '          Navigate',
            '        </kbd>',
            '        <kbd class="searchix__footer-kbd">↵ Open</kbd>',
            '        <kbd class="searchix__footer-kbd">'+ (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? '⌘' : 'Ctrl') +' ↵ <small style="background: rgba(0 0 0 / 10%);width: 1px;">&nbsp;</small> New tab</kbd>',
            '      </div>',
            '    </div>',

            '  </div>',
            '</div>'
        ].join('');

        $templateCache.put('ngx-searchix/dialog.html', template);
    }

})(window.angular);


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
  SearchixDialogController.$inject = ['$scope', '$timeout', 'createFuseFilter'];

  function SearchixDialogController($scope, $timeout, createFuseFilter) {
    var $ctrl = this;

    // State
    $ctrl.query = '';
    $ctrl.results = [];
    $ctrl.recents = [];
    $ctrl.activeIndex = 0;
    $ctrl.searchMs = 0;
    $ctrl.items = $scope.items || [];
    $ctrl.config = $scope.config || {};

    // Initialize fuse filter with custom options if provided
    var fuseFilter = createFuseFilter($ctrl.config.fuseOptions);

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
      var query = (q || '').trim();
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

      // Use Fuse.js for fuzzy search
      var filtered = fuseFilter(query, items);

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
        recentItems: '<?',       // SearchItem[]
        placeholder: '@?',       // string
        label: '@?',             // string (e.g., 'Search')
        hotkey: '@?',           // string (e.g., 'ctrl+k')
        closeOnSelect: '<?',    // boolean
        showMs: '<?',           // boolean
        showResultsCount: '<?', // boolean
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
        label: $ctrl.label || defaults.label,
        hotkey: $ctrl.hotkey || defaults.hotkey,
        closeOnSelect: $ctrl.closeOnSelect !== undefined ? $ctrl.closeOnSelect : defaults.closeOnSelect,
        showMs: $ctrl.showMs !== undefined ? $ctrl.showMs : defaults.showMs,
        showResultsCount: $ctrl.showResultsCount !== undefined ? $ctrl.showResultsCount : defaults.showResultsCount,
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
      subscription = searchixOverlay.open($ctrl.items || [], config, $ctrl.recentItems, function(item) {
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
      return ($ctrl.hotkeyLabel || $ctrl.hotkey || defaults.hotkey || 'Ctrl+K');
    }

    function onKeyDown(event) {
      var hk = ($ctrl.hotkey || defaults.hotkey || 'ctrl+k');
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

      if (modOk && key && event.code.toLowerCase() === 'key' + key.toLowerCase()) {
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


