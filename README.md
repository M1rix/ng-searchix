# ng-searchix-workspace

This zip contains a ready Angular **library workspace** (Angular CLI 12.x baseline) that builds the `ng-searchix` library.

## Quick start

```bash
npm install
npm run build
```

The built library output will be in `dist/ng-searchix`.

## Notes

- The library uses **Angular CDK Overlay** to render an internal modal/dialog.
- Public API is event-driven: the library emits `itemSelected` to the host app instead of routing internally.
- Peer dependency range in the library package is `>=12 <19` (you can widen/narrow as needed).
