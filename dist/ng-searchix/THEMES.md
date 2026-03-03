# ng-searchix Theme Examples

Here are some ready-to-use theme examples for ng-searchix.

## Light Theme (Default)

```css
:root {
  /* Already the default values */
  --searchix-bg: #ffffff;
  --searchix-fg: #111827;
  --searchix-border: rgba(0, 0, 0, 0.08);
  --searchix-muted: rgba(17, 24, 39, 0.5);
}
```

## Dark Theme

```css
:root {
  /* Base colors */
  --searchix-bg: #1e1e1e;
  --searchix-fg: #e5e7eb;
  --searchix-border: rgba(255, 255, 255, 0.1);
  --searchix-muted: rgba(229, 231, 235, 0.5);

  /* Backdrop */
  --searchix-backdrop: rgba(0, 0, 0, 0.8);
  --searchix-backdrop-blur: 8px;

  /* Header */
  --searchix-header-bg: transparent;
  --searchix-icon-color: #9ca3af;
  --searchix-placeholder: rgba(229, 231, 235, 0.4);

  /* Keyboard hints */
  --searchix-kbd-bg: rgba(255, 255, 255, 0.08);
  --searchix-kbd-fg: rgba(255, 255, 255, 0.6);
  --searchix-kbd-border: rgba(255, 255, 255, 0.1);

  /* Items */
  --searchix-item-hover: rgba(255, 255, 255, 0.05);
  --searchix-item-active-bg: rgba(59, 130, 246, 0.15);
  --searchix-item-active-border: rgba(59, 130, 246, 0.3);

  /* External link */
  --searchix-item-external-bg: rgba(255, 255, 255, 0.05);
  --searchix-item-external-bg-hover: rgba(255, 255, 255, 0.1);
  --searchix-item-external-color: rgba(255, 255, 255, 0.5);
  --searchix-item-external-color-hover: rgba(255, 255, 255, 0.8);

  /* Footer */
  --searchix-footer-bg: transparent;
  --searchix-footer-kbd-bg: rgba(255, 255, 255, 0.06);
  --searchix-footer-kbd-fg: rgba(255, 255, 255, 0.5);
  --searchix-footer-kbd-border: rgba(255, 255, 255, 0.08);

  /* Trigger button */
  --searchix-trigger-bg: #2d2d2d;
  --searchix-trigger-bg-hover: #3d3d3d;
  --searchix-trigger-border: rgba(255, 255, 255, 0.1);
  --searchix-trigger-border-hover: rgba(255, 255, 255, 0.2);
  --searchix-trigger-hint-bg: rgba(255, 255, 255, 0.08);
  --searchix-trigger-hint-border: rgba(255, 255, 255, 0.1);
}
```

## Nord Theme

```css
:root {
  /* Nord color palette */
  --searchix-bg: #2e3440;
  --searchix-fg: #eceff4;
  --searchix-border: #3b4252;
  --searchix-muted: #81a1c1;

  /* Backdrop */
  --searchix-backdrop: rgba(46, 52, 64, 0.9);
  --searchix-backdrop-blur: 10px;

  /* Header */
  --searchix-header-bg: #3b4252;
  --searchix-icon-color: #81a1c1;
  --searchix-placeholder: #81a1c1;

  /* Input */
  --searchix-input-font: 16px;

  /* Items */
  --searchix-item-hover: #3b4252;
  --searchix-item-active-bg: #5e81ac;
  --searchix-item-active-border: #5e81ac;
  --searchix-item-title-color: #eceff4;

  /* External link */
  --searchix-item-external-bg: #3b4252;
  --searchix-item-external-bg-hover: #4c566a;
  --searchix-item-external-color: #81a1c1;
  --searchix-item-external-color-hover: #88c0d0;

  /* Footer */
  --searchix-footer-bg: #3b4252;

  /* Kbd */
  --searchix-kbd-bg: #4c566a;
  --searchix-kbd-fg: #d8dee9;
  --searchix-kbd-border: #434c5e;

  /* Trigger */
  --searchix-trigger-bg: #3b4252;
  --searchix-trigger-bg-hover: #434c5e;
  --searchix-trigger-border: #4c566a;
  --searchix-trigger-hint-bg: #4c566a;
}
```

