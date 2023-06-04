// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

const { workspaces: { packages } } = require('../package.json');

const filepaths = [
  'package.json',
  ...packages.map(e => `${e}/package.json`),
];

for(const filepath of filepaths) {
  const {
    name,
    version,
    workspaces,
    dependencies,
    devDependencies,
  } = JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8'));

  fs.writeFileSync(path.resolve(path.parse(filepath).dir, './package-docker-prod.json'), `${JSON.stringify({
    name,
    version,
    dependencies,
    workspaces,
  }, null, 2)}\n`);
  fs.writeFileSync(path.resolve(path.parse(filepath).dir, './package-docker.json'), `${JSON.stringify({
    name,
    version,
    dependencies,
    devDependencies,
    workspaces,
  }, null, 2)}\n`);
}
