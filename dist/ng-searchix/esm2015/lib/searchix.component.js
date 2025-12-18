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
        if (modOk && key && e.key.toLowerCase() === key) {
            e.preventDefault();
            if (this.overlaySvc.isOpen())
                this.close();
            else
                this.open();
        }
    }
}
SearchixComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, deps: [{ token: i1.SearchixOverlayService }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
SearchixComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixComponent, selector: "ngx-searchix", inputs: { items: "items", recentItems: "recentItems", placeholder: "placeholder", label: "label", hotkey: "hotkey", closeOnSelect: "closeOnSelect", showMs: "showMs", showResultsCount: "showResultsCount", maxResults: "maxResults", iconTemplate: "iconTemplate", iconRenderer: "iconRenderer", buttonTemplate: "buttonTemplate", emitOnExternalOpen: "emitOnExternalOpen" }, outputs: { itemSelected: "itemSelected", opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"buttonTemplate; else defaultButton\">\n  <ng-container *ngTemplateOutlet=\"buttonTemplate; context: { $implicit: { open: open.bind(this), hotkey: hotkey || defaultConfig?.hotkey || 'Ctrl+K' } }\"></ng-container>\n</ng-container>\n\n<ng-template #defaultButton>\n  <button type=\"button\" class=\"ngx-searchix-trigger\" (click)=\"open()\">\n    <ng-container *ngIf=\"iconTemplate; else defaultSearchIcon\">\n      <ng-container *ngTemplateOutlet=\"iconTemplate\"></ng-container>\n    </ng-container>\n    <ng-template #defaultSearchIcon>\n      <svg class=\"ngx-searchix-icon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n        <path d=\"m21 21-4.35-4.35\"></path>\n      </svg>\n    </ng-template>\n    <span class=\"ngx-searchix-label\">{{ (label || 'Lookup') }}</span>\n    <code class=\"ngx-searchix-hint\">{{ (hotkey || defaultConfig?.hotkey || 'Ctrl+K') }}</code>\n  </button>\n</ng-template>\n", styles: [".ngx-searchix-trigger{display:inline-flex;align-items:center;grid-gap:var(--searchix-trigger-gap, 10px);gap:var(--searchix-trigger-gap, 10px);border-radius:var(--searchix-trigger-radius, 8px);padding:var(--searchix-trigger-py, 8px) var(--searchix-trigger-px, 12px);border:1px solid var(--searchix-trigger-border, rgba(0, 0, 0, .12));background:var(--searchix-trigger-bg, #ffffff);color:var(--searchix-trigger-color, inherit);cursor:pointer;font-family:var(--searchix-font, system-ui, -apple-system, sans-serif);font-size:var(--searchix-trigger-font-size, 14px);transition:all .15s ease;box-shadow:var(--searchix-trigger-shadow, 0 1px 2px rgba(0, 0, 0, .05))}.ngx-searchix-trigger:hover{background:var(--searchix-trigger-bg-hover, #f9fafb);border-color:var(--searchix-trigger-border-hover, rgba(0, 0, 0, .2));box-shadow:var(--searchix-trigger-shadow-hover, 0 2px 4px rgba(0, 0, 0, .08))}.ngx-searchix-trigger:focus{outline:2px solid var(--searchix-trigger-outline, rgba(59, 130, 246, .5));outline-offset:2px}.ngx-searchix-icon{opacity:var(--searchix-trigger-icon-opacity, .6);flex-shrink:0}.ngx-searchix-label{color:var(--searchix-trigger-label-color, inherit);font-weight:var(--searchix-trigger-label-weight, 400)}.ngx-searchix-hint{font-size:var(--searchix-trigger-hint-font, 12px);opacity:var(--searchix-trigger-hint-opacity, .6);padding:var(--searchix-trigger-hint-py, 3px) var(--searchix-trigger-hint-px, 6px);border-radius:var(--searchix-trigger-hint-radius, 4px);border:1px solid var(--searchix-trigger-hint-border, rgba(0, 0, 0, .1));background:var(--searchix-trigger-hint-bg, rgba(0, 0, 0, .04));font-family:var(--searchix-trigger-hint-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-trigger-hint-weight, 500);line-height:1}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoaXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9zZWFyY2hpeC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1zZWFyY2hpeC9zcmMvbGliL3NlYXJjaGl4LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFLcEgsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxVQUFVLENBQUM7Ozs7QUFPM0QsTUFBTSxPQUFPLGlCQUFpQjtJQXFCNUIsWUFDWSxVQUFrQyxFQUNFLGFBQThCO1FBRGxFLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ0Usa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBdEJyRSxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQVN6QixpQkFBWSxHQUE2QixJQUFJLENBQUM7UUFLN0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzlDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBT3pDLENBQUM7SUFFSixJQUFJOztRQUNGLE1BQU0sTUFBTSxtQ0FDUCxJQUFJLENBQUMsYUFBYSxLQUNyQixNQUFNLEVBQUUsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLE1BQU0sRUFDakQsZ0JBQWdCLEVBQUUsTUFBQSxJQUFJLENBQUMsZ0JBQWdCLG1DQUFJLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsZ0JBQWdCLEVBQy9FLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxLQUFLLG1DQUFJLE1BQUEs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QUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7OytHQTFFVSxpQkFBaUIsd0RBdUJKLGVBQWU7bUdBdkI1QixpQkFBaUIscWpCQ1o5Qix1a0NBbUJBOzRGRFBhLGlCQUFpQjtrQkFMN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsV0FBVyxFQUFFLDJCQUEyQjtvQkFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3pDOzswQkF3Qk0sUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzRDQXRCOUIsS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFFSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBeUNQLFNBQVM7c0JBRFIsWUFBWTt1QkFBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU2VhcmNoSXRlbSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFNlYXJjaGl4T3ZlcmxheVNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaGl4LW92ZXJsYXkuc2VydmljZSc7XG5pbXBvcnQgeyBTRUFSQ0hJWF9DT05GSUcsIFNlYXJjaGl4Q29uZmlnIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2VhcmNoaXgnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoaXguY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2hpeC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaGl4Q29tcG9uZW50IHtcbiAgQElucHV0KCkgaXRlbXM6IFNlYXJjaEl0ZW1bXSA9IFtdO1xuICBASW5wdXQoKSByZWNlbnRJdGVtcz86IFNlYXJjaEl0ZW1bXTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nOyAvLyAnU2VhcmNoJ1xuICBASW5wdXQoKSBob3RrZXk/OiBzdHJpbmc7IC8vIGUuZy4gJ2N0cmwraydcbiAgQElucHV0KCkgY2xvc2VPblNlbGVjdD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dNcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dSZXN1bHRzQ291bnQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBtYXhSZXN1bHRzPzogbnVtYmVyO1xuICBASW5wdXQoKSBpY29uVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGljb25SZW5kZXJlcj86IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGJ1dHRvblRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgZW1pdE9uRXh0ZXJuYWxPcGVuPzogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgaXRlbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hJdGVtPigpO1xuICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgc3ViPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBvdmVybGF5U3ZjOiBTZWFyY2hpeE92ZXJsYXlTZXJ2aWNlLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChTRUFSQ0hJWF9DT05GSUcpIHB1YmxpYyBkZWZhdWx0Q29uZmlnPzogU2VhcmNoaXhDb25maWdcbiAgKSB7fVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgY29uZmlnOiBTZWFyY2hpeENvbmZpZyA9IHtcbiAgICAgIC4uLnRoaXMuZGVmYXVsdENvbmZpZyxcbiAgICAgIHNob3dNczogdGhpcy5zaG93TXMgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5zaG93TXMsXG4gICAgICBzaG93UmVzdWx0c0NvdW50OiB0aGlzLnNob3dSZXN1bHRzQ291bnQgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5zaG93UmVzdWx0c0NvdW50LFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5sYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyID8/IHRoaXMuZGVmYXVsdENvbmZpZz8ucGxhY2Vob2xkZXIsXG4gICAgICBob3RrZXk6IHRoaXMuaG90a2V5ID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uaG90a2V5LFxuICAgICAgY2xvc2VPblNlbGVjdDogdGhpcy5jbG9zZU9uU2VsZWN0ID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uY2xvc2VPblNlbGVjdCxcbiAgICAgIG1heFJlc3VsdHM6IHRoaXMubWF4UmVzdWx0cyA/PyB0aGlzLmRlZmF1bHRDb25maWc/Lm1heFJlc3VsdHMsXG4gICAgICBpY29uUmVuZGVyZXI6IHRoaXMuaWNvblJlbmRlcmVyID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uaWNvblJlbmRlcmVyLFxuICAgICAgZW1pdE9uRXh0ZXJuYWxPcGVuOiB0aGlzLmVtaXRPbkV4dGVybmFsT3BlbiA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmVtaXRPbkV4dGVybmFsT3BlbixcbiAgICB9O1xuXG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuXG4gICAgdGhpcy5zdWI/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm92ZXJsYXlTdmMub3Blbih0aGlzLml0ZW1zLCBjb25maWcsIHRoaXMucmVjZW50SXRlbXMpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoaXQpID0+IHRoaXMuaXRlbVNlbGVjdGVkLmVtaXQoaXQpLFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdWI/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5vdmVybGF5U3ZjLmNsb3NlKCk7XG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaGsgPSAodGhpcy5ob3RrZXkgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5ob3RrZXkgPz8gJ2N0cmwraycpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgY29ubmVjdG9yID0gaGsucmVwbGFjZSgvXFx3L2dtLCAnJyk7XG4gICAgY29uc3Qgd2FudEN0cmwgPSBoay5pbmNsdWRlcygnY3RybCcpO1xuICAgIGNvbnN0IHdhbnRDbWQgPSBoay5pbmNsdWRlcygnY21kJykgfHwgaGsuaW5jbHVkZXMoJ21ldGEnKTtcbiAgICBjb25zdCBrZXkgPSBoay5zcGxpdChjb25uZWN0b3IpLnBvcCgpO1xuXG4gICAgY29uc3QgcHJlc3NlZEN0cmwgPSBlLmN0cmxLZXk7XG4gICAgY29uc3QgcHJlc3NlZENtZCA9IGUubWV0YUtleTtcblxuICAgIGNvbnN0IG1vZE9rID0gKHdhbnRDdHJsICYmIHByZXNzZWRDdHJsKSB8fCAod2FudENtZCAmJiBwcmVzc2VkQ21kKSB8fCAoIXdhbnRDdHJsICYmICF3YW50Q21kICYmIChwcmVzc2VkQ3RybCB8fCBwcmVzc2VkQ21kKSk7XG4gICAgaWYgKG1vZE9rICYmIGtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpID09PSBrZXkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLm92ZXJsYXlTdmMuaXNPcGVuKCkpIHRoaXMuY2xvc2UoKTtcbiAgICAgIGVsc2UgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uVGVtcGxhdGU7IGVsc2UgZGVmYXVsdEJ1dHRvblwiPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnV0dG9uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IG9wZW46IG9wZW4uYmluZCh0aGlzKSwgaG90a2V5OiBob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snIH0gfVwiPjwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEJ1dHRvbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtdHJpZ2dlclwiIChjbGljayk9XCJvcGVuKClcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaWNvblRlbXBsYXRlOyBlbHNlIGRlZmF1bHRTZWFyY2hJY29uXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0U2VhcmNoSWNvbj5cbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaWNvblwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjExXCIgY3k9XCIxMVwiIHI9XCI4XCI+PC9jaXJjbGU+XG4gICAgICAgIDxwYXRoIGQ9XCJtMjEgMjEtNC4zNS00LjM1XCI+PC9wYXRoPlxuICAgICAgPC9zdmc+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8c3BhbiBjbGFzcz1cIm5neC1zZWFyY2hpeC1sYWJlbFwiPnt7IChsYWJlbCB8fCAnTG9va3VwJykgfX08L3NwYW4+XG4gICAgPGNvZGUgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaGludFwiPnt7IChob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snKSB9fTwvY29kZT5cbiAgPC9idXR0b24+XG48L25nLXRlbXBsYXRlPlxuIl19