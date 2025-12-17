import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
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
        // Load recents from input or localStorage
        this.recents = this.loadRecents();

        this.q.valueChanges.subscribe(val => {
            this.activeIndex = 0;
            this.results = this.filter(val || '');
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => (window.document.getElementById('searchix-input')?.focus()));
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
        // Link will open naturally via href
        // Optionally emit selection event
        if (this.data.config.emitOnExternalOpen) {
            this.data.selection$.next(item);
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeydown(e: KeyboardEvent): void {
        // Only handle keys while dialog is open.
        // Overlay already listens for Escape globally, but we handle arrows/enter here.
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.activeIndex = Math.min(this.activeIndex + 1, Math.max(0, this.results.length - 1));
            window.document.querySelector(`#searchix__item-${this.activeIndex}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            window.document.querySelector(`#searchix__item-${this.activeIndex}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
        } else if (e.key === 'Enter') {
            const item = this.results[this.activeIndex];
            if (item) {
                e.preventDefault();
                this.select(item);
            }
        }
    }

    removeRecent(event: Event, item: SearchItem): void {
        event.stopPropagation();

        // Remove from recents array
        this.recents = this.recents.filter(it => it.id !== item.id);

        // Save to localStorage
        this.saveRecentsToLocalStorage();

        // Update results if search is empty
        if (!this.q.value || this.q.value.trim() === '') {
            this.results = this.filter('');
        }

        this.cdr.markForCheck();
    }

    private addToRecents(item: SearchItem): void {
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
            const stored = localStorage.getItem(SEARCHIX_RECENTS_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load recents from localStorage:', e);
        }

        return [];
    }

    private saveRecentsToLocalStorage(): void {
        try {
            localStorage.setItem(SEARCHIX_RECENTS_KEY, JSON.stringify(this.recents));
        } catch (e) {
            console.warn('Failed to save recents to localStorage:', e);
        }
    }

    private filter(q: string): SearchItem[] {
        const start = performance.now();

        const query = (q || '').trim().toLowerCase();
        const items = this.data.items || [];
        const max = this.data.config.maxResults ?? 50;

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
            .filter(it =>
                (it.title || '').toLowerCase().includes(query) ||
                (it.subtitle || '').toLowerCase().includes(query)
            )
            .slice(0, max);
        this.searchMs = Math.round(performance.now() - start);
        return result;
    }
}
