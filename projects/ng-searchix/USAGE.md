# ng-searchix Usage Guide

## Features

- 🎨 **Beautiful default UI** with modern design
- 🎨 **Fully customizable** with CSS custom properties
- 🔧 **Custom button template** support
- 🎯 **Icon library integration** (bring your own icons)
- 🔗 **External link support** with dedicated icon
- ⌨️ **Keyboard navigation** (↑/↓ arrows, Enter, Esc)
- 🚀 **Lightweight** with minimal dependencies

## Basic Usage

```typescript
import { NgModule } from '@angular/core';
import { SearchixModule } from 'ng-searchix';

@NgModule({
  imports: [SearchixModule]
})
export class AppModule {}
```

```html
<ngx-searchix
  [items]="searchItems"
  [placeholder]="'Search documentation...'"
  [hotkey]="'ctrl+k'"
  (itemSelected)="onItemSelected($event)"
></ngx-searchix>
```

```typescript
export class AppComponent {
  searchItems: SearchItem[] = [
    {
      id: '1',
      title: 'Getting Started',
      subtitle: 'Learn the basics',
      icon: 'book',
      href: 'https://example.com/docs/getting-started'
    },
    {
      id: '2',
      title: 'API Reference',
      subtitle: 'Complete API documentation',
      icon: 'code',
      href: 'https://example.com/docs/api'
    }
  ];

  onItemSelected(item: SearchItem) {
    console.log('Selected:', item);
    // Handle navigation or action
  }
}
```

## Custom Button Template

You can provide your own button template to completely customize the trigger:

```html
<ngx-searchix
  [items]="searchItems"
  [buttonTemplate]="customButton"
></ngx-searchix>

<ng-template #customButton let-context>
  <button
    class="my-custom-button"
    (click)="context.open()"
  >
    <span>🔍</span>
    <span>Search</span>
    <span class="hotkey">{{ context.hotkey }}</span>
  </button>
</ng-template>
```

The context provides:
- `open`: Function to open the search dialog
- `hotkey`: The configured hotkey string

## Icon Integration

### Using Custom Icon Renderer

You can integrate any icon library (Lucide, Heroicons, Font Awesome, etc.) by providing a custom icon renderer template:

```html
<!-- Example with Lucide Angular -->
<ngx-searchix
  [items]="searchItems"
  [iconRenderer]="lucideIconRenderer"
></ngx-searchix>

<ng-template #lucideIconRenderer let-iconName>
  <lucide-icon [name]="iconName" [size]="20"></lucide-icon>
</ng-template>
```

```html
<!-- Example with custom SVG icons -->
<ng-template #customIconRenderer let-iconName>
  <svg width="20" height="20" *ngIf="iconName === 'book'">
    <!-- SVG content -->
  </svg>
  <svg width="20" height="20" *ngIf="iconName === 'code'">
    <!-- SVG content -->
  </svg>
</ng-template>
```

### Global Icon Renderer

You can also configure the icon renderer globally:

```typescript
import { NgModule, TemplateRef } from '@angular/core';
import { SEARCHIX_CONFIG } from 'ng-searchix';

@NgModule({
  providers: [
    {
      provide: SEARCHIX_CONFIG,
      useValue: {
        iconRenderer: yourIconTemplate, // Provide via ViewChild or factory
        placeholder: 'Search...',
        hotkey: 'ctrl+k',
        closeOnSelect: true,
        showMs: false,
        maxResults: 50
      }
    }
  ]
})
export class AppModule {}
```

## External Links

When you provide an `href` property on a `SearchItem`, an external link icon will appear on hover:

```typescript
const item: SearchItem = {
  id: '1',
  title: 'Documentation',
  subtitle: 'Read the docs',
  icon: 'book',
  href: 'https://example.com/docs' // External link icon will appear
};
```

The external link icon:
- Appears on hover or when the item is active (keyboard navigation)
- Opens the link in a new tab when clicked
- Prevents the default item selection behavior when clicked
- Can emit a selection event if `emitOnExternalOpen` is enabled

```html
<ngx-searchix
  [items]="searchItems"
  [emitOnExternalOpen]="true"
></ngx-searchix>
```

## CSS Customization

The library uses CSS custom properties extensively. You can customize almost every aspect:

