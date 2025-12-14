# ng-searchix Examples

Practical examples for common use cases.

## Example 1: Basic Documentation Search

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-docs',
  template: `
    <ngx-searchix
      [items]="docItems"
      [placeholder]="'Search documentation...'"
      [hotkey]="'ctrl+k'"
      (itemSelected)="onDocSelected($event)"
    ></ngx-searchix>
  `
})
export class DocsComponent {
  docItems: SearchItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      subtitle: 'Learn the basics of our platform',
      icon: 'book-open',
      href: '/docs/getting-started'
    },
    {
      id: 'installation',
      title: 'Installation',
      subtitle: 'How to install and configure',
      icon: 'download',
      href: '/docs/installation'
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      subtitle: 'Complete API documentation',
      icon: 'code',
      href: '/docs/api'
    },
    {
      id: 'examples',
      title: 'Examples',
      subtitle: 'Code examples and tutorials',
      icon: 'book',
      href: '/docs/examples'
    }
  ];

  onDocSelected(item: SearchItem) {
    console.log('Selected doc:', item);
    // Navigation is handled automatically via href
  }
}
```

## Example 2: Command Palette

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItem } from 'ng-searchix';

interface CommandItem extends SearchItem {
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  template: `
    <ngx-searchix
      [items]="commands"
      [placeholder]="'Type a command...'"
      [hotkey]="'ctrl+shift+p'"
      (itemSelected)="executeCommand($event)"
    ></ngx-searchix>
  `
})
export class CommandPaletteComponent {
  commands: CommandItem[] = [
    {
      id: 'new-file',
      title: 'New File',
      subtitle: 'Create a new file',
      icon: 'file-plus',
      action: () => this.newFile()
    },
    {
      id: 'new-folder',
      title: 'New Folder',
      subtitle: 'Create a new folder',
      icon: 'folder-plus',
      action: () => this.newFolder()
    },
    {
      id: 'settings',
      title: 'Open Settings',
      subtitle: 'Configure application',
      icon: 'settings',
      action: () => this.router.navigate(['/settings'])
    },
    {
      id: 'theme-toggle',
      title: 'Toggle Theme',
      subtitle: 'Switch between light and dark mode',
      icon: 'moon',
      action: () => this.toggleTheme()
    },
    {
      id: 'logout',
      title: 'Sign Out',
      subtitle: 'Log out of your account',
      icon: 'log-out',
      action: () => this.logout()
    }
  ];

  constructor(private router: Router) {}

  executeCommand(item: SearchItem) {
    const command = item as CommandItem;
    command.action();
  }

  newFile() {
    console.log('Creating new file...');
  }

  newFolder() {
    console.log('Creating new folder...');
  }

  toggleTheme() {
    console.log('Toggling theme...');
  }

  logout() {
    console.log('Logging out...');
  }
}
```

## Example 3: User Search with Avatar Icons

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

interface UserItem extends SearchItem {
  avatar: string;
  email: string;
}

@Component({
  selector: 'app-user-search',
  template: `
    <ngx-searchix
      [items]="users"
      [placeholder]="'Search users...'"
      [iconRenderer]="avatarRenderer"
      (itemSelected)="selectUser($event)"
    ></ngx-searchix>

    <ng-template #avatarRenderer let-avatarUrl>
      <img
        [src]="avatarUrl"
        class="user-avatar"
        [alt]="'User avatar'"
      />
    </ng-template>
  `,
  styles: [`
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  `]
})
export class UserSearchComponent {
  users: UserItem[] = [
    {
      id: '1',
      title: 'John Doe',
      subtitle: 'john.doe@example.com',
      icon: 'https://i.pravatar.cc/150?img=1',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      title: 'Jane Smith',
      subtitle: 'jane.smith@example.com',
      icon: 'https://i.pravatar.cc/150?img=2',
      email: 'jane.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: '3',
      title: 'Bob Johnson',
      subtitle: 'bob.johnson@example.com',
      icon: 'https://i.pravatar.cc/150?img=3',
      email: 'bob.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  selectUser(item: SearchItem) {
    const user = item as UserItem;
    console.log('Selected user:', user);
    // Navigate to user profile or start a conversation
  }
}
```

## Example 4: Custom Button Template

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-custom-button',
  template: `
    <ngx-searchix
      [items]="items"
      [buttonTemplate]="customButton"
    ></ngx-searchix>

