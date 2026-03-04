import { EventEmitter, TemplateRef } from '@angular/core';
import { SearchItem } from './models';
import { SearchixOverlayService } from './searchix-overlay.service';
import { SearchixConfig } from './tokens';
import * as i0 from "@angular/core";
export declare class SearchixComponent {
    private overlaySvc;
    defaultConfig?: SearchixConfig | undefined;
    items: SearchItem[];
    recentItems?: SearchItem[];
    placeholder?: string;
    label?: string;
    hotkeyLabel?: string;
    hotkey?: string;
    closeOnSelect?: boolean;
    showMs?: boolean;
    showResultsCount?: boolean;
    emitOnExternalOpen?: boolean;
    debugLogEnabled?: boolean;
    maxResults?: number;
    iconTemplate?: TemplateRef<any> | null;
    iconRenderer?: TemplateRef<any>;
    buttonTemplate?: TemplateRef<any>;
    itemsFilterFn?: (items?: SearchItem[]) => SearchItem[];
    itemSelected: EventEmitter<SearchItem>;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    private sub?;
    constructor(overlaySvc: SearchixOverlayService, defaultConfig?: SearchixConfig | undefined);
    open(): void;
    close(): void;
    onKeyDown(e: KeyboardEvent): void;
    private debugLog;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchixComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchixComponent, "ngx-searchix", never, { "items": "items"; "recentItems": "recentItems"; "placeholder": "placeholder"; "label": "label"; "hotkeyLabel": "hotkeyLabel"; "hotkey": "hotkey"; "closeOnSelect": "closeOnSelect"; "showMs": "showMs"; "showResultsCount": "showResultsCount"; "emitOnExternalOpen": "emitOnExternalOpen"; "debugLogEnabled": "debugLogEnabled"; "maxResults": "maxResults"; "iconTemplate": "iconTemplate"; "iconRenderer": "iconRenderer"; "buttonTemplate": "buttonTemplate"; "itemsFilterFn": "itemsFilterFn"; }, { "itemSelected": "itemSelected"; "opened": "opened"; "closed": "closed"; }, never, never>;
}
//# sourceMappingURL=searchix.component.d.ts.map