# Angular.json Configuration Summary

## Что было добавлено в angular.json

### Полная конфигурация

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ng-searchix": {
      "projectType": "library",
      "root": "projects/ng-searchix",
      "sourceRoot": "projects/ng-searchix/src",
      "prefix": "ngx",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/ng-searchix/ng-package.json",
            "tsConfig": "projects/ng-searchix/tsconfig.lib.json"
          },
          "configurations": {
            "production": {
              "tsConfig": "projects/ng-searchix/tsconfig.lib.prod.json"
            }
          }
        }
      }
    },
    "ng-searchix-legacy": {
      "projectType": "library",
      "root": "projects/ng-searchix-legacy",
      "sourceRoot": "projects/ng-searchix-legacy/src",
      "prefix": "ngx",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/ng-searchix-legacy/package.json"
          },
          "configurations": {
            "production": {}
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [],
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    }
  },
  "defaultProject": "ng-searchix"
}
```

## Добавленный проект: ng-searchix-legacy

### Конфигурация проекта

```json
"ng-searchix-legacy": {
  "projectType": "library",
  "root": "projects/ng-searchix-legacy",
  "sourceRoot": "projects/ng-searchix-legacy/src",
  "prefix": "ngx",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:ng-packagr",
      "options": {
        "project": "projects/ng-searchix-legacy/package.json"
      },
      "configurations": {
        "production": {}
      }
    },
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [],
        "exclude": ["**/node_modules/**"]
      }
    }
  }
}
```

### Объяснение полей

#### Основные поля

| Поле | Значение | Назначение |
|------|---------|-----------|
| `projectType` | `"library"` | Определяет тип проекта как библиотеку |
| `root` | `"projects/ng-searchix-legacy"` | Корневая директория проекта |
| `sourceRoot` | `"projects/ng-searchix-legacy/src"` | Директория с исходным кодом |
| `prefix` | `"ngx"` | Префикс для компонентов (ngx-searchix) |

#### Architect → Build

```json
"build": {
  "builder": "@angular-devkit/build-angular:ng-packagr",
  "options": {
    "project": "projects/ng-searchix-legacy/package.json"
  },
  "configurations": {
    "production": {}
  }
}
```

**Важно**: Хотя указан builder `ng-packagr`, фактическая сборка происходит через кастомный скрипт `build.js`.

Это сделано для:
1. ✅ Совместимости с Angular workspace
2. ✅ IDE интеграции (VS Code, WebStorm)
3. ✅ Angular CLI команд (`ng list`, `ng config`)

#### Architect → Lint

```json
"lint": {
  "builder": "@angular-devkit/build-angular:tslint",
  "options": {
    "tsConfig": [],
    "exclude": ["**/node_modules/**"]
  }
}
```

Базовая конфигурация для линтинга (опциональна).

## NPM Scripts (package.json)

### Добавленные скрипты

```json
{
  "scripts": {
    "build": "ng build ng-searchix",
    "build:legacy": "node projects/ng-searchix-legacy/build.js",
    "build:all": "npm run build && npm run build:legacy",
    "test": "ng test",
    "lint": "ng lint"
  }
}
```

### Новые команды

| Команда | Действие |
|---------|----------|
| `npm run build:legacy` | Сборка ng-searchix-legacy через build.js |
| `npm run build:all` | Сборка обеих библиотек последовательно |

## Дополнительные файлы для ng-searchix-legacy

### 1. ng-package.json

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/ng-searchix-legacy",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

**Назначение**: Интеграция с Angular workspace (формальная)

### 2. tsconfig.lib.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "target": "es2015",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": [],
    "lib": ["dom", "es2018"]
  },
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": true,
    "enableResourceInlining": true
  },
  "exclude": ["src/test.ts", "**/*.spec.ts"]
}
```

**Назначение**: TypeScript конфигурация для workspace

### 3. tsconfig.lib.prod.json

```json
{
  "extends": "./tsconfig.lib.json",
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
```

**Назначение**: Production TypeScript настройки

### 4. src/public-api.ts

```typescript
/**
 * Public API Surface of ng-searchix-legacy
 */
export * from './ng-searchix-legacy.d';
```

**Назначение**: Entry point для TypeScript экспортов

### 5. src/ng-searchix-legacy.d.ts

