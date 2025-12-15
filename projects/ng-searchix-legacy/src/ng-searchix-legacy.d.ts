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
  hotkey?: string;
  closeOnSelect?: boolean;
  showMs?: boolean;
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
    onSelect: (item: SearchItem) => void,
    onClose: () => void
  ): () => void;
  close(): void;
}

export interface SearchixComponentBindings {
  items: SearchItem[];
  placeholder?: string;
  hotkey?: string;
  closeOnSelect?: boolean;
  showMs?: boolean;
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
