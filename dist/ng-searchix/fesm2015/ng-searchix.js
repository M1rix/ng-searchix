import * as i0 from '@angular/core';
import { InjectionToken, Component, ChangeDetectionStrategy, Inject, HostListener, Injector, Injectable, Optional, EventEmitter, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import Fuse from 'fuse.js';

const SEARCHIX_CONFIG = new InjectionToken('SEARCHIX_CONFIG');
const SEARCHIX_RECENTS_KEY = 'searchix-recents';

class SearchixDialogData {
}
class SearchixDialogComponent {
    constructor(data, cdr) {
        this.data = data;
        this.cdr = cdr;
        this.q = new FormControl('');
        this.searchMs = 0;
        // UI state
        this.results = [];
        this.recents = [];
        this.activeIndex = 0;
        // Load recents from input or localStorage
        this.recents = this.loadRecents();
        // Initialize results with empty search (will show all items if no recents)
        this.results = this.filter('');
        // Update results when search query changes
        this.q.valueChanges.subscribe(val => {
            this.activeIndex = 0;
            this.results = this.filter(val || '');
        });
    }
    ngAfterViewInit() {
        setTimeout(() => { var _a; return ((_a = window.document.getElementById('searchix-input')) === null || _a === void 0 ? void 0 : _a.focus()); });
    }
    // Check if we should show recents (when search input is empty)
    get isShowingRecents() {
        const searchValue = this.q.value || '';
        return searchValue.trim() === '' && this.recents.length > 0;
    }
    // Get items to display (recents or search results)
    get displayItems() {
        return this.isShowingRecents ? this.recents : this.results;
    }
    // Check if search input is empty
    get isSearchEmpty() {
        const searchValue = this.q.value || '';
        return searchValue.trim() === '';
    }
    trackById(_, it) {
        return it.id;
    }
    select(item) {
        // Add selected item to recents
        this.addToRecents(item);
        this.data.selection$.next(item);
        if (this.data.config.closeOnSelect !== false) {
            this.data.close();
            this.data.selection$.complete();
        }
    }
    close() {
        this.data.close();
        this.data.selection$.complete();
    }
    openExternal(event, item) {
        event.stopPropagation();
        // Link will open naturally via href
        // Optionally emit selection event
        if (this.data.config.emitOnExternalOpen) {
            this.data.selection$.next(item);
        }
    }
    onKeydown(e) {
        var _a, _b;
        // Handle keyboard navigation for both recents and search results
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.activeIndex = Math.min(this.activeIndex + 1, Math.max(0, this.displayItems.length - 1));
            (_a = window.document.querySelector(`#searchix__item-${this.activeIndex}`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            (_b = window.document.querySelector(`#searchix__item-${this.activeIndex}`)) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
        }
        else if (e.key === 'Enter') {
            const item = this.displayItems[this.activeIndex];
            if (item) {
                e.preventDefault();
                this.select(item);
            }
        }
    }
    removeRecent(event, item) {
        event.stopPropagation();
        // Remove from recents array
        this.recents = this.recents.filter(it => it.id !== item.id);
        // Save to localStorage
        this.saveRecentsToLocalStorage();
        // Reset active index to avoid pointing to removed item
        this.activeIndex = 0;
        // Update results if search is empty
        if (!this.q.value || this.q.value.trim() === '') {
            this.results = this.filter('');
        }
        this.cdr.markForCheck();
    }
    addToRecents(item) {
        // Remove duplicate if exists
        this.recents = this.recents.filter(it => it.id !== item.id);
        // Add to the beginning
        this.recents.unshift(item);
        // Limit to 10 recent items
        const maxRecents = 10;
        if (this.recents.length > maxRecents) {
            this.recents = this.recents.slice(0, maxRecents);
        }
        // Save to localStorage
        this.saveRecentsToLocalStorage();
    }
    loadRecents() {
        // If recentItems provided as input, use them as initial value
        // Note: they will be updated and saved to localStorage on select/remove
        if (this.data.recentItems && this.data.recentItems.length > 0) {
            return [...this.data.recentItems]; // Create a copy to avoid mutating input
        }
        // Otherwise, load from localStorage
        try {
            const stored = localStorage.getItem(SEARCHIX_RECENTS_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        catch (e) {
            console.warn('Failed to load recents from localStorage:', e);
        }
        return [];
    }
    saveRecentsToLocalStorage() {
        try {
            localStorage.setItem(SEARCHIX_RECENTS_KEY, JSON.stringify(this.recents));
        }
        catch (e) {
            console.warn('Failed to save recents to localStorage:', e);
        }
    }
    filter(q) {
        var _a;
        const start = performance.now();
        const query = (q || '').trim().toLowerCase();
        const items = this.data.items || [];
        const max = (_a = this.data.config.maxResults) !== null && _a !== void 0 ? _a : 50;
        if (this.data.config.filterFn) {
            const filtered = this.data.config.filterFn(query, items) || [];
            return filtered.slice(0, max);
        }
        // If query is empty, show recents
        if (!query) {
            if (this.recents.length > 0) {
                return this.recents.slice(0, max);
            }
            return items.slice(0, max);
        }
        // Simple contains matching (Angular-12 friendly, no extra deps).
        // You can swap to Fuse.js later without breaking API.
        const result = items
            .filter(it => (it.title || '').toLowerCase().includes(query) ||
            (it.subtitle || '').toLowerCase().includes(query))
            .slice(0, max);
        this.searchMs = Math.round(performance.now() - start);
        return result;
    }
}
SearchixDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixDialogComponent, deps: [{ token: SearchixDialogData }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SearchixDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixDialogComponent, selector: "ngx-searchix-dialog", host: { listeners: { "document:keydown": "onKeydown($event)" } }, ngImport: i0, template: "<div aria-modal=\"true\" class=\"searchix\" role=\"dialog\">\n    <div class=\"searchix__header\">\n        <svg class=\"searchix__icon\" fill=\"none\" height=\"20\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n             stroke-width=\"2\" viewBox=\"0 0 24 24\" width=\"20\">\n            <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n            <path d=\"m21 21-4.35-4.35\"></path>\n        </svg>\n\n        <input\n            #searchInput\n            [formControl]=\"q\"\n            [placeholder]=\"data.config.placeholder || 'Search...'\"\n            autofocus\n            class=\"searchix__input\"\n            id=\"searchix-input\"\n        />\n\n        <kbd class=\"searchix__kbd\">esc</kbd>\n    </div>\n\n    <!-- Empty State -->\n    <div *ngIf=\"displayItems.length === 0; else list\" class=\"searchix__content\">\n        <div class=\"searchix__empty\">\n            <svg\n                class=\"searchix__empty-icon\"\n                width=\"48\"\n                height=\"48\"\n                viewBox=\"0 0 24 24\"\n                fill=\"none\"\n                stroke=\"currentColor\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n            >\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"m21 21-4.35-4.35\"></path>\n            </svg>\n            <p>{{ isSearchEmpty ? 'No recent searches' : 'No results found' }}</p>\n        </div>\n    </div>\n\n    <!-- Results List -->\n    <ng-template #list>\n        <!-- Recent Items Header -->\n        <div *ngIf=\"isShowingRecents\" class=\"searchix__recents-header\">\n            <svg\n                    width=\"16\"\n                    height=\"16\"\n                    viewBox=\"0 0 24 24\"\n                    fill=\"none\"\n                    stroke=\"currentColor\"\n                    stroke-width=\"2\"\n                    stroke-linecap=\"round\"\n                    stroke-linejoin=\"round\"\n            >\n                <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n                <polyline points=\"12 6 12 12 16 14\"></polyline>\n            </svg>\n            <span>Recents</span>\n        </div>\n        <div #searchList class=\"searchix__list\">\n            <!-- Items List -->\n            <button\n                *ngFor=\"let it of displayItems; let i = index; trackBy: trackById\"\n                type=\"button\"\n                class=\"searchix__item\"\n                id=\"searchix__item-{{i}}\"\n                [class.active]=\"i === activeIndex\"\n                (click)=\"select(it)\"\n            >\n                <!-- Item Content -->\n                <div class=\"searchix__item-content\">\n                    <!-- Icon -->\n                    <div *ngIf=\"it.icon\" class=\"searchix__item-icon\">\n                        <ng-container *ngIf=\"data.config.iconRenderer; else defaultIcon\">\n                            <ng-container *ngTemplateOutlet=\"data.config.iconRenderer; context: { $implicit: it.icon }\"></ng-container>\n                        </ng-container>\n                        <ng-template #defaultIcon>\n                            <svg\n                                width=\"20\"\n                                height=\"20\"\n                                viewBox=\"0 0 24 24\"\n                                fill=\"none\"\n                                stroke=\"currentColor\"\n                                stroke-width=\"2\"\n                                stroke-linecap=\"round\"\n                                stroke-linejoin=\"round\"\n                            >\n                                <path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"></path>\n                                <polyline points=\"14 2 14 8 20 8\"></polyline>\n                            </svg>\n                        </ng-template>\n                    </div>\n\n                    <!-- Text -->\n                    <div class=\"searchix__item-text\">\n                        <div class=\"searchix__item-title\">{{ it.title }}</div>\n                        <div *ngIf=\"it.subtitle\" class=\"searchix__item-subtitle\">{{ it.subtitle }}</div>\n                    </div>\n                </div>\n\n                <!-- Item Actions -->\n                <div class=\"searchix__item-actions\">\n                    <!-- Delete Button (only for recent items) -->\n                    <button\n                        *ngIf=\"isShowingRecents\"\n                        type=\"button\"\n                        class=\"searchix__item-delete\"\n                        title=\"Remove from recents\"\n                        (click)=\"removeRecent($event, it)\"\n                    >\n                        <svg\n                            width=\"16\"\n                            height=\"16\"\n                            viewBox=\"0 0 24 24\"\n                            fill=\"none\"\n                            stroke=\"currentColor\"\n                            stroke-width=\"2\"\n                            stroke-linecap=\"round\"\n                            stroke-linejoin=\"round\"\n                        >\n                            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n                            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n                        </svg>\n                    </button>\n\n                    <!-- External Link -->\n                    <a\n                        *ngIf=\"it.href\"\n                        [href]=\"it.href\"\n                        target=\"_blank\"\n                        rel=\"noopener noreferrer\"\n                        class=\"searchix__item-external\"\n                        title=\"Open in new tab\"\n                        (click)=\"openExternal($event, it)\"\n                    >\n                        <svg\n                            width=\"16\"\n                            height=\"16\"\n                            viewBox=\"0 0 24 24\"\n                            fill=\"none\"\n                            stroke=\"currentColor\"\n                            stroke-width=\"2\"\n                            stroke-linecap=\"round\"\n                            stroke-linejoin=\"round\"\n                        >\n                            <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>\n                            <polyline points=\"15 3 21 3 21 9\"></polyline>\n                            <line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>\n                        </svg>\n                    </a>\n                </div>\n            </button>\n        </div>\n    </ng-template>\n\n    <!-- Footer -->\n    <div class=\"searchix__footer\">\n        <div class=\"searchix__footer-info\">\n            <span *ngIf=\"data.config.showResultsCount\" class=\"searchix__footer-count\">\n                {{ (displayItems?.length || 0) }} {{ (displayItems?.length || 0) === 1 ? 'result' : 'results' }}\n            </span>\n            <span *ngIf=\"data.config.showMs\" class=\"searchix__footer-time\">\n                {{ searchMs }}ms\n            </span>\n        </div>\n        <div class=\"searchix__footer-hints\">\n            <kbd class=\"searchix__footer-kbd\">\n                <svg\n                    width=\"12\"\n                    height=\"12\"\n                    viewBox=\"0 0 24 24\"\n                    fill=\"none\"\n                    stroke=\"currentColor\"\n                    stroke-width=\"2\"\n                    stroke-linecap=\"round\"\n                    stroke-linejoin=\"round\"\n                >\n                    <polyline points=\"18 15 12 9 6 15\"></polyline>\n                </svg>\n                <svg\n                    width=\"12\"\n                    height=\"12\"\n                    viewBox=\"0 0 24 24\"\n                    fill=\"none\"\n                    stroke=\"currentColor\"\n                    stroke-width=\"2\"\n                    stroke-linecap=\"round\"\n                    stroke-linejoin=\"round\"\n                >\n                    <polyline points=\"6 9 12 15 18 9\"></polyline>\n                </svg>\n                navigate\n            </kbd>\n            <kbd class=\"searchix__footer-kbd\">\u21B5 select</kbd>\n        </div>\n    </div>\n</div>\n", styles: ["@charset \"UTF-8\";.searchix{background:var(--searchix-bg, #ffffff);color:var(--searchix-fg, #111827);border:1px solid var(--searchix-border, rgba(0, 0, 0, .08));font-family:var(--searchix-font, system-ui, -apple-system, BlinkMacSystemFont, sans-serif);width:var(--searchix-width, 640px);max-width:100%}.searchix__header{display:flex;align-items:center;grid-gap:var(--searchix-header-gap, 12px);gap:var(--searchix-header-gap, 12px);padding:var(--searchix-header-py, 16px) var(--searchix-header-px, 20px);border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .08));background:var(--searchix-header-bg, transparent)}.searchix__icon{opacity:var(--searchix-icon-opacity, .5);color:var(--searchix-icon-color, currentColor);flex-shrink:0;display:flex;align-items:center}.searchix__input{flex:1;border:0;outline:0;background:transparent;font-size:var(--searchix-input-font, 16px);line-height:1.5;color:inherit;font-family:inherit;min-width:0}.searchix__input:focus{outline:none}.searchix__input::placeholder{color:var(--searchix-placeholder, rgba(17, 24, 39, .4))}.searchix__kbd{font-size:var(--searchix-kbd-font, 12px);padding:var(--searchix-kbd-py, 4px) var(--searchix-kbd-px, 8px);border-radius:var(--searchix-kbd-radius, 4px);background:var(--searchix-kbd-bg, rgba(0, 0, 0, .06));color:var(--searchix-kbd-fg, rgba(0, 0, 0, .6));-webkit-user-select:none;user-select:none;font-family:var(--searchix-kbd-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-kbd-weight, 500);border:1px solid var(--searchix-kbd-border, rgba(0, 0, 0, .08));text-transform:lowercase;line-height:1}.searchix__content{min-height:var(--searchix-content-minh, 320px);display:flex;align-items:center;justify-content:center;padding:var(--searchix-content-py, 40px) var(--searchix-content-px, 20px)}.searchix__empty{text-align:center;color:var(--searchix-muted, rgba(17, 24, 39, .4));display:flex;flex-direction:column;align-items:center;grid-gap:16px;gap:16px}.searchix__empty p{margin:0;font-size:var(--searchix-empty-font, 16px);font-weight:var(--searchix-empty-weight, 500)}.searchix__empty-icon{opacity:var(--searchix-empty-icon-opacity, .3)}.searchix__list{max-height:var(--searchix-list-maxh, 400px);overflow-y:auto;overflow-x:hidden}.searchix__list::-webkit-scrollbar{width:var(--searchix-scrollbar-width, 8px)}.searchix__list::-webkit-scrollbar-track{background:var(--searchix-scrollbar-track-bg, transparent)}.searchix__list::-webkit-scrollbar-thumb{background:var(--searchix-scrollbar-thumb-bg, rgba(0, 0, 0, .1));border-radius:var(--searchix-scrollbar-thumb-radius, 4px)}.searchix__list::-webkit-scrollbar-thumb:hover{background:var(--searchix-scrollbar-thumb-bg-hover, rgba(0, 0, 0, .15))}.searchix__recents-header{display:flex;align-items:center;grid-gap:var(--searchix-recents-header-gap, 8px);gap:var(--searchix-recents-header-gap, 8px);padding:var(--searchix-recents-header-py, 12px) var(--searchix-recents-header-px, 20px);font-size:var(--searchix-recents-header-font, 12px);font-weight:var(--searchix-recents-header-weight, 600);color:var(--searchix-muted, rgba(17, 24, 39, .5));text-transform:capitalize;letter-spacing:.5px;background:var(--searchix-recents-header-bg, rgba(0, 0, 0, .02));border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .06))}.searchix__recents-header svg{width:var(--searchix-recents-header-icon-size, 16px);height:var(--searchix-recents-header-icon-size, 16px);opacity:.5}.searchix__item{width:100%;text-align:left;padding:var(--searchix-item-py, 12px) var(--searchix-item-px, 20px);background:transparent;border:0;border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .06));cursor:pointer;color:inherit;font-family:inherit;display:flex;align-items:center;justify-content:space-between;grid-gap:var(--searchix-item-gap, 12px);gap:var(--searchix-item-gap, 12px);transition:background-color .15s ease,border-color .15s ease;position:relative}.searchix__item:last-child{border-bottom:0}.searchix__item:hover{background:var(--searchix-item-hover, rgba(0, 0, 0, .03))}.searchix__item.active{background:var(--searchix-item-active-bg, rgba(59, 130, 246, .08));border-color:var(--searchix-item-active-border, rgba(59, 130, 246, .2))}.searchix__item-content{flex:1;display:flex;align-items:center;grid-gap:var(--searchix-item-content-gap, 12px);gap:var(--searchix-item-content-gap, 12px);min-width:0}.searchix__item-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:var(--searchix-item-icon-size, 20px);height:var(--searchix-item-icon-size, 20px);color:var(--searchix-item-icon-color, currentColor);opacity:var(--searchix-item-icon-opacity, .6)}.searchix__item-text{flex:1;min-width:0}.searchix__item-title{font-weight:var(--searchix-item-title-weight, 500);font-size:var(--searchix-item-title-font, 14px);color:var(--searchix-item-title-color, inherit);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.searchix__item-subtitle{font-size:var(--searchix-item-subtitle-font, 13px);margin-top:var(--searchix-item-subtitle-mt, 2px);color:var(--searchix-muted, rgba(17, 24, 39, .5));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.searchix__item-actions{display:flex;align-items:center;grid-gap:var(--searchix-item-actions-gap, 4px);gap:var(--searchix-item-actions-gap, 4px);flex-shrink:0}.searchix__item-delete{display:flex;align-items:center;justify-content:center;width:var(--searchix-item-delete-size, 32px);height:var(--searchix-item-delete-size, 32px);border-radius:var(--searchix-item-delete-radius, 6px);background:var(--searchix-item-delete-bg, transparent);color:var(--searchix-item-delete-color, rgba(239, 68, 68, .6));border:0;cursor:pointer;opacity:0;transition:all .15s ease;padding:0}.searchix__item:hover .searchix__item-delete,.searchix__item.active .searchix__item-delete{opacity:1}.searchix__item-delete:hover{background:var(--searchix-item-delete-bg-hover, rgba(239, 68, 68, .1));color:var(--searchix-item-delete-color-hover, rgba(239, 68, 68, .9))}.searchix__item-delete:active{transform:scale(.95)}.searchix__item-external{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:var(--searchix-item-external-size, 32px);height:var(--searchix-item-external-size, 32px);border-radius:var(--searchix-item-external-radius, 6px);background:var(--searchix-item-external-bg, rgba(0, 0, 0, .04));color:var(--searchix-item-external-color, rgba(0, 0, 0, .5));opacity:0;transition:all .15s ease;text-decoration:none}.searchix__item:hover .searchix__item-external,.searchix__item.active .searchix__item-external{opacity:1}.searchix__item-external:hover{background:var(--searchix-item-external-bg-hover, rgba(0, 0, 0, .08));color:var(--searchix-item-external-color-hover, rgba(0, 0, 0, .8))}.searchix__item-external:active{transform:scale(.95)}.searchix__footer{padding:var(--searchix-footer-py, 12px) var(--searchix-footer-px, 20px);border-top:1px solid var(--searchix-border, rgba(0, 0, 0, .08));font-size:var(--searchix-footer-font, 12px);color:var(--searchix-muted, rgba(17, 24, 39, .5));display:flex;align-items:center;justify-content:space-between;grid-gap:var(--searchix-footer-gap, 16px);gap:var(--searchix-footer-gap, 16px);background:var(--searchix-footer-bg, transparent)}.searchix__footer-info{display:flex;align-items:center;grid-gap:var(--searchix-footer-info-gap, 8px);gap:var(--searchix-footer-info-gap, 8px)}.searchix__footer-count{font-weight:var(--searchix-footer-count-weight, 500)}.searchix__footer-time{opacity:var(--searchix-footer-time-opacity, .7)}.searchix__footer-time:before{content:\"\\2022\";margin-right:8px}.searchix__footer-hints{display:flex;align-items:center;grid-gap:var(--searchix-footer-hints-gap, 8px);gap:var(--searchix-footer-hints-gap, 8px)}.searchix__footer-kbd{display:inline-flex;align-items:center;grid-gap:4px;gap:4px;font-size:var(--searchix-footer-kbd-font, 11px);padding:var(--searchix-footer-kbd-py, 3px) var(--searchix-footer-kbd-px, 6px);border-radius:var(--searchix-footer-kbd-radius, 4px);background:var(--searchix-footer-kbd-bg, rgba(0, 0, 0, .04));color:var(--searchix-footer-kbd-fg, rgba(0, 0, 0, .6));font-family:var(--searchix-footer-kbd-font-family, ui-monospace, monospace);font-style:normal;border:1px solid var(--searchix-footer-kbd-border, rgba(0, 0, 0, .06));line-height:1}.searchix__footer-kbd svg{opacity:.7}\n"], directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-searchix-dialog',
                    templateUrl: './searchix-dialog.component.html',
                    styleUrls: ['./searchix-dialog.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: SearchixDialogData, decorators: [{
                    type: Inject,
                    args: [SearchixDialogData]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { onKeydown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });

class SearchixOverlayService {
    constructor(overlay, injector, defaultConfig) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultConfig = defaultConfig;
        this.overlayRef = null;
    }
    isOpen() {
        return !!this.overlayRef;
    }
    open(items, config, recentItems) {
        if (this.overlayRef) {
            // close existing before opening a new one (avoid stacked overlays)
            this.close();
        }
        const merged = Object.assign(Object.assign({ placeholder: 'Search...', hotkey: 'ctrl+k', closeOnSelect: true, maxResults: 50 }, this.defaultConfig), config);
        const selection$ = new Subject();
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .top('10vh');
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'ngx-searchix-backdrop',
            panelClass: 'ngx-searchix-panel',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        const data = {
            items,
            recentItems,
            config: merged,
            selection$,
            close: () => this.close()
        };
        const portalInjector = Injector.create({
            parent: this.injector,
            providers: [{ provide: SearchixDialogData, useValue: data }]
        });
        const portal = new ComponentPortal(SearchixDialogComponent, null, portalInjector);
        this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(() => this.close());
        this.overlayRef.keydownEvents().subscribe((ev) => {
            if (ev.key === 'Escape') {
                ev.preventDefault();
                this.close();
            }
        });
        selection$.subscribe({
            complete: () => {
                // no-op
            }
        });
        // Close overlay when host unsubscribes
        return new Observable((subscriber) => {
            const sub = selection$.subscribe({
                next: (item) => subscriber.next(item),
                error: (e) => subscriber.error(e),
                complete: () => subscriber.complete()
            });
            return () => {
                sub.unsubscribe();
                this.close();
            };
        });
    }
    close() {
        if (!this.overlayRef)
            return;
        this.overlayRef.dispose();
        this.overlayRef = null;
    }
}
SearchixOverlayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, deps: [{ token: i1$1.Overlay }, { token: i0.Injector }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SearchixOverlayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.Injector }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SEARCHIX_CONFIG]
                }] }]; } });