TypeScript определения для AngularJS компонентов.

**Назначение**: IDE autocomplete и type checking

## Как это работает

### Workflow для ng-searchix (Angular 2+)

```
┌─────────────────────┐
│  ng build ng-searchix  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   ng-packagr        │
│   (Angular builder) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  dist/ng-searchix/  │
│  ├── bundles/       │
│  ├── esm2015/       │
│  └── package.json   │
└─────────────────────┘
```

### Workflow для ng-searchix-legacy (AngularJS 1.x)

```
┌──────────────────────────┐
│  npm run build:legacy    │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  node build.js           │
│  (Кастомный скрипт)      │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Чтение src/*.js файлов  │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Конкатенация            │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  dist/                   │
│  ├── ng-searchix-legacy.js  │
│  └── ng-searchix-legacy.css │
└──────────────────────────┘
```

## Angular CLI команды

### Доступные команды

```bash
# Список всех проектов
ng config projects

# Сборка ng-searchix
ng build ng-searchix

# Информация о проекте
ng config projects.ng-searchix-legacy

# Lint (если настроен)
ng lint ng-searchix-legacy
```

### Недоступные команды

```bash
# ❌ НЕ работает для ng-searchix-legacy
ng build ng-searchix-legacy

# ✅ Вместо этого используйте:
npm run build:legacy
```

## Преимущества такой конфигурации

### ✅ Единый Workspace

- Обе библиотеки в одном репозитории
- Общие зависимости и конфигурация
- Единый git history

### ✅ IDE Поддержка

- VS Code распознает оба проекта
- Autocomplete работает
- TypeScript type checking

### ✅ Независимые Build системы

- ng-searchix использует ng-packagr
- ng-searchix-legacy использует кастомный build.js
- Не мешают друг другу

### ✅ Удобные NPM скрипты

```bash
npm run build        # Angular библиотека
npm run build:legacy # AngularJS библиотека
npm run build:all    # Обе библиотеки
```

## Проверка конфигурации

### 1. Проверить angular.json

```bash
# Показать конфигурацию проекта
ng config projects.ng-searchix-legacy

# Вывод:
# {
#   "projectType": "library",
#   "root": "projects/ng-searchix-legacy",
#   ...
# }
```

### 2. Проверить сборку

```bash
# Собрать legacy библиотеку
npm run build:legacy

# Проверить файлы
ls projects/ng-searchix-legacy/dist/

# Вывод:
# ng-searchix-legacy.css
# ng-searchix-legacy.js
```

### 3. Проверить оба проекта

```bash
# Собрать все
npm run build:all

# Проверить результаты
ls dist/ng-searchix/
ls projects/ng-searchix-legacy/dist/
```

## Troubleshooting

### Проблема: ng build ng-searchix-legacy не работает

**Решение**: Используйте `npm run build:legacy`

### Проблема: IDE не видит ng-searchix-legacy

**Решение**:
1. Убедитесь что `angular.json` содержит конфигурацию
2. Перезапустите IDE
3. Выполните `npm install`

### Проблема: TypeScript ошибки в ng-searchix-legacy

**Решение**:
1. Это нормально - это JavaScript библиотека
2. TypeScript файлы нужны только для workspace интеграции
3. Фактическая сборка не использует TypeScript

## Итог

### ✅ Что сделано

1. Добавлен проект `ng-searchix-legacy` в `angular.json`
2. Созданы workspace файлы (ng-package.json, tsconfig.lib.json)
3. Добавлены NPM скрипты в package.json
4. Настроена IDE интеграция
5. Сохранена независимость build систем

### 📋 Структура команд

```bash
# Angular 2+ библиотека
npm run build              # Сборка через ng-packagr
ng build ng-searchix       # Альтернативная команда

# AngularJS 1.x библиотека
npm run build:legacy       # Сборка через build.js
node projects/ng-searchix-legacy/build.js  # Альтернативная команда

# Обе библиотеки
npm run build:all          # Последовательная сборка
```

### 🎯 Результат

Workspace полностью настроен для работы с обеими библиотеками, сохраняя при этом их независимость и специфику build процессов.

---

**Конфигурация готова!** ✅
**Дата**: 2024-01-15
**Версия**: 1.0.0
