# ng-searchix-legacy

> Advanced search interface component for **AngularJS 1.5.8+** with keyboard shortcuts and fuzzy search

A powerful, customizable search component for AngularJS 1.x applications, inspired by modern command palettes like Spotlight and Cmd+K interfaces.

## Features

- ✨ **Modern UI** - Beautiful, responsive search interface
- ⌨️ **Keyboard Shortcuts** - Configurable hotkeys (Ctrl+K, Cmd+K, etc.)
- 🔍 **Fuzzy Search** - Built-in filtering with optional Fuse.js integration
- 🎨 **Fully Customizable** - CSS variables for easy theming
- 📱 **Responsive** - Works on desktop and mobile
- 🚀 **Lightweight** - No heavy dependencies
- ♿ **Accessible** - ARIA attributes and keyboard navigation

## Installation

### NPM

```bash
npm install ng-searchix-legacy
```

### Bower

```bash
bower install ng-searchix-legacy --save
```

Or add to your `bower.json`:

```json
{
  "dependencies": {
    "angular": "^1.5.8",
    "ng-searchix-legacy": "^1.0.0"
  }
}
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/ng-searchix-legacy@1.0.0/ng-searchix-legacy.css">

<!-- JavaScript -->
<script src="https://unpkg.com/ng-searchix-legacy@1.0.0/ng-searchix-legacy.js"></script>
```

### Manual

Download the files from `dist/` folder:
- `ng-searchix-legacy.js`
- `ng-searchix-legacy.css`

## Quick Start

### 1. Include Dependencies

```html
<!-- AngularJS 1.5.8+ -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>

<!-- ng-searchix-legacy -->
<link rel="stylesheet" href="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.css">
<script src="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.js"></script>
```

### 2. Add Module Dependency

```javascript
angular.module('myApp', ['ngSearchixLegacy']);
```

### 3. Use the Component

```html
<div ng-controller="MyController">
  <ngx-searchix
    items="$ctrl.searchItems"
    on-item-selected="$ctrl.handleSelect($item)"
  ></ngx-searchix>
</div>
```

```javascript
angular.module('myApp')
  .controller('MyController', function() {
    var vm = this;

    vm.searchItems = [
      { id: '1', title: 'Dashboard', subtitle: 'View analytics', icon: 'dashboard' },
      { id: '2', title: 'Settings', subtitle: 'Configure app', icon: 'settings' },
      { id: '3', title: 'Profile', subtitle: 'Edit your profile', icon: 'user' }
    ];

    vm.handleSelect = function(item) {
      console.log('Selected:', item);
      // Navigate or perform action
    };
  });
```

## API Reference

### Component: `<ngx-searchix>`

#### Bindings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `SearchItem[]` | `[]` | Array of searchable items |
| `placeholder` | `string` | `'Search...'` | Input placeholder text |
| `hotkey` | `string` | `'ctrl+k'` | Keyboard shortcut (e.g., 'ctrl+k', 'cmd+k') |
| `close-on-select` | `boolean` | `true` | Close overlay after selection |
| `show-ms` | `boolean` | `false` | Show search time in ms |
| `max-results` | `number` | `50` | Maximum results to display |
| `icon-template` | `string` | - | Custom icon template URL |
| `icon-renderer` | `string` | - | Custom result icon renderer URL |
| `button-template` | `string` | - | Custom trigger button template URL |
| `emit-on-external-open` | `boolean` | `false` | Emit event when external link clicked |
| `on-item-selected` | `function` | - | Callback when item is selected `($item)` |
| `on-opened` | `function` | - | Callback when overlay opens |
| `on-closed` | `function` | - | Callback when overlay closes |

#### SearchItem Interface

```typescript
interface SearchItem {
  id: string;          // Unique identifier
  title: string;       // Main title text
  subtitle?: string;   // Optional subtitle/description
  icon?: string;       // Optional icon key
  href?: string;       // Optional external link
  data?: any;          // Custom data payload
}
```

### Configuration Provider

Configure global defaults:

