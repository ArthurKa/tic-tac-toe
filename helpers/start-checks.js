// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nvmrc = fs.readFileSync(path.resolve('.nvmrc'), 'utf-8').trim();

const nodeVersion = process.versions.node;
if(nodeVersion !== nvmrc) {
  throw new Error(`You must use Node.js v${nvmrc} for this project (${nodeVersion} used)`);
}

const npmVersion = execSync('npm -v').toString().trim();
if(!(Number(npmVersion.split('.')[0]) >= 8)) {
  throw new Error(`You must use NPM v8.x.x of higher (${npmVersion} used)`);
}