import { InjectionToken } from '@angular/core';
import { SearchItem } from './models';

export interface SearchixConfig {
  placeholder?: string;
  hotkey?: string; // e.g. "ctrl+k" or "cmd+k"
  closeOnSelect?: boolean;
  showMs?: boolean;
  maxResults?: number;
  // Optional initial items provider hook (host can still pass items directly)
  // Keeping it sync to stay Angular-12 friendly; you can extend later.
  filterFn?: (q: string, items: SearchItem[]) => SearchItem[];
}

export const SEARCHIX_CONFIG = new InjectionToken<SearchixConfig>('SEARCHIX_CONFIG');
