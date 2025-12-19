/**
 * Build script for ng-searchix-legacy
 * Concatenates all source files into a single distributable file
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, '..', '..', 'dist', 'ng-searchix-legacy');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Files in order
const sourceFiles = [
  'ng-searchix-legacy.module.js',
  'searchix-overlay.service.js',
  'searchix-dialog.directive.js',
  'searchix.component.js'
];

// Read and concatenate
let combined = '';
combined += '/**\n';
combined += ' * ng-searchix-legacy v1.0.0\n';
combined += ' * Advanced search interface for AngularJS 1.5.8+\n';
combined += ' * https://github.com/yourusername/ng-searchix-legacy\n';
combined += ' * @license MIT\n';
combined += ' */\n\n';

sourceFiles.forEach(file => {
  const filePath = path.join(srcDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  combined += content + '\n\n';
});

// Write combined file
const outputPath = path.join(distDir, 'ng-searchix-legacy.js');
fs.writeFileSync(outputPath, combined, 'utf8');

// Copy CSS
const cssPath = path.join(srcDir, 'ng-searchix-legacy.css');
const cssOutputPath = path.join(distDir, 'ng-searchix-legacy.css');
fs.copyFileSync(cssPath, cssOutputPath);

// Copy TypeScript definitions
const dtsPath = path.join(srcDir, 'ng-searchix-legacy.d.ts');
const dtsOutputPath = path.join(distDir, 'ng-searchix-legacy.d.ts');
if (fs.existsSync(dtsPath)) {
  fs.copyFileSync(dtsPath, dtsOutputPath);
}

// Create package.json for dist
const packageJson = {
  name: 'ng-searchix-legacy',
  version: '1.1.0',
  description: 'Advanced search interface component for AngularJS 1.5.8+ with keyboard shortcuts and fuzzy search',
  main: 'ng-searchix-legacy.js',
  types: 'ng-searchix-legacy.d.ts',
  keywords: ['angularjs', 'angular', 'search', 'searchix', 'fuzzy', 'keyboard', 'spotlight', 'command-palette', '1.5.8'],
  author: '',
  license: 'MIT',
  peerDependencies: {
    angular: '^1.5.8'
  },
  dependencies: {
    'fuse.js': '^7.1.0'
  }
};
const packageJsonPath = path.join(distDir, 'package.json');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

// Copy README
const readmePath = path.join(__dirname, 'README.md');
const readmeOutputPath = path.join(distDir, 'README.md');
if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, readmeOutputPath);
}

// Copy LICENSE
const licensePath = path.join(__dirname, 'LICENSE');
const licenseOutputPath = path.join(distDir, 'LICENSE');
if (fs.existsSync(licensePath)) {
  fs.copyFileSync(licensePath, licenseOutputPath);
}

// Copy bower.json
const bowerPath = path.join(__dirname, 'bower.json');
const bowerOutputPath = path.join(distDir, 'bower.json');
if (fs.existsSync(bowerPath)) {
  fs.copyFileSync(bowerPath, bowerOutputPath);
}

// Copy and update example.html
const examplePath = path.join(__dirname, 'example.html');
const exampleOutputPath = path.join(distDir, 'example.html');
if (fs.existsSync(examplePath)) {
  let exampleContent = fs.readFileSync(examplePath, 'utf8');
  // Update paths to be relative to dist directory
  exampleContent = exampleContent.replace(
    /href="\.\.\/\.\.\/dist\/ng-searchix-legacy\/ng-searchix-legacy\.css"/g,
    'href="ng-searchix-legacy.css"'
  );
  exampleContent = exampleContent.replace(
    /src="\.\.\/\.\.\/dist\/ng-searchix-legacy\/ng-searchix-legacy\.js"/g,
    'src="ng-searchix-legacy.js"'
  );
  fs.writeFileSync(exampleOutputPath, exampleContent, 'utf8');
}

console.log('Build complete!');
console.log('- ' + outputPath);
console.log('- ' + cssOutputPath);
console.log('- ' + dtsOutputPath);
console.log('- ' + packageJsonPath);
console.log('- ' + readmeOutputPath);
console.log('- ' + licenseOutputPath);
console.log('- ' + bowerOutputPath);
console.log('- ' + exampleOutputPath);
