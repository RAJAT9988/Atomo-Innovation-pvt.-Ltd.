const fs = require('fs');
const path = require('path');

const dir = '.'; // Current folder
const version = process.argv[2] || Date.now(); // Default: timestamp (for cache busting)

function updateCSSVersion(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all .css or .css?v=old with .css?v=newversion
  content = content.replace(/(\.css)(\?v=[0-9.]+)?/g, `$1?v=${version}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}

function scanDir(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      updateCSSVersion(fullPath);
    }
  });
}

console.log(`Updating all CSS versions to v=${version}...`);
scanDir(dir);
console.log('✅ Done!');