### Quick Theme Example

```css
:root {
  /* Colors */
  --searchix-bg: #1e1e1e;
  --searchix-fg: #ffffff;
  --searchix-border: rgba(255, 255, 255, 0.1);
  --searchix-muted: rgba(255, 255, 255, 0.5);

  /* Backdrop */
  --searchix-backdrop: rgba(0, 0, 0, 0.8);
  --searchix-backdrop-blur: 10px;

  /* Dialog */
  --searchix-radius: 16px;
  --searchix-width: 700px;
  --searchix-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  /* Trigger Button */
  --searchix-trigger-bg: #2d2d2d;
  --searchix-trigger-bg-hover: #3d3d3d;
  --searchix-trigger-border: rgba(255, 255, 255, 0.1);
  --searchix-trigger-radius: 8px;

  /* Items */
  --searchix-item-hover: rgba(255, 255, 255, 0.05);
  --searchix-item-active-bg: rgba(59, 130, 246, 0.2);
}
```

### All Available CSS Variables

#### Global
- `--searchix-z`: Z-index (default: 10000)
- `--searchix-font`: Font family
- `--searchix-bg`: Background color
- `--searchix-fg`: Text color
- `--searchix-border`: Border color
- `--searchix-muted`: Muted text color
- `--searchix-width`: Dialog width (default: 640px)

#### Backdrop
- `--searchix-backdrop`: Backdrop color
- `--searchix-backdrop-blur`: Backdrop blur (default: 4px)

#### Panel
- `--searchix-panel-width`: Panel width
- `--searchix-radius`: Border radius (default: 12px)
- `--searchix-shadow`: Box shadow

#### Trigger Button
- `--searchix-trigger-bg`: Background
- `--searchix-trigger-bg-hover`: Hover background
- `--searchix-trigger-color`: Text color
- `--searchix-trigger-border`: Border color
- `--searchix-trigger-border-hover`: Hover border
- `--searchix-trigger-radius`: Border radius
- `--searchix-trigger-shadow`: Box shadow
- `--searchix-trigger-px`: Horizontal padding
- `--searchix-trigger-py`: Vertical padding
- `--searchix-trigger-gap`: Gap between elements
- `--searchix-trigger-font-size`: Font size
- `--searchix-trigger-icon-opacity`: Icon opacity
- `--searchix-trigger-label-weight`: Label font weight
- `--searchix-trigger-hint-bg`: Hint background
- `--searchix-trigger-hint-border`: Hint border

#### Header
- `--searchix-header-bg`: Header background
- `--searchix-header-px`: Horizontal padding
- `--searchix-header-py`: Vertical padding
- `--searchix-header-gap`: Gap
- `--searchix-icon-opacity`: Search icon opacity
- `--searchix-icon-color`: Icon color

#### Input
- `--searchix-input-font`: Font size
- `--searchix-placeholder`: Placeholder color

#### Items
- `--searchix-item-px`: Horizontal padding
- `--searchix-item-py`: Vertical padding
- `--searchix-item-gap`: Gap
- `--searchix-item-hover`: Hover background
- `--searchix-item-active-bg`: Active background
- `--searchix-item-active-border`: Active border
- `--searchix-item-icon-size`: Icon size
- `--searchix-item-icon-opacity`: Icon opacity
- `--searchix-item-title-font`: Title font size
- `--searchix-item-title-weight`: Title weight
- `--searchix-item-subtitle-font`: Subtitle font size
- `--searchix-item-external-size`: External link button size
- `--searchix-item-external-bg`: External link background
- `--searchix-item-external-color`: External link color

#### Footer
- `--searchix-footer-bg`: Footer background
- `--searchix-footer-px`: Horizontal padding
- `--searchix-footer-py`: Vertical padding
- `--searchix-footer-font`: Font size

And many more! See `searchix.css` for the complete list.

## Advanced Configuration

### Global Configuration

```typescript
import { SEARCHIX_CONFIG, SearchixConfig } from 'ng-searchix';

const config: SearchixConfig = {
  placeholder: 'Search documentation...',
  hotkey: 'ctrl+k',
  closeOnSelect: true,
  showMs: true,
  maxResults: 50,
  emitOnExternalOpen: false,
  iconRenderer: null, // Provide via factory or component
  filterFn: (query, items) => {
    // Custom filter logic
    return items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};

@NgModule({
  providers: [
    { provide: SEARCHIX_CONFIG, useValue: config }
  ]
})
export class AppModule {}
```

