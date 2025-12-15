# Quick Start Guide

Get up and running with **ng-searchix-legacy** in 5 minutes!

## Installation

### Option 1: NPM (Recommended)

```bash
npm install ng-searchix-legacy
```

### Option 2: Bower

```bash
bower install ng-searchix-legacy --save
```

### Option 3: CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/ng-searchix-legacy@1.0.0/ng-searchix-legacy.css">

<!-- JS -->
<script src="https://unpkg.com/ng-searchix-legacy@1.0.0/ng-searchix-legacy.js"></script>
```

### Option 4: Manual Download

Download `ng-searchix-legacy.js` and `ng-searchix-legacy.css` from the [releases page](https://github.com/yourusername/ng-searchix-legacy/releases).

## Basic Setup

### 1. Include Files

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <!-- AngularJS 1.5.8+ -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>

  <!-- ng-searchix-legacy CSS -->
  <link rel="stylesheet" href="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.css">

  <!-- ng-searchix-legacy JS -->
  <script src="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.js"></script>
</head>
<body>
  <!-- Your app -->
</body>
</html>
```

### 2. Add Module Dependency

```javascript
angular.module('myApp', ['ngSearchixLegacy']);
```

### 3. Use the Component

```html
<div ng-controller="MainController as $ctrl">
  <ngx-searchix
    items="$ctrl.searchItems"
    on-item-selected="$ctrl.onSelect($item)"
  ></ngx-searchix>
</div>
```

### 4. Define Controller

```javascript
angular.module('myApp')
  .controller('MainController', function() {
    var vm = this;

    // Define searchable items
    vm.searchItems = [
      {
        id: '1',
        title: 'Dashboard',
        subtitle: 'View your dashboard',
        icon: 'dashboard'
      },
      {
        id: '2',
        title: 'Settings',
        subtitle: 'Manage settings',
        icon: 'settings'
      },
      {
        id: '3',
        title: 'Profile',
        subtitle: 'Edit your profile',
        icon: 'user'
      }
    ];

    // Handle item selection
    vm.onSelect = function(item) {
      console.log('Selected:', item);
      // Navigate or perform action
      window.location.href = '#/' + item.id;
    };
  });
```

## Complete Minimal Example

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="UTF-8">
  <title>ng-searchix-legacy Demo</title>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
  <link rel="stylesheet" href="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.css">
  <script src="node_modules/ng-searchix-legacy/dist/ng-searchix-legacy.js"></script>

  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body ng-controller="MainCtrl as $ctrl">
  <h1>My Application</h1>

  <!-- Search Component -->
  <ngx-searchix
    items="$ctrl.items"
    placeholder="Search pages..."
    hotkey="ctrl+k"
    on-item-selected="$ctrl.handleSelect($item)"
  ></ngx-searchix>

  <div ng-if="$ctrl.selected" style="margin-top: 20px; padding: 20px; background: #f0f0f0;">
    <h3>Selected:</h3>
    <pre>{{ $ctrl.selected | json }}</pre>
  </div>

  <script>
    angular.module('myApp', ['ngSearchixLegacy'])
      .controller('MainCtrl', function() {
        var vm = this;

        vm.items = [
          { id: '1', title: 'Home', subtitle: 'Go to homepage' },
          { id: '2', title: 'About', subtitle: 'Learn about us' },
          { id: '3', title: 'Contact', subtitle: 'Get in touch' },
          { id: '4', title: 'Products', subtitle: 'Browse products' },
          { id: '5', title: 'Services', subtitle: 'Our services' }
        ];

        vm.selected = null;

        vm.handleSelect = function(item) {
          vm.selected = item;
        };
      });
  </script>
</body>
</html>
```

## Keyboard Shortcuts

Once the component is added, users can:

- **Open/Close**: `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
- **Navigate**: `↑` and `↓` arrow keys
- **Select**: `Enter`
- **Close**: `Escape`

## Customization

### Change Hotkey

```html
<ngx-searchix
  items="$ctrl.items"
  hotkey="cmd+p"
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

### Custom Placeholder

```html
<ngx-searchix
  items="$ctrl.items"
  placeholder="Type to search documentation..."
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

### Show Search Time

```html
<ngx-searchix
  items="$ctrl.items"
  show-ms="true"
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

### Limit Results

```html
<ngx-searchix
  items="$ctrl.items"
  max-results="10"
  on-item-selected="$ctrl.onSelect($item)"
></ngx-searchix>
```

## Configuration (Optional)

Configure global defaults:

```javascript
angular.module('myApp', ['ngSearchixLegacy'])
  .config(function(searchixConfigProvider) {
    searchixConfigProvider.setDefaults({
      placeholder: 'Search...',
      hotkey: 'ctrl+k',
      closeOnSelect: true,
      maxResults: 50,
      showMs: false
    });
  });
```

## Programmatic Control

Use the service for advanced control:

```javascript
angular.module('myApp')
  .controller('MyController', function(searchixOverlay) {
    var vm = this;

    vm.openSearch = function() {
      searchixOverlay.open(
        vm.items,
        { placeholder: 'Search...' },
        function(item) {
          console.log('Selected:', item);
        },
        function() {
          console.log('Closed');
        }
      );
    };

    vm.closeSearch = function() {
      searchixOverlay.close();
    };
  });
```

## Using with Bower + Gulp

### Quick Setup

```bash
# Install Bower dependencies
bower install angular#^1.5.8 ng-searchix-legacy --save

# Install Gulp dependencies
npm install --save-dev gulp gulp-concat gulp-uglify gulp-clean-css
```

### Basic Gulpfile

```javascript
// gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('vendor-js', function() {
  return gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/ng-searchix-legacy/ng-searchix-legacy.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor-css', function() {
  return gulp.src('bower_components/ng-searchix-legacy/ng-searchix-legacy.css')
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['vendor-js', 'vendor-css']);
```

### Run Build

```bash
gulp build
```

Your files will be in:
- `dist/js/vendor.js` - Combined & minified scripts
- `dist/css/vendor.css` - Combined & minified styles

For more advanced Gulp configurations, see the [full README](README.md#using-with-gulp).

## Next Steps

- 📖 Read the [full documentation](README.md)
- 🎨 Learn about [theming and customization](README.md#customization)
- 🔧 Explore [advanced examples](example.html)
- 🐛 [Report issues](https://github.com/yourusername/ng-searchix-legacy/issues)

## Need Help?

- Check the [README](README.md) for detailed documentation
- Look at the [example.html](example.html) for a complete demo
- Open an [issue](https://github.com/yourusername/ng-searchix-legacy/issues) if you find bugs

---

**Happy Coding!** 🚀
