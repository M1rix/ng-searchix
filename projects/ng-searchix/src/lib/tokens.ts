import { InjectionToken, TemplateRef } from '@angular/core';
import { SearchItem } from './models';

export interface SearchixConfig {
  placeholder?: string;
  label?: string; // e.g. "ctrl+k" or "cmd+k"
  hotkey?: string; // e.g. "ctrl+k" or "cmd+k"
  closeOnSelect?: boolean;
  showMs?: boolean;
  showResultsCount?: boolean;
  maxResults?: number;
  // Optional initial items provider hook (host can still pass items directly)
  // Keeping it sync to stay Angular-12 friendly; you can extend later.
  filterFn?: (q: string, items: SearchItem[]) => SearchItem[];
  itemsFilterFn?: (items?: SearchItem[]) => SearchItem[];
  iconRenderer?: TemplateRef<any>;
  iconTemplate?: TemplateRef<any>;
  buttonTemplate?: TemplateRef<any>;
  // Emit selection event when opening in external link
  emitOnExternalOpen?: boolean;
  // Enable DEBUG log
  debugLogEnabled?: boolean;
}

export const SEARCHIX_CONFIG = new InjectionToken<SearchixConfig>('SEARCHIX_CONFIG');
export const SEARCHIX_RECENTS_KEY = 'searchix-recents'
