# ng-searchix Workspace

Монорепозиторий с двумя поисковыми библиотеками:

- **ng-searchix** - для Angular 2+ (современные приложения)
- **ng-searchix-legacy** - для AngularJS 1.5.8+ (legacy приложения)

---

## ng-searchix (Angular 2+)

A beautiful, customizable search component for Angular with keyboard navigation, icon support, and external link integration.

## Features

- 🎨 **Beautiful default UI** with modern, clean design
- 🎨 **Fully customizable** with 60+ CSS custom properties
- 🔧 **Custom button template** support
- 🎯 **Icon library integration** (Lucide, Heroicons, Font Awesome, or custom)
- 🔗 **External link support** with dedicated icon
- ⌨️ **Keyboard navigation** (↑/↓ arrows, Enter, Esc)
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

---

## ng-searchix-legacy (AngularJS 1.x)

### Особенности
- ✅ Совместимость с AngularJS 1.5.8+
- ✅ Тот же API что и в Angular версии
- ✅ Горячие клавиши (Ctrl+K, Cmd+K)
- ✅ Навигация стрелками
- ✅ Полностью настраиваемый

### Быстрый старт

```html
<!-- Подключение -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<link rel="stylesheet" href="dist/ng-searchix-legacy.css">
<script src="dist/ng-searchix-legacy.js"></script>
```

```javascript
// Использование
angular.module('myApp', ['ngSearchixLegacy'])
  .controller('MainCtrl', function() {
    var vm = this;

    vm.items = [
      { id: '1', title: 'Dashboard', subtitle: 'View analytics' },
      { id: '2', title: 'Settings', subtitle: 'Configure app' }
    ];

    vm.onSelect = function(item) {
      console.log('Selected:', item);
    };
  });
```

```html
<ngx-searchix
  items="$ctrl.items"
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

**Полная документация**: [projects/ng-searchix-legacy/README.md](./projects/ng-searchix-legacy/README.md)
**Demo**: [projects/ng-searchix-legacy/example.html](./projects/ng-searchix-legacy/example.html)

---

## Development

### Build Libraries

```bash
npm install

# Сборка Angular 2+ версии
npm run build

# Сборка AngularJS 1.x версии
npm run build:legacy

# Сборка обеих библиотек
npm run build:all
```

**Output**:
- `dist/ng-searchix/` - Angular 2+ библиотека
- `projects/ng-searchix-legacy/dist/` - AngularJS 1.x библиотека

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

## Структура проекта

```
ng-searchix-workspace/
├── projects/
│   ├── ng-searchix/              # Angular 2+ библиотека
│   │   ├── src/
│   │   └── README.md
│   │
│   └── ng-searchix-legacy/       # AngularJS 1.x библиотека
│       ├── src/
│       ├── dist/
│       ├── example.html          # Живое демо
│       └── README.md
│
├── dist/ng-searchix/             # Собранная Angular библиотека
├── angular.json                  # Workspace конфигурация
└── package.json                  # NPM скрипты
```

## NPM Scripts

```bash
npm run build           # Сборка ng-searchix (Angular 2+)
npm run build:legacy    # Сборка ng-searchix-legacy (AngularJS 1.x)
npm run build:all       # Сборка обеих библиотек
npm test               # Запуск тестов
npm run lint           # Линтинг
```

## Сравнение библиотек

| Характеристика | ng-searchix | ng-searchix-legacy |
|---------------|-------------|-------------------|
| **Framework** | Angular 12+ | AngularJS 1.5.8+ |
| **Язык** | TypeScript | JavaScript |
| **Overlay** | Angular CDK | Custom |
| **Bindings** | `[items]` | `items` |
| **Events** | `(itemSelected)` | `on-item-selected` |
| **Размер** | ~50KB | ~28KB |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
