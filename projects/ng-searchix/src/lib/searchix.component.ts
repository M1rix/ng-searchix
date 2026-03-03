import { Component, EventEmitter, HostListener, Inject, Input, Optional, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchItem } from './models';
import { SearchixOverlayService } from './searchix-overlay.service';
import { SEARCHIX_CONFIG, SEARCHIX_RECENTS_KEY, SearchixConfig } from './tokens';

@Component({
  selector: 'ngx-searchix',
  templateUrl: './searchix.component.html',
  styleUrls: ['./searchix.component.scss']
})
export class SearchixComponent {
  @Input() items: SearchItem[] = [];
  @Input() recentItems?: SearchItem[];
  @Input() placeholder?: string;
  @Input() label?: string; // 'Search'
  @Input() hotkey?: string; // e.g. 'ctrl+k'
  @Input() closeOnSelect?: boolean;
  @Input() showMs?: boolean;
  @Input() showResultsCount?: boolean;
  @Input() emitOnExternalOpen?: boolean;
  @Input() debugLogEnabled?: boolean;
  @Input() maxResults?: number;
  @Input() iconTemplate?: TemplateRef<any> | null = null;
  @Input() iconRenderer?: TemplateRef<any>;
  @Input() buttonTemplate?: TemplateRef<any>;
  @Input() itemsFilterFn?: (items?: SearchItem[]) => SearchItem[];
  @Output() itemSelected = new EventEmitter<SearchItem>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private sub?: Subscription;

  constructor(
      private overlaySvc: SearchixOverlayService,
      @Optional() @Inject(SEARCHIX_CONFIG) public defaultConfig?: SearchixConfig
  ) {}

  open(): void {
    const config: SearchixConfig = {
      ...this.defaultConfig,
        placeholder: this.placeholder ?? this.defaultConfig?.placeholder,
        label: this.label ?? this.defaultConfig?.label,
        hotkey: this.hotkey ?? this.defaultConfig?.hotkey,
        closeOnSelect: this.closeOnSelect ?? this.defaultConfig?.closeOnSelect,
        showMs: this.showMs ?? this.defaultConfig?.showMs,
        showResultsCount: this.showResultsCount ?? this.defaultConfig?.showResultsCount,
        emitOnExternalOpen: this.emitOnExternalOpen ?? this.defaultConfig?.emitOnExternalOpen,
        debugLogEnabled: this.debugLogEnabled ?? this.defaultConfig?.debugLogEnabled,
        maxResults: this.maxResults ?? this.defaultConfig?.maxResults,
        iconRenderer: this.iconRenderer ?? this.defaultConfig?.iconRenderer,
        iconTemplate: this.iconTemplate ?? this.defaultConfig?.iconTemplate,
        buttonTemplate: this.buttonTemplate ?? this.defaultConfig?.buttonTemplate,
    };

    this.debugLog("Open fired with config ", config);

    this.opened.emit();

    this.sub?.unsubscribe();
    let items: SearchItem[] = [];
    let recentItems: SearchItem[] = []
    if (this.itemsFilterFn) {
        items = this.itemsFilterFn(this.items);
        recentItems = this.itemsFilterFn(this.recentItems ?? JSON.parse(window.localStorage.getItem(SEARCHIX_RECENTS_KEY) ?? '[]'));
    }

    this.debugLog("SearchItems", items);
    this.debugLog("RecentItems", recentItems);

    this.sub = this.overlaySvc.open(items, config, recentItems).subscribe({
      next: (it) => this.itemSelected.emit(it),
      complete: () => {
        this.closed.emit();
      }
    });
  }

  close(): void {
    this.debugLog("Close fired");
    this.sub?.unsubscribe();
    this.overlaySvc.close();
    this.closed.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    const hk = (this.hotkey ?? this.defaultConfig?.hotkey ?? 'ctrl+k').toLowerCase();
    const connector = hk.replace(/\w/gm, '');
    const wantCtrl = hk.includes('ctrl');
    const wantCmd = hk.includes('cmd') || hk.includes('meta');
    const key = hk.split(connector).pop();

    const pressedCtrl = e.ctrlKey;
    const pressedCmd = e.metaKey;

    this.debugLog("Pressed key: " + e.code)
    const modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
      if (modOk && key && e.code.toLowerCase() === 'key' + key) {
          e.preventDefault();
          if (this.overlaySvc.isOpen()) this.close();
          else this.open();
      }
  }

  private debugLog(...args: any) {
      if (this.debugLogEnabled) {
          console.debug("[NG-SEARCHIX]:", ...args);
      }
  }
}