## Dracula Theme

```css
:root {
  /* Dracula colors */
  --searchix-bg: #282a36;
  --searchix-fg: #f8f8f2;
  --searchix-border: #44475a;
  --searchix-muted: #6272a4;

  /* Backdrop */
  --searchix-backdrop: rgba(40, 42, 54, 0.9);

  /* Header */
  --searchix-header-bg: transparent;
  --searchix-icon-color: #bd93f9;
  --searchix-placeholder: #6272a4;

  /* Items */
  --searchix-item-hover: #44475a;
  --searchix-item-active-bg: rgba(189, 147, 249, 0.2);
  --searchix-item-active-border: #bd93f9;

  /* External link */
  --searchix-item-external-bg: #44475a;
  --searchix-item-external-bg-hover: #6272a4;
  --searchix-item-external-color: #bd93f9;
  --searchix-item-external-color-hover: #ff79c6;

  /* Kbd */
  --searchix-kbd-bg: #44475a;
  --searchix-kbd-fg: #f8f8f2;
  --searchix-kbd-border: #6272a4;

  /* Trigger */
  --searchix-trigger-bg: #44475a;
  --searchix-trigger-bg-hover: #6272a4;
  --searchix-trigger-border: #6272a4;
}
```

## Solarized Light Theme

```css
:root {
  /* Solarized Light */
  --searchix-bg: #fdf6e3;
  --searchix-fg: #657b83;
  --searchix-border: #eee8d5;
  --searchix-muted: #93a1a1;

  /* Backdrop */
  --searchix-backdrop: rgba(253, 246, 227, 0.95);
  --searchix-backdrop-blur: 8px;

  /* Header */
  --searchix-icon-color: #268bd2;
  --searchix-placeholder: #93a1a1;

  /* Items */
  --searchix-item-hover: #eee8d5;
  --searchix-item-active-bg: rgba(38, 139, 210, 0.1);
  --searchix-item-active-border: #268bd2;

  /* External link */
  --searchix-item-external-color: #268bd2;
  --searchix-item-external-color-hover: #2aa198;

  /* Kbd */
  --searchix-kbd-bg: #eee8d5;
  --searchix-kbd-fg: #657b83;
  --searchix-kbd-border: #d3cbb7;

  /* Trigger */
  --searchix-trigger-bg: #eee8d5;
  --searchix-trigger-bg-hover: #e3dcc3;
}
```

## Material Design (Light)

```css
:root {
  /* Material colors */
  --searchix-bg: #ffffff;
  --searchix-fg: #212121;
  --searchix-border: #e0e0e0;
  --searchix-muted: #757575;

  /* Backdrop */
  --searchix-backdrop: rgba(0, 0, 0, 0.32);
  --searchix-backdrop-blur: 0px;

  /* Elevation */
  --searchix-shadow: 0 11px 15px -7px rgba(0,0,0,.2),
                     0 24px 38px 3px rgba(0,0,0,.14),
                     0 9px 46px 8px rgba(0,0,0,.12);

  /* Border radius */
  --searchix-radius: 4px;
  --searchix-trigger-radius: 4px;

  /* Items */
  --searchix-item-hover: rgba(0, 0, 0, 0.04);
  --searchix-item-active-bg: rgba(25, 118, 210, 0.12);
  --searchix-item-active-border: transparent;
  --searchix-item-py: 16px;

  /* External link */
  --searchix-item-external-color: #1976d2;
  --searchix-item-external-bg: transparent;
  --searchix-item-external-bg-hover: rgba(25, 118, 210, 0.08);

  /* Typography */
  --searchix-item-title-weight: 400;
  --searchix-footer-count-weight: 400;

  /* Trigger */
  --searchix-trigger-bg: #f5f5f5;
  --searchix-trigger-bg-hover: #eeeeee;
  --searchix-trigger-shadow: 0 2px 4px rgba(0,0,0,.12);
}
```

## Glassmorphism Theme

