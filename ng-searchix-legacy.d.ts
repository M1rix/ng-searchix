/**
 * Type definitions for ng-searchix-legacy
 * AngularJS 1.5.8+ search component library
 */

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  href?: string;
  data?: any;
}

export interface SearchixConfig {
  placeholder?: string;
  label?: string; // e.g. "ctrl+k" or "cmd+k"
  hotkeyLabel?: string; // e.g. "ctrl+k" or "cmd+k"
  hotkey?: string; // e.g. "ctrl+k" or "cmd+k"
  closeOnSelect?: boolean;
  showMs?: boolean;
  showResultsCount?: boolean;
  maxResults?: number;
  filterFn?: (query: string, items: SearchItem[]) => SearchItem[];
  iconRenderer?: string;
  emitOnExternalOpen?: boolean;
}

export interface SearchixConfigProvider {
  setDefaults(config: SearchixConfig): void;
  $get(): SearchixConfigService;
}

export interface SearchixConfigService {
  getDefaults(): SearchixConfig;
}

export interface SearchixOverlayService {
  isOpen(): boolean;
  open(
    items: SearchItem[],
    config: SearchixConfig,
    recentItems: SearchItem[] | undefined,
    onSelect: (item: SearchItem) => void,
    onClose: () => void
  ): () => void;
  close(): void;
}

export interface SearchixComponentBindings {
  items: SearchItem[];
  recentItems?: SearchItem[];
  placeholder?: string;
  label?: string; // 'Search'
  hotkeyLabel?: string; // e.g. 'ctrl+k'
  hotkey?: string; // e.g. 'ctrl+k'
  closeOnSelect?: boolean;
  showMs?: boolean;
  showResultsCount?: boolean;
  maxResults?: number;
  iconTemplate?: string;
  iconRenderer?: string;
  buttonTemplate?: string;
  emitOnExternalOpen?: boolean;
  onItemSelected?: (locals: { $item: SearchItem }) => void;
  onOpened?: () => void;
  onClosed?: () => void;
}

declare const ngSearchixLegacy: 'ngSearchixLegacy';
export default ngSearchixLegacy;
