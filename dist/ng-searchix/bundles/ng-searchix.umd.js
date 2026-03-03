(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('rxjs'), require('fuse.js')) :
  typeof define === 'function' && define.amd ? define('ng-searchix', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/cdk/overlay', '@angular/cdk/portal', 'rxjs', 'fuse.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ng-searchix"] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.cdk.overlay, global.ng.cdk.portal, global.rxjs, global.Fuse));
})(this, (function (exports, i0, i2, i1, i1$1, portal, rxjs, Fuse) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
  var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
  var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
  var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
  var Fuse__default = /*#__PURE__*/_interopDefaultLegacy(Fuse);

  var SEARCHIX_CONFIG = new i0.InjectionToken('SEARCHIX_CONFIG');
  var SEARCHIX_RECENTS_KEY = 'searchix-recents';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol, Iterator */
  var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b)
              if (Object.prototype.hasOwnProperty.call(b, p))
                  d[p] = b[p]; };
      return extendStatics(d, b);
  };
  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function () {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p))
                      t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
      var t = {};
      for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }
  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
      else
          for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                  r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
      function accept(f) { if (f !== void 0 && typeof f !== "function")
          throw new TypeError("Function expected"); return f; }
      var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
      var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
      var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
      var _, done = false;
      for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn)
              context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access)
              context.access[p] = contextIn.access[p];
          context.addInitializer = function (f) { if (done)
              throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
              if (result === void 0)
                  continue;
              if (result === null || typeof result !== "object")
                  throw new TypeError("Object expected");
              if (_ = accept(result.get))
                  descriptor.get = _;
              if (_ = accept(result.set))
                  descriptor.set = _;
              if (_ = accept(result.init))
                  initializers.unshift(_);
          }
          else if (_ = accept(result)) {
              if (kind === "field")
                  initializers.unshift(_);
              else
                  descriptor[key] = _;
          }
      }
      if (target)
          Object.defineProperty(target, contextIn.name, descriptor);
      done = true;
  }
  ;
  function __runInitializers(thisArg, initializers, value) {
      var useValue = arguments.length > 2;
      for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
      }
      return useValue ? value : void 0;
  }
  ;
  function __propKey(x) {
      return typeof x === "symbol" ? x : "".concat(x);
  }
  ;
  function __setFunctionName(f, name, prefix) {
      if (typeof name === "symbol")
          name = name.description ? "[".concat(name.description, "]") : "";
      return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  ;
  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try {
              step(generator.next(value));
          }
          catch (e) {
              reject(e);
          } }
          function rejected(value) { try {
              step(generator["throw"](value));
          }
          catch (e) {
              reject(e);
          } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }
  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function () { if (t[0] & 1)
              throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f)
              throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
              try {
                  if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                      return t;
                  if (y = 0, t)
                      op = [op[0] & 2, t.value];
                  switch (op[0]) {
                      case 0:
                      case 1:
                          t = op;
                          break;
                      case 4:
                          _.label++;
                          return { value: op[1], done: false };
                      case 5:
                          _.label++;
                          y = op[1];
                          op = [0];
                          continue;
                      case 7:
                          op = _.ops.pop();
                          _.trys.pop();
                          continue;
                      default:
                          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                              _ = 0;
                              continue;
                          }
                          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                              _.label = op[1];
                              break;
                          }
                          if (op[0] === 6 && _.label < t[1]) {
                              _.label = t[1];
                              t = op;
                              break;
                          }
                          if (t && _.label < t[2]) {
                              _.label = t[2];
                              _.ops.push(op);
                              break;
                          }
                          if (t[2])
                              _.ops.pop();
                          _.trys.pop();
                          continue;
                  }
                  op = body.call(thisArg, _);
              }
              catch (e) {
                  op = [6, e];
                  y = 0;
              }
              finally {
                  f = t = 0;
              }
          if (op[0] & 5)
              throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
      }
  }
  var __createBinding = Object.create ? (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function () { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      o[k2] = m[k];
  });
  function __exportStar(m, o) {
      for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
  }
  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
          return m.call(o);
      if (o && typeof o.length === "number")
          return {
              next: function () {
                  if (o && i >= o.length)
                      o = void 0;
                  return { value: o && o[i++], done: !o };
              }
          };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
          return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
      }
      catch (error) {
          e = { error: error };
      }
      finally {
          try {
              if (r && !r.done && (m = i["return"]))
                  m.call(i);
          }
          finally {
              if (e)
                  throw e.error;
          }
      }
      return ar;
  }
  /** @deprecated */
  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }
  /** @deprecated */
  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }
  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                  if (!ar)
                      ar = Array.prototype.slice.call(from, 0, i);
                  ar[i] = from[i];
              }
          }
      return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
      function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
      function verb(n, f) { if (g[n]) {
          i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); };
          if (f)
              i[n] = f(i[n]);
      } }
      function resume(n, v) { try {
          step(g[n](v));
      }
      catch (e) {
          settle(q[0][3], e);
      } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]); }
  }
  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
  }
  function __asyncValues(o) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
  }
  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
      }
      else {
          cooked.raw = raw;
      }
      return cooked;
  }
  ;
  var __setModuleDefault = Object.create ? (function (o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function (o, v) {
      o["default"] = v;
  };
  var ownKeys = function (o) {
      ownKeys = Object.getOwnPropertyNames || function (o) {
          var ar = [];
          for (var k in o)
              if (Object.prototype.hasOwnProperty.call(o, k))
                  ar[ar.length] = k;
          return ar;
      };
      return ownKeys(o);
  };
  function __importStar(mod) {
      if (mod && mod.__esModule)
          return mod;
      var result = {};
      if (mod != null)
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
              if (k[i] !== "default")
                  __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
  }
  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m")
          throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  }
  function __classPrivateFieldIn(state, receiver) {
      if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
          throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
      if (value !== null && value !== void 0) {
          if (typeof value !== "object" && typeof value !== "function")
              throw new TypeError("Object expected.");
          var dispose, inner;
          if (async) {
              if (!Symbol.asyncDispose)
                  throw new TypeError("Symbol.asyncDispose is not defined.");
              dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
              if (!Symbol.dispose)
                  throw new TypeError("Symbol.dispose is not defined.");
              dispose = value[Symbol.dispose];
              if (async)
                  inner = dispose;
          }
          if (typeof dispose !== "function")
              throw new TypeError("Object not disposable.");
          if (inner)
              dispose = function () { try {
                  inner.call(this);
              }
              catch (e) {
                  return Promise.reject(e);
              } };
          env.stack.push({ value: value, dispose: dispose, async: async });
      }
      else if (async) {
          env.stack.push({ async: true });
      }
      return value;
  }
  var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  function __disposeResources(env) {
      function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
      }
      var r, s = 0;
      function next() {
          while (r = env.stack.pop()) {
              try {
                  if (!r.async && s === 1)
                      return s = 0, env.stack.push(r), Promise.resolve().then(next);
                  if (r.dispose) {
                      var result = r.dispose.call(r.value);
                      if (r.async)
                          return s |= 2, Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                  }
                  else
                      s |= 1;
              }
              catch (e) {
                  fail(e);
              }
          }
          if (s === 1)
              return env.hasError ? Promise.reject(env.error) : Promise.resolve();
          if (env.hasError)
              throw env.error;
      }
      return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
      if (typeof path === "string" && /^\.\.?\//.test(path)) {
          return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
              return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
          });
      }
      return path;
  }
  var tslib_es6 = {
      __extends: __extends,
      __assign: __assign,
      __rest: __rest,
      __decorate: __decorate,
      __param: __param,
      __esDecorate: __esDecorate,
      __runInitializers: __runInitializers,
      __propKey: __propKey,
      __setFunctionName: __setFunctionName,
      __metadata: __metadata,
      __awaiter: __awaiter,
      __generator: __generator,
      __createBinding: __createBinding,
      __exportStar: __exportStar,
      __values: __values,
      __read: __read,
      __spread: __spread,
      __spreadArrays: __spreadArrays,
      __spreadArray: __spreadArray,
      __await: __await,
      __asyncGenerator: __asyncGenerator,
      __asyncDelegator: __asyncDelegator,
      __asyncValues: __asyncValues,
      __makeTemplateObject: __makeTemplateObject,
      __importStar: __importStar,
      __importDefault: __importDefault,
      __classPrivateFieldGet: __classPrivateFieldGet,
      __classPrivateFieldSet: __classPrivateFieldSet,
      __classPrivateFieldIn: __classPrivateFieldIn,
      __addDisposableResource: __addDisposableResource,
      __disposeResources: __disposeResources,
      __rewriteRelativeImportExtension: __rewriteRelativeImportExtension,
  };

  var SearchixDialogData = /** @class */ (function () {
      function SearchixDialogData() {
      }
      return SearchixDialogData;
  }());
  var SearchixDialogComponent = /** @class */ (function () {
      function SearchixDialogComponent(data, cdr) {
          var _this = this;
          this.data = data;
          this.cdr = cdr;
          this.q = new i1.FormControl('');
          this.searchMs = 0;
          // UI state
          this.results = [];
          this.recents = [];
          this.activeIndex = 0;
          // Load recents from input or localStorage
          this.recents = this.loadRecents();
          // Initialize results with empty search (will show all items if no recents)
          this.results = this.filter('');
          // Update results when search query changes
          this.q.valueChanges.subscribe(function (val) {
              _this.activeIndex = 0;
              _this.results = _this.filter(val || '');
          });
      }
      SearchixDialogComponent.prototype.ngAfterViewInit = function () {
          setTimeout(function () { var _a; return ((_a = window.document.getElementById('searchix-input')) === null || _a === void 0 ? void 0 : _a.focus()); });
      };
      Object.defineProperty(SearchixDialogComponent.prototype, "isShowingRecents", {
          // Check if we should show recents (when search input is empty)
          get: function () {
              var searchValue = this.q.value || '';
              return searchValue.trim() === '' && this.recents.length > 0;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(SearchixDialogComponent.prototype, "displayItems", {
          // Get items to display (recents or search results)
          get: function () {
              return this.isShowingRecents ? this.recents : this.results;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(SearchixDialogComponent.prototype, "isSearchEmpty", {
          // Check if search input is empty
          get: function () {
              var searchValue = this.q.value || '';
              return searchValue.trim() === '';
          },
          enumerable: false,
          configurable: true
      });
      SearchixDialogComponent.prototype.trackById = function (_, it) {
          return it.id;
      };
      SearchixDialogComponent.prototype.select = function (item) {
          // Add selected item to recents
          this.addToRecents(item);
          this.data.selection$.next(item);
          if (this.data.config.closeOnSelect !== false) {
              this.data.close();
              this.data.selection$.complete();
          }
      };
      SearchixDialogComponent.prototype.close = function () {
          this.data.close();
          this.data.selection$.complete();
      };
      SearchixDialogComponent.prototype.openExternal = function (event, item) {
          event.stopPropagation();
          // Link will open naturally via href
          // Optionally emit selection event
          if (this.data.config.emitOnExternalOpen) {
              this.data.selection$.next(item);
          }
      };
      SearchixDialogComponent.prototype.onKeydown = function (e) {
          var _a, _b;
          // Handle keyboard navigation for both recents and search results
          if (e.key === 'ArrowDown') {
              e.preventDefault();
              this.activeIndex = Math.min(this.activeIndex + 1, Math.max(0, this.displayItems.length - 1));
              (_a = window.document.querySelector("#searchix__item-" + this.activeIndex)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                  block: 'nearest',
                  inline: 'nearest',
                  behavior: 'smooth'
              });
          }
          else if (e.key === 'ArrowUp') {
              e.preventDefault();
              this.activeIndex = Math.max(this.activeIndex - 1, 0);
              (_b = window.document.querySelector("#searchix__item-" + this.activeIndex)) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                  block: 'nearest',
                  inline: 'nearest',
                  behavior: 'smooth'
              });
          }
          else if (e.key === 'Enter') {
              var item = this.displayItems[this.activeIndex];
              if (item) {
                  e.preventDefault();
                  this.select(item);
              }
          }
      };
      SearchixDialogComponent.prototype.removeRecent = function (event, item) {
          event.stopPropagation();
          // Remove from recents array
          this.recents = this.recents.filter(function (it) { return it.id !== item.id; });
          // Save to localStorage
          this.saveRecentsToLocalStorage();
          // Reset active index to avoid pointing to removed item
          this.activeIndex = 0;
          // Update results if search is empty
          if (!this.q.value || this.q.value.trim() === '') {
              this.results = this.filter('');
          }
          this.cdr.markForCheck();
      };
      SearchixDialogComponent.prototype.addToRecents = function (item) {
          // Remove duplicate if exists
          this.recents = this.recents.filter(function (it) { return it.id !== item.id; });
          // Add to the beginning
          this.recents.unshift(item);
          // Limit to 10 recent items
          var maxRecents = 10;
          if (this.recents.length > maxRecents) {
              this.recents = this.recents.slice(0, maxRecents);
          }
          // Save to localStorage
          this.saveRecentsToLocalStorage();
      };
      SearchixDialogComponent.prototype.loadRecents = function () {
          // If recentItems provided as input, use them as initial value
          // Note: they will be updated and saved to localStorage on select/remove
          if (this.data.recentItems && this.data.recentItems.length > 0) {
              return __spreadArray([], __read(this.data.recentItems)); // Create a copy to avoid mutating input
          }
          // Otherwise, load from localStorage
          try {
              var stored = localStorage.getItem(SEARCHIX_RECENTS_KEY);
              if (stored) {
                  return JSON.parse(stored);
              }
          }
          catch (e) {
              console.warn('Failed to load recents from localStorage:', e);
          }
          return [];
      };
      SearchixDialogComponent.prototype.saveRecentsToLocalStorage = function () {
          try {
              localStorage.setItem(SEARCHIX_RECENTS_KEY, JSON.stringify(this.recents));
          }
          catch (e) {
              console.warn('Failed to save recents to localStorage:', e);
          }
      };
      SearchixDialogComponent.prototype.filter = function (q) {
          var _a;
          var start = performance.now();
          var query = (q || '').trim().toLowerCase();
          var items = this.data.items || [];
          var max = (_a = this.data.config.maxResults) !== null && _a !== void 0 ? _a : 50;
          if (this.data.config.filterFn) {
              var filtered = this.data.config.filterFn(query, items) || [];
              return filtered.slice(0, max);
          }
          // If query is empty, show recents
          if (!query) {
              if (this.recents.length > 0) {
                  return this.recents.slice(0, max);
              }
              return items.slice(0, max);
          }
          // Simple contains matching (Angular-12 friendly, no extra deps).
          // You can swap to Fuse.js later without breaking API.
          var result = items
              .filter(function (it) { return (it.title || '').toLowerCase().includes(query) ||
              (it.subtitle || '').toLowerCase().includes(query); })
              .slice(0, max);
          this.searchMs = Math.round(performance.now() - start);
          return result;
      };
      return SearchixDialogComponent;
  }());
  SearchixDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixDialogComponent, deps: [{ token: SearchixDialogData }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
  SearchixDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixDialogComponent, selector: "ngx-searchix-dialog", host: { listeners: { "document:keydown": "onKeydown($event)" } }, ngImport: i0__namespace, template: "<div aria-modal=\"true\" class=\"searchix\" role=\"dialog\">\r\n    <div class=\"searchix__header\">\r\n        <svg class=\"searchix__icon\" fill=\"none\" height=\"20\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\r\n             stroke-width=\"2\" viewBox=\"0 0 24 24\" width=\"20\">\r\n            <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n            <path d=\"m21 21-4.35-4.35\"></path>\r\n        </svg>\r\n\r\n        <input\r\n            #searchInput\r\n            [formControl]=\"q\"\r\n            [placeholder]=\"data.config.placeholder || 'Search...'\"\r\n            autofocus\r\n            class=\"searchix__input\"\r\n            id=\"searchix-input\"\r\n        />\r\n\r\n        <kbd class=\"searchix__kbd\">esc</kbd>\r\n    </div>\r\n\r\n    <!-- Empty State -->\r\n    <div *ngIf=\"displayItems.length === 0; else list\" class=\"searchix__content\">\r\n        <div class=\"searchix__empty\">\r\n            <svg\r\n                class=\"searchix__empty-icon\"\r\n                width=\"48\"\r\n                height=\"48\"\r\n                viewBox=\"0 0 24 24\"\r\n                fill=\"none\"\r\n                stroke=\"currentColor\"\r\n                stroke-width=\"2\"\r\n                stroke-linecap=\"round\"\r\n                stroke-linejoin=\"round\"\r\n            >\r\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n                <path d=\"m21 21-4.35-4.35\"></path>\r\n            </svg>\r\n            <p>{{ isSearchEmpty ? 'No recent searches' : 'No results found' }}</p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Results List -->\r\n    <ng-template #list>\r\n        <!-- Recent Items Header -->\r\n        <div *ngIf=\"isShowingRecents\" class=\"searchix__recents-header\">\r\n            <svg\r\n                    width=\"16\"\r\n                    height=\"16\"\r\n                    viewBox=\"0 0 24 24\"\r\n                    fill=\"none\"\r\n                    stroke=\"currentColor\"\r\n                    stroke-width=\"2\"\r\n                    stroke-linecap=\"round\"\r\n                    stroke-linejoin=\"round\"\r\n            >\r\n                <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\r\n                <polyline points=\"12 6 12 12 16 14\"></polyline>\r\n            </svg>\r\n            <span>Recents</span>\r\n        </div>\r\n        <div #searchList class=\"searchix__list\">\r\n            <!-- Items List -->\r\n            <button\r\n                *ngFor=\"let it of displayItems; let i = index; trackBy: trackById\"\r\n                type=\"button\"\r\n                class=\"searchix__item\"\r\n                id=\"searchix__item-{{i}}\"\r\n                [class.active]=\"i === activeIndex\"\r\n                (click)=\"select(it)\"\r\n            >\r\n                <!-- Item Content -->\r\n                <div class=\"searchix__item-content\">\r\n                    <!-- Icon -->\r\n                    <div *ngIf=\"it.icon\" class=\"searchix__item-icon\">\r\n                        <ng-container *ngIf=\"data.config.iconRenderer; else defaultIcon\">\r\n                            <ng-container *ngTemplateOutlet=\"data.config.iconRenderer; context: { $implicit: it.icon }\"></ng-container>\r\n                        </ng-container>\r\n                        <ng-template #defaultIcon>\r\n                            <svg\r\n                                width=\"20\"\r\n                                height=\"20\"\r\n                                viewBox=\"0 0 24 24\"\r\n                                fill=\"none\"\r\n                                stroke=\"currentColor\"\r\n                                stroke-width=\"2\"\r\n                                stroke-linecap=\"round\"\r\n                                stroke-linejoin=\"round\"\r\n                            >\r\n                                <path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"></path>\r\n                                <polyline points=\"14 2 14 8 20 8\"></polyline>\r\n                            </svg>\r\n                        </ng-template>\r\n                    </div>\r\n\r\n                    <!-- Text -->\r\n                    <div class=\"searchix__item-text\">\r\n                        <div class=\"searchix__item-title\">{{ it.title }}</div>\r\n                        <div *ngIf=\"it.subtitle\" class=\"searchix__item-subtitle\">{{ it.subtitle }}</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Item Actions -->\r\n                <div class=\"searchix__item-actions\">\r\n                    <!-- Delete Button (only for recent items) -->\r\n                    <button\r\n                        *ngIf=\"isShowingRecents\"\r\n                        type=\"button\"\r\n                        class=\"searchix__item-delete\"\r\n                        title=\"Remove from recents\"\r\n                        (click)=\"removeRecent($event, it)\"\r\n                    >\r\n                        <svg\r\n                            width=\"16\"\r\n                            height=\"16\"\r\n                            viewBox=\"0 0 24 24\"\r\n                            fill=\"none\"\r\n                            stroke=\"currentColor\"\r\n                            stroke-width=\"2\"\r\n                            stroke-linecap=\"round\"\r\n                            stroke-linejoin=\"round\"\r\n                        >\r\n                            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\r\n                            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\r\n                        </svg>\r\n                    </button>\r\n\r\n                    <!-- External Link -->\r\n                    <a\r\n                        *ngIf=\"it.href\"\r\n                        [href]=\"it.href\"\r\n                        target=\"_blank\"\r\n                        rel=\"noopener noreferrer\"\r\n                        class=\"searchix__item-external\"\r\n                        title=\"Open in new tab\"\r\n                        (click)=\"openExternal($event, it)\"\r\n                    >\r\n                        <svg\r\n                            width=\"16\"\r\n                            height=\"16\"\r\n                            viewBox=\"0 0 24 24\"\r\n                            fill=\"none\"\r\n                            stroke=\"currentColor\"\r\n                            stroke-width=\"2\"\r\n                            stroke-linecap=\"round\"\r\n                            stroke-linejoin=\"round\"\r\n                        >\r\n                            <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>\r\n                            <polyline points=\"15 3 21 3 21 9\"></polyline>\r\n                            <line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>\r\n                        </svg>\r\n                    </a>\r\n                </div>\r\n            </button>\r\n        </div>\r\n    </ng-template>\r\n\r\n    <!-- Footer -->\r\n    <div class=\"searchix__footer\">\r\n        <div class=\"searchix__footer-info\">\r\n            <span *ngIf=\"data.config.showResultsCount\" class=\"searchix__footer-count\">\r\n                {{ (displayItems?.length || 0) }} {{ (displayItems?.length || 0) === 1 ? 'result' : 'results' }}\r\n            </span>\r\n            <span *ngIf=\"data.config.showMs\" class=\"searchix__footer-time\">\r\n                {{ searchMs }}ms\r\n            </span>\r\n        </div>\r\n        <div class=\"searchix__footer-hints\">\r\n            <kbd class=\"searchix__footer-kbd\">\r\n                <svg\r\n                    width=\"12\"\r\n                    height=\"12\"\r\n                    viewBox=\"0 0 24 24\"\r\n                    fill=\"none\"\r\n                    stroke=\"currentColor\"\r\n                    stroke-width=\"2\"\r\n                    stroke-linecap=\"round\"\r\n                    stroke-linejoin=\"round\"\r\n                >\r\n                    <polyline points=\"18 15 12 9 6 15\"></polyline>\r\n                </svg>\r\n                <svg\r\n                    width=\"12\"\r\n                    height=\"12\"\r\n                    viewBox=\"0 0 24 24\"\r\n                    fill=\"none\"\r\n                    stroke=\"currentColor\"\r\n                    stroke-width=\"2\"\r\n                    stroke-linecap=\"round\"\r\n                    stroke-linejoin=\"round\"\r\n                >\r\n                    <polyline points=\"6 9 12 15 18 9\"></polyline>\r\n                </svg>\r\n                navigate\r\n            </kbd>\r\n            <kbd class=\"searchix__footer-kbd\">\u21B5 select</kbd>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";.searchix{background:var(--searchix-bg, #ffffff);color:var(--searchix-fg, #111827);border:1px solid var(--searchix-border, rgba(0, 0, 0, .08));font-family:var(--searchix-font, system-ui, -apple-system, BlinkMacSystemFont, sans-serif);width:var(--searchix-width, 640px);max-width:100%}.searchix__header{display:flex;align-items:center;grid-gap:var(--searchix-header-gap, 12px);gap:var(--searchix-header-gap, 12px);padding:var(--searchix-header-py, 16px) var(--searchix-header-px, 20px);border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .08));background:var(--searchix-header-bg, transparent)}.searchix__icon{opacity:var(--searchix-icon-opacity, .5);color:var(--searchix-icon-color, currentColor);flex-shrink:0;display:flex;align-items:center}.searchix__input{flex:1;border:0;outline:0;background:transparent;font-size:var(--searchix-input-font, 16px);line-height:1.5;color:inherit;font-family:inherit;min-width:0}.searchix__input:focus{outline:none}.searchix__input::placeholder{color:var(--searchix-placeholder, rgba(17, 24, 39, .4))}.searchix__kbd{font-size:var(--searchix-kbd-font, 12px);padding:var(--searchix-kbd-py, 4px) var(--searchix-kbd-px, 8px);border-radius:var(--searchix-kbd-radius, 4px);background:var(--searchix-kbd-bg, rgba(0, 0, 0, .06));color:var(--searchix-kbd-fg, rgba(0, 0, 0, .6));-webkit-user-select:none;user-select:none;font-family:var(--searchix-kbd-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-kbd-weight, 500);border:1px solid var(--searchix-kbd-border, rgba(0, 0, 0, .08));text-transform:lowercase;line-height:1}.searchix__content{min-height:var(--searchix-content-minh, 320px);display:flex;align-items:center;justify-content:center;padding:var(--searchix-content-py, 40px) var(--searchix-content-px, 20px)}.searchix__empty{text-align:center;color:var(--searchix-muted, rgba(17, 24, 39, .4));display:flex;flex-direction:column;align-items:center;grid-gap:16px;gap:16px}.searchix__empty p{margin:0;font-size:var(--searchix-empty-font, 16px);font-weight:var(--searchix-empty-weight, 500)}.searchix__empty-icon{opacity:var(--searchix-empty-icon-opacity, .3)}.searchix__list{max-height:var(--searchix-list-maxh, 400px);overflow-y:auto;overflow-x:hidden}.searchix__list::-webkit-scrollbar{width:var(--searchix-scrollbar-width, 8px)}.searchix__list::-webkit-scrollbar-track{background:var(--searchix-scrollbar-track-bg, transparent)}.searchix__list::-webkit-scrollbar-thumb{background:var(--searchix-scrollbar-thumb-bg, rgba(0, 0, 0, .1));border-radius:var(--searchix-scrollbar-thumb-radius, 4px)}.searchix__list::-webkit-scrollbar-thumb:hover{background:var(--searchix-scrollbar-thumb-bg-hover, rgba(0, 0, 0, .15))}.searchix__recents-header{display:flex;align-items:center;grid-gap:var(--searchix-recents-header-gap, 8px);gap:var(--searchix-recents-header-gap, 8px);padding:var(--searchix-recents-header-py, 12px) var(--searchix-recents-header-px, 20px);font-size:var(--searchix-recents-header-font, 12px);font-weight:var(--searchix-recents-header-weight, 600);color:var(--searchix-muted, rgba(17, 24, 39, .5));text-transform:capitalize;letter-spacing:.5px;background:var(--searchix-recents-header-bg, rgba(0, 0, 0, .02));border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .06))}.searchix__recents-header svg{width:var(--searchix-recents-header-icon-size, 16px);height:var(--searchix-recents-header-icon-size, 16px);opacity:.5}.searchix__item{width:100%;text-align:left;padding:var(--searchix-item-py, 12px) var(--searchix-item-px, 20px);background:transparent;border:0;border-bottom:1px solid var(--searchix-border, rgba(0, 0, 0, .06));cursor:pointer;color:inherit;font-family:inherit;display:flex;align-items:center;justify-content:space-between;grid-gap:var(--searchix-item-gap, 12px);gap:var(--searchix-item-gap, 12px);transition:background-color .15s ease,border-color .15s ease;position:relative}.searchix__item:last-child{border-bottom:0}.searchix__item:hover{background:var(--searchix-item-hover, rgba(0, 0, 0, .03))}.searchix__item.active{background:var(--searchix-item-active-bg, rgba(59, 130, 246, .08));border-color:var(--searchix-item-active-border, rgba(59, 130, 246, .2))}.searchix__item-content{flex:1;display:flex;align-items:center;grid-gap:var(--searchix-item-content-gap, 12px);gap:var(--searchix-item-content-gap, 12px);min-width:0}.searchix__item-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:var(--searchix-item-icon-size, 20px);height:var(--searchix-item-icon-size, 20px);color:var(--searchix-item-icon-color, currentColor);opacity:var(--searchix-item-icon-opacity, .6)}.searchix__item-text{flex:1;min-width:0}.searchix__item-title{font-weight:var(--searchix-item-title-weight, 500);font-size:var(--searchix-item-title-font, 14px);color:var(--searchix-item-title-color, inherit);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.searchix__item-subtitle{font-size:var(--searchix-item-subtitle-font, 13px);margin-top:var(--searchix-item-subtitle-mt, 2px);color:var(--searchix-muted, rgba(17, 24, 39, .5));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.searchix__item-actions{display:flex;align-items:center;grid-gap:var(--searchix-item-actions-gap, 4px);gap:var(--searchix-item-actions-gap, 4px);flex-shrink:0}.searchix__item-delete{display:flex;align-items:center;justify-content:center;width:var(--searchix-item-delete-size, 32px);height:var(--searchix-item-delete-size, 32px);border-radius:var(--searchix-item-delete-radius, 6px);background:var(--searchix-item-delete-bg, transparent);color:var(--searchix-item-delete-color, rgba(239, 68, 68, .6));border:0;cursor:pointer;opacity:0;transition:all .15s ease;padding:0}.searchix__item:hover .searchix__item-delete,.searchix__item.active .searchix__item-delete{opacity:1}.searchix__item-delete:hover{background:var(--searchix-item-delete-bg-hover, rgba(239, 68, 68, .1));color:var(--searchix-item-delete-color-hover, rgba(239, 68, 68, .9))}.searchix__item-delete:active{transform:scale(.95)}.searchix__item-external{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:var(--searchix-item-external-size, 32px);height:var(--searchix-item-external-size, 32px);border-radius:var(--searchix-item-external-radius, 6px);background:var(--searchix-item-external-bg, rgba(0, 0, 0, .04));color:var(--searchix-item-external-color, rgba(0, 0, 0, .5));opacity:0;transition:all .15s ease;text-decoration:none}.searchix__item:hover .searchix__item-external,.searchix__item.active .searchix__item-external{opacity:1}.searchix__item-external:hover{background:var(--searchix-item-external-bg-hover, rgba(0, 0, 0, .08));color:var(--searchix-item-external-color-hover, rgba(0, 0, 0, .8))}.searchix__item-external:active{transform:scale(.95)}.searchix__footer{padding:var(--searchix-footer-py, 12px) var(--searchix-footer-px, 20px);border-top:1px solid var(--searchix-border, rgba(0, 0, 0, .08));font-size:var(--searchix-footer-font, 12px);color:var(--searchix-muted, rgba(17, 24, 39, .5));display:flex;align-items:center;justify-content:space-between;grid-gap:var(--searchix-footer-gap, 16px);gap:var(--searchix-footer-gap, 16px);background:var(--searchix-footer-bg, transparent)}.searchix__footer-info{display:flex;align-items:center;grid-gap:var(--searchix-footer-info-gap, 8px);gap:var(--searchix-footer-info-gap, 8px)}.searchix__footer-count{font-weight:var(--searchix-footer-count-weight, 500)}.searchix__footer-time{opacity:var(--searchix-footer-time-opacity, .7)}.searchix__footer-time:before{content:\"\\2022\";margin-right:8px}.searchix__footer-hints{display:flex;align-items:center;grid-gap:var(--searchix-footer-hints-gap, 8px);gap:var(--searchix-footer-hints-gap, 8px)}.searchix__footer-kbd{display:inline-flex;align-items:center;grid-gap:4px;gap:4px;font-size:var(--searchix-footer-kbd-font, 11px);padding:var(--searchix-footer-kbd-py, 3px) var(--searchix-footer-kbd-px, 6px);border-radius:var(--searchix-footer-kbd-radius, 4px);background:var(--searchix-footer-kbd-bg, rgba(0, 0, 0, .04));color:var(--searchix-footer-kbd-fg, rgba(0, 0, 0, .6));font-family:var(--searchix-footer-kbd-font-family, ui-monospace, monospace);font-style:normal;border:1px solid var(--searchix-footer-kbd-border, rgba(0, 0, 0, .06));line-height:1}.searchix__footer-kbd svg{opacity:.7}\n"], directives: [{ type: i1__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixDialogComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ngx-searchix-dialog',
                      templateUrl: './searchix-dialog.component.html',
                      styleUrls: ['./searchix-dialog.component.scss'],
                      changeDetection: i0.ChangeDetectionStrategy.OnPush
                  }]
          }], ctorParameters: function () {
          return [{ type: SearchixDialogData, decorators: [{
                          type: i0.Inject,
                          args: [SearchixDialogData]
                      }] }, { type: i0__namespace.ChangeDetectorRef }];
      }, propDecorators: { onKeydown: [{
                  type: i0.HostListener,
                  args: ['document:keydown', ['$event']]
              }] } });

  var SearchixOverlayService = /** @class */ (function () {
      function SearchixOverlayService(overlay, injector, defaultConfig) {
          this.overlay = overlay;
          this.injector = injector;
          this.defaultConfig = defaultConfig;
          this.overlayRef = null;
      }
      SearchixOverlayService.prototype.isOpen = function () {
          return !!this.overlayRef;
      };
      SearchixOverlayService.prototype.open = function (items, config, recentItems) {
          var _this = this;
          if (this.overlayRef) {
              // close existing before opening a new one (avoid stacked overlays)
              this.close();
          }
          var merged = Object.assign(Object.assign({ placeholder: 'Search...', hotkey: 'ctrl+k', closeOnSelect: true, maxResults: 50 }, this.defaultConfig), config);
          var selection$ = new rxjs.Subject();
          var positionStrategy = this.overlay.position()
              .global()
              .centerHorizontally()
              .top('10vh');
          this.overlayRef = this.overlay.create({
              hasBackdrop: true,
              backdropClass: 'ngx-searchix-backdrop',
              panelClass: 'ngx-searchix-panel',
              scrollStrategy: this.overlay.scrollStrategies.block(),
              positionStrategy: positionStrategy
          });
          var data = {
              items: items,
              recentItems: recentItems,
              config: merged,
              selection$: selection$,
              close: function () { return _this.close(); }
          };
          var portalInjector = i0.Injector.create({
              parent: this.injector,
              providers: [{ provide: SearchixDialogData, useValue: data }]
          });
          var portal$1 = new portal.ComponentPortal(SearchixDialogComponent, null, portalInjector);
          this.overlayRef.attach(portal$1);
          this.overlayRef.backdropClick().subscribe(function () { return _this.close(); });
          this.overlayRef.keydownEvents().subscribe(function (ev) {
              if (ev.key === 'Escape') {
                  ev.preventDefault();
                  _this.close();
              }
          });
          selection$.subscribe({
              complete: function () {
                  // no-op
              }
          });
          // Close overlay when host unsubscribes
          return new rxjs.Observable(function (subscriber) {
              var sub = selection$.subscribe({
                  next: function (item) { return subscriber.next(item); },
                  error: function (e) { return subscriber.error(e); },
                  complete: function () { return subscriber.complete(); }
              });
              return function () {
                  sub.unsubscribe();
                  _this.close();
              };
          });
      };
      SearchixOverlayService.prototype.close = function () {
          if (!this.overlayRef)
              return;
          this.overlayRef.dispose();
          this.overlayRef = null;
      };
      return SearchixOverlayService;
  }());
  SearchixOverlayService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixOverlayService, deps: [{ token: i1__namespace$1.Overlay }, { token: i0__namespace.Injector }, { token: SEARCHIX_CONFIG, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
  SearchixOverlayService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixOverlayService, providedIn: 'root' });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixOverlayService, decorators: [{
              type: i0.Injectable,
              args: [{ providedIn: 'root' }]
          }], ctorParameters: function () {
          return [{ type: i1__namespace$1.Overlay }, { type: i0__namespace.Injector }, { type: undefined, decorators: [{
                          type: i0.Optional
                      }, {
                          type: i0.Inject,
                          args: [SEARCHIX_CONFIG]
                      }] }];
      } });

  var SearchixComponent = /** @class */ (function () {
      function SearchixComponent(overlaySvc, defaultConfig) {
          this.overlaySvc = overlaySvc;
          this.defaultConfig = defaultConfig;
          this.items = [];
          this.iconTemplate = null;
          this.itemSelected = new i0.EventEmitter();
          this.opened = new i0.EventEmitter();
          this.closed = new i0.EventEmitter();
      }
      SearchixComponent.prototype.open = function () {
          var _this = this;
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
          var config = Object.assign(Object.assign({}, this.defaultConfig), { showMs: (_a = this.showMs) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.showMs, showResultsCount: (_c = this.showResultsCount) !== null && _c !== void 0 ? _c : (_d = this.defaultConfig) === null || _d === void 0 ? void 0 : _d.showResultsCount, label: (_e = this.label) !== null && _e !== void 0 ? _e : (_f = this.defaultConfig) === null || _f === void 0 ? void 0 : _f.label, placeholder: (_g = this.placeholder) !== null && _g !== void 0 ? _g : (_h = this.defaultConfig) === null || _h === void 0 ? void 0 : _h.placeholder, hotkey: (_j = this.hotkey) !== null && _j !== void 0 ? _j : (_k = this.defaultConfig) === null || _k === void 0 ? void 0 : _k.hotkey, closeOnSelect: (_l = this.closeOnSelect) !== null && _l !== void 0 ? _l : (_m = this.defaultConfig) === null || _m === void 0 ? void 0 : _m.closeOnSelect, maxResults: (_o = this.maxResults) !== null && _o !== void 0 ? _o : (_p = this.defaultConfig) === null || _p === void 0 ? void 0 : _p.maxResults, iconRenderer: (_q = this.iconRenderer) !== null && _q !== void 0 ? _q : (_r = this.defaultConfig) === null || _r === void 0 ? void 0 : _r.iconRenderer, emitOnExternalOpen: (_s = this.emitOnExternalOpen) !== null && _s !== void 0 ? _s : (_t = this.defaultConfig) === null || _t === void 0 ? void 0 : _t.emitOnExternalOpen });
          this.opened.emit();
          (_u = this.sub) === null || _u === void 0 ? void 0 : _u.unsubscribe();
          this.sub = this.overlaySvc.open(this.items, config, this.recentItems).subscribe({
              next: function (it) { return _this.itemSelected.emit(it); },
              complete: function () {
                  _this.closed.emit();
              }
          });
      };
      SearchixComponent.prototype.close = function () {
          var _a;
          (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
          this.overlaySvc.close();
          this.closed.emit();
      };
      SearchixComponent.prototype.onKeyDown = function (e) {
          var _a, _b, _c;
          var hk = ((_c = (_a = this.hotkey) !== null && _a !== void 0 ? _a : (_b = this.defaultConfig) === null || _b === void 0 ? void 0 : _b.hotkey) !== null && _c !== void 0 ? _c : 'ctrl+k').toLowerCase();
          var connector = hk.replace(/\w/gm, '');
          var wantCtrl = hk.includes('ctrl');
          var wantCmd = hk.includes('cmd') || hk.includes('meta');
          var key = hk.split(connector).pop();
          var pressedCtrl = e.ctrlKey;
          var pressedCmd = e.metaKey;
          var modOk = (wantCtrl && pressedCtrl) || (wantCmd && pressedCmd) || (!wantCtrl && !wantCmd && (pressedCtrl || pressedCmd));
          if (modOk && key && e.code.toLowerCase() === 'key' + key) {
              e.preventDefault();
              if (this.overlaySvc.isOpen())
                  this.close();
              else
                  this.open();
          }
      };
      return SearchixComponent;
  }());
  SearchixComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixComponent, deps: [{ token: SearchixOverlayService }, { token: SEARCHIX_CONFIG, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
  SearchixComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: SearchixComponent, selector: "ngx-searchix", inputs: { items: "items", recentItems: "recentItems", placeholder: "placeholder", label: "label", hotkey: "hotkey", closeOnSelect: "closeOnSelect", showMs: "showMs", showResultsCount: "showResultsCount", maxResults: "maxResults", iconTemplate: "iconTemplate", iconRenderer: "iconRenderer", buttonTemplate: "buttonTemplate", emitOnExternalOpen: "emitOnExternalOpen" }, outputs: { itemSelected: "itemSelected", opened: "opened", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"buttonTemplate; else defaultButton\">\r\n  <ng-container *ngTemplateOutlet=\"buttonTemplate; context: { $implicit: { open: open.bind(this), hotkey: hotkey || defaultConfig?.hotkey || 'Ctrl+K' } }\"></ng-container>\r\n</ng-container>\r\n\r\n<ng-template #defaultButton>\r\n  <button type=\"button\" class=\"ngx-searchix-trigger\" (click)=\"open()\">\r\n    <ng-container *ngIf=\"iconTemplate; else defaultSearchIcon\">\r\n      <ng-container *ngTemplateOutlet=\"iconTemplate\"></ng-container>\r\n    </ng-container>\r\n    <ng-template #defaultSearchIcon>\r\n      <svg class=\"ngx-searchix-icon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n        <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n        <path d=\"m21 21-4.35-4.35\"></path>\r\n      </svg>\r\n    </ng-template>\r\n    <span class=\"ngx-searchix-label\">{{ (label || 'Lookup') }}</span>\r\n    <code class=\"ngx-searchix-hint\">{{ (hotkey || defaultConfig?.hotkey || 'Ctrl+K') }}</code>\r\n  </button>\r\n</ng-template>\r\n", styles: [".ngx-searchix-trigger{display:inline-flex;align-items:center;grid-gap:var(--searchix-trigger-gap, 10px);gap:var(--searchix-trigger-gap, 10px);border-radius:var(--searchix-trigger-radius, 8px);padding:var(--searchix-trigger-py, 8px) var(--searchix-trigger-px, 12px);border:1px solid var(--searchix-trigger-border, rgba(0, 0, 0, .12));background:var(--searchix-trigger-bg, #ffffff);color:var(--searchix-trigger-color, inherit);cursor:pointer;font-family:var(--searchix-font, system-ui, -apple-system, sans-serif);font-size:var(--searchix-trigger-font-size, 14px);transition:all .15s ease;box-shadow:var(--searchix-trigger-shadow, 0 1px 2px rgba(0, 0, 0, .05))}.ngx-searchix-trigger:hover{background:var(--searchix-trigger-bg-hover, #f9fafb);border-color:var(--searchix-trigger-border-hover, rgba(0, 0, 0, .2));box-shadow:var(--searchix-trigger-shadow-hover, 0 2px 4px rgba(0, 0, 0, .08))}.ngx-searchix-trigger:focus{outline:2px solid var(--searchix-trigger-outline, rgba(59, 130, 246, .5));outline-offset:2px}.ngx-searchix-icon{opacity:var(--searchix-trigger-icon-opacity, .6);flex-shrink:0}.ngx-searchix-label{color:var(--searchix-trigger-label-color, inherit);font-weight:var(--searchix-trigger-label-weight, 400)}.ngx-searchix-hint{font-size:var(--searchix-trigger-hint-font, 12px);opacity:var(--searchix-trigger-hint-opacity, .6);padding:var(--searchix-trigger-hint-py, 3px) var(--searchix-trigger-hint-px, 6px);border-radius:var(--searchix-trigger-hint-radius, 4px);border:1px solid var(--searchix-trigger-hint-border, rgba(0, 0, 0, .1));background:var(--searchix-trigger-hint-bg, rgba(0, 0, 0, .04));font-family:var(--searchix-trigger-hint-font-family, ui-monospace, monospace);font-style:normal;font-weight:var(--searchix-trigger-hint-weight, 500);line-height:1}\n"], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: SearchixComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ngx-searchix',
                      templateUrl: './searchix.component.html',
                      styleUrls: ['./searchix.component.scss']
                  }]
          }], ctorParameters: function () {
          return [{ type: SearchixOverlayService }, { type: undefined, decorators: [{
                          type: i0.Optional
                      }, {
                          type: i0.Inject,
                          args: [SEARCHIX_CONFIG]
                      }] }];
      }, propDecorators: { items: [{
                  type: i0.Input
              }], recentItems: [{
                  type: i0.Input
              }], placeholder: [{
                  type: i0.Input
              }], label: [{
                  type: i0.Input
              }], hotkey: [{
                  type: i0.Input
              }], closeOnSelect: [{
                  type: i0.Input
              }], showMs: [{
                  type: i0.Input
              }], showResultsCount: [{
                  type: i0.Input
              }], maxResults: [{
                  type: i0.Input
              }], iconTemplate: [{
                  type: i0.Input
              }], iconRenderer: [{
                  type: i0.Input
              }], buttonTemplate: [{
                  type: i0.Input
              }], emitOnExternalOpen: [{
                  type: i0.Input
              }], itemSelected: [{
                  type: i0.Output
              }], opened: [{
                  type: i0.Output
              }], closed: [{
                  type: i0.Output
              }], onKeyDown: [{
                  type: i0.HostListener,
                  args: ['document:keydown', ['$event']]
              }] } });

  var NgSearchixModule = /** @class */ (function () {
      function NgSearchixModule() {
      }
      NgSearchixModule.forRoot = function (config) {
          if (config === void 0) { config = {}; }
          return {
              ngModule: NgSearchixModule,
              providers: [{ provide: SEARCHIX_CONFIG, useValue: config }],
          };
      };
      return NgSearchixModule;
  }());
  NgSearchixModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgSearchixModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
  NgSearchixModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgSearchixModule, declarations: [SearchixComponent, SearchixDialogComponent], imports: [i2.CommonModule, i1.ReactiveFormsModule, i1$1.OverlayModule, portal.PortalModule], exports: [SearchixComponent] });
  NgSearchixModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgSearchixModule, imports: [[i2.CommonModule, i1.ReactiveFormsModule, i1$1.OverlayModule, portal.PortalModule]] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgSearchixModule, decorators: [{
              type: i0.NgModule,
              args: [{
                      declarations: [SearchixComponent, SearchixDialogComponent],
                      imports: [i2.CommonModule, i1.ReactiveFormsModule, i1$1.OverlayModule, portal.PortalModule],
                      exports: [SearchixComponent],
                  }]
          }] });

  function createFuseFilter(options) {
      var fuse = null;
      return function (q, items) {
          if (!q)
              return items;
          if (!fuse || fuse.getIndex().toJSON().records.length !== items.length) {
              fuse = new Fuse__default["default"](items, Object.assign({ keys: ['title', 'subtitle'], threshold: 0.35, ignoreLocation: true }, options));
          }
          return fuse.search(q).map(function (r) { return r.item; });
      };
  }

  /*
   * Public API Surface of ng-searchix
   */

  /**
   * Generated bundle index. Do not edit.
   */

  exports.NgSearchixModule = NgSearchixModule;
  exports.SEARCHIX_CONFIG = SEARCHIX_CONFIG;
  exports.SEARCHIX_RECENTS_KEY = SEARCHIX_RECENTS_KEY;
  exports.SearchixComponent = SearchixComponent;
  exports.createFuseFilter = createFuseFilter;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-searchix.umd.js.map
