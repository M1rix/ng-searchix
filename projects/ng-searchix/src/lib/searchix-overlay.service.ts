import { Injectable, Injector, Optional, Inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';

import { SearchItem } from './models';
import { SEARCHIX_CONFIG, SearchixConfig } from './tokens';
import { SearchixDialogComponent, SearchixDialogData } from './searchix-dialog.component';

@Injectable({providedIn: 'root'})
export class SearchixOverlayService {
    private overlayRef: OverlayRef | null = null;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        @Optional() @Inject(SEARCHIX_CONFIG) private defaultConfig?: SearchixConfig
    ) {
    }

    isOpen(): boolean {
        return !!this.overlayRef;
    }

    open(items: SearchItem[], config?: SearchixConfig, recentItems?: SearchItem[]): Observable<SearchItem> {
        if (this.overlayRef) {
            // close existing before opening a new one (avoid stacked overlays)
            this.close();
        }

        const merged: SearchixConfig = {
            placeholder: 'Search...',
            hotkey: 'ctrl+k',
            closeOnSelect: true,
            maxResults: 50,
            ...this.defaultConfig,
            ...config,
        };

        const selection$ = new Subject<SearchItem>();

        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .top('10vh');

        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'ngx-searchix-backdrop',
            panelClass: 'ngx-searchix-panel',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        const data: SearchixDialogData = {
            items,
            recentItems,
            config: merged,
            selection$,
            close: () => this.close()
        };

        const portalInjector = Injector.create({
            parent: this.injector,
            providers: [{provide: SearchixDialogData, useValue: data}]
        });

        const portal = new ComponentPortal(SearchixDialogComponent, null, portalInjector);
        this.overlayRef.attach(portal);

        this.overlayRef.backdropClick().subscribe(() => this.close());
        this.overlayRef.keydownEvents().subscribe((ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                ev.preventDefault();
                this.close();
            }
        });

        selection$.subscribe({
            complete: () => {
                // no-op
            }
        });

        // Close overlay when host unsubscribes
        return new Observable<SearchItem>((subscriber) => {
            const sub = selection$.subscribe({
                next: (item) => subscriber.next(item),
                error: (e) => subscriber.error(e),
                complete: () => subscriber.complete()
            });

            return () => {
                sub.unsubscribe();
                this.close();
            };
        });
    }

    close(): void {
        if (!this.overlayRef) return;

        this.overlayRef.dispose();
        this.overlayRef = null;
    }
}
