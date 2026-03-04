import { Component, EventEmitter, HostListener, Inject, Input, Optional, Output } from '@angular/core';
import { SEARCHIX_CONFIG, SEARCHIX_RECENTS_KEY } from './tokens';
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        const config = Object.assign(Object.assign({}, this.defaultConfig), { placeholder: (_a = this.placeholder) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.placeholder, label: (_c = this.label) !== null && _c !== void 0 ? _c : (_d = this.defaultConfig) === null || _d === void 0 ? void 0 : _d.label, hotkey: (_e = this.hotkey) !== null && _e !== void 0 ? _e : (_f = this.defaultConfig) === null || _f === void 0 ? void 0 : _f.hotkey, closeOnSelect: (_g = this.closeOnSelect) !== null && _g !== void 0 ? _g : (_h = this.defaultConfig) === null || _h === void 0 ? void 0 : _h.closeOnSelect, showMs: (_j = this.showMs) !== null && _j !== void 0 ? _j : (_k = this.defaultConfig) === null || _k === void 0 ? void 0 : _k.showMs, showResultsCount: (_l = this.showResultsCount) !== null && _l !== void 0 ? _l : (_m = this.defaultConfig) === null || _m === void 0 ? void 0 : _m.showResultsCount, emitOnExternalOpen: (_o = this.emitOnExternalOpen) !== null && _o !== void 0 ? _o : (_p = this.defaultConfig) === null || _p === void 0 ? void 0 : _p.emitOnExternalOpen, debugLogEnabled: (_q = this.debugLogEnabled) !== null && _q !== void 0 ? _q : (_r = this.defaultConfig) === null || _r === void 0 ? void 0 : _r.debugLogEnabled, maxResults: (_s = this.maxResults) !== null && _s !== void 0 ? _s : (_t = this.defaultConfig) === null || _t === void 0 ? void 0 : _t.maxResults, iconRenderer: (_u = this.iconRenderer) !== null && _u !== void 0 ? _u : (_v = this.defaultConfig) === null || _v === void 0 ? void 0 : _v.iconRenderer, iconTemplate: (_w = this.iconTemplate) !== null && _w !== void 0 ? _w : (_x = this.defaultConfig) === null || _x === void 0 ? void 0 : _x.iconTemplate, buttonTemplate: (_y = this.buttonTemplate) !== null && _y !== void 0 ? _y : (_z = this.defaultConfig) === null || _z === void 0 ? void 0 : _z.buttonTemplate });
        this.debugLog("Open fired with config ", config);
        this.opened.emit();
        (_0 = this.sub) === null || _0 === void 0 ? void 0 : _0.unsubscribe();
        let items = [];
        let recentItems = [];
        if (this.itemsFilterFn) {
            items = this.itemsFilterFn(this.items);
            recentItems = this.itemsFilterFn((_1 = this.recentItems) !== null && _1 !== void 0 ? _1 : JSON.parse((_2 = window.localStorage.getItem(SEARCHIX_RECENTS_KEY)) !== null && _2 !== void 0 ? _2 : '[]'));
        }
        this.debugLog("SearchItems", items);
        this.debugLog("RecentItems", recentItems);
        this.sub = this.overlaySvc.open(items, config, recentItems).subscribe({
            next: (it) => this.itemSelected.emit(it),
            complete: () => {
                this.closed.emit();
            }
        });
    }
    close() {
        var _a;
        this.debugLog("Close fired");
        (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.overlaySvc.close();
        this.closed.emit();
    }
    onKeyDown(e) {
        var _a, _b, _c;
        const hk = ((_c = (_a = this.hotkey) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.hotkey) !== null && _c !== void 0 ? _c : 'ctrl+k');
        const connector = hk.replace(/\w/gm, '');
        const wantCtrl = hk.includes('ctrl');
        const wantCmd = hk.includes('cmd') || hk.includes('meta');
        const key = hk.split(connector).pop();
        const pressedCtrl = e.ctrlKey;
        const pressedCmd = e.metaKey;
        this.debugLog("Pressed key: " + e.code);
        const modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
        if (modOk && key && e.code.toLowerCase() === 'key' + key.toLowerCase()) {
            e.preventDefault();
            if (this.overlaySvc.isOpen())
                this.close();
            else
                this.open();
        }
    }
    debugLog(...args) {
        if (this.debugLogEnabled) {
            console.debug("[NG-SEARCHIX]:", ...args);
        }
    }
}
SearchixComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: SearchixComponent, deps: [{ token: i1.SearchixOverlayService }, { token: SEARCHIX_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component });
SearchixComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixComponent, selector: "ngx-searchix", inputs: { items: "items", recentItems: "recentItems", placeholder: "placeholder", label: "label", hotkeyLabel: "hotkeyLabel", hotkey: "hotkey", closeOnSelect: "closeOnSelect", showMs: "showMs", showResultsCount: "showResultsCount", emitOnExternalOpen: "emitOnExternalOpen", debugLogEnabled: "debugLogEnabled", maxResults: "maxResults", iconTemplate: "iconTemplate", iconRenderer: "iconRenderer", buttonTemplate: "buttonTemplate", itemsFilterFn: "itemsFilterFn" }, outputs: { itemSelected: "itemSelected", opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"buttonTemplate; else defaultButton\">\r\n  <ng-container *ngTemplateOutlet=\"buttonTemplate; context: { $implicit: { open: open.bind(this), hotkey: hotkey || defaultConfig?.hotkey || 'Ctrl+K' } }\"></ng-container>\r\n</ng-container>\r\n\r\n<ng-template #defaultButton>\r\n  <button type=\"button\" class=\"ngx-searchix-trigger\" (click)=\"open()\">\r\n    <ng-container *ngIf=\"iconTemplate; else defaultSearchIcon\">\r\n      <ng-container *ngTemplateOutlet=\"iconTemplate\"></ng-container>\r\n    </ng-container>\r\n    <ng-template #defaultSearchIcon>\r\n      <svg class=\"ngx-searchix-icon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n        <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n        <path d=\"m21 21-4.35-4.35\"></path>\r\n      </svg>\r\n    </ng-template>\r\n    <span class=\"ngx-searchix-label\">{{ (label || 'Lookup') }}</span>\r\n    <code class=\"ngx-searchix-hint\">{{ (hotkeyLabel || hotkey || defaultConfig?.hotkey || 'Ctrl+K') }}</code>\r\n  </button>\r\n</ng-template>\r\n", styles: [".ngx-searchix-trigger{display:inline-flex;align-items:center;grid-gap:var(--searchix-trigger-gap, 10px);gap:var(--searchix-trigger-gap, 10px);border-radius:var(--searchix-trigger-radius, 8px);padding:var(--searchix-trigger-py, 8px) var(--searchix-trigger-px, 12px);border:1px solid var(--searchix-trigger-border, rgba(0, 0, 0, .12));background:var(--searchix-trigger-bg, #ffffff);color:var(--searchix-trigger-color, inherit);cursor:pointer;font-family:var(--searchix-font, system-ui, -apple-system, sans-serif);font-size:var(--searchix-trigger-font-size, 14px);transition:all .15s ease;box-shadow:var(--searchix-trigger-shadow, 0 1px 2px rgba(0, 0, 0, .05))}.ngx-searchix-trigger:hover{background:var(--searchix-trigger-bg-hover, #f9fafb);border-color:var(--searchix-trigger-border-hover, rgba(0, 0, 0, .2));box-shadow:var(--searchix-trigger-shadow-hover, 0 2px 4px rgba(0, 0, 0, .08))}.ngx-searchix-trigger:focus{outline:2px solid var(--searchix-trigger-outline, rgba(59, 130, 246, .5));outline-offset:2px}.ngx-searchix-icon{opacity:var(--searchix-trigger-icon-opacity, .6);flex-shrink:0}.ngx-searchix-label{color:var(--searchix-trigger-label-color, inherit);font-weight:var(--searchix-trigger-label-weight, 400)}.ngx-searchix-hint{font-size:var(--searchix-trigger-hint-font, 12px);opacity:var(--searchix-trigger-hint-opacity, .6);padding:var(--searchix-trigger-hint-py, 3px) var(--searchix-trigger-hint-px, 6px);border-radius:var(--searchix-trigger-hint-radius, 4px);border:1px solid var(--searchix-trigger-hint-border, rgba(0, 0, 0, .1));background:var(--searchix-trigger-hint-bg, rgba(0, 0, 0, .04));font-family:var(--searchix-trigger-hint-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-trigger-hint-weight, 500);line-height:1}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
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
            }], hotkeyLabel: [{
                type: Input
            }], hotkey: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], showMs: [{
                type: Input
            }], showResultsCount: [{
                type: Input
            }], emitOnExternalOpen: [{
                type: Input
            }], debugLogEnabled: [{
                type: Input
            }], maxResults: [{
                type: Input
            }], iconTemplate: [{
                type: Input
            }], iconRenderer: [{
                type: Input
            }], buttonTemplate: [{
                type: Input
            }], itemsFilterFn: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoaXguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctc2VhcmNoaXgvc3JjL2xpYi9zZWFyY2hpeC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1zZWFyY2hpeC9zcmMvbGliL3NlYXJjaGl4LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFLcEgsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBa0IsTUFBTSxVQUFVLENBQUM7Ozs7QUFPakYsTUFBTSxPQUFPLGlCQUFpQjtJQXVCNUIsWUFDWSxVQUFrQyxFQUNFLGFBQThCO1FBRGxFLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ0Usa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBeEJyRSxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQVl6QixpQkFBWSxHQUE2QixJQUFJLENBQUM7UUFJN0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzlDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBT3pDLENBQUM7SUFFSixJQUFJOztRQUNGLE1BQU0sTUFBTSxtQ0FDUCxJQUFJLENBQUMsYUFBYSxLQUNuQixXQUFXLEVBQUUsTUFBQSxJQUFJLENBQUMsV0FBVyxtQ0FBSSxNQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLFdBQVcsRUFDaEUsS0FBSyxFQUFFLE1BQUEsSUFBSSxDQUFDLEtBQUssbUNBQUksTUFBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxLQUFLLEVBQzlDLE1BQU0sRUFBRSxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJ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TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoSXRlbSB9IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgU2VhcmNoaXhPdmVybGF5U2VydmljZSB9IGZyb20gJy4vc2VhcmNoaXgtb3ZlcmxheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU0VBUkNISVhfQ09ORklHLCBTRUFSQ0hJWF9SRUNFTlRTX0tFWSwgU2VhcmNoaXhDb25maWcgfSBmcm9tICcuL3Rva2Vucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1zZWFyY2hpeCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaGl4LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2hpeC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hpeENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaXRlbXM6IFNlYXJjaEl0ZW1bXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHJlY2VudEl0ZW1zPzogU2VhcmNoSXRlbVtdO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nOyAvLyAnU2VhcmNoJ1xyXG4gIEBJbnB1dCgpIGhvdGtleUxhYmVsPzogc3RyaW5nOyAvLyBlLmcuICfijJgvY3RybCBLJ1xyXG4gIEBJbnB1dCgpIGhvdGtleT86IHN0cmluZzsgLy8gZS5nLiAnY3RybCtrJ1xyXG4gIEBJbnB1dCgpIGNsb3NlT25TZWxlY3Q/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dNcz86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1Jlc3VsdHNDb3VudD86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZW1pdE9uRXh0ZXJuYWxPcGVuPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBkZWJ1Z0xvZ0VuYWJsZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1heFJlc3VsdHM/OiBudW1iZXI7XHJcbiAgQElucHV0KCkgaWNvblRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIGljb25SZW5kZXJlcj86IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgYnV0dG9uVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGl0ZW1zRmlsdGVyRm4/OiAoaXRlbXM/OiBTZWFyY2hJdGVtW10pID0+IFNlYXJjaEl0ZW1bXTtcclxuICBAT3V0cHV0KCkgaXRlbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hJdGVtPigpO1xyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWI/OiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIG92ZXJsYXlTdmM6IFNlYXJjaGl4T3ZlcmxheVNlcnZpY2UsXHJcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VBUkNISVhfQ09ORklHKSBwdWJsaWMgZGVmYXVsdENvbmZpZz86IFNlYXJjaGl4Q29uZmlnXHJcbiAgKSB7fVxyXG5cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29uZmlnOiBTZWFyY2hpeENvbmZpZyA9IHtcclxuICAgICAgLi4udGhpcy5kZWZhdWx0Q29uZmlnLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyID8/IHRoaXMuZGVmYXVsdENvbmZpZz8ucGxhY2Vob2xkZXIsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5sYWJlbCxcclxuICAgICAgICBob3RrZXk6IHRoaXMuaG90a2V5ID8/IHRoaXMuZGVmYXVsdENvbmZpZz8uaG90a2V5LFxyXG4gICAgICAgIGNsb3NlT25TZWxlY3Q6IHRoaXMuY2xvc2VPblNlbGVjdCA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmNsb3NlT25TZWxlY3QsXHJcbiAgICAgICAgc2hvd01zOiB0aGlzLnNob3dNcyA/PyB0aGlzLmRlZmF1bHRDb25maWc/LnNob3dNcyxcclxuICAgICAgICBzaG93UmVzdWx0c0NvdW50OiB0aGlzLnNob3dSZXN1bHRzQ291bnQgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5zaG93UmVzdWx0c0NvdW50LFxyXG4gICAgICAgIGVtaXRPbkV4dGVybmFsT3BlbjogdGhpcy5lbWl0T25FeHRlcm5hbE9wZW4gPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5lbWl0T25FeHRlcm5hbE9wZW4sXHJcbiAgICAgICAgZGVidWdMb2dFbmFibGVkOiB0aGlzLmRlYnVnTG9nRW5hYmxlZCA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmRlYnVnTG9nRW5hYmxlZCxcclxuICAgICAgICBtYXhSZXN1bHRzOiB0aGlzLm1heFJlc3VsdHMgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5tYXhSZXN1bHRzLFxyXG4gICAgICAgIGljb25SZW5kZXJlcjogdGhpcy5pY29uUmVuZGVyZXIgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5pY29uUmVuZGVyZXIsXHJcbiAgICAgICAgaWNvblRlbXBsYXRlOiB0aGlzLmljb25UZW1wbGF0ZSA/PyB0aGlzLmRlZmF1bHRDb25maWc/Lmljb25UZW1wbGF0ZSxcclxuICAgICAgICBidXR0b25UZW1wbGF0ZTogdGhpcy5idXR0b25UZW1wbGF0ZSA/PyB0aGlzLmRlZmF1bHRDb25maWc/LmJ1dHRvblRlbXBsYXRlLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRlYnVnTG9nKFwiT3BlbiBmaXJlZCB3aXRoIGNvbmZpZyBcIiwgY29uZmlnKTtcclxuXHJcbiAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XHJcblxyXG4gICAgdGhpcy5zdWI/LnVuc3Vic2NyaWJlKCk7XHJcbiAgICBsZXQgaXRlbXM6IFNlYXJjaEl0ZW1bXSA9IFtdO1xyXG4gICAgbGV0IHJlY2VudEl0ZW1zOiBTZWFyY2hJdGVtW10gPSBbXVxyXG4gICAgaWYgKHRoaXMuaXRlbXNGaWx0ZXJGbikge1xyXG4gICAgICAgIGl0ZW1zID0gdGhpcy5pdGVtc0ZpbHRlckZuKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHJlY2VudEl0ZW1zID0gdGhpcy5pdGVtc0ZpbHRlckZuKHRoaXMucmVjZW50SXRlbXMgPz8gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oU0VBUkNISVhfUkVDRU5UU19LRVkpID8/ICdbXScpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYnVnTG9nKFwiU2VhcmNoSXRlbXNcIiwgaXRlbXMpO1xyXG4gICAgdGhpcy5kZWJ1Z0xvZyhcIlJlY2VudEl0ZW1zXCIsIHJlY2VudEl0ZW1zKTtcclxuXHJcbiAgICB0aGlzLnN1YiA9IHRoaXMub3ZlcmxheVN2Yy5vcGVuKGl0ZW1zLCBjb25maWcsIHJlY2VudEl0ZW1zKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAoaXQpID0+IHRoaXMuaXRlbVNlbGVjdGVkLmVtaXQoaXQpLFxyXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVidWdMb2coXCJDbG9zZSBmaXJlZFwiKTtcclxuICAgIHRoaXMuc3ViPy51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5vdmVybGF5U3ZjLmNsb3NlKCk7XHJcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgaGsgPSAodGhpcy5ob3RrZXkgPz8gdGhpcy5kZWZhdWx0Q29uZmlnPy5ob3RrZXkgPz8gJ2N0cmwraycpO1xyXG4gICAgY29uc3QgY29ubmVjdG9yID0gaGsucmVwbGFjZSgvXFx3L2dtLCAnJyk7XHJcbiAgICBjb25zdCB3YW50Q3RybCA9IGhrLmluY2x1ZGVzKCdjdHJsJyk7XHJcbiAgICBjb25zdCB3YW50Q21kID0gaGsuaW5jbHVkZXMoJ2NtZCcpIHx8IGhrLmluY2x1ZGVzKCdtZXRhJyk7XHJcbiAgICBjb25zdCBrZXkgPSBoay5zcGxpdChjb25uZWN0b3IpLnBvcCgpO1xyXG5cclxuICAgIGNvbnN0IHByZXNzZWRDdHJsID0gZS5jdHJsS2V5O1xyXG4gICAgY29uc3QgcHJlc3NlZENtZCA9IGUubWV0YUtleTtcclxuXHJcbiAgICB0aGlzLmRlYnVnTG9nKFwiUHJlc3NlZCBrZXk6IFwiICsgZS5jb2RlKVxyXG4gICAgY29uc3QgbW9kT2sgPSAod2FudEN0cmwgJiYgcHJlc3NlZEN0cmwpIHx8ICh3YW50Q21kICYmIHByZXNzZWRDbWQpIHx8ICghd2FudEN0cmwgJiYgIXdhbnRDbWQgJiYgKHByZXNzZWRDdHJsIHx8IHByZXNzZWRDbWQpKTtcclxuICAgICAgaWYgKG1vZE9rICYmIGtleSAmJiBlLmNvZGUudG9Mb3dlckNhc2UoKSA9PT0gJ2tleScgKyBrZXkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVN2Yy5pc09wZW4oKSkgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLm9wZW4oKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWJ1Z0xvZyguLi5hcmdzOiBhbnkpIHtcclxuICAgICAgaWYgKHRoaXMuZGVidWdMb2dFbmFibGVkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiW05HLVNFQVJDSElYXTpcIiwgLi4uYXJncyk7XHJcbiAgICAgIH1cclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvblRlbXBsYXRlOyBlbHNlIGRlZmF1bHRCdXR0b25cIj5cclxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnV0dG9uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IG9wZW46IG9wZW4uYmluZCh0aGlzKSwgaG90a2V5OiBob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snIH0gfVwiPjwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEJ1dHRvbj5cclxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5neC1zZWFyY2hpeC10cmlnZ2VyXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImljb25UZW1wbGF0ZTsgZWxzZSBkZWZhdWx0U2VhcmNoSWNvblwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFNlYXJjaEljb24+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaWNvblwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj5cclxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTFcIiBjeT1cIjExXCIgcj1cIjhcIj48L2NpcmNsZT5cclxuICAgICAgICA8cGF0aCBkPVwibTIxIDIxLTQuMzUtNC4zNVwiPjwvcGF0aD5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJuZ3gtc2VhcmNoaXgtbGFiZWxcIj57eyAobGFiZWwgfHwgJ0xvb2t1cCcpIH19PC9zcGFuPlxyXG4gICAgPGNvZGUgY2xhc3M9XCJuZ3gtc2VhcmNoaXgtaGludFwiPnt7IChob3RrZXlMYWJlbCB8fCBob3RrZXkgfHwgZGVmYXVsdENvbmZpZz8uaG90a2V5IHx8ICdDdHJsK0snKSB9fTwvY29kZT5cclxuICA8L2J1dHRvbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19