```javascript
angular.module('myApp', ['ngSearchixLegacy'])
  .config(function(searchixConfigProvider) {
    searchixConfigProvider.setDefaults({
      placeholder: 'Type to search...',
      hotkey: 'cmd+k',
      closeOnSelect: true,
      maxResults: 100,
      showMs: true
    });
  });
```

### Service: `searchixOverlay`

Direct control over the search overlay:

```javascript
angular.module('myApp')
  .controller('MyController', function(searchixOverlay) {
    var vm = this;

    vm.openSearch = function() {
      var unsubscribe = searchixOverlay.open(
        vm.items,
        { placeholder: 'Search...' },
        function onSelect(item) {
          console.log('Selected:', item);
        },
        function onClose() {
          console.log('Closed');
        }
      );

      // Later: unsubscribe() to close
    };

    vm.closeSearch = function() {
      searchixOverlay.close();
    };

    vm.isOpen = function() {
      return searchixOverlay.isOpen();
    };
  });
```

## Customization

### Theming with CSS Variables

Override CSS variables to customize appearance:

```css
:root {
  /* Trigger Button */
  --searchix-trigger-bg: #ffffff;
  --searchix-trigger-border: rgba(0, 0, 0, 0.12);
  --searchix-trigger-radius: 8px;

  /* Dialog */
  --searchix-bg: #ffffff;
  --searchix-fg: #111827;
  --searchix-border: rgba(0, 0, 0, 0.08);
  --searchix-width: 640px;

  /* Input */
  --searchix-input-font: 16px;
  --searchix-placeholder: rgba(17, 24, 39, 0.4);

  /* Items */
  --searchix-item-active-bg: rgba(59, 130, 246, 0.08);
  --searchix-item-hover: rgba(0, 0, 0, 0.03);

  /* Footer */
  --searchix-muted: rgba(17, 24, 39, 0.5);
}
```

### Dark Mode Example

```css
[data-theme="dark"] {
  --searchix-bg: #1f2937;
  --searchix-fg: #f3f4f6;
  --searchix-border: rgba(255, 255, 255, 0.1);
  --searchix-placeholder: rgba(243, 244, 246, 0.4);
  --searchix-muted: rgba(243, 244, 246, 0.5);
}
```

### Fuzzy Search with Fuse.js

ng-searchix-legacy now uses **Fuse.js** for fuzzy search by default. You can customize the search behavior by passing Fuse.js options:

```javascript
// Configure Fuse.js options globally
searchixConfigProvider.setDefaults({
  fuseOptions: {
    keys: ['title', 'subtitle'],
    threshold: 0.3,        // 0.0 = exact match, 1.0 = match anything
    ignoreLocation: true,  // Search entire string
    minMatchCharLength: 2
  }
});
```

Or pass options to individual components:

```html
<ngx-searchix
  items="$ctrl.items"
  config="{ fuseOptions: { threshold: 0.2 } }"
  on-item-selected="$ctrl.handleSelect($item)"
></ngx-searchix>
```

#### Fuse.js Options Reference

Common options you can configure:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `0.35` | At what point does the match algorithm give up (0.0 = perfect match, 1.0 = match anything) |
| `keys` | `string[]` | `['title', 'subtitle']` | Keys to search in |
| `ignoreLocation` | `boolean` | `true` | Whether to ignore location of match in string |
| `minMatchCharLength` | `number` | `1` | Minimum number of characters that must be matched |
| `findAllMatches` | `boolean` | `false` | When true, matching will continue to the end of a search pattern even if a perfect match has already been located |

