import { Component, EventEmitter, HostListener, Inject, Input, Optional, Output } from '@angular/core';
import { SEARCHIX_CONFIG } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./searchix-overlay.service";
import * as i2 from "@angular/common";
export class SearchixComponent {
    constructor(overlaySvc, defaultConfig) {
        this.overlaySvc = overlaySvc;
        this.defaultConfig = defaultConfig;
        this.items = [];
        this.iconTemplate = null;
        this.itemSelected = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
    }
    open() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        const config = Object.assign(Object.assign({}, this.defaultConfig), { showMs: (_a = this.showMs) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.showMs, showResultsCount: (_c = this.showResultsCount) !== null && _c !== void 0 ? _c : (_d = this.defaultConfig) === null || _d === void 0 ? void 0 : _d.showResultsCount, label: (_e = this.label) !== null && _e !== void 0 ? _e : (_f = this.defaultConfig) === null || _f === void 0 ? void 0 : _f.label, placeholder: (_g = this.placeholder) !== null && _g !== void 0 ? _g : (_h = this.defaultConfig) === null || _h === void 0 ? void 0 : _h.placeholder, hotkey: (_j = this.hotkey) !== null && _j !== void 0 ? _j : (_k = this.defaultConfig) === null || _k === void 0 ? void 0 : _k.hotkey, closeOnSelect: (_l = this.closeOnSelect) !== null && _l !== void 0 ? _l : (_m = this.defaultConfig) === null || _m === void 0 ? void 0 : _m.closeOnSelect, maxResults: (_o = this.maxResults) !== null && _o !== void 0 ? _o : (_p = this.defaultConfig) === null || _p === void 0 ? void 0 : _p.maxResults, iconRenderer: (_q = this.iconRenderer) !== null && _q !== void 0 ? _q : (_r = this.defaultConfig) === null || _r === void 0 ? void 0 : _r.iconRenderer, emitOnExternalOpen: (_s = this.emitOnExternalOpen) !== null && _s !== void 0 ? _s : (_t = this.defaultConfig) === null || _t === void 0 ? void 0 : _t.emitOnExternalOpen });
        this.opened.emit();
        (_u = this.sub) === null || _u === void 0 ? void 0 : _u.unsubscribe();
        this.sub = this.overlaySvc.open(this.items, config, this.recentItems).subscribe({
            next: (it) => this.itemSelected.emit(it),
            complete: () => {
                this.closed.emit();
            }
        });
    }
    close() {
        var _a;
        (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.overlaySvc.close();
        this.closed.emit();
    }
    onKeyDown(e) {
        var _a, _b, _c;
        const hk = ((_c = (_a = this.hotkey) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.hotkey) !== null && _c !== void 0 ? _c : 'ctrl+k').toLowerCase();
        const connector = hk.replace(/\w/gm, '');
        const wantCtrl = hk.includes('ctrl');
        const wantCmd = hk.includes('cmd') || hk.includes('meta');
        const key = hk.split(connector).pop();
        const pressedCtrl = e.ctrlKey;
        const pressedCmd = e.metaKey;
        const modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
        if (modOk && key && e.code.toLowerCase() === 'key' + key) {
            e.preventDefault();
            if (this.overlaySvc.isOpen())
                this.close();
            else
                this.open();
        }
    }
}
SearchixComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, deps: [{ token: i1.SearchixOverlayService }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
SearchixComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixComponent, selector: "ngx-searchix", inputs: { items: "items", recentItems: "recentItems", placeholder: "placeholder", label: "label", hotkey: "hotkey", closeOnSelect: "closeOnSelect", showMs: "showMs", showResultsCount: "showResultsCount", maxResults: "maxResults", iconTemplate: "iconTemplate", iconRenderer: "iconRenderer", buttonTemplate: "buttonTemplate", emitOnExternalOpen: "emitOnExternalOpen" }, outputs: { itemSelected: "itemSelected", opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"buttonTemplate; else defaultButton\">\r\n  <ng-container *ngTemplateOutlet=\"buttonTemplate; context: { $implicit: { open: open.bind(this), hotkey: hotkey || defaultConfig?.hotkey || 'Ctrl+K' } }\"></ng-container>\r\n</ng-container>\r\n\r\n<ng-template #defaultButton>\r\n  <button type=\"button\" class=\"ngx-searchix-trigger\" (click)=\"open()\">\r\n    <ng-container *ngIf=\"iconTemplate; else defaultSearchIcon\">\r\n      <ng-container *ngTemplateOutlet=\"iconTemplate\"></ng-container>\r\n    </ng-container>\r\n    <ng-template #defaultSearchIcon>\r\n      <svg class=\"ngx-searchix-icon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n        <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n        <path d=\"m21 21-4.35-4.35\"></path>\r\n      </svg>\r\n    </ng-template>\r\n    <span class=\"ngx-searchix-label\">{{ (label || 'Lookup') }}</span>\r\n    <code class=\"ngx-searchix-hint\">{{ (hotkey || defaultConfig?.hotkey || 'Ctrl+K') }}</code>\r\n  </button>\r\n</ng-template>\r\n", styles: [".ngx-searchix-trigger{display:inline-flex;align-items:center;grid-gap:var(--searchix-trigger-gap, 10px);gap:var(--searchix-trigger-gap, 10px);border-radius:var(--searchix-trigger-radius, 8px);padding:var(--searchix-trigger-py, 8px) var(--searchix-trigger-px, 12px);border:1px solid var(--searchix-trigger-border, rgba(0, 0, 0, .12));background:var(--searchix-trigger-bg, #ffffff);color:var(--searchix-trigger-color, inherit);cursor:pointer;font-family:var(--searchix-font, system-ui, -apple-system, sans-serif);font-size:var(--searchix-trigger-font-size, 14px);transition:all .15s ease;box-shadow:var(--searchix-trigger-shadow, 0 1px 2px rgba(0, 0, 0, .05))}.ngx-searchix-trigger:hover{background:var(--searchix-trigger-bg-hover, #f9fafb);border-color:var(--searchix-trigger-border-hover, rgba(0, 0, 0, .2));box-shadow:var(--searchix-trigger-shadow-hover, 0 2px 4px rgba(0, 0, 0, .08))}.ngx-searchix-trigger:focus{outline:2px solid var(--searchix-trigger-outline, rgba(59, 130, 246, .5));outline-offset:2px}.ngx-searchix-icon{opacity:var(--searchix-trigger-icon-opacity, .6);flex-shrink:0}.ngx-searchix-label{color:var(--searchix-trigger-label-color, inherit);font-weight:var(--searchix-trigger-label-weight, 400)}.ngx-searchix-hint{font-size:var(--searchix-trigger-hint-font, 12px);opacity:var(--searchix-trigger-hint-opacity, .6);padding:var(--searchix-trigger-hint-py, 3px) var(--searchix-trigger-hint-px, 6px);border-radius:var(--searchix-trigger-hint-radius, 4px);border:1px solid var(--searchix-trigger-hint-border, rgba(0, 0, 0, .1));background:var(--searchix-trigger-hint-bg, rgba(0, 0, 0, .04));font-family:var(--searchix-trigger-hint-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-trigger-hint-weight, 500);line-height:1}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-searchix',
                    templateUrl: './searchix.component.html',
                    styleUrls: ['./searchix.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.SearchixOverlayService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SEARCHIX_CONFIG]
                }] }]; }, propDecorators: { items: [{
                type: Input
            }], recentItems: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], hotkey: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], showMs: [{
                type: Input
            }], showResultsCount: [{
                type: Input
            }], maxResults: [{
                type: Input
            }], iconTemplate: [{
                type: Input
            }], iconRenderer: [{
                type: Input
            }], buttonTemplate: [{
                type: Input
            }], emitOnExternalOpen: [{
                type: Input
            }], itemSelected: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], onKeyDown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoaXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9zZWFyY2hpeC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1zZWFyY2hpeC9zcmMvbGliL3NlYXJjaGl4LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFLcEgsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7Ozs7QUFPM0QsTUFBTSxPQUFPLGlCQUFpQjtJQXFCNUIsWUFDWSxVQUFrQyxFQUNFLGFBQThCO1FBRGxFLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ0Usa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBdEJyRSxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQVN6QixpQkFBWSxHQUE2QixJQUFJLENBQUM7UUFLN0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzlDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBT3pDLENBQUM7SUFFSixJQUFJOztRQUNGLE1BQU0sTUFBTSxtQ0FDUCxJQUFJLENBQUMsYUFBYSxLQUNyQixNQUFNLEVBQUUsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLE1BQU0sRUFDakQsZ0JBQWdCLEVBQUUsTUFBQSxJQUFJLENBQUMsZ0JBQWdCLG1DQUFJLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsZ0JBQWdCLEVBQy9FLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxLQUFLLG1DQUFJLE1BQUEs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QUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDOzsrR0ExRVUsaUJBQWlCLHdEQXVCSixlQUFlO21HQXZCNUIsaUJBQWlCLHFqQkNaOUIsNm1DQW1CQTs0RkRQYSxpQkFBaUI7a0JBTDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFdBQVcsRUFBRSwyQkFBMkI7b0JBQ3hDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6Qzs7MEJBd0JNLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZTs0Q0F0QjlCLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQXlDUCxTQUFTO3NCQURSLFlBQVk7dUJBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaEl0ZW0gfSBmcm9tICcuL21vZGVscyc7XHJcbmltcG9ydCB7IFNlYXJjaGl4T3ZlcmxheVNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaGl4LW92ZXJsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IFNFQVJDSElYX0NPTkZJRywgU2VhcmNoaXhDb25maWcgfSBmcm9tICcuL3Rva2Vucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1zZWFyY2hpeCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaGl4LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2hpeC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hpeENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaXRlbXM6IFNlYXJjaEl0ZW1bXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHJlY2VudEl0ZW1zPzogU2VhcmNoSXRlbVtdO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nOyAvLyAnU2VhcmNoJ1xyXG4gIEBJbnB1dCgpIGhvdGtleT86IHN0cmluZzsgLy8gZS5nLiAnY3RybCtrJ1xyXG4gIEBJbnB1dCgpIGNsb3NlT25TZWxlY3Q/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dNcz86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1Jlc3VsdHNDb3VudD86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbWF4UmVzdWx0cz86IG51bWJlcjtcclxuICBASW5wdXQoKSBpY29uVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgaWNvblJlbmRlcmVyPzogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBidXR0b25UZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgZW1pdE9uRXh0ZXJuYWxPcGVuPzogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIGl0ZW1TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoSXRlbT4oKTtcclxuICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIHByaXZhdGUgc3ViPzogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBvdmVybGF5U3ZjOiBTZWFyY2hpeE92ZXJsYXlTZXJ2aWNlLFxyXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFNFQVJDSElYX0NPTkZJRykgcHVibGljIGRlZmF1bHRDb25maWc/OiBTZWFyY2hpeENvbmZpZ1xyXG4gICkge31cclxuXHJcbiAgb3BlbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbmZpZzogU2VhcmNoaXhDb25maWcgPSB7XHJcbiAgICAgIC4uLnRoaXMuZGVmYXVsdENvbmZpZyxcclxuICAgICAgc2hvd01zOiB0aGlzLnNob3dNcyA/PyB0aGlzLmRlZmF1bHRDb25maWc/LnNob3dNcyxcclxuICAgICAgc2hvd1Jlc3VsdHNDb3VudDogdGhpcy5zaG93UmVzdWx0c0NvdW50ID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uc2hvd1Jlc3VsdHNDb3VudCxcclxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5sYWJlbCxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5wbGFjZWhvbGRlcixcclxuICAgICAgaG90a2V5OiB0aGlzLmhvdGtleSA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmhvdGtleSxcclxuICAgICAgY2xvc2VPblNlbGVjdDogdGhpcy5jbG9zZU9uU2VsZWN0ID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uY2xvc2VPblNlbGVjdCxcclxuICAgICAgbWF4UmVzdWx0czogdGhpcy5tYXhSZXN1bHRzID8/IHRoaXMuZGVmYXVsdENvbmZpZz8ubWF4UmVzdWx0cyxcclxuICAgICAgaWNvblJlbmRlcmVyOiB0aGlzLmljb25SZW5kZXJlciA/PyB0aGlzLmRlZmF1bHRDb25maWc/Lmljb25SZW5kZXJlcixcclxuICAgICAgZW1pdE9uRXh0ZXJuYWxPcGVuOiB0aGlzLmVtaXRPbkV4dGVybmFsT3BlbiA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmVtaXRPbkV4dGVybmFsT3BlbixcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xyXG5cclxuICAgIHRoaXMuc3ViPy51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIgPSB0aGlzLm92ZXJsYXlTdmMub3Blbih0aGlzLml0ZW1zLCBjb25maWcsIHRoaXMucmVjZW50SXRlbXMpLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IChpdCkgPT4gdGhpcy5pdGVtU2VsZWN0ZWQuZW1pdChpdCksXHJcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWI/LnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLm92ZXJsYXlTdmMuY2xvc2UoKTtcclxuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBoayA9ICh0aGlzLmhvdGtleSA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmhvdGtleSA/PyAnY3RybCtrJykudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGNvbm5lY3RvciA9IGhrLnJlcGxhY2UoL1xcdy9nbSwgJycpO1xyXG4gICAgY29uc3Qgd2FudEN0cmwgPSBoay5pbmNsdWRlcygnY3RybCcpO1xyXG4gICAgY29uc3Qgd2FudENtZCA9IGhrLmluY2x1ZGVzKCdjbWQnKSB8fCBoay5pbmNsdWRlcygnbWV0YScpO1xyXG4gICAgY29uc3Qga2V5ID0gaGsuc3BsaXQoY29ubmVjdG9yKS5wb3AoKTtcclxuXHJcbiAgICBjb25zdCBwcmVzc2VkQ3RybCA9IGUuY3RybEtleTtcclxuICAgIGNvbnN0IHByZXNzZWRDbWQgPSBlLm1ldGFLZXk7XHJcblxyXG4gICAgY29uc3QgbW9kT2sgPSAod2FudEN0cmwgJiYgcHJlc3NlZEN0cmwpIHx8ICh3YW50Q21kICYmIHByZXNzZWRDbWQpIHx8ICghd2FudEN0cmwgJiYgIXdhbnRDbWQgJiYgKHByZXNzZWRDdHJsIHx8IHByZXNzZWRDbWQpKTtcclxuICAgICAgaWYgKG1vZE9rICYmIGtleSAmJiBlLmNvZGUudG9Mb3dlckNhc2UoKSA9PT0gJ2tleScgKyBrZXkpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdmMuaXNPcGVuKCkpIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgIGVsc2UgdGhpcy5vcGVuKCk7XHJcbiAgICAgIH1cclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvblRlbXBsYXRlOyBlbHNlIGRlZmF1bHRCdXR0b25cIj5cclxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnV0dG9uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IG9wZW46IG9wZW4uYmluZCh0aGlzKSwgaG90a2V5OiBob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snIH0gfVwiPjwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEJ1dHRvbj5cclxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5neC1zZWFyY2hpeC10cmlnZ2VyXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImljb25UZW1wbGF0ZTsgZWxzZSBkZWZhdWx0U2VhcmNoSWNvblwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFNlYXJjaEljb24+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaWNvblwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTFcIiBjeT1cIjExXCIgcj1cIjhcIj48L2NpcmNsZT5cclxuICAgICAgICA8cGF0aCBkPVwibTIxIDIxLTQuMzUtNC4zNVwiPjwvcGF0aD5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJuZ3gtc2VhcmNoaXgtbGFiZWxcIj57eyAobGFiZWwgfHwgJ0xvb2t1cCcpIH19PC9zcGFuPlxyXG4gICAgPGNvZGUgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaGludFwiPnt7IChob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snKSB9fTwvY29kZT5cclxuICA8L2J1dHRvbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19