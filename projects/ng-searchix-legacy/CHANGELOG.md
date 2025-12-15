# Changelog

All notable changes to ng-searchix-legacy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added
- Initial release of ng-searchix-legacy for AngularJS 1.5.8+
- `ngxSearchix` component with trigger button
- `searchixOverlay` service for programmatic control
- Keyboard shortcuts support (Ctrl+K, Cmd+K, etc.)
- Arrow key navigation (↑/↓)
- Enter to select, Escape to close
- Customizable through CSS variables
- Support for external links in search results
- Optional search time display (ms)
- Maximum results configuration
- Custom filter function support
- Custom icon renderer templates
- Custom button templates
- Item selection callbacks
- Open/close event callbacks
- TypeScript definitions included
- Comprehensive documentation
- Example demo HTML file
- Full theming support
- Dark mode ready
- Accessibility (ARIA) attributes
- Responsive design

### Features
- **Component-based architecture** - Uses AngularJS 1.5+ component API
- **Provider configuration** - Global defaults via `searchixConfigProvider`
- **Service layer** - Direct overlay control via `searchixOverlay` service
- **Template caching** - Efficient template management
- **No jQuery required** - Pure AngularJS implementation
- **Lightweight** - Minimal dependencies (only AngularJS 1.5.8+)
- **Browser compatible** - Works in all modern browsers + IE11

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Internet Explorer 11+ (with polyfills)

### Dependencies
- AngularJS ^1.5.8 (peer dependency)
- Optional: Fuse.js for advanced fuzzy search

---

## Roadmap

### [1.1.0] - Planned
- [ ] Fuzzy search with Fuse.js integration (built-in)
- [ ] Command groups/sections support
- [ ] Recent searches history
- [ ] Keyboard shortcuts display in footer
- [ ] Search result highlighting
- [ ] Loading states for async data
- [ ] Multi-select mode
- [ ] Tag-based filtering

### [1.2.0] - Future
- [ ] Icons library integration (FontAwesome, Material Icons)
- [ ] Advanced theming presets
- [ ] Mobile-optimized touch gestures
- [ ] Virtual scrolling for large datasets
- [ ] Plugin system for extensibility
- [ ] i18n/l10n support

---

## Migration Notes

### From ng-searchix (Angular 2+)

This library provides API compatibility with the modern Angular version:

**Angular (2+):**
```html
<ngx-searchix
  [items]="items"
  [placeholder]="'Search...'"
  (itemSelected)="onSelect($event)"
></ngx-searchix>
```

**AngularJS (1.x):**
```html
<ngx-searchix
  items="$ctrl.items"
  placeholder="Search..."
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

Key differences:
- Bindings use `<` instead of `[]`
- Callbacks use `&` instead of `()`
- Callback parameters use locals: `($item)` instead of `$event`

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.
