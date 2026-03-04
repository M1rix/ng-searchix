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