    <ng-template #customButton let-context>
      <button class="custom-search-btn" (click)="context.open()">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span class="text">Quick Search</span>
        <kbd class="hotkey">{{ context.hotkey }}</kbd>
      </button>
    </ng-template>
  `,
  styles: [`
    .custom-search-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .custom-search-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    .custom-search-btn:active {
      transform: translateY(0);
    }

    .icon {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .hotkey {
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
    }
  `]
})
export class CustomButtonComponent {
  items: SearchItem[] = [
    { id: '1', title: 'Item 1', subtitle: 'Description 1' },
    { id: '2', title: 'Item 2', subtitle: 'Description 2' }
  ];
}
```

## Example 5: Integration with Lucide Icons

First install lucide-angular:
```bash
npm install lucide-angular
```

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';
import { LucideAngularModule, File, Folder, Code, Book, Settings } from 'lucide-angular';

@Component({
  selector: 'app-lucide-example',
  standalone: true,
  imports: [SearchixModule, LucideAngularModule],
  template: `
    <ngx-searchix
      [items]="items"
      [iconRenderer]="lucideRenderer"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>

    <ng-template #lucideRenderer let-icon>
      <lucide-angular
        [img]="icon"
        [size]="20"
        [strokeWidth]="2"
      ></lucide-angular>
    </ng-template>
  `
})
export class LucideExampleComponent {
  items: SearchItem[] = [
    {
      id: 'file',
      title: 'New File',
      subtitle: 'Create a new file',
      icon: 'file'
    },
    {
      id: 'folder',
      title: 'New Folder',
      subtitle: 'Create a new folder',
      icon: 'folder'
    },
    {
      id: 'code',
      title: 'Code Editor',
      subtitle: 'Open code editor',
      icon: 'code'
    },
    {
      id: 'docs',
      title: 'Documentation',
      subtitle: 'View documentation',
      icon: 'book'
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Configure app',
      icon: 'settings'
    }
  ];

  onSelect(item: SearchItem) {
    console.log('Selected:', item);
  }
}
```

## Example 6: Fuzzy Search with Fuse.js

```typescript
import { Component } from '@angular/core';
import { SearchItem, SEARCHIX_CONFIG } from 'ng-searchix';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-fuzzy-search',
  template: `
    <ngx-searchix
      [items]="items"
      [placeholder]="'Fuzzy search...'"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>
  `,
  providers: [
    {
      provide: SEARCHIX_CONFIG,
      useValue: {
        filterFn: (query: string, items: SearchItem[]) => {
          if (!query) return items;

          const fuse = new Fuse(items, {
            keys: ['title', 'subtitle'],
            threshold: 0.3,
            includeScore: true
          });

          return fuse.search(query).map(result => result.item);
        }
      }
    }
  ]
})
export class FuzzySearchComponent {
  items: SearchItem[] = [
    { id: '1', title: 'JavaScript Tutorial', subtitle: 'Learn JS basics' },
    { id: '2', title: 'TypeScript Guide', subtitle: 'TypeScript fundamentals' },
    { id: '3', title: 'Angular Documentation', subtitle: 'Angular framework docs' },
    { id: '4', title: 'React Handbook', subtitle: 'React library guide' },
    { id: '5', title: 'Vue.js Essentials', subtitle: 'Vue framework basics' }
  ];

  onSelect(item: SearchItem) {
    console.log('Selected:', item);
  }
}
```

## Example 7: Dynamic Items from API

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from 'ng-searchix';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResult {
  id: string;
  name: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-api-search',
  template: `
    <ngx-searchix
      [items]="items"
      [placeholder]="'Search products...'"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>
  `
})
export class ApiSearchComponent implements OnInit {
  items: SearchItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.http.get<ApiResult[]>('https://api.example.com/products')
      .pipe(
        map(results => results.map(r => ({
          id: r.id,
          title: r.name,
          subtitle: r.description,
          href: r.url,
          icon: 'package',
          data: r
        })))
      )
      .subscribe(items => {
        this.items = items;
      });
  }

  onSelect(item: SearchItem) {
    console.log('Selected product:', item.data);
  }
}
```

## Example 8: Multi-Category Search

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-category-search',
  template: `
    <ngx-searchix
      [items]="allItems"
      [placeholder]="'Search across all categories...'"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>
  `
})
export class CategorySearchComponent {
  private docs: SearchItem[] = [
    {
      id: 'doc1',
      title: 'Getting Started',
      subtitle: '📚 Documentation',
      icon: 'book',
      data: { category: 'docs' }
    }
  ];

