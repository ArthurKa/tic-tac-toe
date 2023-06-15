// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { workspaces: { packages } } = require('../package.json');

const packageNames = (
  execSync(`ls ${packages.join(' ')}`)
    .toString('utf-8')
    .split('\n')
    .filter(e => e.endsWith(':'))
    .map(e => e.slice(0, -1))
);
const filepaths = [
  'package.json',
  ...packageNames.map(e => `${e}/package.json`),
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
