const CleanCSS = require('clean-css');
const fs = require('fs-extra');
const glob = require('glob');

const cssFiles = glob.sync('**/*.css', {
  ignore: ['node_modules/**', 'dist/**'] // ignore these folders
});

if (cssFiles.length === 0) {
  console.log('No CSS files found to minify.');
  process.exit(0);
}

console.log(`Found ${cssFiles.length} CSS files. Minifying...`);

cssFiles.forEach(file => {
  const css = fs.readFileSync(file, 'utf-8');
  const output = new CleanCSS().minify(css);

  if (output.errors.length) {
    console.error(`Error minifying ${file}:`, output.errors);
    return;
  }

  fs.writeFileSync(file, output.styles);
  console.log(`Minified: ${file}`);
});

console.log('✅ All CSS files have been minified successfully!');

//node minify-css.js -- to run the script