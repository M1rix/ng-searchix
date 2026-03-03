import { Injectable, Injector, Optional, Inject } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import { SEARCHIX_CONFIG } from './tokens';
import { SearchixDialogComponent, SearchixDialogData } from './searchix-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class SearchixOverlayService {
    constructor(overlay, injector, defaultConfig) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultConfig = defaultConfig;
        this.overlayRef = null;
    }
    isOpen() {
        return !!this.overlayRef;
    }
    open(items, config, recentItems) {
        if (this.overlayRef) {
            // close existing before opening a new one (avoid stacked overlays)
            this.close();
        }
        const merged = Object.assign(Object.assign({ placeholder: 'Search...', hotkey: 'ctrl+k', closeOnSelect: true, maxResults: 50 }, this.defaultConfig), config);
        const selection$ = new Subject();
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
        const data = {
            items,
            recentItems,
            config: merged,
            selection$,
            close: () => this.close()
        };
        const portalInjector = Injector.create({
            parent: this.injector,
            providers: [{ provide: SearchixDialogData, useValue: data }]
        });
        const portal = new ComponentPortal(SearchixDialogComponent, null, portalInjector);
        this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(() => this.close());
        this.overlayRef.keydownEvents().subscribe((ev) => {
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
        return new Observable((subscriber) => {
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
    close() {
        if (!this.overlayRef)
            return;
        this.overlayRef.dispose();
        this.overlayRef = null;
    }
}
SearchixOverlayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SearchixOverlayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixOverlayService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SEARCHIX_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoaXgtb3ZlcmxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9zZWFyY2hpeC1vdmVybGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUcxRixNQUFNLE9BQU8sc0JBQXNCO0lBRy9CLFlBQ1ksT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbUIsYUFBOEI7UUFGbkUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ21CLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUx2RSxlQUFVLEdBQXNCLElBQUksQ0FBQztJQU83QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFtQixFQUFFLE1BQXVCLEVBQUUsV0FBMEI7UUFDekUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLG1FQUFtRTtZQUNuRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFFRCxNQUFNLE1BQU0saUNBQ1IsV0FBVyxFQUFFLFdBQVcsRUFDeEIsTUFBTSxFQUFFLFFBQVEsRUFDaEIsYUFBYSxFQUFFLElBQUksRUFDbkIsVUFBVSxFQUFFLEVB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QkFBc0IsaUVBTVAsZUFBZTt3SEFOOUIsc0JBQXNCLGNBRFYsTUFBTTs0RkFDbEIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBT3ZCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hJdGVtIH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTRUFSQ0hJWF9DT05GSUcsIFNlYXJjaGl4Q29uZmlnIH0gZnJvbSAnLi90b2tlbnMnO1xyXG5pbXBvcnQgeyBTZWFyY2hpeERpYWxvZ0NvbXBvbmVudCwgU2VhcmNoaXhEaWFsb2dEYXRhIH0gZnJvbSAnLi9zZWFyY2hpeC1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoaXhPdmVybGF5U2VydmljZSB7XHJcbiAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXHJcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChTRUFSQ0hJWF9DT05GSUcpIHByaXZhdGUgZGVmYXVsdENvbmZpZz86IFNlYXJjaGl4Q29uZmlnXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICBpc09wZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vdmVybGF5UmVmO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oaXRlbXM6IFNlYXJjaEl0ZW1bXSwgY29uZmlnPzogU2VhcmNoaXhDb25maWcsIHJlY2VudEl0ZW1zPzogU2VhcmNoSXRlbVtdKTogT2JzZXJ2YWJsZTxTZWFyY2hJdGVtPiB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBleGlzdGluZyBiZWZvcmUgb3BlbmluZyBhIG5ldyBvbmUgKGF2b2lkIHN0YWNrZWQgb3ZlcmxheXMpXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1lcmdlZDogU2VhcmNoaXhDb25maWcgPSB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgICAgICAgICAgaG90a2V5OiAnY3RybCtrJyxcclxuICAgICAgICAgICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgbWF4UmVzdWx0czogNTAsXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdENvbmZpZyxcclxuICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiQgPSBuZXcgU3ViamVjdDxTZWFyY2hJdGVtPigpO1xyXG5cclxuICAgICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcclxuICAgICAgICAgICAgLmdsb2JhbCgpXHJcbiAgICAgICAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxyXG4gICAgICAgICAgICAudG9wKCcxMHZoJyk7XHJcblxyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xyXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcclxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ25neC1zZWFyY2hpeC1iYWNrZHJvcCcsXHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICduZ3gtc2VhcmNoaXgtcGFuZWwnLFxyXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcclxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhOiBTZWFyY2hpeERpYWxvZ0RhdGEgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICByZWNlbnRJdGVtcyxcclxuICAgICAgICAgICAgY29uZmlnOiBtZXJnZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiQsXHJcbiAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB0aGlzLmNsb3NlKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBwb3J0YWxJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFNlYXJjaGl4RGlhbG9nRGF0YSwgdXNlVmFsdWU6IGRhdGF9XVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKFNlYXJjaGl4RGlhbG9nQ29tcG9uZW50LCBudWxsLCBwb3J0YWxJbmplY3Rvcik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChwb3J0YWwpO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxlY3Rpb24kLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBuby1vcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENsb3NlIG92ZXJsYXkgd2hlbiBob3N0IHVuc3Vic2NyaWJlc1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxTZWFyY2hJdGVtPigoc3Vic2NyaWJlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWIgPSBzZWxlY3Rpb24kLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiAoaXRlbSkgPT4gc3Vic2NyaWJlci5uZXh0KGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChlKSA9PiBzdWJzY3JpYmVyLmVycm9yKGUpLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHN1YnNjcmliZXIuY29tcGxldGUoKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19