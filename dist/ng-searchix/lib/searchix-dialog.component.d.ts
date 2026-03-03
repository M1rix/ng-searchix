import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { SearchItem } from './models';
import { SearchixConfig } from './tokens';
import * as i0 from "@angular/core";
export declare class SearchixDialogData {
    items: SearchItem[];
    recentItems?: SearchItem[];
    config: SearchixConfig;
    selection$: Subject<SearchItem>;
    close: () => void;
}
export declare class SearchixDialogComponent implements AfterViewInit {
    data: SearchixDialogData;
    private cdr;
    q: FormControl;
    searchMs: number;
    results: SearchItem[];
    recents: SearchItem[];
    activeIndex: number;
    constructor(data: SearchixDialogData, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    get isShowingRecents(): boolean;
    get displayItems(): SearchItem[];
    get isSearchEmpty(): boolean;
    trackById(_: number, it: SearchItem): string;
    select(item: SearchItem): void;
    close(): void;
    openExternal(event: Event, item: SearchItem): void;
    onKeydown(e: KeyboardEvent): void;
    removeRecent(event: Event, item: SearchItem): void;
    private addToRecents;
    private loadRecents;
    private saveRecentsToLocalStorage;
    private filter;
    private endTiming;
    private debugLog;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchixDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchixDialogComponent, "ngx-searchix-dialog", never, {}, {}, never, never>;
}
//# sourceMappingURL=searchix-dialog.component.d.ts.map