### Custom Filtering

```typescript
import Fuse from 'fuse.js';

const config: SearchixConfig = {
  filterFn: (query, items) => {
    if (!query) return items;

    const fuse = new Fuse(items, {
      keys: ['title', 'subtitle'],
      threshold: 0.3
    });

    return fuse.search(query).map(result => result.item);
  }
};
```

## Keyboard Shortcuts

- `Ctrl+K` or `Cmd+K`: Open/close dialog (customizable)
- `↑` / `↓`: Navigate through results
- `Enter`: Select highlighted item
- `Esc`: Close dialog

## API Reference

### SearchixComponent Inputs

- `items: SearchItem[]` - Array of searchable items
- `placeholder?: string` - Input placeholder text
- `hotkey?: string` - Keyboard shortcut (e.g., 'ctrl+k', 'cmd+k')
- `closeOnSelect?: boolean` - Close dialog after selection (default: true)
- `showMs?: boolean` - Show search time in footer
- `maxResults?: number` - Maximum results to display (default: 50)
- `iconTemplate?: TemplateRef<any>` - Custom icon for trigger button
- `iconRenderer?: TemplateRef<any>` - Custom icon renderer for items
- `buttonTemplate?: TemplateRef<any>` - Custom trigger button template
- `emitOnExternalOpen?: boolean` - Emit selection event when external link is opened

### SearchixComponent Outputs

- `itemSelected: EventEmitter<SearchItem>` - Emitted when item is selected
- `opened: EventEmitter<void>` - Emitted when dialog opens
- `closed: EventEmitter<void>` - Emitted when dialog closes

### SearchItem Interface

```typescript
interface SearchItem {
  id: string;           // Unique identifier
  title: string;        // Main display text
  subtitle?: string;    // Secondary text
  icon?: string;        // Icon key (used with iconRenderer)
  href?: string;        // External link URL
  data?: any;          // Custom data payload
}
```

### SearchixConfig Interface

```typescript
interface SearchixConfig {
  placeholder?: string;
  hotkey?: string;
  closeOnSelect?: boolean;
  showMs?: boolean;
  maxResults?: number;
  filterFn?: (query: string, items: SearchItem[]) => SearchItem[];
  iconRenderer?: TemplateRef<any>;
  emitOnExternalOpen?: boolean;
}
```

## Examples

### Example 1: Documentation Search

```typescript
const docs: SearchItem[] = [
  {
    id: 'intro',
    title: 'Introduction',
    subtitle: 'Get started with the basics',
    icon: 'book-open',
    href: '/docs/intro'
  },
  {
    id: 'api',
    title: 'API Reference',
    subtitle: 'Complete API documentation',
    icon: 'code',
    href: '/docs/api'
  }
];
```

### Example 2: Command Palette

```typescript
const commands: SearchItem[] = [
  {
    id: 'new-file',
    title: 'Create New File',
    subtitle: 'Create a new file in the current directory',
    icon: 'file-plus',
    data: { action: 'create-file' }
  },
  {
    id: 'settings',
    title: 'Open Settings',
    subtitle: 'Configure application settings',
    icon: 'settings',
    data: { action: 'open-settings' }
  }
];

onItemSelected(item: SearchItem) {
  switch (item.data.action) {
    case 'create-file':
      this.createFile();
      break;
    case 'open-settings':
      this.router.navigate(['/settings']);
      break;
  }
}
```

### Example 3: With Lucide Icons

First, install lucide-angular:
```bash
npm install lucide-angular
```

Then use it:
```typescript
import { LucideAngularModule, icons } from 'lucide-angular';

@NgModule({
  imports: [
    SearchixModule,
    LucideAngularModule.pick(icons)
  ]
})
export class AppModule {}
```

```html
<ngx-searchix
  [items]="items"
  [iconRenderer]="lucideRenderer"
></ngx-searchix>

<ng-template #lucideRenderer let-icon>
  <lucide-icon [name]="icon" [size]="20"></lucide-icon>
</ng-template>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
