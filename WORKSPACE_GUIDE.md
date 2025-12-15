# Workspace Configuration Guide

## Обзор

Этот Angular workspace настроен для работы с двумя библиотеками:
1. **ng-searchix** - Angular 2+ библиотека
2. **ng-searchix-legacy** - AngularJS 1.5.8+ библиотека

## Конфигурация angular.json

### ng-searchix (Angular 2+)

```json
{
  "projects": {
    "ng-searchix": {
      "projectType": "library",
      "root": "projects/ng-searchix",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/ng-searchix/ng-package.json"
          }
        }
      }
    }
  }
}
```

**Сборка**: Использует ng-packagr (стандартный Angular builder)
**Команда**: `npm run build` или `ng build ng-searchix`
**Выход**: `dist/ng-searchix/`

### ng-searchix-legacy (AngularJS 1.x)

```json
{
  "projects": {
    "ng-searchix-legacy": {
      "projectType": "library",
      "root": "projects/ng-searchix-legacy",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/ng-searchix-legacy/package.json"
          }
        }
      }
    }
  }
}
```

**Сборка**: Использует кастомный build.js скрипт
**Команда**: `npm run build:legacy`
**Выход**: `projects/ng-searchix-legacy/dist/`

## NPM Scripts (package.json)

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

## Использование

### 1. Сборка Angular библиотеки

```bash
# Стандартная сборка через Angular CLI
npm run build

# Или напрямую
ng build ng-searchix

# Production сборка
ng build ng-searchix --configuration production
```

**Результат**: `dist/ng-searchix/`

### 2. Сборка AngularJS библиотеки

```bash
# Через npm script
npm run build:legacy

# Или напрямую
node projects/ng-searchix-legacy/build.js

# Или из директории проекта
cd projects/ng-searchix-legacy
node build.js
```

**Результат**: `projects/ng-searchix-legacy/dist/`

### 3. Сборка всех библиотек

```bash
npm run build:all
```

Последовательно собирает обе библиотеки.

## Файловая структура

```
ng-searchix-workspace/
│
├── projects/
│   │
│   ├── ng-searchix/                    # Angular 2+ библиотека
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── *.component.ts
│   │   │   │   ├── *.service.ts
│   │   │   │   └── *.module.ts
│   │   │   └── public-api.ts
│   │   ├── ng-package.json
│   │   ├── package.json
│   │   ├── tsconfig.lib.json
│   │   └── README.md
│   │
│   └── ng-searchix-legacy/             # AngularJS 1.x библиотека
│       ├── src/
│       │   ├── ng-searchix-legacy.module.js
│       │   ├── searchix.component.js
│       │   ├── searchix-overlay.service.js
│       │   ├── searchix-dialog.directive.js
│       │   ├── ng-searchix-legacy.css
│       │   ├── ng-searchix-legacy.d.ts
│       │   └── public-api.ts           # Для workspace интеграции
│       ├── dist/                       # Собранные файлы
│       │   ├── ng-searchix-legacy.js
│       │   └── ng-searchix-legacy.css
│       ├── build.js                    # Кастомный build скрипт
│       ├── example.html                # Демо
│       ├── package.json
│       ├── ng-package.json             # Для workspace
│       ├── tsconfig.lib.json           # Для workspace
│       └── README.md
│
├── dist/
│   └── ng-searchix/                    # Собранная Angular библиотека
│       ├── bundles/
│       ├── esm2015/
│       ├── fesm2015/
│       └── package.json
│
├── angular.json                        # Workspace конфигурация
├── package.json                        # Корневой package.json
├── tsconfig.json                       # Корневой TypeScript config
└── README.md                           # Документация
```

## Build процессы

### ng-searchix (Angular 2+)

**Builder**: @angular-devkit/build-angular:ng-packagr

**Шаги**:
1. TypeScript компиляция
2. Template/Style inlining
3. Создание UMD, ESM2015, FESM2015 бандлов
4. Генерация .d.ts файлов
5. Копирование в `dist/ng-searchix/`

**Конфигурация**: `ng-package.json`, `tsconfig.lib.json`

### ng-searchix-legacy (AngularJS 1.x)

**Builder**: Кастомный Node.js скрипт (`build.js`)

**Шаги**:
1. Чтение исходных файлов
2. Конкатенация JavaScript файлов
3. Добавление banner
4. Копирование CSS
5. Запись в `dist/`

**Конфигурация**: `build.js`

## TypeScript конфигурация

### ng-searchix

```json
// tsconfig.lib.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "target": "es2015",
    "declaration": true,
    "lib": ["es2018", "dom"]
  }
}
```

### ng-searchix-legacy

```json
// tsconfig.lib.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "target": "es2015",
    "declaration": true
  }
}
```

## Тестирование

### Тестирование ng-searchix

```bash
npm test
```

### Тестирование ng-searchix-legacy

Откройте `projects/ng-searchix-legacy/example.html` в браузере:

```bash
# Windows
start projects/ng-searchix-legacy/example.html

# Mac
open projects/ng-searchix-legacy/example.html

# Linux
xdg-open projects/ng-searchix-legacy/example.html
```

## Публикация

### ng-searchix

```bash
# Сборка
npm run build

# Публикация
cd dist/ng-searchix
npm publish
```

### ng-searchix-legacy

```bash
# Сборка
npm run build:legacy

# Публикация
cd projects/ng-searchix-legacy
npm publish
```

## Разработка

### Разработка ng-searchix

1. Внести изменения в `projects/ng-searchix/src/`
2. Запустить сборку: `npm run build`
3. Использовать в тестовом приложении

### Разработка ng-searchix-legacy

1. Внести изменения в `projects/ng-searchix-legacy/src/`
2. Запустить сборку: `npm run build:legacy`
3. Открыть `example.html` в браузере
4. Проверить изменения

### Hot Reload (для разработки)

**ng-searchix**:
```bash
# Использовать Angular CLI в режиме watch
ng build ng-searchix --watch
```

**ng-searchix-legacy**:
```bash
# Использовать nodemon для автоматической пересборки
npx nodemon --watch projects/ng-searchix-legacy/src --exec "npm run build:legacy"
```

## Важные заметки

### 1. Независимые библиотеки
- Обе библиотеки полностью независимы
- Разные системы сборки
- Разные выходные форматы
- Разные зависимости

### 2. Workspace интеграция
- `ng-searchix-legacy` имеет Angular workspace файлы для совместимости
- Фактическая сборка использует `build.js`
- TypeScript определения для IDE поддержки

### 3. Версионирование
- Обе библиотеки имеют независимые версии
- package.json в каждой директории
- Независимые публикации в npm

### 4. Git
- Один репозиторий для обеих библиотек
- Независимые CHANGELOG.md
- Общий .gitignore

## Troubleshooting

### ng-searchix не собирается

```bash
# Очистить кэш
rm -rf node_modules dist
npm install
npm run build
```

### ng-searchix-legacy не собирается

```bash
# Проверить build.js
node projects/ng-searchix-legacy/build.js

# Проверить наличие исходных файлов
ls projects/ng-searchix-legacy/src/
```

### Angular CLI ошибки

```bash
# Переустановить Angular CLI
npm install -g @angular/cli@12
npm install
```

## Полезные команды

```bash
# Проверить версии
ng version

# Список проектов в workspace
ng config projects

# Очистить dist
rm -rf dist projects/ng-searchix-legacy/dist

# Установить зависимости
npm install

# Проверить package.json
npm run
```

---

**Последнее обновление**: 2024-01-15
**Версия workspace**: 1.0.0
