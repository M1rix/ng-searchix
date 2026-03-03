import { Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { SearchItem } from './models';
import { SearchixConfig } from './tokens';
import * as i0 from "@angular/core";
export declare class SearchixOverlayService {
    private overlay;
    private injector;
    private defaultConfig?;
    private overlayRef;
    constructor(overlay: Overlay, injector: Injector, defaultConfig?: SearchixConfig | undefined);
    isOpen(): boolean;
    open(items: SearchItem[], config?: SearchixConfig, recentItems?: SearchItem[]): Observable<SearchItem>;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchixOverlayService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchixOverlayService>;
}
//# sourceMappingURL=searchix-overlay.service.d.ts.map