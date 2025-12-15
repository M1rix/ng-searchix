# Автоматическая навигация в ng-searchix-legacy

## Обзор

ng-searchix-legacy **автоматически обрабатывает навигацию** при выборе элемента с `href`. Логика зависит от типа ссылки:

## Типы навигации

### 1. Внешние ссылки (с протоколом)

**Определение:** Ссылки начинающиеся с протокола (`http://`, `https://`, `mailto:`, `tel:`, и т.д.)

**Поведение:** Открываются в **новой вкладке** через `window.open()`

**Примеры:**
```javascript
{
  id: '1',
  title: 'YouTube',
  href: 'https://youtube.com'
}  // ✅ Откроется в новой вкладке

{
  id: '2',
  title: 'Email Support',
  href: 'mailto:support@example.com'
}  // ✅ Откроется почтовый клиент

{
  id: '3',
  title: 'Documentation',
  href: 'https://docs.angularjs.org'
}  // ✅ Откроется в новой вкладке
```

### 2. Внутренние маршруты (без протокола)

**Определение:** Ссылки без протокола - считаются внутренними маршрутами AngularJS приложения

**Поведение:** Навигация через `window.location.href` в текущей вкладке

**Автоформатирование:**
- `"/dashboard"` → остается `"/dashboard"`
- `"#/settings"` → остается `"#/settings"`
- `"profile"` → становится `"#/profile"` (автоматически добавляется `#/`)

**Примеры:**
```javascript
{
  id: '1',
  title: 'Dashboard',
  href: '/dashboard'
}  // ✅ Навигация на /dashboard

{
  id: '2',
  title: 'Settings',
  href: 'settings'
}  // ✅ Навигация на #/settings (автоформат)

{
  id: '3',
  title: 'Profile',
  href: '#/profile'
}  // ✅ Навигация на #/profile
```

### 3. Без ссылки

**Поведение:** Только вызывается callback `onSelect`, навигация не происходит

**Пример:**
```javascript
{
  id: '1',
  title: 'Action Item',
  subtitle: 'Performs custom action'
  // Нет href - только callback
}
```

## Регулярное выражение для определения протокола

```javascript
var hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(href);
```

Это выражение определяет:
- `https://` ✅
- `http://` ✅
- `mailto:` ✅
- `tel:` ✅
- `ftp://` ✅
- `file://` ✅
- `/path` ❌ (нет протокола)
- `page` ❌ (нет протокола)

## Конфигурация

### Отключить автоматическую навигацию

Если вы хотите полностью контролировать навигацию сами:

```javascript
angular.module('myApp', ['ngSearchixLegacy'])
  .config(function(searchixConfigProvider) {
    searchixConfigProvider.setDefaults({
      autoNavigate: false  // Отключить автоматическую навигацию
    });
  });
```

Или для конкретного экземпляра:

```javascript
searchixOverlay.open(
  items,
  {
    autoNavigate: false  // Только для этого диалога
  },
  function(item) {
    // Полностью контролируете навигацию здесь
    if (item.href) {
      console.log('Navigate to:', item.href);
      // Ваша логика
    }
  }
);
```

## Дополнительная кнопка "Open in new tab"

Для элементов с `href` автоматически показывается **иконка внешней ссылки** справа:

```javascript
{
  id: '1',
  title: 'Documentation',
  href: 'https://example.com'
}  // ✅ Покажет иконку "Open in new tab"
```

**Поведение иконки:**
- Клик по **основному элементу** → автоматическая навигация (в новой вкладке если external, в текущей если internal)
- Клик по **иконке** → всегда открывает в новой вкладке (даже для internal routes)

## Callback всегда вызывается

Даже при автоматической навигации, callback `onSelect` **всегда вызывается**:

```javascript
searchixOverlay.open(
  items,
  { autoNavigate: true },
  function(item) {
    console.log('Item selected:', item);
    // Этот код выполнится перед навигацией
    // Можете записать аналитику, сохранить state, etc.
  }
);
```

## Порядок выполнения

При выборе элемента:

1. ✅ Проверяется наличие `href` и `autoNavigate`
2. ✅ Выполняется автоматическая навигация (если включена)
3. ✅ Вызывается callback `onSelect`
4. ✅ Закрывается диалог (если `closeOnSelect !== false`)

## Debug логи

В консоли браузера вы увидите:

```
[searchix] Opening external link: https://youtube.com
```

или

```
[searchix] Navigating to internal route: #/dashboard
```

Это помогает отладить правильность определения типа ссылки.

## Примеры использования

### Пример 1: Смешанные ссылки

```javascript
vm.items = [
  { id: '1', title: 'Dashboard', href: '/dashboard' },           // Internal
  { id: '2', title: 'Settings', href: 'settings' },              // Internal (auto #/)
  { id: '3', title: 'YouTube', href: 'https://youtube.com' },   // External
  { id: '4', title: 'Action', subtitle: 'Custom action' }       // No navigation
];
```

### Пример 2: Только внутренние маршруты

```javascript
vm.items = [
  { id: '1', title: 'Home', href: '/home' },
  { id: '2', title: 'About', href: '/about' },
  { id: '3', title: 'Contact', href: '/contact' }
];
```

### Пример 3: С отключенной авто-навигацией

```javascript
searchixOverlay.open(
  items,
  { autoNavigate: false },
  function(item) {
    // Полный контроль
    if (item.href) {
      if (item.href.startsWith('http')) {
        window.open(item.href, '_blank');
      } else {
        $state.go(item.href);  // Используем UI-Router
      }
    }
  }
);
```

## Совместимость с роутерами

### AngularJS ngRoute

```javascript
{ href: '/dashboard' }  // ✅ Работает с ngRoute
{ href: '#/settings' }  // ✅ Работает с ngRoute hash mode
```

### UI-Router

Если вы хотите использовать UI-Router напрямую, отключите `autoNavigate`:

```javascript
angular.module('myApp')
  .controller('MyCtrl', function($state, searchixOverlay) {
    vm.openSearch = function() {
      searchixOverlay.open(
        vm.items,
        { autoNavigate: false },
        function(item) {
          if (item.state) {
            $state.go(item.state, item.params);
          } else if (item.href) {
            window.location.href = item.href;
          }
        }
      );
    };
  });
```

## Безопасность

Все внешние ссылки открываются с параметрами безопасности:

```javascript
window.open(href, '_blank', 'noopener,noreferrer');
```

Это предотвращает:
- **tabnabbing** атаки (через `noopener`)
- Передачу **referer** заголовка (через `noreferrer`)
