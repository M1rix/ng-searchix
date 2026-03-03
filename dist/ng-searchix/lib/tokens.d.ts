import { InjectionToken, TemplateRef } from '@angular/core';
import { SearchItem } from './models';
export interface SearchixConfig {
    placeholder?: string;
    label?: string;
    hotkey?: string;
    closeOnSelect?: boolean;
    showMs?: boolean;
    showResultsCount?: boolean;
    maxResults?: number;
    filterFn?: (q: string, items: SearchItem[]) => SearchItem[];
    iconRenderer?: TemplateRef<any>;
    emitOnExternalOpen?: boolean;
}
export declare const SEARCHIX_CONFIG: InjectionToken<SearchixConfig>;
export declare const SEARCHIX_RECENTS_KEY = "searchix-recents";
//# sourceMappingURL=tokens.d.ts.map