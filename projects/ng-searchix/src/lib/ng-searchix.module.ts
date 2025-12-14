import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { SearchixComponent } from './searchix.component';
import { SearchixDialogComponent } from './searchix-dialog.component';
import { SEARCHIX_CONFIG, SearchixConfig } from './tokens';

@NgModule({
  declarations: [SearchixComponent, SearchixDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, OverlayModule, PortalModule],
  exports: [SearchixComponent],
})
export class NgSearchixModule {
  static forRoot(config: SearchixConfig = {}): ModuleWithProviders<NgSearchixModule> {
    return {
      ngModule: NgSearchixModule,
      providers: [{ provide: SEARCHIX_CONFIG, useValue: config }],
    };
  }
}
