const fs = require('fs');
const path = require('path');

// Certifique-se de que o diretório dist/public exista
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}
if (!fs.existsSync(path.join(__dirname, 'dist/public'))) {
  fs.mkdirSync(path.join(__dirname, 'dist/public'));
}

// Copie o index.html
fs.copyFileSync(
  path.join(__dirname, 'public/index.html'),
  path.join(__dirname, 'dist/public/index.html')
);

console.log('Build preparado com sucesso!');
