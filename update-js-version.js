const fs = require('fs');
const path = require('path');

const dir = '.'; // Current folder
const version = process.argv[2] || '2.2'; // Pass version as argument (default 2.2)

function updateJSVersion(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all .js or .js?v=old with .js?v=newversion
  content = content.replace(/(\.js)(\?v=[0-9.]+)?/g, `$1?v=${version}`);

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
      updateJSVersion(fullPath);
    }
  });
}

console.log(`Updating all JS versions to v=${version}...`);
scanDir(dir);
console.log('✅ Done!');
