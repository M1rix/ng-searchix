import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { SearchItem } from './models';
import { SEARCHIX_RECENTS_KEY, SearchixConfig } from './tokens';

export class SearchixDialogData {
    items!: SearchItem[];
    recentItems?: SearchItem[];
    config!: SearchixConfig;
    selection$!: Subject<SearchItem>;
    close!: () => void;
}

@Component({
    selector: 'ngx-searchix-dialog',
    templateUrl: './searchix-dialog.component.html',
    styleUrls: ['./searchix-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchixDialogComponent implements AfterViewInit {

    metaKey = '';
    q = new FormControl('');
    searchMs = 0;

    // UI state
    results: SearchItem[] = [];
    recents: SearchItem[] = [];
    activeIndex = 0;

    constructor(
        @Inject(SearchixDialogData) public data: SearchixDialogData,
        private cdr: ChangeDetectorRef
    ) {
        this.metaKey = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? '⌘' : 'Ctrl';
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

    ngAfterViewInit(): void {
        this.debugLog("DialogData", this.data);
        setTimeout(() => (window.document.getElementById('searchix-input')?.focus()));
    }

    // Check if we should show recents (when search input is empty)
    get isShowingRecents(): boolean {
        const searchValue = this.q.value || '';
        return searchValue.trim() === '' && this.recents.length > 0;
    }

    // Get items to display (recents or search results)
    get displayItems(): SearchItem[] {
        return this.isShowingRecents ? this.recents : this.results;
    }

    // Check if search input is empty
    get isSearchEmpty(): boolean {
        const searchValue = this.q.value || '';
        return searchValue.trim() === '';
    }

    trackById(_: number, it: SearchItem): string {
        return it.id;
    }

    select(item: SearchItem): void {
        // Add selected item to recents
        this.addToRecents(item);

        this.data.selection$.next(item);
        if (this.data.config.closeOnSelect !== false) {
            this.data.close();
            this.data.selection$.complete();
        }

    }

    close(): void {
        this.data.close();
        this.data.selection$.complete();
    }

    openExternal(event: Event, item: SearchItem): void {
        event.stopPropagation();
        this.debugLog("Open external link", item);
        if (this.data.config.emitOnExternalOpen) {
            this.data.selection$.next(item);
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeydown(e: KeyboardEvent): void {
        // Handle keyboard navigation for both recents and search results
        if (e.key === 'ArrowDown') {
            this.debugLog("Start", "Navigation ⬇️ Down");
            e.preventDefault();
            this.activeIndex = Math.min(this.activeIndex + 1, Math.max(0, this.displayItems.length - 1));
            window.document.querySelector(`#searchix__item-${this.activeIndex}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
            this.debugLog("End", "Navigation ⬇️ Down");
        } else if (e.key === 'ArrowUp') {
            this.debugLog("Start", "Navigation ⬆️ Up");
            e.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            window.document.querySelector(`#searchix__item-${this.activeIndex}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
            this.debugLog("End", "Navigation ⬆️ Up");
        } else if (e.key === 'Enter') {
            this.debugLog("Start", "Navigation into item");
            const item = this.displayItems[this.activeIndex];
            if (item) {
                e.preventDefault();
                this.debugLog("Around", "Navigation into item", item);
                this.select(item);
            }
            this.debugLog("End", "Navigation into item");

        }
    }

    removeRecent(event: Event, item: SearchItem): void {
        this.debugLog("Remove item from Recents", item);
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

    private addToRecents(item: SearchItem): void {
        this.debugLog("Add item to Recents", item);
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

    private loadRecents(): SearchItem[] {
        // If recentItems provided as input, use them as initial value
        // Note: they will be updated and saved to localStorage on select/remove
        if (this.data.recentItems && this.data.recentItems.length > 0) {
            return [...this.data.recentItems]; // Create a copy to avoid mutating input
        }

        // Otherwise, load from localStorage
        try {
            this.debugLog("Recent Items not provided. Trying to load from local storage");
            const stored = localStorage.getItem(SEARCHIX_RECENTS_KEY);
            if (stored) {
                this.debugLog("Loaded from local storage", JSON.parse(stored));
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load recents from localStorage:', e);
        }

        return [];
    }

    private saveRecentsToLocalStorage(): void {
        this.debugLog("Save recents to local storage", this.recents);
        try {
            localStorage.setItem(SEARCHIX_RECENTS_KEY, JSON.stringify(this.recents));
        } catch (e) {
            console.warn('Failed to save recents to localStorage:', e);
        }
    }

    private filter(q: string): SearchItem[] {
        let start = 0;
        if(this.data.config.showMs) {
            start = performance.now();
        }

        const query = (q || '').trim().toLowerCase();
        const items = this.data.items || [];
        const max = this.data.config.maxResults ?? 50;
        this.debugLog("Start filter with Query: ", q);

        if (this.data.config.filterFn) {
            const filtered = this.data.config.filterFn(query, items) || [];
            this.endTiming(start);
            const result = filtered.slice(0, max);
            this.debugLog("Returned data with FUSE JS", result);
            return result;
        }

        // If query is empty, show recents
        if (!query) {
            this.debugLog("Query is empty, showing recents");
            if (this.recents.length > 0) {
                this.endTiming(start);
                return this.recents.slice(0, max);
            }
            this.endTiming(start);
            return items.slice(0, max);
        }

        // Simple contains matching (Angular-12 friendly, no extra deps).
        // You can swap to Fuse.js later without breaking API.
        const result = items
            .filter(it =>
                (it.title || '').toLowerCase().includes(query) ||
                (it.subtitle || '').toLowerCase().includes(query)
            )
            .slice(0, max);

        this.endTiming(start);
        this.debugLog("Return result with JS Arrays.filter() method", result);
        return result;
    }

    private endTiming(start: number) {
        if (this.data.config.showMs) {
            this.searchMs = Math.round(performance.now() - start);
            this.debugLog("End search timing")
        }
    }

    private debugLog(...args: any) {
        if (this.data.config.debugLogEnabled) {
            console.debug("[NG-SEARCHIX]:", ...args);
        }
    }
}