  private users: SearchItem[] = [
    {
      id: 'user1',
      title: 'John Doe',
      subtitle: '👤 User',
      icon: 'user',
      data: { category: 'users' }
    }
  ];

  private files: SearchItem[] = [
    {
      id: 'file1',
      title: 'app.component.ts',
      subtitle: '📄 File',
      icon: 'file',
      data: { category: 'files' }
    }
  ];

  allItems: SearchItem[] = [
    ...this.docs,
    ...this.users,
    ...this.files
  ];

  onSelect(item: SearchItem) {
    const category = item.data?.category;
    console.log(`Selected ${category}:`, item);

    switch (category) {
      case 'docs':
        // Handle doc selection
        break;
      case 'users':
        // Handle user selection
        break;
      case 'files':
        // Handle file selection
        break;
    }
  }
}
```

## Example 9: Recently Viewed Items

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-recent-search',
  template: `
    <ngx-searchix
      [items]="displayItems"
      [placeholder]="'Search or select recent...'"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>
  `
})
export class RecentSearchComponent {
  private allItems: SearchItem[] = [
    { id: '1', title: 'Page 1', subtitle: 'First page' },
    { id: '2', title: 'Page 2', subtitle: 'Second page' },
    { id: '3', title: 'Page 3', subtitle: 'Third page' }
  ];

  private recentlyViewed: string[] = [];

  get displayItems(): SearchItem[] {
    // Show recent items first, then all items
    const recent = this.allItems.filter(item =>
      this.recentlyViewed.includes(item.id)
    );
    const others = this.allItems.filter(item =>
      !this.recentlyViewed.includes(item.id)
    );

    return [
      ...recent.map(item => ({
        ...item,
        subtitle: `⏱️ Recent • ${item.subtitle}`
      })),
      ...others
    ];
  }

  onSelect(item: SearchItem) {
    // Add to recently viewed
    this.recentlyViewed = [
      item.id,
      ...this.recentlyViewed.filter(id => id !== item.id)
    ].slice(0, 5); // Keep only last 5

    // Save to localStorage
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));

    console.log('Selected:', item);
  }

  ngOnInit() {
    // Load from localStorage
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      this.recentlyViewed = JSON.parse(stored);
    }
  }
}
```

## Example 10: Dark Mode Support

```typescript
import { Component } from '@angular/core';
import { SearchItem } from 'ng-searchix';

@Component({
  selector: 'app-theme-aware',
  template: `
    <button (click)="toggleTheme()">
      Toggle Theme
    </button>

    <ngx-searchix
      [items]="items"
      (itemSelected)="onSelect($event)"
    ></ngx-searchix>
  `,
  styles: [`
    :host {
      display: block;
    }

    :host.dark-mode {
      --searchix-bg: #1e1e1e;
      --searchix-fg: #e5e7eb;
      --searchix-border: rgba(255, 255, 255, 0.1);
      --searchix-muted: rgba(229, 231, 235, 0.5);
      --searchix-item-hover: rgba(255, 255, 255, 0.05);
      --searchix-item-active-bg: rgba(59, 130, 246, 0.15);
    }
  `],
  host: {
    '[class.dark-mode]': 'isDarkMode'
  }
})
export class ThemeAwareComponent {
  isDarkMode = false;

  items: SearchItem[] = [
    { id: '1', title: 'Item 1', subtitle: 'Description 1' },
    { id: '2', title: 'Item 2', subtitle: 'Description 2' }
  ];

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onSelect(item: SearchItem) {
    console.log('Selected:', item);
  }
}
```

## Tips for Implementation

1. **Performance**: For large datasets, consider pagination or virtual scrolling
2. **Debouncing**: Add debouncing for API calls in custom filter functions
3. **Error Handling**: Handle API errors gracefully
4. **Loading States**: Show loading indicators for async operations
5. **Accessibility**: Ensure keyboard navigation works properly
6. **Mobile**: Test on mobile devices for touch interactions
7. **Analytics**: Track search queries and selections for insights
8. **Caching**: Cache frequently accessed items
9. **Keyboard Shortcuts**: Document available shortcuts for users
10. **Customization**: Use CSS variables for consistent theming