See [Fuse.js documentation](https://fusejs.io/api/options.html) for all available options.

### Custom Filter Function

If you need completely custom search logic, you can still provide a custom filter function:

```javascript
searchixConfigProvider.setDefaults({
  filterFn: function(query, items) {
    // Your custom search implementation
    var q = query.toLowerCase();
    return items.filter(function(item) {
      return item.title.toLowerCase().indexOf(q) !== -1;
    });
  }
});
```

**Note:** When `filterFn` is provided, it will be used instead of the default Fuse.js search.

### Custom Templates

#### Custom Trigger Button

```html
<!-- Define template -->
<script type="text/ng-template" id="custom-button.html">
  <button class="my-custom-button" ng-click="open()">
    🔍 Search ({{ hotkey }})
  </button>
</script>

<!-- Use it -->
<ngx-searchix
  items="$ctrl.items"
  button-template="custom-button.html"
></ngx-searchix>
```

#### Custom Icon Renderer

```html
<script type="text/ng-template" id="custom-icon.html">
  <i class="icon icon-{{ $implicit }}"></i>
</script>

<ngx-searchix
  items="$ctrl.items"
  icon-renderer="custom-icon.html"
></ngx-searchix>
```

## Examples

### Basic Usage

```html
<ngx-searchix
  items="$ctrl.pages"
  placeholder="Search pages..."
  hotkey="ctrl+k"
  on-item-selected="$ctrl.navigate($item)"
></ngx-searchix>
```

### With External Links

```javascript
vm.items = [
  {
    id: 'docs',
    title: 'Documentation',
    subtitle: 'Read the docs',
    href: 'https://docs.example.com',
    icon: 'book'
  }
];
```

### Custom Search

```javascript
vm.searchItems = [
  { id: '1', title: 'JavaScript Guide', tags: ['js', 'tutorial'] },
  { id: '2', title: 'CSS Tips', tags: ['css', 'design'] }
];

searchixConfigProvider.setDefaults({
  filterFn: function(query, items) {
    var q = query.toLowerCase();
    return items.filter(function(item) {
      var titleMatch = item.title.toLowerCase().indexOf(q) !== -1;
      var tagMatch = item.tags.some(function(tag) {
        return tag.indexOf(q) !== -1;
      });
      return titleMatch || tagMatch;
    });
  }
});
```

### Programmatic Control

```javascript
angular.module('myApp')
  .controller('AppController', function(searchixOverlay) {
    var vm = this;

    // Open from anywhere
    vm.openGlobalSearch = function() {
      searchixOverlay.open(
        vm.globalSearchItems,
        { placeholder: 'Global search...' },
        function(item) {
          vm.handleGlobalSelect(item);
        },
        function() {
          console.log('Search closed');
        }
      );
    };

    // Bind to custom hotkey
    angular.element(document).on('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'p') {
        e.preventDefault();
        vm.openGlobalSearch();
      }
    });
  });
```

### Using with Bower

#### 1. Install via Bower

```bash
bower install ng-searchix-legacy --save
```

#### 2. Include in HTML

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <!-- AngularJS -->
  <script src="bower_components/angular/angular.min.js"></script>

  <!-- ng-searchix-legacy CSS -->
  <link rel="stylesheet" href="bower_components/ng-searchix-legacy/ng-searchix-legacy.css">

  <!-- ng-searchix-legacy JS -->
  <script src="bower_components/ng-searchix-legacy/ng-searchix-legacy.js"></script>
</head>
<body>
  <!-- Your app -->
</body>
</html>
```

#### 3. Or use with main-bower-files

```javascript
// gulpfile.js
var mainBowerFiles = require('main-bower-files');

gulp.task('bower-files', function() {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('dist/vendor'));
});
```

### Using with Gulp

#### Basic Gulpfile

```javascript
// gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