```css
:root {
  /* Glassmorphism */
  --searchix-bg: rgba(255, 255, 255, 0.7);
  --searchix-fg: #1f2937;
  --searchix-border: rgba(255, 255, 255, 0.3);

  /* Backdrop */
  --searchix-backdrop: rgba(0, 0, 0, 0.3);
  --searchix-backdrop-blur: 20px;

  /* Panel */
  --searchix-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --searchix-radius: 16px;

  /* Header - glass effect */
  --searchix-header-bg: rgba(255, 255, 255, 0.25);

  /* Items */
  --searchix-item-hover: rgba(255, 255, 255, 0.4);
  --searchix-item-active-bg: rgba(59, 130, 246, 0.2);

  /* Footer - glass effect */
  --searchix-footer-bg: rgba(255, 255, 255, 0.25);

  /* Trigger */
  --searchix-trigger-bg: rgba(255, 255, 255, 0.7);
  --searchix-trigger-bg-hover: rgba(255, 255, 255, 0.85);
  --searchix-trigger-border: rgba(255, 255, 255, 0.3);
  --searchix-trigger-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.2);
}

/* Add backdrop filter support */
.searchix {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.searchix__header,
.searchix__footer {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

## High Contrast Theme

```css
:root {
  /* High contrast for accessibility */
  --searchix-bg: #000000;
  --searchix-fg: #ffffff;
  --searchix-border: #ffffff;
  --searchix-muted: #c0c0c0;

  /* Backdrop */
  --searchix-backdrop: rgba(0, 0, 0, 0.95);
  --searchix-backdrop-blur: 0px;

  /* Items */
  --searchix-item-hover: #1a1a1a;
  --searchix-item-active-bg: #0066cc;
  --searchix-item-active-border: #ffffff;

  /* Borders */
  --searchix-item-py: 16px;

  /* External link */
  --searchix-item-external-bg: #1a1a1a;
  --searchix-item-external-bg-hover: #333333;
  --searchix-item-external-color: #ffffff;

  /* Focus */
  --searchix-trigger-outline: #ffff00;
}
```

## Using Themes

### Method 1: CSS File

Create a theme file (e.g., `searchix-dark-theme.css`):

```css
/* searchix-dark-theme.css */
:root {
  --searchix-bg: #1e1e1e;
  /* ... other variables */
}
```

Import in your `styles.css`:

```css
@import 'searchix-dark-theme.css';
```

### Method 2: Component Styles

```typescript
@Component({
  selector: 'app-root',
  styles: [`
    :host {
      --searchix-bg: #1e1e1e;
      --searchix-fg: #e5e7eb;
      /* ... other variables */
    }
  `]
})
export class AppComponent {}
```

### Method 3: Dynamic Theming with Angular

```typescript
export class AppComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const root = document.documentElement;

    if (this.isDarkMode) {
      root.style.setProperty('--searchix-bg', '#1e1e1e');
      root.style.setProperty('--searchix-fg', '#e5e7eb');
      // ... set other dark theme variables
    } else {
      root.style.setProperty('--searchix-bg', '#ffffff');
      root.style.setProperty('--searchix-fg', '#111827');
      // ... set other light theme variables
    }
  }
}
```

### Method 4: CSS Classes

```css
/* Light theme (default) */
:root {
  --searchix-bg: #ffffff;
  --searchix-fg: #111827;
}

/* Dark theme */
.dark-theme {
  --searchix-bg: #1e1e1e;
  --searchix-fg: #e5e7eb;
}
```

```typescript
@Component({
  selector: 'app-root',
  template: `
    <div [class.dark-theme]="isDarkMode">
      <ngx-searchix [items]="items"></ngx-searchix>
    </div>
  `
})
export class AppComponent {
  isDarkMode = false;
}
```

## Tips for Custom Themes

1. **Start with a base**: Pick a theme close to what you want and modify it
2. **Maintain contrast**: Ensure text is readable against backgrounds
3. **Test keyboard navigation**: Active states should be clearly visible
4. **Consider accessibility**: High contrast modes, focus indicators
5. **Mobile testing**: Check touch targets and readability on small screens
6. **Brand colors**: Use your brand's color palette for active/hover states

## Color Tools

- [Coolors](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel and harmony rules
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - MDN Documentation