class SearchixComponent {
    constructor(overlaySvc, defaultConfig) {
        this.overlaySvc = overlaySvc;
        this.defaultConfig = defaultConfig;
        this.items = [];
        this.iconTemplate = null;
        this.itemSelected = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
    }
    open() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        const config = Object.assign(Object.assign({}, this.defaultConfig), { showMs: (_a = this.showMs) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.showMs, showResultsCount: (_c = this.showResultsCount) !== null && _c !== void 0 ? _c : (_d = this.defaultConfig) === null || _d === void 0 ? void 0 : _d.showResultsCount, label: (_e = this.label) !== null && _e !== void 0 ? _e : (_f = this.defaultConfig) === null || _f === void 0 ? void 0 : _f.label, placeholder: (_g = this.placeholder) !== null && _g !== void 0 ? _g : (_h = this.defaultConfig) === null || _h === void 0 ? void 0 : _h.placeholder, hotkey: (_j = this.hotkey) !== null && _j !== void 0 ? _j : (_k = this.defaultConfig) === null || _k === void 0 ? void 0 : _k.hotkey, closeOnSelect: (_l = this.closeOnSelect) !== null && _l !== void 0 ? _l : (_m = this.defaultConfig) === null || _m === void 0 ? void 0 : _m.closeOnSelect, maxResults: (_o = this.maxResults) !== null && _o !== void 0 ? _o : (_p = this.defaultConfig) === null || _p === void 0 ? void 0 : _p.maxResults, iconRenderer: (_q = this.iconRenderer) !== null && _q !== void 0 ? _q : (_r = this.defaultConfig) === null || _r === void 0 ? void 0 : _r.iconRenderer, emitOnExternalOpen: (_s = this.emitOnExternalOpen) !== null && _s !== void 0 ? _s : (_t = this.defaultConfig) === null || _t === void 0 ? void 0 : _t.emitOnExternalOpen });
        this.opened.emit();
        (_u = this.sub) === null || _u === void 0 ? void 0 : _u.unsubscribe();
        this.sub = this.overlaySvc.open(this.items, config, this.recentItems).subscribe({
            next: (it) => this.itemSelected.emit(it),
            complete: () => {
                this.closed.emit();
            }
        });
    }
    close() {
        var _a;
        (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.overlaySvc.close();
        this.closed.emit();
    }
    onKeyDown(e) {
        var _a, _b, _c;
        const hk = ((_c = (_a = this.hotkey) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.hotkey) !== null && _c !== void 0 ? _c : 'ctrl+k').toLowerCase();
        const connector = hk.replace(/\w/gm, '');
        const wantCtrl = hk.includes('ctrl');
        const wantCmd = hk.includes('cmd') || hk.includes('meta');
        const key = hk.split(connector).pop();
        const pressedCtrl = e.ctrlKey;
        const pressedCmd = e.metaKey;
        const modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
        if (modOk && key && e.key.toLowerCase() === key) {
            e.preventDefault();
            if (this.overlaySvc.isOpen())
                this.close();
            else
                this.open();
        }
    }
}
SearchixComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, deps: [{ token: SearchixOverlayService }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
SearchixComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixComponent, selector: "ngx-searchix", inputs: { items: "items", recentItems: "recentItems", placeholder: "placeholder", label: "label", hotkey: "hotkey", closeOnSelect: "closeOnSelect", showMs: "showMs", showResultsCount: "showResultsCount", maxResults: "maxResults", iconTemplate: "iconTemplate", iconRenderer: "iconRenderer", buttonTemplate: "buttonTemplate", emitOnExternalOpen: "emitOnExternalOpen" }, outputs: { itemSelected: "itemSelected", opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"buttonTemplate; else defaultButton\">\n  <ng-container *ngTemplateOutlet=\"buttonTemplate; context: { $implicit: { open: open.bind(this), hotkey: hotkey || defaultConfig?.hotkey || 'Ctrl+K' } }\"></ng-container>\n</ng-container>\n\n<ng-template #defaultButton>\n  <button type=\"button\" class=\"ngx-searchix-trigger\" (click)=\"open()\">\n    <ng-container *ngIf=\"iconTemplate; else defaultSearchIcon\">\n      <ng-container *ngTemplateOutlet=\"iconTemplate\"></ng-container>\n    </ng-container>\n    <ng-template #defaultSearchIcon>\n      <svg class=\"ngx-searchix-icon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n        <path d=\"m21 21-4.35-4.35\"></path>\n      </svg>\n    </ng-template>\n    <span class=\"ngx-searchix-label\">{{ (label || 'Lookup') }}</span>\n    <code class=\"ngx-searchix-hint\">{{ (hotkey || defaultConfig?.hotkey || 'Ctrl+K') }}</code>\n  </button>\n</ng-template>\n", styles: [".ngx-searchix-trigger{display:inline-flex;align-items:center;grid-gap:var(--searchix-trigger-gap, 10px);gap:var(--searchix-trigger-gap, 10px);border-radius:var(--searchix-trigger-radius, 8px);padding:var(--searchix-trigger-py, 8px) var(--searchix-trigger-px, 12px);border:1px solid var(--searchix-trigger-border, rgba(0, 0, 0, .12));background:var(--searchix-trigger-bg, #ffffff);color:var(--searchix-trigger-color, inherit);cursor:pointer;font-family:var(--searchix-font, system-ui, -apple-system, sans-serif);font-size:var(--searchix-trigger-font-size, 14px);transition:all .15s ease;box-shadow:var(--searchix-trigger-shadow, 0 1px 2px rgba(0, 0, 0, .05))}.ngx-searchix-trigger:hover{background:var(--searchix-trigger-bg-hover, #f9fafb);border-color:var(--searchix-trigger-border-hover, rgba(0, 0, 0, .2));box-shadow:var(--searchix-trigger-shadow-hover, 0 2px 4px rgba(0, 0, 0, .08))}.ngx-searchix-trigger:focus{outline:2px solid var(--searchix-trigger-outline, rgba(59, 130, 246, .5));outline-offset:2px}.ngx-searchix-icon{opacity:var(--searchix-trigger-icon-opacity, .6);flex-shrink:0}.ngx-searchix-label{color:var(--searchix-trigger-label-color, inherit);font-weight:var(--searchix-trigger-label-weight, 400)}.ngx-searchix-hint{font-size:var(--searchix-trigger-hint-font, 12px);opacity:var(--searchix-trigger-hint-opacity, .6);padding:var(--searchix-trigger-hint-py, 3px) var(--searchix-trigger-hint-px, 6px);border-radius:var(--searchix-trigger-hint-radius, 4px);border:1px solid var(--searchix-trigger-hint-border, rgba(0, 0, 0, .1));background:var(--searchix-trigger-hint-bg, rgba(0, 0, 0, .04));font-family:var(--searchix-trigger-hint-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-trigger-hint-weight, 500);line-height:1}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-searchix',
                    templateUrl: './searchix.component.html',
                    styleUrls: ['./searchix.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: SearchixOverlayService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SEARCHIX_CONFIG]
                }] }]; }, propDecorators: { items: [{
                type: Input
            }], recentItems: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], hotkey: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], showMs: [{
                type: Input
            }], showResultsCount: [{
                type: Input
            }], maxResults: [{
                type: Input
            }], iconTemplate: [{
                type: Input
            }], iconRenderer: [{
                type: Input
            }], buttonTemplate: [{
                type: Input
            }], emitOnExternalOpen: [{
                type: Input
            }], itemSelected: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], onKeyDown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });

class NgSearchixModule {
    static forRoot(config = {}) {
        return {
            ngModule: NgSearchixModule,
            providers: [{ provide: SEARCHIX_CONFIG, useValue: config }],
        };
    }
}
NgSearchixModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgSearchixModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, declarations: [SearchixComponent, SearchixDialogComponent], imports: [CommonModule, ReactiveFormsModule, OverlayModule, PortalModule], exports: [SearchixComponent] });
NgSearchixModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, imports: [[CommonModule, ReactiveFormsModule, OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SearchixComponent, SearchixDialogComponent],
                    imports: [CommonModule, ReactiveFormsModule, OverlayModule, PortalModule],
                    exports: [SearchixComponent],
                }]
        }] });

function createFuseFilter(options) {
    let fuse = null;
    return (q, items) => {
        if (!q)
            return items;
        if (!fuse || fuse.getIndex().toJSON().records.length !== items.length) {
            fuse = new Fuse(items, Object.assign({ keys: ['title', 'subtitle'], threshold: 0.35, ignoreLocation: true }, options));
        }
        return fuse.search(q).map(r => r.item);
    };
}

/*
 * Public API Surface of ng-searchix
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgSearchixModule, SEARCHIX_CONFIG, SEARCHIX_RECENTS_KEY, SearchixComponent, createFuseFilter };
//# sourceMappingURL=ng-searchix.js.map
