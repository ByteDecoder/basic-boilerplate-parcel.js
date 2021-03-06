const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fileHandler = require('./fileHandler');

const scripts = {
  dev: 'parcel ./src/*.html',
  build: 'parcel build ./src/*.html'
};

const dependencies = {
  '@fortawesome/fontawesome-free': '^5.11.2',
  handlebars: '^4.4.3',
  'normalize.css': '^8.0.1',
  typography: '^0.16.19',
  'typography-theme-moraga': '^0.16.19',
  moment: '^2.24.0'
};

const devDependencies = {
  autoprefixer: '^9.6.5',
  eslint: '^6.5.1',
  'parcel-bundler': '^1.12.4',
  'postcss-modules': '^1.4.1',
  sass: '^1.23.0',
  stylelint: '^11.1.1'
};

const update = async () => {
  await fileHandler.copyFile('package.json', 'package.json.bak');
  await fileHandler.copyFile('package.json', 'package.json.new');

  const packageJSON = await readFile('package.json.new');
  const data = JSON.parse(packageJSON);

  data.scripts = scripts;
  data.dependencies = dependencies;
  data.devDependencies = devDependencies;

  await writeFile('package.json.new', JSON.stringify(data, null, 2));
};

module.exports = {
  update
};
