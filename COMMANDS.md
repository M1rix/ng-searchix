# Команды и скрипты

Краткая справка по всем доступным командам для работы с workspace.

## NPM Scripts

### Сборка

```bash
# Собрать Angular 2+ библиотеку
npm run build

# Собрать AngularJS 1.x библиотеку
npm run build:legacy

# Собрать обе библиотеки
npm run build:all
```

### Тестирование

```bash
# Запустить тесты
npm test

# Запустить lint
npm run lint
```

## Angular CLI

### Сборка

```bash
# Собрать ng-searchix (Angular 2+)
ng build ng-searchix

# Production сборка
ng build ng-searchix --configuration production

# Watch mode (пересборка при изменениях)
ng build ng-searchix --watch
```

### Информация о проектах

```bash
# Показать все проекты
ng config projects

# Показать конфигурацию ng-searchix
ng config projects.ng-searchix

# Показать конфигурацию ng-searchix-legacy
ng config projects.ng-searchix-legacy

# Версия Angular CLI
ng version
```

## Прямые команды

### ng-searchix (Angular 2+)

```bash
# Напрямую через Angular CLI
ng build ng-searchix

# Production build
ng build ng-searchix --prod
```

### ng-searchix-legacy (AngularJS 1.x)

```bash
# Напрямую через Node.js
node projects/ng-searchix-legacy/build.js

# Из директории проекта
cd projects/ng-searchix-legacy
node build.js
cd ../..
```

## Разработка

### Hot Reload для ng-searchix

```bash
# Watch mode - автоматическая пересборка
ng build ng-searchix --watch
```

### Hot Reload для ng-searchix-legacy

```bash
# Установить nodemon (если нет)
npm install -g nodemon

# Watch mode
nodemon --watch projects/ng-searchix-legacy/src --exec "npm run build:legacy"

# Или с npx (без установки)
npx nodemon --watch projects/ng-searchix-legacy/src --exec "npm run build:legacy"
```

## Тестирование

### ng-searchix

```bash
# Unit тесты
ng test ng-searchix

# E2E тесты (если настроены)
ng e2e ng-searchix
```

### ng-searchix-legacy

```bash
# Открыть демо в браузере
# Windows
start projects/ng-searchix-legacy/example.html

# Mac
open projects/ng-searchix-legacy/example.html

# Linux
xdg-open projects/ng-searchix-legacy/example.html
```

## Очистка

### Очистить dist папки

```bash
# Windows
rmdir /s /q dist
rmdir /s /q projects\ng-searchix-legacy\dist

# Mac/Linux
rm -rf dist
rm -rf projects/ng-searchix-legacy/dist
```

### Очистить node_modules

```bash
# Windows
rmdir /s /q node_modules

# Mac/Linux
rm -rf node_modules

# Переустановить
npm install
```

### Полная очистка

```bash
# Windows
rmdir /s /q dist node_modules
npm install
npm run build:all

# Mac/Linux
rm -rf dist node_modules
npm install
npm run build:all
```

## Проверка файлов

### Проверить выходные файлы ng-searchix

```bash
# Список файлов
ls dist/ng-searchix/

# Windows
dir dist\ng-searchix

# Проверить package.json
cat dist/ng-searchix/package.json

# Windows
type dist\ng-searchix\package.json
```

### Проверить выходные файлы ng-searchix-legacy

```bash
# Список файлов
ls projects/ng-searchix-legacy/dist/

# Windows
dir projects\ng-searchix-legacy\dist

# Размер файлов
ls -lh projects/ng-searchix-legacy/dist/

# Windows
dir projects\ng-searchix-legacy\dist
```

## Git команды

### Проверка статуса

```bash
# Показать статус
git status

# Показать изменения
git diff

# Показать изменения в angular.json
git diff angular.json

# Показать новые файлы
git status --short
```

### Коммит изменений

```bash
# Добавить все файлы
git add .

# Добавить только ng-searchix-legacy
git add projects/ng-searchix-legacy/

# Коммит
git commit -m "Add ng-searchix-legacy library"

# Push
git push
```

## Публикация

### Публикация ng-searchix

```bash
# Сборка
npm run build

# Переход в dist
cd dist/ng-searchix

# Публикация
npm publish

# Вернуться
cd ../..
```

### Публикация ng-searchix-legacy

```bash
# Сборка
npm run build:legacy

# Переход в проект
cd projects/ng-searchix-legacy

# Публикация
npm publish

# Вернуться
cd ../..
```

## Утилиты

### Проверка зависимостей

```bash
# Показать установленные пакеты
npm list --depth=0

# Показать устаревшие
npm outdated

# Обновить
npm update
```

### Проверка размера

```bash
# Размер ng-searchix
du -sh dist/ng-searchix

# Размер ng-searchix-legacy
du -sh projects/ng-searchix-legacy/dist

# Детально (ng-searchix-legacy)
ls -lh projects/ng-searchix-legacy/dist/
```

### Проверка работоспособности

```bash
# Установить зависимости
npm install

# Собрать все
npm run build:all

# Проверить файлы
ls -R dist/ng-searchix
ls -R projects/ng-searchix-legacy/dist
```

## Быстрые команды

### Полный цикл разработки

```bash
# Установка + сборка + проверка
npm install && npm run build:all && echo "✅ Build successful!"
```

### Пересборка при изменениях

```bash
# ng-searchix watch mode
ng build ng-searchix --watch

# ng-searchix-legacy watch mode
npx nodemon --watch projects/ng-searchix-legacy/src --exec "npm run build:legacy"
```

### Одной командой

```bash
# Очистка и пересборка
rm -rf dist projects/ng-searchix-legacy/dist && npm run build:all
```

## Помощь

### Angular CLI помощь

```bash
# Общая помощь
ng help

# Помощь по build
ng build --help

# Помощь по config
ng config --help
```

### NPM помощь

```bash
# Показать доступные скрипты
npm run

# Показать информацию о пакете
npm info ng-searchix

# Показать конфигурацию
npm config list
```

## Полезные алиасы

Добавьте в `.bashrc` или `.zshrc`:

```bash
# Алиасы для быстрого доступа
alias nb='npm run build'
alias nbl='npm run build:legacy'
alias nba='npm run build:all'
alias nbs='ng build ng-searchix'
alias nbw='ng build ng-searchix --watch'

# Переход в директории
alias cdn='cd projects/ng-searchix'
alias cdl='cd projects/ng-searchix-legacy'

# Открыть пример
alias demo='open projects/ng-searchix-legacy/example.html'
```

## Шпаргалка

```bash
# Установка
npm install

# Сборка Angular 2+
npm run build

# Сборка AngularJS 1.x
npm run build:legacy

# Сборка всех
npm run build:all

# Watch mode Angular 2+
ng build ng-searchix --watch

# Watch mode AngularJS 1.x
npx nodemon --watch projects/ng-searchix-legacy/src --exec "npm run build:legacy"

# Тесты
npm test

# Демо AngularJS
open projects/ng-searchix-legacy/example.html

# Очистка
rm -rf dist projects/ng-searchix-legacy/dist node_modules

# Публикация Angular 2+
cd dist/ng-searchix && npm publish && cd ../..

# Публикация AngularJS 1.x
cd projects/ng-searchix-legacy && npm publish && cd ../..
```

---

**Последнее обновление**: 2024-01-15
