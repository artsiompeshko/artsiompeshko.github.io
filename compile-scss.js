const sass = require('node-sass');

const result = sass.renderSync({
  file: './scene.scss',
  outFile: './scene.css',
});