// Vendor scripts
gulp.task('vendor-js', function() {
  return gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/ng-searchix-legacy/ng-searchix-legacy.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Vendor styles
gulp.task('vendor-css', function() {
  return gulp.src([
    'bower_components/ng-searchix-legacy/ng-searchix-legacy.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/css'));
});

// App scripts
gulp.task('app-js', function() {
  return gulp.src('app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['app-js']);
});

// Build
gulp.task('build', ['vendor-js', 'vendor-css', 'app-js']);

// Default
gulp.task('default', ['build', 'watch']);
```

#### Advanced Gulpfile with BrowserSync

```javascript
// gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');

// Paths
var paths = {
  vendor: {
    js: mainBowerFiles('**/*.js'),
    css: mainBowerFiles('**/*.css')
  },
  app: {
    js: 'app/**/*.js',
    css: 'app/**/*.css',
    html: 'app/**/*.html'
  },
  dist: 'dist'
};

// Vendor JS
gulp.task('vendor:js', function() {
  return gulp.src(paths.vendor.js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'))
    .pipe(browserSync.stream());
});

// Vendor CSS
gulp.task('vendor:css', function() {
  return gulp.src(paths.vendor.css)
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
});

// App JS
gulp.task('app:js', function() {
  return gulp.src(paths.app.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'))
    .pipe(browserSync.stream());
});

// App CSS
gulp.task('app:css', function() {
  return gulp.src(paths.app.css)
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
});

// HTML
gulp.task('html', function() {
  return gulp.src(paths.app.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

// Serve
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.app.js, ['app:js']);
  gulp.watch(paths.app.css, ['app:css']);
  gulp.watch(paths.app.html, ['html']);
});

// Build
gulp.task('build', ['vendor:js', 'vendor:css', 'app:js', 'app:css', 'html']);

// Default
gulp.task('default', ['serve']);
```

#### Project Structure for Gulp

```
my-project/
├── app/
│   ├── components/
│   │   └── search/
│   │       ├── search.controller.js
│   │       └── search.html
│   ├── app.module.js
│   ├── app.config.js
│   └── index.html
├── bower_components/
│   ├── angular/
│   └── ng-searchix-legacy/
├── dist/
│   ├── css/
│   │   ├── vendor.min.css
│   │   └── app.min.css
│   ├── js/
│   │   ├── vendor.min.js
│   │   └── app.min.js
│   └── index.html
├── bower.json
├── gulpfile.js
└── package.json
```

#### Example app.module.js

```javascript
// app/app.module.js
(function() {
  'use strict';

  angular
    .module('myApp', [
      'ngSearchixLegacy'
    ])
    .config(searchixConfig);

  searchixConfig.$inject = ['searchixConfigProvider'];

  function searchixConfig(searchixConfigProvider) {
    searchixConfigProvider.setDefaults({
      placeholder: 'Search documentation...',
      hotkey: 'ctrl+k',
      closeOnSelect: true,
      maxResults: 50,
      showMs: true
    });
  }
})();
```

#### Example index.html

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="UTF-8">
  <title>My AngularJS App</title>

  <!-- Vendor CSS (includes ng-searchix-legacy) -->
  <link rel="stylesheet" href="css/vendor.min.css">

  <!-- App CSS -->
  <link rel="stylesheet" href="css/app.min.css">
</head>
<body ng-controller="MainController as $ctrl">

  <ngx-searchix
    items="$ctrl.searchItems"
    on-item-selected="$ctrl.onSelect($item)"
  ></ngx-searchix>

  <!-- Vendor JS (includes Angular + ng-searchix-legacy) -->
  <script src="js/vendor.min.js"></script>

  <!-- App JS -->
  <script src="js/app.min.js"></script>
</body>
</html>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE 11+ (with polyfills)

## Compatibility

- **AngularJS**: 1.5.8 and above
- **Node.js**: Not required (browser-only library)

## Migration from ng-searchix (Angular 2+)

This library provides the same API as `ng-searchix` but for AngularJS 1.x:

**Angular (2+) version:**
```typescript
<ngx-searchix
  [items]="items"
  (itemSelected)="handleSelect($event)"
></ngx-searchix>
```

**AngularJS version:**
```html
<ngx-searchix
  items="$ctrl.items"
  on-item-selected="$ctrl.handleSelect($item)"
></ngx-searchix>
```

## Development

### Build

```bash
cd projects/ng-searchix-legacy
node build.js
```

This creates:
- `dist/ng-searchix-legacy.js`
- `dist/ng-searchix-legacy.css`

### Project Structure

```
ng-searchix-legacy/
├── src/
│   ├── ng-searchix-legacy.module.js    # Main module
│   ├── searchix.component.js           # Trigger component
│   ├── searchix-overlay.service.js     # Overlay service
│   ├── searchix-dialog.directive.js    # Dialog directive
│   ├── ng-searchix-legacy.css          # Styles
│   └── ng-searchix-legacy.d.ts         # TypeScript definitions
├── dist/                                # Build output
├── build.js                             # Build script
├── package.json
└── README.md
```

## License

MIT License

## Credits

Based on [ng-searchix](https://github.com/yourusername/ng-searchix) for Angular 2+.

Ported to AngularJS 1.5.8+ for legacy applications.
