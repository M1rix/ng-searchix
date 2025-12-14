import { Component, EventEmitter, HostListener, Inject, Input, Optional, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchItem } from './models';
import { SearchixOverlayService } from './searchix-overlay.service';
import { SEARCHIX_CONFIG, SearchixConfig } from './tokens';

@Component({
  selector: 'ngx-searchix',
  templateUrl: './searchix.component.html',
  styleUrls: ['./searchix.component.scss']
})
export class SearchixComponent {
  @Input() items: SearchItem[] = [];
  @Input() placeholder?: string;
  @Input() hotkey?: string; // e.g. 'ctrl+k'
  @Input() closeOnSelect?: boolean;
  @Input() showMs?: boolean;
  @Input() maxResults?: number;
  @Input() iconTemplate?: TemplateRef<any> | null = null;
  @Input() iconRenderer?: TemplateRef<any>;
  @Input() buttonTemplate?: TemplateRef<any>;
  @Input() emitOnExternalOpen?: boolean;

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
      showMs: this.showMs ?? this.defaultConfig?.showMs,
      placeholder: this.placeholder ?? this.defaultConfig?.placeholder,
      hotkey: this.hotkey ?? this.defaultConfig?.hotkey,
      closeOnSelect: this.closeOnSelect ?? this.defaultConfig?.closeOnSelect,
      maxResults: this.maxResults ?? this.defaultConfig?.maxResults,
      iconRenderer: this.iconRenderer ?? this.defaultConfig?.iconRenderer,
      emitOnExternalOpen: this.emitOnExternalOpen ?? this.defaultConfig?.emitOnExternalOpen,
    };

    this.opened.emit();

    this.sub?.unsubscribe();
    this.sub = this.overlaySvc.open(this.items, config).subscribe({
      next: (it) => this.itemSelected.emit(it),
      complete: () => {
        this.closed.emit();
      }
    });
  }

  close(): void {
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

    const modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
    if (modOk && key && e.key.toLowerCase() === key) {
      e.preventDefault();
      if (this.overlaySvc.isOpen()) this.close();
      else this.open();
    }
  }
}
