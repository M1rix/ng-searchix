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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VhcmNoaXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9uZy1zZWFyY2hpeC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7O0FBTzNELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUF5QixFQUFFO1FBQ3hDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDNUQsQ0FBQztJQUNKLENBQUM7OzhHQU5VLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGlCQUpaLGlCQUFpQixFQUFFLHVCQUF1QixhQUMvQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksYUFDOUQsaUJBQWlCOytHQUVoQixnQkFBZ0IsWUFIbEIsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQzs0RkFHOUQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDekUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG5pbXBvcnQgeyBTZWFyY2hpeENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoaXguY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaGl4RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2hpeC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNFQVJDSElYX0NPTkZJRywgU2VhcmNoaXhDb25maWcgfSBmcm9tICcuL3Rva2Vucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NlYXJjaGl4Q29tcG9uZW50LCBTZWFyY2hpeERpYWxvZ0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtTZWFyY2hpeENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VhcmNoaXhNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNlYXJjaGl4Q29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nU2VhcmNoaXhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nU2VhcmNoaXhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFNFQVJDSElYX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XSxcbiAgICB9O1xuICB9XG59XG4iXX0=