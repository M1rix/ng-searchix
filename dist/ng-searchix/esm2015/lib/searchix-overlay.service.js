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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoaXgtb3ZlcmxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9zZWFyY2hpeC1vdmVybGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUcxRixNQUFNLE9BQU8sc0JBQXNCO0lBRy9CLFlBQ1ksT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbUIsYUFBOEI7UUFGbkUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ21CLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUx2RSxlQUFVLEdBQXNCLElBQUksQ0FBQztJQU83QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFtQixFQUFFLE1BQXVCLEVBQUUsV0FBMEI7UUFDekUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLG1FQUFtRTtZQUNuRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFFRCxNQUFNLE1BQU0saUNBQ1IsV0FBVyxFQUFFLFdBQVcsRUFDeEIsTUFBTSxFQUFFLFFBQVEsRUFDaEIsYUFBYSxFQUFFLElBQUksRUFDbkIsVUFBVSxFQUFFLEVB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QkFBc0IsaUVBTVAsZUFBZTt3SEFOOUIsc0JBQXNCLGNBRFYsTUFBTTs0RkFDbEIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBT3ZCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlYXJjaEl0ZW0gfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBTRUFSQ0hJWF9DT05GSUcsIFNlYXJjaGl4Q29uZmlnIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgU2VhcmNoaXhEaWFsb2dDb21wb25lbnQsIFNlYXJjaGl4RGlhbG9nRGF0YSB9IGZyb20gJy4vc2VhcmNoaXgtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFNlYXJjaGl4T3ZlcmxheVNlcnZpY2Uge1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VBUkNISVhfQ09ORklHKSBwcml2YXRlIGRlZmF1bHRDb25maWc/OiBTZWFyY2hpeENvbmZpZ1xuICAgICkge1xuICAgIH1cblxuICAgIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIG9wZW4oaXRlbXM6IFNlYXJjaEl0ZW1bXSwgY29uZmlnPzogU2VhcmNoaXhDb25maWcsIHJlY2VudEl0ZW1zPzogU2VhcmNoSXRlbVtdKTogT2JzZXJ2YWJsZTxTZWFyY2hJdGVtPiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIC8vIGNsb3NlIGV4aXN0aW5nIGJlZm9yZSBvcGVuaW5nIGEgbmV3IG9uZSAoYXZvaWQgc3RhY2tlZCBvdmVybGF5cylcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lcmdlZDogU2VhcmNoaXhDb25maWcgPSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaC4uLicsXG4gICAgICAgICAgICBob3RrZXk6ICdjdHJsK2snLFxuICAgICAgICAgICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG1heFJlc3VsdHM6IDUwLFxuICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiQgPSBuZXcgU3ViamVjdDxTZWFyY2hJdGVtPigpO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmdsb2JhbCgpXG4gICAgICAgICAgICAuY2VudGVySG9yaXpvbnRhbGx5KClcbiAgICAgICAgICAgIC50b3AoJzEwdmgnKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ25neC1zZWFyY2hpeC1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbmd4LXNlYXJjaGl4LXBhbmVsJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkYXRhOiBTZWFyY2hpeERpYWxvZ0RhdGEgPSB7XG4gICAgICAgICAgICBpdGVtcyxcbiAgICAgICAgICAgIHJlY2VudEl0ZW1zLFxuICAgICAgICAgICAgY29uZmlnOiBtZXJnZWQsXG4gICAgICAgICAgICBzZWxlY3Rpb24kLFxuICAgICAgICAgICAgY2xvc2U6ICgpID0+IHRoaXMuY2xvc2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBvcnRhbEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICAgICAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBTZWFyY2hpeERpYWxvZ0RhdGEsIHVzZVZhbHVlOiBkYXRhfV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChTZWFyY2hpeERpYWxvZ0NvbXBvbmVudCwgbnVsbCwgcG9ydGFsSW5qZWN0b3IpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKHBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxlY3Rpb24kLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5vLW9wXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsb3NlIG92ZXJsYXkgd2hlbiBob3N0IHVuc3Vic2NyaWJlc1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8U2VhcmNoSXRlbT4oKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHNlbGVjdGlvbiQuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBuZXh0OiAoaXRlbSkgPT4gc3Vic2NyaWJlci5uZXh0KGl0ZW0pLFxuICAgICAgICAgICAgICAgIGVycm9yOiAoZSkgPT4gc3Vic2NyaWJlci5lcnJvcihlKSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4gc3Vic2NyaWJlci5jb21wbGV0ZSgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHJldHVybjtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgIH1cbn1cbiJdfQ==