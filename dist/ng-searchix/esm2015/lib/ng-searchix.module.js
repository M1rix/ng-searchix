import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { SearchixComponent } from './searchix.component';
import { SearchixDialogComponent } from './searchix-dialog.component';
import { SEARCHIX_CONFIG } from './tokens';
import * as i0 from "@angular/core";
export class NgSearchixModule {
    static forRoot(config = {}) {
        return {
            ngModule: NgSearchixModule,
            providers: [{ provide: SEARCHIX_CONFIG, useValue: config }],
        };
    }
}
NgSearchixModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgSearchixModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, declarations: [SearchixComponent, SearchixDialogComponent], imports: [CommonModule, ReactiveFormsModule, OverlayModule, PortalModule], exports: [SearchixComponent] });
NgSearchixModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, imports: [[CommonModule, ReactiveFormsModule, OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgSearchixModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SearchixComponent, SearchixDialogComponent],
                    imports: [CommonModule, ReactiveFormsModule, OverlayModule, PortalModule],
                    exports: [SearchixComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VhcmNoaXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9uZy1zZWFyY2hpeC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7O0FBTzNELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUF5QixFQUFFO1FBQ3hDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDNUQsQ0FBQztJQUNKLENBQUM7OzhHQU5VLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQUpaLGlCQUFpQixFQUFFLHVCQUF1QixhQUMvQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksYUFDOUQsaUJBQWlCOytHQUVoQixnQkFBZ0IsWUFIbEIsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQzs0RkFHOUQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDekUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hpeENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoaXguY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VhcmNoaXhEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaGl4LWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTRUFSQ0hJWF9DT05GSUcsIFNlYXJjaGl4Q29uZmlnIH0gZnJvbSAnLi90b2tlbnMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtTZWFyY2hpeENvbXBvbmVudCwgU2VhcmNoaXhEaWFsb2dDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1NlYXJjaGl4Q29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nU2VhcmNoaXhNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU2VhcmNoaXhDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmdTZWFyY2hpeE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5nU2VhcmNoaXhNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogU0VBUkNISVhfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19