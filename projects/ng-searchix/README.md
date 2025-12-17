# ng-searchix

A beautiful, customizable search component for Angular with keyboard navigation, icon support, and external link integration.

## Features

- 🎨 **Beautiful default UI** with modern, clean design
- 🎨 **Fully customizable** with 60+ CSS custom properties
- 🔧 **Custom button template** support
- 🎯 **Icon library integration** (Lucide, Heroicons, Font Awesome, or custom)
- 🔗 **External link support** with dedicated icon
- ⌨️ **Keyboard navigation** (↑/↓ arrows, Enter, Esc)
- ⏱️ **Recent items** with automatic localStorage sync ⭐ NEW
- 🚀 **Lightweight** with minimal dependencies
- ♿ **Accessible** with ARIA attributes
- 📱 **Responsive** design

## Quick Start

### Installation

```bash
npm install ng-searchix
```

### Import Module

```typescript
import { NgModule } from '@angular/core';
import { SearchixModule } from 'ng-searchix';

@NgModule({
  imports: [SearchixModule]
})
export class AppModule {}
```

### Import Styles

Add to your `angular.json`:

```json
"styles": [
  "node_modules/ng-searchix/styles/searchix.css",
  "src/styles.css"
]
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-root',
  template: `
    <ngx-searchix
      [items]="searchItems"
      [placeholder]="'Search...'"
      [hotkey]="'ctrl+k'"
      (itemSelected)="onItemSelected($event)"
    ></ngx-searchix>
  `
})
export class AppComponent {
  searchItems: SearchItem[] = [
    {
      id: '1',
      title: 'Getting Started',
      subtitle: 'Learn the basics',
      icon: 'book',
      href: 'https://example.com/docs'
    },
    {
      id: '2',
      title: 'API Reference',
      subtitle: 'Complete documentation',
      icon: 'code',
      href: 'https://example.com/api'
    }
  ];

  onItemSelected(item: SearchItem) {
    console.log('Selected:', item);
  }
}
```

## Documentation

- 📖 [Usage Guide](./projects/ng-searchix/USAGE.md) - Complete usage documentation
- 🎨 [Theme Examples](./projects/ng-searchix/THEMES.md) - Ready-to-use themes
- 💡 [Examples](./projects/ng-searchix/EXAMPLES.md) - Practical code examples

## Development

### Build the Library

```bash
npm install
npm run build
```

The built library output will be in `dist/ng-searchix`.

### Run Tests

```bash
npm test
```

## Key Features

### Custom Button Template

```html
<ngx-searchix
  [items]="items"
  [buttonTemplate]="customButton"
></ngx-searchix>

<ng-template #customButton let-context>
  <button (click)="context.open()">
    Custom Search Button
  </button>
</ng-template>
```

### Icon Integration

```html
<ngx-searchix
  [items]="items"
  [iconRenderer]="iconRenderer"
></ngx-searchix>

<ng-template #iconRenderer let-iconName>
  <lucide-icon [name]="iconName"></lucide-icon>
</ng-template>
```

### CSS Customization

```css
:root {
  --searchix-bg: #ffffff;
  --searchix-fg: #111827;
  --searchix-radius: 12px;
  --searchix-width: 640px;
  /* ... 60+ more variables */
}
```

### External Links

Items with `href` automatically show an external link icon:

```typescript
{
  id: '1',
  title: 'Documentation',
  href: 'https://example.com', // External link icon appears
  icon: 'book'
}
```

### Recent Items ⭐ NEW

Automatically tracks and displays recently selected items:

```typescript
// Option 1: Auto localStorage (no setup needed!)
<ngx-searchix [items]="items"></ngx-searchix>

// Option 2: Provide initial recents
<ngx-searchix
  [items]="items"
  [recentItems]="recentItems"
></ngx-searchix>
```

**Features:**
- Shows recent items when search is empty
- Click × to remove items from recents
- Auto-saves to localStorage (key: `searchix-recents`)
- Maximum 10 recent items
- No manual management needed!

[See full documentation](./EXAMPLES.md#example-9-recent-items-built-in-feature--new)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technical Notes

- Uses **Angular CDK Overlay** for modal rendering
- Event-driven API - emits `itemSelected` instead of routing internally
- Peer dependency: Angular `>=12 <19`
- Compatible with Angular 12-18

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
