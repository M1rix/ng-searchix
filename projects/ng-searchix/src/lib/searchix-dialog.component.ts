import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { SearchItem } from './models';
import { SearchixConfig } from './tokens';

export class SearchixDialogData {
    items!: SearchItem[];
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
    @ViewChild('searchInput', { static: false })
    searchInput?: HTMLInputElement;

    @ViewChild('searchList', { static: false })
    searchList?: HTMLInputElement;

    q = new FormControl('');
    searchMs = 0;

    // UI state
    results: SearchItem[] = [];
    activeIndex = 0;

    constructor(@Inject(SearchixDialogData) public data: SearchixDialogData) {
        this.results = this.filter('');

        this.q.valueChanges.subscribe(val => {
            this.activeIndex = 0;
            this.results = this.filter(val || '');
        });
    }

    ngAfterViewInit(): void {
        this.searchInput?.focus();
    }

    trackById(_: number, it: SearchItem): string {
        return it.id;
    }

    select(item: SearchItem): void {
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
            this.searchList?.children[this.activeIndex].scroll({behavior: 'smooth'});
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            this.searchList?.children[this.activeIndex].scroll({behavior: 'smooth'});
        } else if (e.key === 'Enter') {
            const item = this.results[this.activeIndex];
            if (item) {
                e.preventDefault();
                this.select(item);
            }
        }
    }

    private filter(q: string): SearchItem[] {
        const start = performance.now();

        const query = (q || '').trim().toLowerCase();
        const items = this.data.items || [];
        const max = this.data.config.maxResults ?? 50;

        if (this.data.config.filterFn) {
            return (this.data.config.filterFn(query, items) || []).slice(0, max);
        }

        if (!query) return items.slice(0, max);

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
