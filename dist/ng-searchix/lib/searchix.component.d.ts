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
    hotkey?: string;
    closeOnSelect?: boolean;
    showMs?: boolean;
    showResultsCount?: boolean;
    maxResults?: number;
    iconTemplate?: TemplateRef<any> | null;
    iconRenderer?: TemplateRef<any>;
    buttonTemplate?: TemplateRef<any>;
    emitOnExternalOpen?: boolean;
    itemSelected: EventEmitter<SearchItem>;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    private sub?;
    constructor(overlaySvc: SearchixOverlayService, defaultConfig?: SearchixConfig | undefined);
    open(): void;
    close(): void;
    onKeyDown(e: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchixComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchixComponent, "ngx-searchix", never, { "items": "items"; "recentItems": "recentItems"; "placeholder": "placeholder"; "label": "label"; "hotkey": "hotkey"; "closeOnSelect": "closeOnSelect"; "showMs": "showMs"; "showResultsCount": "showResultsCount"; "maxResults": "maxResults"; "iconTemplate": "iconTemplate"; "iconRenderer": "iconRenderer"; "buttonTemplate": "buttonTemplate"; "emitOnExternalOpen": "emitOnExternalOpen"; }, { "itemSelected": "itemSelected"; "opened": "opened"; "closed": "closed"; }, never, never>;
}
//# sourceMappingURL=searchix.component.d.ts.map